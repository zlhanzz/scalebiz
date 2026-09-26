"use client";

import React, { useState } from "react";

interface ClaimDemoBarProps {
  businessName: string;
  owners: string;
}

export default function ClaimDemoBar({ businessName, owners }: ClaimDemoBarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-[#121826] text-[#e5e7eb] px-4 py-2 rounded-full border border-[#2d3748] shadow-2xl text-xs font-semibold hover:border-[#60a5fa] transition-all flex items-center gap-2"
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          zIndex: 9999,
          background: "#111827",
          color: "#f3f4f6",
          padding: "10px 18px",
          borderRadius: "9999px",
          border: "1px solid #374151",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
          fontSize: "13px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        <span>⚡ Demo by Scalebiz</span>
      </button>
    );
  }

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "calc(100% - 32px)",
          maxWidth: "880px",
          zIndex: 9999,
          background: "rgba(17, 24, 39, 0.94)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(245, 158, 11, 0.4)",
          borderRadius: "16px",
          boxShadow: "0 20px 35px -10px rgba(0, 0, 0, 0.6), 0 0 20px rgba(245, 158, 11, 0.15)",
          padding: "14px 20px",
          color: "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 800,
              fontSize: "18px",
              flexShrink: 0,
            }}
          >
            ✦
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <span
                style={{
                  background: "rgba(245, 158, 11, 0.2)",
                  color: "#fbbf24",
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: "6px",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                Concept Prototype
              </span>
              <span style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff", whiteSpace: "nowrap" }}>
                Created for {businessName}
              </span>
            </div>
            <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#9ca3af", lineHeight: 1.3 }}>
              Ready to launch on your custom domain for a flat <strong>$399</strong>. Turn visitors into loyal bookings.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <button
            onClick={() => setShowModal(true)}
            style={{
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              color: "#ffffff",
              border: "none",
              padding: "10px 18px",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(245, 158, 11, 0.35)",
              whiteSpace: "nowrap",
              transition: "transform 0.15s ease",
            }}
          >
            Claim This Website →
          </button>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Dismiss banner"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "none",
              color: "#9ca3af",
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#111827",
              border: "1px solid #374151",
              borderRadius: "20px",
              maxWidth: "520px",
              width: "100%",
              padding: "28px",
              color: "#f3f4f6",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div>
                <span style={{ color: "#fbbf24", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>
                  Official Launch Package
                </span>
                <h3 style={{ margin: "4px 0 0", fontSize: "22px", fontWeight: 800, color: "#ffffff" }}>
                  Claim {businessName}
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#9ca3af",
                  fontSize: "20px",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: "14px", color: "#d1d5db", lineHeight: 1.5, marginBottom: "20px" }}>
              Hi {owners}! This interactive website was custom-crafted to showcase your salon artistry, make mobile booking effortless, and turn local Lockport clients into repeat bookings.
            </p>

            <div style={{ background: "#1f2937", borderRadius: "12px", padding: "16px", marginBottom: "20px" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#fbbf24", marginBottom: "8px" }}>
                What&apos;s Included for $399 (Flat Fee, No Subscriptions):
              </div>
              <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "13px", color: "#e5e7eb", lineHeight: 1.6 }}>
                <li>Custom <strong>.com</strong> domain connected &amp; 1st year included</li>
                <li>Lightning-fast, mobile-optimized design with SSL security</li>
                <li>Direct 1-tap call, text SMS, directions, and direct booking buttons</li>
                <li>Full artist directory updates with your team and service menu</li>
                <li>Google Business Profile website link integration</li>
                <li>Zero monthly builder fees (unlike Wix/Squarespace $25/mo)</li>
              </ul>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a
                href={`https://wa.me/6281527080656?text=${encodeURIComponent(`Hi Zhull, I would like to claim the website prototype for ${businessName}!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#25D366",
                  color: "#ffffff",
                  textDecoration: "none",
                  padding: "12px 18px",
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "14px",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <span>💬 Chat on WhatsApp (+62 815-2708-0656)</span>
              </a>

              <a
                href={`mailto:contact@scalebiz.web.id?subject=${encodeURIComponent(`Claim Website - ${businessName}`)}&body=${encodeURIComponent(`Hi Zhull, I'm interested in claiming the website prototype for ${businessName}.`)}`}
                style={{
                  background: "#374151",
                  color: "#ffffff",
                  textDecoration: "none",
                  padding: "12px 18px",
                  borderRadius: "10px",
                  fontWeight: 600,
                  fontSize: "14px",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <span>✉️ Email Us (contact@scalebiz.web.id)</span>
              </a>
            </div>

            <div style={{ marginTop: "14px", textAlign: "center", fontSize: "11px", color: "#6b7280" }}>
              50% to initiate build • 50% upon final launch satisfaction
            </div>
          </div>
        </div>
      )}
    </>
  );
}
