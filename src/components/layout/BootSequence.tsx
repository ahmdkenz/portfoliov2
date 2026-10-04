import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const LINES: { tag: string; text: string; bold?: string }[] = [
  { tag: '[ 00 ]', text: 'INIT — portfolio.system' },
  { tag: '[ 01 ]', text: 'MOUNT — vue / react / next' },
  { tag: '[ 02 ]', text: 'LINK — laravel · mysql · gcp' },
  { tag: '[ 03 ]', text: 'DOCK — orbital.station / 07 modules' },
  { tag: '[ 04 ]', text: 'OPERATOR — ', bold: 'ahmad nur hafidz' },
  { tag: '[ 05 ]', text: 'LINE STATUS — ', bold: 'running' },
]

const LINE_STAGGER = 140
const BAR_FULL_AT = LINE_STAGGER * LINES.length
const FINISH_AT = BAR_FULL_AT + 1500
const HIDE_AT = FINISH_AT + 1100

/** Overlay commissioning saat load. Menambahkan class `ready` ke <body> saat selesai (dibaca oleh CSS dan useTypewriter). */
export function BootSequence() {
  const reduced = usePrefersReducedMotion()
  const [phase, setPhase] = useState<'booting' | 'done' | 'hidden'>(() => (reduced ? 'hidden' : 'booting'))
  const [linesOn, setLinesOn] = useState(false)
  const [barFull, setBarFull] = useState(false)
  const timers = useRef<number[]>([])

  useEffect(() => {
    if (reduced) {
      document.body.classList.add('ready')
      return
    }

    timers.current.push(window.setTimeout(() => setLinesOn(true), 0))
    timers.current.push(window.setTimeout(() => setBarFull(true), BAR_FULL_AT))
    timers.current.push(
      window.setTimeout(() => {
        setPhase('done')
        document.body.classList.add('ready')
      }, FINISH_AT),
    )
    timers.current.push(window.setTimeout(() => setPhase('hidden'), HIDE_AT))

    return () => {
      timers.current.forEach((id) => window.clearTimeout(id))
      timers.current = []
    }
  }, [reduced])

  if (phase === 'hidden') return null

  return (
    <div id="boot" role="status" aria-label="Loading" className={phase === 'done' ? 'done' : undefined}>
      <div className="boot-inner">
        {LINES.map((line, i) => (
          <div
            key={line.tag}
            className={linesOn ? 'boot-line on' : 'boot-line'}
            style={{ transitionDelay: `${LINE_STAGGER * i}ms` }}
          >
            <span>{line.tag}</span>
            <span>
              {line.text}
              {line.bold && <b>{line.bold}</b>}
            </span>
          </div>
        ))}
        <div className={barFull ? 'boot-bar full' : 'boot-bar'}>
          <i />
        </div>
      </div>
    </div>
  )
}
