"use client";

import React, { useState } from "react";
import DiagnosisWizard from "./diagnosis/DiagnosisWizard";

// 10 Direktori Referensi Lengkap (On-Demand Reference)
interface DirectoryItem {
  id: string;
  category: "marketing" | "commerce" | "operations";
  categoryBadge: string;
  categoryColor: string;
  title: string;
  tagline: string;
  suitableFor: string;
  painSolved: string;
  keyBenefits: string[];
}

const COMPLETE_DIRECTORY: DirectoryItem[] = [
  {
    id: "landing-page",
    category: "marketing",
    categoryBadge: "Marketing & Ads",
    categoryColor: "#e11d48",
    title: "1. Landing Page (Direct Response & Iklan)",
    tagline: "Satu halaman terfokus tanpa distraksi navigasi untuk melipatgandakan konversi iklan berbayar.",
    suitableFor: "Peluncuran produk/jasa baru, promo musiman, pre-order, pendaftaran event, kampanye Meta/Google Ads.",
    painSolved: "Biaya iklan berbayar kurang efektif karena diarahkan ke landing page yang terlalu umum, sehingga calon prospek langsung meninggalkan halaman tanpa konversi.",
    keyBenefits: [
      "Struktur penawaran persuasif berorientasi aksi langsung (CTA).",
      "Kecepatan muat kilat (< 1.5 detik) agar tidak kehilangan calon prospek.",
      "Tombol WhatsApp Checkout otomatis dengan format pesan pesanan rapi.",
    ],
  },
  {
    id: "company-profile",
    category: "marketing",
    categoryBadge: "Kredibilitas B2B",
    categoryColor: "#38bdf8",
    title: "2. Company Profile (Korporat & Tender B2B)",
    tagline: "Identitas digital resmi untuk memenangkan tender, kemitraan, dan kepercayaan korporat.",
    suitableFor: "Perusahaan B2B, kontraktor sipil/MEP, konsultan bisnis/hukum, pabrik manufaktur, distributor resmi.",
    painSolved: "Klien korporat ragu dan mengira bisnis fiktif; gugur saat tahap seleksi administrasi/due diligence tender.",
    keyBenefits: [
      "Penyajian legalitas lengkap (NIB, sertifikasi ISO, dokumen resmi).",
      "Katalog rekam jejak portofolio proyek dan profil struktur tim.",
      "Fitur unduh Company Profile PDF resmi dan formulir inquiry tender.",
    ],
  },
  {
    id: "product-catalog",
    category: "marketing",
    categoryBadge: "Showcase Grosir",
    categoryColor: "#f59e0b",
    title: "3. Katalog Produk Digital (Showcase Grosir & B2B)",
    tagline: "Showcase ribuan item barang lengkap dengan lembar spesifikasi teknis tanpa sistem rumit.",
    suitableFor: "Distributor alat berat/mesin, toko material bangunan, produsen mebel, suplier Horeca, industri bahan kimia.",
    painSolved: "Biaya cetak katalog fisik bernilai tinggi yang cepat usang; tim penjualan harus mengirimkan puluhan foto produk secara manual di WhatsApp.",
    keyBenefits: [
      "Pencarian cepat berbasis kode SKU, merek, dan filter kategori spesifik.",
      "Lembar spesifikasi teknis (TDS) yang selalu up-to-date setiap saat.",
      "Tombol 'Minta Penawaran Harga / RFQ' otomatis ke WhatsApp staf sales.",
    ],
  },
  {
    id: "ecommerce-store",
    category: "commerce",
    categoryBadge: "D2C & Retail",
    categoryColor: "#10b981",
    title: "4. Toko Online / E-Commerce Mandiri",
    tagline: "Toko online milik sendiri dengan margin utuh 100% dan pembayaran otomatis 24 jam.",
    suitableFor: "Brand fashion/apparel, produk skincare/kosmetik, makanan kemasan/frozen food, toko retail gadget.",
    painSolved: "Margin keuntungan terpotong komisi tinggi marketplace (6%–10%); risiko perang harga dan ketergantungan database.",
    keyBenefits: [
      "Pembayaran otomatis via QRIS, Virtual Account, & Kartu Kredit tanpa cek manual.",
      "Integrasi hitung ongkos kirim real-time (JNE, J&T, SiCepat, Gosend/Grab).",
      "Database pelanggan (nama, nomor HP, email) menjadi aset mandiri perusahaan.",
    ],
  },
  {
    id: "booking-system",
    category: "commerce",
    categoryBadge: "Otomasi Reservasi",
    categoryColor: "#8b5cf6",
    title: "5. Website Booking & Reservasi Terjadwal",
    tagline: "Sistem otomasi jadwal reservasi mandiri untuk memangkas antrean dan kekacauan kalender.",
    suitableFor: "Hotel/villa/resort butik, rental mobil & alat berat, klinik spesialis/estetika, salon, studio foto, konsultan.",
    painSolved: "Jadwal bentrok (double booking), pelanggan lupa datang (no-show), dan waktu staf habis di buku agenda manual.",
    keyBenefits: [
      "Kalender interaktif ketersediaan slot jam dan unit secara real-time.",
      "Kunci reservasi dengan pembayaran DP/lunas otomatis di awal.",
      "Pengingat jadwal otomatis via WhatsApp sebelum sesi dimulai.",
    ],
  },
  {
    id: "niche-directory",
    category: "commerce",
    categoryBadge: "Platform Listing",
    categoryColor: "#06b6d4",
    title: "6. Web Portal Direktori & Listing Niche",
    tagline: "Platform pencarian unit terverifikasi untuk menguasai ekosistem sewa atau direktori lokal.",
    suitableFor: "Jaringan pengelola kost/apartemen, agen properti daerah, portal lowongan kerja lokal, direktori wisata kota.",
    painSolved: "Calon penyewa kesulitan memfilter kamar sesuai budget; bisnis bergantung pada calo offline berkolega komisi besar.",
    keyBenefits: [
      "Multi-parameter filter (radius lokasi, harga, ketersediaan fasilitas).",
      "Galeri foto resolusi tinggi, video tur, dan verifikasi status unit.",
      "Koneksi langsung antara pencari dan pengelola unit via WhatsApp terstruktur.",
    ],
  },
  {
    id: "lms-membership",
    category: "commerce",
    categoryBadge: "Edukasi & Paywall",
    categoryColor: "#ec4899",
    title: "7. LMS & Portal Edukasi / Membership",
    tagline: "Monetisasi materi video dan keahlian secara berulang dengan proteksi akses anti-bocor.",
    suitableFor: "Lembaga bimbel, instruktur kursus online (coding, bisnis, desain), asosiasi profesi, kreator edukasi berbayar.",
    painSolved: "Materi video dan modul mudah dibajak atau disebarkan gratis melalui link Google Drive ilegal.",
    keyBenefits: [
      "Akses video materi terlindungi dengan sistem membership & paywall.",
      "Kuis/tugas online interaktif dan penerbitan sertifikat digital ber-barcode.",
      "Pendapatan berulang (recurring subscription) atau sekali beli selamanya.",
    ],
  },
  {
    id: "custom-erp",
    category: "operations",
    categoryBadge: "Core Business Engine",
    categoryColor: "#10b981",
    title: "8. Sistem Web ERP Bisnis Kustom",
    tagline: "Kunci kebocoran kas dan stok gudang dengan pencatatan operasional lapangan dari HP.",
    suitableFor: "Agribisnis/perkebunan multi-lahan, workshop manufaktur, distributor grosir multi-gudang, kontraktor proyek.",
    painSolved: "Kebocoran operasional: nota fisik tercecer, selisih stok gudang sulit dilacak, dan margin keuntungan bersih tidak terpantau secara transparan.",
    keyBenefits: [
      "Pencatatan pengeluaran lapangan langsung dari HP staf lengkap dengan foto nota fisik.",
      "Kalkulasi HPP otomatis dan laporan laba rugi real-time tanpa tunggu akhir bulan.",
      "Hak akses berjenjang (Role-based: staf lapangan, gudang, kasir, manager, owner).",
    ],
  },
  {
    id: "client-portal",
    category: "operations",
    categoryBadge: "Retensi Klien & AI",
    categoryColor: "#38bdf8",
    title: "9. Client Portal & Dashboard Analitik / AI",
    tagline: "Ruang kerja transparan bagi klien sekaligus dashboard pengambilan keputusan cerdas.",
    suitableFor: "Agensi marketing/kreatif (retainer), konsultan pajak/keuangan, firma hukum, koperasi/fintech, pengelola aset.",
    painSolved: "Klien terus menanyakan progres berkala via WhatsApp; pelaporan manual yang tidak terstruktur memicu komplain keterlambatan.",
    keyBenefits: [
      "Portal login mandiri bagi klien untuk cek progres pekerjaan & unduh tagihan 24/7.",
      "Visualisasi grafik interaktif metrik kunci (arus kas, efisiensi tim, retensi).",
      "Meningkatkan perceived value sehingga perusahaan dapat menetapkan tarif jasa premium.",
    ],
  },
  {
    id: "web-pos",
    category: "operations",
    categoryBadge: "Kasir Multi-Outlet",
    categoryColor: "#f97316",
    title: "10. Web POS & Kasir Multi-Cabang",
    tagline: "Kontrol penjualan dan stok bahan baku di semua cabang toko langsung dari rumah.",
    suitableFor: "Jaringan kafe/resto, toko ritel pakaian, apotek, franchise kuliner, laundry multi-outlet.",
    painSolved: "Manipulasi kasir saat owner tidak ada di lokasi, selisih bahan baku di akhir shift, dan kesulitan rekap omset harian.",
    keyBenefits: [
      "Kasir kas/QRIS cepat, cetak struk thermal, & integrasi laci kas otomatis.",
      "Pemotongan stok bahan baku otomatis berbasis resep setiap transaksi berhasil.",
      "Laporan omset harian otomatis dikirim ke WhatsApp owner saat closing shift.",
    ],
  },
];

