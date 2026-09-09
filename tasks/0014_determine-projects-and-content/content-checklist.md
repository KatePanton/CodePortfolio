# Projects page content checklist

Fill in the placeholders below, then replace the corresponding `TODO: ...`
strings in `src/data/projects/**`. **No real employer or product names** —
every entry that references a system needs a generic, non-identifying
description (e.g. "a lending platform," "a youth careers site") rather
than the actual company or product name.

## Highlighted projects (full case study — `src/data/projects/highlighted/*.ts`)

For each, supply:
- **Generic project name** — short, descriptive, no employer/product name
- **Blurb** — 4-5 sentences: what it was, the constraints, your role, the outcome
- **Tech stack** *(optional, if you remember it)*
- **Screenshot(s)** *(optional)* — drop image file(s) into
  `public/projects/<slug>/`, list each as `{ src, alt }` in the project's
  `screenshots` array
- **Code snippet(s)** — one or more `{ label, language, code }` entries;
  redacted code only
- **Talk-through** — narrative explaining the approach and the snippet(s)
  above (renders as Markdown)

1. `worker-type-lifecycle.ts` — frontend lifecycle of a lesson/quiz/report
   feature across multiple consumption formats
2. `career-website-section.ts` — a site section for browsing careers with
   in-depth info per career
3. `normalise-import-data.ts` — a dynamic SQL stored procedure normalizing
   raw import data across multiple parent-child relationships
4. `affordability-assessment.ts` — a full-stack, 3-level dynamic workflow
   (elements/groupings/items) for recording assessment inputs

## More projects (brief entry — `src/data/projects/brief.ts`)

For each, supply:
- **Generic project name**
- **Blurb** — 1-2 sentences
- **Tech stack** *(optional)*
- **Code link** *(optional)* — external link, if there's somewhere
  public/shareable to point to

1. `portfolio-component-display` — a component + view model for displaying
   a selected user's portfolios
2. `external-skills-api-integration` — frontend + backend integration with
   a third-party skills-courses API, phased delivery
3. `css-colour-variant-theming` — a system for tracking/using/updating a
   large light/dark colour palette
4. `button-pill-styling` — a dynamic, generic button/pill component
   replacing several visually different but functionally identical
   variants
5. `cv-builder` — a two-person build of a CV builder; built three sections
   plus sortable-entry functionality
6. `toast-notifications` — implementation and theming of toast
   notifications
7. `storybook-component-library` — a full component-library Storybook,
   low-level to full-page components

---

Once everything above is filled in and reviewed, flip this task's status
in `tasks/README.md` from `in-progress` to `done`.
