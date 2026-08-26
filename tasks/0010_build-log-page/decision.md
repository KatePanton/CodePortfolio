# Decision: Build Log component structure and styling approach

## Context
Two related choices came up while building the Build Log page's UI, once
`react-chrono` was off the table (see task 0009's decision doc) and the
whole card UI needed to be hand-built: how to structure the expand/collapse
behavior each card needs, and how to style everything now that no library
was dictating it.

## Options considered
**Component structure:**
1. One `TimelineCard` component with expand/collapse state and the toggle
   button built directly into it.
2. Split into two: a generic `Disclosure` component (trigger + children, no
   knowledge of what it's disclosing) that `TimelineCard` composes with.

**Styling:**
1. Keep Tailwind utility classes inline in JSX, matching every existing
   page in the repo.
2. Move styling into CSS Modules (`Component.module.css` per component),
   dropping Tailwind utility classes for new work, with a shared set of CSS
   custom-property color tokens in `src/index.css` (light values on
   `:root`, dark values under `@media (prefers-color-scheme: dark)`) so the
   palette isn't duplicated as hex literals across files.

## Decision
Component structure: option 2 — `src/components/Disclosure.tsx` (generic)
and `src/components/TimelineCard.tsx` (domain-specific, uses `Disclosure`).

Styling: option 2 — CSS Modules + shared color tokens, applied to the new
Build Log components (`Disclosure`, `Markdown`, `TimelineCard`, `Process`)
only. Existing pages (`Home`, `Projects`, `ProjectDetail`, `About`,
`Layout`) are explicitly **not** retrofitted in this task — they keep
inline Tailwind classes until converted as their own separate task.
Documented as two patterns: `.claude/patterns/expandable-disclosure.md`
and `.claude/patterns/css-modules-styling.md`.

## Why
The expand/collapse behavior is used 8 times on this one page (once per
task), which is real reuse now, not a speculative future need. Keeping
`Disclosure` generic — a `label` prop and `children`, no reference to tasks
or decisions — means it composes cleanly and could be reused elsewhere
later (an About-page FAQ, collapsible sections on `ProjectDetail`) without
dragging timeline-specific assumptions along.

The styling switch was an explicit preference: separate CSS files instead
of styling as inline `className` text. Scoping it to new components only
(rather than retrofitting the whole site in this task) avoids one large,
risky change touching every page at once for a preference that's easiest
to validate on a single new page first. The CSS custom-property tokens
mirror Tailwind's `dark:` media-query behavior exactly, so dark mode still
works the same way it does everywhere else in the app, just expressed
without Tailwind.

Badges were kept inline in `TimelineCard` rather than further extracted —
no other component in the codebase pulls that shape into its own file
either, so a `Badge` component would be introducing a pattern nothing else
follows yet.

## Consequences
- `TimelineCard` stays focused on layout/composition rather than mixing in
  toggle-state logic.
- `Disclosure` has one behavioral contract (`useState` + `aria-expanded`)
  that any future caller must preserve, even if its trigger styling is
  adjusted per use.
- The codebase now has two live styling conventions side by side (inline
  Tailwind on existing pages, CSS Modules on new ones) until/unless the
  older pages are individually converted — expected, not a bug, but worth
  remembering when reading unrelated files so the inconsistency doesn't
  look accidental.

## Changes forced by later work
none
