# Scroll restoration

## When to use it

Already wired in — nothing to opt into per-page. It applies to every
route automatically because it's mounted once, at the root layout.
Read this when touching navigation/routing behavior, or if scroll
position looks wrong after a back/forward navigation somewhere.

## The shape

```
src/components/ScrollManager.tsx
```

Mounted once in `src/components/Layout.tsx`, inside `<Router>`/above
`<Outlet />`, as a sibling with no visible output (`return null`):

```tsx
<div>
  <ScrollManager />
  <header>...</header>
  <main><Outlet /></main>
</div>
```

Introduced in task 0021 because the app's plain `<BrowserRouter>` setup
(not a data router) means React Router's `<ScrollRestoration>` isn't
available, and the browser's own `history.scrollRestoration: 'auto'`
turned out **not** to work reliably for this app's lazy-loaded
(`React.lazy`) routes: it tries to restore scroll at the `popstate`
event, before the target route has finished laying out, so it clamps to
whatever (shorter) height exists at that instant and never retries.

`ScrollManager` replaces it: disables native restoration
(`history.scrollRestoration = 'manual'`) so the two can't fight, tracks
each location's scroll offset in an in-memory `Map` keyed by React
Router's `location.key`, and on a `POP` navigation (back/forward)
reapplies the saved offset across several `requestAnimationFrame` ticks
to ride out late layout shifts (images, lazy chunks still settling). On
any other navigation type (`PUSH`/`REPLACE`) it resets scroll to the
top — this also covers the general case of clicking a link while
scrolled down, which previously left the *new* page scrolled to the same
offset since nothing on the site reset it.

## What varies

- Nothing per-page — this is intentionally invisible infrastructure, not
  something individual pages configure.

## What it doesn't cover

- Scroll position within a scrollable sub-element (e.g. a modal's own
  internal scroll) — only the document's own scroll position.
- Anchor/hash-link scrolling (`#section`) — not currently used anywhere
  on the site; would need separate handling if introduced.
- Persisting scroll position across a full page reload — the `Map` is
  in-memory only and resets on reload, same tradeoff as
  [expandable-disclosure.md](expandable-disclosure.md)'s local-only state.
