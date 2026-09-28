"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  LUCKY_LEAF_DATA,
  FlashDesign,
  PortfolioWork,
  ClientReview
} from "@/data/luckyLeafData";
import { LuckyLeafBookingModal } from "./lucky-leaf/LuckyLeafBookingModal";
import { LuckyLeafFlashModal } from "./lucky-leaf/LuckyLeafFlashModal";
import {
  IconGinkgo,
  IconCrane,
  IconNeedle,
  IconShieldCheck,
  IconCalendar,
  IconClock,
  IconRuler,
  IconSparkles,
  IconStar,
  IconClose,
  IconMenu,
  IconArrowRight,
  IconMapPin,
  IconHeart,
  IconInfo,
  IconUpload,
  IconTrash,
  IconCheck
} from "./lucky-leaf/LuckyLeafIcons";

export default function PreviewLuckyLeaf() {
  const data = LUCKY_LEAF_DATA;

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedFlashForBooking, setSelectedFlashForBooking] =
    useState<FlashDesign | null>(null);
  const [activeFlashModal, setActiveFlashModal] = useState<FlashDesign | null>(
    null
  );

  // Gallery filters
  const [flashFilter, setFlashFilter] = useState<string>("All");
  const [portfolioFilter, setPortfolioFilter] = useState<string>("All");

  // Mobile menu
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Active FAQ
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filtered Flash
  const filteredFlash = data.availableFlashDesigns.filter((item) => {
    if (flashFilter === "All") return true;
    return item.category === flashFilter;
  });

  // Filtered Portfolio
  const filteredPortfolio = data.portfolioWorks.filter((item) => {
    if (portfolioFilter === "All") return true;
    return item.category === portfolioFilter;
  });

  // Handlers
  const handleOpenGeneralBooking = () => {
    setSelectedFlashForBooking(null);
    setIsBookingOpen(true);
  };

  const handleClaimFlash = (design: FlashDesign) => {
    setActiveFlashModal(null);
    setSelectedFlashForBooking(design);
    setIsBookingOpen(true);
  };

  const handleCraneProjectBooking = () => {
    setSelectedFlashForBooking(null);
    setIsBookingOpen(true);
  };

  return (
    <div
      style={{
        backgroundColor: "#FAF7F2",
        color: "#1C1B1A",
        minHeight: "100vh",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        lineHeight: 1.6,
        overflowX: "hidden",
        width: "100%",
        maxWidth: "100vw",
        position: "relative"
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        .ll-serif {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .ll-sans {
          font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
        }

        /* Container constraints */
        .ll-container {
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          padding-left: 20px;
          padding-right: 20px;
        }

        /* Button Hover Effects */
        .ll-btn-primary {
          background-color: #4A5F4E;
          color: #FFFFFF;
          border: 1px solid #4A5F4E;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ll-btn-primary:hover {
          background-color: #384A3B;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px -4px rgba(74, 95, 78, 0.35);
        }

        .ll-btn-outline {
          background-color: transparent;
          color: #4A5F4E;
          border: 1px solid rgba(74, 95, 78, 0.4);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ll-btn-outline:hover {
          background-color: rgba(74, 95, 78, 0.08);
          border-color: #4A5F4E;
          transform: translateY(-1px);
        }

        /* Card Hover */
        .ll-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .ll-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px -8px rgba(28, 27, 26, 0.1);
        }

        /* Responsive Grids */
        @media (max-width: 900px) {
          .ll-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .ll-hero-image-col {
            order: -1;
          }
          .ll-hide-mobile {
            display: none !important;
          }
          .ll-show-mobile {
            display: block !important;
          }
        }

        @media (min-width: 901px) {
          .ll-show-mobile {
            display: none !important;
          }
        }

        @media (max-width: 640px) {
          .ll-flash-grid {
            grid-template-columns: 1fr !important;
          }
          .ll-portfolio-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .ll-reviews-grid {
            grid-template-columns: 1fr !important;
          }
          .ll-sanctuary-grid {
            grid-template-columns: 1fr !important;
          }
          .ll-hero-title {
            font-size: 32px !important;
            line-height: 1.2 !important;
          }

          /* Mobile Button Centering & Touch Optimization */
          .ll-hero-cta-group {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 12px !important;
            margin-bottom: 32px !important;
            width: 100% !important;
          }
          .ll-hero-cta-group button,
          .ll-hero-cta-group a {
            width: 100% !important;
            max-width: 320px !important;
            justify-content: center !important;
            text-align: center !important;
          }

          .ll-senbazuru-btn-wrap {
            display: flex !important;
            justify-content: center !important;
            width: 100% !important;
            margin-top: 16px !important;
          }
          .ll-senbazuru-btn-wrap button {
            width: 100% !important;
            max-width: 320px !important;
            justify-content: center !important;
            text-align: center !important;
          }

          .ll-mobile-center-btn-wrap {
            display: flex !important;
            justify-content: center !important;
            width: 100% !important;
          }
          .ll-mobile-center-btn-wrap button,
          .ll-mobile-center-btn-wrap a {
            width: 100% !important;
            max-width: 320px !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }
      `}</style>

      {/* 0. Top Pitch Banner for Din Tran / Client Outreach */}
      <aside
        aria-label="Website proposal notice"
        style={{
          backgroundColor: "#1C1B1A",
          color: "#E2DDD5",
          padding: "10px 16px",
          fontSize: "12px",
          borderBottom: "1px solid rgba(255,255,255,0.08)"
        }}
      >
        <div
          className="ll-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                backgroundColor: "#4A5F4E",
                color: "#FFFFFF",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "2px 8px",
                borderRadius: "4px"
              }}
            >
              Interactive Studio Concept
            </span>
            <span>
              Prepared exclusively for <strong>Din Tran & Lucky Leaf Tattoo</strong> (1809 Hertel Ave, Buffalo NY)
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ color: "#9E9A93", fontSize: "11px" }}>
              Private Sanctuary Intake Flow
            </span>
            <a
              href="#booking-guide"
              style={{
                color: "#D4AF37",
                textDecoration: "underline",
                fontWeight: 600
              }}
            >
              How It Works
            </a>
          </div>
        </div>
      </aside>

      {/* 1. Master Header / Navigation */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: "rgba(250, 247, 242, 0.94)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(74, 95, 78, 0.12)"
        }}
      >
        <div
          className="ll-container"
          style={{
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          {/* Brand Logo & Name */}
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
              color: "#1C1B1A"
            }}
          >
            <div
              style={{
                position: "relative",
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(74, 95, 78, 0.2)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                src="/images/demo/lucky-leaf/logo-ginkgo.png"
                alt="Lucky Leaf Ginkgo Leaf Sigil"
                width={36}
                height={36}
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            <div>
              <span
                className="ll-serif"
                style={{
                  display: "block",
                  fontSize: "19px",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.1
                }}
              >
                Lucky Leaf Tattoo
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: "11px",
                  color: "#6B6760",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase"
                }}
              >
                Private Studio • Buffalo, NY
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav
            className="ll-hide-mobile"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "28px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#54504A"
            }}
          >
            <a
              href="#flash-gallery"
              style={{
                textDecoration: "none",
                color: "inherit",
                transition: "color 0.2s"
              }}
            >
              1-of-1 Flash
            </a>
            <a
              href="#healed-works"
              style={{
                textDecoration: "none",
                color: "inherit",
                transition: "color 0.2s"
              }}
            >
              Portfolio
            </a>
            <a
              href="#senbazuru"
              style={{
                textDecoration: "none",
                color: "inherit",
                transition: "color 0.2s"
              }}
            >
              1,000 Cranes
            </a>
            <a
              href="#sanctuary"
              style={{
                textDecoration: "none",
                color: "inherit",
                transition: "color 0.2s"
              }}
            >
              The Sanctuary
            </a>
            <a
              href="#reviews"
              style={{
                textDecoration: "none",
                color: "inherit",
                transition: "color 0.2s"
              }}
            >
              Reviews (5.0★)
            </a>
            <a
              href="#booking-guide"
              style={{
                textDecoration: "none",
                color: "inherit",
                transition: "color 0.2s"
              }}
            >
              Guidelines
            </a>
          </nav>

          {/* Header Action Button */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              id="header-inquire-btn"
              onClick={handleOpenGeneralBooking}
              className="ll-btn-primary ll-hide-mobile"
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <IconGinkgo size={16} color="#FFF" />
              <span>Inquire / Book</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="ll-show-mobile"
              aria-label="Toggle navigation menu"
              style={{
                background: "none",
                border: "1px solid rgba(74, 95, 78, 0.2)",
                borderRadius: "8px",
                padding: "8px",
                color: "#1C1B1A",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {isMobileNavOpen ? <IconClose size={22} /> : <IconMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileNavOpen && (
          <div
            style={{
              backgroundColor: "#FAF7F2",
              borderBottom: "1px solid rgba(74, 95, 78, 0.15)",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "16px"
            }}
          >
            {[
              { label: "1-of-1 Flash Catalog", href: "#flash-gallery" },
              { label: "Healed Portfolio Works", href: "#healed-works" },
              { label: "1,000 Paper Cranes Project", href: "#senbazuru" },
              { label: "The Private Sanctuary", href: "#sanctuary" },
              { label: "Verified Reviews (5.0★)", href: "#reviews" },
              { label: "Booking Guide & Policies", href: "#booking-guide" }
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileNavOpen(false)}
                style={{
                  textDecoration: "none",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#1C1B1A",
                  padding: "4px 0",
                  borderBottom: "1px dashed rgba(74, 95, 78, 0.1)"
                }}
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={() => {
                setIsMobileNavOpen(false);
                handleOpenGeneralBooking();
              }}
              className="ll-btn-primary"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                marginTop: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px"
              }}
            >
              <IconGinkgo size={16} color="#FFF" />
              <span>Inquire / Request Appointment</span>
            </button>
          </div>
        )}
      </header>

      <main>
        {/* 2. Hero Section */}
        <section
          style={{
            padding: "68px 0 68px 0",
            position: "relative"
          }}
        >
          <div className="ll-container">
            <div
              className="ll-hero-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 0.9fr",
                alignItems: "center",
                gap: "48px"
              }}
            >
              {/* Left Column: Messaging & Conversion */}
              <div>
                {/* Location & Sanctuary Pill */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "rgba(74, 95, 78, 0.08)",
                    border: "1px solid rgba(74, 95, 78, 0.2)",
                    borderRadius: "30px",
                    padding: "6px 14px",
                    marginBottom: "20px"
                  }}
                >
                  <IconMapPin size={14} color="#4A5F4E" />
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#4A5F4E",
                      letterSpacing: "0.02em"
                    }}
                  >
                    1809 Hertel Ave • Buffalo, NY
                  </span>
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      backgroundColor: "#4A5F4E"
                    }}
                  />
                  <span style={{ fontSize: "11px", color: "#6B6760" }}>
                    Private Suite Only
                  </span>
                </div>

                {/* Main Headline */}
                <h1
                  className="ll-serif ll-hero-title"
                  style={{
                    fontSize: "44px",
                    lineHeight: 1.15,
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: "#1C1B1A",
                    margin: "0 0 18px 0"
                  }}
                >
                  Fine-Line Botanical, Fauna & Mindful Body Art
                </h1>

                {/* Subheadline grounded in client psychology */}
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.65,
                    color: "#54504A",
                    margin: "0 0 28px 0",
                    maxWidth: "540px"
                  }}
                >
                  A calm, inclusive sanctuary on Hertel Avenue crafted for meaningful self-expression. No loud street shop chaos, no intimidation—just fine single-needle precision, gentle pacing, and collaborative design where you are genuinely taken care of.
                </p>

                {/* CTA Action Buttons */}
                <div
                  className="ll-hero-cta-group"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "12px",
                    marginBottom: "36px"
                  }}
                >
                  <button
                    id="hero-request-appointment-btn"
                    onClick={handleOpenGeneralBooking}
                    className="ll-btn-primary"
                    style={{
                      padding: "14px 28px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                  >
                    <span>Request Appointment</span>
                    <IconArrowRight size={16} color="#FFF" />
                  </button>

                  <a
                    href="#flash-gallery"
                    id="hero-explore-flash-btn"
                    className="ll-btn-outline"
                    style={{
                      padding: "13px 22px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: 600,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                  >
                    <IconSparkles size={15} color="#4A5F4E" />
                    <span>Explore 1-of-1 Flash</span>
                  </a>
                </div>

                {/* Trust Badges */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                    gap: "16px",
                    paddingTop: "20px",
                    borderTop: "1px solid rgba(74, 95, 78, 0.12)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        color: "#EAB308",
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <IconStar size={18} />
                    </div>
                    <div>
                      <span
                        style={{
                          display: "block",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#1C1B1A"
                        }}
                      >
                        5.0 Perfect Rating
                      </span>
                      <span style={{ fontSize: "11px", color: "#6B6760" }}>
                        112 Google Reviews
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ color: "#4A5F4E" }}>
                      <IconNeedle size={18} />
                    </div>
                    <div>
                      <span
                        style={{
                          display: "block",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#1C1B1A"
                        }}
                      >
                        Fine-Line Mastery
                      </span>
                      <span style={{ fontSize: "11px", color: "#6B6760" }}>
                        Micro-detail & light hand
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ color: "#4A5F4E" }}>
                      <IconShieldCheck size={18} />
                    </div>
                    <div>
                      <span
                        style={{
                          display: "block",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#1C1B1A"
                        }}
                      >
                        3–5 Day Sketch
                      </span>
                      <span style={{ fontSize: "11px", color: "#6B6760" }}>
                        Emailed prior to session
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Real Tattoo Art on Skin */}
              <div
                className="ll-hero-image-col"
                style={{
                  position: "relative",
                  maxWidth: "440px",
                  width: "100%",
                  margin: "0 auto"
                }}
              >
                <div
                  style={{
                    position: "relative",
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: "1px solid rgba(74, 95, 78, 0.2)",
                    boxShadow: "0 16px 36px -8px rgba(28, 27, 26, 0.12)",
                    aspectRatio: "4/5",
                    maxHeight: "490px",
                    backgroundColor: "#FFFFFF"
                  }}
                >
                  <Image
                    id="hero-real-tattoo-img"
                    src="/images/demo/lucky-leaf/hero-tattoo-real.jpg"
                    alt="Minimalist fine-line botanical and ginkgo tattoo on shoulder and collarbone by Lucky Leaf Tattoo"
                    fill
                    sizes="(max-width: 900px) 100vw, 440px"
                    priority
                    style={{
                      objectFit: "cover",
                      objectPosition: "center 28%"
                    }}
                  />

                  {/* Gradient Overlay for subtle depth */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(28,27,26,0.65) 0%, rgba(28,27,26,0.05) 50%, transparent 100%)"
                    }}
                  />

                  {/* Floating Aesthetic Ginkgo Badge inside Image */}
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      backgroundColor: "rgba(255, 255, 255, 0.92)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      borderRadius: "50%",
                      width: "48px",
                      height: "48px",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                      border: "1px solid rgba(74, 95, 78, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#4A5F4E",
                      zIndex: 2
                    }}
                  >
                    <IconGinkgo size={24} />
                  </div>

                  {/* Floating Caption inside Hero Photo */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "16px",
                      left: "16px",
                      right: "16px",
                      backgroundColor: "rgba(255, 255, 255, 0.94)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      borderRadius: "12px",
                      padding: "12px 14px",
                      border: "1px solid rgba(74, 95, 78, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      zIndex: 2
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "10px",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: "#4A5F4E",
                          fontWeight: 700,
                          display: "block"
                        }}
                      >
                        Healed Fine-Line Botanical
                      </span>
                      <span
                        className="ll-serif"
                        style={{
                          fontSize: "15px",
                          fontWeight: 600,
                          color: "#1C1B1A"
                        }}
                      >
                        Ginkgo & Blossom Sprig
                      </span>
                    </div>

                    <div
                      style={{
                        backgroundColor: "rgba(74, 95, 78, 0.1)",
                        borderRadius: "8px",
                        padding: "5px 9px",
                        fontSize: "11px",
                        color: "#4A5F4E",
                        fontWeight: 600
                      }}
                    >
                      Din Tran (@dintran)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. The 1,000 Paper Cranes Project (Senbazuru) */}
        <section
          id="senbazuru"
          style={{
            padding: "54px 0",
            backgroundColor: "#F3EFE9",
            borderTop: "1px solid rgba(74, 95, 78, 0.1)",
            borderBottom: "1px solid rgba(74, 95, 78, 0.1)"
          }}
        >
          <div className="ll-container">
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid rgba(74, 95, 78, 0.15)",
                padding: "36px 32px",
                boxShadow: "0 8px 24px -4px rgba(28, 27, 26, 0.05)",
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                alignItems: "center",
                gap: "28px"
              }}
              className="ll-hero-grid"
            >
              {/* Icon Emblem */}
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(74, 95, 78, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#4A5F4E"
                }}
              >
                <IconCrane size={38} />
              </div>

              {/* Story */}
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#C48B77",
                    marginBottom: "6px"
                  }}
                >
                  <IconSparkles size={12} color="#C48B77" />
                  <span>The Senbazuru Journey</span>
                </div>
                <h2
                  className="ll-serif"
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "#1C1B1A"
                  }}
                >
                  {data.paperCranesStory.title}
                </h2>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    lineHeight: 1.6,
                    color: "#54504A",
                    maxWidth: "680px"
                  }}
                >
                  {data.paperCranesStory.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="ll-senbazuru-btn-wrap">
                <button
                  onClick={handleCraneProjectBooking}
                  className="ll-btn-primary"
                  style={{
                    padding: "12px 20px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <IconCrane size={16} color="#FFF" />
                  <span>Request a Crane Piece</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 1-of-1 Original Flash Catalog (Tattooed Only Once) */}
        <section
          id="flash-gallery"
          style={{
            padding: "64px 0"
          }}
        >
          <div className="ll-container">
            {/* Section Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: "16px",
                marginBottom: "32px"
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#4A5F4E",
                    fontWeight: 700,
                    marginBottom: "6px"
                  }}
                >
                  Exclusive Art Catalog
                </div>
                <h2
                  className="ll-serif"
                  style={{
                    fontSize: "32px",
                    fontWeight: 600,
                    color: "#1C1B1A",
                    margin: "0 0 6px 0"
                  }}
                >
                  1-of-1 Claimable Flash Art
                </h2>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6B6760",
                    margin: 0,
                    maxWidth: "520px"
                  }}
                >
                  Pre-designed original artwork by Din Tran. Each piece is tattooed <strong>only once</strong>, permanently retired, and receives calendar priority at a special project rate.
                </p>
              </div>

              {/* Filter Pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {["All", "Japanese Line Art", "Botanical", "Fauna"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFlashFilter(cat)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: flashFilter === cat ? 600 : 400,
                      border:
                        flashFilter === cat
                          ? "1px solid #4A5F4E"
                          : "1px solid rgba(74, 95, 78, 0.2)",
                      backgroundColor:
                        flashFilter === cat ? "#4A5F4E" : "#FFFFFF",
                      color: flashFilter === cat ? "#FFFFFF" : "#54504A",
                      cursor: "pointer",
                      transition: "all 0.15s ease"
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Flash Cards Grid */}
            <div
              className="ll-flash-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px"
              }}
            >
              {filteredFlash.map((flash) => (
                <div
                  key={flash.id}
                  className="ll-card"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: "1px solid rgba(74, 95, 78, 0.15)",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 4px 16px rgba(28, 27, 26, 0.04)"
                  }}
                >
                  {/* Artwork Preview */}
                  <div
                    onClick={() => setActiveFlashModal(flash)}
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "260px",
                      backgroundColor: "#FAF7F2",
                      cursor: "pointer"
                    }}
                  >
                    <Image
                      src={flash.image}
                      alt={flash.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 380px"
                      style={{ objectFit: "contain", padding: "16px" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "1px solid rgba(74, 95, 78, 0.2)",
                        borderRadius: "16px",
                        padding: "3px 8px",
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "#4A5F4E",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em"
                      }}
                    >
                      1-of-1 • {flash.category}
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        bottom: "12px",
                        right: "12px",
                        backgroundColor: "#4A5F4E",
                        color: "#FFFFFF",
                        borderRadius: "16px",
                        padding: "3px 8px",
                        fontSize: "10px",
                        fontWeight: 600
                      }}
                    >
                      Min: {flash.minSize}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div
                    style={{
                      padding: "18px 20px",
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                      justifyContent: "space-between"
                    }}
                  >
                    <div>
                      <h3
                        className="ll-serif"
                        style={{
                          margin: "0 0 6px 0",
                          fontSize: "18px",
                          fontWeight: 600,
                          color: "#1C1B1A"
                        }}
                      >
                        {flash.title}
                      </h3>
                      <p
                        style={{
                          margin: "0 0 14px 0",
                          fontSize: "12px",
                          lineHeight: 1.5,
                          color: "#6B6760"
                        }}
                      >
                        {flash.description}
                      </p>
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#8C867A",
                          marginBottom: "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px"
                        }}
                      >
                        <IconGinkgo size={13} color="#4A5F4E" />
                        <span>Recommended: {flash.recommendedPlacement}</span>
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "8px"
                        }}
                      >
                        <button
                          onClick={() => setActiveFlashModal(flash)}
                          style={{
                            padding: "9px 12px",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 500,
                            border: "1px solid rgba(74, 95, 78, 0.3)",
                            backgroundColor: "#FFFFFF",
                            color: "#54504A",
                            cursor: "pointer"
                          }}
                        >
                          View Details
                        </button>

                        <button
                          onClick={() => handleClaimFlash(flash)}
                          className="ll-btn-primary"
                          style={{
                            padding: "9px 12px",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px"
                          }}
                        >
                          <IconSparkles size={13} color="#FFF" />
                          <span>Claim Piece</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Healed Portfolio Works (Linework & Flow Precision) */}
        <section
          id="healed-works"
          style={{
            padding: "64px 0",
            backgroundColor: "#F6F2EC",
            borderTop: "1px solid rgba(74, 95, 78, 0.1)",
            borderBottom: "1px solid rgba(74, 95, 78, 0.1)"
          }}
        >
          <div className="ll-container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: "16px",
                marginBottom: "32px"
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#4A5F4E",
                    fontWeight: 700,
                    marginBottom: "6px"
                  }}
                >
                  Real Client Results
                </div>
                <h2
                  className="ll-serif"
                  style={{
                    fontSize: "32px",
                    fontWeight: 600,
                    color: "#1C1B1A",
                    margin: "0 0 6px 0"
                  }}
                >
                  Healed Linework & Anatomy Flow
                </h2>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6B6760",
                    margin: 0,
                    maxWidth: "520px"
                  }}
                >
                  Each tattoo is custom contoured to the natural flow of your muscles, designed to age gracefully with delicate needle depth and balanced spacing.
                </p>
              </div>

              {/* Portfolio Filter */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {["All", "Botanical", "Fauna", "Symbolic"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setPortfolioFilter(cat)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: portfolioFilter === cat ? 600 : 400,
                      border:
                        portfolioFilter === cat
                          ? "1px solid #4A5F4E"
                          : "1px solid rgba(74, 95, 78, 0.2)",
                      backgroundColor:
                        portfolioFilter === cat ? "#4A5F4E" : "#FFFFFF",
                      color: portfolioFilter === cat ? "#FFFFFF" : "#54504A",
                      cursor: "pointer",
                      transition: "all 0.15s ease"
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Portfolio Grid */}
            <div
              className="ll-portfolio-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "16px"
              }}
            >
              {filteredPortfolio.map((item) => (
                <div
                  key={item.id}
                  className="ll-card"
                  style={{
                    position: "relative",
                    borderRadius: "12px",
                    overflow: "hidden",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid rgba(74, 95, 78, 0.15)",
                    aspectRatio: "1/1",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 900px) 33vw, 280px"
                    style={{ objectFit: "cover" }}
                  />

                  {/* Hover Caption Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(28,27,26,0.85) 0%, rgba(28,27,26,0.2) 60%, transparent 100%)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      padding: "12px",
                      color: "#FFFFFF"
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "#D4AF37",
                        fontWeight: 600
                      }}
                    >
                      {item.placement}
                    </span>
                    <h4
                      style={{
                        margin: "2px 0 0 0",
                        fontSize: "13px",
                        fontWeight: 600
                      }}
                    >
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            {/* Appointment Consultation Prompt */}
            <div
              className="ll-mobile-center-btn-wrap"
              style={{
                marginTop: "32px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                flexWrap: "wrap"
              }}
            >
              <button
                onClick={handleOpenGeneralBooking}
                className="ll-btn-primary"
                style={{
                  padding: "13px 26px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <span>Ready to Inquire? Open Booking Intake</span>
                <IconArrowRight size={16} color="#FFF" />
              </button>
            </div>
          </div>
        </section>

        {/* 6. The Sanctuary Experience (Addressing Tattoo Anxiety & Intimidation) */}
        <section
          id="sanctuary"
          style={{
            padding: "64px 0"
          }}
        >
          <div className="ll-container">
            <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 48px auto" }}>
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#4A5F4E",
                  fontWeight: 700
                }}
              >
                Mindful Studio Philosophy
              </span>
              <h2
                className="ll-serif"
                style={{
                  fontSize: "34px",
                  fontWeight: 600,
                  color: "#1C1B1A",
                  margin: "8px 0 12px 0"
                }}
              >
                Why Lucky Leaf is Different
              </h2>
              <p style={{ fontSize: "15px", color: "#6B6760", margin: 0, lineHeight: 1.6 }}>
                Street shops can be intimidating, loud, and rushed. Lucky Leaf was intentionally created as an inclusive, gentle private sanctuary where your comfort and safety come first.
              </p>
            </div>

            <div
              className="ll-sanctuary-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "20px"
              }}
            >
              {[
                {
                  icon: <IconHeart size={24} color="#4A5F4E" />,
                  title: "Zero-Intimidation Space",
                  desc: "A warm, judgment-free, LGBTQ+-affirming private suite. Whether it is your very first tattoo or your twentieth, you are welcomed with open arms."
                },
                {
                  icon: <IconNeedle size={24} color="#4A5F4E" />,
                  title: "Gentle Pacing & Light Hand",
                  desc: "Din is renowned across Buffalo for his delicate touch and patient approach. We take breathers whenever you need, with relaxing music and zero rush."
                },
                {
                  icon: <IconCalendar size={24} color="#4A5F4E" />,
                  title: "Collaborative 3–5 Day Sketch",
                  desc: "You will never walk in blind. Din delivers your digital sketch days in advance so we can adjust sizing, linework, and placement together."
                },
                {
                  icon: <IconShieldCheck size={24} color="#4A5F4E" />,
                  title: "Clinical-Grade Hygiene",
                  desc: "Single-use pre-sterilized cartridges, medical barrier films, and certified sanitation protocols exceeding all NY Department of Health guidelines."
                }
              ].map((pillar, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    padding: "24px 20px",
                    border: "1px solid rgba(74, 95, 78, 0.15)",
                    boxShadow: "0 4px 16px rgba(28, 27, 26, 0.03)"
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(74, 95, 78, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "16px"
                    }}
                  >
                    {pillar.icon}
                  </div>
                  <h3
                    className="ll-serif"
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "17px",
                      fontWeight: 600,
                      color: "#1C1B1A"
                    }}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "13px",
                      lineHeight: 1.6,
                      color: "#54504A"
                    }}
                  >
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Client Testimonials & Google 5.0 Proof */}
        <section
          id="reviews"
          style={{
            padding: "64px 0",
            backgroundColor: "#F3EFE9",
            borderTop: "1px solid rgba(74, 95, 78, 0.1)",
            borderBottom: "1px solid rgba(74, 95, 78, 0.1)"
          }}
        >
          <div className="ll-container">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "16px",
                marginBottom: "36px"
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#4A5F4E",
                    marginBottom: "4px"
                  }}
                >
                  <IconShieldCheck size={14} />
                  <span>Verified Google Business Reviews</span>
                </div>
                <h2
                  className="ll-serif"
                  style={{
                    fontSize: "32px",
                    fontWeight: 600,
                    color: "#1C1B1A",
                    margin: 0
                  }}
                >
                  Loved by 112+ Buffalo Collectors
                </h2>
              </div>

              {/* 5.0 Star Badge Summary */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(74, 95, 78, 0.18)",
                  borderRadius: "12px",
                  padding: "12px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
                }}
              >
                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#1C1B1A",
                      lineHeight: 1,
                      display: "block"
                    }}
                  >
                    5.0
                  </span>
                  <div style={{ display: "flex", gap: "2px", marginTop: "2px" }}>
                    {[...Array(5)].map((_, i) => (
                      <IconStar key={i} size={13} color="#EAB308" />
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    borderLeft: "1px solid #EBE6DC",
                    paddingLeft: "12px",
                    fontSize: "11px",
                    color: "#6B6760"
                  }}
                >
                  <strong>112 Google Reviews</strong>
                  <div>100% 5-Star Ratings</div>
                </div>
              </div>
            </div>

            {/* Review Cards Grid */}
            <div
              className="ll-reviews-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px"
              }}
            >
              {data.reviews.map((rev) => (
                <div
                  key={rev.id}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "14px",
                    padding: "24px",
                    border: "1px solid rgba(74, 95, 78, 0.12)",
                    boxShadow: "0 4px 16px rgba(28, 27, 26, 0.04)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    {/* Stars */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                        marginBottom: "12px"
                      }}
                    >
                      {[...Array(rev.rating)].map((_, i) => (
                        <IconStar key={i} size={14} color="#EAB308" />
                      ))}
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#8C867A",
                          marginLeft: "6px"
                        }}
                      >
                        {rev.timeAgo}
                      </span>
                    </div>

                    {/* Review Quote */}
                    <p
                      style={{
                        fontSize: "13px",
                        lineHeight: 1.6,
                        color: "#3A3732",
                        margin: "0 0 16px 0",
                        fontStyle: "italic"
                      }}
                    >
                      &quot;{rev.text}&quot;
                    </p>
                  </div>

                  <div
                    style={{
                      borderTop: "1px solid #F0ECE4",
                      paddingTop: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <div>
                      <span
                        style={{
                          display: "block",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#1C1B1A"
                        }}
                      >
                        {rev.author}
                      </span>
                      {rev.badge && (
                        <span
                          style={{
                            fontSize: "11px",
                            color: "#8C867A"
                          }}
                        >
                          {rev.badge}
                        </span>
                      )}
                    </div>

                    <span
                      style={{
                        fontSize: "10px",
                        backgroundColor: "rgba(74, 95, 78, 0.08)",
                        color: "#4A5F4E",
                        fontWeight: 600,
                        padding: "3px 8px",
                        borderRadius: "10px"
                      }}
                    >
                      {rev.highlightTheme}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Din Tran's Booking Guide & Intake Protocol */}
        <section
          id="booking-guide"
          style={{
            padding: "64px 0"
          }}
        >
          <div className="ll-container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "48px",
                alignItems: "center"
              }}
              className="ll-hero-grid"
            >
              {/* Left Column: Intake Checklist directly from Din's IG Story */}
              <div>
                <span
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#4A5F4E",
                    fontWeight: 700
                  }}
                >
                  Official Studio Protocol
                </span>
                <h2
                  className="ll-serif"
                  style={{
                    fontSize: "32px",
                    fontWeight: 600,
                    color: "#1C1B1A",
                    margin: "8px 0 16px 0"
                  }}
                >
                  What to Include in Your Inquiry
                </h2>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.6,
                    color: "#54504A",
                    margin: "0 0 24px 0"
                  }}
                >
                  To provide you with an accurate quote and calendar date, Din Tran requests the following 6 details when submitting your request:
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {[
                    {
                      num: "01",
                      title: "Detailed Description",
                      desc: "The core idea, motifs, symbolic meaning, or elements you want incorporated into the design."
                    },
                    {
                      num: "02",
                      title: "Location on Body",
                      desc: "Specific body placement (e.g., inner forearm, upper clavicle, rib cage, shoulder blade)."
                    },
                    {
                      num: "03",
                      title: "Approximate Size",
                      desc: "Rough dimensions in inches (e.g. 3\"x3\", 5\" vertical) to calculate stencil scale."
                    },
                    {
                      num: "04",
                      title: "Reference Pictures",
                      desc: "Photos of art styles, botanical species, or existing tattoos you admire (upload via form)."
                    },
                    {
                      num: "05",
                      title: "Timeframe & Desired Month",
                      desc: "When you are looking to get tattooed (accepting bookings for next month)."
                    },
                    {
                      num: "06",
                      title: "Preferred Days of the Week",
                      desc: "Which days work best for your schedule (Tuesdays through Saturdays)."
                    }
                  ].map((item) => (
                    <div
                      key={item.num}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "14px",
                        padding: "12px 14px",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "10px",
                        border: "1px solid rgba(74, 95, 78, 0.12)"
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#4A5F4E",
                          backgroundColor: "rgba(74, 95, 78, 0.08)",
                          padding: "3px 6px",
                          borderRadius: "4px"
                        }}
                      >
                        {item.num}
                      </span>
                      <div>
                        <strong
                          style={{
                            display: "block",
                            fontSize: "13px",
                            color: "#1C1B1A",
                            marginBottom: "2px"
                          }}
                        >
                          {item.title}
                        </strong>
                        <span style={{ fontSize: "12px", color: "#6B6760" }}>
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Policies & Commitment Card */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "16px",
                  padding: "32px",
                  border: "1px solid rgba(74, 95, 78, 0.18)",
                  boxShadow: "0 12px 32px -8px rgba(28, 27, 26, 0.06)"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "16px"
                  }}
                >
                  <IconShieldCheck size={24} color="#4A5F4E" />
                  <h3
                    className="ll-serif"
                    style={{
                      margin: 0,
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "#1C1B1A"
                    }}
                  >
                    Studio Deposit & Etiquette
                  </h3>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {data.bookingPolicies.rules.map((rule, idx) => (
                    <div
                      key={idx}
                      style={{
                        borderLeft: "2px solid #4A5F4E",
                        paddingLeft: "14px"
                      }}
                    >
                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#1C1B1A",
                          marginBottom: "3px"
                        }}
                      >
                        {rule.title}
                      </div>
                      <div style={{ fontSize: "12px", color: "#54504A", lineHeight: 1.5 }}>
                        {rule.desc}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: "24px",
                    padding: "16px",
                    borderRadius: "10px",
                    backgroundColor: "#FAF7F2",
                    border: "1px solid rgba(74, 95, 78, 0.15)"
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#4A5F4E",
                      marginBottom: "4px"
                    }}
                  >
                    Ready to begin your piece?
                  </div>
                  <p
                    style={{
                      margin: "0 0 12px 0",
                      fontSize: "12px",
                      color: "#6B6760",
                      lineHeight: 1.5
                    }}
                  >
                    Use our guided interactive intake form to attach references and reserve your consultation window.
                  </p>

                  <button
                    onClick={handleOpenGeneralBooking}
                    className="ll-btn-primary"
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px"
                    }}
                  >
                    <IconGinkgo size={16} color="#FFF" />
                    <span>Open Studio Booking Form</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Frequently Asked Questions (FAQ) */}
        <section
          style={{
            padding: "64px 0",
            backgroundColor: "#F6F2EC",
            borderTop: "1px solid rgba(74, 95, 78, 0.1)"
          }}
        >
          <div className="ll-container" style={{ maxWidth: "800px" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#4A5F4E",
                  fontWeight: 700
                }}
              >
                Questions & Answers
              </span>
              <h2
                className="ll-serif"
                style={{
                  fontSize: "30px",
                  fontWeight: 600,
                  color: "#1C1B1A",
                  margin: "6px 0 0 0"
                }}
              >
                Everything You Need to Know
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {data.faq.map((faqItem, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "10px",
                      border: "1px solid rgba(74, 95, 78, 0.15)",
                      overflow: "hidden"
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      style={{
                        width: "100%",
                        padding: "16px 20px",
                        textAlign: "left",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "12px"
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#1C1B1A"
                        }}
                      >
                        {faqItem.q}
                      </span>
                      <span
                        style={{
                          fontSize: "18px",
                          color: "#4A5F4E",
                          fontWeight: 600
                        }}
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <div
                        style={{
                          padding: "0 20px 18px 20px",
                          fontSize: "13px",
                          color: "#54504A",
                          lineHeight: 1.6,
                          borderTop: "1px solid #FAF7F2"
                        }}
                      >
                        {faqItem.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* 10. Studio Footer */}
      <footer
        style={{
          backgroundColor: "#1C1B1A",
          color: "#E2DDD5",
          padding: "64px 0 96px 0"
        }}
      >
        <div className="ll-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr 1fr",
              gap: "40px",
              marginBottom: "48px"
            }}
            className="ll-hero-grid"
          >
            {/* Studio Identity */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "14px"
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1C1B1A"
                  }}
                >
                  <IconGinkgo size={22} color="#1C1B1A" />
                </div>
                <span
                  className="ll-serif"
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#FFFFFF"
                  }}
                >
                  Lucky Leaf Tattoo
                </span>
              </div>
              <p
                style={{
                  fontSize: "13px",
                  color: "#9E9A93",
                  lineHeight: 1.6,
                  margin: "0 0 16px 0",
                  maxWidth: "340px"
                }}
              >
                An inclusive private tattoo sanctuary on Hertel Avenue in Buffalo, NY. Specializing in single-needle botanical linework, symbolic fauna, and mindful body art.
              </p>
              <div style={{ fontSize: "12px", color: "#D4AF37" }}>
                Artist & Owner: Din Tran (@dintran)
              </div>
            </div>

            {/* Studio Hours & Address */}
            <div>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  margin: "0 0 14px 0",
                  letterSpacing: "0.02em"
                }}
              >
                Studio Sanctuary Location
              </h4>
              <p
                style={{
                  fontSize: "13px",
                  color: "#9E9A93",
                  lineHeight: 1.6,
                  margin: "0 0 8px 0"
                }}
              >
                1809 Hertel Avenue<br />
                Buffalo, New York 14216-2436<br />
                North Buffalo Arts & Dining District
              </p>
              <p style={{ fontSize: "12px", color: "#6B6760", margin: 0 }}>
                Strictly by Private Appointment Only • No Walk-Ins
              </p>
            </div>

            {/* Quick Actions */}
            <div>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  margin: "0 0 14px 0",
                  letterSpacing: "0.02em"
                }}
              >
                Connect With Din
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <a
                  href="https://instagram.com/luckyleaftattoo"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#E2DDD5",
                    fontSize: "13px",
                    textDecoration: "none"
                  }}
                >
                  Instagram: @luckyleaftattoo
                </a>
                <a
                  href="https://instagram.com/dintran"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#E2DDD5",
                    fontSize: "13px",
                    textDecoration: "none"
                  }}
                >
                  Artist Portfolio: @dintran
                </a>
                <button
                  onClick={handleOpenGeneralBooking}
                  style={{
                    marginTop: "6px",
                    padding: "10px 16px",
                    borderRadius: "6px",
                    backgroundColor: "#4A5F4E",
                    color: "#FFFFFF",
                    fontSize: "12px",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    textAlign: "center"
                  }}
                >
                  Submit Tattoo Request
                </button>
              </div>
            </div>
          </div>

          {/* Copyright & ScaleBiz Attribution */}
          <div
            style={{
              paddingTop: "24px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              fontSize: "11px",
              color: "#6B6760"
            }}
          >
            <span>
              &copy; {new Date().getFullYear()} Lucky Leaf Tattoo Studio. All rights reserved.
            </span>
            <span>
              Web Sanctuary Architecture by ScaleBiz Digital Engine
            </span>
          </div>
        </div>
      </footer>

      {/* 11. Mobile Sticky Action Bar */}
      <div
        className="ll-show-mobile"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          backgroundColor: "rgba(250, 247, 242, 0.96)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderTop: "1px solid rgba(74, 95, 78, 0.15)",
          padding: "10px 16px",
          boxShadow: "0 -4px 16px rgba(0,0,0,0.06)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <span
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 700,
                color: "#1C1B1A"
              }}
            >
              Lucky Leaf Tattoo
            </span>
            <span style={{ fontSize: "10px", color: "#6B6760" }}>
              1809 Hertel Ave • Private Suite
            </span>
          </div>

          <button
            onClick={handleOpenGeneralBooking}
            className="ll-btn-primary"
            style={{
              padding: "10px 18px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <IconGinkgo size={16} color="#FFF" />
            <span>Inquire Now</span>
          </button>
        </div>
      </div>

      {/* 12. Modals */}
      <LuckyLeafBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedFlash={selectedFlashForBooking}
        onClearPreselectedFlash={() => setSelectedFlashForBooking(null)}
      />

      <LuckyLeafFlashModal
        design={activeFlashModal}
        isOpen={!!activeFlashModal}
        onClose={() => setActiveFlashModal(null)}
        onClaim={handleClaimFlash}
      />
    </div>
  );
}
