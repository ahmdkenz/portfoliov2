import type { CaseStudy } from '../types/content'

export const caseStudy: CaseStudy = {
  title: { id: 'ERP Manufaktur Food & Beverage', en: 'Food & Beverage Manufacturing ERP' },
  client: 'PT. Sheza Mitra Amanah',
  sector: { id: 'Manufaktur makanan & minuman', en: 'Food & beverage manufacturing' },
  role: { id: 'Analisis, rancang, bangun, rollout', en: 'Analysis, design, build, rollout' },
  stack: 'Laravel · Vue.js · MySQL',
  period: { id: 'Des 2025 — berjalan', en: 'Dec 2025 — ongoing' },

  problem: {
    id: 'Setiap bagian memegang angkanya sendiri. Produksi mencatat di satu tempat, gudang di tempat lain, keuangan merekap ulang dari dua-duanya. Akibatnya satu pertanyaan sederhana — berapa stok bahan hari ini — bisa punya tiga jawaban berbeda, dan satu salah input baru ketahuan berminggu-minggu kemudian saat tutup buku, ketika menelusurinya sudah jauh lebih mahal daripada mencegahnya.',
    en: 'Every department held its own numbers. Production recorded in one place, the warehouse in another, finance re-keyed from both. A simple question — how much raw material is on hand today — could return three different answers, and a single bad entry only surfaced weeks later at closing, by which point tracing it cost far more than preventing it would have.',
  },

  constraints: [
    {
      id: 'Penggunanya staf produksi dan admin, bukan orang teknis — sistem harus bisa dipakai tanpa pelatihan panjang.',
      en: 'The users are production and admin staff, not technical people — the system had to be usable without lengthy training.',
    },
    {
      id: 'Produksi tidak bisa berhenti. Migrasi harus berjalan berdampingan dengan cara kerja lama, bukan menggantikannya dalam semalam.',
      en: 'Production could not stop. The rollout had to run alongside the old way of working rather than replace it overnight.',
    },
    {
      id: 'Dikerjakan sendirian sambil tetap memegang IT support harian, jadi setiap keputusan teknis harus murah dirawat.',
      en: 'Built solo while still handling daily IT support, so every technical decision had to be cheap to maintain.',
    },
  ],

  steps: [
    {
      title: { id: 'Mulai dari lantai, bukan dari diagram', en: 'Start on the floor, not on a diagram' },
      desc: {
        id: 'Saya ikuti satu siklus penuh dari bahan masuk sampai barang jadi, lalu mencatat alur yang benar-benar dipakai — termasuk spreadsheet bayangan dan catatan kertas yang tidak pernah muncul di prosedur resmi. Alur itu yang jadi dasar rancangan, bukan alur ideal di atas kertas.',
        en: 'I followed one full cycle from raw material intake to finished goods and mapped the flow people actually use — including the shadow spreadsheets and paper notes that never appear in the official procedure. That flow became the basis for the design, not the idealized one on paper.',
      },
    },
    {
      title: { id: 'Satu sumber kebenaran', en: 'One source of truth' },
      desc: {
        id: 'Setiap pergerakan produksi dan stok menulis ke jejak transaksi yang sama. Aplikasi Finance membaca dari jejak itu dan membentuk jurnal sendiri, sehingga tidak ada pengetikan ulang — dan setiap angka di laporan bisa ditelusuri balik ke dokumen asalnya.',
        en: 'Every production and stock movement writes to the same transaction trail. The finance application reads from that trail and forms its own journal entries, so nothing is re-keyed — and every figure in a report traces back to the document it came from.',
      },
    },
    {
      title: { id: 'Rilis bertahap, mulai dari yang paling sakit', en: 'Ship in stages, starting where it hurts most' },
      desc: {
        id: 'Modul stok dirilis duluan karena di situ kerugiannya paling terasa. Begitu tim melihat selisih stok berkurang, kepercayaan terbangun dan modul berikutnya jauh lebih mudah diterima.',
        en: 'The stock module shipped first because that is where the losses were most visible. Once the team saw stock discrepancies shrink, trust was there and every module after it met far less resistance.',
      },
    },
  ],

  outcomes: [
    {
      value: { id: '1 sumber data', en: '1 source' },
      label: { id: 'Produksi, gudang, dan keuangan membaca angka yang sama', en: 'Production, warehouse and finance read the same numbers' },
    },
    {
      value: { id: '0 input ulang', en: '0 re-entry' },
      label: { id: 'Jurnal terbentuk dari transaksi, bukan diketik ulang', en: 'Journals form from transactions instead of being typed again' },
    },
    {
      value: { id: 'Harian', en: 'Daily' },
      label: { id: 'Laporan stok dan keuangan tanpa menunggu rekap manual', en: 'Stock and finance reports without waiting on a manual recap' },
    },
  ],

  note: {
    id: 'Angka dampak terukur — waktu tutup buku, jumlah pengguna aktif, dan selisih stok — ditambahkan setelah periode pengukuran berjalan selesai.',
    en: 'Measured impact figures — closing time, active users, and stock variance — will be added once the current measurement period is complete.',
  },
}
