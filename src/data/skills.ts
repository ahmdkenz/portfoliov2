import type { SkillGroup, SkillModule } from '../types/content'

/** urutan = urutan grup chip; tiap grup = satu orbit di scene Skills */
export const skillGroups: SkillGroup[] = [
  { id: 'fe', code: 'FE', title: { id: 'Frontend', en: 'Frontend' } },
  { id: 'mobile', code: 'MOB', title: { id: 'Mobile', en: 'Mobile' } },
  { id: 'env', code: 'ENV', title: { id: 'Environment', en: 'Environment' } },
  { id: 'data', code: 'DAT', title: { id: 'Data', en: 'Data' } },
  { id: 'cloud', code: 'CLD', title: { id: 'Cloud', en: 'Cloud' } },
]

export const skillModules: SkillModule[] = [
  {
    id: 'ST-01',
    name: 'Vue.js',
    icon: 'vue',
    group: 'fe',
    desc: {
      id: 'Stack utama harian untuk antarmuka ERP dan dashboard operasional.',
      en: 'Daily driver for ERP interfaces and operational dashboards.',
    },
  },
  {
    id: 'ST-02',
    name: 'React.js',
    icon: 'react',
    group: 'fe',
    desc: {
      id: 'Komponen berbasis state untuk aplikasi web yang interaktif.',
      en: 'State-driven components for interactive web applications.',
    },
  },
  {
    id: 'ST-03',
    name: 'Next.js',
    icon: 'next',
    group: 'fe',
    desc: {
      id: 'Rendering sisi server dan routing untuk situs yang cepat dan SEO-friendly.',
      en: 'Server-side rendering and routing for fast, SEO-friendly sites.',
    },
  },
  {
    id: 'ST-04',
    name: 'Tailwind',
    icon: 'tailwind',
    group: 'fe',
    desc: {
      id: 'Utility-first untuk membangun UI konsisten dengan cepat.',
      en: 'Utility-first styling for building consistent UI fast.',
    },
  },
  {
    id: 'ST-05',
    name: 'Flutter',
    icon: 'flutter',
    group: 'mobile',
    desc: {
      id: 'Toolkit UI lintas platform untuk membangun aplikasi mobile yang dikompilasi secara native.',
      en: 'Cross-platform UI toolkit for building natively compiled mobile apps.',
    },
  },
  {
    id: 'ST-06',
    name: 'Dart',
    icon: 'dart',
    group: 'mobile',
    desc: {
      id: 'Bahasa yang dioptimalkan untuk client, menjalankan UI reaktif Flutter.',
      en: "Client-optimized language that powers Flutter's fast, reactive UI.",
    },
  },
  {
    id: 'ST-07',
    name: 'Laragon',
    icon: 'laragon',
    group: 'env',
    desc: {
      id: 'Environment lokal untuk pengembangan dan pengujian aplikasi PHP.',
      en: 'Local environment for developing and testing PHP applications.',
    },
  },
  {
    id: 'ST-08',
    name: 'XAMPP',
    icon: 'xampp',
    group: 'env',
    desc: {
      id: 'Stack Apache · MySQL · PHP untuk setup server lokal.',
      en: 'Apache · MySQL · PHP stack for local server setup.',
    },
  },
  {
    id: 'ST-09',
    name: 'MySQL',
    icon: 'mysql',
    group: 'data',
    desc: {
      id: 'Basis data relasional untuk menyimpan dan mengelola data aplikasi.',
      en: 'Relational database for storing and managing application data.',
    },
  },
  {
    id: 'ST-10',
    name: 'Firebase',
    icon: 'firebase',
    group: 'data',
    desc: {
      id: 'Backend as a service untuk autentikasi, database realtime, dan hosting.',
      en: 'Backend as a service for authentication, realtime database, and hosting.',
    },
  },
  {
    id: 'ST-11',
    name: 'Google Cloud',
    icon: 'gcp',
    group: 'cloud',
    desc: {
      id: 'Deployment dan layanan cloud untuk menjalankan aplikasi di produksi.',
      en: 'Deployment and cloud services for running apps in production.',
    },
  },
]
