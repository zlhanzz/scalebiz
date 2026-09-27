"use client";

import React, { useState } from "react";
import {
  IconGrass,
  IconSnow,
  IconRuler,
  IconCheck,
  IconClock,
  IconShieldCheck,
  IconX,
  IconHome,
  IconBuilding,
  IconCalendar,
  IconSparkles,
} from "./FHIcons";

export interface EstimatorResultData {
  season: "summer" | "winter";
  services: string[];
  lotSize: string;
  drivewayType: string;
  mulchVolume?: string;
  mulchColor?: string;
  frequency: string;
  estimatedRateString: string;
  breakdown: { label: string; amount: string }[];
}

interface PropertyEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  defaultSeason?: "summer" | "winter";
  onProceedToBooking: (data: EstimatorResultData) => void;
}

interface ServiceCalcItem {
  id: string;
  name: string;
  season: "summer" | "winter";
  description: string;
  rates: {
    small: number;
    standard: number;
    large: number;
    acreage: number;
  };
  unit: string;
}

const CALCULATOR_SERVICES: ServiceCalcItem[] = [
  // SUMMER
  {
    id: "mowing",
    name: "Lawn Mowing & Precision Striping",
    season: "summer",
    description: "Includes string trimming, perimeter line edging, and blower cleanup.",
    rates: { small: 38, standard: 48, large: 68, acreage: 95 },
    unit: "/ cut",
  },
  {
    id: "mulch",
    name: "Bed Edging & Triple-Shred Mulch",
    season: "summer",
    description: "3-inch deep trench spade edging + premium triple-shred mulch delivery & spreading.",
    rates: { small: 180, standard: 320, large: 540, acreage: 850 },
    unit: "project",
  },
  {
    id: "spring_clean",
    name: "Spring Property Cleanup & Dethatching",
    season: "summer",
    description: "Power-rake dethatching, branch removal, and garden bed blowout.",
    rates: { small: 160, standard: 240, large: 380, acreage: 550 },
    unit: "kickoff",
  },
  {
    id: "fall_clean",
    name: "Fall Leaf Cleanup & Curbside Vacuuming",
    season: "summer",
    description: "Full turf leaf pickup, perimeter vacuuming, and yard cleanup.",
    rates: { small: 170, standard: 260, large: 410, acreage: 600 },
    unit: "project",
  },
  {
    id: "shrub",
    name: "Shrub, Bush & Hedge Trimming",
    season: "summer",
    description: "Hand and mechanical shearing for ornamental shrubs with 100% haul away.",
    rates: { small: 110, standard: 180, large: 290, acreage: 420 },
    unit: "project",
  },

  // WINTER
  {
    id: "snow_pass",
    name: "Seasonal Driveway Snow Plowing Pass",
    season: "winter",
    description: "Unlimited snow clearing passes all winter guaranteed before 6:30 AM before work.",
    rates: { small: 350, standard: 420, large: 510, acreage: 680 },
    unit: "/ full season",
  },
  {
    id: "snow_per_storm",
    name: "Per-Storm On-Call Snow Plowing",
    season: "winter",
    description: "Cleared on-demand whenever snowfall exceeds 2 inches.",
    rates: { small: 40, standard: 50, large: 65, acreage: 95 },
    unit: "/ storm push",
  },
  {
    id: "salting",
    name: "Eco-Friendly Driveway De-Icing & Salting",
    season: "winter",
    description: "Treated rock salt & calcium chloride blend safe for concrete & pets.",
    rates: { small: 25, standard: 35, large: 50, acreage: 75 },
    unit: "/ application",
  },
  {
    id: "walkway",
    name: "Front Walkway & Porch Hand Shoveling",
    season: "winter",
    description: "Hand clearance of front stoops, entry steps, and path to mailbox.",
    rates: { small: 20, standard: 28, large: 38, acreage: 55 },
    unit: "/ storm",
  },
];

