import { useState, type ReactNode } from 'react'

export default function Disclosure({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-4 border-t border-neutral-100 pt-3 dark:border-neutral-800">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex items-center gap-1 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
      >
        <span className={`inline-block transition-transform ${open ? 'rotate-90' : ''}`}>›</span>
        {open ? `Hide ${label.toLowerCase()}` : label}
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  )
}
