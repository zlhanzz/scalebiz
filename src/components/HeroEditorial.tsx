"use client";

import React, { useState, useEffect } from "react";
import ScalebizTypography from "./ScalebizTypography";
import { useLanguage } from "@/context/LanguageContext";
import { TRANSLATIONS } from "@/data/translations";

interface HeroProject {
  id: string;
  name: string;
  badge: { id: string; en: string };
  category: { id: string; en: string };
  description: { id: string; en: string };
  urlBar: string;
  phoneImg: string;
  tabletImg: string;
  previewImg: string;
  portraitImg: string;
  accentColor: string;
  tagline: { id: string; en: string };
  metric: { id: string; en: string };
}

const HERO_PROJECTS: HeroProject[] = [
  {
    id: "ruangsinggah",
    name: "RuangSinggah.id",
    badge: { id: "Live Platform", en: "Live Platform" },
    category: {
      id: "Marketplace Proptech Hunian & Kost",
      en: "Proptech Marketplace & Student Housing",
    },
    description: {
      id: "Cari kost, filter kampus terdekat, & booking online terhubung ke WhatsApp.",
      en: "Student housing search, campus proximity filter, & direct WhatsApp bookings.",
    },
    urlBar: "ruangsinggah.id/cari-kost",
    phoneImg: "/images/ruangsinggah-mobile.png",
    tabletImg: "/images/ruangsinggah-desktop.png",
    previewImg: "/images/ruangsinggah-preview.jpg",
    portraitImg: "/images/developer-portrait.png",
    accentColor: "#e11d48",
    tagline: {
      id: "Proptech Real-time Search & Filter",
      en: "Proptech Real-time Search & Filter",
    },
    metric: {
      id: "10+ Unit Terverifikasi",
      en: "10+ Verified Units",
    },
  },
  {
    id: "ruangtani",
    name: "rUang Tani",
    badge: { id: "Aplikasi Riil", en: "Live Enterprise App" },
    category: {
      id: "Pencatatan Keuangan & Lahan Tani",
      en: "Agri-Finance & Land Yield Management",
    },
    description: {
      id: "Monitoring laba keuntungan, arus kas panen, pengeluaran berjalan, & progress panen.",
      en: "Harvest profit monitoring, seasonal cash flows, running OPEX, & yield progress.",
    },
    urlBar: "ruangtani.app/keuangan",
    phoneImg: "/images/ruang-tani-mobile.png",
    tabletImg: "/images/ruang-tani-desktop.png",
    previewImg: "/images/ruang-tani-mobile.png",
    portraitImg: "/images/developer-portrait-ruangtani.png",
    accentColor: "#10b981",
    tagline: {
      id: "Manajemen Keuangan Lahan & Panen Terintegrasi",
      en: "Integrated Harvest Yield & Farm Financials",
    },
    metric: {
      id: "Laba Rp 646,2 Jt Terdata",
      en: "IDR 646.2M Profit Tracked",
    },
  },
  {
    id: "mentlife",
    name: "Mentlife",
    badge: { id: "AI Mentor", en: "AI Intelligence" },
    category: {
      id: "AI Finance & Career Mentor",
      en: "AI Finance & Career Advisory",
    },
    description: {
      id: "Pencatatan arus kas, diagnosis kesehatan finansial (Runway & Cashflow), roadmap bebas hutang, & saran AI personal.",
      en: "Cash flow tracking, financial health runway diagnosis, debt-freedom roadmap, & personal AI insights.",
    },
    urlBar: "mentlife.ai/beranda",
    phoneImg: "/images/mentlife-mobile.png",
    tabletImg: "/images/mentlife-desktop.png",
    previewImg: "/images/mentlife-desktop.png",
    portraitImg: "/images/developer-portrait-mentlife.png",
    accentColor: "#38bdf8",
    tagline: {
      id: "Personal Financial Runway & AI Coaching",
      en: "Personal Financial Runway & AI Coaching",
    },
    metric: {
      id: "Runway 7.9 Bln • AI Diagnosis",
      en: "7.9 Mo Runway • AI Diagnosis",
    },
  },
];

