import { useT } from '../../context/LanguageContext'
import { useTypewriter } from '../../hooks/useTypewriter'
import { Portrait } from '../ui/Portrait'
import { Panel } from '../ui/Panel'
import { heroRoles, panelPlain } from '../../data/profile'

export function Hero() {
  const { t, lang } = useT()
  const role = useTypewriter(heroRoles[lang])

  return (
    <section className="hero" id="home">
      <div className="hero-grid-bg" />
      <div className="hero-scan" />
      <div className="wrap hero-inner">
        <div>
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
          </div>
        </div>

        <div className="hero-side">
          <Portrait />
          <Panel
            title={t('panel.title')}
            showClock
            rows={[
              { k: t('panel.k1'), v: panelPlain.role },
              { k: t('panel.k2'), v: t('panel.v2') },
              { k: t('panel.k3'), v: t('panel.v3'), accent: true },
              { k: t('panel.k4'), v: panelPlain.core },
              { k: t('panel.k5'), v: t('panel.v5') },
            ]}
          />
        </div>
      </div>
    </section>
  )
}
