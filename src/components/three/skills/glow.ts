import { CanvasTexture } from 'three'

let cached: CanvasTexture | null = null

/** Sprite glow radial (putih → transparan), diwarnai lewat `color` material. Pengganti Bloom yang murah. */
export function glowTexture(): CanvasTexture {
  if (cached) return cached
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')!
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.25, 'rgba(255,255,255,.45)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 128, 128)
  cached = new CanvasTexture(c)
  return cached
}