const COMPLETE_DIRECTORY_EN: DirectoryItem[] = [
  {
    id: "landing-page",
    category: "marketing",
    categoryBadge: "Marketing & Ads",
    categoryColor: "#e11d48",
    title: "1. Landing Page (Direct Response & Ads)",
    tagline: "Distraction-free single page designed to maximize conversions on paid ad traffic.",
    suitableFor: "New product/service launches, seasonal promos, pre-orders, lead acquisition, Meta/Google ads.",
    painSolved: "High ad spend wasted because traffic lands on generic homepages without a clear call-to-action.",
    keyBenefits: [
      "Persuasive, action-oriented direct response structure (CTA).",
      "Sub-1.5 second loading speed to retain inbound prospective clients.",
      "One-tap WhatsApp checkout with formatted order details.",
    ],
  },
  {
    id: "company-profile",
    category: "marketing",
    categoryBadge: "B2B Credibility",
    categoryColor: "#38bdf8",
    title: "2. Company Profile (Corporate & B2B Tenders)",
    tagline: "Authoritative digital headquarters to win B2B tenders, joint ventures, and enterprise trust.",
    suitableFor: "B2B vendors, civil/MEP contractors, consulting firms, manufacturing facilities, authorized distributors.",
    painSolved: "Corporate prospects suspect illegitimate operations and drop candidates during tender due diligence.",
    keyBenefits: [
      "Comprehensive legality showcase (certifications, ISO, licensing).",
      "Verified track-record portfolio and leadership structure.",
      "Official PDF company profile download & structured tender inquiry form.",
    ],
  },
  {
    id: "product-catalog",
    category: "marketing",
    categoryBadge: "Wholesale Showcase",
    categoryColor: "#f59e0b",
    title: "3. Digital Product Catalog (Wholesale & B2B)",
    tagline: "Showcase thousands of SKUs complete with technical spec sheets without complicated cart overhead.",
    suitableFor: "Heavy machinery distributors, construction suppliers, furniture manufacturers, Horeca suppliers.",
    painSolved: "High cost of printing physical catalogs that go out of date; sales reps manually forwarding dozens of photos on WhatsApp.",
    keyBenefits: [
      "Instant search by SKU, brand, and granular technical specifications.",
      "Always up-to-date technical data sheets (TDS) downloadable in 1 click.",
      "Automated 'Request for Quote (RFQ)' direct to assigned sales rep.",
    ],
  },
  {
    id: "ecommerce-store",
    category: "commerce",
    categoryBadge: "D2C & Retail",
    categoryColor: "#10b981",
    title: "4. Independent E-Commerce Store",
    tagline: "Self-owned online store with 100% margin retention and 24/7 automated checkout.",
    suitableFor: "Fashion/apparel brands, skincare/cosmetics, packaged goods, consumer electronics.",
    painSolved: "Profit margins cut by 6%–10% marketplace fees; constant price wars and lack of customer database ownership.",
    keyBenefits: [
      "Automated payments via QRIS, Virtual Account & Credit Cards.",
      "Real-time automated shipping rate calculator (local & international couriers).",
      "Direct ownership of customer database (name, mobile, email) as company asset.",
    ],
  },
  {
    id: "booking-system",
    category: "commerce",
    categoryBadge: "Booking Automation",
    categoryColor: "#8b5cf6",
    title: "5. Scheduled Booking & Appointment Engine",
    tagline: "Self-service calendar reservation system to eliminate booking conflicts and administrative chaos.",
    suitableFor: "Boutique hotels & villas, car/equipment rental, aesthetic clinics, studios, specialized consultants.",
    painSolved: "Double-booking errors, customer no-shows, and staff hours consumed maintaining manual paper diaries.",
    keyBenefits: [
      "Real-time availability calendar for timeslots and room/vehicle units.",
      "Lock reservations with automated upfront deposits or full payments.",
      "Automated WhatsApp schedule reminders sent prior to appointments.",
    ],
  },
  {
    id: "niche-directory",
    category: "commerce",
    categoryBadge: "Listing Platform",
    categoryColor: "#06b6d4",
    title: "6. Niche Directory & Verified Listing Portal",
    tagline: "Verified property or niche directory platform to dominate localized search ecosystems.",
    suitableFor: "Serviced apartment networks, regional real estate agencies, local job boards, city guides.",
    painSolved: "Tenants struggle to filter listings by budget; owners depend on informal brokers charging high commissions.",
    keyBenefits: [
      "Multi-parameter filters (location radius, price, available amenities).",
      "High-resolution photo galleries, video walkthroughs, and verified badge status.",
      "Direct contact pipeline between seekers and property managers via structured WhatsApp.",
    ],
  },
  {
    id: "lms-membership",
    category: "commerce",
    categoryBadge: "Education & Paywall",
    categoryColor: "#ec4899",
    title: "7. LMS & Educational Membership Platform",
    tagline: "Monetize video courses and intellectual property with leak-proof paywalled access.",
    suitableFor: "Tutoring institutes, online course creators (coding, finance, design), professional associations.",
    painSolved: "Video lessons and modules easily pirated or shared freely via unauthorized Google Drive links.",
    keyBenefits: [
      "Protected video streaming with recurring membership paywall.",
      "Interactive quizzes and barcoded digital certificate generation.",
      "Support for recurring subscriptions or one-time lifetime access passes.",
    ],
  },
  {
    id: "custom-erp",
    category: "operations",
    categoryBadge: "Core Business Engine",
    categoryColor: "#10b981",
    title: "8. Custom Enterprise ERP System",
    tagline: "Plug financial and inventory leakages with mobile-first operational logging directly from the field.",
    suitableFor: "Multi-site agribusiness, manufacturing workshops, wholesale distributors with multiple warehouses, contractors.",
    painSolved: "Operational leakage: misplaced paper receipts, warehouse discrepancies, and zero visibility into net profit margins.",
    keyBenefits: [
      "Field expense logging directly from staff smartphones with receipt photo uploads.",
      "Automated real-time COGS and P&L statements without waiting for month-end.",
      "Granular role-based access controls (field staff, warehouse, cashier, manager, owner).",
    ],
  },
  {
    id: "client-portal",
    category: "operations",
    categoryBadge: "Client Retention & AI",
    categoryColor: "#38bdf8",
    title: "9. Client Portal & Analytics / AI Dashboard",
    tagline: "Transparent collaborative workspace for retained clients and executive decision-making.",
    suitableFor: "Retainer marketing agencies, financial & tax advisors, law firms, wealth management, asset operators.",
    painSolved: "Clients constantly asking for updates on WhatsApp; unstructured manual reporting causes friction and churn.",
    keyBenefits: [
      "Self-service 24/7 client dashboard for milestones, asset files & invoices.",
      "Interactive metric graphs (cash flow, team output, customer retention).",
      "Drastically increases perceived agency value, supporting premium retainers.",
    ],
  },
  {
    id: "web-pos",
    category: "operations",
    categoryBadge: "Multi-Branch Cashier",
    categoryColor: "#f97316",
    title: "10. Web POS & Multi-Branch Cashier",
    tagline: "Full real-time sales and ingredient inventory oversight across all branches from anywhere.",
    suitableFor: "Restaurant & cafe chains, apparel boutiques, pharmacies, franchise concepts, multi-branch laundry.",
    painSolved: "Cash register tampering when owner is offsite, inventory discrepancies at shift change, and tedious daily reconciliations.",
    keyBenefits: [
      "Fast cash/QRIS cashier checkout, thermal printing, and automatic drawer kick.",
      "Recipe-based automatic raw ingredient deduction per order.",
      "Daily turnover report automatically dispatched to owner's WhatsApp at shift close.",
    ],
  },
];

