"use client";

import React, { useState } from "react";
import { INKTELLECTUAL_DATA } from "@/data/inktellectualData";
import {
  IconCalculator,
  IconClose,
  IconSparkles,
  IconCheck,
  IconGraduationCap,
  IconArrowRight
} from "./InktellectualIcons";

interface InktellectualEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookWithEstimate?: (artistId: string, style: string, size: string) => void;
}

const SIZES = [
  { id: "small", label: "Small / Flash", desc: "1 – 3 inches", baseHours: "1 – 2 hrs", estPrice: "$120 – $220" },
  { id: "medium", label: "Medium Piece", desc: "4 – 6 inches", baseHours: "2 – 4 hrs", estPrice: "$280 – $550" },
  { id: "large", label: "Large Statement", desc: "7 – 10 inches", baseHours: "4 – 6 hrs", estPrice: "$600 – $950" },
  { id: "sleeve", label: "Multi-Session", desc: "Half / Full Sleeve or Back", baseHours: "8+ hrs (2-4 sessions)", estPrice: "$1,200 – $2,500+" }
];

const PLACEMENTS = [
  { id: "forearm", label: "Forearm / Wrist", factor: "Moderate Sensitivity" },
  { id: "bicep", label: "Bicep / Shoulder", factor: "Low Sensitivity" },
  { id: "ribs", label: "Ribs / Sternum", factor: "High Sensitivity" },
  { id: "thigh", label: "Thigh / Calf", factor: "Low-Moderate Sensitivity" },
  { id: "spine", label: "Spine / Upper Back", factor: "High Sensitivity" },
  { id: "hands", label: "Hand / Neck", factor: "Consultation Required" }
];

const STYLES = [
  { id: "realism", label: "Black & Grey Realism", matchedArtistId: "kobi", artistName: "Kobi" },
  { id: "fineline", label: "Fine-Line & Botanicals", matchedArtistId: "brandi", artistName: "Brandi Vogt" },
  { id: "color", label: "Neo-Traditional & Color", matchedArtistId: "mikey", artistName: "Mikey Hollywould" },
  { id: "piercing", label: "Piercing / Geometry", matchedArtistId: "spyder", artistName: "Spyder" },
  { id: "blackwork", label: "Heavy Blackwork & Script", matchedArtistId: "dave", artistName: "Dave Pantano" },
  { id: "backpiece", label: "Large Backpiece / Japanese", matchedArtistId: "dominic", artistName: "Dominic Soto" }
];

