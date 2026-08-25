---
name: ai-docs
description: Creates and maintains the root CLAUDE.md context file, and reads it before starting other work. Use when CLAUDE.md needs to be created, updated after a structural or process change, or consulted for project conventions.
---

# AI Docs

Owns the root `CLAUDE.md` — the file every session reads automatically for
project context. Root-only for now; nested per-directory `CLAUDE.md` files
are an explicit future decision, not something this skill does yet (see
`tasks/0001_tasks-board-foundation/decision.md`).

## Reading

Before starting other work in this repo, read `CLAUDE.md` if it hasn't
already been loaded. It documents: the task board layout, where skills and
patterns live, and the process conventions (one task/branch/PR, bootstrap
order).

## Writing / updating

Update `CLAUDE.md` whenever a structural or process convention actually
changes — not for routine content. This includes:
- A new skill's location/purpose being added to `.claude/skills/`
- A change to the task board's folder layout or template fields
- A change to the process rules (branching, PR flow)

Keep it short and skimmable — it's read on every session, not a reference
manual. When a change is substantial enough to need its own reasoning, write
that in the relevant task's `decision.md` instead and only land the
conclusion in `CLAUDE.md`.

## What this skill does not do

- It does not write task `decision.md` files — that's `task-management`.
- It does not maintain nested per-directory context files — out of scope
  until that decision is revisited.
