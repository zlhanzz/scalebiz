"use client";

import React, { useState, useId } from "react";
import { FH_LAND_DATA } from "@/data/fhLandServicesData";
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
  IconFileText,
  IconMapPin,
  IconChevronRight,
} from "./FHIcons";

import type { EstimatorResultData } from "./PropertyEstimatorModal";

interface EstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  defaultSeason?: "summer" | "winter";
  initialBookingData?: EstimatorResultData | null;
}

interface ServiceOption {
  id: string;
  name: string;
  season: "summer" | "winter";
  description: string;
  basePriceRange: string;
  frequencyOptions: string[];
}

const ALL_SERVICES: ServiceOption[] = [
  // SUMMER
  {
    id: "mowing",
    name: "Weekly Lawn Mowing & Diamond Striping",
    season: "summer",
    description: "Crisp perimeter line edging, deep weed whacking, and blowing off all driveways & walkways.",
    basePriceRange: "$40 – $65 / cut",
    frequencyOptions: ["Weekly Recurring Route", "Bi-Weekly Maintenance"],
  },
  {
    id: "mulch",
    name: "Deep Trench Bed Edging & Triple-Shred Mulch",
    season: "summer",
    description: "3-inch deep spade trench edging, weed barrier prep, and premium dark black, brown, or red mulch.",
    basePriceRange: "$95 – $125 / yard installed",
    frequencyOptions: ["One-Time Spring Project", "Mid-Season Refresh"],
  },
  {
    id: "spring_cleanup",
    name: "Spring Property Cleanup & Dethatching",
    season: "summer",
    description: "Winter branch removal, lawn power-raking/dethatching, garden bed blowout, and leaf disposal.",
    basePriceRange: "$180 – $360 project",
    frequencyOptions: ["One-Time Seasonal Kickoff"],
  },
  {
    id: "fall_cleanup",
    name: "Fall Leaf Cleanup & Curbside Vacuuming",
    season: "summer",
    description: "Complete perimeter leaf pickup, gutter cleanup, and lawn aeration to protect roots for winter.",
    basePriceRange: "$195 – $420 project",
    frequencyOptions: ["One-Time Fall Cleanup", "Multi-Visit Leaf Route"],
  },
  {
    id: "shrub_trimming",
    name: "Shrub, Bush & Hedge Shaping",
    season: "summer",
    description: "Precision shearing for boxwoods, arborvitaes, and ornamental shrubs with 100% trimmings cleanup.",
    basePriceRange: "$120 – $280 project",
    frequencyOptions: ["One-Time Trimming", "Bi-Annual Schedule"],
  },

  // WINTER
  {
    id: "snow_residential",
    name: "Seasonal Residential Driveway Snow Plowing",
    season: "winter",
    description: "Unlimited snow clearing passes all winter. Guaranteed first clearing before 6:30 AM before work.",
    basePriceRange: "$380 – $520 / full season",
    frequencyOptions: ["Full Season Unlimited Pass", "Per-Storm On-Call (2\"+ trigger)"],
  },
  {
    id: "snow_commercial",
    name: "Commercial Parking Lot Plowing & Salting",
    season: "winter",
    description: "Zero-tolerance slip hazard routes for retail, medical, and office complexes in Niagara County.",
    basePriceRange: "Custom Site Contract",
    frequencyOptions: ["24/7 Zero-Tolerance Contract", "Per-Push & Salting Route"],
  },
  {
    id: "deicing",
    name: "Eco-Friendly Driveway & Walkway De-Icing",
    season: "winter",
    description: "Treated rock salt & calcium chloride blend safe for concrete surfaces and pet paws.",
    basePriceRange: "$30 – $55 / application",
    frequencyOptions: ["Included with Season Pass", "On-Demand Salting"],
  },
  {
    id: "walkway_shoveling",
    name: "Front Walkway & Porch Hand Shoveling",
    season: "winter",
    description: "Hand clearance of front stoops, entry stairs, and paths to mailboxes and garage side doors.",
    basePriceRange: "$20 – $35 / storm",
    frequencyOptions: ["Storm Add-on", "Full Winter Package"],
  },
];

