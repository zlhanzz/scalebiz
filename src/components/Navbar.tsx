"use client";

import React from "react";

export default function Navbar() {
  const whatsappUrl =
    "https://wa.me/6281527080656?text=Halo%20Scalebiz,%20saya%20tertarik%20untuk%20konsultasi%20pembuatan%20website%20dan%20sistem%20bisnis%20saya.";

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 30;
      window.scrollTo({
        top: Math.max(0, topOffset),
        behavior: "smooth",
      });
      window.history.pushState(null, "", `#${targetId}`);
    } else {
      window.location.hash = targetId;
    }
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(null, "", window.location.pathname);
  };

  return (
    <header className="nav-editorial">
      <div className="container">
        <div className="nav-inner">
          <a href="#" onClick={scrollToTop} className="nav-brand" aria-label="ScaleBiz - Beranda">
            <div className="brand-logo-wrap">
              <img
                src="/images/scalebiz-symbol.webp"
                alt="ScaleBiz"
                className="brand-logo-img"
                width={36}
                height={36}
              />
            </div>
            <div className="brand-details">
              <h2>
                <span className="brand-scale">SCALE</span><span className="brand-accent-biz">BIZ</span>
              </h2>
              <p>Scale Up dan Optimalisasi Bisnis Kamu</p>
            </div>
          </a>

          <nav className="nav-links">
            <a href="#layanan" onClick={(e) => scrollToSection(e, "layanan")}>Layanan</a>
            <a href="#portofolio" onClick={(e) => scrollToSection(e, "portofolio")}>Portofolio</a>
            <a href="#diagnosa-sistem" onClick={(e) => scrollToSection(e, "diagnosa-sistem")}>Diagnosa Bisnis</a>
            <a href="#faq" onClick={(e) => scrollToSection(e, "faq")}>FAQ</a>
          </nav>

          <div className="nav-actions">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa-header"
              id="cta-nav-whatsapp"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>Konsultasi WA</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
