import type { Project } from '../types/content'

export const projects: Project[] = [
  {
    code: 'flagship',
    featured: true,
    frame: 'phone',
    title: { id: 'ERP Mobile System', en: 'ERP Mobile System' },
    subtitle: 'SHZ360 · Flutter',
    desc: {
      id: 'ERP Mobile System adalah aplikasi Flutter untuk staf gudang dan produksi di lapangan: purchase request, terima PO, DO masuk/keluar, proses produksi, lacak kode produksi, sampai cek kartu stok harian — langsung dari HP, tersinkron ke ERP lewat REST API sehingga angka di lantai produksi dan di kantor selalu sama.',
      en: 'ERP Mobile System is a Flutter app for warehouse and production staff on the floor: purchase requests, PO receiving, inbound/outbound DOs, production runs, production-code tracing, and daily stock cards — straight from the phone, synced to the ERP over a REST API so the floor and the office see the same numbers.',
    },
    stack: ['Flutter', 'Dart', 'REST API', 'ERP'],
    image: '/img/Flutter Mobile Apps.jpeg',
    repo: 'https://github.com/ahmdkenz',
    flow: [
      { label: { id: 'App Mobile', en: 'Mobile app' }, tag: 'IN' },
      { label: { id: 'REST API', en: 'REST API' }, tag: 'SYNC' },
      { label: { id: 'ERP SHZ360', en: 'SHZ360 ERP' }, tag: 'OUT' },
    ],
  },
  {
    code: 'P-01',
    title: {
      id: 'Finance & Accounting App',
      en: 'Finance & Accounting App',
    },
    desc: {
      id: 'Aplikasi keuangan yang berdiri sendiri tapi menyatu dengan ERP utama: setiap transaksi produksi dan stok mengalir masuk sebagai data akuntansi tanpa input ulang, sehingga angka di kedua sistem selalu sama dan bisa ditelusuri sampai ke dokumen asalnya.',
      en: 'A finance application that stands on its own yet stays fused to the main ERP: every production and stock transaction flows in as accounting data with no re-entry, so the numbers match on both sides and trace back to the document they came from.',
    },
    stack: ['Laravel', 'MySQL', 'REST API', 'Integration'],
    image: '/img/Finance & Accounting App.png',
    live: 'https://iron.alishabogaprima.com',
    repo: 'https://github.com/ahmdkenz',
  },
  {
    code: 'P-02',
    title: { id: 'ERP Manufaktur F&B', en: 'F&B Manufacturing ERP' },
    desc: {
      id: 'Sistem ERP untuk lini produksi F&B: master data, alur produksi, stok, sampai pelaporan yang bisa ditelusuri.',
      en: 'An ERP for the F&B production line: master data, production flow, stock, and traceable reporting.',
    },
    stack: ['Laravel', 'Vue.js', 'MySQL', 'ERP'],
    image: '/img/F&B Manufacturing ERP.png',
    live: 'https://shz360.net/login',
    repo: 'https://github.com/ahmdkenz',
  },
  {
    code: 'P-03',
    title: { id: 'ROSHAN', en: 'ROSHAN' },
    desc: {
      id: 'Website perusahaan untuk brand decorative surface: showcase produk flooring dan wall cladding, halaman project, katalog digital, blog, dan lokasi toko — konten dikelola lewat CMS.',
      en: 'Company website for a decorative surface brand: flooring and wall cladding showcases, project pages, a digital catalog, blog, and store locator — all content managed through a CMS.',
    },
    stack: ['Next.js', 'Tailwind', 'CMS', 'SEO'],
    image: '/img/roshan.png',
    live: 'https://www.roshan.id/',
    repo: 'https://github.com/ahmdkenz',
  },
  {
    code: 'P-04',
    title: { id: 'Point of Sale', en: 'Point of Sale' },
    desc: {
      id: 'Proses transaksi penjualan, manajemen produk, dan cetak struk langsung dari browser.',
      en: 'Process sales transactions, manage products, and print receipts straight from the browser.',
    },
    stack: ['POS', 'Transactions', 'Print'],
    image: '/img/Sales & Services.png',
    repo: 'https://github.com/ahmdkenz',
  },
  {
    code: 'P-05',
    title: { id: 'E-Catalog Mustika', en: 'E-Catalog Mustika' },
    desc: {
      id: 'Katalog produk online lengkap untuk Mustika Komputer agar daftar produk mudah dijelajahi pelanggan.',
      en: 'A complete online product catalog for Mustika Komputer so customers can browse the product list easily.',
    },
    stack: ['Catalog', 'Frontend', 'Responsive'],
    image: '/img/E-Catalog Mustika Komputer.png',
    live: 'https://project-ecommerce-liard.vercel.app/',
    repo: 'https://github.com/ahmdkenz',
  },
  {
    code: 'P-06',
    title: { id: 'Portal Artikel & Berita', en: 'Article & News Portal' },
    desc: {
      id: 'Situs artikel yang cepat, ramah pengguna, dan dioptimalkan untuk mesin pencari, dengan kategori dan pencarian.',
      en: 'A fast, user-friendly article site optimized for search engines, with categories and search built in.',
    },
    stack: ['SEO', 'CMS', 'Search'],
    image: '/img/mudamelekfinansial.png',
    live: 'https://project-website-article-tezt.vercel.app/',
    repo: 'https://github.com/ahmdkenz',
  },
  {
    code: 'P-07',
    title: { id: 'Sistem Seleksi Karyawan', en: 'Employee Selection System' },
    desc: {
      id: 'Aplikasi web yang membuat proses seleksi karyawan lebih cepat dan lebih objektif.',
      en: 'A web application that makes the employee selection process faster and more objective.',
    },
    stack: ['Web App', 'Scoring', 'HR'],
    image: '/img/employee-selection.jpg',
    repo: 'https://github.com/ahmdkenz',
  },
  {
    code: 'P-08',
    title: { id: 'Warehouse Inventory', en: 'Warehouse Inventory' },
    desc: {
      id: 'Pelacakan pergerakan stok, pengelolaan data produk, dan laporan otomatis untuk gudang.',
      en: 'Stock movement tracking, product data management, and automated reporting for the warehouse.',
    },
    stack: ['Web App', 'Reporting', 'Stock'],
    image: '/img/warehouse-inventory.jpg',
    repo: 'https://github.com/ahmdkenz',
  },
]
