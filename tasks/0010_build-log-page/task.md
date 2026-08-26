---
id: 0010
title: Build Log page (/process)
type: site-build
status: done
---

## Summary
Build a new page at route `/process`, nav label "Build Log", presenting a
vertical timeline documenting every task on the board, sourced live from
`tasks/*/task.md` and `tasks/*/decision.md` via build-time
`import.meta.glob` loading (no hand-duplicated data) with a small
hand-rolled frontmatter/section parser. The timeline shell (connector line
+ dot markers) is hand-rolled (`react-chrono` was evaluated and dropped
before this task started building; see task 0009's decision doc), styled
with CSS Modules rather than inline Tailwind classes — see this task's own
decision doc.

Each task renders as a card, collapsed by default: id, title, type/status
badges, rendered `Summary` (via `react-markdown` + `remark-gfm`). An expand
toggle (a new reusable `Disclosure` component) reveals `Outcome`, plus —
only when present for that task — its decision doc sections and
screenshots. Currently only tasks 0001/0007/0008 have a decision doc; no
task has real screenshots yet.

Order: oldest to newest, 0001 at the top.

New files: `src/data/tasks.ts`, `src/components/Markdown.tsx`,
`src/components/Disclosure.tsx`, `src/components/TimelineCard.tsx`,
`src/pages/Process.tsx`. Route added to `src/App.tsx` via the existing
lazy/Suspense pattern (like `ProjectDetail`). Nav link added to
`src/components/Layout.tsx`.

Depends on task 0009 (dependencies) being done first.

## Decision doc
[decision.md](decision.md)

## Patterns
Added two to `.claude/patterns/`:
- [expandable-disclosure.md](../../.claude/patterns/expandable-disclosure.md) —
  `Disclosure` is a generic, content-agnostic expand/collapse primitive,
  used 8 times on this page alone, worth cataloging for reuse elsewhere
  (e.g. an About-page FAQ or collapsible sections on `ProjectDetail`).
  `TimelineCard` is the domain-specific composition that uses it; badges
  are inlined directly rather than componentized, since nothing else in
  the codebase extracts that shape either.
- [css-modules-styling.md](../../.claude/patterns/css-modules-styling.md) —
  the CSS Modules + shared color-token approach used by all of this task's
  new components, for any future new component to follow (existing
  Tailwind-styled pages are explicitly out of scope for conversion).

## Screenshots
See screenshots/ in this folder.

## Outcome
Built `src/data/tasks.ts` (build-time `import.meta.glob` loader + hand-rolled
frontmatter/section parser — needed `import: 'default'` alongside
`query: '?raw'` to actually unwrap to a string at runtime, and normalizes
CRLF line endings since this repo's files use Windows line endings),
`src/components/Markdown.tsx`, `src/components/Disclosure.tsx`,
`src/components/TimelineCard.tsx`, and `src/pages/Process.tsx`. Added the
`/process` route (lazy-loaded) and a "Build Log" nav link. All five
components style via CSS Modules (`*.module.css`) against shared color
tokens in `src/index.css`, not inline Tailwind classes — see decision doc.

Verified in the dev server: all 10 tasks render in oldest-to-newest order,
GFM task-list checkboxes render correctly (tasks 0007/0009), expand/collapse
works and correctly reveals Outcome plus decision-doc content only for the
three tasks that have one (0001/0007/0008), no console errors. Confirmed
CSS custom properties resolve to the correct light *and* dark values via
`getComputedStyle` under both `prefers-color-scheme` states. `npm run
build` succeeds, with `Process`'s CSS correctly code-split into its own
chunk alongside its JS. Could not capture an actual pixel screenshot in
this environment (headless browser pane), so final visual polish is
unverified beyond the computed-style checks above.

## Changes forced by later work
none