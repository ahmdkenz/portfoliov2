import type { SkillGroup } from '../types/content'

export const skillGroups: SkillGroup[] = [
  {
    code: 'FE',
    title: { id: 'Frontend', en: 'Frontend' },
    modules: [
      {
        id: 'ST-01',
        name: 'Vue.js',
        icon: 'vue',
        desc: {
          id: 'Stack utama harian untuk antarmuka ERP dan dashboard operasional.',
          en: 'Daily driver for ERP interfaces and operational dashboards.',
        },
      },
      {
        id: 'ST-02',
        name: 'React.js',
        icon: 'react',
        desc: {
          id: 'Komponen berbasis state untuk aplikasi web yang interaktif.',
          en: 'State-driven components for interactive web applications.',
        },
      },
      {
        id: 'ST-03',
        name: 'Next.js',
        icon: 'next',
        desc: {
          id: 'Rendering sisi server dan routing untuk situs yang cepat dan SEO-friendly.',
          en: 'Server-side rendering and routing for fast, SEO-friendly sites.',
        },
      },
      {
        id: 'ST-04',
        name: 'HTML',
        icon: 'html',
        desc: {
          id: 'Markup semantik dan struktur dokumen yang aksesibel.',
          en: 'Semantic markup and accessible document structure.',
        },
      },
      {
        id: 'ST-05',
        name: 'CSS',
        icon: 'css',
        desc: {
          id: 'Layout responsif, animasi, dan sistem desain dari nol.',
          en: 'Responsive layouts, animation, and design systems from scratch.',
        },
      },
      {
        id: 'ST-06',
        name: 'Tailwind',
        icon: 'tailwind',
        desc: {
          id: 'Utility-first untuk membangun UI konsisten dengan cepat.',
          en: 'Utility-first styling for building consistent UI fast.',
        },
      },
    ],
  },
  {
    code: 'ENV',
    title: { id: 'Environment', en: 'Environment' },
    modules: [
      {
        id: 'ST-07',
        name: 'Laragon',
        icon: 'laragon',
        desc: {
          id: 'Environment lokal untuk pengembangan dan pengujian aplikasi PHP.',
          en: 'Local environment for developing and testing PHP applications.',
        },
      },
      {
        id: 'ST-08',
        name: 'XAMPP',
        icon: 'xampp',
        desc: {
          id: 'Stack Apache · MySQL · PHP untuk setup server lokal.',
          en: 'Apache · MySQL · PHP stack for local server setup.',
        },
      },
    ],
  },
  {
    code: 'CLD',
    title: { id: 'Cloud', en: 'Cloud' },
    modules: [
      {
        id: 'ST-09',
        name: 'Google Cloud',
        icon: 'gcp',
        desc: {
          id: 'Deployment dan layanan cloud untuk menjalankan aplikasi di produksi.',
          en: 'Deployment and cloud services for running apps in production.',
        },
      },
    ],
  },
]
