// Mesin Rekomendasi Deterministik & Generator Analisis Personalisasi Scalebiz

import {
  DiagnosisState,
  DiagnosticResult,
  SolutionModule,
  RoadmapPhase,
  SolutionCategory,
  BusinessGoal,
  BusinessPain,
  BusinessType,
  OrderProcessingMethod,
  ScalebizPillarId,
  ScalebizPillarInfo,
} from "@/types/diagnosis";
import { PAIN_POINT_OPTIONS, GOALS_OPTIONS, getRelevantPainPoints, getFilteredGoals } from "@/data/diagnosisData";

interface SolutionCandidate {
  id: string;
  title: string;
  category: SolutionCategory;
  badge: string;
  badgeColor: string;
  complexity: "Low" | "Medium" | "High";
  timeEstimate: string;
  caseStudy?: {
    name: string;
    description: string;
    anchorId: string;
  };
}

export function inferGoalsFromPainPoints(
  painPoints: BusinessPain[],
  _businessType: BusinessType | null
): BusinessGoal[] {
  const inferred = new Set<BusinessGoal>();

  painPoints.forEach((pain) => {
    switch (pain) {
      case "kas_stok_bocor":
        inferred.add("kontrol_keuangan");
        inferred.add("kontrol_stok");
        break;
      case "tagihan_spp_macet":
        inferred.add("kontrol_keuangan");
        inferred.add("hemat_waktu_admin");
        break;
      case "gagal_tender":
        inferred.add("menang_tender");
        inferred.add("kredibilitas");
        break;
      case "admin_manual":
        inferred.add("hemat_waktu_admin");
        inferred.add("kurangi_manual");
        break;
      case "jadwal_bentrok":
      case "kuota_seat_berantakan":
      case "siteplan_kpr_manual":
        inferred.add("kurangi_error");
        inferred.add("permudah_order");
        break;
      case "kredibilitas_portofolio":
      case "gagal_tender":
        inferred.add("kredibilitas");
        inferred.add("tambah_pelanggan");
        inferred.add("permudah_order");
        break;
      case "iklan_boncos":
      case "sulit_followup":
        inferred.add("tambah_pelanggan");
        inferred.add("repeat_order");
        break;
      case "marketplace_margin":
      case "komisi_ojol_tinggi":
        inferred.add("permudah_order");
        inferred.add("tambah_pelanggan");
        break;
      case "klien_minta_laporan":
      case "data_tersebar":
      case "sulit_pantau":
        inferred.add("data_terpusat");
        inferred.add("pantau_realtime");
        break;
      case "unit_rusak_telat_kembali":
      case "verifikasi_ktp_rawan":
        inferred.add("pantau_realtime");
        inferred.add("kontrol_keuangan");
        break;
      case "lainnya":
      default:
        inferred.add("kurangi_manual");
        inferred.add("kontrol_keuangan");
        break;
    }
  });

  if (inferred.size === 0) {
    inferred.add("kurangi_manual");
    inferred.add("kontrol_keuangan");
  }

  return Array.from(inferred);
}

export function runBusinessDiagnosis(rawState: DiagnosisState): DiagnosticResult {
  const resolvedGoals = (rawState.goals && rawState.goals.length > 0)
    ? rawState.goals
    : inferGoalsFromPainPoints(rawState.painPoints, rawState.businessType);

  const state: DiagnosisState = {
    ...rawState,
    goals: resolvedGoals,
  };

  const brandName = state.companyName.trim() || "Bisnis Anda";
  const { businessType, painPoints, customerFlow, orderProcessing, goals, businessScale } = state;

  // Skor Kandidat Solusi
  const scores: Record<string, number> = {
    fnb_order_pos: 0,
    properti_showcase_kpr: 0,
    travel_umroh_platform: 0,
    edukasi_bimbel_system: 0,
    erp_kustom: 0,
    b2b_company_profile: 0,
    toko_online_d2c: 0,
    booking_otomasi: 0,
    direct_response_landing: 0,
    portal_listing_niche: 0,
    client_portal_dashboard: 0,
    katalog_grosir: 0,
    otomasi_bisnis: 0,
    rental_fleet_system: 0,
    event_organizer_system: 0,
    agency_client_portal: 0,
    laundry_clean_pos: 0,
    klinik_medis_system: 0,
  };

  // 1. Pembobotan Berdasarkan Model Bisnis (Base Weight +24)
  if (businessType === "kuliner_fnb") scores.fnb_order_pos += 26;
  if (businessType === "properti_aset") scores.properti_showcase_kpr += 26;
  if (businessType === "travel_wisata") scores.travel_umroh_platform += 26;
  if (businessType === "edukasi_bimbel") scores.edukasi_bimbel_system += 26;
  if (businessType === "operasional_lapangan") scores.erp_kustom += 25;
  if (businessType === "jasa_b2b") scores.b2b_company_profile += 22;
  if (businessType === "retail_d2c") scores.toko_online_d2c += 24;
  if (businessType === "booking_jasa") scores.booking_otomasi += 25;
  if (businessType === "rental_aset") scores.rental_fleet_system += 26;
  if (businessType === "event_organizer") scores.event_organizer_system += 28;
  if (businessType === "agensi_kreatif") scores.agency_client_portal += 28;
  if (businessType === "jasa_cuci_laundry") scores.laundry_clean_pos += 28;
  if (businessType === "klinik_kesehatan") scores.klinik_medis_system += 28;
  if (businessType === "lainnya") scores.otomasi_bisnis += 22;

  // 1.2 Pembobotan Berdasarkan Spesialisasi Sub-Sektor (Two-Tier Precision)
  const sub = state.subSector;
  if (sub === "kafe_resto" || sub === "frozen_cloud") {
    scores.fnb_order_pos += 14;
  } else if (sub === "katering_event" || sub === "bakery_kue") {
    scores.fnb_order_pos += 10;
    scores.otomasi_bisnis += 8;
  }

  if (sub === "residensial_cluster" || sub === "broker_tanah") {
    scores.properti_showcase_kpr += 16;
  } else if (sub === "villa_resort") {
    scores.booking_otomasi += 12;
    scores.properti_showcase_kpr += 8;
  } else if (sub === "kos_coliving") {
    scores.portal_listing_niche += 16;
    scores.otomasi_bisnis += 14;
    scores.booking_otomasi += 10;
  }

  if (sub === "umroh_haji" || sub === "tour_opentrip") {
    scores.travel_umroh_platform += 16;
  } else if (sub === "rental_transport") {
    scores.rental_fleet_system += 14;
    scores.travel_umroh_platform += 8;
  }

  if (
    sub === "rental_kendaraan" ||
    sub === "sewa_kamera" ||
    sub === "sewa_alat_berat" ||
    sub === "sewa_tenda_event" ||
    sub === "sewa_camping_outdoor"
  ) {
    scores.rental_fleet_system += 18;
  }

  if (sub === "bimbel_sekolah" || sub === "kursus_skill" || sub === "lpk_bootcamp") {
    scores.edukasi_bimbel_system += 16;
  }

  if (sub === "kontraktor_sipil") {
    scores.b2b_company_profile += 12;
    scores.client_portal_dashboard += 8;
  } else if (sub === "ekspor_komoditas") {
    scores.b2b_company_profile += 14;
    scores.katalog_grosir += 10;
  } else if (sub === "vendor_supplier") {
    scores.katalog_grosir += 14;
    scores.b2b_company_profile += 6;
  }

  if (sub === "wedding_organizer" || sub === "eo_korporat" || sub === "promotor_konser") {
    scores.event_organizer_system += 16;
  }

  if (sub === "digital_marketing_agency" || sub === "software_house" || sub === "production_house") {
    scores.agency_client_portal += 16;
  }

  if (sub === "laundry_kiloan_satuan" || sub === "carwash_detailing" || sub === "home_cleaning_ac") {
    scores.laundry_clean_pos += 16;
  }

  if (
    sub === "klinik_gigi" ||
    sub === "klinik_estetika" ||
    sub === "klinik_hewan" ||
    sub === "klinik_umum_pratama" ||
    sub === "fisioterapi_rehab"
  ) {
    scores.klinik_medis_system += 18;
  }

  // 1.3 Pembobotan Adaptif Sub-Sektor Kustom (*_lainnya)
  if (sub?.endsWith("_lainnya")) {
    if (businessType === "kuliner_fnb") { scores.fnb_order_pos += 12; scores.otomasi_bisnis += 8; }
    else if (businessType === "properti_aset") { scores.properti_showcase_kpr += 12; scores.booking_otomasi += 8; }
    else if (businessType === "travel_wisata") { scores.travel_umroh_platform += 12; scores.rental_fleet_system += 8; }
    else if (businessType === "edukasi_bimbel") { scores.edukasi_bimbel_system += 14; scores.otomasi_bisnis += 6; }
    else if (businessType === "jasa_b2b") { scores.b2b_company_profile += 14; scores.otomasi_bisnis += 8; }
    else if (businessType === "retail_d2c") { scores.toko_online_d2c += 14; scores.katalog_grosir += 8; }
    else if (businessType === "booking_jasa") { scores.booking_otomasi += 16; }
    else if (businessType === "klinik_kesehatan") { scores.klinik_medis_system += 16; }
    else if (businessType === "event_organizer") { scores.event_organizer_system += 16; }
    else if (businessType === "agensi_kreatif") { scores.agency_client_portal += 16; }
    else if (businessType === "jasa_cuci_laundry") { scores.laundry_clean_pos += 16; }
    else if (businessType === "rental_aset") { scores.rental_fleet_system += 16; }
    else if (businessType === "operasional_lapangan") { scores.erp_kustom += 16; }
  }

  // 2. Pembobotan Berdasarkan Pain Points Utama (+15–26 per match)
  painPoints.forEach((pain) => {
    if (pain === "komisi_ojol_tinggi") scores.fnb_order_pos += 26;
    if (pain === "siteplan_kpr_manual") scores.properti_showcase_kpr += 26;
    if (pain === "kuota_seat_berantakan") scores.travel_umroh_platform += 26;
    if (pain === "tagihan_spp_macet") scores.edukasi_bimbel_system += 26;
    if (pain === "unit_rusak_telat_kembali") scores.rental_fleet_system += 28;
    if (pain === "verifikasi_ktp_rawan") scores.rental_fleet_system += 28;
    if (pain === "baju_hilang_tertukar") scores.laundry_clean_pos += 28;
    if (pain === "cucian_menumpuk_lama") scores.laundry_clean_pos += 26;
    if (pain === "scope_creep_revisi") scores.agency_client_portal += 28;
    if (pain === "invoice_retainer_macet") scores.agency_client_portal += 26;
    if (pain === "vendor_event_meleset") scores.event_organizer_system += 28;
    if (pain === "rundown_bentrok_venue") scores.event_organizer_system += 26;
    if (pain === "antrean_klinik_numpuk") scores.klinik_medis_system += 28;
    if (pain === "rekam_medis_tercecer") scores.klinik_medis_system += 28;

    if (pain === "kas_stok_bocor") {
      scores.erp_kustom += 25;
      scores.fnb_order_pos += 8;
      if (businessType === "rental_aset") scores.rental_fleet_system += 14;
      if (businessType === "jasa_cuci_laundry") scores.laundry_clean_pos += 14;
      if (businessType === "klinik_kesehatan") scores.klinik_medis_system += 12;
    }
    if (pain === "gagal_tender" || pain === "kredibilitas_portofolio") {
      scores.b2b_company_profile += 30;
      scores.direct_response_landing += 24;
      if (businessType === "properti_aset") scores.properti_showcase_kpr += 28;
      if (businessType === "travel_wisata") scores.travel_umroh_platform += 26;
      if (businessType === "retail_d2c") scores.toko_online_d2c += 26;
      if (businessType === "kuliner_fnb") scores.fnb_order_pos += 12;
    }
    if (pain === "marketplace_margin") scores.toko_online_d2c += 22;
    if (pain === "jadwal_bentrok") {
      scores.booking_otomasi += 22;
      scores.edukasi_bimbel_system += 8;
      if (businessType === "rental_aset") scores.rental_fleet_system += 20;
      if (businessType === "event_organizer") scores.event_organizer_system += 22;
      if (businessType === "klinik_kesehatan") scores.klinik_medis_system += 20;
    }
    if (pain === "iklan_boncos") scores.direct_response_landing += 24;
    if (pain === "klien_minta_laporan") {
      scores.client_portal_dashboard += 22;
      if (businessType === "agensi_kreatif") scores.agency_client_portal += 24;
      if (businessType === "event_organizer") scores.event_organizer_system += 14;
    }
    if (pain === "admin_manual") {
      scores.otomasi_bisnis += 26;
      scores.erp_kustom += 10;
      scores.toko_online_d2c += 8;
      scores.booking_otomasi += 10;
      scores.edukasi_bimbel_system += 8;
      scores.travel_umroh_platform += 8;
      scores.rental_fleet_system += 10;
      if (businessType === "event_organizer") scores.event_organizer_system += 14;
      if (businessType === "agensi_kreatif") scores.agency_client_portal += 12;
      if (businessType === "jasa_cuci_laundry") scores.laundry_clean_pos += 14;
      if (businessType === "klinik_kesehatan") scores.klinik_medis_system += 12;
    }
    if (pain === "data_tersebar") {
      scores.otomasi_bisnis += 18;
      scores.erp_kustom += 12;
      scores.client_portal_dashboard += 12;
      scores.travel_umroh_platform += 10;
      if (businessType === "rental_aset") scores.rental_fleet_system += 12;
      if (businessType === "klinik_kesehatan") scores.klinik_medis_system += 18;
      if (businessType === "agensi_kreatif") scores.agency_client_portal += 14;
      if (businessType === "event_organizer") scores.event_organizer_system += 14;
    }
    if (pain === "sulit_followup") {
      scores.otomasi_bisnis += 24;
      scores.b2b_company_profile += 10;
      scores.direct_response_landing += 10;
      scores.properti_showcase_kpr += 10;
      if (businessType === "agensi_kreatif") scores.agency_client_portal += 16;
      if (businessType === "event_organizer") scores.event_organizer_system += 14;
    }
  });

  // 3. Pembobotan Alur Transaksi & Pemrosesan (+8 per match)
  if (customerFlow.includes("quotation")) {
    scores.b2b_company_profile += 10;
    scores.katalog_grosir += 12;
    if (businessType === "agensi_kreatif") scores.agency_client_portal += 14;
    if (businessType === "event_organizer") scores.event_organizer_system += 12;
  }
  if (customerFlow.includes("booking_awal")) {
    scores.booking_otomasi += 15;
    scores.properti_showcase_kpr += 8;
    if (businessType === "rental_aset") scores.rental_fleet_system += 14;
    if (businessType === "event_organizer") scores.event_organizer_system += 16;
    if (businessType === "klinik_kesehatan") scores.klinik_medis_system += 14;
  }
  if (customerFlow.includes("form_online")) {
    scores.edukasi_bimbel_system += 10;
    scores.travel_umroh_platform += 8;
  }
  if (customerFlow.includes("marketplace") || customerFlow.includes("social_media")) {
    scores.toko_online_d2c += 8;
    scores.direct_response_landing += 8;
    if (businessType === "kuliner_fnb") scores.fnb_order_pos += 8;
    if (sub === "kos_coliving") scores.portal_listing_niche += 10;
  }
  if (customerFlow.includes("datang_langsung")) {
    if (businessType === "jasa_cuci_laundry") scores.laundry_clean_pos += 16;
    if (businessType === "klinik_kesehatan") scores.klinik_medis_system += 14;
  }
  if (customerFlow.includes("whatsapp")) {
    if (businessType === "jasa_cuci_laundry") scores.laundry_clean_pos += 12;
    if (businessType === "agensi_kreatif") scores.agency_client_portal += 10;
    if (businessType === "event_organizer") scores.event_organizer_system += 12;
    if (sub === "kos_coliving") {
      scores.otomasi_bisnis += 12;
      scores.portal_listing_niche += 8;
    }
  }
  if (customerFlow.includes("website")) {
    if (businessType === "agensi_kreatif") scores.agency_client_portal += 14;
    if (businessType === "event_organizer") scores.event_organizer_system += 12;
    if (businessType === "klinik_kesehatan") scores.klinik_medis_system += 12;
  }
  if (customerFlow.includes("sales_langsung")) {
    if (businessType === "agensi_kreatif") scores.agency_client_portal += 12;
  }
  if (customerFlow.includes("repeat_order")) {
    if (businessType === "jasa_cuci_laundry") scores.laundry_clean_pos += 12;
    if (businessType === "agensi_kreatif") scores.agency_client_portal += 12;
  }

  const hasOrderMethod = (method: OrderProcessingMethod) => {
    if (!orderProcessing) return false;
    return Array.isArray(orderProcessing)
      ? orderProcessing.includes(method)
      : (orderProcessing as any) === method;
  };

  if (hasOrderMethod("manual_whatsapp") || hasOrderMethod("catat_buku")) {
    scores.otomasi_bisnis += 16;
    scores.erp_kustom += 8;
    scores.booking_otomasi += 8;
    scores.toko_online_d2c += 8;
    if (businessType === "rental_aset") scores.rental_fleet_system += 12;
    if (businessType === "jasa_cuci_laundry") scores.laundry_clean_pos += 14;
    if (businessType === "klinik_kesehatan") scores.klinik_medis_system += 12;
    if (businessType === "event_organizer") scores.event_organizer_system += 12;
  }
  if (hasOrderMethod("excel_sheets")) {
    scores.otomasi_bisnis += 18;
    if (businessType === "rental_aset") scores.rental_fleet_system += 10;
    if (businessType === "agensi_kreatif") scores.agency_client_portal += 12;
    if (businessType === "event_organizer") scores.event_organizer_system += 10;
  }
  if (hasOrderMethod("software_khusus") || hasOrderMethod("sistem_internal")) {
    if (businessType === "agensi_kreatif") scores.agency_client_portal += 12;
    if (businessType === "klinik_kesehatan") scores.klinik_medis_system += 12;
    if (businessType === "jasa_cuci_laundry") scores.laundry_clean_pos += 10;
  }
  if (hasOrderMethod("campuran")) {
    scores.otomasi_bisnis += 20;
    scores.erp_kustom += 12;
    if (businessType === "agensi_kreatif") scores.agency_client_portal += 10;
    if (businessType === "event_organizer") scores.event_organizer_system += 10;
  }

  // 3.5 Pembobotan Berdasarkan Tools Saat Ini
  state.currentTools.forEach((tool) => {
    if (tool === "excel" || tool === "google_sheets" || tool === "google_forms") {
      scores.otomasi_bisnis += 6;
      if (businessType === "rental_aset") scores.rental_fleet_system += 6;
    }
    if (tool === "pos") {
      scores.fnb_order_pos += 6;
      scores.erp_kustom += 4;
      scores.laundry_clean_pos += 6;
    }
  });

  // 4. Pembobotan Sasaran (Goals) (+10–15 per match)
  goals.forEach((goal) => {
    if (goal === "kontrol_keuangan") {
      scores.erp_kustom += 15;
      scores.fnb_order_pos += 10;
      scores.edukasi_bimbel_system += 10;
      scores.travel_umroh_platform += 10;
      if (businessType === "rental_aset") scores.rental_fleet_system += 14;
      if (businessType === "jasa_cuci_laundry") scores.laundry_clean_pos += 12;
      if (businessType === "agensi_kreatif") scores.agency_client_portal += 12;
      if (businessType === "event_organizer") scores.event_organizer_system += 10;
    }
    if (goal === "kontrol_stok") {
      scores.erp_kustom += 15;
      if (businessType === "rental_aset") scores.rental_fleet_system += 14;
      if (businessType === "jasa_cuci_laundry") scores.laundry_clean_pos += 12;
    }
    if (goal === "menang_tender" || goal === "kredibilitas") {
      scores.b2b_company_profile += 15;
      scores.properti_showcase_kpr += 10;
      if (businessType === "agensi_kreatif") scores.agency_client_portal += 12;
      if (businessType === "event_organizer") scores.event_organizer_system += 12;
    }
    if (goal === "permudah_order" || goal === "repeat_order") {
      scores.toko_online_d2c += 12;
      scores.otomasi_bisnis += 10;
      scores.fnb_order_pos += 14;
      scores.travel_umroh_platform += 10;
      scores.edukasi_bimbel_system += 10;
      if (businessType === "rental_aset") scores.rental_fleet_system += 10;
      if (businessType === "jasa_cuci_laundry") scores.laundry_clean_pos += 14;
    }
    if (goal === "tambah_pelanggan") scores.direct_response_landing += 12;
    if (goal === "pantau_realtime" || goal === "data_terpusat") {
      scores.erp_kustom += 10;
      scores.client_portal_dashboard += 12;
      scores.otomasi_bisnis += 10;
      scores.travel_umroh_platform += 10;
      if (businessType === "rental_aset") scores.rental_fleet_system += 12;
      if (businessType === "agensi_kreatif") scores.agency_client_portal += 14;
      if (businessType === "event_organizer") scores.event_organizer_system += 14;
      if (businessType === "klinik_kesehatan") scores.klinik_medis_system += 14;
      if (businessType === "jasa_cuci_laundry") scores.laundry_clean_pos += 10;
    }
    if (goal === "hemat_waktu_admin" || goal === "kurangi_manual") {
      scores.otomasi_bisnis += 26;
      scores.fnb_order_pos += 8;
      scores.edukasi_bimbel_system += 8;
      if (businessType === "rental_aset") scores.rental_fleet_system += 12;
      if (businessType === "event_organizer") scores.event_organizer_system += 14;
      if (businessType === "agensi_kreatif") scores.agency_client_portal += 12;
      if (businessType === "jasa_cuci_laundry") scores.laundry_clean_pos += 14;
      if (businessType === "klinik_kesehatan") scores.klinik_medis_system += 12;
    }
    if (goal === "kurangi_error") {
      scores.otomasi_bisnis += 16;
      scores.booking_otomasi += 12;
      scores.travel_umroh_platform += 12;
      scores.properti_showcase_kpr += 10;
      if (businessType === "rental_aset") scores.rental_fleet_system += 14;
      if (businessType === "jasa_cuci_laundry") scores.laundry_clean_pos += 16;
      if (businessType === "event_organizer") scores.event_organizer_system += 14;
      if (businessType === "klinik_kesehatan") scores.klinik_medis_system += 16;
    }
  });

  // Tentukan Solusi Tertinggi
  let bestSolutionId = "b2b_company_profile";
  let highestScore = -1;
  Object.entries(scores).forEach(([id, score]) => {
    if (score > highestScore) {
      highestScore = score;
      bestSolutionId = id;
    }
  });

  // Metadata Kandidat Solusi
  const candidates: Record<string, SolutionCandidate> = {
    fnb_order_pos: {
      id: "fnb_order_pos",
      title: "Sistem Pemesanan Mandiri F&B, Menu QR & POS Bebas Komisi Platform Delivery",
      category: "POS_FINANCE",
      badge: "Bebas Komisi 20% & POS Kasir",
      badgeColor: "#f97316",
      complexity: "Medium",
      timeEstimate: "4 – 7 Hari Kerja",
      caseStudy: {
        name: "Scalebiz Smart F&B Ordering & POS",
        description: "Pelanggan memindai QR meja dan memesan langsung tanpa antre pelayan, tiket pesanan otomatis tercetak di dapur, serta kanal pesan-antar mandiri tanpa potongan komisi platform pihak ketiga 20%.",
        anchorId: "portofolio",
      },
    },
    properti_showcase_kpr: {
      id: "properti_showcase_kpr",
      title: "Web Showcase Cluster, Siteplan Interaktif & Simulasi KPR",
      category: "WEBSITE",
      badge: "Showcase Cluster & Booking Fee",
      badgeColor: "#0ea5e9",
      complexity: "Medium",
      timeEstimate: "4 – 8 Hari Kerja",
      caseStudy: {
        name: "Citra Cluster & Residence Showcase",
        description: "Penyajian tipe unit rumah, peta siteplan interaktif, kalkulator angsuran KPR bank real-time, dan pembayaran booking fee langsung.",
        anchorId: "portofolio",
      },
    },
    travel_umroh_platform: {
      id: "travel_umroh_platform",
      title: "Platform Paket Umroh & Tour dengan Manajemen Kuota Seat",
      category: "BUSINESS_SYSTEM",
      badge: "Manajemen Seat & Jamaah Terpadu",
      badgeColor: "#14b8a6",
      complexity: "Medium",
      timeEstimate: "5 – 9 Hari Kerja",
      caseStudy: {
        name: "Safir Travel Umroh & Tour Organizer",
        description: "Halaman paket ibadah umroh berkelas, manajemen kuota seat real-time, pengumpulan berkas paspor digital, dan pelacak cicilan biaya jamaah.",
        anchorId: "portofolio",
      },
    },
    edukasi_bimbel_system: {
      id: "edukasi_bimbel_system",
      title: "Portal Pendaftaran Siswa (PSB) & Auto-Reminder SPP Bulanan",
      category: "AUTOMATION",
      badge: "Otomasi SPP & Administrasi Murid",
      badgeColor: "#8b5cf6",
      complexity: "Medium",
      timeEstimate: "4 – 7 Hari Kerja",
      caseStudy: {
        name: "Akademi Prestasi Mandiri",
        description: "Pendaftaran siswa baru (PSB) online, pemilihan jadwal kelas/tutor anti bentrok, dan notifikasi tagihan SPP berkala otomatis via WhatsApp Gateway.",
        anchorId: "portofolio",
      },
    },
    otomasi_bisnis: {
      id: "otomasi_bisnis",
      title: "Sistem Otomasi Operasional Bisnis & WhatsApp Gateway",
      category: "AUTOMATION",
      badge: "Business Automation & Workflow",
      badgeColor: "#8b5cf6",
      complexity: "Medium",
      timeEstimate: "4 – 7 Hari Kerja",
      caseStudy: {
        name: "Sistem Otomasi Transaksi & Tagihan ScaleBiz",
        description: "Menghubungkan formulir web, Google Sheets/Database, dan WhatsApp Gateway otomatis tanpa admin ketik manual.",
        anchorId: "portofolio",
      },
    },
    erp_kustom: {
      id: "erp_kustom",
      title: "Sistem Web ERP Operasional & Kontrol Kas Lapangan",
      category: "ERP_OPERATIONAL",
      badge: "Sistem Kontrol Kas & Operasional",
      badgeColor: "#10b981",
      complexity: "High",
      timeEstimate: "7 – 14 Hari Kerja",
      caseStudy: {
        name: "rUang Tani (Sistem Keuangan & Operasional Agribisnis)",
        description: "Membantu owner mencatat laba Rp 646,2 Jt dan memantau multi-lahan terdesentralisasi secara presisi.",
        anchorId: "portofolio",
      },
    },
    b2b_company_profile: {
      id: "b2b_company_profile",
      title: "Website Company Profile & Portofolio Kredibilitas Resmi",
      category: "WEBSITE",
      badge: "Kredibilitas & Portofolio Resmi",
      badgeColor: "#38bdf8",
      complexity: "Medium",
      timeEstimate: "3 – 5 Hari Kerja",
      caseStudy: {
        name: "ScaleBiz Professional Portfolio Framework",
        description: "Struktur verifikasi legalitas resmi, showcase portofolio interaktif, dan formulir konsultasi cepat terintegrasi.",
        anchorId: "portofolio",
      },
    },
    toko_online_d2c: {
      id: "toko_online_d2c",
      title: "Toko Online Mandiri (D2C) & Sistem Database Pelanggan",
      category: "BUSINESS_SYSTEM",
      badge: "Independensi Margin & Database 100%",
      badgeColor: "#10b981",
      complexity: "Medium",
      timeEstimate: "5 – 8 Hari Kerja",
    },
    booking_otomasi: {
      id: "booking_otomasi",
      title: "Website Booking & Reservasi Terjadwal Otomatis",
      category: "AUTOMATION",
      badge: "Otomasi Reservasi & Anti No-Show",
      badgeColor: "#8b5cf6",
      complexity: "Medium",
      timeEstimate: "4 – 6 Hari Kerja",
    },
    direct_response_landing: {
      id: "direct_response_landing",
      title: "Landing Page Direct Response & Efisiensi Iklan",
      category: "WEBSITE",
      badge: "Trafik Iklan & Lead Gen WhatsApp",
      badgeColor: "#e11d48",
      complexity: "Low",
      timeEstimate: "2 – 3 Hari Kerja",
    },
    portal_listing_niche: {
      id: "portal_listing_niche",
      title: "Web Portal Direktori & Listing Properti Niche",
      category: "DIGITALIZATION",
      badge: "Platform Listing & Manajemen Unit",
      badgeColor: "#06b6d4",
      complexity: "High",
      timeEstimate: "7 – 12 Hari Kerja",
      caseStudy: {
        name: "RuangSinggah.id (PropTech Sewa Kost & Co-Living)",
        description: "Platform pencarian unit kost real-time dengan filter lokasi, harga, dan integrasi WhatsApp.",
        anchorId: "portofolio",
      },
    },
    client_portal_dashboard: {
      id: "client_portal_dashboard",
      title: "Client Portal & Dashboard Analitik Bisnis",
      category: "BUSINESS_SYSTEM",
      badge: "Retensi Klien & Dashboard Reporting",
      badgeColor: "#38bdf8",
      complexity: "High",
      timeEstimate: "7 – 14 Hari Kerja",
      caseStudy: {
        name: "Mentlife (AI Financial & Career Diagnostic)",
        description: "Dashboard diagnosa mandiri dengan visualisasi roadmap progres dan analitik interaktif.",
        anchorId: "portofolio",
      },
    },
    katalog_grosir: {
      id: "katalog_grosir",
      title: "Katalog Produk Digital & Sistem RFQ Grosir B2B",
      category: "DIGITALIZATION",
      badge: "Showcase Spesifikasi & RFQ",
      badgeColor: "#f59e0b",
      complexity: "Medium",
      timeEstimate: "4 – 7 Hari Kerja",
    },
    rental_fleet_system: {
      id: "rental_fleet_system",
      title: "Sistem Manajemen Rental Armada, Kalender Unit & Kontrak Digital",
      category: "BUSINESS_SYSTEM",
      badge: "Manajemen Armada & Kontrak Sewa",
      badgeColor: "#0ea5e9",
      complexity: "Medium",
      timeEstimate: "5 – 8 Hari Kerja",
      caseStudy: {
        name: "Scalebiz Smart Fleet & Asset Rental Management",
        description: "Kalender ketersediaan armada real-time, verifikasi identitas (KTP/SIM) mitigasi penggelapan, formulir checklist fisik serah-terima unit digital, dan kalkulasi otomatis denda overtime.",
        anchorId: "portofolio",
      },
    },
    event_organizer_system: {
      id: "event_organizer_system",
      title: "Sistem Manajemen Acara, Rundown Live, RSVP Tamu & Koordinasi Vendor",
      category: "BUSINESS_SYSTEM",
      badge: "Rundown Live & RSVP Tamu Digital",
      badgeColor: "#ec4899",
      complexity: "Medium",
      timeEstimate: "4 – 8 Hari Kerja",
      caseStudy: {
        name: "Scalebiz Event & Wedding Master Organizer",
        description: "Undangan digital dengan QR Code check-in tamu real-time, sinkronisasi timeline rundown live untuk seluruh kru lapangan, dan checklist tracking vendor anti-meleset.",
        anchorId: "portofolio",
      },
    },
    agency_client_portal: {
      id: "agency_client_portal",
      title: "Client Portal Agensi, Scope Approval, Task Milestone & Retainer Invoicing",
      category: "BUSINESS_SYSTEM",
      badge: "Portal Klien & Anti-Scope Creep",
      badgeColor: "#6366f1",
      complexity: "High",
      timeEstimate: "6 – 10 Hari Kerja",
      caseStudy: {
        name: "Scalebiz Studio & Digital Agency Hub",
        description: "Portal kolaborasi klien untuk approval brief/revisi dengan limit kuota, tracking milestone proyek real-time, serta penagihan invoice retainer bulanan otomatis via WhatsApp.",
        anchorId: "portofolio",
      },
    },
    laundry_clean_pos: {
      id: "laundry_clean_pos",
      title: "Sistem POS Kasir Laundry, Tagging Barcode Rak & Notifikasi WA Siap Ambil",
      category: "POS_FINANCE",
      badge: "Barcode Rak & Tracking Cuci Real-Time",
      badgeColor: "#0284c7",
      complexity: "Medium",
      timeEstimate: "4 – 7 Hari Kerja",
      caseStudy: {
        name: "Scalebiz Clean Laundry & Detailing POS",
        description: "Cetak nota barcode thermal per bundle pakaian/kendaraan, tracking status proses cuci/kering/setrika/rak, dan kirim pesan WA otomatis saat cucian selesai.",
        anchorId: "portofolio",
      },
    },
    klinik_medis_system: {
      id: "klinik_medis_system",
      title: "Sistem Antrean Klinik Digital, RME Terenkripsi & Reminder Kontrol Pasien",
      category: "BUSINESS_SYSTEM",
      badge: "Antrean Digital & Rekam Medis (RME)",
      badgeColor: "#059669",
      complexity: "High",
      timeEstimate: "6 – 12 Hari Kerja",
      caseStudy: {
        name: "Scalebiz Medika Clinic & Pet Care Care System",
        description: "Pendaftaran mandiri nomor antrean dari HP, catatan rekam medis elektronik (RME) dokter terintegrasi riwayat obat, dan pengingat jadwal kontrol WhatsApp otomatis.",
        anchorId: "portofolio",
      },
    },
  };

  let selectedCandidate = candidates[bestSolutionId] || candidates.b2b_company_profile;

  // Kontekstualisasi Judul Solusi Website Kredibilitas sesuai Sektor
  if (selectedCandidate.id === "b2b_company_profile") {
    if (businessType === "klinik_kesehatan") {
      selectedCandidate = {
        ...selectedCandidate,
        title: "Website Profil Klinik, Kredibilitas Dokter & Portofolio Tindakan",
        badge: "Kredibilitas Medis & Portofolio",
      };
    } else if (businessType === "rental_aset") {
      selectedCandidate = {
        ...selectedCandidate,
        title: "Website Katalog Armada & Portofolio Rental Resmi",
        badge: "Katalog Unit & Kredibilitas",
      };
    } else if (businessType === "edukasi_bimbel") {
      selectedCandidate = {
        ...selectedCandidate,
        title: "Website Profil Lembaga, Kurikulum & Prestasi Siswa",
        badge: "Profil Lembaga & Kredibilitas",
      };
    } else if (businessType === "booking_jasa") {
      selectedCandidate = {
        ...selectedCandidate,
        title: "Website Profil Studio / Salon & Portofolio Layanan Terpercaya",
        badge: "Profil Layanan & Portofolio",
      };
    } else if (businessType === "event_organizer") {
      selectedCandidate = {
        ...selectedCandidate,
        title: "Website Showcase Portofolio Event & Dokumentasi Vendor",
        badge: "Showcase Event & Kredibilitas",
      };
    } else if (businessType === "kuliner_fnb") {
      selectedCandidate = {
        ...selectedCandidate,
        title: "Website Profil Bisnis Kuliner & Showcase Portofolio Menu",
        badge: "Profil Kuliner & Portofolio",
      };
    } else if (businessType === "jasa_cuci_laundry") {
      selectedCandidate = {
        ...selectedCandidate,
        title: "Website Profil Layanan Jasa & Kredibilitas Mutu",
        badge: "Profil Layanan & Kredibilitas",
      };
    }
  }

  // Analisis Personalisasi Dinamis (Why this recommendation)
  const relevantList = getRelevantPainPoints(state.businessType, state.subSector);
  const painTitles = painPoints
    .map((p) => {
      const specific = relevantList.find((item) => item.value === p);
      if (specific) return specific.title;
      return PAIN_POINT_OPTIONS.find((item) => item.value === p)?.title;
    })
    .filter(Boolean) as string[];

  const relevantGoals = getFilteredGoals(state.businessType);
  const goalTitles = goals
    .map((g) => {
      const specific = relevantGoals.find((item) => item.value === g);
      if (specific) return specific.title;
      return GOALS_OPTIONS.find((item) => item.value === g)?.title;
    })
    .filter(Boolean) as string[];

  const whyThisFits = generatePersonalizedExplanation(
    brandName,
    selectedCandidate.id,
    state,
    painTitles,
    goalTitles
  );

  // Arsitektur 4 Pilar Pasti Layanan Scalebiz (Website, POS Finance, ERP, Automation)
  const fourPillarsResult = generateFourPillarModules(selectedCandidate.id, state);
  const modules = fourPillarsResult.allModules;
  const pillars = fourPillarsResult.pillars;
  const primaryPillar = fourPillarsResult.primaryPillar;

  // Roadmap Implementasi 3 Fase
  const roadmap = generateRoadmap(selectedCandidate.id, state);

  // Pesan WhatsApp Otomatis (Humanized Developer Touch)
  const painSummary = painTitles.slice(0, 2).join(", ") || "Efisiensi operasional & alur transaksi";
  const whatsappDraft = `Halo Tim Scalebiz, saya ingin konsultasi sistem untuk ${brandName}.\n\nBidang Bisnis: ${getBusinessTypeName(state.businessType)}\nKendala yang Dihadapi: ${painSummary}\nRekomendasi Sistem: ${selectedCandidate.title}\n\nBoleh minta saran teknis dan estimasi langkah awalnya? Terima kasih.`;

  return {
    primarySolution: selectedCandidate.title,
    primaryCategory: selectedCandidate.category,
    primaryPillar,
    badge: selectedCandidate.badge,
    badgeColor: selectedCandidate.badgeColor,
    summary: `Setelah meninjau cara kerja dan kendala yang dihadapi ${brandName}, kebutuhan Anda jelas tidak cukup diselesaikan hanya dengan website brosur biasa yang pasif. Anda butuh sistem yang aktif mempermudah kerja tim setiap hari.`,
    whyThisFits,
    aiAnalysis: whyThisFits,
    aiQuickWins: [
      "Petakan seluruh data transaksi & inventaris aktif ke dalam satu format digital terpusat",
      "Gunakan formulir pemesanan/katalog mandiri untuk memangkas waktu admin membalas pesan repetitif",
      "Terapkan pengingat otomatis via WhatsApp untuk menjaga ketepatan waktu pembayaran & retensi pelanggan",
    ],
    isAiEnhanced: false,
    identifiedProblems: painTitles.length > 0 ? painTitles : ["Modernisasi sistem operasional & penjualan digital"],
    modules,
    pillars,
    dormantPillars: fourPillarsResult.dormantPillars,
    roadmap,
    complexity: selectedCandidate.complexity,
    timeEstimate: selectedCandidate.timeEstimate,
    caseStudy: selectedCandidate.caseStudy,
    whatsappDraft,
  };
}

