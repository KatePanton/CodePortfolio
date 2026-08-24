# Decision: Task board & skill foundation layout

## Context
This repo is a portfolio site that also documents its own agentic-coding
process as portfolio content ("how this project was created"). That meant
designing the task-tracking and skill tooling before any feature work, so
that working through tasks naturally produces the artifacts the portfolio
will later display (decisions, skill files, screenshots). This was worked
out in a dedicated planning session before any of it was built.

## Options considered
- **Task file shape**: a single flat `tasks/NNNN_name.md` vs. a folder per
  task holding task.md + decision.md + screenshots/. Flat files are simpler,
  but the portfolio needs a "screenshot per plan implemented" and optional
  decision docs/diagrams per task — a folder was the only way to keep all of
  a task's artifacts together without scattering them across parallel trees.
- **Decision docs**: a separate top-level `tasks/decisions/` tree (mirrors
  common ADR conventions) vs. co-located inside each task's own folder.
  Co-located was chosen so everything about one task — including any
  diagrams produced while deciding something — lives in exactly one place.
- **Task numbering**: one global sequential counter vs. per-category
  counters (skills/, projects/, site/). Global was chosen: it's simpler and
  gives one chronological history of the whole project, which is exactly
  what the "planning of work, not vibe coding" portfolio section wants to
  show.
- **Skill location**: `.claude/skills/` (Claude Code's standard
  auto-discovery path) vs. reusing `.agents/skills/` (where the imported
  grill-me / improve-codebase-architecture skills already live). `.claude/`
  was chosen to keep project-authored skills separate from the third-party
  skill cache.
- **ai-docs scope**: broad ADR/decision-record system vs. narrowly
  `CLAUDE.md` maintenance. Narrowed to `CLAUDE.md` (root-only for now) —
  decision-record-style content is instead handled per-task via
  `decision.md`, so ai-docs doesn't duplicate that role.
- **patterns skill shape**: a single undifferentiated skill vs. one with
  explicit reading/creating reference docs. Split into
  `references/reading.md` and `references/creating.md` under a shared
  `SKILL.md` that does the "does a relevant pattern already exist" lookup,
  so the two very different jobs (apply vs. author a pattern) don't blur
  together in one prompt.
- **Bootstrap order**: build `task-management` first (it's the thing that
  creates tasks) vs. build `skill-creation` first. `task-management` can't
  log its own creation, and neither can `skill-creation` without a board to
  log into — resolved by hand-building `skill-creation` first, then
  `task-management`, then using `task-management` to backfill/confirm the
  entries for both and spawn the rest.

## Decision
- Tasks: `tasks/NNNN_stub/` folders (4-digit, global, sequential), each
  holding `task.md`, an optional `decision.md`, and `screenshots/`.
- `tasks/README.md` is the single index; only the `task-management` skill
  writes to it.
- Skills: `.claude/skills/<name>/SKILL.md`, indexed in
  `.claude/skills/README.md` (added in task 0002).
- `ai-docs` maintains root-only `CLAUDE.md`.
- `patterns` skill: shared lookup logic in `SKILL.md`, routing to
  `references/reading.md` / `references/creating.md`, backing library in
  `.claude/patterns/*.md`.
- `task-management` is the sole task-creation entry point, folds in the
  existing `grill-me` skill to sharpen a task's definition before it's
  finalized, and checks whether a request should be split into multiple
  tasks before creating one.
- `coding` is entered either by a named task ID or "next task" (resolved via
  `tasks/README.md`, skipping anything already `in-progress`), and is
  designed to support multiple tasks in flight across agents/sessions.
- Bootstrap order: `skill-creation` (0002) built by hand, then
  `task-management` (0003) built using it and used to backfill the board and
  create tasks for the remaining skills.
- Every previous-project write-up and every skill also gets a task —
  everything on the board is one history, nothing is tracked ad hoc.
- Execution happens one task at a time, each on its own branch with its own
  PR for review before the next task starts.

## Consequences
- Every future task pays a small fixed cost (creating a folder, not just a
  file) in exchange for having decisions/diagrams/screenshots co-located —
  worth it given the portfolio depends on those artifacts existing per task.
- `CLAUDE.md` being root-only means it will need revisiting once the
  codebase grows enough that a single file stops being enough context —
  that's an explicit future decision, not an oversight.
- The `patterns/` library starts empty; nothing is seeded yet — the first
  real patterns get added the first time the `coding` skill needs one and
  none exists.
- Because `skill-creation` had to be built before `task-management` existed,
  its own task entry (0002) is written after the fact rather than created
  through the normal flow — that's expected and doesn't need to be "fixed."
