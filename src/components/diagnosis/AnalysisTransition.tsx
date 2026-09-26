"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface AnalysisTransitionProps {
  onComplete: () => void;
  brandName?: string;
  isReady?: boolean;
}

const CHECKLIST_STEPS_ID = [
  "Mempelajari model bisnis & alur operasional tim",
  "Memeriksa alur transaksi & kanal pemesanan pelanggan",
  "Mengisolasi titik kebocoran waktu & biaya operasional",
  "Konsultan AI Scalebiz mengevaluasi kebutuhan sistem...",
  "Menganalisis sistem & solusi yang paling relevan untuk bisnis Anda",
  "Selesai! Menyiapkan laporan rekomendasi khusus untuk Anda",
];

const CHECKLIST_STEPS_EN = [
  "Analyzing business model & operational workflows",
  "Evaluating transaction pipelines & customer ordering channels",
  "Isolating operational bottlenecks and financial leakages",
  "Scalebiz AI Consultant evaluating system requirements...",
  "Identifying optimal digital architecture tailored to your stage",
  "Complete! Compiling your custom architecture report",
];

export default function AnalysisTransition({
  onComplete,
  brandName,
  isReady = false,
}: AnalysisTransitionProps) {
  const { lang } = useLanguage();
  const isEn = lang === "en";
  const checklistSteps = isEn ? CHECKLIST_STEPS_EN : CHECKLIST_STEPS_ID;
  const [completedSteps, setCompletedSteps] = useState<number>(0);

  useEffect(() => {
    const totalSteps = checklistSteps.length;
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
  }, [isReady, onComplete, checklistSteps.length]);

  const targetLabel = brandName?.trim() || (isEn ? "Your Business" : "Bisnis Anda");
  const progressPercent = Math.min(
    100,
    Math.round((completedSteps / checklistSteps.length) * 100)
  );

  return (
    <div className="analysis-transition-card" role="status" aria-live="polite">
      <div className="analysis-transition-header">
        <div className="analysis-spinner-wrap">
          <div className="analysis-spinner" />
          <span className="analysis-pulse-dot" />
        </div>
        <h3 className="analysis-title">
          {isEn
            ? `Preparing System Blueprint for ${targetLabel}...`
            : `Menyiapkan Rekomendasi untuk ${targetLabel}...`}
        </h3>
        <p className="analysis-subtitle">
          {isEn
            ? "Scalebiz is matching your workflows with the most efficient and scalable digital architecture."
            : "Scalebiz sedang mencocokkan alur operasional Anda dengan sistem digital yang paling masuk akal dan efisien."}
        </p>
      </div>

      <div className="analysis-progress-bar-wrap">
        <div
          className="analysis-progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="analysis-checklist">
        {checklistSteps.map((text, idx) => {
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
