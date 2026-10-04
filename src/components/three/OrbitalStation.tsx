import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import type { Group, MeshStandardMaterial } from 'three'
import { Satellite, type SatelliteProps } from './Satellite'
import { useActiveSection } from '../../hooks/useActiveSection'
import type { SectionId } from '../../types/content'

const AMBER = '#FFB627'
const AMBER_DIM = '#B37D18'
const CHILL = '#6FCBE0'
const HULL = '#2a333b'

/** Tiga bidang orbit; satelit dibagi ke bidang-bidang ini (radius, kemiringan, kecepatan). */
const RINGS = [
  { radius: 2.1, tilt: [0.32, 0, 0.18] as const, speed: 0.11 },
  { radius: 2.75, tilt: [-0.22, 0, -0.1] as const, speed: 0.075 },
  { radius: 3.35, tilt: [0.12, 0, 0.3] as const, speed: 0.05 },
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

function circle(radius: number, segments = 128) {
  return Array.from({ length: segments + 1 }, (_, i) => {
    const a = (i / segments) * Math.PI * 2
    return [Math.cos(a) * radius, 0, Math.sin(a) * radius] as [number, number, number]
  })
}

/** Stasiun inti: badan silinder, cincin dok berputar dengan sapuan cahaya amber, truss + panel, lampu berdenyut. */
function Station() {
  const dock = useRef<Group>(null)
  const sweep = useRef<Group>(null)
  const dataRing = useRef<Group>(null)
  const lamp = useRef<MeshStandardMaterial>(null)

  useFrame((state, delta) => {
    if (dock.current) dock.current.rotation.y += delta * 0.14
    if (sweep.current) sweep.current.rotation.y -= delta * 0.9
    if (dataRing.current) dataRing.current.rotation.y -= delta * 0.05
    if (lamp.current) {
      // ritme sama dengan LED brand di TopBar (2.4 detik)
      const k = (Math.sin((state.clock.elapsedTime / 2.4) * Math.PI * 2) + 1) / 2
      lamp.current.emissiveIntensity = 0.5 + k * 2.6
    }
  })

  const hull = <meshStandardMaterial color={HULL} metalness={0.55} roughness={0.4} />

  return (
    <group rotation={[0.38, 0, -0.14]}>
      {/* badan */}
      <mesh>
        <cylinderGeometry args={[0.42, 0.42, 1.3, 28]} />
        {hull}
      </mesh>
      <mesh position={[0, 0.82, 0]}>
        <coneGeometry args={[0.32, 0.34, 28]} />
        {hull}
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.5, 6]} />
        <meshStandardMaterial color="#8A9198" />
      </mesh>
      <mesh position={[0, -0.95, 0]}>
        <cylinderGeometry args={[0.24, 0.34, 0.3, 28]} />
        {hull}
      </mesh>
      {[-0.36, 0.36].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.43, 0.018, 8, 48]} />
          <meshStandardMaterial color={AMBER_DIM} emissive={AMBER_DIM} emissiveIntensity={0.6} />
        </mesh>
      ))}

      {/* cincin dok + jari-jari + modul */}
      <group ref={dock} position={[0, 0.05, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.25, 0.05, 12, 96]} />
          {hull}
        </mesh>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} rotation={[0, (i * Math.PI) / 2, 0]} position={[0, 0, 0]}>
            <boxGeometry args={[2.5, 0.025, 0.025]} />
            <meshStandardMaterial color="#3a444a" metalness={0.6} roughness={0.4} />
          </mesh>
        ))}
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2 + Math.PI / 8
          return (
            <mesh key={i} position={[Math.cos(a) * 1.25, 0, Math.sin(a) * 1.25]} rotation={[0, -a, 0]}>
              <boxGeometry args={[0.16, 0.12, 0.22]} />
              {hull}
            </mesh>
          )
        })}
        <group ref={sweep}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.25, 0.068, 8, 40, Math.PI / 5]} />
            <meshBasicMaterial color={AMBER} transparent opacity={0.85} />
          </mesh>
        </group>
      </group>

      {/* cincin data tipis, cyan */}
      <group ref={dataRing} rotation={[0.5, 0, 0.2]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.7, 0.008, 6, 128]} />
          <meshBasicMaterial color={CHILL} transparent opacity={0.4} />
        </mesh>
      </group>

      {/* truss + panel surya */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[3.6, 0.045, 0.045]} />
        <meshStandardMaterial color="#3a444a" metalness={0.6} roughness={0.4} />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 2.25, -0.2, 0]}>
          {[-0.26, 0.26].map((z) => (
            <mesh key={z} position={[0, 0, z]} rotation={[0.25, 0, 0]}>
              <boxGeometry args={[0.95, 0.02, 0.44]} />
              <meshStandardMaterial color="#132131" metalness={0.3} roughness={0.55} emissive="#0b1a2a" />
            </mesh>
          ))}
        </group>
      ))}

      {/* lampu status */}
      {[
        [0, 0.12, 0.43],
        [0, 1.45, 0],
        [-2.72, -0.2, 0],
        [2.72, -0.2, 0],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]}>
          <sphereGeometry args={[0.04, 10, 10]} />
          <meshStandardMaterial ref={i === 0 ? lamp : undefined} color={AMBER} emissive={AMBER} emissiveIntensity={1.6} />
        </mesh>
      ))}
      <pointLight color={AMBER} intensity={5} distance={5} decay={2} />
    </group>
  )
}

