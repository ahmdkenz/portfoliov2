import { memo, useRef, type RefObject } from 'react'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { Billboard, Html } from '@react-three/drei'
import { AdditiveBlending, type CanvasTexture, type Group, type SpriteMaterial } from 'three'
import { AMBER, TITANIUM } from '../palette'
import { glowTexture } from './glow'

export interface StackTokenProps {
  id: string
  name: string
  texture: CanvasTexture | undefined
  radius: number
  phase: number
  speed: number
  /** warna orbit/kategori */
  tint: string
  selected: boolean
  hovered: boolean
  labels: boolean
  /** waktu orbit bersama — berhenti saat ada koin yang di-hover */
  time: RefObject<number>
  onHover: (id: string | null) => void
  onSelect: (id: string) => void
}

const R = 0.3
const THICK = 0.06

/** Koin logam berlogo yang mengorbit inti. Redup saat diam, menyala saat disorot/dipilih ("power on"). */
export const StackToken = memo(function StackToken({
  id,
  name,
  texture,
  radius,
  phase,
  speed,
  tint,
  selected,
  hovered,
  labels,
  time,
  onHover,
  onSelect,
}: StackTokenProps) {
  const orbit = useRef<Group>(null)
  const coin = useRef<Group>(null)
  const halo = useRef<SpriteMaterial>(null)
  const on = selected || hovered

  useFrame((state, delta) => {
    if (!orbit.current || !coin.current) return
    const a = phase + (time.current ?? 0) * speed
    orbit.current.position.set(Math.cos(a) * radius, 0, Math.sin(a) * radius)
    // goyangan supaya tepi logam koin terlihat
    coin.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.9 + phase * 3) * 0.5
    const target = hovered ? 1.45 : selected ? 1.3 : 1
    const k = Math.min(1, delta * 9)
    const s = coin.current.scale.x + (target - coin.current.scale.x) * k
    coin.current.scale.setScalar(s)
    if (halo.current) halo.current.opacity += ((on ? 0.7 : 0) - halo.current.opacity) * k
  })

  const ring = on ? AMBER : tint

  return (
    <group ref={orbit}>
      <Billboard>
        <sprite scale={[1.5, 1.5, 1]}>
          <spriteMaterial
            ref={halo}
            map={glowTexture()}
            color={on ? AMBER : tint}
            blending={AdditiveBlending}
            transparent
            opacity={0}
            depthWrite={false}
          />
        </sprite>
        <group ref={coin}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[R, R, THICK, 48]} />
            <meshStandardMaterial color={TITANIUM} metalness={0.9} roughness={0.28} envMapIntensity={1.4} />
          </mesh>
          <mesh position={[0, 0, THICK / 2 + 0.001]}>
            <circleGeometry args={[R * 0.94, 48]} />
            <meshStandardMaterial
              map={texture}
              color={on ? '#ffffff' : '#8d9298'}
              emissive="#ffffff"
              emissiveMap={texture}
              emissiveIntensity={on ? 0.85 : 0.18}
              metalness={0.15}
              roughness={0.5}
            />
          </mesh>
          <mesh position={[0, 0, THICK / 2]}>
            <torusGeometry args={[R * 0.97, 0.014, 8, 64]} />
            <meshStandardMaterial color={ring} emissive={ring} emissiveIntensity={on ? 2.2 : 0.9} toneMapped={false} />
          </mesh>
        </group>
      </Billboard>
      {/* area sentuh sedikit lebih besar dari koinnya */}
      <mesh
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation()
          onHover(id)
        }}
        onPointerOut={() => onHover(null)}
        onClick={(e) => {
          // drag untuk memutar scene tidak dihitung sebagai klik
          if (e.delta > 4) return
          e.stopPropagation()
          onSelect(id)
        }}
      >
        <sphereGeometry args={[0.42, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {labels && on && (
        <Html center position={[0, 0.62, 0]} zIndexRange={[10, 0]} style={{ pointerEvents: 'none' }}>
          <span className={hovered ? 'sat-label is-hover' : 'sat-label'}>{name}</span>
        </Html>
      )}
    </group>
  )
})
