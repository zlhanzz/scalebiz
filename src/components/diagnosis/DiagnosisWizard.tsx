"use client";

import React, { useState, useEffect } from "react";
import { DiagnosisState, DiagnosticResult } from "@/types/diagnosis";
import { runBusinessDiagnosis } from "@/lib/recommendationEngine";
import { useLanguage } from "@/context/LanguageContext";
import DiagnosisStepView from "./DiagnosisStepView";
import AnalysisTransition from "./AnalysisTransition";
import DiagnosisResultView from "./DiagnosisResultView";

const TOTAL_STEPS = 4;

const STEP_LABELS_ID = [
  { num: 1, label: "Bisnis", short: "01 Bisnis" },
  { num: 2, label: "Kendala", short: "02 Kendala" },
  { num: 3, label: "Alur Transaksi", short: "03 Alur" },
  { num: 4, label: "Skala & Profil", short: "04 Skala" },
];

const STEP_LABELS_EN = [
  { num: 1, label: "Business", short: "01 Business" },
  { num: 2, label: "Bottlenecks", short: "02 Bottlenecks" },
  { num: 3, label: "Transaction Flow", short: "03 Flow" },
  { num: 4, label: "Scale & Profile", short: "04 Scale" },
];

const INITIAL_STATE: DiagnosisState = {
  businessType: null,
  customBusinessType: "",
  conditionalAnswers: {},
  painPoints: [],
  customPainPoint: "",
  customerFlow: [],
  orderProcessing: [],
  digitalMaturity: null,
  currentTools: [],
  customTool: "",
  goals: [],
  businessScale: null,
  companyName: "",
  companyWebsite: "",
};

const STORAGE_KEY = "scalebiz_diagnosis_state_v1";

