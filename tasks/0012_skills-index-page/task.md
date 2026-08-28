---
id: 0012
title: Skills index page
type: site-build
status: done
---

## Summary
New route (e.g. `/skills`) presenting the skills cataloged in
`.claude/skills/README.md` as portfolio content — per root `CLAUDE.md` and
`.claude/skills/skill-creation/SKILL.md`, both of which describe skills as
portfolio content meant to eventually back a page built from that index.

Follows the conventions established in task 0010: build-time data loading
(`import.meta.glob` over `.claude/skills/*/SKILL.md` frontmatter — name,
description) rather than hand-duplicated data, CSS Modules styling, one
folder per component (e.g. `src/pages/Skills/Skills.tsx` +
`Skills.module.css`), nav link added to `src/components/Layout.tsx`.

Scope is `.claude/skills/` only, not `.claude/patterns/` — patterns are an
internal dev convention, not portfolio-facing content. Revisit this
assumption with the user if needed when work starts.

## Decision doc
[decision.md](decision.md)

## Patterns
Reused `css-modules-styling.md` and the `src/data/tasks.ts` glob-loading
approach as a structural model. Reused `Disclosure` and `Markdown`
directly (no new variants needed) — `SkillCard` composes them the same way
`TimelineCard` does.

## Screenshots
See screenshots/ in this folder.

## Outcome
Built `src/data/skills.ts` (parses `.claude/skills/README.md`'s table —
not a blind glob of `.claude/skills/*/SKILL.md` — see decision doc for
why), `src/components/SkillCard/SkillCard.tsx` + `.module.css`,
`src/pages/Skills/Skills.tsx` + `.module.css`. Added the `/skills` route
(lazy-loaded) and a "Skills" nav link. Each skill card links to its
originating task on the Build Log page (`/process#task-NNNN`); added `id`
anchors to `TimelineCard`'s list items and a `useEffect` + `useLocation`
hash-scroll fix in `Process.tsx` to make that actually work (React Router
doesn't auto-scroll to a hash on a lazy-loaded route by default — verified
broken, then fixed and re-verified in the browser).

Verified in the dev server: all 5 project-authored skills render with
correct name/description/task-link, expand reveals each skill's full
`SKILL.md` body as rendered markdown, deep-linking from a skill card to
its task on `/process` correctly scrolls to that card. `npm run build` and
`npm run lint` both pass cleanly (0 warnings/errors).

## Changes forced by later work
none