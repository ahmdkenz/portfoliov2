import { useState } from 'react'

let cached: boolean | null = null

function detectWebGL(): boolean {
  if (cached !== null) return cached
  try {
    const canvas = document.createElement('canvas')
    cached = !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    cached = false
  }
  return cached
}

/** Deteksi dukungan WebGL sekali per sesi; dipakai untuk memilih scene 3D atau fallback statis. */
export function useWebGL() {
  const [supported] = useState(() => typeof window !== 'undefined' && detectWebGL())
  return supported
}
