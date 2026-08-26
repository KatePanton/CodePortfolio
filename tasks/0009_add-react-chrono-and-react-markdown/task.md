---
id: 0009
title: Add react-chrono and react-markdown dependencies
type: site-build
status: done
---

## Summary
Prep work for task 0010 (the Build Log timeline page). Pure dependency
addition, no app code changes:

- [x] `npm install react-markdown`
- [x] `npm install remark-gfm`
- [x] `npm install react-chrono`
- [x] Verify `npm run build` and `npm run dev` both still succeed with no
      peer-dependency conflicts (React 19 compatibility was confirmed via
      research ahead of time — `react-chrono`'s README states React
      18.2+/19+ support — but verify for real once installed)

## Decision doc
[decision.md](decision.md)

## Patterns
None — dependency addition only.

## Screenshots
See screenshots/ in this folder.

## Outcome
Installed `react-markdown@^10.1.0`, `remark-gfm@^4.0.1`,
`react-chrono@^3.3.3` — 92 packages added, 0 vulnerabilities. Added
`.claude/launch.json` (previously missing) so the dev server can be
launched/previewed for verification. Confirmed `npm run build` (tsc +
vite build) and `npm run dev` both succeed with no peer-dependency
conflicts or console errors. No app code changes — the new libraries aren't
wired into any page yet; that's task 0010.

## Changes forced by later work
While building task 0010 (the Build Log page), test-driving `react-chrono`
in the browser showed it's a much heavier, more feature-rich component than
its docs summary suggested: a full toolbar (search, first/previous/next/
last navigation, layout switch, density toggle, fullscreen) renders by
default and has to be explicitly disabled, it pulls in `dayjs` as its own
dependency, its main bundle is ~256KB unminified, and its theming is a
JS-driven config system rather than something that plugs into Tailwind's
CSS-based dark mode automatically. `react-chrono` was removed
(`npm uninstall react-chrono`); the timeline shell is hand-rolled with
plain Tailwind instead. `react-markdown` and `remark-gfm` are unaffected
and still stand as installed. See [decision.md](decision.md) for the full
reasoning.