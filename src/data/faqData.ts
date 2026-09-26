import { FaqCategory, FaqItem } from "@/types/faq";
import { Language } from "@/types/i18n";

export const FAQ_CATEGORIES_ID: FaqCategory[] = [
  { id: "all", label: "Semua" },
  { id: "about", label: "Tentang Scalebiz" },
  { id: "process", label: "Proses & Biaya" },
  { id: "services", label: "Website & Sistem" },
  { id: "ownership", label: "Kepemilikan & Dukungan" },
];

export const FAQ_CATEGORIES_EN: FaqCategory[] = [
  { id: "all", label: "All" },
  { id: "about", label: "About Scalebiz" },
  { id: "process", label: "Process & Pricing" },
  { id: "services", label: "Web & Systems" },
  { id: "ownership", label: "Ownership & Support" },
];

export const FAQ_ITEMS_ID: FaqItem[] = [
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

export const FAQ_ITEMS_EN: FaqItem[] = [
  {
    id: "services-overview",
    category: "about",
    categoryLabel: "About Scalebiz",
    priority: 1,
    question: "What services does Scalebiz provide?",
    answer:
      "Scalebiz engineers bespoke digital solutions tailored to your operational workflows, spanning high-converting websites, corporate company profiles, custom business systems, interactive dashboards, workflow automation, and AI integrations.",
  },
  {
    id: "more-than-website",
    category: "about",
    categoryLabel: "About Scalebiz",
    priority: 2,
    question: "Does Scalebiz only build websites?",
    answer:
      "No. Websites are just one pillar of Scalebiz. For more sophisticated operations, we develop internal business systems, operational dashboards, databases, workflow automation, and multi-tool integrations. Solutions are customized to your exact requirements, never forced into a generic package.",
  },
  {
    id: "pricing-cost",
    category: "process",
    categoryLabel: "Process & Pricing",
    priority: 3,
    question: "How much does a custom website or system cost?",
    answer:
      "Pricing depends on the system type, feature complexity, third-party integrations, and bespoke business requirements. For standard projects, fixed quotes are provided based on deliverables. For custom systems, we review your operational workflow first before providing a transparent proposal.",
    cta: {
      label: "Consult on your project requirements →",
      href: "https://wa.me/6281527080656?text=Hello%20Scalebiz,%20I%20would%20like%20to%20consult%20on%20pricing%20estimates%20for%20my%20project.",
      isExternal: true,
    },
  },
  {
    id: "work-process",
    category: "process",
    categoryLabel: "Process & Pricing",
    priority: 4,
    question: "What is the project development process at Scalebiz?",
    answer:
      "Our workflow begins with in-depth discovery and business requirements analysis, followed by architecture scoping and proposal, iterative development, collaborative review, and production deployment. Ongoing support and evolution are available as your business scales.",
    processSteps: [
      { number: "01", title: "Discovery", desc: "Discuss needs & business goals" },
      { number: "02", title: "Analysis", desc: "Map workflows & architecture" },
      { number: "03", title: "Proposal", desc: "Scope of work, timeline & fixed quote" },
      { number: "04", title: "Development", desc: "System engineering & implementation" },
      { number: "05", title: "Review", desc: "Collaborative testing & fine-tuning" },
      { number: "06", title: "Launch", desc: "Live deployment to production" },
      { number: "07", title: "Support", desc: "Monitoring & ongoing evolution" },
    ],
  },
  {
    id: "duration-timeline",
    category: "process",
    categoryLabel: "Process & Pricing",
    priority: 5,
    question: "How long does it take to develop a website or system?",
    answer:
      "Timeline depends on project scope. A streamlined landing page can be deployed within days, whereas corporate platforms, custom booking engines, or full ERPs require a structured timeline. Firm delivery dates are finalized after defining the project scope.",
  },
  {
    id: "custom-features",
    category: "process",
    categoryLabel: "Process & Pricing",
    priority: 6,
    question: "Can I request custom features and modules?",
    answer:
      "Yes. Scalebiz engineers bespoke features tailored to your operational needs whenever technically feasible. Examples include custom booking systems, CRM, inventory tracking, client portals, automated quotation engines, WhatsApp APIs, and reporting dashboards.",
  },
  {
    id: "non-technical-clients",
    category: "about",
    categoryLabel: "About Scalebiz",
    priority: 7,
    question: "I don't have a technical background. Can I still work with Scalebiz?",
    answer:
      "Absolutely. You don't need any coding or technical jargon. Simply describe your business model, current bottlenecks, and goals. Scalebiz translates your vision into an intuitive, user-friendly digital system.",
  },
  {
    id: "whatsapp-integration",
    category: "services",
    categoryLabel: "Web & Systems",
    priority: 8,
    question: "Can the website and system integrate with WhatsApp?",
    answer:
      "Yes. We integrate WhatsApp for direct sales inquiries, booking notifications, lead capture, order status alerts, and automated customer routing. Complex automation workflows can be structured via the official WhatsApp Business API.",
  },
  {
    id: "internal-business-system",
    category: "services",
    categoryLabel: "Web & Systems",
    priority: 9,
    question: "Can Scalebiz build internal business operations systems?",
    answer:
      "Yes. We engineer customized internal platforms including executive dashboards, inventory controls, customer databases, field tracking, invoicing engines, employee attendance, and workflow automation.",
  },
  {
    id: "maintenance-support",
    category: "ownership",
    categoryLabel: "Ownership & Support",
    priority: 10,
    question: "Is ongoing maintenance provided after launch?",
    answer:
      "Yes. Scalebiz provides post-launch maintenance, performance monitoring, security patches, feature iterations, and technical assistance tailored to your business needs.",
  },
  {
    id: "access-ownership",
    category: "ownership",
    categoryLabel: "Ownership & Support",
    priority: 11,
    question: "Do I get full ownership and access after project completion?",
    answer:
      "Yes. All system deliverables, credentials, and source files belonging to your business scope are handed over upon completion. Full administrative access is provided.",
  },
  {
    id: "revision-policy",
    category: "ownership",
    categoryLabel: "Ownership & Support",
    priority: 12,
    question: "What is the revision policy?",
    answer:
      "Yes, structured revisions are included based on the agreed project scope. Feedback is gathered during designated review milestones to ensure adjustments are implemented without derailing the launch timeline.",
  },
  {
    id: "umkm-friendly",
    category: "about",
    categoryLabel: "About Scalebiz",
    priority: 13,
    question: "Does Scalebiz work with small businesses and growing enterprises?",
    answer:
      "Yes. Our digital architecture scales with your business stage. We frequently start with lean, high-impact modules and expand the system incrementally as transaction volume grows.",
  },
  {
    id: "ai-integration",
    category: "services",
    categoryLabel: "Web & Systems",
    priority: 14,
    question: "Can Scalebiz integrate Artificial Intelligence (AI)?",
    answer:
      "Yes, when AI provides measurable business value. We deploy AI for customer inquiry routing, data classification, internal knowledge retrieval, and automated document ingestion—practical intelligence, not mere gimmicks.",
  },
  {
    id: "domain-hosting-ownership",
    category: "ownership",
    categoryLabel: "Ownership & Support",
    priority: 15,
    question: "Will domain and cloud hosting belong directly to me?",
    answer:
      "Yes. Domains and cloud infrastructure can be provisioned under your own accounts, ensuring you retain 100% legal ownership and control. Scalebiz handles the technical setup and deployment.",
  },
  {
    id: "diagnosis-guidance",
    category: "services",
    categoryLabel: "Web & Systems",
    priority: 16,
    question: "I'm not sure which system my business needs yet. Where should I start?",
    answer:
      "You don't need to know the technical solution upfront. Tell us about your operational flow and bottlenecks. Scalebiz will audit your requirements and recommend the most effective architecture.",
    cta: {
      label: "Start Business Audit →",
      href: "#diagnosa-sistem",
      isExternal: false,
    },
  },
];

export function getFaqCategories(lang: Language): FaqCategory[] {
  return lang === "en" ? FAQ_CATEGORIES_EN : FAQ_CATEGORIES_ID;
}

export function getFaqItems(lang: Language): FaqItem[] {
  return lang === "en" ? FAQ_ITEMS_EN : FAQ_ITEMS_ID;
}

// Backward compatibility
export const FAQ_CATEGORIES = FAQ_CATEGORIES_ID;
export const FAQ_ITEMS = FAQ_ITEMS_ID;