export default function DiagnosisWizard() {
  const { lang } = useLanguage();
  const stepLabels = lang === "en" ? STEP_LABELS_EN : STEP_LABELS_ID;
  const [state, setState] = useState<DiagnosisState>(INITIAL_STATE);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isAnalysisReady, setIsAnalysisReady] = useState<boolean>(false);
  const [pendingResult, setPendingResult] = useState<DiagnosticResult | null>(null);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Restore State from sessionStorage on Mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          // Normalize orderProcessing to array if stored as string from old session
          if (parsed.orderProcessing && !Array.isArray(parsed.orderProcessing)) {
            parsed.orderProcessing = [parsed.orderProcessing];
          } else if (!parsed.orderProcessing) {
            parsed.orderProcessing = [];
          }
          setState((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

  // Save State to sessionStorage on Change
  const updateState = (updates: Partial<DiagnosisState>) => {
    setValidationError(null);
    setState((prev) => {
      const next = { ...prev, ...updates };
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  };

  const scrollToTopSection = () => {
    const el = document.getElementById("diagnosa-sistem");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Validasi Langkah Sebelum Pindah ke Langkah Berikutnya
  const validateStep = (step: number): boolean => {
    const isEn = lang === "en";
    switch (step) {
      case 1:
        if (!state.businessType) {
          setValidationError(
            isEn
              ? "Please select your business model or industry to proceed."
              : "Silakan pilih model atau bidang usaha Anda untuk melanjutkan."
          );
          return false;
        }
        if (state.businessType === "lainnya" && !state.customBusinessType.trim()) {
          setValidationError(
            isEn
              ? "Please specify your business field in the input box."
              : "Silakan tuliskan bidang usaha Anda pada kolom yang tersedia."
          );
          return false;
        }
        return true;

      case 2:
        if (state.painPoints.length === 0) {
          setValidationError(
            isEn
              ? "Please select at least one operational bottleneck to resolve."
              : "Silakan pilih minimal satu kendala atau kebocoran terbesar saat ini."
          );
          return false;
        }
        if (state.painPoints.includes("lainnya") && !state.customPainPoint.trim()) {
          setValidationError(
            isEn
              ? "Please describe your operational bottleneck in the input box."
              : "Silakan tuliskan kendala operasional Anda pada kolom yang tersedia."
          );
          return false;
        }
        return true;

      case 3:
        if (state.customerFlow.length === 0) {
          setValidationError(
            isEn
              ? "Please select at least one primary customer transaction channel."
              : "Silakan pilih minimal satu kanal transaksi pelanggan yang sering terjadi."
          );
          return false;
        }
        if (!state.orderProcessing || state.orderProcessing.length === 0) {
          setValidationError(
            isEn
              ? "Please select at least one method your team uses to process orders."
              : "Silakan pilih minimal satu cara tim Anda memproses transaksi."
          );
          return false;
        }
        return true;

      case 4:
        if (!state.businessScale) {
          setValidationError(
            isEn
              ? "Please select your business scale or team size."
              : "Silakan pilih skala tim atau armada operasional bisnis Anda."
          );
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      scrollToTopSection();
    } else {
      // Step 4 Selesai -> Mulai Analisis Sinkron Bersama AI Scalebiz
      setIsAnalyzing(true);
      setIsAnalysisReady(false);
      scrollToTopSection();

      const computedBaseline = runBusinessDiagnosis(state);
      setPendingResult(computedBaseline);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
        setIsAnalysisReady(true);
      }, 7500);

      fetch("/api/ai/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state, baseline: computedBaseline }),
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((data) => {
          clearTimeout(timeoutId);
          if (data && data.isAiEnhanced) {
            const activePrimaryPillar = data.primaryPillar || computedBaseline.primaryPillar || "erp";

            let updatedModules = computedBaseline.modules.map((m, idx) => {
              const tailored = data.tailoredModules?.find((t: any) => t.id === m.id) || (data.tailoredModules && data.tailoredModules[idx]);
              if (tailored && tailored.title && tailored.description) {
                return {
                  ...m,
                  title: tailored.title || m.title,
                  description: tailored.description || m.description,
                  purpose: tailored.purpose || m.purpose,
                  solvesPainPoint: tailored.solvesPainPoint || m.solvesPainPoint,
                  priority: tailored.priority || m.priority,
                  pillar: tailored.pillar || m.pillar,
                };
              }
              return m;
            });

            if (data.additionalModules && Array.isArray(data.additionalModules)) {
              data.additionalModules.forEach((add: any, aIdx: number) => {
                if (add.title && add.pillar) {
                  const newMod = {
                    id: add.id || `m_ai_${aIdx}_${Date.now()}`,
                    title: add.title,
                    description: add.description || "",
                    purpose: add.purpose || "",
                    solvesPainPoint: add.solvesPainPoint,
                    priority: add.priority || "CORE",
                    category: add.category || (add.pillar === "website" ? "WEBSITE" : add.pillar === "pos_finance" ? "POS_FINANCE" : add.pillar === "automation" ? "AUTOMATION" : "ERP_OPERATIONAL"),
                    pillar: add.pillar,
                    icon: add.pillar === "website" ? "🌐" : add.pillar === "pos_finance" ? "💳" : add.pillar === "automation" ? "⚡" : "🏢",
                  };
                  updatedModules.push(newMod);
                }
              });
            }

            const updatedPillars = computedBaseline.pillars?.map((pGroup) => {
              const pMods = updatedModules.filter((m) => m.pillar === pGroup.pillar.id);
              const isPillarActive = data.activePillars
                ? data.activePillars.includes(pGroup.pillar.id)
                : pGroup.isRelevant;
              return {
                ...pGroup,
                pillar: {
                  ...pGroup.pillar,
                  isPrimary: pGroup.pillar.id === activePrimaryPillar,
                },
                modules: pMods,
                isRelevant: isPillarActive,
                status: isPillarActive ? ("ACTIVE_RECOMMENDED" as const) : ("NOT_URGENT" as const),
              };
            }) || computedBaseline.pillars;

            const finalDormantPillars = data.dormantPillars && data.dormantPillars.length > 0
              ? data.dormantPillars
              : computedBaseline.dormantPillars;

            const enriched: DiagnosticResult = {
              ...computedBaseline,
              primaryPillar: activePrimaryPillar,
              aiAnalysis: data.aiAnalysis,
              aiQuickWins: data.aiQuickWins,
              pillarEvaluations: data.pillarEvaluations,
              dormantPillars: finalDormantPillars,
              modules: updatedModules,
              pillars: updatedPillars,
              isAiEnhanced: true,
            };

            setPendingResult(enriched);
          }
          setIsAnalysisReady(true);
        })
        .catch((err) => {
          clearTimeout(timeoutId);
          console.warn("[Scalebiz AI] Enhancement fallback to causal baseline:", err);
          setIsAnalysisReady(true);
        });
    }
  };

  const handleBack = () => {
    setValidationError(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      scrollToTopSection();
    }
  };

  const handleAnalysisComplete = () => {
    setResult((prev) => pendingResult || prev || runBusinessDiagnosis(state));
    setIsAnalyzing(false);
    scrollToTopSection();
  };

  const handleRestart = () => {
    setState(INITIAL_STATE);
    setCurrentStep(1);
    setIsAnalyzing(false);
    setIsAnalysisReady(false);
    setPendingResult(null);
    setResult(null);
    setValidationError(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    scrollToTopSection();
  };

  // Hitung Persentase Progress
  const progressPercent = Math.round((currentStep / TOTAL_STEPS) * 100);

  return (
    <div className="diagnosis-wizard-card">
      {/* 1. Layar Transisi Sedang Menganalisis Nyata */}
      {isAnalyzing && (
        <AnalysisTransition
          brandName={state.companyName}
          isReady={isAnalysisReady}
          onComplete={handleAnalysisComplete}
        />
      )}

      {/* 2. Layar Hasil Laporan Diagnosa */}
      {!isAnalyzing && result && (
        <DiagnosisResultView
          result={result}
          brandName={state.companyName}
          onRestart={handleRestart}
        />
      )}

      {/* 3. Layar Formulir Multi-Step Wizard */}
      {!isAnalyzing && !result && (
        <div className="wizard-stepper-container">
          {/* Progress Indicator Header */}
          <div className="wizard-progress-header">
            {/* Desktop Steps Timeline */}
            <div className="desktop-steps-timeline" role="tablist" aria-label={lang === "en" ? "Diagnostic Progress" : "Progress Diagnosa"}>
              {stepLabels.map((item) => {
                const isPast = currentStep > item.num;
                const isCurrent = currentStep === item.num;
                return (
                  <div
                    key={item.num}
                    className={`timeline-step-node ${
                      isPast ? "completed" : isCurrent ? "active" : "upcoming"
                    }`}
                  >
                    <span className="node-number">
                      {isPast ? "✓" : `0${item.num}`}
                    </span>
                    <span className="node-label">{item.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Mobile Progress Bar & Counter */}
            <div className="mobile-progress-badge-wrap">
              <span className="mobile-step-counter">
                {lang === "en" ? (
                  <>Step <strong>{currentStep}</strong> of <strong>{TOTAL_STEPS}</strong></>
                ) : (
                  <>Langkah <strong>{currentStep}</strong> dari <strong>{TOTAL_STEPS}</strong></>
                )}
              </span>
              <span className="mobile-step-name">
                {stepLabels[currentStep - 1]?.short}
              </span>
            </div>

            <div className="wizard-progress-track">
              <div
                className="wizard-progress-bar"
                style={{ width: `${progressPercent}%` }}
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>

          {/* Step Dynamic Content */}
          <div className="wizard-body-content">
            <DiagnosisStepView
              currentStep={currentStep}
              state={state}
              onChange={updateState}
              validationError={validationError}
            />
          </div>

          {/* Stepper Navigation Footer */}
          <div className="wizard-footer-actions">
            <div className="actions-left">
              {currentStep > 1 ? (
                <button
                  type="button"
                  className="btn-wizard-back"
                  onClick={handleBack}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  <span>{lang === "en" ? "Back" : "Kembali"}</span>
                </button>
              ) : (
                <span className="step-estimated-time">
                  {lang === "en" ? "⏱️ Estimated time: 1–2 minutes" : "⏱️ Estimasi pengerjaan: 1–2 menit"}
                </span>
              )}
            </div>

            <div className="actions-right">
              <button
                type="button"
                className="btn-wizard-next"
                onClick={handleNext}
              >
                <span>
                  {currentStep === TOTAL_STEPS
                    ? (lang === "en" ? "Analyze My Business Architecture" : "Mulai Analisis Bisnis Saya")
                    : (lang === "en" ? `Proceed to Step 0${currentStep + 1}` : `Lanjut ke Langkah 0${currentStep + 1}`)}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
