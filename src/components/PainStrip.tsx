import React from "react";

export default function PainStrip() {
  return (
    <section className="pain-strip-section section-padding">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Realitas Bisnis Lokal</span>
          <h2 className="section-title">
            Mengapa Instagram & Brosur Saja Sering Kehilangan Pelanggan?
          </h2>
          <p className="section-desc">
            90% calon pembeli membuka HP untuk mencari tempat makan, klinik, atau jasa
            terdekat. Inilah perbedaan bisnis tanpa website vs bisnis dengan sistem digital rapi.
          </p>
        </div>

        <div className="pain-grid">
          {/* Pain 1 */}
          <div className="pain-card">
            <div className="pain-icon-wrapper icon-red">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h3 className="pain-title">Menu & Info Tertimbun di Instagram</h3>
            <p className="pain-desc">
              Pelanggan malas menggeser puluhan feed atau highlight IG hanya untuk mengecek harga menu atau daftar layanan. Mereka sering batal pesan karena tidak menemukan info dalam 10 detik.
            </p>
          </div>

          {/* Pain 2 */}
          <div className="pain-card">
            <div className="pain-icon-wrapper icon-red">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3 className="pain-title">Pelanggan & Kurir Kesulitan Menemukan Lokasi</h3>
            <p className="pain-desc">
              Tanpa integrasi tautan Google Maps yang presisi dan jam operasional yang akurat, calon pelanggan ragu untuk mendatangi gerai atau memesan layanan Anda.
            </p>
          </div>

          {/* Solution - Highlight Card */}
          <div className="pain-card card-highlight">
            <div className="pain-icon-wrapper icon-green">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="pain-title">Solusi: Website Kilat & Order WhatsApp</h3>
            <p className="pain-desc">
              Satu link bio yang memuat semua: menu foto jernih, harga transparan, rute Maps, dan tombol satu klik untuk langsung chat WA ke admin/kasir dengan draft pesanan otomatis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
