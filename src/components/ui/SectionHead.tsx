import { Reveal } from './Reveal'

interface SectionHeadProps {
  index: string // "Sec 02"
  title: string
  tail: string
}

export function SectionHead({ index, title, tail }: SectionHeadProps) {
  return (
    <Reveal className="sect-head">
      <span className="idx mono">{index}</span>
      <h2>{title}</h2>
      <span className="tail mono">{tail}</span>
    </Reveal>
  )
}
