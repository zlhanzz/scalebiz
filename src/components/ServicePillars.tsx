"use client";

import React from "react";

export default function ServicePillars() {
  return (
    <section id="layanan" className="service-pillars-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="solutions-eyebrow-badge">
            <span className="eyebrow-dot" />
            <span>4 PILAR LAYANAN UTAMA</span>
          </div>

          <h2 className="section-title pillars-main-title">
            Solusi Digital Kustom yang Dirancang Mengikuti Alur Bisnis Anda
          </h2>

          <p className="section-desc pillars-subtitle">
            Scalebiz tidak menjual software kaku atau template pasaran yang memaksa Anda mengubah cara kerja. Setiap sistem dibangun secara tailor-made sesuai skala usaha, SOP unik, dan kebutuhan operasional nyata Anda.
          </p>

          {/* Value Badges with Monoline SVG Icons */}
          <div className="pillars-value-tags">
            <span className="pillar-tag-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
              <span>100% Kustom Sesuai Alur Bisnis</span>
            </span>

            <span className="pillar-tag-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
              </svg>
              <span>Bebas Biaya Langganan Bulanan</span>
            </span>
          </div>
        </div>

        {/* 4 Pillars Grid (Original 4-Card Architecture with Modern SVG Icons) */}
        <div className="pillars-cards-grid">
          {/* PILAR 01: Website & Digital Presence */}
          <div className="pillar-feature-card">
            <div className="pillar-card-accent-line line-cyan" aria-hidden="true" />

            <div className="pillar-card-top">
              <div className="pillar-card-meta">
                <span className="pillar-card-num">01</span>
                <span className="pillar-card-badge badge-cyan">Kredibilitas & Konversi</span>
              </div>
              <div className="pillar-svg-icon-frame frame-cyan">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
            </div>

            <h3 className="pillar-card-title">Website & Digital Presence</h3>
            <p className="pillar-card-tagline">
              Aset digital resmi berkecepatan tinggi yang membangun reputasi korporat dan mengubah pengunjung menjadi prospek pembeli aktif.
            </p>

            <div className="pillar-card-capabilities">
              <span className="capabilities-label">Cakupan Modul Kustom:</span>
              <ul className="capabilities-list">
                <li className="capability-item">
                  <svg className="capability-check-icon check-cyan" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Company Profile Korporat B2B & Legalitas Tender</span>
                </li>
                <li className="capability-item">
                  <svg className="capability-check-icon check-cyan" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>High-Converting Landing Page Kampanye Iklan</span>
                </li>
                <li className="capability-item">
                  <svg className="capability-check-icon check-cyan" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Katalog Produk Interaktif & Showroom Portofolio</span>
                </li>
                <li className="capability-item">
                  <svg className="capability-check-icon check-cyan" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Direct WhatsApp Checkout & Formulir Inquiry Cepat</span>
                </li>
              </ul>
            </div>

            <div className="pillar-card-footer">
              <div className="pillar-benefit-pill pill-cyan">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.5">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span>Loading &lt; 1.5s, Mobile-First & SEO-Optimized</span>
              </div>
            </div>
          </div>

          {/* PILAR 02: POS Keuangan & Kasir */}
          <div className="pillar-feature-card">
            <div className="pillar-card-accent-line line-green" aria-hidden="true" />

            <div className="pillar-card-top">
              <div className="pillar-card-meta">
                <span className="pillar-card-num">02</span>
                <span className="pillar-card-badge badge-green">Arus Kas & Anti-Fraud</span>
              </div>
              <div className="pillar-svg-icon-frame frame-green">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
              </div>
            </div>

            <h3 className="pillar-card-title">POS Keuangan & Kasir</h3>
            <p className="pillar-card-tagline">
              Kunci kebocoran kasir, kontrol transaksi harian multi-cabang, dan pastikan arus kas tercatat akurat secara real-time.
            </p>

            <div className="pillar-card-capabilities">
              <span className="capabilities-label">Cakupan Modul Kustom:</span>
              <ul className="capabilities-list">
                <li className="capability-item">
                  <svg className="capability-check-icon check-green" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Web POS Kasir Cepat</span>
                </li>
                <li className="capability-item">
                  <svg className="capability-check-icon check-green" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Audit Tutup Shift Kasir & Rekonsiliasi Kas Fisik</span>
                </li>
                <li className="capability-item">
                  <svg className="capability-check-icon check-green" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Cetak Struk Thermal/Bluetooth & QRIS Dinamis</span>
                </li>
                <li className="capability-item">
                  <svg className="capability-check-icon check-green" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Rekap Laba Rugi Otomatis Dikirim ke WhatsApp Owner</span>
                </li>
              </ul>
            </div>

            <div className="pillar-card-footer">
              <div className="pillar-benefit-pill pill-green">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Tanpa Biaya Sewa Bulanan (Milik Bisnis Sendiri)</span>
              </div>
            </div>
          </div>

          {/* PILAR 03: ERP & Operasional Bisnis */}
          <div className="pillar-feature-card">
            <div className="pillar-card-accent-line line-blue" aria-hidden="true" />

            <div className="pillar-card-top">
              <div className="pillar-card-meta">
                <span className="pillar-card-num">03</span>
                <span className="pillar-card-badge badge-blue">Kontrol Operasional & Stok</span>
              </div>
              <div className="pillar-svg-icon-frame frame-blue">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#037cfd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
            </div>

            <h3 className="pillar-card-title">ERP & Operasional Bisnis</h3>
            <p className="pillar-card-tagline">
              Satukan data gudang, logistik, pengeluaran lapangan, dan kinerja tim dalam satu dashboard kontrol terpusat sesuai SOP Anda.
            </p>

            <div className="pillar-card-capabilities">
              <span className="capabilities-label">Cakupan Modul Kustom:</span>
              <ul className="capabilities-list">
                <li className="capability-item">
                  <svg className="capability-check-icon check-blue" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#037cfd" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Manajemen Stok Multi-Gudang & Pelacakan Opname</span>
                </li>
                <li className="capability-item">
                  <svg className="capability-check-icon check-blue" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#037cfd" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Kalkulasi HPP Otomatis & Pemotongan Resep Bahan Baku</span>
                </li>
                <li className="capability-item">
                  <svg className="capability-check-icon check-blue" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#037cfd" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Tracking Timeline Proyek & Log Kerja Staf Lapangan</span>
                </li>
                <li className="capability-item">
                  <svg className="capability-check-icon check-blue" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#037cfd" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Portal Karyawan, Presensi GPS & Rekap Penggajian</span>
                </li>
              </ul>
            </div>

            <div className="pillar-card-footer">
              <div className="pillar-benefit-pill pill-blue">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#037cfd" strokeWidth="2.5">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
                <span>Disesuaikan 100% dengan Alur Kerja Nyata di Lapangan</span>
              </div>
            </div>
          </div>

          {/* PILAR 04: Automation & Alur Kerja */}
          <div className="pillar-feature-card">
            <div className="pillar-card-accent-line line-amber" aria-hidden="true" />

            <div className="pillar-card-top">
              <div className="pillar-card-meta">
                <span className="pillar-card-num">04</span>
                <span className="pillar-card-badge badge-amber">Otomasi 24/7 Tanpa Henti</span>
              </div>
              <div className="pillar-svg-icon-frame frame-amber">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
            </div>

            <h3 className="pillar-card-title">Automation & Alur Kerja</h3>
            <p className="pillar-card-tagline">
              Pangkas pekerjaan manual berulang hingga 80% dengan integrasi cerdas yang menghubungkan seluruh sistem bisnis Anda.
            </p>

            <div className="pillar-card-capabilities">
              <span className="capabilities-label">Cakupan Modul Kustom:</span>
              <ul className="capabilities-list">
                <li className="capability-item">
                  <svg className="capability-check-icon check-amber" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>WhatsApp Business API Gateway & Notifikasi Pesanan</span>
                </li>
                <li className="capability-item">
                  <svg className="capability-check-icon check-amber" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Pengingat Otomatis Tagihan & Invoice Jatuh Tempo</span>
                </li>
                <li className="capability-item">
                  <svg className="capability-check-icon check-amber" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Sinkronisasi Multi-Platform, Webhook & Cloud Data</span>
                </li>
                <li className="capability-item">
                  <svg className="capability-check-icon check-amber" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Bot Interaktif Kualifikasi Prospek & Layanan Pelanggan</span>
                </li>
              </ul>
            </div>

            <div className="pillar-card-footer">
              <div className="pillar-benefit-pill pill-amber">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5">
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                  <rect x="9" y="9" width="6" height="6" />
                  <line x1="9" y1="1" x2="9" y2="4" />
                  <line x1="15" y1="1" x2="15" y2="4" />
                  <line x1="9" y1="20" x2="9" y2="23" />
                  <line x1="15" y1="20" x2="15" y2="23" />
                  <line x1="20" y1="9" x2="23" y2="9" />
                  <line x1="20" y1="14" x2="23" y2="14" />
                  <line x1="1" y1="9" x2="4" y2="9" />
                  <line x1="1" y1="14" x2="4" y2="14" />
                </svg>
                <span>Hemat Ratusan Jam Kerja Tim Operasional Tiap Bulan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
