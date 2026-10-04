import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import type { Group } from 'three'
import { inSphere } from './random'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useWebGL } from '../../hooks/useWebGL'

const AMBER = [1, 0.714, 0.153]
const CHILL = [0.435, 0.796, 0.878]

/** Lapis dekat: jarang, sebagian kecil titik diberi warna aksen amber/cyan. */
function nearColors(count: number) {
  const colors = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const roll = Math.random()
    const c = roll < 0.08 ? AMBER : roll < 0.16 ? CHILL : [0.85, 0.87, 0.9]
    colors.set(c, i * 3)
  }
  return colors
}

function Starfield({ reduced }: { reduced: boolean }) {
  const far = useRef<Group>(null)
  const near = useRef<Group>(null)
  const mobile = window.innerWidth < 768

  const farPos = useMemo(() => inSphere(mobile ? 1500 : 4000, 1.2), [mobile])
  const nearCount = mobile ? 160 : 420
  const nearPos = useMemo(() => inSphere(nearCount, 0.9), [nearCount])
  const nearCol = useMemo(() => nearColors(nearCount), [nearCount])

  useFrame((_, delta) => {
    if (reduced || !far.current || !near.current) return
    const scroll = window.scrollY
    far.current.rotation.x -= delta / 14
    far.current.rotation.y -= delta / 20
    // lapis dekat bergeser lebih cepat saat scroll -> kedalaman
    far.current.position.y = scroll * 0.00012
    near.current.position.y = scroll * 0.00045
    near.current.rotation.y -= delta / 40
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <group ref={far}>
        <Points positions={farPos} stride={3} frustumCulled={false}>
          <PointMaterial transparent color="#cfd6dc" size={0.0022} sizeAttenuation depthWrite={false} opacity={0.75} />
        </Points>
      </group>
      <group ref={near}>
        <Points positions={nearPos} colors={nearCol} stride={3} frustumCulled={false}>
          <PointMaterial transparent vertexColors size={0.0045} sizeAttenuation depthWrite={false} />
        </Points>
      </group>
    </group>
  )
}

/** Latar bintang fixed di belakang semua section. Statis saat reduced motion, CSS murni tanpa WebGL. */
export default function SpaceBackground() {
  const reduced = usePrefersReducedMotion()
  const webgl = useWebGL()

  if (!webgl) return <div className="space-bg space-fallback" aria-hidden="true" />

  return (
    <div className="space-bg" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'low-power' }}
        frameloop={reduced ? 'demand' : 'always'}
      >
        <Starfield reduced={reduced} />
      </Canvas>
    </div>
  )
}
