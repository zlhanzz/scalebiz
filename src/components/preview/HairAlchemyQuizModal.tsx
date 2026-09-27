"use client";

import React, { useState } from "react";
import {
  IconMoon,
  IconSparkles,
  IconPalette,
  IconScissors,
  IconPotion,
  IconCrystal,
  IconCheck,
  IconX,
  IconCalendar,
} from "./MiaBellaIcons";

export interface HairAlchemyResultData {
  canvas: string;
  desiredStyle: string;
  hairLength: string;
  hairDensity: string;
  magickAddons: string[];
  estimatedHours: string;
  estimatedPrice: string;
}

interface HairAlchemyQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToBooking: (data: HairAlchemyResultData) => void;
}

export default function HairAlchemyQuizModal({
  isOpen,
  onClose,
  onProceedToBooking,
}: HairAlchemyQuizModalProps) {
  const [canvas, setCanvas] = useState<string>("virgin-natural");
  const [desiredStyle, setDesiredStyle] = useState<string>("electric-blue");
  const [hairLength, setHairLength] = useState<string>("shoulder");
  const [hairDensity, setHairDensity] = useState<string>("medium");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    "Moon-Charged Botanical Scalp Mask",
  ]);

  if (!isOpen) return null;

  const toggleAddon = (name: string) => {
    if (selectedAddons.includes(name)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== name));
    } else {
      setSelectedAddons([...selectedAddons, name]);
    }
  };

  // Dynamic formula calculation
  const calculateResult = () => {
    let basePriceMin = 180;
    let basePriceMax = 240;
    let hoursMin = 2.5;
    let hoursMax = 3.5;
    let liftNote = "Single-process blonding lift to Level 9 + direct pigment overlay.";

    if (desiredStyle === "electric-blue") {
      basePriceMin = 195;
      basePriceMax = 265;
      hoursMin = 3.0;
      hoursMax = 4.0;
      liftNote = "Precision double-process lightening to pale yellow + cobalt & sapphire dual glaze.";
    } else if (desiredStyle === "rainbow-peekaboo") {
      basePriceMin = 180;
      basePriceMax = 240;
      hoursMin = 2.5;
      hoursMax = 3.5;
      liftNote = "Sectioned underlight canvas + 6-holographic prism foil blocks under natural canopy.";
    } else if (desiredStyle === "full-fantasy") {
      basePriceMin = 240;
      basePriceMax = 340;
      hoursMin = 4.0;
      hoursMax = 5.5;
      liftNote = "Global scalp lightening + multi-dimensional creative color placement & bond fusion.";
    } else if (desiredStyle === "platinum-ice") {
      basePriceMin = 210;
      basePriceMax = 285;
      hoursMin = 3.5;
      hoursMax = 4.5;
      liftNote = "Ultra-fine foilayage + violet pearl neutralization & acidic conditioning glaze.";
    } else if (desiredStyle === "balayage") {
      basePriceMin = 185;
      basePriceMax = 245;
      hoursMin = 2.5;
      hoursMax = 3.5;
      liftNote = "Hand-painted dimensional clay balayage + melted shadow root for 4-to-6 month wear.";
    } else if (desiredStyle === "cut-pinup") {
      basePriceMin = 55;
      basePriceMax = 75;
      hoursMin = 1.0;
      hoursMax = 1.25;
      liftNote = "Sculptural shear cut + tension scalp therapy + retro velvet bouncy blowout.";
    }

    // Canvas Modifier
    if (canvas === "dark-box-dye") {
      basePriceMin += 45;
      basePriceMax += 75;
      hoursMin += 1.0;
      hoursMax += 1.5;
      liftNote += " (Includes clarifying pigment extraction & restorative bond builder).";
    }

    // Length Modifier
    if (hairLength === "mid-back") {
      basePriceMin += 25;
      basePriceMax += 35;
      hoursMin += 0.5;
      hoursMax += 0.5;
    } else if (hairLength === "waist-long") {
      basePriceMin += 45;
      basePriceMax += 65;
      hoursMin += 0.75;
      hoursMax += 1.0;
    }

    // Density Modifier
    if (hairDensity === "thick-coarse") {
      basePriceMin += 30;
      basePriceMax += 45;
      hoursMin += 0.5;
      hoursMax += 0.75;
    }

    // Addons
    const addonPrice = selectedAddons.length * 25;
    basePriceMin += addonPrice;
    basePriceMax += addonPrice;

    return {
      estimatedHours: `${hoursMin.toFixed(1)} – ${hoursMax.toFixed(1)} Hours`,
      estimatedPrice: `$${basePriceMin} – $${basePriceMax}`,
      liftNote,
    };
  };

  const calc = calculateResult();

  const handleProceed = () => {
    onProceedToBooking({
      canvas,
      desiredStyle,
      hairLength,
      hairDensity,
      magickAddons: selectedAddons,
      estimatedHours: calc.estimatedHours,
      estimatedPrice: calc.estimatedPrice,
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(10, 6, 14, 0.82)",
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
          maxWidth: "760px",
          maxHeight: "92vh",
          overflowY: "auto",
          border: "1.5px solid rgba(212, 175, 55, 0.35)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(212, 175, 55, 0.12)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          animation: "mbFadeIn 0.22s ease-out",
        }}
      >
        <style>{`
          @keyframes mbFadeIn {
            from { opacity: 0; transform: scale(0.97) translateY(8px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          .mb-pill-btn {
            cursor: pointer;
            padding: 12px 14px;
            border-radius: 12px;
            font-size: 13px;
            font-weight: 600;
            border: 1.5px solid rgba(255, 255, 255, 0.12);
            background: rgba(255, 255, 255, 0.04);
            color: #E6E1D8;
            transition: all 0.18s ease;
            text-align: left;
          }
          .mb-pill-btn:hover {
            border-color: #D4AF37;
            background: rgba(212, 175, 55, 0.08);
          }
          .mb-pill-btn.active {
            border-color: #D4AF37;
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.22), rgba(212, 175, 55, 0.08));
            color: #FFF9E6;
            box-shadow: 0 0 16px rgba(212, 175, 55, 0.2);
          }
        `}</style>

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
              <IconMoon size={22} color="#E6C875" />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "1.2px",
                    color: "#D4AF37",
                    textTransform: "uppercase",
                  }}
                >
                  Interactive Color Wizard
                </span>
                <span
                  style={{
                    backgroundColor: "rgba(162, 123, 155, 0.25)",
                    color: "#D8B4D4",
                    fontSize: "10.5px",
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: "99px",
                    border: "1px solid rgba(162, 123, 155, 0.4)",
                  }}
                >
                  Lockport Salon Chair
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "19px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  margin: "2px 0 0",
                  letterSpacing: "0.3px",
                }}
              >
                Hair Alchemy &amp; Transformation Calculator
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

        {/* MODAL BODY */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "22px" }}>
          {/* STEP 1: Current Hair Canvas */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 700,
                color: "#E6C875",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                marginBottom: "10px",
              }}
            >
              1. What is your current starting hair canvas?
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "10px" }}>
              {[
                { id: "virgin-natural", label: "Virgin Natural Hair", desc: "Never colored or bleached" },
                { id: "light-brown-blonde", label: "Light Brown / Blonde", desc: "Naturally light or sun-kissed" },
                { id: "dark-box-dye", label: "Dark / Box Dyed", desc: "Has past permanent pigment" },
                { id: "previously-bleached", label: "Previously Lightened", desc: "Already lifted blonde/balayage" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCanvas(item.id)}
                  className={`mb-pill-btn ${canvas === item.id ? "active" : ""}`}
                >
                  <div style={{ fontWeight: 700, color: "#FFFFFF", marginBottom: "2px" }}>{item.label}</div>
                  <div style={{ fontSize: "11px", color: "#A89F91" }}>{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 2: Desired Transformation */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 700,
                color: "#E6C875",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                marginBottom: "10px",
              }}
            >
              2. Choose your dream hair alchemy transformation:
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "10px" }}>
              {[
                {
                  id: "electric-blue",
                  name: "Electric Blue & Cobalt Jewels",
                  desc: "Signature high-impact vivid blue with sapphire roots",
                  from: "$195+",
                },
                {
                  id: "rainbow-peekaboo",
                  name: "Holographic Prism Peekaboo",
                  desc: "Concealed 6-color prism burst under natural hair",
                  from: "$180+",
                },
                {
                  id: "full-fantasy",
                  name: "Full-Head Vivid Alchemy",
                  desc: "Complete head-turning cosmic fantasy color blend",
                  from: "$240+",
                },
                {
                  id: "platinum-ice",
                  name: "Moonlit Platinum Foilayage",
                  desc: "Ultra-clean icy blonde with zero yellow tones",
                  from: "$210+",
                },
                {
                  id: "balayage",
                  name: "Lived-In Dimensional Balayage",
                  desc: "Soft melted ribbons of honey, caramel or gold",
                  from: "$185+",
                },
                {
                  id: "cut-pinup",
                  name: "Sculptural Cut & Velvet Curls",
                  desc: "Tailored shear shape + bouncy vintage glam waves",
                  from: "$55",
                },
              ].map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setDesiredStyle(style.id)}
                  className={`mb-pill-btn ${desiredStyle === style.id ? "active" : ""}`}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                    <strong style={{ color: "#FFFFFF", fontSize: "13.5px" }}>{style.name}</strong>
                    <span style={{ fontSize: "12px", color: "#D4AF37", fontWeight: 800 }}>{style.from}</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#A89F91" }}>{style.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 3: Length & Density */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#E6C875", marginBottom: "8px", textTransform: "uppercase" }}>
                Current Hair Length:
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {[
                  { id: "short-bob", label: "Pixie / Bob" },
                  { id: "shoulder", label: "Shoulder Length" },
                  { id: "mid-back", label: "Mid-Back" },
                  { id: "waist-long", label: "Waist Length / Long" },
                ].map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setHairLength(l.id)}
                    className={`mb-pill-btn ${hairLength === l.id ? "active" : ""}`}
                    style={{ textAlign: "center", padding: "10px" }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#E6C875", marginBottom: "8px", textTransform: "uppercase" }}>
                Hair Density / Thickness:
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {[
                  { id: "fine", label: "Fine / Delicate" },
                  { id: "medium", label: "Medium / Average" },
                  { id: "thick-coarse", label: "Thick / Coarse" },
                  { id: "ultra-dense", label: "Ultra Dense Volume" },
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setHairDensity(d.id)}
                    className={`mb-pill-btn ${hairDensity === d.id ? "active" : ""}`}
                    style={{ textAlign: "center", padding: "10px" }}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* STEP 4: Metaphysical Boutique Ritual Add-Ons */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "12.5px",
                fontWeight: 700,
                color: "#E6C875",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                marginBottom: "8px",
              }}
            >
              Sacred Magick Boutique Add-On Rituals (Optional):
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "10px" }}>
              {[
                { name: "Moon-Charged Botanical Scalp Mask", price: "+$25", desc: "Infused with organic lavender, argan & moon essence" },
                { name: "Amethyst Meridian Scalp Release", price: "+$20", desc: "Tension clearing with hand-carved crystal comb" },
                { name: "Intuitive Tarot & Aura Hair Consultation", price: "+$15", desc: "Aura color reading before mixing your custom formula" },
              ].map((addon) => {
                const isSelected = selectedAddons.includes(addon.name);
                return (
                  <button
                    key={addon.name}
                    type="button"
                    onClick={() => toggleAddon(addon.name)}
                    style={{
                      cursor: "pointer",
                      padding: "12px",
                      borderRadius: "12px",
                      border: isSelected ? "1.5px solid #D4AF37" : "1px solid rgba(255, 255, 255, 0.12)",
                      backgroundColor: isSelected ? "rgba(212, 175, 55, 0.12)" : "rgba(255, 255, 255, 0.03)",
                      color: "#FFFFFF",
                      textAlign: "left",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <strong style={{ fontSize: "12.5px", color: isSelected ? "#FFF9E6" : "#E2DDD3" }}>{addon.name}</strong>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#D4AF37" }}>{addon.price}</span>
                    </div>
                    <div style={{ fontSize: "11px", color: "#A89F91" }}>{addon.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC CALCULATION BREAKDOWN BOX */}
          <div
            style={{
              backgroundColor: "rgba(212, 175, 55, 0.08)",
              border: "1.5px solid #D4AF37",
              borderRadius: "16px",
              padding: "20px 22px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "14px" }}>
              <div>
                <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "1px", color: "#D4AF37", textTransform: "uppercase" }}>
                  Estimated Hair Investment
                </span>
                <div style={{ fontSize: "28px", fontWeight: 800, color: "#FFFFFF", fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {calc.estimatedPrice}
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "1px", color: "#A27B9B", textTransform: "uppercase" }}>
                  Estimated Chair Time
                </span>
                <div style={{ fontSize: "20px", fontWeight: 700, color: "#E6C875" }}>
                  {calc.estimatedHours}
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                borderRadius: "10px",
                padding: "10px 14px",
                fontSize: "12px",
                color: "#C5BEB2",
                lineHeight: 1.5,
                borderLeft: "3px solid #D4AF37",
                marginBottom: "16px",
              }}
            >
              <strong style={{ color: "#FFF9E6" }}>Formulation Chemistry Note: </strong>
              {calc.liftNote}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  backgroundColor: "transparent",
                  color: "#B8B0A2",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  padding: "12px 18px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Close Calculator
              </button>

              <button
                type="button"
                onClick={handleProceed}
                style={{
                  backgroundColor: "#D4AF37",
                  backgroundImage: "linear-gradient(135deg, #E5C378, #C49826)",
                  color: "#0F0B15",
                  border: "none",
                  padding: "13px 26px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 6px 20px rgba(212, 175, 55, 0.35)",
                }}
              >
                <IconCalendar size={17} color="#0F0B15" />
                <span>Proceed to Book This Hair Ritual &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
