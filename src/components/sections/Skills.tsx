import { useT } from '../../context/LanguageContext'
import { SectionHead } from '../ui/SectionHead'
import { Reveal } from '../ui/Reveal'
import { Tilt } from '../ui/Tilt'
import { skillModules } from '../../data/skills'
import { stackIcons } from '../icons/StackIcons'

export function Skills() {
  const { t, tr } = useT()

  return (
    <section className="sect sect--skills" id="skills">
      <div className="wrap">
        <SectionHead index="Sec 03" title={t('skills.h')} tail={t('skills.tail')} />

        <Reveal className="mods" style={{ marginBottom: 0 }}>
          {skillModules.map((mod) => {
            const Icon = stackIcons[mod.icon]
            return (
              <Tilt as="article" className="mod" key={mod.id}>
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
              </Tilt>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
