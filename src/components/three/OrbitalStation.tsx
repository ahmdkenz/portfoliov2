import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Line, PerformanceMonitor, PointMaterial, Points, PresentationControls } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import type { Group } from 'three'
import { Satellite, type SatelliteProps } from './Satellite'
import { Station } from './Station'
import { Planet } from './Planet'
import { DustBelt } from './DustBelt'
import { StudioLights } from './StudioLights'
import { useStage } from './useStage'
import { inSphere, starColors } from './random'
import { AMBER, AMBER_DIM, CHILL, STEEL, TEAL, VOID } from './palette'
import { useActiveSection } from '../../hooks/useActiveSection'
import type { SectionId } from '../../types/content'

/** Tiga bidang orbit; satelit dibagi ke bidang-bidang ini. Tiap cincin punya nada warna sendiri. */
const RINGS = [
  { radius: 1.9, tilt: [0.32, 0, 0.18] as const, speed: 0.11, tint: AMBER_DIM, dashed: false },
  { radius: 2.35, tilt: [-0.22, 0, -0.1] as const, speed: 0.075, tint: STEEL, dashed: false },
  { radius: 2.8, tilt: [0.12, 0, 0.3] as const, speed: 0.05, tint: TEAL, dashed: true },
]

const SATS: { id: SatelliteProps['id']; no: string; ring: number; phase: number }[] = [
  { id: 'about', no: '02', ring: 0, phase: 0.4 },
  { id: 'skills', no: '03', ring: 0, phase: 3.5 },
  { id: 'experience', no: '04', ring: 1, phase: 1.2 },
  { id: 'projects', no: '05', ring: 1, phase: 3.3 },
  { id: 'case', no: '06', ring: 1, phase: 5.3 },
  { id: 'process', no: '07', ring: 2, phase: 2.2 },
  { id: 'contact', no: '08', ring: 2, phase: 5.0 },
]

/** Kamera dasar. Ukuran frame dihitung dari angka ini, bukan dari kamera yang sedang bergerak (intro/parallax). */
const CAM_Z = 9
const FOV = 40
const FRAME_H = 2 * CAM_Z * Math.tan((FOV / 2) * (Math.PI / 180))
const INTRO_SECONDS = 1.6

function circle(radius: number, segments = 160) {
  return Array.from({ length: segments + 1 }, (_, i) => {
    const a = (i / segments) * Math.PI * 2
    return [Math.cos(a) * radius, 0, Math.sin(a) * radius] as [number, number, number]
  })
}

/** Bintang milik canvas Hero sendiri — canvas ini opaque karena Bloom, jadi starfield global tidak terlihat di baliknya. */
function HeroStars({ count }: { count: number }) {
  const ref = useRef<Group>(null)
  const positions = useMemo(() => {
    const p = inSphere(count, 30)
    // dorong ke belakang supaya semua bintang ada di latar
    for (let i = 2; i < p.length; i += 3) p[i] = -Math.abs(p[i]) - 8
    return p
  }, [count])
  const colors = useMemo(() => starColors(count, 0.06), [count])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.004
  })

  return (
    <group ref={ref}>
      <Points positions={positions} colors={colors} stride={3} frustumCulled={false}>
        <PointMaterial transparent vertexColors size={0.12} sizeAttenuation depthWrite={false} fog={false} />
      </Points>
    </group>
  )
}

interface SceneProps {
  pointer: React.RefObject<{ x: number; y: number }>
  rich: boolean
}

