import { useState } from 'react'

/** Foto bulat ringkas untuk header panel HUD di Hero; siluet bila foto gagal dimuat. */
export function Portrait() {
  const [broken, setBroken] = useState(false)

  return (
    <span className="avatar">
      {broken ? (
        <svg viewBox="0 0 64 64" width={34} height={34} fill="none" stroke="#5F676D" strokeWidth={2.2} aria-hidden="true">
          <circle cx="32" cy="23" r="11" />
          <path d="M11 57c2-11 10.5-17 21-17s19 6 21 17" />
        </svg>
      ) : (
        <img
          src="/img/my-photo.webp"
          alt="Ahmad Nur Hafidz"
          width={64}
          height={64}
          decoding="async"
          onError={() => setBroken(true)}
        />
      )}
    </span>
  )
}
