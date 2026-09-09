# Screenshot gallery

## When to use it

Any time a `HighlightedProject.screenshots` array needs to actually render
on a project's detail page — a thumbnail grid that expands to a full-size
pop-up on click, rather than a plain stacked `<img>` list. Introduced in
task 0019 for the Affordability Assessment write-up's 4 related DB-design
diagrams (a full-size stacked list doesn't scale once there's more than
one sizeable image to show).

## The shape

A single generic component, content-agnostic — it knows nothing about
which project it's rendering for. Styled with a CSS Module (see
[css-modules-styling.md](css-modules-styling.md)):

```
src/components/ScreenshotGallery/ScreenshotGallery.tsx
src/components/ScreenshotGallery/ScreenshotGallery.module.css
```

Called from a `ProjectDetail.tsx` wherever the old inline `<img>` map used
to sit:

```tsx
{project.screenshots && <ScreenshotGallery screenshots={project.screenshots} columns={2} />}
```

Internals: a CSS grid of thumbnail `<button>`s (columns driven by a
`--gallery-columns` custom property, so the grid always wraps correctly
regardless of item count), and a lightbox rendered via `createPortal` to
`document.body` — `openIndex: number | null` local state, `Escape`/
backdrop-click/`×` to close, `ArrowLeft`/`ArrowRight` plus on-screen
prev/next buttons and a dot tracker to step between images, and the
active image's `caption` rendered as a title above it inside the panel.

## What varies

- The `screenshots` array itself — count, `alt`, and optional `caption`
  per image (`caption` is a user-visible label, distinct from `alt` which
  stays pure accessibility text).
- `columns` — the caller decides the grid's column count (default `2`);
  the component never hard-codes it. Row count is whatever the grid needs
  for the given item count, not computed separately.
- Where the image files themselves live and how they're referenced — e.g.
  imported from a page-local `images/` folder (as in
  `affordability-assessment`) versus a `public/projects/<slug>/` path.
  Either way, the value that ends up in `screenshots[].src` is just a
  string URL by the time it reaches this component.

## What it doesn't cover

- A full Tab-focus-trap inside the open dialog — focus moves onto the
  panel on open and returns to the triggering thumbnail on close, but a
  keyboard user holding Tab can still leave the dialog into the page
  behind it. A deliberate, documented scope cut for a personal portfolio
  site, not an oversight.
- Swipe/touch gestures, pinch-zoom, an in-lightbox thumbnail strip, image
  preloading, or any animation/transition library.
- Deep-linking to a specific open image via URL — state is local and
  resets on remount, same as [expandable-disclosure.md](expandable-disclosure.md).
