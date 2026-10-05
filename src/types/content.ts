export type Lang = 'id' | 'en'

/** teks yang punya dua bahasa */
export type Bi = Record<Lang, string>

export const SECTION_IDS = [
  'home',
  'about',
  'skills',
  'experience',
  'projects',
  'case',
  'process',
  'contact',
] as const

export type SectionId = (typeof SECTION_IDS)[number]

/** kategori stack — satu orbit per kategori di scene Skills */
export type SkillGroupId = 'fe' | 'mobile' | 'env' | 'data' | 'cloud'

export interface SkillGroup {
  id: SkillGroupId
  code: string // "FE"
  title: Bi
}

export interface SkillModule {
  id: string // "ST-01"
  name: string // nama produk, tidak diterjemahkan
  group: SkillGroupId
  desc: Bi
  icon:
    | 'vue'
    | 'react'
    | 'next'
    | 'tailwind'
    | 'flutter'
    | 'dart'
    | 'laragon'
    | 'xampp'
    | 'mysql'
    | 'firebase'
    | 'gcp'
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

/** satu angka di strip bawah Hero */
export interface Metric {
  value: number
  suffix?: string // "+" — dirender lewat CSS ::after
  label: Bi
}

/** satu langkah bertitel (pendekatan case study, stasiun How I Work) */
export interface TitledStep {
  title: Bi
  desc: Bi
}

export interface CaseStudy {
  title: Bi
  client: string
  sector: Bi
  role: Bi
  stack: string
  period: Bi
  problem: Bi
  constraints: Bi[]
  steps: TitledStep[]
  outcomes: { value: Bi; label: Bi }[]
  note: Bi
}
