"use client";

import React, { useState, useEffect } from "react";
import ScalebizTypography from "./ScalebizTypography";

interface HeroProject {
  id: string;
  name: string;
  badge: string;
  category: string;
  description: string;
  urlBar: string;
  phoneImg: string;
  tabletImg: string;
  previewImg: string;
  portraitImg: string;
  accentColor: string;
  tagline: string;
  metric: string;
  pillName?: string;
}

const HERO_PROJECTS: HeroProject[] = [
  {
    id: "ruangsinggah",
    name: "RuangSinggah.id",
    pillName: "RuangSinggah.id",
    badge: "Live Platform",
    category: "Proptech Marketplace & Student Housing",
    description: "Student housing search, campus proximity filter, & direct WhatsApp bookings.",
    urlBar: "ruangsinggah.id/cari-kost",
    phoneImg: "/images/ruangsinggah-mobile.png",
    tabletImg: "/images/ruangsinggah-desktop.webp",
    previewImg: "/images/ruangsinggah-preview.jpg",
    portraitImg: "/images/developer-portrait.webp",
    accentColor: "#e11d48",
    tagline: "Proptech Real-time Search & Filter",
    metric: "10+ Verified Units",
  },
  {
    id: "ruangtani",
    name: "rUang Tani",
    pillName: "rUang Tani",
    badge: "Live Enterprise App",
    category: "Agri-Finance & Land Yield Management",
    description: "Harvest profit monitoring, seasonal cash flows, running OPEX, & yield progress.",
    urlBar: "ruangtani.app/keuangan",
    phoneImg: "/images/ruang-tani-mobile.png",
    tabletImg: "/images/ruang-tani-desktop.webp",
    previewImg: "/images/ruang-tani-mobile.png",
    portraitImg: "/images/developer-portrait-ruangtani.webp",
    accentColor: "#10b981",
    tagline: "Integrated Harvest Yield & Farm Financials",
    metric: "IDR 646.2M Profit Tracked",
  },
  {
    id: "mentlife",
    name: "Mentlife",
    pillName: "Mentlife",
    badge: "AI Intelligence",
    category: "AI Finance & Career Advisory",
    description: "Cash flow tracking, financial health runway diagnosis, debt-freedom roadmap, & personal AI insights.",
    urlBar: "mentlife.ai/beranda",
    phoneImg: "/images/mentlife-mobile.png",
    tabletImg: "/images/mentlife-desktop.webp",
    previewImg: "/images/mentlife-desktop.webp",
    portraitImg: "/images/developer-portrait-mentlife.webp",
    accentColor: "#38bdf8",
    tagline: "Personal Financial Runway & AI Coaching",
    metric: "7.9 Mo Runway • AI Diagnosis",
  },
  {
    id: "totalfence",
    name: "Total Fence of WNY",
    pillName: "Total Fence",
    badge: "Contractor Platform",
    category: "Fence Contractor & Cost Estimator",
    description: "42-inch frost-line standard, interactive fencing style estimator, and instant dispatch booking.",
    urlBar: "totalfencewny.com/estimate",
    phoneImg: "/images/total-fence-mobile.png",
    tabletImg: "/images/total-fence-desktop.webp",
    previewImg: "/images/total-fence-desktop.webp",
    portraitImg: "/images/developer-portrait-totalfence.webp",
    accentColor: "#3b82f6",
    tagline: "Instant Online Fence Cost Calculator",
    metric: "5.0 ★ Google • Instant Quotes",
  },
  {
    id: "luckyleaf",
    name: "Lucky Leaf Tattoo",
    pillName: "Lucky Leaf",
    badge: "Custom Atelier",
    category: "Fine-Line Botanical Tattoo Sanctuary",
    description: "Private sanctuary intake wizard, 1-of-1 flash reservation system, and deposit tracking.",
    urlBar: "luckyleaftattoo.com/sanctuary",
    phoneImg: "/images/lucky-leaf-mobile.png",
    tabletImg: "/images/lucky-leaf-desktop.webp",
    previewImg: "/images/lucky-leaf-desktop.webp",
    portraitImg: "/images/developer-portrait-luckyleaf.webp",
    accentColor: "#10b981",
    tagline: "1-of-1 Botanical Flash Claim Engine",
    metric: "1,000 Cranes • Zero Walk-Ins",
  },
  {
    id: "inktellectual",
    name: "Inktellectual Atelier",
    pillName: "Inktellectual",
    badge: "Studio Platform",
    category: "Resident Collective & Pricing Engine",
    description: "6-resident collective showcase, dynamic hourly tattoo cost estimator, and Buffalo State student hub.",
    urlBar: "inktellectualtattoo.com/booking",
    phoneImg: "/images/inktellectual-mobile.png",
    tabletImg: "/images/inktellectual-desktop.webp",
    previewImg: "/images/inktellectual-desktop.webp",
    portraitImg: "/images/developer-portrait-inktellectual.webp",
    accentColor: "#f59e0b",
    tagline: "Dynamic Hourly & Custom Art Pricing",
    metric: "6 Resident Artists • 4.9 ★",
  },
  {
    id: "fhland",
    name: "F.H. Land Services",
    pillName: "FH Land",
    badge: "Commercial Trades",
    category: "Excavation & Commercial Site Estimator",
    description: "Lot clearing, commercial site grading, emergency storm response, and 24-hour turnaround quotes.",
    urlBar: "fhlandservices.com/site-quote",
    phoneImg: "/images/fh-land-mobile.png",
    tabletImg: "/images/fh-land-desktop.webp",
    previewImg: "/images/fh-land-desktop.webp",
    portraitImg: "/images/developer-portrait-fhland.webp",
    accentColor: "#84cc16",
    tagline: "24-Hour Commercial Excavation SLA",
    metric: "100% Insured • 24h Quotes",
  },
  {
    id: "trendy",
    name: "Trendy Nail Spa",
    pillName: "Trendy Nail",
    badge: "Boutique Spa",
    category: "Medical-Grade Nail Studio & Booking",
    description: "Transparent tiered manicure menu, medical-grade hospital sterilization proof, and calendar reservations.",
    urlBar: "trendynailspa.com/appointments",
    phoneImg: "/images/trendy-mobile.png",
    tabletImg: "/images/trendy-desktop.webp",
    previewImg: "/images/trendy-desktop.webp",
    portraitImg: "/images/developer-portrait-trendy.webp",
    accentColor: "#ec4899",
    tagline: "Zero-Wait Real-time Chair Scheduling",
    metric: "Medical Sterilization • 4.8 ★",
  },
  {
    id: "miabella",
    name: "Mia Bella's Salon",
    pillName: "Mia Bella",
    badge: "Salon & Aesthetics",
    category: "Gothic Hair Boutique & Vivid Color",
    description: "Vivid color correction wizard, hair extension consultations, and holistic elixir inventory.",
    urlBar: "miabellashair.com/consultation",
    phoneImg: "/images/mia-bella-mobile.png",
    tabletImg: "/images/mia-bella-desktop.webp",
    previewImg: "/images/mia-bella-desktop.webp",
    portraitImg: "/images/developer-portrait-miabella.webp",
    accentColor: "#a855f7",
    tagline: "Vivid Color Correction & Extensions",
    metric: "Signature Boutique • 5.0 ★",
  },
  {
    id: "trulyorganic",
    name: "Truly Organic Studio",
    pillName: "Truly Organic",
    badge: "Eco Sanctuary",
    category: "Ammonia-Free Organic Hair Care",
    description: "Non-toxic organic treatments, bridal updo portfolios, and transparent botanical pricing.",
    urlBar: "trulyorganichairstudio.com/services",
    phoneImg: "/images/truly-organic-mobile.png",
    tabletImg: "/images/truly-organic-desktop.webp",
    previewImg: "/images/truly-organic-desktop.webp",
    portraitImg: "/images/developer-portrait-trulyorganic.webp",
    accentColor: "#14b8a6",
    tagline: "100% Ammonia-Free Hair Chemistry",
    metric: "Certified Organic • 4.9 ★",
  },
];

