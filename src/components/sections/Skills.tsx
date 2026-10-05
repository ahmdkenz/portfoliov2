import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { useT } from '../../context/LanguageContext'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useWebGL } from '../../hooks/useWebGL'
import { SectionHead } from '../ui/SectionHead'
import { Reveal } from '../ui/Reveal'
import { SkillChips } from '../ui/SkillChips'
import { SkillReadout } from '../ui/SkillReadout'
import { skillModules } from '../../data/skills'

const SkillsAtom = lazy(() => import('../three/skills/SkillsAtom'))

const CYCLE_MS = 4000

export function Skills() {
  const { t } = useT()
  const reduced = usePrefersReducedMotion()
  const webgl = useWebGL()
  const show3d = webgl && !reduced

  const [selected, setSelected] = useState(skillModules[0].id)
  const [hovered, setHovered] = useState<string | null>(null)
  // setelah user memilih sendiri, auto-cycle berhenti permanen
  const [locked, setLocked] = useState(false)

  useEffect(() => {
    if (locked || hovered || reduced) return
    const id = window.setInterval(() => {
      setSelected((cur) => {
        const i = skillModules.findIndex((m) => m.id === cur)
        return skillModules[(i + 1) % skillModules.length].id
      })
    }, CYCLE_MS)
    return () => window.clearInterval(id)
  }, [locked, hovered, reduced])

  const onSelect = useCallback((id: string) => {
    setSelected(id)
    setLocked(true)
  }, [])

  const focus = skillModules.find((m) => m.id === (hovered ?? selected)) ?? skillModules[0]

  return (
    <section className="sect sect--skills" id="skills">
      <div className="wrap">
        <SectionHead index="Sec 03" title={t('skills.h')} tail={t('skills.tail')} />

        <Reveal className={show3d ? 'skills-lab' : 'skills-lab skills-lab--flat'}>
          {show3d && (
            <div className="skills-stage-wrap">
              <Suspense fallback={<div className="skills-stage" />}>
                <SkillsAtom selected={selected} hovered={hovered} onHover={setHovered} onSelect={onSelect} />
              </Suspense>
              <span className="skills-hint mono">{t('skills.hint')}</span>
            </div>
          )}
          <SkillReadout module={focus} />
        </Reveal>

        <SkillChips selected={selected} onHover={setHovered} onSelect={onSelect} />
      </div>
    </section>
  )
}
