import { useEffect, useState } from 'react'

interface PanelRow {
  k: string
  v: string
  accent?: boolean
}

interface PanelProps {
  title: string
  rows: PanelRow[]
  showClock?: boolean
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function usePanelClock(enabled: boolean) {
  const [time, setTime] = useState('')
  useEffect(() => {
    if (!enabled) return
    const update = () => {
      const d = new Date()
      setTime(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`)
    }
    update()
    const id = window.setInterval(update, 1000)
    return () => window.clearInterval(id)
  }, [enabled])
  return time
}

/** Kartu bergaya panel HMI: header (LED + judul + jam opsional) diikuti baris key/value. */
export function Panel({ title, rows, showClock }: PanelProps) {
  const clock = usePanelClock(!!showClock)

  return (
    <aside className="panel" aria-label="Status panel">
      <div className="panel-top">
        <span className="led" />
        <span className="mono" style={{ color: 'var(--color-concrete)' }}>
          {title}
        </span>
        {showClock && (
          <span className="mono" style={{ marginLeft: 'auto' }}>
            {clock || '--:--:--'}
          </span>
        )}
      </div>
      {rows.map((row) => (
        <div className="panel-row" key={row.k}>
          <span className="k">{row.k}</span>
          <span className={row.accent ? 'v acc' : 'v'}>{row.v}</span>
        </div>
      ))}
    </aside>
  )
}
