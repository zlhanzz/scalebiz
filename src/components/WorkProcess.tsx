import React from "react";

export default function WorkProcess() {
  const steps = [
    {
      num: "01",
      title: "Ngobrol Santai (15 Menit)",
      desc: "Kita diskusikan via chat WhatsApp jenis usaha Anda, target pelanggan, dan paket yang paling cocok.",
    },
    {
      num: "02",
      title: "Kirim Materi Usaha",
      desc: "Cukup kirimkan foto produk/menu, alamat toko, daftar harga, dan nomor WhatsApp admin Anda.",
    },
    {
      num: "03",
      title: "Pengerjaan Kilat (2–3 Hari)",
      desc: "Website langsung saya bangun dengan performa tinggi. Anda akan mendapat link preview untuk cek tampilan.",
    },
    {
      num: "04",
      title: "Online & Siap Terima Order",
      desc: "Website di-publish, alamat terhubung ke Google Maps, dan link siap dipasang di bio Instagram & TikTok.",
    },
  ];

  return (
    <section id="alur" className="process-section section-padding">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Alur Kerja Praktis</span>
          <h2 className="section-title">
            Tinggal Terima Beres, Tanpa Perlu Paham Teknis (Anti-Gaptek)
          </h2>
          <p className="section-desc">
            Anda tidak perlu mengelola konfigurasi teknis server atau koding yang rumit.
            Seluruh infrastruktur digital dari domain hingga sistem online ditangani secara menyeluruh.
          </p>
        </div>

        <div className="process-timeline">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{step.num}</div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
