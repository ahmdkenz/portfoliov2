import { useT } from '../../context/LanguageContext'
import { SectionHead } from '../ui/SectionHead'
import { Reveal } from '../ui/Reveal'
import { aboutLede, aboutParagraphs, softSkills, specRows } from '../../data/profile'

export function About() {
  const { t, tr } = useT()

  return (
    <section className="sect sect--light" id="about">
      <div className="wrap">
        <SectionHead index="Sec 02" title={t('about.h')} tail={t('about.tail')} />
        <div className="about-grid">
          <Reveal>
            <p className="lede">
              {tr(aboutLede.before)}
              <b>{tr(aboutLede.highlight)}</b>
            </p>
            <p>{tr(aboutParagraphs[0])}</p>
            <p>{tr(aboutParagraphs[1])}</p>
            <div className="softskills">
              {softSkills.map((skill) => (
                <span className="chip" key={skill.en}>
                  {tr(skill)}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div className="spec">
              {specRows.map((row) => (
                <div className="spec-row" key={row.k.en}>
                  <span className="k">{tr(row.k)}</span>
                  <span className="v">
                    {tr(row.v)}
                    {row.sub && <small>{tr(row.sub)}</small>}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
