import { useT } from '../../context/LanguageContext'
import { SectionHead } from '../ui/SectionHead'
import { Reveal } from '../ui/Reveal'
import { skillGroups } from '../../data/skills'
import { stackIcons } from '../icons/StackIcons'

export function Skills() {
  const { t, tr } = useT()

  return (
    <section className="sect sect--skills" id="skills">
      <div className="wrap">
        <SectionHead index="Sec 03" title={t('skills.h')} tail={t('skills.tail')} />

        {skillGroups.map((group, gi) => (
          <Reveal
            className="stack-group"
            key={group.code}
            style={gi === skillGroups.length - 1 ? { marginBottom: 0 } : undefined}
          >
            <div className="group-bar">
              <span className="mono">{group.code}</span>
              <h3>{tr(group.title)}</h3>
              <span className="rule" />
              <span className="mono">
                <span>{String(group.modules.length).padStart(2, '0')}</span> <span>{t('skills.unit')}</span>
              </span>
            </div>
            <div className="mods">
              {group.modules.map((mod) => {
                const Icon = stackIcons[mod.icon]
                return (
                  <article className="mod" key={mod.id}>
                    <div className="id">
                      <span>{mod.id}</span>
                      <span className="lamp" />
                    </div>
                    <Icon className="ico" />
                    <h4>{mod.name}</h4>
                    <p>{tr(mod.desc)}</p>
                    <div className="strip">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <i key={i} />
                      ))}
                    </div>
                  </article>
                )
              })}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
