import { useState, type ReactNode } from 'react'
import styles from './Disclosure.module.css'

export default function Disclosure({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className={styles.trigger}
      >
        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}>›</span>
        {open ? `Hide ${label.toLowerCase()}` : label}
      </button>
      {open && <div className={styles.content}>{children}</div>}
    </div>
  )
}
