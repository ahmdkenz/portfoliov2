import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { CanvasTexture, RepeatWrapping, SRGBColorSpace, type Group, type MeshStandardMaterial } from 'three'
import { AMBER, AMBER_DIM, CHILL, GLOW, PLATING, SOLAR, TITANIUM } from './palette'

/** Tekstur sel panel surya: grid tipis yang digambar sekali ke canvas 2D. */
function useSolarTexture() {
  return useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 128
    const g = c.getContext('2d')!
    g.fillStyle = '#16304d'
    g.fillRect(0, 0, 128, 128)
    g.strokeStyle = 'rgba(111,203,224,.55)'
    g.lineWidth = 2
    for (let i = 0; i <= 128; i += 32) {
      g.beginPath()
      g.moveTo(i, 0)
      g.lineTo(i, 128)
      g.moveTo(0, i)
      g.lineTo(128, i)
      g.stroke()
    }
    const tex = new CanvasTexture(c)
    tex.wrapS = tex.wrapT = RepeatWrapping
    tex.repeat.set(3, 1.5)
    tex.colorSpace = SRGBColorSpace
    return tex
  }, [])
}

function Hull() {
  return <meshStandardMaterial color={TITANIUM} metalness={0.85} roughness={0.3} envMapIntensity={1.3} />
}

function Plating() {
  return <meshStandardMaterial color={PLATING} metalness={0.7} roughness={0.42} />
}

/** Stasiun inti: badan, cincin dok berputar dengan sapuan amber, cincin data cyan, truss + panel surya, lampu berdenyut. */
export function Station() {
  const dock = useRef<Group>(null)
  const sweep = useRef<Group>(null)
  const dataRing = useRef<Group>(null)
  const lamp = useRef<MeshStandardMaterial>(null)
  const solar = useSolarTexture()

  useFrame((state, delta) => {
    if (dock.current) dock.current.rotation.y += delta * 0.14
    if (sweep.current) sweep.current.rotation.y -= delta * 0.9
    if (dataRing.current) dataRing.current.rotation.y -= delta * 0.05
    if (lamp.current) {
      // ritme sama dengan LED brand di TopBar (2.4 detik)
      const k = (Math.sin((state.clock.elapsedTime / 2.4) * Math.PI * 2) + 1) / 2
      lamp.current.emissiveIntensity = 1 + k * GLOW
    }
  })

  return (
    <group rotation={[0.38, 0, -0.14]} scale={1.25}>
      {/* badan */}
      <mesh>
        <cylinderGeometry args={[0.42, 0.42, 1.3, 32]} />
        <Hull />
      </mesh>
      {[-0.18, 0.18].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <cylinderGeometry args={[0.435, 0.435, 0.16, 32]} />
          <Plating />
        </mesh>
      ))}
      <mesh position={[0, 0.82, 0]}>
        <coneGeometry args={[0.32, 0.34, 32]} />
        <Hull />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.5, 6]} />
        <Plating />
      </mesh>
      <mesh position={[0, 1.46, 0]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={GLOW} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.95, 0]}>
        <cylinderGeometry args={[0.24, 0.34, 0.3, 32]} />
        <Plating />
      </mesh>
      {/* sabuk cahaya di badan */}
      {[-0.36, 0.36].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.44, 0.014, 8, 64]} />
          <meshStandardMaterial color={AMBER_DIM} emissive={AMBER} emissiveIntensity={2.2} toneMapped={false} />
        </mesh>
      ))}
      {/* jendela */}
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * 0.425, 0, Math.sin(a) * 0.425]} rotation={[0, -a + Math.PI / 2, 0]}>
            <planeGeometry args={[0.1, 0.16]} />
            <meshStandardMaterial color={CHILL} emissive={CHILL} emissiveIntensity={1.6} toneMapped={false} />
          </mesh>
        )
      })}

      {/* cincin dok + jari-jari + modul */}
      <group ref={dock} position={[0, 0.05, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.25, 0.055, 16, 128]} />
          <Hull />
        </mesh>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} rotation={[0, (i * Math.PI) / 2, 0]}>
            <boxGeometry args={[2.5, 0.03, 0.03]} />
            <Plating />
          </mesh>
        ))}
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2 + Math.PI / 8
          return (
            <group key={i} position={[Math.cos(a) * 1.25, 0, Math.sin(a) * 1.25]} rotation={[0, -a, 0]}>
              <mesh>
                <boxGeometry args={[0.18, 0.14, 0.24]} />
                <Plating />
              </mesh>
              <mesh position={[0.091, 0, 0]}>
                <boxGeometry args={[0.005, 0.03, 0.14]} />
                <meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={2} toneMapped={false} />
              </mesh>
            </group>
          )
        })}
        <group ref={sweep}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.25, 0.07, 8, 40, Math.PI / 5]} />
            <meshBasicMaterial color={[GLOW * 1, GLOW * 0.71, GLOW * 0.15]} toneMapped={false} transparent opacity={0.9} />
          </mesh>
        </group>
      </group>

      {/* cincin data tipis, cyan */}
      <group ref={dataRing} rotation={[0.5, 0, 0.2]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.7, 0.008, 6, 160]} />
          <meshBasicMaterial color={[0.6, 1.4, 1.7]} toneMapped={false} transparent opacity={0.7} />
        </mesh>
      </group>

      {/* truss + panel surya */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[3.6, 0.05, 0.05]} />
        <Plating />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 2.25, -0.2, 0]}>
          {[-0.26, 0.26].map((z) => (
            <mesh key={z} position={[0, 0, z]} rotation={[0.25, 0, 0]}>
              <boxGeometry args={[0.95, 0.02, 0.44]} />
              <meshPhysicalMaterial
                color={SOLAR}
                map={solar}
                metalness={0.4}
                roughness={0.25}
                clearcoat={1}
                clearcoatRoughness={0.1}
                emissive={CHILL}
                emissiveMap={solar}
                emissiveIntensity={0.25}
              />
            </mesh>
          ))}
          <mesh position={[side * 0.5, 0, 0]}>
            <sphereGeometry args={[0.04, 10, 10]} />
            <meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={GLOW} toneMapped={false} />
          </mesh>
        </group>
      ))}

      {/* lampu status utama (berdenyut) */}
      <mesh position={[0, 0.5, 0.42]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshStandardMaterial ref={lamp} color={AMBER} emissive={AMBER} emissiveIntensity={GLOW} toneMapped={false} />
      </mesh>
      <pointLight color={AMBER} intensity={6} distance={6} decay={2} />
    </group>
  )
}
