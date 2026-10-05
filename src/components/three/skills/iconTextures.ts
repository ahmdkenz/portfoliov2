import { CanvasTexture, SRGBColorSpace } from 'three'
import type { SkillModule } from '../../../types/content'

type IconKey = SkillModule['icon']
export type IconTextures = Map<IconKey, CanvasTexture>

const SIZE = 256

/** Cakram gelap + cincin tipis — wajah koin sebelum logo selesai dimuat. */
function paintBase(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, SIZE, SIZE)
  ctx.fillStyle = '#0A0F17'
  ctx.beginPath()
  ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = 'rgba(228,228,222,.18)'
  ctx.lineWidth = 6
  ctx.beginPath()
  ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 14, 0, Math.PI * 2)
  ctx.stroke()
}

/** Satu CanvasTexture per ikon, langsung berisi cakram dasar. */
export function createIconTextures(icons: IconKey[]): IconTextures {
  const map: IconTextures = new Map()
  for (const icon of icons) {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = SIZE
    paintBase(canvas.getContext('2d')!)
    const tex = new CanvasTexture(canvas)
    tex.colorSpace = SRGBColorSpace
    map.set(icon, tex)
  }
  return map
}

/**
 * Melukis logo ke tekstur dari SVG yang sudah dirender di DOM (chip Skills, `svg[data-icon]`),
 * jadi tidak perlu aset terpisah. Mengembalikan fungsi pembatal.
 */
export function paintIconTextures(textures: IconTextures, root: ParentNode): () => void {
  const serializer = new XMLSerializer()
  const urls: string[] = []
  let cancelled = false

  textures.forEach((tex, icon) => {
    const source = root.querySelector<SVGSVGElement>(`svg[data-icon="${icon}"]`)
    if (!source) return
    const svg = source.cloneNode(true) as SVGSVGElement
    // tanpa width/height eksplisit, beberapa browser menolak menggambar SVG ke canvas
    svg.setAttribute('width', String(SIZE))
    svg.setAttribute('height', String(SIZE))
    svg.removeAttribute('class')
    const url = URL.createObjectURL(new Blob([serializer.serializeToString(svg)], { type: 'image/svg+xml' }))
    urls.push(url)

    const img = new Image()
    img.onload = () => {
      if (cancelled) return
      const canvas = tex.image as HTMLCanvasElement
      const ctx = canvas.getContext('2d')!
      paintBase(ctx)
      const s = SIZE * 0.52
      ctx.drawImage(img, (SIZE - s) / 2, (SIZE - s) / 2, s, s)
      tex.needsUpdate = true
    }
    img.src = url
  })

  return () => {
    cancelled = true
    urls.forEach((u) => URL.revokeObjectURL(u))
  }
}
