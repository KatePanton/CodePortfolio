---
id: 0019
title: Affordability Assessment project write-up
type: project-writeup
status: done
---

## Summary
Fill in the real content for the highlighted "Affordability Assessment"
project (`src/data/projects/highlighted/affordability-assessment.ts`),
replacing every `TODO:` placeholder per its entry in task 0014's
[content-checklist.md](../0014_determine-projects-and-content/content-checklist.md):
generic project name, 4-5 sentence blurb, tech stack (if remembered),
screenshot(s) (optional — add to
`public/projects/affordability-assessment/`), frontend + backend code
snippets, and a talk-through narrative.

Hard constraint carried over from task 0014: no real employer or product
name anywhere — generic descriptors only.

## Decision doc
none

## Patterns
[screenshot-gallery.md](../../.claude/patterns/screenshot-gallery.md) (new)

## Screenshots
See screenshots/ in this folder.

## Outcome
Filled in `src/data/projects/highlighted/affordability-assessment.ts`: a
generic name ("Dynamic Affordability Assessment Workflow"), a short blurb,
a `problem` paragraph covering the 100%-dynamic-on-all-3-levels
requirement and the cross-microservice field mapping, a `techStack`, 4
screenshots, and 5 code snippets — one per source file the site owner
supplied (Controller / command handler / repository / view model /
component), in that order, matching the API → logic → database → frontend
functionality → frontend UI layering. Each snippet carries its own
talk-through.

The source code used a real, identifiable third-party framework ("Neo" /
`@singularsystems/*`) throughout — unlike the already-anonymized
`ProductName.*` C# namespaces. Per the hard "no real employer/product
name" constraint, every occurrence was renamed to a generic placeholder
(imports, decorators, base-class namespaces, the `Neo` JSX namespace
alias): `@singularsystems/neo-core` → `@internal/mvvm-core`,
`@singularsystems/neo-react` → `@internal/mvvm-react`, `NeoModel` →
`Model`, `Neo.Extensions`/`Neo.Model.Services` (C# `using`s) →
`Internal.Mvvm.Extensions`/`Internal.Mvvm.Services`, and the `Neo` import
alias/JSX namespace → `UI`. Real public libraries (MediatR, EF Core,
ASP.NET Core) were left as-is.

The site owner supplied the DB design as 4 related SVG/webp diagrams
(Platform tables, Platform data example, Clients tables, Clients data
example) rather than one image, and asked for them to render as a
thumbnail grid that expands into a pop-up rather than a plain stacked
list — there was no modal/lightbox/gallery component anywhere in the
codebase. Built a new shared `ScreenshotGallery` component
(`src/components/ScreenshotGallery/`) instead of one-off lightbox code in
this project's page: a CSS-grid thumbnail layout with a caller-controlled
`columns` prop, and a portal-rendered lightbox (Escape/backdrop/×-close,
arrow-key + on-screen prev/next navigation, a dot tracker, the caption
rendered as a title above the enlarged image, and page-scroll locked while
the image itself can scroll if taller than the viewport). Added
`caption?: string` to `ProjectScreenshot` in `src/data/projects/types.ts`
for this. Documented it as a new pattern
([screenshot-gallery.md](../../.claude/patterns/screenshot-gallery.md))
since it's the standard shape for any future highlighted project's
`screenshots`. `normalise-import-data` (the only other existing
`ProjectDetail.tsx`) was deliberately left untouched — it sets no
`screenshots` today, so there was nothing to retrofit, and the site owner
asked not to touch it regardless.

The 4 image files (`PlatformTables.webp`, `PlatformTable-example.webp`,
`ClientsTables.webp`, `ClientsTable-example.webp`) were placed by the site
owner directly under `src/pages/Projects/affordability-assessment/images/`
(not `public/`, unlike the original task stub's suggestion) — the data
file imports them by relative path so Vite resolves them to built asset
URLs.

Created `src/pages/Projects/affordability-assessment/ProjectDetail.tsx` +
`.module.css` (mirroring `normalise-import-data`'s structure, per task
0018's decision to give each highlighted project its own page) and added
its static route in `src/App.tsx`.

## Changes forced by later work
none
