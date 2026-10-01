"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

/* -------------------------------------------------------------------------- */
/* 4 CLEAN SVG ILLUSTRATIONS MAPPING TO USER'S 4 CORE POINTS                   */
/* -------------------------------------------------------------------------- */

/**
 * Point 1: Customers Can Find Your Business Easily on Google
 */
function GoogleDiscoveryArt() {
  return (
    <div className="pillar-art-container art-cyan" aria-hidden="true">
      <svg viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="pillar-svg-illustration">
        <defs>
          <radialGradient id="cyanGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>
        <circle cx="120" cy="60" r="50" fill="url(#cyanGlow)" />
        {/* Google Search Bar Simulation */}
        <rect x="42" y="24" width="156" height="30" rx="15" fill="#091424" stroke="url(#cyanGrad)" strokeWidth="1.8" />
        <circle cx="58" cy="39" r="6" stroke="#38bdf8" strokeWidth="2" />
        <line x1="62.5" y1="43.5" x2="68" y2="49" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
        <line x1="74" y1="39" x2="148" y2="39" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="182" cy="39" r="3.5" fill="#10b981" />
        {/* Map Pin & Verified Storefront */}
        <g className="pillar-art-float">
          {/* Map Pin */}
          <path
            d="M86 64C80.4772 64 76 68.4772 76 74C76 81.5 86 91 86 91C86 91 96 81.5 96 74C96 68.4772 91.5228 64 86 64Z"
            fill="#0369a1"
            stroke="#38bdf8"
            strokeWidth="1.5"
          />
          <circle cx="86" cy="73" r="3" fill="#ffffff" />
          {/* Verified Google Badge */}
          <rect x="104" y="68" width="94" height="22" rx="6" fill="#0c233c" stroke="#38bdf8" strokeWidth="1.2" />
          <text x="151" y="83" textAnchor="middle" fill="#e0f2fe" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">
            Google Verified ★ 4.9
          </text>
        </g>
      </svg>
    </div>
  );
}

/**
 * Point 2: You Don't Have to Answer Repetitive Questions
 */
