import { useT } from '../../context/LanguageContext'
import { SectionHead } from '../ui/SectionHead'
import { Reveal } from '../ui/Reveal'
import { Tilt } from '../ui/Tilt'
import { processLede, processSteps } from '../../data/process'

export function Process() {
  const { t, tr } = useT()

  return (
    <section className="sect sect--process" id="process">
      <div className="wrap">
        <SectionHead index="Sec 07" title={t('pr.h')} tail={t('pr.tail')} />

        <Reveal className="pr-lede">{tr(processLede)}</Reveal>

        <div className="pline">
          <span className="pline-rail" aria-hidden="true" />
          {processSteps.map((step, i) => (
            <Reveal className="tilt-host" key={step.title.en}>
              <Tilt className="pstation">
                <span className="mono pst-no">{String(i + 1).padStart(2, '0')}</span>
                <h4>{tr(step.title)}</h4>
                <p>{tr(step.desc)}</p>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
