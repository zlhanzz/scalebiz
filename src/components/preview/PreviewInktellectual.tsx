"use client";

import React, { useState } from "react";
import Image from "next/image";
import { INKTELLECTUAL_DATA, TattooArtist, PortfolioPiece } from "@/data/inktellectualData";
import {
  IconQuill,
  IconGlasses,
  IconNeedle,
  IconShieldMedical,
  IconCalendar,
  IconCalculator,
  IconGraduationCap,
  IconSparkles,
  IconMapPin,
  IconPhone,
  IconArrowRight,
  IconClose,
  IconCheck,
  IconStar,
  IconClock,
  IconMenu
} from "./inktellectual/InktellectualIcons";
import { InktellectualEstimatorModal } from "./inktellectual/InktellectualEstimatorModal";
import { InktellectualBookingModal } from "./inktellectual/InktellectualBookingModal";
import { InktellectualVoucherModal } from "./inktellectual/InktellectualVoucherModal";

export const PreviewInktellectual: React.FC = () => {
  // Modal states
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isVoucherOpen, setIsVoucherOpen] = useState(false);
  const [bookingArtistId, setBookingArtistId] = useState<string | undefined>(undefined);
  const [bookingStyle, setBookingStyle] = useState<string | undefined>(undefined);
  const [bookingSize, setBookingSize] = useState<string | undefined>(undefined);

  // Mobile menu drawer
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Portfolio & Artist filter states
  const [activeArtistFilter, setActiveArtistFilter] = useState<string>("all");
  const [activePortfolioFilter, setActivePortfolioFilter] = useState<string>("all");
  const [selectedWork, setSelectedWork] = useState<PortfolioPiece | null>(null);

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const openBookingForArtist = (artistId?: string) => {
    setBookingArtistId(artistId);
    setIsBookingOpen(true);
  };

  const handleBookWithEstimate = (artistId: string, style: string, size: string) => {
    setBookingArtistId(artistId);
    setBookingStyle(style);
    setBookingSize(size);
    setIsBookingOpen(true);
  };

  // Filtered lists
  const filteredArtists =
    activeArtistFilter === "all"
      ? INKTELLECTUAL_DATA.artists
      : INKTELLECTUAL_DATA.artists.filter((a) =>
          a.styles.some((s) => s.toLowerCase().includes(activeArtistFilter.toLowerCase()))
        );

  const filteredPortfolio =
    activePortfolioFilter === "all"
      ? INKTELLECTUAL_DATA.portfolio
      : INKTELLECTUAL_DATA.portfolio.filter((p) => p.category === activePortfolioFilter);

  return (
    <div
      style={{
        backgroundColor: "#09090C",
        color: "#E2E2E8",
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        position: "relative",
        overflowX: "hidden"
      }}
    >
      <style>{`
        :root {
          --gold-primary: #D4AF37;
          --gold-light: #F3E5AB;
          --gold-dark: #997B28;
          --bg-dark: #09090C;
          --card-bg: #111116;
          --card-border: rgba(212, 175, 55, 0.2);
        }
        
        .gold-gradient-text {
          background: linear-gradient(135deg, #F6E6B4 0%, #D4AF37 50%, #AA820A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .gold-border-glow {
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.15);
        }

        .gold-border-glow:hover {
          box-shadow: 0 0 30px rgba(212, 175, 55, 0.3);
          border-color: rgba(212, 175, 55, 0.5) !important;
        }

        .nav-link {
          color: #A6A6B4;
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 500;
          white-space: nowrap !important;
          transition: color 0.2s ease;
          padding: 6px 10px;
        }
        .nav-link:hover {
          color: #D4AF37;
        }

        @keyframes pulseSlow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.05); }
        }

        @media (max-width: 1140px) {
          .desktop-nav-menu,
          .desktop-header-ctas {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }

        @media (min-width: 1141px) {
          .mobile-menu-btn {
            display: none !important;
          }
          .mobile-drawer-overlay {
            display: none !important;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 36px 18px 60px !important;
          }
          .hero-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 20px !important;
          }
          .hero-content {
            display: contents !important;
          }
          .hero-heading-block {
            order: 1 !important;
          }
          .hero-media {
            order: 2 !important;
            margin-bottom: 4px !important;
            width: 100% !important;
          }
          .hero-trust-metrics {
            order: 3 !important;
            margin-bottom: 16px !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 0 !important;
            padding: 12px 6px !important;
            text-align: center !important;
          }
          .hero-trust-metrics > div {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 0 4px !important;
          }
          .hero-trust-metrics > div:not(:last-child) {
            border-right: 1px solid rgba(255, 255, 255, 0.1) !important;
          }
          .hero-trust-metrics > div:last-child {
            border-right: none !important;
          }
          .desktop-stars {
            display: none !important;
          }
          .desktop-only-text {
            display: none !important;
          }
          .hero-action-buttons {
            order: 4 !important;
            display: flex !important;
            flex-direction: column !important;
            width: 100% !important;
            gap: 12px !important;
          }
          .hero-action-buttons button {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
            padding: 15px 20px !important;
            font-size: 0.95rem !important;
            box-sizing: border-box !important;
          }
          .student-special-container {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            gap: 18px !important;
            padding: 22px 18px !important;
          }
          .student-special-img {
            margin: 0 auto !important;
            width: 140px !important;
            height: 140px !important;
          }
          .student-special-tag {
            justify-content: center !important;
          }
          .student-special-btn {
            width: 100% !important;
            justify-content: center !important;
          }
          .mobile-sticky-bar {
            display: flex !important;
          }
          .page-footer-padding {
            padding-bottom: 90px !important;
          }
          .status-bar-container {
            justify-content: center !important;
            text-align: center !important;
          }
        }
      `}</style>

      {/* TOP PITCH NOTICE BAR (ScaleBiz Pitch Bar) */}
      <div
        style={{
          backgroundColor: "#16161C",
          borderBottom: "1px solid rgba(212, 175, 55, 0.3)",
          padding: "8px 16px",
          fontSize: "0.78rem",
          color: "#D4AF37",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "8px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ backgroundColor: "#D4AF37", color: "#000", fontWeight: 700, padding: "2px 8px", borderRadius: "4px", fontSize: "0.7rem" }}>
            LIVE PREVIEW
          </span>
          <span>
            Bespoke interactive concept crafted for <strong>Inktellectual Tattoo</strong> (408 Amherst St, Buffalo NY).
          </span>
        </div>
      </div>

      {/* EMERGENCY / LIVE STATUS BAR */}
      <div
        className="status-bar-container"
        style={{
          backgroundColor: "rgba(10, 10, 14, 0.95)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "6px 20px",
          fontSize: "0.78rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#22C55E",
              display: "inline-block",
              boxShadow: "0 0 8px #22C55E"
            }}
          />
          <span style={{ color: "#E0E0E6", fontWeight: 500 }}>
            🟢 Walk-Ins Welcome Today (12:00 PM – 8:00 PM)
          </span>
          <span style={{ color: "#777782" }}>•</span>
          <span style={{ color: "#D4AF37", fontWeight: 600 }}>
            3 Mins from Buffalo State University
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px", margin: "0 auto" }}>
          <a
            href={`tel:${INKTELLECTUAL_DATA.cleanPhone}`}
            style={{
              color: "#D4AF37",
              textDecoration: "none",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <IconPhone size={14} />
            <span>(716) 226-1167</span>
          </a>
        </div>
      </div>

      {/* MAIN STICKY HEADER */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "rgba(9, 9, 12, 0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(212, 175, 55, 0.25)",
          padding: "12px 24px"
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px"
          }}
        >
          {/* Logo & Brand Identity */}
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
              flexShrink: 0
            }}
          >
            <img
              src="/images/demo/inktellectual/logo-mark.png"
              alt="Inktellectual Tattoo Logo"
              style={{
                height: "38px",
                width: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 2px 6px rgba(212, 175, 55, 0.3))"
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  fontFamily: "Georgia, serif",
                  letterSpacing: "0.04em",
                  color: "#FFFFFF",
                  lineHeight: 1.1
                }}
              >
                Inktellectual
              </span>
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  color: "#D4AF37",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase"
                }}
              >
                Tattoo Atelier • est. 2016
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Strictly nowrap) */}
          <nav
            className="desktop-nav-menu"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "nowrap"
            }}
          >
            <a href="#artists" className="nav-link">Artists</a>
            <a href="#portfolio" className="nav-link">Portfolio</a>
            <a href="#student-special" className="nav-link" style={{ color: "#F3E5AB" }}>Buff State Special</a>
            <a href="#hygiene" className="nav-link">Sterile Standards</a>
            <a href="#faq" className="nav-link">FAQ & Location</a>
          </nav>

          {/* Header Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            {/* Desktop Action CTAs */}
            <div className="desktop-header-ctas" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                onClick={() => setIsEstimatorOpen(true)}
                style={{
                  backgroundColor: "rgba(212, 175, 55, 0.12)",
                  border: "1px solid rgba(212, 175, 55, 0.4)",
                  color: "#D4AF37",
                  padding: "7px 11px",
                  borderRadius: "8px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  whiteSpace: "nowrap"
                }}
              >
                <IconCalculator size={15} />
                <span>Estimate</span>
              </button>

              <button
                onClick={() => openBookingForArtist()}
                style={{
                  backgroundColor: "#D4AF37",
                  border: "none",
                  color: "#09090C",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  whiteSpace: "nowrap",
                  boxShadow: "0 2px 10px rgba(212, 175, 55, 0.35)"
                }}
              >
                <span>Book Consult</span>
                <IconArrowRight size={13} />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Open mobile navigation"
              style={{
                backgroundColor: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#FFFFFF",
                padding: "8px",
                borderRadius: "8px",
                cursor: "pointer",
                display: "none"
              }}
            >
              <IconMenu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div
          className="mobile-drawer-overlay"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "flex-end"
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            style={{
              width: "280px",
              height: "100%",
              backgroundColor: "#111116",
              borderLeft: "1px solid rgba(212, 175, 55, 0.3)",
              padding: "24px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "20px"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 700, color: "#D4AF37", fontFamily: "Georgia, serif" }}>Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ background: "transparent", border: "none", color: "#FFF", cursor: "pointer" }}
              >
                <IconClose size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <a href="#artists" onClick={() => setIsMobileMenuOpen(false)} style={{ color: "#E0E0E6", textDecoration: "none", fontSize: "1rem", fontWeight: 500 }}>
                Resident Artists (6 Specialists)
              </a>
              <a href="#portfolio" onClick={() => setIsMobileMenuOpen(false)} style={{ color: "#E0E0E6", textDecoration: "none", fontSize: "1rem", fontWeight: 500 }}>
                Portfolio Gallery
              </a>
              <a href="#student-special" onClick={() => setIsMobileMenuOpen(false)} style={{ color: "#F3E5AB", textDecoration: "none", fontSize: "1rem", fontWeight: 600 }}>
                🎓 Buff State $20 OFF Special
              </a>
              <a href="#hygiene" onClick={() => setIsMobileMenuOpen(false)} style={{ color: "#E0E0E6", textDecoration: "none", fontSize: "1rem", fontWeight: 500 }}>
                Sterile Medical Standards
              </a>
              <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} style={{ color: "#E0E0E6", textDecoration: "none", fontSize: "1rem", fontWeight: 500 }}>
                FAQ & Directions
              </a>
            </div>

            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsEstimatorOpen(true);
                }}
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(212, 175, 55, 0.15)",
                  color: "#D4AF37",
                  border: "1px solid #D4AF37",
                  fontWeight: 600,
                  fontSize: "0.9rem"
                }}
              >
                Estimate Tattoo Price
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openBookingForArtist();
                }}
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  backgroundColor: "#D4AF37",
                  color: "#000",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "0.9rem"
                }}
              >
                Book Consultation
              </button>
              <a
                href={`tel:${INKTELLECTUAL_DATA.cleanPhone}`}
                style={{
                  padding: "10px",
                  textAlign: "center",
                  color: "#A0A0AA",
                  textDecoration: "none",
                  fontSize: "0.85rem"
                }}
              >
                📞 {INKTELLECTUAL_DATA.phone}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section
        className="hero-section"
        style={{
          position: "relative",
          padding: "60px 24px 80px",
          background: "radial-gradient(ellipse at 50% 10%, rgba(212, 175, 55, 0.12) 0%, rgba(9, 9, 12, 1) 70%)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)"
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "48px",
            alignItems: "center"
          }}
          className="hero-grid"
        >
          {/* Hero Content Left */}
          <div className="hero-content">
            {/* Heading Block */}
            <div className="hero-heading-block">
              {/* Heritage Badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  borderRadius: "30px",
                  backgroundColor: "rgba(212, 175, 55, 0.1)",
                  border: "1px solid rgba(212, 175, 55, 0.3)",
                  marginBottom: "20px"
                }}
              >
                <IconQuill size={16} style={{ color: "#D4AF37" }} />
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#D4AF37", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Buffalo's Custom Tattoo Collective • est. 2016
                </span>
              </div>

              {/* Headline */}
              <h1
                style={{
                  margin: "0 0 18px",
                  fontSize: "clamp(2.3rem, 5vw, 3.6rem)",
                  fontWeight: 800,
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  lineHeight: 1.12,
                  color: "#FFFFFF",
                  letterSpacing: "-0.01em"
                }}
              >
                Fine Art. Sterile Precision.{" "}
                <span className="gold-gradient-text" style={{ display: "inline-block" }}>
                  Lifelong Ink.
                </span>
              </h1>

              {/* Subheadline (Marketing Copy) */}
              <p
                style={{
                  margin: "0 0 28px",
                  fontSize: "1.05rem",
                  lineHeight: 1.6,
                  color: "#B4B4BE",
                  maxWidth: "600px"
                }}
              >
                Buffalo's collaborative atelier of six specialized resident artists on Amherst Street.
                From micro-fine botanical linework and surgical black & grey realism to heavy coverups and precision piercing—we craft bespoke body art engineered to age flawlessly.
              </p>
            </div>

            {/* Key Trust Metrics (3-column horizontal grid, Hospital Grade fits perfectly) */}
            <div
              className="hero-trust-metrics"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "12px",
                marginBottom: "32px",
                padding: "14px 18px",
                borderRadius: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                maxWidth: "580px"
              }}
            >
              <div style={{ paddingRight: "8px", borderRight: "1px solid rgba(255, 255, 255, 0.1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2px", color: "#FACC15" }}>
                  <span className="desktop-stars" style={{ display: "inline-flex", gap: "2px" }}>
                    {[...Array(4)].map((_, i) => (
                      <IconStar key={i} size={13} />
                    ))}
                  </span>
                  <IconStar size={13} />
                  <span style={{ fontWeight: 700, color: "#FFF", fontSize: "0.92rem", marginLeft: "2px" }}>4.9/5</span>
                </div>
                <div style={{ fontSize: "0.72rem", color: "#8E8E98", marginTop: "2px" }}>
                  Over 350+ Clients
                </div>
              </div>
              <div style={{ paddingLeft: "4px", paddingRight: "8px", borderRight: "1px solid rgba(255, 255, 255, 0.1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <div style={{ fontWeight: 700, color: "#FFFFFF", fontSize: "0.92rem" }}>
                  6 <span className="desktop-only-text">Resident </span>Artisans
                </div>
                <div style={{ fontSize: "0.72rem", color: "#8E8E98", marginTop: "2px" }}>
                  Disciplines
                </div>
              </div>
              <div style={{ paddingLeft: "4px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <div style={{ fontWeight: 700, color: "#4ADE80", fontSize: "0.92rem" }}>
                  Hospital Grade
                </div>
                <div style={{ fontSize: "0.72rem", color: "#8E8E98", marginTop: "2px" }}>
                  100% Sterile EO
                </div>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="hero-action-buttons" style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}>
              <button
                onClick={() => openBookingForArtist()}
                style={{
                  padding: "15px 28px",
                  borderRadius: "10px",
                  backgroundColor: "#D4AF37",
                  color: "#09090C",
                  fontSize: "1rem",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow: "0 6px 20px rgba(212, 175, 55, 0.4)",
                  transition: "all 0.2s ease"
                }}
              >
                <span>Book Free Consultation</span>
                <IconArrowRight size={18} />
              </button>

              <button
                onClick={() => setIsEstimatorOpen(true)}
                style={{
                  padding: "15px 24px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  color: "#FFFFFF",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  border: "1px solid rgba(212, 175, 55, 0.35)",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <IconCalculator size={18} style={{ color: "#D4AF37" }} />
                <span>Estimate Custom Tattoo</span>
              </button>
            </div>
          </div>

          {/* Hero Media Right (Storefront & Team) */}
          <div className="hero-media" style={{ position: "relative" }}>
            <div
              className="gold-border-glow"
              style={{
                position: "relative",
                borderRadius: "18px",
                overflow: "hidden",
                border: "1.5px solid rgba(212, 175, 55, 0.4)",
                backgroundColor: "#111116",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)"
              }}
            >
              <img
                src="/images/demo/inktellectual/storefront-team.jpg"
                alt="Inktellectual Tattoo Collective at 408 Amherst St"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(9, 9, 12, 0) 60%, rgba(9, 9, 12, 0.95) 100%)"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  right: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, color: "#FFFFFF", fontSize: "1rem" }}>
                    The Inktellectual Crew
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#D4AF37" }}>
                    408 Amherst St, Buffalo NY (Black Rock)
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    border: "1px solid rgba(212, 175, 55, 0.4)",
                    borderRadius: "20px",
                    padding: "4px 12px",
                    fontSize: "0.72rem",
                    color: "#FFF",
                    fontWeight: 600
                  }}
                >
                  Walk-Ins Welcome
                </div>
              </div>
            </div>

            {/* Floating student highlight badge */}
            <div
              onClick={() => setIsVoucherOpen(true)}
              style={{
                position: "absolute",
                top: "-14px",
                right: "-10px",
                backgroundColor: "#16161C",
                border: "1.5px solid #D4AF37",
                borderRadius: "12px",
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.7)",
                cursor: "pointer",
                transition: "transform 0.2s"
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(212, 175, 55, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#D4AF37"
                }}
              >
                <IconGraduationCap size={18} />
              </div>
              <div>
                <div style={{ fontSize: "0.7rem", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase" }}>
                  Buff State Bengals
                </div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#FFFFFF" }}>
                  $20 OFF with Student ID
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUFFALO STATE STUDENT SPECIAL BANNER */}
      <section
        id="student-special"
        style={{
          padding: "36px 24px",
          backgroundColor: "#0D0D12",
          borderBottom: "1px solid rgba(212, 175, 55, 0.25)"
        }}
      >
        <div
          className="student-special-container"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            background: "linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(20, 20, 26, 0.9) 100%)",
            borderRadius: "16px",
            border: "1.5px solid rgba(212, 175, 55, 0.4)",
            padding: "24px 30px",
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            gap: "24px",
            alignItems: "center"
          }}
        >
          <img
            src="/images/demo/inktellectual/buff-state-special.jpg"
            alt="Buffalo State Student Special $20 Off"
            className="student-special-img"
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "12px",
              objectFit: "cover",
              border: "1px solid #D4AF37"
            }}
          />
          <div>
            <div className="student-special-tag" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#D4AF37", fontSize: "0.76rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
              <IconGraduationCap size={14} />
              <span>Campus Neighbor Advantage • 3 Min From Buffalo State</span>
            </div>
            <h3 style={{ margin: "0 0 6px", fontSize: "1.4rem", color: "#FFFFFF", fontFamily: "Georgia, serif" }}>
              Buffalo State Student Special: $20 OFF Any Session
            </h3>
            <p style={{ margin: 0, fontSize: "0.88rem", color: "#A8A8B4", lineHeight: 1.4 }}>
              Ready for fresh ink or your next flash piece? Flash your valid Buffalo State University (or any WNY college) Student ID at our 408 Amherst St desk and instantly take $20 off.
            </p>
          </div>
          <button
            onClick={() => setIsVoucherOpen(true)}
            className="student-special-btn"
            style={{
              padding: "12px 20px",
              borderRadius: "10px",
              backgroundColor: "#D4AF37",
              color: "#0B0B0E",
              fontSize: "0.9rem",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 14px rgba(212, 175, 55, 0.3)"
            }}
          >
            Claim $20 Pass
          </button>
        </div>
      </section>

      {/* RESIDENT ARTISTS SECTION */}
      <section
        id="artists"
        style={{
          padding: "80px 24px",
          maxWidth: "1280px",
          margin: "0 auto"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "#D4AF37",
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "10px"
            }}
          >
            <IconNeedle size={16} />
            <span>Master Craftsmen & Piercers</span>
          </div>
          <h2
            style={{
              margin: "0 0 14px",
              fontSize: "clamp(1.9rem, 3.5vw, 2.7rem)",
              fontFamily: "Georgia, serif",
              color: "#FFFFFF"
            }}
          >
            Meet the Inktellectual Collective
          </h2>
          <p style={{ margin: "0 auto", fontSize: "1rem", color: "#A0A0AA", maxWidth: "680px" }}>
            No jack-of-all-trades guesswork. Our studio brings six resident artisans together under one roof, each dedicated to mastering a specific tattoo discipline.
          </p>
        </div>

        {/* Artist Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "28px"
          }}
        >
          {INKTELLECTUAL_DATA.artists.map((artist) => (
            <div
              key={artist.id}
              className="gold-border-glow"
              style={{
                backgroundColor: "#111116",
                borderRadius: "16px",
                border: "1px solid rgba(212, 175, 55, 0.25)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.25s ease"
              }}
            >
              {/* Card Header with Artist & Sample Work */}
              <div style={{ position: "relative", height: "240px", backgroundColor: "#0A0A0E" }}>
                {/* Sample Work Background */}
                <img
                  src={artist.sampleWorkImage}
                  alt={artist.sampleWorkTitle}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: 0.75
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(9, 9, 12, 0.2) 0%, rgba(17, 17, 22, 0.95) 100%)"
                  }}
                />

                {/* Badges & Rate Flex Container */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    right: "12px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "8px",
                    flexWrap: "wrap",
                    zIndex: 2
                  }}
                >
                  {artist.badge ? (
                    <div
                      style={{
                        padding: "4px 8px",
                        borderRadius: "6px",
                        backgroundColor: "rgba(0, 0, 0, 0.85)",
                        border: "1px solid #D4AF37",
                        color: "#D4AF37",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em"
                      }}
                    >
                      {artist.badge}
                    </div>
                  ) : <div />}

                  <div
                    style={{
                      padding: "4px 8px",
                      borderRadius: "6px",
                      backgroundColor: "rgba(0, 0, 0, 0.85)",
                      border: "1px solid rgba(212, 175, 55, 0.3)",
                      color: "#FFF",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      marginLeft: "auto"
                    }}
                  >
                    {artist.startingRate}
                  </div>
                </div>

                {/* Artist Portrait Overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-24px",
                    left: "20px",
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "14px"
                  }}
                >
                  <img
                    src={artist.portraitImage}
                    alt={artist.name}
                    style={{
                      width: "68px",
                      height: "68px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2.5px solid #D4AF37",
                      boxShadow: "0 4px 14px rgba(0, 0, 0, 0.8)",
                      backgroundColor: "#111"
                    }}
                  />
                  <div style={{ marginBottom: "28px" }}>
                    <h3 style={{ margin: 0, fontSize: "1.25rem", color: "#FFFFFF", fontFamily: "Georgia, serif" }}>
                      {artist.name}
                    </h3>
                    <div style={{ fontSize: "0.78rem", color: "#D4AF37", fontWeight: 500 }}>
                      {artist.title}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: "36px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
                {/* Styles Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
                  {artist.styles.map((styleName, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: "3px 8px",
                        borderRadius: "4px",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        color: "#C2C2CC",
                        fontSize: "0.72rem"
                      }}
                    >
                      {styleName}
                    </span>
                  ))}
                </div>

                <p style={{ margin: "0 0 18px", fontSize: "0.85rem", color: "#9E9EAA", lineHeight: 1.5, flex: 1 }}>
                  {artist.bio}
                </p>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
                  <button
                    onClick={() => openBookingForArtist(artist.id)}
                    style={{
                      flex: 1,
                      padding: "10px 14px",
                      borderRadius: "8px",
                      backgroundColor: "#D4AF37",
                      color: "#09090C",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px"
                    }}
                  >
                    <span>Consult with {artist.name.split(" ")[0]}</span>
                    <IconArrowRight size={14} />
                  </button>
                  <button
                    onClick={() => {
                      setActivePortfolioFilter("all");
                      const el = document.getElementById("portfolio");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "8px",
                      backgroundColor: "transparent",
                      color: "#A0A0AA",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      fontSize: "0.82rem",
                      cursor: "pointer"
                    }}
                  >
                    View Flash
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO GALLERY */}
      <section
        id="portfolio"
        style={{
          padding: "80px 24px",
          backgroundColor: "#0C0C10",
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)"
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "#D4AF37",
                fontSize: "0.8rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "10px"
              }}
            >
              <IconSparkles size={16} />
              <span>Cured Healed Results & Fresh Ink</span>
            </div>
            <h2
              style={{
                margin: "0 0 12px",
                fontSize: "clamp(1.9rem, 3.5vw, 2.7rem)",
                fontFamily: "Georgia, serif",
                color: "#FFFFFF"
              }}
            >
              Featured Works Archive
            </h2>
            <p style={{ margin: "0 auto", fontSize: "0.95rem", color: "#A0A0AA", maxWidth: "600px" }}>
              Explore authentic pieces executed right inside our Amherst St studio. Click any piece to inspect line weights and artist attribution.
            </p>

            {/* Filter Tabs */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                flexWrap: "wrap",
                marginTop: "24px"
              }}
            >
              {[
                { id: "all", label: "All Masterpieces" },
                { id: "realism", label: "Black & Grey Realism" },
                { id: "fineline", label: "Fine-Line & Floral" },
                { id: "color", label: "Saturated Color" },
                { id: "blackwork", label: "Blackwork & Script" },
                { id: "neotrad", label: "Neo-Traditional" }
              ].map((tab) => {
                const active = tab.id === activePortfolioFilter;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActivePortfolioFilter(tab.id)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "20px",
                      backgroundColor: active ? "#D4AF37" : "rgba(255, 255, 255, 0.04)",
                      border: active ? "1px solid #D4AF37" : "1px solid rgba(255, 255, 255, 0.1)",
                      color: active ? "#09090C" : "#A6A6B2",
                      fontSize: "0.82rem",
                      fontWeight: active ? 700 : 500,
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Portfolio Masonry / Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "16px"
            }}
          >
            {filteredPortfolio.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedWork(item)}
                style={{
                  position: "relative",
                  borderRadius: "12px",
                  overflow: "hidden",
                  aspectRatio: "3 / 4",
                  cursor: "pointer",
                  backgroundColor: "#16161C",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  transition: "transform 0.2s ease, border-color 0.2s ease"
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, transparent 40%, rgba(9, 9, 12, 0.95) 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "14px"
                  }}
                >
                  <span style={{ fontSize: "0.7rem", color: "#D4AF37", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
                    Artist: {item.artistName}
                  </span>
                  <span style={{ fontSize: "0.95rem", color: "#FFFFFF", fontWeight: 700, fontFamily: "Georgia, serif" }}>
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO LIGHTBOX MODAL */}
      {selectedWork && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            backgroundColor: "rgba(5, 5, 8, 0.9)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
          onClick={() => setSelectedWork(null)}
        >
          <div
            style={{
              maxWidth: "600px",
              width: "100%",
              backgroundColor: "#111116",
              borderRadius: "16px",
              border: "1px solid rgba(212, 175, 55, 0.4)",
              overflow: "hidden",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: "relative", maxHeight: "65vh", backgroundColor: "#000" }}>
              <img
                src={selectedWork.image}
                alt={selectedWork.title}
                style={{
                  width: "100%",
                  maxHeight: "65vh",
                  objectFit: "contain",
                  display: "block"
                }}
              />
              <button
                onClick={() => setSelectedWork(null)}
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#FFF",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <IconClose size={18} />
              </button>
            </div>

            <div style={{ padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: "1.25rem", color: "#FFF", fontFamily: "Georgia, serif" }}>
                    {selectedWork.title}
                  </h4>
                  <div style={{ fontSize: "0.82rem", color: "#D4AF37", fontWeight: 600 }}>
                    Crafted by {selectedWork.artistName}
                  </div>
                </div>
                <span
                  style={{
                    padding: "3px 8px",
                    borderRadius: "4px",
                    backgroundColor: "rgba(212, 175, 55, 0.15)",
                    color: "#D4AF37",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    textTransform: "uppercase"
                  }}
                >
                  {selectedWork.category}
                </span>
              </div>
              <p style={{ margin: "0 0 16px", fontSize: "0.85rem", color: "#A0A0AA", lineHeight: 1.4 }}>
                {selectedWork.description}
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => {
                    const matchedArtist = INKTELLECTUAL_DATA.artists.find((a) => a.id === selectedWork.artistId);
                    setSelectedWork(null);
                    openBookingForArtist(matchedArtist?.id);
                  }}
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: "#D4AF37",
                    color: "#000",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  Book Session with {selectedWork.artistName}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STERILIZATION & MEDICAL HYGIENE PILLARS */}
      <section
        id="hygiene"
        style={{
          padding: "80px 24px",
          maxWidth: "1280px",
          margin: "0 auto"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "#4ADE80",
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "10px"
            }}
          >
            <IconShieldMedical size={16} />
            <span>Clinical Precision Guarantee</span>
          </div>
          <h2
            style={{
              margin: "0 0 14px",
              fontSize: "clamp(1.9rem, 3.5vw, 2.7rem)",
              fontFamily: "Georgia, serif",
              color: "#FFFFFF"
            }}
          >
            Hospital-Grade Hygiene Standards
          </h2>
          <p style={{ margin: "0 auto", fontSize: "1rem", color: "#A0A0AA", maxWidth: "660px" }}>
            Your safety and lifelong skin health are non-negotiable. We treat every session with sterile operating-room rigor under New York State Body Art regulations.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
            gap: "24px"
          }}
        >
          {INKTELLECTUAL_DATA.hygienePillars.map((pillar, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#111116",
                borderRadius: "14px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(74, 222, 128, 0.12)",
                  border: "1px solid rgba(74, 222, 128, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#4ADE80"
                }}
              >
                <IconCheck size={22} />
              </div>
              <h3 style={{ margin: 0, fontSize: "1.1rem", color: "#FFFFFF", fontWeight: 700 }}>
                {pillar.title}
              </h3>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#9E9EAA", lineHeight: 1.5 }}>
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS & LOCATION */}
      <section
        id="faq"
        style={{
          padding: "80px 24px",
          backgroundColor: "#0C0C10",
          borderTop: "1px solid rgba(255, 255, 255, 0.06)"
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "48px"
          }}
          className="hero-grid"
        >
          {/* FAQ Accordion Left */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "#D4AF37",
                fontSize: "0.8rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "10px"
              }}
            >
              <IconQuill size={16} />
              <span>Transparency & Policies</span>
            </div>
            <h2
              style={{
                margin: "0 0 24px",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                fontFamily: "Georgia, serif",
                color: "#FFFFFF"
              }}
            >
              Frequently Asked Questions
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {INKTELLECTUAL_DATA.faq.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      borderRadius: "12px",
                      backgroundColor: "#111116",
                      border: isOpen ? "1px solid #D4AF37" : "1px solid rgba(255, 255, 255, 0.08)",
                      overflow: "hidden",
                      transition: "border-color 0.2s ease"
                    }}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      style={{
                        width: "100%",
                        padding: "16px 20px",
                        background: "transparent",
                        border: "none",
                        color: "#FFFFFF",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        textAlign: "left",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer"
                      }}
                    >
                      <span>{item.q}</span>
                      <span style={{ color: "#D4AF37", fontSize: "1.2rem", fontWeight: 700 }}>
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div style={{ padding: "0 20px 18px", fontSize: "0.88rem", color: "#A0A0AA", lineHeight: 1.5 }}>
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Location & Hours Card Right */}
          <div>
            <div
              style={{
                backgroundColor: "#111116",
                borderRadius: "16px",
                border: "1.5px solid rgba(212, 175, 55, 0.35)",
                padding: "28px",
                boxShadow: "0 15px 40px rgba(0, 0, 0, 0.7)"
              }}
            >
              <h3 style={{ margin: "0 0 16px", fontSize: "1.3rem", color: "#FFFFFF", fontFamily: "Georgia, serif" }}>
                Visit Inktellectual Atelier
              </h3>

              {/* Address */}
              <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                <IconMapPin size={20} style={{ color: "#D4AF37", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <div style={{ color: "#FFFFFF", fontWeight: 600, fontSize: "0.95rem" }}>
                    {INKTELLECTUAL_DATA.address}
                  </div>
                  <div style={{ color: "#A0A0AA", fontSize: "0.85rem" }}>
                    {INKTELLECTUAL_DATA.cityStateZip} ({INKTELLECTUAL_DATA.neighborhood})
                  </div>
                  <div style={{ color: "#D4AF37", fontSize: "0.8rem", marginTop: "4px", fontWeight: 500 }}>
                    🎓 {INKTELLECTUAL_DATA.campusDistance}
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "16px", marginBottom: "18px" }}>
                <div style={{ fontSize: "0.8rem", color: "#D4AF37", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700, marginBottom: "8px" }}>
                  Studio Hours
                </div>
                {INKTELLECTUAL_DATA.hours.map((h, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "6px" }}>
                    <span style={{ color: "#FFFFFF" }}>{h.days}</span>
                    <span style={{ color: "#A0A0AA" }}>{h.time}</span>
                  </div>
                ))}
              </div>

              {/* Direct Storefront Sign Image */}
              <div style={{ borderRadius: "10px", overflow: "hidden", marginBottom: "18px", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                <img
                  src="/images/demo/inktellectual/storefront-sign.jpg"
                  alt="Inktellectual Tattoo Storefront Entrance at 408 Amherst"
                  style={{ width: "100%", height: "140px", objectFit: "cover", display: "block" }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "10px" }}>
                <a
                  href={`tel:${INKTELLECTUAL_DATA.cleanPhone}`}
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: "#D4AF37",
                    color: "#000",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    textDecoration: "none",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px"
                  }}
                >
                  <IconPhone size={16} />
                  <span>Call (716) 226-1167</span>
                </a>
                <a
                  href="https://maps.google.com/?q=408+Amherst+St+Buffalo+NY+14207"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "12px 16px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    color: "#FFF",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    fontSize: "0.85rem",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <IconMapPin size={16} />
                  <span>Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="page-footer-padding"
        style={{
          padding: "48px 24px",
          backgroundColor: "#08080A",
          borderTop: "1px solid rgba(212, 175, 55, 0.2)",
          textAlign: "center",
          fontSize: "0.82rem",
          color: "#7A7A88"
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
          <img
            src="/images/demo/inktellectual/logo-mark.png"
            alt="Inktellectual Logo Mark"
            style={{ width: "36px", height: "auto", opacity: 0.8 }}
          />
          <div style={{ color: "#E0E0E8", fontWeight: 600 }}>
            Inktellectual Tattoo Atelier • 408 Amherst St, Buffalo NY 14207
          </div>
          <p style={{ margin: 0, lineHeight: 1.5 }}>
            Serving Buffalo, Elmwood Village, Black Rock, North Buffalo, and SUNY Buffalo State University students since 2016. Fully compliant with Erie County Health Code.
          </p>
          <div style={{ fontSize: "0.75rem", color: "#555562", marginTop: "10px" }}>
            Interactive Proposal Concept created by ScaleBiz. All photography & artwork rights belong to Inktellectual Tattoo.
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY BOTTOM BAR (< 768px) */}
      <div
        className="mobile-sticky-bar"
        style={{
          display: "none",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9000,
          backgroundColor: "rgba(10, 10, 14, 0.96)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(212, 175, 55, 0.3)",
          padding: "10px 16px",
          gap: "10px",
          boxShadow: "0 -5px 20px rgba(0, 0, 0, 0.6)"
        }}
      >
        <button
          onClick={() => setIsEstimatorOpen(true)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: "rgba(212, 175, 55, 0.15)",
            border: "1px solid #D4AF37",
            color: "#D4AF37",
            fontSize: "0.85rem",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px"
          }}
        >
          <IconCalculator size={16} />
          <span>Estimate Price</span>
        </button>

        <button
          onClick={() => openBookingForArtist()}
          style={{
            flex: 1.3,
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: "#D4AF37",
            border: "none",
            color: "#000",
            fontSize: "0.88rem",
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            boxShadow: "0 2px 10px rgba(212, 175, 55, 0.4)"
          }}
        >
          <span>Book Consultation</span>
          <IconArrowRight size={16} />
        </button>
      </div>

      {/* MODALS */}
      <InktellectualEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        onBookWithEstimate={handleBookWithEstimate}
      />

      <InktellectualBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedArtistId={bookingArtistId}
        preselectedStyle={bookingStyle}
        preselectedSize={bookingSize}
      />

      <InktellectualVoucherModal
        isOpen={isVoucherOpen}
        onClose={() => setIsVoucherOpen(false)}
        onBookNow={() => {
          setIsVoucherOpen(false);
          openBookingForArtist();
        }}
      />
    </div>
  );
};
