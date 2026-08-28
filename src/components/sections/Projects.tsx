import { useT } from '../../context/LanguageContext'
import { SectionHead } from '../ui/SectionHead'
import { Reveal } from '../ui/Reveal'
import { Shot } from '../ui/Shot'
import { ProjectLinks } from '../ui/ProjectLinks'
import { ProjectCard } from '../ui/ProjectCard'
import { projects } from '../../data/projects'

export function Projects() {
  const { t, tr } = useT()
  const flagship = projects.find((p) => p.featured)!
  const rest = projects.filter((p) => !p.featured)

  return (
    <section className="sect sect--proj" id="projects">
      <div className="wrap">
        <SectionHead index="Sec 05" title={t('proj.h')} tail={t('proj.tail')} />

        <Reveal className="feature">
          <div className="feature-txt">
            <span className="mono">{t('proj.flag')}</span>
            <h3>{tr(flagship.title)}</h3>
            <p>{tr(flagship.desc)}</p>
            <div className="ftags">
              {flagship.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <ProjectLinks live={flagship.live} repo={flagship.repo} />
          </div>
          <div className="feature-vis">
            <Shot variant="feature" eager src={flagship.image} alt={tr(flagship.title)} />
            <div className="flow">
              <span className="flow-pulse" />
              <div className="flow-box">
                <span>{t('flow.1')}</span>
                <b>IN</b>
              </div>
              <div className="flow-box mid">
                <span>Inventory</span>
                <b>SYNC</b>
              </div>
              <div className="flow-box end">
                <span>Finance / AR-AP</span>
                <b>OUT</b>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="pgrid">
          {rest.map((project) => (
            <ProjectCard project={project} key={project.code} />
          ))}
        </div>
      </div>
    </section>
  )
}