function getBusinessTypeName(type: DiagnosisState["businessType"]): string {
  switch (type) {
    case "kuliner_fnb":
      return "Kuliner, Kafe & F&B";
    case "properti_aset":
      return "Properti, Residensial & Penginapan";
    case "travel_wisata":
      return "Travel, Wisata & Biro Umroh";
    case "edukasi_bimbel":
      return "Edukasi, Bimbel & Pelatihan";
    case "jasa_b2b":
      return "Jasa B2B, Kontraktor & Ekspor";
    case "retail_d2c":
      return "Toko Retail & Produk Fisik";
    case "booking_jasa":
      return "Salon, Barbershop & Personal Care";
    case "rental_aset":
      return "Rental Kendaraan & Sewa Alat";
    case "operasional_lapangan":
      return "Bengkel, Manufaktur & Gudang";
    case "event_organizer":
      return "Event Organizer, WO & Promotor Acara";
    case "agensi_kreatif":
      return "Agensi Kreatif, Software House & Production";
    case "jasa_cuci_laundry":
      return "Laundry Kiloan/Satuan & Car Wash";
    case "klinik_kesehatan":
      return "Klinik & Fasilitas Kesehatan";
    default:
      return "Bisnis Khusus / Kustom";
  }
}

function getIndustryProfileSnippet(state: DiagnosisState): string {
  const sub = state.subSector;
  const custom = state.customBusinessType?.trim();

  if (custom) {
    const catName = getBusinessTypeName(state.businessType);
    if (state.businessType === "lainnya") {
      return `Sebagai pelaku usaha ${custom}`;
    }
    return `Sebagai pelaku bisnis ${custom} di sektor ${catName}`;
  }

  switch (state.businessType) {
    case "kuliner_fnb": {
      const subLabel = sub === "kafe_resto"
        ? "kafe/restoran"
        : sub === "katering_event"
        ? "katering acara & prasmanan"
        : sub === "bakery_kue"
        ? "bakery, pastry & toko kue"
        : sub === "frozen_cloud"
        ? "makanan beku & cloud kitchen"
        : "usaha kuliner & F&B";
      return `Sebagai pelaku bisnis ${subLabel}`;
    }
    case "properti_aset": {
      const subLabel = sub === "residensial_cluster"
        ? "developer perumahan & cluster residensial"
        : sub === "villa_resort"
        ? "villa liburan & resort"
        : sub === "kos_coliving"
        ? "kos-kosan eksklusif & co-living"
        : sub === "broker_tanah"
        ? "agen properti & broker kavling"
        : "pengembang atau pengelola aset properti";
      return `Sebagai pengembang atau pengelola ${subLabel}`;
    }
    case "travel_wisata": {
      const subLabel = sub === "umroh_haji"
        ? "biro perjalanan ibadah umroh & haji khusus"
        : sub === "tour_opentrip"
        ? "agen tour & open trip liburan"
        : sub === "rental_transport"
        ? "layanan sewa armada bus pariwisata"
        : "biro perjalanan tour & travel";
      return `Sebagai penyelenggara ${subLabel}`;
    }
    case "edukasi_bimbel": {
      const subLabel = sub === "bimbel_sekolah"
        ? "lembaga bimbingan belajar akademik & UTBK"
        : sub === "kursus_skill"
        ? "pusat kursus keahlian & sertifikasi bahasa"
        : sub === "akademi_bakat"
        ? "akademi pelatihan bakat & seni"
        : sub === "lpk_bootcamp"
        ? "lembaga pelatihan kerja & bootcamp"
        : "lembaga pendidikan & kursus";
      return `Sebagai pengelola ${subLabel}`;
    }
    case "jasa_b2b": {
      const subLabel = sub === "kontraktor_sipil"
        ? "layanan kontraktor sipil, arsitek & renovasi"
        : sub === "ekspor_komoditas"
        ? "perdagangan ekspor komoditas & internasional"
        : sub === "vendor_supplier"
        ? "pengadaan barang & supplier B2B"
        : sub === "legal_konsultan"
        ? "konsultan bisnis, legal & agensi jasa"
        : "penyedia jasa profesional B2B";
      return `Sebagai penyedia ${subLabel}`;
    }
    case "retail_d2c": {
      return "Sebagai pelaku bisnis retail & perdagangan barang";
    }
    case "booking_jasa": {
      const subLabel = sub === "salon_barbershop"
        ? "salon kecantikan & barbershop"
        : sub === "studio_konsultasi"
        ? "studio konseling & konsultasi terjadwal"
        : "layanan janji temu & personal care";
      return `Sebagai penyedia ${subLabel}`;
    }
    case "rental_aset": {
      const subLabel = sub === "rental_kendaraan"
        ? "rental mobil & motor"
        : sub === "sewa_kamera"
        ? "sewa kamera, lensa & multimedia"
        : sub === "sewa_alat_berat"
        ? "sewa alat berat & mesin proyek"
        : sub === "sewa_tenda_event"
        ? "sewa tenda pesta & perlengkapan acara"
        : sub === "sewa_camping_outdoor"
        ? "sewa alat camping & perlengkapan outdoor"
        : "bisnis rental armada & persewaan aset";
      return `Sebagai pengusaha ${subLabel}`;
    }
    case "event_organizer": {
      const subLabel = sub === "wedding_organizer"
        ? "penyelenggara wedding organizer & pernikahan"
        : sub === "eo_korporat"
        ? "event organizer korporat, seminar & gathering"
        : sub === "promotor_konser"
        ? "promotor konser musik, festival & expo"
        : "penyelenggara acara & event organizer";
      return `Sebagai penyelenggara ${subLabel}`;
    }
    case "agensi_kreatif": {
      const subLabel = sub === "digital_marketing_agency"
        ? "agensi digital marketing & performance ads"
        : sub === "software_house"
        ? "software house & tech development studio"
        : sub === "production_house"
        ? "production house multimedia, video & fotografi"
        : "agensi kreatif & studio digital";
      return `Sebagai pengelola ${subLabel}`;
    }
    case "jasa_cuci_laundry": {
      const subLabel = sub === "laundry_kiloan_satuan"
        ? "usaha laundry kiloan, satuan & dry cleaning"
        : sub === "carwash_detailing"
        ? "layanan cuci mobil, motor & auto detailing"
        : sub === "home_cleaning_ac"
        ? "jasa cuci kasur, sofa & servis AC panggilan"
        : "usaha jasa cuci & perawatan kebersihan";
      return `Sebagai pemilik ${subLabel}`;
    }
    case "klinik_kesehatan": {
      const subLabel = sub === "klinik_gigi"
        ? "klinik dokter gigi spesialis & dental care"
        : sub === "klinik_estetika"
        ? "klinik estetika kecantikan & skin care"
        : sub === "klinik_hewan"
        ? "klinik dokter hewan & pet clinic"
        : sub === "klinik_umum_pratama"
        ? "klinik pratama umum & rawat jalan"
        : sub === "fisioterapi_rehab"
        ? "pusat fisioterapi & rehabilitasi medik"
        : "fasilitas klinik kesehatan & faskes medis";
      return `Sebagai pengelola ${subLabel}`;
    }
    case "operasional_lapangan": {
      return "Dalam pengelolaan operasional lapangan dan pergudangan";
    }
    default:
      return "Dalam operasional bisnis Anda";
  }
}

