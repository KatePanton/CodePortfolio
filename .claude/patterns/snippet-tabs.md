# Snippet tabs

## When to use it

Any time a highlighted project's code naturally splits into the same
sections the *product* being described is tabbed into — so the write-up
can mirror that UI rather than flattening everything into one long list.
Introduced in task 0017 for the Career Website Section write-up, whose
real detail page has 5 tabs (Summary/Overview/Skills/Education/Career
Tracks), each backed by its own component — showing all 5 as a flat list
would bury the one-tab-per-file structure the screenshot already shows.

## The shape

Two components, both content-agnostic and styled with a CSS Module (see
[css-modules-styling.md](css-modules-styling.md)):

```
src/components/CodeSnippetView/CodeSnippetView.tsx   — renders one CodeSnippet (label, talk-through, syntax-highlighted code)
src/components/SnippetTabs/SnippetTabs.tsx           — a tab switcher over CodeSnippet[], rendering the active one via CodeSnippetView
```

`CodeSnippetView` is the piece `ProjectDetail.tsx` already needed for its
flat snippet list — factored out so the highlighter markup lives in one
place, reused by both the flat list and `SnippetTabs`. It renders, in
order: talk-through, an optional per-snippet `screenshot` (a
`CodeSnippet.screenshot?: ProjectScreenshot`, shown right below the
talk-through when a tab's own UI has a matching screenshot), then the
syntax-highlighted code:

```tsx
{project.snippets.map((snippet, index) => (
  <CodeSnippetView key={`${snippet.label}-${index}`} snippet={snippet} />
))}

{project.tabbedSnippets && <SnippetTabs snippets={project.tabbedSnippets} />}
```

`SnippetTabs` holds `activeIndex` in local `useState`, renders a
`role="tablist"` row of buttons — one per `snippet.label`, doubling as the
tab's visible header text — and the active snippet via
`<CodeSnippetView snippet={active} showLabel={false} />` (the tab header
already shows the label, so it isn't repeated as a heading).

`HighlightedProject.tabbedSnippets?: CodeSnippet[]` (in
[types.ts](../../src/data/projects/types.ts)) is optional and additive —
a project that doesn't set it just doesn't render this section.

## What varies

- The `snippets` array itself — count and content, same as the flat
  `snippets` field.
- Whether a project uses `tabbedSnippets` at all — most projects' code
  doesn't map onto tabs in the product UI, and should just use the flat
  `snippets` list as before.

## What it doesn't cover

- Deep-linking to a specific open tab via URL — state is local and resets
  on remount, same as [expandable-disclosure.md](expandable-disclosure.md).
- Keyboard arrow-key navigation between tabs (only click/Enter via the
  native `<button>`) — a deliberate scope cut for a personal portfolio
  site's code display, not a full ARIA tabs widget.
