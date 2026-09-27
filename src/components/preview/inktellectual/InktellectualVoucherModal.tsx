"use client";

import React, { useState } from "react";
import { INKTELLECTUAL_DATA } from "@/data/inktellectualData";
import {
  IconGraduationCap,
  IconClose,
  IconCheck,
  IconSparkles,
  IconMapPin,
  IconPhone
} from "./InktellectualIcons";

interface InktellectualVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
}

export const InktellectualVoucherModal: React.FC<InktellectualVoucherModalProps> = ({
  isOpen,
  onClose,
  onBookNow
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const voucherCode = "BUFFSTATE20";

  const handleCopy = () => {
    navigator.clipboard.writeText(voucherCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "rgba(5, 5, 7, 0.88)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px"
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          backgroundColor: "#111114",
          border: "1.5px solid #D4AF37",
          borderRadius: "16px",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.95), 0 0 45px rgba(212, 175, 55, 0.2)",
          color: "#E6E6E8",
          overflow: "hidden",
          position: "relative",
          animation: "fadeInUp 0.25s ease-out"
        }}
      >
        {/* Gold Accent Top Bar */}
        <div style={{ height: "4px", background: "linear-gradient(90deg, #997B28 0%, #F5D77F 50%, #997B28 100%)" }} />

        {/* Header */}
        <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
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
                color: "#D4AF37"
              }}
            >
              <IconGraduationCap size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontFamily: "var(--font-serif, Georgia, serif)", color: "#FFFFFF" }}>
                Buffalo State Student Perk
              </h3>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "#D4AF37", fontWeight: 600, letterSpacing: "0.05em" }}>
                OFFICIAL CAMPUS NEIGHBOR VOUCHER
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
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
              justifyContent: "center"
            }}
          >
            <IconClose size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px", textAlign: "center" }}>
          {/* Discount Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 14px",
              borderRadius: "20px",
              backgroundColor: "rgba(212, 175, 55, 0.15)",
              border: "1px solid #D4AF37",
              color: "#D4AF37",
              fontSize: "0.78rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "12px"
            }}
          >
            <IconSparkles size={14} />
            <span>$20 OFF Next Tattoo Session</span>
          </div>

          <h4 style={{ margin: "0 0 10px", fontSize: "1.45rem", color: "#FFFFFF", fontFamily: "var(--font-serif, Georgia, serif)" }}>
            Welcome, Buff State Bengals!
          </h4>
          <p style={{ margin: "0 0 20px", fontSize: "0.85rem", color: "#A0A0AA", lineHeight: 1.5 }}>
            Located right down the road at <strong style={{ color: "#FFF" }}>408 Amherst Street</strong> (3 minutes from campus). Flash your student ID at counter checkout or lock in your appointment online.
          </p>

          {/* Pass Card with Code */}
          <div
            style={{
              padding: "16px",
              borderRadius: "12px",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              border: "1.5px dashed rgba(212, 175, 55, 0.6)",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px"
            }}
          >
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "0.72rem", color: "#8E8E98", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Promo Voucher Pass
              </div>
              <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#D4AF37", letterSpacing: "0.1em" }}>
                {voucherCode}
              </div>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              style={{
                padding: "8px 14px",
                borderRadius: "8px",
                backgroundColor: copied ? "#22C55E" : "rgba(212, 175, 55, 0.2)",
                color: copied ? "#000" : "#D4AF37",
                border: "1px solid #D4AF37",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {copied ? "Copied!" : "Copy Code"}
            </button>
          </div>

          <div style={{ fontSize: "0.78rem", color: "#777782", marginBottom: "22px", textAlign: "left", lineHeight: 1.4 }}>
            • Valid on all custom tattoo sessions & flash pieces ($80 minimum spend).
            <br />
            • One discount per client per session. Must present physical/digital university ID.
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => {
                onClose();
                onBookNow();
              }}
              style={{
                flex: 1,
                padding: "13px 20px",
                borderRadius: "10px",
                backgroundColor: "#D4AF37",
                color: "#0B0B0E",
                fontSize: "0.95rem",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(212, 175, 55, 0.35)"
              }}
            >
              Book with $20 Off Now
            </button>
            <a
              href={`tel:${INKTELLECTUAL_DATA.cleanPhone}`}
              style={{
                padding: "13px 18px",
                borderRadius: "10px",
                backgroundColor: "transparent",
                color: "#D4AF37",
                border: "1px solid rgba(212, 175, 55, 0.4)",
                fontSize: "0.9rem",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <IconPhone size={16} />
              <span>Call Studio</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
