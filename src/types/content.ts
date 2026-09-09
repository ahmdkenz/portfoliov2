export type Lang = 'id' | 'en'

/** teks yang punya dua bahasa */
export type Bi = Record<Lang, string>

export const SECTION_IDS = [
  'home',
  'about',
  'skills',
  'experience',
  'projects',
  'contact',
] as const

export type SectionId = (typeof SECTION_IDS)[number]

export interface SkillModule {
  id: string // "ST-01"
  name: string // nama produk, tidak diterjemahkan
  desc: Bi
  icon: 'vue' | 'react' | 'next' | 'tailwind' | 'flutter' | 'dart' | 'laragon' | 'xampp' | 'gcp'
}

export interface ExperienceEntry {
  company: string
  location: string
  period: Bi // "Des 2025 — Sekarang" / "Dec 2025 — Present"
  role: Bi
  status: 'running' | 'completed'
  points: Bi[]
  tags: string[]
}

export interface Project {
  code: string // "P-01"; flagship pakai "flagship"
  featured?: boolean
  title: Bi
  desc: Bi
  stack: string[]
  image: string // "/img/finance-app.jpg"
  live?: string // kosongkan kalau belum publik
  repo?: string
}

/** satu baris tabel spesifikasi di section About */
export interface SpecRow {
  k: Bi
  v: Bi
  sub?: Bi
}
