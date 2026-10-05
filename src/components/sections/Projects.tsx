import { lazy, Suspense } from 'react'
import { useT } from '../../context/LanguageContext'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useWebGL } from '../../hooks/useWebGL'
import { SectionHead } from '../ui/SectionHead'
import { Reveal } from '../ui/Reveal'
import { Shot } from '../ui/Shot'
import { Tilt } from '../ui/Tilt'
import { ProjectLinks } from '../ui/ProjectLinks'
import { ProjectCard } from '../ui/ProjectCard'
import { projects } from '../../data/projects'

const PhoneMockup = lazy(() => import('../three/PhoneMockup'))

/** indentasi tangga diagram alur: langkah 1 rata kiri, 2 menjorok, 3+ menjorok lagi */
const FLOW_STEP = ['', 'mid', 'end'] as const

export function Projects() {
  const { t, tr } = useT()
  const flagship = projects.find((p) => p.featured)!
  const rest = projects.filter((p) => !p.featured)
  const phone = flagship.frame === 'phone'
  const webgl = useWebGL()
  const reduced = usePrefersReducedMotion()
  const phone3d = phone && webgl && !reduced

  return (
    <section className="sect sect--proj" id="projects">
      <div className="wrap">
        <SectionHead index="Sec 05" title={t('proj.h')} tail={t('proj.tail')} />

        <Reveal className="tilt-host feature-host">
          <Tilt className="feature" max={2.5}>
            <div className="feature-txt">
              <span className="mono">{t('proj.flag')}</span>
              <h3>{tr(flagship.title)}</h3>
              {flagship.subtitle && <span className="mono feature-sub">{flagship.subtitle}</span>}
              <p>{tr(flagship.desc)}</p>
              <div className="ftags">
                {flagship.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
              <ProjectLinks live={flagship.live} repo={flagship.repo} />
            </div>
            <div className={phone ? 'feature-vis feature-vis--phone' : 'feature-vis'}>
              {phone ? (
                <div className="phone-stage" role="img" aria-label={tr(flagship.title)}>
                  {phone3d ? (
                    <Suspense fallback={<Shot variant="phone" eager src={flagship.image} alt="" />}>
                      <PhoneMockup src={flagship.image} />
                    </Suspense>
                  ) : (
                    <Shot variant="phone" eager src={flagship.image} alt="" />
                  )}
                  {phone3d && <span className="phone-hint mono">{t('proj.drag')}</span>}
                </div>
              ) : (
                <Shot variant="feature" eager src={flagship.image} alt={tr(flagship.title)} />
              )}
              {flagship.flow && (
                <div className="flow">
                  <span className="flow-pulse" />
                  {flagship.flow.map((step, i) => (
                    <div className={['flow-box', FLOW_STEP[Math.min(i, 2)]].filter(Boolean).join(' ')} key={step.tag}>
                      <span>{tr(step.label)}</span>
                      <b>{step.tag}</b>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Tilt>
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
