"use client";

import React, { useEffect, useState } from "react";

interface AnalysisTransitionProps {
  onComplete: () => void;
  brandName?: string;
  isReady?: boolean;
}

const CHECKLIST_STEPS = [
  "Mempelajari model bisnis & alur operasional tim",
  "Memeriksa alur transaksi & kanal pemesanan pelanggan",
  "Mengisolasi titik kebocoran waktu & biaya operasional",
  "Konsultan AI Scalebiz mengevaluasi kebutuhan sistem...",
  "Menganalisis sistem & solusi yang paling relevan untuk bisnis Anda",
  "Selesai! Menyiapkan laporan rekomendasi khusus untuk Anda",
];

export default function AnalysisTransition({
  onComplete,
  brandName,
  isReady = false,
}: AnalysisTransitionProps) {
  const [completedSteps, setCompletedSteps] = useState<number>(0);

  useEffect(() => {
    const totalSteps = CHECKLIST_STEPS.length;
    // Langkah 0..3 berjalan bertahap (~1.6 detik)
    // Langkah 4 menunggu respon AI (isReady)
    // Langkah 5 selesai seketika
    const timer = setInterval(() => {
      setCompletedSteps((prev) => {
        if (prev < 4) {
          return prev + 1;
        } else if (prev === 4) {
          if (isReady) {
            return 5;
          }
          return 4; // Tunggu sinyal isReady dari AI
        } else if (prev === 5) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 6;
        }
        return prev;
      });
    }, 450);

    return () => clearInterval(timer);
  }, [isReady, onComplete]);

  const targetLabel = brandName?.trim() || "Bisnis Anda";
  const progressPercent = Math.min(
    100,
    Math.round((completedSteps / CHECKLIST_STEPS.length) * 100)
  );

  return (
    <div className="analysis-transition-card" role="status" aria-live="polite">
      <div className="analysis-transition-header">
        <div className="analysis-spinner-wrap">
          <div className="analysis-spinner" />
          <span className="analysis-pulse-dot" />
        </div>
        <h3 className="analysis-title">Menyiapkan Rekomendasi untuk {targetLabel}...</h3>
        <p className="analysis-subtitle">
          Scalebiz sedang mencocokkan alur operasional Anda dengan sistem digital yang paling masuk akal dan efisien.
        </p>
      </div>

      <div className="analysis-progress-bar-wrap">
        <div
          className="analysis-progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="analysis-checklist">
        {CHECKLIST_STEPS.map((text, idx) => {
          const isDone = idx < completedSteps;
          const isCurrent = idx === completedSteps;
          return (
            <div
              key={idx}
              className={`analysis-check-item ${
                isDone ? "done" : isCurrent ? "active" : "pending"
              }`}
            >
              <span className="check-status-icon">
                {isDone ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : isCurrent ? (
                  <span className="mini-spin-dot" />
                ) : (
                  <span className="circle-dot" />
                )}
              </span>
              <span className="check-status-text">{text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
