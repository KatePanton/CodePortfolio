# Decision: Parse the skills README table, don't glob-and-filter

## Context
`.claude/skills/README.md` is the curated index of which skills are
"portfolio content" — it explicitly excludes the third-party imported
skills (`grill-me`, `grilling`, `codebase-design`, `domain-modeling`,
`improve-codebase-architecture`), which are junctioned into
`.claude/skills/` too (task 0007) so Claude Code can discover them, but
aren't meant to appear here. Checked whether `disable-model-invocation:
true` in frontmatter could distinguish them automatically — it can't:
`grilling`, `codebase-design`, and `domain-modeling` don't set that flag
even though they're third-party, so it's not a reliable signal.

## Options considered
1. **Glob `.claude/skills/*/SKILL.md` directly** (mirroring `tasks.ts`),
   then filter out a hardcoded exclude-list of third-party skill names.
2. **Parse `.claude/skills/README.md`'s own table** for the name/
   description/task-id list, then look up each name's full `SKILL.md`
   body from a glob for the "full details" expand.

## Decision
Option 2 — `src/data/skills.ts` parses the README table with a regex
matching its fixed row format, then cross-references each name against a
separate glob of all `SKILL.md` files to pull in the full body text.

## Why
The README's own header states its purpose directly: "will eventually
back a dedicated page on the site." It's the actual maintained source of
truth for "which skills are portfolio-facing," not just documentation
describing one — `skill-creation` is the thing that adds rows to it. A
hardcoded exclude-list (option 1) would silently go stale the next time a
third-party skill gets imported (as already happened once, per task 0007)
and nobody remembers to update the list in `skills.ts`.

## Consequences
- `src/data/skills.ts` depends on the README table's exact markdown
  format (`| [name](path) | description | [taskId](path) |`). If that
  format changes, the parser needs updating — a coupling worth knowing
  about, though the format is simple and has one clear owner
  (`skill-creation`).
- Hit an unrelated but real bug getting the glob working at all:
  `import.meta.glob` excludes hidden directories (`.claude/`, `.github/`)
  by default and needs `exhaustive: true` to see inside them — undocumented
  behavior discovered by the page rendering with zero skills until this
  was set. `src/data/tasks.ts` never hit this since `tasks/` isn't hidden.
- Also found and fixed a separate bug while wiring up the "Built in task
  NNNN" deep-links: React Router doesn't auto-scroll to a URL hash for a
  lazy-loaded route by default. Fixed with a `useEffect` +
  `document.getElementById(...).scrollIntoView()` in `Process.tsx`.

## Changes forced by later work
none
