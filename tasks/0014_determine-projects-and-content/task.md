---
id: 0014
title: Determine projects and content to include
type: site-build
status: done
---

## Summary
Replaces the placeholder `/projects` scaffold (one fake entry) with a real
two-tier structure: 4 highlighted projects get a full case-study page
(`/projects/:slug` — blurb, tech stack, screenshots, code snippet(s),
talk-through) and 7 more get a brief inline entry (name, blurb, optional
tech stack, optional external link), no route. Data lives in a new
`src/data/projects/` folder (split per highlighted project, one file for
the brief tier). `Projects`/`ProjectDetail` moved into their own folders
and migrated off Tailwind onto CSS Modules with a new visual design (not a
reuse of the Skills page's card look).

Every content field (name, blurb, talk-through, snippets) starts as an
explicit `TODO:` placeholder — this task decides and builds the structure,
it does not author the final prose/screenshots/code. That's tracked via
`content-checklist.md`, which the site owner works through afterward.

Out of scope: the About page (task 0013, separate, in progress on the
owner's own time) and any `.claude/patterns/` entry (confirmed as a
one-off design, not expected to recur elsewhere on the site).

## Decision doc
[decision.md](decision.md)

## Patterns
Reused `css-modules-styling.md`. Deliberately did **not** reuse
`SkillCard`/`Disclosure`'s visual design — the site owner wanted a
different look for this page. No new pattern doc added.

## Screenshots
See screenshots/ in this folder.

## Outcome
Built `src/data/projects/` (types.ts, `highlighted/*.ts` × 4 +
`highlighted/index.ts`, `brief.ts`, `index.ts` barrel with `getProject`
searching the highlighted tier only), replacing `src/data/projects.ts`.
Moved `Projects`/`ProjectDetail` into `src/pages/Projects/` and
`src/pages/ProjectDetail/`, each with a `.module.css` file and a new
accent-bordered case-study card design for the highlighted tier plus a
compact list for the brief tier. Added a `--color-accent` token to
`src/index.css`. Updated `src/App.tsx`'s two lazy/static import paths.
Widened `ProjectDetail`'s not-found check implicitly by having
`getProject` only search the highlighted tier, so both unknown and
brief-tier slugs redirect to `/projects`.

Filling in the real content tracked by `content-checklist.md` was split
into 5 follow-up tasks rather than left open-ended here: 0016-0019 (one
per highlighted project) and 0020 (all 7 brief-tier entries as sub-goals).

## Changes forced by later work
Task 0018 replaced the single generic `src/pages/ProjectDetail/` component
and its `getProject(slug)`-driven dynamic route with one real page per
highlighted project under `src/pages/Projects/<slug>/`, each statically
importing its own data file and routed individually in `App.tsx`.
`getProject` was removed. See
[0018's decision.md](../0018_normalise-import-data-writeup/decision.md).
