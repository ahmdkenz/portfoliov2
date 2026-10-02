import { useT } from '../../context/LanguageContext'
import { useCountUp } from '../../hooks/useCountUp'
import { metrics } from '../../data/profile'
import type { Metric } from '../../types/content'

function MetricItem({ metric }: { metric: Metric }) {
  const { tr } = useT()
  const { ref, value } = useCountUp(metric.value)

  return (
    <div className="metric">
      <span className="num" ref={ref} data-suffix={metric.suffix ?? ''}>
        {value}
      </span>
      <span className="mono">{tr(metric.label)}</span>
    </div>
  )
}

/** Strip angka di bawah Hero — sengaja tanpa id supaya tidak masuk scroll-spy. */
export function Metrics() {
  return (
    <section className="metrics" aria-label="Key numbers">
      <div className="wrap metrics-grid">
        {metrics.map((m) => (
          <MetricItem metric={m} key={m.label.en} />
        ))}
      </div>
    </section>
  )
}
