import { memo, useRef, type RefObject } from 'react'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { Html, Trail } from '@react-three/drei'
import { DoubleSide, type Group } from 'three'
import { useT } from '../../context/LanguageContext'
import type { SectionId } from '../../types/content'
import { AMBER, CHILL, GLOW, PLATING, SOLAR, TITANIUM } from './palette'

export interface SatelliteProps {
  id: Exclude<SectionId, 'home'>
  /** nomor section, sama dengan "Sec 0x" di SectionHead */
  no: string
  radius: number
  phase: number
  speed: number
  /** warna jejak = warna orbitnya */
  tint: string
  active: boolean
  hovered: boolean
  interactive: boolean
  trail: boolean
  /** waktu orbit bersama — berhenti saat ada satelit yang di-hover */
  time: RefObject<number>
  onHover: (id: SectionId | null) => void
  onSelect: (id: SectionId) => void
}

/** Badan satelit: modul, dua sayap panel surya, piringan antena, LED status. */
function Model({ led }: { led: string }) {
  return (
    <>
      <mesh>
        <boxGeometry args={[0.2, 0.16, 0.26]} />
        <meshStandardMaterial color={TITANIUM} metalness={0.85} roughness={0.3} envMapIntensity={1.3} />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh position={[side * 0.15, 0, 0]}>
            <boxGeometry args={[0.1, 0.012, 0.012]} />
            <meshStandardMaterial color={PLATING} metalness={0.7} roughness={0.4} />
          </mesh>
          <mesh position={[side * 0.37, 0, 0]}>
            <boxGeometry args={[0.36, 0.008, 0.15]} />
            <meshPhysicalMaterial
              color={SOLAR}
              metalness={0.4}
              roughness={0.25}
              clearcoat={1}
              emissive={CHILL}
              emissiveIntensity={0.18}
            />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.12, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.08, 0.06, 20, 1, true]} />
        <meshStandardMaterial color={TITANIUM} metalness={0.8} roughness={0.3} side={DoubleSide} />
      </mesh>
      <mesh position={[0, 0.17, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.1, 6]} />
        <meshStandardMaterial color={PLATING} />
      </mesh>
      <mesh position={[0, 0.03, 0.135]}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshStandardMaterial color={led} emissive={led} emissiveIntensity={GLOW} toneMapped={false} />
      </mesh>
    </>
  )
}

export const Satellite = memo(function Satellite({
  id,
  no,
  radius,
  phase,
  speed,
  tint,
  active,
  hovered,
  interactive,
  trail,
  time,
  onHover,
  onSelect,
}: SatelliteProps) {
  const { t } = useT()
  const group = useRef<Group>(null)
  const body = useRef<Group>(null)

  useFrame((state, delta) => {
    if (!group.current || !body.current) return
    const a = phase + (time.current ?? 0) * speed
    group.current.position.set(Math.cos(a) * radius, 0, Math.sin(a) * radius)
    // menghadap arah gerak (tangen orbit), dengan goyangan kecil
    body.current.rotation.y = -a
    body.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8 + phase) * 0.18
    const target = hovered ? 1.4 : 1
    const s = body.current.scale.x + (target - body.current.scale.x) * Math.min(1, delta * 10)
    body.current.scale.setScalar(s)
  })

  const led = hovered ? AMBER : active ? CHILL : '#E4E4DE'

  const over = (e: ThreeEvent<PointerEvent>) => {
    if (!interactive) return
    e.stopPropagation()
    onHover(id)
  }

  const body3d = (
    <group ref={body}>
      <Model led={led} />
    </group>
  )

  return (
    <group ref={group}>
      {trail ? (
        <Trail width={0.5} length={5} color={hovered ? AMBER : tint} attenuation={(w) => w * w} decay={1.2}>
          {body3d}
        </Trail>
      ) : (
        body3d
      )}
      {/* area klik lebih besar dari bodinya supaya mudah dikenai kursor */}
      <mesh
        onPointerOver={over}
        onPointerOut={() => interactive && onHover(null)}
        onClick={(e) => {
          // drag untuk memutar scene tidak dihitung sebagai klik
          if (!interactive || e.delta > 4) return
          e.stopPropagation()
          onSelect(id)
        }}
      >
        <sphereGeometry args={[0.42, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {interactive && (
        <Html center position={[0, 0.42, 0]} zIndexRange={[10, 0]}>
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
