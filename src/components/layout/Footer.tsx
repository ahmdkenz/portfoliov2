import { useT } from '../../context/LanguageContext'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export function Footer() {
  const { t } = useT()
  const reduced = usePrefersReducedMotion()

  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <span className="mono">© {new Date().getFullYear()} Ahmad Nur Hafidz — Fullstack Developer</span>
        <span className="mono hide-s">{t('foot.built')}</span>
        <button
          className="uptop"
          onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}
        >
          {t('foot.top')}
        </button>
      </div>
    </footer>
  )
}