import { useLanguage } from "@/context/LanguageContext";
import { TRANSLATIONS } from "@/data/translations";

export default function BusinessSolutions() {
  const [showAllDirectory, setShowAllDirectory] = useState<boolean>(false);
  const [directoryFilter, setDirectoryFilter] = useState<"all" | "marketing" | "commerce" | "operations">("all");
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang].solutions;

  const directoryList = lang === "en" ? COMPLETE_DIRECTORY_EN : COMPLETE_DIRECTORY;
  const filteredDirectory = directoryList.filter((item) => {
    if (directoryFilter === "all") return true;
    return item.category === directoryFilter;
  });

  return (
    <section className="solutions-section section-padding" id="diagnosa-sistem">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="solutions-eyebrow-badge">
            <span className="eyebrow-dot" />
            <span>{t.badge}</span>
          </div>

          <h2 className="section-title solutions-main-title">
            {t.mainTitle}
          </h2>

          <p className="section-desc solutions-subtitle">
            {t.subtitle}
          </p>

          <div className="solutions-time-hint-pill">
            <span className="hint-clock-icon">⏱️</span>
            <span>{t.timeHint}</span>
          </div>
        </div>

        {/* Interactive Progressive Multi-Step Diagnostic Wizard */}
        <DiagnosisWizard />

        {/* Expandable 10 Directory Drawer (On-Demand Educational Reference) */}
        <div className="directory-toggle-wrapper">
          <button
            type="button"
            className="btn-toggle-directory"
            onClick={() => setShowAllDirectory(!showAllDirectory)}
            aria-expanded={showAllDirectory}
          >
            <span>
              {showAllDirectory
                ? (lang === "en" ? "Hide 10 Digital Systems Directory" : "Sembunyikan Direktori 10 Jenis Website & Sistem")
                : t.directoryToggle}
            </span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: showAllDirectory ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        {showAllDirectory && (
          <div className="full-directory-drawer">
            <div className="directory-filter-row">
              <span className="directory-filter-label">
                {lang === "en" ? "Filter Category:" : "Filter Kategori:"}
              </span>
              <div className="directory-filter-buttons">
                <button
                  type="button"
                  className={`dir-filter-btn ${directoryFilter === "all" ? "active" : ""}`}
                  onClick={() => setDirectoryFilter("all")}
                >
                  {lang === "en" ? "All (10)" : "Semua (10)"}
                </button>
                <button
                  type="button"
                  className={`dir-filter-btn ${directoryFilter === "marketing" ? "active" : ""}`}
                  onClick={() => setDirectoryFilter("marketing")}
                >
                  {lang === "en" ? "Marketing & Credibility (3)" : "Pemasaran & Kredibilitas (3)"}
                </button>
                <button
                  type="button"
                  className={`dir-filter-btn ${directoryFilter === "commerce" ? "active" : ""}`}
                  onClick={() => setDirectoryFilter("commerce")}
                >
                  {lang === "en" ? "Sales & Commerce (4)" : "Penjualan & Transaksi (4)"}
                </button>
                <button
                  type="button"
                  className={`dir-filter-btn ${directoryFilter === "operations" ? "active" : ""}`}
                  onClick={() => setDirectoryFilter("operations")}
                >
                  {lang === "en" ? "ERP & Operations (3)" : "Sistem ERP & Operasional (3)"}
                </button>
              </div>
            </div>

            <div className="directory-grid">
              {filteredDirectory.map((item) => (
                <div key={item.id} className="directory-item-card">
                  <div className="dir-item-header">
                    <span
                      className="dir-badge"
                      style={{
                        color: item.categoryColor,
                        backgroundColor: `${item.categoryColor}15`,
                        borderColor: `${item.categoryColor}40`,
                      }}
                    >
                      {item.categoryBadge}
                    </span>
                    <h4 className="dir-item-title">{item.title}</h4>
                    <p className="dir-item-tagline">{item.tagline}</p>
                  </div>

                  <div className="dir-item-body">
                    <div className="dir-block">
                      <span className="dir-block-label">
                        {lang === "en" ? "Target Audience:" : "Target Pengguna:"}
                      </span>
                      <p className="dir-block-text">{item.suitableFor}</p>
                    </div>
                    <div className="dir-block">
                      <span className="dir-block-label text-red">
                        {lang === "en" ? "Pain Points Solved:" : "Masalah yang Diselesaikan:"}
                      </span>
                      <p className="dir-block-text text-muted">{item.painSolved}</p>
                    </div>
                    <div className="dir-block">
                      <span className="dir-block-label text-green">
                        {lang === "en" ? "Core Capabilities:" : "Manfaat Utama:"}
                      </span>
                      <ul className="dir-benefit-list">
                        {item.keyBenefits.map((b, bIdx) => (
                          <li key={bIdx}>✓ {b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