function generatePersonalizedExplanation(
  brandName: string,
  solutionId: string,
  state: DiagnosisState,
  pains: string[],
  goals: string[]
): string {
  const painContext = pains.length > 0 ? pains.join(" serta ") : "efisiensi proses kerja";
  const goalContext = goals.length > 0 ? goals.join(" dan ") : "pertumbuhan bisnis yang terukur";
  const profileIntro = getIndustryProfileSnippet(state);

  switch (solutionId) {
    case "fnb_order_pos":
      return `${profileIntro}, kendala seperti ${painContext} membuktikan bahwa ketergantungan pada aplikasi ojek online (dengan komisi 20%–30%) atau pesanan manual via chat WhatsApp sangat membatasi margin laba bersih Anda. Sistem Pemesanan Mandiri F&B ini memberikan solusi menyeluruh: menu digital QR di meja untuk pesanan dine-in instan (tiket langsung tercetak di dapur), aplikasi POS kasir yang cepat, serta kanal pesan-antar (delivery) mandiri tanpa potongan komisi sepeser pun. 100% database pelanggan menjadi aset Anda sendiri untuk mencapai ${goalContext}.`;

    case "properti_showcase_kpr":
      return `${profileIntro}, menghadapi kendala seperti ${painContext}, calon pembeli properti butuh kepastian visual yang transparan dan perhitungan finansial yang cepat sebelum memutuskan survei lokasi. Website showcase ini menyajikan peta siteplan interaktif, katalog tipe rumah, simulasi kalkulator KPR bank real-time, dan sistem kunci unit dengan verifikasi booking fee langsung. Tim sales Anda tidak lagi menghabiskan waktu membalas tanya jawab spesifikasi dasar di chat, mempercepat closing demi ${goalContext}.`;

    case "travel_umroh_platform":
      return `${profileIntro}, kendala seperti ${painContext} berisiko fatal terhadap kredibilitas biro perjalanan ibadah atau tour wisata Anda. Platform travel terpadu ini menyajikan halaman paket umroh/tour yang elegan, sistem manajemen kuota kursi (seat) dan manifest jamaah secara real-time, portal upload dokumen paspor/KTP digital, hingga pelacak pelunasan cicilan otomatis dengan pengingat WhatsApp. Operasional rapi tanpa tumpang tindih untuk mewujudkan ${goalContext}.`;

    case "edukasi_bimbel_system":
      return `${profileIntro}, beban administrasi ${painContext} sering menyita waktu pengajar dan staf operasional dari fokus utamanya, yaitu kualitas pembelajaran murid. Sistem otomasi edukasi ini menyediakan portal pendaftaran siswa baru (PSB) online, penjadwalan kelas dan tutor anti bentrok, serta pengiriman tagihan & pengingat SPP bulanan otomatis langsung ke WhatsApp orang tua murid via WhatsApp Gateway resmi—menjamin kelancaran kas lembaga demi ${goalContext}.`;

    case "otomasi_bisnis":
      return `${profileIntro}, kendala seperti ${painContext} membuktikan bahwa tantangan utama bisnis Anda bukan pada promosi, melainkan beban operasional admin manual yang menyita waktu dan rawan salah input. Solusi Business Automation ini mengintegrasikan WhatsApp Gateway dengan formulir web dan spreadsheet bisnis Anda: draf invoice tagihan terbit otomatis, notifikasi terkirim instan ke pelanggan, dan data tersimpan rapi tanpa perlu copy-paste manual—langsung mewujudkan target ${goalContext}.`;

    case "erp_kustom":
      return `${profileIntro}, kendala seperti ${painContext} jelas menyita banyak waktu dan energi dalam mengawasi operasional harian. Sistem back-office ini dirancang agar mandor atau tim lapangan bisa mencatat pengeluaran langsung lewat HP dengan bukti foto nota. Hasilnya, Anda sebagai owner bisa memantau sisa stok fisik dan keuntungan riil kapan saja tanpa perlu menunggu rekap Excel akhir bulan—fokus mencapai target ${goalContext}.`;

    case "b2b_company_profile": {
      const hasCred = state.painPoints.includes("kredibilitas_portofolio");
      if (hasCred) {
        if (state.businessType === "klinik_kesehatan") {
          return `${profileIntro}, kendala seperti ${painContext} terjadi karena calon pasien baru membutuhkan keyakinan mutlak sebelum mempercayakan kesehatan mereka. Website profil resmi ini menampilkan kualifikasi & STR dokter spesialis, galeri hasil tindakan klinis/estetika sebelum-sesudah (before-after), standar higienitas faskes, serta testimoni pasien terverifikasi. Pasien merasa tenang, terhindar dari keraguan, dan langsung mantap berkonsultasi untuk ${goalContext}.`;
        }
        if (state.businessType === "rental_aset") {
          return `${profileIntro}, kendala seperti ${painContext} terjadi karena calon penyewa ragu terhadap kondisi unit riil dan transparansi harga saat mencari di internet. Website profil & katalog resmi ini menyajikan etalase armada/alat lengkap dengan foto asli, spesifikasi teknis, syarat sewa transparan, dan ulasan pelanggan. Calon penyewa langsung percaya bahwa usaha Anda adalah rental profesional terpercaya demi ${goalContext}.`;
        }
        if (state.businessType === "edukasi_bimbel") {
          return `${profileIntro}, kendala seperti ${painContext} membuktikan bahwa orang tua murid mencari bukti kualitas pengajaran sebelum mendaftarkan anak mereka. Website profil resmi ini merangkum portofolio kelulusan siswa, kualifikasi pengajar/tutor, kurikulum unggulan, serta testimoni wali murid. Kredibilitas lembaga meningkat pesat dan memudahkan konversi pendaftaran baru untuk ${goalContext}.`;
        }
        if (state.businessType === "booking_jasa") {
          return `${profileIntro}, kendala seperti ${painContext} terjadi karena calon pelanggan jasa personal butuh melihat bukti hasil karya nyata sebelum memesan. Website profil & portofolio ini menampilkan showcase visual hasil treatment/layanan, daftar menu treatment transparan, profil keahlian terapis/stylist, serta tombol booking WhatsApp instan demi mencapai target ${goalContext}.`;
        }
        if (state.businessType === "event_organizer") {
          return `${profileIntro}, kendala seperti ${painContext} sangat wajar karena klien mempercayakan momen penting yang tidak bisa diulang. Website showcase portofolio ini memajang galeri video/foto dokumentasi event terdahulu, daftar mitra vendor terpercaya, serta ulasan jujur klien. Klien langsung yakin atas kapasitas penyelenggaraan Anda untuk ${goalContext}.`;
        }
        if (state.businessType === "kuliner_fnb") {
          return `${profileIntro}, kendala seperti ${painContext} sering dialami saat calon pelanggan korporat atau rombongan ragu memesan tanpa melihat standar mutu. Website profil kuliner ini menampilkan showcase menu signature dengan fotografi profesional, sertifikasi higienitas/halal, paket katering, serta ulasan pelanggan terpercaya untuk ${goalContext}.`;
        }
        return `${profileIntro}, kendala seperti ${painContext} membuktikan bahwa tanpa kehadiran digital yang solid dan portofolio hasil kerja nyata, calon pelanggan akan ragu dan beralih ke kompetitor. Website company profile & portofolio resmi ini memajang identitas legalitas usaha, showcase hasil karya/proyek terbaik, dan bukti kepuasan pelanggan secara profesional sehingga calon pembeli tidak lagi ragu untuk ${goalContext}.`;
      }
      return `${profileIntro}, kendala seperti ${painContext} sering kali terjadi karena calon klien korporat belum melihat bukti legitimasi resmi. Kami menyusun website yang memajang legalitas lengkap (NIB/ISO), studi kasus proyek nyata, serta formulir penawaran harga (RFQ) terstruktur. Klien korporat tidak lagi ragu atas kapabilitas tim Anda, dan proses penawaran tender berjalan jauh lebih cepat untuk ${goalContext}.`;
    }

    case "toko_online_d2c":
      return `${profileIntro}, masalah seperti ${painContext} dan potongan biaya admin pihak ketiga membuat profit Anda terus tergerus. Kami bangunkan toko online mandiri dengan verifikasi pembayaran otomatis (QRIS & Virtual Account) dan cek ongkir real-time. Yang paling penting: 100% data pembeli tersimpan rapi sebagai aset Anda sendiri untuk mendorong ${goalContext}.`;

    case "booking_otomasi":
      return `${profileIntro}, waktu tim ${brandName} terlalu berharga bila habis hanya untuk mencocokkan jadwal secara manual berulang kali di chat WhatsApp—yang sering berujung pada ${painContext}. Dengan sistem booking interaktif, pelanggan bisa memilih jadwal sendiri, mengunci reservasi lewat DP otomatis, dan menerima pengingat via WhatsApp sebelum jadwal sesi dimulai. Operasional tertib, target ${goalContext} tercapai.`;

    case "rental_fleet_system":
      return `${profileIntro}, kendala seperti ${painContext} membuktikan bahwa bisnis penyewaan aset fisik tidak bisa disamakan dengan jasa janji temu biasa. Risiko aset bergerak berpindah tangan menuntut sistem pengamanan dan operasional yang kokoh: verifikasi identitas (KTP/SIM/deposit) anti-penggelapan, kalender armada keluar-masuk real-time (tahu persis unit ready, disewa, atau servis), formulir digital ceklist kondisi fisik (bensin & goresan lecet) serah-terima unit, serta kalkulasi denda overtime otomatis agar pendapatan sewa tidak bocor untuk mewujudkan ${goalContext}.`;

    case "event_organizer_system":
      return `${profileIntro}, kendala seperti ${painContext} sangat berisiko merusak reputasi acara yang hanya terjadi satu kali seumur hidup. Sistem Manajemen Acara & Rundown Live ini menghubungkan panitia, kru lapangan, dan vendor dalam satu ritme kerja: undangan digital interaktif dengan QR Code check-in tamu real-time (anti-antrean tamu VIP), sinkronisasi timeline rundown live yang otomatis terupdate di HP kru, serta checklist progress vendor katering/dekorasi agar tidak ada detail meleset saat hari H demi mewujudkan ${goalContext}.`;

    case "agency_client_portal":
      return `${profileIntro}, tantangan seperti ${painContext} sering kali membuat jam kerja tim kreatif bocor melayani revisi tanpa akhir dan menagih pembayaran yang tertunda. Client Portal Agensi ini menjadi benteng profesional bisnis Anda: ruang approval brief dan revisi terstruktur dengan batasan kuota jelas, papan kanban milestone proyek yang transparan bagi klien, serta penagihan invoice termin & retainer bulanan otomatis via WhatsApp Gateway tanpa tim Anda merasa canggung demi mencapai ${goalContext}.`;

    case "laundry_clean_pos":
      return `${profileIntro}, kendala seperti ${painContext} adalah mimpi buruk operasional yang langsung menghilangkan kepercayaan pelanggan setia. Sistem POS Kasir Laundry & Detailing ini menuntaskan kekacauan dari hulu ke hilir: cetak nota barcode thermal saat pakaian/kendaraan diterima, pelacakan proses pengerjaan (Cuci -> Kering -> Setrika -> Rak Simpan), penataan nomor rak fisik agar barang tidak pernah tertukar, dan robot WhatsApp otomatis yang mengabari pelanggan begitu cucian selesai dan siap diambil untuk ${goalContext}.`;

    case "klinik_medis_system":
      return `${profileIntro}, masalah seperti ${painContext} tidak hanya memperlambat pelayanan dokter tetapi juga menurunkan kenyamanan pasien yang sedang menunggu. Sistem Antrean & Rekam Medis (RME) ini merapikan seluruh alur faskes: pendaftaran nomor antrean mandiri dari HP (pasien bisa estimasi jam kedatangan tanpa berjubel di ruang tunggu), rekam medis elektronik terenkripsi yang langsung terhubung ke riwayat tindakan & resep dokter, serta auto-reminder kontrol berkala via WhatsApp untuk mewujudkan ${goalContext}.`;

    case "direct_response_landing":
      return `${profileIntro}, mengalirkan bujet promosi ke halaman yang lambat atau membingungkan adalah alasan utama timbulnya kendala ${painContext}. Kami buatkan landing page yang sangat ringan, cepat dibuka di HP dalam 1 detik, dengan alur penawaran fokus dan tombol WhatsApp terformat otomatis. Calon pembeli langsung terarah untuk closing demi mencapai target ${goalContext}.`;

    case "portal_listing_niche":
      return `${profileIntro}, mengelola banyak unit dengan status yang cepat berubah akan sangat tidak efisien jika masih mengandalkan rekap manual di spreadsheet. Platform direktori ini menyajikan status ketersediaan unit secara real-time, filter pencarian praktis, dan integrasi pemesanan langsung ke WhatsApp pengelola agar calon penyewa tidak lari ke pihak lain dan mempercepat ${goalContext}.`;

    case "client_portal_dashboard":
      return `${profileIntro}, mengirim laporan berkala satu per satu lewat PDF sering memicu salah paham dan menyita waktu kerja tim Anda. Dengan Client Portal, klien atau mitra ${brandName} memiliki dashboard login pribadi untuk memantau progres pekerjaan, mengunduh tagihan, dan melihat update transparan kapan saja demi mewujudkan ${goalContext}.`;

    case "katalog_grosir":
      return `${profileIntro}, pembeli partai besar atau mitra B2B membutuhkan detail spesifikasi yang cepat sebelum mengambil keputusan. Alih-alih tim penjualan harus mengirimkan berkas brosur secara manual di chat, katalog digital ini menampilkan seluruh varian produk, lembar spesifikasi, dan tombol minta penawaran (RFQ) resmi dalam hitungan detik untuk ${goalContext}.`;

    default:
      return `${profileIntro}, berdasarkan kendala ${painContext} dan target ${goalContext}, ${brandName} membutuhkan sistem digital yang rapi dan terhubung langsung ke WhatsApp agar operasional bisnis berjalan lebih ramping tanpa ketergantungan pada rekap manual yang rentan kendala.`;
  }
}

// =========================================================================
// GENERATOR ARSITEKTUR 4 PILAR UTAMA LAYANAN SCALEBIZ
// (Website, POS Finance & Accounting, ERP & Operational, Automation)
// =========================================================================

