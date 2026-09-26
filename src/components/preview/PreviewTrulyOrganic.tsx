"use client";

import React, { useState } from "react";
import { TRULY_ORGANIC_DATA, StylistMember } from "@/data/trulyOrganicData";
import BookingModal from "./BookingModal";
import {
  IconLeaf,
  IconScissors,
  IconCalendar,
  IconClock,
  IconSparkles,
  IconStar,
  IconMapPin,
  IconPhone,
  IconInstagram,
  IconCheck,
  IconSuite,
} from "./OrganicIcons";

export default function PreviewTrulyOrganic() {
  const data = TRULY_ORGANIC_DATA;
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activeServiceTab, setActiveServiceTab] = useState<number>(0);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedStylistForBooking, setSelectedStylistForBooking] = useState<string>("adriana-bryer");

  const filteredStylists = data.stylists.filter((s) => {
    if (activeFilter === "all") return true;
    return s.category === activeFilter;
  });

  const handleOpenBooking = (stylistId?: string) => {
    if (stylistId) {
      setSelectedStylistForBooking(stylistId);
    }
    setIsBookingOpen(true);
  };

  const getCategoryCount = (cat: string) => {
    if (cat === "all") return data.stylists.length;
    return data.stylists.filter((s) => s.category === cat).length;
  };

  return (
    <div
      style={{
        backgroundColor: "#F7F5F0",
        color: "#242E28",
        minHeight: "100vh",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        lineHeight: 1.6,
      }}
    >
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div
        style={{
          backgroundColor: "#2C3E35",
          color: "#E5ECE7",
          fontSize: "13px",
          fontWeight: 500,
          padding: "9px 16px",
          letterSpacing: "0.3px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "14px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <IconLeaf size={15} color="#D4A373" />
          <span>{data.salonNotice}</span>
        </div>
        <span style={{ opacity: 0.35 }}>|</span>
        <button
          onClick={() => handleOpenBooking()}
          style={{
            background: "transparent",
            border: "none",
            color: "#D4A373",
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: 0,
            textDecoration: "underline",
          }}
        >
          <IconCalendar size={14} color="#D4A373" />
          <span>Book Online Today</span>
        </button>
      </div>

      {/* 2. SALON NAVIGATION HEADER */}
      <header
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid #E6E1D8",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "23px",
                fontWeight: 700,
                letterSpacing: "1.2px",
                color: "#1F2B24",
                display: "block",
                lineHeight: 1.1,
              }}
            >
              TRULY ORGANIC
            </span>
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "1.8px",
                textTransform: "uppercase",
                color: "#4A6B56",
                fontWeight: 600,
                display: "block",
                marginTop: "2px",
              }}
            >
              Hair Studio &amp; Suites • Lockport, NY
            </span>
          </div>

          {/* Center Navigation Links */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#4A5D52",
            }}
            className="hidden md:flex"
          >
            <a href="#services" style={{ textDecoration: "none", color: "inherit" }}>
              Services &amp; Pricing
            </a>
            <a href="#stylists" style={{ textDecoration: "none", color: "inherit" }}>
              Our Artisans
            </a>
            <a href="#gallery" style={{ textDecoration: "none", color: "inherit" }}>
              Gallery
            </a>
            <a href="#testimonials" style={{ textDecoration: "none", color: "inherit" }}>
              Reviews
            </a>
            <a href="#location" style={{ textDecoration: "none", color: "inherit" }}>
              Location
            </a>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <a
              href={`https://www.instagram.com/${data.instagram}/`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#F2EFE9",
                color: "#2C3E35",
                textDecoration: "none",
                padding: "8px 12px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                border: "1px solid #DCD6CB",
              }}
            >
              <IconInstagram size={15} color="#4A6B56" />
              <span className="hidden sm:inline">@{data.instagram}</span>
            </a>

            <button
              onClick={() => handleOpenBooking()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#3A5A40",
                color: "#FFFFFF",
                border: "none",
                padding: "9px 18px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(58, 90, 64, 0.25)",
              }}
            >
              <IconCalendar size={15} color="#FFFFFF" />
              <span>Book on Web</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "36px 20px 52px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "40px",
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
                border: "1px solid #E2DCD1",
                padding: "6px 14px",
                borderRadius: "9999px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#3A5A40",
                marginBottom: "18px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
              }}
            >
              <IconLeaf size={14} color="#3A5A40" />
              <span>Organic &amp; Low-Tox Hair Studio</span>
              <span style={{ opacity: 0.4 }}>•</span>
              <span>11 Independent Suites</span>
            </div>

            <h1
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(32px, 5.2vw, 48px)",
                fontWeight: 700,
                lineHeight: 1.15,
                color: "#1E2922",
                margin: "0 0 16px",
              }}
            >
              Clean Hair Wellness, Lived-In Blonding &amp; Private Suites.
            </h1>

            <p
              style={{
                fontSize: "16px",
                color: "#526358",
                margin: "0 0 28px",
                maxWidth: "520px",
                lineHeight: 1.6,
              }}
            >
              Welcome to Lockport&apos;s botanical beauty sanctuary on Davison Rd. A curated collective of 11 independent hair and beauty artisans dedicated to organic formulations, custom extensions, and personalized one-on-one appointments.
            </p>

            {/* Quick Action Grid */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              <button
                onClick={() => handleOpenBooking()}
                style={{
                  flex: "1 1 200px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  backgroundColor: "#3A5A40",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "14px 24px",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "15px",
                  cursor: "pointer",
                  boxShadow: "0 8px 18px rgba(58, 90, 64, 0.28)",
                }}
              >
                <IconCalendar size={17} color="#FFFFFF" />
                <span>Book Appointment on Web</span>
              </button>

              <a
                href="#stylists"
                style={{
                  flex: "1 1 180px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  backgroundColor: "#FFFFFF",
                  color: "#2C3E35",
                  textDecoration: "none",
                  padding: "14px 20px",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "15px",
                  border: "1px solid #DCD6CB",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                }}
              >
                <IconScissors size={16} color="#3A5A40" />
                <span>Meet 11 Artisans</span>
              </a>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                fontSize: "13px",
                color: "#637469",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <IconMapPin size={14} color="#3A5A40" />
                <span>Davison Rd, Lockport NY</span>
              </div>
              <span>•</span>
              <span>By Appointment Only</span>
              <span>•</span>
              <span>Web Booking Active</span>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 20px 45px -15px rgba(33, 48, 38, 0.22)",
                border: "1px solid #E2DCD1",
                background: "#E7E2D7",
                aspectRatio: "16 / 10",
              }}
            >
              <img
                src="/images/demo/truly-organic/hero.jpg"
                alt="Truly Organic Hair Studio Interior"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>

            {/* Floating Studio Badge */}
            <div
              style={{
                position: "absolute",
                bottom: "-16px",
                left: "24px",
                backgroundColor: "rgba(255, 255, 255, 0.96)",
                backdropFilter: "blur(10px)",
                padding: "12px 18px",
                borderRadius: "14px",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.12)",
                border: "1px solid #E2DCD1",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  backgroundColor: "#EAF0EB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconLeaf size={20} color="#3A5A40" />
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#3A5A40", textTransform: "uppercase" }}>
                  Founded by Adriana Bryer
                </div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#1F2B24" }}>
                  Organic Salon &amp; Suites Collective
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLEAN ORGANIC BEAUTY PILLARS */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #E6E1D8",
          borderBottom: "1px solid #E6E1D8",
          padding: "44px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
          }}
        >
          {data.philosophy.map((item, idx) => {
            const renderIcon = () => {
              if (item.iconType === "leaf") return <IconLeaf size={22} color="#3A5A40" />;
              if (item.iconType === "suite") return <IconSuite size={22} color="#3A5A40" />;
              if (item.iconType === "artisan") return <IconScissors size={22} color="#3A5A40" />;
              return <IconCalendar size={22} color="#3A5A40" />;
            };

            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "12px",
                    backgroundColor: "#F7F5F0",
                    border: "1px solid #E6E1D8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {renderIcon()}
                </div>
                <div>
                  <h4 style={{ margin: "0 0 4px", fontSize: "15px", fontWeight: 700, color: "#1F2B24" }}>
                    {item.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: "13px", color: "#5C6E62", lineHeight: 1.48 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. SERVICES & PRICING MENU (FULL SECTION) */}
      <section
        id="services"
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "60px 20px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1.8px",
              color: "#3A5A40",
            }}
          >
            Carefully Formulated Treatments
          </span>
          <h2
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(28px, 4.5vw, 40px)",
              fontWeight: 700,
              color: "#1F2B24",
              margin: "8px 0 12px",
            }}
          >
            Services &amp; Pricing Menu
          </h2>
          <p style={{ fontSize: "15px", color: "#5C6E62", maxWidth: "600px", margin: "0 auto" }}>
            Clean, low-tox botanical hair coloring, certified extensions, organic spray tanning, and structured gel nails.
          </p>
        </div>

        {/* Service Category Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "36px",
            flexWrap: "wrap",
          }}
        >
          {data.services.map((cat, idx) => {
            const isActive = activeServiceTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveServiceTab(idx)}
                style={{
                  backgroundColor: isActive ? "#3A5A40" : "#FFFFFF",
                  color: isActive ? "#FFFFFF" : "#4A5D52",
                  border: isActive ? "1px solid #3A5A40" : "1px solid #DCD6CB",
                  padding: "10px 20px",
                  borderRadius: "9999px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: isActive ? "0 4px 12px rgba(58, 90, 64, 0.22)" : "none",
                  transition: "all 0.15s ease",
                }}
              >
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* Service Items Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "22px",
          }}
        >
          {data.services[activeServiceTab]?.items.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid #E2DCD1",
                padding: "24px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                {/* Top Row: Tag & Price cleanly separated */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                    gap: "12px",
                  }}
                >
                  {item.popular ? (
                    <span
                      style={{
                        backgroundColor: "#EBF2ED",
                        color: "#2C5E38",
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "3px 9px",
                        borderRadius: "6px",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      Featured Service
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#7A8C81",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      Botanical Treatment
                    </span>
                  )}
                  <span
                    style={{
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#3A5A40",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.price}
                  </span>
                </div>

                {/* Service Name with full width */}
                <h3
                  style={{
                    margin: "0 0 8px",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#1F2B24",
                    lineHeight: 1.35,
                  }}
                >
                  {item.name}
                </h3>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    color: "#7A8C81",
                    fontWeight: 600,
                    marginBottom: "10px",
                  }}
                >
                  <IconClock size={13} color="#7A8C81" />
                  <span>{item.duration}</span>
                </div>

                <p style={{ margin: 0, fontSize: "13px", color: "#5C6E62", lineHeight: 1.55 }}>
                  {item.description}
                </p>
              </div>

              <div style={{ marginTop: "18px", paddingTop: "14px", borderTop: "1px solid #F0EAE0" }}>
                <button
                  type="button"
                  onClick={() => handleOpenBooking()}
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#3A5A40",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span>Reserve This Service</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. THE SHOWSTOPPER: STYLIST DIRECTORY WITH REAL PHOTOS & ON-APP BOOKING */}
      <section
        id="stylists"
        style={{
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #E6E1D8",
          borderBottom: "1px solid #E6E1D8",
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
                color: "#3A5A40",
              }}
            >
              Meet Our Collective Artisans
            </span>
            <h2
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(28px, 4.5vw, 40px)",
                fontWeight: 700,
                color: "#1F2B24",
                margin: "8px 0 12px",
              }}
            >
              Choose Your Stylist &amp; Book on Web
            </h2>
            <p style={{ fontSize: "15px", color: "#5C6E62", maxWidth: "620px", margin: "0 auto" }}>
              Each beauty professional at Truly Organic operates their own dedicated suite. Click <strong>Book on Web</strong> to reserve directly via our online portal.
            </p>
          </div>

          {/* Category Filters */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "36px",
              flexWrap: "wrap",
            }}
          >
            {[
              { id: "all", label: "All Artisans" },
              { id: "blonding-extensions", label: "Blonding & Extensions" },
              { id: "hair-color", label: "Cuts & Color Specialists" },
              { id: "lashes-makeup", label: "Lashes & Makeup" },
              { id: "nails-waxing", label: "Nails & Esthetics" },
            ].map((tab) => {
              const isActive = activeFilter === tab.id;
              const count = getCategoryCount(tab.id);
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  style={{
                    backgroundColor: isActive ? "#3A5A40" : "#F7F5F0",
                    color: isActive ? "#FFFFFF" : "#4A5D52",
                    border: isActive ? "1px solid #3A5A40" : "1px solid #DCD6CB",
                    padding: "9px 18px",
                    borderRadius: "9999px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    boxShadow: isActive ? "0 4px 12px rgba(58, 90, 64, 0.22)" : "none",
                    transition: "all 0.15s ease",
                  }}
                >
                  {tab.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Stylists Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
            }}
          >
            {filteredStylists.map((stylist: StylistMember) => (
              <div
                key={stylist.id}
                style={{
                  backgroundColor: "#FBF9F6",
                  borderRadius: "18px",
                  border: stylist.featured ? "2px solid #547A5C" : "1px solid #E2DCD1",
                  padding: "24px",
                  boxShadow: stylist.featured
                    ? "0 10px 25px -5px rgba(58, 90, 64, 0.12)"
                    : "0 4px 14px rgba(0,0,0,0.03)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                {stylist.featured && (
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      backgroundColor: "#EAF2EC",
                      color: "#2E5A36",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: "6px",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    Founder / Owner
                  </div>
                )}

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
                    <div style={{ position: "relative" }}>
                      <img
                        src={stylist.avatar}
                        alt={stylist.name}
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: stylist.featured ? "2.5px solid #D4A373" : "2px solid #547A5C",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                          display: "block",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: "-2px",
                          right: "-2px",
                          width: "14px",
                          height: "14px",
                          borderRadius: "50%",
                          backgroundColor: "#22c55e",
                          border: "2px solid #FFFFFF",
                        }}
                        title="Available for Appointments"
                      />
                    </div>

                    <div>
                      <h3 style={{ margin: 0, fontSize: "19px", fontWeight: 700, color: "#1F2B24" }}>
                        {stylist.name}
                      </h3>
                      <div style={{ fontSize: "13px", color: "#547A5C", fontWeight: 600 }}>
                        {stylist.role}
                      </div>
                    </div>
                  </div>

                  {/* Specialties Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
                    {stylist.specialties.map((spec, i) => (
                      <span
                        key={i}
                        style={{
                          backgroundColor: "#FFFFFF",
                          color: "#3F5145",
                          fontSize: "11px",
                          fontWeight: 600,
                          padding: "3px 9px",
                          borderRadius: "6px",
                          border: "1px solid #E2DCD1",
                        }}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {stylist.note && (
                    <p
                      style={{
                        margin: "0 0 16px",
                        fontSize: "13px",
                        color: "#5C6E62",
                        fontStyle: "italic",
                        lineHeight: 1.45,
                        backgroundColor: "#FFFFFF",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        borderLeft: "3px solid #3A5A40",
                      }}
                    >
                      &ldquo;{stylist.note}&rdquo;
                    </p>
                  )}
                </div>

                {/* Primary & Secondary Action Buttons */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "14px", borderTop: "1px solid #ECE6DB" }}>
                  {/* Primary On-App Booking Button */}
                  <button
                    type="button"
                    onClick={() => handleOpenBooking(stylist.id)}
                    style={{
                      width: "100%",
                      backgroundColor: "#3A5A40",
                      color: "#FFFFFF",
                      border: "none",
                      padding: "11px 14px",
                      borderRadius: "10px",
                      fontWeight: 700,
                      fontSize: "13px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      boxShadow: "0 4px 10px rgba(58, 90, 64, 0.2)",
                    }}
                  >
                    <IconCalendar size={15} color="#FFFFFF" />
                    <span>Book with {stylist.name.split(" ")[0]} on Web</span>
                  </button>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <a
                      href={`sms:${stylist.phone}?body=Hi%20${encodeURIComponent(stylist.name)}!%20I%20am%20interested%20in%20booking%20at%20Truly%20Organic%20Hair%20Studio.`}
                      style={{
                        flex: 1,
                        backgroundColor: "#FFFFFF",
                        color: "#2C3E35",
                        textDecoration: "none",
                        padding: "8px 10px",
                        borderRadius: "8px",
                        fontWeight: 600,
                        fontSize: "12px",
                        border: "1px solid #DCD6CB",
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <IconPhone size={13} color="#4A6B56" />
                      <span>Text ({stylist.phoneDisplay})</span>
                    </a>

                    {stylist.instagram && (
                      <a
                        href={`https://www.instagram.com/${stylist.instagram}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          backgroundColor: "#FFFFFF",
                          color: "#4A6B56",
                          textDecoration: "none",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          fontWeight: 600,
                          fontSize: "12px",
                          border: "1px solid #DCD6CB",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "4px",
                        }}
                        title={`Instagram @${stylist.instagram}`}
                      >
                        <IconInstagram size={14} color="#4A6B56" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. VISUAL WORK SHOWCASE / GALLERY */}
      <section
        id="gallery"
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "60px 20px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1.8px",
              color: "#3A5A40",
            }}
          >
            Artistry &amp; Real Transformations
          </span>
          <h2
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(28px, 4vw, 38px)",
              fontWeight: 700,
              color: "#1F2B24",
              margin: "8px 0 12px",
            }}
          >
            Crafted with Care at Truly Organic
          </h2>
          <p style={{ fontSize: "15px", color: "#5C6E62", margin: 0 }}>
            Actual client transformations by our 11 studio artisans on Davison Rd.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
            gap: "24px",
          }}
        >
          {data.gallery.map((img, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "18px",
                overflow: "hidden",
                border: "1px solid #E2DCD1",
                boxShadow: "0 8px 20px -8px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ aspectRatio: "4 / 3", overflow: "hidden" }}>
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.3s ease",
                  }}
                />
              </div>
              <div style={{ padding: "18px 22px" }}>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "#3A5A40",
                    letterSpacing: "0.5px",
                    marginBottom: "4px",
                  }}
                >
                  {img.tag} • {img.stylistCredit}
                </div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "#1F2B24" }}>
                  {img.caption}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. VERIFIED REVIEWS & TESTIMONIALS */}
      <section
        id="testimonials"
        style={{
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #E6E1D8",
          borderBottom: "1px solid #E6E1D8",
          padding: "60px 20px",
        }}
      >
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", marginBottom: "8px" }}>
              {[...Array(5)].map((_, i) => (
                <IconStar key={i} size={18} color="#D4A373" />
              ))}
              <span style={{ fontSize: "14px", fontWeight: 700, color: "#2C3E35", marginLeft: "6px" }}>
                5.0 Star Client Experiences
              </span>
            </div>
            <h2
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(28px, 4vw, 38px)",
                fontWeight: 700,
                color: "#1F2B24",
                margin: 0,
              }}
            >
              Loved by Niagara County Locals
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "22px",
            }}
          >
            {data.testimonials.map((t, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#FBF9F6",
                  borderRadius: "16px",
                  border: "1px solid #E2DCD1",
                  padding: "24px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
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
                  <p style={{ margin: "0 0 16px", fontSize: "14px", color: "#3B4D41", fontStyle: "italic", lineHeight: 1.6 }}>
                    &ldquo;{t.review}&rdquo;
                  </p>
                </div>

                <div style={{ paddingTop: "14px", borderTop: "1px solid #EDE6DB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#1F2B24" }}>
                      {t.author}
                    </div>
                    <div style={{ fontSize: "12px", color: "#6A7E71" }}>
                      {t.location} • {t.service}
                    </div>
                  </div>
                  <span style={{ fontSize: "11px", color: "#8E9E94" }}>{t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. LOCATION & STUDIO VISITING INFORMATION */}
      <section
        id="location"
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "60px 20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#2C3E35",
            color: "#F7F5F0",
            borderRadius: "24px",
            padding: "44px 36px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "36px",
            alignItems: "center",
            boxShadow: "0 20px 45px -10px rgba(31, 43, 36, 0.35)",
          }}
        >
          <div>
            <span
              style={{
                color: "#D4A373",
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.2px",
              }}
            >
              Visiting Truly Organic
            </span>
            <h3
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "30px",
                margin: "8px 0 16px",
                color: "#FFFFFF",
              }}
            >
              Located on Davison Rd, Lockport NY
            </h3>

            <p style={{ fontSize: "14px", color: "#D1DED5", lineHeight: 1.6, marginBottom: "20px" }}>
              Our salon suites are designed as a tranquil escape from noisy retail strip malls. Dedicated client parking is available directly on site for easy arrival.
            </p>

            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "15px", fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>
                📍 {data.address}, {data.cityStateZip}
              </div>
              <div style={{ fontSize: "13px", color: "#B8C9BD" }}>
                Private Salon &amp; Suites Collective
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                onClick={() => handleOpenBooking()}
                style={{
                  backgroundColor: "#D4A373",
                  color: "#1F2B24",
                  border: "none",
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
                <IconCalendar size={16} color="#1F2B24" />
                <span>Reserve Chair on Web</span>
              </button>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Truly+Organic+Hair+Studio+Davison+Rd+Lockport+NY"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#2C3E35",
                  textDecoration: "none",
                  padding: "13px 20px",
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "14px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <IconMapPin size={16} color="#2C3E35" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Salon Suites Protocol Card */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.06)",
              borderRadius: "16px",
              padding: "28px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            <h4 style={{ margin: "0 0 14px", fontSize: "17px", fontWeight: 700, color: "#D4A373" }}>
              📋 How to Book Your Appointment
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "13px", color: "#E0EBE2", lineHeight: 1.55 }}>
              <div>
                <strong>1. Seamless On-App Web Booking:</strong>
                <p style={{ margin: "4px 0 0", color: "#BDCEBF" }}>
                  Select your service, choose an available date and time slot, and confirm in seconds. Your artist receives your reservation directly.
                </p>
              </div>
              <div>
                <strong>2. Flexible Independent Hours:</strong>
                <p style={{ margin: "4px 0 0", color: "#BDCEBF" }}>
                  The salon has no rigid general business hours because all 11 beauty professionals manage their own booking calendars.
                </p>
              </div>
              <div>
                <strong>3. Bridal Parties &amp; Extensions:</strong>
                <p style={{ margin: "4px 0 0", color: "#BDCEBF" }}>
                  Contact Adriana Bryer directly for extension consultations and wedding bridal party inquiries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. LOCAL FOOTER */}
      <footer
        style={{
          borderTop: "1px solid #E6E1D8",
          padding: "24px 20px",
          textAlign: "center",
          fontSize: "12px",
          color: "#839589",
        }}
      >
        <p style={{ margin: "0 0 4px" }}>
          © {new Date().getFullYear()} Truly Organic Hair Studio. All Rights Reserved. • Davison Rd, Lockport, NY 14094
        </p>
        <p style={{ margin: 0, fontSize: "11px", color: "#A1B2A6" }}>
          Organic hair wellness, low-tox formulations, and independent salon suites.
        </p>
      </footer>

      {/* 11. INTERACTIVE ON-APP BOOKING MODAL */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedStylistId={selectedStylistForBooking}
      />
    </div>
  );
}
