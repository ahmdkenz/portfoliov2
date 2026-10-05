import { useT } from '../../context/LanguageContext'
import { skillGroups, skillModules } from '../../data/skills'
import { stackIcons } from '../icons/StackIcons'

interface SkillChipsProps {
  selected: string
  onHover: (id: string | null) => void
  onSelect: (id: string) => void
}

/**
 * Daftar stack per kategori. Selain jadi navigasi yang bisa diakses keyboard/tanpa 3D,
 * SVG ikon di sini (`data-icon`) juga sumber tekstur logo koin di scene Skills.
 */
export function SkillChips({ selected, onHover, onSelect }: SkillChipsProps) {
  const { tr } = useT()

  return (
    <div className="skill-chips">
      {skillGroups.map((g) => (
        <div className="chip-group" key={g.id}>
          <span className="mono chip-group-h">
            <b>{g.code}</b> / {tr(g.title)}
          </span>
          <div className="chip-row">
            {skillModules
              .filter((m) => m.group === g.id)
              .map((m) => {
                const Icon = stackIcons[m.icon]
                return (
                  <button
                    type="button"
                    key={m.id}
                    className="skill-chip"
                    aria-pressed={m.id === selected}
                    onPointerEnter={() => onHover(m.id)}
                    onPointerLeave={() => onHover(null)}
                    onFocus={() => onHover(m.id)}
                    onBlur={() => onHover(null)}
                    onClick={() => onSelect(m.id)}
                  >
                    <Icon className="chip-ico" data-icon={m.icon} aria-hidden="true" />
                    {m.name}
                  </button>
                )
              })}
          </div>
        </div>
      ))}
    </div>
  )
}
