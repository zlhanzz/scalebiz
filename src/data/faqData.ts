import { FaqCategory, FaqItem } from "@/types/faq";

export const FAQ_CATEGORIES: FaqCategory[] = [
  { id: "all", label: "Semua" },
  { id: "about", label: "Tentang Scalebiz" },
  { id: "process", label: "Proses & Biaya" },
  { id: "services", label: "Website & Sistem" },
  { id: "ownership", label: "Kepemilikan & Dukungan" },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "services-overview",
    category: "about",
    categoryLabel: "Tentang Scalebiz",
    priority: 1,
    question: "Apa saja layanan yang ditawarkan Scalebiz?",
    answer:
      "Scalebiz membantu bisnis membangun solusi digital yang sesuai dengan kebutuhan operasionalnya, mulai dari website, company profile, landing page, sistem bisnis, dashboard, hingga automation dan integrasi AI.",
  },
  {
    id: "more-than-website",
    category: "about",
    categoryLabel: "Tentang Scalebiz",
    priority: 2,
    question: "Apakah Scalebiz hanya membuat website?",
    answer:
      "Tidak. Website adalah salah satu layanan Scalebiz. Jika kebutuhan bisnis lebih kompleks, kami juga dapat membantu membangun sistem internal, dashboard, database, automation, dan integrasi berbagai tools. Solusi disesuaikan dengan kebutuhan bisnis, bukan dipaksakan ke satu paket.",
  },
  {
    id: "pricing-cost",
    category: "process",
    categoryLabel: "Proses & Biaya",
    priority: 3,
    question: "Berapa biaya pembuatan website atau sistem?",
    answer:
      "Biaya bergantung pada jenis website atau sistem, jumlah fitur, tingkat kompleksitas, integrasi, dan kebutuhan khusus. Untuk kebutuhan sederhana, estimasi dapat diberikan berdasarkan scope. Untuk sistem custom, kami akan memahami kebutuhan terlebih dahulu sebelum memberikan penawaran.",
    cta: {
      label: "Konsultasikan kebutuhan Anda →",
      href: "https://wa.me/6281527080656?text=Halo%20Scalebiz,%20saya%20ingin%20konsultasi%20mengenai%20estimasi%20biaya%20proyek%20saya.",
      isExternal: true,
    },
  },
  {
    id: "work-process",
    category: "process",
    categoryLabel: "Proses & Biaya",
    priority: 4,
    question: "Bagaimana proses pengerjaan proyek di Scalebiz?",
    answer:
      "Secara umum, proses dimulai dari konsultasi dan pemahaman kebutuhan, dilanjutkan dengan analisis, penyusunan scope dan proposal, development, review, hingga deployment. Setelah proyek selesai, maintenance atau pengembangan lanjutan dapat dilakukan sesuai kebutuhan.",
    processSteps: [
      { number: "01", title: "Konsultasi", desc: "Diskusi kebutuhan & goal bisnis" },
      { number: "02", title: "Analisis", desc: "Pemetaan workflow & arsitektur" },
      { number: "03", title: "Proposal", desc: "Scope kerja, timeline & biaya pasti" },
      { number: "04", title: "Development", desc: "Pembangunan sistem & implementasi" },
      { number: "05", title: "Review", desc: "Uji coba bersama & penyesuaian" },
      { number: "06", title: "Launch", desc: "Deploy sistem live ke produksi" },
      { number: "07", title: "Support", desc: "Pendampingan & pemeliharaan" },
    ],
  },
  {
    id: "duration-timeline",
    category: "process",
    categoryLabel: "Proses & Biaya",
    priority: 5,
    question: "Berapa lama proses pengerjaan website?",
    answer:
      "Durasi bergantung pada kompleksitas proyek. Landing page sederhana dapat diselesaikan dalam beberapa hari, sedangkan company profile, website dengan fitur khusus, atau sistem bisnis membutuhkan waktu yang lebih panjang. Estimasi final akan diberikan setelah scope proyek ditentukan.",
  },
  {
    id: "custom-features",
    category: "process",
    categoryLabel: "Proses & Biaya",
    priority: 6,
    question: "Apakah bisa request fitur khusus?",
    answer:
      "Ya. Scalebiz dapat mengembangkan fitur sesuai kebutuhan bisnis selama kebutuhan tersebut secara teknis memungkinkan dan sesuai dengan scope proyek. Contohnya booking system, dashboard, CRM, inventory, database pelanggan, quotation, WhatsApp integration, reporting, automation, dan integrasi layanan lainnya.",
  },
  {
    id: "non-technical-clients",
    category: "about",
    categoryLabel: "Tentang Scalebiz",
    priority: 7,
    question: "Saya tidak mengerti teknologi. Apakah tetap bisa menggunakan jasa Scalebiz?",
    answer:
      "Tentu. Anda tidak perlu memahami coding atau istilah teknis. Cukup jelaskan bisnis, masalah, atau tujuan yang ingin dicapai. Scalebiz akan membantu menerjemahkannya menjadi solusi digital yang lebih mudah dipahami dan digunakan.",
  },
  {
    id: "whatsapp-integration",
    category: "services",
    categoryLabel: "Website & Sistem",
    priority: 8,
    question: "Apakah website bisa terhubung dengan WhatsApp?",
    answer:
      "Bisa. Website dapat diintegrasikan dengan WhatsApp untuk kebutuhan seperti tombol chat, inquiry pelanggan, booking, lead generation, notifikasi, dan workflow tertentu. Untuk automation yang lebih kompleks, kebutuhan teknis akan dibahas terlebih dahulu.",
  },
  {
    id: "internal-business-system",
    category: "services",
    categoryLabel: "Website & Sistem",
    priority: 9,
    question: "Apakah Scalebiz bisa membuat sistem internal untuk bisnis?",
    answer:
      "Bisa. Sistem dapat dirancang untuk membantu kebutuhan seperti dashboard, inventory, CRM, database pelanggan, project management, reporting, booking, quotation, administrasi, hingga workflow automation.",
  },
  {
    id: "maintenance-support",
    category: "ownership",
    categoryLabel: "Kepemilikan & Dukungan",
    priority: 10,
    question: "Apakah tersedia maintenance setelah website selesai?",
    answer:
      "Bisa. Scalebiz dapat membantu maintenance dan pengembangan lanjutan seperti update konten, perbaikan bug, perubahan fitur, monitoring, dan pengembangan modul baru. Detail maintenance disesuaikan dengan kebutuhan proyek.",
  },
  {
    id: "access-ownership",
    category: "ownership",
    categoryLabel: "Kepemilikan & Dukungan",
    priority: 11,
    question: "Apakah saya mendapatkan akses ke website setelah proyek selesai?",
    answer:
      "Ya. Akses dan kredensial yang menjadi hak klien akan diserahkan sesuai dengan scope dan teknologi yang digunakan. Untuk sistem tertentu, akses administrator dapat diberikan berdasarkan kebutuhan dan struktur pengguna.",
  },
  {
    id: "revision-policy",
    category: "ownership",
    categoryLabel: "Kepemilikan & Dukungan",
    priority: 12,
    question: "Apakah ada revisi?",
    answer:
      "Ya. Mekanisme dan jumlah revisi mengikuti scope atau paket proyek yang disepakati di awal. Feedback dikumpulkan pada tahap review agar perubahan dapat dilakukan secara terstruktur tanpa mengganggu timeline proyek.",
  },
  {
    id: "umkm-friendly",
    category: "about",
    categoryLabel: "Tentang Scalebiz",
    priority: 13,
    question: "Apakah Scalebiz menerima bisnis kecil dan UMKM?",
    answer:
      "Ya. Solusi dapat disesuaikan dengan skala dan kebutuhan bisnis. Tidak semua bisnis membutuhkan sistem yang kompleks. Kami dapat memulai dari solusi sederhana dan mengembangkannya secara bertahap ketika kebutuhan bisnis meningkat.",
  },
  {
    id: "ai-integration",
    category: "services",
    categoryLabel: "Website & Sistem",
    priority: 14,
    question: "Apakah Scalebiz bisa mengintegrasikan AI?",
    answer:
      "Bisa, jika AI memang relevan dengan kebutuhan bisnis. AI dapat digunakan untuk membantu customer support, klasifikasi data, knowledge base, content assistance, administrasi, atau workflow tertentu. Penggunaannya disesuaikan dengan proses bisnis, bukan sekadar sebagai gimmick.",
  },
  {
    id: "domain-hosting-ownership",
    category: "ownership",
    categoryLabel: "Kepemilikan & Dukungan",
    priority: 15,
    question: "Apakah domain dan hosting menjadi milik saya?",
    answer:
      "Untuk proyek website, domain dan hosting dapat menggunakan akun milik klien sehingga kepemilikan dan akses tetap berada pada pihak klien. Scalebiz dapat membantu proses setup dan konfigurasi jika diperlukan.",
  },
  {
    id: "diagnosis-guidance",
    category: "services",
    categoryLabel: "Website & Sistem",
    priority: 16,
    question: "Saya belum tahu website atau sistem apa yang saya butuhkan. Harus mulai dari mana?",
    answer:
      "Anda tidak harus mengetahui solusi teknisnya terlebih dahulu. Ceritakan bisnis, kendala, dan tujuan Anda. Scalebiz dapat membantu memetakan kebutuhan tersebut dan menentukan solusi yang paling relevan.",
    cta: {
      label: "Mulai Business Diagnosis →",
      href: "#diagnosa-sistem",
      isExternal: false,
    },
  },
];
