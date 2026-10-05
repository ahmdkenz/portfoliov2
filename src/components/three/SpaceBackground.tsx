import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import type { Group, PointsMaterial as PointMaterialType } from 'three'
import { inSphere, starColors } from './random'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useWebGL } from '../../hooks/useWebGL'

function Starfield({ reduced }: { reduced: boolean }) {
  const far = useRef<Group>(null)
  const near = useRef<Group>(null)
  const bright = useRef<Group>(null)
  const twinkle = useRef<PointMaterialType>(null)
  const mobile = window.innerWidth < 768

  const farPos = useMemo(() => inSphere(mobile ? 1800 : 4500, 1.2), [mobile])
  const nearCount = mobile ? 160 : 420
  const nearPos = useMemo(() => inSphere(nearCount, 0.9), [nearCount])
  const nearCol = useMemo(() => starColors(nearCount), [nearCount])
  const brightPos = useMemo(() => inSphere(mobile ? 30 : 70, 1.1), [mobile])

  useFrame((state, delta) => {
    if (reduced || !far.current || !near.current || !bright.current) return
    const scroll = window.scrollY
    far.current.rotation.x -= delta / 14
    far.current.rotation.y -= delta / 20
    // lapis dekat bergeser lebih cepat saat scroll -> kedalaman
    far.current.position.y = scroll * 0.00012
    near.current.position.y = scroll * 0.00045
    near.current.rotation.y -= delta / 40
    bright.current.position.y = scroll * 0.0003
    bright.current.rotation.y -= delta / 30
    if (twinkle.current) twinkle.current.opacity = 0.55 + Math.sin(state.clock.elapsedTime * 1.7) * 0.35
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <group ref={far}>
        <Points positions={farPos} stride={3} frustumCulled={false}>
          <PointMaterial transparent color="#dfe5ea" size={0.003} sizeAttenuation depthWrite={false} opacity={0.9} />
        </Points>
      </group>
      <group ref={near}>
        <Points positions={nearPos} colors={nearCol} stride={3} frustumCulled={false}>
          <PointMaterial transparent vertexColors size={0.0055} sizeAttenuation depthWrite={false} />
        </Points>
      </group>
      <group ref={bright}>
        <Points positions={brightPos} stride={3} frustumCulled={false}>
          <PointMaterial ref={twinkle} transparent color="#ffffff" size={0.01} sizeAttenuation depthWrite={false} />
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
