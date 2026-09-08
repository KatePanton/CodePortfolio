# Decision: Projects page structure and content tiering

## Context
The `/projects` route was a placeholder scaffold (one fake example entry).
The site owner has 11 real candidate projects to feature, sourced from
redacted code across four prior-employer codebases — shared with employer
permission in redacted form, but the employers/products themselves can't
be named on the public site. This task turns that candidate list into a
real structure with routing/data/styling, populated with placeholder
content the owner fills in afterward; it does not author the final
prose/screenshots/code itself.

## Options considered
- Flat list of all 11 projects vs. a two-tier model (highlighted case
  studies + brief entries). A flat list of 11 deep write-ups risks burying
  the strongest few; tiering lets a handful get full depth while the rest
  still get a mention.
- One `src/data/projects.ts` file vs. a `src/data/projects/` folder split
  per project. A folder was chosen since the four highlighted entries will
  eventually hold long-form prose/code while the seven brief ones stay
  short — asymmetric content favors asymmetric file structure, and each
  project's placeholder is easy to find and edit independently.
- Brief-tier projects with their own `/projects/:slug` detail route vs.
  rendered inline only. Inline-only was chosen: simpler data model, and it
  visually reinforces which projects got a deeper write-up.
- Where the "content still needed" checklist lives: inline TODO comments in
  the data files vs. a separate checklist doc. A separate
  `content-checklist.md` was chosen so filling in real content is a
  checklist-driven task, not something scattered across TypeScript files as
  comments.
- Reusing the Skills page's card design (`SkillCard`/`Disclosure`) vs. a new
  layout. New layout was chosen at the site owner's explicit direction —
  the Projects page should look and feel different, not a re-skin of
  Skills.

## Decision
- Two tiers: 4 highlighted projects (full case-study page at
  `/projects/:slug` — blurb, tech stack, screenshots, code snippet(s),
  talk-through) and 7 brief projects (compact inline entry — name, blurb,
  optional tech stack, optional external code link, no route).
- Data lives in `src/data/projects/` (`types.ts`; `highlighted/` — one file
  per project plus an `index.ts`; `brief.ts`; a top-level `index.ts`
  barrel). `getProject(slug)` only searches the highlighted tier, so a
  brief-tier or unknown slug both redirect to `/projects`.
- `Projects`/`ProjectDetail` moved into their own folders and migrated off
  Tailwind onto CSS Modules, with a new visual design (accent-bordered
  case-study cards + a compact list for the rest) rather than reusing
  `SkillCard`.
- Every name/blurb/talk-through/snippet field starts as an explicit
  `TODO: ...` placeholder string (not silently blank) — greppable, and
  visible on the live page until filled in.
- A new `content-checklist.md` in this task's folder lists exactly what's
  needed per project, grouped by tier, with a reminder that only generic
  descriptors are allowed — no real employer/product names anywhere.
- No new `.claude/patterns/` entry — confirmed with the site owner this is
  a one-off design, not expected to recur elsewhere on the site.
- Board status: `in-progress`, not `done` — the structure is built, but
  "content to include" isn't fully delivered until the owner has worked
  through `content-checklist.md`.

## Why
The site owner needs to keep two things separate: which employers' code
this is (real, but not nameable) and what the portfolio can say about it
(generic, with real prose to be written later). Tiering lets a small
number of projects carry the technical depth (code + talk-through) that
actually demonstrates skill, while the rest are still acknowledged without
diluting the case studies. Splitting data into per-project files makes the
fill-in-later work approachable — the owner can open exactly one file per
project rather than scrolling a single large array.

## Consequences
- The live `/projects` page shows `TODO:` placeholder text and generic
  "TODO: generic project name" labels until the owner works through
  `content-checklist.md` — expected, not a bug, and the task board reflects
  that with `in-progress`.
- Screenshots are referenced as plain `public/projects/<slug>/...` path
  strings (no bundler import), so a project can go from "no screenshot" to
  "has one" by just dropping a file in, no code change.
- Adding a 5th highlighted project later means creating one more file in
  `highlighted/` and adding it to that folder's `index.ts` — no other page
  code changes.

## Changes forced by later work
none
