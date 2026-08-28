import { useState } from 'react'

interface ShotProps {
  src: string
  alt: string
  /** 'grid' = kartu project 16:10 (pola pshot); 'feature' = gambar flagship full-bleed (feature-img) */
  variant?: 'grid' | 'feature'
  eager?: boolean
}

/** Gambar dengan fallback pola grid gelap + nama file bila gambar gagal dimuat. */
export function Shot({ src, alt, variant = 'grid', eager }: ShotProps) {
  const [broken, setBroken] = useState(false)
  const filename = src.split('/').pop() ?? src

  if (variant === 'feature') {
    return (
      <>
        <div className="netgrid" aria-hidden="true" />
        {broken && (
          <div className="pshot-ph" aria-hidden="true">
            <span className="mono">{filename}</span>
          </div>
        )}
        {!broken && (
          <img
            src={src}
            alt={alt}
            className="feature-img"
            loading={eager ? 'eager' : 'lazy'}
            onError={() => setBroken(true)}
          />
        )}
      </>
    )
  }

  return (
    <>
      <span className="pshot-grid" aria-hidden="true" />
      <div className="pshot-ph" aria-hidden="true">
        <span className="mono">{filename}</span>
      </div>
      {!broken && (
        <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} onError={() => setBroken(true)} />
      )}
    </>
  )
}
