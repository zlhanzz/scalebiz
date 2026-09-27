"use client";

import React, { useState } from "react";
import { TOTAL_FENCE_DATA, FenceMaterialOption } from "@/data/totalFenceData";
import {
  IconClose,
  IconCalculator,
  IconCheck,
  IconArrowRight,
  IconGate,
  IconFrost,
  IconUsers
} from "./FenceIcons";

export interface EstimateSpecs {
  materialId: string;
  materialName: string;
  linearFeet: number;
  height: string;
  walkGates: number;
  driveGates: number;
  tearOutOldFence: boolean;
  neighborDiscountApplied: boolean;
  minCost: number;
  maxCost: number;
  estimatedDays: string;
}

interface FenceCostEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToBooking: (specs: EstimateSpecs) => void;
  initialMaterialId?: string;
}

export default function FenceCostEstimatorModal({
  isOpen,
  onClose,
  onProceedToBooking,
  initialMaterialId = "vinyl-privacy"
}: FenceCostEstimatorModalProps) {
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>(initialMaterialId);
  const [linearFeet, setLinearFeet] = useState<number>(180);
  const [height, setHeight] = useState<string>("6 ft");
  const [walkGates, setWalkGates] = useState<number>(1);
  const [driveGates, setDriveGates] = useState<number>(0);
  const [tearOutOldFence, setTearOutOldFence] = useState<boolean>(false);
  const [neighborDiscount, setNeighborDiscount] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentMaterial =
    TOTAL_FENCE_DATA.materials.find(m => m.id === selectedMaterialId) ||
    TOTAL_FENCE_DATA.materials[0];

  // Calculation Logic
  // Height multiplier: 4ft = 0.9, 5ft = 1.0, 6ft = 1.15
  const heightMultiplier = height === "4 ft" ? 0.9 : height === "5 ft" ? 1.0 : 1.15;

  const baseMinFoot = currentMaterial.pricePerFoot.min * heightMultiplier;
  const baseMaxFoot = currentMaterial.pricePerFoot.max * heightMultiplier;

  let footageMin = linearFeet * baseMinFoot;
  let footageMax = linearFeet * baseMaxFoot;

  // Gate costs: Walk gate $350-$450, Drive gate $850-$1,100
  const gatesCost = walkGates * 380 + driveGates * 950;

  // Tear out cost: $7-$9/linear ft
  const tearOutCost = tearOutOldFence ? linearFeet * 8 : 0;

  let totalMin = Math.round(footageMin + gatesCost + tearOutCost);
  let totalMax = Math.round(footageMax + gatesCost + tearOutCost * 1.1);

  // Apply Neighbor Co-Op Discount (10%)
  if (neighborDiscount) {
    totalMin = Math.round(totalMin * 0.9);
    totalMax = Math.round(totalMax * 0.9);
  }

  // Estimated install duration
  const estimatedDays = linearFeet <= 120 ? "1 - 2 Days" : linearFeet <= 240 ? "2 - 3 Days" : "3 - 4 Days";

  const handleProceed = () => {
    const specs: EstimateSpecs = {
      materialId: currentMaterial.id,
      materialName: currentMaterial.name,
      linearFeet,
      height,
      walkGates,
      driveGates,
      tearOutOldFence,
      neighborDiscountApplied: neighborDiscount,
      minCost: totalMin,
      maxCost: totalMax,
      estimatedDays
    };
    onProceedToBooking(specs);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(13, 23, 42, 0.82)",
        backdropFilter: "blur(6px)",
        padding: "16px"
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          color: "#0F172A",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "820px",
          maxHeight: "92vh",
          overflowY: "auto",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
          border: "1px solid #CBD5E1",
          position: "relative"
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#0D3594",
            padding: "20px 24px",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#FFFFFF"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                backgroundColor: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              <IconCalculator size={22} color="#FFFFFF" />
            </div>
            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0, letterSpacing: "-0.01em" }}>
                Interactive Fence Cost & Footage Estimator
              </h2>
              <p style={{ fontSize: "0.85rem", margin: 0, color: "#BFDBFE" }}>
                Expect Quality Fences For Your Dollar • WNY Standard 42&quot; Frost-Line Posts Included
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#FFFFFF",
              cursor: "pointer",
              padding: "4px"
            }}
            aria-label="Close modal"
          >
            <IconClose size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "24px" }}>
          {/* Step 1: Material Selection */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontWeight: 700, fontSize: "0.95rem", marginBottom: "10px" }}>
              1. Choose Fence Material & Construction Style
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                gap: "10px"
              }}
            >
              {TOTAL_FENCE_DATA.materials.map(mat => {
                const isSelected = mat.id === selectedMaterialId;
                return (
                  <button
                    key={mat.id}
                    onClick={() => setSelectedMaterialId(mat.id)}
                    type="button"
                    style={{
                      textAlign: "left",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: isSelected ? "2px solid #0D3594" : "1px solid #E2E8F0",
                      backgroundColor: isSelected ? "#EFF6FF" : "#F8FAFC",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: 700, fontSize: "0.9rem", color: isSelected ? "#0D3594" : "#1E293B" }}>
                        {mat.shortName}
                      </span>
                      {isSelected && <IconCheck size={16} color="#0D3594" />}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "4px" }}>
                      ${mat.pricePerFoot.min} - ${mat.pricePerFoot.max} / linear ft
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Linear Footage Slider */}
          <div
            style={{
              backgroundColor: "#F8FAFC",
              padding: "18px 20px",
              borderRadius: "12px",
              border: "1px solid #E2E8F0",
              marginBottom: "24px"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <label style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                2. Total Estimated Linear Footage:
              </label>
              <div
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "#0D3594",
                  backgroundColor: "#DBEAFE",
                  padding: "4px 12px",
                  borderRadius: "8px"
                }}
              >
                {linearFeet} <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Linear Feet</span>
              </div>
            </div>

            <input
              type="range"
              min="50"
              max="400"
              step="5"
              value={linearFeet}
              onChange={e => setLinearFeet(parseInt(e.target.value, 10))}
              style={{
                width: "100%",
                height: "8px",
                accentColor: "#0D3594",
                cursor: "pointer",
                margin: "12px 0"
              }}
            />

            {/* Lot Presets */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
              <span style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 600 }}>Yard Presets:</span>
              {[
                { label: "Small Townhome (100 ft)", ft: 100 },
                { label: "Standard Suburban Yard (180 ft)", ft: 180 },
                { label: "Large Corner Lot (260 ft)", ft: 260 },
                { label: "1/2 Acre Perimeter (360 ft)", ft: 360 }
              ].map(preset => (
                <button
                  key={preset.ft}
                  type="button"
                  onClick={() => setLinearFeet(preset.ft)}
                  style={{
                    fontSize: "0.75rem",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    backgroundColor: linearFeet === preset.ft ? "#0D3594" : "#FFFFFF",
                    color: linearFeet === preset.ft ? "#FFFFFF" : "#334155",
                    border: "1px solid #CBD5E1",
                    cursor: "pointer"
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Height & Gates Options */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
              marginBottom: "24px"
            }}
          >
            {/* Height Selector */}
            <div style={{ border: "1px solid #E2E8F0", padding: "14px", borderRadius: "10px" }}>
              <label style={{ display: "block", fontWeight: 700, fontSize: "0.85rem", marginBottom: "8px" }}>
                Fence Height:
              </label>
              <div style={{ display: "flex", gap: "6px" }}>
                {["4 ft", "5 ft", "6 ft"].map(h => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setHeight(h)}
                    style={{
                      flex: 1,
                      padding: "8px 0",
                      borderRadius: "6px",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      backgroundColor: height === h ? "#0D3594" : "#F1F5F9",
                      color: height === h ? "#FFFFFF" : "#334155",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            {/* Single Walk Gates */}
            <div style={{ border: "1px solid #E2E8F0", padding: "14px", borderRadius: "10px" }}>
              <label style={{ display: "block", fontWeight: 700, fontSize: "0.85rem", marginBottom: "8px" }}>
                4ft Single Walk Gates:
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {[0, 1, 2, 3].map(count => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setWalkGates(count)}
                    style={{
                      flex: 1,
                      padding: "8px 0",
                      borderRadius: "6px",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      backgroundColor: walkGates === count ? "#0D3594" : "#F1F5F9",
                      color: walkGates === count ? "#FFFFFF" : "#334155",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            {/* Double Drive Gates */}
            <div style={{ border: "1px solid #E2E8F0", padding: "14px", borderRadius: "10px" }}>
              <label style={{ display: "block", fontWeight: 700, fontSize: "0.85rem", marginBottom: "8px" }}>
                10ft Double Drive Gates:
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {[0, 1, 2].map(count => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setDriveGates(count)}
                    style={{
                      flex: 1,
                      padding: "8px 0",
                      borderRadius: "6px",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      backgroundColor: driveGates === count ? "#0D3594" : "#F1F5F9",
                      color: driveGates === count ? "#FFFFFF" : "#334155",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Add-ons: Tear out & Good Neighbor */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 16px",
                backgroundColor: tearOutOldFence ? "#FEF3C7" : "#F8FAFC",
                border: tearOutOldFence ? "1px solid #F59E0B" : "1px solid #E2E8F0",
                borderRadius: "10px",
                cursor: "pointer"
              }}
            >
              <input
                type="checkbox"
                checked={tearOutOldFence}
                onChange={e => setTearOutOldFence(e.target.checked)}
                style={{ width: "18px", height: "18px", accentColor: "#D97706" }}
              />
              <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "#1E293B" }}>
                Include Old Fence Tear-Out & Environmental Haul-Away (+$8/ft)
              </span>
            </label>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 16px",
                backgroundColor: neighborDiscount ? "#ECFDF5" : "#F8FAFC",
                border: neighborDiscount ? "1px solid #10B981" : "1px solid #E2E8F0",
                borderRadius: "10px",
                cursor: "pointer"
              }}
            >
              <input
                type="checkbox"
                checked={neighborDiscount}
                onChange={e => setNeighborDiscount(e.target.checked)}
                style={{ width: "18px", height: "18px", accentColor: "#059669" }}
              />
              <div>
                <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#065F46" }}>
                  🎁 Apply &quot;Good Neighbor Multi-Yard Discount&quot; (Save 10% on Total Project)
                </span>
                <p style={{ margin: "2px 0 0 0", fontSize: "0.75rem", color: "#047857" }}>
                  Valid when 2 adjacent homeowners coordinate their fence installation in the same crew window.
                </p>
              </div>
            </label>
          </div>

          {/* Dynamic Estimate Summary Box */}
          <div
            style={{
              background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)",
              borderRadius: "14px",
              padding: "20px 24px",
              color: "#FFFFFF",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px"
            }}
          >
            <div>
              <div style={{ fontSize: "0.8rem", color: "#93C5FD", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Estimated Installed Project Investment:
              </div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#FFFFFF", marginTop: "4px" }}>
                ${totalMin.toLocaleString()} – ${totalMax.toLocaleString()}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#CBD5E1", display: "flex", gap: "12px", marginTop: "6px" }}>
                <span>⏱️ Crew On-Site: <strong>{estimatedDays}</strong></span>
                <span>❄️ Frost Depth: <strong>42&quot; Guaranteed</strong></span>
              </div>
            </div>

            <button
              onClick={handleProceed}
              type="button"
              style={{
                backgroundColor: "#2563EB",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "0.95rem",
                padding: "14px 22px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.4)",
                transition: "all 0.2s"
              }}
            >
              <span>Lock In Estimate & Request Laser Measure</span>
              <IconArrowRight size={18} />
            </button>
          </div>

          <p style={{ fontSize: "0.75rem", color: "#64748B", textAlign: "center", marginTop: "12px", margin: "12px 0 0 0" }}>
            *Estimates include full commercial materials, post hole drilling down to 42&quot;, concrete pour, and cleanup. Final firm quote verified via on-site laser measure.
          </p>
        </div>
      </div>
    </div>
  );
}
