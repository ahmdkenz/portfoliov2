import { useEffect, useState } from 'react'
import { SECTION_IDS, type SectionId } from '../types/content'

interface ActiveSection {
  activeId: SectionId
  activeIndex: number
  percent: number
}

/** Scroll-spy rAF-throttled: section aktif, indeksnya, dan persentase scroll halaman. */
export function useActiveSection(): ActiveSection {
  const [state, setState] = useState<ActiveSection>({ activeId: SECTION_IDS[0], activeIndex: 0, percent: 0 })

  useEffect(() => {
    let ticking = false

    const compute = () => {
      const y = window.scrollY
      const docH = document.documentElement.scrollHeight - window.innerHeight
      const percent = docH > 0 ? Math.round((y / docH) * 100) : 0

      let activeIndex = 0
      SECTION_IDS.forEach((id, idx) => {
        const el = document.getElementById(id)
        if (el && y >= el.offsetTop - window.innerHeight * 0.42) activeIndex = idx
      })

      setState({ activeId: SECTION_IDS[activeIndex], activeIndex, percent })
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(compute)
        ticking = true
      }
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return state
}