export const InktellectualEstimatorModal: React.FC<InktellectualEstimatorModalProps> = ({
  isOpen,
  onClose,
  onBookWithEstimate
}) => {
  const [selectedSize, setSelectedSize] = useState<string>("medium");
  const [selectedPlacement, setSelectedPlacement] = useState<string>("forearm");
  const [selectedStyle, setSelectedStyle] = useState<string>("realism");
  const [isStudent, setIsStudent] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentSizeObj = SIZES.find((s) => s.id === selectedSize) || SIZES[1];
  const currentPlacementObj = PLACEMENTS.find((p) => p.id === selectedPlacement) || PLACEMENTS[0];
  const currentStyleObj = STYLES.find((st) => st.id === selectedStyle) || STYLES[0];
  const matchedArtist = INKTELLECTUAL_DATA.artists.find((a) => a.id === currentStyleObj.matchedArtistId);

  const handleBookingTrigger = () => {
    onClose();
    if (onBookWithEstimate) {
      onBookWithEstimate(currentStyleObj.matchedArtistId, currentStyleObj.label, currentSizeObj.label);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "rgba(5, 5, 7, 0.85)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        overflowY: "auto"
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "680px",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#111114",
          border: "1px solid rgba(212, 175, 55, 0.35)",
          borderRadius: "16px",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(212, 175, 55, 0.15)",
          color: "#E6E6E8",
          overflow: "hidden",
          position: "relative",
          animation: "fadeInUp 0.25s ease-out"
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "18px 24px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(180deg, rgba(212, 175, 55, 0.12) 0%, rgba(17, 17, 20, 0.9) 100%)",
            flexShrink: 0
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                backgroundColor: "rgba(212, 175, 55, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#D4AF37",
                border: "1px solid rgba(212, 175, 55, 0.3)"
              }}
            >
              <IconCalculator size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.15rem", fontFamily: "var(--font-serif, Georgia, serif)", color: "#FFFFFF", letterSpacing: "0.02em" }}>
                Interactive Tattoo & Time Estimator
              </h3>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "#A0A0AA" }}>
                Bespoke guidance crafted by Inktellectual resident artisans
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#A0A0AA",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s"
            }}
          >
            <IconClose size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "20px 24px 24px", overflowY: "auto", flex: 1 }}>
          {/* Step 1: Size */}
          <div style={{ marginBottom: "22px" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#D4AF37", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>
              1. Select Approximate Size
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "10px" }}>
              {SIZES.map((sz) => {
                const active = sz.id === selectedSize;
                return (
                  <button
                    key={sz.id}
                    type="button"
                    onClick={() => setSelectedSize(sz.id)}
                    style={{
                      padding: "12px 10px",
                      borderRadius: "10px",
                      border: active ? "1.5px solid #D4AF37" : "1px solid rgba(255, 255, 255, 0.1)",
                      backgroundColor: active ? "rgba(212, 175, 55, 0.12)" : "rgba(255, 255, 255, 0.03)",
                      color: active ? "#FFFFFF" : "#BBBBC4",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s"
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: "0.9rem", color: active ? "#D4AF37" : "#FFFFFF" }}>{sz.label}</div>
                    <div style={{ fontSize: "0.75rem", color: "#8E8E98", marginTop: "3px" }}>{sz.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Placement */}
          <div style={{ marginBottom: "22px" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#D4AF37", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>
              2. Target Anatomical Placement
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px" }}>
              {PLACEMENTS.map((pl) => {
                const active = pl.id === selectedPlacement;
                return (
                  <button
                    key={pl.id}
                    type="button"
                    onClick={() => setSelectedPlacement(pl.id)}
                    style={{
                      padding: "10px 12px",
                      borderRadius: "8px",
                      border: active ? "1.5px solid #D4AF37" : "1px solid rgba(255, 255, 255, 0.08)",
                      backgroundColor: active ? "rgba(212, 175, 55, 0.1)" : "rgba(255, 255, 255, 0.02)",
                      color: active ? "#FFFFFF" : "#A6A6B0",
                      cursor: "pointer",
                      textAlign: "left",
                      fontSize: "0.85rem"
                    }}
                  >
                    <div style={{ fontWeight: 500, color: active ? "#D4AF37" : "#E2E2E6" }}>{pl.label}</div>
                    <div style={{ fontSize: "0.72rem", color: "#7A7A85", marginTop: "2px" }}>{pl.factor}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Preferred Style & Matched Artist */}
          <div style={{ marginBottom: "22px" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#D4AF37", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>
              3. Artistic Style Preference
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "10px" }}>
              {STYLES.map((st) => {
                const active = st.id === selectedStyle;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setSelectedStyle(st.id)}
                    style={{
                      padding: "12px",
                      borderRadius: "10px",
                      border: active ? "1.5px solid #D4AF37" : "1px solid rgba(255, 255, 255, 0.08)",
                      backgroundColor: active ? "rgba(212, 175, 55, 0.12)" : "rgba(255, 255, 255, 0.03)",
                      color: active ? "#FFFFFF" : "#A6A6B0",
                      cursor: "pointer",
                      textAlign: "left"
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: "0.88rem", color: active ? "#D4AF37" : "#FFFFFF" }}>{st.label}</div>
                    <div style={{ fontSize: "0.76rem", color: "#A0A0AA", marginTop: "4px" }}>
                      Resident: <span style={{ color: active ? "#FFFFFF" : "#CCCCCC" }}>{st.artistName}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Buff State Student Discount Checkbox */}
          <div
            style={{
              padding: "14px 16px",
              borderRadius: "10px",
              backgroundColor: isStudent ? "rgba(212, 175, 55, 0.14)" : "rgba(255, 255, 255, 0.03)",
              border: isStudent ? "1px solid #D4AF37" : "1px dashed rgba(212, 175, 55, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "24px",
              cursor: "pointer"
            }}
            onClick={() => setIsStudent(!isStudent)}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
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
                <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#FFFFFF" }}>
                  Buffalo State / Local College Student?
                </div>
                <div style={{ fontSize: "0.76rem", color: "#A0A0AA" }}>
                  Valid Student ID automatically deducts $20 off your custom tattoo session.
                </div>
              </div>
            </div>
            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "6px",
                border: isStudent ? "2px solid #D4AF37" : "1.5px solid rgba(255, 255, 255, 0.3)",
                backgroundColor: isStudent ? "#D4AF37" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0B0B0E"
              }}
            >
              {isStudent && <IconCheck size={16} />}
            </div>
          </div>

          {/* Summary / Result Box */}
          <div
            style={{
              padding: "20px",
              borderRadius: "12px",
              backgroundColor: "rgba(10, 10, 13, 0.8)",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              marginBottom: "20px"
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#8E8E98", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Estimated Investment
                </span>
                <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#D4AF37", fontFamily: "var(--font-serif, Georgia, serif)" }}>
                  {currentSizeObj.estPrice}
                  {isStudent && (
                    <span style={{ fontSize: "0.85rem", color: "#4ADE80", marginLeft: "10px", fontWeight: 500, fontFamily: "sans-serif" }}>
                      (includes -$20 Student Perk)
                    </span>
                  )}
                </div>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "#8E8E98", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Chair Time Estimate
                </span>
                <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#FFFFFF" }}>
                  {currentSizeObj.baseHours}
                </div>
              </div>
            </div>

            {matchedArtist && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  paddingTop: "14px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)"
                }}
              >
                <img
                  src={matchedArtist.portraitImage}
                  alt={matchedArtist.name}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #D4AF37"
                  }}
                />
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#D4AF37", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Recommended Specialist
                  </div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#FFFFFF" }}>
                    {matchedArtist.name} — <span style={{ color: "#A0A0AA", fontWeight: 400 }}>{matchedArtist.badge}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={handleBookingTrigger}
              style={{
                flex: 1,
                minWidth: "220px",
                padding: "14px 20px",
                borderRadius: "10px",
                backgroundColor: "#D4AF37",
                color: "#0B0B0E",
                fontSize: "0.95rem",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 4px 16px rgba(212, 175, 55, 0.35)",
                transition: "all 0.2s"
              }}
            >
              <span>Consult With {matchedArtist?.name || "Artist"}</span>
              <IconArrowRight size={18} />
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "14px 20px",
                borderRadius: "10px",
                backgroundColor: "transparent",
                color: "#A0A0AA",
                fontSize: "0.9rem",
                fontWeight: 500,
                border: "1px solid rgba(255, 255, 255, 0.12)",
                cursor: "pointer"
              }}
            >
              Close
            </button>
          </div>
          <div style={{ textAlign: "center", marginTop: "12px", fontSize: "0.75rem", color: "#6A6A74" }}>
            *Estimates are baseline guidelines. Exact quotes provided in-person based on complexity, skin elasticity, and session length.
          </div>
        </div>
      </div>
    </div>
  );
};
