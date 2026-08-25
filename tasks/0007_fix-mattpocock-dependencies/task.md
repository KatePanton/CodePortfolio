---
id: 0007
title: Fix mattpocock skill dependencies
type: skill
status: done
---

## Summary
`/grill-me` was broken. `.claude/skills/grill-me` is a symlink (Windows
junction) into `.agents/skills/grill-me`, whose `SKILL.md` body just says
`Call the Skill tool with "grilling"` — but no skill named `grilling`
existed anywhere in the project.

`skills-lock.json` shows `grill-me` and `improve-codebase-architecture` were
both imported from GitHub repo `mattpocock/skills`. Checking that repo's
tree confirmed it also contains three more skills that these two depend on
but that were never imported:
- `skills/productivity/grilling` — depended on by `grill-me` directly, and
  by `improve-codebase-architecture`'s grilling-loop step.
- `skills/engineering/codebase-design` — depended on by
  `improve-codebase-architecture` for its deep-module vocabulary.
- `skills/engineering/domain-modeling` — depended on by
  `improve-codebase-architecture` for its `CONTEXT.md`/ADR side effects.

All three come from the same package and were missing for the same reason
(the import step didn't resolve transitive dependencies), so this one task
covers all three as subtasks rather than splitting into separate task IDs:

- [x] Import `grilling` from `mattpocock/skills` into
      `.agents/skills/grilling/`, junction it into `.claude/skills/grilling/`,
      add its `skills-lock.json` entry. Unblocks `/grill-me`.
- [x] Import `codebase-design` the same way. Unblocks part of
      `improve-codebase-architecture`.
- [x] Import `domain-modeling` the same way. Unblocks the rest of
      `improve-codebase-architecture`.
- [x] Verify `/grill-me` runs end-to-end.

## Decision doc
[decision.md](decision.md)

## Patterns
None yet — this is the first task re-importing skills from a locked
third-party source; the pattern (fetch from the GitHub path recorded in
`skills-lock.json`, mirror into `.agents/skills/<name>/`, junction into
`.claude/skills/<name>/`, add a lock entry) is worth checking against
`.claude/patterns/` if this recurs.

## Screenshots
See screenshots/ in this folder.

## Outcome
Found (via `skills-lock.json`) that `grill-me` and `improve-codebase-architecture`
were both vendored from `mattpocock/skills` on GitHub, and that repo's tree
confirmed three more skills they depend on — `grilling`, `codebase-design`,
`domain-modeling` — were never imported. Fetched all three from the same
pinned source and mirrored them into `.agents/skills/<name>/`, junctioned
into `.claude/skills/<name>/` (matching the existing pattern), and added
lock entries for each. Verified by invoking the `grilling` skill directly
(the same call `/grill-me` makes) — it now resolves and loads correctly.
`improve-codebase-architecture` is also unblocked as a side effect, since it
depended on the same three skills. See [decision.md](decision.md).