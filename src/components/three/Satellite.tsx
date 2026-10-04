import { memo, useRef, type RefObject } from 'react'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import type { Group, Mesh } from 'three'
import { useT } from '../../context/LanguageContext'
import type { SectionId } from '../../types/content'

export interface SatelliteProps {
  id: Exclude<SectionId, 'home'>
  /** nomor section, sama dengan "Sec 0x" di SectionHead */
  no: string
  radius: number
  phase: number
  speed: number
  active: boolean
  hovered: boolean
  interactive: boolean
  /** waktu orbit bersama — berhenti saat ada satelit yang di-hover */
  time: RefObject<number>
  onHover: (id: SectionId | null) => void
  onSelect: (id: SectionId) => void
}

const STEEL = '#8A9198'
const AMBER = '#FFB627'
const CHILL = '#6FCBE0'

export const Satellite = memo(function Satellite({
  id,
  no,
  radius,
  phase,
  speed,
  active,
  hovered,
  interactive,
  time,
  onHover,
  onSelect,
}: SatelliteProps) {
  const { t } = useT()
  const group = useRef<Group>(null)
  const body = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (!group.current || !body.current) return
    const a = phase + (time.current ?? 0) * speed
    group.current.position.set(Math.cos(a) * radius, 0, Math.sin(a) * radius)
    body.current.rotation.x += delta * 0.6
    body.current.rotation.y += delta * 0.9
    const target = hovered ? 1.6 : 1
    const s = body.current.scale.x + (target - body.current.scale.x) * Math.min(1, delta * 10)
    body.current.scale.setScalar(s)
  })

  const color = hovered ? AMBER : active ? CHILL : STEEL

  const over = (e: ThreeEvent<PointerEvent>) => {
    if (!interactive) return
    e.stopPropagation()
    onHover(id)
  }

  return (
    <group ref={group}>
      <mesh ref={body}>
        <octahedronGeometry args={[0.13, 0]} />
        <meshStandardMaterial
          color="#2a333b"
          metalness={0.5}
          roughness={0.35}
          emissive={color}
          emissiveIntensity={hovered || active ? 1.4 : 0.35}
          flatShading
        />
      </mesh>
      {/* area klik lebih besar dari bodinya supaya mudah dikenai kursor */}
      <mesh
        onPointerOver={over}
        onPointerOut={() => interactive && onHover(null)}
        onClick={(e) => {
          if (!interactive) return
          e.stopPropagation()
          onSelect(id)
        }}
      >
        <sphereGeometry args={[0.32, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {interactive && (
        <Html center position={[0, 0.34, 0]} zIndexRange={[10, 0]}>
          <button
            type="button"
            tabIndex={-1}
            className={['sat-label', hovered && 'is-hover', active && 'is-active'].filter(Boolean).join(' ')}
            onPointerEnter={() => onHover(id)}
            onPointerLeave={() => onHover(null)}
            onClick={() => onSelect(id)}
          >
            <span className="no">{no}</span>
            {t(`nav.${id}`)}
          </button>
        </Html>
      )}
    </group>
  )
})
