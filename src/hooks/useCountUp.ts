import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Counter 0 → target sekali jalan saat elemen terlihat (meniru strip angka di mockup):
 * ease-out cubic 1100ms. Reduced motion langsung menampilkan target.
 */
export function useCountUp<T extends HTMLElement = HTMLSpanElement>(target: number, duration = 1100) {
  const ref = useRef<T>(null)
  const reduced = usePrefersReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (reduced) return

    const el = ref.current
    if (!el) return

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.unobserve(el)
        let t0: number | null = null
        const step = (ts: number) => {
          if (t0 === null) t0 = ts
          const k = Math.min(1, (ts - t0) / duration)
          setValue(Math.round(target * (1 - Math.pow(1 - k, 3))))
          if (k < 1) frame = requestAnimationFrame(step)
        }
        frame = requestAnimationFrame(step)
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [reduced, target, duration])

  return { ref, value: reduced ? target : value } as const
}
