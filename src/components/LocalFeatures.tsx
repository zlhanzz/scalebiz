import React from "react";

export default function LocalFeatures() {
  const features = [
    {
      icon: "⚡",
      title: "Loading Super Kilat (< 1.5 Detik)",
      desc: "Pelanggan langsung melihat menu tanpa menunggu lama. Website ringan dan hemat kuota internet.",
    },
    {
      icon: "💬",
      title: "Pesan Otomatis ke WhatsApp",
      desc: "Tombol klik-to-chat dengan draft pesan otomatis. Nama produk/layanan yang dipilih langsung terisi di pesan WA.",
    },
    {
      icon: "📍",
      title: "Google Maps & Jam Buka Presisi",
      desc: "Pelanggan dan kurir langsung diarahkan ke lokasi toko dengan satu klik tombol buka rute Maps.",
    },
    {
      icon: "📱",
      title: "100% Desain Nyaman di HP",
      desc: "Tombol besar, tulisan mudah dibaca, dan navigasi ramah jempol. Optimal untuk pembeli dari Instagram.",
    },
    {
      icon: "📖",
      title: "Katalog & Menu Jernih",
      desc: "Foto menu makanan, produk ritel, atau paket perawatan tampil rapi dan estetik, meningkatkan minat beli.",
    },
    {
      icon: "🔍",
      title: "Terdaftar di Pencarian Google",
      desc: "Optimasi SEO lokal agar bisnis Anda mudah ditemukan saat orang mengetik nama usaha Anda di Google.",
    },
  ];

  return (
    <section id="fitur" className="features-section section-padding">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Fitur Penting</span>
          <h2 className="section-title">
            Standar Website Bisnis yang Beneran Menghasilkan Order
          </h2>
          <p className="section-desc">
            Setiap website yang saya buat dirancang untuk mempermudah calon pelanggan
            menemukan informasi dan langsung menghubungi kasir/admin Anda.
          </p>
        </div>

        <div className="features-grid">
          {features.map((item, index) => (
            <div key={index} className="feature-box">
              <span className="feature-icon-badge">{item.icon}</span>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
