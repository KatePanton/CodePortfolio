# CSS Modules styling

## When to use it

For any new or substantially-rewritten component going forward.

## The shape

Each component gets its own folder, holding the `.tsx` and its sibling
`.module.css`:

```
src/components/TimelineCard/TimelineCard.tsx
src/components/TimelineCard/TimelineCard.module.css
```

```css
/* TimelineCard/TimelineCard.module.css */
.card {
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
  padding: 1rem;
}
```

```tsx
// TimelineCard.tsx
import styles from "./TimelineCard.module.css";

export default function TimelineCard() {
  return <article className={styles.card}>...</article>;
}
```

Vite's built-in CSS Modules support handles this with no extra config —
`vite/client` (already in `tsconfig.app.json`) types the import as
`Record<string, string>`.

Colors are **not** hardcoded per component. A shared set of CSS custom
properties lives in `src/index.css`, defined on `:root` with a
`@media (prefers-color-scheme: dark)` override — the same light/dark split
Tailwind's `dark:` variant gives the rest of the site, just expressed as
tokens instead of utility classes:

```css
:root {
  --color-bg: #ffffff;
  --color-text-strong: #171717;
  --color-border: #e5e5e5;
  /* ... */
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0a0a0a;
    --color-text-strong: #f5f5f5;
    --color-border: #262626;
    /* ... */
  }
}
```

Component CSS references these with `var(--color-border)` etc. rather than
literal hex values, so the palette stays centralized and dark mode is
automatic.

## What varies

- The token set in `src/index.css` grows as new components need colors it
  doesn't have yet — add the token there, not a one-off hex value in a
  component file.
- Layout/spacing/typography values are written directly in each
  `.module.css` file (not tokenized) unless a value is reused across many
  components.

## What it doesn't cover

- No Tailwind utility classes in files using this pattern — it's one or
  the other per component, not mixed.
