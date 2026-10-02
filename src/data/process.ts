import type { Bi, TitledStep } from '../types/content'

export const processLede: Bi = {
  id: 'Sistem internal jarang gagal karena kodenya salah. Lebih sering gagal karena dibangun dari asumsi tentang cara orang bekerja, bukan dari cara mereka benar-benar bekerja. Urutan ini yang saya pakai supaya asumsi itu ketahuan lebih awal.',
  en: 'Internal systems rarely fail because the code is wrong. They fail because they were built on assumptions about how people work rather than how they actually work. This is the sequence I use to surface those assumptions early.',
}

export const processSteps: TitledStep[] = [
  {
    title: { id: 'Dengar di lantai', en: 'Listen on the floor' },
    desc: {
      id: 'Duduk bersama operator dan admin, melihat langsung pekerjaan yang ada sekarang beserta spreadsheet dan catatan kertas yang mereka andalkan.',
      en: 'Sit with the operators and admin staff and watch the work as it stands today, including the spreadsheets and paper notes they quietly rely on.',
    },
  },
  {
    title: { id: 'Petakan proses', en: 'Map the process' },
    desc: {
      id: 'Menggambar alur nyata lengkap dengan titik yang sering salah, lalu dikonfirmasi ulang ke orang yang mengerjakannya setiap hari.',
      en: 'Draw the real flow along with the points where it usually breaks, then confirm it back with the people who run it every day.',
    },
  },
  {
    title: { id: 'Rancang data', en: 'Model the data' },
    desc: {
      id: 'Struktur tabel dan relasinya ditetapkan lebih dulu. Aturan validasi ditaruh di level data, bukan hanya di form, supaya data kotor tidak punya pintu masuk.',
      en: 'Tables and relationships are settled first. Validation lives at the data level, not only in the form, so bad data has no way in.',
    },
  },
  {
    title: { id: 'Prototipe cepat', en: 'Prototype early' },
    desc: {
      id: 'Satu modul kecil yang sudah bisa diklik dalam hitungan hari, supaya diskusi memakai layar nyata dan bukan bayangan masing-masing.',
      en: 'One small clickable module within days, so the conversation happens over a real screen instead of everyone picturing something different.',
    },
  },
  {
    title: { id: 'Rilis bertahap', en: 'Ship in stages' },
    desc: {
      id: 'Modul paling menyakitkan dirilis duluan, berjalan berdampingan dengan cara lama sampai tim percaya dan mau pindah sepenuhnya.',
      en: 'The most painful module goes first and runs alongside the old way until the team trusts it enough to move over fully.',
    },
  },
  {
    title: { id: 'Dampingi & rapikan', en: 'Support & refine' },
    desc: {
      id: 'Saya ikut menangani keluhan harian. Keluhan yang berulang bukan gangguan — itu daftar perbaikan berikutnya yang sudah tervalidasi pengguna.',
      en: 'I handle the daily complaints myself. Recurring ones are not noise — they are the next list of fixes, already validated by users.',
    },
  },
]
