---
id: 0017
title: Career Website Section project write-up
type: project-writeup
status: done
---

## Summary
Fill in the real content for the highlighted "Career Website Section"
project (`src/data/projects/highlighted/career-website-section.ts`),
replacing every `TODO:` placeholder per its entry in task 0014's
[content-checklist.md](../0014_determine-projects-and-content/content-checklist.md):
generic project name, 4-5 sentence blurb, tech stack (if remembered),
screenshot(s) (optional — add to `public/projects/career-website-section/`),
code snippet(s), and a talk-through narrative.

Hard constraint carried over from task 0014: no real employer or product
name anywhere — generic descriptors only.

## Decision doc
[decision.md](decision.md) — snippet tabs to mirror the real UI's tab bar

## Patterns
New: `snippet-tabs` (`.claude/patterns/snippet-tabs.md`) — `CodeSnippetView` +
`SnippetTabs`, a tab-switcher display for a `HighlightedProject`'s code
snippets, for projects whose code splits the same way a tabbed UI does.

## Screenshots
See screenshots/ in this folder.

## Outcome
Filled in `career-website-section.ts` (name, frontend-only tech stack,
blurb, problem, one screenshot, 3 flat snippets + 5 tabbed snippets) and
built its `ProjectDetail.tsx` page + route, following the per-project-page
convention from task 0018.

The 5 `CareerDetailTabs` files (Summary/Overview/Skills/Education/Career
Tracks) are shown behind a new tab switcher rather than as a flat list, at
the user's direction, so browsing the code mirrors browsing the
screenshotted product's own tabs — see [decision.md](decision.md). Two
small shared components came out of that (`CodeSnippetView`,
`SnippetTabs`), documented as a new pattern.

Two redactions were needed before the source code could go in the
write-up: a `<yc-rich-text-block>` custom element (the `yc-` prefix traced
to the real internal design-system package name) genericized to
`<rich-text-block>`, and an internal ticket reference
(`CU-869a0uzjx`) dropped from the `CareerTracksTab` stub.

Follow-up once screenshots per tab arrived: `CodeSnippet` gained an
optional `screenshot?: ProjectScreenshot` field, rendered by
`CodeSnippetView` between the talk-through and the code block. Each of
the 4 tabbed snippets with a matching screenshot (Summary, Overview,
Skills, Education) now shows talk-through → screenshot → code; Career
Tracks has none, since that tab is an unbuilt stub with no UI to
screenshot. Verified with `npm run build` and in the dev server — each
tab correctly swaps in its own screenshot alongside its code, and the
page links correctly from `/projects`.

## Changes forced by later work
none
