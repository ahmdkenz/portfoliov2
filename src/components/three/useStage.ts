import { useEffect, useRef, useState } from 'react'

/**
 * Kebutuhan umum sebuah canvas section: ref host, status terlihat (untuk menjeda `frameloop`),
 * dan posisi pointer ternormalisasi (-1..1) seluruh jendela untuk parallax kamera.
 */
export function useStage<T extends HTMLElement = HTMLDivElement>() {
  const host = useRef<T>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = host.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    io.observe(el)
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return { host, pointer, visible }
}
