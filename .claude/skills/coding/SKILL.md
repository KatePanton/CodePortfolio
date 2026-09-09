---
name: coding
description: General-purpose implementation skill for this project. Entered by naming a specific task ID, or by asking to work "the next task" (resolved from tasks/README.md). Reads task context, CLAUDE.md, and relevant patterns before writing code, and keeps the task board updated as work proceeds. Use whenever picking up or continuing task-board work.
---

# Coding

The general-purpose skill for actually doing task-board work in this repo.

## Entering this skill

- **Named task**: given a task ID (e.g. "work on 0007"), go straight to that
  task's `tasks/NNNN_stub/task.md`.
- **"Next task"**: read `tasks/README.md` and pick the lowest-numbered
  `todo` task that isn't already `in-progress`. Skipping in-progress tasks
  is what lets this run concurrently — in the same agent working multiple
  tasks, or in separate agents/sessions — without two runs grabbing the same
  task.

Mark the task `in-progress` (in both its own `task.md` and its
`tasks/README.md` row) before starting work on it — via `task-management`.

## Before writing code

1. **Create the task's branch off up-to-date `origin/main` first** — before
   reading anything into an edit, and before any plan-mode/exploration work
   turns into real file changes:

   ```
   git fetch origin
   git checkout -b task/NNNN-stub origin/main --no-track
   ```

   `--no-track` matters: `git checkout -b <branch> origin/main` without it
   sets the new branch's upstream to `origin/main` itself. A later plain
   `git push` then pushes straight onto `main`, skipping review entirely —
   this actually happened on task 0018. With `--no-track`, there's no
   upstream yet, so the first push must be an explicit
   `git push -u origin task/NNNN-stub`, which creates the branch on the
   remote instead of fast-forwarding main.

   Don't just keep whatever branch happens to be checked out already (it
   may be a stale branch left over from a prior task) — always branch fresh
   off `origin/main`.
2. Read the task's `task.md` in full — Summary, any linked `Decision doc`,
   and its `Patterns` field.
3. Read root `CLAUDE.md` for project conventions (via `ai-docs`).
4. Check `.claude/patterns/` via the `patterns` skill for a template to
   follow. If the task's `Patterns` field already names one, use it; if not
   and one turns out to be relevant, follow `patterns`' lookup flow.

## While working

- If a real decision comes up mid-task (not just executing a known plan),
  create/update the task's `decision.md` via `task-management` as you go —
  don't leave it to reconstruct afterward.
- If a new reusable pattern gets introduced, follow `patterns`'
  `references/creating.md` and note it in the task's `Patterns` field.
- Capture screenshots for the "screen per plan implemented" portfolio
  section into the task's own `screenshots/` folder as the work reaches
  visible milestones.

## Finishing

Fill in the task's `Outcome`, set status to `done` (`task.md` and
`tasks/README.md`, via `task-management`), and stop — this skill doesn't
open or merge PRs; that's a separate step outside its scope.

## What this skill does not do

- It doesn't create or renumber tasks — that's `task-management`.
- It creates the task's own branch (see step 1 above) but goes no further
  on git/PR workflow — it doesn't push, open, or merge a PR. Task
  completion here means the task board is updated and the work is
  committed on its branch, not that a PR has been opened or merged.
