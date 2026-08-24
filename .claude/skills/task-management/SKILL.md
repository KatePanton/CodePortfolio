---
name: task-management
description: Sole entry point for creating, updating, and listing tasks in tasks/ — sharpens scope via grill-me, decides whether to split a request into multiple tasks, and is the only thing that writes to tasks/README.md. Use when starting new work, checking task status, or figuring out what to work on next.
---

# Task Management

The single driver for the task board. Nothing else creates a
`tasks/NNNN_stub/` folder or edits `tasks/README.md` directly — every change
to the board goes through this skill.

## Creating a task

1. **Sharpen the definition first.** Use `grill-me` to pressure-test scope,
   why, and what "done" looks like. `grill-me` is invocation-restricted
   (`disable-model-invocation: true` — it cannot be called programmatically).
   If the user hasn't already run `/grill-me` themselves, ask them to, or
   fall back to asking clarifying questions directly if they'd rather skip
   it.
2. **Check whether it's really one task.** If the sharpened scope covers
   more than one coherent unit of work (e.g. it touches multiple skills, or
   mixes a build step with a content step), split it into multiple tasks now
   rather than after the fact.
3. **Assign the next ID.** One more than the highest existing `NNNN` in
   `tasks/` — global and sequential across every task type.
4. **Create `tasks/NNNN_stub/`** from `tasks/_template/task.md` (stub is a
   short kebab-case slug of the title). Fill in `id`, `title`, `type`,
   `status: todo`, and `Summary`. Leave `Decision doc`, `Patterns`, and
   `Outcome` for later — `Screenshots` points at the task's own
   `screenshots/` folder.
5. **Add a row to `tasks/README.md`.**

## Updating a task

- Status changes (`todo` → `in-progress` → `done`) happen in both the task's
  own `task.md` frontmatter *and* its row in `tasks/README.md` — keep them
  in sync, always in the same change.
- A `decision.md` gets created in the task's own folder only when the work
  involved a real choice worth recording (not every task needs one) — link
  it from the task's `Decision doc` field when it exists.

## Listing tasks

Read `tasks/README.md` and filter by `Status`. "Next task" means: the
lowest-numbered `todo` task that isn't already `in-progress` elsewhere.
Skipping in-progress tasks is what lets multiple agents/sessions work the
board concurrently without colliding.
