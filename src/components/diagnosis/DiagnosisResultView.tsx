"use client";

import React, { useState } from "react";
import { DiagnosticResult, PriorityLevel, SolutionCategory } from "@/types/diagnosis";
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
            tagline: "Katalog mandiri, landing page konversi tinggi & reservasi online",
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
            tagline: "Kasir POS terintegrasi, mutasi QRIS/VA, dan kontrol kas shift harian",
            isPrimary: result.primaryPillar === "pos_finance",
          },
          modules: result.modules.filter((m) => m.pillar === "pos_finance" || m.category === "POS_FINANCE"),
          isRelevant: result.primaryPillar === "pos_finance",
        },
        {
          pillar: {
            id: "erp" as const,
            title: "ERP & Operational Core",
            shortTitle: "ERP & Operasional",
            icon: "🏢",
            tagline: "Manajemen stok bahan baku, resep takaran, opname gudang & HPP riil",
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
            tagline: "Notifikasi tiket pesanan, auto-followup prospek, dan rekap otomatis",
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
          reason: p.reason || "Belum menjadi prioritas mendesak untuk tahapan bisnis Anda saat ini.",
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

  const displayBrand = brandName?.trim() || "Bisnis Anda";
  const selectedModules = result.modules.filter((m) => selectedModuleIds.includes(m.id));
  const painSummary = result.identifiedProblems.slice(0, 2).join(", ") || "Efisiensi operasional";

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
    : "Belum memilih modul spesifik (konsultasi umum)");

  const primaryPillarObj = allPillars.find((p) => p.pillar.id === (result.primaryPillar || "erp"));
  const primaryPillarName = primaryPillarObj?.pillar.title || "Sistem Operasional Terintegrasi";

  const dynamicWhatsappDraft = `Halo Tim Scalebiz, saya ingin konsultasi sistem untuk ${displayBrand}.\n\nRekomendasi Sistem: ${result.primarySolution}\nPilar Utama Prioritas: ${primaryPillarName}\nKendala Utama: ${painSummary}\n\nFitur Solusi yang Saya Butuhkan (${selectedModules.length} modul prioritas):\n${moduleListText}\n\nBoleh minta saran teknis dan estimasi langkah awalnya? Terima kasih.`;

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
        return "Fondasi Utama (Wajib)";
      case "RECOMMENDED":
        return "Pengembangan Dianjurkan";
      case "OPTIONAL":
        return "Tahap Lanjutan";
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
        return "⚡ Otomasi Sistem";
      case "BUSINESS_SYSTEM":
        return "🖥️ Sistem Bisnis";
      case "WEBSITE":
        return "🌐 Website & Kredibilitas";
      case "DIGITALIZATION":
        return "📊 Digitalisasi Data";
      case "POS_FINANCE":
        return "💳 POS Kasir & Finansial";
      case "ERP_OPERATIONAL":
        return "⚙️ ERP & Operasional Lapangan";
    }
  };

  const automationModules = result.modules.filter((m) => m.category === "AUTOMATION");

  return (
    <div className="diag-result-report" id="diagnosis-result-box" role="region" aria-label="Hasil Analisis Bisnis Scalebiz">
      {/* Report Header */}
      <div className="report-header-banner">
        <div className="report-eyebrow">
          <span className="eyebrow-ping" />
          <span>REKOMENDASI SISTEM DIGITAL SCALEBIZ</span>
        </div>
        <h2 className="report-main-title">
          {displayBrand} Membutuhkan Solusi yang Tepat Sasaran, Bukan Sekadar Website Brosur.
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
              ⏱️ Estimasi Pengerjaan: <strong>{result.timeEstimate}</strong>
            </span>
            <span className="solution-tag-badge">
              Rekomendasi Utama
            </span>
          </div>

          <button
            type="button"
            className="btn-restart-analysis"
            onClick={onRestart}
            title="Mulai Ulang dari Awal"
          >
            🔄 Ulangi dari Awal
          </button>
        </div>

        <h3 className="primary-sol-title">{result.primarySolution}</h3>

        {/* Identified Problems Chips */}
        {result.identifiedProblems.length > 0 && (
          <div className="identified-problems-strip">
            <span className="problems-strip-label">Masalah yang ingin kita bereskan:</span>
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
                    {result.isAiEnhanced ? "KAJIAN OBJEKTIF SCALEBIZ AI" : "KAJIAN ARSITEKTUR SISTEM SCALEBIZ"}
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
            <span>4 PILAR UTAMA LAYANAN SCALEBIZ</span>
          </div>
          <h4 className="modules-section-title">Solusi Menyeluruh untuk {displayBrand}</h4>
          <p className="modules-section-desc">
            Scalebiz menghadirkan 4 pilar sistem yang saling mengunci: <strong>Website</strong>, <strong>POS Finance & Accounting</strong>, <strong>ERP & Operasional</strong>, serta <strong>Automation</strong>. Seluruh modul di bawah ini dirancang presisi sesuai kendala bisnis Anda.
          </p>
        </div>

        {/* Global Module Selection & Control Bar */}
        <div className="module-selection-bar">
          <div className="selection-bar-info">
            <span className="selection-counter-badge">
              <span className="selection-count">{selectedModuleIds.length}</span> dari {result.modules.length} Fitur Terpilih
            </span>
            <span className="selection-help-text">
              Klik kartu modul untuk memilih fitur yang ingin diprioritaskan sesuai kebutuhan dan budget Anda.
            </span>
          </div>
          <div className="selection-bar-actions">
            <button
              type="button"
              className="btn-scope-filter"
              onClick={selectAllModules}
            >
              Pilih Semua
            </button>
            <button
              type="button"
              className="btn-scope-filter"
              onClick={selectCoreModulesOnly}
            >
              Fondasi Utama Saja
            </button>
          </div>
        </div>

        {/* Active Pillars Interactive Filter Tabs */}
        <div className="pillar-tabs-nav" role="tablist" aria-label="Navigasi Pilar Solusi">
          <button
            type="button"
            role="tab"
            aria-selected={activePillarTab === "all"}
            className={`pillar-tab-btn ${activePillarTab === "all" ? "active" : ""}`}
            onClick={() => setActivePillarTab("all")}
          >
            <span>Semua Pilar Solusi ({activePillars.length})</span>
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
                {isPillarPrimary && <span className="tab-primary-badge">Utama</span>}
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
                              ⭐ PILAR UTAMA (REKOMENDASI TERATAS)
                            </span>
                          )}
                        </div>
                        <p className="pillar-group-tagline">{pGroup.pillar.tagline}</p>
                      </div>
                    </div>
                    <div className="pillar-header-right">
                      <span className="pillar-modules-tally">
                        <strong>{selectedCountInPillar}</strong> dari {pGroup.modules.length} Fitur Terpilih
                      </span>
                    </div>
                  </div>

                  {/* AI Evaluation Quote for this Pillar if available */}
                  {aiPillarEvaluation && (
                    <div className="pillar-ai-insight-box">
                      <span className="insight-bulb">💡</span>
                      <p className="insight-text">
                        <strong>Kajian Scalebiz untuk {displayBrand}:</strong> {aiPillarEvaluation}
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
                                  aria-label={isSelected ? `Hapus ${mod.title}` : `Pilih ${mod.title}`}
                                >
                                  <span className="toggle-box">
                                    {isSelected && (
                                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                      </svg>
                                    )}
                                  </span>
                                  <span className="toggle-label">{isSelected ? "Dipilih" : "Tambah"}</span>
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
                                <strong className="benefit-tag-label">Manfaat langsung:</strong> {mod.purpose}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="pillar-empty-state">
                      <span>Belum ada modul tambahan pada pilar ini untuk profil saat ini. Konsultasikan fitur kustom bersama tim kami.</span>
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
              <strong>{selectedModuleIds.length} Modul Terpilih Siap Dikonsultasikan:</strong>
              <p>
                {selectedModuleIds.length > 0
                  ? "Daftar fitur prioritas yang Anda centang di atas akan otomatis dikelompokkan ke dalam draf pesan WhatsApp agar tim Scalebiz bisa langsung memberikan estimasi biaya yang presisi."
                  : "Silakan pilih minimal 1 modul untuk mendapatkan rincian estimasi pengerjaan spesifik."}
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
                <span>REKOMENDASI EFISIENSI ANGGARAN SCALEBIZ</span>
              </div>
              <h4 className="transparency-title">
                Sistem yang BELUM Mendesak untuk {displayBrand} Saat Ini
              </h4>
              <p className="transparency-subtitle">
                Scalebiz menganut prinsip konsultasi yang jujur: Anda tidak perlu membuang modal untuk membeli semua sistem sekaligus. Kami menyarankan Anda menunda pilar berikut agar anggaran operasional Anda tetap efisien:
              </p>
            </div>

            <div className="dormant-pillars-grid">
              {dormantPillars.map((dp) => (
                <div key={dp.pillarId} className="dormant-pillar-item">
                  <div className="dormant-item-top">
                    <span className="dormant-item-icon">{dp.icon}</span>
                    <strong className="dormant-item-title">{dp.title}</strong>
                    <span className="dormant-status-tag">Tunda / Belum Perlu</span>
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
          <h4 className="roadmap-section-title">Tahapan Pengerjaan Proyek:</h4>
          <p className="roadmap-section-desc">
            Dikerjakan secara bertahap agar operasional harian bisnis Anda tetap berjalan normal tanpa terganggu.
          </p>
        </div>

        <div className="roadmap-phases-grid">
          {result.roadmap.map((phase) => (
            <div key={phase.phaseNumber} className="roadmap-phase-card">
              <div className="phase-card-top">
                <span className="phase-num-pill">Tahap 0{phase.phaseNumber}</span>
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
          <span>*Estimasi waktu dan ruang lingkup teknis dapat disesuaikan dengan kebutuhan riil Anda saat sesi konsultasi bersama tim Scalebiz.</span>
        </div>
      </div>


      {/* Primary Action CTA Card */}
      <div className="result-action-cta-card">
        <h4 className="action-cta-heading">Ingin Diskusi Lebih Detail Soal Kebutuhan {displayBrand}?</h4>
        <p className="action-cta-subheading">
          Hasil diagnosa ini bisa langsung kita bahas santai lewat WhatsApp. Tidak perlu komitmen apa-apa dulu—kita diskusikan dulu alur sistem yang paling pas dengan budget dan skala bisnis Anda.
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
            <span>Konsultasi Santai via WhatsApp (Gratis)</span>
          </a>

          <button type="button" className="btn-secondary-restart" onClick={onRestart}>
            Ulangi dari Awal
          </button>
        </div>

        <span className="action-cta-note">
          *Draf pesan WhatsApp sudah terisi ringkasan bisnis Anda secara otomatis agar kita bisa langsung diskusi to-the-point tanpa tanya ulang dari awal.
        </span>
      </div>

    </div>
  );
}
