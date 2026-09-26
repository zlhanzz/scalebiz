"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { TRANSLATIONS } from "@/data/translations";

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const t = TRANSLATIONS[lang].nav;

  const whatsappUrl = `https://wa.me/6281527080656?text=${encodeURIComponent(
    t.waMessage
  )}`;

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
          <a href="#" onClick={scrollToTop} className="nav-brand" aria-label="ScaleBiz - Home">
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
              <p>{t.tagline}</p>
            </div>
          </a>

          <nav className="nav-links">
            <a href="#layanan" onClick={(e) => scrollToSection(e, "layanan")}>{t.services}</a>
            <a href="#portofolio" onClick={(e) => scrollToSection(e, "portofolio")}>{t.portfolio}</a>
            <a href="#diagnosa-sistem" onClick={(e) => scrollToSection(e, "diagnosa-sistem")}>{t.diagnosis}</a>
            <a href="#faq" onClick={(e) => scrollToSection(e, "faq")}>{t.faq}</a>
          </nav>

          <div className="nav-actions">
            {/* Language Switcher */}
            <div className="lang-switcher" role="group" aria-label="Language Selector">
              <button
                type="button"
                onClick={() => setLang("id")}
                className={`lang-btn ${lang === "id" ? "active" : ""}`}
                aria-pressed={lang === "id"}
                title="Bahasa Indonesia"
              >
                ID
              </button>
              <span className="lang-divider">/</span>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`lang-btn ${lang === "en" ? "active" : ""}`}
                aria-pressed={lang === "en"}
                title="English"
              >
                EN
              </button>
            </div>

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
              <span>{t.consultWa}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
