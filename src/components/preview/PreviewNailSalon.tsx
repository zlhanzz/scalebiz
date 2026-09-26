"use client";

import React, { useState } from "react";
import { PrototypeData } from "@/data/demoPrototypes";
import ClaimDemoBar from "./ClaimDemoBar";

interface PreviewNailSalonProps {
  data: PrototypeData;
}

export default function PreviewNailSalon({ data }: PreviewNailSalonProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div
      style={{
        backgroundColor: "#FAF7F2",
        color: "#2C2523",
        minHeight: "100vh",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        lineHeight: 1.6,
        paddingBottom: "90px",
      }}
    >
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div
        style={{
          backgroundColor: "#2C2523",
          color: "#F3EDE2",
          fontSize: "13px",
          fontWeight: 500,
          padding: "8px 16px",
          textAlign: "center",
          letterSpacing: "0.4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <span>{data.announcement}</span>
        <span style={{ opacity: 0.5 }}>•</span>
        <a
          href={`tel:${data.phone}`}
          style={{
            color: "#E2AA8C",
            textDecoration: "none",
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          📞 {data.phoneDisplay}
        </a>
      </div>

      {/* 2. SALON NAVIGATION HEADER */}
      <header
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid #EFE8DE",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: "1.5px",
                color: "#2C2523",
                display: "block",
                lineHeight: 1.1,
              }}
            >
              {data.businessName.toUpperCase()}
            </span>
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#9E6B55",
                fontWeight: 600,
              }}
            >
              Lockport, NY • By {data.owners}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <a
              href={`tel:${data.phone}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#F3EDE2",
                color: "#2C2523",
                textDecoration: "none",
                padding: "8px 14px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                border: "1px solid #E5D9C8",
              }}
            >
              <span>📞</span>
              <span className="hidden sm:inline">Call Salon</span>
            </a>

            <a
              href={data.messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#B86B52",
                color: "#FFFFFF",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 700,
                boxShadow: "0 2px 8px rgba(184, 107, 82, 0.25)",
              }}
            >
              <span>💬</span>
              <span>Message Us</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          padding: "32px 20px 48px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
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
                border: "1px solid #EFE8DE",
                padding: "6px 14px",
                borderRadius: "9999px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#855440",
                marginBottom: "16px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
              }}
            >
              <span>⭐️ 4.7 Google Rating ({data.reviewCount} Reviews)</span>
              <span style={{ opacity: 0.4 }}>•</span>
              <span style={{ color: "#16a34a", fontWeight: 700 }}>● Open Today</span>
            </div>

            <h1
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(30px, 5vw, 46px)",
                fontWeight: 700,
                lineHeight: 1.18,
                color: "#2C2523",
                margin: "0 0 16px",
              }}
            >
              Impeccable Nail Artistry &amp; Pure Spa Relaxation.
            </h1>

            <p
              style={{
                fontSize: "16px",
                color: "#6B5C56",
                margin: "0 0 28px",
                maxWidth: "500px",
                lineHeight: 1.6,
              }}
            >
              Welcome to Lockport&apos;s premier boutique salon. Experience sterile medical-grade care, long-lasting gel overlays, and therapeutic foot soaks curated with love by Bea &amp; Hai.
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
              <a
                href={data.messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: "1 1 200px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  backgroundColor: "#B86B52",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  padding: "14px 24px",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "15px",
                  boxShadow: "0 8px 18px rgba(184, 107, 82, 0.3)",
                }}
              >
                <span>💬 Message to Book</span>
              </a>

              <a
                href={`tel:${data.phone}`}
                style={{
                  flex: "1 1 180px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  backgroundColor: "#FFFFFF",
                  color: "#2C2523",
                  textDecoration: "none",
                  padding: "14px 20px",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "15px",
                  border: "1px solid #E2D7C8",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                }}
              >
                <span>📞 {data.phoneDisplay}</span>
              </a>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                fontSize: "13px",
                color: "#786862",
              }}
            >
              <a
                href={data.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#9E6B55",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                📍 1195 Lincoln Ave, Lockport →
              </a>
              <span>•</span>
              <span>Walk-ins Welcome</span>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 20px 40px -15px rgba(66, 42, 33, 0.18)",
                border: "1px solid #EFE8DE",
                background: "#E8DFD4",
                aspectRatio: "16 / 10",
              }}
            >
              <img
                src={data.heroImage}
                alt="Trendy Nail Spa Interior"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>

            {/* Floating Tag */}
            <div
              style={{
                position: "absolute",
                bottom: "-16px",
                left: "24px",
                backgroundColor: "rgba(255, 255, 255, 0.96)",
                backdropFilter: "blur(8px)",
                padding: "12px 18px",
                borderRadius: "14px",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.12)",
                border: "1px solid #EFE8DE",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "#F5EBE1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                }}
              >
                💅
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#9E6B55", textTransform: "uppercase" }}>
                  Family-Owned &amp; Operated
                </div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#2C2523" }}>
                  Bea &amp; Hai • Lockport NY
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRUST & AMENITIES STRIP */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #EFE8DE",
          borderBottom: "1px solid #EFE8DE",
          padding: "36px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "24px",
          }}
        >
          {data.amenities.map((item, idx) => (
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
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  backgroundColor: "#FAF7F2",
                  border: "1px solid #EFE8DE",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <div>
                <h4 style={{ margin: "0 0 4px", fontSize: "15px", fontWeight: 700, color: "#2C2523" }}>
                  {item.title}
                </h4>
                <p style={{ margin: 0, fontSize: "13px", color: "#786862", lineHeight: 1.45 }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SERVICE MENU & PRICING (INTERACTIVE TABS) */}
      <section
        id="menu"
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          padding: "56px 20px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              color: "#9E6B55",
            }}
          >
            Clean &amp; Transparent Pricing
          </span>
          <h2
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(26px, 4vw, 36px)",
              fontWeight: 700,
              color: "#2C2523",
              margin: "8px 0 12px",
            }}
          >
            Services &amp; Treatment Menu
          </h2>
          <p style={{ fontSize: "15px", color: "#786862", maxWidth: "560px", margin: "0 auto" }}>
            Every pedicure is prepared with single-use sterile basin liners and individually sealed medical-grade tools.
          </p>
        </div>

        {/* Tab Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "36px",
            flexWrap: "wrap",
          }}
        >
          {data.serviceCategories.map((cat, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                style={{
                  backgroundColor: isActive ? "#B86B52" : "#FFFFFF",
                  color: isActive ? "#FFFFFF" : "#5A4C46",
                  border: isActive ? "1px solid #B86B52" : "1px solid #E2D7C8",
                  padding: "10px 20px",
                  borderRadius: "9999px",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: isActive ? "0 4px 12px rgba(184, 107, 82, 0.25)" : "none",
                  transition: "all 0.15s ease",
                }}
              >
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* Active Category Items Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {data.serviceCategories[activeTab]?.items.map((srv, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid #EFE8DE",
                padding: "24px",
                boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
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
                    backgroundColor: "#F3EDE2",
                    color: "#9E6B55",
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: "6px",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  ★ Popular
                </div>
              )}

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#2C2523",
                      paddingRight: srv.popular ? "75px" : "10px",
                    }}
                  >
                    {srv.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: "Georgia, serif",
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#9E6B55",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {srv.price}
                  </span>
                </div>

                <div
                  style={{
                    display: "inline-block",
                    fontSize: "12px",
                    color: "#A18274",
                    fontWeight: 600,
                    marginBottom: "10px",
                  }}
                >
                  ⏱ {srv.duration}
                </div>

                <p style={{ margin: 0, fontSize: "14px", color: "#6B5C56", lineHeight: 1.5 }}>
                  {srv.description}
                </p>
              </div>

              <div style={{ marginTop: "18px", paddingTop: "14px", borderTop: "1px solid #F5EFE6" }}>
                <a
                  href={data.messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#B86B52",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  Book this service on Messenger →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. VISUAL SHOWCASE / GALLERY */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #EFE8DE",
          borderBottom: "1px solid #EFE8DE",
          padding: "56px 20px",
        }}
      >
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                color: "#9E6B55",
              }}
            >
              Artistry &amp; Atmosphere
            </span>
            <h2
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(26px, 4vw, 36px)",
                fontWeight: 700,
                color: "#2C2523",
                margin: "8px 0 12px",
              }}
            >
              Recent Salon Work
            </h2>
            <p style={{ fontSize: "15px", color: "#786862", margin: 0 }}>
              Follow our latest nail designs and seasonal specials.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {data.galleryImages.map((img, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#FAF7F2",
                  borderRadius: "18px",
                  overflow: "hidden",
                  border: "1px solid #EFE8DE",
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
                <div style={{ padding: "16px 20px" }}>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "#9E6B55",
                      letterSpacing: "0.5px",
                      marginBottom: "4px",
                    }}
                  >
                    {img.tag}
                  </div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "#2C2523" }}>
                    {img.caption}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. VERIFIED GOOGLE REVIEWS */}
      <section
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          padding: "56px 20px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "14px",
              fontWeight: 700,
              color: "#f59e0b",
              marginBottom: "8px",
            }}
          >
            ★★★★★ 4.7 Stars on Google
          </div>
          <h2
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(26px, 4vw, 36px)",
              fontWeight: 700,
              color: "#2C2523",
              margin: 0,
            }}
          >
            Loved by Niagara County Locals
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {data.testimonials.map((t, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid #EFE8DE",
                padding: "24px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ color: "#f59e0b", fontSize: "16px", marginBottom: "12px", letterSpacing: "2px" }}>
                  {"★".repeat(t.rating)}
                </div>
                <p style={{ margin: "0 0 16px", fontSize: "14px", color: "#4A3E39", fontStyle: "italic", lineHeight: 1.6 }}>
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              <div style={{ paddingTop: "14px", borderTop: "1px solid #F5EFE6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#2C2523" }}>
                    {t.author}
                  </div>
                  <div style={{ fontSize: "12px", color: "#8E7D76" }}>
                    {t.location} • {t.service}
                  </div>
                </div>
                <span style={{ fontSize: "11px", color: "#B5A7A0" }}>{t.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. LOCATION, HOURS & CONTACT CARD */}
      <section
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          padding: "0 20px 56px",
        }}
      >
        <div
          style={{
            backgroundColor: "#2C2523",
            color: "#FAF7F2",
            borderRadius: "24px",
            padding: "40px 32px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "36px",
            alignItems: "center",
            boxShadow: "0 20px 40px -10px rgba(44, 37, 35, 0.3)",
          }}
        >
          <div>
            <span
              style={{
                color: "#E2AA8C",
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Visit Our Salon
            </span>
            <h3
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "28px",
                margin: "8px 0 16px",
                color: "#FFFFFF",
              }}
            >
              Convenient Location on Lincoln Ave
            </h3>

            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>
                📍 {data.address}
              </div>
              <div style={{ fontSize: "14px", color: "#C5B8B1" }}>
                {data.cityStateZip} (Ample dedicated parking in front)
              </div>
            </div>

            <div style={{ marginBottom: "28px" }}>
              <div style={{ fontSize: "14px", color: "#C5B8B1", marginBottom: "4px" }}>
                Phone Appointments &amp; Inquiries:
              </div>
              <a
                href={`tel:${data.phone}`}
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#E2AA8C",
                  textDecoration: "none",
                }}
              >
                {data.phoneDisplay}
              </a>
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href={data.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#2C2523",
                  textDecoration: "none",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "14px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>🗺️ Open in Google Maps</span>
              </a>

              <a
                href={data.messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: "#B86B52",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "14px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>💬 Message Bea &amp; Hai</span>
              </a>
            </div>
          </div>

          {/* Business Hours Table */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: "16px",
              padding: "24px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <h4 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: 700, color: "#E2AA8C" }}>
              🕒 Salon Hours of Operation
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {data.hours.map((h, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                    paddingBottom: "10px",
                    borderBottom: idx < data.hours.length - 1 ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
                  }}
                >
                  <span style={{ color: "#E8DFD9", fontWeight: 500 }}>{h.day}</span>
                  <span style={{ color: "#FFFFFF", fontWeight: 700 }}>{h.hours}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "16px", fontSize: "12px", color: "#A89A92" }}>
              * Walk-ins accepted based on technician availability. Calling or messaging ahead is warmly encouraged!
            </div>
          </div>
        </div>
      </section>

      {/* 9. LOCAL FOOTER */}
      <footer
        style={{
          borderTop: "1px solid #EFE8DE",
          padding: "24px 20px",
          textAlign: "center",
          fontSize: "12px",
          color: "#9E8E87",
        }}
      >
        <p style={{ margin: "0 0 4px" }}>
          © {new Date().getFullYear()} {data.businessName}. All rights reserved. • 1195 Lincoln Ave, Lockport, NY 14094
        </p>
        <p style={{ margin: 0, fontSize: "11px", color: "#B8ABA5" }}>
          Sanitized with hospital-grade EPA registered disinfectant. Licensed by the State of New York.
        </p>
      </footer>

      {/* 10. FLOATING CLAIM BAR FOR PROSPECT */}
      <ClaimDemoBar businessName={data.businessName} owners={data.owners} />
    </div>
  );
}
