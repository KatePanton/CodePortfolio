import { useEffect, useLayoutEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

const scrollPositions = new Map<string, number>()

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  // Disable the browser's own (unreliable, lazy-load-timing-sensitive) restoration
  // so it can't fight with the manual restore below.
  window.history.scrollRestoration = 'manual'
}

/**
 * Native `history.scrollRestoration` doesn't reliably restore scroll position
 * in this app: it fires before a lazy-loaded route has finished laying out,
 * so it clamps to whatever (shorter) height exists at that instant and never
 * retries. This restores manually instead, keyed by React Router's per-entry
 * `location.key`, and reapplies over a few animation frames to ride out late
 * layout shifts (images, lazy chunks) after a back/forward navigation.
 */
export default function ScrollManager() {
  const location = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    const handleScroll = () => scrollPositions.set(location.key, window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.key])

  useLayoutEffect(() => {
    // Capture the scroll position of the location we're leaving, right as we leave it —
    // more reliable than the scroll listener alone if the page scrolled just before navigating.
    return () => {
      scrollPositions.set(location.key, window.scrollY)
    }
  }, [location.key])

  useLayoutEffect(() => {
    if (navigationType === 'POP' && scrollPositions.has(location.key)) {
      const target = scrollPositions.get(location.key)!
      let attempts = 0
      const apply = () => {
        window.scrollTo(0, target)
        attempts += 1
        if (attempts < 10) requestAnimationFrame(apply)
      }
      requestAnimationFrame(apply)
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.key, navigationType])

  return null
}
