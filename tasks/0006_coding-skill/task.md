---
id: 0006
title: Coding skill
type: skill
status: done
---

## Summary
Build .claude/skills/coding/SKILL.md: the general-purpose implementation
skill, entered either by a named task ID or "work the next task" (resolved
via tasks/README.md, skipping anything already in-progress). Reads the task
file, root CLAUDE.md, and relevant patterns before writing code; updates the
task's status/decision doc as it goes. Must support multiple tasks in
flight concurrently, whether interleaved in one agent or split across
separate agents/sessions. Register in .claude/skills/README.md per the
skill-creation checklist (see task 0002).

## Decision doc
none

## Patterns
None yet (depends on task 0005 existing first, though can be built in any
order since it only needs to know patterns/ conventions).

## Screenshots
See screenshots/ in this folder.

## Outcome
Created .claude/skills/coding/SKILL.md and registered it in
.claude/skills/README.md. This is the last of the six tasks from the
original foundation plan (0001-0006) — all now done.
