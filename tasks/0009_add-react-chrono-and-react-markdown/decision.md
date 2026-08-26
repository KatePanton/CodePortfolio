# Decision: Drop react-chrono in favor of a hand-rolled timeline

## Context
`react-chrono` was chosen during the `/grill-me` session for task 0010 (the
Build Log page) based on a docs-summary read: React 19 support, vertical
mode, and support for custom React children per timeline item. While
actually building task 0010, a minimal test render in the browser showed
behavior the docs summary hadn't surfaced: a full toolbar renders by
default (search box, first/previous/next/last navigation, "jump to",
layout switch, density toggle, fullscreen), it depends on `dayjs`, its main
bundle is ~256KB unminified, and its color theming is a JS-driven prop
system rather than something that follows Tailwind's CSS
`prefers-color-scheme`-based dark mode automatically.

## Options considered
1. **Keep `react-chrono`, configure it down** — disable the toolbar via its
   `display.toolbar.enabled` config, keep `mode="vertical"` + custom
   children for card content, accept the `dayjs` dependency and bundle
   weight, and accept static (non-dark-mode-reactive) accent colors for the
   connector line since its theme system doesn't hook into Tailwind's CSS
   media query.
2. **Drop it, hand-roll the timeline** — a connector line + dot markers
   built with plain Tailwind (an absolutely-positioned `w-px` line, a
   `rounded-full` dot per card), zero new dependency, full `dark:` variant
   support on every element.

## Decision
Option 2 — removed `react-chrono` (`npm uninstall react-chrono`); task 0010
builds the timeline shell directly in `src/pages/Process.tsx` with Tailwind.

## Why
This project's dependency footprint has stayed deliberately minimal (React,
React Router, Tailwind, one syntax-highlighter, and — as of this task —
`react-markdown`/`remark-gfm`). `react-chrono` is a full-featured timeline
*widget* (search, slideshow, media, i18n, layout switching) built for a
different kind of use case than a single narrative-scroll page where every
card's content is already fully custom. Configuring away most of its
surface area to get a plain vertical line with custom cards means paying
its full bundle/dependency cost for a feature set that reduces to
"draw a line and some dots" — which is a small amount of Tailwind on its
own, with better dark-mode integration and no unfamiliar API to work
against.

## Consequences
- Task 0010 needs no design changes beyond the timeline *shell* — the card
  content design (badges, expand/collapse, markdown rendering) was always
  planned as fully custom and carries over unchanged.
- One fewer dependency to keep updated; smaller bundle.
- Loses `react-chrono`'s built-in keyboard navigation and scroll-to-item
  behavior, which weren't part of the original requirements anyway (a
  narrative page is meant to be read top-to-bottom).

## Changes forced by later work
none
