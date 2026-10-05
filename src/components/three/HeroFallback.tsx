/** Versi statis scene Home untuk reduced motion / browser tanpa WebGL. */
export function HeroFallback() {
  return (
    <div className="hero-stage hero-stage--static" aria-hidden="true">
      <svg viewBox="-200 -150 400 300" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="hf-atmo" cx="50%" cy="50%" r="50%">
            <stop offset="86%" stopColor="#FFB627" stopOpacity=".35" />
            <stop offset="100%" stopColor="#6FCBE0" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* planet + atmosfer di kanan bawah */}
        <circle cx="210" cy="260" r="190" fill="url(#hf-atmo)" />
        <circle cx="210" cy="260" r="165" fill="#0b1626" />
        <g fill="none" strokeOpacity=".5">
          <ellipse rx="190" ry="54" transform="rotate(-8)" stroke="#3F8494" strokeDasharray="6 4" />
          <ellipse rx="155" ry="44" transform="rotate(6)" stroke="#8A9198" />
          <ellipse rx="118" ry="36" transform="rotate(-14)" stroke="#B37D18" />
        </g>
        <ellipse rx="72" ry="20" fill="none" stroke="#9AA5AE" strokeWidth="5" />
        <path d="M-72 0 A72 20 0 0 1 -30 -18" fill="none" stroke="#FFB627" strokeWidth="5" />
        <line x1="-150" y1="8" x2="150" y2="8" stroke="#4B5560" strokeWidth="2.5" />
        <rect x="-160" y="-2" width="44" height="20" fill="#1D3A5C" stroke="#6FCBE0" strokeOpacity=".4" />
        <rect x="116" y="-2" width="44" height="20" fill="#1D3A5C" stroke="#6FCBE0" strokeOpacity=".4" />
        <rect x="-22" y="-40" width="44" height="72" rx="3" fill="#9AA5AE" />
        <path d="M-18 -40 L0 -58 L18 -40 Z" fill="#9AA5AE" />
        <rect x="-22" y="-26" width="44" height="3" fill="#FFB627" />
        <rect x="-22" y="14" width="44" height="3" fill="#FFB627" />
        <circle cx="0" cy="-8" r="3.5" fill="#FFB627" />
        <g fill="#E4E4DE">
          <circle cx="-178" cy="30" r="4" />
          <circle cx="120" cy="-38" r="4" />
          <circle cx="60" cy="38" r="4" />
          <circle cx="-96" cy="-30" r="4" />
        </g>
      </svg>
    </div>
  )
}
