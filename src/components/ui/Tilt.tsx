import { useState, type PointerEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface TiltProps {
  className?: string
  children: ReactNode
  as?: 'div' | 'article'
  /** derajat kemiringan maksimum */
  max?: number
  /** tambahan handler — mis. sorotan --mx/--my di ProjectCard */
  onPointerMove?: (e: PointerEvent<HTMLElement>) => void
}

const SPRING = { stiffness: 220, damping: 22, mass: 0.6 }

function finePointer() {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
}

/** Kartu yang miring mengikuti kursor (perspektif 3D) dan sedikit terangkat saat hover. */
export function Tilt({ className, children, as = 'div', max = 6, onPointerMove }: TiltProps) {
  const reduced = usePrefersReducedMotion()
  const [enabled] = useState(finePointer)
  const active = enabled && !reduced

  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const lift = useMotionValue(0)
  const rotateX = useSpring(rx, SPRING)
  const rotateY = useSpring(ry, SPRING)
  const y = useSpring(lift, SPRING)

  const Comp = as === 'article' ? motion.article : motion.div

  const move = (e: PointerEvent<HTMLElement>) => {
    onPointerMove?.(e)
    if (!active) return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * max * 2)
    rx.set(-py * max * 2)
  }

  const reset = () => {
    rx.set(0)
    ry.set(0)
    lift.set(0)
  }

  return (
    <Comp
      className={className}
      style={active ? { rotateX, rotateY, y, transformPerspective: 900 } : undefined}
      onPointerMove={move}
      onPointerEnter={() => active && lift.set(-6)}
      onPointerLeave={reset}
    >
      {children}
    </Comp>
  )
}
