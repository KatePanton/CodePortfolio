import { useState, type ReactNode } from 'react'
import styles from './Disclosure.module.css'

export default function Disclosure({
  label,
  children,
  onOpenChange,
}: {
  label: string
  children: ReactNode
  onOpenChange?: (open: boolean) => void
}) {
  const [open, setOpen] = useState(false)

  const toggle = () => {
    setOpen((value) => {
      const next = !value
      onOpenChange?.(next)
      return next
    })
  }

  return (
    <div className={styles.wrapper}>
      <button type="button" onClick={toggle} aria-expanded={open} className={styles.trigger}>
        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}>›</span>
        {open ? `Hide ${label.toLowerCase()}` : label}
      </button>
      {open && <div className={styles.content}>{children}</div>}
    </div>
  )
}
