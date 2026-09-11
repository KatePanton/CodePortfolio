# Decisions — Component library viewer

## 1. First dynamic route on the site

Task 0018 removed the site's only prior dynamic route (`/projects/:slug`
+ `useParams`) in favor of one static page per project, because each
project's write-up needed to diverge structurally (different optional
sections, different screenshot/snippet counts).

This task deliberately reintroduces a dynamic route —
`/components/:slug` + `useParams` — because the shape it serves is the
opposite case: every component detail page is *intentionally* uniform
(name, tag, description, one code block, always in that order, no
optional sections). A single generic page keyed by `componentsBySlug`
fits this exactly, and a static page per component would just be the
same JSX copy-pasted 3+ times for no benefit. Confirmed with the site
owner during grilling before building.

## 2. Native `history.scrollRestoration` doesn't work reliably here — built a manual fallback

The back button's requirement ("take you back to exactly where you left
off") was originally planned around plain `navigate(-1)`, relying on the
browser's native scroll restoration (`scrollRestoration: 'auto'`) — this
was confirmed as the simplest option during grilling, since the app has
no competing scroll-reset logic.

Testing in the browser (scroll deep into `/projects/worker-type-lifecycle`,
follow a "View component" link, click Back) showed native restoration
landing at the wrong offset. Root cause: `scrollRestoration: 'auto'`
tries to restore scroll at the moment of the `popstate` event, which
fires before React re-renders the target route's content — for a
lazy-loaded (`React.lazy`) route this is often before the page has
grown to its full height, so the restore gets clamped to whatever
(shorter) height exists at that instant and is never retried once the
content finishes laying out.

Fix: added `src/components/ScrollManager.tsx`, mounted once in
`src/components/Layout.tsx` (inside the router, wrapping every route via
`<Outlet />`). It:
- Sets `history.scrollRestoration = 'manual'` once, so the native
  mechanism can't fight with this.
- Tracks each location's scroll position in an in-memory `Map` keyed by
  React Router's per-history-entry `location.key` — updated continuously
  via a passive `scroll` listener, and captured again synchronously in a
  layout-effect cleanup at the exact moment a location is left (belt and
  braces: the cleanup catches cases where the page scrolled immediately
  before navigating, before the next `scroll` event could fire).
- On a `POP` navigation (back/forward) to a location with a saved
  position, reapplies `window.scrollTo` across several
  `requestAnimationFrame` ticks, so it keeps correcting for a few frames
  as late layout shifts (images, lazy chunks) settle.
- On any other navigation type (`PUSH`/`REPLACE`), resets to the top —
  which also fixes a separate latent bug found during testing: clicking
  a link while scrolled down previously left the *new* page scrolled to
  the same offset, since nothing on the site reset scroll on navigate.

This is a small, generic, site-wide component (not scoped to the
component-library feature specifically) — it fixes the same "scroll
position on navigate" concern everywhere, which is the correct, minimal
fix for the literal requirement rather than a special-case workaround
just for `/components/:slug`.

Documented as a new pattern:
[scroll-restoration.md](../../.claude/patterns/scroll-restoration.md).

## 3. "View component" CTA uses Tailwind, mixed into CSS-Modules files

`.claude/patterns/css-modules-styling.md` is explicit: "No Tailwind
utility classes in files using this pattern — it's one or the other per
component, not mixed." The "View component" link is nonetheless styled
with inline Tailwind classes, dropped directly into 3 files that
otherwise use CSS Modules (`CodeSnippetView.tsx`,
`worker-type-lifecycle/ProjectDetail.tsx`, `ComponentDetail.tsx` for its
back button).

This was an explicit site-owner instruction during planning ("if
possible to just do this with generic tailwind button, unless too
custom") in preference to a dedicated `ViewComponentLink` component with
its own `.module.css` for what's just a label + link. Recorded here as a
deliberate, scoped exception — not a precedent for mixing Tailwind into
CSS-Modules files generally.
