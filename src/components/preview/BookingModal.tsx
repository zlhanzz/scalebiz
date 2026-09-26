"use client";

import React, { useState, useEffect } from "react";
import { TRULY_ORGANIC_DATA, StylistMember } from "@/data/trulyOrganicData";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStylistId?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  selectedStylistId,
}: BookingModalProps) {
  const data = TRULY_ORGANIC_DATA;
  const [stylistId, setStylistId] = useState<string>(selectedStylistId || "adriana-bryer");
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientNotes, setClientNotes] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>("");

  useEffect(() => {
    if (selectedStylistId) {
      setStylistId(selectedStylistId);
    }
  }, [selectedStylistId]);

  const currentStylist = data.stylists.find((s) => s.id === stylistId) || data.stylists[0];

  useEffect(() => {
    if (currentStylist && currentStylist.servicesOffered.length > 0) {
      setSelectedService(currentStylist.servicesOffered[0]);
    }
  }, [stylistId, currentStylist]);

  // Generate next 6 days
  const upcomingDays = React.useMemo(() => {
    const days: { label: string; dateStr: string; dayName: string }[] = [];
    const today = new Date();
    for (let i = 1; i <= 6; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
      const monthDay = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      days.push({
        label: `${dayName}, ${monthDay}`,
        dateStr: d.toISOString().split("T")[0],
        dayName,
      });
    }
    return days;
  }, []);

  useEffect(() => {
    if (upcomingDays.length > 0 && !selectedDate) {
      setSelectedDate(upcomingDays[0].label);
    }
    if (!selectedTime) {
      setSelectedTime("11:30 AM");
    }
  }, [upcomingDays, selectedDate, selectedTime]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      alert("Please provide your name and phone number so the artist can confirm your appointment.");
      return;
    }
    const randomRef = `#TO-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(randomRef);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  const smsSummary = `Hi ${currentStylist.name}! I just submitted booking request ${bookingRef} on Truly Organic Hair Studio's web portal for ${selectedService} on ${selectedDate} at ${selectedTime}. Looking forward to confirming my chair!`;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        backgroundColor: "rgba(18, 26, 21, 0.75)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        overflowY: "auto",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "20px",
          maxWidth: "580px",
          width: "100%",
          padding: "28px",
          boxShadow: "0 25px 60px -15px rgba(22, 34, 27, 0.35)",
          border: "1px solid #E5E0D7",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          color: "#242E28",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close booking modal"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "#F7F5F0",
            border: "1px solid #E6E1D8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#5C6E62",
            fontSize: "18px",
          }}
        >
          ✕
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px", paddingRight: "40px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "#3A5A40",
                  backgroundColor: "#EBF2ED",
                  padding: "3px 10px",
                  borderRadius: "9999px",
                  marginBottom: "8px",
                }}
              >
                <span>Direct Studio Booking</span>
              </div>
              <h2
                style={{
                  margin: "0 0 4px",
                  fontFamily: "Georgia, serif",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#1F2B24",
                }}
              >
                Reserve Your Appointment
              </h2>
              <p style={{ margin: 0, fontSize: "13px", color: "#66786D" }}>
                Book with your dedicated beauty artisan at Truly Organic on Davison Rd.
              </p>
            </div>

            {/* Step 1: Stylist Selector */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "#44554B", marginBottom: "8px" }}>
                1. Select Beauty Artist
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  backgroundColor: "#F8F6F2",
                  border: "1px solid #E2DCD1",
                  borderRadius: "14px",
                  padding: "10px 14px",
                }}
              >
                <img
                  src={currentStylist.avatar}
                  alt={currentStylist.name}
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #547A5C",
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <select
                    value={stylistId}
                    onChange={(e) => setStylistId(e.target.value)}
                    style={{
                      width: "100%",
                      backgroundColor: "transparent",
                      border: "none",
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#1F2B24",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    {data.stylists.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} — {s.role}
                      </option>
                    ))}
                  </select>
                  <div style={{ fontSize: "12px", color: "#66786D" }}>
                    {currentStylist.specialties.slice(0, 2).join(" • ")}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Service Selection */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "#44554B", marginBottom: "8px" }}>
                2. Select Service
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {currentStylist.servicesOffered.map((srv, idx) => {
                  const isChosen = selectedService === srv;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedService(srv)}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: isChosen ? "1.5px solid #3A5A40" : "1px solid #E5E0D7",
                        backgroundColor: isChosen ? "#EBF2ED" : "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "18px",
                            height: "18px",
                            borderRadius: "50%",
                            border: isChosen ? "5px solid #3A5A40" : "2px solid #C4BCB1",
                            backgroundColor: "#FFFFFF",
                          }}
                        />
                        <span style={{ fontSize: "14px", fontWeight: isChosen ? 700 : 500, color: "#1F2B24" }}>
                          {srv}
                        </span>
                      </div>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "#3A5A40", textTransform: "uppercase" }}>
                        Custom Care
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Preferred Date & Time */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "#44554B", marginBottom: "8px" }}>
                3. Preferred Date &amp; Time Window
              </label>
              <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "6px", marginBottom: "12px" }}>
                {upcomingDays.map((day, idx) => {
                  const isDaySelected = selectedDate === day.label;
                  return (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setSelectedDate(day.label)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "10px",
                        border: isDaySelected ? "1.5px solid #3A5A40" : "1px solid #E5E0D7",
                        backgroundColor: isDaySelected ? "#3A5A40" : "#FFFFFF",
                        color: isDaySelected ? "#FFFFFF" : "#36453D",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {day.label}
                    </button>
                  );
                })}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                {["10:00 AM", "11:30 AM", "1:30 PM", "3:00 PM", "4:30 PM", "6:00 PM"].map((t, idx) => {
                  const isTimeSelected = selectedTime === t;
                  return (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setSelectedTime(t)}
                      style={{
                        padding: "8px",
                        borderRadius: "8px",
                        border: isTimeSelected ? "1.5px solid #3A5A40" : "1px solid #E5E0D7",
                        backgroundColor: isTimeSelected ? "#EBF2ED" : "#FFFFFF",
                        color: isTimeSelected ? "#2C4F35" : "#4A5D52",
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Contact Information */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "#44554B", marginBottom: "8px" }}>
                4. Your Contact Details
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: "1px solid #DCD6CB",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Cell Phone (for SMS) *"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: "1px solid #DCD6CB",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>
              <textarea
                placeholder="Special notes (e.g. hair history, previous color, or extension questions)..."
                rows={2}
                value={clientNotes}
                onChange={(e) => setClientNotes(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid #DCD6CB",
                  fontSize: "13px",
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
              />
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "#3A5A40",
                color: "#FFFFFF",
                border: "none",
                padding: "14px",
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 6px 18px rgba(58, 90, 64, 0.28)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <span>Confirm Appointment Request →</span>
            </button>

            <div style={{ marginTop: "12px", textAlign: "center", fontSize: "11px", color: "#7A8C81" }}>
              ✓ No prepayment required • Your artist will confirm via text within a few hours.
            </div>
          </form>
        ) : (
          /* Confirmation Receipt Screen */
          <div style={{ textAlign: "center", padding: "12px 6px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                backgroundColor: "#EAF5ED",
                color: "#2C5E38",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                fontSize: "26px",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2C5E38" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <span
              style={{
                backgroundColor: "#EBF2ED",
                color: "#3A5A40",
                fontSize: "11px",
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: "9999px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Booking Request Received
            </span>

            <h3
              style={{
                margin: "10px 0 6px",
                fontFamily: "Georgia, serif",
                fontSize: "26px",
                fontWeight: 700,
                color: "#1F2B24",
              }}
            >
              You&apos;re All Set, {clientName}!
            </h3>

            <p style={{ margin: "0 0 20px", fontSize: "14px", color: "#5C6E62", lineHeight: 1.5 }}>
              Your appointment request <strong>{bookingRef}</strong> has been transmitted directly to <strong>{currentStylist.name}</strong>.
            </p>

            {/* Receipt Summary Card */}
            <div
              style={{
                backgroundColor: "#F8F6F2",
                borderRadius: "16px",
                padding: "20px",
                border: "1px solid #E2DCD1",
                textAlign: "left",
                marginBottom: "24px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", paddingBottom: "14px", borderBottom: "1px solid #E6E0D5" }}>
                <img
                  src={currentStylist.avatar}
                  alt={currentStylist.name}
                  style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover" }}
                />
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "#1F2B24" }}>
                    {currentStylist.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "#66786D" }}>
                    {currentStylist.role} • Truly Organic Suites
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "13px" }}>
                <div>
                  <span style={{ color: "#7A8C81", display: "block", fontSize: "11px", textTransform: "uppercase" }}>Service</span>
                  <strong style={{ color: "#1F2B24" }}>{selectedService}</strong>
                </div>
                <div>
                  <span style={{ color: "#7A8C81", display: "block", fontSize: "11px", textTransform: "uppercase" }}>Scheduled Window</span>
                  <strong style={{ color: "#1F2B24" }}>{selectedDate} @ {selectedTime}</strong>
                </div>
                <div>
                  <span style={{ color: "#7A8C81", display: "block", fontSize: "11px", textTransform: "uppercase" }}>Location</span>
                  <strong style={{ color: "#1F2B24" }}>Davison Rd, Lockport NY</strong>
                </div>
                <div>
                  <span style={{ color: "#7A8C81", display: "block", fontSize: "11px", textTransform: "uppercase" }}>Contact Cell</span>
                  <strong style={{ color: "#1F2B24" }}>{clientPhone}</strong>
                </div>
              </div>
            </div>

            {/* Action buttons on receipt */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a
                href={`sms:${currentStylist.phone}?body=${encodeURIComponent(smsSummary)}`}
                style={{
                  backgroundColor: "#3A5A40",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  padding: "12px",
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <span>💬 Send Text Verification to {currentStylist.name}</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #DCD6CB",
                  color: "#5C6E62",
                  padding: "10px",
                  borderRadius: "10px",
                  fontWeight: 600,
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Done / Back to Studio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
