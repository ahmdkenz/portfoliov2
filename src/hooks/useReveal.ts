import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * IntersectionObserver sekali-jalan yang meniru perilaku `[data-reveal]` di mockup.
 * Indeks stagger dihitung saat callback terpicu (query DOM), bukan lewat counter
 * mutable yang persisten — supaya aman dari double-invoke React 19 StrictMode.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const reduced = usePrefersReducedMotion()
  const [inView, setInView] = useState(reduced)

  useEffect(() => {
    if (reduced) return

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        const all = Array.from(document.querySelectorAll('[data-reveal]'))
        const index = all.indexOf(el)
        el.style.transitionDelay = `${Math.min(Math.max(index, 0), 4) * 60}ms`
        setInView(true)
        observer.unobserve(el)
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced])

  return { ref, inView } as const
}
