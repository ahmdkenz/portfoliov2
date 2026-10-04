import { lazy, Suspense } from 'react'
import { useT } from '../../context/LanguageContext'
import { useTypewriter } from '../../hooks/useTypewriter'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useWebGL } from '../../hooks/useWebGL'
import { Portrait } from '../ui/Portrait'
import { Panel } from '../ui/Panel'
import { HeroFallback } from '../three/HeroFallback'
import { cvHref, heroRoles, panelPlain } from '../../data/profile'

const OrbitalStation = lazy(() => import('../three/OrbitalStation'))

export function Hero() {
  const { t, lang } = useT()
  const role = useTypewriter(heroRoles[lang])
  const reduced = usePrefersReducedMotion()
  const webgl = useWebGL()

  return (
    <section className="hero" id="home">
      {webgl && !reduced ? (
        <Suspense fallback={null}>
          <OrbitalStation />
        </Suspense>
      ) : (
        <HeroFallback />
      )}

      <div className="wrap hero-inner">
        <div className="hero-copy">
          <div className="eyebrow mono">
            <span className="dot" />
            <span>{t('hero.loc')}</span>
            <span className="div" />
            <span>{t('hero.avail')}</span>
          </div>
          <h1 className="display">
            <span className="ln">
              <span>Ahmad Nur</span>
            </span>
            <span className="ln">
              <span className="thin">Hafidz</span>
            </span>
          </h1>
          <div className="role-line">
            <span className="tag">Line 01 //</span>
            <span id="role">{role}</span>
          </div>
          <p className="hero-sub">{t('hero.sub')}</p>
          <div className="hero-cta">
            <a href="#experience" className="btn btn--fill">
              <span>{t('hero.cta1')}</span> <i />
            </a>
            <a href="#projects" className="btn btn--ghost">
              <span>{t('hero.cta2')}</span> <i />
            </a>
            <a href={cvHref} className="btn btn--ghost" target="_blank" rel="noopener noreferrer">
              <span>{t('nav.cta')}</span> <i />
            </a>
          </div>
        </div>

        <div className="hero-side">
          <Panel
            title={t('panel.title')}
            showClock
            lead={
              <>
                <Portrait />
                <span>
                  <strong>Ahmad Nur Hafidz</strong>
                  <span className="mono">{panelPlain.role}</span>
                </span>
              </>
            }
            rows={[
              { k: t('panel.k2'), v: t('panel.v2') },
              { k: t('panel.k3'), v: t('panel.v3'), accent: true },
              { k: t('panel.k4'), v: panelPlain.core },
              { k: t('panel.k5'), v: t('panel.v5') },
            ]}
          />
        </div>
      </div>

      {webgl && !reduced && <span className="hero-hint mono">{t('hero.hint')}</span>}
    </section>
  )
}
