# Decision: Snippet tabs to mirror the real UI's tab bar

## Context
This project's real detail page is itself a 5-tab UI (Summary / Overview /
Skills / Education / Career Tracks), each tab backed by its own component
file. The default write-up shape (a flat list of `snippets`, as used by
`normalise-import-data`) would have listed those 5 files one after another
with no visual link to the tabbed UI the screenshot already shows — losing
the one-tab-per-file structure that's the interesting part of how this
feature was built.

## Options considered
- **Flat list, all 8 snippets together** (matches every other project so
  far). Simplest, but buries the 5 tab-file snippets among the other 3
  (page composition, chart, favourite hook), with no indication they map
  1:1 onto the product's own tabs.
- **Flat list, but only 1 representative tab file** instead of all 5.
  Shorter, but drops 4 of the 5 tabs' code entirely and still doesn't
  mirror the UI.
- **Split display: 3 snippets as the normal flat list, the other 5 behind
  a tab switcher matching the real tab bar's labels** — chosen, at the
  user's explicit direction, so interacting with the code display mirrors
  interacting with the screenshotted UI.

## Decision
- `HighlightedProject` (`src/data/projects/types.ts`) gains an optional
  `tabbedSnippets?: CodeSnippet[]` field alongside the existing `snippets`
  field. Optional and additive — no other project sets it.
- Two new shared components (documented as a pattern,
  `.claude/patterns/snippet-tabs.md`):
  - `CodeSnippetView` — renders one `CodeSnippet`'s talk-through + code,
    factored out of `ProjectDetail.tsx`'s inline snippet markup so the
    flat list and the new tab switcher render through the same code.
  - `SnippetTabs` — a tab switcher over `CodeSnippet[]`, using each
    snippet's own `label` as its tab header text.
- `career-website-section`'s `ProjectDetail.tsx` renders the flat 3
  (`CareerDetailsPage`, `CareerMatchGraphs`, `useFavourites`) as before,
  then `<SnippetTabs snippets={project.tabbedSnippets} />` for the 5
  tab-file snippets underneath.

## Why
The screenshot on this page already shows the real app's own tab bar. A
reader can click through Summary → Career Tracks in the code display the
same way they'd click through the tabs in the screenshotted product,
rather than scrolling past 5 flatly-listed files to find the one that
matches what they're looking at.

## Consequences
- `types.ts` and the shared `ProjectDetail.tsx` boilerplate now support an
  optional tabbed section that only this project currently uses — a
  future project whose code splits the same way (mirrors a tabbed UI) can
  reuse `tabbedSnippets` + `SnippetTabs` directly; one that doesn't just
  omits the field, same as `screenshots` today.
- Two extra small components to maintain (`CodeSnippetView`,
  `SnippetTabs`) instead of the snippet-rendering markup living inline in
  each `ProjectDetail.tsx` — a net simplification once more than one
  project needs it, since the highlighter styling now lives in one place.

## Changes forced by later work
none
