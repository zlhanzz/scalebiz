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

export default function BusinessSolutions() {
  const [showAllDirectory, setShowAllDirectory] = useState<boolean>(false);
  const [directoryFilter, setDirectoryFilter] = useState<"all" | "marketing" | "commerce" | "operations">("all");

  const filteredDirectory = COMPLETE_DIRECTORY.filter((item) => {
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
            <span>KONSULTASI KEBUTUHAN SISTEM & WEB</span>
          </div>

          <h2 className="section-title solutions-main-title">
            Website & Sistem Apa yang Cocok untuk Bisnis Saya?
          </h2>

          <p className="section-desc solutions-subtitle">
            Setiap bisnis memiliki alur kerja yang unik. Alih-alih mengeluarkan investasi untuk modul yang tidak terpakai atau terhambat oleh proses manual yang tidak efisien, luangkan 2 menit untuk menganalisis sistem yang paling relevan dengan skala usaha Anda.
          </p>

          <div className="solutions-time-hint-pill">
            <span className="hint-clock-icon">⏱️</span>
            <span>Hanya butuh 1–2 menit • Langsung dapat rekomendasi konkret & draf solusi</span>
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
                ? "Sembunyikan Direktori 10 Jenis Website & Sistem"
                : "Atau Ingin Mempelajari Seluruh 10 Jenis Website & Sistem Digital Bisnis? (Klik di Sini)"}
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
              <span className="directory-filter-label">Filter Kategori:</span>
              <div className="directory-filter-buttons">
                <button
                  type="button"
                  className={`dir-filter-btn ${directoryFilter === "all" ? "active" : ""}`}
                  onClick={() => setDirectoryFilter("all")}
                >
                  Semua (10)
                </button>
                <button
                  type="button"
                  className={`dir-filter-btn ${directoryFilter === "marketing" ? "active" : ""}`}
                  onClick={() => setDirectoryFilter("marketing")}
                >
                  Pemasaran & Kredibilitas (3)
                </button>
                <button
                  type="button"
                  className={`dir-filter-btn ${directoryFilter === "commerce" ? "active" : ""}`}
                  onClick={() => setDirectoryFilter("commerce")}
                >
                  Penjualan & Transaksi (4)
                </button>
                <button
                  type="button"
                  className={`dir-filter-btn ${directoryFilter === "operations" ? "active" : ""}`}
                  onClick={() => setDirectoryFilter("operations")}
                >
                  Sistem ERP & Operasional (3)
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
                      <span className="dir-block-label">Target Pengguna:</span>
                      <p className="dir-block-text">{item.suitableFor}</p>
                    </div>
                    <div className="dir-block">
                      <span className="dir-block-label text-red">Masalah yang Diselesaikan:</span>
                      <p className="dir-block-text text-muted">{item.painSolved}</p>
                    </div>
                    <div className="dir-block">
                      <span className="dir-block-label text-green">Manfaat Utama:</span>
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
