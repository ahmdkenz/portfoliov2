import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/** true segera setelah BootSequence menambahkan class `ready` ke `<body>` (lihat BootSequence.tsx) */
function useBodyReady() {
  const [ready, setReady] = useState(() => document.body.classList.contains('ready'))

  useEffect(() => {
    if (ready) return
    const observer = new MutationObserver(() => {
      if (document.body.classList.contains('ready')) setReady(true)
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [ready])

  return ready
}

/** Cyclic type/delete effect meniru typewriter role-line di mockup. Direset otomatis saat identitas `words` berubah (ganti bahasa). */
export function useTypewriter(words: string[]) {
  const reduced = usePrefersReducedMotion()
  const ready = useBodyReady()
  const [animatedText, setText] = useState('')
  const timerRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (reduced || !ready || words.length === 0) return

    let wordIndex = 0
    let charIndex = 0
    let deleting = false

    const tick = () => {
      const word = words[wordIndex % words.length]
      if (charIndex > word.length) charIndex = word.length
      charIndex = deleting ? charIndex - 1 : charIndex + 1
      setText(word.slice(0, charIndex))

      let wait = deleting ? 34 : 68
      if (!deleting && charIndex >= word.length) {
        deleting = true
        wait = 1900
      } else if (deleting && charIndex <= 0) {
        deleting = false
        wordIndex = (wordIndex + 1) % words.length
        wait = 340
      }
      timerRef.current = window.setTimeout(tick, wait)
    }

    timerRef.current = window.setTimeout(tick, 0)

    return () => {
      if (timerRef.current !== undefined) window.clearTimeout(timerRef.current)
    }
  }, [words, reduced, ready])

  return reduced ? (words[0] ?? '') : animatedText
}
