# Slug-driven detail page

## When to use it

A generic detail page for a *set* of data-driven entries (components,
brief projects, etc.) where every entry renders in the same structural
shape — not a bespoke per-item page like the highlighted-project tier
uses (those diverge structurally, so they stay one static route +
`ProjectDetail.tsx` each). Introduced in task 0021 for `/components/:slug`,
reused in task 0020 for `/projects/:slug` (the brief-tier detail page).

## The shape

```
src/pages/Component/ComponentDetail.tsx        (+ .module.css)
src/pages/Projects/BriefDetail/BriefDetail.tsx (+ .module.css)
```

A dynamic route (`path="components/:slug"` / `path="projects/:slug"`)
registered lazily in `src/App.tsx`, alongside any static literal sibling
routes (e.g. `projects/worker-type-lifecycle`) — React Router's ranked
matching always prefers a static segment over a `:param` sibling
regardless of declaration order, so the two coexist safely without an
ordering trick.

The page itself:

```tsx
const { slug } = useParams<{ slug: string }>()
const navigate = useNavigate()
const location = useLocation()

const entry = slug ? someLookup(slug) : undefined
if (!entry) return <NotFound />

const hasInAppHistory = location.key !== 'default'
// hasInAppHistory ? <button onClick={() => navigate(-1)}>← Back</button>
//                 : <Link to="/parent-list">← Back to ...</Link>
```

The `location.key !== 'default'` check distinguishes "arrived here by
clicking a link inside the app" (safe to `navigate(-1)`) from "arrived
here via a direct URL / bookmark" (no in-app history to go back to, so
link to the parent list page instead).

## What varies

- The lookup itself — a flat `Record<string, T>` built once (`componentsBySlug`,
  from one file per entry in `src/data/components/`) vs. an `Array.find`
  over an existing flat array (`briefProjects`, from `src/data/projects/brief.ts`)
  — pick whichever matches how the underlying data is already organized,
  don't build a `bySlug` map just for this if a `.find()` is enough.
- What counts as "not found": can be a missing/unknown slug, or (as in
  `BriefDetail`) a *known* slug that just has no detail data attached —
  both fall through to the same `<NotFound />` guard rather than needing
  separate handling.
- The fields actually rendered below the back-link/heading — this pattern
  only covers the page shell, not what content-per-entry looks like.

## What it doesn't cover

- Data fetching — every current use looks up from a data module that's
  already in memory (bundled at build time), not a network call.
- Editing/mutation — this is a read-only display pattern.
