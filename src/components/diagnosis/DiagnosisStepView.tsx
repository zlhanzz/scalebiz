"use client";

import React, { useMemo, useState, useEffect } from "react";
import {
  DiagnosisState,
  BusinessType,
  BusinessPain,
  CustomerFlowChannel,
  OrderProcessingMethod,
  BusinessScale,
} from "@/types/diagnosis";
import {
  BUSINESS_TYPE_OPTIONS,
  BUSINESS_SUB_SECTORS_MAP,
  getRelevantPainPoints,
  getFilteredScales,
} from "@/data/diagnosisData";
import { useLanguage } from "@/context/LanguageContext";

const BUSINESS_TYPE_EN_MAP: Record<BusinessType, { title: string; desc: string }> = {
  kuliner_fnb: {
    title: "Culinary, Cafes & F&B",
    desc: "Cafes, restaurants, coffee shops, catering, bakery, cloud kitchens.",
  },
  properti_aset: {
    title: "Property, Real Estate & Hospitality",
    desc: "Housing developments, villas, guest houses, serviced rooms, and property agencies.",
  },
  travel_wisata: {
    title: "Travel, Tours & Umrah Agency",
    desc: "Umrah/Hajj travel, open trips, bus charters, and bespoke tour organizers.",
  },
  edukasi_bimbel: {
    title: "Education, Tutoring & Training",
    desc: "Academic tutoring, language/skill bootcamps, and vocational institutes.",
  },
  jasa_b2b: {
    title: "B2B Services, Contracting & Export",
    desc: "General contractors, interior designers, exporters, corporate vendors, and consultants.",
  },
  retail_d2c: {
    title: "Retail Stores & Physical Goods",
    desc: "Fashion brands, skincare/cosmetics, electronics, and retail distributors.",
  },
  booking_jasa: {
    title: "Salon, Barbershop & Personal Care",
    desc: "Beauty salons, barbershops, wellness spas, yoga studios, and aesthetics.",
  },
  klinik_kesehatan: {
    title: "Clinics & Healthcare Services",
    desc: "Dental clinics, pet clinics, general medical practices, and physiotherapy.",
  },
  event_organizer: {
    title: "Event & Wedding Organizers",
    desc: "Wedding planners, corporate gatherings, exhibitions/MICE, and festival promoters.",
  },
  agensi_kreatif: {
    title: "Creative, Digital & IT Agencies",
    desc: "Digital marketing agencies, software studios, production houses, and creative studios.",
  },
  jasa_cuci_laundry: {
    title: "Laundry, Auto Wash & Cleaning",
    desc: "Commercial laundry, auto detailing, home cleaning, and HVAC maintenance services.",
  },
  rental_aset: {
    title: "Vehicle Rental & Equipment Hire",
    desc: "Self-drive car/bike rentals, multimedia gear, heavy machinery, and outdoor equipment.",
  },
  operasional_lapangan: {
    title: "Workshops, Manufacturing & Logistics",
    desc: "Auto repair workshops, agritech/farming, industrial fabrication, and warehousing.",
  },
  lainnya: {
    title: "Other Business / Custom Model",
    desc: "Specialized industries, hybrid business models, and multi-division operations.",
  },
};

interface DiagnosisStepViewProps {
  currentStep: number;
  state: DiagnosisState;
  onChange: (updates: Partial<DiagnosisState>) => void;
  validationError: string | null;
}

