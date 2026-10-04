/** Titik acak terdistribusi rata di dalam bola — pengganti `maath/random.inSphere`. */
export function inSphere(count: number, radius: number): Float32Array {
  const out = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const u = Math.random()
    const v = Math.random()
    const theta = u * Math.PI * 2
    const phi = Math.acos(2 * v - 1)
    const r = radius * Math.cbrt(Math.random())
    const s = Math.sin(phi)
    out[i * 3] = r * s * Math.cos(theta)
    out[i * 3 + 1] = r * s * Math.sin(theta)
    out[i * 3 + 2] = r * Math.cos(phi)
  }
  return out
}
