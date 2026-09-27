"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { FlashDesign } from "@/data/luckyLeafData";
import {
  IconClose,
  IconSparkles,
  IconRuler,
  IconGinkgo,
  IconTag,
  IconShieldCheck
} from "./LuckyLeafIcons";

interface FlashModalProps {
  design: FlashDesign | null;
  isOpen: boolean;
  onClose: () => void;
  onClaim: (design: FlashDesign) => void;
}

export const LuckyLeafFlashModal: React.FC<FlashModalProps> = ({
  design,
  isOpen,
  onClose,
  onClaim
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !design) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="flash-modal-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        backgroundColor: "rgba(28, 27, 26, 0.72)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)"
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "600px",
          maxHeight: "90vh",
          backgroundColor: "#FBF9F5",
          borderRadius: "16px",
          border: "1px solid rgba(80, 101, 83, 0.2)",
          boxShadow: "0 24px 48px -12px rgba(28, 27, 26, 0.35)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid rgba(80, 101, 83, 0.12)",
            backgroundColor: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#506553",
                backgroundColor: "rgba(80, 101, 83, 0.1)",
                padding: "3px 8px",
                borderRadius: "12px"
              }}
            >
              1-of-1 Original Art
            </span>
            <span style={{ fontSize: "12px", color: "#8C867A" }}>
              Tattooed only once
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              color: "#6B6760",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <IconClose size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div
          style={{
            padding: "20px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "18px"
          }}
        >
          {/* Flash Artwork View */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "320px",
              borderRadius: "12px",
              overflow: "hidden",
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(80, 101, 83, 0.15)",
              boxShadow: "inset 0 0 20px rgba(0,0,0,0.03)"
            }}
          >
            <Image
              src={design.image}
              alt={design.title}
              fill
              sizes="(max-width: 600px) 100vw, 600px"
              style={{ objectFit: "contain", padding: "12px" }}
              priority
            />
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "1px solid rgba(80, 101, 83, 0.2)",
                borderRadius: "20px",
                padding: "4px 10px",
                fontSize: "11px",
                fontWeight: 600,
                color: "#506553",
                display: "flex",
                alignItems: "center",
                gap: "4px"
              }}
            >
              <IconTag size={12} />
              <span>{design.category}</span>
            </div>
          </div>

          {/* Details */}
          <div>
            <h2
              id="flash-modal-title"
              style={{
                margin: "0 0 8px 0",
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "22px",
                fontWeight: 600,
                color: "#1C1B1A"
              }}
            >
              {design.title}
            </h2>
            <p
              style={{
                margin: "0 0 16px 0",
                fontSize: "13px",
                color: "#54504A",
                lineHeight: "1.6"
              }}
            >
              {design.description}
            </p>

            {/* Spec Matrix */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                padding: "14px",
                backgroundColor: "#FFFFFF",
                borderRadius: "10px",
                border: "1px solid rgba(80, 101, 83, 0.12)"
              }}
            >
              <div>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "11px",
                    color: "#8C867A",
                    marginBottom: "2px"
                  }}
                >
                  <IconRuler size={13} />
                  <span>Minimum Scale</span>
                </span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#1C1B1A" }}>
                  {design.minSize}
                </span>
              </div>

              <div>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "11px",
                    color: "#8C867A",
                    marginBottom: "2px"
                  }}
                >
                  <IconGinkgo size={13} />
                  <span>Best Placement</span>
                </span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#1C1B1A" }}>
                  {design.recommendedPlacement}
                </span>
              </div>
            </div>

            {/* Exclusive Policy Note */}
            <div
              style={{
                marginTop: "12px",
                display: "flex",
                gap: "8px",
                alignItems: "center",
                fontSize: "11px",
                color: "#506553"
              }}
            >
              <IconShieldCheck size={16} />
              <span>
                <strong>1-of-1 Guarantee:</strong> Once booked, this artwork is permanently retired and will never be tattooed on anyone else.
              </span>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div
          style={{
            padding: "16px 20px",
            backgroundColor: "#FFFFFF",
            borderTop: "1px solid rgba(80, 101, 83, 0.12)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px"
          }}
        >
          <div style={{ fontSize: "12px", color: "#6B6760" }}>
            Available for next month
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onClaim(design);
            }}
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              backgroundColor: "#506553",
              color: "#FFFFFF",
              fontWeight: 600,
              fontSize: "13px",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 12px rgba(80, 101, 83, 0.25)",
              transition: "transform 0.15s ease"
            }}
          >
            <IconSparkles size={16} color="#FFF" />
            <span>Claim This 1-of-1 Piece</span>
          </button>
        </div>
      </div>
    </div>
  );
};
