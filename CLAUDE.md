# CodePortfolio

A personal code portfolio (Vite + React Router + Tailwind + TypeScript) that
also documents its own agentic-coding process as portfolio content. See
tasks/0001_tasks-board-foundation/decision.md for the full reasoning behind
the conventions below.

## Task board

- Every unit of work is a task in `tasks/`, folder-per-task:
  `tasks/NNNN_stub/` (4-digit, global, sequential across all task types —
  skill work, site build, project write-ups).
- Each task folder holds `task.md` (always), an optional `decision.md` for
  choices worth recording (including any diagrams, co-located in the same
  folder), and a `screenshots/` folder for the portfolio's
  "screen per plan implemented" section.
- `tasks/README.md` is the single index of every task and its status
  (`todo` / `in-progress` / `done`). Only the `task-management` skill writes
  to it.
- Templates live in `tasks/_template/`.

## Skills

- Project-authored skills live in `.claude/skills/<name>/SKILL.md`, indexed
  in `.claude/skills/README.md` (skills are portfolio content, discoverable
  from a future portfolio page built off that index).
- Imported third-party skills (grill-me, improve-codebase-architecture) stay
  in `.agents/skills/` — a separate mechanism, untouched by the above.
- Bootstrap order: `skill-creation` exists before `task-management` (it's
  needed to build any skill at all, `task-management` included).

## Working a task

- `task-management` is the only thing that creates a task folder or edits
  `tasks/README.md`. It uses `grill-me` to sharpen a task's definition
  before finalizing it, and checks whether a request should be split into
  multiple tasks first.
- `coding` is entered either with a specific task ID, or "work the next
  task," which it resolves from `tasks/README.md` (skipping anything already
  `in-progress`). Multiple tasks can be worked concurrently across
  agents/sessions.
- Before writing code, check `.claude/patterns/` via the `patterns` skill
  for an existing template to follow; if none exists, use its
  `references/creating.md` guidance to decide whether a new one is worth
  adding.

## Process

- One task, one branch, one PR — reviewed before the next task starts.
- `CLAUDE.md` is root-only for now (no nested per-directory context files).