export default function DiagnosisStepView({
  currentStep,
  state,
  onChange,
  validationError,
}: DiagnosisStepViewProps) {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  // Active modal state: opens specific picker dialog when a form trigger menu is clicked
  const [activeModal, setActiveModal] = useState<
    "sector" | "subsector" | "painPoints" | "customerFlow" | "orderProcessing" | "businessScale" | null
  >(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Helpers for selected business type and subsector
  const selectedBizType = BUSINESS_TYPE_OPTIONS.find((b) => b.value === state.businessType);
  const selectedBizEn = state.businessType ? BUSINESS_TYPE_EN_MAP[state.businessType] : null;
  const selectedBizTitle = (isEn && selectedBizEn?.title) || selectedBizType?.title;

  const availableSubSectors = state.businessType ? BUSINESS_SUB_SECTORS_MAP[state.businessType] || [] : [];
  const selectedSub = availableSubSectors.find((s) => s.id === state.subSector);

  // Step 2 Pain Points Helpers
  const relevantPains = useMemo(
    () => getRelevantPainPoints(state.businessType, state.subSector),
    [state.businessType, state.subSector]
  );

  // Step 4 Business Scale Helpers
  const relevantScales = useMemo(
    () => getFilteredScales(state.businessType, state.subSector),
    [state.businessType, state.subSector]
  );

  // Helper Toggle Multi-Select Array
  const toggleArrayItem = <T extends string>(list: T[], item: T): T[] => {
    if (list.includes(item)) {
      return list.filter((i) => i !== item);
    }
    return [...list, item];
  };

  // Modern Monoline Vector Icons Helpers
  const renderChannelIcon = (val: CustomerFlowChannel) => {
    switch (val) {
      case "whatsapp":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        );
      case "social_media":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        );
      case "website":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        );
      case "datang_langsung":
      default:
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
            <path d="M2 7h20" />
          </svg>
        );
    }
  };

  const renderProcessingIcon = (val: OrderProcessingMethod) => {
    switch (val) {
      case "manual_whatsapp":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        );
      case "excel_sheets":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="3" y1="15" x2="21" y2="15" />
            <line x1="9" y1="3" x2="9" y2="21" />
            <line x1="15" y1="3" x2="15" y2="21" />
          </svg>
        );
      case "catat_buku":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          </svg>
        );
      case "software_khusus":
      default:
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M7 15h.01" />
            <path d="M12 15h.01" />
            <path d="M17 15h.01" />
            <path d="M7 11h.01" />
            <path d="M12 11h.01" />
            <path d="M17 11h.01" />
            <path d="M7 7h10" />
          </svg>
        );
    }
  };

  return (
    <div className="kinetik-view-wrapper">
      {/* VALIDATION ERROR BANNER */}
      {validationError && (
        <div className="diag-validation-banner animate-fade-in" role="alert">
          <div className="validation-banner-content">
            <span className="validation-banner-icon">⚠️</span>
            <span className="validation-banner-text">{validationError}</span>
          </div>
        </div>
      )}

      {/* =====================================================================
          STEP 1: INDUSTRY & BUSINESS MODEL (FORM INPUT MENU SYSTEM)
          ===================================================================== */}
      {currentStep === 1 && (
        <div className="animate-fade-in">
          <div className="kinetik-pretitle">
            <span>●</span> {isEn ? "INDUSTRY PROFILE • Single-Select" : "PROFIL INDUSTRI • Pilih 1 Kategori"}
          </div>
          <h2 className="kinetik-title">
            {isEn ? "What is your company's primary line of business?" : "Apa sektor bidang usaha utama bisnis Anda?"}
          </h2>
          <p className="kinetik-desc">
            {isEn
              ? "Select your core industry category so Scalebiz Core can calibrate automation architecture specifically for your sector."
              : "Pilih industri yang paling merepresentasikan operasional bisnis Anda saat ini untuk kalibrasi arsitektur sistem yang presisi."}
          </p>

          {/* GROUP 1: PRIMARY SECTOR INPUT MENU */}
          <div className="kinetik-group-card">
            <div className="kinetik-group-header">
              <div className="kinetik-header-left">
                <span className="kinetik-group-num">1</span>
                <span className="kinetik-group-title">
                  {isEn ? "Primary Business Sector" : "Bidang Usaha Utama"}
                </span>
                <span className="kinetik-badge-required">
                  {isEn ? "Required" : "Wajib Dipilih"}
                </span>
                <span className="kinetik-badge-multi">
                  {isEn ? "Single Select" : "Pilih 1"}
                </span>
              </div>
              <span className={`kinetik-badge-counter ${state.businessType ? "active" : ""}`}>
                {state.businessType ? (isEn ? "✓ 1 Selected" : "✓ 1 Terpilih") : (isEn ? "Required" : "Belum Dipilih")}
              </span>
            </div>
            <p className="kinetik-group-desc">
              {isEn
                ? "Select the primary category that best reflects your core business model."
                : "Pilih kategori bidang usaha utama yang paling merefleksikan operasional bisnis Anda."}
            </p>

            {/* Menu Input Trigger */}
            <button
              type="button"
              className={`kinetik-form-trigger ${state.businessType ? "active" : ""}`}
              onClick={() => setActiveModal("sector")}
            >
              <div className="kinetik-trigger-left">
                <div className="kinetik-trigger-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                    <path d="M9 22v-4h6v4" />
                    <path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M8 10h.01" /><path d="M16 10h.01" />
                  </svg>
                </div>
                <div className="kinetik-trigger-content">
                  {state.businessType ? (
                    <div className="kinetik-trigger-selected-wrap">
                      <span style={{ fontSize: "14.5px", fontWeight: "700", color: "#ffffff" }}>
                        {selectedBizTitle}
                      </span>
                      <span className="kinetik-card-badge blue">
                        {isEn ? "Selected" : "Terpilih"}
                      </span>
                    </div>
                  ) : (
                    <span className="kinetik-trigger-placeholder">
                      {isEn
                        ? "Click to choose business sector (Culinary, Retail, Services, Clinic, etc)..."
                        : "Klik untuk memilih sektor usaha (Kuliner, Retail, Jasa, Klinik, dsb)..."}
                    </span>
                  )}
                </div>
              </div>
              <div className="kinetik-trigger-right">
                <span className="kinetik-trigger-btn-pill">
                  {state.businessType ? (isEn ? "Change ▾" : "Ubah ▾") : (isEn ? "Select ▾" : "Pilih Sektor ▾")}
                </span>
              </div>
            </button>
          </div>

          {/* GROUP 2: DYNAMIC SUB-SECTOR INPUT MENU */}
          {availableSubSectors.length > 0 && (
            <div className="kinetik-group-card">
              <div className="kinetik-group-header">
                <div className="kinetik-header-left">
                  <span className="kinetik-group-num">2</span>
                  <span className="kinetik-group-title">
                    {isEn ? "Sub-Sector Specification" : "Spesifikasi Sub-sektor"}
                  </span>
                  <span className="kinetik-badge-required">
                    {isEn ? "Required" : "Wajib Dipilih"}
                  </span>
                  <span className="kinetik-badge-multi">
                    {isEn ? "Single Select" : "Pilih 1"}
                  </span>
                </div>
                <span className={`kinetik-badge-counter ${state.subSector ? "active" : ""}`}>
                  {state.subSector ? (isEn ? "✓ 1 Selected" : "✓ 1 Terpilih") : (isEn ? "Required" : "Belum Dipilih")}
                </span>
              </div>
              <p className="kinetik-group-desc">
                {isEn
                  ? "Detailing your sub-sector activates industry-specific diagnostic rules."
                  : "Detail sub-sektor mengaktifkan model diagnosa khusus untuk cabang industri Anda."}
              </p>

              {/* Menu Input Trigger */}
              <button
                type="button"
                className={`kinetik-form-trigger ${state.subSector ? "active" : ""}`}
                onClick={() => setActiveModal("subsector")}
              >
                <div className="kinetik-trigger-left">
                  <div className="kinetik-trigger-icon-box">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                  </div>
                  <div className="kinetik-trigger-content">
                    {selectedSub ? (
                      <div className="kinetik-trigger-selected-wrap">
                        <span style={{ fontSize: "14.5px", fontWeight: "700", color: "#ffffff" }}>
                          {selectedSub.title}
                        </span>
                      </div>
                    ) : (
                      <span className="kinetik-trigger-placeholder">
                        {isEn ? "Click to specify sub-sector variation..." : "Klik untuk memilih spesifikasi sub-sektor..."}
                      </span>
                    )}
                  </div>
                </div>
                <div className="kinetik-trigger-right">
                  <span className="kinetik-trigger-btn-pill">
                    {state.subSector ? (isEn ? "Change ▾" : "Ubah ▾") : (isEn ? "Select ▾" : "Pilih Sub-sektor ▾")}
                  </span>
                </div>
              </button>
            </div>
          )}

          {/* GROUP 3: CUSTOM BUSINESS MODEL TEXT INPUT (OPTIONAL) */}
          <div className="kinetik-group-card">
            <div className="kinetik-group-header">
              <div className="kinetik-header-left">
                <span className="kinetik-group-num">{availableSubSectors.length > 0 ? "3" : "2"}</span>
                <span className="kinetik-group-title">
                  {isEn ? "Custom Business Model Notes" : "Catatan Model Bisnis Unik"}
                </span>
                <span className="kinetik-badge-multi">
                  {isEn ? "Optional" : "Opsional"}
                </span>
              </div>
            </div>
            <p className="kinetik-group-desc">
              {isEn
                ? "If your operations involve hybrid channels, franchise networks, or custom workflows, describe them briefly here."
                : "Jika bisnis Anda memiliki model hibrida, jaringan waralaba, atau alur kerja khusus, sebutkan secara singkat di sini."}
            </p>
            <input
              type="text"
              placeholder={
                isEn
                  ? "e.g. Self-manufactured fashion brand + B2B wholesale consignment..."
                  : "Contoh: Brand fashion produksi sendiri + sistem titip jual konsinyasi di 5 toko..."
              }
              value={state.customBusinessType}
              onChange={(e) => onChange({ customBusinessType: e.target.value })}
              className="diag-text-field"
            />
          </div>
        </div>
      )}

      {/* =====================================================================
          STEP 2: BOTTLENECK & PAIN POINTS (FORM INPUT MENU SYSTEM)
          ===================================================================== */}
      {currentStep === 2 && (
        <div className="animate-fade-in">
          <div className="kinetik-pretitle">
            <span>●</span> {isEn ? "OPERATIONAL BOTTLENECK • Multi-Select" : "ANALISIS HAMBATAN • Multi-seleksi"}
          </div>
          <h2 className="kinetik-title">
            {isEn
              ? "What operational friction limits your business growth?"
              : "Apa kendala operasional yang paling membatasi pertumbuhan bisnis Anda?"}
          </h2>
          <p className="kinetik-desc">
            {isEn
              ? "Select all pain points that cause revenue leaks, staff burnout, or slow response times."
              : "Pilih semua hambatan yang dihadapi tim Anda. Scalebiz Core akan memetakan otomatisasi yang tepat untuk mengeliminasinya."}
          </p>

          {/* GROUP 1: OPERATIONAL BOTTLENECKS */}
          <div className="kinetik-group-card">
            <div className="kinetik-group-header">
              <div className="kinetik-header-left">
                <span className="kinetik-group-num">1</span>
                <span className="kinetik-group-title">
                  {isEn ? "Operational Bottlenecks" : "Kendala Operasional Bisnis"}
                </span>
                <span className="kinetik-badge-required">
                  {isEn ? "Required" : "Wajib Dipilih"}
                </span>
                <span className="kinetik-badge-multi">
                  {isEn ? "Multi-Select" : "Bisa Pilih > 1"}
                </span>
              </div>
              <span className={`kinetik-badge-counter ${state.painPoints.length > 0 ? "active" : ""}`}>
                {state.painPoints.length > 0
                  ? isEn
                    ? `✓ ${state.painPoints.length} Selected`
                    : `✓ ${state.painPoints.length} Kendala Dipilih`
                  : isEn
                  ? "Required"
                  : "Belum Dipilih"}
              </span>
            </div>
            <p className="kinetik-group-desc">
              {isEn
                ? "Click the input below to open the bottleneck selector and choose all applicable points."
                : "Klik menu input di bawah untuk membuka daftar pilihan kendala dan mencentang semua titik masalah tim Anda."}
            </p>

            {/* Menu Input Trigger */}
            <button
              type="button"
              className={`kinetik-form-trigger ${state.painPoints.length > 0 ? "active" : ""}`}
              onClick={() => setActiveModal("painPoints")}
            >
              <div className="kinetik-trigger-left">
                <div className="kinetik-trigger-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <div className="kinetik-trigger-content">
                  {state.painPoints.length > 0 ? (
                    <div className="kinetik-trigger-selected-wrap">
                      {state.painPoints.slice(0, 2).map((pid) => {
                        const item = relevantPains.find((p) => p.value === pid);
                        const label = item ? item.title : pid;
                        return (
                          <span key={pid} className="kinetik-trigger-chip">
                            ✓ {label}
                          </span>
                        );
                      })}
                      {state.painPoints.length > 2 && (
                        <span className="kinetik-trigger-chip-more">
                          +{state.painPoints.length - 2} {isEn ? "more" : "lainnya"}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="kinetik-trigger-placeholder">
                      {isEn
                        ? "Click to choose operational bottlenecks (slow admin, leaks, manual orders)..."
                        : "Pilih kendala operasional yang dihadapi tim Anda (klik untuk memilih)..."}
                    </span>
                  )}
                </div>
              </div>
              <div className="kinetik-trigger-right">
                <span className="kinetik-trigger-btn-pill">
                  {state.painPoints.length > 0 ? (isEn ? "Edit / Add ▾" : "Ubah / Tambah ▾") : (isEn ? "Select ▾" : "Pilih Kendala ▾")}
                </span>
              </div>
            </button>
          </div>

          {/* Conditional textarea if 'lainnya' chosen */}
          {state.painPoints.includes("lainnya") && (
            <div className="kinetik-group-card animate-fade-in" style={{ marginTop: "16px" }}>
              <div className="kinetik-group-header">
                <div className="kinetik-header-left">
                  <span className="kinetik-group-num">2</span>
                  <span className="kinetik-group-title">
                    {isEn ? "Describe Your Custom Bottleneck" : "Ceritakan Kendala Khusus Anda"}
                  </span>
                  <span className="kinetik-badge-multi">{isEn ? "Optional" : "Opsional"}</span>
                </div>
              </div>
              <p className="kinetik-group-desc">
                {isEn
                  ? "Briefly describe the specific process causing operational delay or financial leakage."
                  : "Jelaskan secara singkat proses mana yang paling memakan waktu atau sering terjadi kebocoran."}
              </p>
              <textarea
                rows={3}
                placeholder={
                  isEn
                    ? "e.g. Reconciliation between offline pos and online shopee takes 3 hours every night..."
                    : "Contoh: Rekap nota fisik kasir dengan mutasi bank memakan waktu 3 jam tiap malam..."
                }
                value={state.customPainPoint}
                onChange={(e) => onChange({ customPainPoint: e.target.value })}
                className="diag-textarea-field"
              />
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          STEP 3: TRANSACTION FLOW & PROCESSING (FORM INPUT MENU SYSTEM)
          ===================================================================== */}
      {currentStep === 3 && (
        <div className="animate-fade-in">
          <div className="kinetik-pretitle">
            <span>●</span> {isEn ? "OPERATIONAL ROUTING • Multi-Select Active" : "KONFIGURASI OPERASIONAL • Multi-seleksi aktif"}
          </div>
          <h2 className="kinetik-title">
            {isEn
              ? "How do customer transactions and orders enter and get processed?"
              : "Bagaimana alur transaksi dan pesanan biasanya masuk?"}
          </h2>
          <p className="kinetik-desc">
            {isEn
              ? "Select customer channels and how your team processes orders. Both sections are required for accurate automation blueprinting."
              : "Pilih kanal transaksi pelanggan dan cara tim Anda memproses pesanan saat ini. Anda dapat memilih lebih dari satu opsi untuk kalibrasi otomasi yang akurat."}
          </p>

          {/* GROUP 1: CUSTOMER INFLOW CHANNELS */}
          <div className="kinetik-group-card">
            <div className="kinetik-group-header">
              <div className="kinetik-header-left">
                <span className="kinetik-group-num">1</span>
                <span className="kinetik-group-title">
                  {isEn ? "Customer Transaction Channels" : "Kanal Transaksi Pelanggan"}
                </span>
                <span className="kinetik-badge-required">
                  {isEn ? "Required" : "Wajib Dipilih"}
                </span>
                <span className="kinetik-badge-multi">
                  {isEn ? "Multi-Select" : "Bisa Pilih > 1"}
                </span>
              </div>
              <span className={`kinetik-badge-counter ${state.customerFlow.length > 0 ? "active" : ""}`}>
                {state.customerFlow.length > 0
                  ? isEn
                    ? `✓ ${state.customerFlow.length} Selected`
                    : `✓ ${state.customerFlow.length} Kanal Dipilih`
                  : isEn
                  ? "Required"
                  : "Belum Dipilih"}
              </span>
            </div>
            <p className="kinetik-group-desc">
              {isEn
                ? "Where do prospective buyers or clients most frequently place orders or reservations?"
                : "Di mana calon pembeli atau pelanggan paling sering mengirim pesanan produk maupun reservasi Anda?"}
            </p>

            {/* Menu Input Trigger */}
            <button
              type="button"
              className={`kinetik-form-trigger ${state.customerFlow.length > 0 ? "active" : ""}`}
              onClick={() => setActiveModal("customerFlow")}
            >
              <div className="kinetik-trigger-left">
                <div className="kinetik-trigger-icon-box">
                  {renderChannelIcon("whatsapp")}
                </div>
                <div className="kinetik-trigger-content">
                  {state.customerFlow.length > 0 ? (
                    <div className="kinetik-trigger-selected-wrap">
                      {state.customerFlow.slice(0, 2).map((ch) => {
                        const title =
                          ch === "whatsapp"
                            ? "WhatsApp Direct"
                            : ch === "social_media"
                            ? "Instagram DM & TikTok"
                            : ch === "website"
                            ? "Website / Katalog"
                            : "Kasir / Walk-in";
                        return (
                          <span key={ch} className="kinetik-trigger-chip">
                            ✓ {title}
                          </span>
                        );
                      })}
                      {state.customerFlow.length > 2 && (
                        <span className="kinetik-trigger-chip-more">
                          +{state.customerFlow.length - 2} {isEn ? "more" : "lainnya"}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="kinetik-trigger-placeholder">
                      {isEn
                        ? "Click to choose transaction channels (WhatsApp, IG DM, Website, Physical Store)..."
                        : "Pilih kanal transaksi pelanggan (WhatsApp, IG DM, Website, Kasir)..."}
                    </span>
                  )}
                </div>
              </div>
              <div className="kinetik-trigger-right">
                <span className="kinetik-trigger-btn-pill">
                  {state.customerFlow.length > 0 ? (isEn ? "Edit / Add ▾" : "Ubah / Tambah ▾") : (isEn ? "Select ▾" : "Pilih Kanal ▾")}
                </span>
              </div>
            </button>
          </div>

          {/* GROUP 2: ORDER PROCESSING METHODS */}
          <div className="kinetik-group-card">
            <div className="kinetik-group-header">
              <div className="kinetik-header-left">
                <span className="kinetik-group-num">2</span>
                <span className="kinetik-group-title">
                  {isEn ? "Order & Transaction Processing Method" : "Cara Tim Memproses Transaksi"}
                </span>
                <span className="kinetik-badge-required">
                  {isEn ? "Required" : "Wajib Dipilih"}
                </span>
                <span className="kinetik-badge-multi">
                  {isEn ? "Multi-Select" : "Bisa Pilih > 1"}
                </span>
              </div>
              <span className={`kinetik-badge-counter ${state.orderProcessing.length > 0 ? "active" : ""}`}>
                {state.orderProcessing.length > 0
                  ? isEn
                    ? `✓ ${state.orderProcessing.length} Selected`
                    : `✓ ${state.orderProcessing.length} Metode Dipilih`
                  : isEn
                  ? "Required"
                  : "Belum Dipilih"}
              </span>
            </div>
            <p className="kinetik-group-desc">
              {isEn
                ? "How are order recording, payment verification, and order fulfillment currently handled?"
                : "Bagaimana alur pencatatan, verifikasi bayar, dan pemenuhan pesanan dilakukan operasional saat ini?"}
            </p>

            {/* Menu Input Trigger */}
            <button
              type="button"
              className={`kinetik-form-trigger ${state.orderProcessing.length > 0 ? "active" : ""}`}
              onClick={() => setActiveModal("orderProcessing")}
            >
              <div className="kinetik-trigger-left">
                <div className="kinetik-trigger-icon-box">
                  {renderProcessingIcon("manual_whatsapp")}
                </div>
                <div className="kinetik-trigger-content">
                  {state.orderProcessing.length > 0 ? (
                    <div className="kinetik-trigger-selected-wrap">
                      {state.orderProcessing.slice(0, 2).map((m) => {
                        const title =
                          m === "manual_whatsapp"
                            ? isEn
                              ? "Manual Chat"
                              : "Chat Manual"
                            : m === "excel_sheets"
                            ? "Spreadsheet (Excel/Sheets)"
                            : m === "catat_buku"
                            ? isEn
                              ? "Paper Ledgers"
                              : "Catat Nota / Buku"
                            : "Aplikasi POS / Kasir";
                        return (
                          <span key={m} className="kinetik-trigger-chip">
                            ✓ {title}
                          </span>
                        );
                      })}
                      {state.orderProcessing.length > 2 && (
                        <span className="kinetik-trigger-chip-more">
                          +{state.orderProcessing.length - 2} {isEn ? "more" : "lainnya"}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="kinetik-trigger-placeholder">
                      {isEn
                        ? "Click to choose transaction processing methods (Manual Chat, Spreadsheets, POS)..."
                        : "Pilih cara tim Anda memproses transaksi (Chat Manual, Spreadsheet, Kasir)..."}
                    </span>
                  )}
                </div>
              </div>
              <div className="kinetik-trigger-right">
                <span className="kinetik-trigger-btn-pill">
                  {state.orderProcessing.length > 0 ? (isEn ? "Edit / Add ▾" : "Ubah / Tambah ▾") : (isEn ? "Select ▾" : "Pilih Metode ▾")}
                </span>
              </div>
            </button>
          </div>

          {/* CALLOUT INFO */}
          <div className="kinetik-callout">
            <div className="kinetik-callout-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="kinetik-callout-content">
              <span className="kinetik-callout-title">
                {isEn
                  ? "Your Data Defines Scalebiz Core Routing Logic"
                  : "Data Anda Menentukan Konfigurasi Routing Scalebiz Core"}
              </span>
              <span className="kinetik-callout-desc">
                {isEn
                  ? "Our system will configure automatic webhook gateways, AI auto-replies, and order fulfillment queues tailored specifically to your channel combination."
                  : "Sistem kami akan menyiapkan webhook gateway otomatis, format auto-reply AI, dan pipeline antrean pesanan sesuai kombinasi kanal yang Anda pilih di atas."}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          STEP 4: BUSINESS SCALE & IDENTITY (FORM INPUT MENU SYSTEM)
          ===================================================================== */}
      {currentStep === 4 && (
        <div className="animate-fade-in">
          <div className="kinetik-pretitle">
            <span>●</span> {isEn ? "SCALE & PROFILE • Operational Sizing" : "SKALA & PROFIL • Kapasitas Operasional"}
          </div>
          <h2 className="kinetik-title">
            {isEn
              ? "What is your operational team scale and brand name?"
              : "Berapa skala tim operasional & siapa nama brand Anda?"}
          </h2>
          <p className="kinetik-desc">
            {isEn
              ? "Tailors user access levels, multi-role security permissions, and personalizes your architectural blueprint."
              : "Untuk menyesuaikan hak akses pengguna, arsitektur database, dan personalisasi dokumen rekomendasi sistem Anda."}
          </p>

          {/* GROUP 1: OPERATIONAL SCALE INPUT MENU */}
          <div className="kinetik-group-card">
            <div className="kinetik-group-header">
              <div className="kinetik-header-left">
                <span className="kinetik-group-num">1</span>
                <span className="kinetik-group-title">
                  {isEn ? "Team Operational Scale" : "Skala & Jumlah Karyawan / Tim"}
                </span>
                <span className="kinetik-badge-required">
                  {isEn ? "Required" : "Wajib Dipilih"}
                </span>
                <span className="kinetik-badge-multi">
                  {isEn ? "Single Select" : "Pilih 1"}
                </span>
              </div>
              <span className={`kinetik-badge-counter ${state.businessScale ? "active" : ""}`}>
                {state.businessScale ? (isEn ? "✓ 1 Selected" : "✓ 1 Terpilih") : (isEn ? "Required" : "Belum Dipilih")}
              </span>
            </div>
            <p className="kinetik-group-desc">
              {isEn
                ? "How many team members, cashiers, or field units are actively involved in daily operations?"
                : "Berapa banyak orang atau armada/unit yang terlibat dalam operasional bisnis Anda saat ini?"}
            </p>

            {/* Menu Input Trigger */}
            <button
              type="button"
              className={`kinetik-form-trigger ${state.businessScale ? "active" : ""}`}
              onClick={() => setActiveModal("businessScale")}
            >
              <div className="kinetik-trigger-left">
                <div className="kinetik-trigger-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="kinetik-trigger-content">
                  {state.businessScale ? (
                    <div className="kinetik-trigger-selected-wrap">
                      <span style={{ fontSize: "14.5px", fontWeight: "700", color: "#ffffff" }}>
                        {relevantScales.find((s) => s.value === state.businessScale)?.label || state.businessScale}
                      </span>
                      <span className="kinetik-card-badge blue">
                        {relevantScales.find((s) => s.value === state.businessScale)?.range}
                      </span>
                    </div>
                  ) : (
                    <span className="kinetik-trigger-placeholder">
                      {isEn
                        ? "Click to choose operational scale (Solo, Small Team, Established, Enterprise)..."
                        : "Pilih kapasitas jumlah tim operasional..."}
                    </span>
                  )}
                </div>
              </div>
              <div className="kinetik-trigger-right">
                <span className="kinetik-trigger-btn-pill">
                  {state.businessScale ? (isEn ? "Change ▾" : "Ubah ▾") : (isEn ? "Select ▾" : "Pilih Skala ▾")}
                </span>
              </div>
            </button>
          </div>

          {/* GROUP 2: BRAND IDENTITY */}
          <div className="kinetik-group-card">
            <div className="kinetik-group-header">
              <div className="kinetik-header-left">
                <span className="kinetik-group-num">2</span>
                <span className="kinetik-group-title">
                  {isEn ? "Brand & Business Identity" : "Identitas & Profil Brand"}
                </span>
                <span className="kinetik-badge-required">
                  {isEn ? "Required" : "Wajib Diisi"}
                </span>
                <span className="kinetik-badge-multi">
                  {isEn ? "Personalization" : "Personalisasi"}
                </span>
              </div>
            </div>
            <p className="kinetik-group-desc">
              {isEn
                ? "Your brand name will be embedded into your diagnostic architectural blueprint."
                : "Nama usaha Anda akan digunakan untuk personalisasi dokumen rekomendasi arsitektur."}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#f1f5f9", marginBottom: "6px" }}>
                  {isEn ? "Business or Brand Name" : "Nama Bisnis / Brand Anda"} <span style={{ color: "#f87171" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder={
                    isEn
                      ? "e.g. Kopi Ruang Singgah, Mentlife Clinic, RuangTani, etc."
                      : "Contoh: Kopi Ruang Singgah, Klinik Mentlife, RuangTani, dsb."
                  }
                  value={state.companyName}
                  onChange={(e) => onChange({ companyName: e.target.value })}
                  className="diag-text-field"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#f1f5f9", marginBottom: "6px" }}>
                  {isEn ? "Current Website / Instagram / Linktree (Optional)" : "Website / Instagram / Linktree Saat Ini (Opsional)"}
                </label>
                <input
                  type="text"
                  placeholder={
                    isEn
                      ? "e.g. www.yourbrand.com or @yourbrand.id"
                      : "Contoh: www.brandanda.com atau @brandanda.id"
                  }
                  value={state.companyWebsite}
                  onChange={(e) => onChange({ companyWebsite: e.target.value })}
                  className="diag-text-field"
                />
              </div>
            </div>
          </div>

          {/* CALLOUT INFO */}
          <div className="kinetik-callout">
            <div className="kinetik-callout-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="kinetik-callout-content">
              <span className="kinetik-callout-title">
                {isEn ? "Full Confidentiality Guaranteed" : "Kerahasiaan Data Terjamin Penuh"}
              </span>
              <span className="kinetik-callout-desc">
                {isEn
                  ? "Your diagnostic inputs are strictly processed to generate custom system blueprints and are never shared with third parties."
                  : "Informasi bisnis Anda hanya digunakan untuk menghasilkan evaluasi arsitektur sistem kustom dan tidak akan disebarluaskan."}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          ENTERPRISE KINETIK PICKER MODALS (POPUP UPON TRIGGER CLICK)
          ===================================================================== */}

      {/* 1. SECTOR MODAL */}
      {activeModal === "sector" && (
        <div className="kinetik-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="kinetik-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="kinetik-modal-header">
              <div className="kinetik-modal-header-left">
                <span className="kinetik-group-num">1</span>
                <div className="kinetik-modal-header-text">
                  <div className="kinetik-modal-title-row">
                    <span className="kinetik-modal-title">
                      {isEn ? "Select Primary Business Sector" : "Pilih Bidang Usaha Utama"}
                    </span>
                    <span className="kinetik-badge-required">{isEn ? "Required" : "Wajib Dipilih"}</span>
                    <span className="kinetik-badge-multi">{isEn ? "Single Select" : "Pilih 1"}</span>
                  </div>
                  <p className="kinetik-modal-subtitle">
                    {isEn
                      ? "Select the primary category that best reflects your core business model."
                      : "Pilih kategori bidang usaha utama yang paling relevan dengan operasional bisnis Anda."}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="kinetik-modal-close-btn"
                onClick={() => setActiveModal(null)}
                aria-label="Tutup modal"
              >
                ✕
              </button>
            </div>

            <div className="kinetik-modal-body">
              <div className="kinetik-options-grid">
                {BUSINESS_TYPE_OPTIONS.map((opt) => {
                  const isSelected = state.businessType === opt.value;
                  const enData = BUSINESS_TYPE_EN_MAP[opt.value];
                  const title = (isEn && enData?.title) || opt.title;
                  const desc = (isEn && enData?.desc) || opt.description;

                  return (
                    <button
                      key={opt.value}
                      type="button"
                      className={`kinetik-option-card ${isSelected ? "selected" : ""}`}
                      onClick={() => {
                        onChange({
                          businessType: opt.value,
                          subSector: "",
                          painPoints: [],
                          customerFlow: [],
                          orderProcessing: [],
                        });
                        setActiveModal(null);
                      }}
                    >
                      <div className="kinetik-card-top">
                        <div className="kinetik-card-icon-box">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                            <path d="M9 22v-4h6v4" />
                            <path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M8 10h.01" /><path d="M16 10h.01" />
                          </svg>
                        </div>
                        <div className="kinetik-radio">
                          {isSelected && <span className="kinetik-radio-dot" />}
                        </div>
                      </div>
                      <div className="kinetik-card-body">
                        <div className="kinetik-card-title-row">
                          <span className="kinetik-card-title">{title}</span>
                        </div>
                        <span className="kinetik-card-desc">{desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="kinetik-modal-footer">
              <div className="kinetik-modal-footer-count">
                <span>{state.businessType ? (isEn ? "1 sector selected" : "1 sektor terpilih") : (isEn ? "Select an option" : "Pilih salah satu sektor")}</span>
              </div>
              <button
                type="button"
                className="kinetik-modal-confirm-btn"
                onClick={() => setActiveModal(null)}
              >
                {isEn ? "Close" : "Tutup"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. SUB-SECTOR MODAL */}
      {activeModal === "subsector" && (
        <div className="kinetik-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="kinetik-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="kinetik-modal-header">
              <div className="kinetik-modal-header-left">
                <span className="kinetik-group-num">2</span>
                <div className="kinetik-modal-header-text">
                  <div className="kinetik-modal-title-row">
                    <span className="kinetik-modal-title">
                      {isEn ? "Sub-Sector Specification" : "Spesifikasi Sub-sektor"}
                    </span>
                    <span className="kinetik-badge-required">{isEn ? "Required" : "Wajib Dipilih"}</span>
                    <span className="kinetik-badge-multi">{isEn ? "Single Select" : "Pilih 1"}</span>
                  </div>
                  <p className="kinetik-modal-subtitle">
                    {isEn
                      ? `Select sub-sector specialization for ${selectedBizTitle}.`
                      : `Pilih spesialisasi sub-sektor untuk bidang ${selectedBizTitle}.`}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="kinetik-modal-close-btn"
                onClick={() => setActiveModal(null)}
                aria-label="Tutup modal"
              >
                ✕
              </button>
            </div>

            <div className="kinetik-modal-body">
              <div className="kinetik-options-grid">
                {availableSubSectors.map((sub) => {
                  const isSelected = state.subSector === sub.id;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      className={`kinetik-option-card ${isSelected ? "selected" : ""}`}
                      onClick={() => {
                        onChange({ subSector: sub.id });
                        setActiveModal(null);
                      }}
                    >
                      <div className="kinetik-card-top">
                        <div className="kinetik-card-icon-box">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 2 7 12 12 22 7 12 2" />
                            <polyline points="2 17 12 22 22 17" />
                          </svg>
                        </div>
                        <div className="kinetik-radio">
                          {isSelected && <span className="kinetik-radio-dot" />}
                        </div>
                      </div>
                      <div className="kinetik-card-body">
                        <div className="kinetik-card-title-row">
                          <span className="kinetik-card-title">{sub.title}</span>
                        </div>
                        <span className="kinetik-card-desc">{sub.description}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="kinetik-modal-footer">
              <div className="kinetik-modal-footer-count">
                <span>{state.subSector ? (isEn ? "1 sub-sector selected" : "1 sub-sektor terpilih") : (isEn ? "Select an option" : "Pilih salah satu")}</span>
              </div>
              <button
                type="button"
                className="kinetik-modal-confirm-btn"
                onClick={() => setActiveModal(null)}
              >
                {isEn ? "Close" : "Tutup"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. PAIN POINTS MODAL (MULTI-SELECT) */}
      {activeModal === "painPoints" && (
        <div className="kinetik-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="kinetik-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="kinetik-modal-header">
              <div className="kinetik-modal-header-left">
                <span className="kinetik-group-num">1</span>
                <div className="kinetik-modal-header-text">
                  <div className="kinetik-modal-title-row">
                    <span className="kinetik-modal-title">
                      {isEn ? "Operational Bottlenecks & Friction" : "Kendala Operasional Bisnis"}
                    </span>
                    <span className="kinetik-badge-required">{isEn ? "Required" : "Wajib Dipilih"}</span>
                    <span className="kinetik-badge-multi">{isEn ? "Multi-Select" : "Bisa Pilih > 1"}</span>
                  </div>
                  <p className="kinetik-modal-subtitle">
                    {isEn
                      ? "Select all obstacles that cause operational friction in your team."
                      : "Pilih semua hambatan yang paling membatasi pertumbuhan atau efisiensi operasional tim Anda."}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="kinetik-modal-close-btn"
                onClick={() => setActiveModal(null)}
                aria-label="Tutup modal"
              >
                ✕
              </button>
            </div>

            <div className="kinetik-modal-body">
              <div className="kinetik-options-grid">
                {relevantPains.map((p) => {
                  const isSelected = state.painPoints.includes(p.value);

                  return (
                    <button
                      key={p.value}
                      type="button"
                      className={`kinetik-option-card ${isSelected ? "selected" : ""}`}
                      onClick={() => {
                        const updated = toggleArrayItem(state.painPoints, p.value);
                        onChange({ painPoints: updated });
                      }}
                    >
                      <div className="kinetik-card-top">
                        <div className="kinetik-card-icon-box rose">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                          </svg>
                        </div>
                        <div className="kinetik-checkbox">
                          {isSelected && (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="kinetik-card-body">
                        <div className="kinetik-card-title-row">
                          <span className="kinetik-card-title">{p.title}</span>
                        </div>
                        <span className="kinetik-card-desc">{p.description}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="kinetik-modal-footer">
              <div className="kinetik-modal-footer-count">
                <span>
                  <strong>{state.painPoints.length}</strong> {isEn ? "bottlenecks selected" : "kendala dipilih"}
                </span>
              </div>
              <button
                type="button"
                className="kinetik-modal-confirm-btn"
                onClick={() => setActiveModal(null)}
              >
                {isEn ? "Done & Save Selection ✓" : "Selesai Memilih ✓"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. CUSTOMER FLOW CHANNELS MODAL (MULTI-SELECT - USER REFERENCE EXACT) */}
      {activeModal === "customerFlow" && (
        <div className="kinetik-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="kinetik-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="kinetik-modal-header">
              <div className="kinetik-modal-header-left">
                <span className="kinetik-group-num">1</span>
                <div className="kinetik-modal-header-text">
                  <div className="kinetik-modal-title-row">
                    <span className="kinetik-modal-title">
                      {isEn ? "Customer Transaction Channels" : "Kanal Transaksi Pelanggan"}
                    </span>
                    <span className="kinetik-badge-required">{isEn ? "Required" : "Wajib Dipilih"}</span>
                    <span className="kinetik-badge-multi">{isEn ? "Multi-Select" : "Bisa Pilih > 1"}</span>
                  </div>
                  <p className="kinetik-modal-subtitle">
                    {isEn
                      ? "Where do buyers most frequently send orders or reservations?"
                      : "Di mana calon pembeli atau pelanggan paling sering mengirim pesanan produk maupun reservasi Anda?"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="kinetik-modal-close-btn"
                onClick={() => setActiveModal(null)}
                aria-label="Tutup modal"
              >
                ✕
              </button>
            </div>

            <div className="kinetik-modal-body">
              <div className="kinetik-options-grid">
                {/* 1. WhatsApp Direct */}
                {(() => {
                  const isSelected = state.customerFlow.includes("whatsapp");
                  return (
                    <button
                      type="button"
                      className={`kinetik-option-card ${isSelected ? "selected" : ""}`}
                      onClick={() => {
                        const updated = toggleArrayItem(state.customerFlow, "whatsapp" as CustomerFlowChannel);
                        onChange({ customerFlow: updated });
                      }}
                    >
                      <div className="kinetik-card-top">
                        <div className="kinetik-card-icon-box blue">
                          {renderChannelIcon("whatsapp")}
                        </div>
                        <div className="kinetik-checkbox">
                          {isSelected && (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="kinetik-card-body">
                        <div className="kinetik-card-title-row">
                          <span className="kinetik-card-title">WhatsApp Direct</span>
                          <span className="kinetik-card-badge blue">{isEn ? "Most Frequent" : "Tersering"}</span>
                        </div>
                        <span className="kinetik-card-desc">
                          {isEn
                            ? "Most common: Admin private chat, sales team group, or separate WhatsApp Business."
                            : "Paling umum: Chat pribadi admin, grup penjualan, atau WhatsApp Business terpisah."}
                        </span>
                      </div>
                    </button>
                  );
                })()}

                {/* 2. Instagram DM & TikTok Shop */}
                {(() => {
                  const isSelected = state.customerFlow.includes("social_media");
                  return (
                    <button
                      type="button"
                      className={`kinetik-option-card ${isSelected ? "selected" : ""}`}
                      onClick={() => {
                        const updated = toggleArrayItem(state.customerFlow, "social_media" as CustomerFlowChannel);
                        onChange({ customerFlow: updated });
                      }}
                    >
                      <div className="kinetik-card-top">
                        <div className="kinetik-card-icon-box rose">
                          {renderChannelIcon("social_media")}
                        </div>
                        <div className="kinetik-checkbox">
                          {isSelected && (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="kinetik-card-body">
                        <div className="kinetik-card-title-row">
                          <span className="kinetik-card-title">Instagram DM & TikTok Shop</span>
                        </div>
                        <span className="kinetik-card-desc">
                          {isEn
                            ? "Orders enter directly through social media Direct Messages or live commerce carts."
                            : "Pemesanan masuk langsung melalui Direct Message media sosial atau keranjang live commerce."}
                        </span>
                      </div>
                    </button>
                  );
                })()}

                {/* 3. Website / Web Katalog */}
                {(() => {
                  const isSelected = state.customerFlow.includes("website");
                  return (
                    <button
                      type="button"
                      className={`kinetik-option-card ${isSelected ? "selected" : ""}`}
                      onClick={() => {
                        const updated = toggleArrayItem(state.customerFlow, "website" as CustomerFlowChannel);
                        onChange({ customerFlow: updated });
                      }}
                    >
                      <div className="kinetik-card-top">
                        <div className="kinetik-card-icon-box cyan">
                          {renderChannelIcon("website")}
                        </div>
                        <div className="kinetik-checkbox">
                          {isSelected && (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="kinetik-card-body">
                        <div className="kinetik-card-title-row">
                          <span className="kinetik-card-title">{isEn ? "Website / Online Catalog" : "Website / Web Katalog"}</span>
                        </div>
                        <span className="kinetik-card-desc">
                          {isEn
                            ? "Orders enter through independent websites, custom checkout forms, or landing pages."
                            : "Order masuk melalui website mandiri, formulir checkout custom, atau katalog landing page."}
                        </span>
                      </div>
                    </button>
                  );
                })()}

                {/* 4. Kasir / Walk-in Fisik */}
                {(() => {
                  const isSelected = state.customerFlow.includes("datang_langsung");
                  return (
                    <button
                      type="button"
                      className={`kinetik-option-card ${isSelected ? "selected" : ""}`}
                      onClick={() => {
                        const updated = toggleArrayItem(state.customerFlow, "datang_langsung" as CustomerFlowChannel);
                        onChange({ customerFlow: updated });
                      }}
                    >
                      <div className="kinetik-card-top">
                        <div className="kinetik-card-icon-box amber">
                          {renderChannelIcon("datang_langsung")}
                        </div>
                        <div className="kinetik-checkbox">
                          {isSelected && (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="kinetik-card-body">
                        <div className="kinetik-card-title-row">
                          <span className="kinetik-card-title">{isEn ? "Cashier / Walk-in Physical" : "Kasir / Walk-in Fisik"}</span>
                        </div>
                        <span className="kinetik-card-desc">
                          {isEn
                            ? "Physical retail shop, bazaar pop-up booth, or direct face-to-face interaction."
                            : "Toko retail fisik, booth pop-up bazaar, atau interaksi tatap muka langsung di tempat usaha."}
                        </span>
                      </div>
                    </button>
                  );
                })()}
              </div>
            </div>

            <div className="kinetik-modal-footer">
              <div className="kinetik-modal-footer-count">
                <span>
                  <strong>{state.customerFlow.length}</strong> {isEn ? "channels selected" : "kanal dipilih"}
                </span>
              </div>
              <button
                type="button"
                className="kinetik-modal-confirm-btn"
                onClick={() => setActiveModal(null)}
              >
                {isEn ? "Done & Save Selection ✓" : "Selesai Memilih ✓"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. ORDER PROCESSING METHODS MODAL (MULTI-SELECT - USER REFERENCE EXACT) */}
      {activeModal === "orderProcessing" && (
        <div className="kinetik-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="kinetik-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="kinetik-modal-header">
              <div className="kinetik-modal-header-left">
                <span className="kinetik-group-num">2</span>
                <div className="kinetik-modal-header-text">
                  <div className="kinetik-modal-title-row">
                    <span className="kinetik-modal-title">
                      {isEn ? "Order & Transaction Processing Method" : "Cara Tim Memproses Transaksi"}
                    </span>
                    <span className="kinetik-badge-required">{isEn ? "Required" : "Wajib Dipilih"}</span>
                    <span className="kinetik-badge-multi">{isEn ? "Multi-Select" : "Bisa Pilih > 1"}</span>
                  </div>
                  <p className="kinetik-modal-subtitle">
                    {isEn
                      ? "How are order recording, payment verification, and fulfillment handled?"
                      : "Bagaimana alur pencatatan, verifikasi bayar, dan pemenuhan pesanan dilakukan operasional saat ini?"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="kinetik-modal-close-btn"
                onClick={() => setActiveModal(null)}
                aria-label="Tutup modal"
              >
                ✕
              </button>
            </div>

            <div className="kinetik-modal-body">
              <div className="kinetik-options-grid">
                {/* 1. Chat Satu-satu Secara Manual */}
                {(() => {
                  const isSelected = state.orderProcessing.includes("manual_whatsapp");
                  return (
                    <button
                      type="button"
                      className={`kinetik-option-card ${isSelected ? "selected" : ""}`}
                      onClick={() => {
                        const updated = toggleArrayItem(state.orderProcessing, "manual_whatsapp" as OrderProcessingMethod);
                        onChange({ orderProcessing: updated });
                      }}
                    >
                      <div className="kinetik-card-top">
                        <div className="kinetik-card-icon-box blue">
                          {renderProcessingIcon("manual_whatsapp")}
                        </div>
                        <div className="kinetik-checkbox">
                          {isSelected && (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="kinetik-card-body">
                        <div className="kinetik-card-title-row">
                          <span className="kinetik-card-title">{isEn ? "Manual Chat 1-on-1" : "Chat Satu-satu Secara Manual"}</span>
                          <span className="kinetik-card-badge slate">Manual</span>
                        </div>
                        <span className="kinetik-card-desc">
                          {isEn
                            ? "Send order forms manually via chat, check bank transfer screenshots, & input tracking numbers."
                            : "Kirim format order manual via chat, rekap bukti transfer m-banking, & input resi satu per satu."}
                        </span>
                      </div>
                    </button>
                  );
                })()}

                {/* 2. Spreadsheet (Google Sheets / Excel) */}
                {(() => {
                  const isSelected = state.orderProcessing.includes("excel_sheets");
                  return (
                    <button
                      type="button"
                      className={`kinetik-option-card ${isSelected ? "selected" : ""}`}
                      onClick={() => {
                        const updated = toggleArrayItem(state.orderProcessing, "excel_sheets" as OrderProcessingMethod);
                        onChange({ orderProcessing: updated });
                      }}
                    >
                      <div className="kinetik-card-top">
                        <div className="kinetik-card-icon-box cyan">
                          {renderProcessingIcon("excel_sheets")}
                        </div>
                        <div className="kinetik-checkbox">
                          {isSelected && (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="kinetik-card-body">
                        <div className="kinetik-card-title-row">
                          <span className="kinetik-card-title">Spreadsheet (Google Sheets / Excel)</span>
                        </div>
                        <span className="kinetik-card-desc">
                          {isEn
                            ? "Admin copies daily transaction records into shared sheets for revenue and stock tracking."
                            : "Admin menyalin data transaksi harian ke file tabel bersama untuk kalkulasi omzet dan stok."}
                        </span>
                      </div>
                    </button>
                  );
                })()}

                {/* 3. Catat Manual di Nota / Buku */}
                {(() => {
                  const isSelected = state.orderProcessing.includes("catat_buku");
                  return (
                    <button
                      type="button"
                      className={`kinetik-option-card ${isSelected ? "selected" : ""}`}
                      onClick={() => {
                        const updated = toggleArrayItem(state.orderProcessing, "catat_buku" as OrderProcessingMethod);
                        onChange({ orderProcessing: updated });
                      }}
                    >
                      <div className="kinetik-card-top">
                        <div className="kinetik-card-icon-box violet">
                          {renderProcessingIcon("catat_buku")}
                        </div>
                        <div className="kinetik-checkbox">
                          {isSelected && (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="kinetik-card-body">
                        <div className="kinetik-card-title-row">
                          <span className="kinetik-card-title">{isEn ? "Physical Paper Receipts / Books" : "Catat Manual di Nota / Buku"}</span>
                        </div>
                        <span className="kinetik-card-desc">
                          {isEn
                            ? "Conventional recording using torn physical paper receipts and daily cash ledgers."
                            : "Pencatatan konvensional menggunakan sobekan nota kontan fisik dan buku kas harian."}
                        </span>
                      </div>
                    </button>
                  );
                })()}

                {/* 4. Aplikasi Kasir / POS Mandiri */}
                {(() => {
                  const isSelected = state.orderProcessing.includes("software_khusus");
                  return (
                    <button
                      type="button"
                      className={`kinetik-option-card ${isSelected ? "selected" : ""}`}
                      onClick={() => {
                        const updated = toggleArrayItem(state.orderProcessing, "software_khusus" as OrderProcessingMethod);
                        onChange({ orderProcessing: updated });
                      }}
                    >
                      <div className="kinetik-card-top">
                        <div className="kinetik-card-icon-box emerald">
                          {renderProcessingIcon("software_khusus")}
                        </div>
                        <div className="kinetik-checkbox">
                          {isSelected && (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="kinetik-card-body">
                        <div className="kinetik-card-title-row">
                          <span className="kinetik-card-title">
                            {isEn ? "Standalone POS / Cashier App" : "Aplikasi Kasir / POS Mandiri"}
                          </span>
                        </div>
                        <span className="kinetik-card-desc">
                          {isEn
                            ? "Separate POS software on tablet or outlet computer not yet linked to the chat system."
                            : "Software kasir/POS terpisah di tablet atau komputer gerai yang belum terhubung ke sistem chat."}
                        </span>
                      </div>
                    </button>
                  );
                })()}
              </div>
            </div>

            <div className="kinetik-modal-footer">
              <div className="kinetik-modal-footer-count">
                <span>
                  <strong>{state.orderProcessing.length}</strong> {isEn ? "methods selected" : "metode dipilih"}
                </span>
              </div>
              <button
                type="button"
                className="kinetik-modal-confirm-btn"
                onClick={() => setActiveModal(null)}
              >
                {isEn ? "Done & Save Selection ✓" : "Selesai Memilih ✓"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. BUSINESS SCALE MODAL (SINGLE SELECT) */}
      {activeModal === "businessScale" && (
        <div className="kinetik-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="kinetik-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="kinetik-modal-header">
              <div className="kinetik-modal-header-left">
                <span className="kinetik-group-num">1</span>
                <div className="kinetik-modal-header-text">
                  <div className="kinetik-modal-title-row">
                    <span className="kinetik-modal-title">
                      {isEn ? "Team Operational Scale" : "Skala & Jumlah Karyawan / Tim"}
                    </span>
                    <span className="kinetik-badge-required">{isEn ? "Required" : "Wajib Dipilih"}</span>
                    <span className="kinetik-badge-multi">{isEn ? "Single Select" : "Pilih 1"}</span>
                  </div>
                  <p className="kinetik-modal-subtitle">
                    {isEn
                      ? "How many team members or units operate in your daily workflow?"
                      : "Berapa banyak orang atau armada/unit yang terlibat dalam operasional bisnis Anda?"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="kinetik-modal-close-btn"
                onClick={() => setActiveModal(null)}
                aria-label="Tutup modal"
              >
                ✕
              </button>
            </div>

            <div className="kinetik-modal-body">
              <div className="kinetik-options-grid">
                {relevantScales.map((s) => {
                  const isSelected = state.businessScale === s.value;
                  return (
                    <button
                      key={s.value}
                      type="button"
                      className={`kinetik-option-card ${isSelected ? "selected" : ""}`}
                      onClick={() => {
                        onChange({ businessScale: s.value });
                        setActiveModal(null);
                      }}
                    >
                      <div className="kinetik-card-top">
                        <div className="kinetik-card-icon-box">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                        </div>
                        <div className="kinetik-radio">
                          {isSelected && <span className="kinetik-radio-dot" />}
                        </div>
                      </div>
                      <div className="kinetik-card-body">
                        <div className="kinetik-card-title-row">
                          <span className="kinetik-card-title">{s.label}</span>
                          <span className="kinetik-card-badge blue">{s.range}</span>
                        </div>
                        <span className="kinetik-card-desc">{s.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="kinetik-modal-footer">
              <div className="kinetik-modal-footer-count">
                <span>{state.businessScale ? (isEn ? "1 scale selected" : "1 skala terpilih") : (isEn ? "Select an option" : "Pilih salah satu")}</span>
              </div>
              <button
                type="button"
                className="kinetik-modal-confirm-btn"
                onClick={() => setActiveModal(null)}
              >
                {isEn ? "Close" : "Tutup"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
