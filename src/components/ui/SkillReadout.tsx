import { useT } from '../../context/LanguageContext'
import { skillGroups } from '../../data/skills'
import { stackIcons } from '../icons/StackIcons'
import type { SkillModule } from '../../types/content'

/** Panel HUD yang membaca stack yang sedang disorot/dipilih: kode, kategori, nama, deskripsi. */
export function SkillReadout({ module }: { module: SkillModule }) {
  const { t, tr } = useT()
  const groupIndex = skillGroups.findIndex((g) => g.id === module.group)
  const group = skillGroups[groupIndex]
  const Icon = stackIcons[module.icon]

  return (
    <aside className="readout" aria-live="polite">
      <div className="readout-top">
        <span className="led" />
        <span className="mono">{t('skills.readout')}</span>
        <span className="mono readout-code">{module.id}</span>
      </div>
      {/* key = id -> animasi fade diputar ulang tiap ganti modul */}
      <div className="readout-body" key={module.id}>
        <Icon className="readout-ico" aria-hidden="true" />
        <h3>{module.name}</h3>
        <p>{tr(module.desc)}</p>
      </div>
      <div className="readout-meta">
        <div>
          <span className="k">{group.code}</span>
          <span className="v">{tr(group.title)}</span>
        </div>
        <div>
          <span className="k">{t('skills.orbit')}</span>
          <span className="v">{String(groupIndex + 1).padStart(2, '0')} / {String(skillGroups.length).padStart(2, '0')}</span>
        </div>
      </div>
    </aside>
  )
}
