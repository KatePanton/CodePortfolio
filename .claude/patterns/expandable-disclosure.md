# Expandable disclosure

## When to use it

Any time a chunk of secondary content should stay hidden until the reader
asks for it — extra detail on a card, an FAQ answer, supplementary notes —
rather than always being visible or living on a separate page. Introduced
in task 0010 for the Build Log timeline, where each entry shows a summary
by default and reveals its full detail (outcome, decision reasoning) on
demand.

## The shape

A single generic component, content-agnostic — it knows nothing about what
it's disclosing:

```tsx
// src/components/Disclosure.tsx
import { useState, type ReactNode } from 'react'

export default function Disclosure({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        {open ? `Hide ${label.toLowerCase()}` : label}
      </button>
      {open && <div>{children}</div>}
    </div>
  )
}
```

Used by wrapping whatever content should be hidden:

```tsx
<Disclosure label="Full details">
  <SomeExpandedContent />
</Disclosure>
```

## What varies

- The `label` text.
- What's passed as `children` — entirely up to the caller; `Disclosure`
  never inspects or interprets it.
- Trigger/spacing styling can be adjusted per call site if a particular use
  needs a visually distinct trigger, but keep the open/close *behavior*
  (internal `useState`, `aria-expanded`) identical.

## What it doesn't cover

- Multiple mutually-exclusive disclosures that should close each other
  (accordion behavior) — this component is independent per instance, no
  shared state.
- Deep-linking to an open state (e.g. via URL hash) — state is local and
  resets on remount.
