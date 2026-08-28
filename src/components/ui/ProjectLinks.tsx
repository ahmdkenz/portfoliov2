import { Globe } from 'lucide-react'
import { useT } from '../../context/LanguageContext'

interface ProjectLinksProps {
  live?: string
  repo?: string
}

/** lucide-react tidak menyediakan mark brand GitHub — SVG inline sesuai README §2 ("SVG inline untuk logo stack"). */
function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={13} height={13}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
    </svg>
  )
}

/** Baris tautan Live/GitHub bersama untuk kartu project dan flagship — Live redup & non-klik bila `live` kosong. */
export function ProjectLinks({ live, repo }: ProjectLinksProps) {
  const { t } = useT()
  return (
    <div className="plinks">
      {live ? (
        <a className="plink" href={live} target="_blank" rel="noopener noreferrer">
          <Globe size={13} />
          <span>{t('proj.live')}</span>
        </a>
      ) : (
        <span className="plink plink--off" aria-disabled="true">
          <Globe size={13} />
          <span>{t('proj.live')}</span>
        </span>
      )}
      {repo && (
        <a className="plink" href={repo} target="_blank" rel="noopener noreferrer">
          <GithubIcon />
          <span>GitHub</span>
        </a>
      )}
    </div>
  )
}
