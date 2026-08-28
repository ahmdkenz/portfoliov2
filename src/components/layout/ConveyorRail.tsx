import { useLayoutEffect, useRef } from 'react'
import { useT } from '../../context/LanguageContext'
import { useActiveSection } from '../../hooks/useActiveSection'
import { SECTION_IDS } from '../../types/content'

const RAIL_KEYS = SECTION_IDS.map((id) => `rail.${id}` as const)

export function ConveyorRail() {
  const { t } = useT()
  const { activeId } = useActiveSection()
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const batchRef = useRef<HTMLSpanElement | null>(null)

  useLayoutEffect(() => {
    const idx = SECTION_IDS.indexOf(activeId)
    const el = linkRefs.current[idx]
    if (el && batchRef.current) {
      batchRef.current.style.top = `${el.offsetTop + el.offsetHeight / 2 - 3}px`
    }
  }, [activeId])

  return (
    <div className="rail" aria-hidden="true">
      <span className="batch" ref={batchRef} style={{ top: 0 }} />
      {SECTION_IDS.map((id, i) => (
        <a
          key={id}
          href={`#${id}`}
          className={id === activeId ? 'active' : undefined}
          ref={(el) => {
            linkRefs.current[i] = el
          }}
        >
          {t(RAIL_KEYS[i])}
          <i />
        </a>
      ))}
    </div>
  )
}
