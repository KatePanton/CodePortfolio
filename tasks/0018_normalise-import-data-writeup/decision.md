# Decision: One page folder per highlighted project, not a shared ProjectDetail

## Context
Task 0014 built `/projects/:slug` as a single generic `ProjectDetail`
component (`src/pages/ProjectDetail/`) that looked up any highlighted
project at runtime via `getProject(slug)`. While writing up this task's
content, the site owner asked for that shared component to be replaced
with one real page per project, nested under `src/pages/Projects/`, named
after each project's slug — matching how the data layer is already split
per-project (`src/data/projects/highlighted/<slug>.ts`).

## Options considered
- **Relocate the shared component as-is** (e.g.
  `src/pages/Projects/ProjectDetail/`), still rendering all 4 projects
  generically via `getProject(slug)` on one dynamic route. Smallest change,
  but doesn't give each project its own page/folder.
- **One real page per project slug**, each statically importing its own
  data file directly instead of routing through `getProject(slug)`, with
  its own static route in `App.tsx`. Chosen at the site owner's explicit
  direction: mirrors the existing per-project data-file split, and each
  project's page can diverge independently later if one needs different
  layout without affecting the others.

## Decision
- `src/pages/ProjectDetail/` removed. Each highlighted project gets its
  own folder — `src/pages/Projects/<slug>/ProjectDetail.tsx` +
  `ProjectDetail.module.css` — created as that project's own content task
  lands, not all upfront. Only `normalise-import-data` has one so far
  (this task); `worker-type-lifecycle`, `career-website-section`, and
  `affordability-assessment` will each get theirs when tasks 0016, 0017,
  and 0019 are worked.
- Each page statically imports its own project object from
  `src/data/projects/highlighted/<slug>.ts` and renders it directly — no
  `useParams`/`getProject` lookup, no "not found" branch (the route only
  exists if the project's page exists).
- `src/App.tsx`'s single `projects/:slug` route replaced with one static
  `Route` per project that has a page — currently just
  `projects/normalise-import-data` — added incrementally alongside each
  project's own page folder.
- `getProject(slug)` removed from `src/data/projects/index.ts` — no
  remaining caller.
- Page files/styles are intentionally duplicated per project rather than
  sharing one internal render component, per the site owner's explicit
  choice of structure.
- No new `.claude/patterns/` entry: like the Projects page's card design
  (task 0014), this is specific to how the Projects section is organized,
  not a shape expected to recur elsewhere on the site.

## Consequences
- Adding a highlighted project's real page now means: a new
  `src/pages/Projects/<slug>/` folder (component + CSS) and a new static
  route in `App.tsx`, done as part of that project's own write-up task —
  three touch points (data file already existed) instead of one data file
  plus an automatic route.
- Until a project has its own page/route, its `/projects` card links to a
  route that doesn't exist and falls through to the app's catch-all `*` →
  `NotFound`, rather than showing the old generic `ProjectDetail`'s TODO
  placeholder content the way task 0014 originally intended. Currently
  true for `worker-type-lifecycle`, `career-website-section`, and
  `affordability-assessment` — resolved for each as its own task adds the
  page.
- Each `ProjectDetail.tsx`/`.module.css` pair is near-identical by design;
  a shared layout could be reintroduced later if that duplication becomes
  a maintenance problem, but that's not this decision.

## Changes forced by later work
none
