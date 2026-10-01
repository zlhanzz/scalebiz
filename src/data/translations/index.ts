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
      tagline: "Scale Up And Grow Your Business",
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
      ctaMain: "Scale Up and Grow My Business!",
      livePlatform: "Live Platform",
      realApp: "Aplikasi Riil",
      aiMentor: "AI Mentor",
    },
    pillars: {
      badge: "BUKAN SEKADAR WEBSITE — INI MESIN OTOMASI BISNIS ANDA",
      mainTitle: "Berhenti Membuang Jam Berharga untuk Tugas Manual. Biarkan Sistem Bekerja 24/7.",
      subtitle:
        "Sebagian besar website hanya diam seperti brosur tanpa hasil. Kami menanamkan alur kerja otomatis ke dalam website Anda agar Anda tidak perlu lagi menjawab pertanyaan yang sama berulang kali, terbebas dari drama jadwal booking, dan mengubah pencari di Google menjadi pelanggan setia secara autopilot.",
      tagCustom: "Hemat 2–3 Jam Setiap Hari",
      tagNoSub: "Gratis Maintenance Selama Website Aktif",
      capabilitiesLabel: "Dampak Nyata bagi Kebebasan Waktu & Profit Anda:",
      p1Badge: "Bebas Pertanyaan Berulang & Google",
      p1Title: "Berhenti Menjawab Pertanyaan yang Sama Setiap Hari",
      p1Tagline:
        "Biarkan calon pelanggan menemukan info resmi Anda di Google, melihat harga secara transparan, dan mendapat jawaban instan tanpa harus bolak-balik chat atau menelepon Anda.",
      p1Items: [
        "Mudah Ditemukan di Google: Bisnis Anda muncul di pencarian lokal dengan reputasi & bukti nyata",
        "Bebas Capek Menjawab Pertanyaan Dasar: Jam buka, pricelist, dan menu terjawab tuntas sebelum mereka chat",
        "Kredibilitas Portofolio Instan: Foto hasil kerja meyakinkan mereka bahwa Anda bernilai sebelum tawar-menawar",
        "Hanya Meladeni Prospek Matang: Pelanggan yang chat WhatsApp sudah paham harga dan siap bayar",
      ],
      p1Benefit: "Hemat 2+ Jam Setiap Hari dari Menjelaskan Hal yang Sama",
      p2Badge: "Kalkulator Harga & Seleksi Prospek",
      p2Title: "Biarkan Pelanggan Menghitung Biaya Sendiri 24/7",
      p2Tagline:
        "Hentikan drama meladeni orang yang hanya tanya harga lalu menghilang (tire-kickers). Estimator interaktif menghitung perkiraan biaya realistis dan mengirimkan rincian proyek matang ke HP Anda.",
      p2Items: [
        "Kalkulasi Harga Mandiri: Pelanggan memilih ukuran, bahan, atau paket dan mendapat estimasi langsung di layar",
        "Otomatis Menyaring Pembeli Serius: Penanya iseng tereliminasi sendiri, menghemat energi Anda untuk klien bernilai tinggi",
        "Detail Kebutuhan Lengkap di Awal: Bangun tidur mendapati rincian ukuran, foto lokasi, dan catatan kerja sudah rapi",
        "Kirim Estimasi Instan via SMS/Email: Penawaran sampai ke tangan pelanggan saat minat belinya sedang di puncak",
      ],
      p2Benefit: "Hanya Bicara dengan Klien Serius yang Sudah Paham Harga Anda",
      p3Badge: "Booking Otomatis Bebas Repot",
      p3Title: "Tak Perlu Lagi Mencatat Jadwal Booking Manual",
      p3Tagline:
        "Singkirkan buku catatan manual dan kekacauan jadwal di WhatsApp. Slot janji temu terisi otomatis sepanjang waktu saat Anda fokus mengerjakan pekerjaan utama.",
      p3Items: [
        "Kalender Booking Mandiri 24/7: Pelanggan memilih slot jam kosong yang tersinkronisasi langsung dengan jadwal tim",
        "Nol Drama Jadwal Tabrakan: Sinkronisasi waktu riil mencegah double-booking dan kelelahan operasional",
        "Pengingat Otomatis Anti No-Show: Pesan pengingat otomatis memastikan pelanggan benar-benar hadir tepat waktu",
        "Kunci Uang Muka (DP) di Depan: Terima pembayaran DP atau otorisasi kartu dengan mudah agar waktu Anda terlindungi",
      ],
      p3Benefit: "Jadwal Terisi Sendiri & Pelanggan Pasti Datang Tepat Waktu",
      p4Badge: "Repeat Order & Database Pelanggan",
      p4Title: "Miliki Database Pelanggan & Dongkrak Repeat Order",
      p4Tagline:
        "Jangan biarkan pelanggan hilang begitu saja setelah satu kali transaksi. Simpan kontak di CRM pribadi, kirim promo kapan saja saat usaha sepi, dan bangun membership yang menghasilkan omzet berulang.",
      p4Items: [
        "Database Pelanggan Pribadi (CRM): Data nama, nomor WhatsApp, dan riwayat transaksi 100% milik Anda sendiri",
        "Kirim Promo Kapan Saja: Siarkan penawaran musiman atau diskon khusus via WhatsApp saat jadwal minggu ini sedang sepi",
        "Sistem Membership & Komunitas: Bangun program langganan atau poin loyalitas yang mengunci arus kas bulanan",
        "Email Marketing & Kampanye Promo: Gunakan data pelanggan untuk broadcast promo dan email marketing demi repeat order dan loyalitas brand",
      ],
      p4Benefit: "Ubah Pembeli Satu Kali Jadi Pelanggan Setia Seumur Hidup",
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
        ownership: "Langganan & Maintenance",
      },
    },
    footer: {
      studioDesc: "SCALEBIZ — Independent Web Development & Business Systems.",
      copyright: "© 2026 ScaleBiz • Solusi Digital & Otomasi Bisnis Indonesia",
    },
  },
  en: {
    nav: {
      tagline: "Scale Up And Grow Your Business",
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
      ctaMain: "Scale Up and Grow My Business!",
      livePlatform: "Live Platform",
      realApp: "Live Enterprise App",
      aiMentor: "AI Intelligence",
    },
    pillars: {
      badge: "NOT JUST A WEBSITE — YOUR 24/7 AUTOMATED BUSINESS ENGINE",
      mainTitle: "Stop Wasting Hours on Manual Tasks. Let Your System Work for You.",
      subtitle:
        "Most websites just sit there like a digital flyer doing nothing. We embed smart automated workflows directly into your site so you stop answering the same questions every day, eliminate booking chaos, and turn everyday Google searchers into loyal, paying customers on autopilot.",
      tagCustom: "Saves You 2–3 Hours Every Day",
      tagNoSub: "Free Maintenance While Website Active",
      capabilitiesLabel: "How This Frees Up Your Time & Drives Revenue:",
      p1Badge: "Inquiry Relief & Search",
      p1Title: "Stop Answering the Same Questions Manually Every Day",
      p1Tagline:
        "Let customers easily find your verified info on Google, see transparent pricing upfront, and get their questions answered 24/7 without constantly calling or texting you.",
      p1Items: [
        "Effortless Google Discovery: Show up front and center with undeniable proof when locals search for your services",
        "Zero Inquiry Fatigue: Hours, pricing guidelines, and service menus are clearly answered before anyone messages you",
        "Instant Visual Credibility: Showcase high-resolution past projects so clients understand your quality before asking for discounts",
        "High-Intent Connection: Customers who reach out to your WhatsApp or phone are already educated, excited, and ready to buy",
      ],
      p1Benefit: "Saves You 2+ Hours Daily on Repetitive Explanations",
      p2Badge: "Instant Quoting & Filtering",
      p2Title: "Let Customers Quote Themselves While You Sleep",
      p2Tagline:
        "Stop playing endless phone tag with price-shoppers who ghost. An interactive estimator calculates realistic costs 24/7 and delivers qualified job scopes straight to your phone.",
      p2Items: [
        "Instant Self-Service Estimates: Clients configure dimensions, materials, or packages and get realistic pricing on the spot",
        "Filter Out Tire-Kickers Automatically: Unserious bargain-hunters drop off on their own, protecting your valuable time for paying clients",
        "Complete Project Details Upfront: Wake up to qualified inquiries with measurements, job photos, and site notes already organized",
        "Immediate SMS & Email Delivery: Quotes reach prospects in seconds while their buying interest is at its absolute highest",
      ],
      p2Benefit: "Only Talk to Serious Clients Who Already Know Your Pricing",
      p3Badge: "Hands-Free Scheduling",
      p3Title: "Never Take Bookings by Hand Again",
      p3Tagline:
        "Throw away the paper notebook and stop the back-and-forth WhatsApp scheduling chaos. Your appointment slots fill themselves around the clock while you focus on actual work.",
      p3Items: [
        "24/7 Self-Service Calendar: Clients pick open time slots directly synced with your team's live availability and buffer times",
        "Zero Double-Booking Drama: Automated calendar synchronization completely eliminates overlapping jobs and scheduling stress",
        "Automated Anti-No-Show Reminders: Friendly text and email reminders ensure clients actually show up on time and prepared",
        "Lock In Deposits Upfront: Collect booking deposits or card authorizations seamlessly so last-minute cancellations never cost you money",
      ],
      p3Benefit: "Your Calendar Fills Itself & Clients Actually Show Up",
      p4Badge: "Repeat Orders & CRM",
      p4Title: "Own Your Customer Data & Drive Repeat Orders",
      p4Tagline:
        "Don't let past customers vanish after a single visit. Store every contact in your own private CRM, broadcast promo offers anytime business is slow, and build memberships that bring predictable revenue.",
      p4Items: [
        "Centralized Customer CRM: Keep customer names, phone numbers, and job history in a private database that belongs 100% to you",
        "Broadcast Promos Whenever You Need Work: Send targeted seasonal offers, flash openings, or VIP discounts whenever your week is quiet",
        "Membership & Community Systems: Create recurring revenue with VIP club passes, maintenance packages, or subscription perks",
        "Email Marketing & Promo Campaigns: Leverage your customer data for targeted promo campaigns and email marketing to drive repeat orders and brand loyalty",
      ],
      p4Benefit: "Turn One-Time Walk-Ins into Lifetime Repeat Revenue",
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
        ownership: "Subscription & Maintenance",
      },
    },
    footer: {
      studioDesc: "SCALEBIZ — Independent Web Development & Business Systems.",
      copyright: "© 2026 ScaleBiz • Enterprise Digital Solutions & Workflow Automation",
    },
  },
};
