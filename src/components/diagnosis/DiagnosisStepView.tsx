"use client";

import React from "react";
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
  PAIN_POINT_OPTIONS,
  getRelevantPainPoints,
  getFilteredCustomerFlow,
  getFilteredOrderProcessing,
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
  // Helper Toggle Multi-Select Array
  const toggleArrayItem = <T extends string>(
    list: T[],
    item: T,
    maxLimit?: number
  ): T[] => {
    if (list.includes(item)) {
      return list.filter((i) => i !== item);
    }
    if (maxLimit && list.length >= maxLimit) {
      return list; // Ignore if max limit reached
    }
    return [...list, item];
  };

  return (
    <div className="diag-step-content-wrapper">
      {/* Inline Validation Banner if error */}
      {validationError && (
        <div className="diag-validation-banner" role="alert">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{validationError}</span>
        </div>
      )}

      {/* =====================================================================
          STEP 1: BUSINESS PROFILE & CONDITIONAL QUESTIONS
          ===================================================================== */}
      {currentStep === 1 && (
        <div className="step-pane-section">
          <div className="step-pane-header">
            <h3 className="step-pane-title">
              {isEn ? "What is your primary line of business?" : "Apa bidang usaha utama bisnis Anda?"}
            </h3>
            <p className="step-pane-desc">
              {isEn
                ? "Select your primary industry sector, then refine with your operational sub-specialization for an accurate system blueprint."
                : "Pilih sektor industri utama, lalu pilih spesialisasi sub-bidang Anda untuk mendapatkan diagnosa sistem yang akurat."}
            </p>
          </div>

          <div className="diag-cards-grid">
            {BUSINESS_TYPE_OPTIONS.map((opt) => {
              const isSelected = state.businessType === opt.value;
              const enData = isEn ? BUSINESS_TYPE_EN_MAP[opt.value] : null;
              const displayTitle = enData?.title || opt.title;
              const displayDesc = enData?.desc || opt.description;

              return (
                <button
                  key={opt.value}
                  type="button"
                  className={`diag-card-option ${isSelected ? "selected" : ""}`}
                  onClick={() => {
                    onChange({
                      businessType: opt.value,
                      subSector: undefined,
                      // Reset seluruh state turunan ketika pengguna berpindah model bisnis
                      conditionalAnswers: {},
                      painPoints: [],
                      customPainPoint: "",
                      customerFlow: [],
                      orderProcessing: [],
                      currentTools: [],
                      goals: [],
                    });
                  }}
                  aria-pressed={isSelected}
                >
                  <span className="card-opt-icon">{opt.icon}</span>
                  <div className="card-opt-text">
                    <h4 className="card-opt-title">{displayTitle}</h4>
                    <p className="card-opt-desc">{displayDesc}</p>
                  </div>
                  {isSelected && <span className="card-check-pill">✓</span>}
                </button>
              );
            })}
          </div>

          {/* TWO-TIER SUB-SECTOR SELECTOR: Pilihan spesifikasi spesifik di awal */}
          {state.businessType &&
            state.businessType !== "lainnya" &&
            (BUSINESS_SUB_SECTORS_MAP[state.businessType]?.length ?? 0) > 1 && (
            <div className="subsector-selector-box">
              <div className="subsector-box-header">
                <span className="subsector-badge">
                  {isEn ? "BUSINESS SPECIALIZATION" : "SPESIFIKASI BISNIS"}
                </span>
                <h4 className="subsector-title">
                  {isEn
                    ? `Select specific sub-category for ${(isEn && BUSINESS_TYPE_EN_MAP[state.businessType]?.title) || BUSINESS_TYPE_OPTIONS.find((b) => b.value === state.businessType)?.title}:`
                    : `Pilih sub-kategori spesifik dari ${BUSINESS_TYPE_OPTIONS.find((b) => b.value === state.businessType)?.title}:`}
                </h4>
                <p className="subsector-desc">
                  {isEn
                    ? "Choose the operational model that best reflects your daily activities so the system evaluation is spot-on."
                    : "Pilih model operasional yang paling menggambarkan aktivitas harian bisnis Anda agar analisis kebutuhan sistem berjalan tepat sasaran."}
                </p>
              </div>

              <div className="subsector-chips-grid">
                {BUSINESS_SUB_SECTORS_MAP[state.businessType].map((sub) => {
                  const isSubPicked = state.subSector === sub.id;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      className={`subsector-chip-btn ${isSubPicked ? "picked" : ""}`}
                      onClick={() => {
                        const newSub = isSubPicked ? undefined : sub.id;
                        const validPains = getRelevantPainPoints(state.businessType, newSub).map((p) => p.value);
                        const filteredPains = state.painPoints.filter((p) => validPains.includes(p));
                        onChange({
                          subSector: newSub,
                          painPoints: filteredPains,
                        });
                      }}
                      aria-pressed={isSubPicked}
                    >
                      <span className="subchip-icon">{sub.icon}</span>
                      <div className="subchip-text">
                        <span className="subchip-title">{sub.title}</span>
                        <span className="subchip-desc">{sub.description}</span>
                      </div>
                      {isSubPicked && <span className="subchip-check">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Conditional Input for "Bisnis Khusus / Kustom" OR "Sub-Kategori Lainnya" */}
          {(() => {
            const isCustomType = state.businessType === "lainnya";
            const isCustomSub = Boolean(state.subSector && state.subSector.endsWith("_lainnya"));
            if (!isCustomType && !isCustomSub) return null;

            const selectedCat = BUSINESS_TYPE_OPTIONS.find((b) => b.value === state.businessType);
            const selectedCatTitle = (isEn && state.businessType && BUSINESS_TYPE_EN_MAP[state.businessType]?.title) || selectedCat?.title || (isEn ? "this field" : "ini");
            const inputLabel = isCustomType
              ? (isEn ? "What line of business does your company operate in?" : "Bisnis Anda bergerak di bidang apa?")
              : (isEn ? `Specify your specialized business model in ${selectedCatTitle}:` : `Sebutkan model bisnis atau jenis usaha spesifik Anda di bidang ${selectedCat?.title || "ini"}:`);

            const placeholderMap: Record<string, string> = isEn
              ? {
                  kuliner_fnb: "e.g. Boba & waffle food truck franchise, culinary seasoning manufacturer, etc.",
                  properti_aset: "e.g. Boutique serviced apartments, daily guest house chain, student dorms, etc.",
                  travel_wisata: "e.g. Luxury phinisi cruise tour operator, overland campervan trips, etc.",
                  edukasi_bimbel: "e.g. Children robotics academy, barista certification courses, etc.",
                  jasa_b2b: "e.g. Commercial building maintenance, factory meal supply, calibration services, etc.",
                  retail_d2c: "e.g. Wholesale building materials, compounding pharmacy, jewelry boutique, etc.",
                  booking_jasa: "e.g. Luxury nail & lash studio, private reflexology spa, tattoo studio, etc.",
                  klinik_kesehatan: "e.g. Pathology blood test lab, specialized eye clinic, pet hospital, etc.",
                  event_organizer: "e.g. Esports tournament host, contemporary art exhibitions, etc.",
                  agensi_kreatif: "e.g. 3D architectural visualization, technical translation bureau, etc.",
                  jasa_cuci_laundry: "e.g. High-end designer bag & shoe spa, commercial carpet cleaning, etc.",
                  rental_aset: "e.g. Bridal gown rental, cinematography drone hire, medical equipment leasing, etc.",
                  operasional_lapangan: "e.g. Aquaculture shrimp farming, industrial waste management, cold chain storage, etc.",
                  lainnya: "e.g. Modern agricultural equipment distributor & organic fertilizer",
                }
              : {
                  kuliner_fnb: "Contoh: Franchise booth minuman boba & waffle, produsen bumbu dapur, dsb.",
                  properti_aset: "Contoh: Pengelolaan guest house harian, kostel, asrama mahasiswa, dsb.",
                  travel_wisata: "Contoh: Operator campervan wisata, tur kapal phinisi, outbound, dsb.",
                  edukasi_bimbel: "Contoh: Sanggar tari anak, bimbingan tahfidz, kursus barista kopi, dsb.",
                  jasa_b2b: "Contoh: Jasa kebersihan gedung kantor, katering pabrik, kalibrasi mesin, dsb.",
                  retail_d2c: "Contoh: Toko bahan bangunan/material, apotek/farmasi, toko perhiasan, dsb.",
                  booking_jasa: "Contoh: Studio nail art & eyelash, spa refleksi mandiri, studio tato, dsb.",
                  klinik_kesehatan: "Contoh: Laboratorium tes darah, klinik mata, apotek klinik mandiri, dsb.",
                  event_organizer: "Contoh: Penyelenggara turnamen olahraga & e-sports, pameran seni, dsb.",
                  agensi_kreatif: "Contoh: Studio 3D animasi, agensi arsitek interior, biro penerjemah, dsb.",
                  jasa_cuci_laundry: "Contoh: Cuci sepatu & tas branded, cuci sofa/kasur, cuci karpet, dsb.",
                  rental_aset: "Contoh: Persewaan gaun pengantin, rental drone video, sewa alat medis, dsb.",
                  operasional_lapangan: "Contoh: Tambak perikanan modern, pengolahan limbah industri, cold storage, dsb.",
                  lainnya: "Contoh: Distributor alat pertanian modern & pupuk organik",
                };

            const inputPlaceholder =
              (state.businessType && placeholderMap[state.businessType]) ||
              (isEn ? "e.g. Specify your daily operational activities" : "Contoh: Tuliskan spesifikasi operasional bisnis Anda");

            return (
              <div className="conditional-input-box">
                <label htmlFor="custom-biz-input" className="cond-input-label">
                  {inputLabel}
                </label>
                <input
                  id="custom-biz-input"
                  type="text"
                  placeholder={inputPlaceholder}
                  value={state.customBusinessType || ""}
                  onChange={(e) => onChange({ customBusinessType: e.target.value })}
                  className="diag-text-field"
                  autoFocus={isCustomSub}
                />
                <p className="cond-input-hint">
                  {isEn
                    ? "Help us understand your specific operations so workflow diagnostics and AI evaluation are directly tailored to you."
                    : "Bantu kami memahami jenis usaha Anda secara spesifik agar diagnosa alur kerja dan evaluasi AI berjalan tepat sasaran."}
                </p>
              </div>
            );
          })()}

        </div>
      )}

      {/* =====================================================================
          STEP 2: BUSINESS PAIN POINTS (MULTI-SELECT)
          ===================================================================== */}
      {currentStep === 2 && (
        <div className="step-pane-section">
          <div className="step-pane-header">
            <div className="step-meta-counter">
              <h3 className="step-pane-title">
                {isEn
                  ? "Where is your business leaking the most time, money, or customers?"
                  : "Di bagian mana bisnis Anda paling sering kehilangan waktu, uang, atau pelanggan?"}
              </h3>
              <span className={`counter-badge ${state.painPoints.length > 0 ? "active" : ""}`}>
                {isEn ? `${state.painPoints.length} Bottlenecks Selected` : `${state.painPoints.length} Kendala Dipilih`}
              </span>
            </div>
            <p className="step-pane-desc">
              {isEn
                ? "Select all real operational bottlenecks affecting your business (multi-select supported)."
                : "Pilih semua kendala operasional yang nyata dialami bisnis Anda (bisa pilih lebih dari satu tanpa batasan)."}
            </p>
          </div>

          <div className="diag-cards-grid">
            {getRelevantPainPoints(state.businessType, state.subSector).map((opt) => {
              const isSelected = state.painPoints.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  className={`diag-card-option ${isSelected ? "selected" : ""}`}
                  onClick={() => {
                    const updated = toggleArrayItem(state.painPoints, opt.value);
                    onChange({ painPoints: updated });
                  }}
                  aria-pressed={isSelected}
                >
                  <span className="card-opt-icon">{opt.icon}</span>
                  <div className="card-opt-text">
                    <h4 className="card-opt-title">{opt.title}</h4>
                    <p className="card-opt-desc">{opt.description}</p>
                  </div>
                  {isSelected && <span className="card-check-pill">✓</span>}
                </button>
              );
            })}
          </div>

          {/* Conditional textarea if 'lainnya' chosen */}
          {state.painPoints.includes("lainnya") && (
            <div className="conditional-input-box">
              <label htmlFor="custom-pain-input" className="cond-input-label">
                {isEn ? "Describe your main operational bottlenecks:" : "Ceritakan kendala operasional utama bisnis Anda:"}
              </label>
              <textarea
                id="custom-pain-input"
                rows={3}
                placeholder={isEn ? "Briefly describe which workflow consumes the most hours or suffers recurrent errors..." : "Jelaskan secara singkat proses mana yang paling memakan waktu atau sering terjadi kebocoran..."}
                value={state.customPainPoint}
                onChange={(e) => onChange({ customPainPoint: e.target.value })}
                className="diag-textarea-field"
              />
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          STEP 3: CUSTOMER & TRANSACTION WORKFLOW
          ===================================================================== */}
      {currentStep === 3 && (
        <div className="step-pane-section">
          <div className="step-pane-header">
            <h3 className="step-pane-title">
              {isEn ? "How do customer transactions and orders typically arrive?" : "Bagaimana alur transaksi dan pesanan biasanya masuk?"}
            </h3>
            <p className="step-pane-desc">
              {isEn ? "Select the channels generating the bulk of your orders (multi-select supported)." : "Pilih kanal yang paling sering mendatangkan transaksi (bisa pilih lebih dari satu)."}
            </p>
          </div>

          {/* Part A: Customer Inflow Channels */}
          <div className="diag-cards-grid compact-grid">
            {getFilteredCustomerFlow(state.businessType, state.subSector).map((opt) => {
              const isSelected = state.customerFlow.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  className={`diag-card-option small ${isSelected ? "selected" : ""}`}
                  onClick={() => {
                    const updated = toggleArrayItem(state.customerFlow, opt.value);
                    onChange({ customerFlow: updated });
                  }}
                  aria-pressed={isSelected}
                >
                  <span className="card-opt-icon">{opt.icon}</span>
                  <div className="card-opt-text">
                    <h4 className="card-opt-title">{opt.title}</h4>
                    <p className="card-opt-desc">{opt.description}</p>
                  </div>
                  {isSelected && <span className="card-check-pill">✓</span>}
                </button>
              );
            })}
          </div>

          {/* Part B: Order Processing Method (Multi-Select) */}
          <div className="sub-section-divider">
            <div className="step-pane-header sub-header">
              <div className="step-meta-counter">
                <h4 className="sub-title">
                  {isEn ? "How does your team currently process orders or transactions?" : "Bagaimana cara tim Anda memproses pesanan atau transaksi saat ini?"}
                </h4>
                <span className={`counter-badge ${state.orderProcessing.length > 0 ? "active" : ""}`}>
                  {isEn ? `${state.orderProcessing.length} Methods Selected` : `${state.orderProcessing.length} Metode Dipilih`}
                </span>
              </div>
              <p className="step-pane-desc">
                {isEn ? "Select all operational workflows currently active across your team (multi-select supported)." : "Pilih semua cara kerja operasional yang saat ini berjalan di tim Anda (bisa pilih lebih dari satu)."}
              </p>
            </div>

            <div className="diag-cards-grid compact-grid">
              {getFilteredOrderProcessing(state.businessType, state.subSector).map((opt) => {
                const isSelected = state.orderProcessing.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    className={`diag-card-option small ${isSelected ? "selected" : ""}`}
                    onClick={() => {
                      const updated = toggleArrayItem(state.orderProcessing, opt.value);
                      onChange({ orderProcessing: updated });
                    }}
                    aria-pressed={isSelected}
                  >
                    <div className="card-opt-text">
                      <h4 className="card-opt-title">{opt.label}</h4>
                      <p className="card-opt-desc">{opt.desc}</p>
                    </div>
                    {isSelected && <span className="card-check-pill">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          STEP 4: BUSINESS SCALE & IDENTITY
          ===================================================================== */}
      {currentStep === 4 && (
        <div className="step-pane-section">
          <div className="step-pane-header">
            <h3 className="step-pane-title">
              {isEn ? "What is your operational scale (team members or active units/fleet)?" : "Berapa banyak orang atau armada/unit yang terlibat dalam operasional bisnis Anda?"}
            </h3>
            <p className="step-pane-desc">
              {isEn
                ? "Determines whether you need a streamlined single-role setup or multi-tiered role-based permissions."
                : "Untuk menyesuaikan apakah Anda butuh sistem yang simpel dan ringkas, atau butuh pembagian hak akses bertingkat."}
            </p>
          </div>

          <div className="diag-cards-grid compact-grid">
            {getFilteredScales(state.businessType, state.subSector).map((opt) => {
              const isSelected = state.businessScale === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  className={`diag-card-option ${isSelected ? "selected" : ""}`}
                  onClick={() => onChange({ businessScale: opt.value })}
                  aria-pressed={isSelected}
                >
                  <div className="card-opt-text">
                    <span className="scale-range-tag">{opt.range}</span>
                    <h4 className="card-opt-title">{opt.label}</h4>
                    <p className="card-opt-desc">{opt.desc}</p>
                  </div>
                  {isSelected && <span className="card-check-pill">✓</span>}
                </button>
              );
            })}
          </div>

          {/* Optional Business Details */}
          <div className="sub-section-divider">
            <div className="step-pane-header sub-header">
              <h4 className="sub-title">
                {isEn ? "Business Identity & Additional Details (Optional)" : "Nama Usaha & Info Tambahan (Opsional)"}
              </h4>
              <p className="step-pane-desc">
                {isEn ? "Helps us personalize your architecture blueprint and proposal." : "Bantu kami menyapa brand Anda dengan tepat pada lembar rekomendasi sistem."}
              </p>
            </div>

            <div className="optional-form-grid">
              <div className="input-group-field">
                <label htmlFor="comp-name-input" className="input-field-label">
                  {isEn ? "Business / Company Name (Optional)" : "Nama Bisnis / Perusahaan (Opsional)"}
                </label>
                <input
                  id="comp-name-input"
                  type="text"
                  placeholder={isEn ? "e.g. Acme Studio / Pacific Enterprise" : "Contoh: Kopi Nusantara / CV Karya Mandiri"}
                  value={state.companyName}
                  onChange={(e) => onChange({ companyName: e.target.value })}
                  className="diag-text-field"
                />
              </div>

              <div className="input-group-field">
                <label htmlFor="comp-web-input" className="input-field-label">
                  {isEn ? "Business Website or Social Handle (Optional)" : "Website atau Instagram Bisnis (Opsional)"}
                </label>
                <input
                  id="comp-web-input"
                  type="text"
                  placeholder={isEn ? "e.g. @acmestudio or www.acmeco.com" : "Contoh: @kopinusantara atau www.karyamandiri.com"}
                  value={state.companyWebsite}
                  onChange={(e) => onChange({ companyWebsite: e.target.value })}
                  className="diag-text-field"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
