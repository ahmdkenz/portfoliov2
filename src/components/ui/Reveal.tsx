import type { HTMLAttributes } from 'react'
import { useReveal } from '../../hooks/useReveal'

type RevealProps = HTMLAttributes<HTMLDivElement>

/** Pembungkus deklaratif untuk animasi masuk saat scroll, dibangun di atas `useReveal`. */
export function Reveal({ className, children, ...rest }: RevealProps) {
  const { ref, inView } = useReveal<HTMLDivElement>()
  const classes = [className, inView ? 'in' : null].filter(Boolean).join(' ')
  return (
    <div ref={ref} data-reveal className={classes || undefined} {...rest}>
      {children}
    </div>
  )
}
