"use client";

import React, { useState } from "react";
import { DiagnosticResult, PriorityLevel, SolutionCategory } from "@/types/diagnosis";
import { useLanguage } from "@/context/LanguageContext";
import ModuleIcon from "./ModuleIcon";

interface DiagnosisResultViewProps {
  result: DiagnosticResult;
  brandName?: string;
  onRestart: () => void;
}

export default function DiagnosisResultView({
  result,
  brandName,
  onRestart,
}: DiagnosisResultViewProps) {
  const { lang } = useLanguage();
  const isEn = lang === "en";
  const [activePillarTab, setActivePillarTab] = useState<string>("all");

  // Build the Scalebiz pillars if result.pillars not directly supplied
  const allPillars = (result.pillars && result.pillars.length > 0)
    ? result.pillars
    : [
        {
          pillar: {
            id: "website" as const,
            title: "Website & Digital Presence",
            shortTitle: "Website",
            icon: "🌐",
            tagline: isEn
              ? "Custom catalogs, high-converting landing pages & online booking"
              : "Katalog mandiri, landing page konversi tinggi & reservasi online",
            isPrimary: result.primaryPillar === "website",
          },
          modules: result.modules.filter((m) => m.pillar === "website" || m.category === "WEBSITE"),
          isRelevant: result.primaryPillar === "website",
        },
        {
          pillar: {
            id: "pos_finance" as const,
            title: "POS, Finance & Accounting",
            shortTitle: "POS & Finance",
            icon: "💳",
            tagline: isEn
              ? "Integrated cloud POS, automated QRIS/VA settlement & shift controls"
              : "Kasir POS terintegrasi, mutasi QRIS/VA, dan kontrol kas shift harian",
            isPrimary: result.primaryPillar === "pos_finance",
          },
          modules: result.modules.filter((m) => m.pillar === "pos_finance" || m.category === "POS_FINANCE"),
          isRelevant: result.primaryPillar === "pos_finance",
        },
        {
          pillar: {
            id: "erp" as const,
            title: "ERP & Operational Core",
            shortTitle: isEn ? "ERP & Operations" : "ERP & Operasional",
            icon: "🏢",
            tagline: isEn
              ? "Raw material inventory, recipe cost breakdown, warehouse audit & real COGS"
              : "Manajemen stok bahan baku, resep takaran, opname gudang & HPP riil",
            isPrimary: result.primaryPillar === "erp" || !result.primaryPillar,
          },
          modules: result.modules.filter((m) => m.pillar === "erp" || m.category === "ERP_OPERATIONAL" || m.category === "BUSINESS_SYSTEM"),
          isRelevant: true,
        },
        {
          pillar: {
            id: "automation" as const,
            title: "Automation & WhatsApp System",
            shortTitle: "Automation",
            icon: "⚡",
            tagline: isEn
              ? "Order ticketing, automated lead follow-ups & daily executive summaries"
              : "Notifikasi tiket pesanan, auto-followup prospek, dan rekap otomatis",
            isPrimary: result.primaryPillar === "automation",
          },
          modules: result.modules.filter((m) => m.pillar === "automation" || m.category === "AUTOMATION"),
          isRelevant: result.primaryPillar === "automation",
        },
      ];

  // Pisahkan pilar yang relevan (Aktif Direkomendasikan) dengan yang belum mendesak (Dormant)
  const activePillars = allPillars.filter((p) => p.isRelevant !== false);
  const dormantPillars = (result.dormantPillars && result.dormantPillars.length > 0)
    ? result.dormantPillars
    : allPillars
        .filter((p) => p.isRelevant === false)
        .map((p) => ({
          pillarId: p.pillar.id,
          title: p.pillar.shortTitle,
          icon: p.pillar.icon,
          reason: p.reason || (isEn ? "Not yet an urgent priority for your business stage." : "Belum menjadi prioritas mendesak untuk tahapan bisnis Anda saat ini."),
        }));

  // Default: HANYA pilih modul CORE yang berada di dalam pilar aktif yang menjawab kendala riil
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>(() => {
    const activeModuleIds = new Set(activePillars.flatMap((p) => p.modules.map((m) => m.id)));
    const coreIds = result.modules
      .filter((m) => m.priority === "CORE" && activeModuleIds.has(m.id))
      .map((m) => m.id);
    return coreIds.length > 0
      ? coreIds
      : result.modules.filter((m) => activeModuleIds.has(m.id)).slice(0, 3).map((m) => m.id);
  });

  const displayBrand = brandName?.trim() || (isEn ? "Your Business" : "Bisnis Anda");
  const selectedModules = result.modules.filter((m) => selectedModuleIds.includes(m.id));
  const painSummary = result.identifiedProblems.slice(0, 2).join(", ") || (isEn ? "Operational efficiency" : "Efisiensi operasional");

  // Group selected modules by active pillar for WhatsApp draft
  const groupedPillarWhatsapp = activePillars
    .map((pGroup) => {
      const selectedInPillar = pGroup.modules.filter((m) => selectedModuleIds.includes(m.id));
      if (selectedInPillar.length === 0) return null;
      const list = selectedInPillar.map((m) => `  • ${m.title}`).join("\n");
      return `[${pGroup.pillar.icon} ${pGroup.pillar.shortTitle.toUpperCase()}]\n${list}`;
    })
    .filter(Boolean)
    .join("\n\n");

  const moduleListText = groupedPillarWhatsapp || (selectedModules.length > 0
    ? selectedModules.map((m, idx) => `${idx + 1}. ${m.title}`).join("\n")
    : (isEn ? "No specific modules selected (general consultation)" : "Belum memilih modul spesifik (konsultasi umum)"));

  const primaryPillarObj = allPillars.find((p) => p.pillar.id === (result.primaryPillar || "erp"));
  const primaryPillarName = primaryPillarObj?.pillar.title || (isEn ? "Integrated Business Architecture" : "Sistem Operasional Terintegrasi");

  const dynamicWhatsappDraft = isEn
    ? `Hello Scalebiz Team, I'd like to consult on digital systems for ${displayBrand}.\n\nRecommended Architecture: ${result.primarySolution}\nPrimary Focus Pillar: ${primaryPillarName}\nIdentified Bottlenecks: ${painSummary}\n\nSelected Priority Modules (${selectedModules.length} features):\n${moduleListText}\n\nCould you share initial technical advice and timeline/cost estimates? Thank you.`
    : `Halo Tim Scalebiz, saya ingin konsultasi sistem untuk ${displayBrand}.\n\nRekomendasi Sistem: ${result.primarySolution}\nPilar Utama Prioritas: ${primaryPillarName}\nKendala Utama: ${painSummary}\n\nFitur Solusi yang Saya Butuhkan (${selectedModules.length} modul prioritas):\n${moduleListText}\n\nBoleh minta saran teknis dan estimasi langkah awalnya? Terima kasih.`;

  const waUrl = `https://wa.me/6281527080656?text=${encodeURIComponent(dynamicWhatsappDraft)}`;

  const toggleModule = (id: string) => {
    setSelectedModuleIds((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  const selectAllModules = () => {
    setSelectedModuleIds(result.modules.map((m) => m.id));
  };

  const selectCoreModulesOnly = () => {
    const coreIds = result.modules.filter((m) => m.priority === "CORE").map((m) => m.id);
    setSelectedModuleIds(coreIds.length > 0 ? coreIds : result.modules.slice(0, 2).map((m) => m.id));
  };

  const getPriorityBadgeClass = (priority: PriorityLevel) => {
    switch (priority) {
      case "CORE":
        return "priority-core";
      case "RECOMMENDED":
        return "priority-rec";
      case "OPTIONAL":
        return "priority-opt";
    }
  };

  const getPriorityLabel = (priority: PriorityLevel) => {
    switch (priority) {
      case "CORE":
        return isEn ? "Core Foundation (Required)" : "Fondasi Utama (Wajib)";
      case "RECOMMENDED":
        return isEn ? "Recommended Expansion" : "Pengembangan Dianjurkan";
      case "OPTIONAL":
        return isEn ? "Advanced Milestone" : "Tahap Lanjutan";
    }
  };

  const getCategoryBadgeClass = (category: SolutionCategory) => {
    switch (category) {
      case "AUTOMATION":
        return "category-automation";
      case "BUSINESS_SYSTEM":
        return "category-system";
      case "WEBSITE":
        return "category-website";
      case "DIGITALIZATION":
        return "category-digitalization";
      case "POS_FINANCE":
        return "category-pos-finance";
      case "ERP_OPERATIONAL":
        return "category-erp";
    }
  };

  const getCategoryLabel = (category: SolutionCategory) => {
    switch (category) {
      case "AUTOMATION":
        return isEn ? "⚡ System Automation" : "⚡ Otomasi Sistem";
      case "BUSINESS_SYSTEM":
        return isEn ? "🖥️ Business System" : "🖥️ Sistem Bisnis";
      case "WEBSITE":
        return isEn ? "🌐 Web & Credibility" : "🌐 Website & Kredibilitas";
      case "DIGITALIZATION":
        return isEn ? "📊 Data Digitalization" : "📊 Digitalisasi Data";
      case "POS_FINANCE":
        return isEn ? "💳 POS & Finance" : "💳 POS Kasir & Finansial";
      case "ERP_OPERATIONAL":
        return isEn ? "⚙️ ERP & Operations" : "⚙️ ERP & Operasional Lapangan";
    }
  };

  const automationModules = result.modules.filter((m) => m.category === "AUTOMATION");

  return (
    <div className="diag-result-report" id="diagnosis-result-box" role="region" aria-label={isEn ? "Scalebiz System Architecture Blueprint" : "Hasil Analisis Bisnis Scalebiz"}>
      {/* Report Header */}
      <div className="report-header-banner">
        <div className="report-eyebrow">
          <span className="eyebrow-ping" />
          <span>{isEn ? "SCALEBIZ DIGITAL SYSTEM BLUEPRINT" : "REKOMENDASI SISTEM DIGITAL SCALEBIZ"}</span>
        </div>
        <h2 className="report-main-title">
          {isEn
            ? `${displayBrand} Needs Targeted Architecture, Not Just a Brochure Website.`
            : `${displayBrand} Membutuhkan Solusi yang Tepat Sasaran, Bukan Sekadar Website Brosur.`}
        </h2>
        <p className="report-intro-desc">{result.summary}</p>
      </div>

      {/* Primary Solution Card */}
      <div className="primary-solution-card">
        <div className="primary-sol-top">
          <div className="primary-badges-group">
            <span
              className="primary-badge"
              style={{
                backgroundColor: `${result.badgeColor}18`,
                color: result.badgeColor,
                borderColor: `${result.badgeColor}40`,
              }}
            >
              {result.badge}
            </span>
            <span className="time-badge">
              {isEn ? (
                <>⏱️ Est. Timeline: <strong>{result.timeEstimate}</strong></>
              ) : (
                <>⏱️ Estimasi Pengerjaan: <strong>{result.timeEstimate}</strong></>
              )}
            </span>
            <span className="solution-tag-badge">
              {isEn ? "Primary Recommendation" : "Rekomendasi Utama"}
            </span>
          </div>

          <button
            type="button"
            className="btn-restart-analysis"
            onClick={onRestart}
            title={isEn ? "Start Over" : "Mulai Ulang dari Awal"}
          >
            {isEn ? "🔄 Start Over" : "🔄 Ulangi dari Awal"}
          </button>
        </div>

        <h3 className="primary-sol-title">{result.primarySolution}</h3>

        {/* Identified Problems Chips */}
        {result.identifiedProblems.length > 0 && (
          <div className="identified-problems-strip">
            <span className="problems-strip-label">
              {isEn ? "Key Bottlenecks to Resolve:" : "Masalah yang ingin kita bereskan:"}
            </span>
            <div className="problems-chips-wrap">
              {result.identifiedProblems.map((prob, idx) => (
                <span key={idx} className="problem-chip">
                  <span className="chip-dot" />
                  <span>{prob}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Scalebiz AI Deep Analysis */}
        {(() => {
          const analysisText = result.aiAnalysis || result.whyThisFits || result.summary;

          if (!analysisText) return null;

          return (
            <div className="scalebiz-ai-analysis-card">
              <div className="ai-card-header">
                <div className="ai-badge-header">
                  <span className="ai-badge-pulse" />
                  <span className="ai-badge-title">
                    {result.isAiEnhanced
                      ? (isEn ? "SCALEBIZ AI OBJECTIVE AUDIT" : "KAJIAN OBJEKTIF SCALEBIZ AI")
                      : (isEn ? "SCALEBIZ SYSTEM BLUEPRINT" : "KAJIAN ARSITEKTUR SISTEM SCALEBIZ")}
                  </span>
                </div>
                <span className="ai-model-tag">
                  {result.isAiEnhanced ? "Gemini Intelligence Engine" : "Scalebiz Causal Engine"}
                </span>
              </div>

              <div className="ai-analysis-content">
                {analysisText.split("\n\n").map((para, pIdx) => (
                  <p key={pIdx} className="ai-analysis-paragraph">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      {/* 4 Scalebiz Core Pillars Section */}
      <div className="solution-modules-section">
        <div className="section-subheading-group">
          <div className="four-pillars-eyebrow">
            <span className="eyebrow-ping" />
            <span>{isEn ? "4 CORE PILLARS OF SCALEBIZ ARCHITECTURE" : "4 PILAR UTAMA LAYANAN SCALEBIZ"}</span>
          </div>
          <h4 className="modules-section-title">
            {isEn ? `Comprehensive Solution for ${displayBrand}` : `Solusi Menyeluruh untuk ${displayBrand}`}
          </h4>
          <p className="modules-section-desc">
            {isEn ? (
              <>Scalebiz provides 4 interconnected architectural pillars: <strong>Website</strong>, <strong>POS Finance & Accounting</strong>, <strong>ERP & Operations</strong>, and <strong>Automation</strong>. All modules below are calibrated precisely to your business bottlenecks.</>
            ) : (
              <>Scalebiz menghadirkan 4 pilar sistem yang saling mengunci: <strong>Website</strong>, <strong>POS Finance & Accounting</strong>, <strong>ERP & Operasional</strong>, serta <strong>Automation</strong>. Seluruh modul di bawah ini dirancang presisi sesuai kendala bisnis Anda.</>
            )}
          </p>
        </div>

        {/* Global Module Selection & Control Bar */}
        <div className="module-selection-bar">
          <div className="selection-bar-info">
            <span className="selection-counter-badge">
              {isEn ? (
                <><span className="selection-count">{selectedModuleIds.length}</span> of {result.modules.length} Features Selected</>
              ) : (
                <><span className="selection-count">{selectedModuleIds.length}</span> dari {result.modules.length} Fitur Terpilih</>
              )}
            </span>
            <span className="selection-help-text">
              {isEn
                ? "Click module cards to customize your scope based on your priorities and budget."
                : "Klik kartu modul untuk memilih fitur yang ingin diprioritaskan sesuai kebutuhan dan budget Anda."}
            </span>
          </div>
          <div className="selection-bar-actions">
            <button
              type="button"
              className="btn-scope-filter"
              onClick={selectAllModules}
            >
              {isEn ? "Select All" : "Pilih Semua"}
            </button>
            <button
              type="button"
              className="btn-scope-filter"
              onClick={selectCoreModulesOnly}
            >
              {isEn ? "Core Foundation Only" : "Fondasi Utama Saja"}
            </button>
          </div>
        </div>

        {/* Active Pillars Interactive Filter Tabs */}
        <div className="pillar-tabs-nav" role="tablist" aria-label={isEn ? "Solution Pillars Navigation" : "Navigasi Pilar Solusi"}>
          <button
            type="button"
            role="tab"
            aria-selected={activePillarTab === "all"}
            className={`pillar-tab-btn ${activePillarTab === "all" ? "active" : ""}`}
            onClick={() => setActivePillarTab("all")}
          >
            <span>{isEn ? `All Solution Pillars (${activePillars.length})` : `Semua Pilar Solusi (${activePillars.length})`}</span>
            <span className="pillar-tab-count">{selectedModuleIds.length}</span>
          </button>
          {activePillars.map((pGroup) => {
            const isPillarPrimary = pGroup.pillar.isPrimary || result.primaryPillar === pGroup.pillar.id;
            const selectedCountInPillar = pGroup.modules.filter((m) => selectedModuleIds.includes(m.id)).length;
            const isActive = activePillarTab === pGroup.pillar.id;

            return (
              <button
                key={pGroup.pillar.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`pillar-tab-btn ${isActive ? "active" : ""} ${isPillarPrimary ? "is-primary-pillar" : ""}`}
                onClick={() => setActivePillarTab(pGroup.pillar.id)}
              >
                <span className="pillar-tab-icon">{pGroup.pillar.icon}</span>
                <span className="pillar-tab-name">{pGroup.pillar.shortTitle}</span>
                {isPillarPrimary && <span className="tab-primary-badge">{isEn ? "Primary" : "Utama"}</span>}
                <span className="pillar-tab-count">{selectedCountInPillar}</span>
              </button>
            );
          })}
        </div>

        {/* Pillar Groups List - Only Active Recommended Pillars */}
        <div className="pillars-groups-container">
          {activePillars
            .filter((pGroup) => activePillarTab === "all" || activePillarTab === pGroup.pillar.id)
            .map((pGroup) => {
              const isPillarPrimary = pGroup.pillar.isPrimary || result.primaryPillar === pGroup.pillar.id;
              const selectedCountInPillar = pGroup.modules.filter((m) => selectedModuleIds.includes(m.id)).length;
              const aiPillarEvaluation = result.pillarEvaluations?.[pGroup.pillar.id];

              return (
                <div
                  key={pGroup.pillar.id}
                  className={`pillar-section-group ${isPillarPrimary ? "is-primary-pillar" : ""}`}
                  id={`pillar-${pGroup.pillar.id}`}
                >
                  <div className="pillar-group-header">
                    <div className="pillar-header-left">
                      <div className="pillar-icon-wrap">{pGroup.pillar.icon}</div>
                      <div className="pillar-text-group">
                        <div className="pillar-title-row">
                          <h5 className="pillar-group-title">{pGroup.pillar.title}</h5>
                          {isPillarPrimary && (
                            <span className="pillar-primary-flag">
                              {isEn ? "⭐ PRIMARY PILLAR (TOP RECOMMENDATION)" : "⭐ PILAR UTAMA (REKOMENDASI TERATAS)"}
                            </span>
                          )}
                        </div>
                        <p className="pillar-group-tagline">{pGroup.pillar.tagline}</p>
                      </div>
                    </div>
                    <div className="pillar-header-right">
                      <span className="pillar-modules-tally">
                        {isEn ? (
                          <><strong>{selectedCountInPillar}</strong> of {pGroup.modules.length} Features Selected</>
                        ) : (
                          <><strong>{selectedCountInPillar}</strong> dari {pGroup.modules.length} Fitur Terpilih</>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* AI Evaluation Quote for this Pillar if available */}
                  {aiPillarEvaluation && (
                    <div className="pillar-ai-insight-box">
                      <span className="insight-bulb">💡</span>
                      <p className="insight-text">
                        <strong>{isEn ? `Scalebiz Analysis for ${displayBrand}:` : `Kajian Scalebiz untuk ${displayBrand}:`}</strong> {aiPillarEvaluation}
                      </p>
                    </div>
                  )}

                  {/* Grid of Modules for this Pillar */}
                  {pGroup.modules.length > 0 ? (
                    <div className="modules-cards-grid">
                      {pGroup.modules.map((mod) => {
                        const isAuto = mod.category === "AUTOMATION" || mod.pillar === "automation";
                        const isSelected = selectedModuleIds.includes(mod.id);
                        return (
                          <div
                            key={mod.id}
                            className={`module-card-item ${isAuto ? "is-automation" : ""} ${
                              isSelected ? "is-selected" : "is-unselected"
                            }`}
                            onClick={() => toggleModule(mod.id)}
                            role="checkbox"
                            aria-checked={isSelected}
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === " " || e.key === "Enter") {
                                e.preventDefault();
                                toggleModule(mod.id);
                              }
                            }}
                          >
                            <div className="module-card-header">
                              <div className="module-icon-wrap" title={mod.title}>
                                <ModuleIcon id={mod.id} />
                              </div>
                              <div className="module-header-right">
                                <button
                                  type="button"
                                  className={`module-toggle-chip ${isSelected ? "checked" : ""}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleModule(mod.id);
                                  }}
                                  aria-label={isSelected ? (isEn ? `Remove ${mod.title}` : `Hapus ${mod.title}`) : (isEn ? `Select ${mod.title}` : `Pilih ${mod.title}`)}
                                >
                                  <span className="toggle-box">
                                    {isSelected && (
                                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                      </svg>
                                    )}
                                  </span>
                                  <span className="toggle-label">{isSelected ? (isEn ? "Selected" : "Dipilih") : (isEn ? "Add" : "Tambah")}</span>
                                </button>
                                <div className="module-badges-wrapper">
                                  <span className={`module-category-pill ${getCategoryBadgeClass(mod.category)}`}>
                                    {getCategoryLabel(mod.category)}
                                  </span>
                                  <span className={`module-priority-pill ${getPriorityBadgeClass(mod.priority)}`}>
                                    <span className="priority-dot" />
                                    <span>{getPriorityLabel(mod.priority)}</span>
                                  </span>
                                </div>
                              </div>
                            </div>

                            {mod.solvesPainPoint && (
                              <div className="module-causality-tag">
                                <span className="causality-icon">🎯</span>
                                <span className="causality-text">{mod.solvesPainPoint}</span>
                              </div>
                            )}

                            <h5 className="module-card-title">{mod.title}</h5>
                            <p className="module-card-desc">{mod.description}</p>
                            <div className="module-benefit-callout">
                              <span className="benefit-icon" aria-hidden="true">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </span>
                              <span className="benefit-text">
                                <strong className="benefit-tag-label">{isEn ? "Direct benefit:" : "Manfaat langsung:"}</strong> {mod.purpose}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="pillar-empty-state">
                      <span>{isEn ? "No additional modules for this pillar under current profile. Consult our team for custom scopes." : "Belum ada modul tambahan pada pilar ini untuk profil saat ini. Konsultasikan fitur kustom bersama tim kami."}</span>
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        {/* Selection Status Summary Strip */}
        <div className="selection-sync-summary">
          <div className="sync-summary-content">
            <span className="sync-icon">💬</span>
            <div className="sync-text">
              <strong>{isEn ? `${selectedModuleIds.length} Selected Modules Ready for Consultation:` : `${selectedModuleIds.length} Modul Terpilih Siap Dikonsultasikan:`}</strong>
              <p>
                {selectedModuleIds.length > 0
                  ? (isEn
                      ? "The priority features you selected above will be automatically compiled into your WhatsApp consultation draft so our engineers can provide an accurate quote."
                      : "Daftar fitur prioritas yang Anda centang di atas akan otomatis dikelompokkan ke dalam draf pesan WhatsApp agar tim Scalebiz bisa langsung memberikan estimasi biaya yang presisi.")
                  : (isEn
                      ? "Please select at least 1 module to receive specific delivery estimates."
                      : "Silakan pilih minimal 1 modul untuk mendapatkan rincian estimasi pengerjaan spesifik.")}
              </p>
            </div>
          </div>
        </div>

        {/* Transparansi Efisiensi Biaya (Pilar Dormant yang Belum Perlu Dibeli) */}
        {dormantPillars.length > 0 && (
          <div className="dormant-pillars-transparency-card">
            <div className="transparency-header">
              <div className="transparency-badge">
                <span className="shield-icon">🛡️</span>
                <span>{isEn ? "SCALEBIZ BUDGET EFFICIENCY RECOMMENDATION" : "REKOMENDASI EFISIENSI ANGGARAN SCALEBIZ"}</span>
              </div>
              <h4 className="transparency-title">
                {isEn ? `Systems NOT Yet Urgent for ${displayBrand}` : `Sistem yang BELUM Mendesak untuk ${displayBrand} Saat Ini`}
              </h4>
              <p className="transparency-subtitle">
                {isEn
                  ? "Scalebiz adheres to honest engineering: You don't need to buy every system upfront. We recommend deferring the following pillars to keep your operational burn low:"
                  : "Scalebiz menganut prinsip konsultasi yang jujur: Anda tidak perlu membuang modal untuk membeli semua sistem sekaligus. Kami menyarankan Anda menunda pilar berikut agar anggaran operasional Anda tetap efisien:"}
              </p>
            </div>

            <div className="dormant-pillars-grid">
              {dormantPillars.map((dp) => (
                <div key={dp.pillarId} className="dormant-pillar-item">
                  <div className="dormant-item-top">
                    <span className="dormant-item-icon">{dp.icon}</span>
                    <strong className="dormant-item-title">{dp.title}</strong>
                    <span className="dormant-status-tag">{isEn ? "Defer / Not Urgent Yet" : "Tunda / Belum Perlu"}</span>
                  </div>
                  <p className="dormant-item-reason">{dp.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3-Phase Implementation Roadmap */}
      <div className="implementation-roadmap-section">
        <div className="section-subheading-group">
          <h4 className="roadmap-section-title">{isEn ? "Project Execution Roadmap:" : "Tahapan Pengerjaan Proyek:"}</h4>
          <p className="roadmap-section-desc">
            {isEn
              ? "Delivered in phased milestones so your daily business operations continue smoothly."
              : "Dikerjakan secara bertahap agar operasional harian bisnis Anda tetap berjalan normal tanpa terganggu."}
          </p>
        </div>

        <div className="roadmap-phases-grid">
          {result.roadmap.map((phase) => (
            <div key={phase.phaseNumber} className="roadmap-phase-card">
              <div className="phase-card-top">
                <span className="phase-num-pill">{isEn ? `Phase 0${phase.phaseNumber}` : `Tahap 0${phase.phaseNumber}`}</span>
                <span className="phase-duration-tag">⏱️ {phase.duration}</span>
              </div>
              <h5 className="phase-card-title">{phase.phaseTitle}</h5>
              <ul className="phase-deliverables-list">
                {phase.deliverables.map((item, dIdx) => (
                  <li key={dIdx}>
                    <span className="deliverable-check">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="roadmap-disclaimer-note">
          <span>{isEn ? "*Timeline and technical scope can be adjusted to your exact needs during consultation with the Scalebiz team." : "*Estimasi waktu dan ruang lingkup teknis dapat disesuaikan dengan kebutuhan riil Anda saat sesi konsultasi bersama tim Scalebiz."}</span>
        </div>
      </div>

      {/* Primary Action CTA Card */}
      <div className="result-action-cta-card">
        <h4 className="action-cta-heading">
          {isEn ? `Ready to Discuss Architecture for ${displayBrand}?` : `Ingin Diskusi Lebih Detail Soal Kebutuhan ${displayBrand}?`}
        </h4>
        <p className="action-cta-subheading">
          {isEn
            ? "Let's review this system blueprint over WhatsApp. Zero obligation—we'll evaluate the most cost-effective architecture for your current scale."
            : "Hasil diagnosa ini bisa langsung kita bahas santai lewat WhatsApp. Tidak perlu komitmen apa-apa dulu—kita diskusikan dulu alur sistem yang paling pas dengan budget dan skala bisnis Anda."}
        </p>

        <div className="action-cta-buttons">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-consult"
            id="cta-diag-whatsapp"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span>{isEn ? "Consult via WhatsApp (Free)" : "Konsultasi Santai via WhatsApp (Gratis)"}</span>
          </a>

          <button type="button" className="btn-secondary-restart" onClick={onRestart}>
            {isEn ? "Start Over" : "Ulangi dari Awal"}
          </button>
        </div>

        <span className="action-cta-note">
          {isEn
            ? "*Your business blueprint is pre-filled into the WhatsApp draft so we can skip the repetitive questions and discuss directly."
            : "*Draf pesan WhatsApp sudah terisi ringkasan bisnis Anda secara otomatis agar kita bisa langsung diskusi to-the-point tanpa tanya ulang dari awal."}
        </span>
      </div>

    </div>
  );
}
