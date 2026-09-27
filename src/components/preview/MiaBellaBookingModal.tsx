"use client";

import React, { useState, useEffect } from "react";
import { MIA_BELLA_DATA, ServiceItem } from "@/data/miaBellaData";
import {
  IconMoon,
  IconSparkles,
  IconCalendar,
  IconClock,
  IconCheck,
  IconX,
  IconScissors,
  IconPhone,
} from "./MiaBellaIcons";
import { HairAlchemyResultData } from "./HairAlchemyQuizModal";

interface MiaBellaBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: HairAlchemyResultData | null;
  defaultServiceId?: string | null;
}

export default function MiaBellaBookingModal({
  isOpen,
  onClose,
  initialData,
  defaultServiceId,
}: MiaBellaBookingModalProps) {
  const [step, setStep] = useState<number>(initialData ? 3 : 1);
  const [selectedService, setSelectedService] = useState<string>(
    defaultServiceId || "vivid-electric-blue"
  );
  const [hairHistory, setHairHistory] = useState<string>(
    initialData ? `Canvas: ${initialData.canvas} | Length: ${initialData.hairLength}` : "Virgin hair or professional salon dye only"
  );
  const [preferredDay, setPreferredDay] = useState<string>("Friday");
  const [preferredTime, setPreferredTime] = useState<string>("2:00 PM (Afternoon)");
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [inspoNotes, setInspoNotes] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [ticketId, setTicketId] = useState<string>("");
  const [submittedAt, setSubmittedAt] = useState<string>("");

  useEffect(() => {
    if (initialData) {
      setStep(3);
      if (initialData.desiredStyle) {
        setSelectedService(initialData.desiredStyle);
      }
      setHairHistory(
        `Starting Canvas: ${initialData.canvas} • Length: ${initialData.hairLength} • Density: ${initialData.hairDensity}`
      );
    } else if (defaultServiceId) {
      setSelectedService(defaultServiceId);
      setStep(1);
    }
  }, [initialData, defaultServiceId]);

  if (!isOpen) return null;

  const currentServiceObj =
    MIA_BELLA_DATA.services.find((s) => s.id === selectedService) ||
    MIA_BELLA_DATA.services[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      alert("Please provide your Name and Phone Number to schedule your chair time.");
      return;
    }

    const random = Math.floor(1000 + Math.random() * 9000);
    const newId = `#MB-RITUAL-${random}`;
    const now = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    setTicketId(newId);
    setSubmittedAt(now);
    setIsSubmitted(true);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setTicketId("");
    setStep(1);
    onClose();
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
          maxWidth: "760px",
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
        <style>{`
          @keyframes mbFadeIn {
            from { opacity: 0; transform: scale(0.97) translateY(8px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          .mb-input {
            width: 100%;
            padding: 12px 14px;
            border-radius: 10px;
            border: 1.5px solid rgba(212, 175, 55, 0.3);
            background: rgba(15, 11, 21, 0.85);
            color: #FFFFFF;
            font-size: 13.5px;
            outline: none;
            box-sizing: border-box;
            transition: all 0.15s ease;
          }
          .mb-input:focus {
            border-color: #D4AF37;
            box-shadow: 0 0 12px rgba(212, 175, 55, 0.3);
          }
          .mb-step-indicator {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 12.5px;
            font-weight: 700;
            color: #8C8476;
          }
          .mb-step-indicator.active {
            color: #D4AF37;
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
              <IconScissors size={22} color="#E6C875" />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "1.2px", color: "#D4AF37", textTransform: "uppercase" }}>
                  Official Digital Booking
                </span>
                <span style={{ backgroundColor: "rgba(212, 175, 55, 0.15)", color: "#E6C875", fontSize: "10.5px", fontWeight: 700, padding: "2px 8px", borderRadius: "99px" }}>
                  Lockport, NY
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
                Schedule Your Hair Alchemy Appointment
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

        {/* STEP PROGRESS BAR */}
        {!isSubmitted && (
          <div
            style={{
              backgroundColor: "rgba(15, 11, 21, 0.6)",
              padding: "12px 24px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className={`mb-step-indicator ${step >= 1 ? "active" : ""}`}>
              <span>1. Hair Service</span>
            </div>
            <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>&gt;</span>
            <div className={`mb-step-indicator ${step >= 2 ? "active" : ""}`}>
              <span>2. Canvas &amp; Inspo</span>
            </div>
            <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>&gt;</span>
            <div className={`mb-step-indicator ${step >= 3 ? "active" : ""}`}>
              <span>3. Chair Time &amp; Guest</span>
            </div>
          </div>
        )}

        {/* BODY */}
        <div style={{ padding: "24px" }}>
          {!isSubmitted ? (
            <div>
              {/* IF OPENED FROM QUIZ: SHOW PREFILLED SPECS BANNER */}
              {initialData && (
                <div
                  style={{
                    backgroundColor: "rgba(212, 175, 55, 0.12)",
                    border: "1.5px solid #D4AF37",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <IconSparkles size={20} color="#E6C875" />
                  <div style={{ fontSize: "12.5px", color: "#F5F2EB", lineHeight: 1.5 }}>
                    <strong style={{ color: "#FFF9E6" }}>Hair Alchemy Calculator Specs Loaded: </strong>
                    {currentServiceObj.name} • {initialData.hairLength} • {initialData.hairDensity} ({initialData.estimatedPrice}). Choose your preferred time below to dispatch directly to the salon queue.
                  </div>
                </div>
              )}

              {/* STEP 1: Select Service */}
              {step === 1 && (
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#E6C875", margin: "0 0 14px", fontFamily: "'Playfair Display', Georgia, serif" }}>
                    Select Your Service Transformation:
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px", marginBottom: "24px" }}>
                    {MIA_BELLA_DATA.services.map((svc) => (
                      <div
                        key={svc.id}
                        onClick={() => setSelectedService(svc.id)}
                        style={{
                          cursor: "pointer",
                          padding: "14px 16px",
                          borderRadius: "12px",
                          border: selectedService === svc.id ? "1.5px solid #D4AF37" : "1px solid rgba(255, 255, 255, 0.1)",
                          backgroundColor: selectedService === svc.id ? "rgba(212, 175, 55, 0.1)" : "rgba(255, 255, 255, 0.03)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                            <strong style={{ color: "#FFFFFF", fontSize: "14px" }}>{svc.name}</strong>
                            {svc.popular && (
                              <span style={{ backgroundColor: "#D4AF37", color: "#0E0B12", fontSize: "10px", fontWeight: 800, padding: "2px 6px", borderRadius: "99px" }}>
                                POPULAR
                              </span>
                            )}
                          </div>
                          <p style={{ margin: 0, fontSize: "12px", color: "#A89F91", lineHeight: 1.4 }}>
                            {svc.description}
                          </p>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div style={{ color: "#D4AF37", fontWeight: 800, fontSize: "14.5px" }}>{svc.price}</div>
                          <div style={{ fontSize: "11px", color: "#8E8679" }}>{svc.duration}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      style={{
                        backgroundColor: "#D4AF37",
                        color: "#0F0B15",
                        border: "none",
                        padding: "12px 24px",
                        borderRadius: "10px",
                        fontSize: "13.5px",
                        fontWeight: 800,
                        cursor: "pointer",
                      }}
                    >
                      Next: Hair Canvas &amp; Inspo &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Hair Canvas & History */}
              {step === 2 && (
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#E6C875", margin: "0 0 14px", fontFamily: "'Playfair Display', Georgia, serif" }}>
                    Hair History &amp; Chemistry Readiness:
                  </h3>
                  <p style={{ fontSize: "13px", color: "#C5BDB0", margin: "0 0 16px", lineHeight: 1.5 }}>
                    Because vivid colors and high-lift blonding require tailored chemical precision, letting us know your hair background guarantees pristine results and zero breakage.
                  </p>

                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#E6C875", marginBottom: "8px" }}>
                      Chemical History (Past 2–3 Years):
                    </label>
                    <select
                      className="mb-input"
                      value={hairHistory}
                      onChange={(e) => setHairHistory(e.target.value)}
                    >
                      <option value="Virgin hair or professional salon dye only">Virgin hair or professional salon dye only</option>
                      <option value="Previously bleached / balayage (Ends are lightened)">Previously bleached / balayage (Ends are lightened)</option>
                      <option value="Box dyed dark brown or black within last 12 months">Box dyed dark brown or black within last 12 months</option>
                      <option value="Red / Henna / Metallic dye history">Red / Henna / Metallic dye history</option>
                      <option value="Chemical relaxer or keratin treated">Chemical relaxer or keratin treated</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#E6C875", marginBottom: "8px" }}>
                      Dream Vibe / Inspo Notes (e.g. Sapphire roots into cobalt tips):
                    </label>
                    <textarea
                      className="mb-input"
                      rows={3}
                      placeholder="e.g. I want an electric cobalt with darker sapphire roots like the photo on your website! My hair is shoulder length."
                      value={inspoNotes}
                      onChange={(e) => setInspoNotes(e.target.value)}
                    ></textarea>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      style={{
                        backgroundColor: "transparent",
                        color: "#C5BDB0",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        padding: "12px 18px",
                        borderRadius: "10px",
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      &larr; Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      style={{
                        backgroundColor: "#D4AF37",
                        color: "#0F0B15",
                        border: "none",
                        padding: "12px 24px",
                        borderRadius: "10px",
                        fontSize: "13.5px",
                        fontWeight: 800,
                        cursor: "pointer",
                      }}
                    >
                      Next: Preferred Day &amp; Time &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Date, Time & Contact */}
              {step === 3 && (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#E6C875", margin: "0 0 14px", fontFamily: "'Playfair Display', Georgia, serif" }}>
                    Select Preferred Appointment Window &amp; Contact:
                  </h3>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#E6C875", marginBottom: "6px" }}>
                        Preferred Day of Week:
                      </label>
                      <select
                        className="mb-input"
                        value={preferredDay}
                        onChange={(e) => setPreferredDay(e.target.value)}
                      >
                        <option value="Tuesday">Tuesday (12:00 PM – 8:00 PM)</option>
                        <option value="Thursday">Thursday (12:00 PM – 8:00 PM)</option>
                        <option value="Friday">Friday (12:00 PM – 8:00 PM)</option>
                        <option value="Saturday">Saturday (12:00 PM – 8:00 PM)</option>
                        <option value="Sunday">Sunday (By Appointment)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#E6C875", marginBottom: "6px" }}>
                        Preferred Arrival Window:
                      </label>
                      <select
                        className="mb-input"
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                      >
                        <option value="12:00 PM (Opening Slot)">12:00 PM (Opening Slot)</option>
                        <option value="2:00 PM (Afternoon)">2:00 PM (Afternoon)</option>
                        <option value="4:30 PM (Late Afternoon)">4:30 PM (Late Afternoon)</option>
                        <option value="6:00 PM (Evening Chair)">6:00 PM (Evening Chair)</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#E6C875", marginBottom: "6px" }}>
                        Your Full Name: *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vanessa Monroe"
                        className="mb-input"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#E6C875", marginBottom: "6px" }}>
                        Mobile Phone (For Booking SMS Confirmation): *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(716) 555-0199"
                        className="mb-input"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#E6C875", marginBottom: "6px" }}>
                      Email (For Digital Chair Ticket &amp; Formulation Preparation):
                    </label>
                    <input
                      type="email"
                      placeholder="vanessa@example.com"
                      className="mb-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {/* Summary Box */}
                  <div
                    style={{
                      backgroundColor: "rgba(212, 175, 55, 0.08)",
                      border: "1px solid rgba(212, 175, 55, 0.3)",
                      borderRadius: "12px",
                      padding: "14px 16px",
                      fontSize: "12.5px",
                      color: "#E2DDD3",
                      marginBottom: "20px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span>Selected Transformation:</span>
                      <strong style={{ color: "#FFF9E6" }}>{currentServiceObj.name}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span>Estimated Investment:</span>
                      <strong style={{ color: "#D4AF37" }}>{initialData ? initialData.estimatedPrice : currentServiceObj.price}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Location:</span>
                      <strong style={{ color: "#FFF9E6" }}>Lockport, NY (Near Davison Rd / Transit)</strong>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      style={{
                        backgroundColor: "transparent",
                        color: "#C5BDB0",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        padding: "12px 18px",
                        borderRadius: "10px",
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      &larr; Back
                    </button>

                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#D4AF37",
                        backgroundImage: "linear-gradient(135deg, #E5C378, #C49826)",
                        color: "#0F0B15",
                        border: "none",
                        padding: "13px 28px",
                        borderRadius: "10px",
                        fontSize: "14px",
                        fontWeight: 800,
                        cursor: "pointer",
                        boxShadow: "0 6px 20px rgba(212, 175, 55, 0.35)",
                      }}
                    >
                      Confirm &amp; Dispatch Chair Reservation &rarr;
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* CONFIRMATION SCREEN */
            <div style={{ textAlign: "center", padding: "10px 0" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(212, 175, 55, 0.15)",
                  border: "2px solid #D4AF37",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  color: "#D4AF37",
                }}
              >
                <IconCheck size={32} color="#D4AF37" />
              </div>

              <div style={{ display: "inline-block", backgroundColor: "rgba(212, 175, 55, 0.2)", color: "#E6C875", fontSize: "11px", fontWeight: 800, letterSpacing: "1px", padding: "4px 12px", borderRadius: "99px", marginBottom: "8px" }}>
                CHAIR RESERVATION QUEUED
              </div>

              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "22px", color: "#FFFFFF", margin: "0 0 6px" }}>
                Appointment Ticket {ticketId}
              </h3>
              <p style={{ fontSize: "13px", color: "#A89F91", margin: "0 0 20px" }}>
                Generated on {submittedAt} • Mia Bella Salon &amp; Magick Boutique
              </p>

              {/* TICKET RECEIPT */}
              <div
                style={{
                  backgroundColor: "rgba(15, 11, 21, 0.9)",
                  border: "1.5px solid rgba(212, 175, 55, 0.3)",
                  borderRadius: "16px",
                  padding: "20px",
                  textAlign: "left",
                  fontSize: "13px",
                  color: "#E2DDD3",
                  marginBottom: "20px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "10px", marginBottom: "10px" }}>
                  <span style={{ color: "#8E8679" }}>Guest Name:</span>
                  <strong style={{ color: "#FFFFFF" }}>{fullName}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "10px", marginBottom: "10px" }}>
                  <span style={{ color: "#8E8679" }}>Phone Contact:</span>
                  <strong style={{ color: "#D4AF37" }}>{phone}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "10px", marginBottom: "10px" }}>
                  <span style={{ color: "#8E8679" }}>Scheduled Service:</span>
                  <strong style={{ color: "#FFF9E6" }}>{currentServiceObj.name}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "10px", marginBottom: "10px" }}>
                  <span style={{ color: "#8E8679" }}>Target Window:</span>
                  <strong style={{ color: "#FFFFFF" }}>{preferredDay} @ {preferredTime}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#8E8679" }}>Estimated Range:</span>
                  <strong style={{ color: "#D4AF37", fontSize: "14.5px" }}>
                    {initialData ? initialData.estimatedPrice : currentServiceObj.price}
                  </strong>
                </div>
              </div>

              {/* WHAT HAPPENS NEXT */}
              <div
                style={{
                  backgroundColor: "rgba(212, 175, 55, 0.06)",
                  border: "1px solid rgba(212, 175, 55, 0.2)",
                  borderRadius: "12px",
                  padding: "16px",
                  textAlign: "left",
                  fontSize: "12.5px",
                  color: "#C5BDB0",
                  marginBottom: "24px",
                  lineHeight: 1.6,
                }}
              >
                <strong style={{ color: "#FFF9E6", display: "block", marginBottom: "6px" }}>What Happens Next:</strong>
                1. Your chair reservation has been logged into the salon queue.<br />
                2. Mia Bella reviews your hair history notes to prepare custom pigments.<br />
                3. You will receive an SMS reminder on <strong>{phone}</strong> confirming your chair opening.
              </div>

              {/* ACTION BUTTONS */}
              <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={handlePrint}
                  style={{
                    backgroundColor: "transparent",
                    color: "#D4AF37",
                    border: "1.5px solid #D4AF37",
                    padding: "12px 20px",
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Print / Save Receipt
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    backgroundColor: "#D4AF37",
                    color: "#0F0B15",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "10px",
                    fontWeight: 800,
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  Done • Return to Salon
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
