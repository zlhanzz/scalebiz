// Tipe Data untuk Scalebiz Interactive Business Diagnostic Tool

export type BusinessType =
  | "kuliner_fnb"
  | "properti_aset"
  | "travel_wisata"
  | "edukasi_bimbel"
  | "jasa_b2b"
  | "retail_d2c"
  | "booking_jasa"
  | "rental_aset"
  | "operasional_lapangan"
  | "event_organizer"
  | "agensi_kreatif"
  | "jasa_cuci_laundry"
  | "klinik_kesehatan"
  | "lainnya";

export type BusinessPain =
  | "iklan_boncos"
  | "gagal_tender"
  | "marketplace_margin"
  | "jadwal_bentrok"
  | "kas_stok_bocor"
  | "klien_minta_laporan"
  | "admin_manual"
  | "data_tersebar"
  | "sulit_followup"
  | "sulit_pantau"
  | "komisi_ojol_tinggi"
  | "kuota_seat_berantakan"
  | "tagihan_spp_macet"
  | "siteplan_kpr_manual"
  | "unit_rusak_telat_kembali"
  | "verifikasi_ktp_rawan"
  | "baju_hilang_tertukar"
  | "cucian_menumpuk_lama"
  | "scope_creep_revisi"
  | "invoice_retainer_macet"
  | "vendor_event_meleset"
  | "rundown_bentrok_venue"
  | "antrean_klinik_numpuk"
  | "rekam_medis_tercecer"
  | "kredibilitas_portofolio"
  | "lainnya";

export type CustomerFlowChannel =
  | "datang_langsung"
  | "whatsapp"
  | "social_media"
  | "marketplace"
  | "website"
  | "form_online"
  | "booking_awal"
  | "quotation"
  | "sales_langsung"
  | "repeat_order";

export type OrderProcessingMethod =
  | "manual_whatsapp"
  | "excel_sheets"
  | "catat_buku"
  | "software_khusus"
  | "sistem_internal"
  | "campuran";

export type DigitalMaturityLevel = 1 | 2 | 3 | 4 | 5;

export type CurrentTool =
  | "whatsapp"
  | "excel"
  | "google_sheets"
  | "google_forms"
  | "instagram"
  | "marketplace"
  | "accounting_software"
  | "crm"
  | "pos"
  | "inventory_system"
  | "custom_software"
  | "lainnya";

export type BusinessGoal =
  | "tambah_pelanggan"
  | "kredibilitas"
  | "permudah_order"
  | "hemat_waktu_admin"
  | "kurangi_manual"
  | "kurangi_error"
  | "kontrol_stok"
  | "kontrol_keuangan"
  | "kelola_pelanggan"
  | "repeat_order"
  | "menang_tender"
  | "buka_cabang"
  | "data_terpusat"
  | "pantau_realtime";

export type BusinessScale = "1_5" | "6_20" | "21_50" | "50_plus";

export interface ConditionalQuestionOption {
  value: string;
  label: string;
}

export interface ConditionalQuestion {
  id: string;
  question: string;
  options: ConditionalQuestionOption[];
}

export interface SubSectorOption {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export interface DiagnosisState {
  businessType: BusinessType | null;
  subSector?: string;
  customBusinessType: string;
  conditionalAnswers: Record<string, string>;
  painPoints: BusinessPain[];
  customPainPoint: string;
  customerFlow: CustomerFlowChannel[];
  orderProcessing: OrderProcessingMethod[];
  digitalMaturity: DigitalMaturityLevel | null;
  currentTools: CurrentTool[];
  customTool: string;
  goals: BusinessGoal[];
  businessScale: BusinessScale | null;
  companyName: string;
  companyWebsite: string;
}

export type SolutionCategory =
  | "WEBSITE"
  | "BUSINESS_SYSTEM"
  | "AUTOMATION"
  | "DIGITALIZATION"
  | "POS_FINANCE"
  | "ERP_OPERATIONAL";

export type ScalebizPillarId = "website" | "pos_finance" | "erp" | "automation";

export interface ScalebizPillarInfo {
  id: ScalebizPillarId;
  title: string;
  shortTitle: string;
  icon: string;
  tagline: string;
  isPrimary?: boolean;
}

export type PriorityLevel = "CORE" | "RECOMMENDED" | "OPTIONAL";

export interface SolutionModule {
  id: string;
  title: string;
  icon: string;
  category: SolutionCategory;
  pillar?: ScalebizPillarId;
  priority: PriorityLevel;
  description: string;
  purpose: string;
  solvesPainPoint?: string;
}

export interface RoadmapPhase {
  phaseNumber: number;
  phaseTitle: string;
  duration: string;
  deliverables: string[];
}

export interface DiagnosticResult {
  primarySolution: string;
  primaryCategory: SolutionCategory;
  primaryPillar?: ScalebizPillarId;
  badge: string;
  badgeColor: string;
  summary: string;
  whyThisFits: string;
  identifiedProblems: string[];
  modules: SolutionModule[];
  // Struktur 4 Pilar Layanan Scalebiz (Causal Diagnosis)
  pillars?: {
    pillar: ScalebizPillarInfo;
    modules: SolutionModule[];
    isRelevant?: boolean;
    status?: "ACTIVE_RECOMMENDED" | "NOT_URGENT" | "FUTURE_PHASE";
    reason?: string;
  }[];
  dormantPillars?: {
    pillarId: ScalebizPillarId;
    title: string;
    icon: string;
    reason: string;
  }[];
  roadmap: RoadmapPhase[];
  complexity: "Low" | "Medium" | "High";
  timeEstimate: string;
  caseStudy?: {
    name: string;
    description: string;
    anchorId: string;
  };
  whatsappDraft: string;
  // Scalebiz AI Deep Analysis Integration
  aiAnalysis?: string;
  aiQuickWins?: string[];
  pillarEvaluations?: Partial<Record<ScalebizPillarId, string>>;
  isAiEnhanced?: boolean;
}

