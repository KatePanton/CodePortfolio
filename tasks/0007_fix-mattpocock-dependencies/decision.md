# Decision: Re-import missing skills from the pinned mattpocock/skills source

## Context
`/grill-me` failed because its `SKILL.md` calls a skill named `grilling`
that didn't exist in the project. `skills-lock.json` records that
`grill-me` and `improve-codebase-architecture` were both vendored from
GitHub repo `mattpocock/skills`, pinned by a `computedHash` per skill.
Checking that repo's tree turned up three more skills — `grilling`,
`codebase-design`, `domain-modeling` — that the two vendored skills
reference internally but that were never imported.

## Options considered
1. **Author local replacements from scratch**, matching what `grill-me` and
   `improve-codebase-architecture` seem to expect.
2. **Re-import the real files from the same pinned source**
   (`mattpocock/skills` on GitHub), at the exact paths the existing two
   skills already imply (`skills/productivity/grilling`,
   `skills/engineering/codebase-design`,
   `skills/engineering/domain-modeling`).
3. **Strip the dependency**: rewrite `grill-me`'s body to inline a simpler
   interview mechanic instead of calling out to `grilling`.

## Decision
Option 2 — fetched the real files from `mattpocock/skills` and mirrored
them into `.agents/skills/<name>/`, junctioned into `.claude/skills/<name>/`
(matching the existing pattern for `grill-me`/`improve-codebase-architecture`),
and added lock entries for all three in `skills-lock.json`.

## Why
This is a vendoring/import problem, not a design problem — the correct
"grilling" skill already exists upstream and is the thing `grill-me` was
written against. Authoring a local guess (option 1) risked drifting from
what `improve-codebase-architecture` also expects, since it depends on the
same `grilling` skill plus `codebase-design` and `domain-modeling`. All
three were missing for the identical reason (the original import only
pulled the top-level command skills, not their transitive dependencies), so
fixing the import mechanism properly for all three in one pass was more
correct than patching around the symptom in `grill-me` alone (option 3),
which would leave `improve-codebase-architecture` still broken.

## Consequences
- `/grill-me` now resolves correctly.
- `improve-codebase-architecture` is also now fully unblocked (previously
  it was missing all three of its dependencies; this task happened to fix
  all of them).
- The `computedHash` values in `skills-lock.json` for the three new entries
  are a plain `sha256` of each skill's `SKILL.md` content — this doesn't
  match whatever algorithm produced the two pre-existing hashes (verified:
  neither a single-file nor whole-directory sha256 of the existing
  `grill-me` files reproduces its recorded hash), so the original hashing
  method is unknown/unverified. Not a blocker: nothing in this repo
  currently validates these hashes automatically, they're provenance
  documentation only.