interface SceneProps {
  pointer: React.RefObject<{ x: number; y: number }>
}

function Scene({ pointer }: SceneProps) {
  const width = useThree((s) => s.size.width)
  const desktop = width >= 1000
  const mobile = width < 768
  const { activeId } = useActiveSection()
  const [hovered, setHovered] = useState<SectionId | null>(null)
  const time = useRef(0)
  const rig = useRef<Group>(null)

  const ringPoints = useMemo(() => RINGS.map((r) => circle(r.radius)), [])

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : ''
    return () => {
      document.body.style.cursor = ''
    }
  }, [hovered])

  const onSelect = useCallback((id: SectionId) => {
    setHovered(null)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // posisi & skala stasiun mengikuti lebar layar, supaya tidak menutupi teks Hero
  const layout = desktop
    ? { pos: [2.7, 0.75, 0] as const, scale: 0.85 }
    : mobile
      ? { pos: [0.6, 2.3, -1] as const, scale: 0.5 }
      : { pos: [1.8, 1.7, -1] as const, scale: 0.62 }

  useFrame((state, delta) => {
    if (!hovered) time.current += delta
    const progress = Math.min(window.scrollY / window.innerHeight, 1)
    const cam = state.camera
    const p = pointer.current ?? { x: 0, y: 0 }
    const tx = p.x * 0.45
    const ty = 0.9 + p.y * 0.3
    const tz = 9 + progress * 4
    const k = Math.min(1, delta * 2.5)
    cam.position.x += (tx - cam.position.x) * k
    cam.position.y += (ty - cam.position.y) * k
    cam.position.z += (tz - cam.position.z) * k
    cam.lookAt(0, 0.6, 0)
    if (rig.current) rig.current.rotation.y = progress * 0.9
  })

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[-4, 5, 3]} intensity={1.4} color="#b8c7d6" />
      <directionalLight position={[5, -2, -4]} intensity={0.4} color={CHILL} />

      <group position={layout.pos} scale={layout.scale}>
        <group ref={rig}>
          <Station />
          {RINGS.map((ring, ri) => {
            const lit = SATS.some((s) => s.ring === ri && s.id === hovered)
            return (
              <group key={ri} rotation={ring.tilt}>
                <Line
                  points={ringPoints[ri]}
                  color={lit ? AMBER : '#8A9198'}
                  lineWidth={lit ? 1.4 : 0.8}
                  transparent
                  opacity={lit ? 0.85 : 0.22}
                />
                {SATS.filter((s) => s.ring === ri).map((s) => (
                  <Satellite
                    key={s.id}
                    id={s.id}
                    no={s.no}
                    radius={ring.radius}
                    phase={s.phase}
                    speed={ring.speed}
                    active={s.id === activeId}
                    hovered={s.id === hovered}
                    interactive={desktop}
                    time={time}
                    onHover={setHovered}
                    onSelect={onSelect}
                  />
                ))}
              </group>
            )
          })}
        </group>
      </group>
    </>
  )
}

/** Scene Home "Orbital Control Room". Render dijeda saat Hero keluar layar. */
export default function OrbitalStation() {
  const host = useRef<HTMLDivElement>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = host.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    io.observe(el)
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div className="hero-stage" ref={host}>
      <Canvas
        camera={{ position: [0, 0.9, 9], fov: 40 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={visible ? 'always' : 'never'}
      >
        <Scene pointer={pointer} />
      </Canvas>
    </div>
  )
}
