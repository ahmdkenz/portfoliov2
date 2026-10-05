import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Line, PresentationControls } from '@react-three/drei'
import type { Group } from 'three'
import { EnergyCore } from './EnergyCore'
import { StackToken } from './StackToken'
import { createIconTextures, paintIconTextures } from './iconTextures'
import { StudioLights } from '../StudioLights'
import { useStage } from '../useStage'
import { AMBER, AMBER_DIM, CHILL, STEEL_LIGHT, TEAL } from '../palette'
import { skillGroups, skillModules } from '../../../data/skills'
import type { SkillGroupId } from '../../../types/content'

/** Orbit bergaya simbol atom: sangat miring dan saling silang, satu per kategori. */
const ORBITS: Record<SkillGroupId, { radius: number; tilt: [number, number, number]; speed: number; tint: string }> = {
  fe: { radius: 2.9, tilt: [1.15, 0, 0], speed: 0.16, tint: AMBER },
  mobile: { radius: 2.4, tilt: [1.15, 0, 1.0], speed: 0.21, tint: CHILL },
  env: { radius: 2.05, tilt: [1.15, 0, -1.0], speed: 0.24, tint: STEEL_LIGHT },
  data: { radius: 2.65, tilt: [0.35, 0, 0.5], speed: 0.18, tint: AMBER_DIM },
  cloud: { radius: 1.75, tilt: [0.4, 0, -0.6], speed: 0.28, tint: TEAL },
}

/** koin per kategori + fasenya (dibagi rata, digeser per kategori supaya tidak bertumpuk) */
const TOKENS = skillGroups.flatMap((g, gi) => {
  const mods = skillModules.filter((m) => m.group === g.id)
  return mods.map((m, i) => ({ module: m, orbit: ORBITS[g.id], phase: (i / mods.length) * Math.PI * 2 + gi * 1.3 }))
})

function circle(radius: number, segments = 160) {
  return Array.from({ length: segments + 1 }, (_, i) => {
    const a = (i / segments) * Math.PI * 2
    return [Math.cos(a) * radius, 0, Math.sin(a) * radius] as [number, number, number]
  })
}

export interface SkillsAtomProps {
  selected: string
  hovered: string | null
  onHover: (id: string | null) => void
  onSelect: (id: string) => void
}

interface SceneProps extends SkillsAtomProps {
  pointer: React.RefObject<{ x: number; y: number }>
}

function Scene({ selected, hovered, onHover, onSelect, pointer }: SceneProps) {
  const width = useThree((s) => s.size.width)
  const mobile = width < 768
  const time = useRef(0)
  const rig = useRef<Group>(null)

  const textures = useMemo(() => createIconTextures(skillModules.map((m) => m.icon)), [])
  useEffect(() => {
    const cancel = paintIconTextures(textures, document)
    return () => {
      cancel()
      textures.forEach((tex) => tex.dispose())
    }
  }, [textures])

  const orbitPoints = useMemo(
    () => Object.fromEntries(skillGroups.map((g) => [g.id, circle(ORBITS[g.id].radius)])) as Record<SkillGroupId, [number, number, number][]>,
    [],
  )

  const focus = hovered ?? selected
  const focusGroup = skillModules.find((m) => m.id === focus)?.group

  useFrame((state, delta) => {
    if (!hovered) time.current += delta
    if (!rig.current) return
    // parallax pointer + ayunan pelan supaya orbit terlihat dari sudut berbeda
    const p = pointer.current ?? { x: 0, y: 0 }
    const k = Math.min(1, delta * 2.5)
    const tx = p.y * 0.18 + Math.sin(state.clock.elapsedTime * 0.15) * 0.12
    const ty = p.x * 0.3
    rig.current.rotation.x += (tx - rig.current.rotation.x) * k
    rig.current.rotation.y += (ty - rig.current.rotation.y) * k
  })

  return (
    <>
      <StudioLights />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 6]} intensity={1.2} color="#ffe3b0" />
      <directionalLight position={[-3, -2, -6]} intensity={1.5} color={CHILL} />

      <group scale={mobile ? 0.78 : 1}>
        <PresentationControls enabled={!mobile} global cursor={false} snap speed={1.4} polar={[-0.4, 0.4]} azimuth={[-0.8, 0.8]}>
          <group ref={rig}>
            <EnergyCore particles={mobile ? 90 : 220} />
            {skillGroups.map((g) => {
              const o = ORBITS[g.id]
              const lit = g.id === focusGroup
              return (
                <group key={g.id} rotation={o.tilt}>
                  <Line
                    points={orbitPoints[g.id]}
                    color={o.tint}
                    lineWidth={lit ? 1.8 : 1}
                    transparent
                    opacity={lit ? 0.9 : 0.32}
                  />
                  {TOKENS.filter((tk) => tk.module.group === g.id).map((tk) => (
                    <StackToken
                      key={tk.module.id}
                      id={tk.module.id}
                      name={tk.module.name}
                      texture={textures.get(tk.module.icon)}
                      radius={o.radius}
                      phase={tk.phase}
                      speed={o.speed}
                      tint={o.tint}
                      selected={tk.module.id === selected}
                      hovered={tk.module.id === hovered}
                      labels={!mobile}
                      time={time}
                      onHover={onHover}
                      onSelect={onSelect}
                    />
                  ))}
                </group>
              )
            })}
          </group>
        </PresentationControls>
      </group>
    </>
  )
}

/** Scene Skills "Inti Energi": stack mengorbit reaktor plasma, satu orbit per kategori. Transparan — starfield global tetap terlihat. */
export default function SkillsAtom(props: SkillsAtomProps) {
  const { host, pointer, visible } = useStage()

  return (
    <div className="skills-stage" ref={host}>
      <Canvas
        camera={{ position: [0, 0.4, 8.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        frameloop={visible ? 'always' : 'never'}
      >
        <Scene {...props} pointer={pointer} />
      </Canvas>
    </div>
  )
}
