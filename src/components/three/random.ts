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

/** Torus pipih titik-titik (sabuk debu): posisi + warna putih dengan sebagian amber. */
export function dustRing(count: number, inner: number, outer: number): [Float32Array, Float32Array] {
  const pos = new Float32Array(count * 3)
  const col = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2
    const r = inner + Math.random() * (outer - inner)
    // jumlah dua acak ~ sebaran normal kasar -> sabuk menebal di tengah
    const y = (Math.random() + Math.random() - 1) * 0.12
    pos.set([Math.cos(a) * r, y, Math.sin(a) * r], i * 3)
    col.set(Math.random() < 0.18 ? [1, 0.71, 0.15] : [0.82, 0.86, 0.9], i * 3)
  }
  return [pos, col]
}

const AMBER = [1, 0.714, 0.153]
const CHILL = [0.435, 0.796, 0.878]

/** Warna per titik: sebagian kecil diberi aksen amber/cyan, sisanya putih kebiruan. */
export function starColors(count: number, accent = 0.08): Float32Array {
  const colors = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const roll = Math.random()
    const c = roll < accent ? AMBER : roll < accent * 2 ? CHILL : [0.85, 0.87, 0.9]
    colors.set(c, i * 3)
  }
  return colors
}
