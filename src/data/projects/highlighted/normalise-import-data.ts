import type { HighlightedProject } from '../types'

const project: HighlightedProject = {
  slug: 'normalise-import-data',
  tier: 'highlighted',
  name: 'Dynamic Import Data Normalisation Procedure',
  techStack: ['SQL Server', 'T-SQL', 'Dynamic SQL'],
  blurb:
    'A dynamic SQL stored procedure that builds an INSERT/SELECT script to normalize a set of raw import data based on pre-defined field targets, accounting for multiple parent-child relationships.',
  problem: `Every raw import file landed in its own staging table with its own column names, and each one needed to become one or more properly normalized tables — often with a parent/child relationship, such as a primary record with several related child records attached to it. Writing a bespoke INSERT script per import file meant re-writing the same INSERT/SELECT/JOIN pattern by hand every time, which didn't scale as more import types were added over time.`,
  snippets: [
    {
      label: 'Reading the mapping configuration',
      language: 'sql',
      code: `-- Description: Dynamic SQL to build an Insert/Select script that normalizes raw import data
-- Modifications: Added support for UPDATE as well as INSERT (contributed by a colleague)
-- Modifications: Updated the update process to not inner join on unique parameters (contributed by a colleague)

-- EXEC usp_NormaliseRawImportData @RawFileTableName='RawFileTableName', @UserId=1, @UpdateOnlyInd=0, @IsDebugInd=1

-- Pull the field-mapping configuration into a working copy for this run
SELECT
    FileFieldName,
    TargetEntityName,
    TargetFieldName,
    ParentEntityName,
    ParentEntityFieldName,
    IsUniqueIdentifierInd,
    UpdateRecordInd
INTO #Mappings
FROM NormalizationMappings

-- The root entity is whichever target table has no parent
SET @DestinationTableName = (
    SELECT TOP 1 TargetEntityName
    FROM #Mappings
    WHERE ParentEntityName IS NULL
)`,
      talkThrough: `Instead of one script per import, a single stored procedure reads a \`NormalizationMappings\` table that describes, for one raw import file, how every column should land: which target table and field it maps to, which parent entity (if any) it belongs under, whether it forms part of that entity's unique-identifier key, and whether it participates in later updates as well as the initial insert. Adding a new import type then becomes a data change — a new set of mapping rows — rather than a new script to write and maintain.`,
    },
    {
      label: 'Walking parent → child relationships',
      language: 'sql',
      code: `-- Process one entity "level" of the hierarchy per pass of this loop
WHILE (SELECT COUNT(*) FROM #Mappings) > 0
BEGIN
    -- Rows belonging to the entity currently being processed
    SELECT *
    INTO #SubMappings
    FROM #Mappings
    WHERE ISNULL(ParentEntityFieldName, '') = @SelectedParentEntityFieldName

    -- Any entities that join back onto this one
    SELECT TargetEntityName, ParentEntityFieldName, ParentEntityName
    INTO #InnerJoinMappings
    FROM #Mappings
    WHERE ParentEntityName = (SELECT TOP 1 TargetEntityName FROM #SubMappings)
    GROUP BY TargetEntityName, ParentEntityFieldName, ParentEntityName

    -- Build the INNER JOIN back to the parent entity, already processed in an earlier pass
    IF (@SelectedParentEntityFieldName <> '')
    BEGIN
        SET @JoinerTableName = (SELECT TOP 1 TargetEntityName FROM #SubMappings)
        SET @InnerJoin = (SELECT TOP 1 TargetEntityName FROM #SubMappings) + ' AS ' + @JoinerTableName + ' ON '
    END

    WHILE (SELECT COUNT(*) FROM #InnerJoinMappings) > 0
    BEGIN
        SELECT TOP 1 @ParentEntityFieldName = ParentEntityFieldName FROM #InnerJoinMappings

        SELECT TOP 1 @InnerJoinOn = @InnerJoinOn + IIF(@InnerJoinOn = '', '', ' AND ')
            + TargetEntityName + '.' + fn.GetTablePrimaryKey(TargetEntityName)
            + ' = ' + ParentEntityName + '.' + ParentEntityFieldName
        FROM #InnerJoinMappings
        WHERE ParentEntityFieldName = @ParentEntityFieldName

        DELETE #InnerJoinMappings WHERE ParentEntityFieldName = @ParentEntityFieldName
    END

    -- ...field-level loop building the INSERT / SELECT / GROUP BY parts sits here...

    -- Move on to whichever entity's parent has now been fully processed
    DELETE FROM #Mappings WHERE ISNULL(ParentEntityFieldName, '') = @SelectedParentEntityFieldName

    SET @SelectedParentEntityFieldName = (
        SELECT TOP 1 M1.ParentEntityFieldName
        FROM #Mappings M1
        LEFT JOIN #Mappings M2 ON M1.ParentEntityName = M2.TargetEntityName
        WHERE M2.FileFieldName IS NULL
    )
END`,
      talkThrough: `The mapping rows for one import naturally form a tree: one root entity, any number of child entities under it, and those children can themselves have children. The procedure processes this level by level in an outer loop — on each pass it finds whichever entities' parents have already been handled, builds the \`INNER JOIN\` back to that already-processed parent using each entity's primary key, and appends it onto the statement under construction. Because the loop keeps going until every level of the hierarchy is drained, it copes with two-, three-, or more-level hierarchies with no extra code — it doesn't matter how deep the raw file's structure goes.`,
    },
    {
      label: 'Assembling and executing the statement',
      language: 'sql',
      code: `-- For each mapped field, work out what it contributes to
-- the INSERT, SELECT/UPDATE, and GROUP BY clauses being built up
WHILE (SELECT COUNT(*) FROM #SubMappings) > 0
BEGIN
    SELECT TOP 1 @FileFieldName = FileFieldName, @TargetFieldName = TargetFieldName
    FROM #SubMappings

    IF @SelectedParentEntityFieldName = ''
        SELECT TOP 1
            @InsertTargetFieldName = TargetFieldName,
            @SelectTargetFieldName = IIF(@UpdateOnlyInd = 0,
                @RawFileTableName + '.' + @FileFieldName + ' AS ' + @TargetFieldName,
                IIF(UpdateRecordInd = 1, TargetFieldName + '=' + @RawFileTableName + '.' + @FileFieldName, ''))
        FROM #SubMappings
    ELSE
        SELECT TOP 1
            @InsertTargetFieldName = ParentEntityFieldName,
            @SelectTargetFieldName = IIF(@UpdateOnlyInd = 0,
                @JoinerTableName + '.' + fn.GetTablePrimaryKey(TargetEntityName) + ' AS ' + ParentEntityFieldName,
                ParentEntityFieldName + '=' + TargetEntityName + '.' + ParentEntityFieldName)
        FROM #SubMappings

    -- Append onto the running INSERT / SELECT lists, skipping fields already added
    SELECT
        @InsertPartSQL = IIF(CHARINDEX(' ' + @InsertTargetFieldName + ',', @InsertPartSQL) > 0,
            @InsertPartSQL, @InsertPartSQL + ' ' + @InsertTargetFieldName + ', '),
        @SelectPartSQL = IIF(@SelectTargetFieldName <> '',
            IIF(CHARINDEX(' ' + @SelectTargetFieldName + ',', @SelectPartSQL) > 0,
                @SelectPartSQL, @SelectPartSQL + ' ' + @SelectTargetFieldName + ', '),
            @SelectPartSQL)

    DELETE #SubMappings WHERE FileFieldName = @FileFieldName AND TargetFieldName = @TargetFieldName
END

-- Once every level of the hierarchy has been processed, build the final statement
SET @ExecutionStatement =
    IIF(@UpdateOnlyInd = 0,
        'INSERT INTO ' + @DestinationTableName + ' (' + @InsertPartSQL + ')'
            + ' SELECT ' + @SelectPartSQL
            + ' FROM ' + @RawFileTableName
            + ' ' + @InnerJoinPartSQL
            + ' LEFT JOIN ' + @DestinationTableName + ' ON ' + @UniqueJoinPartSQL
            + ' WHERE ' + @DestinationTableName + '.' + @TablePrimaryKey + ' IS NULL'
            + IIF(@ContainsEncryptedFieldInd = 0, ' GROUP BY ' + @GroupByPartSQL, ''),
        'UPDATE ' + @DestinationTableName
            + ' SET ' + SUBSTRING(@SelectPartSQL, 0, LEN(@SelectPartSQL))
            + ' FROM ' + @RawFileTableName
            + ' ' + @InnerJoinPartSQL
            + ' INNER JOIN ' + @DestinationTableName + ' ON ' + @UniqueJoinPartSQL
    )

-- Review before you run it, or just run it
IF @IsDebugInd = 1
    PRINT @ExecutionStatement
ELSE
    EXEC (@ExecutionStatement)`,
      talkThrough: `Within each entity level, a second loop walks every mapped field and appends it onto the running \`INSERT\`, \`SELECT\`, and \`GROUP BY\` clauses being assembled as a string. The same mapping data drives two different outputs depending on the mode: on a first import (\`@UpdateOnlyInd = 0\`) it builds an \`INSERT ... SELECT\` guarded by a \`LEFT JOIN\` back to the destination table with a \`WHERE ... IS NULL\`, so only genuinely new rows go in; on a re-run against already-imported data (\`@UpdateOnlyInd = 1\`) the same mapping instead builds an \`UPDATE ... SET\` for whichever fields are flagged to participate in updates.

Every call also takes an \`@IsDebugInd\` flag. Turned on, the procedure still builds the full dynamic SQL statement but just \`PRINT\`s it instead of executing it — so a brand-new mapping configuration can be reviewed and sanity-checked before it ever touches a table.

**A worked example** *(illustrative only — a stand-in to show how the mapping table works, not a reconstruction of the actual historical import files)*:

Say a raw import file lands one row per person, with that person's qualifications flattened onto repeating columns on the same row:

| Raw file column | Maps to |
| --- | --- |
| \`PersonName\` | \`Person.Name\` |
| \`PersonDOB\` | \`Person.DateOfBirth\` |
| \`QualificationTitle\` | \`PersonQualification.Title\` |
| \`QualificationYear\` | \`PersonQualification.YearAwarded\` |

The mapping rows for this file would declare \`Person\` as the root entity (no \`ParentEntityName\`), and \`PersonQualification\` as a child of \`Person\`, linked through a generated \`PersonId\`. The procedure processes \`Person\` first; on its next pass it finds \`PersonQualification\` (its parent, \`Person\`, has now been handled), joins back to the just-inserted person row, and inserts the qualification against it.

A deeper import — say \`Person\` → \`Address\` → \`AddressHistory\` — works the same way, just with one more pass of the outer loop: \`Address\` waits for \`Person\`, and \`AddressHistory\` waits for \`Address\`, each joining back to its own immediate parent rather than straight to the root.

One procedure replaced a growing pile of near-duplicate, bespoke import scripts — a new import type became a mapping-table change rather than a new script to write, test, and maintain.`,
    },
  ],
}

export default project
