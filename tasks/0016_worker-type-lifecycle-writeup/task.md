---
id: 0016
title: Worker Type Lifecycle project write-up
type: project-writeup
status: done
---

## Summary
Fill in the real content for the highlighted "Worker Type Lifecycle"
project (`src/data/projects/highlighted/worker-type-lifecycle.ts`),
replacing every `TODO:` placeholder per its entry in task 0014's
[content-checklist.md](../0014_determine-projects-and-content/content-checklist.md):
generic project name, 4-5 sentence blurb, tech stack (if remembered),
screenshot(s) (optional — add to `public/projects/worker-type-lifecycle/`),
code snippet(s), and a talk-through narrative.

Hard constraint carried over from task 0014: no real employer or product
name anywhere — generic descriptors only.

## Decision doc
none

## Patterns
none

## Screenshots
See screenshots/ in this folder.

## Outcome
Filled in `src/data/projects/highlighted/worker-type-lifecycle.ts`: a
generic name ("Worker Type Assessment Lifecycle"), a `techStack`
(React, TypeScript, Inertia.js, Web Components), a blurb and `problem`
paragraph covering the three consumption formats (quiz, report, lesson)
and the shared, report-type-agnostic layout component behind the report
view, 3 screenshots (site owner supplied), and 4 code snippets — Quiz,
the shared `ReportLayout`, the Worker Type report page that composes into
it, and the Lesson page — each with its own talk-through, in lifecycle
order.

The real source (`Lesson.tsx`, `Quiz.tsx`, `Result.tsx`,
`ReportLayout.tsx`, plus a `ReportConsolidated.tsx` staging file
combining all three — functionally identical to the separate files, so
not used as its own snippet) used real, identifiable custom elements
prefixed `yc-` (`yc-image-response`, `yc-wt-report`, `yc-wt-lesson`). Per
the hard "no real employer/product name" constraint and the precedent
from task 0017 (`<yc-rich-text-block>` → `<rich-text-block>`), every
occurrence was renamed with the prefix replaced: `custom-image-response`,
`custom-wt-report`, `custom-wt-lesson`. Everything else (`@/Components/...`
path aliases, `ziggy-js`/`@inertiajs/react`, `@fortawesome/...`) was left
as-is — already generic/public, and the same aliases already appear
un-redacted in the shipped `career-website-section.ts`, which also
already treats "worker-type" as an ordinary descriptive term.

The site owner supplied 3 screenshots directly into `public/`
(`WorkerType_Lesson.png`, `WorkerType_Longform.png`,
`WorkerType_Slides.png`, one per consumption format/view mode). Per
0019's convention (not the `public/projects/<slug>/` path this task's own
stub suggested), they were relocated to
`src/pages/Projects/worker-type-lifecycle/images/` and imported by
relative path from the data file. Rendered via the existing
`ScreenshotGallery` component with `columns={3}` (one row for 3 images),
placed directly after the tech-stack tags — i.e. at the top of the page,
per the site owner's request for this pass.

Created `src/pages/Projects/worker-type-lifecycle/ProjectDetail.tsx` +
`.module.css` (mirroring `affordability-assessment`'s structure, per task
0018's decision to give each highlighted project its own page) and added
its static route in `src/App.tsx`. No change was needed to
`src/data/projects/highlighted/index.ts` — this project was already
registered there.

## Changes forced by later work
none
