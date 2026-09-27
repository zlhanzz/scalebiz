"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FH_LAND_DATA, ServiceItem } from "@/data/fhLandServicesData";
import EstimateModal from "./EstimateModal";
import PropertyEstimatorModal, { EstimatorResultData } from "./PropertyEstimatorModal";
import {
  IconGrass,
  IconSnow,
  IconTruck,
  IconShovel,
  IconRuler,
  IconShieldCheck,
  IconClock,
  IconPhone,
  IconCalendar,
  IconStar,
  IconMapPin,
  IconCheck,
  IconSparkles,
} from "./FHIcons";

export default function PreviewFHLandServices() {
  const data = FH_LAND_DATA;
  const [activeSeason, setActiveSeason] = useState<"summer" | "winter">("summer");
  const [isEstimatorOpen, setIsEstimatorOpen] = useState<boolean>(false);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedServiceForEstimator, setSelectedServiceForEstimator] = useState<string>("");
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string>("");
  const [transferBookingData, setTransferBookingData] = useState<EstimatorResultData | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleOpenEstimator = (serviceName?: string) => {
    if (serviceName) {
      setSelectedServiceForEstimator(serviceName);
    } else {
      setSelectedServiceForEstimator(
        activeSeason === "summer"
          ? "Lawn Mowing & Precision Striping"
          : "Seasonal Driveway Snow Plowing Pass"
      );
    }
    setIsEstimatorOpen(true);
  };

  const handleOpenBooking = (serviceName?: string) => {
    setTransferBookingData(null);
    if (serviceName) {
      setSelectedServiceForBooking(serviceName);
    } else {
      setSelectedServiceForBooking(
        activeSeason === "summer"
          ? "Weekly Lawn Mowing & Diamond Striping"
          : "Seasonal Residential Driveway Snow Plowing"
      );
    }
    setIsBookingOpen(true);
  };

  const handleProceedFromEstimatorToBooking = (estData: EstimatorResultData) => {
    setIsEstimatorOpen(false);
    setTransferBookingData(estData);
    setIsBookingOpen(true);
  };

  return (
    <div
      suppressHydrationWarning
      style={{
        backgroundColor: "#F7FAF8",
        color: "#16231A",
        minHeight: "100vh",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        lineHeight: 1.6,
        overflowX: "hidden",
        width: "100%",
        maxWidth: "100vw",
        position: "relative",
      }}
    >
      <style href="fh-land-preview-style" precedence="default">{`
        .fh-desktop-nav {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .fh-mobile-toggle {
          display: none !important;
        }
        .fh-mobile-drawer {
          display: none !important;
        }
        @media (max-width: 960px) {
          .fh-desktop-nav {
            display: none !important;
          }
          .fh-desktop-tel {
            display: none !important;
          }
          .fh-mobile-toggle {
            display: inline-flex !important;
          }
          .fh-mobile-drawer.open {
            display: flex !important;
          }
        }
      `}</style>

      {/* 1. TOP ANNOUNCEMENT & DISPATCH BAR */}
      <div
        style={{
          backgroundColor: "#112015",
          color: "#E2EDE5",
          fontSize: "12.5px",
          fontWeight: 500,
          padding: "8px 16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "14px",
          flexWrap: "wrap",
          letterSpacing: "0.2px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <IconShieldCheck size={14} color="#68BA7F" />
          <span>Fully Licensed &amp; Insured • Lockport &amp; Niagara County</span>
        </div>
        <span style={{ opacity: 0.35 }}>|</span>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#68BA7F", fontWeight: 700 }}>
          <IconSparkles size={13} color="#68BA7F" />
          <span>Online Route Booking Open • Guaranteed Handshake Rates</span>
        </div>
      </div>

      {/* 2. MAIN HEADER NAVIGATION */}
      <header
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.96)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid #DCE6DF",
          position: "sticky",
          top: 0,
          zIndex: 40,
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          {/* Brand Logo & Name */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
            <div style={{ width: "42px", height: "42px", position: "relative", flexShrink: 0 }}>
              <img
                src="/images/demo/fh-land/logo.png"
                alt="FH Land Services Logo"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <div>
              <span
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(18px, 4vw, 22px)",
                  fontWeight: 800,
                  color: "#112015",
                  letterSpacing: "0.5px",
                  display: "block",
                  lineHeight: 1.1,
                }}
              >
                FH LAND SERVICES
              </span>
              <span
                style={{
                  fontSize: "10px",
                  letterSpacing: "1.4px",
                  textTransform: "uppercase",
                  color: "#1E4D2B",
                  fontWeight: 700,
                  display: "block",
                  marginTop: "2px",
                }}
              >
                Landscaping • Snow Removal
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="fh-desktop-nav" style={{ fontSize: "14px", fontWeight: 600, color: "#3B4E41" }}>
            <a href="#services" style={{ textDecoration: "none", color: "inherit" }}>
              Services
            </a>
            <a href="#gallery" style={{ textDecoration: "none", color: "inherit" }}>
              Work Gallery
            </a>
            <a href="#story" style={{ textDecoration: "none", color: "inherit" }}>
              Our Crew
            </a>
            <a href="#reviews" style={{ textDecoration: "none", color: "inherit" }}>
              Reviews
            </a>
            <a href="#areas" style={{ textDecoration: "none", color: "inherit" }}>
              Service Area
            </a>
          </nav>

          {/* Right Action Items: Distinct Estimate & Book buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <button
              onClick={() => handleOpenEstimator()}
              className="fh-desktop-tel"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#FFFFFF",
                color: "#1E4D2B",
                border: "1.5px solid #2B6E3F",
                padding: "8px 14px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <IconRuler size={14} color="#1E4D2B" />
              <span>Estimate Cost</span>
            </button>

            <button
              onClick={() => handleOpenBooking()}
              style={{
                backgroundColor: "#1E4D2B",
                color: "#FFFFFF",
                border: "none",
                padding: "9px 18px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 4px 12px rgba(30, 77, 43, 0.28)",
                whiteSpace: "nowrap",
                transition: "all 0.15s ease",
              }}
            >
              <IconCalendar size={14} color="#FFFFFF" />
              <span>Book Online</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              className="fh-mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #D8E0DA",
                borderRadius: "8px",
                width: "38px",
                height: "38px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#18241C",
                cursor: "pointer",
                padding: 0,
              }}
            >
              {isMobileMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6"></line>
                  <line x1="4" y1="12" x2="20" y2="12"></line>
                  <line x1="4" y1="18" x2="20" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div
            className="fh-mobile-drawer open"
            style={{
              backgroundColor: "#FFFFFF",
              borderTop: "1px solid #E1EAE3",
              padding: "16px 20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              boxShadow: "0 14px 24px -10px rgba(0,0,0,0.1)",
            }}
          >
            <a
              href="#services"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                textDecoration: "none",
                color: "#18241C",
                fontSize: "15px",
                fontWeight: 600,
                padding: "8px 0",
                borderBottom: "1px solid #F0F4F1",
              }}
            >
              Services (Lawn Care &amp; Snow Plowing)
            </a>
            <a
              href="#gallery"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                textDecoration: "none",
                color: "#18241C",
                fontSize: "15px",
                fontWeight: 600,
                padding: "8px 0",
                borderBottom: "1px solid #F0F4F1",
              }}
            >
              Work Gallery &amp; Transformations
            </a>
            <a
              href="#story"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                textDecoration: "none",
                color: "#18241C",
                fontSize: "15px",
                fontWeight: 600,
                padding: "8px 0",
                borderBottom: "1px solid #F0F4F1",
              }}
            >
              About Steve &amp; Kenny (Our Crew)
            </a>
            <a
              href="#reviews"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                textDecoration: "none",
                color: "#18241C",
                fontSize: "15px",
                fontWeight: 600,
                padding: "8px 0",
                borderBottom: "1px solid #F0F4F1",
              }}
            >
              Local Lockport Reviews (5.0 Stars)
            </a>
            <a
              href="#areas"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                textDecoration: "none",
                color: "#18241C",
                fontSize: "15px",
                fontWeight: 600,
                padding: "8px 0",
                borderBottom: "1px solid #F0F4F1",
              }}
            >
              Service Area &amp; Towns
            </a>

            <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleOpenEstimator();
                }}
                style={{
                  width: "100%",
                  backgroundColor: "#FFFFFF",
                  color: "#1E4D2B",
                  border: "1.5px solid #2B6E3F",
                  padding: "12px",
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <IconRuler size={16} color="#1E4D2B" />
                <span>Estimate Property Cost</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleOpenBooking();
                }}
                style={{
                  width: "100%",
                  backgroundColor: "#1E4D2B",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "12px",
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(30, 77, 43, 0.28)",
                  boxSizing: "border-box",
                }}
              >
                <IconCalendar size={16} color="#FFFFFF" />
                <span>Book Service Online</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION */}
      <section
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "36px 20px 48px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "36px",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #DCE6DF",
                padding: "6px 14px",
                borderRadius: "9999px",
                fontSize: "12px",
                fontWeight: 700,
                color: "#1E4D2B",
                marginBottom: "16px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
              }}
            >
              <IconTruck size={14} color="#1E4D2B" />
              <span>All-Season Grounds &amp; Winter Care</span>
              <span style={{ opacity: 0.4 }}>•</span>
              <span>Lockport, NY</span>
            </div>

            <h1
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(30px, 5.2vw, 48px)",
                fontWeight: 800,
                lineHeight: 1.15,
                color: "#101D14",
                margin: "0 0 16px",
              }}
            >
              Clean Lines in Summer. Cleared Drives in Winter.
            </h1>

            <p
              style={{
                fontSize: "16px",
                color: "#46594C",
                margin: "0 0 28px",
                maxWidth: "520px",
                lineHeight: 1.6,
              }}
            >
              Dependable residential and commercial property maintenance across Lockport, Pendleton, and Niagara County. From deep trench black mulch and precision diamond lawn striping to prompt 5 AM snowplow passes.
            </p>

            {/* Hero Quick Action CTAs: Separated Estimate vs Book */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "28px",
              }}
            >
              <button
                onClick={() => handleOpenEstimator()}
                style={{
                  flex: "1 1 210px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  backgroundColor: "#1E4D2B",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "14px 24px",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "15px",
                  cursor: "pointer",
                  boxShadow: "0 8px 18px rgba(30, 77, 43, 0.28)",
                }}
              >
                <IconRuler size={17} color="#FFFFFF" />
                <span>Estimate Property Cost</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenBooking()}
                style={{
                  flex: "1 1 180px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  backgroundColor: "#FFFFFF",
                  color: "#1E4D2B",
                  border: "1.5px solid #2B6E3F",
                  padding: "14px 20px",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "15px",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                }}
              >
                <IconCalendar size={16} color="#1E4D2B" />
                <span>Book Route Online</span>
              </button>
            </div>

            {/* Quick Trust Highlights */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                fontSize: "13px",
                color: "#526859",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <IconCheck size={14} color="#1E4D2B" />
                <span>100% Insured</span>
              </div>
              <span>•</span>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <IconCheck size={14} color="#1E4D2B" />
                <span>Commercial Zero-Turn Fleet</span>
              </div>
              <span>•</span>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <IconCheck size={14} color="#1E4D2B" />
                <span>Direct Digital Work Orders</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card with Real Project Photo */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                borderRadius: "22px",
                overflow: "hidden",
                boxShadow: "0 20px 45px -12px rgba(18, 43, 26, 0.25)",
                border: "1px solid #D6E0D9",
                aspectRatio: "16 / 10",
                backgroundColor: "#E2ECE5",
              }}
            >
              <img
                src="/images/demo/fh-land/hero-landscape.jpg"
                alt="FH Land Services Estate Mulch and Lawn Care"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>

            {/* Floating Trust Badge */}
            <div
              style={{
                position: "absolute",
                bottom: "-14px",
                left: "14px",
                maxWidth: "calc(100% - 28px)",
                backgroundColor: "rgba(255, 255, 255, 0.96)",
                backdropFilter: "blur(10px)",
                padding: "12px 18px",
                borderRadius: "14px",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.12)",
                border: "1px solid #DCE6DF",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#E8F3EB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <IconGrass size={20} color="#1E4D2B" />
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#1E4D2B", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Western NY Property Care
                </div>
                <div style={{ fontSize: "14px", fontWeight: 800, color: "#112015" }}>
                  Residential &amp; Commercial Routes
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STATS BANNER */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #E2EAE4",
          borderBottom: "1px solid #E2EAE4",
          padding: "24px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            gap: "20px",
            textAlign: "center",
          }}
        >
          {data.stats.map((st, idx) => (
            <div key={idx} style={{ padding: "8px" }}>
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(26px, 4vw, 32px)",
                  fontWeight: 800,
                  color: "#1E4D2B",
                }}
              >
                {st.value}
              </div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#5E7364", marginTop: "2px" }}>
                {st.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. DUAL SEASONAL SERVICE SHOWCASE (THE SHOWSTOPPER) */}
      <section
        id="services"
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "60px 20px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1.8px",
              color: "#1E4D2B",
            }}
          >
            Full-Year Property Reliability
          </span>
          <h2
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(28px, 4.5vw, 40px)",
              fontWeight: 700,
              color: "#101D14",
              margin: "8px 0 12px",
            }}
          >
            Specialized Seasonal Services
          </h2>
          <p style={{ fontSize: "15px", color: "#546E5C", maxWidth: "620px", margin: "0 auto" }}>
            Toggle between our warm-weather landscape maintenance and our zero-tolerance winter snowplow &amp; salting operations.
          </p>

          {/* Interactive Dual Season Toggle Buttons */}
          <div
            style={{
              display: "inline-flex",
              backgroundColor: "#EAF2EC",
              padding: "5px",
              borderRadius: "9999px",
              marginTop: "24px",
              border: "1px solid #D2E0D6",
            }}
          >
            <button
              onClick={() => setActiveSeason("summer")}
              style={{
                backgroundColor: activeSeason === "summer" ? "#1E4D2B" : "transparent",
                color: activeSeason === "summer" ? "#FFFFFF" : "#324939",
                border: "none",
                padding: "10px 22px",
                borderRadius: "9999px",
                fontSize: "13.5px",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}
            >
              <IconGrass size={16} color={activeSeason === "summer" ? "#FFFFFF" : "#1E4D2B"} />
              <span>Spring &amp; Summer Landscaping</span>
            </button>

            <button
              onClick={() => setActiveSeason("winter")}
              style={{
                backgroundColor: activeSeason === "winter" ? "#1E4D2B" : "transparent",
                color: activeSeason === "winter" ? "#FFFFFF" : "#324939",
                border: "none",
                padding: "10px 22px",
                borderRadius: "9999px",
                fontSize: "13.5px",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}
            >
              <IconSnow size={16} color={activeSeason === "winter" ? "#FFFFFF" : "#1E4D2B"} />
              <span>Winter Snow &amp; Ice Management</span>
            </button>
          </div>
        </div>

        {/* Services Grid (Dynamically rendered based on season) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "24px",
          }}
        >
          {data.services[activeSeason].map((srv: ServiceItem) => (
            <div
              key={srv.id}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "18px",
                border: srv.popular ? "2px solid #2B6E3E" : "1px solid #DCE6DF",
                padding: "26px",
                boxShadow: srv.popular ? "0 10px 25px -5px rgba(30, 77, 43, 0.15)" : "0 4px 14px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              {srv.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    backgroundColor: "#E8F3EB",
                    color: "#1E4D2B",
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: "6px",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Most Requested
                </div>
              )}

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "10px",
                      backgroundColor: "#F0F6F2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {activeSeason === "summer" ? (
                      <IconGrass size={20} color="#1E4D2B" />
                    ) : (
                      <IconSnow size={20} color="#1E4D2B" />
                    )}
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#1E4D2B", letterSpacing: "0.5px" }}>
                    {activeSeason === "summer" ? "Property Care" : "Winter Route"}
                  </span>
                </div>

                <h3 style={{ margin: "0 0 6px", fontSize: "19px", fontWeight: 700, color: "#122016", lineHeight: 1.3 }}>
                  {srv.name}
                </h3>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#2E7D32", marginBottom: "10px" }}>
                  {srv.tagline}
                </div>
                <p style={{ margin: "0 0 18px", fontSize: "13.5px", color: "#526859", lineHeight: 1.55 }}>
                  {srv.description}
                </p>

                {/* Features Check List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
                  {srv.features.map((feat, fIdx) => (
                    <div key={fIdx} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#364B3D" }}>
                      <div style={{ marginTop: "3px", flexShrink: 0 }}>
                        <IconCheck size={14} color="#1E4D2B" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* TWO SEPARATE BUTTONS ON SERVICE CARD */}
              <div style={{ display: "flex", gap: "8px", paddingTop: "14px", borderTop: "1px solid #EDF3EF" }}>
                <button
                  type="button"
                  onClick={() => handleOpenEstimator(srv.name)}
                  style={{
                    flex: 1,
                    backgroundColor: "#FFFFFF",
                    color: "#1E4D2B",
                    border: "1.5px solid #2B6E3F",
                    padding: "10px 10px",
                    borderRadius: "10px",
                    fontSize: "12.5px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    transition: "all 0.15s ease",
                  }}
                >
                  <IconRuler size={13} color="#1E4D2B" />
                  <span>Estimate Cost</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenBooking(srv.name)}
                  style={{
                    flex: 1,
                    backgroundColor: "#1E4D2B",
                    color: "#FFFFFF",
                    border: "none",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    fontSize: "12.5px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    boxShadow: "0 3px 8px rgba(30, 77, 43, 0.25)",
                    transition: "all 0.15s ease",
                  }}
                >
                  <IconCalendar size={13} color="#FFFFFF" />
                  <span>Book Service</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. WORK SHOWCASE GALLERY (REAL PHOTOS) */}
      <section
        id="gallery"
        style={{
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #E2EAE4",
          borderBottom: "1px solid #E2EAE4",
          padding: "60px 20px",
        }}
      >
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.8px",
                color: "#1E4D2B",
              }}
            >
              Real Results Across Niagara County
            </span>
            <h2
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(28px, 4.5vw, 40px)",
                fontWeight: 700,
                color: "#101D14",
                margin: "8px 0 12px",
              }}
            >
              Our Recent Grounds Transformations
            </h2>
            <p style={{ fontSize: "15px", color: "#546E5C", maxWidth: "600px", margin: "0 auto" }}>
              Take a look at actual work completed by Steve &amp; Kenny: pristine lawn diamond striping, spade-edged trench beds, and rich black mulch applications.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: "24px",
            }}
          >
            {data.gallery.map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#F7FAF8",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid #DCE6DF",
                  boxShadow: "0 6px 16px -4px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ aspectRatio: "4 / 3", overflow: "hidden", position: "relative" }}>
                  <img
                    src={item.src}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.3s ease",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      backgroundColor: "rgba(17, 32, 21, 0.85)",
                      backdropFilter: "blur(4px)",
                      color: "#FFFFFF",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {item.category}
                  </div>
                </div>

                <div style={{ padding: "18px 20px" }}>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "#132318", marginBottom: "4px" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: "12.5px", color: "#5E7566", display: "flex", alignItems: "center", gap: "4px" }}>
                    <IconMapPin size={13} color="#1E4D2B" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. THE CREW & COMMUNITY STORY (AUTHENTICITY & CHARACTER) */}
      <section
        id="story"
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "60px 20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#16281C",
            color: "#F3F7F4",
            borderRadius: "24px",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            boxShadow: "0 20px 45px -12px rgba(18, 43, 26, 0.35)",
            border: "1px solid #2B4533",
          }}
        >
          {/* Photo with turtle rescue & GMC truck */}
          <div style={{ position: "relative", minHeight: "360px", backgroundColor: "#203827" }}>
            <img
              src="/images/demo/fh-land/team-story.jpg"
              alt="Kenny Jordan and Steve Frazer with work truck on way to job site"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                left: "16px",
                right: "16px",
                backgroundColor: "rgba(17, 32, 21, 0.9)",
                backdropFilter: "blur(6px)",
                padding: "10px 14px",
                borderRadius: "10px",
                fontSize: "12px",
                color: "#D0E4D6",
              }}
            >
              On the road to Lockport job site • Proudly caring for our community
            </div>
          </div>

          {/* Narrative Content */}
          <div style={{ padding: "clamp(28px, 5vw, 44px)" }}>
            <span
              style={{
                color: "#68BA7F",
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.4px",
              }}
            >
              Meet Steve &amp; Kenny • Local Owners
            </span>
            <h3
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(24px, 4vw, 34px)",
                fontWeight: 700,
                color: "#FFFFFF",
                margin: "8px 0 16px",
                lineHeight: 1.25,
              }}
            >
              The Crew That Always Goes The Extra Mile.
            </h3>

            <p style={{ fontSize: "14.5px", color: "#C8DCD0", lineHeight: 1.65, marginBottom: "16px" }}>
              At FH Land Services, we don&apos;t just show up to cut grass or push snow. We live here in Western New York, and we treat every single property like it belongs to our own family.
            </p>

            <p style={{ fontSize: "14.5px", color: "#C8DCD0", lineHeight: 1.65, marginBottom: "24px" }}>
              Whether that means taking an extra pass to blow off every stray grass blade from your patio, ensuring your mulch trench line is razor-straight, or even safely stopping our work truck to rescue a crossing turtle on the way to a job site — you get honest, hard-working local guys who truly care.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "26px" }}>
              <div style={{ borderLeft: "3px solid #68BA7F", paddingLeft: "12px" }}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#FFFFFF" }}>Honest Upfront Pricing</div>
                <div style={{ fontSize: "12px", color: "#A8C5B3" }}>No surprise fees or hidden charges</div>
              </div>
              <div style={{ borderLeft: "3px solid #68BA7F", paddingLeft: "12px" }}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#FFFFFF" }}>Instant Online Route Booking</div>
                <div style={{ fontSize: "12px", color: "#A8C5B3" }}>No phone waiting • Direct digital queue</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => handleOpenEstimator()}
                style={{
                  backgroundColor: "#2E7D32",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "13px 22px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
                }}
              >
                <IconRuler size={16} color="#FFFFFF" />
                <span>Calculate Property Estimate</span>
              </button>
              <button
                type="button"
                onClick={() => handleOpenBooking()}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.12)",
                  color: "#FFFFFF",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  padding: "13px 22px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <IconCalendar size={16} color="#FFFFFF" />
                <span>Book Route Online</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS & REVIEWS */}
      <section
        id="reviews"
        style={{
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #E2EAE4",
          borderBottom: "1px solid #E2EAE4",
          padding: "60px 20px",
        }}
      >
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", marginBottom: "8px" }}>
              {[...Array(5)].map((_, i) => (
                <IconStar key={i} size={18} color="#D4A373" />
              ))}
              <span style={{ fontSize: "14px", fontWeight: 700, color: "#16281C", marginLeft: "6px" }}>
                5.0 Star Neighbor Recommendations
              </span>
            </div>
            <h2
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(26px, 4vw, 36px)",
                fontWeight: 700,
                color: "#101D14",
                margin: 0,
              }}
            >
              Trusted by Homeowners Across Western NY
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "22px",
            }}
          >
            {data.testimonials.map((t, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#F8FAF8",
                  borderRadius: "16px",
                  border: "1px solid #DCE6DF",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <IconStar key={i} size={15} color="#D4A373" />
                    ))}
                  </div>
                  <p style={{ margin: "0 0 16px", fontSize: "14px", color: "#324939", fontStyle: "italic", lineHeight: 1.6 }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div style={{ paddingTop: "14px", borderTop: "1px solid #E1EBE4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#132318" }}>{t.author}</div>
                    <div style={{ fontSize: "12px", color: "#5E7566" }}>{t.town} • {t.service}</div>
                  </div>
                  <span style={{ fontSize: "11px", color: "#1E4D2B", fontWeight: 700 }}>Verified Customer</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. SERVICE AREA & TOWNS */}
      <section
        id="areas"
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "60px 20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "20px",
            border: "1px solid #D8E2DA",
            padding: "clamp(26px, 5vw, 44px)",
            textAlign: "center",
            boxShadow: "0 6px 18px rgba(0,0,0,0.03)",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1.4px",
              color: "#1E4D2B",
            }}
          >
            Local Route Coverage
          </span>
          <h3
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(24px, 4vw, 32px)",
              color: "#101D14",
              margin: "8px 0 16px",
            }}
          >
            Where We Mow, Edge, and Plow
          </h3>
          <p style={{ fontSize: "14.5px", color: "#526859", maxWidth: "580px", margin: "0 auto 24px" }}>
            Our fleet runs scheduled routes across Niagara County and Northern Erie County. If you live or operate a business in these areas, our trucks are already nearby:
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "32px",
            }}
          >
            {data.serviceAreas.map((town, idx) => (
              <span
                key={idx}
                style={{
                  backgroundColor: "#F0F6F2",
                  color: "#1E4D2B",
                  fontSize: "13px",
                  fontWeight: 700,
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  border: "1px solid #CFDFD4",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <IconMapPin size={13} color="#1E4D2B" />
                <span>{town}</span>
              </span>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => handleOpenEstimator()}
              style={{
                backgroundColor: "#1E4D2B",
                color: "#FFFFFF",
                border: "none",
                padding: "13px 26px",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 12px rgba(30, 77, 43, 0.28)",
              }}
            >
              <IconRuler size={16} color="#FFFFFF" />
              <span>Estimate Property Cost</span>
            </button>

            <button
              onClick={() => handleOpenBooking()}
              style={{
                backgroundColor: "#FFFFFF",
                color: "#1E4D2B",
                border: "1.5px solid #2B6E3F",
                padding: "13px 22px",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <IconCalendar size={15} color="#1E4D2B" />
              <span>Book Service Online</span>
            </button>
          </div>
        </div>
      </section>

      {/* 9.5 ON-PAGE INTERACTIVE BOOKING & ESTIMATE STATION */}
      <section
        id="book"
        style={{
          backgroundColor: "#112015",
          color: "#FFFFFF",
          padding: "60px 20px",
          borderTop: "1px solid #243E2B",
        }}
      >
        <div style={{ maxWidth: "980px", margin: "0 auto" }}>
          <div
            style={{
              backgroundColor: "#192C1F",
              border: "1.5px solid #2B5738",
              borderRadius: "20px",
              padding: "clamp(24px, 5vw, 40px)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <span
                style={{
                  fontSize: "11.5px",
                  fontWeight: 800,
                  letterSpacing: "1.5px",
                  color: "#68BA7F",
                  textTransform: "uppercase",
                  display: "inline-block",
                  marginBottom: "8px",
                }}
              >
                Niagara County Direct Dispatch
              </span>
              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(26px, 4vw, 36px)",
                  margin: "0 0 10px",
                  color: "#FFFFFF",
                }}
              >
                Interactive Property Estimator &amp; Online Booking
              </h2>
              <p style={{ fontSize: "14.5px", color: "#B1CCB9", maxWidth: "600px", margin: "0 auto" }}>
                Calculate concrete rates for your lot size with our live estimator, or schedule direct route dispatch in under 60 seconds.
              </p>
            </div>

            {/* 3 Interactive Quick-Start Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
                gap: "16px",
                marginBottom: "30px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#203727",
                  border: "1px solid #335E3D",
                  borderRadius: "14px",
                  padding: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <IconGrass size={22} color="#68BA7F" />
                  <strong style={{ fontSize: "15px", color: "#FFFFFF" }}>Weekly Lawn Mowing</strong>
                </div>
                <p style={{ margin: 0, fontSize: "12.5px", color: "#A7C4B0", lineHeight: 1.5 }}>
                  Precision diamond striping, string trimming &amp; walk blowout. From $40/cut.
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "#203727",
                  border: "1px solid #335E3D",
                  borderRadius: "14px",
                  padding: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <IconRuler size={22} color="#68BA7F" />
                  <strong style={{ fontSize: "15px", color: "#FFFFFF" }}>Bed Edging &amp; Mulch</strong>
                </div>
                <p style={{ margin: 0, fontSize: "12.5px", color: "#A7C4B0", lineHeight: 1.5 }}>
                  3&quot; deep trench spade edging &amp; premium triple-shred black/brown mulch.
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "#203727",
                  border: "1px solid #335E3D",
                  borderRadius: "14px",
                  padding: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <IconSnow size={22} color="#93C5FD" />
                  <strong style={{ fontSize: "15px", color: "#FFFFFF" }}>Winter Snow Pass</strong>
                </div>
                <p style={{ margin: 0, fontSize: "12.5px", color: "#A7C4B0", lineHeight: 1.5 }}>
                  Unlimited driveway clearing all winter guaranteed before 6:30 AM before work.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => handleOpenEstimator()}
                style={{
                  backgroundColor: "#2B7D44",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "15px 32px",
                  borderRadius: "12px",
                  fontSize: "14.5px",
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 6px 18px rgba(43, 125, 68, 0.4)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <IconRuler size={17} color="#FFFFFF" />
                <span>Launch Cost Calculator</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenBooking()}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.12)",
                  color: "#FFFFFF",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  padding: "15px 28px",
                  borderRadius: "12px",
                  fontSize: "14.5px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <IconCalendar size={17} color="#FFFFFF" />
                <span>Book Direct Dispatch</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. LOCAL FOOTER */}
      <footer
        style={{
          borderTop: "1px solid #DCE6DF",
          backgroundColor: "#112015",
          color: "#A2B8A8",
          padding: "32px 20px",
          textAlign: "center",
          fontSize: "13px",
        }}
      >
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
            <span style={{ color: "#FFFFFF", fontWeight: 800, fontSize: "15px", letterSpacing: "0.5px" }}>
              FH LAND SERVICES
            </span>
            <span>•</span>
            <span style={{ color: "#68BA7F" }}>Landscaping &amp; Snow Removal</span>
          </div>

          <p style={{ margin: "0 0 8px", fontSize: "12px", color: "#87A18F" }}>
            Lockport, NY 14094 • Western NY Route Coverage • Online Route Booking Hub
          </p>

          <p style={{ margin: 0, fontSize: "11.5px", color: "#657E6C" }}>
            © 2026 FH Land Services. All Rights Reserved. Fully Licensed &amp; Insured Commercial &amp; Residential Contractor.
          </p>
        </div>
      </footer>

      {/* 11. DEDICATED PROPERTY COST ESTIMATOR MODAL */}
      <PropertyEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        defaultService={selectedServiceForEstimator}
        defaultSeason={activeSeason}
        onProceedToBooking={handleProceedFromEstimatorToBooking}
      />

      {/* 12. DIRECT BOOKING & WORK ORDER MODAL */}
      <EstimateModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setTransferBookingData(null);
        }}
        defaultService={selectedServiceForBooking}
        defaultSeason={activeSeason}
        initialBookingData={transferBookingData}
      />
    </div>
  );
}