export default function HeroEditorial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang].hero;

  // Auto-rotate continuously every 3.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_PROJECTS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const currentProject = HERO_PROJECTS[activeIndex];

  return (
    <section className="hero-editorial" id="portofolio">
      {/* Dynamic Ambient Glow matching each project with crossfade */}
      {HERO_PROJECTS.map((proj, idx) => (
        <div
          key={`glow-${proj.id}`}
          className="hero-ambient-glow"
          style={{
            background: `radial-gradient(circle at 50% 60%, ${proj.accentColor}25 0%, transparent 68%)`,
            opacity: idx === activeIndex ? 1 : 0,
            transition: "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          aria-hidden="true"
        />
      ))}

      <div className="container hero-content-wrapper">
        {/* Top Manifesto Box */}
        <div className="hero-manifesto">
          <h1>
            <span className="hero-title-highlight">{t.highlight}</span>
            <span className="hero-title-sub">{t.sub}</span>
          </h1>

          {/* Interactive Portfolio Navigation with Guiding Eyebrow */}
          <div className="hero-portfolio-nav-group">
            <span className="hero-portfolio-label">{t.workLabel}</span>
            <div className="hero-project-pills" role="tablist" aria-label="Pilih Proyek Showcase">
              {HERO_PROJECTS.map((proj, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`project-pill-btn ${isActive ? "active" : ""}`}
                    onClick={() => {
                      setActiveIndex(idx);
                    }}
                  >
                    <span
                      className="pill-dot"
                      style={{ backgroundColor: proj.accentColor }}
                    />
                    <span className="pill-name">{proj.name}</span>
                    {isActive && (
                      <span
                        key={`timer-${idx}-${activeIndex}`}
                        className="pill-progress-timer"
                        style={{ backgroundColor: proj.accentColor }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Anchor to Diagnostic Section */}
          <div className="hero-cta-wrapper">
            <a
              href="#diagnosa-sistem"
              className="hero-primary-cta-btn"
              id="cta-hero-main"
            >
              <span>{t.ctaMain}</span>
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
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </a>
          </div>
        </div>

        {/* Center Poster Frame (Backdrop Typography + Sliding Browser Showcase Track + Rock-Solid Character) */}
        <div className="hero-poster-frame">
          {/* Layer 1: Backdrop Name Typography */}
          <div className="hero-backdrop-text" aria-hidden="true">
            <ScalebizTypography variant="fill" />
            <div className="backdrop-subtitle">DIGITAL SOLUTION STUDIO</div>
          </div>

          {/* Layer 2: Floating Browser Showcase Window with Slick SLIDE-LEFT Track */}
          <div className="hero-backdrop-preview-stage" aria-hidden="true">
            <div
              className="backdrop-slider-track"
              style={{
                display: "flex",
                width: `${HERO_PROJECTS.length * 100}%`,
                transform: `translateX(-${(activeIndex * 100) / HERO_PROJECTS.length}%)`,
                transition: "transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
                height: "100%",
              }}
            >
              {HERO_PROJECTS.map((proj) => (
                <div
                  key={`slide-${proj.id}`}
                  className="backdrop-slider-slide"
                  style={{
                    width: `${100 / HERO_PROJECTS.length}%`,
                    height: "100%",
                    flexShrink: 0,
                  }}
                >
                  <div
                    className="backdrop-browser-window"
                    style={
                      {
                        "--proj-accent-glow": `${proj.accentColor}35`,
                        borderColor: `${proj.accentColor}40`,
                      } as React.CSSProperties
                    }
                  >
                    <div className="browser-chrome-header">
                      <div className="browser-dots">
                        <span className="browser-dot dot-close" />
                        <span className="browser-dot dot-min" />
                        <span className="browser-dot dot-max" />
                      </div>
                      <div className="browser-url-pill">
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span>{proj.urlBar}</span>
                      </div>
                      <div
                        className="browser-status-tag"
                        style={{ color: proj.accentColor }}
                      >
                        ● {proj.badge[lang]}
                      </div>
                    </div>
                    <div className="browser-screen-viewport">
                      <img
                        src={proj.tabletImg}
                        alt={`${proj.name} Desktop Dashboard`}
                        className="browser-screen-img"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Layer 3: Central Portrait Stage (ROCK-SOLID OPAQUE - ZERO GHOSTING / ZERO BAYANG-BAYANG) */}
          <div className="hero-portrait-stage">
            <img
              src={currentProject.portraitImg}
              alt={`Scalebiz - Scaleup & Optimalisasi Bisnis (${currentProject.name})`}
              className="portrait-img"
              key={`portrait-solid`}
            />
          </div>

          {/* Layer 4: Front Line-Art Stroke Typography (Overlapping Character) */}
          <div className="hero-backdrop-text backdrop-front-stroke" aria-hidden="true">
            <ScalebizTypography variant="stroke" />
            <div className="backdrop-subtitle stroke-subtitle-spacer" aria-hidden="true">DIGITAL SOLUTION STUDIO</div>
          </div>
        </div>

      </div>
    </section>
  );
}
