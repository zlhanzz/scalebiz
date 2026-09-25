import { NextRequest, NextResponse } from "next/server";
import { DiagnosisState, DiagnosticResult, ScalebizPillarId, PriorityLevel, SolutionCategory } from "@/types/diagnosis";
import { BUSINESS_SUB_SECTORS_MAP, getRelevantPainPoints } from "@/data/diagnosisData";

interface AiResponsePayload {
  aiAnalysis: string;
  aiQuickWins: string[];
  primaryPillar?: ScalebizPillarId;
  activePillars?: ScalebizPillarId[];
  dormantPillars?: {
    pillarId: ScalebizPillarId;
    title: string;
    icon: string;
    reason: string;
  }[];
  pillarEvaluations?: Partial<Record<ScalebizPillarId, string>>;
  tailoredModules?: {
    id: string;
    title?: string;
    description?: string;
    purpose?: string;
    solvesPainPoint?: string;
    priority?: PriorityLevel;
    pillar?: ScalebizPillarId;
  }[];
  additionalModules?: {
    id: string;
    pillar: ScalebizPillarId;
    title: string;
    description: string;
    purpose: string;
    solvesPainPoint?: string;
    priority: PriorityLevel;
    category: SolutionCategory;
  }[];
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { isAiEnhanced: false, error: "GEMINI_API_KEY not configured on server" },
        { status: 200 }
      );
    }

    const body = await req.json();
    const state: DiagnosisState = body.state;
    const baseline: DiagnosticResult | undefined = body.baseline;

    if (!state || !state.businessType) {
      return NextResponse.json(
        { isAiEnhanced: false, error: "Invalid diagnosis state" },
        { status: 400 }
      );
    }

    // Lookup human-readable context from 4 pages
    // Page 1: Bisnis & Sub-sektor
    const subSectorList = BUSINESS_SUB_SECTORS_MAP[state.businessType] || [];
    const matchedSub = subSectorList.find((s) => s.id === state.subSector);
    const isCustomSub = Boolean(state.subSector && state.subSector.endsWith("_lainnya"));
    const isCustomType = state.businessType === "lainnya";
    const customUserDetail = state.customBusinessType?.trim();

    let subSectorTitle = matchedSub?.title || state.subSector || "Umum";
    if (isCustomType) {
      subSectorTitle = customUserDetail ? `Bisnis Khusus: ${customUserDetail}` : "Model Bisnis Khusus / Kustom";
    } else if (isCustomSub) {
      subSectorTitle = customUserDetail
        ? `${matchedSub?.title || "Sub-Kategori Khusus"}: ${customUserDetail}`
        : (matchedSub?.title || "Jenis Usaha Lainnya");
    }

    // Page 2: Kendala Operasional
    const painList = getRelevantPainPoints(state.businessType, state.subSector);
    const painTitles = state.painPoints
      .map((pId) => painList.find((p) => p.value === pId)?.title || pId)
      .join(", ");
    const customPain = state.customPainPoint ? ` (Catatan Tambahan: ${state.customPainPoint})` : "";

    // Page 3: Alur Transaksi & Pemrosesan
    const customerFlowText = state.customerFlow && state.customerFlow.length > 0
      ? state.customerFlow.join(", ")
      : "Belum dispesifikasi";
    const orderProcessingText = Array.isArray(state.orderProcessing)
      ? (state.orderProcessing.length > 0 ? state.orderProcessing.join(", ") : "Catat manual / campuran")
      : (state.orderProcessing || "Catat manual / campuran");

    // Page 4: Skala Operasional & Alat Saat Ini
    const scaleText = state.businessScale || "Berkembang";
    const currentToolsText = state.currentTools && state.currentTools.length > 0
      ? state.currentTools.join(", ")
      : "WhatsApp / Catatan Manual";

    const displayBrand = state.companyName?.trim() || "Bisnis Anda";

    // Format ringkasan modul 4 pilar dari baseline
    const baselinePillarsSummary = baseline?.pillars && baseline.pillars.length > 0
      ? baseline.pillars.map((p) => {
          const mList = p.modules
            .map((m) => `  - [${m.priority}] ${m.title}: ${m.purpose}`)
            .join("\n");
          return `Pilar [${p.pillar.id.toUpperCase()}] ${p.pillar.title}:\n${mList}`;
        }).join("\n\n")
      : "Standard 4 Pillars: Website, POS Finance, ERP, Automation";

    const promptText = `Anda adalah Lead Solution Architect & Principal Consultant di Scalebiz Indonesia (scalebiz.id).
Scalebiz memiliki 4 PILAR LAYANAN:
1. 🌐 WEBSITE & DIGITAL PRESENCE: Website performa tinggi, profil kredibel, formulir pesanan/katalog, reservasi & SEO.
2. 💳 POS, FINANCE & ACCOUNTING: Kasir POS, multi-payment QRIS/VA, kontrol kas masuk/keluar, dan laporan omzet real-time.
3. 🏢 ERP & OPERATIONAL CORE: Manajemen inventaris bahan baku/stok, mutasi gudang, kontrol shift, job order, dan HPP.
4. ⚡ AUTOMATION & WHATSAPP SYSTEM: Notifikasi otomatis WhatsApp, reminder tagihan, auto-followup prospek, dan sinkronisasi data instan.

TUGAS UTAMA: Analisis mendalam seluruh input 4 Halaman yang diisi calon mitra, lalu berikan evaluasi arsitektur sistem yang presisi, objektif, dan 100% kontekstual.

DATA LENGKAP 4 HALAMAN CALON MITRA:
- [Halaman 1 - Bisnis]: Nama: "${displayBrand}" | Sektor: ${state.businessType} | Sub-Sektor: "${subSectorTitle}"
${customUserDetail ? `- [Spesifikasi Model Usaha yang Ditulis Klien]: "${customUserDetail}" (WAJIB dianalisis mendalam sesuai karakteristik riil operasional usaha ini!)` : ""}
- [Halaman 2 - Kendala Operasional]: ${painTitles || "Efisiensi operasional"}${customPain}
- [Halaman 3 - Alur Transaksi]: Kanal Utama: [${customerFlowText}] | Cara Pemrosesan Pesanan: [${orderProcessingText}]
- [Halaman 4 - Skala & Alat]: Metrik Skala/Volume: [${scaleText}] | Alat Saat Ini: [${currentToolsText}]
- [Baseline Pilar Rekomendasi Awal]: ${baseline?.primaryPillar || "erp"} (${baseline?.primarySolution || "Sistem Terpadu"})

DAFTAR FITUR AWAL:
${baselinePillarsSummary}

PEDOMAN KONSULTASI PROFESIONAL (SANGAT KRUSIAL - WAJIB DITAATI):
1. PRINSIP CAUSAL DIAGNOSIS (JANGAN JUAL SEMUA LAYANAN!):
   - Jangan pernah merekomendasikan semua 4 pilar sekaligus jika bisnis tidak benar-benar membutuhkannya!
   - Tentukan "activePillars": Hanya 1 sampai 3 pilar yang secara nyata menyembuhkan kendala yang dilaporkan di Halaman 2 & 3.
   - Tentukan "dormantPillars": Pilar yang saat ini TIDAK MENDESAK / BELUM PERLU DIBELI oleh ${displayBrand}. Berikan alasan jujur dan melegakan (misal: "Alur transaksi Anda saat ini belum membutuhkan mesin kasir POS, simpan anggaran Anda untuk penguatan operasional").
   - KASUS KHUSUS KREDIBILITAS & TRAFFIC WEBSITE:
     Jika kendala utama klien berhubungan dengan kredibilitas, reputasi, minim portofolio, atau butuh website resmi untuk meyakinkan calon pelanggan ("kredibilitas_portofolio") dan klien TIDAK melaporkan kebocoran operasional parah, pilar prioritas UTAMA WAJIB adalah "website". Jangan pernah memaksakan modul ERP atau POS kasir yang rumit jika internal mereka sudah stabil! Tunjukkan integritas Scalebiz dengan memusatkan solusi pada Website Profil Kredibel, Portofolio & Showroom Digital, serta jadikan ERP/POS sebagai dormant pillar dengan alasan yang transparan dan melegakan.
2. RELEVANSI TOTAL SUB-SEKTOR & BISNIS KUSTOM:
   - Jika pengguna menuliskan bisnis kustom / jenis usaha spesifik ("${customUserDetail || subSectorTitle}"), Anda WAJIB langsung mengulas karakteristik operasional riil dari usaha tersebut secara mendalam. Jangan berikan jawaban template generik, melainkan analisis langsung alur barang/jasa, pencatatan transaksi, dan titik rawan kebocoran operasionalnya!
   - Gunakan terminologi nyata yang relevan dengan model usaha mereka.
3. PRIORITAS MODUL & FITUR:
   - Hanya modul yang menjawab kendala yang diberi prioritas "CORE". Modul lain bisa "RECOMMENDED" atau dieksklusi.
4. TONE OF VOICE:
   - Lugas, santai, berwibawa khas Lead Architect terpercaya (bukan salesy, bukan basa-basi robot).

OUTPUT WAJIB JSON MURNI (VALID JSON):
{
  "primaryPillar": "erp",
  "activePillars": ["erp", "automation"],
  "dormantPillars": [
    {
      "pillarId": "pos_finance",
      "title": "POS, Finance & Kasir",
      "icon": "💳",
      "reason": "Alur transaksi Anda saat ini belum memerlukan sistem kasir counter. Menghemat anggaran Anda."
    }
  ],
  "aiAnalysis": "Ulasan tajam 2 paragraf tentang diagnosis masalah operasional dan arsitektur solusinya.",
  "aiQuickWins": [
    "Aksi taktis 1 dalam 7 hari",
    "Aksi taktis 2 dalam 7 hari",
    "Aksi taktis 3 dalam 7 hari"
  ],
  "pillarEvaluations": {
    "website": "Evaluasi peran website untuk ${displayBrand}.",
    "pos_finance": "Evaluasi peran pos finance untuk ${displayBrand}.",
    "erp": "Evaluasi peran erp operasional untuk ${displayBrand}.",
    "automation": "Evaluasi peran automasi untuk ${displayBrand}."
  },
  "tailoredModules": [
    {
      "id": "id_modul_dari_daftar",
      "title": "Judul modul kontekstual",
      "description": "Deskripsi kontekstual",
      "purpose": "Manfaat langsung terukur",
      "solvesPainPoint": "Keterkaitan langsung dengan kendala",
      "priority": "CORE"
    }
  ],
  "additionalModules": [
    {
      "id": "m_bespoke_unique",
      "pillar": "erp",
      "title": "Judul Fitur Khusus Baru",
      "description": "Deskripsi fitur",
      "purpose": "Manfaat bisnis",
      "solvesPainPoint": "Menjawab kendala spesifik",
      "priority": "CORE",
      "category": "ERP_OPERATIONAL"
    }
  ]
}`;

    const modelsToTry = [
      { name: "gemini-3.6-flash", timeoutMs: 9000 },
      { name: "gemini-3.1-flash-lite", timeoutMs: 6000 },
    ];
    let geminiRes: Response | null = null;
    let usedModel = "gemini-3.6-flash";
    const debugErrors: string[] = [];

    for (const mConfig of modelsToTry) {
      const model = mConfig.name;
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const modelController = new AbortController();
      const modelTimeoutId = setTimeout(() => modelController.abort(), mConfig.timeoutMs);

      try {
        const res = await fetch(geminiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.3,
            },
          }),
          signal: modelController.signal,
        });

        clearTimeout(modelTimeoutId);

        if (res.ok) {
          geminiRes = res;
          usedModel = model;
          break;
        } else {
          const errText = await res.text();
          debugErrors.push(`[${model} HTTP ${res.status}] ${errText.slice(0, 150)}`);
          console.warn(`[Scalebiz AI] Model ${model} returned HTTP ${res.status}:`, errText.slice(0, 200));
        }
      } catch (err: any) {
        clearTimeout(modelTimeoutId);
        debugErrors.push(`[${model} Exception] ${err?.message}`);
        console.warn(`[Scalebiz AI] Model ${model} fetch failed:`, err?.message);
      }
    }

    if (!geminiRes || !geminiRes.ok) {
      return NextResponse.json(
        { isAiEnhanced: false, error: "Semua model Gemini sedang dalam antrean beban tinggi." },
        { status: 200 }
      );
    }

    const geminiData = await geminiRes.json();
    let rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return NextResponse.json(
        { isAiEnhanced: false, error: "No response text from AI" },
        { status: 200 }
      );
    }

    // Sanitize any code fencing if returned
    rawText = rawText.trim();
    if (rawText.startsWith("```json")) {
      rawText = rawText.replace(/^```json\s*/, "").replace(/```$/, "").trim();
    } else if (rawText.startsWith("```")) {
      rawText = rawText.replace(/^```\s*/, "").replace(/```$/, "").trim();
    }

    const parsedPayload: AiResponsePayload = JSON.parse(rawText);

    return NextResponse.json({
      isAiEnhanced: true,
      usedModel,
      primaryPillar: parsedPayload.primaryPillar,
      activePillars: parsedPayload.activePillars,
      dormantPillars: parsedPayload.dormantPillars || [],
      aiAnalysis: parsedPayload.aiAnalysis,
      aiQuickWins: parsedPayload.aiQuickWins || [],
      pillarEvaluations: parsedPayload.pillarEvaluations || {},
      tailoredModules: parsedPayload.tailoredModules || [],
      additionalModules: parsedPayload.additionalModules || [],
    });
  } catch (error: any) {
    console.error("[Scalebiz AI] Route execution error:", error?.message || error);
    return NextResponse.json(
      { isAiEnhanced: false, error: error?.message || "Internal AI routing error" },
      { status: 200 }
    );
  }
}

