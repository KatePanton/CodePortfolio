import { useState, type ReactNode } from 'react'
import styles from './Disclosure.module.css'

export default function Disclosure({
  label,
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: {
  label: string
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const toggle = () => {
    const next = !open
    if (!isControlled) setInternalOpen(next)
    onOpenChange?.(next)
  }

  return (
    <div className={styles.wrapper}>
      <button type="button" onClick={toggle} aria-expanded={open} className={styles.trigger}>
        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}>›</span>
        {open ? `Hide ${label.toLowerCase()}` : label}
      </button>
      {open && (
        <div className={styles.content}>
          {children}
          <button type="button" onClick={toggle} aria-expanded={open} className={styles.bottomTrigger}>
            <span className={`${styles.chevron} ${styles.chevronOpen}`}>›</span>
            {`Hide ${label.toLowerCase()}`}
          </button>
        </div>
      )}
    </div>
  )
}
