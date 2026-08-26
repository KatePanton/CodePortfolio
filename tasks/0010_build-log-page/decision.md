# Decision: Split Disclosure (generic) from TimelineCard (domain-specific)

## Context
Each timeline entry needs an expand/collapse toggle revealing extra detail.
With `react-chrono` dropped (see task 0009's decision doc), the whole card
UI is hand-built, so this behavior needed a home.

## Options considered
1. **One `TimelineCard` component** with the expand/collapse state and
   toggle button built directly into it.
2. **Split into two**: a generic `Disclosure` component (trigger + children,
   no knowledge of what it's disclosing) that `TimelineCard` composes with.

## Decision
Option 2 — `src/components/Disclosure.tsx` (generic) and
`src/components/TimelineCard.tsx` (domain-specific, uses `Disclosure`).

## Why
The expand/collapse behavior is used 8 times on this one page (once per
task), which is real reuse now, not a speculative future need. Keeping it
generic — a `label` prop and `children`, no reference to tasks or
decisions — means it composes cleanly and could be reused elsewhere later
(an About-page FAQ, collapsible sections on `ProjectDetail`) without
dragging timeline-specific assumptions along. Cataloged as a pattern
(`.claude/patterns/expandable-disclosure.md`) since it clears this
project's "worth documenting" bar: an unusual component structure already
repeating, not a one-off.

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

## Changes forced by later work
none
