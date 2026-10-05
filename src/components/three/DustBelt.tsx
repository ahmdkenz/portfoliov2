import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import type { Group } from 'three'
import { dustRing } from './random'

/** Sabuk debu di sekitar stasiun — menambah parallax di depan dan di belakangnya. */
export function DustBelt({ count }: { count: number }) {
  const ref = useRef<Group>(null)
  const [positions, colors] = useMemo(() => dustRing(count, 1.7, 2.5), [count])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03
  })

  return (
    <group ref={ref} rotation={[0.38, 0, -0.14]}>
      <Points positions={positions} colors={colors} stride={3} frustumCulled={false}>
        <PointMaterial transparent vertexColors size={0.028} sizeAttenuation depthWrite={false} opacity={0.75} />
      </Points>
    </group>
  )
}
