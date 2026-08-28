import type { Bi, Lang, SpecRow } from '../types/content'

export const contact = {
  email: 'ahmadnurhafidz462@gmail.com',
  phoneDisplay: '0851 5787 7443',
  phoneHref: '085157877443',
  linkedinDisplay: '/in/ahmad-nur-hafidz',
  linkedinHref: 'https://www.linkedin.com/in/ahmad-nur-hafidz/',
  githubDisplay: 'github.com/ahmdkenz',
  githubHref: 'https://github.com/ahmdkenz',
  location: 'Jl. Raya Poncol RT.03/007, Ciracas, Jakarta Timur 13740',
}

/** frasa peran yang diketik ulang (typewriter), tidak masuk kamus `ui` karena bertipe array per bahasa */
export const heroRoles: Record<Lang, string[]> = {
  id: ['Fullstack Developer', 'Vue.js & Laravel', 'ERP Manufaktur', 'Frontend & Backend'],
  en: ['Fullstack Developer', 'Vue.js & Laravel', 'Manufacturing ERP', 'Frontend & Backend'],
}

/** nilai panel status yang sama di kedua bahasa (istilah teknis) */
export const panelPlain = {
  role: 'Full-Stack Dev & IT Support',
  core: 'Vue · Laravel · MySQL',
}

export const aboutLede: { before: Bi; highlight: Bi } = {
  before: {
    id: 'Saya menulis kode untuk pabrik — tempat di mana ',
    en: 'I write code for factories — where ',
  },
  highlight: {
    id: 'satu baris data yang salah bisa menghentikan satu shift produksi.',
    en: 'one bad row of data can stop an entire production shift.',
  },
}

export const aboutParagraphs: [Bi, Bi] = [
  {
    id: 'Latar saya fullstack: menerjemahkan desain jadi antarmuka yang responsif dan enak dipakai operator, lalu menopangnya dengan REST API, logika server, dan struktur database yang rapi. Pemahaman ujung-ke-ujung itu yang membuat saya bisa menjembatani kebutuhan user di lantai produksi dengan cara sistem bekerja di belakang layar.',
    en: 'My background is fullstack: turning designs into responsive interfaces that operators actually enjoy using, then backing them with REST APIs, server-side logic, and a clean database structure. That end-to-end understanding is what lets me bridge what users need on the floor and how the system works behind the screen.',
  },
  {
    id: 'Di PT. Sheza Mitra Amanah saya merancang ERP untuk sektor Food & Beverage, membangun aplikasi Finance & Accounting yang terintegrasi dengannya, menjaga integritas data, dan merapikan UI supaya tim benar-benar mau memakainya. Sebelum itu, lima tahun mengerjakan inventory, POS, portal berita, dan e-catalog — plus support hardware yang mengajari saya satu hal: downtime itu mahal.',
    en: 'At PT. Sheza Mitra Amanah I designed an ERP for the Food & Beverage sector, built a Finance & Accounting application integrated with it, kept data integrity intact, and reworked the UI so the team would genuinely want to use it. Before that, five years across inventory, POS, news portals, and e-catalogs — plus hardware support, which taught me one thing: downtime is expensive.',
  },
]

export const softSkills: Bi[] = [
  { id: 'Kerja tim', en: 'Team work' },
  { id: 'Adaptif', en: 'Adaptability' },
  { id: 'Berpikir kritis', en: 'Critical thinking' },
  { id: 'Problem solving', en: 'Problem solving' },
  { id: 'Cepat belajar', en: 'Fast learner' },
]

export const specRows: SpecRow[] = [
  {
    k: { id: 'Nama', en: 'Name' },
    v: { id: 'Ahmad Nur Hafidz', en: 'Ahmad Nur Hafidz' },
  },
  {
    k: { id: 'Posisi', en: 'Role' },
    v: { id: 'Fullstack Developer', en: 'Fullstack Developer' },
    sub: { id: 'Frontend & Backend Engineering', en: 'Frontend & Backend Engineering' },
  },
  {
    k: { id: 'Domisili', en: 'Based in' },
    v: { id: 'Ciracas, Jakarta Timur', en: 'Ciracas, East Jakarta' },
    sub: { id: 'DKI Jakarta 13740', en: 'DKI Jakarta 13740' },
  },
  {
    k: { id: 'Pendidikan', en: 'Education' },
    v: { id: 'Universitas Indraprasta PGRI', en: 'Universitas Indraprasta PGRI' },
    sub: {
      id: 'S1 Teknik Informatika · IPK 3.25 / 4.00 · 2021–2024',
      en: 'B.Eng. Informatics · GPA 3.25 / 4.00 · 2021–2024',
    },
  },
  {
    k: { id: 'Sertifikat', en: 'Certificates' },
    v: { id: 'Web Programming Fundamentals', en: 'Web Programming Fundamentals' },
    sub: { id: 'Front-End Web Development for Beginners', en: 'Front-End Web Development for Beginners' },
  },
  {
    k: { id: 'Fokus', en: 'Focus' },
    v: { id: 'ERP · Finance & Accounting · Inventory', en: 'ERP · Finance & Accounting · Inventory' },
    sub: { id: 'Sistem operasional manufaktur', en: 'Manufacturing operations systems' },
  },
]

export const ctBig: { line1: Bi; line2Before: Bi; emphasis: Bi } = {
  line1: { id: 'Punya sistem', en: 'Got a system' },
  line2Before: { id: 'yang perlu ', en: 'that needs ' },
  emphasis: { id: 'dibangun?', en: 'building?' },
}

export const techTicker: string[] = [
  'Vue.js',
  'Next.js',
  'React.js',
  'Laravel',
  'MySQL',
  'Tailwind',
  'Google Cloud',
  'REST API',
  'ERP Manufacturing',
  'UI / UX',
]
