"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FlashDesign, LUCKY_LEAF_DATA } from "@/data/luckyLeafData";
import {
  IconClose,
  IconCheck,
  IconUpload,
  IconTrash,
  IconCalendar,
  IconClock,
  IconRuler,
  IconShieldCheck,
  IconGinkgo,
  IconSparkles,
  IconInfo
} from "./LuckyLeafIcons";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedFlash?: FlashDesign | null;
  onClearPreselectedFlash?: () => void;
}

export const LuckyLeafBookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedFlash,
  onClearPreselectedFlash
}) => {
  // Wizard steps: 1 = Concept & Subject, 2 = Placement & Size, 3 = References, 4 = Schedule & Policy, 5 = Success Pass
  const [step, setStep] = useState<number>(1);

  // Form State
  const [projectType, setProjectType] = useState<"custom" | "flash">(
    preselectedFlash ? "flash" : "custom"
  );
  const [selectedFlash, setSelectedFlash] = useState<FlashDesign | null>(
    preselectedFlash || null
  );
  const [description, setDescription] = useState("");
  const [bodyPlacement, setBodyPlacement] = useState("");
  const [customPlacement, setCustomPlacement] = useState("");
  const [sizeInches, setSizeInches] = useState("4 to 5 inches");
  const [referenceImages, setReferenceImages] = useState<
    { name: string; url: string; size: string }[]
  >([]);
  const [preferredMonth, setPreferredMonth] = useState("Next Month (Recommended)");
  const [preferredDays, setPreferredDays] = useState<string[]>([]);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientIg, setClientIg] = useState("");
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Keep state synced if preselectedFlash changes
  useEffect(() => {
    if (preselectedFlash) {
      setProjectType("flash");
      setSelectedFlash(preselectedFlash);
      setSizeInches(preselectedFlash.minSize || "5+ inches");
      setDescription(
        `Claiming 1-of-1 Flash: "${preselectedFlash.title}" (${preselectedFlash.category}). Recommended placement: ${preselectedFlash.recommendedPlacement}.`
      );
    }
  }, [preselectedFlash]);

  // Lock background scroll when open
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

  if (!isOpen) return null;

  const placementsList = [
    "Inner Forearm",
    "Outer Forearm",
    "Upper Arm / Bicep",
    "Clavicle / Collarbone",
    "Upper Back / Shoulder Blade",
    "Ribs / Side Rib",
    "Thigh / Upper Leg",
    "Calf / Ankle",
    "Other Placement"
  ];

  const daysOptions = [
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday (Limited)"
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const fileSizeKb = Math.round(file.size / 1024);
          setReferenceImages((prev) => [
            ...prev,
            {
              name: file.name,
              url: event.target?.result as string,
              size: `${fileSizeKb} KB`
            }
          ]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeReferenceImage = (index: number) => {
    setReferenceImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleDay = (day: string) => {
    setPreferredDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleNextStep = () => {
    if (step === 1 && !description.trim()) {
      alert("Please provide a brief description of your tattoo idea.");
      return;
    }
    if (step === 2 && !bodyPlacement) {
      alert("Please select your intended body placement.");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) {
      alert("Please enter your name and email so Din can reply with your consultation date.");
      return;
    }
    if (!agreedToPolicy) {
      alert("Please review and acknowledge Din's studio deposit and attendance policies.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `LL-${Math.floor(1000 + Math.random() * 9000)}`;
      setTicketId(generatedId);
      setStep(5); // Success confirmation
    }, 800);
  };

  const handleReset = () => {
    setStep(1);
    setDescription("");
    setBodyPlacement("");
    setCustomPlacement("");
    setSizeInches("4 to 5 inches");
    setReferenceImages([]);
    setPreferredDays([]);
    setClientName("");
    setClientEmail("");
    setClientPhone("");
    setClientIg("");
    setAgreedToPolicy(false);
    setSelectedFlash(null);
    if (onClearPreselectedFlash) onClearPreselectedFlash();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
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
          maxWidth: "680px",
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
        {/* Modal Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid rgba(80, 101, 83, 0.12)",
            backgroundColor: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "rgba(80, 101, 83, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#506553"
              }}
            >
              <IconGinkgo size={20} />
            </div>
            <div>
              <h2
                id="booking-modal-title"
                style={{
                  margin: 0,
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "19px",
                  fontWeight: 600,
                  color: "#1C1B1A",
                  letterSpacing: "-0.01em"
                }}
              >
                Inquiry & Private Session Request
              </h2>
              <p
                style={{
                  margin: "2px 0 0 0",
                  fontSize: "12px",
                  color: "#6B6760"
                }}
              >
                Lucky Leaf Tattoo • 1809 Hertel Ave, Buffalo NY
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              color: "#6B6760",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.2s"
            }}
          >
            <IconClose size={20} />
          </button>
        </div>

        {/* Wizard Progress Bar */}
        {step < 5 && (
          <div
            style={{
              padding: "12px 24px",
              backgroundColor: "#F4EFEA",
              borderBottom: "1px solid rgba(80, 101, 83, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            {[
              { num: 1, label: "Concept" },
              { num: 2, label: "Placement & Size" },
              { num: 3, label: "References" },
              { num: 4, label: "Schedule & Policies" }
            ].map((s) => (
              <div
                key={s.num}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  fontWeight: step >= s.num ? 600 : 400,
                  color: step >= s.num ? "#506553" : "#9E9A93"
                }}
              >
                <span
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    backgroundColor:
                      step > s.num
                        ? "#506553"
                        : step === s.num
                        ? "#506553"
                        : "#E5DFD7",
                    color: step >= s.num ? "#FFFFFF" : "#6B6760"
                  }}
                >
                  {step > s.num ? <IconCheck size={12} color="#FFF" /> : s.num}
                </span>
                <span className="step-label" style={{ display: "inline" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Scrollable Modal Body */}
        <div
          style={{
            padding: "24px",
            overflowY: "auto",
            flex: 1
          }}
        >
          {/* STEP 1: CONCEPT & SUBJECT */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {selectedFlash && (
                <div
                  style={{
                    padding: "14px 16px",
                    backgroundColor: "rgba(80, 101, 83, 0.08)",
                    border: "1px solid rgba(80, 101, 83, 0.2)",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        position: "relative",
                        width: "48px",
                        height: "48px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        backgroundColor: "#FFFFFF",
                        border: "1px solid rgba(80, 101, 83, 0.15)"
                      }}
                    >
                      <Image
                        src={selectedFlash.image}
                        alt={selectedFlash.title}
                        fill
                        sizes="48px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: "11px",
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                          color: "#506553",
                          fontWeight: 600
                        }}
                      >
                        Claiming 1-of-1 Flash
                      </span>
                      <h4
                        style={{
                          margin: "2px 0 0 0",
                          fontSize: "15px",
                          color: "#1C1B1A"
                        }}
                      >
                        {selectedFlash.title}
                      </h4>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFlash(null);
                      setProjectType("custom");
                      setDescription("");
                      if (onClearPreselectedFlash) onClearPreselectedFlash();
                    }}
                    style={{
                      fontSize: "12px",
                      color: "#C48B77",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textDecoration: "underline"
                    }}
                  >
                    Switch to Custom Idea
                  </button>
                </div>
              )}

              {/* Project Type Picker */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#1C1B1A",
                    marginBottom: "8px"
                  }}
                >
                  Type of Inquiry
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px"
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setProjectType("custom");
                      setSelectedFlash(null);
                    }}
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      border:
                        projectType === "custom"
                          ? "2px solid #506553"
                          : "1px solid #E5DFD7",
                      backgroundColor:
                        projectType === "custom" ? "#FFFFFF" : "#F4EFEA",
                      color: "#1C1B1A",
                      cursor: "pointer",
                      textAlign: "left",
                      fontSize: "13px"
                    }}
                  >
                    <div style={{ fontWeight: 600, marginBottom: "2px" }}>
                      Custom Commission
                    </div>
                    <div style={{ fontSize: "11px", color: "#6B6760" }}>
                      Unique botanical, fauna, or symbolic piece drawn for you
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setProjectType("flash")}
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      border:
                        projectType === "flash"
                          ? "2px solid #506553"
                          : "1px solid #E5DFD7",
                      backgroundColor:
                        projectType === "flash" ? "#FFFFFF" : "#F4EFEA",
                      color: "#1C1B1A",
                      cursor: "pointer",
                      textAlign: "left",
                      fontSize: "13px"
                    }}
                  >
                    <div style={{ fontWeight: 600, marginBottom: "2px" }}>
                      1-of-1 Studio Flash
                    </div>
                    <div style={{ fontSize: "11px", color: "#6B6760" }}>
                      Exclusive pre-drawn art tattooed once with priority dates
                    </div>
                  </button>
                </div>
              </div>

              {/* Detailed Description */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "6px"
                  }}
                >
                  <label
                    htmlFor="desc-field"
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#1C1B1A"
                    }}
                  >
                    Detailed Description of Your Idea *
                  </label>
                  <span style={{ fontSize: "11px", color: "#6B6760" }}>
                    Directly from Din&apos;s story intake guide
                  </span>
                </div>
                <textarea
                  id="desc-field"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell Din what elements you would like included (e.g., wild lilies, delicate foliage, ginkgo sprig, paper crane motif, shading preference, personal symbolism)..."
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    border: "1px solid #D5CEBE",
                    backgroundColor: "#FFFFFF",
                    fontSize: "13px",
                    color: "#1C1B1A",
                    fontFamily: "inherit",
                    resize: "vertical"
                  }}
                />
              </div>

              {/* Studio Note */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  padding: "12px 14px",
                  backgroundColor: "#F3F1EC",
                  borderRadius: "8px",
                  borderLeft: "3px solid #506553"
                }}
              >
                <IconInfo size={18} color="#506553" />
                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    color: "#54504A",
                    lineHeight: "1.5"
                  }}
                >
                  <strong>Design Promise:</strong> You don&apos;t need a finished drawing! Din collaborates directly with you and delivers a refined digital sketch <strong>3 to 5 days prior</strong> to your appointment date with revisions included.
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: PLACEMENT & APPROXIMATE SIZE */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Body Placement */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#1C1B1A",
                    marginBottom: "8px"
                  }}
                >
                  Location on Body *
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                    gap: "8px"
                  }}
                >
                  {placementsList.map((loc) => {
                    const isSelected = bodyPlacement === loc;
                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => setBodyPlacement(loc)}
                        style={{
                          padding: "10px 12px",
                          borderRadius: "8px",
                          border: isSelected
                            ? "2px solid #506553"
                            : "1px solid #D5CEBE",
                          backgroundColor: isSelected ? "#FFFFFF" : "#FAF8F4",
                          color: isSelected ? "#506553" : "#1C1B1A",
                          fontWeight: isSelected ? 600 : 400,
                          fontSize: "12px",
                          cursor: "pointer",
                          textAlign: "center",
                          transition: "all 0.15s ease"
                        }}
                      >
                        {loc}
                      </button>
                    );
                  })}
                </div>

                {bodyPlacement === "Other Placement" && (
                  <input
                    type="text"
                    value={customPlacement}
                    onChange={(e) => setCustomPlacement(e.target.value)}
                    placeholder="Specify placement (e.g. Behind ear, side ribs, upper chest)..."
                    style={{
                      marginTop: "10px",
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #D5CEBE",
                      backgroundColor: "#FFFFFF",
                      fontSize: "13px"
                    }}
                  />
                )}
              </div>

              {/* Approximate Size */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "6px"
                  }}
                >
                  <label
                    htmlFor="size-field"
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#1C1B1A"
                    }}
                  >
                    Approximate Size (Inches) *
                  </label>
                  <span style={{ fontSize: "11px", color: "#6B6760" }}>
                    e.g. 3&quot;x2&quot;, palm size, 5–6 inches
                  </span>
                </div>
                <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                  {[
                    '2" - 3" (Delicate)',
                    '4" - 5" (Medium)',
                    '6" - 7" (Statement)',
                    '8"+ (Sleeve/Quarter)'
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setSizeInches(preset)}
                      style={{
                        padding: "6px 10px",
                        fontSize: "11px",
                        borderRadius: "6px",
                        border:
                          sizeInches === preset
                            ? "1px solid #506553"
                            : "1px solid #D5CEBE",
                        backgroundColor:
                          sizeInches === preset ? "rgba(80, 101, 83, 0.1)" : "#FFFFFF",
                        color: sizeInches === preset ? "#506553" : "#54504A",
                        cursor: "pointer"
                      }}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    id="size-field"
                    type="text"
                    value={sizeInches}
                    onChange={(e) => setSizeInches(e.target.value)}
                    placeholder='e.g. 4" to 5" vertical on forearm'
                    style={{
                      width: "100%",
                      padding: "10px 14px 10px 38px",
                      borderRadius: "8px",
                      border: "1px solid #D5CEBE",
                      backgroundColor: "#FFFFFF",
                      fontSize: "13px",
                      color: "#1C1B1A"
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#8C867A"
                    }}
                  >
                    <IconRuler size={16} />
                  </div>
                </div>
              </div>

              {/* Placement & Anatomy Guidance */}
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(196, 139, 119, 0.08)",
                  border: "1px solid rgba(196, 139, 119, 0.2)",
                  fontSize: "12px",
                  color: "#6E4C41",
                  lineHeight: "1.5"
                }}
              >
                <strong>Anatomy Flow:</strong> Din specializes in contouring linework to your natural muscle lines. Sizing will be calibrated and printed at multiple test scales during your private Hertel Ave session.
              </div>
            </div>
          )}

          {/* STEP 3: REFERENCE PICTURES (Upload Mechanism) */}
          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#1C1B1A",
                    marginBottom: "4px"
                  }}
                >
                  Reference Pictures & Inspiration *
                </label>
                <p
                  style={{
                    margin: "0 0 12px 0",
                    fontSize: "12px",
                    color: "#6B6760",
                    lineHeight: "1.5"
                  }}
                >
                  Upload photos of styles you love, floral types, or snapshots of your intended placement area. Din will translate them into his signature fine-line aesthetic.
                </p>

                {/* Dropzone Container */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: "2px dashed #C8C0B2",
                    borderRadius: "12px",
                    padding: "28px 20px",
                    textAlign: "center",
                    backgroundColor: "#FFFFFF",
                    cursor: "pointer",
                    transition: "border-color 0.2s ease"
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                  />
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(80, 101, 83, 0.08)",
                      margin: "0 auto 12px auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#506553"
                    }}
                  >
                    <IconUpload size={24} />
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#1C1B1A",
                      marginBottom: "4px"
                    }}
                  >
                    Click or Drag & Drop Images Here
                  </div>
                  <div style={{ fontSize: "12px", color: "#8C867A" }}>
                    Supports JPG, PNG, WEBP (Up to 10MB each)
                  </div>
                </div>
              </div>

              {/* Uploaded Files Grid */}
              {referenceImages.length > 0 && (
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#506553",
                      marginBottom: "8px"
                    }}
                  >
                    Attached References ({referenceImages.length})
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                      gap: "10px"
                    }}
                  >
                    {referenceImages.map((img, idx) => (
                      <div
                        key={idx}
                        style={{
                          position: "relative",
                          borderRadius: "8px",
                          overflow: "hidden",
                          border: "1px solid #D5CEBE",
                          backgroundColor: "#FFFFFF"
                        }}
                      >
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            paddingTop: "100%"
                          }}
                        >
                          <Image
                            src={img.url}
                            alt={img.name}
                            fill
                            sizes="130px"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div
                          style={{
                            padding: "6px 8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            backgroundColor: "#FBF9F5"
                          }}
                        >
                          <span
                            style={{
                              fontSize: "10px",
                              color: "#6B6760",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              maxWidth: "80px"
                            }}
                          >
                            {img.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeReferenceImage(idx)}
                            aria-label={`Remove reference image ${img.name}`}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: "2px",
                              color: "#C48B77",
                              display: "flex",
                              alignItems: "center"
                            }}
                          >
                            <IconTrash size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instant Reference Samples if User has no photos handy */}
              {referenceImages.length === 0 && (
                <div
                  style={{
                    padding: "12px 14px",
                    backgroundColor: "#F3F1EC",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#6B6760"
                  }}
                >
                  <span style={{ fontWeight: 600, color: "#1C1B1A" }}>
                    No photos on this device?
                  </span>{" "}
                  You can also paste an Instagram link or describe your vision in Step 1. Din will reference the studio catalog.
                </div>
              )}
            </div>
          )}

          {/* STEP 4: TIMEFRAME, CONTACT & DEPOSIT POLICY */}
          {step === 4 && (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Preferred Timeframe & Days */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#1C1B1A",
                    marginBottom: "8px"
                  }}
                >
                  When Are You Looking to Get Tattooed? *
                </label>
                <select
                  value={preferredMonth}
                  onChange={(e) => setPreferredMonth(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #D5CEBE",
                    backgroundColor: "#FFFFFF",
                    fontSize: "13px",
                    color: "#1C1B1A",
                    marginBottom: "10px"
                  }}
                >
                  <option value="Next Month (Recommended)">Next Month (Standard Booking Window)</option>
                  <option value="This Month (If cancellation spot opens)">This Month (Standby / Cancellation list)</option>
                  <option value="2 to 3 Months Out">2 to 3 Months Out (Special occasion / travel)</option>
                  <option value="Flexible / Whenever Din has an opening">Flexible / Any upcoming availability</option>
                </select>

                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#54504A",
                    marginBottom: "6px"
                  }}
                >
                  What Days Work Best for Your Appointment? *
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {daysOptions.map((day) => {
                    const isSelected = preferredDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          border: isSelected
                            ? "1px solid #506553"
                            : "1px solid #D5CEBE",
                          backgroundColor: isSelected
                            ? "#506553"
                            : "#FFFFFF",
                          color: isSelected ? "#FFFFFF" : "#54504A",
                          cursor: "pointer",
                          transition: "all 0.15s ease"
                        }}
                      >
                        {isSelected && <IconCheck size={12} color="#FFF" style={{ marginRight: "4px" }} />}
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#1C1B1A",
                    marginBottom: "8px"
                  }}
                >
                  Your Contact Information *
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px"
                  }}
                >
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Full Name *"
                    style={{
                      padding: "10px 12px",
                      borderRadius: "8px",
                      border: "1px solid #D5CEBE",
                      backgroundColor: "#FFFFFF",
                      fontSize: "13px"
                    }}
                  />
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="Email Address *"
                    style={{
                      padding: "10px 12px",
                      borderRadius: "8px",
                      border: "1px solid #D5CEBE",
                      backgroundColor: "#FFFFFF",
                      fontSize: "13px"
                    }}
                  />
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="Phone (SMS Reminders)"
                    style={{
                      padding: "10px 12px",
                      borderRadius: "8px",
                      border: "1px solid #D5CEBE",
                      backgroundColor: "#FFFFFF",
                      fontSize: "13px"
                    }}
                  />
                  <input
                    type="text"
                    value={clientIg}
                    onChange={(e) => setClientIg(e.target.value)}
                    placeholder="Instagram Handle (Optional)"
                    style={{
                      padding: "10px 12px",
                      borderRadius: "8px",
                      border: "1px solid #D5CEBE",
                      backgroundColor: "#FFFFFF",
                      fontSize: "13px"
                    }}
                  />
                </div>
              </div>

              {/* Din's Studio Policies & Deposit Acknowledgement */}
              <div
                style={{
                  padding: "14px 16px",
                  borderRadius: "10px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(80, 101, 83, 0.2)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.02)"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                    color: "#506553"
                  }}
                >
                  <IconShieldCheck size={18} />
                  <span style={{ fontSize: "13px", fontWeight: 600 }}>
                    Lucky Leaf Studio Booking Guidelines
                  </span>
                </div>
                <ul
                  style={{
                    margin: "0 0 12px 0",
                    paddingLeft: "18px",
                    fontSize: "12px",
                    color: "#54504A",
                    lineHeight: "1.6"
                  }}
                >
                  <li>
                    <strong>Non-Refundable Deposit:</strong> Secures your date and goes 100% toward your final tattoo total.
                  </li>
                  <li>
                    <strong>Custom Sketch:</strong> Emailed 3 to 5 days before your appointment date for collaboration.
                  </li>
                  <li>
                    <strong>Punctuality:</strong> Arriving &gt;20 minutes late without notice forfeits your deposit.
                  </li>
                  <li>
                    <strong>Rescheduling:</strong> At least 5 days notice required to transfer deposit to another day.
                  </li>
                </ul>

                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    cursor: "pointer",
                    fontSize: "12px",
                    color: "#1C1B1A",
                    fontWeight: 500,
                    paddingTop: "6px",
                    borderTop: "1px solid #EBE6DC"
                  }}
                >
                  <input
                    type="checkbox"
                    checked={agreedToPolicy}
                    onChange={(e) => setAgreedToPolicy(e.target.checked)}
                    style={{
                      marginTop: "2px",
                      accentColor: "#506553",
                      width: "16px",
                      height: "16px",
                      cursor: "pointer"
                    }}
                  />
                  <span>
                    I understand and agree to the 5-day rescheduling notice and deposit terms for my appointment at Lucky Leaf Tattoo.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "8px",
                  backgroundColor: agreedToPolicy ? "#506553" : "#8A9A8C",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  fontWeight: 600,
                  border: "none",
                  cursor: agreedToPolicy ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 4px 12px rgba(80, 101, 83, 0.25)",
                  transition: "background-color 0.2s ease"
                }}
              >
                {isSubmitting ? (
                  <span>Transmitting inquiry to Din...</span>
                ) : (
                  <>
                    <IconGinkgo size={18} color="#FFF" />
                    <span>Submit Inquiry & Request Session Date</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 5: SUCCESS STATE PASS */}
          {step === 5 && (
            <div
              style={{
                textAlign: "center",
                padding: "20px 8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(80, 101, 83, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#506553",
                  marginBottom: "16px"
                }}
              >
                <IconCheck size={32} />
              </div>

              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#506553",
                  fontWeight: 600
                }}
              >
                Inquiry Received • Lucky Leaf Tattoo
              </span>
              <h3
                style={{
                  margin: "8px 0 12px 0",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "#1C1B1A"
                }}
              >
                Thank You, {clientName.split(" ")[0] || "Friend"}!
              </h3>
              <p
                style={{
                  margin: "0 0 20px 0",
                  fontSize: "14px",
                  color: "#6B6760",
                  maxWidth: "460px",
                  lineHeight: "1.6"
                }}
              >
                Your tattoo inquiry has been delivered directly to Din Tran&apos;s Hertel Ave studio calendar queue.
              </p>

              {/* Digital Pass Ticket Card */}
              <div
                style={{
                  width: "100%",
                  maxWidth: "440px",
                  backgroundColor: "#FFFFFF",
                  border: "1px dashed rgba(80, 101, 83, 0.3)",
                  borderRadius: "12px",
                  padding: "18px 20px",
                  textAlign: "left",
                  marginBottom: "20px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.04)"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #EBE6DC",
                    paddingBottom: "10px",
                    marginBottom: "12px"
                  }}
                >
                  <span style={{ fontSize: "11px", color: "#8C867A" }}>
                    INQUIRY REFERENCE
                  </span>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontWeight: 700,
                      color: "#506553",
                      fontSize: "13px"
                    }}
                  >
                    {ticketId}
                  </span>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                    fontSize: "12px"
                  }}
                >
                  <div>
                    <span style={{ color: "#8C867A", display: "block" }}>Project</span>
                    <span style={{ fontWeight: 600, color: "#1C1B1A" }}>
                      {projectType === "flash" ? "1-of-1 Flash Claim" : "Custom Botanical"}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: "#8C867A", display: "block" }}>Placement</span>
                    <span style={{ fontWeight: 600, color: "#1C1B1A" }}>
                      {bodyPlacement || "To Discuss"}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: "#8C867A", display: "block" }}>Approx Size</span>
                    <span style={{ fontWeight: 600, color: "#1C1B1A" }}>
                      {sizeInches}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: "#8C867A", display: "block" }}>References</span>
                    <span style={{ fontWeight: 600, color: "#1C1B1A" }}>
                      {referenceImages.length} Attached
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "12px",
                    paddingTop: "10px",
                    borderTop: "1px solid #EBE6DC",
                    fontSize: "11px",
                    color: "#506553",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <IconCalendar size={14} />
                  <span>
                    Sketch review scheduled 3–5 days prior to your session date.
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                style={{
                  padding: "12px 28px",
                  borderRadius: "8px",
                  backgroundColor: "#506553",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: "13px",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Back to Lucky Leaf Studio
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer Controls (Steps 1 to 3) */}
        {step < 4 && (
          <div
            style={{
              padding: "16px 24px",
              backgroundColor: "#FFFFFF",
              borderTop: "1px solid rgba(80, 101, 83, 0.12)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => prev - 1)}
                style={{
                  padding: "10px 18px",
                  borderRadius: "8px",
                  border: "1px solid #D5CEBE",
                  backgroundColor: "#FFFFFF",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#54504A",
                  cursor: "pointer"
                }}
              >
                Back
              </button>
            ) : (
              <span style={{ fontSize: "12px", color: "#8C867A" }}>
                Step 1 of 4: Project Concept
              </span>
            )}

            <button
              type="button"
              onClick={handleNextStep}
              style={{
                padding: "10px 22px",
                borderRadius: "8px",
                backgroundColor: "#506553",
                color: "#FFFFFF",
                fontSize: "13px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <span>Continue</span>
              <IconSparkles size={14} color="#FFF" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
