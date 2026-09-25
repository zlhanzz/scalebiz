import React from "react";

export default function ProjectShowcase() {
  const whatsappUrl =
    "https://wa.me/6281527080656?text=Halo%20Scalebiz,%20saya%20sudah%20melihat%20portofolio%20Anda%20dan%20ingin%20konsultasi%20website%20bisnis%20saya.";

  return (
    <section id="proyek" className="showcase-section section-padding">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Bukti Nyata (Social Proof)</span>
          <h2 className="section-title">
            Bukan Sekadar Desain, Tapi Sistem Nyata yang Sudah Bekerja
          </h2>
          <p className="section-desc">
            Saya bukan perakit template instan. Berikut adalah 3 proyek sistem
            digital yang telah saya rancang dan kembangkan dari fondasi kode yang kuat.
          </p>
        </div>

        <div className="projects-stack">
          {/* Project 1: RuangSinggah.id */}
          <div className="project-card">
            <div className="project-media">
              <span className="project-media-badge badge-tag badge-red">
                ● Live di Internet
              </span>
              <img
                src="/images/ruangsinggah-preview.jpg"
                alt="Tampilan Web RuangSinggah.id"
              />
            </div>
            <div className="project-content">
              <span className="project-category">Platform Skala Publik • Proptech</span>
              <h3 className="project-name">RuangSinggah.id</h3>
              <div className="project-framing">
                Bukti: Terbiasa membangun platform publik berskala besar dengan loading kilat dan database dinamis.
              </div>
              <p className="project-desc">
                Platform marketplace pencarian hunian kost dan apartemen modern di Indonesia.
                Dilengkapi dengan fitur filter harga interaktif, pencarian berbasis lokasi & kampus,
                verifikasi pemilik properti, dan optimasi performa tinggi.
              </p>
              <ul className="project-features-list">
                <li>
                  <span className="feature-check">✓</span>
                  <span>Arsitektur Fullstack Modern & Database Terstruktur</span>
                </li>
                <li>
                  <span className="feature-check">✓</span>
                  <span>Fitur Pencarian & Filter Lokasi Real-time</span>
                </li>
                <li>
                  <span className="feature-check">✓</span>
                  <span>Desain Bersih, Ramah Mobile, & Terintegrasi Maps</span>
                </li>
              </ul>
              <div className="project-cta-group">
                <a
                  href="https://ruangsinggah.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-project-live"
                >
                  <span>Buka Website ruangsinggah.id</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Project 2: rUang Tani */}
          <div className="project-card reversed">
            <div className="project-media">
              <span className="project-media-badge badge-tag badge-green">
                ● Aplikasi Riil Aktif
              </span>
              <img
                src="/images/ruang-tani-desktop.png"
                alt="rUang Tani - Aplikasi Pencatatan Keuangan & Lahan Pertanian"
              />
            </div>
            <div className="project-content">
              <span className="project-category">Manajemen Pertanian • Arus Kas & Lahan</span>
              <h3 className="project-name">rUang Tani — Pencatatan Keuangan & Lahan Pertanian</h3>
              <div className="project-framing">
                Bukti: Paham alur transaksi riil di sektor agribisnis, monitoring panen multi-lahan, dan sistem pencatatan operasional yang efisien.
              </div>
              <p className="project-desc">
                Platform pencatatan keuangan dan monitoring operasional pertanian yang dirancang khusus untuk petani dan pemilik kebun. Membantu melacak laba keuntungan secara otomatis (terdata laba Rp 646,2 Jt), memantau pengeluaran berjalan per lahan (seperti Kebun Bokara & Lahan Sungai), hingga tracking persentase progres menuju panen.
              </p>
              <ul className="project-features-list">
                <li>
                  <span className="feature-check">✓</span>
                  <span>Ringkasan Finansial Real-time: Pemasukan (Rp 889 Jt), Pengeluaran, & Laba Bersih</span>
                </li>
                <li>
                  <span className="feature-check">✓</span>
                  <span>Manajemen Multi-Lahan & Komoditas (Kebun Cengkeh, Lahan Padi) dengan Luasan Hektar</span>
                </li>
                <li>
                  <span className="feature-check">✓</span>
                  <span>Tracking Progres Menuju Panen & Pengeluaran Berjalan per Siklus</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Project 3: Mentlife */}
          <div className="project-card">
            <div className="project-media">
              <span className="project-media-badge badge-tag badge-blue">
                ● Inovasi Cerdas Riil
              </span>
              <img
                src="/images/mentlife-desktop.png"
                alt="Mentlife - Mentor Finansial & Karir Personal Berbasis AI"
              />
            </div>
            <div className="project-content">
              <span className="project-category">Teknologi Modern • AI Decision Engine</span>
              <h3 className="project-name">Mentlife — Mentor Finansial & Karir Personal Berbasis AI</h3>
              <div className="project-framing">
                Bukti: Menguasai integrasi AI cerdas, diagnosis kesehatan finansial riil (Runway & Cashflow), serta gamifikasi peta jalan keuangan.
              </div>
              <p className="project-desc">
                Platform mentor finansial dan karir personal berbasis kecerdasan buatan. Mengumpulkan data pemasukan dan pengeluaran secara real-time, mengukur indikator kesehatan finansial (Financial Pulse: Runway 7.9 bulan & status Cashflow), memandu Peta Jalan 6 Tangga (seperti Debt Snowball untuk pelunasan hutang terstruktur), dan memberikan saran aksi terpersonalisasi melalui AI Mentor interaktif.
              </p>
              <ul className="project-features-list">
                <li>
                  <span className="feature-check">✓</span>
                  <span>Financial Pulse Otomatis: Runway (Ketahanan Tanpa Income 7.9 Bln) & Analisis Cashflow</span>
                </li>
                <li>
                  <span className="feature-check">✓</span>
                  <span>Peta Jalan Finansial 6 Tangga: Panduan Bertahap Bebas Hutang (Debt Snowball) & Dana Darurat</span>
                </li>
                <li>
                  <span className="feature-check">✓</span>
                  <span>AI Mentor Interaktif: Diagnosis Rasio Cicilan, Pemahaman Profil 80%, & Rekomendasi Karir</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* The Strategic Bridge Banner */}
        <div className="bridge-banner">
          <div className="bridge-text">
            <h3>Dari Skala Sistem Kompleks ke Kebutuhan Bisnis Lokal Anda</h3>
            <p>
              Jika platform marketplace properti skala publik dan aplikasi kalkulasi bisnis saja
              berhasil saya bangun dengan stabil, maka memastikan website toko, kafe, atau klinik
              Anda bekerja cepat, tanpa error, dan ramah pelanggan adalah jaminan pasti.
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bridge-btn"
          >
            <span>Konsultasikan Kebutuhan Anda</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