export default function PropertyEstimatorModal({
  isOpen,
  onClose,
  defaultService,
  defaultSeason = "summer",
  onProceedToBooking,
}: PropertyEstimatorModalProps) {
  const [season, setSeason] = useState<"summer" | "winter">(defaultSeason);
  const [selectedServices, setSelectedServices] = useState<string[]>(
    defaultService ? [defaultService] : ["Lawn Mowing & Precision Striping"]
  );
  const [propertyType, setPropertyType] = useState<"residential" | "commercial">("residential");
  const [lotSizeKey, setLotSizeKey] = useState<"small" | "standard" | "large" | "acreage">("standard");
  const [drivewayType, setDrivewayType] = useState<string>("Standard 2-Car Driveway");
  const [mulchVolume, setMulchVolume] = useState<string>("5 to 8 Yards (Standard Beds)");
  const [mulchColor, setMulchColor] = useState<string>("Dark Black Mulch");
  const [frequency, setFrequency] = useState<string>("Weekly Recurring Route");

  if (!isOpen) return null;

  const lotSizeLabels: Record<"small" | "standard" | "large" | "acreage", string> = {
    small: "Small / Townhome (< 1/4 Acre)",
    standard: "Standard Suburban (1/4 to 1/2 Acre)",
    large: "Large Yard (1/2 to 1 Acre)",
    acreage: "Acreage / Estate (1+ Acres)",
  };

  const toggleService = (srvName: string) => {
    if (selectedServices.includes(srvName)) {
      if (selectedServices.length === 1) return; // keep at least 1
      setSelectedServices(selectedServices.filter((s) => s !== srvName));
    } else {
      setSelectedServices([...selectedServices, srvName]);
    }
  };

  const currentAvailableServices = CALCULATOR_SERVICES.filter((s) => s.season === season);

  // Dynamic Calculation
  const calculateTotal = () => {
    let totalMin = 0;
    let totalMax = 0;
    const breakdown: { label: string; amount: string }[] = [];

    // Driveway surcharge for snow or mulch staging if large
    let drivewayFactor = 1.0;
    if (drivewayType === "Wide 4-Car Driveway") drivewayFactor = 1.15;
    else if (drivewayType === "Circular / Wrap-Around") drivewayFactor = 1.25;
    else if (drivewayType === "Long Rural Lane (> 100 ft)") drivewayFactor = 1.45;

    // Commercial factor
    const commercialFactor = propertyType === "commercial" ? 1.25 : 1.0;

    let isRecurring = false;
    let isSeasonalSnow = false;

    selectedServices.forEach((srvName) => {
      const item = CALCULATOR_SERVICES.find((s) => s.name === srvName);
      if (!item) return;

      let baseRate = item.rates[lotSizeKey];
      if (item.id === "snow_pass" || item.id === "snow_per_storm") {
        baseRate = Math.round(baseRate * drivewayFactor);
        if (item.id === "snow_pass") isSeasonalSnow = true;
      }
      baseRate = Math.round(baseRate * commercialFactor);

      if (item.id === "mowing") {
        isRecurring = true;
        breakdown.push({
          label: `${item.name} (${lotSizeLabels[lotSizeKey]})`,
          amount: `$${baseRate} – $${baseRate + 12} ${item.unit}`,
        });
        totalMin += baseRate;
        totalMax += baseRate + 12;
      } else if (item.id === "mulch") {
        let mulchCost = baseRate;
        if (mulchVolume.includes("11+")) mulchCost = Math.round(mulchCost * 1.5);
        breakdown.push({
          label: `${item.name} (${mulchVolume})`,
          amount: `$${mulchCost} – $${mulchCost + 65} project`,
        });
        totalMin += mulchCost;
        totalMax += mulchCost + 65;
      } else {
        breakdown.push({
          label: item.name,
          amount: `$${baseRate} – $${baseRate + 45} ${item.unit}`,
        });
        totalMin += baseRate;
        totalMax += baseRate + 45;
      }
    });

    // Multi-service bundle discount
    if (selectedServices.length >= 2) {
      const discount = Math.round(totalMin * 0.1);
      breakdown.push({
        label: "Multi-Service Neighborhood Bundle Savings (10%)",
        amount: `-$${discount}`,
      });
      totalMin = Math.max(25, totalMin - discount);
      totalMax = Math.max(35, totalMax - discount);
    }

    let rateString = "";
    if (isSeasonalSnow) {
      rateString = `$${totalMin} – $${totalMax} / Full Season Pass`;
    } else if (isRecurring) {
      rateString = `$${totalMin} – $${totalMax} / cut (Weekly)`;
    } else {
      rateString = `$${totalMin} – $${totalMax} (Estimated Project Total)`;
    }

    return { totalMin, totalMax, rateString, breakdown };
  };

  const { rateString, breakdown } = calculateTotal();

  const handleProceed = () => {
    onProceedToBooking({
      season,
      services: selectedServices,
      lotSize: lotSizeLabels[lotSizeKey],
      drivewayType,
      mulchVolume: selectedServices.some((s) => s.includes("Mulch")) ? mulchVolume : undefined,
      mulchColor: selectedServices.some((s) => s.includes("Mulch")) ? mulchColor : undefined,
      frequency,
      estimatedRateString: rateString,
      breakdown,
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(10, 20, 13, 0.78)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        zIndex: 9998,
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
          backgroundColor: "#FFFFFF",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "760px",
          maxHeight: "92vh",
          overflowY: "auto",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(30, 77, 43, 0.15)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          animation: "fhFadeIn 0.22s ease-out",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            backgroundColor: "#112015",
            color: "#FFFFFF",
            padding: "20px 24px",
            borderTopLeftRadius: "19px",
            borderTopRightRadius: "19px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <IconRuler size={22} color="#68BA7F" />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "1px", color: "#68BA7F", textTransform: "uppercase" }}>
                  Interactive Cost Calculator
                </span>
                <span style={{ backgroundColor: "#2A4633", color: "#B8E2C5", fontSize: "10px", padding: "2px 7px", borderRadius: "10px", fontWeight: 700 }}>
                  Niagara County Rates
                </span>
              </div>
              <h2 style={{ margin: "2px 0 0", fontSize: "19px", fontFamily: "Georgia, serif", fontWeight: 700 }}>
                FH Land Services Property Cost Estimator
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close estimator modal"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              border: "none",
              color: "#FFFFFF",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <IconX size={18} color="#FFFFFF" />
          </button>
        </div>

        {/* CALCULATOR BODY */}
        <div style={{ padding: "24px" }}>
          {/* Season Switcher */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <span style={{ fontSize: "13px", fontWeight: 800, color: "#112015" }}>1. Select Season &amp; Services:</span>
              <p style={{ margin: "2px 0 0", fontSize: "12.5px", color: "#5F7666" }}>
                Pick all services you need calculated for your property.
              </p>
            </div>

            <div
              style={{
                display: "inline-flex",
                backgroundColor: "#EBF3EE",
                padding: "3px",
                borderRadius: "10px",
                border: "1px solid #D5E4D9",
              }}
            >
              <button
                type="button"
                onClick={() => setSeason("summer")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                  backgroundColor: season === "summer" ? "#1E4D2B" : "transparent",
                  color: season === "summer" ? "#FFFFFF" : "#2E4735",
                  transition: "all 0.15s ease",
                }}
              >
                <IconGrass size={14} color={season === "summer" ? "#FFFFFF" : "#2E4735"} />
                <span>Summer Lawn</span>
              </button>
              <button
                type="button"
                onClick={() => setSeason("winter")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                  backgroundColor: season === "winter" ? "#1E4D2B" : "transparent",
                  color: season === "winter" ? "#FFFFFF" : "#2E4735",
                  transition: "all 0.15s ease",
                }}
              >
                <IconSnow size={14} color={season === "winter" ? "#FFFFFF" : "#2E4735"} />
                <span>Winter Snow</span>
              </button>
            </div>
          </div>

          {/* Services Checklist */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "9px", marginBottom: "22px" }}>
            {currentAvailableServices.map((srv) => {
              const isSelected = selectedServices.includes(srv.name);
              return (
                <div
                  key={srv.id}
                  onClick={() => toggleService(srv.name)}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    border: isSelected ? "2px solid #1E4D2B" : "1.5px solid #E2ECE5",
                    backgroundColor: isSelected ? "#EFF7F2" : "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "5px",
                        border: isSelected ? "2px solid #1E4D2B" : "2px solid #BACDC1",
                        backgroundColor: isSelected ? "#1E4D2B" : "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {isSelected && <IconCheck size={12} color="#FFFFFF" />}
                    </div>
                    <div>
                      <strong style={{ fontSize: "13.5px", color: "#112015", display: "block" }}>{srv.name}</strong>
                      <span style={{ fontSize: "11.5px", color: "#546E5C" }}>{srv.description}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#1E4D2B", backgroundColor: "#DDF1E3", padding: "2px 8px", borderRadius: "6px", whiteSpace: "nowrap" }}>
                    From ${srv.rates[lotSizeKey]} {srv.unit}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 2. Property & Dimensions Section */}
          <div style={{ backgroundColor: "#F7FAF8", padding: "16px", borderRadius: "14px", border: "1px solid #DCE6DF", marginBottom: "22px" }}>
            <span style={{ fontSize: "13px", fontWeight: 800, color: "#112015", display: "block", marginBottom: "12px" }}>
              2. Property Specifications (Cost Modifiers):
            </span>

            {/* Property Type */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
              <div
                onClick={() => setPropertyType("residential")}
                style={{
                  padding: "10px 14px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  border: propertyType === "residential" ? "2px solid #1E4D2B" : "1.5px solid #DCE6DF",
                  backgroundColor: propertyType === "residential" ? "#FFFFFF" : "#F2F6F3",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <IconHome size={18} color="#1E4D2B" />
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#112015" }}>Residential Property</span>
              </div>

              <div
                onClick={() => setPropertyType("commercial")}
                style={{
                  padding: "10px 14px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  border: propertyType === "commercial" ? "2px solid #1E4D2B" : "1.5px solid #DCE6DF",
                  backgroundColor: propertyType === "commercial" ? "#FFFFFF" : "#F2F6F3",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <IconBuilding size={18} color="#1E4D2B" />
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#112015" }}>Commercial / HOA</span>
              </div>
            </div>

            {/* Lot Size Buttons */}
            <div style={{ marginBottom: "14px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#46594C", marginBottom: "6px" }}>
                Yard / Turf Area Size:
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "8px" }}>
                {(["small", "standard", "large", "acreage"] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setLotSizeKey(key)}
                    style={{
                      border: lotSizeKey === key ? "2px solid #1E4D2B" : "1px solid #D2DFD6",
                      backgroundColor: lotSizeKey === key ? "#1E4D2B" : "#FFFFFF",
                      color: lotSizeKey === key ? "#FFFFFF" : "#2E4735",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    {lotSizeLabels[key]}
                  </button>
                ))}
              </div>
            </div>

            {/* Driveway Type */}
            <div style={{ marginBottom: "14px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#46594C", marginBottom: "6px" }}>
                Driveway Dimensions (Plowing &amp; Mulch Staging):
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "8px" }}>
                {[
                  "Standard 2-Car Driveway",
                  "Wide 4-Car Driveway",
                  "Circular / Wrap-Around",
                  "Long Rural Lane (> 100 ft)",
                ].map((drv) => (
                  <button
                    key={drv}
                    type="button"
                    onClick={() => setDrivewayType(drv)}
                    style={{
                      border: drivewayType === drv ? "2px solid #1E4D2B" : "1px solid #D2DFD6",
                      backgroundColor: drivewayType === drv ? "#1E4D2B" : "#FFFFFF",
                      color: drivewayType === drv ? "#FFFFFF" : "#2E4735",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    {drv}
                  </button>
                ))}
              </div>
            </div>

            {/* Mulch specifics if chosen */}
            {selectedServices.some((s) => s.includes("Mulch")) && (
              <div style={{ borderTop: "1px dashed #D2E0D6", paddingTop: "12px", marginTop: "12px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#46594C", marginBottom: "6px" }}>
                  Estimated Mulch Quantity &amp; Color:
                </label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
                  {["3 to 5 Yards (Small Beds)", "5 to 8 Yards (Standard Beds)", "11+ Yards (Full Perimeter)"].map((vol) => (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => setMulchVolume(vol)}
                      style={{
                        border: mulchVolume === vol ? "1.5px solid #1E4D2B" : "1px solid #D2DFD6",
                        backgroundColor: mulchVolume === vol ? "#EFF7F2" : "#FFFFFF",
                        color: mulchVolume === vol ? "#1E4D2B" : "#2E4735",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        fontSize: "11.5px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      {vol}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. CONCRETE PRICE BREAKDOWN CARD */}
          <div
            style={{
              backgroundColor: "#EFF7F2",
              border: "2px solid #2B6E3F",
              borderRadius: "16px",
              padding: "18px 22px",
              marginBottom: "24px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px", marginBottom: "14px" }}>
              <div>
                <span style={{ fontSize: "11px", fontWeight: 800, color: "#1E4D2B", textTransform: "uppercase", letterSpacing: "1px", display: "block" }}>
                  Calculated Property Estimate
                </span>
                <div style={{ fontSize: "24px", fontWeight: 800, color: "#112015", margin: "2px 0 0" }}>
                  {rateString}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#FFFFFF", padding: "6px 12px", borderRadius: "20px", border: "1px solid #C5DFC9" }}>
                <IconShieldCheck size={16} color="#1E4D2B" />
                <span style={{ fontSize: "11.5px", fontWeight: 700, color: "#1E4D2B" }}>
                  Handshake Rate Guarantee
                </span>
              </div>
            </div>

            {/* Itemized lines */}
            <div style={{ borderTop: "1px solid #D4E8D8", paddingTop: "10px", fontSize: "12.5px" }}>
              <strong style={{ display: "block", color: "#2F4735", marginBottom: "6px", fontSize: "11.5px", textTransform: "uppercase" }}>
                Itemized Cost Breakdown:
              </strong>
              {breakdown.map((b, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", color: "#1F3325" }}>
                  <span>{b.label}:</span>
                  <strong>{b.amount}</strong>
                </div>
              ))}
            </div>

            <div style={{ fontSize: "11.5px", color: "#546E5C", marginTop: "10px", lineHeight: 1.4 }}>
              *Estimate is calculated using standard Western NY contractor property metrics. Final quote verified on first site visit with zero surprise fees.
            </div>
          </div>

          {/* ACTION BUTTONS: PROCEED TO DIRECT BOOKING */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                backgroundColor: "transparent",
                border: "1px solid #D2DFD6",
                color: "#3B5242",
                padding: "13px 20px",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "13.5px",
                cursor: "pointer",
              }}
            >
              Close Calculator
            </button>

            <button
              type="button"
              onClick={handleProceed}
              style={{
                flex: "1 1 280px",
                backgroundColor: "#1E4D2B",
                color: "#FFFFFF",
                border: "none",
                padding: "15px 24px",
                borderRadius: "12px",
                fontWeight: 800,
                fontSize: "15px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 6px 18px rgba(30, 77, 43, 0.35)",
              }}
            >
              <IconCalendar size={18} color="#FFFFFF" />
              <span>Proceed to Book This Estimate →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
