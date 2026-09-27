"use client";

import React, { useState } from "react";
import { MIA_BELLA_DATA, BoutiqueItem } from "@/data/miaBellaData";
import {
  IconMoon,
  IconCrystal,
  IconPotion,
  IconFlame,
  IconAura,
  IconCheck,
  IconX,
  IconShoppingBag,
} from "./MiaBellaIcons";

interface MagickBoutiqueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookWithProduct?: (productName: string) => void;
}

export default function MagickBoutiqueModal({
  isOpen,
  onClose,
  onBookWithProduct,
}: MagickBoutiqueModalProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [reservedItem, setReservedItem] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredItems = MIA_BELLA_DATA.boutique.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  const handleReserve = (item: BoutiqueItem) => {
    setReservedItem(item.name);
    setTimeout(() => {
      setReservedItem(null);
      if (onBookWithProduct) {
        onBookWithProduct(item.name);
      }
    }, 1200);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(10, 6, 14, 0.85)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        overflowY: "auto",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          backgroundColor: "#16101E",
          color: "#F5F2EB",
          borderRadius: "22px",
          width: "100%",
          maxWidth: "800px",
          maxHeight: "92vh",
          overflowY: "auto",
          border: "1.5px solid rgba(212, 175, 55, 0.35)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.65), 0 0 35px rgba(212, 175, 55, 0.15)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          animation: "mbFadeIn 0.22s ease-out",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            backgroundColor: "#0F0B15",
            padding: "20px 24px",
            borderTopLeftRadius: "21px",
            borderTopRightRadius: "21px",
            borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                backgroundColor: "rgba(212, 175, 55, 0.15)",
                border: "1px solid rgba(212, 175, 55, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#E6C875",
              }}
            >
              <IconCrystal size={22} color="#E6C875" />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "1.2px", color: "#D4AF37", textTransform: "uppercase" }}>
                  In-House Apothecary
                </span>
                <span style={{ backgroundColor: "rgba(212, 175, 55, 0.15)", color: "#E6C875", fontSize: "10.5px", fontWeight: 700, padding: "2px 8px", borderRadius: "99px" }}>
                  Moon-Charged In Lockport, NY
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "19px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  margin: "2px 0 0",
                }}
              >
                The Magick Boutique &amp; Apothecary Showcase
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "none",
              color: "#C5BDB0",
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <IconX size={18} color="#C5BDB0" />
          </button>
        </div>

        {/* CATEGORY FILTER BUTTONS */}
        <div
          style={{
            padding: "16px 24px",
            backgroundColor: "rgba(15, 11, 21, 0.5)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          {[
            { id: "all", label: "All Offerings" },
            { id: "oils", label: "Hair Elixirs & Oils" },
            { id: "crystals", label: "Crystal Scalp Tools" },
            { id: "candles", label: "Intention Candles" },
            { id: "ritual", label: "Aura Mists & Rituals" },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              style={{
                cursor: "pointer",
                padding: "8px 14px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 700,
                border: activeCategory === cat.id ? "1px solid #D4AF37" : "1px solid rgba(255, 255, 255, 0.12)",
                backgroundColor: activeCategory === cat.id ? "rgba(212, 175, 55, 0.15)" : "transparent",
                color: activeCategory === cat.id ? "#FFF9E6" : "#B8B0A2",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* PRODUCTS GRID */}
        <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          {filteredItems.map((item) => {
            const isJustReserved = reservedItem === item.name;
            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: "rgba(15, 11, 21, 0.65)",
                  border: "1.5px solid rgba(212, 175, 55, 0.25)",
                  borderRadius: "16px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <span
                      style={{
                        backgroundColor: "rgba(212, 175, 55, 0.15)",
                        color: "#E6C875",
                        fontSize: "10px",
                        fontWeight: 800,
                        letterSpacing: "0.5px",
                        padding: "3px 8px",
                        borderRadius: "99px",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.badge}
                    </span>
                    <strong style={{ fontSize: "18px", color: "#D4AF37", fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {item.price}
                    </strong>
                  </div>

                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#FFFFFF", margin: "0 0 8px", fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {item.name}
                  </h3>

                  <p style={{ fontSize: "12.5px", color: "#C5BDB0", lineHeight: 1.5, margin: "0 0 14px" }}>
                    {item.description}
                  </p>

                  <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "10px", marginBottom: "16px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#8E8679", textTransform: "uppercase", display: "block", marginBottom: "2px" }}>
                      Sacred Materials / Botanicals:
                    </span>
                    <div style={{ fontSize: "11px", color: "#A89F91", fontStyle: "italic", lineHeight: 1.4 }}>
                      {item.ingredientsOrMaterials}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleReserve(item)}
                  style={{
                    backgroundColor: isJustReserved ? "#2E7D32" : "rgba(212, 175, 55, 0.15)",
                    color: isJustReserved ? "#FFFFFF" : "#E6C875",
                    border: isJustReserved ? "1px solid #4CAF50" : "1px solid #D4AF37",
                    padding: "10px 16px",
                    borderRadius: "10px",
                    fontSize: "12.5px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    transition: "all 0.18s ease",
                  }}
                >
                  {isJustReserved ? (
                    <>
                      <IconCheck size={16} color="#FFFFFF" />
                      <span>Added to Reservation!</span>
                    </>
                  ) : (
                    <>
                      <IconShoppingBag size={15} color="#E6C875" />
                      <span>Reserve for Salon Visit Pickup</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* BOTTOM NOTE */}
        <div
          style={{
            padding: "16px 24px",
            backgroundColor: "rgba(10, 6, 14, 0.8)",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            fontSize: "12px",
            color: "#8E8679",
            textAlign: "center",
          }}
        >
          All items are also available for direct in-person purchase during regular salon walk-in hours on Davison Rd, Lockport, NY.
        </div>
      </div>
    </div>
  );
}
