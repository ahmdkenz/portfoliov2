import { useEffect, useState } from 'react'
import { useT } from '../../context/LanguageContext'
import { useActiveSection } from '../../hooks/useActiveSection'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function useHudClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () => {
      const d = new Date()
      setTime(`${pad(d.getHours())}:${pad(d.getMinutes())}`)
    }
    update()
    const id = window.setInterval(update, 1000)
    return () => window.clearInterval(id)
  }, [])
  return time
}

export function StatusHud() {
  const { t } = useT()
  const { activeId, activeIndex, percent } = useActiveSection()
  const clock = useHudClock()

  return (
    <div className="hud" aria-hidden="true">
      <span>Line 01</span>
      <span className="hide-s">
        Sec <b>{pad(activeIndex + 1)}</b> / {t(`nav.${activeId}` as const)}
      </span>
      <span className="sp">
        <span className="hide-s">
          Jakarta <b>{clock || '--:--'}</b>
        </span>
        <span>
          <b>{percent}</b>%
        </span>
        <span className="meter">
          <i style={{ width: `${percent}%` }} />
        </span>
      </span>
    </div>
  )
}
