---
name: patterns
description: Finds whether a relevant code pattern/template already exists in .claude/patterns/ before writing new code, and routes to reading an existing one or creating a new one. Use before implementing any new page, component, or similar recurring piece of code.
---

# Patterns

Keeps new code consistent with how this codebase already does things, via a
library of reusable patterns/templates in `.claude/patterns/*.md`.

## Finding a relevant pattern

Before writing new code for something that looks like it repeats a shape
already used elsewhere in the project (a page, a component, a data entry,
etc.), check `.claude/patterns/` for a file whose name or description
matches what's being built. This lookup is cheap — do it before deciding
between the two paths below.

- **A matching pattern exists** → load `references/reading.md` for how to
  apply it.
- **No matching pattern exists** → load `references/creating.md` to decide
  whether this is worth turning into a new pattern, or is a one-off.

`.claude/patterns/` starts empty — the first pattern gets added the first
time `coding` needs one and none exists yet.

## What this skill does not do

- It doesn't write the code itself — `coding` does, using whatever this
  skill hands back.
- It doesn't decide project conventions unrelated to reusable shape (that's
  `CLAUDE.md`, via `ai-docs`).
