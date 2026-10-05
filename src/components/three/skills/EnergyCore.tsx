import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import {
  AdditiveBlending,
  EdgesGeometry,
  IcosahedronGeometry,
  type Group,
  type Mesh,
  type Points as PointsType,
  type ShaderMaterial,
} from 'three'
import { NOISE } from '../glsl'
import { AMBER, AMBER_DIM, CHILL } from '../palette'
import { glowTexture } from './glow'

const plasmaVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPos;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

/** Plasma: noise beranimasi amber → putih panas, tepi fresnel cyan. */
const plasmaFragment = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPos;
  ${NOISE}
  void main() {
    float n = fbm(vPos * 2.4 + vec3(0.0, uTime * 0.35, uTime * 0.2));
    float hot = smoothstep(0.35, 0.8, n);
    vec3 col = mix(vec3(0.85, 0.36, 0.03), vec3(1.0, 0.93, 0.7), hot);
    float fres = pow(1.0 - max(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0), 2.4);
    col = mix(col, vec3(0.43, 0.8, 0.88), fres * 0.85);
    gl_FragColor = vec4(col * 1.25, 1.0);
    #include <colorspace_fragment>
  }
`

/** Partikel spiral masuk ke inti. Posisi = fungsi waktu + indeks (tanpa state acak). */
function spiral(i: number, t: number, out: Float32Array) {
  const h = (k: number) => {
    const s = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453
    return s - Math.floor(s)
  }
  const phase = (t * (0.08 + h(1) * 0.1) + h(2)) % 1
  const r = 2.4 - phase * 1.8
  const a = h(3) * Math.PI * 2 + phase * 5.5
  out[i * 3] = Math.cos(a) * r
  out[i * 3 + 1] = (h(4) - 0.5) * 0.5 * (r / 2.4)
  out[i * 3 + 2] = Math.sin(a) * r
}

/** Reaktor inti: plasma, dua cangkang ikosahedron berlawanan arah, glow, cahaya, partikel spiral. */
export function EnergyCore({ particles }: { particles: number }) {
  const core = useRef<Group>(null)
  const plasma = useRef<Mesh>(null)
  const inner = useRef<Group>(null)
  const outer = useRef<Group>(null)
  const feed = useRef<PointsType>(null)

  const innerEdges = useMemo(() => new EdgesGeometry(new IcosahedronGeometry(0.85, 1)), [])
  const outerEdges = useMemo(() => new EdgesGeometry(new IcosahedronGeometry(1.12, 0)), [])
  const positions = useMemo(() => new Float32Array(particles * 3), [particles])
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    // denyut mengikuti ritme LED brand (2.4 detik)
    const k = (Math.sin((t / 2.4) * Math.PI * 2) + 1) / 2
    core.current?.scale.setScalar(1 + k * 0.06)
    if (plasma.current) (plasma.current.material as ShaderMaterial).uniforms.uTime.value = t
    if (inner.current) {
      inner.current.rotation.y += delta * 0.25
      inner.current.rotation.x += delta * 0.1
    }
    if (outer.current) {
      outer.current.rotation.y -= delta * 0.12
      outer.current.rotation.z += delta * 0.05
    }
    const attr = feed.current?.geometry.attributes.position
    if (attr) {
      const arr = attr.array as Float32Array
      for (let i = 0; i < particles; i++) spiral(i, t, arr)
      attr.needsUpdate = true
    }
  })

  return (
    <group>
      <group ref={core}>
        <mesh ref={plasma}>
          <sphereGeometry args={[0.55, 64, 64]} />
          <shaderMaterial vertexShader={plasmaVertex} fragmentShader={plasmaFragment} uniforms={uniforms} />
        </mesh>
        <group ref={inner}>
          <lineSegments geometry={innerEdges}>
            <lineBasicMaterial color={AMBER_DIM} transparent opacity={0.75} />
          </lineSegments>
        </group>
        <group ref={outer}>
          <lineSegments geometry={outerEdges}>
            <lineBasicMaterial color={CHILL} transparent opacity={0.35} />
          </lineSegments>
        </group>
      </group>
      <sprite scale={[3.4, 3.4, 1]}>
        <spriteMaterial map={glowTexture()} color={AMBER} blending={AdditiveBlending} transparent opacity={0.5} depthWrite={false} />
      </sprite>
      <group rotation={[0.5, 0, 0.2]}>
        <Points ref={feed} positions={positions} stride={3} frustumCulled={false}>
          <PointMaterial transparent color={AMBER} size={0.035} sizeAttenuation depthWrite={false} opacity={0.8} />
        </Points>
      </group>
      <pointLight color={AMBER} intensity={8} distance={8} decay={2} />
    </group>
  )
}