function Scene({ pointer, rich }: SceneProps) {
  const size = useThree((s) => s.size)
  const desktop = size.width >= 1000
  const mobile = size.width < 768
  const { activeId } = useActiveSection()
  const [hovered, setHovered] = useState<SectionId | null>(null)
  const time = useRef(0)
  const intro = useRef(0)
  const rig = useRef<Group>(null)
  const zoom = useRef<Group>(null)

  const ringPoints = useMemo(() => RINGS.map((r) => circle(r.radius)), [])

  useEffect(() => {
    document.body.classList.toggle('sat-hover', !!hovered)
    return () => document.body.classList.remove('sat-hover')
  }, [hovered])

  const onSelect = useCallback((id: SectionId) => {
    setHovered(null)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // ukuran frame di z=0 untuk kamera dasar; stasiun diletakkan relatif terhadapnya
  const frameW = FRAME_H * (size.width / size.height)
  const fit = Math.min(1, Math.max(0.7, frameW / 13))
  const layout = desktop
    ? { pos: [frameW * 0.2, FRAME_H * 0.17, 0] as const, scale: 0.85 * fit }
    : mobile
      ? { pos: [frameW * 0.12, FRAME_H * 0.3, -1] as const, scale: 0.5 }
      : { pos: [frameW * 0.18, FRAME_H * 0.24, -1] as const, scale: 0.62 }

  // planet jauh di belakang, kanan bawah; ukuran frame di kedalamannya
  const planetDepth = CAM_Z + 7
  const pH = (FRAME_H * planetDepth) / CAM_Z
  const pW = pH * (size.width / size.height)
  const planetPos: [number, number, number] = desktop ? [pW * 0.38, -pH * 0.64, -7] : [pW * 0.3, -pH * 0.62, -7]

  useFrame((state, delta) => {
    if (!hovered) time.current += delta
    if (document.body.classList.contains('ready')) intro.current = Math.min(1, intro.current + delta / INTRO_SECONDS)
    const e = 1 - Math.pow(1 - intro.current, 3)

    const progress = Math.min(window.scrollY / window.innerHeight, 1)
    const cam = state.camera
    const p = pointer.current ?? { x: 0, y: 0 }
    const tx = p.x * 0.45
    const ty = 0.9 + p.y * 0.3
    const tz = CAM_Z + (1 - e) * 6 + progress * 4
    const k = Math.min(1, delta * 2.5)
    cam.position.x += (tx - cam.position.x) * k
    cam.position.y += (ty - cam.position.y) * k
    cam.position.z += (tz - cam.position.z) * k
    cam.lookAt(0, 0.6, 0)
    if (rig.current) rig.current.rotation.y = progress * 0.9 + (1 - e) * -1.2
    if (zoom.current) zoom.current.scale.setScalar(0.7 + 0.3 * e)
  })

  return (
    <>
      <color attach="background" args={[VOID]} />
      <fog attach="fog" args={[VOID, 10, 22]} />
      <StudioLights />
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 3, 6]} intensity={1.6} color="#ffe3b0" />
      {/* rim light dari belakang: memisahkan siluet dari latar gelap */}
      <directionalLight position={[-2, 3, -6]} intensity={3} color={CHILL} />

      <HeroStars count={mobile ? 500 : 1400} />
      <Planet position={planetPos} />

      <group position={layout.pos} scale={layout.scale}>
        <group ref={zoom}>
          <PresentationControls
            enabled={desktop}
            global
            cursor={false}
            snap
            speed={1.4}
            polar={[-0.3, 0.3]}
            azimuth={[-0.7, 0.7]}
          >
            <group ref={rig}>
              <Station />
              <DustBelt count={mobile ? 400 : 1200} />
              {RINGS.map((ring, ri) => {
                const lit = SATS.some((s) => s.ring === ri && s.id === hovered)
                return (
                  <group key={ri} rotation={ring.tilt}>
                    <Line
                      points={ringPoints[ri]}
                      color={lit ? AMBER : ring.tint}
                      lineWidth={lit ? 2 : 1}
                      dashed={ring.dashed && !lit}
                      dashSize={0.18}
                      gapSize={0.12}
                      transparent
                      opacity={lit ? 1 : 0.45}
                    />
                    {SATS.filter((s) => s.ring === ri).map((s) => (
                      <Satellite
                        key={s.id}
                        id={s.id}
                        no={s.no}
                        radius={ring.radius}
                        phase={s.phase}
                        speed={ring.speed}
                        tint={ring.tint}
                        active={s.id === activeId}
                        hovered={s.id === hovered}
                        interactive={desktop}
                        trail={rich}
                        time={time}
                        onHover={setHovered}
                        onSelect={onSelect}
                      />
                    ))}
                  </group>
                )
              })}
            </group>
          </PresentationControls>
        </group>
      </group>

      {rich && (
        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur luminanceThreshold={1} luminanceSmoothing={0.2} intensity={1.1} radius={0.7} />
        </EffectComposer>
      )}
    </>
  )
}

/** Scene Home "Orbital Control Room". Render dijeda saat Hero keluar layar. */
export default function OrbitalStation() {
  const { host, pointer, visible } = useStage()
  // bloom + trail hanya di desktop, dan dimatikan bila FPS turun
  const [rich, setRich] = useState(() => window.innerWidth >= 1000)
  const [dpr, setDpr] = useState(1.75)

  return (
    <div className="hero-stage" ref={host}>
      <Canvas
        camera={{ position: [0, 0.9, CAM_Z + 6], fov: FOV }}
        dpr={[1, dpr]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        frameloop={visible ? 'always' : 'never'}
      >
        <PerformanceMonitor
          onDecline={() => {
            setRich(false)
            setDpr(1)
          }}
        />
        <Scene pointer={pointer} rich={rich} />
      </Canvas>
    </div>
  )
}
