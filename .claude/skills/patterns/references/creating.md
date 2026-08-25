# Creating a pattern

## When it's worth creating

Create a new pattern when the shape being built is likely to repeat — a
third page, a second use of an unusual component structure, a data-entry
format other content will follow. Don't create one for a genuine one-off;
three similar lines of *unique* code is fine, a premature template is not.

## What to document

A pattern file (`.claude/patterns/<name>.md`) should cover:

- **When to use it** — what kind of new code this template is for
- **The shape** — the file/folder layout and structure to follow, with a
  minimal representative example
- **What varies** — which parts change per use vs. what stays fixed
- **What it explicitly doesn't cover** — edge cases or variations that need
  a different approach entirely

Keep it as short as the shape allows — a pattern file is a template to copy
from, not a tutorial.

## After creating one

Note it in the task's `task.md` (the `Patterns` field), so the task record
shows a new pattern was introduced and why.
