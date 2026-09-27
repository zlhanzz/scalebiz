"use client";

import React, { useState } from "react";
import { TOTAL_FENCE_DATA } from "@/data/totalFenceData";
import { EstimateSpecs } from "./FenceCostEstimatorModal";
import {
  IconClose,
  IconCheck,
  IconFence,
  IconMapPin,
  IconShieldCheck,
  IconArrowRight,
  IconClock
} from "./FenceIcons";

interface TotalFenceQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledSpecs?: EstimateSpecs | null;
}

export default function TotalFenceQuoteModal({
  isOpen,
  onClose,
  prefilledSpecs
}: TotalFenceQuoteModalProps) {
  // If prefilled specs are provided, jump directly to Step 2/3
  const [step, setStep] = useState<number>(prefilledSpecs ? 2 : 1);
  const [propertyType, setPropertyType] = useState<string>("Residential Single-Family");
  const [hasPool, setHasPool] = useState<boolean>(false);
  const [urgentNeed, setUrgentNeed] = useState<string>("Standard Spring/Summer Route (1-2 Weeks)");
  
  // Contact state
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [cityTown, setCityTown] = useState<string>("Niagara Falls");
  const [notes, setNotes] = useState<string>("");

  const [confirmedTicket, setConfirmedTicket] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const ticketId = `TF-WNY-${randomNum}`;
    setConfirmedTicket(ticketId);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
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
          maxWidth: "720px",
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
              <IconFence size={22} color="#FFFFFF" />
            </div>
            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>
                On-Site Laser Measure & Consultation Desk
              </h2>
              <p style={{ fontSize: "0.85rem", margin: 0, color: "#BFDBFE" }}>
                Total Fence • Serving Buffalo, Niagara Falls & Western New York
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

        {/* Prefilled Banner if came from Estimator */}
        {prefilledSpecs && !confirmedTicket && (
          <div
            style={{
              backgroundColor: "#ECFDF5",
              borderBottom: "1px solid #A7F3D0",
              padding: "12px 24px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
          >
            <IconCheck size={18} color="#059669" />
            <div style={{ fontSize: "0.85rem", color: "#065F46" }}>
              <strong>Cost Estimator Specs Attached:</strong> {prefilledSpecs.materialName} • {prefilledSpecs.linearFeet} ft ({prefilledSpecs.height}) • Est: ${prefilledSpecs.minCost.toLocaleString()} - ${prefilledSpecs.maxCost.toLocaleString()}
            </div>
          </div>
        )}

        {/* Content */}
        <div style={{ padding: "24px" }}>
          {!confirmedTicket ? (
            <form onSubmit={handleSubmit}>
              {/* Step indicator */}
              <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
                {[1, 2, 3].map(s => (
                  <div
                    key={s}
                    style={{
                      flex: 1,
                      height: "4px",
                      borderRadius: "2px",
                      backgroundColor: step >= s ? "#0D3594" : "#E2E8F0",
                      transition: "background-color 0.3s"
                    }}
                  />
                ))}
              </div>

              {step === 1 && (
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "14px" }}>
                    Step 1: Property & Backyard Type
                  </h3>

                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                      Property Classification:
                    </label>
                    <select
                      value={propertyType}
                      onChange={e => setPropertyType(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid #CBD5E1",
                        fontSize: "0.9rem"
                      }}
                    >
                      <option value="Residential Single-Family">Residential Single-Family Home</option>
                      <option value="Residential Corner Lot">Residential Corner Lot (Double Frontage)</option>
                      <option value="Commercial Business / Industrial">Commercial Business / Industrial Lot</option>
                      <option value="HOA / Townhome Complex">HOA / Townhome Complex</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "12px 14px",
                        borderRadius: "8px",
                        backgroundColor: hasPool ? "#EFF6FF" : "#F8FAFC",
                        border: hasPool ? "1px solid #3B82F6" : "1px solid #E2E8F0",
                        cursor: "pointer"
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={hasPool}
                        onChange={e => setHasPool(e.target.checked)}
                        style={{ width: "18px", height: "18px", accentColor: "#0D3594" }}
                      />
                      <div>
                        <span style={{ fontSize: "0.88rem", fontWeight: 700 }}>
                          This fence encloses an In-Ground or Above-Ground Pool
                        </span>
                        <p style={{ margin: "2px 0 0 0", fontSize: "0.75rem", color: "#64748B" }}>
                          Total Fence will engineer self-closing, self-latching gates compliant with NYS Uniform Fire Prevention & Building Code.
                        </p>
                      </div>
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    style={{
                      width: "100%",
                      backgroundColor: "#0D3594",
                      color: "#FFFFFF",
                      padding: "12px",
                      borderRadius: "8px",
                      border: "none",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px"
                    }}
                  >
                    <span>Next: Select Timeline</span>
                    <IconArrowRight size={16} />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "14px" }}>
                    Step 2: Installation Urgency & Timing
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                    {[
                      {
                        title: "Urgent Priority (Under 7 Days)",
                        desc: "New dog arrival, pool inspection deadline, or storm fence emergency."
                      },
                      {
                        title: "Standard Spring/Summer Route (1-2 Weeks)",
                        desc: "Ideal seasonal installation scheduled with local crew."
                      },
                      {
                        title: "Flexible Planning (Within 30-60 Days)",
                        desc: "Planning upcoming landscape or home renovation project."
                      }
                    ].map(opt => (
                      <div
                        key={opt.title}
                        onClick={() => setUrgentNeed(opt.title)}
                        style={{
                          padding: "14px",
                          borderRadius: "10px",
                          border: urgentNeed === opt.title ? "2px solid #0D3594" : "1px solid #E2E8F0",
                          backgroundColor: urgentNeed === opt.title ? "#EFF6FF" : "#F8FAFC",
                          cursor: "pointer"
                        }}
                      >
                        <div style={{ fontWeight: 700, fontSize: "0.9rem", color: urgentNeed === opt.title ? "#0D3594" : "#1E293B" }}>
                          {opt.title}
                        </div>
                        <div style={{ fontSize: "0.78rem", color: "#64748B", marginTop: "2px" }}>
                          {opt.desc}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      style={{
                        flex: 1,
                        backgroundColor: "#F1F5F9",
                        color: "#475569",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "none",
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      style={{
                        flex: 2,
                        backgroundColor: "#0D3594",
                        color: "#FFFFFF",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "none",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px"
                      }}
                    >
                      <span>Next: Address & Contact</span>
                      <IconArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "14px" }}>
                    Step 3: Property Address & Dispatch Contact
                  </h3>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Smith"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "0.88rem" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(716) 555-0199"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "0.88rem" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "12px", marginBottom: "12px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
                        Street Address *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 1420 Pine Ave"
                        value={streetAddress}
                        onChange={e => setStreetAddress(e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "0.88rem" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
                        WNY Town *
                      </label>
                      <select
                        value={cityTown}
                        onChange={e => setCityTown(e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "0.88rem" }}
                      >
                        {TOTAL_FENCE_DATA.serviceAreas.map(town => (
                          <option key={town} value={town}>{town}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
                      Email Address (To receive PDF site plan & quote)
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "0.88rem" }}
                    />
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
                      Gate Location or Yard Access Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Sloped yard near driveway, locked back gate code, dog on premises."
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "0.88rem" }}
                    ></textarea>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      style={{
                        flex: 1,
                        backgroundColor: "#F1F5F9",
                        color: "#475569",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "none",
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      style={{
                        flex: 2,
                        backgroundColor: "#059669",
                        color: "#FFFFFF",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "none",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px"
                      }}
                    >
                      <span>Confirm Laser Measure Dispatch</span>
                      <IconCheck size={16} />
                    </button>
                  </div>
                </div>
              )}
            </form>
          ) : (
            /* Ticket Confirmation View */
            <div style={{ textAlign: "center", padding: "12px 0" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: "#D1FAE5",
                  color: "#059669",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px auto"
                }}
              >
                <IconCheck size={32} />
              </div>

              <div
                style={{
                  display: "inline-block",
                  backgroundColor: "#EFF6FF",
                  border: "1px solid #BFDBFE",
                  color: "#1E40AF",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  padding: "6px 18px",
                  borderRadius: "20px",
                  marginBottom: "12px"
                }}
              >
                {confirmedTicket}
              </div>

              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0F172A", margin: "0 0 6px 0" }}>
                Laser Measure Dispatch Queued!
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#475569", maxWidth: "480px", margin: "0 auto 20px auto" }}>
                Thank you, <strong>{fullName || "Valued Homeowner"}</strong>. Our field estimator has received your site specifications for <strong>{streetAddress || cityTown}</strong>.
              </p>

              {/* Ticket Details Card */}
              <div
                style={{
                  backgroundColor: "#F8FAFC",
                  border: "1px dashed #CBD5E1",
                  borderRadius: "12px",
                  padding: "16px 20px",
                  textAlign: "left",
                  marginBottom: "20px",
                  fontSize: "0.85rem"
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>
                    <span style={{ color: "#64748B" }}>Property Address:</span>
                    <div style={{ fontWeight: 700, color: "#0F172A" }}>{streetAddress}, {cityTown} NY</div>
                  </div>
                  <div>
                    <span style={{ color: "#64748B" }}>Contact Cell:</span>
                    <div style={{ fontWeight: 700, color: "#0F172A" }}>{phone || TOTAL_FENCE_DATA.phone}</div>
                  </div>
                  <div>
                    <span style={{ color: "#64748B" }}>Target Material:</span>
                    <div style={{ fontWeight: 700, color: "#0D3594" }}>{prefilledSpecs?.materialName || "Vinyl / Chain Link"}</div>
                  </div>
                  <div>
                    <span style={{ color: "#64748B" }}>Footage & Budget Range:</span>
                    <div style={{ fontWeight: 700, color: "#059669" }}>
                      {prefilledSpecs ? `${prefilledSpecs.linearFeet} ft ($${prefilledSpecs.minCost.toLocaleString()} - $${prefilledSpecs.maxCost.toLocaleString()})` : "To Be Laser Measured"}
                    </div>
                  </div>
                </div>
              </div>

              {/* What happens next */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  backgroundColor: "#FEF3C7",
                  border: "1px solid #FDE68A",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  textAlign: "left",
                  marginBottom: "20px"
                }}
              >
                <IconClock size={20} color="#B45309" />
                <div style={{ fontSize: "0.82rem", color: "#92400E" }}>
                  <strong>Next Step:</strong> You will receive an automated text confirming our technician&apos;s arrival window. You do not need to stay on phone hold.
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                <button
                  type="button"
                  onClick={handlePrint}
                  style={{
                    backgroundColor: "#F1F5F9",
                    color: "#334155",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    border: "1px solid #CBD5E1",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  Print / Save Ticket
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    backgroundColor: "#0D3594",
                    color: "#FFFFFF",
                    padding: "10px 22px",
                    borderRadius: "8px",
                    border: "none",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  Return to Website
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
