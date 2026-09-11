---
id: 0021
title: Component library viewer
type: site-build
status: done
---

## Summary
Scaffold a new "component library viewer" feature end-to-end, with
`TODO:` placeholders for real content (that's task 0022's job).
Introduced because code snippets on the Worker Type Lifecycle write-up
(task 0016) reference real internal custom web components
(`custom-image-response`, `custom-wt-report`, `custom-wt-lesson`) that
are themselves worth documenting on their own page, not just shown
inline as markup.

- New data domain `src/data/components/`: `types.ts` defines
  `ComponentDoc { slug, tagName, name, description, language, code }`
  (a single `code: string`, not a snippets array). One file per
  component — `custom-image-response.ts`, `custom-wt-report.ts`,
  `custom-wt-lesson.ts` — with `slug`/`tagName` filled in and
  `name`/`description`/`code` as `TODO:` placeholders. Plus `index.ts`
  exporting a `componentsBySlug` lookup, mirroring
  `src/data/projects/highlighted/index.ts`.
- `CodeSnippet` (`src/data/projects/types.ts`) gets a new optional field
  `components?: string[]` (slugs). Wire it onto the Quiz / Report page /
  Lesson snippets in `src/data/projects/highlighted/worker-type-lifecycle.ts`
  (not the "Report layout" snippet, which only passes a component-name
  string, not a literal tag).
- CTA: inline in `src/components/CodeSnippetView/CodeSnippetView.tsx`
  (no new component) — right after the code block, for each slug in
  `snippet.components`, a `<Link to={`/components/${slug}`}>` styled
  with the same Tailwind CTA classes as the "View projects" button in
  `src/pages/Home.tsx`, sized down for inline use. One insertion point
  covers both the flat snippet list and `SnippetTabs` (which delegates
  to `CodeSnippetView`).
- New page `src/pages/Component/ComponentDetail.tsx` + `.module.css` —
  the site's first dynamic route (`/components/:slug` via `useParams`),
  registered lazy in `src/App.tsx`. Looks up `componentsBySlug[slug]`;
  renders the existing `NotFound` page if not found. Layout: back
  button, `<h1>{name}</h1>`, a subheader showing the literal
  `<{tagName}>`, description as a plain paragraph (like
  `project.blurb`), then code via `SyntaxHighlighter`/`oneDark` (same as
  `CodeSnippetView`, for visual consistency).
- Back button: `useNavigate()` + `navigate(-1)` — relies on native
  browser scroll restoration (confirmed no competing scroll-reset code
  exists anywhere in the app). Guard: if `useLocation().key === 'default'`
  (no in-app history, e.g. a shared direct link), render a
  `<Link to="/projects">` fallback instead.

Explicitly out of scope for this task (settled via grill-me): no
`/components` index/listing page, no "used in" backlink from the
component page back to the referencing project/snippet, no top-nav
entry — deep-link-only for now.

## Decision doc
[decision.md](decision.md)

## Patterns
[scroll-restoration.md](../../.claude/patterns/scroll-restoration.md) (new)

## Screenshots
See screenshots/ in this folder.

## Outcome
Built exactly as scoped, plus one mid-task fix (see decision.md):

- `src/data/components/` — `types.ts` (`ComponentDoc`), one file per
  component (`custom-image-response.ts`, `custom-wt-report.ts`,
  `custom-wt-lesson.ts`, each with `slug`/`tagName` filled in and
  `name`/`description`/`code` as `TODO:` placeholders for task 0022),
  and `index.ts` exporting `componentsBySlug`.
- `CodeSnippet.components?: string[]` added to
  `src/data/projects/types.ts`; wired onto the Quiz / Report page /
  Lesson snippets in `worker-type-lifecycle.ts`.
- "View component" CTA added inline (Tailwind, matching `Home.tsx`'s CTA
  style — see decision.md #3) in both
  `src/components/CodeSnippetView/CodeSnippetView.tsx` (the shared
  render point used by `SnippetTabs`, for future snippets elsewhere that
  reference a component) and directly in
  `src/pages/Projects/worker-type-lifecycle/ProjectDetail.tsx` (which
  renders its snippets inline, not via `CodeSnippetView`, matching the
  existing site convention where that component hasn't been retrofitted
  into every project page).
- `src/pages/Component/ComponentDetail.tsx` + `.module.css` — the site's
  first dynamic route, `components/:slug` in `src/App.tsx`. Renders
  `NotFound` for an unknown slug; a back button when there's in-app
  history to go back to, a `<Link to="/projects">` fallback otherwise.
- `src/components/ScrollManager.tsx`, mounted in `Layout.tsx` — see
  decision.md #2 for why the originally-planned plain `navigate(-1)` +
  native scroll restoration didn't actually satisfy "back to exactly
  where you left off," and had to be replaced with this.

Verified in the browser: CTA links appear only under the 3 intended
snippets; each links to the right slug; the component page renders
name/tag/description/code; back-button round trip restores the exact
prior scroll position (tested by scrolling to a specific offset,
following a link, and confirming the returned `window.scrollY` matched
exactly); a direct link with no in-app history shows the "Back to
projects" fallback instead of a back button; an unknown slug renders the
site's existing `NotFound` page.

## Changes forced by later work
none
