import { Suspense, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Float, PresentationControls, RoundedBox, useTexture } from '@react-three/drei'
import { Shape, ShapeGeometry, SRGBColorSpace, type Texture } from 'three'
import { StudioLights } from './StudioLights'
import { useStage } from './useStage'
import { AMBER, CHILL, VOID } from './palette'

/** dimensi bodi; layar mengikuti rasio screenshot 9:20 */
const W = 1.0
const H = 2.15
const D = 0.1
const SCREEN_W = 0.92
const SCREEN_H = SCREEN_W * (20 / 9)
const BODY = '#1A1F26'
const TRIM = '#2A313A'

/** Persegi panjang sudut membulat dengan UV 0..1 (ShapeGeometry bawaan memakai koordinat shape sebagai UV). */
function roundedRect(w: number, h: number, r: number) {
  const x = -w / 2
  const y = -h / 2
  const s = new Shape()
  s.moveTo(x + r, y)
  s.lineTo(x + w - r, y)
  s.quadraticCurveTo(x + w, y, x + w, y + r)
  s.lineTo(x + w, y + h - r)
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  s.lineTo(x + r, y + h)
  s.quadraticCurveTo(x, y + h, x, y + h - r)
  s.lineTo(x, y + r)
  s.quadraticCurveTo(x, y, x + r, y)
  const g = new ShapeGeometry(s, 12)
  const pos = g.attributes.position
  const uv = g.attributes.uv
  for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) - x) / w, (pos.getY(i) - y) / h)
  return g
}

function prepareScreen(tex: Texture | Texture[]) {
  const t = Array.isArray(tex) ? tex[0] : tex
  t.colorSpace = SRGBColorSpace
  t.anisotropy = 8
}

/** HP prosedural: bodi graphite, layar menyala berisi screenshot asli, kaca, dynamic island, tombol, kamera belakang. */
function Phone({ src }: { src: string }) {
  const screen = useMemo(() => roundedRect(SCREEN_W, SCREEN_H, 0.09), [])
  const texture = useTexture(encodeURI(src), prepareScreen)
  const front = D / 2

  return (
    <group>
      <RoundedBox args={[W, H, D]} radius={0.12} smoothness={6}>
        <meshStandardMaterial color={BODY} metalness={0.8} roughness={0.35} envMapIntensity={1.2} />
      </RoundedBox>

      {/* layar: tidak di-tonemap supaya tampak menyala seperti layar sungguhan */}
      <mesh geometry={screen} position={[0, 0, front + 0.002]}>
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      {/* kaca: hampir bening, menangkap pantulan Environment */}
      <mesh geometry={screen} position={[0, 0, front + 0.004]}>
        <meshPhysicalMaterial transparent opacity={0.09} roughness={0} metalness={0} clearcoat={1} envMapIntensity={2} depthWrite={false} />
      </mesh>
      <RoundedBox args={[0.26, 0.07, 0.006]} radius={0.003} position={[0, SCREEN_H / 2 - 0.075, front + 0.006]}>
        <meshStandardMaterial color={VOID} roughness={0.2} />
      </RoundedBox>

      {/* tombol samping */}
      <mesh position={[W / 2 + 0.006, 0.42, 0]}>
        <boxGeometry args={[0.02, 0.3, 0.045]} />
        <meshStandardMaterial color={TRIM} metalness={0.85} roughness={0.3} />
      </mesh>
      {[0.6, 0.36].map((y) => (
        <mesh key={y} position={[-W / 2 - 0.006, y, 0]}>
          <boxGeometry args={[0.02, 0.17, 0.045]} />
          <meshStandardMaterial color={TRIM} metalness={0.85} roughness={0.3} />
        </mesh>
      ))}

      {/* modul kamera belakang */}
      <group position={[-0.2, 0.76, -front - 0.02]}>
        <RoundedBox args={[0.44, 0.44, 0.04]} radius={0.09} smoothness={4}>
          <meshStandardMaterial color={TRIM} metalness={0.8} roughness={0.3} />
        </RoundedBox>
        <mesh position={[0, 0, -0.021]}>
          <torusGeometry args={[0.2, 0.004, 6, 48]} />
          <meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={1.4} toneMapped={false} />
        </mesh>
        {[
          [-0.09, 0.09],
          [0.09, 0.09],
          [-0.09, -0.09],
        ].map(([x, y]) => (
          <group key={`${x}${y}`} position={[x, y, -0.035]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh>
              <cylinderGeometry args={[0.075, 0.075, 0.03, 32]} />
              <meshStandardMaterial color="#0d1117" metalness={0.9} roughness={0.25} />
            </mesh>
            <mesh position={[0, -0.016, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.004, 32]} />
              <meshPhysicalMaterial color={VOID} roughness={0} clearcoat={1} envMapIntensity={2.5} />
            </mesh>
          </group>
        ))}
        <mesh position={[0.09, -0.09, -0.024]}>
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshStandardMaterial color="#fff6dc" emissive="#fff6dc" emissiveIntensity={0.6} />
        </mesh>
      </group>
    </group>
  )
}

function Scene({ src, interactive }: { src: string; interactive: boolean }) {
  return (
    <>
      <StudioLights />
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 3, 5]} intensity={0.8} />
      {/* rim cyan & amber dari belakang: tepi bodi gelap tidak hilang di latar gelap */}
      <directionalLight position={[-4, 1, -2]} intensity={2.2} color={CHILL} />
      <directionalLight position={[4, 2, -3]} intensity={2.4} color={AMBER} />

      <PresentationControls
        enabled={interactive}
        cursor={interactive}
        snap
        speed={1.6}
        rotation={[0.08, -0.35, 0]}
        polar={[-0.25, 0.25]}
        azimuth={[-Math.PI * 0.75, Math.PI * 0.75]}
      >
        <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.5} floatingRange={[-0.06, 0.06]}>
          <Suspense fallback={null}>
            <Phone src={src} />
          </Suspense>
        </Float>
      </PresentationControls>
      <ContactShadows position={[0, -1.35, 0]} opacity={0.45} blur={2.5} scale={4} far={2} />
    </>
  )
}

/** Mockup HP 3D untuk flagship. Drag hanya untuk pointer presisi (mouse), supaya scroll di layar sentuh tidak tertahan. */
export default function PhoneMockup({ src }: { src: string }) {
  const { host, visible } = useStage()
  const [interactive] = useState(() => window.matchMedia('(pointer: fine)').matches)

  return (
    <div className="phone-canvas" ref={host}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 30 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        frameloop={visible ? 'always' : 'never'}
      >
        <Scene src={src} interactive={interactive} />
      </Canvas>
    </div>
  )
}