export default function HeroEditorial() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Preload portrait images and tablet previews to ensure instant zero-latency transitions
  useEffect(() => {
    const baseImg = new Image();
    baseImg.src = "/images/developer-portrait-base.webp";
    HERO_PROJECTS.forEach((proj) => {
      const pImg = new Image();
      pImg.src = proj.portraitImg;
      const tImg = new Image();
      tImg.src = proj.tabletImg;
    });
  }, []);

  // Auto-rotate continuously every 3.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_PROJECTS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const currentProject = HERO_PROJECTS[activeIndex];

  const scrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("services") || document.getElementById("layanan");
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 30;
      window.scrollTo({
        top: Math.max(0, topOffset),
        behavior: "smooth",
      });
      window.history.pushState(null, "", "#services");
    } else {
      window.location.hash = "services";
    }
  };

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
            <span className="hero-title-highlight">Stop Limiting Your Business Potential!</span>
            <span className="hero-title-sub">by relying on outdated legacy workflows</span>
          </h1>

          {/* Interactive Portfolio Navigation with Guiding Eyebrow */}
          <div className="hero-portfolio-nav-group">
            <span className="hero-portfolio-label">Our Selected Work:</span>
            <div className="hero-project-pills" role="tablist" aria-label="Select Showcase Project">
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
                    <span className="pill-name">{proj.pillName || proj.name}</span>
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

          {/* Anchor to Services Section */}
          <div className="hero-cta-wrapper">
            <a
              href="#services"
              onClick={scrollToServices}
              className="hero-primary-cta-btn"
              id="cta-hero-main"
            >
              <span>Scale Up and Grow My Business!</span>
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
                        ● {proj.badge}
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

          {/* Layer 3: Central Portrait Stage (ROCK-SOLID PERMANENT BASE + SMOOTH SCREEN CROSSFADE) */}
          <div className="hero-portrait-stage">
            {/* 1. Permanent Base Character: Never unmounts, never blinks, 100% solid in DOM */}
            <img
              src="/images/developer-portrait-base.webp"
              alt="Scalebiz Lead Architect & Fullstack Systems Engineer"
              className="portrait-img portrait-base-character"
              loading="eager"
              decoding="sync"
            />

            {/* 2. Pre-mounted Screen Overlays: Zero DOM thrashing, zero GPU texture reload, instant crossfade */}
            {HERO_PROJECTS.map((proj, idx) => {
              const isActive = idx === activeIndex;
              return (
                <img
                  key={proj.id}
                  src={proj.portraitImg}
                  alt={`Scalebiz - Custom Web Architecture (${proj.name})`}
                  aria-hidden={!isActive}
                  className="portrait-img portrait-screen-overlay"
                  style={{
                    opacity: isActive ? 1 : 0,
                  }}
                  loading="eager"
                  decoding="async"
                />
              );
            })}
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
