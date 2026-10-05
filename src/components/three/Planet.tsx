import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { AdditiveBlending, BackSide, Vector3, type Mesh, type ShaderMaterial } from 'three'
import { NOISE } from './glsl'

const surfaceVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPos;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

/** Permukaan: pita gas prosedural navy/coklat, diterangi dari kiri atas, tepi yang terkena cahaya bersemu amber. */
const surfaceFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uLight;
  varying vec3 vNormal;
  varying vec3 vPos;
  ${NOISE}
  void main() {
    vec3 p = normalize(vPos);
    float warp = fbm(p * 3.0 + uTime * 0.02);
    float bands = fbm(vec3(p.x * 1.6, p.y * 10.0 + warp * 1.8, p.z * 1.6));
    vec3 col = mix(vec3(0.012, 0.025, 0.055), vec3(0.09, 0.05, 0.025), smoothstep(0.35, 0.75, bands));
    col = mix(col, vec3(0.03, 0.09, 0.12), smoothstep(0.55, 0.9, fbm(p * 7.0)) * 0.6);
    vec3 n = normalize(vNormal);
    float diff = max(dot(n, normalize(uLight)), 0.0);
    col *= 0.08 + diff * 1.6;
    float rim = pow(1.0 - max(dot(n, vec3(0.0, 0.0, 1.0)), 0.0), 3.0);
    col += vec3(1.0, 0.62, 0.12) * rim * smoothstep(0.0, 0.6, diff) * 0.8;
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`

const atmoVertex = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

/** Atmosfer (BackSide + additive): pendar memudar keluar dari tepi planet, amber di sisi terang, cyan di sisi gelap. */
const atmoFragment = /* glsl */ `
  uniform vec3 uLight;
  varying vec3 vNormal;
  void main() {
    vec3 n = normalize(vNormal);
    float glow = pow(max(0.64 - dot(n, vec3(0.0, 0.0, 1.0)), 0.0), 3.2);
    float lit = smoothstep(-0.5, 0.7, dot(n, normalize(uLight)));
    vec3 col = mix(vec3(0.43, 0.8, 0.88), vec3(1.0, 0.71, 0.15), lit);
    gl_FragColor = vec4(col * glow * 1.6, 1.0);
  }
`

/** Planet besar di latar belakang — pengganti "blackhole glow" template, dibuat dari shader sendiri. */
export function Planet({ position, radius = 6 }: { position: [number, number, number]; radius?: number }) {
  const surface = useRef<Mesh>(null)
  // cahaya datang dari kiri atas (ruang pandang), ke arah stasiun
  const light = useMemo(() => new Vector3(-0.65, 0.65, 0.4).normalize(), [])
  const surfaceUniforms = useMemo(() => ({ uTime: { value: 0 }, uLight: { value: light } }), [light])
  const atmoUniforms = useMemo(() => ({ uLight: { value: light } }), [light])

  useFrame((_, delta) => {
    if (!surface.current) return
    surface.current.rotation.y += delta * 0.01
    ;(surface.current.material as ShaderMaterial).uniforms.uTime.value += delta
  })

  return (
    <group position={position}>
      <mesh ref={surface}>
        <sphereGeometry args={[radius, 96, 96]} />
        <shaderMaterial vertexShader={surfaceVertex} fragmentShader={surfaceFragment} uniforms={surfaceUniforms} />
      </mesh>
      <mesh scale={1.14}>
        <sphereGeometry args={[radius, 64, 64]} />
        <shaderMaterial
          vertexShader={atmoVertex}
          fragmentShader={atmoFragment}
          uniforms={atmoUniforms}
          side={BackSide}
          blending={AdditiveBlending}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
