"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MIA_BELLA_DATA, ServiceItem, GalleryItem } from "@/data/miaBellaData";
import {
  IconMoon,
  IconScissors,
  IconSparkles,
  IconPotion,
  IconCrystal,
  IconPalette,
  IconFlame,
  IconStar,
  IconClock,
  IconPhone,
  IconMapPin,
  IconCheck,
  IconX,
  IconCalendar,
  IconShoppingBag,
} from "./MiaBellaIcons";
import HairAlchemyQuizModal, { HairAlchemyResultData } from "./HairAlchemyQuizModal";
import MiaBellaBookingModal from "./MiaBellaBookingModal";
import MagickBoutiqueModal from "./MagickBoutiqueModal";

export default function PreviewMiaBella() {
  const data = MIA_BELLA_DATA;

  // Modal states
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isBoutiqueOpen, setIsBoutiqueOpen] = useState<boolean>(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [quizTransferData, setQuizTransferData] = useState<HairAlchemyResultData | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Filter states
  const [activeServiceCategory, setActiveServiceCategory] = useState<string>("all");
  const [activeGalleryCategory, setActiveGalleryCategory] = useState<string>("all");
  const [mapTheme, setMapTheme] = useState<"dark" | "satellite">("dark");

  const handleOpenBooking = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    setQuizTransferData(null);
    setIsBookingOpen(true);
  };

  const handleOpenQuiz = () => {
    setIsQuizOpen(true);
  };

  const handleProceedFromQuizToBooking = (resultData: HairAlchemyResultData) => {
    setIsQuizOpen(false);
    setQuizTransferData(resultData);
    setIsBookingOpen(true);
  };

  const filteredServices = data.services.filter((s) => {
    if (activeServiceCategory === "all") return true;
    return s.category === activeServiceCategory;
  });

  const filteredGallery = data.gallery.filter((g) => {
    if (activeGalleryCategory === "all") return true;
    return g.category === activeGalleryCategory;
  });

  return (
    <div
      style={{
        backgroundColor: "#0A060E",
        color: "#F5F2EB",
        minHeight: "100vh",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        lineHeight: 1.6,
        overflowX: "hidden",
        width: "100%",
        maxWidth: "100vw",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;800;900&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,500&display=swap');
        
        .mb-font-display {
          font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
        }
        .mb-font-serif {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .mb-card-hover {
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .mb-card-hover:hover {
          transform: translateY(-4px);
          border-color: #D4AF37 !important;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6), 0 0 24px rgba(212, 175, 55, 0.18) !important;
        }
        .mb-btn-gold {
          background: linear-gradient(135deg, #E6C875 0%, #D4AF37 50%, #B88E23 100%);
          color: #0A060E;
          border: none;
          font-weight: 800;
          transition: all 0.18s ease;
          box-shadow: 0 6px 18px rgba(212, 175, 55, 0.3);
        }
        .mb-btn-gold:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(212, 175, 55, 0.45);
          filter: brightness(1.06);
        }
        .mb-btn-outline {
          background: transparent;
          color: #E6C875;
          border: 1.5px solid #D4AF37;
          font-weight: 700;
          transition: all 0.18s ease;
        }
        .mb-btn-outline:hover {
          background: rgba(212, 175, 55, 0.14);
          transform: translateY(-2px);
        }
        @media (max-width: 899px) {
          .mb-desktop-nav { display: none !important; }
          .mb-mobile-toggle { display: flex !important; }
        }
        @media (min-width: 900px) {
          .mb-mobile-toggle { display: none !important; }
          .mb-mobile-drawer { display: none !important; }
        }
      `}</style>

      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div
        style={{
          backgroundColor: "#130A19",
          borderBottom: "1px solid rgba(212, 175, 55, 0.25)",
          padding: "9px 16px",
          fontSize: "12px",
          color: "#E2DDD3",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#4CAF50", display: "inline-block", boxShadow: "0 0 8px #4CAF50" }}></span>
            <strong style={{ color: "#E6C875", letterSpacing: "0.4px" }}>
              AWARD-WINNING COLOR SPECIALIST
            </strong>
          </div>
          <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>•</span>
          <span style={{ color: "#C5BEB2" }}>
            Walk-Ins Warmly Welcomed Tue, Thu, Fri, Sat (12–8 PM)
          </span>
          <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>•</span>
          <span style={{ color: "#D4AF37", fontWeight: 700 }}>
            Lockport, NY
          </span>
        </div>

        <a
          href={data.phoneLink}
          style={{
            color: "#E6C875",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontWeight: 700,
            fontSize: "12px",
            padding: "3px 10px",
            borderRadius: "6px",
            backgroundColor: "rgba(212, 175, 55, 0.1)",
            border: "1px solid rgba(212, 175, 55, 0.3)",
          }}
        >
          <IconPhone size={13} color="#E6C875" />
          <span>Call or Text: {data.phone}</span>
        </a>
      </div>

      {/* 2. MAIN HEADER NAVIGATION */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: "rgba(10, 6, 14, 0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
          padding: "14px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* LOGO */}
          <a
            href="#hero"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid #D4AF37",
                boxShadow: "0 0 16px rgba(212, 175, 55, 0.3)",
                flexShrink: 0,
                position: "relative",
              }}
            >
              <Image
                src="/images/demo/mia-bella/logo-pinup.jpg"
                alt="Mia Bella's Hair Salon Logo"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <div
                className="mb-font-serif"
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "0.5px",
                  lineHeight: 1.15,
                }}
              >
                Mia Bella&apos;s
              </div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#D4AF37",
                  letterSpacing: "1.4px",
                  textTransform: "uppercase",
                }}
              >
                Hair Salon &amp; Magick Boutique
              </div>
            </div>
          </a>

          {/* DESKTOP NAV LINKS */}
          <nav className="mb-desktop-nav" style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <a href="#services" style={{ color: "#E2DDD3", textDecoration: "none", fontSize: "13.5px", fontWeight: 600 }}>
              Alchemy Services
            </a>
            <a href="#boutique" style={{ color: "#E2DDD3", textDecoration: "none", fontSize: "13.5px", fontWeight: 600 }}>
              Magick Boutique
            </a>
            <a href="#gallery" style={{ color: "#E2DDD3", textDecoration: "none", fontSize: "13.5px", fontWeight: 600 }}>
              Transformations
            </a>
            <a href="#hours" style={{ color: "#E2DDD3", textDecoration: "none", fontSize: "13.5px", fontWeight: 600 }}>
              Hours &amp; Location
            </a>
          </nav>

          {/* HEADER ACTION BUTTONS */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              type="button"
              onClick={handleOpenQuiz}
              className="mb-btn-outline mb-desktop-nav"
              style={{
                padding: "9px 16px",
                borderRadius: "10px",
                fontSize: "12.5px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <IconSparkles size={14} color="#D4AF37" />
              <span>Color Quiz</span>
            </button>

            <button
              type="button"
              onClick={() => handleOpenBooking()}
              className="mb-btn-gold"
              style={{
                padding: "10px 18px",
                borderRadius: "10px",
                fontSize: "13px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <IconScissors size={15} color="#0A060E" />
              <span>Book Appointment</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mb-mobile-toggle"
              aria-label="Toggle menu"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                borderRadius: "8px",
                padding: "8px",
                color: "#E6C875",
                cursor: "pointer",
              }}
            >
              {isMobileMenuOpen ? <IconX size={20} color="#E6C875" /> : <IconMoon size={20} color="#E6C875" />}
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        {isMobileMenuOpen && (
          <div
            className="mb-mobile-drawer"
            style={{
              padding: "18px 0 10px",
              borderTop: "1px solid rgba(212, 175, 55, 0.2)",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <a
              href="#services"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px", fontWeight: 600, padding: "8px 0" }}
            >
              Alchemy Services &amp; Vivids
            </a>
            <a
              href="#boutique"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px", fontWeight: 600, padding: "8px 0" }}
            >
              The Magick Boutique Apothecary
            </a>
            <a
              href="#gallery"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px", fontWeight: 600, padding: "8px 0" }}
            >
              Real Hair Transformations
            </a>
            <a
              href="#hours"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "14px", fontWeight: 600, padding: "8px 0" }}
            >
              Salon Hours &amp; Walk-In Policy
            </a>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", paddingTop: "8px" }}>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleOpenQuiz();
                }}
                className="mb-btn-outline"
                style={{ padding: "10px", borderRadius: "8px", fontSize: "12px", cursor: "pointer", textAlign: "center" }}
              >
                Color Quiz
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleOpenBooking();
                }}
                className="mb-btn-gold"
                style={{ padding: "10px", borderRadius: "8px", fontSize: "12px", cursor: "pointer", textAlign: "center" }}
              >
                Book Chair
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION */}
      <section
        id="hero"
        style={{
          position: "relative",
          padding: "70px 20px 80px",
          background: "radial-gradient(ellipse at 50% 10%, rgba(139, 90, 125, 0.22) 0%, rgba(10, 6, 14, 0.95) 75%), #0A060E",
          borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: "48px",
            alignItems: "center",
          }}
        >
          {/* LEFT: COPYWRITING & INTENTIONAL CALL-TO-ACTION */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(212, 175, 55, 0.12)",
                border: "1.5px solid rgba(212, 175, 55, 0.4)",
                padding: "6px 14px",
                borderRadius: "99px",
                fontSize: "11.5px",
                fontWeight: 800,
                letterSpacing: "1px",
                color: "#E6C875",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              <IconMoon size={14} color="#E6C875" />
              <span>Vintage Gothic Glamour • Lockport, NY</span>
            </div>

            <h1
              className="mb-font-serif"
              style={{
                fontSize: "clamp(32px, 5.2vw, 54px)",
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: 1.15,
                margin: "0 0 20px",
                letterSpacing: "-0.5px",
              }}
            >
              Where Master Color Alchemy Meets Metaphysical Beauty.
            </h1>

            <p
              style={{
                fontSize: "16px",
                color: "#C5BDB0",
                lineHeight: 1.65,
                margin: "0 0 28px",
                maxWidth: "540px",
              }}
            >
              Owned and operated by an <strong>Award-Winning Color Specialist</strong>. Step into an enchanting Lockport sanctuary specializing in high-voltage vivid transformations, holographic prism peekaboos, and sacred botanical hair rituals that leave your hair touchably silken.
            </p>

            {/* DUAL ACTION BUTTONS */}
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "32px" }}>
              <button
                type="button"
                onClick={() => handleOpenBooking()}
                className="mb-btn-gold"
                style={{
                  padding: "14px 28px",
                  borderRadius: "12px",
                  fontSize: "14.5px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <IconScissors size={18} color="#0A060E" />
                <span>Book Hair Transformation</span>
              </button>

              <button
                type="button"
                onClick={handleOpenQuiz}
                className="mb-btn-outline"
                style={{
                  padding: "14px 24px",
                  borderRadius: "12px",
                  fontSize: "14.5px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <IconSparkles size={17} color="#D4AF37" />
                <span>Calculate Chair Time &amp; Cost</span>
              </button>
            </div>

            {/* TRUST PILLARS ROW */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "14px",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                paddingTop: "24px",
              }}
            >
              <div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#E6C875", marginBottom: "2px" }}>
                  Zero-Damage Vivids
                </div>
                <div style={{ fontSize: "12px", color: "#9E9689" }}>
                  Molecular bond sealers in every bleach
                </div>
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#E6C875", marginBottom: "2px" }}>
                  Walk-Ins Welcome
                </div>
                <div style={{ fontSize: "12px", color: "#9E9689" }}>
                  Tue, Thu, Fri, Sat: 12 PM – 8 PM
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: VINTAGE PINUP GLAM EMBLEM & TRANSFORMATION CHIPS */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                border: "2px solid rgba(212, 175, 55, 0.4)",
                boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8), 0 0 45px rgba(212, 175, 55, 0.2)",
                aspectRatio: "4/4.6",
                maxHeight: "560px",
                width: "100%",
              }}
            >
              <Image
                src="/images/demo/mia-bella/logo-pinup.jpg"
                alt="Mia Bella's Hair Salon Vintage Pinup Glamour"
                fill
                priority
                style={{ objectFit: "cover" }}
              />

              {/* OVERLAY BADGE */}
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  right: "20px",
                  backgroundColor: "rgba(15, 11, 21, 0.88)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(212, 175, 55, 0.35)",
                  borderRadius: "16px",
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span style={{ fontSize: "10.5px", fontWeight: 800, color: "#D4AF37", textTransform: "uppercase", letterSpacing: "1px" }}>
                    Specialty Sanctuary
                  </span>
                  <div style={{ fontSize: "14.5px", fontWeight: 700, color: "#FFFFFF" }}>
                    Vivid Color &amp; Magick Boutique
                  </div>
                  <div style={{ fontSize: "11px", color: "#B8B0A2" }}>
                    Lockport, NY • Dial (716) 395-6352
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsBoutiqueOpen(true)}
                  style={{
                    backgroundColor: "rgba(212, 175, 55, 0.15)",
                    border: "1px solid #D4AF37",
                    color: "#E6C875",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    fontSize: "11.5px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <IconCrystal size={13} color="#E6C875" />
                  <span>Boutique</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BUSINESS HOURS, LOCATION & INTERACTIVE GOOGLE MAP */}
      <section
        id="location"
        style={{
          backgroundColor: "#110B17",
          borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
          padding: "70px 20px",
          scrollMarginTop: "70px",
        }}
      >
        <div id="hours" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* SECTION HEADER */}
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 36px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "rgba(212, 175, 55, 0.12)",
                color: "#E6C875",
                padding: "4px 12px",
                borderRadius: "99px",
                fontSize: "11px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "12px",
              }}
            >
              <IconMapPin size={13} color="#E6C875" />
              <span>Historic East Ave Sanctuary • Lockport, NY</span>
            </div>

            <h2 className="mb-font-serif" style={{ fontSize: "clamp(26px, 4vw, 38px)", color: "#FFFFFF", margin: "0 0 12px" }}>
              Find the Salon &amp; Plan Your Visit
            </h2>

            <p style={{ fontSize: "14.5px", color: "#C5BDB0", lineHeight: 1.6, margin: 0 }}>
              Conveniently located at <strong>{data.fullStreetAddress}</strong>. Easily accessible from Transit Rd (Route 78) and Route 31 with dedicated free client parking.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 500px), 1fr))",
              gap: "28px",
              alignItems: "stretch",
            }}
          >
            {/* LEFT: INTERACTIVE GOOGLE MAP IFRAME WITH THEME TOGGLE */}
            <div
              style={{
                backgroundColor: "#150D1E",
                border: "1.5px solid rgba(212, 175, 55, 0.35)",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.5)",
                display: "flex",
                flexDirection: "column",
                minHeight: "440px",
              }}
            >
              <div
                style={{
                  padding: "14px 18px",
                  backgroundColor: "rgba(10, 6, 14, 0.9)",
                  borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <IconMapPin size={18} color="#D4AF37" />
                  <strong style={{ fontSize: "13.5px", color: "#FFFFFF" }}>{data.fullStreetAddress}</strong>
                </div>

                {/* THEME TOGGLE + OPEN FULL MAP */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div
                    style={{
                      display: "flex",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      borderRadius: "8px",
                      padding: "2px",
                      border: "1px solid rgba(212, 175, 55, 0.3)",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setMapTheme("dark")}
                      style={{
                        padding: "5px 10px",
                        fontSize: "11px",
                        fontWeight: 700,
                        borderRadius: "6px",
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: mapTheme === "dark" ? "#D4AF37" : "transparent",
                        color: mapTheme === "dark" ? "#0A060E" : "#C5BDB0",
                        transition: "all 0.15s ease",
                      }}
                    >
                      🌙 Dark Map
                    </button>
                    <button
                      type="button"
                      onClick={() => setMapTheme("satellite")}
                      style={{
                        padding: "5px 10px",
                        fontSize: "11px",
                        fontWeight: 700,
                        borderRadius: "6px",
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: mapTheme === "satellite" ? "#D4AF37" : "transparent",
                        color: mapTheme === "satellite" ? "#0A060E" : "#C5BDB0",
                        transition: "all 0.15s ease",
                      }}
                    >
                      🛰️ Satellite
                    </button>
                  </div>

                  <a
                    href={data.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: "rgba(212, 175, 55, 0.15)",
                      border: "1px solid #D4AF37",
                      color: "#E6C875",
                      padding: "6px 11px",
                      borderRadius: "8px",
                      fontSize: "11px",
                      fontWeight: 700,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span>Full Map &rarr;</span>
                  </a>
                </div>
              </div>

              {/* EMBEDDED MAP IFRAME WITH DYNAMIC THEME FILTER */}
              <div style={{ flex: 1, position: "relative", minHeight: "360px", width: "100%", backgroundColor: "#0A060E" }}>
                <iframe
                  key={mapTheme}
                  title="Mia Bella's Hair Salon Location Map"
                  src={mapTheme === "dark" ? data.mapEmbedDarkUrl : data.mapEmbedSatelliteUrl}
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter:
                      mapTheme === "dark"
                        ? "invert(90%) hue-rotate(180deg) brightness(85%) contrast(115%)"
                        : "brightness(0.88) contrast(1.15) saturate(1.1)",
                    minHeight: "360px",
                    display: "block",
                    transition: "filter 0.3s ease",
                  }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* RIGHT: LOCATION DETAILS, PARKING & SCHEDULE */}
            <div
              style={{
                backgroundColor: "rgba(18, 12, 26, 0.92)",
                border: "1.5px solid rgba(212, 175, 55, 0.3)",
                borderRadius: "20px",
                padding: "28px",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.5)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <div>
                {/* STATUS BADGE */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "rgba(76, 175, 80, 0.15)", color: "#81C784", padding: "4px 12px", borderRadius: "99px", fontSize: "11.5px", fontWeight: 700, marginBottom: "14px", border: "1px solid rgba(76, 175, 80, 0.4)" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#4CAF50" }}></span>
                  <span>WALK-INS WELCOME TUE, THU, FRI, SAT (12–8 PM)</span>
                </div>

                <h3 className="mb-font-serif" style={{ fontSize: "21px", color: "#FFFFFF", margin: "0 0 10px" }}>
                  Visiting the Salon &amp; Magick Boutique
                </h3>

                <p style={{ fontSize: "13px", color: "#C5BDB0", lineHeight: 1.6, margin: "0 0 16px" }}>
                  {data.walkInPolicy}
                </p>

                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.35)",
                    borderLeft: "3px solid #D4AF37",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    fontSize: "12.5px",
                    color: "#E2DDD3",
                    marginBottom: "18px",
                    lineHeight: 1.5,
                  }}
                >
                  <strong style={{ color: "#E6C875" }}>🚗 Parking &amp; Arrival: </strong>
                  {data.parkingNote}
                </div>

                {/* SCHEDULE TABLE */}
                <div
                  style={{
                    backgroundColor: "#0C0812",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "14px",
                    padding: "14px 18px",
                    marginBottom: "20px",
                  }}
                >
                  {data.hours.map((h, i) => (
                    <div
                      key={h.day}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "7px 0",
                        borderBottom: i !== data.hours.length - 1 ? "1px solid rgba(255, 255, 255, 0.06)" : "none",
                        fontSize: "12.5px",
                      }}
                    >
                      <span style={{ color: h.day === "Tuesday" || h.day === "Thursday" || h.day === "Friday" || h.day === "Saturday" ? "#FFFFFF" : "#8A8275", fontWeight: 600 }}>
                        {h.day}
                      </span>
                      <span style={{ color: h.time.includes("12:00") ? "#D4AF37" : "#A89F91", fontWeight: h.time.includes("12:00") ? 700 : 500 }}>
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <a
                  href={data.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-btn-gold"
                  style={{
                    flex: 1,
                    minWidth: "180px",
                    padding: "12px 18px",
                    borderRadius: "10px",
                    fontSize: "13px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <IconMapPin size={15} color="#0A060E" />
                  <span>Get Driving Directions</span>
                </a>

                <a
                  href={data.phoneLink}
                  style={{
                    flex: 1,
                    minWidth: "160px",
                    backgroundColor: "transparent",
                    color: "#E6C875",
                    border: "1.5px solid #D4AF37",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    fontSize: "13px",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <IconPhone size={15} color="#E6C875" />
                  <span>Call {data.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CORE SERVICE ALCHEMY MENU */}
      <section
        id="services"
        style={{
          padding: "80px 20px",
          backgroundColor: "#0A060E",
          borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* SECTION TITLE */}
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 40px" }}>
            <span style={{ fontSize: "11.5px", fontWeight: 800, color: "#D4AF37", textTransform: "uppercase", letterSpacing: "1.5px" }}>
              Sacred Craft &amp; Color Formulation
            </span>
            <h2 className="mb-font-serif" style={{ fontSize: "clamp(26px, 4vw, 40px)", color: "#FFFFFF", margin: "8px 0 14px" }}>
              Hair Alchemy &amp; Salon Offerings
            </h2>
            <p style={{ fontSize: "14.5px", color: "#C5BDB0", lineHeight: 1.6 }}>
              Every service is an artisanal experience formulated specifically for your hair canvas. We blend cutting-edge bond chemistry with high-vibrancy pigments.
            </p>

            {/* CATEGORY SWITCHER BUTTONS */}
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap", marginTop: "24px" }}>
              {[
                { id: "all", label: "All Services" },
                { id: "vivids", label: "Vivid Alchemy & Fantasy" },
                { id: "blonding", label: "Lived-In Blonding & Balayage" },
                { id: "cuts", label: "Sculptural Cuts & Styling" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveServiceCategory(cat.id)}
                  style={{
                    cursor: "pointer",
                    padding: "10px 18px",
                    borderRadius: "10px",
                    fontSize: "13px",
                    fontWeight: 700,
                    border: activeServiceCategory === cat.id ? "1.5px solid #D4AF37" : "1px solid rgba(255, 255, 255, 0.12)",
                    backgroundColor: activeServiceCategory === cat.id ? "rgba(212, 175, 55, 0.18)" : "rgba(255, 255, 255, 0.03)",
                    color: activeServiceCategory === cat.id ? "#FFF9E6" : "#A89F91",
                    transition: "all 0.15s ease",
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* SERVICE CARDS GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
              gap: "24px",
            }}
          >
            {filteredServices.map((svc) => (
              <div
                key={svc.id}
                className="mb-card-hover"
                style={{
                  backgroundColor: "#140D1C",
                  border: "1.5px solid rgba(212, 175, 55, 0.28)",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                    <span
                      style={{
                        backgroundColor: "rgba(212, 175, 55, 0.12)",
                        color: "#E6C875",
                        fontSize: "10.5px",
                        fontWeight: 800,
                        padding: "3px 8px",
                        borderRadius: "99px",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      {svc.tag || "Salon Service"}
                    </span>
                    <strong style={{ fontSize: "20px", color: "#D4AF37", fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {svc.price}
                    </strong>
                  </div>

                  <h3 className="mb-font-serif" style={{ fontSize: "18px", color: "#FFFFFF", margin: "0 0 10px" }}>
                    {svc.name}
                  </h3>

                  <p style={{ fontSize: "13px", color: "#C5BDB0", lineHeight: 1.5, margin: "0 0 16px" }}>
                    {svc.description}
                  </p>

                  {svc.formulaNote && (
                    <div
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.35)",
                        borderLeft: "3px solid #D4AF37",
                        borderRadius: "6px",
                        padding: "8px 12px",
                        fontSize: "11.5px",
                        color: "#E2DDD3",
                        marginBottom: "20px",
                        lineHeight: 1.45,
                      }}
                    >
                      <strong style={{ color: "#E6C875" }}>Alchemy Formula: </strong>
                      {svc.formulaNote}
                    </div>
                  )}
                </div>

                {/* DUAL ACTION BUTTONS ON EACH SERVICE CARD */}
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button
                    type="button"
                    onClick={handleOpenQuiz}
                    style={{
                      flex: 1,
                      backgroundColor: "transparent",
                      color: "#E6C875",
                      border: "1.5px solid rgba(212, 175, 55, 0.4)",
                      padding: "10px",
                      borderRadius: "10px",
                      fontSize: "12.5px",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                    }}
                  >
                    <IconSparkles size={14} color="#D4AF37" />
                    <span>Estimate Cost</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenBooking(svc.id)}
                    className="mb-btn-gold"
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: "10px",
                      fontSize: "12.5px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                    }}
                  >
                    <IconScissors size={14} color="#0A060E" />
                    <span>Book Service</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. REAL CLIENT HAIR TRANSFORMATIONS GALLERY */}
      <section
        id="gallery"
        style={{
          padding: "80px 20px",
          backgroundColor: "#100917",
          borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 40px" }}>
            <span style={{ fontSize: "11.5px", fontWeight: 800, color: "#D4AF37", textTransform: "uppercase", letterSpacing: "1.5px" }}>
              Living Portfolios
            </span>
            <h2 className="mb-font-serif" style={{ fontSize: "clamp(26px, 4vw, 40px)", color: "#FFFFFF", margin: "8px 0 14px" }}>
              Real Client Hair Transformations
            </h2>
            <p style={{ fontSize: "14.5px", color: "#C5BDB0", lineHeight: 1.6 }}>
              Explore authentic results straight from Mia Bella&apos;s salon chair in Lockport, NY. No filters, no stock models — just pure color wizardry and precision haircutting.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap", marginTop: "20px" }}>
              {[
                { id: "all", label: "All Work" },
                { id: "vivid", label: "Electric Jewel Blues" },
                { id: "peekaboo", label: "Rainbow Peekaboo" },
                { id: "boutique", label: "Sanctuary & Apothecary" },
              ].map((gCat) => (
                <button
                  key={gCat.id}
                  type="button"
                  onClick={() => setActiveGalleryCategory(gCat.id)}
                  style={{
                    cursor: "pointer",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    fontSize: "12.5px",
                    fontWeight: 700,
                    border: activeGalleryCategory === gCat.id ? "1.5px solid #D4AF37" : "1px solid rgba(255, 255, 255, 0.12)",
                    backgroundColor: activeGalleryCategory === gCat.id ? "rgba(212, 175, 55, 0.18)" : "transparent",
                    color: activeGalleryCategory === gCat.id ? "#FFF9E6" : "#A89F91",
                  }}
                >
                  {gCat.label}
                </button>
              ))}
            </div>
          </div>

          {/* GALLERY GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
              gap: "24px",
            }}
          >
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className="mb-card-hover"
                style={{
                  backgroundColor: "#161020",
                  borderRadius: "18px",
                  overflow: "hidden",
                  border: "1.5px solid rgba(212, 175, 55, 0.25)",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
                }}
              >
                <div style={{ position: "relative", aspectRatio: "4/5", width: "100%" }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "14px",
                      right: "14px",
                      backgroundColor: "rgba(10, 6, 14, 0.8)",
                      border: "1px solid rgba(212, 175, 55, 0.4)",
                      padding: "4px 10px",
                      borderRadius: "99px",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#E6C875",
                    }}
                  >
                    Verified Client Result
                  </div>
                </div>

                <div style={{ padding: "18px 20px" }}>
                  <h3 className="mb-font-serif" style={{ fontSize: "16.5px", color: "#FFFFFF", margin: "0 0 6px" }}>
                    {item.title}
                  </h3>
                  <div style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, marginBottom: "8px" }}>
                    {item.technique}
                  </div>
                  <p style={{ fontSize: "12.5px", color: "#C5BDB0", lineHeight: 1.5, margin: 0 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. THE MAGICK BOUTIQUE & APOTHECARY SHOWCASE */}
      <section
        id="boutique"
        style={{
          padding: "80px 20px",
          backgroundColor: "#0A060E",
          borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              backgroundColor: "linear-gradient(135deg, #180F22, #0E0715)",
              border: "2px solid rgba(212, 175, 55, 0.35)",
              borderRadius: "24px",
              padding: "40px",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(212, 175, 55, 0.12)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
              gap: "40px",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "rgba(212, 175, 55, 0.12)",
                  color: "#E6C875",
                  padding: "4px 12px",
                  borderRadius: "99px",
                  fontSize: "11px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "14px",
                }}
              >
                <IconCrystal size={13} color="#E6C875" />
                <span>The Magick Boutique &amp; Apothecary</span>
              </div>

              <h2 className="mb-font-serif" style={{ fontSize: "clamp(26px, 3.8vw, 38px)", color: "#FFFFFF", margin: "0 0 16px" }}>
                Sacred Hair Botanicals, Crystals &amp; Ritual Apothecary
              </h2>

              <p style={{ fontSize: "14px", color: "#C5BDB0", lineHeight: 1.65, margin: "0 0 20px" }}>
                Elevate your salon visit beyond a standard appointment. In addition to award-winning hair color, Mia Bella handcrafts full-moon charged botanical scalp elixirs, crystal scalp meridian combs, and intention candles to help you maintain hair vitality and energetic harmony at home.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "26px" }}>
                <div style={{ borderLeft: "3px solid #D4AF37", paddingLeft: "12px" }}>
                  <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#FFFFFF" }}>Moon-Charged Botanicals</div>
                  <div style={{ fontSize: "11.5px", color: "#9E9689" }}>Herbal scalp growth oils &amp; rose mists</div>
                </div>
                <div style={{ borderLeft: "3px solid #D4AF37", paddingLeft: "12px" }}>
                  <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#FFFFFF" }}>Genuine Raw Crystals</div>
                  <div style={{ fontSize: "11.5px", color: "#9E9689" }}>Amethyst combs &amp; intention gems</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsBoutiqueOpen(true)}
                className="mb-btn-gold"
                style={{
                  padding: "13px 26px",
                  borderRadius: "12px",
                  fontSize: "14px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <IconShoppingBag size={17} color="#0A060E" />
                <span>Explore Magick Boutique Offerings &rarr;</span>
              </button>
            </div>

            {/* BOUTIQUE PRODUCT PREVIEW IMAGE */}
            <div style={{ position: "relative", borderRadius: "18px", overflow: "hidden", border: "1.5px solid rgba(212, 175, 55, 0.4)", aspectRatio: "4/3", boxShadow: "0 15px 35px rgba(0, 0, 0, 0.6)" }}>
              <Image
                src="/images/demo/mia-bella/boutique-elixirs.jpg"
                alt="Mia Bella Magick Boutique Apothecary Elixirs"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. VERIFIED LOCAL REVIEWS */}
      <section
        id="reviews"
        style={{
          padding: "80px 20px",
          backgroundColor: "#110B17",
          borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 40px" }}>
            <span style={{ fontSize: "11.5px", fontWeight: 800, color: "#D4AF37", textTransform: "uppercase", letterSpacing: "1.5px" }}>
              Western New York Client Love
            </span>
            <h2 className="mb-font-serif" style={{ fontSize: "clamp(26px, 4vw, 40px)", color: "#FFFFFF", margin: "8px 0 14px" }}>
              Stories from the Alchemist&apos;s Chair
            </h2>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", color: "#D4AF37" }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <IconStar key={i} size={18} color="#D4AF37" />
              ))}
              <span style={{ marginLeft: "6px", fontSize: "14px", fontWeight: 700, color: "#FFFFFF" }}>
                5.0 Star Rated Salon in Lockport, NY
              </span>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 270px), 1fr))",
              gap: "20px",
            }}
          >
            {data.reviews.map((rev) => (
              <div
                key={rev.id}
                style={{
                  backgroundColor: "rgba(18, 12, 26, 0.8)",
                  border: "1.5px solid rgba(212, 175, 55, 0.22)",
                  borderRadius: "16px",
                  padding: "22px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", gap: "2px", color: "#D4AF37", marginBottom: "10px" }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <IconStar key={s} size={14} color="#D4AF37" />
                    ))}
                  </div>
                  <p style={{ fontSize: "13px", color: "#C5BDB0", lineHeight: 1.6, margin: "0 0 16px", fontStyle: "italic" }}>
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "12px" }}>
                  <strong style={{ fontSize: "13.5px", color: "#FFFFFF", display: "block" }}>{rev.author}</strong>
                  <div style={{ fontSize: "11.5px", color: "#D4AF37" }}>{rev.service} • {rev.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8.5 HOURS & LOCATION INTERACTIVE MAP HUB (#hours / #location) */}
      <section
        id="hours"
        style={{
          padding: "88px 20px",
          backgroundColor: "#0F0A18",
          borderTop: "1px solid rgba(212, 175, 55, 0.18)",
          position: "relative",
        }}
      >
        <div id="location" style={{ position: "absolute", top: "-40px" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Section Header */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "30px",
                backgroundColor: "rgba(212, 175, 55, 0.1)",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                color: "#E6C875",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              <IconMapPin size={14} color="#D4AF37" />
              <span>Visit Our Sanctuary &bull; Lockport, NY</span>
            </div>
            <h2
              className="mb-font-serif"
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                color: "#FFFFFF",
                margin: "0 0 14px",
                letterSpacing: "-0.5px",
              }}
            >
              Sanctuary Location &amp; Chair Hours
            </h2>
            <p
              style={{
                fontSize: "15px",
                color: "#C5BDB0",
                maxWidth: "680px",
                margin: "0 auto",
                lineHeight: 1.65,
              }}
            >
              Nestled on historic East Avenue in Lockport. Step into our vintage pinup studio
              and botanical apothecary for vivid hair transformations, dimensional blonding, and sacred rituals.
            </p>
          </div>

          {/* 2-Column Grid: Left Schedule & Arrival, Right Interactive Map */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "32px",
              alignItems: "start",
            }}
          >
            {/* LEFT COLUMN: Arrival, Address, Operating Hours */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Address Card */}
              <div
                style={{
                  backgroundColor: "#160F22",
                  border: "1px solid rgba(212, 175, 55, 0.28)",
                  borderRadius: "18px",
                  padding: "26px",
                  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.5)",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "18px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      backgroundColor: "rgba(212, 175, 55, 0.15)",
                      border: "1px solid rgba(212, 175, 55, 0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <IconMapPin size={22} color="#E6C875" />
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
                      Physical Address
                    </div>
                    <h3
                      className="mb-font-serif"
                      style={{
                        fontSize: "20px",
                        color: "#FFFFFF",
                        margin: "4px 0 6px",
                      }}
                    >
                      {data.fullStreetAddress}
                    </h3>
                    <p style={{ fontSize: "13px", color: "#9E9485", margin: 0, lineHeight: 1.5 }}>
                      Niagara County &bull; Convenient access from Transit Rd (NY-78) &amp; Downtown Lockport.
                    </p>
                  </div>
                </div>

                {/* Parking & Walk-In Badges */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(30, 20, 42, 0.8)",
                      border: "1px solid rgba(212, 175, 55, 0.15)",
                      fontSize: "12.5px",
                      color: "#E2DDD3",
                    }}
                  >
                    <IconCheck size={16} color="#4CAF50" />
                    <span><strong>Parking:</strong> {data.parkingNote}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(30, 20, 42, 0.8)",
                      border: "1px solid rgba(212, 175, 55, 0.15)",
                      fontSize: "12.5px",
                      color: "#E2DDD3",
                    }}
                  >
                    <IconSparkles size={16} color="#D4AF37" />
                    <span><strong>Walk-Ins:</strong> {data.walkInPolicy}</span>
                  </div>
                </div>

                {/* Quick Action Navigation Buttons */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  <a
                    href={data.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-btn-gold"
                    style={{
                      flex: 1,
                      minWidth: "160px",
                      padding: "11px 18px",
                      borderRadius: "10px",
                      fontSize: "13px",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      textAlign: "center",
                    }}
                  >
                    <IconMapPin size={16} color="#0A060E" />
                    <span>Get Directions</span>
                  </a>

                  <a
                    href={data.phoneLink}
                    className="mb-btn-outline"
                    style={{
                      padding: "11px 18px",
                      borderRadius: "10px",
                      fontSize: "13px",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <IconPhone size={15} color="#E6C875" />
                    <span>Call: {data.phone}</span>
                  </a>

                  <a
                    href={data.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      color: "#C5BDB0",
                      textDecoration: "none",
                      textAlign: "center",
                      display: "block",
                      border: "1px dashed rgba(212, 175, 55, 0.3)",
                      marginTop: "4px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Open in Google Maps App &rarr;
                  </a>
                </div>
              </div>

              {/* Hours Schedule Card */}
              <div
                style={{
                  backgroundColor: "#160F22",
                  border: "1px solid rgba(212, 175, 55, 0.22)",
                  borderRadius: "18px",
                  padding: "24px",
                  boxShadow: "0 10px 24px rgba(0, 0, 0, 0.4)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <IconClock size={18} color="#D4AF37" />
                    <h3 className="mb-font-serif" style={{ fontSize: "17px", color: "#FFFFFF", margin: 0 }}>
                      Weekly Chair Hours
                    </h3>
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#4CAF50",
                      backgroundColor: "rgba(76, 175, 80, 0.12)",
                      border: "1px solid rgba(76, 175, 80, 0.35)",
                      borderRadius: "20px",
                      padding: "3px 10px",
                      fontWeight: 700,
                    }}
                  >
                    Lockport, NY (EST)
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {data.hours.map((h, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        backgroundColor: h.isOpenToday ? "rgba(212, 175, 55, 0.08)" : "rgba(255, 255, 255, 0.02)",
                        border: h.isOpenToday ? "1px solid rgba(212, 175, 55, 0.2)" : "1px solid transparent",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: h.isOpenToday ? 700 : 500,
                          color: h.isOpenToday ? "#FFFFFF" : "#A89F90",
                        }}
                      >
                        {h.day}
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: h.isOpenToday ? "#E6C875" : "#7A7062",
                          }}
                        >
                          {h.time}
                        </span>
                        {h.statusBadge && (
                          <span
                            style={{
                              fontSize: "10px",
                              padding: "2px 6px",
                              borderRadius: "6px",
                              fontWeight: 700,
                              backgroundColor:
                                h.statusBadge === "Walk-Ins Welcome"
                                  ? "rgba(76, 175, 80, 0.18)"
                                  : "rgba(212, 175, 55, 0.15)",
                              color:
                                h.statusBadge === "Walk-Ins Welcome"
                                  ? "#4CAF50"
                                  : "#D4AF37",
                              border: "1px solid currentColor",
                            }}
                          >
                            {h.statusBadge}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.06)", fontSize: "12px", color: "#8E8474", fontStyle: "italic", textAlign: "center" }}>
                  {data.hoursNote}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Interactive Google Maps Frame */}
            <div
              style={{
                backgroundColor: "#160F22",
                border: "1.5px solid rgba(212, 175, 55, 0.35)",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 18px 45px rgba(0, 0, 0, 0.7), 0 0 30px rgba(212, 175, 55, 0.12)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Map Top Bar */}
              <div
                style={{
                  padding: "14px 20px",
                  backgroundColor: "#110B1B",
                  borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: "#4CAF50",
                      boxShadow: "0 0 8px #4CAF50",
                    }}
                  />
                  <div>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "#FFFFFF" }}>
                      Mia Bella&apos;s Pinpoint
                    </span>
                    <span style={{ fontSize: "11px", color: "#D4AF37", marginLeft: "6px" }}>
                      ★ 5.0 Google Verified
                    </span>
                  </div>
                </div>

                {/* Map Mode Switcher */}
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    borderRadius: "8px",
                    padding: "2px",
                    border: "1px solid rgba(212, 175, 55, 0.2)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setMapTheme("dark")}
                    style={{
                      padding: "4px 12px",
                      borderRadius: "6px",
                      fontSize: "11px",
                      fontWeight: 700,
                      cursor: "pointer",
                      border: "none",
                      backgroundColor: mapTheme === "dark" ? "#D4AF37" : "transparent",
                      color: mapTheme === "dark" ? "#0A060E" : "#C5BDB0",
                      transition: "all 0.15s ease",
                    }}
                  >
                    Street Map
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapTheme("satellite")}
                    style={{
                      padding: "4px 12px",
                      borderRadius: "6px",
                      fontSize: "11px",
                      fontWeight: 700,
                      cursor: "pointer",
                      border: "none",
                      backgroundColor: mapTheme === "satellite" ? "#D4AF37" : "transparent",
                      color: mapTheme === "satellite" ? "#0A060E" : "#C5BDB0",
                      transition: "all 0.15s ease",
                    }}
                  >
                    Satellite Aerial
                  </button>
                </div>
              </div>

              {/* Embedded Google Maps iframe */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "440px",
                  backgroundColor: "#0A060E",
                }}
              >
                <iframe
                  title="Mia Bella's Hair Salon Google Maps Location"
                  src={mapTheme === "satellite" ? data.mapEmbedSatelliteUrl : data.mapEmbedDarkUrl}
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: mapTheme === "dark" ? "invert(90%) hue-rotate(180deg) contrast(1.1) brightness(0.95)" : "none",
                  }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Pinpoint Floating Badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "16px",
                    backgroundColor: "rgba(10, 6, 14, 0.92)",
                    border: "1px solid #D4AF37",
                    borderRadius: "10px",
                    padding: "8px 14px",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.6)",
                    maxWidth: "calc(100% - 32px)",
                  }}
                >
                  <IconMapPin size={16} color="#E6C875" />
                  <span style={{ fontSize: "12px", color: "#FFFFFF", fontWeight: 600 }}>
                    329 East Ave, Lockport, NY 14094
                  </span>
                </div>
              </div>

              {/* Map Footer Bar */}
              <div
                style={{
                  padding: "14px 20px",
                  backgroundColor: "#110B1B",
                  borderTop: "1px solid rgba(212, 175, 55, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  color: "#9E9485",
                }}
              >
                <span>GPS: 43.1744&deg; N, -78.6773&deg; W</span>
                <a
                  href={data.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#E6C875",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  View Large Map &amp; Reviews &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. ON-PAGE DIRECT BOOKING & CONSULTATION HUB (#book) */}
      <section
        id="book"
        style={{
          padding: "80px 20px",
          backgroundColor: "#0A060E",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div
            style={{
              backgroundColor: "rgba(18, 12, 26, 0.95)",
              border: "2px solid #D4AF37",
              borderRadius: "24px",
              padding: "44px 28px",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(212, 175, 55, 0.18)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "rgba(212, 175, 55, 0.15)",
                color: "#E6C875",
                padding: "4px 14px",
                borderRadius: "99px",
                fontSize: "11px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "16px",
              }}
            >
              <IconMoon size={14} color="#E6C875" />
              <span>Instant Digital Chair Dispatch</span>
            </div>

            <h2 className="mb-font-serif" style={{ fontSize: "clamp(26px, 4vw, 38px)", color: "#FFFFFF", margin: "0 0 14px" }}>
              Ready to Manifest Your Dream Hair?
            </h2>

            <p style={{ fontSize: "14.5px", color: "#C5BDB0", lineHeight: 1.6, margin: "0 0 28px", maxWidth: "580px", marginInline: "auto" }}>
              Schedule your vivid hair ritual directly through our digital portal, or calculate your exact chair hours and chemical formula investment in under 60 seconds.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap", marginBottom: "28px" }}>
              <button
                type="button"
                onClick={() => handleOpenBooking()}
                className="mb-btn-gold"
                style={{
                  padding: "15px 32px",
                  borderRadius: "12px",
                  fontSize: "15px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <IconScissors size={18} color="#0A060E" />
                <span>Reserve Salon Appointment</span>
              </button>

              <button
                type="button"
                onClick={handleOpenQuiz}
                className="mb-btn-outline"
                style={{
                  padding: "15px 28px",
                  borderRadius: "12px",
                  fontSize: "15px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <IconSparkles size={18} color="#D4AF37" />
                <span>Launch Hair Color Calculator</span>
              </button>
            </div>

            <div style={{ fontSize: "12.5px", color: "#8E8679" }}>
              Walk-ins always welcome Tue, Thu, Fri, Sat (12–8 PM). For immediate dispatch questions, text <strong>(716) 395-6352</strong>.
            </div>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer
        style={{
          borderTop: "1px solid rgba(212, 175, 55, 0.2)",
          backgroundColor: "#07040A",
          padding: "40px 20px",
          textAlign: "center",
          fontSize: "12.5px",
          color: "#8E8679",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <span className="mb-font-serif" style={{ fontSize: "18px", color: "#FFFFFF", fontWeight: 700 }}>
              Mia Bella&apos;s Hair Salon &amp; Magick Boutique
            </span>
          </div>
          <p style={{ margin: "0 0 10px", color: "#C5BDB0" }}>
            Award-Winning Vivid Color Alchemy • Botanical Scalp Wellness • Metaphysical Apothecary • Lockport, NY 14094
          </p>
          <p style={{ margin: "0 0 18px", color: "#D4AF37", fontWeight: 700 }}>
            Call or Text: <a href="tel:+17163956352" style={{ color: "#E6C875", textDecoration: "none" }}>(716) 395-6352</a>
          </p>
          <div style={{ fontSize: "11px", color: "#6A6256" }}>
            &copy; 2026 Mia Bella&apos;s Hair Salon and Magick Boutique. All Rights Reserved. Concept preview built for owner review.
          </div>
        </div>
      </footer>

      {/* MODALS */}
      <HairAlchemyQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onProceedToBooking={handleProceedFromQuizToBooking}
      />

      <MiaBellaBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialData={quizTransferData}
        defaultServiceId={selectedServiceId}
      />

      <MagickBoutiqueModal
        isOpen={isBoutiqueOpen}
        onClose={() => setIsBoutiqueOpen(false)}
        onBookWithProduct={(prodName) => {
          setIsBoutiqueOpen(false);
          setIsBookingOpen(true);
        }}
      />
    </div>
  );
}
