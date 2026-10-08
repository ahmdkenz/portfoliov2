import { useT } from '../../context/LanguageContext'
import { useActiveId } from '../../hooks/useActiveSection'
import { SECTION_IDS } from '../../types/content'
import { cvHref } from '../../data/profile'

interface TopBarProps {
  drawerOpen: boolean
  onToggleDrawer: () => void
}

const NAV_KEYS = SECTION_IDS.map((id) => `nav.${id}` as const)

export function TopBar({ drawerOpen, onToggleDrawer }: TopBarProps) {
  const { t, lang, setLang } = useT()
  const activeId = useActiveId()

  return (
    <header className="topbar">
      <a href="#home" className="brand">
        <span className="led" />
        ANH<span style={{ color: 'var(--color-steel-dim)', fontWeight: 500 }}>/</span>DEV
      </a>
      <nav className="navlinks" aria-label="Primary">
        {SECTION_IDS.map((id, i) => (
          <a key={id} href={`#${id}`} className={id === activeId ? 'active' : undefined}>
            {t(NAV_KEYS[i])}
          </a>
        ))}
      </nav>
      <div className="lang" role="group" aria-label="Language">
        <button type="button" aria-pressed={lang === 'id'} onClick={() => setLang('id')}>
          ID
        </button>
        <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>
          EN
        </button>
      </div>
      <a
        href={cvHref}
        className="top-cta"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('nav.cta')}
      </a>
      <button
        className={drawerOpen ? 'burger open' : 'burger'}
        aria-label="Menu"
        aria-expanded={drawerOpen}
        onClick={onToggleDrawer}
      >
        <i />
        <i />
        <i />
      </button>
    </header>
  )
}
