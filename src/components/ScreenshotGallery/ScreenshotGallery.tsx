import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import type { ProjectScreenshot } from '../../data/projects/types'
import styles from './ScreenshotGallery.module.css'

export default function ScreenshotGallery({
  screenshots,
  columns = 2,
}: {
  screenshots: ProjectScreenshot[]
  columns?: number
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)

  const open = (index: number) => {
    lastFocused.current = document.activeElement as HTMLElement | null
    setOpenIndex(index)
  }
  const close = () => setOpenIndex(null)
  const showNext = () => setOpenIndex((i) => (i === null ? i : (i + 1) % screenshots.length))
  const showPrev = () => setOpenIndex((i) => (i === null ? i : (i - 1 + screenshots.length) % screenshots.length))

  useEffect(() => {
    if (openIndex === null) return

    panelRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight' && screenshots.length > 1) showNext()
      else if (e.key === 'ArrowLeft' && screenshots.length > 1) showPrev()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex, screenshots.length])

  useEffect(() => {
    if (openIndex === null) lastFocused.current?.focus()
  }, [openIndex])

  const active = openIndex === null ? null : screenshots[openIndex]

  return (
    <>
      <div className={styles.grid} style={{ '--gallery-columns': columns } as CSSProperties}>
        {screenshots.map((screenshot, index) => (
          <figure key={screenshot.src} className={styles.item}>
            <button type="button" className={styles.thumbButton} onClick={() => open(index)}>
              <img src={screenshot.src} alt={screenshot.alt} className={styles.thumbImg} />
            </button>
            {screenshot.caption && <figcaption className={styles.caption}>{screenshot.caption}</figcaption>}
          </figure>
        ))}
      </div>

      {active &&
        createPortal(
          <div className={styles.overlay} onClick={close}>
            <div
              ref={panelRef}
              className={styles.dialogPanel}
              role="dialog"
              aria-modal="true"
              aria-label={active.caption ?? active.alt}
              tabIndex={-1}
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" className={styles.closeButton} onClick={close} aria-label="Close">
                &times;
              </button>
              {active.caption && <p className={styles.dialogTitle}>{active.caption}</p>}
              <img src={active.src} alt={active.alt} className={styles.dialogImg} />
              {screenshots.length > 1 && (
                <>
                  <button type="button" className={styles.navPrev} onClick={showPrev} aria-label="Previous image">
                    &lsaquo;
                  </button>
                  <button type="button" className={styles.navNext} onClick={showNext} aria-label="Next image">
                    &rsaquo;
                  </button>
                  <div className={styles.dots}>
                    {screenshots.map((s, i) => (
                      <button
                        key={s.src}
                        type="button"
                        className={styles.dot}
                        aria-label={`Image ${i + 1} of ${screenshots.length}`}
                        aria-current={i === openIndex}
                        onClick={() => setOpenIndex(i)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
