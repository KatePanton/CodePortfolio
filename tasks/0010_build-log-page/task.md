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
+ dot markers) is hand-rolled with plain Tailwind — `react-chrono` was
evaluated and dropped before this task started building; see task 0009's
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
Added [expandable-disclosure.md](../../.claude/patterns/expandable-disclosure.md)
to `.claude/patterns/` — `Disclosure` is a generic, content-agnostic
expand/collapse primitive, used 8 times on this page alone, so it was
worth cataloging for reuse elsewhere (e.g. an About-page FAQ or collapsible
sections on `ProjectDetail`). `TimelineCard` is the domain-specific
composition that uses it; badges are inlined directly rather than
componentized, since nothing else in the codebase extracts that shape
either.

## Screenshots
See screenshots/ in this folder.

## Outcome
Built `src/data/tasks.ts` (build-time `import.meta.glob` loader + hand-rolled
frontmatter/section parser — normalizes CRLF line endings, since the
regex-based parser initially failed against this repo's Windows line
endings), `src/components/Markdown.tsx` (`react-markdown` + `remark-gfm`
wrapper matching site typography), `src/components/Disclosure.tsx` (new
reusable pattern, see below), `src/components/TimelineCard.tsx`, and
`src/pages/Process.tsx` (hand-rolled vertical connector line + dot markers).
Added the `/process` route (lazy-loaded) and a "Build Log" nav link.

Verified in the dev server: all 10 tasks render in oldest-to-newest order,
GFM task-list checkboxes render correctly (tasks 0007/0009), expand/collapse
works and correctly reveals Outcome plus decision-doc content only for the
three tasks that have one (0001/0007/0008), no console errors. `npm run
build` succeeds with `Process` code-split into its own ~52KB gzipped chunk.
Could not capture an actual screenshot in this environment (headless
browser pane), so visual/dark-mode appearance is unverified beyond
following the site's existing `dark:` Tailwind conventions throughout.

## Changes forced by later work
none