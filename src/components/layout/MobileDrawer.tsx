import { useT } from '../../context/LanguageContext'
import { SECTION_IDS } from '../../types/content'

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
}

const NAV_KEYS = SECTION_IDS.map((id) => `nav.${id}` as const)

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const { t } = useT()

  return (
    <nav className={open ? 'drawer open' : 'drawer'} aria-label="Mobile">
      {SECTION_IDS.map((id, i) => (
        <a key={id} href={`#${id}`} onClick={onClose}>
          <span>{String(i + 1).padStart(2, '0')}</span>
          <em style={{ fontStyle: 'normal' }}>{t(NAV_KEYS[i])}</em>
        </a>
      ))}
    </nav>
  )
}