function InquiryReliefArt() {
  return (
    <div className="pillar-art-container art-green" aria-hidden="true">
      <svg viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="pillar-svg-illustration">
        <defs>
          <radialGradient id="greenGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        <circle cx="120" cy="60" r="50" fill="url(#greenGlow)" />
        {/* Transparent Price & FAQ Card */}
        <rect x="50" y="22" width="140" height="76" rx="10" fill="#081c14" stroke="url(#greenGrad)" strokeWidth="1.6" />
        {/* 24/7 Answer Header */}
        <rect x="62" y="32" width="56" height="18" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="0.8" />
        <text x="90" y="44" textAnchor="middle" fill="#a7f3d0" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">
          FAQ 24/7 Active
        </text>
        <rect x="126" y="32" width="52" height="18" rx="4" fill="#042f2e" stroke="#10b981" strokeWidth="0.8" />
        <text x="152" y="44" textAnchor="middle" fill="#34d399" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">
          Menu & Prices
        </text>
        {/* Transparent Lines */}
        <line x1="64" y1="60" x2="148" y2="60" stroke="#6ee7b7" strokeWidth="2" strokeLinecap="round" />
        <line x1="64" y1="70" x2="128" y2="70" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
        {/* Client message: Ready to Pay (No questions needed) */}
        <g className="pillar-art-float">
          <rect x="110" y="74" width="94" height="22" rx="6" fill="#065f46" stroke="#34d399" strokeWidth="1.2" />
          <text x="157" y="89" textAnchor="middle" fill="#ecfdf5" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
            ✓ Ready to Pay
          </text>
        </g>
      </svg>
    </div>
  );
}

/**
 * Point 3: Customers Easily Book Appointments for Your Business
 */
function BookingAppointmentArt() {
  return (
    <div className="pillar-art-container art-blue" aria-hidden="true">
      <svg viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="pillar-svg-illustration">
        <defs>
          <radialGradient id="blueGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#037cfd" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#037cfd" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#037cfd" />
          </linearGradient>
        </defs>
        <circle cx="120" cy="60" r="50" fill="url(#blueGlow)" />
        {/* Calendar Base Card */}
        <rect x="54" y="20" width="132" height="80" rx="10" fill="#071526" stroke="url(#blueGrad)" strokeWidth="1.6" />
        {/* Calendar Header Bar */}
        <path d="M54 32C54 25.3726 59.3726 20 66 20H174C180.627 20 186 25.3726 186 32V36H54V32Z" fill="#037cfd" fillOpacity="0.25" />
        <circle cx="80" cy="20" r="2.5" fill="#38bdf8" />
        <circle cx="160" cy="20" r="2.5" fill="#38bdf8" />
        {/* Available Slot Chips */}
        <rect x="66" y="46" width="50" height="18" rx="4" fill="#0c233c" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.4" />
        <text x="91" y="58" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontWeight="600" fontFamily="sans-serif">
          09:00 AM
        </text>
        <rect x="124" y="46" width="50" height="18" rx="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.2" />
        <text x="149" y="58" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">
          01:30 PM ✓
        </text>
        {/* Deposit Secured Badge */}
        <g className="pillar-art-float">
          <rect x="74" y="74" width="92" height="20" rx="5" fill="#0b2440" stroke="#38bdf8" strokeWidth="1" />
          <path d="M84 84C84 82.5 85 81.5 86.5 81.5H89.5C91 81.5 92 82.5 92 84V86H84V84Z" stroke="#38bdf8" strokeWidth="1" />
          <rect x="83" y="86" width="10" height="7" rx="1.5" fill="#037cfd" />
          <text x="134" y="88" textAnchor="middle" fill="#e0f2fe" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">
            Deposit Secured ✓
          </text>
        </g>
      </svg>
    </div>
  );
}

/**
 * Point 4: You Can Make a Membership System for CRM and Repeat Orders
 */
function MembershipCrmArt() {
  return (
    <div className="pillar-art-container art-amber" aria-hidden="true">
      <svg viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="pillar-svg-illustration">
        <defs>
          <radialGradient id="amberGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>
        <circle cx="120" cy="60" r="50" fill="url(#amberGlow)" />
        {/* Connecting customer nodes */}
        <line x1="72" y1="44" x2="120" y2="60" stroke="#f59e0b" strokeWidth="1.4" strokeDasharray="3 3" opacity="0.6" />
        <line x1="168" y1="44" x2="120" y2="60" stroke="#f59e0b" strokeWidth="1.4" strokeDasharray="3 3" opacity="0.6" />
        {/* Client node 1 */}
        <circle cx="72" cy="44" r="13" fill="#181308" stroke="#f59e0b" strokeWidth="1.4" />
        <text x="72" y="48" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
          JD
        </text>
        {/* Client node 2 */}
        <circle cx="168" cy="44" r="13" fill="#181308" stroke="#f59e0b" strokeWidth="1.4" />
        <text x="168" y="48" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
          SM
        </text>
        {/* VIP Membership Center Card */}
        <rect x="94" y="42" width="52" height="34" rx="6" fill="#241706" stroke="url(#amberGrad)" strokeWidth="1.8" />
        <text x="120" y="56" textAnchor="middle" fill="#fbbf24" fontSize="7.5" fontWeight="900" fontFamily="sans-serif">
          VIP CLUB
        </text>
        <text x="120" y="67" textAnchor="middle" fill="#fde68a" fontSize="6.5" fontWeight="600" fontFamily="monospace">
          CRM PASS
        </text>
        {/* Repeat Orders / Promo Trigger Pill */}
        <g className="pillar-art-float">
          <rect x="65" y="88" width="110" height="20" rx="5" fill="#1d1305" stroke="#f59e0b" strokeWidth="1" />
          <text x="120" y="102" textAnchor="middle" fill="#fde68a" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">
            ⚡ Repeat Order Machine
          </text>
        </g>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* DATA KONFIGURASI PILAR LAYANAN (100% PERSIS DENGAN 4 POIN PENGGUNA)        */
/* -------------------------------------------------------------------------- */

interface PillarItem {
  number: string;
  badge: { en: string; id: string };
  badgeColor: string;
  iconColor: string;
  lineClass: string;
  title: { en: string; id: string };
  tagline: { en: string; id: string };
  art: React.ReactNode;
  points: {
    solution: { en: string; id: string };
    benefit: { en: string; id: string };
  };
  bottomPill: { en: string; id: string };
}

const PILLARS_CONFIG: PillarItem[] = [
  {
    number: "01",
    badge: { en: "Google Discovery", id: "Penemuan Google" },
    badgeColor: "badge-cyan",
    iconColor: "#38bdf8",
    lineClass: "line-cyan",
    title: {
      en: "Customer Can Find Your Business Easily on Google",
      id: "Pelanggan Mudah Menemukan Bisnis Anda di Google",
    },
    tagline: {
      en: "Show up front and center when locals search for your services, complete with verified proof and reviews.",
      id: "Muncul di posisi terdepan saat pelanggan lokal mencari layanan Anda di Google, lengkap dengan ulasan resmi.",
    },
    art: <GoogleDiscoveryArt />,
    points: {
      solution: {
        en: "Official Google visibility and verified local presence",
        id: "Profil bisnis resmi teroptimasi penemuan lokal Google",
      },
      benefit: {
        en: "Be the first business local clients see before competitors",
        id: "Jadi pilihan utama yang dilihat pelanggan sebelum kompetitor",
      },
    },
    bottomPill: {
      en: "Get Found by Paying Clients on Google",
      id: "Mudah Ditemukan Pelanggan di Google",
    },
  },
  {
    number: "02",
    badge: { en: "Instant Answers 24/7", id: "Jawaban Otomatis 24/7" },
    badgeColor: "badge-green",
    iconColor: "#10b981",
    lineClass: "line-green",
    title: {
      en: "You Don't Have to Answer Repetitive Questions",
      id: "Anda Tidak Perlu Menjawab Pertanyaan Berulang",
    },
    tagline: {
      en: "Your pricing guidelines, service menu, and FAQ answer customer questions automatically 24/7.",
      id: "Menu harga transparan, rincian layanan, dan FAQ menjawab pertanyaan calon pelanggan otomatis 24/7.",
    },
    art: <InquiryReliefArt />,
    points: {
      solution: {
        en: "Transparent pricing guidelines & complete FAQ online 24/7",
        id: "Menu harga transparan & FAQ lengkap aktif online 24/7",
      },
      benefit: {
        en: "Saves 2+ hours daily of answering the same questions manually",
        id: "Hemat 2+ jam setiap hari tanpa repot jawab berulang di chat",
      },
    },
    bottomPill: {
      en: "Saves You 2+ Hours Every Day",
      id: "Hemat 2+ Jam Kerja Tiap Hari",
    },
  },
  {
    number: "03",
    badge: { en: "Hands-Free Booking", id: "Booking & Janji Temu" },
    badgeColor: "badge-blue",
    iconColor: "#037cfd",
    lineClass: "line-blue",
    title: {
      en: "Customer Easy to Booking & Appointment To Your Business",
      id: "Pelanggan Mudah Booking & Buat Janji Temu",
    },
    tagline: {
      en: "Clients pick available slots directly on your site, lock in upfront deposits, and receive automated reminders.",
      id: "Pelanggan memilih slot jam janji temu sendiri 24/7, kunci uang muka, dan terima SMS pengingat otomatis.",
    },
    art: <BookingAppointmentArt />,
    points: {
      solution: {
        en: "Live-synced online booking calendar with upfront deposit protection",
        id: "Kalender booking mandiri tersinkronisasi ketersediaan nyata",
      },
      benefit: {
        en: "Zero double-booking chaos and zero no-show cancellations",
        id: "Nol drama jadwal bentrok & kunci uang muka (DP) di awal",
      },
    },
    bottomPill: {
      en: "Your Calendar Fills Itself 24/7",
      id: "Kalender Terisi Otomatis 24/7",
    },
  },
  {
    number: "04",
    badge: { en: "Membership & CRM", id: "Membership & Repeat Order" },
    badgeColor: "badge-amber",
    iconColor: "#f59e0b",
    lineClass: "line-amber",
    title: {
      en: "You Can Make Membership System For CRM and Repeat Order",
      id: "Buat Sistem Membership untuk CRM & Repeat Order",
    },
    tagline: {
      en: "Own your private customer database, issue VIP membership perks, and send promo offers anytime you need work.",
      id: "Miliki database pelanggan pribadi, buat kartu membership VIP, dan kirim promo kilat kapan saja saat sepi.",
    },
    art: <MembershipCrmArt />,
    points: {
      solution: {
        en: "100% private customer database (CRM) & VIP membership tiers",
        id: "Database pelanggan pribadi (CRM) & sistem membership eksklusif",
      },
      benefit: {
        en: "Use customer data for email marketing & promo campaigns to drive repeat orders and brand loyalty",
        id: "Gunakan database pelanggan untuk email marketing & promo demi repeat order dan loyalitas brand",
      },
    },
    bottomPill: {
      en: "Turn One-Time Clients into Repeat Revenue",
      id: "Ubah Pelanggan 1x Jadi Omzet Berulang",
    },
  },
];

export default function ServicePillars() {
  const { lang } = useLanguage();
  const currentLang = lang === "id" ? "id" : "en";

  return (
    <section id="services" className="service-pillars-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="solutions-eyebrow-badge">
            <span className="eyebrow-dot" />
            <span>
              {currentLang === "id"
                ? "BUKAN SEKADAR WEBSITE — INI MESIN OTOMASI BISNIS ANDA"
                : "NOT JUST A WEBSITE — YOUR 24/7 AUTOMATED BUSINESS ENGINE"}
            </span>
          </div>

          <h2 className="section-title pillars-main-title">
            {currentLang === "id"
              ? "Berhenti Buang Waktu untuk Tugas Manual. Biarkan Sistem Bekerja."
              : "Stop Wasting Hours on Manual Tasks. Let Your System Work for You."}
          </h2>

          <p className="section-desc pillars-subtitle">
            {currentLang === "id"
              ? "Website bukan sekadar brosur digital pasif. Kami menanamkan alur kerja otomatis yang menjawab pertanyaan berulang, menghilangkan kekacauan jadwal, dan menghasilkan pelanggan setia secara autopilot."
              : "Websites shouldn't just sit there like a digital flyer. We embed automated workflows that answer repetitive questions, stop booking chaos, and drive repeat revenue without lifting a finger."}
          </p>

          {/* Quick Value Badges */}
          <div className="pillars-value-tags">
            <span className="pillar-tag-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{currentLang === "id" ? "Hemat 2–3 Jam Setiap Hari" : "Saves 2–3 Hours Every Day"}</span>
            </span>

            <span className="pillar-tag-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
              <span>{currentLang === "id" ? "Disesuaikan 100% Alur Kerja Bisnis" : "100% Customized to Your Workflow"}</span>
            </span>

            <span className="pillar-tag-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>{currentLang === "id" ? "Gratis Maintenance Selama Website Aktif" : "Free Maintenance While Website Active"}</span>
            </span>
          </div>
        </div>

        {/* 4 Pillars Grid (SIMPEL, ELEGAN & PERSIS DENGAN 4 POIN INTI) */}
        <div className="pillars-cards-grid">
          {PILLARS_CONFIG.map((p, idx) => (
            <div key={idx} className="pillar-feature-card">
              <div className={`pillar-card-accent-line ${p.lineClass}`} aria-hidden="true" />

              {/* Card Meta Top */}
              <div className="pillar-card-top">
                <span className="pillar-card-num">{p.number}</span>
                <span className={`pillar-card-badge ${p.badgeColor}`}>{p.badge[currentLang]}</span>
              </div>

              {/* Visual SVG Graphic */}
              {p.art}

              {/* Title & Concise Tagline */}
              <h3 className="pillar-card-title">{p.title[currentLang]}</h3>
              <p className="pillar-card-tagline">{p.tagline[currentLang]}</p>

              {/* 2 Simple Concise Points */}
              <div className="pillar-clean-points">
                <div className="clean-point-row">
                  <span className="clean-point-bullet bullet-solution">✓</span>
                  <div className="clean-point-content">
                    <strong className="clean-point-label">{currentLang === "id" ? "Solusi: " : "Solution: "}</strong>
                    <span>{p.points.solution[currentLang]}</span>
                  </div>
                </div>

                <div className="clean-point-row">
                  <span className="clean-point-bullet bullet-benefit">★</span>
                  <div className="clean-point-content">
                    <strong className="clean-point-label">{currentLang === "id" ? "Manfaat: " : "Benefit: "}</strong>
                    <span>{p.points.benefit[currentLang]}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Result Pill */}
              <div className="pillar-card-footer">
                <div className={`pillar-benefit-pill ${p.badgeColor.replace("badge-", "pill-")}`}>
                  <span>{p.bottomPill[currentLang]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
