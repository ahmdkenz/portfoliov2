/** Versi statis scene Home untuk reduced motion / browser tanpa WebGL. */
export function HeroFallback() {
  return (
    <div className="hero-stage hero-stage--static" aria-hidden="true">
      <svg viewBox="-200 -150 400 300" preserveAspectRatio="xMidYMid meet">
        <g fill="none" stroke="#8A9198" strokeOpacity=".28">
          <ellipse rx="190" ry="54" transform="rotate(-8)" />
          <ellipse rx="155" ry="44" transform="rotate(6)" />
          <ellipse rx="118" ry="36" transform="rotate(-14)" />
        </g>
        <ellipse rx="72" ry="20" fill="none" stroke="#2a333b" strokeWidth="5" />
        <path d="M-72 0 A72 20 0 0 1 -30 -18" fill="none" stroke="#FFB627" strokeWidth="5" />
        <line x1="-150" y1="8" x2="150" y2="8" stroke="#3a444a" strokeWidth="2.5" />
        <rect x="-160" y="-2" width="44" height="20" fill="#132131" />
        <rect x="116" y="-2" width="44" height="20" fill="#132131" />
        <rect x="-22" y="-40" width="44" height="72" rx="3" fill="#2a333b" />
        <path d="M-18 -40 L0 -58 L18 -40 Z" fill="#2a333b" />
        <circle cx="0" cy="-8" r="3" fill="#FFB627" />
        <g fill="#8A9198">
          <circle cx="-178" cy="30" r="4" />
          <circle cx="120" cy="-38" r="4" />
          <circle cx="60" cy="38" r="4" />
          <circle cx="-96" cy="-30" r="4" />
        </g>
      </svg>
    </div>
  )
}
