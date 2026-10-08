import { useSyncExternalStore } from 'react'
import { SECTION_IDS, type SectionId } from '../types/content'

interface ActiveSection {
  activeId: SectionId
  activeIndex: number
  percent: number
}

/** Satu scroll-spy bersama untuk semua pemakai; objek state hanya diganti bila nilainya berubah. */
let state: ActiveSection = { activeId: SECTION_IDS[0], activeIndex: 0, percent: 0 }
const listeners = new Set<() => void>()
let ticking = false

function compute() {
  ticking = false
  const y = window.scrollY
  const docH = document.documentElement.scrollHeight - window.innerHeight
  const percent = docH > 0 ? Math.round((y / docH) * 100) : 0

  let activeIndex = 0
  SECTION_IDS.forEach((id, idx) => {
    const el = document.getElementById(id)
    if (el && y >= el.offsetTop - window.innerHeight * 0.42) activeIndex = idx
  })

  if (activeIndex === state.activeIndex && percent === state.percent) return
  state = { activeId: SECTION_IDS[activeIndex], activeIndex, percent }
  listeners.forEach((l) => l())
}

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(compute)
    ticking = true
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  if (listeners.size === 1) {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    compute()
  }
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }
}

/** Scroll-spy rAF-throttled: section aktif, indeksnya, dan persentase scroll halaman. */
export function useActiveSection(): ActiveSection {
  return useSyncExternalStore(subscribe, () => state)
}

/** Hanya id section aktif — tidak me-render ulang saat scroll selama section-nya sama. */
export function useActiveId(): SectionId {
  return useSyncExternalStore(subscribe, () => state.activeId)
}
