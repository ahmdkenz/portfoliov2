import { useT } from '../../context/LanguageContext'
import { SectionHead } from '../ui/SectionHead'
import { Reveal } from '../ui/Reveal'
import { Tilt } from '../ui/Tilt'
import { caseStudy } from '../../data/caseStudy'

const FLOW = [
  { key: 'cs.f1', tag: 'IN' },
  { key: 'cs.f2', tag: 'SYNC' },
  { key: 'cs.f3', tag: 'AUTO' },
  { key: 'cs.f4', tag: 'OUT' },
] as const

export function CaseStudy() {
  const { t, tr } = useT()
  const cs = caseStudy

  const spec = [
    { k: t('cs.k1'), v: cs.client },
    { k: t('cs.k2'), v: tr(cs.sector) },
    { k: t('cs.k3'), v: tr(cs.role) },
    { k: t('cs.k4'), v: cs.stack },
    { k: t('cs.k5'), v: tr(cs.period) },
  ]

  return (
    <section className="sect sect--case" id="case">
      <div className="wrap">
        <SectionHead index="Sec 06" title={t('cs.h')} tail={t('cs.tail')} />

        <div className="case-grid">
          <Reveal className="case-meta">
            <h3 className="case-title">{tr(cs.title)}</h3>
            <div className="case-spec">
              {spec.map((row) => (
                <div className="cs-row" key={row.k}>
                  <span className="k">{row.k}</span>
                  <span className="v">{row.v}</span>
                </div>
              ))}
            </div>
            <div className="case-flow" aria-hidden="true">
              <span className="cf-pulse" />
              {FLOW.map((f) => (
                <div className="cf-box" key={f.key}>
                  <span>{t(f.key)}</span>
                  <b>{f.tag}</b>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="case-body">
            <Reveal className="case-block">
              <div className="cb-head">
                <span className="mono">01</span>
                <h4>{t('cs.b1h')}</h4>
              </div>
              <p>{tr(cs.problem)}</p>
            </Reveal>

            <Reveal className="case-block">
              <div className="cb-head">
                <span className="mono">02</span>
                <h4>{t('cs.b2h')}</h4>
              </div>
              <ul className="case-list">
                {cs.constraints.map((c) => (
                  <li key={c.en}>{tr(c)}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="case-block">
              <div className="cb-head">
                <span className="mono">03</span>
                <h4>{t('cs.b3h')}</h4>
              </div>
              <div className="case-steps">
                {cs.steps.map((s, i) => (
                  <div className="cstep" key={s.title.en}>
                    <span className="mono">{String.fromCharCode(65 + i)}</span>
                    <div>
                      <strong>{tr(s.title)}</strong>
                      <p>{tr(s.desc)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="case-block">
              <div className="cb-head">
                <span className="mono">04</span>
                <h4>{t('cs.b4h')}</h4>
              </div>
              <div className="case-out">
                {cs.outcomes.map((o) => (
                  <Tilt className="cout" key={o.value.en}>
                    <span className="big">{tr(o.value)}</span>
                    <span className="mono">{tr(o.label)}</span>
                  </Tilt>
                ))}
              </div>
              <p className="case-note">{tr(cs.note)}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
