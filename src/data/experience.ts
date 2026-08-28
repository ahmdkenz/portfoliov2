import type { ExperienceEntry } from '../types/content'

export const experience: ExperienceEntry[] = [
  {
    company: 'PT. Sheza Mitra Amanah',
    location: 'Jagakarsa, Jakarta',
    period: { id: 'Des 2025 — Sekarang', en: 'Dec 2025 — Present' },
    role: { id: 'Full-Stack Developer & IT Support', en: 'Full-Stack Developer & IT Support' },
    status: 'running',
    points: [
      {
        id: 'Merancang dan membangun sistem ERP menyeluruh untuk sektor manufaktur Food & Beverage guna merapikan operasional inti.',
        en: 'Designed and developed a comprehensive ERP system for the Food & Beverage manufacturing sector to streamline core operations.',
      },
      {
        id: 'Membangun aplikasi Finance & Accounting tersendiri dan mengintegrasikannya dengan ERP utama, sehingga data tersinkron real-time dan akurat.',
        en: 'Engineered a dedicated Finance & Accounting application and integrated it with the primary ERP, keeping data synchronized in real time and accurate.',
      },
      {
        id: 'Menjaga integritas database dengan menelusuri dan menyelesaikan anomali input serta ketidaksesuaian sistem.',
        en: 'Maintained database integrity by identifying, troubleshooting, and resolving input anomalies and system discrepancies.',
      },
      {
        id: 'Merombak dan mengoptimalkan antarmuka untuk meningkatkan pengalaman, kemudahan, dan keterpakaian sistem.',
        en: 'Revamped and optimized the user interface to improve experience, usability, and adoption of the system.',
      },
      {
        id: 'Memberi dukungan teknis cepat untuk isu end-user kompleks sehingga downtime operasional ditekan.',
        en: 'Delivered prompt technical support for complex end-user issues, minimizing operational downtime.',
      },
    ],
    tags: ['Laravel', 'Vue.js', 'MySQL', 'ERP', 'Finance & Accounting'],
  },
  {
    company: 'Mustika Computer',
    location: 'Ciracas, Jakarta Timur',
    period: { id: 'Jan 2021 — Des 2025', en: 'Jan 2021 — Dec 2025' },
    role: { id: 'Karyawan', en: 'Employee' },
    status: 'completed',
    points: [
      {
        id: 'Melakukan debugging frontend dan backend untuk memperbaiki error serta meningkatkan performa.',
        en: 'Conducted frontend and backend debugging to resolve errors and improve performance.',
      },
      {
        id: 'Merancang dan membangun portal berita dan website blog end-to-end, lengkap dengan kategori dan pencarian.',
        en: 'Designed and built end-to-end news portal and blog websites, complete with categories and search.',
      },
      {
        id: 'Membangun aplikasi inventory berbasis web untuk manajemen stok, pelacakan aset, dan laporan real-time.',
        en: 'Built a web-based inventory application for stock management, asset tracking, and real-time reporting.',
      },
      {
        id: 'Mengembangkan aplikasi Point of Sale berbasis web untuk transaksi penjualan, manajemen produk, dan cetak struk.',
        en: 'Developed a web-based Point of Sale application to process sales, manage products, and print receipts.',
      },
    ],
    tags: ['POS', 'Inventory', 'News Portal', 'Debugging'],
  },
  {
    company: 'Duta Oto Raya',
    location: 'Ciracas, Jakarta Timur',
    period: { id: 'Jun 2022 — Jun 2023', en: 'Jun 2022 — Jun 2023' },
    role: { id: 'Magang · Berbasis proyek', en: 'Apprentice · Based on project' },
    status: 'completed',
    points: [
      {
        id: 'Bertanggung jawab atas pemeliharaan hardware dan software agar operasional sistem berjalan lancar dan aman.',
        en: 'Responsible for hardware and software maintenance to keep system operations smooth and secure.',
      },
      {
        id: 'Menjaga keandalan aplikasi inventory gudang lewat maintenance berkala, update fitur, dan perbaikan bug.',
        en: 'Ensured the reliability of the warehouse inventory application through periodic maintenance, feature updates, and bug fixes.',
      },
      {
        id: 'Merancang aplikasi inventory gudang berbasis web untuk melacak pergerakan stok, mengelola data produk, dan menghasilkan laporan otomatis.',
        en: 'Designed a web-based warehouse inventory application to track stock movements, manage product data, and generate automated reports.',
      },
      {
        id: 'Membangun website korporat dari tahap konsep sampai rilis, dengan fokus pada UX dan SEO.',
        en: 'Built corporate websites from concept to launch, with a focus on UX and SEO.',
      },
    ],
    tags: ['Warehouse', 'Web App', 'SEO', 'Maintenance'],
  },
  {
    company: 'Astra Honda Cibitung',
    location: 'Cibitung, Jawa Barat',
    period: { id: 'Okt 2021 — Jan 2022', en: 'Oct 2021 — Jan 2022' },
    role: { id: 'Magang', en: 'Apprentice' },
    status: 'completed',
    points: [
      {
        id: 'Memberi dukungan teknis tepat waktu untuk isu hardware dan software, menekan downtime sekaligus memperbaiki pengalaman pengguna.',
        en: 'Delivered timely technical support for hardware and software issues, cutting downtime and improving the user experience.',
      },
      {
        id: 'Menjaga keamanan data dan keandalan sistem lewat backup database rutin dan pengelolaan client system yang terintegrasi domain.',
        en: 'Ensured data security and system reliability through routine database backups and domain-integrated client systems.',
      },
      {
        id: 'Merakit dan menyiapkan komputer kustom serta upgrade hardware sesuai kebutuhan spesifik klien.',
        en: 'Built and deployed custom computer systems and performed hardware upgrades to meet client-specific needs.',
      },
    ],
    tags: ['IT Support', 'Database Backup', 'Hardware'],
  },
]
