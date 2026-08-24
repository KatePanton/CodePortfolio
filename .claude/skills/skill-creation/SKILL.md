---
name: skill-creation
description: Checklist for authoring a new project skill in .claude/skills/ — naming, frontmatter, folder layout, and registering it in the skill index and task board. Use when creating, renaming, or restructuring a skill for this project.
---

# Skill Creation

Project-specific rules for adding a skill to `.claude/skills/`. This is a
thin wrapper: for the actual craft of writing an effective SKILL.md
(structure, description tuning, when to split into reference files), load
the `skill-creator` skill first. This document only adds what's specific to
this repo.

## Location & naming
- Every project skill lives at `.claude/skills/<kebab-case-name>/SKILL.md`.
- Supporting docs go in `.claude/skills/<name>/references/*.md` — only split
  into references when a skill routes between genuinely different jobs (the
  planned `patterns` skill's `reading.md` / `creating.md` split is the
  model to follow).
- Do not put project skills under `.agents/skills/` — that folder is
  reserved for imported third-party skills (grill-me,
  improve-codebase-architecture) and is a separate mechanism.

## Frontmatter
Minimum required:
```
---
name: <kebab-case-name>
description: <one or two sentences: what it does + when to use it>
---
```
Add `disable-model-invocation: true` only if the skill must run only when a
person explicitly asks for it by name (see `grill-me` in `.agents/skills/`
for the pattern).

## Every new skill must
1. Get a row added to `.claude/skills/README.md` (name, description, link to
   its originating task) — skills are portfolio content, not just internal
   tooling, and this index will eventually back a page on the site.
2. Get a task on the board. Once `task-management` exists, use it. Until
   then (as with this skill, and `task-management` itself), create the
   `tasks/NNNN_stub/` folder by hand against `tasks/_template/`, matching
   what `task-management` would have produced.
3. State clearly in its own description what it does *not* do, when that
   boundary matters (e.g. `ai-docs` maintains `CLAUDE.md` but not task
   decision docs — `task-management` owns those).

## Process for creating a new skill
1. Check `.claude/skills/README.md` first — confirm the skill doesn't
   already exist or overlap with one that does.
2. Load `skill-creator` for the actual authoring mechanics.
3. Write `SKILL.md` (and `references/` if needed) at the location above.
4. Add the row to `.claude/skills/README.md`.
5. Log the task (see "Every new skill must," item 2).
