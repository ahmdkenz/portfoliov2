import { useRef, type Ref } from 'react'
import { motion, useScroll } from 'motion/react'
import { useT } from '../../context/LanguageContext'
import { useReveal } from '../../hooks/useReveal'
import { SectionHead } from '../ui/SectionHead'
import { StatusChip } from '../ui/StatusChip'
import { experience } from '../../data/experience'
import type { ExperienceEntry } from '../../types/content'

function ExperienceNode({ entry }: { entry: ExperienceEntry }) {
  const { tr } = useT()
  const { ref, inView } = useReveal<HTMLElement>()
  const stateClass = inView ? (entry.status === 'running' ? 'live' : 'locked') : ''

  return (
    <article className={['node', stateClass].filter(Boolean).join(' ')} ref={ref as Ref<HTMLElement>}>
      <span className="marker" />
      <div className="when">{tr(entry.period)}</div>
      <div className="card">
        <div className="card-top">
          <div>
            <h3>{entry.company}</h3>
            <span className="loc">{entry.location}</span>
          </div>
          <StatusChip status={entry.status} />
        </div>
        <div className="card-body">
          <div className="role">
            <span className="bar" />
            {tr(entry.role)}
          </div>
          <ul className="log">
            {entry.points.map((point, i) => (
              <li key={i}>{tr(point)}</li>
            ))}
          </ul>
        </div>
        <div className="card-foot">
          {entry.tags.map((tag) => (
            <span className="tagsm" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export function Experience() {
  const { t } = useT()
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 70%', 'end 40%'],
  })

  return (
    <section className="sect sect--exp" id="experience">
      <div className="wrap">
        <SectionHead index="Sec 04" title={t('exp.h')} tail={t('exp.tail')} />
        <div className="track" ref={trackRef}>
          <div className="track-rail">
            <motion.div
              style={{
                position: 'absolute',
                insetInline: 0,
                top: 0,
                height: '100%',
                originY: 0,
                scaleY: scrollYProgress,
                background: 'linear-gradient(180deg, var(--color-amber), #8c5f10)',
                boxShadow: '0 0 14px rgba(255,182,39,.5)',
              }}
            />
          </div>
          {experience.map((entry) => (
            <ExperienceNode entry={entry} key={entry.company} />
          ))}
        </div>
      </div>
    </section>
  )
}
