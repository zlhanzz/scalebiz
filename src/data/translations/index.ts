import { Language } from "@/types/i18n";

export interface Translations {
  nav: {
    tagline: string;
    services: string;
    portfolio: string;
    diagnosis: string;
    faq: string;
    consultWa: string;
    waMessage: string;
  };
  hero: {
    highlight: string;
    sub: string;
    workLabel: string;
    ctaMain: string;
    livePlatform: string;
    realApp: string;
    aiMentor: string;
  };
  pillars: {
    badge: string;
    mainTitle: string;
    subtitle: string;
    tagCustom: string;
    tagNoSub: string;
    capabilitiesLabel: string;
    p1Badge: string;
    p1Title: string;
    p1Tagline: string;
    p1Items: string[];
    p1Benefit: string;
    p2Badge: string;
    p2Title: string;
    p2Tagline: string;
    p2Items: string[];
    p2Benefit: string;
    p3Badge: string;
    p3Title: string;
    p3Tagline: string;
    p3Items: string[];
    p3Benefit: string;
    p4Badge: string;
    p4Title: string;
    p4Tagline: string;
    p4Items: string[];
    p4Benefit: string;
  };
  solutions: {
    badge: string;
    mainTitle: string;
    subtitle: string;
    timeHint: string;
    directoryToggle: string;
  };
  faq: {
    badge: string;
    mainHeading: string;
    subheading: string;
    searchPlaceholder: string;
    quickGuideTitle: string;
    quickGuideDesc: string;
    quickGuideBtn: string;
    categories: Record<string, string>;
  };
  footer: {
    studioDesc: string;
    copyright: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  id: {
    nav: {
      tagline: "Scale Up dan Optimalisasi Bisnis Kamu",
      services: "Layanan",
      portfolio: "Portofolio",
      diagnosis: "Diagnosa Bisnis",
      faq: "FAQ",
      consultWa: "Konsultasi WA",
      waMessage:
        "Halo Scalebiz, saya tertarik untuk konsultasi pembuatan website dan sistem bisnis saya.",
    },
    hero: {
      highlight: "Stop Membatasi Potensi Bisnismu!",
      sub: "dengan masih menggunakan sistem jadul",
      workLabel: "Hasil Kerja Kami:",
      ctaMain: "Tingkatkan Website dan Sistem Bisnis Saya Sekarang!",
      livePlatform: "Live Platform",
      realApp: "Aplikasi Riil",
      aiMentor: "AI Mentor",
    },
    pillars: {
      badge: "4 PILAR LAYANAN UTAMA",
      mainTitle: "Solusi Digital Kustom yang Dirancang Mengikuti Alur Bisnis Anda",
      subtitle:
        "Scalebiz tidak menjual software kaku atau template pasaran yang memaksa Anda mengubah cara kerja. Setiap sistem dibangun secara tailor-made sesuai skala usaha, SOP unik, dan kebutuhan operasional nyata Anda.",
      tagCustom: "100% Kustom Sesuai Alur Bisnis",
      tagNoSub: "Bebas Biaya Langganan Bulanan",
      capabilitiesLabel: "Cakupan Modul Kustom:",
      p1Badge: "Kredibilitas & Konversi",
      p1Title: "Website & Digital Presence",
      p1Tagline:
        "Aset digital resmi berkecepatan tinggi yang membangun reputasi korporat dan mengubah pengunjung menjadi prospek pembeli aktif.",
      p1Items: [
        "Company Profile Korporat B2B & Legalitas Tender",
        "High-Converting Landing Page Kampanye Iklan",
        "Katalog Produk Interaktif & Showroom Portofolio",
        "Direct WhatsApp Checkout & Formulir Inquiry Cepat",
      ],
      p1Benefit: "Loading < 1.5s, Mobile-First & SEO-Optimized",
      p2Badge: "Arus Kas & Anti-Fraud",
      p2Title: "POS Keuangan & Kasir",
      p2Tagline:
        "Kunci kebocoran kasir, kontrol transaksi harian multi-cabang, dan pastikan arus kas tercatat akurat secara real-time.",
      p2Items: [
        "Web POS Kasir Cepat",
        "Audit Tutup Shift Kasir & Rekonsiliasi Kas Fisik",
        "Cetak Struk Thermal/Bluetooth & QRIS Dinamis",
        "Rekap Laba Rugi Otomatis Dikirim ke WhatsApp Owner",
      ],
      p2Benefit: "Tanpa Biaya Sewa Bulanan (Milik Bisnis Sendiri)",
      p3Badge: "Kontrol Operasional & Stok",
      p3Title: "ERP & Operasional Bisnis",
      p3Tagline:
        "Satukan data gudang, logistik, pengeluaran lapangan, dan kinerja tim dalam satu dashboard kontrol terpusat sesuai SOP Anda.",
      p3Items: [
        "Manajemen Stok Multi-Gudang & Pelacakan Opname",
        "Kalkulasi HPP Otomatis & Pemotongan Resep Bahan Baku",
        "Tracking Timeline Proyek & Log Kerja Staf Lapangan",
        "Portal Karyawan, Presensi GPS & Rekap Penggajian",
      ],
      p3Benefit: "Disesuaikan 100% dengan Alur Kerja Nyata di Lapangan",
      p4Badge: "Otomasi 24/7 Tanpa Henti",
      p4Title: "Automation & Alur Kerja",
      p4Tagline:
        "Pangkas pekerjaan manual berulang hingga 80% dengan integrasi cerdas yang menghubungkan seluruh sistem bisnis Anda.",
      p4Items: [
        "WhatsApp Business API Gateway & Notifikasi Pesanan",
        "Pengingat Otomatis Tagihan & Invoice Jatuh Tempo",
        "Sinkronisasi Multi-Platform, Webhook & Cloud Data",
        "Bot Interaktif Kualifikasi Prospek & Layanan Pelanggan",
      ],
      p4Benefit: "Hemat Ratusan Jam Kerja Tim Operasional Tiap Bulan",
    },
    solutions: {
      badge: "KONSULTASI KEBUTUHAN SISTEM & WEB",
      mainTitle: "Website & Sistem Apa yang Cocok untuk Bisnis Saya?",
      subtitle:
        "Setiap bisnis memiliki alur kerja yang unik. Alih-alih mengeluarkan investasi untuk modul yang tidak terpakai atau terhambat oleh proses manual yang tidak efisien, luangkan 2 menit untuk menganalisis sistem yang paling relevan dengan skala usaha Anda.",
      timeHint: "Hanya butuh 1–2 menit • Langsung dapat rekomendasi konkret & draf solusi",
      directoryToggle:
        "Atau Ingin Mempelajari Seluruh 10 Jenis Website & Sistem Digital Bisnis? (Klik di Sini)",
    },
    faq: {
      badge: "FAQ",
      mainHeading: "Pertanyaan yang Sering Ditanyakan",
      subheading:
        "Masih ragu sebelum memulai? Berikut beberapa hal yang paling sering ditanyakan calon klien Scalebiz.",
      searchPlaceholder: "Cari pertanyaan... (cth: biaya, custom, sistem)",
      quickGuideTitle: "Belum Tahu Mulai dari Mana?",
      quickGuideDesc:
        "Ikuti panduan diagnosis bisnis 2 menit untuk menemukan jenis sistem digital yang tepat bagi skala usaha Anda.",
      quickGuideBtn: "Mulai Business Diagnosis",
      categories: {
        all: "Semua",
        about: "Tentang Scalebiz",
        process: "Proses & Biaya",
        services: "Website & Sistem",
        ownership: "Kepemilikan & Dukungan",
      },
    },
    footer: {
      studioDesc: "SCALEBIZ — Independent Web Development & Business Systems.",
      copyright: "© 2026 ScaleBiz • Solusi Digital & Otomasi Bisnis Indonesia",
    },
  },
  en: {
    nav: {
      tagline: "Scale Up and Optimize Your Business",
      services: "Services",
      portfolio: "Portfolio",
      diagnosis: "Business Audit",
      faq: "FAQ",
      consultWa: "Consult on WA",
      waMessage:
        "Hello Scalebiz, I'm interested in consulting on custom web development and business systems for my enterprise.",
    },
    hero: {
      highlight: "Stop Limiting Your Business Potential!",
      sub: "by relying on outdated legacy workflows",
      workLabel: "Our Selected Work:",
      ctaMain: "Upgrade My Website & Business Systems Now!",
      livePlatform: "Live Platform",
      realApp: "Live Enterprise App",
      aiMentor: "AI Intelligence",
    },
    pillars: {
      badge: "4 CORE SERVICE PILLARS",
      mainTitle: "Bespoke Digital Solutions Engineered to Fit Your Real Workflow",
      subtitle:
        "Scalebiz does not sell rigid templates or generic SaaS that forces you to change your workflow. Every solution is custom-built to match your scale, unique SOPs, and operational realities.",
      tagCustom: "100% Custom to Your Workflow",
      tagNoSub: "Zero Recurring Monthly SaaS Fees",
      capabilitiesLabel: "Custom Module Scope:",
      p1Badge: "Credibility & Conversion",
      p1Title: "Websites & Digital Presence",
      p1Tagline:
        "High-performance digital flagships that establish corporate authority and convert visitors into qualified active leads.",
      p1Items: [
        "B2B Corporate Company Profiles & Tender Compliance",
        "High-Converting Landing Pages for Paid Ad Campaigns",
        "Interactive Digital Product Catalogs & Portfolio Showrooms",
        "Direct WhatsApp Checkout & Rapid Client Inquiry Ingestion",
      ],
      p1Benefit: "Sub-1.5s Load Speed, Mobile-First & Fully SEO-Optimized",
      p2Badge: "Cash Flow & Anti-Fraud",
      p2Title: "POS & Financial Engineering",
      p2Tagline:
        "Eliminate cashier leakage, reconcile multi-branch daily transactions, and ensure accurate real-time cash flow records.",
      p2Items: [
        "High-Speed Web POS Cashier System",
        "Shift Closing Audits & Physical Cash Reconciliation",
        "Thermal/Bluetooth Receipt Printing & Dynamic QRIS/Cards",
        "Automated Profit & Loss Summaries Dispatched to Owner's Phone",
      ],
      p2Benefit: "Zero Monthly Rental Fees (100% Owned by Your Business)",
      p3Badge: "Operational Command & Inventory",
      p3Title: "ERP & Operations Control",
      p3Tagline:
        "Unify multi-warehouse inventories, logistics, field disbursements, and staff KPIs into a single centralized command center.",
      p3Items: [
        "Multi-Warehouse Inventory & Real-Time Stock Audits",
        "Automated COGS Calculation & Recipe-Based Raw Material Deduction",
        "Project Milestone Tracking & Field Crew Activity Logging",
        "Employee Self-Service Portal, GPS Attendance & Payroll Recap",
      ],
      p3Benefit: "Engineered 100% Around Your On-the-Ground Field Operations",
      p4Badge: "24/7 Autonomous Operations",
      p4Title: "Workflow Automation & Integrations",
      p4Tagline:
        "Cut redundant manual administrative work by up to 80% with intelligent integrations linking all your business platforms.",
      p4Items: [
        "WhatsApp Business API Gateway & Automated Order Dispatch",
        "Automated Invoice Reminders & Due-Date Payment Follow-ups",
        "Multi-Platform Synchronization, Webhooks & Secure Cloud Sync",
        "Interactive Lead Qualification Chatbots & Customer Routing",
      ],
      p4Benefit: "Save Hundreds of Operational Man-Hours Every Month",
    },
    solutions: {
      badge: "SYSTEM & DIGITAL ARCHITECTURE AUDIT",
      mainTitle: "Which Website & System Architecture Fits Your Business?",
      subtitle:
        "Every enterprise runs on unique operational dynamics. Instead of investing in bloated software with features you never use or staying hindered by manual friction, spend 2 minutes discovering the exact systems tailored to your growth stage.",
      timeHint: "Takes only 1–2 minutes • Get instant concrete architecture recommendations",
      directoryToggle:
        "Or Explore All 10 Types of Business Websites & Digital Systems (Click Here)",
    },
    faq: {
      badge: "FAQ",
      mainHeading: "Frequently Asked Questions",
      subheading:
        "Have questions before getting started? Here are clear answers to the most common questions from our clients.",
      searchPlaceholder: "Search questions... (e.g. pricing, custom, timeline)",
      quickGuideTitle: "Not Sure Where to Begin?",
      quickGuideDesc:
        "Take our 2-minute business audit to identify the exact digital systems engineered for your business scale.",
      quickGuideBtn: "Start Business Audit",
      categories: {
        all: "All",
        about: "About Scalebiz",
        process: "Process & Pricing",
        services: "Web & Systems",
        ownership: "Ownership & Support",
      },
    },
    footer: {
      studioDesc: "SCALEBIZ — Independent Web Development & Business Systems.",
      copyright: "© 2026 ScaleBiz • Enterprise Digital Solutions & Workflow Automation",
    },
  },
};
