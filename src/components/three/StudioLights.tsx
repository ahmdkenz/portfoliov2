import { Environment, Lightformer } from '@react-three/drei'
import { AMBER, CHILL } from './palette'

/** Environment lokal dari Lightformer — pantulan logam tanpa mengunduh HDR. Dipakai scene Home dan Skills. */
export function StudioLights() {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer form="rect" intensity={2.2} color="#ffffff" position={[0, 6, 2]} scale={[12, 2, 1]} rotation-x={Math.PI / 2} />
      <Lightformer form="rect" intensity={3} color={AMBER} position={[6, 1, 2]} scale={[3, 5, 1]} rotation-y={-Math.PI / 2} />
      <Lightformer form="rect" intensity={2} color={CHILL} position={[-6, 0, -3]} scale={[4, 6, 1]} rotation-y={Math.PI / 2} />
      <Lightformer form="ring" intensity={1.2} color="#ffffff" position={[0, -4, 4]} scale={3} />
    </Environment>
  )
}
