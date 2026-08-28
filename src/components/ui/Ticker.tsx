import { techTicker } from '../../data/profile'

export function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {[...techTicker, ...techTicker].map((name, i) => (
          <span key={i}>{name}</span>
        ))}
      </div>
    </div>
  )
}
