"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TOTAL_FENCE_DATA, FenceMaterialOption } from "@/data/totalFenceData";
import FenceCostEstimatorModal, { EstimateSpecs } from "./FenceCostEstimatorModal";
import TotalFenceQuoteModal from "./TotalFenceQuoteModal";
import {
  IconFence,
  IconShieldCheck,
  IconRuler,
  IconGate,
  IconCalculator,
  IconFrost,
  IconUsers,
  IconCheck,
  IconStar,
  IconClock,
  IconMapPin,
  IconPhone,
  IconArrowRight,
  IconCalendar,
  IconClose
} from "./FenceIcons";

export default function PreviewTotalFence() {
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedMaterialForModal, setSelectedMaterialForModal] = useState("vinyl-privacy");
  const [activeEstimateSpecs, setActiveEstimateSpecs] = useState<EstimateSpecs | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<"all" | "vinyl" | "chain-link">("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOpenEstimator = (materialId = "vinyl-privacy") => {
    setSelectedMaterialForModal(materialId);
    setIsEstimatorOpen(true);
  };

  const handleOpenQuote = (materialId = "vinyl-privacy") => {
    setSelectedMaterialForModal(materialId);
    setActiveEstimateSpecs(null);
    setIsQuoteOpen(true);
  };

  const handleProceedFromEstimator = (specs: EstimateSpecs) => {
    setIsEstimatorOpen(false);
    setActiveEstimateSpecs(specs);
    setIsQuoteOpen(true);
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#0F172A",
        backgroundColor: "#FFFFFF",
        overflowX: "hidden",
        width: "100%",
        maxWidth: "100vw",
        margin: 0,
        padding: 0
      }}
    >
      {/* Top Dispatch & Season Announcement Banner */}
      <div
        style={{
          backgroundColor: "#0B2568",
          color: "#BFDBFE",
          fontSize: "0.82rem",
          padding: "9px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
          borderBottom: "1px solid rgba(255,255,255,0.1)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ backgroundColor: "#2563EB", color: "#FFFFFF", fontSize: "0.7rem", fontWeight: 700, padding: "2px 8px", borderRadius: "4px", textTransform: "uppercase" }}>
            WNY FENCE SEASON
          </span>
          <span style={{ fontSize: "0.8rem", color: "#E0E7FF" }}>
            ❄️ <strong>42-Inch Frost-Line Post Anchors:</strong> Guaranteed against Buffalo winter ground heave.
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span className="top-bar-hours" style={{ display: "flex", alignItems: "center", gap: "6px", color: "#F8FAFC", fontSize: "0.8rem" }}>
            <IconClock size={14} color="#60A5FA" />
            <span>Mon–Sat: 7:00 AM – 6:00 PM</span>
          </span>
          <a
            href={`tel:${TOTAL_FENCE_DATA.cleanPhone}`}
            style={{ color: "#FFFFFF", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem" }}
          >
            <IconPhone size={14} color="#34D399" />
            <span>(716) 946-6294</span>
          </a>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 900,
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E2E8F0",
          boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
        }}
      >
        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          {/* Logo & Tagline */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                backgroundColor: "#0D3594",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 6px -1px rgba(13, 53, 148, 0.25)"
              }}
            >
              <Image
                src="/images/demo/total-fence/logo.png"
                alt="Total Fence Logo"
                width={44}
                height={44}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span style={{ fontSize: "1.25rem", fontWeight: 900, letterSpacing: "-0.03em", color: "#0D3594", textTransform: "uppercase" }}>
                  TOTAL <span style={{ color: "#475569" }}>FENCE</span>
                </span>
                <span style={{ fontSize: "0.68rem", fontWeight: 700, backgroundColor: "#EFF6FF", color: "#1D4ED8", padding: "1px 6px", borderRadius: "4px" }}>
                  WNY
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "0.72rem", color: "#64748B", fontWeight: 600 }}>
                {TOTAL_FENCE_DATA.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              whiteSpace: "nowrap"
            }}
            className="desktop-nav"
          >
            <a href="#materials" className="header-nav-link">Fencing Styles</a>
            <a href="#frost-line" className="header-nav-link">42&quot; Frost Standard</a>
            <a href="#neighbor-program" className="header-nav-link">Neighbor Co-Op</a>
            <a href="#gallery" className="header-nav-link">Real Projects</a>
            <a href="#reviews" className="header-nav-link">Reviews</a>
          </nav>

          {/* Desktop Action Buttons (Hidden on mobile/tablet) */}
          <div className="desktop-header-actions" style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <button
              onClick={() => handleOpenEstimator()}
              style={{
                backgroundColor: "#EFF6FF",
                color: "#0D3594",
                border: "1px solid #BFDBFE",
                padding: "8px 14px",
                borderRadius: "8px",
                fontSize: "0.82rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                whiteSpace: "nowrap",
                transition: "all 0.15s ease"
              }}
            >
              <IconCalculator size={15} />
              <span>Estimate Cost</span>
            </button>

            <button
              onClick={() => handleOpenQuote()}
              style={{
                backgroundColor: "#0D3594",
                color: "#FFFFFF",
                border: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "0.82rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                whiteSpace: "nowrap",
                boxShadow: "0 3px 6px -1px rgba(13, 53, 148, 0.3)",
                transition: "all 0.15s ease"
              }}
            >
              <span>Book Measure</span>
              <IconArrowRight size={14} />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-hamburger"
            style={{
              display: "none",
              backgroundColor: isMobileMenuOpen ? "#EFF6FF" : "#F8FAFC",
              border: "1px solid #CBD5E1",
              borderRadius: "8px",
              padding: "7px 11px",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
              color: "#0D3594",
              transition: "all 0.2s"
            }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <IconClose size={20} color="#0D3594" />
            ) : (
              <span style={{ fontSize: "1.25rem", lineHeight: 1 }}>☰</span>
            )}
          </button>
        </div>

        {/* Mobile Slide-down Interactive Drawer */}
        {isMobileMenuOpen && (
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderTop: "1px solid #E2E8F0",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.12)",
              padding: "20px 20px 24px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "14px"
            }}
          >
            {/* Quick Interactive CTAs */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <button
                onClick={() => {
                  handleOpenQuote();
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  backgroundColor: "#059669",
                  color: "#FFFFFF",
                  padding: "12px 10px",
                  borderRadius: "10px",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  boxShadow: "0 4px 6px -1px rgba(5, 150, 105, 0.3)"
                }}
              >
                <IconCalendar size={16} />
                <span>Book Measure</span>
              </button>

              <button
                onClick={() => {
                  handleOpenEstimator();
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  backgroundColor: "#0D3594",
                  color: "#FFFFFF",
                  padding: "12px 10px",
                  borderRadius: "10px",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  boxShadow: "0 4px 6px -1px rgba(13, 53, 148, 0.3)"
                }}
              >
                <IconCalculator size={16} />
                <span>Cost Estimator</span>
              </button>
            </div>

            <div style={{ height: "1px", backgroundColor: "#F1F5F9", margin: "2px 0" }} />

            {/* Navigation Section Links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <a
                href="#materials"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 14px",
                  backgroundColor: "#F8FAFC",
                  borderRadius: "8px",
                  color: "#0F172A",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.9rem"
                }}
              >
                <span>Fencing Styles (Vinyl, Chain Link, Wood)</span>
                <IconArrowRight size={14} color="#94A3B8" />
              </a>

              <a
                href="#frost-line"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 14px",
                  backgroundColor: "#F8FAFC",
                  borderRadius: "8px",
                  color: "#0F172A",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.9rem"
                }}
              >
                <span>42&quot; Frost-Line Engineering Standard</span>
                <IconArrowRight size={14} color="#94A3B8" />
              </a>

              <a
                href="#neighbor-program"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 14px",
                  backgroundColor: "#F0FDF4",
                  border: "1px solid #BBF7D0",
                  borderRadius: "8px",
                  color: "#166534",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "0.9rem"
                }}
              >
                <span>Good Neighbor Program (10% Co-op)</span>
                <span style={{ fontSize: "0.72rem", backgroundColor: "#DCFCE7", padding: "2px 6px", borderRadius: "4px" }}>SAVE 10%</span>
              </a>

              <a
                href="#gallery"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 14px",
                  backgroundColor: "#F8FAFC",
                  borderRadius: "8px",
                  color: "#0F172A",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.9rem"
                }}
              >
                <span>Real Installation Project Gallery</span>
                <IconArrowRight size={14} color="#94A3B8" />
              </a>

              <a
                href="#reviews"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 14px",
                  backgroundColor: "#F8FAFC",
                  borderRadius: "8px",
                  color: "#0F172A",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.9rem"
                }}
              >
                <span>5-Star Verified Customer Reviews</span>
                <div style={{ display: "flex", gap: "2px" }}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <IconStar key={i} size={12} color="#D97706" />
                  ))}
                </div>
              </a>
            </div>

            <div style={{ height: "1px", backgroundColor: "#F1F5F9", margin: "2px 0" }} />

            {/* Direct Phone & Dispatch */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "4px" }}>
              <div style={{ fontSize: "0.75rem", color: "#64748B" }}>
                <div>⏰ Mon–Sat: 7:00 AM – 6:00 PM</div>
                <div>📍 Buffalo & Niagara County, NY</div>
              </div>
              <a
                href={`tel:${TOTAL_FENCE_DATA.cleanPhone}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "#0F172A",
                  color: "#FFFFFF",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  textDecoration: "none"
                }}
              >
                <IconPhone size={14} color="#34D399" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%)",
          padding: "54px 20px 60px 20px",
          borderBottom: "1px solid #E2E8F0"
        }}
      >
        <div
          className="hero-grid-container"
          style={{
            maxWidth: "1240px",
            margin: "0 auto"
          }}
        >
          {/* 1. Value Copy Intro */}
          <div className="hero-intro">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#FEF3C7",
                border: "1px solid #FDE68A",
                padding: "6px 14px",
                borderRadius: "30px",
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "#92400E",
                marginBottom: "18px"
              }}
            >
              <div style={{ display: "flex", gap: "2px" }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <IconStar key={i} size={14} color="#D97706" />
                ))}
              </div>
              <span>5.0 RATED FENCE BUILDER IN WESTERN NEW YORK</span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 900,
                lineHeight: 1.15,
                color: "#0F172A",
                letterSpacing: "-0.025em",
                margin: "0 0 16px 0"
              }}
            >
              Expect Quality Fences <span style={{ color: "#0D3594" }}>For Your Dollar.</span>
            </h1>

            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.6,
                color: "#475569",
                margin: 0
              }}
            >
              Engineered with <strong>42-inch deep frost-line concrete posts</strong> that survive brutal Western New York winters without heaving, sagging, or rotting. Commercial-grade vinyl privacy, black chain link, and custom wood fencing built right the first time.
            </p>
          </div>

          {/* 2. Hero Visual Asset (Real Vinyl Privacy Fence with Gazebo) */}
          <div className="hero-visual" style={{ position: "relative" }}>
            <div
              style={{
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                border: "4px solid #FFFFFF"
              }}
            >
              <Image
                src="/images/demo/total-fence/vinyl-privacy-gazebo.jpg"
                alt="Total Fence Vinyl Privacy Installation in Western New York"
                width={700}
                height={500}
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
                priority
              />

              {/* Verified Project Badge Overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  backgroundColor: "rgba(15, 23, 42, 0.88)",
                  backdropFilter: "blur(6px)",
                  color: "#FFFFFF",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  fontSize: "0.82rem",
                  maxWidth: "calc(100% - 32px)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#10B981" }} />
                <div>
                  <div style={{ fontWeight: 700 }}>Real WNY Installation Showcase</div>
                  <div style={{ fontSize: "0.74rem", color: "#94A3B8" }}>6ft Solid Vinyl Privacy Enclosure with Gazebo Integration</div>
                </div>
              </div>
            </div>

            {/* Floating Frost-Line Badge */}
            <div
              style={{
                position: "absolute",
                top: "-14px",
                right: "-10px",
                backgroundColor: "#0D3594",
                color: "#FFFFFF",
                padding: "8px 14px",
                borderRadius: "10px",
                boxShadow: "0 10px 15px -3px rgba(13, 53, 148, 0.4)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.8rem",
                fontWeight: 800
              }}
            >
              <IconFrost size={18} color="#60A5FA" />
              <span>42&quot; Frost-Line Standard</span>
            </div>
          </div>

          {/* 3. Dual CTA Buttons */}
          <div className="hero-actions">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <button
                onClick={() => handleOpenEstimator()}
                style={{
                  backgroundColor: "#0D3594",
                  color: "#FFFFFF",
                  fontSize: "1rem",
                  fontWeight: 700,
                  padding: "14px 24px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 10px 15px -3px rgba(13, 53, 148, 0.35)",
                  transition: "all 0.2s",
                  flex: "1 1 auto"
                }}
              >
                <IconCalculator size={20} />
                <span>Estimate Fence Cost Online</span>
              </button>

              <button
                onClick={() => handleOpenQuote()}
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#0F172A",
                  fontSize: "1rem",
                  fontWeight: 700,
                  padding: "14px 22px",
                  borderRadius: "10px",
                  border: "2px solid #CBD5E1",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.2s",
                  flex: "1 1 auto"
                }}
              >
                <span>Book On-Site Laser Measure</span>
                <IconArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* 4. Micro Trust Indicators */}
          <div className="hero-trust">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px 16px", fontSize: "0.84rem", color: "#334155" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <IconCheck size={13} color="#059669" />
                </div>
                <span><strong>No Phone Tag:</strong> Online measure booking</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <IconCheck size={13} color="#059669" />
                </div>
                <span><strong>Fast 3-Day Turnaround:</strong> Full crew on site</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <IconCheck size={13} color="#059669" />
                </div>
                <span><strong>Neighbor Discount:</strong> Save 10% co-op</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <IconCheck size={13} color="#059669" />
                </div>
                <span><strong>NYS Licensed & Insured:</strong> WNY contractor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section
        style={{
          backgroundColor: "#0F172A",
          color: "#FFFFFF",
          padding: "24px 20px"
        }}
      >
        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "24px",
            textAlign: "center"
          }}
        >
          {TOTAL_FENCE_DATA.stats.map(s => (
            <div key={s.label}>
              <div style={{ fontSize: "2rem", fontWeight: 900, color: "#60A5FA" }}>{s.value}</div>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, marginTop: "2px" }}>{s.label}</div>
              <div style={{ fontSize: "0.75rem", color: "#94A3B8", marginTop: "2px" }}>{s.detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Fencing Styles Section */}
      <section
        id="materials"
        style={{
          padding: "70px 20px",
          maxWidth: "1240px",
          margin: "0 auto"
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 48px auto" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#0D3594", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            EXCELLENCE IN MATERIALS & CRAFTSMANSHIP
          </span>
          <h2 style={{ fontSize: "2.3rem", fontWeight: 900, color: "#0F172A", letterSpacing: "-0.02em", margin: "8px 0 14px 0" }}>
            Built For Buffalo Weather. Styled For Your Property.
          </h2>
          <p style={{ fontSize: "1rem", color: "#475569", lineHeight: 1.6, margin: 0 }}>
            Every fence we construct uses commercial-grade pickets, heavy gauge posts, and custom self-closing gates designed to withstand snowdrifts and windstorms.
          </p>
        </div>

        {/* Material Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px"
          }}
        >
          {TOTAL_FENCE_DATA.materials.map(mat => (
            <div
              key={mat.id}
              style={{
                borderRadius: "16px",
                border: "1px solid #E2E8F0",
                backgroundColor: "#FFFFFF",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                transition: "transform 0.2s, box-shadow 0.2s"
              }}
            >
              {/* Card Header & Price Pill */}
              <div style={{ padding: "24px 24px 16px 24px", borderBottom: "1px solid #F1F5F9" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      backgroundColor: mat.category === "vinyl" ? "#EFF6FF" : mat.category === "chain-link" ? "#F1F5F9" : mat.category === "wood" ? "#FEF3C7" : "#F3E8FF",
                      color: mat.category === "vinyl" ? "#1D4ED8" : mat.category === "chain-link" ? "#334155" : mat.category === "wood" ? "#B45309" : "#7E22CE",
                      padding: "3px 10px",
                      borderRadius: "6px"
                    }}
                  >
                    {mat.popularFor.split(",")[0]}
                  </span>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0F172A" }}>
                      ${mat.pricePerFoot.min}-${mat.pricePerFoot.max}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "#64748B", display: "block" }}>/ linear foot</span>
                  </div>
                </div>

                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0F172A", margin: "6px 0 8px 0" }}>
                  {mat.name}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.5, margin: 0 }}>
                  {mat.description}
                </p>
              </div>

              {/* Spec Pills */}
              <div style={{ padding: "16px 24px", backgroundColor: "#F8FAFC", borderBottom: "1px solid #F1F5F9", fontSize: "0.8rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  <div>
                    <span style={{ color: "#64748B" }}>Lifespan:</span>
                    <div style={{ fontWeight: 700, color: "#0F172A" }}>{mat.lifespanYears}</div>
                  </div>
                  <div>
                    <span style={{ color: "#64748B" }}>Maintenance:</span>
                    <div style={{ fontWeight: 700, color: "#0F172A" }}>{mat.maintenanceLevel}</div>
                  </div>
                  <div>
                    <span style={{ color: "#64748B" }}>Privacy Level:</span>
                    <div style={{ fontWeight: 700, color: "#0F172A" }}>{mat.privacyLevel}</div>
                  </div>
                  <div>
                    <span style={{ color: "#64748B" }}>Weather Rating:</span>
                    <div style={{ fontWeight: 700, color: "#059669" }}>{mat.windSnowRating}</div>
                  </div>
                </div>
              </div>

              {/* Feature Checklist */}
              <div style={{ padding: "20px 24px", flexGrow: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {mat.features.map((feat, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "0.83rem", color: "#334155", lineHeight: 1.45 }}>
                      <div style={{ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                        <IconCheck size={11} color="#0D3594" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dual Action Buttons */}
              <div style={{ padding: "16px 24px 20px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <button
                  onClick={() => handleOpenEstimator(mat.id)}
                  style={{
                    backgroundColor: "#EFF6FF",
                    color: "#0D3594",
                    border: "1px solid #BFDBFE",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    padding: "10px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px"
                  }}
                >
                  <IconCalculator size={15} />
                  <span>Estimate</span>
                </button>
                <button
                  onClick={() => handleOpenQuote(mat.id)}
                  style={{
                    backgroundColor: "#0D3594",
                    color: "#FFFFFF",
                    border: "none",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    padding: "10px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px"
                  }}
                >
                  <span>Book Measure</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The 42-Inch Frost Line Defense Section */}
      <section
        id="frost-line"
        style={{
          backgroundColor: "#0B1E48",
          color: "#FFFFFF",
          padding: "70px 20px"
        }}
      >
        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "40px",
            alignItems: "center"
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(96, 165, 250, 0.2)",
                border: "1px solid rgba(96, 165, 250, 0.3)",
                padding: "6px 14px",
                borderRadius: "30px",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#93C5FD",
                marginBottom: "16px"
              }}
            >
              <IconFrost size={16} />
              <span>THE WNY WINTER FROST-LINE ENGINEERING GUARANTEE</span>
            </div>

            <h2 style={{ fontSize: "2.4rem", fontWeight: 900, lineHeight: 1.2, margin: "0 0 18px 0" }}>
              Why Cheap Fences Lean In Buffalo — And Why Ours <span style={{ color: "#60A5FA" }}>Never Do.</span>
            </h2>

            <p style={{ fontSize: "1rem", lineHeight: 1.6, color: "#CBD5E1", margin: "0 0 24px 0" }}>
              {TOTAL_FENCE_DATA.frostLineStandard.explanation}
            </p>

            {/* Comparison boxes */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
              <div
                style={{
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  borderRadius: "12px",
                  padding: "16px"
                }}
              >
                <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#FCA5A5", marginBottom: "4px" }}>
                  ❌ Other Budget Contractors
                </div>
                <div style={{ fontSize: "0.8rem", color: "#E2E8F0", lineHeight: 1.5 }}>
                  Dig only 24&quot; to 30&quot; shallow holes. Winter frost gets beneath the footing and heaves posts upward, causing gates to jam and panels to bow.
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                  borderRadius: "12px",
                  padding: "16px"
                }}
              >
                <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#6EE7B7", marginBottom: "4px" }}>
                  ✓ The Total Fence Standard
                </div>
                <div style={{ fontSize: "0.8rem", color: "#E2E8F0", lineHeight: 1.5 }}>
                  Drill down full 42 inches below subsoil frost line. 100+ lbs gravel-concrete anchor per post. Backed by our 10-Year Anti-Sag Guarantee.
                </div>
              </div>
            </div>

            <button
              onClick={() => handleOpenQuote()}
              style={{
                backgroundColor: "#2563EB",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "0.95rem",
                padding: "12px 24px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <span>Schedule Frost-Line Measure</span>
              <IconArrowRight size={16} />
            </button>
          </div>

          {/* Right Column: Visual Diagram Card */}
          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.7)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "12px" }}>
              <span style={{ fontWeight: 800, fontSize: "0.95rem" }}>Cross-Section Footing Blueprint</span>
              <span style={{ backgroundColor: "#10B981", color: "#FFFFFF", fontSize: "0.7rem", fontWeight: 800, padding: "2px 8px", borderRadius: "4px" }}>
                PASSED NYS CODE
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "0.85rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "rgba(96,165,250,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#60A5FA" }}>
                  6FT
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>Above-Ground Finished Height</div>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Virgin vinyl privacy tongue & groove with aluminum bottom rail</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "rgba(245,158,11,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#FBBF24" }}>
                  GL
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>Grade Level & Top Slope Shed</div>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Concrete crowned at soil level so water drains outward from posts</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#34D399" }}>
                  42&quot;
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>Sub-Frost Anchor Depth (Deep Dig)</div>
                  <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Poured solid around heavy-gauge steel or internal aluminum stiffeners</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Good Neighbor Multi-Yard Discount Section */}
      <section
        id="neighbor-program"
        style={{
          padding: "70px 20px",
          backgroundColor: "#F0FDF4",
          borderBottom: "1px solid #DCFCE7"
        }}
      >
        <div
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "36px",
            alignItems: "center"
          }}
        >
          {/* Review Screenshot & Proof */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              padding: "24px",
              border: "1px solid #BBF7D0",
              boxShadow: "0 10px 15px -3px rgba(16, 185, 129, 0.1)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <div style={{ display: "flex", gap: "2px" }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <IconStar key={i} size={15} color="#059669" />
                ))}
              </div>
              <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#065F46" }}>
                5.0 Verified Review from Niagara Falls Fencing
              </span>
            </div>

            <blockquote style={{ fontSize: "1.05rem", fontStyle: "italic", lineHeight: 1.6, color: "#1E293B", margin: "0 0 16px 0" }}>
              &ldquo;{TOTAL_FENCE_DATA.neighborDiscount.reviewQuote}&rdquo;
            </blockquote>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", borderTop: "1px solid #F1F5F9", paddingTop: "12px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#D1FAE5", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#047857" }}>
                NF
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#0F172A" }}>
                  {TOTAL_FENCE_DATA.neighborDiscount.reviewAuthor}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#059669" }}>
                  Two Adjacent Fences Installed In 3 Days
                </div>
              </div>
            </div>
          </div>

          {/* Offer Details */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#DCFCE7",
                color: "#166534",
                fontSize: "0.8rem",
                fontWeight: 800,
                padding: "4px 12px",
                borderRadius: "20px",
                marginBottom: "14px"
              }}
            >
              <IconUsers size={16} />
              <span>CO-OP YARD INSTALLATION PROGRAM</span>
            </div>

            <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: "#064E3B", margin: "0 0 14px 0", lineHeight: 1.2 }}>
              {TOTAL_FENCE_DATA.neighborDiscount.title}
            </h2>

            <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#14532D", margin: "0 0 20px 0" }}>
              {TOTAL_FENCE_DATA.neighborDiscount.description}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px", fontSize: "0.88rem", color: "#166534" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <IconCheck size={13} color="#059669" />
                </div>
                <span>Single mobilize cost for post hole diggers & laser equipment</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <IconCheck size={13} color="#059669" />
                </div>
                <span>Seamless straight shared property line with zero gaps between yards</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <IconCheck size={13} color="#059669" />
                </div>
                <span>Fast 3-day turnaround by a high-production, respectful local crew</span>
              </div>
            </div>

            <button
              onClick={() => handleOpenEstimator()}
              style={{
                backgroundColor: "#059669",
                color: "#FFFFFF",
                fontSize: "0.95rem",
                fontWeight: 700,
                padding: "12px 22px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 6px -1px rgba(5, 150, 105, 0.3)"
              }}
            >
              <span>Calculate Co-Op Savings (10% Off)</span>
              <IconArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Real Project Gallery Section */}
      <section
        id="gallery"
        style={{
          padding: "70px 20px",
          maxWidth: "1240px",
          margin: "0 auto"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "36px" }}>
          <div>
            <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#0D3594", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              LOCAL WNY PORTFOLIO
            </span>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: "#0F172A", margin: "6px 0 0 0" }}>
              Real Workmanship Across Niagara & Erie County
            </h2>
          </div>

          {/* Filter Pills */}
          <div style={{ display: "flex", gap: "8px" }}>
            {[
              { id: "all", label: "All Projects" },
              { id: "vinyl", label: "Vinyl Privacy" },
              { id: "chain-link", label: "Chain Link" }
            ].map(f => (
              <button
                key={f.id}
                type="button"
                onClick={() => setGalleryFilter(f.id as any)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  backgroundColor: galleryFilter === f.id ? "#0D3594" : "#F1F5F9",
                  color: galleryFilter === f.id ? "#FFFFFF" : "#334155",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px"
          }}
        >
          {(galleryFilter === "all" || galleryFilter === "vinyl") && (
            <div
              style={{
                borderRadius: "14px",
                overflow: "hidden",
                border: "1px solid #E2E8F0",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)"
              }}
            >
              <Image
                src="/images/demo/total-fence/vinyl-privacy-gazebo.jpg"
                alt="Vinyl Privacy Fence with Gazebo in Buffalo NY"
                width={600}
                height={450}
                style={{ width: "100%", height: "260px", objectFit: "cover" }}
              />
              <div style={{ padding: "16px 20px", backgroundColor: "#FFFFFF" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#2563EB", textTransform: "uppercase" }}>Vinyl Privacy • 6ft Pickets</span>
                <h4 style={{ margin: "4px 0 6px 0", fontSize: "1.05rem", fontWeight: 800 }}>Full Perimeter Lawn & Gazebo Enclosure</h4>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748B" }}>
                  Installed with interlocking tongue & groove panels for 100% wind shielding and uninterrupted backyard relaxation.
                </p>
              </div>
            </div>
          )}

          {(galleryFilter === "all" || galleryFilter === "chain-link") && (
            <div
              style={{
                borderRadius: "14px",
                overflow: "hidden",
                border: "1px solid #E2E8F0",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)"
              }}
            >
              <Image
                src="/images/demo/total-fence/black-chain-link-estate.jpg"
                alt="Black Chain Link Fence on manicured property"
                width={600}
                height={450}
                style={{ width: "100%", height: "260px", objectFit: "cover" }}
              />
              <div style={{ padding: "16px 20px", backgroundColor: "#FFFFFF" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#334155", textTransform: "uppercase" }}>Black Chain Link • Vinyl Coated</span>
                <h4 style={{ margin: "4px 0 6px 0", fontSize: "1.05rem", fontWeight: 800 }}>Suburban Acreage Perimeter & Shed Enclosure</h4>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748B" }}>
                  High-tensile black polymer mesh that protects pets while preserving panoramic neighborhood and green lawn views.
                </p>
              </div>
            </div>
          )}

          {(galleryFilter === "all" || galleryFilter === "vinyl") && (
            <div
              style={{
                borderRadius: "14px",
                overflow: "hidden",
                border: "1px solid #E2E8F0",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)"
              }}
            >
              <Image
                src="/images/demo/total-fence/vinyl-fence-detail.jpg"
                alt="Vinyl fence panel close-up craftsmanship"
                width={600}
                height={450}
                style={{ width: "100%", height: "260px", objectFit: "cover" }}
              />
              <div style={{ padding: "16px 20px", backgroundColor: "#FFFFFF" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#2563EB", textTransform: "uppercase" }}>Precision Detail</span>
                <h4 style={{ margin: "4px 0 6px 0", fontSize: "1.05rem", fontWeight: 800 }}>Aluminum Bottom Rail & Heavy Post Anchors</h4>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748B" }}>
                  Engineered with an internal metal bottom channel to prevent sagging under heavy seasonal snowdrifts.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Booking & Estimate Station (#estimate) */}
      <section
        id="estimate"
        style={{
          backgroundColor: "#0D3594",
          color: "#FFFFFF",
          padding: "60px 20px",
          textAlign: "center"
        }}
      >
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <span style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#FFFFFF", fontSize: "0.75rem", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", textTransform: "uppercase" }}>
            FAST DIGITAL ESTIMATING & DISPATCH
          </span>
          <h2 style={{ fontSize: "2.4rem", fontWeight: 900, margin: "14px 0 16px 0" }}>
            Ready To Protect & Enclose Your Property?
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#BFDBFE", lineHeight: 1.6, margin: "0 0 28px 0" }}>
            Get an instant budget range using our interactive calculator, or schedule our field estimator to laser measure your property line. Zero high-pressure sales, zero phone tag.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px" }}>
            <button
              onClick={() => handleOpenEstimator()}
              style={{
                backgroundColor: "#FFFFFF",
                color: "#0D3594",
                fontWeight: 800,
                fontSize: "1rem",
                padding: "14px 26px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.3)"
              }}
            >
              <IconCalculator size={20} />
              <span>Launch Linear Footage Estimator</span>
            </button>

            <button
              onClick={() => handleOpenQuote()}
              style={{
                backgroundColor: "#059669",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "1rem",
                padding: "14px 26px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 10px 15px -3px rgba(5,150,105,0.4)"
              }}
            >
              <span>Schedule Free Laser Measure</span>
              <IconArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#0A1733",
          color: "#94A3B8",
          fontSize: "0.82rem",
          padding: "50px 20px 30px 20px",
          borderTop: "1px solid rgba(255,255,255,0.08)"
        }}
      >
        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "30px",
            marginBottom: "36px"
          }}
        >
          <div>
            <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "#FFFFFF", textTransform: "uppercase", marginBottom: "6px" }}>
              TOTAL <span style={{ color: "#94A3B8" }}>FENCE</span>
            </div>
            <p style={{ margin: "0 0 10px 0", color: "#CBD5E1" }}>
              {TOTAL_FENCE_DATA.legalEntity}
            </p>
            <p style={{ margin: 0, lineHeight: 1.5 }}>
              Expect Quality Fences For Your Dollar! Western New York&apos;s trusted fence builder for residential backyards, pool barriers, and commercial facilities.
            </p>
          </div>

          <div>
            <div style={{ fontWeight: 700, color: "#FFFFFF", fontSize: "0.9rem", marginBottom: "10px" }}>
              Core Services
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span>• Vinyl Privacy & Picket Fencing</span>
              <span>• Black Vinyl-Coated Chain Link</span>
              <span>• Custom Western Red Cedar Wood</span>
              <span>• Commercial Perimeter Security</span>
              <span>• Winter Storm Damage & Gate Repair</span>
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, color: "#FFFFFF", fontSize: "0.9rem", marginBottom: "10px" }}>
              Service Territory
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {TOTAL_FENCE_DATA.serviceAreas.map(a => (
                <span
                  key={a}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    color: "#E2E8F0"
                  }}
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, color: "#FFFFFF", fontSize: "0.9rem", marginBottom: "10px" }}>
              Contact & Hours
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <a
                href={`tel:${TOTAL_FENCE_DATA.cleanPhone}`}
                style={{ color: "#60A5FA", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}
              >
                <IconPhone size={15} />
                <span>{TOTAL_FENCE_DATA.phone}</span>
              </a>
              <a
                href={TOTAL_FENCE_DATA.facebookUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: "#93C5FD", textDecoration: "none" }}
              >
                📘 Facebook: TotalFenceOfficial
              </a>
              <span>📍 {TOTAL_FENCE_DATA.location}</span>
            </div>
          </div>
        </div>

        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
            fontSize: "0.75rem"
          }}
        >
          <div>
            © 2026 {TOTAL_FENCE_DATA.legalEntity}. All Rights Reserved. Fully Licensed & Insured in NY State.
          </div>
          <div style={{ color: "#64748B" }}>
            Designed & Engineered by Scalebiz Systems Engineering
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <FenceCostEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        initialMaterialId={selectedMaterialForModal}
        onProceedToBooking={handleProceedFromEstimator}
      />

      <TotalFenceQuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        prefilledSpecs={activeEstimateSpecs}
      />

      {/* Mobile Floating Sticky CTA Bar (Visible on mobile <= 768px) */}
      <div
        className="mobile-sticky-bar"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 850,
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #CBD5E1",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.12)",
          padding: "10px 14px",
          display: "flex",
          gap: "10px",
          alignItems: "center"
        }}
      >
        <button
          onClick={() => handleOpenQuote()}
          style={{
            flex: 1,
            backgroundColor: "#059669",
            color: "#FFFFFF",
            padding: "12px 10px",
            borderRadius: "10px",
            border: "none",
            fontWeight: 700,
            fontSize: "0.85rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            boxShadow: "0 4px 10px rgba(5, 150, 105, 0.25)",
            transition: "all 0.2s"
          }}
        >
          <IconCalendar size={16} />
          <span>Book Free Measure</span>
        </button>

        <button
          onClick={() => handleOpenEstimator()}
          style={{
            flex: 1,
            backgroundColor: "#0D3594",
            color: "#FFFFFF",
            padding: "12px 10px",
            borderRadius: "10px",
            border: "none",
            fontWeight: 700,
            fontSize: "0.85rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            boxShadow: "0 4px 10px rgba(13, 53, 148, 0.25)",
            transition: "all 0.2s"
          }}
        >
          <IconCalculator size={16} />
          <span>Estimate Cost</span>
        </button>
      </div>

      {/* Responsive Styles Helper */}
      <style jsx global>{`
        /* Top Announcement Bar */
        @media (max-width: 640px) {
          .top-bar-hours {
            display: none !important;
          }
        }

        /* Desktop Header Nav Link Hover Effects */
        .header-nav-link {
          color: #334155;
          text-decoration: none;
          font-size: 0.86rem;
          font-weight: 600;
          padding: 6px 10px;
          border-radius: 6px;
          white-space: nowrap !important;
          transition: all 0.15s ease-in-out;
          display: inline-flex;
          align-items: center;
          line-height: 1.2;
        }
        .header-nav-link:hover {
          color: #0D3594 !important;
          background-color: #F1F5F9 !important;
        }

        /* Header Responsiveness (Tablets & Mobile <= 1024px get clean hamburger drawer) */
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-header-actions {
            display: none !important;
          }
          .mobile-hamburger {
            display: flex !important;
          }
        }
        @media (min-width: 1025px) {
          .mobile-hamburger {
            display: none !important;
          }
        }

        /* Hero Responsive Reordering (Mobile: Intro -> Image -> 2 CTA Buttons -> Trust) */
        @media (min-width: 861px) {
          .hero-grid-container {
            display: grid !important;
            grid-template-columns: 1.15fr 0.85fr !important;
            column-gap: 48px !important;
            row-gap: 20px !important;
            align-items: center !important;
          }
          .hero-intro {
            grid-column: 1 !important;
            grid-row: 1 !important;
          }
          .hero-actions {
            grid-column: 1 !important;
            grid-row: 2 !important;
          }
          .hero-trust {
            grid-column: 1 !important;
            grid-row: 3 !important;
          }
          .hero-visual {
            grid-column: 2 !important;
            grid-row: 1 / span 3 !important;
          }
        }

        @media (max-width: 860px) {
          .hero-grid-container {
            display: flex !important;
            flex-direction: column !important;
            gap: 24px !important;
          }
          .hero-intro {
            order: 1 !important;
          }
          .hero-visual {
            order: 2 !important; /* Visual photo appears ABOVE the 2 action buttons! */
          }
          .hero-actions {
            order: 3 !important; /* The 2 CTA buttons appear right after the photo! */
          }
          .hero-trust {
            order: 4 !important; /* Trust indicators follow beneath the buttons */
          }
        }

        /* Mobile Sticky Bottom CTA Bar */
        @media (min-width: 769px) {
          .mobile-sticky-bar {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          body {
            padding-bottom: 74px !important;
          }
        }
      `}</style>
    </div>
  );
}
