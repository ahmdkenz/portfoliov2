import type { PointerEvent } from 'react'
import { useT } from '../../context/LanguageContext'
import { Shot } from './Shot'
import { Reveal } from './Reveal'
import { ProjectLinks } from './ProjectLinks'
import type { Project } from '../../types/content'

interface ProjectCardProps {
  project: Project
}

function onPointerMove(e: PointerEvent<HTMLDivElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { tr } = useT()

  return (
    <Reveal className="pcard" onPointerMove={onPointerMove}>
      <div className="pshot">
        <Shot src={project.image} alt={tr(project.title)} />
        <span className="pnum mono">{project.code}</span>
      </div>
      <div className="pbody">
        <h4>{tr(project.title)}</h4>
        <p>{tr(project.desc)}</p>
        <div className="stackline">
          {project.stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <ProjectLinks live={project.live} repo={project.repo} />
      </div>
    </Reveal>
  )
}
