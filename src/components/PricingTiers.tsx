import React from "react";

export default function PricingTiers() {
  const tiers = [
    {
      name: "Starter Express",
      target: "Cocok untuk kafe, gerai kuliner, warung makan, & jasa rumahan.",
      price: "Rp 490.000",
      time: "⚡ Selesai 2 Hari Kerja",
      popular: false,
      buttonText: "Pilih Paket Starter",
      buttonClass: "btn-tier-outline",
      waMessage:
        "Halo%20Mas%20Zhull,%20saya%20tertarik%20dengan%20Paket%20Starter%20Express%20(Rp%20490rb)%20untuk%20usaha%20saya.",
      features: [
        "1 Halaman Web Cepat (Mobile-First)",
        "Tombol Pesan WhatsApp Mengambang (Sticky)",
        "Integrasi Google Maps & Jam Operasional",
        "Galeri Foto Menu / Produk (s/d 10 foto)",
        "Loading Super Kilat & Bebas Lemot",
        "Bantuan Setup Domain & Hosting Terima Beres",
      ],
    },
    {
      name: "Pro Bisnis",
      target: "Paling direkomendasikan untuk resto, butik, distro, klinik, & toko lokal.",
      price: "Rp 980.000",
      time: "⚡ Selesai 3–4 Hari Kerja",
      popular: true,
      buttonText: "Pilih Paket Pro Bisnis",
      buttonClass: "btn-tier-primary",
      waMessage:
        "Halo%20Mas%20Zhull,%20saya%20tertarik%20dengan%20Paket%20Pro%20Bisnis%20(Rp%20980rb)%20untuk%20usaha%20saya.",
      features: [
        "Semua fitur di Paket Starter",
        "Katalog Produk/Menu dengan Filter Kategori",
        "Format Chat WA Otomatis (Nama produk terbawa)",
        "Bagian Profil Usaha, Keunggulan, & FAQ",
        "Pendaftaran Google Bisnisku & SEO Lokal",
        "Garansi Update Menu & Harga Gratis 30 Hari",
      ],
    },
    {
      name: "Premium Booking",
      target: "Untuk klinik estetika, salon, bengkel, car wash, & jasa rental.",
      price: "Rp 1.850.000",
      time: "⚡ Selesai 5–6 Hari Kerja",
      popular: false,
      buttonText: "Pilih Paket Premium",
      buttonClass: "btn-tier-outline",
      waMessage:
        "Halo%20Mas%20Zhull,%20saya%20tertarik%20dengan%20Paket%20Premium%20Booking%20(Rp%201.85jt)%20untuk%20usaha%20saya.",
      features: [
        "Semua fitur di Paket Pro Bisnis",
        "Form Reservasi & Booking Jadwal Layanan",
        "Kalkulator Estimasi Biaya Interaktif",
        "Widget Ulasan / Review Pelanggan Otomatis",
        "Video Panduan Ganti Konten Sendiri",
        "Garansi Pendampingan Prioritas 60 Hari",
      ],
    },
  ];

  return (
    <section id="harga" className="pricing-section section-padding">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Harga Terbuka & Transparan</span>
          <h2 className="section-title">
            Investasi Terjangkau, Tanpa Biaya Tersembunyi
          </h2>
          <p className="section-desc">
            Pilih paket yang paling sesuai dengan kebutuhan usaha Anda saat ini.
            Semua paket dikerjakan langsung oleh saya sendiri dengan garansi tuntas.
          </p>
        </div>

        <div className="pricing-grid">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`pricing-card ${tier.popular ? "popular" : ""}`}
            >
              {tier.popular && (
                <div className="pricing-ribbon">PILIHAN PALING POPULER</div>
              )}

              <div className="tier-header">
                <h3 className="tier-name">{tier.name}</h3>
                <p className="tier-target">{tier.target}</p>
              </div>

              <div className="tier-pricing">
                <div className="tier-price-amount">{tier.price}</div>
                <div className="tier-time-badge">{tier.time}</div>
              </div>

              <ul className="tier-features">
                {tier.features.map((feat, i) => (
                  <li key={i}>
                    <span className="feature-check">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/6281527080656?text=${tier.waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`tier-cta-btn ${tier.buttonClass}`}
              >
                <span>{tier.buttonText}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
