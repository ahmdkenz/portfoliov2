import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Lang, Bi } from '../types/content'
import { ui } from '../data/i18n'

interface Ctx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: keyof typeof ui) => string // untuk label UI
  tr: (value: Bi) => string // untuk konten dari data/
}

const LanguageContext = createContext<Ctx | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('anh-lang')
    return saved === 'id' || saved === 'en' ? saved : 'en' // default English
  })

  useEffect(() => {
    localStorage.setItem('anh-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const t = (key: keyof typeof ui) => ui[key][lang]
  const tr = (value: Bi) => value[lang]

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tr }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components -- useT belongs next to the provider it reads
export function useT() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useT harus dipakai di dalam LanguageProvider')
  return ctx
}