export function generateFourPillarModules(
  solutionId: string,
  state: DiagnosisState
): {
  pillars: {
    pillar: ScalebizPillarInfo;
    modules: SolutionModule[];
    isRelevant?: boolean;
    status?: "ACTIVE_RECOMMENDED" | "NOT_URGENT" | "FUTURE_PHASE";
    reason?: string;
  }[];
  primaryPillar: ScalebizPillarId;
  allModules: SolutionModule[];
  dormantPillars: {
    pillarId: ScalebizPillarId;
    title: string;
    icon: string;
    reason: string;
  }[];
} {
  const pains = state.painPoints;
  const sub = state.subSector || "";
  const biz = state.businessType || "lainnya";
  const hasPain = (p: string) => pains.includes(p as any);

  const flows = state.customerFlow || [];
  const goals = state.goals || [];
  const tools = state.currentTools || [];
  const orders = Array.isArray(state.orderProcessing)
    ? state.orderProcessing
    : (state.orderProcessing ? [state.orderProcessing] : []);

  const hasExistingPos = orders.includes("software_khusus" as any) || tools.includes("pos" as any);
  const hasExistingWeb = orders.includes("sistem_internal" as any);
  const isManualOperation = orders.includes("manual_whatsapp" as any) || orders.includes("catat_buku" as any);
  const hasCashLeak = hasPain("kas_stok_bocor") || hasPain("selisih_kas");
  const hasAdWaste = hasPain("iklan_boncos");

  // 1. Tentukan Pilar Prioritas Utama Berdasarkan Akar Masalah, Model Bisnis & Deduplikasi Sistem Eksisting (Page 3)
  let primaryPillar: ScalebizPillarId = "website";

  const hasCredibilityNeed = hasPain("kredibilitas_portofolio") || hasPain("gagal_tender");
  const hasSevereInternalDamage =
    hasCashLeak ||
    hasPain("baju_hilang_tertukar") ||
    hasPain("cucian_menumpuk_lama") ||
    hasPain("unit_rusak_telat_kembali") ||
    hasPain("verifikasi_ktp_rawan") ||
    hasPain("rekam_medis_tercecer");

  const candidatePos =
    hasCashLeak ||
    hasPain("baju_hilang_tertukar") ||
    hasPain("cucian_menumpuk_lama") ||
    biz === "jasa_cuci_laundry" ||
    sub === "kafe_resto" ||
    sub === "bakery_kue" ||
    sub === "bengkel_karoseri";

  const candidateErp =
    hasPain("unit_rusak_telat_kembali") ||
    hasPain("verifikasi_ktp_rawan") ||
    hasPain("scope_creep_revisi") ||
    hasPain("rekam_medis_tercecer") ||
    biz === "rental_aset" ||
    biz === "operasional_lapangan" ||
    biz === "agensi_kreatif" ||
    sub === "kontraktor_sipil" ||
    sub === "pabrikasi_gudang";

  const candidateAuto =
    hasPain("jadwal_bentrok") ||
    hasPain("admin_manual") ||
    hasPain("tagihan_spp_macet") ||
    hasPain("antrean_klinik_numpuk") ||
    hasPain("vendor_event_meleset") ||
    hasPain("rundown_bentrok_venue") ||
    biz === "booking_jasa" ||
    biz === "edukasi_bimbel" ||
    biz === "event_organizer" ||
    biz === "klinik_kesehatan" ||
    sub === "villa_resort" ||
    sub === "kos_coliving";

  // Jika calon klien butuh website/kredibilitas dan tidak mengalami kerusakan operasional parah,
  // maka prioritas utama PASTI WEBSITE
  if (hasCredibilityNeed && !hasSevereInternalDamage) {
    primaryPillar = "website";
  } else if (candidatePos && (!hasExistingPos || hasCashLeak)) {
    primaryPillar = "pos_finance";
  } else if (candidateErp) {
    primaryPillar = "erp";
  } else if (candidateAuto) {
    primaryPillar = "automation";
  } else if (candidatePos && hasExistingPos && !hasCashLeak) {
    // Anomali: Bisnis F&B/Retail/Laundry tapi SUDAH punya POS dan TIDAK bocor kas
    // Solusinya adalah Otomasi (order WhatsApp / follow-up) atau Website (Menu QR / Web Order)
    if (flows.includes("social_media") || flows.includes("whatsapp")) {
      primaryPillar = "automation";
    } else if (sub === "kafe_resto") {
      primaryPillar = "website"; // QR menu
    } else {
      primaryPillar = "erp";
    }
  } else {
    primaryPillar = "website";
  }

  // Khusus kos_coliving: Tidak pernah butuh POS kasir sebagai pilar utama
  if (sub === "kos_coliving") {
    if (hasPain("tagihan_spp_macet") || hasPain("admin_manual") || isManualOperation) {
      primaryPillar = "automation";
    } else if (hasPain("data_tersebar")) {
      primaryPillar = "erp";
    } else {
      primaryPillar = "website";
    }
  }

  // 2. PILAR 1: WEBSITE & DIGITAL PRESENCE
  const websiteModules: SolutionModule[] = [];
  if (sub === "kafe_resto") {
    websiteModules.push(
      {
        id: "m_web_menu_qr",
        title: "Menu Digital QR Code Interaktif di Meja",
        icon: "📱",
        category: "WEBSITE",
        pillar: "website",
        priority: "CORE",
        description: "Buku menu digital interaktif dengan foto hidangan estetis, filter kategori minuman/makanan, dan tombol pesan mandiri.",
        purpose: "Pelanggan scan barcode di meja dan langsung memilih menu tanpa memanggil pelayan.",
        solvesPainPoint: "Menjawab kendala: Buku menu fisik rusak & antrean kasir menumpuk",
      },
      {
        id: "m_web_local_seo",
        title: "Website Profil Kafe & Google Maps Local SEO",
        icon: "☕",
        category: "WEBSITE",
        pillar: "website",
        priority: "RECOMMENDED",
        description: "Halaman landing page showcase suasana kafe, jam buka, lokasi Maps, dan tautan reservasi meja.",
        purpose: "Menangkap pencarian pelanggan lokal di Google yang mencari 'coffee shop terdekat'.",
      }
    );
  } else if (sub === "katering_event") {
    websiteModules.push(
      {
        id: "m_web_catering_catalog",
        title: "Katalog Paket Prasmanan & Nasi Kotak Interaktif",
        icon: "🍱",
        category: "WEBSITE",
        pillar: "website",
        priority: "CORE",
        description: "Penyajian variasi paket menu syukuran, wedding, dan nasi box lengkap dengan rincian lauk dan kalkulator porsi.",
        purpose: "Memudahkan panitia acara mempelajari menu tanpa staf harus mengirimkan berkas PDF secara manual berulang kali.",
      },
      {
        id: "m_web_portfolio_event",
        title: "Portofolio Dokumentasi Event & Testimoni Klien",
        icon: "🏛️",
        category: "WEBSITE",
        pillar: "website",
        priority: "RECOMMENDED",
        description: "Galeri foto penataan meja prasmanan, dekorasi acara, dan ulasan kepuasan klien instansi/korporat.",
        purpose: "Membangun kredibilitas resmi saat bersaing memperebutkan pesanan katering bernilai besar.",
      }
    );
  } else if (sub === "rental_kendaraan") {
    websiteModules.push(
      {
        id: "m_web_fleet_showcase",
        title: "Website Katalog Armada & Cek Tanggal Kosong",
        icon: "🚗",
        category: "WEBSITE",
        pillar: "website",
        priority: "CORE",
        description: "Showcase mobil/motor rental lengkap dengan foto interior, transmisi, harga sewa lepas kunci / sopir, dan ketersediaan live.",
        purpose: "Penyewa dapat melihat ketersediaan unit kapan saja dari HP sebelum menghubungi admin WhatsApp.",
      },
      {
        id: "m_web_booking_engine",
        title: "Formulir Booking Unit & Kunci Tanggal Sewa",
        icon: "🔒",
        category: "WEBSITE",
        pillar: "website",
        priority: "RECOMMENDED",
        description: "Formulir reservasi tanggal sewa dengan kalkulasi total hari dan pembayaran DP instan.",
        purpose: "Mengunci pesanan tanggal sewa penyewa agar tidak dibatalkan sepihak.",
      }
    );
  } else if (sub === "kontraktor_sipil") {
    websiteModules.push(
      {
        id: "m_web_b2b_profile",
        title: "Website Company Profile Resmi & Portofolio Proyek",
        icon: "🏗️",
        category: "WEBSITE",
        pillar: "website",
        priority: "CORE",
        description: "Presentasi legalitas perusahaan, sertifikasi konstruksi, daftar alat kerja, dan galeri before-after proyek nyata.",
        purpose: "Lolos verifikasi dokumen tender korporat/instansi dan memenangkan proyek bernilai tinggi.",
        solvesPainPoint: hasPain("gagal_tender") ? "Menjawab kendala: Klien ragu & kalah tender B2B" : undefined,
      },
      {
        id: "m_web_rfq_portal",
        title: "Portal Pengajuan Permintaan Penawaran (RFQ & Gambar Kerja)",
        icon: "📐",
        category: "WEBSITE",
        pillar: "website",
        priority: "RECOMMENDED",
        description: "Formulir terstruktur bagi calon owner untuk melampirkan gambar arsitektur, lokasi, dan target budget.",
        purpose: "Menerima spesifikasi proyek secara rapi dan profesional sejak kontak pertama.",
      }
    );
  } else if (sub === "brand_fashion" || biz === "retail_d2c") {
    websiteModules.push(
      {
        id: "m_web_d2c_store",
        title: "Toko Online Mandiri (D2C) & Etalase Koleksi Produk",
        icon: "👗",
        category: "WEBSITE",
        pillar: "website",
        priority: "CORE",
        description: "Website e-commerce mandiri dengan pemilihan varian ukuran/warna, panduan size chart, dan checkout instan.",
        purpose: "Pelanggan membeli langsung dari brand Anda 100% bebas potongan komisi marketplace.",
        solvesPainPoint: hasPain("marketplace_margin") ? "Menjawab kendala: Margin keuntungan tertekan potongan komisi marketplace" : undefined,
      },
      {
        id: "m_web_lookbook",
        title: "Katalog Lookbook Interaktif & Cek Ongkir Otomatis",
        icon: "🛍️",
        category: "WEBSITE",
        pillar: "website",
        priority: "RECOMMENDED",
        description: "Tampilan visual lookbook model dan integrasi cek ongkir ekspedisi nasional langsung di halaman produk.",
        purpose: "Menaikkan angka konversi penjualan dari trafik iklan Meta/TikTok Ads.",
      }
    );
  } else if (biz === "event_organizer") {
    websiteModules.push(
      {
        id: "m_web_eo_portfolio",
        title: "Showcase Portofolio Event, Galeri Venue & Kredibilitas WO",
        icon: "✨",
        category: "WEBSITE",
        pillar: "website",
        priority: "CORE",
        description: "Galeri foto & video sinematik dokumentasi pesta pernikahan, panggung konser, seminar korporat, dan testimoni klien ternama.",
        purpose: "Meyakinkan calon pengantin atau komite korporat saat memilih vendor organizer terpercaya.",
      },
      {
        id: "m_web_guest_rsvp",
        title: "Portal Undangan Digital Interaktif & RSVP Tamu (QR Code Check-in)",
        icon: "💌",
        category: "WEBSITE",
        pillar: "website",
        priority: "RECOMMENDED",
        description: "Halaman undangan digital elegan dengan konfirmasi kehadiran (RSVP), reservasi meja VIP, dan barcode check-in di pintu masuk acara.",
        purpose: "Mencegah antrean panjang di meja registrasi dan mendata jumlah tamu hadir secara akurat.",
        solvesPainPoint: hasPain("rundown_bentrok_venue") ? "Menjawab kendala: Antrean tamu VIP & registrasi manual bentrok" : undefined,
      }
    );
  } else if (biz === "agensi_kreatif") {
    websiteModules.push(
      {
        id: "m_web_agency_showcase",
        title: "Website Portofolio Interaktif & Studi Kasus ROI Klien",
        icon: "🎨",
        category: "WEBSITE",
        pillar: "website",
        priority: "CORE",
        description: "Presentasi hasil karya visual berkelas, metrik performa kampanye iklan, dan studi kasus dampak bisnis bagi klien.",
        purpose: "Menunjukkan level kompetensi tim kreatif dan mendatangkan calon klien bereputasi tinggi.",
      },
      {
        id: "m_web_brief_calculator",
        title: "Kalkulator Estimasi Scope & Formulir Creative Brief Mandiri",
        icon: "📐",
        category: "WEBSITE",
        pillar: "website",
        priority: "RECOMMENDED",
        description: "Formulir interaktif untuk calon klien menentukan cakupan deliverables, estimasi timeline, dan anggaran proyek.",
        purpose: "Memfilter prospek yang tidak sesuai kualifikasi dan menerima brief terstruktur sejak kontak pertama.",
        solvesPainPoint: hasPain("scope_creep_revisi") ? "Menjawab kendala: Brief awal klien tidak jelas & revisi melebar" : undefined,
      }
    );
  } else if (biz === "jasa_cuci_laundry") {
    websiteModules.push(
      {
        id: "m_web_laundry_rates",
        title: "Website Profil Layanan Cuci & Daftar Tarif Transparan",
        icon: "🧺",
        category: "WEBSITE",
        pillar: "website",
        priority: "CORE",
        description: "Informasi lengkap paket kiloan, satuan jas/gaun/sepatu, standar detergen higienis, dan formulir request antar-jemput.",
        purpose: "Pelanggan mengetahui estimasi biaya cuci dan mudah memesan pickup delivery dari ponsel.",
      },
      {
        id: "m_web_laundry_tracking",
        title: "Portal Cek Status Cucian Mandiri (Lacak Nota Online)",
        icon: "🔍",
        category: "WEBSITE",
        pillar: "website",
        priority: "RECOMMENDED",
        description: "Pelanggan memasukkan nomor nota untuk memantau apakah pakaian sedang dicuci, disetrika, atau sudah siap diambil.",
        purpose: "Memangkas pertanyaan chat berulang 'cucian saya sudah selesai belum ya kak?'.",
        solvesPainPoint: hasPain("cucian_menumpuk_lama") ? "Menjawab kendala: Pelanggan terus menanyakan status cucian via WhatsApp" : undefined,
      }
    );
  } else if (biz === "klinik_kesehatan") {
    websiteModules.push(
      {
        id: "m_web_clinic_booking",
        title: "Website Faskes, Profil Dokter & Reservasi Janji Temu Online",
        icon: "🏥",
        category: "WEBSITE",
        pillar: "website",
        priority: "CORE",
        description: "Profil SIP dokter, ketersediaan fasilitas medis steril, dan pemilih slot jam janji temu konsultasi mandiri dari HP.",
        purpose: "Pasien memilih jadwal kunjungan tanpa harus mengantre atau menelepon resepsionis.",
        solvesPainPoint: hasPain("antrean_klinik_numpuk") ? "Menjawab kendala: Ruang tunggu klinik berjubel antre manual" : undefined,
      },
      {
        id: "m_web_clinic_services",
        title: "Katalog Tindakan Medis, Paket Treatment & Estimasi Biaya",
        icon: "🩺",
        category: "WEBSITE",
        pillar: "website",
        priority: "RECOMMENDED",
        description: "Penjelasan transparan prosedur tindakan, paket pencegahan/vaksin, dan rentang biaya perawatan kesehatan.",
        purpose: "Membangun kepercayaan dan rasa aman pasien sebelum memutuskan perawatan.",
      }
    );
  } else if (biz === "booking_jasa") {
    websiteModules.push(
      {
        id: "m_web_service_booking",
        title: "Website Profil Layanan & Kalender Booking Janji Temu",
        icon: "✂️",
        category: "WEBSITE",
        pillar: "website",
        priority: "CORE",
        description: "Pilihan stylist/kapster, portofolio treatment rambut/kulit, dan kalender reservasi sesi perawatan online.",
        purpose: "Pelanggan mengunci jam kunjungan mandiri untuk mencegah waktu tunggu di salon/studio.",
      },
      {
        id: "m_web_service_menu",
        title: "Daftar Paket Treatment & Estimasi Waktu Sesi",
        icon: "📋",
        category: "WEBSITE",
        pillar: "website",
        priority: "RECOMMENDED",
        description: "Rincian manfaat perawatan, produk yang digunakan, dan durasi pengerjaan setiap sesi perawatan.",
        purpose: "Memudahkan pelanggan menentukan pilihan layanan yang sesuai kebutuhan mereka.",
      }
    );
  } else if (sub === "kos_coliving") {
    websiteModules.push(
      {
        id: "m_web_kost_showcase",
        title: "Web Showcase Kamar Kos, Tur Foto Fasilitas & Ketersediaan Real-Time",
        icon: "🏢",
        category: "WEBSITE",
        pillar: "website",
        priority: (flows.includes("social_media") || flows.includes("whatsapp") || hasPain("sulit_followup")) ? "CORE" : "RECOMMENDED",
        description: "Showcase tipe kamar kos (Standard/VIP), foto sudut 360°, fasilitas lengkap (AC, WiFi, kamar mandi dalam), dan status kamar kosong live.",
        purpose: "Calon penyewa dari Instagram/TikTok/WhatsApp langsung mengecek ketersediaan kamar tanpa admin harus mengirim foto manual berulang kali.",
        solvesPainPoint: hasPain("sulit_followup") ? "Menjawab kendala: Calon penghuni baru mundur karena lambat cek kamar ready di chat" : undefined,
      },
      {
        id: "m_web_kost_booking",
        title: "Formulir Booking Kamar (Uang Muka/DP) & Pengajuan Jadwal Survei",
        icon: "📅",
        category: "WEBSITE",
        pillar: "website",
        priority: "RECOMMENDED",
        description: "Formulir mandiri bagi calon penghuni untuk memilih jadwal survei lokasi atau langsung mengunci kamar idaman dengan transfer DP.",
        purpose: "Memfilter calon penyewa serius dan mengamankan pemesanan kamar sebelum disewa orang lain.",
      }
    );
  } else if (sub === "residensial_cluster" || biz === "properti_aset") {
    websiteModules.push(
      {
        id: "m_web_cluster_kpr",
        title: "Web Showcase Cluster, Siteplan Interaktif & Simulasi KPR",
        icon: "🏡",
        category: "WEBSITE",
        pillar: "website",
        priority: "CORE",
        description: "Denah siteplan kavling real-time, foto 3D unit rumah, dan kalkulator simulasi angsuran KPR bank.",
        purpose: "Calon pembeli rumah mendapatkan kepastian cicilan dan nomor kavling ready secara instan.",
        solvesPainPoint: "Menjawab kendala: Calon pembeli ragu belum ada siteplan & simulasi KPR",
      },
      {
        id: "m_web_lead_capture",
        title: "Formulir Booking Fee & Penguncian Unit Kavling",
        icon: "🔒",
        category: "WEBSITE",
        pillar: "website",
        priority: "RECOMMENDED",
        description: "Pemesanan tanda jadi unit kavling via QRIS/VA resmi untuk mencegah unit direbut pembeli lain.",
        purpose: "Mengunci minat pembeli serius seketika saat survei rumah contoh.",
      }
    );
  } else {
    websiteModules.push(
      {
        id: "m_web_landing_conversion",
        title: "Landing Page Konversi Tinggi & Profil Perusahaan Resmi",
        icon: "🌐",
        category: "WEBSITE",
        pillar: "website",
        priority: "CORE",
        description: "Halaman web berkecepatan tinggi dengan penawaran jelas, legalitas usaha terverifikasi, dan navigasi langsung ke WhatsApp.",
        purpose: "Meningkatkan kredibilitas bisnis dan melipatgandakan closing dari setiap pengunjung.",
      },
      {
        id: "m_web_interactive_catalog",
        title: "Katalog Produk & Layanan Interaktif",
        icon: "📋",
        category: "WEBSITE",
        pillar: "website",
        priority: "RECOMMENDED",
        description: "Penyajian spesifikasi teknis produk atau paket jasa secara rapi dan nyaman dibuka dari layar smartphone.",
        purpose: "Menjawab pertanyaan awal calon klien secara mandiri tanpa membebani admin.",
      }
    );
  }

  // 3. PILAR 2: POS FINANCE & ACCOUNTING
  const posModules: SolutionModule[] = [];
  if (sub === "kafe_resto") {
    posModules.push(
      {
        id: "m_pos_cashier",
        title: "Aplikasi Kasir POS Barista & Multi-Meja Dine-In",
        icon: "🧾",
        category: "POS_FINANCE",
        pillar: "pos_finance",
        priority: "CORE",
        description: "Pencatatan kasir pesanan meja, split bill tagihan, pembayaran QRIS dinamis, dan cetak struk kasir.",
        purpose: "Mempercepat alur antrean kasir counter dan merekam transaksi harian secara akurat.",
      },
      {
        id: "m_pos_shift_audit",
        title: "Audit Serah-Terima Kas Tutup Shift & Anti Void Ilegal",
        icon: "🔒",
        category: "POS_FINANCE",
        pillar: "pos_finance",
        priority: hasPain("kas_stok_bocor") ? "CORE" : "RECOMMENDED",
        description: "Rekonsiliasi otomatis antara uang fisik di laci kasir dengan total penjualan sistem saat pergantian shift barista.",
        purpose: "Menghilangkan kebocoran uang kas kasir dan memblokir penghapusan (void) nota tanpa PIN manajer.",
        solvesPainPoint: hasPain("kas_stok_bocor") ? "Menjawab kendala: Selisih uang kasir laci saat tutup shift" : undefined,
      },
      {
        id: "m_pos_recipe_cogs",
        title: "Kalkulator HPP Resep & Gramatur Bahan (Beans & Susu)",
        icon: "☕",
        category: "POS_FINANCE",
        pillar: "pos_finance",
        priority: hasPain("kas_stok_bocor") ? "CORE" : "RECOMMENDED",
        description: "Perhitungan otomatis biaya bahan per cangkir kopi dan pemantauan gramatur kalibrasi beans yang terbuang (waste).",
        purpose: "Mengunci margin keuntungan kafe dan mencegah bahan baku terbuang sia-sia.",
        solvesPainPoint: hasPain("kas_stok_bocor") ? "Menjawab kendala: Waste bahan baku susu & biji kopi tanpa tercatat" : undefined,
      }
    );
  } else if (sub === "katering_event") {
    posModules.push(
      {
        id: "m_pos_cogs_event",
        title: "Kalkulator HPP Porsi Menu & Estimasi Laba Bersih Event",
        icon: "💰",
        category: "POS_FINANCE",
        pillar: "pos_finance",
        priority: "CORE",
        description: "Perhitungan otomatis belanja bahan baku berdasarkan jumlah porsi tamu acara untuk menjaga margin laba bersih.",
        purpose: "Mencegah over-budget belanja dapur dan memastikan setiap event menghasilkan profit yang terukur.",
      },
      {
        id: "m_pos_invoice_dp",
        title: "Pencatatan Transaksi Termin DP & Pelunasan H-3 Acara",
        icon: "📑",
        category: "POS_FINANCE",
        pillar: "pos_finance",
        priority: "RECOMMENDED",
        description: "Rekonsiliasi otomatis uang muka, termin pembayaran kedua, dan pelunasan tagihan katering.",
        purpose: "Memastikan seluruh pesanan katering sudah lunas sebelum pesanan dikirim ke lokasi acara.",
      }
    );
  } else if (sub === "rental_kendaraan") {
    posModules.push(
      {
        id: "m_pos_overtime_calc",
        title: "Kalkulasi Otomatis Denda Keterlambatan (Overtime Penalty)",
        icon: "⏱️",
        category: "POS_FINANCE",
        pillar: "pos_finance",
        priority: "CORE",
        description: "Perhitungan denda jam overtime secara otomatis saat penyewa mengembalikan armada melebihi batas jam sewa.",
        purpose: "Mencegah kebocoran pendapatan denda dan menghilangkan perdebatan jam kembali dengan penyewa.",
        solvesPainPoint: hasPain("unit_rusak_telat_kembali") ? "Menjawab kendala: Denda overtime bocor & telat kembali" : undefined,
      },
      {
        id: "m_pos_deposit_reconcile",
        title: "Rekonsiliasi Kasir Sewa & Deposit Jaminan Kerusakan",
        icon: "💳",
        category: "POS_FINANCE",
        pillar: "pos_finance",
        priority: hasPain("kas_stok_bocor") ? "CORE" : "RECOMMENDED",
        description: "Pencatatan kas masuk uang sewa, saldo deposit jaminan yang harus dikembalikan, dan potongan klaim lecet.",
        purpose: "Uang deposit penyewa tercatat rapi tanpa selisih di kas operasional rental.",
      }
    );
  } else if (sub === "kontraktor_sipil") {
    posModules.push(
      {
        id: "m_pos_project_cashflow",
        title: "Laporan Arus Kas Proyek (Termin Masuk vs Belanja Material)",
        icon: "📈",
        category: "POS_FINANCE",
        pillar: "pos_finance",
        priority: "CORE",
        description: "Pencatatan arus kas riil per proyek: pencairan termin klien dibanding pengeluaran semen, besi, dan sewa alat.",
        purpose: "Owner mengetahui secara pasti margin keuntungan riil proyek tanpa menunggu proyek selesai.",
      },
      {
        id: "m_pos_mandor_reconcile",
        title: "Rekonsiliasi Bon Kasbon Mandor & Pengeluaran Lapangan",
        icon: "🧱",
        category: "POS_FINANCE",
        pillar: "pos_finance",
        priority: hasPain("kas_stok_bocor") ? "CORE" : "RECOMMENDED",
        description: "Staf kantor mencocokkan uang kasbon yang ditarik mandor dengan foto bon kuitansi belanja toko material.",
        purpose: "Menghilangkan kebocoran nota belanja fisik di proyek konstruksi.",
        solvesPainPoint: hasPain("kas_stok_bocor") ? "Menjawab kendala: Nota belanja material lapangan tercecer & pengeluaran membengkak" : undefined,
      }
    );
  } else if (sub === "brand_fashion" || biz === "retail_d2c") {
    posModules.push(
      {
        id: "m_pos_retail_cashier",
        title: "Aplikasi Kasir POS Toko & Barcode Scanner Varian",
        icon: "🧾",
        category: "POS_FINANCE",
        pillar: "pos_finance",
        priority: "CORE",
        description: "Pencatatan kasir cepat dengan scan barcode produk dan dukungan multi-metode pembayaran (QRIS/Debit/Tunai).",
        purpose: "Mempercepat antrean kasir toko dan mencegah selisih uang fisik saat tutup toko.",
      },
      {
        id: "m_pos_bank_reconcile",
        title: "Otomasi Rekonsiliasi Mutasi Bank & Margin Bersih",
        icon: "💳",
        category: "POS_FINANCE",
        pillar: "pos_finance",
        priority: hasPain("admin_manual") ? "CORE" : "RECOMMENDED",
        description: "Pencocokan otomatis bukti transfer pembayaran pelanggan dengan mutasi rekening bank secara real-time.",
        purpose: "Admin tidak perlu lagi mengecek rekening koran atau mutasi bank manual satu per satu.",
      }
    );
  } else if (biz === "event_organizer") {
    posModules.push(
      {
        id: "m_pos_eo_budget",
        title: "Kalkulator Anggaran Acara, Termin DP Klien & Alokasi Vendor",
        icon: "💰",
        category: "POS_FINANCE",
        pillar: "pos_finance",
        priority: "CORE",
        description: "Pencatatan termin pembayaran klien (DP 30%, Termin 50%, Pelunasan H-7) dan pencairan komisi vendor rekanan.",
        purpose: "Memastikan kas acara mencukupi untuk pembayaran DP gedung/katering dan mengunci margin laba EO.",
      },
      {
        id: "m_pos_eo_pettycash",
        title: "Audit Petty Cash Operasional Lapangan & Bon Hari-H Acara",
        icon: "🧾",
        category: "POS_FINANCE",
        pillar: "pos_finance",
        priority: hasPain("kas_stok_bocor") ? "CORE" : "RECOMMENDED",
        description: "Pencatatan pengeluaran tak terduga kru saat gladi bersih dan hari-H dengan upload foto kuitansi/nota belanja.",
        purpose: "Mencegah pembengkakan dana kas operasional lapangan yang rawan tidak tercatat secara akuntabel.",
        solvesPainPoint: hasPain("kas_stok_bocor") ? "Menjawab kendala: Pengeluaran tak terduga kru hari-H tidak tercatat" : undefined,
      }
    );
  } else if (biz === "agensi_kreatif") {
    posModules.push(
      {
        id: "m_pos_agency_retainer",
        title: "Sistem Faktur Retainer Bulanan & Pelacak Termin Proyek",
        icon: "📑",
        category: "POS_FINANCE",
        pillar: "pos_finance",
        priority: "CORE",
        description: "Penerbitan otomatis invoice fee retainer bulanan dan tagihan termin bertahap sesuai milestone deliverables.",
        purpose: "Menjaga keteraturan kas masuk dan mencegah piutang agensi macet berbulan-bulan.",
        solvesPainPoint: hasPain("invoice_retainer_macet") ? "Menjawab kendala: Tagihan retainer bulanan klien sering macet" : undefined,
      },
      {
        id: "m_pos_project_cogs",
        title: "Analitik Profitabilitas Proyek (Manhour Cost vs Tagihan)",
        icon: "📊",
        category: "POS_FINANCE",
        pillar: "pos_finance",
        priority: "RECOMMENDED",
        description: "Kalkulasi margin laba riil proyek dengan membandingkan total jam kerja tim (manhour) terhadap nilai kontrak klien.",
        purpose: "Mengetahui proyek mana yang benar-benar menghasilkan profit dan mana yang merugikan tenaga tim.",
      }
    );
  } else if (biz === "jasa_cuci_laundry") {
    posModules.push(
      {
        id: "m_pos_laundry_cashier",
        title: "Aplikasi Kasir POS Laundry, Timbangan Kiloan & Barcode Thermal",
        icon: "🧾",
        category: "POS_FINANCE",
        pillar: "pos_finance",
        priority: "CORE",
        description: "Pencatatan berat timbangan cucian kiloan, item satuan, split pembayaran QRIS/tunai, dan cetak struk barcode nota.",
        purpose: "Mempercepat antrean kasir loket dan mencegah salah hitung tarif pakaian.",
      },
      {
        id: "m_pos_laundry_shift_audit",
        title: "Rekonsiliasi Kasir Tutup Shift & Deposit Saldo Member Laundry",
        icon: "🔒",
        category: "POS_FINANCE",
        pillar: "pos_finance",
        priority: hasPain("kas_stok_bocor") ? "CORE" : "RECOMMENDED",
        description: "Pencocokan uang fisik di laci kasir dengan riwayat nota sistem saat pergantian shift dan kelola saldo paket kuota cuci.",
        purpose: "Menghilangkan kebocoran uang kas kasir dan selisih pembukuan saat tutup gerai.",
        solvesPainPoint: hasPain("kas_stok_bocor") ? "Menjawab kendala: Uang kas laci selisih saat tutup shift gerai" : undefined,
      }
    );
  } else if (biz === "klinik_kesehatan") {
    posModules.push(
      {
        id: "m_pos_clinic_billing",
        title: "Kasir Pembayaran Medis, Paket Tindakan & Integrasi QRIS",
        icon: "💳",
        category: "POS_FINANCE",
        pillar: "pos_finance",
        priority: "CORE",
        description: "Pencatatan rincian tagihan konsultasi dokter, tindakan medis, biaya laboratorium, dan obat resep apotek.",
        purpose: "Mempercepat alur pembayaran kasir pasien dan mencatat mutasi keuangan secara teratur.",
      },
      {
        id: "m_pos_doctor_fee",
        title: "Kalkulator Bagi Hasil (Jasa Medis) Dokter & Paramedis Otomatis",
        icon: "👨‍⚕️",
        category: "POS_FINANCE",
        pillar: "pos_finance",
        priority: "RECOMMENDED",
        description: "Perhitungan otomatis komisi fee dokter spesialis dan perawat berdasarkan tindakan medis yang telah selesai dilakukan.",
        purpose: "Mencegah salah hitung honor tenaga medis dan transparansi laporan jasa medis faskes.",
      }
    );
  } else if (sub === "kos_coliving") {
    posModules.push(
      {
        id: "m_pos_kost_billing",
        title: "Rekonsiliasi Mutasi Pembayaran Sewa Bank & Kasir Operasional Kos",
        icon: "💳",
        category: "POS_FINANCE",
        pillar: "pos_finance",
        priority: "RECOMMENDED",
        description: "Pencocokan otomatis bukti transfer sewa bulanan dengan mutasi rekening bank dan pencatatan kas keluar operasional kos.",
        purpose: "Pengelola tidak perlu lagi mengecek mutasi m-banking satu per satu setiap awal bulan.",
      }
    );
  } else {
    posModules.push(
      {
        id: "m_pos_daily_cashflow",
        title: "Pencatatan Kasir & Buku Kas Masuk/Keluar Harian",
        icon: "💰",
        category: "POS_FINANCE",
        pillar: "pos_finance",
        priority: "CORE",
        description: "Pencatatan penerimaan pembayaran dan pengeluaran operasional kecil harian dari ponsel staf.",
        purpose: "Mencegah selisih uang kas dan merekam seluruh transaksi secara disiplin.",
        solvesPainPoint: hasPain("kas_stok_bocor") ? "Menjawab kendala: Uang kas bocor & selisih pembukuan" : undefined,
      },
      {
        id: "m_pos_financial_report",
        title: "Laporan Laba Rugi Riil & Rekonsiliasi Kas Otomatis",
        icon: "📊",
        category: "POS_FINANCE",
        pillar: "pos_finance",
        priority: "RECOMMENDED",
        description: "Ringkasan grafik omset, beban biaya operasional, dan laba bersih harian/bulanan otomatis.",
        purpose: "Owner mengetahui kondisi kesehatan finansial bisnis tanpa menunggu laporan akhir bulan.",
      }
    );
  }

  // 4. PILAR 3: ERP & OPERATIONAL SYSTEM
  const erpModules: SolutionModule[] = [];
  if (sub === "kafe_resto") {
    erpModules.push(
      {
        id: "m_erp_raw_materials",
        title: "Manajemen Stok Bahan Baku Dapur & Alert Stok Menipis",
        icon: "📦",
        category: "ERP_OPERATIONAL",
        pillar: "erp",
        priority: hasPain("kas_stok_bocor") ? "CORE" : "RECOMMENDED",
        description: "Pengurangan stok otomatis setiap kali menu terjual di kasir dan notifikasi peringatan saat bahan baku menipis.",
        purpose: "Bahan dapur tidak sampai kehabisan saat jam ramai dan mendeteksi bahan baku yang rusak/kedaluwarsa.",
        solvesPainPoint: hasPain("kas_stok_bocor") ? "Menjawab kendala: Bahan baku dapur rusak & stok bocor" : undefined,
      },
      {
        id: "m_erp_kds_kitchen",
        title: "KDS (Kitchen Display System) & Tiket Dapur Terintegrasi",
        icon: "🛎️",
        category: "ERP_OPERATIONAL",
        pillar: "erp",
        priority: "RECOMMENDED",
        description: "Layar monitor pesanan di bar barista dan dapur koki yang menampilkan urutan tiket masak secara live.",
        purpose: "Menghilangkan risiko pesanan terlewat atau salah nomor meja saat pesanan ramai.",
      }
    );
  } else if (sub === "rental_kendaraan") {
    erpModules.push(
      {
        id: "m_erp_fleet_calendar",
        title: "Kalender Ketersediaan Armada Real-Time & Status Unit",
        icon: "📅",
        category: "ERP_OPERATIONAL",
        pillar: "erp",
        priority: "CORE",
        description: "Visualisasi kalender armada: mobil mana yang ready di pool garasi, sedang jalan disewa, atau masuk bengkel servis.",
        purpose: "Admin mengetahui status setiap unit dalam 1 detik dan mencegah double booking jadwal sewa.",
        solvesPainPoint: hasPain("jadwal_bentrok") ? "Menjawab kendala: Jadwal armada bentrok & status ketersediaan unit tidak terpantau jelas" : undefined,
      },
      {
        id: "m_erp_digital_contract",
        title: "Kontrak Sewa Digital (e-Sign) & Ceklis Fisik Foto Serah-Terima",
        icon: "📝",
        category: "ERP_OPERATIONAL",
        pillar: "erp",
        priority: "CORE",
        description: "Surat perjanjian sewa lepas kunci digital dengan tanda tangan di layar HP dan upload foto ceklis bensin/kondisi lecet.",
        purpose: "Arsip identitas KTP penyewa aman terpusat dan bukti autentik jika unit dikembalikan dalam kondisi lecet.",
        solvesPainPoint: hasPain("verifikasi_ktp_rawan") ? "Menjawab kendala: Verifikasi identitas KTP rawan penggelapan" : undefined,
      },
      {
        id: "m_erp_maintenance_log",
        title: "Logbook Servis Berkala, Ganti Oli & Pengingat Uji KIR",
        icon: "🔧",
        category: "ERP_OPERATIONAL",
        pillar: "erp",
        priority: "RECOMMENDED",
        description: "Pencatatan riwayat kilometer armada, jadwal ganti oli rutin, perpanjangan STNK, dan pengingat uji KIR berkala.",
        purpose: "Mencegah armada mogok saat dibawa penyewa dan menjaga nilai aset kendaraan.",
      }
    );
  } else if (sub === "sewa_kamera") {
    erpModules.push(
      {
        id: "m_erp_sn_asset",
        title: "Sistem Inventaris Serial Number (SN) Unit, Bodi & Lensa",
        icon: "📷",
        category: "ERP_OPERATIONAL",
        pillar: "erp",
        priority: "CORE",
        description: "Pencatatan nomor seri spesifik bodi kamera, lensa, baterai, dan memori card yang diserahterimakan ke penyewa.",
        purpose: "Mencegah alat tertukar dengan barang rusak penyewa dan bukti serah terima inventaris.",
        solvesPainPoint: hasPain("unit_rusak_telat_kembali") ? "Menjawab kendala: Kerusakan lensa/sensor tanpa bukti serah-terima" : undefined,
      },
      {
        id: "m_erp_gear_calendar",
        title: "Kalender Jadwal Booking Alat & Unit Masuk-Keluar",
        icon: "🎥",
        category: "ERP_OPERATIONAL",
        pillar: "erp",
        priority: "RECOMMENDED",
        description: "Penjadwalan slot sewa alat multimedia harian untuk mencegah bentrok jadwal pemakaian antar fotografer.",
        purpose: "Menjamin ketersediaan alat sesuai janji sewa proyek klien.",
      }
    );
  } else if (sub === "kontraktor_sipil") {
    erpModules.push(
      {
        id: "m_erp_project_milestone",
        title: "Sistem Pemantauan Progres Proyek (Kurva S & Foto Progres Fisik)",
        icon: "📊",
        category: "ERP_OPERATIONAL",
        pillar: "erp",
        priority: "CORE",
        description: "Pencatatan persentase progres fisik pekerjaan, kurva S deviasi waktu, dan arsip foto progres dari mandor lapangan.",
        purpose: "Menyediakan laporan transparansi bagi owner proyek dan dasar pengajuan termin pencairan dana.",
        solvesPainPoint: hasPain("klien_minta_laporan") ? "Menjawab kendala: Klien proyek menanyakan pembaruan progres berulang kali di WhatsApp" : undefined,
      },
      {
        id: "m_erp_material_procurement",
        title: "Purchase Order (PO) Material & Manajemen Supplier Lapangan",
        icon: "🧱",
        category: "ERP_OPERATIONAL",
        pillar: "erp",
        priority: "RECOMMENDED",
        description: "Penerbitan surat pesanan material resmi ke toko bangunan mitra sesuai volume RAB yang disetujui.",
        purpose: "Mengontrol belanja semen/besi agar tidak melebihi alokasi anggaran proyek.",
      }
    );
  } else if (sub === "brand_fashion" || biz === "retail_d2c") {
    erpModules.push(
      {
        id: "m_erp_multiwarehouse",
        title: "Manajemen Stok Multi-Gudang & Varian Ukuran/Warna (SKU)",
        icon: "📦",
        category: "ERP_OPERATIONAL",
        pillar: "erp",
        priority: "CORE",
        description: "Sinkronisasi stok fisik gudang toko dan kanal penjualan online secara terpusat untuk ribuan varian baju.",
        purpose: "Mencegah pesanan masuk saat stok fisik kosong dan menghilangkan selisih stok opname.",
        solvesPainPoint: hasPain("kas_stok_bocor") ? "Menjawab kendala: Selisih stok varian ukuran/warna antara toko & online" : undefined,
      },
      {
        id: "m_erp_order_fulfillment",
        title: "Sistem Pemenuhan Pesanan (Packing & Cetak Resi Massal)",
        icon: "🚚",
        category: "ERP_OPERATIONAL",
        pillar: "erp",
        priority: "RECOMMENDED",
        description: "Alur packing barang gudang, scan barcode resi kurir, dan pembaruan status pesanan siap kirim.",
        purpose: "Mempercepat waktu pengiriman paket ke kurir ekspedisi tanpa salah tempel resi.",
      }
    );
  } else if (biz === "event_organizer") {
    erpModules.push(
      {
        id: "m_erp_eo_rundown",
        title: "Live Master Rundown & Sinkronisasi Penugasan Kru Lapangan",
        icon: "⏱️",
        category: "ERP_OPERATIONAL",
        pillar: "erp",
        priority: "CORE",
        description: "Jadwal menit-ke-menit acara yang dapat diakses seluruh kru (Stage Manager, LO, Sound) dengan status live.",
        purpose: "Memastikan seluruh kru mengetahui giliran tugasnya secara presisi dan mencegah acara molor.",
        solvesPainPoint: hasPain("rundown_bentrok_venue") ? "Menjawab kendala: Rundown acara meleset & kru lapangan miskomunikasi" : undefined,
      },
      {
        id: "m_erp_eo_vendor_check",
        title: "Sistem Monitoring Status Vendor & Checklist Aset Perlengkapan",
        icon: "📋",
        category: "ERP_OPERATIONAL",
        pillar: "erp",
        priority: "RECOMMENDED",
        description: "Pelacakan kedatangan vendor dekorasi, catering, lighting, dan checklist kelengkapan barang sebelum acara dimulai.",
        purpose: "Mencegah vendor terlambat setup dan menjamin seluruh fasilitas siap sebelum tamu tiba.",
        solvesPainPoint: hasPain("vendor_event_meleset") ? "Menjawab kendala: Vendor dekor/katering meleset dari kesepakatan" : undefined,
      }
    );
  } else if (biz === "agensi_kreatif") {
    erpModules.push(
      {
        id: "m_erp_agency_kanban",
        title: "Papan Manajemen Task Kreatif, Deadline & Alokasi Beban Kerja Tim",
        icon: "📌",
        category: "ERP_OPERATIONAL",
        pillar: "erp",
        priority: "CORE",
        description: "Visualisasi status pengerjaan desain/coding per desainer dan programmer untuk mencegah bottleneck pekerjaan.",
        purpose: "Memastikan seluruh target deadline proyek selesai tepat waktu tanpa ada tim yang overload.",
      },
      {
        id: "m_erp_agency_scope_control",
        title: "Sistem Log Approval Deliverables & Pembatasan Kuota Revisi",
        icon: "🛡️",
        category: "ERP_OPERATIONAL",
        pillar: "erp",
        priority: "CORE",
        description: "Perekaman persetujuan brief, verifikasi sign-off klien per tahap, dan counter kuota revisi gratis yang disepakati.",
        purpose: "Mencegah scope creep di mana klien meminta tambahan fitur atau revisi tanpa henti di luar kontrak.",
        solvesPainPoint: hasPain("scope_creep_revisi") ? "Menjawab kendala: Scope creep & revisi klien melebar tanpa batas" : undefined,
      }
    );
  } else if (biz === "jasa_cuci_laundry") {
    erpModules.push(
      {
        id: "m_erp_laundry_tracking_stages",
        title: "Tracking Tahapan Cuci (Cuci -> Kering -> Setrika -> Rak Simpan)",
        icon: "🧺",
        category: "ERP_OPERATIONAL",
        pillar: "erp",
        priority: "CORE",
        description: "Karyawan scan barcode nota pada setiap perpindahan tahap (mesin cuci, pengering, meja setrika, hingga nomor rak).",
        purpose: "Menghilangkan risiko pakaian hilang, tertukar antar pelanggan, atau terselip di area produksi.",
        solvesPainPoint: hasPain("baju_hilang_tertukar") ? "Menjawab kendala: Pakaian pelanggan hilang, rusak, atau tertukar" : undefined,
      },
      {
        id: "m_erp_laundry_detergent_stock",
        title: "Kartu Stok Bahan Kimia, Detergen, Pewangi & Alert Stok Menipis",
        icon: "🧪",
        category: "ERP_OPERATIONAL",
        pillar: "erp",
        priority: "RECOMMENDED",
        description: "Pencatatan pemakaian detergen konsentrat dan parfum laundry per kilogram pakaian dengan peringatan restock.",
        purpose: "Mencegah pemborosan bahan kimia cuci dan memastikan persediaan selalu siap.",
      }
    );
  } else if (biz === "klinik_kesehatan") {
    erpModules.push(
      {
        id: "m_erp_clinic_emr",
        title: "Rekam Medis Elektronik (RME) Terenkripsi & Riwayat Tindakan Pasien",
        icon: "🩺",
        category: "ERP_OPERATIONAL",
        pillar: "erp",
        priority: "CORE",
        description: "Pencatatan anamnesis dokter, kode diagnosa ICD-10, foto kondisi pasien/hewan, riwayat alergi, dan terapi obat.",
        purpose: "Dokter dapat mengakses rekam medis pasien dalam 2 detik dan memenuhi standar akreditasi faskes.",
        solvesPainPoint: hasPain("rekam_medis_tercecer") ? "Menjawab kendala: Riwayat rekam medis pasien tercecer & lambat dicari" : undefined,
      },
      {
        id: "m_erp_clinic_pharmacy",
        title: "Manajemen Inventori Obat Apotek Klinik & Peringatan Kedaluwarsa",
        icon: "💊",
        category: "ERP_OPERATIONAL",
        pillar: "erp",
        priority: "RECOMMENDED",
        description: "Pengurangan otomatis stok obat saat resep dicetak dokter dan notifikasi dini obat yang mendekati masa expired.",
        purpose: "Mencegah obat habis saat dibutuhkan pasien dan menghindari kerugian obat kedaluwarsa.",
      }
    );
  } else if (biz === "booking_jasa") {
    erpModules.push(
      {
        id: "m_erp_stylist_schedule",
        title: "Manajemen Jadwal Shift Staf & Ketersediaan Ruang Sesi",
        icon: "📅",
        category: "ERP_OPERATIONAL",
        pillar: "erp",
        priority: "CORE",
        description: "Pengaturan alokasi meja/kursi perawatan dan penugasan staf yang sedang bertugas atau libur.",
        purpose: "Menjamin ketersediaan tenaga perawat/stylist saat pelanggan tiba sesuai jadwal janji temu.",
      },
      {
        id: "m_erp_salon_supplies",
        title: "Pencatatan Stok Produk Perawatan (Shampoo, Krim, Serum)",
        icon: "🧴",
        category: "ERP_OPERATIONAL",
        pillar: "erp",
        priority: "RECOMMENDED",
        description: "Kartu stok pemakaian botol serum, krim rambut, dan perlengkapan higienis salon.",
        purpose: "Mencegah bahan habis saat sesi treatment sedang berlangsung.",
      }
    );
  } else if (sub === "kos_coliving") {
    erpModules.push(
      {
        id: "m_erp_kost_occupancy",
        title: "Sistem Manajemen Okupansi Kamar & Database KTP Penghuni Kos",
        icon: "🚪",
        category: "ERP_OPERATIONAL",
        pillar: "erp",
        priority: "CORE",
        description: "Kalender visual status seluruh pintu kamar (Terisi / Booking / Siap Huni / Perbaikan), arsip foto identitas KTP penyewa, dan riwayat masa sewa.",
        purpose: "Mengetahui secara instan kamar mana yang akan kosong di akhir bulan dan mencegah kamar kosong berlama-lama tanpa tersewa.",
        solvesPainPoint: hasPain("data_tersebar") ? "Menjawab kendala: Visibilitas okupansi kamar lemah & data penghuni tercecer" : undefined,
      },
      {
        id: "m_erp_kost_utilities",
        title: "Pencatatan Meteran Listrik/Token, Biaya Air & Deposit Jaminan Kamar",
        icon: "⚡",
        category: "ERP_OPERATIONAL",
        pillar: "erp",
        priority: hasPain("admin_manual") ? "CORE" : "RECOMMENDED",
        description: "Pencatatan pemakaian listrik tambahan, iuran kebersihan/parkir mobil, serta saldo uang deposit jaminan saat pertama masuk.",
        purpose: "Menghilangkan selisih perhitungan biaya utilitas bulanan dan mempermudah pengembalian deposit saat checkout.",
        solvesPainPoint: hasPain("admin_manual") ? "Menjawab kendala: Rekap token listrik, air & deposit kamar manual di buku" : undefined,
      }
    );
  } else {
    erpModules.push(
      {
        id: "m_erp_inventory_management",
        title: "Manajemen Inventori Stok Barang & Aset Operasional",
        icon: "📦",
        category: "ERP_OPERATIONAL",
        pillar: "erp",
        priority: "CORE",
        description: "Pencatatan keluar-masuk barang dengan kartu stok digital dan pelacakan aset operasional.",
        purpose: "Mencegah barang hilang tanpa jejak dan memastikan persediaan barang selalu terpantau.",
      },
      {
        id: "m_erp_vendor_po",
        title: "Sistem Pengadaan & Purchase Order (PO) Terpusat",
        icon: "📑",
        category: "ERP_OPERATIONAL",
        pillar: "erp",
        priority: "RECOMMENDED",
        description: "Alur pengajuan belanja barang oleh staf dengan persetujuan pimpinan secara terstruktur.",
        purpose: "Mencegah pengeluaran belanja operasional tanpa izin dan menertibkan faktur supplier.",
      }
    );
  }

  // 5. PILAR 4: AUTOMATION & WORKFLOW
  const automationModules: SolutionModule[] = [];
  if (sub === "kafe_resto") {
    automationModules.push(
      {
        id: "m_auto_customer_loyalty",
        title: "WhatsApp Gateway Notifikasi Pesanan & Loyalty Member",
        icon: "💬",
        category: "AUTOMATION",
        pillar: "automation",
        priority: "CORE",
        description: "Pesan WhatsApp otomatis saat pesanan siap diambil dan pengumpulan poin member kafe otomatis.",
        purpose: "Membangun database pelanggan setia kafe untuk promosi promo menu baru tanpa biaya iklan.",
      },
      {
        id: "m_auto_stock_alert",
        title: "Alert Otomatis Bahan Baku Menipis ke WhatsApp Manajer",
        icon: "⚡",
        category: "AUTOMATION",
        pillar: "automation",
        priority: "RECOMMENDED",
        description: "Notifikasi otomatis ke WhatsApp owner atau manajer saat sisa biji kopi atau susu berada di bawah batas minimum.",
        purpose: "Mencegah kafe kehabisan bahan baku inti di tengah jam operasional sibuk.",
      }
    );
  } else if (sub === "katering_event") {
    automationModules.push(
      {
        id: "m_auto_dp_reminder",
        title: "Auto-Reminder WhatsApp Pembayaran Pelunasan H-3 Acara",
        icon: "🔔",
        category: "AUTOMATION",
        pillar: "automation",
        priority: "CORE",
        description: "Pesan pengingat ramah otomatis ke WhatsApp pemesan katering 3 hari sebelum acara untuk pelunasan tagihan.",
        purpose: "Menghilangkan risiko katering sudah dimasak tapi uang pelunasan belum diterima.",
        solvesPainPoint: hasPain("data_tersebar") ? "Menjawab kendala: Pembayaran termin DP & pelunasan acara tercecer" : undefined,
      },
      {
        id: "m_auto_proposal_delivery",
        title: "Pengiriman Proposal Menu Otomatis via WhatsApp Gateway",
        icon: "⚡",
        category: "AUTOMATION",
        pillar: "automation",
        priority: "RECOMMENDED",
        description: "Calon pemesan yang mengisi formulir web langsung menerima rincian proposal menu resmi di WhatsApp dalam 5 detik.",
        purpose: "Merespons minat calon klien seketika sebelum mereka menghubungi vendor katering lain.",
      }
    );
  } else if (sub === "rental_kendaraan") {
    automationModules.push(
      {
        id: "m_auto_overdue_alert",
        title: "Auto-Reminder WhatsApp H-3 Jam Sebelum Masa Sewa Berakhir",
        icon: "⏰",
        category: "AUTOMATION",
        pillar: "automation",
        priority: "CORE",
        description: "Pemberitahuan otomatis ke nomor WhatsApp penyewa menjelang jam sewa habis untuk persiapan pengembalian atau perpanjangan.",
        purpose: "Menghilangkan kebiasaan penyewa telat mengembalikan mobil tanpa konfirmasi terlebih dahulu.",
        solvesPainPoint: hasPain("unit_rusak_telat_kembali") ? "Menjawab kendala: Penyewa telat mengembalikan unit mobil" : undefined,
      },
      {
        id: "m_auto_penalty_broadcast",
        title: "Notifikasi Denda Overtime & Invoice Digital ke WhatsApp",
        icon: "⚡",
        category: "AUTOMATION",
        pillar: "automation",
        priority: "RECOMMENDED",
        description: "Jika mobil terlambat kembali, sistem otomatis mengirimkan rincian hitungan denda overtime ke WhatsApp penyewa.",
        purpose: "Mengamankan hak pendapatan rental tanpa staf harus berdebat manual.",
      }
    );
  } else if (sub === "kontraktor_sipil") {
    automationModules.push(
      {
        id: "m_auto_termin_invoice",
        title: "Notifikasi WhatsApp Jatuh Tempo Termin Proyek ke Owner",
        icon: "📑",
        category: "AUTOMATION",
        pillar: "automation",
        priority: "CORE",
        description: "Pengiriman invoice penagihan termin proyek resmi beserta lampiran kurva S progres fisik ke WhatsApp owner proyek.",
        purpose: "Mencegah termin pembayaran proyek mandek dan mempercepat pencairan dana kerja.",
        solvesPainPoint: hasPain("sulit_followup") ? "Menjawab kendala: Termin pembayaran proyek molor & piutang macet" : undefined,
      },
      {
        id: "m_auto_daily_report",
        title: "Pengiriman Ringkasan Laporan Harian ke Grup WhatsApp Tim",
        icon: "⚡",
        category: "AUTOMATION",
        pillar: "automation",
        priority: "RECOMMENDED",
        description: "Bot mengirimkan rekap absensi tukang dan progres material lapangan setiap sore ke grup WhatsApp kantor.",
        purpose: "Memastikan seluruh tim manajemen memantau kendala lapangan tanpa perlu rapat panjang.",
      }
    );
  } else if (sub === "brand_fashion" || biz === "retail_d2c") {
    automationModules.push(
      {
        id: "m_auto_shipping_resi",
        title: "Notifikasi Otomatis Nomor Resi & Status Kirim ke WhatsApp",
        icon: "📦",
        category: "AUTOMATION",
        pillar: "automation",
        priority: "CORE",
        description: "Pembeli menerima pesan WhatsApp otomatis berisi nomor resi kurir dan tautan lacak paket saat barang dikirim.",
        purpose: "Memangkas 70% beban chat admin yang menanyakan 'kapan pesanan saya dikirim?'.",
        solvesPainPoint: hasPain("admin_manual") ? "Menjawab kendala: Admin kewalahan cek mutasi & input resi satu per satu" : undefined,
      },
      {
        id: "m_auto_repeat_broadcast",
        title: "Broadcast Otomatis Rilis Koleksi Baru ke Database Pembeli",
        icon: "⚡",
        category: "AUTOMATION",
        pillar: "automation",
        priority: "RECOMMENDED",
        description: "Pesan promosi terjadwal ke nomor WhatsApp pembeli lama saat brand Anda merilis katalog produk baru.",
        purpose: "Mendongkrak angka repeat order dari pelanggan lama tanpa biaya iklan berbayar.",
      }
    );
  } else if (biz === "event_organizer") {
    automationModules.push(
      {
        id: "m_auto_eo_guest_blast",
        title: "WhatsApp Blast Undangan Digital, QR Code & Reminder H-1 Acara",
        icon: "💌",
        category: "AUTOMATION",
        pillar: "automation",
        priority: "CORE",
        description: "Pengiriman personal nama tamu di pesan undangan WhatsApp resmi beserta barcode tiket dan pengingat H-1.",
        purpose: "Memastikan tamu menerima rincian lokasi acara secara praktis dan meningkatkan angka kehadiran tamu.",
      },
      {
        id: "m_auto_eo_crew_broadcast",
        title: "Bot Notifikasi Perubahan Rundown Instan ke Grup Kru Lapangan",
        icon: "⚡",
        category: "AUTOMATION",
        pillar: "automation",
        priority: "RECOMMENDED",
        description: "Jika ada penyesuaian waktu rundown acara, bot otomatis mengabarkan seluruh kru lapangan di grup WhatsApp.",
        purpose: "Menghilangkan miskomunikasi di lapangan saat ada perubahan jadwal tak terduga.",
      }
    );
  } else if (biz === "agensi_kreatif") {
    automationModules.push(
      {
        id: "m_auto_agency_invoice_reminder",
        title: "Auto-Reminder WhatsApp Penagihan Invoice & Fee Retainer",
        icon: "📑",
        category: "AUTOMATION",
        pillar: "automation",
        priority: "CORE",
        description: "Pesan penagihan ramah otomatis dengan lampiran faktur PDF ke WhatsApp keuangan klien pada H-3 jatuh tempo.",
        purpose: "Mencegah keterlambatan pembayaran termin tanpa staf akun merasa canggung menagih manual.",
        solvesPainPoint: hasPain("invoice_retainer_macet") ? "Menjawab kendala: Invoice pembayaran termin klien sering diabaikan" : undefined,
      },
      {
        id: "m_auto_agency_status_alert",
        title: "Notifikasi Otomatis Status Deliverable & Request Approval Klien",
        icon: "⚡",
        category: "AUTOMATION",
        pillar: "automation",
        priority: "RECOMMENDED",
        description: "Klien langsung menerima link preview hasil desain atau tautan staging di WhatsApp begitu tim selesai upload draft.",
        purpose: "Mempercepat waktu feedback dari klien dan menghindari penumpukan pekerjaan menunggu kabar.",
      }
    );
  } else if (biz === "jasa_cuci_laundry") {
    automationModules.push(
      {
        id: "m_auto_laundry_ready_wa",
        title: "WhatsApp Notifikasi Otomatis Cucian Selesai & Siap Diambil",
        icon: "💬",
        category: "AUTOMATION",
        pillar: "automation",
        priority: "CORE",
        description: "Sistem otomatis mengirim pesan ke nomor WhatsApp pelanggan begitu cucian dimasukkan ke rak penyimpanan.",
        purpose: "Pelanggan langsung mengambil pakaian tepat waktu dan rak laundry tidak menumpuk berhari-hari.",
        solvesPainPoint: hasPain("cucian_menumpuk_lama") ? "Menjawab kendala: Cucian menumpuk karena pelanggan lupa mengambil" : undefined,
      },
      {
        id: "m_auto_laundry_pickup_alert",
        title: "Notifikasi WhatsApp Request Antar-Jemput ke Kurir Gerai",
        icon: "🛵",
        category: "AUTOMATION",
        pillar: "automation",
        priority: "RECOMMENDED",
        description: "Pesanan pickup baru dari website langsung dikirim ke WhatsApp kurir lengkap dengan koordinat titik Google Maps.",
        purpose: "Mempercepat respon penjemputan cucian pelanggan dalam hitungan menit.",
      }
    );
  } else if (biz === "klinik_kesehatan") {
    automationModules.push(
      {
        id: "m_auto_clinic_queue_alert",
        title: "WhatsApp Notifikasi Estimasi Giliran Nomor Antrean Pasien",
        icon: "📢",
        category: "AUTOMATION",
        pillar: "automation",
        priority: "CORE",
        description: "Pasien menerima pesan WA: '3 nomor lagi giliran Anda dipanggil', sehingga pasien tidak perlu berdesakan di klinik.",
        purpose: "Mengurai kepadatan ruang tunggu dan memberikan pengalaman berobat yang nyaman.",
        solvesPainPoint: hasPain("antrean_klinik_numpuk") ? "Menjawab kendala: Pasien bosan dan mengeluh karena antre lama di ruang tunggu" : undefined,
      },
      {
        id: "m_auto_clinic_control_reminder",
        title: "Auto-Reminder WhatsApp Jadwal Kontrol Pasien & Vaksinasi Berkala",
        icon: "🔔",
        category: "AUTOMATION",
        pillar: "automation",
        priority: "RECOMMENDED",
        description: "Bot mengirimkan pesan pengingat jadwal kontrol gigi, perawatan kulit berkala, atau vaksin booster hewan peliharaan.",
        purpose: "Menjaga kepatuhan perawatan pasien dan meningkatkan kunjungan berkelanjutan ke klinik.",
      }
    );
  } else if (biz === "booking_jasa") {
    automationModules.push(
      {
        id: "m_auto_appointment_reminder",
        title: "WhatsApp Gateway Pengingat Jadwal Janji Temu H-1 Sesi",
        icon: "🔔",
        category: "AUTOMATION",
        pillar: "automation",
        priority: "CORE",
        description: "Pesan konfirmasi kehadiran otomatis yang terkirim H-1 sebelum jam reservasi perawatan salon/personal care tiba.",
        purpose: "Menghilangkan risiko pelanggan lupa datang (no-show) dan memastikan slot staf terisi penuh.",
        solvesPainPoint: hasPain("jadwal_bentrok") ? "Menjawab kendala: Jadwal sesi bentrok & pelanggan sering no-show" : undefined,
      },
      {
        id: "m_auto_treatment_followup",
        title: "Pengingat Otomatis Jadwal Perawatan Ulang Berkala",
        icon: "⚡",
        category: "AUTOMATION",
        pillar: "automation",
        priority: "RECOMMENDED",
        description: "Bot mengirimkan reminder WhatsApp setelah 30 atau 45 hari untuk jadwal potong rambut atau perawatan rambut rutin.",
        purpose: "Mendongkrak repeat booking pelanggan tanpa staf harus menghubungi manual.",
      }
    );
  } else if (biz === "edukasi_bimbel") {
    automationModules.push(
      {
        id: "m_auto_spp_billing",
        title: "Auto-Reminder Tagihan SPP Bulanan ke WhatsApp Wali Murid",
        icon: "📚",
        category: "AUTOMATION",
        pillar: "automation",
        priority: "CORE",
        description: "Pesan tagihan iuran belajar otomatis setiap tanggal 1 disertai tautan pembayaran QRIS instan.",
        purpose: "Menghilangkan tunggakan SPP siswa dan memangkas waktu admin menagih manual.",
        solvesPainPoint: hasPain("tagihan_spp_macet") ? "Menjawab kendala: Tunggakan SPP bulanan siswa menumpuk" : undefined,
      },
      {
        id: "m_auto_absensi_broadcast",
        title: "Notifikasi Kehadiran & Nilai Tryout Otomatis ke Orang Tua",
        icon: "⚡",
        category: "AUTOMATION",
        pillar: "automation",
        priority: "RECOMMENDED",
        description: "Pemberitahuan otomatis saat siswa hadir di kelas dan pengiriman kartu hasil ujian belajar.",
        purpose: "Meningkatkan kepuasan wali murid terhadap transparansi bimbingan belajar.",
      }
    );
  } else if (sub === "kos_coliving") {
    automationModules.push(
      {
        id: "m_auto_kost_rent_reminder",
        title: "Auto-Reminder WhatsApp Jatuh Tempo Tagihan Sewa Kos (H-3 & Hari H)",
        icon: "🔔",
        category: "AUTOMATION",
        pillar: "automation",
        priority: "CORE",
        description: "Pesan pengingat ramah otomatis yang dikirim ke nomor WhatsApp penghuni kos beberapa hari sebelum sewa berakhir disertai rincian tagihan & QRIS/VA transfer.",
        purpose: "Mencegah keterlambatan pembayaran sewa bulanan dan menghilangkan rasa canggung pengelola saat menagih sewa.",
        solvesPainPoint: hasPain("tagihan_spp_macet") ? "Menjawab kendala: Tagihan sewa bulanan kamar sering menunggak" : undefined,
      },
      {
        id: "m_auto_kost_survey_alert",
        title: "Notifikasi Otomatis Pengajuan Survei Kamar ke WhatsApp Pengelola",
        icon: "💬",
        category: "AUTOMATION",
        pillar: "automation",
        priority: "RECOMMENDED",
        description: "Setiap ada calon penyewa yang mengajukan jadwal survei kamar dari website, bot langsung mengirim rincian kontak dan jam survei ke WhatsApp pemilik.",
        purpose: "Pemilik kos dapat segera bersiap menyambut calon penghuni baru tepat waktu.",
      }
    );
  } else {
    automationModules.push(
      {
        id: "m_auto_whatsapp_notification",
        title: "WhatsApp Gateway Notifikasi Transaksi & Pesanan Otomatis",
        icon: "💬",
        category: "AUTOMATION",
        pillar: "automation",
        priority: "CORE",
        description: "Pengiriman nota pesanan, konfirmasi pembayaran, dan informasi status langsung ke nomor WhatsApp pelanggan.",
        purpose: "Memangkas jam kerja admin membalas pesan konfirmasi transaksi secara manual.",
        solvesPainPoint: hasPain("admin_manual") ? "Menjawab kendala: Terlalu banyak kerja manual balas chat & rekap" : undefined,
      },
      {
        id: "m_auto_recurring_reminder",
        title: "Otomasi Pengingat Jatuh Tempo & Follow-Up Prospek",
        icon: "⚡",
        category: "AUTOMATION",
        pillar: "automation",
        priority: "RECOMMENDED",
        description: "Sistem pengingat otomatis untuk penagihan invoice jatuh tempo dan follow-up prospek yang belum closing.",
        purpose: "Menjaga arus kas lancar dan memaksimalkan konversi prospek bisnis.",
      }
    );
  }

  // 6. Evaluasi Kausalitas Relevansi Pilar (Causal Diagnosis)
  // Menilai apakah pilar tersebut BENAR-BENAR DIBUTUHKAN berdasarkan kendala & alur transaksi Page 3

  // Website Relevance
  let isWebRelevant = false;
  if (hasExistingWeb && !hasAdWaste && !hasPain("kredibilitas_portofolio")) {
    // Bisnis SUDAH punya website mandiri dan tidak ada problem konversi iklan / kredibilitas -> Website DORMANT
    isWebRelevant = false;
  } else {
    isWebRelevant =
      primaryPillar === "website" ||
      flows.includes("social_media") ||
      flows.includes("website") ||
      flows.includes("form_online") ||
      (flows.includes("whatsapp") && isManualOperation) || // Sumber WA tapi masih manual -> butuh web showcase!
      goals.includes("tambah_pelanggan") ||
      goals.includes("menang_tender") ||
      goals.includes("kredibilitas") ||
      hasPain("kredibilitas_portofolio") ||
      hasPain("iklan_boncos") ||
      hasPain("ragu_legalitas") ||
      hasPain("gagal_tender") ||
      sub === "kos_coliving" || // Calon penghuni butuh cek foto kamar & fasilitas
      sub === "kafe_resto"; // QR menu
  }

  // POS & Finance Relevance
  let isPosRelevant = false;
  if (sub === "kos_coliving") {
    // Bisnis kos tidak memerlukan mesin kasir fisik counter
    isPosRelevant = false;
  } else if (hasExistingPos && !hasCashLeak) {
    // Bisnis SUDAH menggunakan software POS dan TIDAK ADA kebocoran kas -> POS DORMANT
    isPosRelevant = false;
  } else if (hasCredibilityNeed && !hasSevereInternalDamage && !hasCashLeak && primaryPillar === "website") {
    // Klien fokus membangun kredibilitas & portofolio website, operasional kasir harian aman
    isPosRelevant = false;
  } else {
    isPosRelevant =
      primaryPillar === "pos_finance" ||
      hasCashLeak ||
      hasPain("baju_hilang_tertukar") ||
      hasPain("transaksi_manual") ||
      hasPain("margin_tipis") ||
      flows.includes("datang_langsung") ||
      biz === "kuliner_fnb" ||
      biz === "retail_d2c" ||
      biz === "jasa_cuci_laundry";
  }

  // ERP & Operational Relevance
  let isErpRelevant = false;
  if (hasCredibilityNeed && !hasSevereInternalDamage && primaryPillar === "website") {
    // Klien fokus membangun kredibilitas & portofolio website, operasional internal stabil
    isErpRelevant = false;
  } else {
    isErpRelevant =
      primaryPillar === "erp" ||
      hasPain("stok_mati") ||
      hasPain("jadwal_bentrok") ||
      hasPain("armada_rusak_biaya_bengkak") ||
      hasPain("verifikasi_ktp_rawan") ||
      hasPain("mandor_nota_kertas") ||
      hasPain("rundown_bentrok_venue") ||
      hasPain("vendor_event_meleset") ||
      hasPain("baju_hilang_tertukar") ||
      hasPain("rekam_medis_tercecer") ||
      hasPain("scope_creep_revisi") ||
      hasPain("data_tercecer") ||
      hasPain("data_tersebar") ||
      hasPain("unit_rusak_telat_kembali") ||
      goals.includes("kontrol_stok") ||
      goals.includes("pantau_realtime") ||
      goals.includes("data_terpusat") ||
      sub === "kos_coliving" || // Kalender visual okupansi kamar & database KTP penghuni
      ["operasional_lapangan", "rental_aset", "event_organizer", "agensi_kreatif", "klinik_kesehatan"].includes(biz);
  }

  // Automation Relevance
  const isAutoRelevant =
    primaryPillar === "automation" ||
    hasPain("admin_slowres") ||
    hasPain("followup_bocor") ||
    hasPain("cucian_menumpuk_lama") ||
    hasPain("tagihan_spp_macet") ||
    hasPain("invoice_retainer_macet") ||
    hasPain("antrean_klinik_numpuk") ||
    hasPain("admin_manual") ||
    sub === "kos_coliving" || // Auto-reminder jatuh tempo sewa kos
    orders.includes("manual_whatsapp" as any) ||
    orders.includes("catat_buku" as any) ||
    goals.includes("hemat_waktu_admin") ||
    goals.includes("kurangi_manual") ||
    goals.includes("kurangi_error");

  // Alasan objektif jika pilar belum mendesak (Dormant Reasons transparan)
  const webDormantReason = hasExistingWeb
    ? "Anda telah memiliki website/sistem web mandiri. Kami mengalihkan fokus anggaran pada otomatisasi alur kerja dan integrasi data operasional internal agar efisiensi maksimal."
    : "Kanal pelanggan Anda saat ini lebih banyak via kontak langsung/WhatsApp. Perombakan website baru belum mendesak agar anggaran Anda tetap efisien.";

  const posDormantReason = sub === "kos_coliving"
    ? "Model bisnis persewaan kamar kos tidak membutuhkan aplikasi kasir konter fisik. Menghindarkan Anda dari biaya software kasir yang tidak terpakai."
    : hasExistingPos
    ? "Anda telah menggunakan aplikasi kasir (POS) dalam operasional harian. Scalebiz tidak membebani anggaran Anda dengan software kasir baru, melainkan memfokuskan integrasi sistem di lini yang belum optimal."
    : (hasCredibilityNeed && !hasSevereInternalDamage)
    ? "Operasional kasir & pencatatan keuangan Anda sudah berjalan baik. Fokus modal saat ini dialokasikan penuh untuk membangun website resmi & portofolio kredibilitas."
    : "Model bisnis dan alur transaksi Anda tidak membutuhkan aplikasi kasir fisik counter. Menghindarkan Anda dari biaya software kasir yang tidak terpakai.";

  const erpDormantReason = (hasCredibilityNeed && !hasSevereInternalDamage)
    ? "Operasional internal Anda sudah stabil tanpa kendala mendesak. Anda belum membutuhkan software ERP yang kompleks; anggaran difokuskan murni untuk membangun kredibilitas, profil resmi, dan portofolio di website."
    : "Skala inventaris atau armada Anda saat ini masih cukup fleksibel tanpa perlu modul ERP operasional yang kompleks.";
  const autoDormantReason =
    "Volume penanganan chat dan komunikasi tim saat ini masih memadai secara manual tanpa perlu integrasi WhatsApp Gateway otomatis.";

  // Pastikan pilar dormant modulnya tidak berstatus CORE agar tidak tercentang otomatis
  const adjustModulesForDormant = (mods: SolutionModule[], isRel: boolean): SolutionModule[] => {
    if (isRel) return mods;
    return mods.map((m) => ({
      ...m,
      priority: "OPTIONAL",
    }));
  };

  const finalWebModules = adjustModulesForDormant(websiteModules, isWebRelevant);
  const finalPosModules = adjustModulesForDormant(posModules, isPosRelevant);
  const finalErpModules = adjustModulesForDormant(erpModules, isErpRelevant);
  const finalAutoModules = adjustModulesForDormant(automationModules, isAutoRelevant);

  // Susun Struktur 4 Pilar
  const pillars: {
    pillar: ScalebizPillarInfo;
    modules: SolutionModule[];
    isRelevant: boolean;
    status: "ACTIVE_RECOMMENDED" | "NOT_URGENT" | "FUTURE_PHASE";
    reason?: string;
  }[] = [
    {
      pillar: {
        id: "website",
        title: "Pilar 1: Website & Digital Presence",
        shortTitle: "Website",
        icon: "🌐",
        tagline: "Katalog interaktif, landing page konversi iklan, & profil kredibilitas resmi.",
        isPrimary: primaryPillar === "website",
      },
      modules: finalWebModules,
      isRelevant: isWebRelevant,
      status: isWebRelevant ? "ACTIVE_RECOMMENDED" : "NOT_URGENT",
      reason: isWebRelevant ? undefined : webDormantReason,
    },
    {
      pillar: {
        id: "pos_finance",
        title: "Pilar 2: POS Finance & Accounting",
        shortTitle: "POS & Finansial",
        icon: "💳",
        tagline: "Kasir point-of-sale, audit tutup shift, HPP resep/COGS, & rekonsiliasi kas harian.",
        isPrimary: primaryPillar === "pos_finance",
      },
      modules: finalPosModules,
      isRelevant: isPosRelevant,
      status: isPosRelevant ? "ACTIVE_RECOMMENDED" : "NOT_URGENT",
      reason: isPosRelevant ? undefined : posDormantReason,
    },
    {
      pillar: {
        id: "erp",
        title: "Pilar 3: ERP & Operational System",
        shortTitle: "ERP Operasional",
        icon: "🏢",
        tagline: "Manajemen inventori/gudang, armada, jadwal servis, proyek, & dokumen kontrak.",
        isPrimary: primaryPillar === "erp",
      },
      modules: finalErpModules,
      isRelevant: isErpRelevant,
      status: isErpRelevant ? "ACTIVE_RECOMMENDED" : "NOT_URGENT",
      reason: isErpRelevant ? undefined : erpDormantReason,
    },
    {
      pillar: {
        id: "automation",
        title: "Pilar 4: Automation & Workflow",
        shortTitle: "Otomasi Sistem",
        icon: "⚡",
        tagline: "WhatsApp gateway bot, reminder pembayaran/jadwal otomatis, & anti-double booking.",
        isPrimary: primaryPillar === "automation",
      },
      modules: finalAutoModules,
      isRelevant: isAutoRelevant,
      status: isAutoRelevant ? "ACTIVE_RECOMMENDED" : "NOT_URGENT",
      reason: isAutoRelevant ? undefined : autoDormantReason,
    },
  ];

  // Identifikasi Pilar Dormant (Jujur Dinyatakan Belum Butuh)
  const dormantPillars = pillars
    .filter((p) => !p.isRelevant)
    .map((p) => ({
      pillarId: p.pillar.id,
      title: p.pillar.shortTitle,
      icon: p.pillar.icon,
      reason: p.reason || "Belum menjadi prioritas utama pada tahap pertumbuhan bisnis Anda saat ini.",
    }));

  // Susun seluruh modul dengan prioritas: CORE -> RECOMMENDED -> OPTIONAL
  const allModules = [...finalWebModules, ...finalPosModules, ...finalErpModules, ...finalAutoModules].sort((a, b) => {
    const priorityWeight = { CORE: 0, RECOMMENDED: 1, OPTIONAL: 2 };
    return priorityWeight[a.priority] - priorityWeight[b.priority];
  });

  return { pillars, primaryPillar, allModules, dormantPillars };
}

