import { useState } from 'react'
import { useT } from '../../context/LanguageContext'

export function Portrait() {
  const { t } = useT()
  const [broken, setBroken] = useState(false)

  return (
    <figure className="portrait">
      <span className="profile-ring" aria-hidden="true" />
      <div className="arch">
        <div className="arch-bg">
          <div className="portrait-ph" aria-hidden="true">
            <svg viewBox="0 0 64 64" width="52" height="52" fill="none" stroke="#5F676D" strokeWidth={2.2}>
              <circle cx="32" cy="23" r="11" />
              <path d="M11 57c2-11 10.5-17 21-17s19 6 21 17" />
            </svg>
            <span className="mono">{t('photo.ph')}</span>
          </div>
        </div>
        {!broken && (
          <img
            src="/img/my%20photo.png"
            alt="Ahmad Nur Hafidz"
            className="portrait-img"
            onError={() => setBroken(true)}
          />
        )}
      </div>
      <span className="ground" aria-hidden="true" />
    </figure>
  )
}