export default function EstimateModal({
  isOpen,
  onClose,
  defaultService,
  defaultSeason = "summer",
  initialBookingData,
}: EstimateModalProps) {
  const [activeSeason, setActiveSeason] = useState<"summer" | "winter">(
    initialBookingData?.season || defaultSeason
  );
  const [step, setStep] = useState<number>(initialBookingData ? 3 : 1);

  // Form State
  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialBookingData?.services && initialBookingData.services.length > 0
      ? initialBookingData.services
      : defaultService
      ? [defaultService]
      : ["Weekly Lawn Mowing & Diamond Striping"]
  );
  const [serviceFrequency, setServiceFrequency] = useState<string>(
    initialBookingData?.frequency || "Weekly Recurring Route"
  );
  const [propertyType, setPropertyType] = useState<"residential" | "commercial">("residential");
  const [lotSize, setLotSize] = useState<string>(
    initialBookingData?.lotSize || "Standard Suburban (1/4 to 1/2 Acre)"
  );
  const [drivewayType, setDrivewayType] = useState<string>(
    initialBookingData?.drivewayType || "Standard 2-Car Driveway"
  );
  const [mulchColor, setMulchColor] = useState<string>(
    initialBookingData?.mulchColor || "Dark Black Mulch"
  );
  const [siteConditions, setSiteConditions] = useState<string[]>([
    "Underground Sprinklers Present",
  ]);

  // Customer & Scheduling
  const [startDatePreference, setStartDatePreference] = useState<string>(
    "Earliest Available Route (Within 24–48 Hours)"
  );
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [cityTown, setCityTown] = useState<string>("Lockport, NY");
  const [zipCode, setZipCode] = useState<string>("14094");
  const [specialInstructions, setSpecialInstructions] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [confirmedTicket, setConfirmedTicket] = useState<{
    ticketId: string;
    submittedAt: string;
  } | null>(null);

  // Effect to sync initialBookingData when opened from Estimator
  React.useEffect(() => {
    if (initialBookingData) {
      if (initialBookingData.season) setActiveSeason(initialBookingData.season);
      if (initialBookingData.services && initialBookingData.services.length > 0) {
        setSelectedServices(initialBookingData.services);
      }
      if (initialBookingData.lotSize) setLotSize(initialBookingData.lotSize);
      if (initialBookingData.drivewayType) setDrivewayType(initialBookingData.drivewayType);
      if (initialBookingData.frequency) setServiceFrequency(initialBookingData.frequency);
      if (initialBookingData.mulchColor) setMulchColor(initialBookingData.mulchColor);
      setStep(3); // Jump straight to Address & Schedule!
    } else if (defaultService) {
      setSelectedServices([defaultService]);
      setStep(1);
    }
  }, [initialBookingData, defaultService]);

  if (!isOpen) return null;

  const filteredServices = ALL_SERVICES.filter((s) => s.season === activeSeason);

  const toggleService = (serviceName: string) => {
    if (selectedServices.includes(serviceName)) {
      if (selectedServices.length === 1) return; // keep at least 1
      setSelectedServices(selectedServices.filter((s) => s !== serviceName));
    } else {
      setSelectedServices([...selectedServices, serviceName]);
    }
  };

  const toggleCondition = (cond: string) => {
    if (siteConditions.includes(cond)) {
      setSiteConditions(siteConditions.filter((c) => c !== cond));
    } else {
      setSiteConditions([...siteConditions, cond]);
    }
  };

  // Dynamic Estimated Price Calculation
  const calculateEstimate = () => {
    let base = 0;
    let label = "";

    const hasMowing = selectedServices.some((s) => s.includes("Mowing"));
    const hasSnow = selectedServices.some((s) => s.includes("Snow"));
    const hasMulch = selectedServices.some((s) => s.includes("Mulch"));

    if (hasSnow) {
      if (lotSize.includes("Standard") || drivewayType.includes("2-Car")) {
        base = 395;
      } else if (drivewayType.includes("4-Car") || lotSize.includes("1/2 to 1")) {
        base = 475;
      } else if (drivewayType.includes("Country") || lotSize.includes("1+")) {
        base = 620;
      } else {
        base = 350;
      }
      label = `$${base} – $${base + 95} / Season Pass`;
    } else if (hasMowing) {
      if (lotSize.includes("Small")) {
        base = 38;
      } else if (lotSize.includes("Standard")) {
        base = 48;
      } else if (lotSize.includes("1/2 to 1")) {
        base = 68;
      } else {
        base = 95;
      }
      label = `$${base} – $${base + 14} / cut (Weekly)`;
    } else if (hasMulch) {
      base = 110;
      label = `~$${base} / cubic yard installed (with edging)`;
    } else {
      base = 180;
      label = `$${base} – $${base + 120} (One-Time Project)`;
    }

    return label;
  };

  const handleNext = () => {
    if (step === 1 && selectedServices.length === 0) {
      alert("Please select at least one service.");
      return;
    }
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !streetAddress.trim() || !phone.trim()) {
      alert("Please provide your Name, Street Address, and Contact Number for route scheduling.");
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newTicketId = `#FH-2026-${randomNum}`;
    const now = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    setConfirmedTicket({
      ticketId: newTicketId,
      submittedAt: now,
    });
    setIsSubmitted(true);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setConfirmedTicket(null);
    setStep(1);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(10, 20, 13, 0.78)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
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
        <style>{`
          @keyframes fhFadeIn {
            from { opacity: 0; transform: scale(0.97) translateY(8px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          .fh-service-card {
            border: 1.5px solid #E2ECE5;
            transition: all 0.15s ease;
          }
          .fh-service-card:hover {
            border-color: #1E4D2B;
            background-color: #F8FCF9;
          }
          .fh-service-card.selected {
            border-color: #1E4D2B;
            background-color: #EFF7F2;
          }
          .fh-spec-pill {
            cursor: pointer;
            padding: 10px 14px;
            border-radius: 10px;
            font-size: 13px;
            font-weight: 600;
            border: 1.5px solid #DCE6DF;
            background: #FFFFFF;
            transition: all 0.15s ease;
          }
          .fh-spec-pill.active {
            border-color: #1E4D2B;
            background: #1E4D2B;
            color: #FFFFFF;
          }
        `}</style>

        {/* TOP MODAL HEADER */}
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
              {activeSeason === "summer" ? (
                <IconGrass size={22} color="#68BA7F" />
              ) : (
                <IconSnow size={22} color="#93C5FD" />
              )}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "1px", color: "#68BA7F", textTransform: "uppercase" }}>
                  Instant Online Order &amp; Estimate
                </span>
                <span style={{ backgroundColor: "#2A4633", color: "#B8E2C5", fontSize: "10px", padding: "2px 7px", borderRadius: "10px", fontWeight: 700 }}>
                  Zero Phone Wait
                </span>
              </div>
              <h2 style={{ margin: "2px 0 0", fontSize: "19px", fontFamily: "Georgia, serif", fontWeight: 700, letterSpacing: "0.2px" }}>
                FH Land Services Property Dispatch
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close booking modal"
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
              transition: "background 0.15s",
            }}
          >
            <IconX size={18} color="#FFFFFF" />
          </button>
        </div>

        {/* STEP PROGRESS BAR (Only shown before final submission) */}
        {!isSubmitted && (
          <div
            style={{
              backgroundColor: "#F7FAF8",
              borderBottom: "1px solid #E2ECE5",
              padding: "12px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: step >= 1 ? "#1E4D2B" : "#8A9E91" }}>
              <span
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  backgroundColor: step >= 1 ? "#1E4D2B" : "#DCE6DF",
                  color: step >= 1 ? "#FFFFFF" : "#556B5D",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                }}
              >
                1
              </span>
              <span>Services &amp; Season</span>
            </div>

            <IconChevronRight size={14} color="#BACDC1" />

            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: step >= 2 ? "#1E4D2B" : "#8A9E91" }}>
              <span
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  backgroundColor: step >= 2 ? "#1E4D2B" : "#DCE6DF",
                  color: step >= 2 ? "#FFFFFF" : "#556B5D",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                }}
              >
                2
              </span>
              <span>Property Specs</span>
            </div>

            <IconChevronRight size={14} color="#BACDC1" />

            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: step >= 3 ? "#1E4D2B" : "#8A9E91" }}>
              <span
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  backgroundColor: step >= 3 ? "#1E4D2B" : "#DCE6DF",
                  color: step >= 3 ? "#FFFFFF" : "#556B5D",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                }}
              >
                3
              </span>
              <span>Schedule &amp; Address</span>
            </div>
          </div>
        )}

        {/* MODAL MAIN CONTENT */}
        <div style={{ padding: "24px" }}>
          {!isSubmitted ? (
            <div>
              {/* STEP 1: SERVICE & SEASON SELECTION */}
              {step === 1 && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "17px", color: "#112015", fontWeight: 800 }}>
                        Step 1: Select Your Needed Services
                      </h3>
                      <p style={{ margin: "3px 0 0", fontSize: "13px", color: "#546E5C" }}>
                        Choose one or more services. You can combine seasonal jobs into a single route.
                      </p>
                    </div>

                    {/* Season Switcher in Modal */}
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
                        onClick={() => setActiveSeason("summer")}
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
                          backgroundColor: activeSeason === "summer" ? "#1E4D2B" : "transparent",
                          color: activeSeason === "summer" ? "#FFFFFF" : "#2E4735",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <IconGrass size={14} color={activeSeason === "summer" ? "#FFFFFF" : "#2E4735"} />
                        <span>Summer Lawn</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveSeason("winter")}
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
                          backgroundColor: activeSeason === "winter" ? "#1E4D2B" : "transparent",
                          color: activeSeason === "winter" ? "#FFFFFF" : "#2E4735",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <IconSnow size={14} color={activeSeason === "winter" ? "#FFFFFF" : "#2E4735"} />
                        <span>Winter Snow</span>
                      </button>
                    </div>
                  </div>

                  {/* Services Grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px", marginBottom: "20px" }}>
                    {filteredServices.map((srv) => {
                      const isSelected = selectedServices.includes(srv.name);
                      return (
                        <div
                          key={srv.id}
                          className={`fh-service-card ${isSelected ? "selected" : ""}`}
                          onClick={() => toggleService(srv.name)}
                          style={{
                            padding: "14px 18px",
                            borderRadius: "12px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "14px",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", minWidth: 0 }}>
                            <div
                              style={{
                                width: "22px",
                                height: "22px",
                                borderRadius: "6px",
                                border: isSelected ? "2px solid #1E4D2B" : "2px solid #BACDC1",
                                backgroundColor: isSelected ? "#1E4D2B" : "#FFFFFF",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                marginTop: "2px",
                              }}
                            >
                              {isSelected && <IconCheck size={14} color="#FFFFFF" />}
                            </div>
                            <div>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                                <span style={{ fontWeight: 800, fontSize: "14.5px", color: "#112015" }}>
                                  {srv.name}
                                </span>
                                <span style={{ fontSize: "11px", fontWeight: 700, color: "#1E4D2B", backgroundColor: "#DDF1E3", padding: "2px 7px", borderRadius: "6px" }}>
                                  {srv.basePriceRange}
                                </span>
                              </div>
                              <p style={{ margin: "4px 0 0", fontSize: "12.5px", color: "#546E5C", lineHeight: 1.4 }}>
                                {srv.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Frequency Selection */}
                  <div style={{ backgroundColor: "#F7FAF8", padding: "16px", borderRadius: "12px", border: "1px solid #DCE6DF", marginBottom: "22px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 800, color: "#112015", marginBottom: "8px" }}>
                      Route Frequency Preference:
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {[
                        "Weekly Recurring Route",
                        "Bi-Weekly Maintenance",
                        "One-Time Clean-Up / Project",
                        "Full Season Winter Pass (Unlimited)",
                      ].map((freq) => (
                        <button
                          key={freq}
                          type="button"
                          onClick={() => setServiceFrequency(freq)}
                          style={{
                            border: serviceFrequency === freq ? "1.5px solid #1E4D2B" : "1px solid #D2DFD6",
                            backgroundColor: serviceFrequency === freq ? "#1E4D2B" : "#FFFFFF",
                            color: serviceFrequency === freq ? "#FFFFFF" : "#2E4735",
                            padding: "7px 12px",
                            borderRadius: "8px",
                            fontSize: "12px",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          {freq}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 1 Actions */}
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      type="button"
                      onClick={handleNext}
                      style={{
                        backgroundColor: "#1E4D2B",
                        color: "#FFFFFF",
                        border: "none",
                        padding: "13px 28px",
                        borderRadius: "10px",
                        fontWeight: 700,
                        fontSize: "14px",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        boxShadow: "0 4px 12px rgba(30, 77, 43, 0.28)",
                      }}
                    >
                      <span>Continue to Property Specs</span>
                      <IconChevronRight size={16} color="#FFFFFF" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PROPERTY & SITE SPECIFICATIONS */}
              {step === 2 && (
                <div>
                  <h3 style={{ margin: "0 0 4px", fontSize: "17px", color: "#112015", fontWeight: 800 }}>
                    Step 2: Property &amp; Site Details
                  </h3>
                  <p style={{ margin: "0 0 18px", fontSize: "13px", color: "#546E5C" }}>
                    Helps us calculate accurate equipment sizing (commercial zero-turn mowers vs. Western V-plow trucks).
                  </p>

                  {/* Property Type Radio Cards */}
                  <div style={{ marginBottom: "18px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 800, color: "#112015", marginBottom: "8px" }}>
                      Property Classification:
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
                      <div
                        onClick={() => setPropertyType("residential")}
                        style={{
                          padding: "12px 14px",
                          borderRadius: "10px",
                          cursor: "pointer",
                          border: propertyType === "residential" ? "2px solid #1E4D2B" : "1.5px solid #DCE6DF",
                          backgroundColor: propertyType === "residential" ? "#EFF7F2" : "#FFFFFF",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <IconHome size={20} color="#1E4D2B" />
                        <div>
                          <strong style={{ fontSize: "13px", display: "block", color: "#112015" }}>Residential Property</strong>
                          <span style={{ fontSize: "11px", color: "#5F7666" }}>Single family home or duplex</span>
                        </div>
                      </div>

                      <div
                        onClick={() => setPropertyType("commercial")}
                        style={{
                          padding: "12px 14px",
                          borderRadius: "10px",
                          cursor: "pointer",
                          border: propertyType === "commercial" ? "2px solid #1E4D2B" : "1.5px solid #DCE6DF",
                          backgroundColor: propertyType === "commercial" ? "#EFF7F2" : "#FFFFFF",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <IconBuilding size={20} color="#1E4D2B" />
                        <div>
                          <strong style={{ fontSize: "13px", display: "block", color: "#112015" }}>Commercial / HOA</strong>
                          <span style={{ fontSize: "11px", color: "#5F7666" }}>Retail, complex, or office lot</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lot / Turf Size */}
                  <div style={{ marginBottom: "18px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 800, color: "#112015", marginBottom: "8px" }}>
                      Estimated Yard / Lot Size:
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "8px" }}>
                      {[
                        "Small Yard (< 1/4 Acre)",
                        "Standard Suburban (1/4 to 1/2 Acre)",
                        "Large Yard (1/2 to 1 Acre)",
                        "Acreage / Estate (1+ Acres)",
                      ].map((size) => (
                        <div
                          key={size}
                          className={`fh-spec-pill ${lotSize === size ? "active" : ""}`}
                          onClick={() => setLotSize(size)}
                          style={{ textAlign: "center" }}
                        >
                          {size}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Driveway Layout (Crucial for Snow & Mulch staging) */}
                  <div style={{ marginBottom: "18px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 800, color: "#112015", marginBottom: "8px" }}>
                      Driveway Dimensions (For Plowing &amp; Mulch Drop-off):
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "8px" }}>
                      {[
                        "Standard 2-Car Driveway",
                        "Wide 4-Car Driveway",
                        "Circular / Wrap-Around",
                        "Long Rural Lane (> 100 ft)",
                      ].map((drv) => (
                        <div
                          key={drv}
                          className={`fh-spec-pill ${drivewayType === drv ? "active" : ""}`}
                          onClick={() => setDrivewayType(drv)}
                          style={{ textAlign: "center" }}
                        >
                          {drv}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mulch color selector if mulch is chosen */}
                  {selectedServices.some((s) => s.includes("Mulch")) && (
                    <div style={{ backgroundColor: "#F7FAF8", padding: "14px", borderRadius: "10px", border: "1px solid #DCE6DF", marginBottom: "18px" }}>
                      <label style={{ display: "block", fontSize: "12.5px", fontWeight: 800, color: "#112015", marginBottom: "6px" }}>
                        Preferred Triple-Shred Mulch Color:
                      </label>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        {["Dark Black Mulch (Top Pick)", "Chocolate Brown", "Natural Cedar"].map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setMulchColor(color)}
                            style={{
                              border: mulchColor === color ? "1.5px solid #1E4D2B" : "1px solid #D2DFD6",
                              backgroundColor: mulchColor === color ? "#1E4D2B" : "#FFFFFF",
                              color: mulchColor === color ? "#FFFFFF" : "#2E4735",
                              padding: "6px 12px",
                              borderRadius: "8px",
                              fontSize: "12px",
                              fontWeight: 700,
                              cursor: "pointer",
                            }}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Site Access & Obstacle Tags */}
                  <div style={{ marginBottom: "22px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 800, color: "#112015", marginBottom: "8px" }}>
                      Site Access &amp; Obstacles (Check all that apply):
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {[
                        "Fenced Yard (Standard gate 48\"+)",
                        "Narrow Gate (< 36\")",
                        "Underground Sprinklers Present",
                        "Dogs / Pets on Property",
                        "Steep Hill / Slope",
                        "Driveway Plow Stakes Needed",
                      ].map((item) => {
                        const checked = siteConditions.includes(item);
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleCondition(item)}
                            style={{
                              border: checked ? "1.5px solid #1E4D2B" : "1px solid #D2DFD6",
                              backgroundColor: checked ? "#EFF7F2" : "#FFFFFF",
                              color: checked ? "#1E4D2B" : "#4A5E50",
                              padding: "7px 11px",
                              borderRadius: "8px",
                              fontSize: "12px",
                              fontWeight: checked ? 700 : 500,
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <span
                              style={{
                                width: "14px",
                                height: "14px",
                                borderRadius: "3px",
                                border: checked ? "1.5px solid #1E4D2B" : "1px solid #A2B8AA",
                                backgroundColor: checked ? "#1E4D2B" : "#FFFFFF",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {checked && <IconCheck size={10} color="#FFFFFF" />}
                            </span>
                            <span>{item}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2 Actions */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <button
                      type="button"
                      onClick={handleBack}
                      style={{
                        backgroundColor: "transparent",
                        border: "1px solid #D2DFD6",
                        color: "#3B5242",
                        padding: "12px 20px",
                        borderRadius: "10px",
                        fontWeight: 700,
                        fontSize: "13px",
                        cursor: "pointer",
                      }}
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      style={{
                        backgroundColor: "#1E4D2B",
                        color: "#FFFFFF",
                        border: "none",
                        padding: "13px 28px",
                        borderRadius: "10px",
                        fontWeight: 700,
                        fontSize: "14px",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        boxShadow: "0 4px 12px rgba(30, 77, 43, 0.28)",
                      }}
                    >
                      <span>Continue to Address &amp; Schedule</span>
                      <IconChevronRight size={16} color="#FFFFFF" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: ADDRESS, SCHEDULE & DIRECT ORDER SUBMIT */}
              {step === 3 && (
                <form onSubmit={handleFinalSubmit}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "17px", color: "#112015", fontWeight: 800 }}>
                        Step 3: Service Address &amp; Route Schedule
                      </h3>
                      <p style={{ margin: "3px 0 0", fontSize: "13px", color: "#546E5C" }}>
                        Enter your location so Steve &amp; Kenny can confirm satellite route access.
                      </p>
                    </div>

                    {/* Dynamic Real-time Price Estimation Card */}
                    <div
                      style={{
                        backgroundColor: "#EFF7F2",
                        border: "1.5px solid #2B6E3F",
                        padding: "8px 14px",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <IconRuler size={16} color="#1E4D2B" />
                      <div>
                        <span style={{ fontSize: "10px", fontWeight: 800, color: "#1E4D2B", textTransform: "uppercase", display: "block" }}>
                          Estimated Range
                        </span>
                        <span style={{ fontSize: "14px", fontWeight: 800, color: "#112015" }}>
                          {calculateEstimate()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {initialBookingData && (
                    <div
                      style={{
                        backgroundColor: "#DDF1E3",
                        border: "1px solid #9FD4AD",
                        borderRadius: "10px",
                        padding: "10px 14px",
                        marginBottom: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "12.5px",
                        color: "#164B26",
                      }}
                    >
                      <IconCheck size={16} color="#164B26" />
                      <span>
                        <strong>Cost Estimator Specs Loaded:</strong> {initialBookingData.services.join(", ")} • {initialBookingData.lotSize} ({initialBookingData.estimatedRateString}). Complete your service address below to dispatch.
                      </span>
                    </div>
                  )}

                  {/* Target Start Timeframe */}
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 800, color: "#112015", marginBottom: "6px" }}>
                      Desired Route Start Window:
                    </label>
                    <select
                      value={startDatePreference}
                      onChange={(e) => setStartDatePreference(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "10px",
                        border: "1.5px solid #D2DFD6",
                        fontSize: "13.5px",
                        color: "#18241C",
                        backgroundColor: "#FFFFFF",
                        outline: "none",
                      }}
                    >
                      <option>Earliest Available Route (Within 24–48 Hours)</option>
                      <option>Upcoming Monday / Weekly Route Kickoff</option>
                      <option>Within the next 7 to 10 Days</option>
                      <option>Pre-Season Winter Snow Pass Reservation</option>
                      <option>Specific Weekend / Scheduled Property Walk</option>
                    </select>
                  </div>

                  {/* Property Street Address & City */}
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "10px", marginBottom: "14px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12.5px", fontWeight: 800, color: "#112015", marginBottom: "6px" }}>
                        Street Address: *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 5842 High Street or Campbell Blvd"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "10px",
                          border: "1.5px solid #D2DFD6",
                          fontSize: "13.5px",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12.5px", fontWeight: 800, color: "#112015", marginBottom: "6px" }}>
                        Town / Area:
                      </label>
                      <select
                        value={cityTown}
                        onChange={(e) => setCityTown(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "11px 12px",
                          borderRadius: "10px",
                          border: "1.5px solid #D2DFD6",
                          fontSize: "13px",
                          backgroundColor: "#FFFFFF",
                          boxSizing: "border-box",
                        }}
                      >
                        <option>Lockport, NY</option>
                        <option>Pendleton, NY</option>
                        <option>Clarence, NY</option>
                        <option>Amherst, NY</option>
                        <option>Newfane, NY</option>
                        <option>Wrights Corners, NY</option>
                        <option>Other Niagara County</option>
                      </select>
                    </div>
                  </div>

                  {/* Customer Full Name & Email & Phone */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12.5px", fontWeight: 800, color: "#112015", marginBottom: "6px" }}>
                        Your Full Name: *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dave Miller"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "10px",
                          border: "1.5px solid #D2DFD6",
                          fontSize: "13.5px",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12.5px", fontWeight: 800, color: "#112015", marginBottom: "6px" }}>
                        Email (For Digital Order Receipt): *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="dave@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "10px",
                          border: "1.5px solid #D2DFD6",
                          fontSize: "13.5px",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: "14px" }}>
                    <label style={{ display: "block", fontSize: "12.5px", fontWeight: 800, color: "#112015", marginBottom: "6px" }}>
                      Mobile Phone (For Automated Crew Arrival SMS Alerts): *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(716) 555-0192"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "10px",
                        border: "1.5px solid #D2DFD6",
                        fontSize: "13.5px",
                        boxSizing: "border-box",
                      }}
                    />
                    <span style={{ fontSize: "11.5px", color: "#6A8272", display: "block", marginTop: "3px" }}>
                      Used strictly for route notifications (e.g. "FH Crew en route in red GMC truck"). No marketing spam.
                    </span>
                  </div>

                  {/* Special Gate Instructions */}
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontSize: "12.5px", fontWeight: 800, color: "#112015", marginBottom: "6px" }}>
                      Gate Access Codes, Pets, or Staging Notes (Optional):
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Back gate is on the right side of the garage; dog is kept inside during morning routes; please pile snow on the west lawn."
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: "1.5px solid #D2DFD6",
                        fontSize: "13px",
                        resize: "vertical",
                        boxSizing: "border-box",
                      }}
                    ></textarea>
                  </div>

                  {/* Submission Notice */}
                  <div
                    style={{
                      backgroundColor: "#F7FAF8",
                      border: "1px solid #D8E4DC",
                      borderRadius: "10px",
                      padding: "12px 16px",
                      fontSize: "12px",
                      color: "#3F5846",
                      marginBottom: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <IconShieldCheck size={18} color="#1E4D2B" />
                    <span>
                      <strong>100% Guaranteed Handshake Rate:</strong> No charge until site walkthrough is complete and verified. Fully licensed &amp; insured contractor in Niagara County.
                    </span>
                  </div>

                  {/* Step 3 Actions */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <button
                      type="button"
                      onClick={handleBack}
                      style={{
                        backgroundColor: "transparent",
                        border: "1px solid #D2DFD6",
                        color: "#3B5242",
                        padding: "12px 20px",
                        borderRadius: "10px",
                        fontWeight: 700,
                        fontSize: "13px",
                        cursor: "pointer",
                      }}
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#1E4D2B",
                        color: "#FFFFFF",
                        border: "none",
                        padding: "14px 30px",
                        borderRadius: "10px",
                        fontWeight: 700,
                        fontSize: "14.5px",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        boxShadow: "0 4px 14px rgba(30, 77, 43, 0.35)",
                      }}
                    >
                      <IconCheck size={17} color="#FFFFFF" />
                      <span>Confirm &amp; Queue Work Order</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* STEP 4: SUCCESS OFFICIAL DIGITAL WORK ORDER RECEIPT */
            <div style={{ textAlign: "center", padding: "10px 0" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  backgroundColor: "#E8F5ED",
                  border: "2px solid #1E4D2B",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                <IconCheck size={32} color="#1E4D2B" />
              </div>

              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#DDF1E3", color: "#164B26", padding: "4px 12px", borderRadius: "20px", fontSize: "11.5px", fontWeight: 800, marginBottom: "8px" }}>
                <span>● ORDER CONFIRMED &amp; DISPATCH QUEUED</span>
              </div>

              <h3
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "26px",
                  color: "#132318",
                  margin: "0 0 4px",
                }}
              >
                Work Order {confirmedTicket?.ticketId}
              </h3>
              <p style={{ fontSize: "13px", color: "#6A8272", margin: "0 0 20px" }}>
                Generated on {confirmedTicket?.submittedAt} • Direct Route Queue
              </p>

              {/* Digital Job Ticket Receipt Box */}
              <div
                style={{
                  backgroundColor: "#F7FAF8",
                  borderRadius: "14px",
                  border: "1px solid #DCE6DF",
                  padding: "20px",
                  textAlign: "left",
                  fontSize: "13px",
                  color: "#2C3D32",
                  marginBottom: "24px",
                  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.02)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #E2ECE5", paddingBottom: "10px", marginBottom: "10px" }}>
                  <span style={{ color: "#6A8272" }}>Customer:</span>
                  <strong style={{ color: "#112015" }}>{fullName}</strong>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #E2ECE5", paddingBottom: "10px", marginBottom: "10px" }}>
                  <span style={{ color: "#6A8272" }}>Service Location:</span>
                  <strong style={{ color: "#112015" }}>{streetAddress}, {cityTown} {zipCode}</strong>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #E2ECE5", paddingBottom: "10px", marginBottom: "10px" }}>
                  <span style={{ color: "#6A8272" }}>Requested Services:</span>
                  <strong style={{ color: "#1E4D2B", textAlign: "right", maxWidth: "60%" }}>
                    {selectedServices.join(" + ")}
                  </strong>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #E2ECE5", paddingBottom: "10px", marginBottom: "10px" }}>
                  <span style={{ color: "#6A8272" }}>Schedule &amp; Frequency:</span>
                  <strong style={{ color: "#112015" }}>{serviceFrequency} ({startDatePreference})</strong>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #E2ECE5", paddingBottom: "10px", marginBottom: "10px" }}>
                  <span style={{ color: "#6A8272" }}>Property Specs:</span>
                  <strong style={{ color: "#112015" }}>{propertyType === "residential" ? "Residential" : "Commercial"} • {lotSize} • {drivewayType}</strong>
                </div>

                {specialInstructions && (
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #E2ECE5", paddingBottom: "10px", marginBottom: "10px" }}>
                    <span style={{ color: "#6A8272" }}>Site Notes:</span>
                    <span style={{ color: "#445C4B", fontStyle: "italic", textAlign: "right", maxWidth: "65%" }}>{specialInstructions}</span>
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "4px" }}>
                  <span style={{ color: "#112015", fontWeight: 800 }}>Estimated Rate:</span>
                  <strong style={{ color: "#1E4D2B", fontSize: "15px" }}>{calculateEstimate()}</strong>
                </div>
              </div>

              {/* What Happens Next - Real contractor workflow */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D5E4D9",
                  borderRadius: "12px",
                  padding: "16px 20px",
                  textAlign: "left",
                  marginBottom: "24px",
                }}
              >
                <h4 style={{ margin: "0 0 10px", fontSize: "13px", fontWeight: 800, color: "#112015", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  What Happens Next (Direct Route Protocol):
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px", fontSize: "12.5px", color: "#3B5242" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <span style={{ color: "#1E4D2B", fontWeight: 800 }}>1.</span>
                    <span>An itemized digital confirmation has been logged for <strong>{email}</strong>.</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <span style={{ color: "#1E4D2B", fontWeight: 800 }}>2.</span>
                    <span>Steve &amp; Kenny review your property via satellite map and assign your address to the next route cycle.</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <span style={{ color: "#1E4D2B", fontWeight: 800 }}>3.</span>
                    <span>You will receive an automated text arrival notice at <strong>{phone}</strong> when the crew is 15 minutes away.</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Zero phone dependency! */}
              <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={handlePrint}
                  style={{
                    backgroundColor: "#EFF7F2",
                    color: "#1E4D2B",
                    border: "1px solid #2B6E3F",
                    padding: "12px 20px",
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: "13.5px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <IconFileText size={16} color="#1E4D2B" />
                  <span>Print / Save Receipt</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    backgroundColor: "#1E4D2B",
                    color: "#FFFFFF",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: "13.5px",
                    cursor: "pointer",
                  }}
                >
                  Done • Return to Site
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