function generateSolutionModules(solutionId: string, state: DiagnosisState): SolutionModule[] {
  return generateFourPillarModules(solutionId, state).allModules;
}


function generateRoadmap(solutionId: string, state?: DiagnosisState): RoadmapPhase[] {
  switch (solutionId) {
    case "fnb_order_pos": {
      const sub = state?.subSector;
      const isKatering = sub === "katering_event";
      const isBakery = sub === "bakery_kue";

      if (isKatering) {
        return [
          {
            phaseNumber: 1,
            phaseTitle: "Tahap 1: Setup Katalog Paket Prasmanan, Nasi Kotak & Alur DP QRIS",
            duration: "2 – 3 Hari Kerja",
            deliverables: [
              "Input paket prasmanan, menu nasi kotak, dan opsi varian lauk",
              "Setup formulir penguncian tanggal acara dengan DP QRIS otomatis",
              "Konfigurasi notifikasi konfirmasi booking ke WhatsApp admin & klien",
            ],
          },
          {
            phaseNumber: 2,
            phaseTitle: "Tahap 2: Integrasi Kalender Acara & Kalkulator Belanja Porsi",
            duration: "2 – 3 Hari Kerja",
            deliverables: [
              "Kalender jadwal pesanan terpusat agar tidak ada pesanan katering bentrok",
              "Kalkulator kebutuhan belanja bahan dapur per total porsi acara",
              "Sistem pembuatan invoice/faktur pesanan katering format PDF resmi",
            ],
          },
          {
            phaseNumber: 3,
            phaseTitle: "Tahap 3: Uji Coba Kunci Jadwal, Simulasi DP & SOP Admin",
            duration: "1 – 2 Hari Kerja",
            deliverables: [
              "Simulasi reservasi tanggal hingga pembayaran DP terverifikasi",
              "Pelatihan admin untuk rekap pesanan event dan cetak rincian belanja",
              "Peluncuran sistem katering mandiri siap pakai",
            ],
          },
        ];
      }

      if (isBakery) {
        return [
          {
            phaseNumber: 1,
            phaseTitle: "Tahap 1: Setup Katalog Kue, Form Pre-Order & Kasir Toko",
            duration: "2 – 3 Hari Kerja",
            deliverables: [
              "Input katalog kue ulang tahun, roti ready-stock, dan varian topping",
              "Setup modul pre-order custom cake dengan tanggal & jam pick-up",
              "Konfigurasi tablet kasir POS toko dan printer struk penjualan",
            ],
          },
          {
            phaseNumber: 2,
            phaseTitle: "Tahap 2: Manajemen Bahan Baku Expired & Integrasi Pembayaran QRIS",
            duration: "2 – 3 Hari Kerja",
            deliverables: [
              "Input resep adonan kue dan peringatan masa simpan bahan baku butter/tepung",
              "Integrasi pembayaran non-tunai via QRIS Dinamis",
              "Setup kanal order takeaway langsung ke WhatsApp tanpa potongan komisi pihak ketiga",
            ],
          },
          {
            phaseNumber: 3,
            phaseTitle: "Tahap 3: Simulasi Pre-Order Kue, Tutup Kasir Toko & Go-Live",
            duration: "1 – 2 Hari Kerja",
            deliverables: [
              "Uji coba alur pesanan kue custom dari WhatsApp hingga jadwal dapur",
              "Pelatihan staf kasir untuk rekap penjualan harian dan tutup buku",
              "Peluncuran sistem toko roti digital mandiri",
            ],
          },
        ];
      }

      // Default: Kafe & Restoran (Dine-in / Barista / Eatery)
      return [
        {
          phaseNumber: 1,
          phaseTitle: "Tahap 1: Setup Master Menu Kopi/Eatery, QR Meja & Kasir POS Barista",
          duration: "2 – 3 Hari Kerja",
          deliverables: [
            "Input katalog menu makanan/minuman, varian beans/topping, dan kategori bar/dapur",
            "Generate QR Code unik per meja untuk pemesanan dine-in mandiri",
            "Setup modul kasir POS tablet, manajemen shift barista, dan printer tiket bar/dapur",
          ],
        },
        {
          phaseNumber: 2,
          phaseTitle: "Tahap 2: Kontrol Resep Bahan Baku, Log Susut & Rekonsiliasi Kas Shift",
          duration: "2 – 3 Hari Kerja",
          deliverables: [
            "Konfigurasi takaran resep per menu (biji kopi, susu UHT, sirup) untuk memotong kebocoran stok",
            "Setup alur rekonsiliasi kas kasir pergantian shift demi tutup buku anti-selisih",
            "Integrasi pembayaran non-tunai instan via QRIS Dinamis dan Virtual Account",
          ],
        },
        {
          phaseNumber: 3,
          phaseTitle: "Tahap 3: Uji Coba Alur Order Meja, Simulasi Kasir & Pelatihan Tim Bar",
          duration: "1 – 2 Hari Kerja",
          deliverables: [
            "Simulasi pemesanan langsung dari scan meja hingga tiket bar tercetak otomatis",
            "Sesi pelatihan pengoperasian kasir dan SOP serah-terima uang kas shift harian",
            "Peluncuran sistem mandiri siap pakai dengan margin penuh untuk pemilik gerai",
          ],
        },
      ];
    }

    case "properti_showcase_kpr":
      return [
        {
          phaseNumber: 1,
          phaseTitle: "Tahap 1: Kurasi Tipe Rumah, Siteplan Digital & Data Legalitas",
          duration: "2 – 3 Hari Kerja",
          deliverables: [
            "Pengumpulan denah lantai 3D, galeri foto arsitektur, dan spesifikasi material bangunan",
            "Digitalisasi peta master siteplan kavling dengan indikator unit tersedia / terjual",
            "Penyusunan halaman legalitas resmi (PBG, sertifikat SHM/HGB, profil developer)",
          ],
        },
        {
          phaseNumber: 2,
          phaseTitle: "Tahap 2: Kalkulator KPR Bank Interaktif, Booking Fee & WhatsApp Sales",
          duration: "3 – 4 Hari Kerja",
          deliverables: [
            "Pembangunan kalkulator simulasi angsuran KPR bank (bunga fixed, tenor, DP)",
            "Integrasi alur kunci unit kavling dengan pembayaran booking fee via VA / QRIS",
            "Integrasi tombol booking jadwal survei lokasi langsung terhubung ke WhatsApp sales",
          ],
        },
        {
          phaseNumber: 3,
          phaseTitle: "Tahap 3: Optimasi Tampilan Mobile, SEO Kawasan & Serah Terima",
          duration: "1 – 2 Hari Kerja",
          deliverables: [
            "Uji responsivitas di smartphone memastikan brosur dan denah sangat ringan dibuka",
            "Optimasi SEO kata kunci pencarian properti area lokal bisnis Anda",
            "Serah terima dashboard manajemen status kavling dan panduan pengoperasian",
          ],
        },
      ];

    case "travel_umroh_platform":
      return [
        {
          phaseNumber: 1,
          phaseTitle: "Tahap 1: Desain Paket Perjalanan, Itinerary & Legalitas Resmi PPIU",
          duration: "2 – 3 Hari Kerja",
          deliverables: [
            "Penataan halaman paket ibadah umroh/tour dengan rincian hotel, maskapai, dan rute",
            "Penyusunan bukti izin resmi Kemenag / PPIU dan fasilitas rombongan secara berkelas",
            "Struktur sistem database jamaah terpusat dan penomoran registrasi otomatis",
          ],
        },
        {
          phaseNumber: 2,
          phaseTitle: "Tahap 2: Sistem Kuota Seat Real-Time, Upload Berkas & Pelacak Cicilan",
          duration: "3 – 5 Hari Kerja",
          deliverables: [
            "Pembangunan manajemen kuota seat dan alokasi kamar hotel per tanggal keberangkatan",
            "Pembuatan portal upload dokumen jamaah (KTP, paspor, buku vaksin) yang aman",
            "Sistem pelacak pembayaran DP, cicilan bertahap, dan auto-reminder pelunasan via WA",
          ],
        },
        {
          phaseNumber: 3,
          phaseTitle: "Tahap 3: Uji Alur Booking Jamaah, Testing WhatsApp Alert & Pelatihan",
          duration: "1 – 2 Hari Kerja",
          deliverables: [
            "Simulasi pendaftaran calon jamaah dari pemilihan paket hingga verifikasi pembayaran DP",
            "Pelatihan pengoperasian rekap manifest jamaah bagi tim operasional biro",
            "Peluncuran portal resmi travel siap promosi menyambut musim keberangkatan",
          ],
        },
      ];

    case "edukasi_bimbel_system":
      return [
        {
          phaseNumber: 1,
          phaseTitle: "Tahap 1: Setup Program Belajar, Jadwal Kelas & Formulir PSB",
          duration: "2 – 3 Hari Kerja",
          deliverables: [
            "Pemetaan kurikulum, jenjang kelas, profil pengajar, dan kuota murid per ruangan",
            "Pembangunan formulir pendaftaran siswa baru (PSB) online ramah HP wali murid",
            "Desain sistem buku induk digital untuk mencatat riwayat murid terpusat",
          ],
        },
        {
          phaseNumber: 2,
          phaseTitle: "Tahap 2: Otomasi Tagihan SPP WhatsApp Gateway & Penjadwalan Tutor",
          duration: "3 – 4 Hari Kerja",
          deliverables: [
            "Integrasi WhatsApp Gateway resmi untuk pengiriman notifikasi tagihan SPP berkala",
            "Pemasangan tautan pembayaran digital (QRIS & Virtual Account) di pesan tagihan",
            "Sistem kalender alokasi jam mengajar tutor anti bentrok dan pembagian ruang kelas",
          ],
        },
        {
          phaseNumber: 3,
          phaseTitle: "Tahap 3: Uji Kirim Tagihan SPP, Simulasi PSB & Panduan Admin",
          duration: "1 – 2 Hari Kerja",
          deliverables: [
            "Uji coba pendaftaran siswa baru dan simulasi pengiriman pesan tagihan SPP ke WA",
            "Sesi pelatihan santai penggunaan dashboard siswa dan rekap keuangan untuk staf admin",
            "Pendampingan operasional saat pembukaan gelombang pendaftaran murid baru",
          ],
        },
      ];

    case "otomasi_bisnis":
      return [
        {
          phaseNumber: 1,
          phaseTitle: "Tahap 1: Pemetaan Alur Kerja & Setup WhatsApp Business Gateway",
          duration: "2 – 3 Hari Kerja",
          deliverables: [
            "Audit alur chat masuk, pola format invoice, dan format rekap spreadsheet saat ini",
            "Konfigurasi nomor WhatsApp Business API Gateway resmi (multi-device ready)",
            "Penyusunan template pesan otomatis (konfirmasi order, invoice PDF, reminder)",
          ],
        },
        {
          phaseNumber: 2,
          phaseTitle: "Tahap 2: Integrasi Webhook, Generator Invoice & Sinkronisasi Spreadsheet",
          duration: "3 – 5 Hari Kerja",
          deliverables: [
            "Pembangunan sistem generator invoice PDF otomatis berdesain resmi perusahaan",
            "Integrasi webhook dua arah antara formulir web dan Google Sheets / database bisnis",
            "Pengaturan logika auto follow-up berkala untuk tagihan jatuh tempo & prospek tertunda",
          ],
        },
        {
          phaseNumber: 3,
          phaseTitle: "Tahap 3: Uji Coba Skenario Otomasi, Testing Bot & Pelatihan Admin",
          duration: "1 – 2 Hari Kerja",
          deliverables: [
            "Simulasi alur transaksi nyata dari awal hingga pesan WA dan data sheet terupdate",
            "Sesi pelatihan santai bagi staf admin dalam mengawasi sistem otomatisasi",
            "Garansi kelancaran alur dan pendampingan operasional selama sistem aktif",
          ],
        },
      ];

    case "erp_kustom":
      return [
        {
          phaseNumber: 1,
          phaseTitle: "Tahap 1: Arsitektur Database Kas, Gudang & Hak Akses Multi-Role",
          duration: "3 – 5 Hari Kerja",
          deliverables: [
            "Penyusunan skema pencatatan keuangan (arus kas, pos pengeluaran, akun bank)",
            "Desain struktur master data stok bahan baku, barang jadi, dan ambang batas minimum",
            "Perancangan hak akses login terpisah antara tim lapangan, admin, dan owner",
          ],
        },
        {
          phaseNumber: 2,
          phaseTitle: "Tahap 2: Pembangunan Modul Input HP, Mutasi Stok & Dashboard HPP",
          duration: "5 – 8 Hari Kerja",
          deliverables: [
            "Pembuatan form input nota/struk kas keluar cepat dari ponsel tim lapangan",
            "Pembangunan sistem pencatatan mutasi barang gudang dengan kalkulasi HPP real-time",
            "Integrasi laporan ringkasan kas otomatis ke WhatsApp owner setiap tutup buku",
          ],
        },
        {
          phaseNumber: 3,
          phaseTitle: "Tahap 3: Migrasi Data Awal, Uji Lapangan & Pelatihan Tim",
          duration: "2 – 3 Hari Kerja",
          deliverables: [
            "Input saldo kas awal dan stok fisik opname ke sistem baru",
            "Simulasi operasional langsung oleh mandor / staf gudang di lokasi kerja",
            "Panduan video singkat pemakaian sistem dan pendampingan transisi operasional",
          ],
        },
      ];

    case "b2b_company_profile":
      return [
        {
          phaseNumber: 1,
          phaseTitle: "Tahap 1: Kurasi Narasi Legalitas, Portofolio & Desain Kredibilitas",
          duration: "2 – 3 Hari Kerja",
          deliverables: [
            "Pengumpulan data legalitas resmi (NIB, sertifikasi standar) dan kurasi studi kasus proyek",
            "Perancangan tata letak modern berstandar enterprise yang berwibawa di mata korporat & BUMN",
            "Setup domain resmi (.co.id / .id / .com), SSL korporat, dan hosting enterprise",
          ],
        },
        {
          phaseNumber: 2,
          phaseTitle: "Tahap 2: Pembangunan Halaman Interaktif, Formulir RFQ & Alert WhatsApp",
          duration: "2 – 4 Hari Kerja",
          deliverables: [
            "Coding antarmuka responsif cepat dengan navigasi portofolio proyek terstruktur",
            "Pembuatan formulir RFQ (Permintaan Penawaran Harga) terintegrasi",
            "Integrasi notifikasi pesan instan ke WhatsApp tim sales saat penawaran masuk",
          ],
        },
        {
          phaseNumber: 3,
          phaseTitle: "Tahap 3: Optimasi SEO, Dokumen PDF Unduh & Peluncuran Resmi",
          duration: "1 – 2 Hari Kerja",
          deliverables: [
            "Penyusunan fitur 1-klik unduh Company Profile format PDF resolusi tinggi",
            "Optimasi metadata SEO agar bisnis mudah ditemukan di pencarian Google",
            "Uji coba lintas perangkat (HP, tablet, laptop) dan serah terima akses penuh",
          ],
        },
      ];

    case "toko_online_d2c":
      return [
        {
          phaseNumber: 1,
          phaseTitle: "Tahap 1: Setup Desain Katalog, Kategori Produk & Database Mandiri",
          duration: "2 – 4 Hari Kerja",
          deliverables: [
            "Penataan struktur etalase produk, foto varian, dan deskripsi bernilai jual tinggi",
            "Desain alur belanja yang ringkas (Add-to-cart hingga Checkout dalam 3 langkah)",
            "Setup arsitektur database pelanggan milik sendiri tanpa perantara marketplace",
          ],
        },
        {
          phaseNumber: 2,
          phaseTitle: "Tahap 2: Integrasi Payment Gateway Otomatis & Cek Ongkir Nasional",
          duration: "3 – 5 Hari Kerja",
          deliverables: [
            "Integrasi pembayaran otomatis via QRIS semua e-wallet dan Virtual Account bank",
            "Pemasangan API hitung ongkir otomatis (JNE, J&T, SiCepat, dll.) hingga level kecamatan",
            "Sistem auto-update resi pengiriman otomatis ke WhatsApp pembeli",
          ],
        },
        {
          phaseNumber: 3,
          phaseTitle: "Tahap 3: Uji Coba Transaksi Pembelian & Peluncuran Toko",
          duration: "2 Hari Kerja",
          deliverables: [
            "Simulasi order uji coba memastikan mutasi pembayaran diverifikasi otomatis",
            "Pelatihan pengoperasian dashboard manajemen order dan inventaris toko bagi tim Anda",
            "Peluncuran toko online mandiri siap pakai untuk menerima pesanan pelanggan",
          ],
        },
      ];

    case "booking_otomasi":
      return [
        {
          phaseNumber: 1,
          phaseTitle: "Tahap 1: Pengaturan Jam Layanan, Kuota Staf & Kalender Slot",
          duration: "2 – 3 Hari Kerja",
          deliverables: [
            "Pemetaan jadwal operasional, pembagian kuota per jam, dan durasi tiap sesi layanan",
            "Desain kalender booking interaktif yang mudah dipilih pelanggan langsung dari HP",
            "Pengaturan jeda istirahat (buffer time) antar sesi untuk menjaga kualitas layanan tim",
          ],
        },
        {
          phaseNumber: 2,
          phaseTitle: "Tahap 2: Sistem Kunci Jadwal dengan DP QRIS & WhatsApp Reminder H-1",
          duration: "3 – 4 Hari Kerja",
          deliverables: [
            "Integrasi verifikasi uang muka (DP) otomatis via QRIS untuk mengunci slot jadwal",
            "Konfigurasi robot WhatsApp pengirim pengingat janji temu otomatis (H-1 & 3 jam sebelumnya)",
            "Sistem anti double-booking yang otomatis menutup slot begitu terisi",
          ],
        },
        {
          phaseNumber: 3,
          phaseTitle: "Tahap 3: Uji Skenario Reservasi, Simulasi Batal/Reschedule & Training",
          duration: "1 – 2 Hari Kerja",
          deliverables: [
            "Uji coba booking dari sisi pelanggan dan verifikasi masuknya notifikasi ke staf",
            "Pelatihan panel admin untuk melihat kalender harian tim terpadu",
            "Peluncuran sistem booking siap pakai yang terstruktur dan mudah dioperasikan",
          ],
        },
      ];

    case "rental_fleet_system":
      return [
        {
          phaseNumber: 1,
          phaseTitle: "Tahap 1: Setup Database Armada, Aturan Tarif, Deposit & Kalender Unit",
          duration: "2 – 3 Hari Kerja",
          deliverables: [
            "Input katalog unit armada/alat, plat nomor/ID inventaris, foto unit, dan tarif sewa",
            "Penyusunan aturan deposit jaminan, tarif denda keterlambatan (overtime), dan syarat sewa",
            "Pembuatan kalender armada interaktif dengan status unit real-time (Ready, Disewa, Servis)",
          ],
        },
        {
          phaseNumber: 2,
          phaseTitle: "Tahap 2: Portal Verifikasi KTP, Kontrak Sewa Digital & Ceklist Fisik Unit",
          duration: "3 – 5 Hari Kerja",
          deliverables: [
            "Pembuatan modul upload berkas verifikasi identitas (KTP/SIM/kontak darurat) mitigasi penggelapan",
            "Penerbitan surat perjanjian sewa digital otomatis (e-sign) yang sah dan berkekuatan hukum",
            "Formulir digital ceklist kondisi fisik serah-terima unit (foto lecet bodi & level BBM) langsung dari HP",
          ],
        },
        {
          phaseNumber: 3,
          phaseTitle: "Tahap 3: Otomasi Reminder WhatsApp, Auto-Kalkulasi Denda & Pelatihan Tim Pool",
          duration: "1 – 2 Hari Kerja",
          deliverables: [
            "Konfigurasi robot WhatsApp pengingat batas waktu sewa otomatis ke nomor penyewa (H-3 jam & H-1 jam)",
            "Integrasi kalkulasi otomatis denda overtime saat unit terlambat dikembalikan ke garasi",
            "Simulasi serah-terima unit, pelatihan operasional staf pool garasi, dan peluncuran sistem",
          ],
        },
      ];

    case "event_organizer_system":
      return [
        {
          phaseNumber: 1,
          phaseTitle: "Tahap 1: Setup Master Acara, Modul Rundown Live & Direktori Vendor",
          duration: "2 – 3 Hari Kerja",
          deliverables: [
            "Penyusunan struktur rundown menit-ke-menit yang adaptif terhadap pergeseran jam hari-H",
            "Desain dashboard hak akses koordinasi (Stage Manager, LO Artis/VIP, Sound/Lighting, Runner)",
            "Input master data vendor rekanan (dekorasi, katering, foto/video, venue) dan termin kontrak",
          ],
        },
        {
          phaseNumber: 2,
          phaseTitle: "Tahap 2: Portal Undangan Digital, Sistem Barcode RSVP & Alert Kru WhatsApp",
          duration: "3 – 4 Hari Kerja",
          deliverables: [
            "Pembangunan generator undangan tamu personal dengan QR Code unik scan di lokasi acara",
            "Integrasi bot WhatsApp konfirmasi RSVP kehadiran dan reminder H-1 lokasi acara",
            "Modul kasir kontrol anggaran event (pencatatan DP klien vs pengeluaran petty cash hari-H)",
          ],
        },
        {
          phaseNumber: 3,
          phaseTitle: "Tahap 3: Gladi Bersih Digital, Simulasi Check-in Tamu & Pelatihan Kru",
          duration: "1 – 2 Hari Kerja",
          deliverables: [
            "Simulasi alur check-in tamu VIP di pintu masuk menggunakan kamera HP panitia",
            "Uji coba update live rundown dari Stage Manager ke seluruh HP kru lapangan",
            "Peluncuran sistem operasional EO siap pakai untuk kelancaran penyelenggaraan acara yang terkoordinasi",
          ],
        },
      ];

    case "agency_client_portal":
      return [
        {
          phaseNumber: 1,
          phaseTitle: "Tahap 1: Desain Ruang Kolaborasi Klien, Brief Form & Kanban Proyek",
          duration: "2 – 3 Hari Kerja",
          deliverables: [
            "Perancangan portal login eksklusif untuk klien agensi memantau progress kerja 24/7",
            "Pembuatan formulir creative brief terstruktur agar ekspektasi klien terkunci sejak awal",
            "Setup papan kanban alokasi task desainer/developer dan estimasi manhour kerja",
          ],
        },
        {
          phaseNumber: 2,
          phaseTitle: "Tahap 2: Sistem Log Approval, Kontrol Revisi & Otomasi Tagihan Retainer",
          duration: "3 – 5 Hari Kerja",
          deliverables: [
            "Pembangunan sistem preview deliverables dengan penanda revisi & counter kuota revisi kontrak",
            "Integrasi generator faktur invoice otomatis (DP, termin milestone, retainer bulanan)",
            "Konfigurasi auto-reminder penagihan invoice WhatsApp Gateway pada H-3 jatuh tempo",
          ],
        },
        {
          phaseNumber: 3,
          phaseTitle: "Tahap 3: Uji Kolaborasi Klien, Analitik Profitabilitas & Go-Live",
          duration: "1 – 2 Hari Kerja",
          deliverables: [
            "Simulasi alur pengajuan revisi hingga sign-off deliverables final bersama klien",
            "Pelatihan tim agensi dalam mengelola log jam kerja dan laporan efisiensi proyek",
            "Peluncuran portal resmi meningkatkan citra profesional agensi di mata klien korporat",
          ],
        },
      ];

    case "laundry_clean_pos":
      return [
        {
          phaseNumber: 1,
          phaseTitle: "Tahap 1: Setup Kasir POS Laundry, Timbangan Kiloan & Tarif Layanan",
          duration: "2 – 3 Hari Kerja",
          deliverables: [
            "Input daftar tarif cuci kiloan, satuan (bedcover/jas/sepatu), dan paket member deposit",
            "Integrasi printer thermal bluetooth cetak struk nota kasir barcode per kantong pakaian",
            "Setup modul serah-terima kasir kas tutup shift anti selisih pembukuan",
          ],
        },
        {
          phaseNumber: 2,
          phaseTitle: "Tahap 2: Barcode Tracking Tahapan Cuci, Nomor Rak & WhatsApp Bot",
          duration: "2 – 4 Hari Kerja",
          deliverables: [
            "Pembangunan alur tracking status via scan barcode (Cuci -> Kering -> Setrika -> Rak Simpan)",
            "Digitalisasi penataan rak simpan fisik untuk memastikan pakaian tidak tertukar",
            "Integrasi WhatsApp Gateway pengirim pesan otomatis saat pakaian selesai dan siap diambil",
          ],
        },
        {
          phaseNumber: 3,
          phaseTitle: "Tahap 3: Simulasi Penerimaan Cucian, Lacak Rak & Training Staf",
          duration: "1 – 2 Hari Kerja",
          deliverables: [
            "Uji coba alur dari timbang baju di kasir hingga pesan WA 'Cucian Siap Diambil' masuk ke pelanggan",
            "Pelatihan staf operasional cuci dan kasir toko dalam scan barcode tahapan",
            "Peluncuran sistem laundry modern siap pakai untuk memangkas komplain pakaian hilang",
          ],
        },
      ];

    case "klinik_medis_system":
      return [
        {
          phaseNumber: 1,
          phaseTitle: "Tahap 1: Setup Master Data Poliklinik, Jadwal Dokter & Tarif Tindakan",
          duration: "2 – 4 Hari Kerja",
          deliverables: [
            "Input direktori dokter spesialis/umum, jam praktek, kapasitas antrean harian, dan tarif tindakan medis",
            "Desain formulir pendaftaran nomor antrean mandiri via website yang ringan dibuka di HP pasien",
            "Setup sistem kasir billing faskes terintegrasi pembayaran QRIS dan cetak kuitansi resmi",
          ],
        },
        {
          phaseNumber: 2,
          phaseTitle: "Tahap 2: Rekam Medis Elektronik (RME), Apotek & Alert Antrean WhatsApp",
          duration: "4 – 6 Hari Kerja",
          deliverables: [
            "Pembangunan modul RME terenkripsi dokter (anamnesis, riwayat diagnosa ICD-10, tindakan, resep obat)",
            "Integrasi manajemen stok farmasi/apotek klinik dengan peringatan obat menipis atau kedaluwarsa",
            "Konfigurasi robot WhatsApp notifikasi nomor antrean ('3 nomor lagi giliran Anda') & reminder kontrol berkala",
          ],
        },
        {
          phaseNumber: 3,
          phaseTitle: "Tahap 3: Simulasi Alur Pasien, Uji Keamanan Data Medis & Pelatihan Faskes",
          duration: "2 Hari Kerja",
          deliverables: [
            "Simulasi menyeluruh: Pendaftaran -> Antrean -> Pemeriksaan Dokter di RME -> Tebus Obat Kasir",
            "Audit enkripsi dan hak akses privasi rekam medis dokter/perawat/resepsionis",
            "Pelatihan pengoperasian bagi staf pendaftaran dan tenaga medis klinik sebelum peluncuran resmi",
          ],
        },
      ];

    case "direct_response_landing":
      return [
        {
          phaseNumber: 1,
          phaseTitle: "Tahap 1: Riset Sudut Penawaran, Copywriting Persuasif & Struktur Visual",
          duration: "1 – 2 Hari Kerja",
          deliverables: [
            "Bedah nilai unggul produk hero dan perumusan headline penawaran yang memikat",
            "Penyusunan alur cerita (Story-driven Landing Page): Masalah -> Solusi -> Bukti -> CTA",
            "Desain visual mobile-first berkonversi tinggi tanpa elemen distraksi",
          ],
        },
        {
          phaseNumber: 2,
          phaseTitle: "Tahap 2: Coding Kecepatan Kilat (<1.5s), Tombol WA & Tracking Iklan",
          duration: "1 – 2 Hari Kerja",
          deliverables: [
            "Pemrograman landing page super ringan dengan teknologi Next.js terkini",
            "Pemasangan tombol WhatsApp dengan format pesan otomatis siap closing",
            "Integrasi Meta Pixel / Google Ads conversion tracking untuk pantau hasil iklan",
          ],
        },
        {
          phaseNumber: 3,
          phaseTitle: "Tahap 3: Testing Performa HP, Pengujian Piksel & Go-Live",
          duration: "1 Hari Kerja",
          deliverables: [
            "Audit skor Google PageSpeed memastikan halaman terbuka seketika di koneksi 4G",
            "Uji coba klik konversi iklan memastikan data masuk akurat di dashboard analitik",
            "Peluncuran landing page siap terima trafik iklan",
          ],
        },
      ];

    case "client_portal_dashboard":
      return [
        {
          phaseNumber: 1,
          phaseTitle: "Tahap 1: Desain Arsitektur Keamanan Login Privat & Ruang Klien",
          duration: "3 – 4 Hari Kerja",
          deliverables: [
            "Perancangan sistem autentikasi aman untuk masing-masing perusahaan klien",
            "Desain antarmuka dashboard monitoring progres yang elegan dan profesional",
            "Strukturisasi kategori laporan proyek dan arsip dokumen resmi",
          ],
        },
        {
          phaseNumber: 2,
          phaseTitle: "Tahap 2: Milestone Tracker, Unduh Faktur PDF & Riwayat Progres",
          duration: "4 – 6 Hari Kerja",
          deliverables: [
            "Pembuatan timeline visual tahapan proyek yang dapat dipantau klien 24/7",
            "Sistem arsip invoice dan faktur resmi yang bisa diunduh langsung dalam 1 klik",
            "Pemberitahuan otomatis ke email/WhatsApp klien saat ada progres baru",
          ],
        },
        {
          phaseNumber: 3,
          phaseTitle: "Tahap 3: Uji Coba Multi-Klien, Pengujian Enkripsi & Serah Terima",
          duration: "2 – 3 Hari Kerja",
          deliverables: [
            "Simulasi login beberapa akun klien memastikan data antar perusahaan terisolasi aman",
            "Pelatihan pengisian update proyek bagi tim pelaksana Anda",
            "Peluncuran portal resmi meningkatkan prestise bisnis Anda di mata klien",
          ],
        },
      ];

    case "portal_listing_niche":
      return [
        {
          phaseNumber: 1,
          phaseTitle: "Tahap 1: Desain Skema Spesifikasi Unit, Filter Area & Galeri Foto",
          duration: "3 – 4 Hari Kerja",
          deliverables: [
            "Perumusan atribut penting unit properti/listing (harga, fasilitas, lokasi, spesifikasi)",
            "Desain antarmuka pencarian cepat dengan filter area terdekat dan rentang harga",
            "Sistem kompresi gambar otomatis agar galeri foto properti dibuka sangat ringan di HP",
          ],
        },
        {
          phaseNumber: 2,
          phaseTitle: "Tahap 2: Status Ketersediaan Unit Real-Time & Integrasi Chat Pengelola",
          duration: "4 – 6 Hari Kerja",
          deliverables: [
            "Fitur ganti status unit (Tersedia / Terisi) yang seketika terupdate di publik",
            "Tombol inquiry WhatsApp dengan parameter nama unit dan durasi sewa otomatis",
            "Panel admin intuitif untuk menambah, mengedit, atau menghapus listing tanpa coding",
          ],
        },
        {
          phaseNumber: 3,
          phaseTitle: "Tahap 3: Optimasi Kecepatan, Uji Coba Pencarian & Panduan Pemakaian",
          duration: "2 Hari Kerja",
          deliverables: [
            "Pengujian filter di ratusan kombinasi pencarian memastikan hasil muncul instan",
            "Pelatihan pengelolaan unit properti bagi admin operasional Anda",
            "Peluncuran portal listing siap mendatangkan calon penyewa",
          ],
        },
      ];

    case "katalog_grosir":
      return [
        {
          phaseNumber: 1,
          phaseTitle: "Tahap 1: Struktur Katalog B2B, Varian Produk & Tabel Spesifikasi Teknis",
          duration: "2 – 3 Hari Kerja",
          deliverables: [
            "Penataan struktur kategori produk grosir, lembar spesifikasi teknik, dan aturan MOQ",
            "Desain katalog yang rapi untuk kebutuhan pengadaan barang korporat",
            "Penyusunan format data unduhan spesifikasi produk resmi",
          ],
        },
        {
          phaseNumber: 2,
          phaseTitle: "Tahap 2: Sistem Keranjang RFQ & Penerusan Otomatis ke Tim Sales",
          duration: "3 – 5 Hari Kerja",
          deliverables: [
            "Pembangunan fitur keranjang permintaan penawaran grosir (Instant RFQ)",
            "Formulir data perusahaan pemesan (NPWP, nama perusahaan, PIC pengadaan)",
            "Penerusan otomatis rincian RFQ ke WhatsApp tim sales lengkap dengan format rapi",
          ],
        },
        {
          phaseNumber: 3,
          phaseTitle: "Tahap 3: Uji Alur RFQ, Simulasi Penawaran & Pelatihan Tim Sales",
          duration: "1 – 2 Hari Kerja",
          deliverables: [
            "Uji coba proses pembuatan draf penawaran dari sisi pembeli korporat",
            "Pelatihan tim sales dalam merespons RFQ masuk secara instan",
            "Peluncuran katalog digital siap pakai untuk kemitraan grosir",
          ],
        },
      ];

    default:
      return [
        {
          phaseNumber: 1,
          phaseTitle: "Tahap 1: Setup Alur, Desain & Fondasi Utama",
          duration: "2 – 4 Hari Kerja",
          deliverables: [
            "Menyusun alur sistem dan struktur data sesuai kebiasaan kerja tim Anda",
            "Mendesain antarmuka modern yang sangat ringan dan nyaman dibuka dari HP",
            "Setup domain bisnis resmi, sertifikat keamanan SSL, dan hosting performa tinggi",
          ],
        },
        {
          phaseNumber: 2,
          phaseTitle: "Tahap 2: Pembangunan Sistem & Uji Coba Transaksi",
          duration: "3 – 6 Hari Kerja",
          deliverables: [
            "Membangun fitur operasional utama dan integrasi alur transaksi",
            "Pemasangan otomasi notifikasi ke WhatsApp",
            "Uji coba bersama (simulasi alur kerja nyata) hingga berjalan mulus tanpa kendala",
          ],
        },
        {
          phaseNumber: 3,
          phaseTitle: "Tahap 3: Peluncuran, Pendampingan & Garansi Pemakaian",
          duration: "1 – 2 Hari Kerja",
          deliverables: [
            "Sesi pendampingan santai dan tutorial cara pemakaian sistem untuk tim Anda",
            "Peluncuran resmi ke publik",
            "Garansi kelancaran operasional dan pendampingan teknis",
          ],
        },
      ];
  }
}
