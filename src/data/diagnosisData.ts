// Data Konfigurasi Soal, Opsi, dan Pertanyaan Bersyarat untuk Scalebiz Diagnostic

import {
  BusinessType,
  BusinessPain,
  CustomerFlowChannel,
  OrderProcessingMethod,
  DigitalMaturityLevel,
  CurrentTool,
  BusinessGoal,
  BusinessScale,
  ConditionalQuestion,
  SubSectorOption,
} from "@/types/diagnosis";

export interface OptionItem<T> {
  value: T;
  icon: string;
  title: string;
  description: string;
}

export const BUSINESS_TYPE_OPTIONS: OptionItem<BusinessType>[] = [
  {
    value: "kuliner_fnb",
    icon: "🍽️",
    title: "Kuliner, Kafe & F&B",
    description: "Kafe, resto, coffee shop, katering acara, bakery/pastry, dan cloud kitchen.",
  },
  {
    value: "properti_aset",
    icon: "🏡",
    title: "Properti, Residensial & Penginapan",
    description: "Developer perumahan cluster, villa harian, kos eksklusif, dan agen properti.",
  },
  {
    value: "travel_wisata",
    icon: "🕋",
    title: "Travel, Wisata & Biro Umroh",
    description: "Biro umroh/haji, tour & open trip, carter bus pariwisata, dan travel organizer.",
  },
  {
    value: "edukasi_bimbel",
    icon: "📚",
    title: "Edukasi, Bimbel & Pelatihan",
    description: "Bimbingan belajar sekolah, kursus bahasa/skill, akademi bakat, dan LPK/bootcamp.",
  },
  {
    value: "jasa_b2b",
    icon: "🏢",
    title: "Jasa B2B, Kontraktor & Ekspor",
    description: "Kontraktor fisik/interior, eksportir komoditas, vendor pengadaan, dan agensi/konsultan.",
  },
  {
    value: "retail_d2c",
    icon: "🛍️",
    title: "Toko Retail & Produk Fisik",
    description: "Brand fashion, kosmetik/skincare, gadget, elektronik, dan distributor retail.",
  },
  {
    value: "booking_jasa",
    icon: "✂️",
    title: "Salon, Barbershop & Personal Care",
    description: "Salon kecantikan, barbershop, spa/massage, studio yoga, dan klinik kecantikan mandiri.",
  },
  {
    value: "klinik_kesehatan",
    icon: "🏥",
    title: "Klinik & Fasilitas Kesehatan",
    description: "Klinik dokter gigi, klinik estetika, klinik hewan (pet clinic), klinik pratama/umum, dan fisioterapi.",
  },
  {
    value: "event_organizer",
    icon: "🎉",
    title: "Event & Wedding Organizer",
    description: "Wedding organizer/planner, EO gathering korporat, pameran/MICE, dan promotor festival konser.",
  },
  {
    value: "agensi_kreatif",
    icon: "💡",
    title: "Agensi Kreatif, Digital & IT",
    description: "Agensi digital marketing/ads, software house, production house, dan studio konten foto/video.",
  },
  {
    value: "jasa_cuci_laundry",
    icon: "🧺",
    title: "Jasa Cuci, Laundry & Cleaning",
    description: "Laundry kiloan/satuan/dry clean, cuci mobil & auto detailing, serta home cleaning & servis AC.",
  },
  {
    value: "rental_aset",
    icon: "🚗",
    title: "Rental Kendaraan & Sewa Alat",
    description: "Rental mobil/motor lepas kunci, sewa kamera/multimedia, alat berat konstruksi, tenda pesta, serta sewa alat camping & outdoor.",
  },
  {
    value: "operasional_lapangan",
    icon: "🚜",
    title: "Bengkel, Manufaktur & Gudang",
    description: "Bengkel otomotif/karoseri, agribisnis/kebun, pabrikasi, dan pergudangan logistik.",
  },
  {
    value: "lainnya",
    icon: "⚙️",
    title: "Bisnis Khusus / Kustom",
    description: "Model bisnis unik atau kombinasi operasional digital yang belum tercantum.",
  },
];

export const BUSINESS_SUB_SECTORS_MAP: Record<BusinessType, SubSectorOption[]> = {
  kuliner_fnb: [
    { id: "kafe_resto", title: "Kafe, Kedai Kopi & Restoran", icon: "☕", description: "Melayani makan di tempat (dine-in) dan bawa pulang (takeaway) dengan perputaran meja serta menu harian." },
    { id: "katering_event", title: "Katering Acara & Prasmanan", icon: "🍱", description: "Melayani pesanan prasmanan, konsumsi acara, dan nasi kotak terjadwal dengan sistem uang muka (DP)." },
    { id: "bakery_kue", title: "Bakery, Pastry & Toko Kue", icon: "🍞", description: "Memproduksi aneka roti dan kue untuk etalase langsung maupun pesanan kustom berdasarkan tanggal acara." },
    { id: "frozen_cloud", title: "Frozen Food & Cloud Kitchen", icon: "🍲", description: "Fokus pada produksi makanan olahan beku atau dapur terpusat dengan pengiriman langsung ke konsumen dan agen." },
    { id: "kuliner_lainnya", title: "Jenis Usaha Kuliner Lainnya", icon: "✍️", description: "Food truck, franchise booth minuman, produsen bumbu dapur, atau model bisnis kuliner lainnya." },
  ],
  properti_aset: [
    { id: "residensial_cluster", title: "Developer Perumahan & Cluster", icon: "🏡", description: "Pengembangan kawasan hunian dengan penjualan unit tapak, tahapan akad/KPR, dan serah terima konsumen." },
    { id: "villa_resort", title: "Villa, Resort & Penginapan Liburan", icon: "🏖️", description: "Penyewaan akomodasi liburan harian dengan pengelolaan jadwal check-in, deposit tamu, dan kesiapan kamar." },
    { id: "kos_coliving", title: "Kos Eksklusif & Co-Living", icon: "🏢", description: "Penyewaan hunian kamar jangka bulanan atau tahunan dengan pengelolaan jatuh tempo sewa dan data penghuni." },
    { id: "broker_tanah", title: "Kantor Agen Properti & Broker Tanah", icon: "🤝", description: "Layanan mediasi transaksi jual-beli dan sewa properti sekunder, tanah kavling, serta konsultasi legalitas." },
    { id: "properti_lainnya", title: "Bisnis Properti & Hunian Lainnya", icon: "✍️", description: "Guest house harian, kostel, asrama, perhotelan butik, atau pengelolaan properti lainnya." },
  ],
  travel_wisata: [
    { id: "umroh_haji", title: "Biro Perjalanan Umroh & Haji Khusus", icon: "🕋", description: "Penyelenggara perjalanan ibadah berkala dengan pengelolaan kuota rombongan, dokumen jamaah, dan maskapai." },
    { id: "tour_opentrip", title: "Agen Tour & Open Trip Liburan", icon: "✈️", description: "Penyelenggaraan paket wisata domestik maupun mancanegara dengan jadwal keberangkatan terpadu." },
    { id: "rental_transport", title: "Sewa Bus Wisata & Shuttle Travel", icon: "🚐", description: "Penyediaan armada pariwisata, layanan carter rombongan, dan transportasi penumpang antar-kota." },
    { id: "travel_lainnya", title: "Wisata & Transportasi Lainnya", icon: "✍️", description: "Wisata edukasi, operator campervan, outbound, kapal wisata phinisi, atau tur liburan lainnya." },
  ],
  edukasi_bimbel: [
    { id: "bimbel_sekolah", title: "Bimbingan Belajar SD, SMP & SMA", icon: "📚", description: "Pendampingan kurikulum sekolah, persiapan ujian nasional atau seleksi PTN, serta evaluasi belajar siswa." },
    { id: "kursus_skill", title: "Kursus Bahasa & Keahlian Profesional", icon: "🗣️", description: "Pelatihan keterampilan spesifik berbasis sertifikasi dan kelas bertahap untuk umum maupun korporat." },
    { id: "akademi_bakat", title: "Akademi Olahraga, Musik & Seni", icon: "🥋", description: "Pembinaan bakat siswa dengan sesi latihan rutin, instruktur tetap, dan pengelolaan iuran kelas berkala." },
    { id: "lpk_bootcamp", title: "LPK & Pelatihan Vokasi Intensif", icon: "💻", description: "Program pembekalan kompetensi siap kerja dengan kurikulum praktis dan portofolio proyek kelulusan." },
    { id: "edukasi_lainnya", title: "Lembaga Pendidikan & Kursus Lainnya", icon: "✍️", description: "Sekolah alam, bimbingan tahfidz, les privat mengemudi, pelatihan barista, atau kursus lainnya." },
  ],
  jasa_b2b: [
    { id: "kontraktor_sipil", title: "Kontraktor Fisik, Sipil & Interior", icon: "🏗️", description: "Pengerjaan proyek konstruksi atau renovasi bangunan berbasis kontrak kerja, RAB, dan progres lapangan." },
    { id: "ekspor_komoditas", title: "Eksportir & Perdagangan Komoditas", icon: "🚢", description: "Penyaluran komoditas atau produk lokal ke pasar luar negeri dengan dokumen kepabeanan dan jadwal kargo." },
    { id: "vendor_supplier", title: "Vendor Pengadaan & Supplier Material", icon: "📦", description: "Penyediaan bahan baku, alat kerja, atau kebutuhan material industri untuk mitra usaha secara berkala." },
    { id: "konsultan_agensi", title: "Konsultan Bisnis, Legal & Pajak", icon: "💼", description: "Layanan advis profesional dan kepatuhan hukum berbasis penugasan proyek atau kontrak pendampingan rutin." },
    { id: "b2b_lainnya", title: "Jasa B2B & Mitra Usaha Lainnya", icon: "✍️", description: "Jasa kebersihan gedung, katering industri, kalibrasi mesin, keamanan, atau jasa B2B lainnya." },
  ],
  retail_d2c: [
    { id: "brand_fashion", title: "Brand Fashion, Busana & Hijab", icon: "👗", description: "Produksi dan penjualan busana siap pakai dengan pergantian koleksi berkala melalui berbagai saluran ritel." },
    { id: "skincare_kosmetik", title: "Kosmetik & Produk Skincare", icon: "💄", description: "Penjualan produk perawatan tubuh dan kecantikan dengan fokus pada edukasi konsumen dan pembelian ulang." },
    { id: "gadget_elektronik", title: "Gadget, Elektronik & Aksesoris", icon: "📱", description: "Penjualan perangkat elektronik dan perlengkapan hobi dengan jaminan keaslian serta kelengkapan unit." },
    { id: "distributor_retail", title: "Toko Grosir & Distributor Retail", icon: "📦", description: "Distribusi barang kebutuhan konsumen dalam partai besar maupun eceran ke jaringan toko dan reseller." },
    { id: "retail_lainnya", title: "Toko Retail & Produk Fisik Lainnya", icon: "✍️", description: "Toko bahan bangunan/material, apotek/farmasi, toko perhiasan, alat musik, atau produk fisik lainnya." },
  ],
  booking_jasa: [
    { id: "salon_barbershop", title: "Salon Kecantikan & Barbershop", icon: "✂️", description: "Layanan perawatan rambut dan wajah langsung di tempat dengan alur antrean atau reservasi kapster/stylist." },
    { id: "studio_konsultasi", title: "Studio Spa, Massage & Relaksasi", icon: "🧘", description: "Layanan relaksasi tubuh dan kebugaran pribadi di ruang privat dengan alokasi waktu terjadwal per sesi." },
    { id: "studio_kebugaran", title: "Studio Yoga, Pilates & Fitness", icon: "💪", description: "Penyelenggaraan kelas olahraga terpadu atau pendampingan instruktur privat dengan kapasitas peserta terbatas." },
    { id: "booking_lainnya", title: "Jasa Reservasi & Perawatan Lainnya", icon: "✍️", description: "Refleksi, studio nail art & eyelash, spa mandiri, studio tato, atau jasa reservasi lainnya." },
  ],
  klinik_kesehatan: [
    { id: "klinik_gigi", title: "Klinik Dokter Gigi (Dental Care)", icon: "🦷", description: "Pemeriksaan dan tindakan kesehatan gigi dengan penjadwalan dokter serta riwayat perawatan berkala pasien." },
    { id: "klinik_estetika", title: "Klinik Kecantikan & Estetika Medis", icon: "✨", description: "Tindakan perawatan kulit dan estetika medis oleh tenaga ahli dengan konsultasi dan rencana perawatan bertahap." },
    { id: "klinik_hewan", title: "Klinik Hewan & Grooming (Pet Care)", icon: "🐾", description: "Pemeriksaan kesehatan hewan peliharaan, vaksinasi, tindakan medis rawat jalan, serta perawatan kebersihan satwa." },
    { id: "klinik_umum_pratama", title: "Klinik Pratama & Praktik Bersama", icon: "🩺", description: "Pelayanan rawat jalan umum dan dokter spesialis bersama untuk kebutuhan penanganan kesehatan dasar." },
    { id: "fisioterapi_rehab", title: "Fisioterapi & Terapi Tumbuh Kembang", icon: "🩹", description: "Pelayanan pemulihan fungsi fisik tubuh dan stimulasi tumbuh kembang anak berbasis paket sesi berkelanjutan." },
    { id: "klinik_lainnya", title: "Fasilitas Layanan Medis Lainnya", icon: "✍️", description: "Laboratorium klinik, apotek mandiri, klinik mata, fisioterapi, atau fasilitas medis lainnya." },
  ],
  event_organizer: [
    { id: "wedding_organizer", title: "Wedding Organizer & Wedding Planner", icon: "💍", description: "Perencanaan dan pendampingan rangkaian pernikahan menyeluruh, koordinasi multi-vendor, serta eksekusi hari H." },
    { id: "eo_korporat", title: "EO Korporat, Gathering & Pameran (MICE)", icon: "🏢", description: "Penyelenggaraan pertemuan bisnis, pameran dagang, seminar korporasi, serta kegiatan outing instansi." },
    { id: "promotor_konser", title: "Promotor Pertunjukan Musik & Festival", icon: "🎸", description: "Penyelenggaraan acara hiburan publik skala massal, manajemen panggung, pengisi acara, dan alur penonton." },
    { id: "event_lainnya", title: "Penyelenggara Acara & Event Lainnya", icon: "✍️", description: "Penyelenggara wisuda sekolah, turnamen e-sports, pameran seni, gathering, atau event lainnya." },
  ],
  agensi_kreatif: [
    { id: "digital_marketing_agency", title: "Agensi Digital Marketing & Iklan", icon: "📈", description: "Pengelolaan kampanye pemasaran digital, pembuatan konten kreatif, dan strategi periklanan media sosial klien." },
    { id: "software_house", title: "Software House & Studio Rekayasa IT", icon: "💻", description: "Pengembangan website kustom, aplikasi mobile, dan solusi perangkat lunak berbasis ruang lingkup proyek." },
    { id: "production_house", title: "Production House & Studio Foto / Video", icon: "🎬", description: "Produksi video komersial, dokumentasi visual, dan sesi pemotretan profesional dari pra hingga pascaproduksi." },
    { id: "agensi_lainnya", title: "Agensi & Studio Kreatif Lainnya", icon: "✍️", description: "Studio 3D animasi, agensi arsitek interior, biro penerjemah tersumpah, atau agensi kreatif lainnya." },
  ],
  jasa_cuci_laundry: [
    { id: "laundry_kiloan_satuan", title: "Laundry Kiloan, Satuan & Dry Clean", icon: "🧺", description: "Layanan cuci, pengeringan, dan setrika pakaian dengan sistem timbang per kilo maupun penanganan satuan." },
    { id: "carwash_detailing", title: "Cuci Kendaraan & Auto Detailing", icon: "🚗", description: "Perawatan kebersihan bodi mobil/motor, pembersihan interior menyeluruh, serta aplikasi pelindung cat." },
    { id: "home_cleaning_ac", title: "Jasa Bersih Rumah & Servis AC", icon: "🧹", description: "Layanan pembersihan tempat tinggal dan perawatan peralatan pendingin ruangan melalui kunjungan langsung ke lokasi." },
    { id: "laundry_lainnya", title: "Jasa Lainnya", icon: "✍️", description: "Cuci sepatu & tas branded, cuci karpet masjid, cuci helm, atau jasa lainnya." },
  ],
  rental_aset: [
    { id: "rental_kendaraan", title: "Rental Mobil & Sepeda Motor", icon: "🚗", description: "Penyewaan armada kendaraan harian atau bulanan, baik sistem lepas kunci maupun didampingi pengemudi." },
    { id: "sewa_kamera", title: "Sewa Kamera & Perlengkapan Multimedia", icon: "📷", description: "Penyewaan bodi kamera, lensa, lampu studio, dan alat perekam suara untuk kebutuhan produksi kreator." },
    { id: "sewa_alat_berat", title: "Sewa Alat Berat & Mesin Konstruksi", icon: "🚜", description: "Penyediaan excavator, genset daya besar, dan perlengkapan proyek fisik berbasis jam kerja atau kontrak bulanan." },
    { id: "sewa_tenda_event", title: "Sewa Tenda Pesta, Panggung & Tata Suara", icon: "🎪", description: "Penyediaan tenda pesta (tratag/terop/roder), panggung rigging, kursi, genset, dan sound system hajatan/konser (bukan perlengkapan camping)." },
    { id: "sewa_camping_outdoor", title: "Sewa Alat Camping & Outdoor", icon: "⛺", description: "Penyewaan tenda dome kemah, carrier/keril, sleeping bag, matras, kompor portabel, dan perlengkapan mendaki gunung." },
    { id: "rental_lainnya", title: "Persewaan Aset & Alat Lainnya", icon: "✍️", description: "Sewa gaun/jas pesta, rental drone video, sewa alat medis, atau persewaan aset lainnya." },
  ],
  operasional_lapangan: [
    { id: "bengkel_karoseri", title: "Bengkel Otomotif, Servis & Karoseri", icon: "🔧", description: "Perbaikan mekanikal kendaraan, penggantian suku cadang harian, serta pengerjaan bodi dan modifikasi fisik." },
    { id: "agribisnis_ternak", title: "Perkebunan, Pertanian & Peternakan", icon: "🌾", description: "Pengelolaan budidaya tanaman dan pemeliharaan hewan ternak dengan pemantauan siklus panen serta distribusi lapangan." },
    { id: "pabrikasi_gudang", title: "Pabrik Pengolahan & Pergudangan Logistik", icon: "🚚", description: "Aktivitas pengolahan bahan baku, penyimpanan stok barang skala besar, dan pengelolaan arus bongkar muat." },
    { id: "lapangan_lainnya", title: "Operasional Lapangan & Industri Lainnya", icon: "✍️", description: "Pengolahan limbah industri, tambak perikanan modern, cold storage, atau operasional lapangan lainnya." },
  ],
  lainnya: [],
};

export const CONDITIONAL_QUESTIONS_MAP: Record<BusinessType, ConditionalQuestion[]> = {
  kuliner_fnb: [
    {
      id: "fnb_kanal",
      question: "Bagaimana cara sebagian besar pesanan masuk saat ini?",
      options: [
        { value: "aplikasi_ojol", label: "Didominasi Aplikasi Pesan Antar Online (Terpotong komisi 20%–30%)" },
        { value: "chat_whatsapp", label: "Admin Menjawab Chat WhatsApp Manual Satu Per Satu" },
        { value: "datang_langsung", label: "Pelanggan Datang & Mengantre Langsung di Kasir" },
      ],
    },
  ],
  properti_aset: [
    {
      id: "prop_transaksi",
      question: "Apa proses interaksi pelanggan yang paling krusial untuk ditingkatkan?",
      options: [
        { value: "siteplan_kpr", label: "Presentasi Siteplan Unit, Tipe Rumah & Simulasi KPR" },
        { value: "cek_ketersediaan", label: "Kalender Cek Ketersediaan Kamar / Villa Real-Time" },
        { value: "booking_survei", label: "Penjadwalan Kunjungan Survei Lokasi & Kunci Booking Fee" },
      ],
    },
  ],
  travel_wisata: [
    {
      id: "travel_kuota",
      question: "Bagaimana cara Anda mengelola kuota kursi dan pendaftaran peserta saat ini?",
      options: [
        { value: "rekap_wa_sheets", label: "Masih Rekap Chat WhatsApp & Catat di Spreadsheet Manual" },
        { value: "form_manual", label: "Pengumpulan Dokumen KTP/Paspor Sering Tercecer" },
        { value: "sistem_ada_tapi_kaku", label: "Sudah Ada Website tapi Tidak Ada Manajemen Kuota Live" },
      ],
    },
  ],
  edukasi_bimbel: [
    {
      id: "edu_operasional",
      question: "Di mana proses administrasi yang paling menyita waktu staf saat ini?",
      options: [
        { value: "pendaftaran_siswa", label: "Pendaftaran Siswa Baru (PSB) Masih Pakai Kertas / Form Chat" },
        { value: "tagihan_spp", label: "Pemantauan Tagihan SPP Bulanan & Kirim Pengingat Manual" },
        { value: "jadwal_kelas", label: "Penjadwalan Batch Kelas & Pembagian Jam Mengajar Tutor" },
      ],
    },
  ],
  jasa_b2b: [
    {
      id: "b2b_klien_target",
      question: "Siapa profil pengambil keputusan / klien utama yang Anda layani?",
      options: [
        { value: "korporat_swasta", label: "Perusahaan Swasta Skala Menengah – Besar" },
        { value: "bumn_pemerintah", label: "Lembaga Pemerintahan / BUMN (Lelang & Dokumen Resmi)" },
        { value: "buyer_internasional", label: "Buyer Luar Negeri / Mitra Bisnis Global" },
        { value: "umkm_owner", label: "Pelaku Usaha Langsung / UMKM Berkembang" },
      ],
    },
  ],
  retail_d2c: [
    {
      id: "retail_katalog",
      question: "Berapa banyak varian item produk (SKU) aktif yang Anda jual?",
      options: [
        { value: "fokus", label: "Sedikit (1 – 5 Produk Hero / Unggulan yang diiklankan intensif)" },
        { value: "sedang", label: "Sedang (10 – 50 varian produk)" },
        { value: "banyak", label: "Banyak (> 50 item dengan varian ukuran, warna, atau model)" },
      ],
    },
    {
      id: "retail_pasokan",
      question: "Bagaimana model rantai pasok atau produksi barang Anda?",
      options: [
        { value: "brand_sendiri", label: "Brand / Produsen Sendiri (Produksi mandiri)" },
        { value: "reseller_distributor", label: "Distributor / Agen Resmi Multi-Brand" },
        { value: "custom_preorder", label: "Produksi Sesuai Pesanan (Made-to-Order / Kerajinan)" },
      ],
    },
  ],
  booking_jasa: [
    {
      id: "booking_kapasitas",
      question: "Berapa perkiraan kapasitas atau volume pasien/klien per hari?",
      options: [
        { value: "kapasitas_terbatas", label: "Kapasitas Eksklusif (< 10 sesi per hari)" },
        { value: "kapasitas_sedang", label: "Kapasitas Sedang (10 – 30 sesi per hari)" },
        { value: "kapasitas_tinggi", label: "Volume Tinggi (> 30 sesi per hari dengan banyak staf/ruangan)" },
      ],
    },
  ],
  rental_aset: [
    {
      id: "rental_pengamanan",
      question: "Bagaimana proses verifikasi penyewa dan pemantauan unit saat ini?",
      options: [
        { value: "cek_ktp_manual", label: "Verifikasi Manual KTP/SIM di WhatsApp (Rawan Pemalsuan/Penggelapan)" },
        { value: "catat_jadwal_sheets", label: "Kalender Tanggal Keluar-Masuk Armada Masih di Spreadsheet / Buku" },
        { value: "klaim_lecet_manual", label: "Ceklist Kondisi Fisik Unit (Bensin & Lecet) Masih Pakai Kertas Manual" },
      ],
    },
  ],
  operasional_lapangan: [
    {
      id: "ops_sebaran",
      question: "Bagaimana sebaran titik lokasi kerja atau gudang operasional Anda?",
      options: [
        { value: "satu_terpusat", label: "1 Lokasi Operasional Terpusat (Bengkel / Pabrik / Gudang Tunggal)" },
        { value: "multi_lokasi", label: "Multi-Titik Tersebar dalam Satu Wilayah / Kota" },
        { value: "lintas_daerah", label: "Titik Lapangan / Kebun / Proyek Tersebar Lintas Kota" },
      ],
    },
    {
      id: "ops_tim",
      question: "Berapa banyak personel yang aktif bertugas di lapangan atau gudang?",
      options: [
        { value: "tim_kecil", label: "Tim Ringkas (< 10 staf/mandor di lapangan)" },
        { value: "tim_menengah", label: "Tim Menengah (10 – 30 personel operasional)" },
        { value: "tim_besar", label: "Tim Besar (> 30 personel dengan supervisi berjenjang)" },
      ],
    },
  ],
  klinik_kesehatan: [
    {
      id: "klinik_antrean",
      question: "Bagaimana alur antrean dan rekam medis pasien saat ini?",
      options: [
        { value: "antrean_manual_rame", label: "Pasien Mengantre Lama & Kapasitas Ruang Tunggu Padat" },
        { value: "rekam_medis_kertas", label: "Rekam Medis & Riwayat Pasien Masih Ditulis di Buku / Map Kertas" },
        { value: "sering_noshow", label: "Banyak Pasien Janji Temu yang Batal / No-Show Sepihak Tanpa Kabar" },
      ],
    },
  ],
  event_organizer: [
    {
      id: "eo_alur_acara",
      question: "Apa tantangan terbesar dalam mengawal kelancaran acara klien?",
      options: [
        { value: "vendor_meleset", label: "Koordinasi Vendor Pihak Ketiga (Katering/Dekorasi) Sering Meleset" },
        { value: "rundown_bentrok", label: "Rundown Hari H Tidak Terkontrol & Jam Acara Sering Molor" },
        { value: "buku_tamu_manual", label: "Registrasi Tamu / Buku Tamu Masih Tulis Tangan dan Antre Panjang" },
      ],
    },
  ],
  agensi_kreatif: [
    {
      id: "agensi_operasional",
      question: "Di mana kebocoran waktu atau profit tim agensi paling sering terjadi?",
      options: [
        { value: "revisi_tanpa_batas", label: "Revisi Klien Tanpa Batas (Scope Creep) yang Menguras Waktu Tim" },
        { value: "invoice_telat", label: "Penagihan Retainer Bulanan Sering Telat Dibayar Klien" },
        { value: "beban_kerja_berantakan", label: "Distribusi Tugas & Beban Kerja Tim Masih Terkoordinasi via Chat WhatsApp" },
      ],
    },
  ],
  jasa_cuci_laundry: [
    {
      id: "laundry_operasional",
      question: "Apa kendala pencatatan dan operasional yang paling sering muncul?",
      options: [
        { value: "baju_hilang_tertukar", label: "Pakaian Pelanggan Tertukar atau Nota Kiloan Kertas Hilang" },
        { value: "cucian_numpuk_lama", label: "Pelanggan Terlambat Mengambil Cucian Bersih Sehingga Rak Penyimpanan Penuh" },
        { value: "kasir_shift_bocor", label: "Selisih Uang Kasir Saat Pergantian Shift & Komisi Staf Setrika Manual" },
      ],
    },
  ],
  lainnya: [
    {
      id: "lainnya_karakteristik",
      question: "Bagaimana model interaksi operasional utama dalam bisnis Anda?",
      options: [
        { value: "pesanan_proyek", label: "Berbasis penawaran proyek / kustomisasi spesifikasi unik" },
        { value: "produk_rutin", label: "Penjualan produk atau komoditas rutin harian" },
        { value: "jasa_keahlian", label: "Penyediaan jasa keahlian khusus atau konsultasi berkala" },
      ],
    },
  ],
};

export const BUSINESS_SPECIFIC_PAINS: Record<BusinessType, OptionItem<BusinessPain>[]> = {
  kuliner_fnb: [
    {
      value: "komisi_ojol_tinggi",
      icon: "💸",
      title: "Margin Keuntungan Tertekan Komisi Platform Pesan-Antar (20%–30%)",
      description: "Margin laba bersih menipis akibat tingginya beban potongan komisi platform pesan antar makanan pihak ketiga.",
    },
    {
      value: "admin_manual",
      icon: "⌨️",
      title: "Admin Kewalahan Rekap Pesanan Katering / Delivery",
      description: "Chat pesanan nasi kotak, kue, atau katering bertumpuk di WhatsApp dan rawan salah jadwal/menu.",
    },
    {
      value: "kas_stok_bocor",
      icon: "🚨",
      title: "Bahan Baku Rusak & Selisih Kasir Tutup Buku",
      description: "Stok bahan baku dapur bocor/kadaluarsa dan uang kasir toko sering selisih saat tutup shift.",
    },
    {
      value: "sulit_pantau",
      icon: "🧭",
      title: "Pembaruan Menu & Harga Buku Fisik Kerap Terkendala",
      description: "Biaya cetak ulang buku menu tinggi setiap kali terdapat penyesuaian harga atau peluncuran menu baru.",
    },
    {
      value: "data_tersebar",
      icon: "👥",
      title: "Database Pelanggan Dikuasai Platform Eksternal (Retensi Rendah)",
      description: "Bisnis tidak memiliki akses langsung ke kontak pelanggan setia untuk program retensi atau peluncuran menu baru.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Bisnis Kuliner Lainnya",
      description: "Tuliskan kendala operasional spesifik yang sedang dihadapi kafe, resto, atau katering Anda.",
    },
  ],
  properti_aset: [
    {
      value: "siteplan_kpr_manual",
      icon: "🏡",
      title: "Calon Pembeli Ragu (Belum Ada Siteplan / Hitung KPR)",
      description: "Calon pembeli rumah/kavling butuh gambaran denah kavling real-time dan simulasi angsuran KPR instan.",
    },
    {
      value: "admin_manual",
      icon: "⌨️",
      title: "Pengiriman Foto & Spesifikasi Unit Berulang Menyita Waktu Staf",
      description: "Menjelaskan detail fasilitas, foto kamar/villa, harga, dan syarat sewa satu per satu di chat WA.",
    },
    {
      value: "jadwal_bentrok",
      icon: "⏰",
      title: "Jadwal Survei Lokasi Bentrok / Calon Pembeli Batal",
      description: "Janji temu survei unit rumah/villa sering bentrok atau calon penyewa/pembeli tidak hadir tanpa kabar.",
    },
    {
      value: "data_tersebar",
      icon: "🏷️",
      title: "Status Unit Kamar/Rumah Sering Salah Info",
      description: "Calon penyewa/pembeli kecewa karena info unit kosong ternyata sudah terisi atau dibooking orang lain.",
    },
    {
      value: "sulit_followup",
      icon: "💬",
      title: "Follow-Up Prospek Minat Properti Tercecer",
      description: "Banyak calon pembeli bertanya harga tapi tidak ter-follow-up dengan rapi oleh tim sales/agen.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Pengelolaan Properti Lainnya",
      description: "Tuliskan masalah operasional spesifik dalam penjualan atau penyewaan properti Anda.",
    },
  ],
  travel_wisata: [
    {
      value: "kuota_seat_berantakan",
      icon: "🕋",
      title: "Sisa Kuota Kursi / Seat Tidak Terpantau Real-Time",
      description: "Admin dan agen bingung memastikan sisa seat kosong per tanggal keberangkatan umroh atau liburan.",
    },
    {
      value: "admin_manual",
      icon: "⌨️",
      title: "Kewalahan Rekap Data Paspor & Dokumen Jamaah",
      description: "Foto KTP, paspor, dan buku vaksin jamaah berserakan di obrolan chat WhatsApp staf.",
    },
    {
      value: "data_tersebar",
      icon: "📂",
      title: "Jatuh Tempo Cicilan / Pelunasan Sulit Dilacak",
      description: "Mengingatkan batas waktu pelunasan biaya travel/umroh masih dilakukan secara manual satu per satu.",
    },
    {
      value: "sulit_followup",
      icon: "💬",
      title: "Calon Jamaah Tanya Paket Tapi Hilang Tanpa Kabar",
      description: "Banyak chat prospek meminta brosur paket umroh/tour tetapi tidak pernah dikawal sampai closing.",
    },
    {
      value: "iklan_boncos",
      icon: "📉",
      title: "Brosur PDF di WhatsApp Kurang Menarik & Lambat Dibuka",
      description: "Format PDF statis kurang praktis ditinjau di ponsel, membutuhkan halaman web itinerary interaktif yang cepat diakses.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Biro Perjalanan Lainnya",
      description: "Tuliskan kendala operasional yang Anda hadapi dalam mengelola paket trip atau ibadah umroh.",
    },
  ],
  edukasi_bimbel: [
    {
      value: "tagihan_spp_macet",
      icon: "💸",
      title: "Pemantauan Tagihan SPP & Biaya Kursus Masih Manual",
      description: "Pencatatan pembayaran kursus masuk dan pengingat tagihan ke wali murid masih dilakukan secara manual satu per satu.",
    },
    {
      value: "admin_manual",
      icon: "⌨️",
      title: "Pendaftaran Siswa Baru (PSB) Masih Terfragmentasi",
      description: "Formulir pendaftaran masih menggunakan kertas fisik atau Google Forms yang harus disalin ulang ke lembar kerja.",
    },
    {
      value: "jadwal_bentrok",
      icon: "⏰",
      title: "Jadwal Kelas, Ruangan & Tutor Sering Bentrok",
      description: "Penjadwalan batch kelas baru sering tumpang tindih dengan jam mengajar tentor atau ruangan penuh.",
    },
    {
      value: "data_tersebar",
      icon: "📂",
      title: "Data Riwayat Murid & Kontak Ortu Tersebar",
      description: "Biodata siswa, nilai, dan nomor WA wali murid berserakan di buku absen dan file terpisah.",
    },
    {
      value: "sulit_followup",
      icon: "💬",
      title: "Calon Siswa Tanya Program Tapi Batal Mendaftar",
      description: "Orang tua yang bertanya kurikulum dan biaya les tidak terdata untuk di-follow up menjelang tahun ajaran baru.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Lembaga Edukasi Lainnya",
      description: "Tuliskan kendala operasional di tempat kursus atau bimbingan belajar Anda.",
    },
  ],
  jasa_b2b: [
    {
      value: "gagal_tender",
      icon: "📑",
      title: "Klien Ragu & Kalah Tender B2B",
      description: "Klien korporat butuh bukti legalitas resmi, portofolio terverifikasi, dan company profile resmi.",
    },
    {
      value: "klien_minta_laporan",
      icon: "📊",
      title: "Klien Menuntut Laporan Transparan",
      description: "Pembaruan progres proyek terus ditanyakan via WhatsApp dan penyusunan laporan berkala secara manual memakan waktu.",
    },
    {
      value: "sulit_followup",
      icon: "💬",
      title: "Pipeline Penawaran (RFQ) Hilang Tanpa Follow-Up",
      description: "Permintaan harga masuk tercecer dan tim sales tidak memiliki tracking status prospek yang jelas.",
    },
    {
      value: "admin_manual",
      icon: "⌨️",
      title: "Admin Terlalu Banyak Menyusun Penawaran Manual",
      description: "Waktu kerja habis menyalin format dokumen Word/PDF penawaran harga berulang-ulang.",
    },
    {
      value: "data_tersebar",
      icon: "📂",
      title: "Data Klien & Riwayat Invoice Tersebar",
      description: "Dokumen kontrak, faktur, dan kontak PIC korporat berserakan di berbagai folder dan HP staf.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Operasional B2B Lainnya",
      description: "Tuliskan kendala spesifik Anda dalam mengelola penawaran atau proyek klien.",
    },
  ],
  retail_d2c: [
    {
      value: "marketplace_margin",
      icon: "💸",
      title: "Margin Keuntungan Tertekan Komisi Marketplace",
      description: "Potongan biaya platform 6%–10% memangkas laba bersih, butuh kanal toko online mandiri.",
    },
    {
      value: "iklan_boncos",
      icon: "📉",
      title: "Biaya Iklan Berbayar Kurang Efektif / Konversi Rendah",
      description: "Trafik iklan diarahkan ke chat WhatsApp yang lambat direspons sehingga calon pembeli beralih ke toko lain.",
    },
    {
      value: "admin_manual",
      icon: "⌨️",
      title: "Admin Kewalahan Rekap Order & Cek Mutasi Bank",
      description: "Staf habis waktu memeriksa mutasi bank manual dan mengecek ongkir satu per satu.",
    },
    {
      value: "data_tersebar",
      icon: "👥",
      title: "Database Pelanggan Milik Marketplace (Bukan Aset)",
      description: "Tidak memiliki kontak nomor WA pembeli untuk repeat order dan broadcast promo mandiri.",
    },
    {
      value: "sulit_followup",
      icon: "💬",
      title: "Calon Pembeli Pasif Setelah Mengetahui Harga",
      description: "Banyak chat prospek yang bertanya ketersediaan produk tetapi tidak pernah ter-follow-up.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Penjualan Retail Lainnya",
      description: "Tuliskan masalah operasional atau penjualan yang sedang dihadapi toko Anda.",
    },
  ],
  booking_jasa: [
    {
      value: "jadwal_bentrok",
      icon: "⏰",
      title: "Jadwal Pasien/Klien Bentrok & Sering No-Show",
      description: "Booking manual di chat WA membuat kalender dokter/terapis bertabrakan dan klien sering lupa datang.",
    },
    {
      value: "admin_manual",
      icon: "⌨️",
      title: "Pencocokan Jadwal Luang Staf Memakan Waktu Admin",
      description: "Pengecekan jadwal terapis/dokter dan konfirmasi ketersediaan tanggal ke pasien masih manual via chat.",
    },
    {
      value: "sulit_followup",
      icon: "💬",
      title: "Tidak Ada Pengingat Otomatis (Reminder Janji Temu)",
      description: "Staf harus manual mengirim chat pengingat satu per satu sebelum sesi jadwal tiba.",
    },
    {
      value: "kas_stok_bocor",
      icon: "💸",
      title: "Uang Muka (DP) Tercecer & Pembatalan Rugikan Slot Waktu",
      description: "Slot jam terbuang sia-sia karena tidak ada sistem pembayaran DP otomatis untuk mengunci reservasi.",
    },
    {
      value: "data_tersebar",
      icon: "📂",
      title: "Rekam Riwayat Perawatan Pasien/Klien Tersebar",
      description: "Catatan riwayat keluhan, perawatan medis, atau preferensi klien berserakan di chat HP staf.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Alur Janji Temu Lainnya",
      description: "Tuliskan kendala spesifik yang Anda hadapi pada alur booking atau reservasi janji temu.",
    },
  ],
  rental_aset: [
    {
      value: "unit_rusak_telat_kembali",
      icon: "⏰",
      title: "Penyewa Telat Mengembalikan Unit & Denda Overtime Bocor",
      description: "Unit terlambat kembali tanpa denda terhitung otomatis, mengacaukan jadwal sewa penyewa berikutnya.",
    },
    {
      value: "verifikasi_ktp_rawan",
      icon: "🚨",
      title: "Verifikasi Identitas Rawan Penggelapan & Berkas Tercecer",
      description: "Foto KTP, SIM, deposit jaminan, dan bukti alamat penyewa berserakan di chat WA staf tanpa arsip aman.",
    },
    {
      value: "jadwal_bentrok",
      icon: "🚗",
      title: "Status Kesiapan Unit Sulit Dipantau (Disewa, Siap, atau Servis)",
      description: "Admin kesulitan memastikan unit mana yang sedang jalan sewa, siap di garasi, atau sedang diservis.",
    },
    {
      value: "admin_manual",
      icon: "⌨️",
      title: "Penerbitan Kontrak Sewa & Formulir Ceklis Fisik Masih Manual",
      description: "Penyusunan surat perjanjian sewa, ceklist kondisi fisik unit, dan nota tagihan masih dikerjakan satu per satu.",
    },
    {
      value: "kas_stok_bocor",
      icon: "💸",
      title: "Uang DP & Deposit Jaminan Rusak/Hilang Tercecer",
      description: "Catatan pengembalian deposit jaminan penyewa sering selisih dan DP sewa tidak terkunci otomatis.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Bisnis Rental Lainnya",
      description: "Tuliskan masalah spesifik dalam pengelolaan armada sewa atau peralatan Anda.",
    },
  ],
  operasional_lapangan: [
    {
      value: "kas_stok_bocor",
      icon: "🚨",
      title: "Uang Kas Bocor & Selisih Stok Fisik",
      description: "Nota belanja lapangan tercecer, uang kas kecil rawan selisih, dan stok gudang tidak akurat.",
    },
    {
      value: "sulit_pantau",
      icon: "🧭",
      title: "Laba Bersih & HPP Sulit Dipantau Tanpa Rekap Akhir Bulan",
      description: "Pemilik usaha kesulitan memantau laba bersih terkini tanpa menunggu rekap pembukuan di akhir bulan.",
    },
    {
      value: "admin_manual",
      icon: "⌨️",
      title: "Rekap Manual Bon & Kuitansi Kertas Berulang",
      description: "Staf menghabiskan berjam-jam memindahkan angka dari nota kuitansi fisik ke Excel.",
    },
    {
      value: "data_tersebar",
      icon: "📂",
      title: "Laporan Lapangan Tersebar di Grup WhatsApp",
      description: "Foto struk, absensi, dan laporan harian tenggelam dalam percakapan grup chat.",
    },
    {
      value: "klien_minta_laporan",
      icon: "📊",
      title: "Laporan Pekerjaan Lapangan Lambat Direkap",
      description: "Progres pekerjaan di lokasi atau lahan lambat dikompilasi untuk diserahkan ke manajemen/mitra.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Operasional Lapangan Lainnya",
      description: "Tuliskan kendala spesifik yang terjadi di area lapangan, pabrik, atau gudang Anda.",
    },
  ],
  klinik_kesehatan: [
    {
      value: "antrean_klinik_numpuk",
      icon: "🏥",
      title: "Antrean Pasien Menumpuk & Kapasitas Ruang Tunggu Padat",
      description: "Pasien mengantre lama tanpa nomor antrean digital, memicu keluhan ketidaknyamanan layanan.",
    },
    {
      value: "rekam_medis_tercecer",
      icon: "📑",
      title: "Rekam Medis & Riwayat Pasien Berserakan di Berkas Fisik",
      description: "Pencarian status riwayat odontogram, keluhan terdahulu, atau rekam medis fisik memakan waktu staf.",
    },
    {
      value: "jadwal_bentrok",
      icon: "⏰",
      title: "Jadwal Dokter Spesialis Bentrok & Pasien No-Show Sepihak",
      description: "Jadwal konsultasi bertabrakan dan pasien membatalkan janji temu tanpa ada DP pengunci.",
    },
    {
      value: "kas_stok_bocor",
      icon: "💊",
      title: "Stok Obat Apotek / BMHP Rawan Selisih & Kedaluwarsa",
      description: "Bahan medis habis pakai dan obat klinik tidak terdata otomatis saat resep keluar dari kasir.",
    },
    {
      value: "admin_manual",
      icon: "⌨️",
      title: "Perhitungan Jasa Medis Dokter Masih Dilakukan Manual",
      description: "Kalkulasi fee dokter, perawat, dan beautician masih dihitung manual menggunakan kalkulator/kertas.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Fasilitas Kesehatan Lainnya",
      description: "Tuliskan masalah spesifik dalam operasional klinik atau layanan medis Anda.",
    },
  ],
  event_organizer: [
    {
      value: "vendor_event_meleset",
      icon: "🚨",
      title: "Koordinasi Vendor Pihak Ketiga Sering Meleset & Telat",
      description: "Vendor dekorasi, katering, atau sound system terlambat loading barang di venue tanpa pantauan terpusat.",
    },
    {
      value: "rundown_bentrok_venue",
      icon: "⏱️",
      title: "Rundown Acara Hari H Molor & Koordinasi Lapangan Kurang Sinkron",
      description: "Jadwal menit-ke-menit tidak sinkron antar tim panggung, sound, katering, dan master of ceremony (MC).",
    },
    {
      value: "admin_manual",
      icon: "📝",
      title: "Registrasi Tamu Masih Manual & Buku Tamu Fisik Antre Panjang",
      description: "Tamu undangan menumpuk di meja resepsionis karena pencatatan kehadiran masih manual di buku kertas.",
    },
    {
      value: "kas_stok_bocor",
      icon: "💸",
      title: "Alur Termin Pembayaran DP Klien & Pelunasan Vendor Tercecer",
      description: "Jadwal penagihan termin ke klien dan tanggal bayar ke puluhan vendor pihak ketiga sering terlewat.",
    },
    {
      value: "sulit_followup",
      icon: "💬",
      title: "Calon Klien Tanya Paket Acara Tapi Hilang Tanpa Kabar",
      description: "Banyak calon pengantin atau panitia acara yang meminta penawaran harga namun tidak berlanjut ke tahap konfirmasi.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Manajemen Event Lainnya",
      description: "Tuliskan masalah spesifik dalam mengawal kelancaran acara klien Anda.",
    },
  ],
  agensi_kreatif: [
    {
      value: "scope_creep_revisi",
      icon: "🔄",
      title: "Revisi Klien Tanpa Batas (Scope Creep) Menguras Waktu Tim",
      description: "Klien meminta perubahan di luar kesepakatan awal tanpa batasan kuota revisi, menguras jam kerja tim.",
    },
    {
      value: "invoice_retainer_macet",
      icon: "💸",
      title: "Tagihan Retainer Bulanan & Pelunasan Termin Klien Sering Macet",
      description: "Staf canggung menagih manual di WhatsApp, pembayaran retainer bulanan molor berminggu-minggu.",
    },
    {
      value: "admin_manual",
      icon: "💻",
      title: "Beban Kerja Tim Berantakan & File Aset Tersebar di Drive/WA",
      description: "Task proyek bertumpuk di chat WhatsApp staf, file desain/video tercecer tanpa arsip terstruktur.",
    },
    {
      value: "klien_minta_laporan",
      icon: "📊",
      title: "Klien Kerap Menanyakan Laporan Performa Iklan/Konten via WhatsApp",
      description: "Staf menghabiskan waktu berjam-jam membuat laporan slide PDF manual yang jarang dibaca tuntas.",
    },
    {
      value: "iklan_boncos",
      icon: "📉",
      title: "Laporan Ad Spend & Konversi Iklan Klien Belum Terintegrasi",
      description: "Kesulitan menyajikan transparansi biaya iklan dan hasil konversi lead secara real-time ke klien.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Agensi / Studio Lainnya",
      description: "Tuliskan tantangan spesifik dalam mengelola proyek atau retainer klien Anda.",
    },
  ],
  jasa_cuci_laundry: [
    {
      value: "baju_hilang_tertukar",
      icon: "🧺",
      title: "Pakaian Pelanggan Tertukar, Tertinggal, atau Rusak/Luntur",
      description: "Ketiadaan label barcode rak penyimpanan membuat pakaian pelanggan rawan tertukar saat proses setrika.",
    },
    {
      value: "cucian_menumpuk_lama",
      icon: "⏰",
      title: "Pelanggan Lupa Ambil Cucian Bersih Berhari-hari / Berminggu-minggu",
      description: "Rak laundry penuh sesak oleh cucian yang sudah selesai tapi tidak kunjung diambil pelanggan.",
    },
    {
      value: "kas_stok_bocor",
      icon: "💸",
      title: "Uang Kas Kasir Selisih Saat Tutup Shift & Boros Detergen",
      description: "Uang kas harian selisih saat pergantian kasir dan pemakaian sabun/parfum tidak terkontrol takarannya.",
    },
    {
      value: "admin_manual",
      icon: "🧾",
      title: "Nota Kertas Kiloan Hilang & Perhitungan Komisi Masih Manual",
      description: "Struk fisik mudah hilang dan perhitungan upah borongan staf setrika masih dihitung secara manual.",
    },
    {
      value: "sulit_followup",
      icon: "💬",
      title: "Pelanggan Jarang Repeat Order Karena Tidak Ada Notifikasi Otomatis",
      description: "Tidak ada sistem broadcast promo berkala atau reminder otomatis saat cucian siap diambil.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Jasa Cuci / Laundry Lainnya",
      description: "Tuliskan kendala operasional yang Anda hadapi dalam mengelola laundry atau cuci kendaraan.",
    },
  ],
  lainnya: [
    {
      value: "admin_manual",
      icon: "⌨️",
      title: "Admin Terlalu Banyak Pekerjaan Manual",
      description: "Waktu kerja habis untuk menyalin data, membalas chat berulang, dan rekap manual.",
    },
    {
      value: "data_tersebar",
      icon: "📂",
      title: "Data Bisnis Tersebar di Banyak Aplikasi",
      description: "Catatan transaksi, data pelanggan, dan invoice terpisah-pisah tanpa ada pusat kendali.",
    },
    {
      value: "sulit_pantau",
      icon: "🧭",
      title: "Sulit Memantau Performa Bisnis Real-Time",
      description: "Owner tidak memiliki dashboard ringkas untuk melihat kesehatan penjualan dan kas harian.",
    },
    {
      value: "sulit_followup",
      icon: "💬",
      title: "Peluang Penjualan Hilang Akibat Follow-Up Lambat",
      description: "Calon prospek yang pernah bertanya tidak terdata rapi sehingga transaksi gagal terwujud.",
    },
    {
      value: "iklan_boncos",
      icon: "📉",
      title: "Pemasaran Digital Kurang Menghasilkan Konversi",
      description: "Biaya promosi keluar banyak namun hasil transaksi tidak sebanding.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Masalah Operasional Lainnya",
      description: "Tuliskan kendala spesifik yang sedang Anda hadapi di luar opsi di atas.",
    },
  ],
};

// Pemetaan Kendala Operasional Spesifik per Sub-Sektor Bisnis (High-Fidelity Granularity)
export const SUBSECTOR_SPECIFIC_PAINS: Record<string, OptionItem<BusinessPain>[]> = {
  // --- KULINER & F&B ---
  kafe_resto: [
    {
      value: "kas_stok_bocor",
      icon: "☕",
      title: "Selisih Kasir Tutup Shift & Waste Biji Kopi / Susu",
      description: "Uang laci kasir selisih saat serah-terima shift dan gramatur kalibrasi biji kopi/susu terbuang tanpa tercatat.",
    },
    {
      value: "admin_manual",
      icon: "🛎️",
      title: "Antrean Kasir Menumpuk & Salah Antar Tiket Meja",
      description: "Pencatatan manual di kertas bon memperlambat pelayanan dan pesanan rawan tertukar saat jam sibuk.",
    },
    {
      value: "komisi_ojol_tinggi",
      icon: "💸",
      title: "Margin Keuntungan Tertekan Komisi Aplikasi Online (20%–30%)",
      description: "Keuntungan bersih minuman dan makanan kafe tipis akibat potongan komisi platform pesan antar online.",
    },
    {
      value: "sulit_pantau",
      icon: "📋",
      title: "Pembaruan Menu Fisik & Harga Memerlukan Biaya Cetak Berkala",
      description: "Biaya cetak ulang buku menu mahal setiap kali ada penyesuaian harga atau peluncuran menu seasonal baru.",
    },
    {
      value: "data_tersebar",
      icon: "👥",
      title: "Tidak Memiliki Database Pelanggan Mandiri untuk Promosi Ulang",
      description: "Tidak memiliki database nomor WA pelanggan setia untuk promosi promo berkala atau program loyalty kafe.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Operasional Kafe / Resto Lainnya",
      description: "Tuliskan kendala spesifik yang sedang dihadapi kafe, coffee shop, atau resto Anda.",
    },
  ],
  katering_event: [
    {
      value: "jadwal_bentrok",
      icon: "📅",
      title: "Jadwal Acara Bentrok & Konfirmasi DP Katering Terlambat",
      description: "Tanggal resepsi/event bertabrakan dan pesanan belum terkunci uang muka resmi sehingga rawan pembatalan.",
    },
    {
      value: "kas_stok_bocor",
      icon: "🥘",
      title: "Estimasi Belanja Bahan Kurang Akurat & Pengeluaran Dapur Membengkak",
      description: "Stok belanjaan dapur berlebih atau kurang karena perhitungan porsi resep event masih dikira-kira manual.",
    },
    {
      value: "admin_manual",
      icon: "⌨️",
      title: "Rekapitulasi Menu & Revisi Pesanan Prasmanan Masih Manual via Chat",
      description: "Pilihan menu, jumlah porsi, jam kirim, dan revisi dari klien bertumpuk di ratusan chat WhatsApp.",
    },
    {
      value: "sulit_followup",
      icon: "💬",
      title: "Calon Pemesan Tidak Merespons Lanjutan Setelah Menerima Daftar Harga",
      description: "Banyak calon pengantin atau panitia kantor yang minta proposal menu tapi tidak pernah ter-follow-up sistematis.",
    },
    {
      value: "data_tersebar",
      icon: "📑",
      title: "Riwayat Pembayaran Termin DP & Pelunasan H-3 Tercecer",
      description: "Staf admin kesulitan melacak klien mana yang sudah melunasi tagihan katering sebelum hari pengiriman.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Bisnis Katering & Event Lainnya",
      description: "Tuliskan kendala spesifik operasional katering atau prasmanan Anda.",
    },
  ],
  bakery_kue: [
    {
      value: "admin_manual",
      icon: "🎂",
      title: "Pre-Order Custom Cake Rawan Salah Dekorasi & Ucapan",
      description: "Catatan lilin, tulisan topper ucapan, dan jam pick-up kue di WA tercecer dan rawan komplain pelanggan.",
    },
    {
      value: "kas_stok_bocor",
      icon: "🍞",
      title: "Sisa Roti Harian Terbuang & Selisih Kasir Toko",
      description: "Roti ready stock tidak terjual maksimal dan uang fisik kasir rawan selisih saat tutup toko malam.",
    },
    {
      value: "sulit_pantau",
      icon: "🧈",
      title: "Stok Bahan Sensitif (Butter/Tepung/Cokelat) Cepat Expired",
      description: "Bahan baku mahal rusak atau kedaluwarsa sebelum terpakai karena tidak ada monitoring batch bahan.",
    },
    {
      value: "komisi_ojol_tinggi",
      icon: "💸",
      title: "Margin Kue & Hampers Tertekan Komisi Platform Pihak Ketiga",
      description: "Laba bersih penjualan kue ulang tahun dan hampers tergerus potongan komisi pihak ketiga.",
    },
    {
      value: "sulit_followup",
      icon: "🎁",
      title: "Pelanggan Pre-Order Ulang Tahun Tidak Terdata Rapi",
      description: "Kehilangan momentum mengingatkan pelanggan lama saat tanggal ulang tahun keluarga mereka tiba di tahun berikutnya.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Toko Roti & Kue Lainnya",
      description: "Tuliskan masalah operasional spesifik yang sedang dihadapi toko bakery Anda.",
    },
  ],
  frozen_cloud: [
    {
      value: "komisi_ojol_tinggi",
      icon: "💸",
      title: "Margin Keuntungan Tertekan Komisi Platform Pemesanan Online (20%–30%)",
      description: "Jualan makanan beku / cloud kitchen margin sangat tipis akibat potongan platform pemesanan online.",
    },
    {
      value: "kas_stok_bocor",
      icon: "❄️",
      title: "Stok Batch Freezer Kadaluarsa & Selisih Varian Beku",
      description: "Tidak ada pencatatan masa simpan beku sehingga terjadi susut produk atau salah ambil paket.",
    },
    {
      value: "admin_manual",
      icon: "🛵",
      title: "Admin Kewalahan Rekap Order Delivery & Ongkir Manual",
      description: "Staf harus memeriksa tarif kurir, memverifikasi transfer bank, dan mengoordinasikan penjemputan paket secara manual.",
    },
    {
      value: "data_tersebar",
      icon: "👥",
      title: "Database Pembeli Tidak Pernah Terkumpul Mandiri",
      description: "Seluruh data pelanggan loyal tertahan di aplikasi pihak ketiga tanpa akses kontak nomor WhatsApp.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Frozen & Cloud Kitchen Lainnya",
      description: "Tuliskan kendala operasional spesifik pada alur cloud kitchen atau makanan beku Anda.",
    },
  ],

  // --- PROPERTI & RESIDENSIAL ---
  residensial_cluster: [
    {
      value: "siteplan_kpr_manual",
      icon: "🏡",
      title: "Calon Pembeli Ragu (Belum Ada Siteplan Live & Simulasi KPR)",
      description: "Calon pembeli rumah butuh melihat ketersediaan unit kavling interaktif dan simulasi cicilan KPR bank instan.",
    },
    {
      value: "admin_manual",
      icon: "⌨️",
      title: "Pengiriman Brosur PDF & Penjelasan Skema Unit Menyita Waktu Sales",
      description: "Menjelaskan tipe rumah, spesifikasi bangunan, diskon, dan skema pembayaran satu per satu di chat.",
    },
    {
      value: "jadwal_bentrok",
      icon: "🚗",
      title: "Jadwal Janji Temu Survei Lokasi Sering Batal / Bentrok",
      description: "Calon pembeli tidak hadir tanpa kabar dan jadwal antar sales lapangan sering bertabrakan.",
    },
    {
      value: "sulit_followup",
      icon: "💬",
      title: "Database Prospek Rumah Tercecer di Ponsel Sales",
      description: "Ratusan kontak leads iklan pameran tidak ter-follow-up terpusat dan hilang saat sales resign.",
    },
    {
      value: "data_tersebar",
      icon: "🏷️",
      title: "Status Unit Terjual Sering Salah Info Antar Marketing",
      description: "Sales menginfokan unit masih ready padahal sudah dibooking oleh marketing lain.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Penjualan Perumahan Lainnya",
      description: "Tuliskan kendala spesifik dalam pemasaran atau administrasi cluster Anda.",
    },
  ],
  villa_resort: [
    {
      value: "jadwal_bentrok",
      icon: "🏖️",
      title: "Kalender Booking Villa Bentrok Antara OTA & Chat WA",
      description: "Tanggal menginap terlanjur dipesan tamu via WhatsApp tapi kamar juga terkonfirmasi di Traveloka/Airbnb.",
    },
    {
      value: "kas_stok_bocor",
      icon: "💸",
      title: "Uang Jaminan Kerusakan (Deposit) & Tambahan Ekstra Tercecer",
      description: "Pencatatan deposit jaminan kunci/fasilitas dan tagihan sewa ekstra (barbeque/ekstrabed) tidak terdata rapi.",
    },
    {
      value: "admin_manual",
      icon: "🔑",
      title: "Panduan Check-In & Informasi Akses Akomodasi Masih Dikirim Manual",
      description: "Pengelola villa harus mengirimkan tautan lokasi, tata tertib, dan panduan check-in secara manual ke setiap tamu.",
    },
    {
      value: "sulit_followup",
      icon: "👥",
      title: "Tamu Menginap Tidak Terdata untuk Penawaran Musim Liburan",
      description: "Tidak memiliki sistem untuk broadcast promo akhir pekan ke tamu yang pernah menginap sebelumnya.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Pengelolaan Villa / Resort Lainnya",
      description: "Tuliskan masalah operasional dalam reservasi atau pengelolaan properti wisata Anda.",
    },
  ],
  kos_coliving: [
    {
      value: "tagihan_spp_macet",
      icon: "🏢",
      title: "Tagihan Sewa Bulanan Kamar Sering Menunggak",
      description: "Pengelola harus menagih sewa satu per satu ke setiap penghuni kos dan kerap terlewat tanggal jatuh tempo.",
    },
    {
      value: "data_tersebar",
      icon: "🚪",
      title: "Visibilitas Okupansi Kamar Lemah (Kamar Siap Huni vs Terisi Sulit Dipantau)",
      description: "Tidak ada kalender visual untuk mengetahui kamar mana yang akan kosong di akhir bulan.",
    },
    {
      value: "admin_manual",
      icon: "⚡",
      title: "Rekap Token Listrik, Air & Biaya Deposit Kamar Manual di Buku",
      description: "Pencatatan meteran listrik tambahan dan bukti transfer sewa bulanan berserakan di buku tulis.",
    },
    {
      value: "sulit_followup",
      icon: "💬",
      title: "Calon Penghuni Baru Mundur karena Lambat Cek Kamar Ready",
      description: "Calon penyewa di WhatsApp tidak segera mendapat kepastian kamar kosong dan foto fasilitas.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Pengelolaan Kos / Co-Living Lainnya",
      description: "Tuliskan kendala spesifik dalam penagihan atau manajemen kos Anda.",
    },
  ],
  broker_tanah: [
    {
      value: "data_tersebar",
      icon: "🗺️",
      title: "Listing Tanah Kavling & Status Sertifikat Tercecer",
      description: "Data ukuran kavling, surat SHM/AJB, dan harga dari pemilik tanah berserakan di chat dan galeri HP.",
    },
    {
      value: "admin_manual",
      icon: "🤝",
      title: "Koordinasi Antara Calon Buyer & Pemilik Lahan Berbelit-belit",
      description: "Pembaruan harga dan koordinasi komisi perantara sering terlambat terinformasikan saat terjadi perubahan.",
    },
    {
      value: "sulit_followup",
      icon: "💬",
      title: "Calon Pembeli Prospektif Lupa Dihubungi Ulang",
      description: "Investor atau pencari lahan tidak terdata rapi sesuai budget dan lokasi incaran mereka.",
    },
    {
      value: "gagal_tender",
      icon: "📑",
      title: "Legalitas & Profil Kantor Agen Diragukan Klien Besar",
      description: "Perusahaan yang butuh lahan industri menuntut web resmi berlegalitas dan katalog terpercaya.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Agen & Broker Properti Lainnya",
      description: "Tuliskan masalah operasional dalam listing dan penjualan lahan Anda.",
    },
  ],

  // --- TRAVEL, WISATA & UMROH ---
  umroh_haji: [
    {
      value: "kuota_seat_berantakan",
      icon: "🕋",
      title: "Manajemen Kuota Seat & Kamar Hotel Jamaah Berantakan",
      description: "Admin kesulitan memastikan sisa kursi penerbangan, alokasi kamar quad/triple/double di Madinah & Makkah.",
    },
    {
      value: "data_tersebar",
      icon: "🛂",
      title: "Berkas Paspor, Foto & Buku Vaksin Jamaah Berserakan di WA",
      description: "Dokumen pendaftaran jamaah tercecer di chat HP staf operasional dan rawan salah input nama tiket visa.",
    },
    {
      value: "kas_stok_bocor",
      icon: "💳",
      title: "Pencatatan Cicilan Pelunasan Paket Jamaah Sering Selisih",
      description: "Kuitansi DP dan bukti transfer bertahap jemaah tidak sinkron dengan catatan kas biro pusat.",
    },
    {
      value: "admin_manual",
      icon: "📢",
      title: "Penyampaian Itinerary & Info Manasik Dikirim Manual Satu Per Satu",
      description: "Staf kewalahan menginformasikan jadwal kumpul, seragam koper, dan panduan perjalanan ke ratusan jamaah.",
    },
    {
      value: "gagal_tender",
      icon: "🏛️",
      title: "Kredibilitas Biro Diragukan karena Belum Ada Portal Resmi Berizin",
      description: "Calon jamaah takut penipuan travel umroh dan menuntut web resmi yang menampilkan legalitas Kemenag.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Biro Umroh & Haji Lainnya",
      description: "Tuliskan kendala spesifik dalam penanganan jamaah atau kuota ibadah Anda.",
    },
  ],
  tour_opentrip: [
    {
      value: "jadwal_bentrok",
      icon: "✈️",
      title: "Slot Peserta Open Trip Kurang / Overbooked di Tanggal Liburan",
      description: "Jumlah peserta yang terkonfirmasi tidak sesuai kapasitas bus/kapal, atau jadwal keberangkatan terancam batal.",
    },
    {
      value: "admin_manual",
      icon: "📋",
      title: "Penjelasan Berulang Mengenai Itinerary & Fasilitas Trip Menyita Waktu Admin",
      description: "Format detail perjalanan, meeting point, dan perlengkapan diketik ulang berulang-ulang di chat DM medsos.",
    },
    {
      value: "kas_stok_bocor",
      icon: "💸",
      title: "Uang DP Peserta Tidak Mengunci Slot Secara Otomatis",
      description: "Peserta membatalkan sepihak di H-2 setelah tiket hotel/transport terlanjur dipesan oleh penyelenggara.",
    },
    {
      value: "sulit_followup",
      icon: "🔁",
      title: "Peserta Lama Tidak Pernah Ditawari Rute Destinasi Baru",
      description: "Tidak memiliki arsip kontak wisatawan untuk promosi open trip libur panjang berikutnya.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Agen Tour & Open Trip Lainnya",
      description: "Tuliskan masalah operasional dalam booking paket wisata Anda.",
    },
  ],
  rental_transport: [
    {
      value: "unit_rusak_telat_kembali",
      icon: "🚐",
      title: "Jadwal Bus / Shuttle Bentrok & Penumpang Menumpuk",
      description: "Armada belum kembali dari luar kota tapi sudah dijadwalkan untuk penjemputan rombongan baru.",
    },
    {
      value: "kas_stok_bocor",
      icon: "⛽",
      title: "Uang Solar, Tol & Uang Jalan Sopir Rawan Bocor di Lapangan",
      description: "Kuitansi struk SPBU dan bukti tol tercecer tanpa rekapitulasi real-time per nomor polisi armada.",
    },
    {
      value: "admin_manual",
      icon: "⌨️",
      title: "Surat Jalan & Perjanjian Sewa Bus Masih Ditulis Tangan",
      description: "Admin lembur menyusun surat tugas pengemudi dan kuitansi pelunasan rombongan kantor/sekolah.",
    },
    {
      value: "sulit_pantau",
      icon: "🧭",
      title: "Jadwal Pemeliharaan Armada & Uji KIR Kerap Terlewat",
      description: "Pemeriksaan oli, ban armada, dan uji KIR terlewat sehingga berisiko mogok di tengah jalan perjalanan.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Sewa Transport & Bus Lainnya",
      description: "Tuliskan kendala spesifik armada transportasi wisata Anda.",
    },
  ],

  // --- EDUKASI, BIMBEL & PELATIHAN ---
  bimbel_sekolah: [
    {
      value: "tagihan_spp_macet",
      icon: "📚",
      title: "Tunggakan SPP Bulanan Siswa Menumpuk & Sulit Ditagih Tepat Waktu",
      description: "Admin harus mengirim pesan tagihan satu per satu ke wali murid di WA dan sering tidak dibayar tepat waktu.",
    },
    {
      value: "jadwal_bentrok",
      icon: "⏰",
      title: "Jadwal Ruang Kelas & Jam Tentor Sering Bentrok",
      description: "Ruang kelas bertabrakan dengan sesi bimbingan lain dan pengajar berhalangan hadir tanpa koordinasi cepat.",
    },
    {
      value: "admin_manual",
      icon: "📝",
      title: "Formulir Pendaftaran Siswa Baru (PSB) Masih Kertas Manual",
      description: "Biodata murid, asal sekolah, dan pemilihan paket belajar direkap ulang staf ke lembar spreadsheet.",
    },
    {
      value: "data_tersebar",
      icon: "📊",
      title: "Rekap Nilai Tryout & Absensi Siswa Berserakan",
      description: "Orang tua murid menanyakan perkembangan belajar anak tetapi laporan nilai tidak tersaji transparan.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Operasional Bimbel Lainnya",
      description: "Tuliskan kendala spesifik dalam administrasi siswa atau pengajaran bimbel Anda.",
    },
  ],
  kursus_skill: [
    {
      value: "admin_manual",
      icon: "🗣️",
      title: "Konfirmasi Pilihan Batch Kelas & Jadwal Peserta Masih Manual",
      description: "Menghubungi satu per satu calon murid untuk menentukan batch kelas dan mencatat transfer pendaftaran.",
    },
    {
      value: "iklan_boncos",
      icon: "📉",
      title: "Biaya Iklan Kursus Tidak Efektif akibat Alur Pendaftaran Lambat",
      description: "Calon peserta kursus diarahkan ke WA yang lambat direspons sehingga batal mendaftar kelas.",
    },
    {
      value: "data_tersebar",
      icon: "🎓",
      title: "Penerbitan Sertifikat & Distribusi Modul Belajar Berantakan",
      description: "Link materi Google Drive sering terhapus dan sertifikat kelulusan harus dibuat manual di Canva.",
    },
    {
      value: "kas_stok_bocor",
      icon: "💳",
      title: "Cicilan Biaya Pelatihan Peserta Sering Macet di Tengah Jalan",
      description: "Peserta sudah masuk kelas namun pembayaran angsuran kedua dan ketiga tidak terkunci otomatis.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Lembaga Kursus Lainnya",
      description: "Tuliskan masalah operasional spesifik lembaga kursus bahasa/skill Anda.",
    },
  ],
  akademi_bakat: [
    {
      value: "jadwal_bentrok",
      icon: "🥋",
      title: "Jadwal Pelatih Privat & Kuota Lapangan/Studio Bertabrakan",
      description: "Slot sesi privat musik/olahraga penuh tapi tetap diterima admin karena kalender jadwal tidak sinkron.",
    },
    {
      value: "tagihan_spp_macet",
      icon: "💳",
      title: "Iuran Bulanan / Paket Sesi Latihan Murid Sering Telat Bayar",
      description: "Murid tetap hadir latihan meski masa paket sesi sudah habis karena tidak ada pencatatan kuota sesi otomatis.",
    },
    {
      value: "admin_manual",
      icon: "📱",
      title: "Broadcast Pengumuman Jadwal Latihan Masih Manual di Grup WA",
      description: "Pemberitahuan perubahan jam latihan tertimbun obrolan grup dan orang tua murid terlambat membaca info.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Akademi Bakat / Olahraga Lainnya",
      description: "Tuliskan kendala spesifik pada sekolah bakat atau akademi Anda.",
    },
  ],
  lpk_bootcamp: [
    {
      value: "gagal_tender",
      icon: "💻",
      title: "Portofolio Lulusan & Akreditasi LPK Minim Kredibilitas Online",
      description: "Mitra industri atau calon pendaftar ragu karena profil lembaga pelatihan tidak memiliki portal resmi modern.",
    },
    {
      value: "admin_manual",
      icon: "📄",
      title: "Pengumpulan Berkas Seleksi & Penyaluran Kerja Tercecer",
      description: "CV alumni, dokumen pendukung, dan data lowongan mitra kerja tersimpan di folder laptop yang terpisah.",
    },
    {
      value: "tagihan_spp_macet",
      icon: "💸",
      title: "Skema Cicilan Belajar / ISA Sulit Dipantau Pelunasannya",
      description: "Pembayaran bertahap siswa bootcamp tidak terpantau notifikasinya saat tanggal jatuh tempo tiba.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Bootcamp & LPK Lainnya",
      description: "Tuliskan kendala spesifik dalam pendaftaran atau administrasi pelatihan Anda.",
    },
  ],

  // --- JASA B2B, KONTRAKTOR & EKSPOR ---
  kontraktor_sipil: [
    {
      value: "gagal_tender",
      icon: "🏗️",
      title: "Kalah Tender Proyek karena Profil Kurang Bonafide & Legalitas Minim",
      description: "Klien korporat / BUMN meragukan kapabilitas karena portofolio hanya berupa link PDF Google Drive biasa.",
    },
    {
      value: "kas_stok_bocor",
      icon: "🧱",
      title: "Nota Pembelian Material Proyek Tercecer & Pengeluaran Lapangan Kurang Terkontrol",
      description: "Biaya belanja besi/semen di toko bangunan dan uang kas kecil mandor lapangan tidak terpantau harian.",
    },
    {
      value: "klien_minta_laporan",
      icon: "📊",
      title: "Klien Proyek Kerap Menanyakan Pembaruan Progres Lapangan via WhatsApp",
      description: "Owner proyek menuntut transparansi foto progres fisik harian dan kurva S penyelesaian pekerjaan.",
    },
    {
      value: "admin_manual",
      icon: "📐",
      title: "Penyusunan RAB & Dokumen Penawaran Harga Memakan Waktu Lama",
      description: "Menghabiskan berhari-hari menyusun breakdown volume material dan upah kerja manual di Excel.",
    },
    {
      value: "sulit_followup",
      icon: "💸",
      title: "Termin Pembayaran Proyek Molor & Piutang Klien Macet",
      description: "Invoice termin progres fisik terlambat ditagihkan dan sulit memantau jatuh tempo pencairan klien.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Kontraktor & Desain Interior Lainnya",
      description: "Tuliskan kendala spesifik Anda dalam mengelola proyek atau belanja lapangan.",
    },
  ],
  ekspor_komoditas: [
    {
      value: "gagal_tender",
      icon: "🚢",
      title: "Buyer Internasional Ragu Legalitas Resmi & Sertifikasi Produk",
      description: "Calon pembeli dari luar negeri butuh web resmi berstandar internasional lengkap dengan spek komoditas.",
    },
    {
      value: "admin_manual",
      icon: "📑",
      title: "Alur Permintaan Harga (RFQ) & Penawaran Kontainer Berbelit-Belit",
      description: "Negosiasi spesifikasi grade komoditas, FOB/CIF, dan dokumen packing list masih manual via email terpisah.",
    },
    {
      value: "data_tersebar",
      icon: "📂",
      title: "Dokumen Ekspor (COO, Phytosanitary, BL) Tersebar Tanpa Arsip Digital",
      description: "Dokumen pengapalan dan sertifikat uji laboratorium tersimpan di berbagai tempat dan sulit dicari saat audit.",
    },
    {
      value: "sulit_followup",
      icon: "💬",
      title: "Follow-Up Prospek Buyer Luar Negeri Terhenti karena Beda Zona Waktu",
      description: "Tidak memiliki portal informasi mandiri yang bisa diakses buyer internasional 24 jam penuh.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Bisnis Ekspor Komoditas Lainnya",
      description: "Tuliskan masalah spesifik dalam transaksi ekspor atau kuotasi produk Anda.",
    },
  ],
  vendor_supplier: [
    {
      value: "kas_stok_bocor",
      icon: "📦",
      title: "Piutang Tempo Toko / Reseller Macet & Sulit Ditagih",
      description: "Faktur penjualan bertempo 30-60 hari berserakan di buku nota tanpa pengingat jatuh tempo otomatis.",
    },
    {
      value: "admin_manual",
      icon: "⌨️",
      title: "Penerbitan Surat Jalan & Nota Faktur Masih Dikerjakan Manual",
      description: "Waktu kerja habis memindahkan pesanan toko dari chat WA ke lembar faktur tagihan.",
    },
    {
      value: "data_tersebar",
      icon: "📊",
      title: "Stok Gudang Grosir Selisih dengan Catatan Pesanan Sales",
      description: "Barang sudah dijanjikan kirim ke toko mitra padahal stok di gudang fisik ternyata kosong.",
    },
    {
      value: "gagal_tender",
      icon: "🏛️",
      title: "Gagal Masuk Vendor Pengadaan Perusahaan Besar",
      description: "Kalah saing dengan supplier lain yang memiliki portal katalog grosir dan legalitas terverifikasi online.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Vendor & Supplier Material Lainnya",
      description: "Tuliskan masalah spesifik dalam pasokan grosir atau piutang dagang Anda.",
    },
  ],
  konsultan_agensi: [
    {
      value: "admin_manual",
      icon: "💼",
      title: "Waktu Kerja Habis Menyusun Proposal Jasa & Scope of Work (SOW)",
      description: "Copy-paste dokumen penawaran harga berulang-ulang untuk setiap calon klien baru di file Word/PDF.",
    },
    {
      value: "klien_minta_laporan",
      icon: "📈",
      title: "Klien Retainer Menuntut Laporan Kinerja Rutin yang Transparan",
      description: "Tim lembur tiap akhir bulan merangkum data matriks dan laporan kinerja secara manual.",
    },
    {
      value: "sulit_followup",
      icon: "💸",
      title: "Tagihan Invoice Retainer Bulanan Klien Sering Terlambat Dibayar",
      description: "Tidak ada sistem auto-invoice dan reminder WhatsApp untuk penagihan fee jasa bulanan.",
    },
    {
      value: "gagal_tender",
      icon: "🌐",
      title: "Portofolio Agensi Tidak Meyakinkan di Mata Korporat",
      description: "Calon klien ragu membayar rate tinggi karena web agensi terasa amatir dan minim case study nyata.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Konsultan & Agensi Lainnya",
      description: "Tuliskan masalah operasional dalam penanganan klien atau penagihan jasa Anda.",
    },
  ],

  // --- RETAIL & TOKO FISIK / D2C ---
  brand_fashion: [
    {
      value: "marketplace_margin",
      icon: "👗",
      title: "Margin Keuntungan Tertekan Komisi Marketplace (6%–10%)",
      description: "Potongan biaya platform memangkas keuntungan bersih produk fashion, butuh kanal toko online mandiri.",
    },
    {
      value: "iklan_boncos",
      icon: "📉",
      title: "Biaya Iklan Tidak Efektif akibat Respon Chat WhatsApp Lambat",
      description: "Trafik iklan diarahkan ke tautan pesan yang menumpuk, sehingga calon pembeli mengurungkan niat transaksi akibat respon lambat.",
    },
    {
      value: "kas_stok_bocor",
      icon: "📦",
      title: "Stok Varian Ukuran/Warna Selisih Antara Online & Toko",
      description: "Pembeli sudah transfer tapi varian baju yang dipilih ternyata sudah habis terjual di toko fisik.",
    },
    {
      value: "admin_manual",
      icon: "⌨️",
      title: "Admin Kewalahan Cek Mutasi Bank & Rekap Resi Satu Per Satu",
      description: "Waktu staf habis memeriksa mutasi transfer bank manual dan copy-paste nomor resi pengiriman.",
    },
    {
      value: "data_tersebar",
      icon: "👥",
      title: "Database Pembeli Dikuasai Marketplace (Sulit Repeat Order)",
      description: "Tidak bisa melakukan broadcast peluncuran koleksi baju baru langsung ke WhatsApp pembeli setia.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Bisnis Fashion Lainnya",
      description: "Tuliskan kendala spesifik operasional atau penjualan brand fashion Anda.",
    },
  ],
  skincare_kosmetik: [
    {
      value: "iklan_boncos",
      icon: "💄",
      title: "Biaya Iklan Kurang Optimal akibat Konversi Halaman Penjualan Rendah",
      description: "Trafik iklan tinggi tapi sedikit yang closing karena halaman penjualan lambat dan tidak meyakinkan.",
    },
    {
      value: "admin_manual",
      icon: "📦",
      title: "Pengecekan Tarif Ongkir & Validasi Alamat Pembeli Menyita Waktu Staf",
      description: "Staf menghabiskan waktu menghitung ongkos kirim ekspedisi dan memastikan kecamatan pembeli.",
    },
    {
      value: "sulit_followup",
      icon: "🔁",
      title: "Tidak Ada Sistem Pengingat Repeat Order Otomatis (Serum/Krim)",
      description: "Kehilangan omset repeat order rutin saat produk pembeli semestinya sudah habis setelah 30 hari pemakaian.",
    },
    {
      value: "marketplace_margin",
      icon: "💸",
      title: "Ketergantungan Kuat pada Perang Harga di Marketplace",
      description: "Margin keuntungan tertekan akibat perang harga dengan kompetitor tanpa diferensiasi brand yang kuat.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Bisnis Kosmetik & Skincare Lainnya",
      description: "Tuliskan kendala spesifik dalam penjualan atau repeat order skincare Anda.",
    },
  ],
  gadget_elektronik: [
    {
      value: "kas_stok_bocor",
      icon: "📱",
      title: "Stok Barang Bernilai Tinggi Rawan Selisih & Garansi Tercecer",
      description: "Pencatatan nomor seri unik (IMEI / SN) produk tidak rapi sehingga sulit memvalidasi klaim garansi.",
    },
    {
      value: "gagal_tender",
      icon: "🏛️",
      title: "Pelanggan Ragu Beli Barang Mahal Tanpa Toko Online Terpercaya",
      description: "Calon pembeli takut penipuan transfer gadget jika hanya bertransaksi lewat chat WhatsApp biasa.",
    },
    {
      value: "marketplace_margin",
      icon: "💸",
      title: "Komisi Platform Elektronik Memangkas Margin Tipis Gadget",
      description: "Margin penjualan elektronik yang relatif tipis semakin tertekan oleh biaya komisi transaksi platform pihak ketiga.",
    },
    {
      value: "admin_manual",
      icon: "🧾",
      title: "Pencetakan Kartu Garansi & Nota Toko Masih Kertas Manual",
      description: "Klien komplain nota fisik pudar saat ingin melakukan servis klaim garansi resmi.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Toko Gadget & Elektronik Lainnya",
      description: "Tuliskan masalah operasional dalam penjualan atau garansi toko Anda.",
    },
  ],
  distributor_retail: [
    {
      value: "kas_stok_bocor",
      icon: "🏢",
      title: "Piutang Toko Mitra Menumpuk & Susah Ditagih Tepat Waktu",
      description: "Nota faktur tempo reseller dan warung mitra tidak terpantau tanggal jatuh temponya.",
    },
    {
      value: "admin_manual",
      icon: "🚚",
      title: "Rekap Surat Jalan Pengiriman & Pesanan Grosir Manual di Kertas",
      description: "Pencocokan nota pesanan sales dengan jadwal pengiriman armada gudang memakan waktu.",
    },
    {
      value: "data_tersebar",
      icon: "📊",
      title: "Selisih Stok Fisik Ribuan SKU Produk di Gudang",
      description: "Barang rusak atau hilang di rak gudang baru ketahuan saat opname akhir bulan.",
    },
    {
      value: "sulit_pantau",
      icon: "📈",
      title: "Margin Laba Bersih Tiap Mitra & Cabang Sulit Dipantau Akurat",
      description: "Tidak mengetahui performa penjualan produk mana yang paling menghasilkan profit riil.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Grosir & Distributor Retail Lainnya",
      description: "Tuliskan masalah operasional spesifik distribusi barang Anda.",
    },
  ],

  // --- KLINIK, SALON & JANJI TEMU ---
  klinik_spesialis: [
    {
      value: "jadwal_bentrok",
      icon: "🦷",
      title: "Jadwal Pasien Dokter Bentrok & Sering No-Show Tanpa Kabar",
      description: "Booking manual di chat WA membuat kalender dokter bertabrakan dan ruang tindakan terbuang sia-sia.",
    },
    {
      value: "admin_manual",
      icon: "⌨️",
      title: "Admin Habis Waktu Mencocokkan Jam Kosong Dokter di Chat",
      description: "Pengecekan kalender dokter dan pencocokan jam luang pasien harus dilakukan berulang kali di chat.",
    },
    {
      value: "data_tersebar",
      icon: "📂",
      title: "Rekam Riwayat Perawatan & Keluhan Pasien Tersebar di Chat",
      description: "Dokter tidak memiliki akses cepat riwayat penanganan pasien saat sesi konsultasi berikutnya tiba.",
    },
    {
      value: "kas_stok_bocor",
      icon: "💸",
      title: "Pembatalan Sepihak Tanpa DP Mengakibatkan Kursi Kosong",
      description: "Slot jam dokter spesialis terbuang sia-sia tanpa adanya sistem penguncian reservasi DP QRIS.",
    },
    {
      value: "sulit_followup",
      icon: "💬",
      title: "Pengingat Jadwal Kontrol Pasien Masih Dikirimi Manual",
      description: "Staf kewalahan mengirim chat reminder H-1 pemeriksaan ke puluhan pasien setiap sore.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Operasional Klinik Lainnya",
      description: "Tuliskan masalah spesifik dalam alur janji temu atau rekam medis klinik Anda.",
    },
  ],
  salon_barbershop: [
    {
      value: "jadwal_bentrok",
      icon: "✂️",
      title: "Kursi Kosong & Pelanggan Menumpuk di Jam Tertentu",
      description: "Antrean walk-in membludak di akhir pekan sementara hari kerja sepi karena jadwal reservasi tidak diatur rapi.",
    },
    {
      value: "admin_manual",
      icon: "💆",
      title: "Penjadwalan Kapster / Stylist Tertentu Menyita Waktu Admin",
      description: "Pelanggan meminta dilayani staf tertentu, namun admin kesulitan memastikan jam luang secara manual via chat.",
    },
    {
      value: "kas_stok_bocor",
      icon: "🧾",
      title: "Perhitungan Komisi Staf & Kasir Salon Masih Manual",
      description: "Pencatatan kasir fisik rawan selisih dan pembagian komisi jasa kapster/terapis memakan waktu lama.",
    },
    {
      value: "sulit_followup",
      icon: "🔁",
      title: "Pelanggan Tidak Pernah Diingatkan untuk Jadwal Perawatan Rutin",
      description: "Belum tersedianya pengingat berkala untuk perawatan rambut rutin pelanggan.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Salon & Barbershop Lainnya",
      description: "Tuliskan kendala spesifik dalam reservasi atau pembagian komisi tim Anda.",
    },
  ],
  studio_konsultasi: [
    {
      value: "jadwal_bentrok",
      icon: "🧘",
      title: "Pembatalan Sepihak Jadwal Sesi Tanpa Penguncian DP",
      description: "Klien membatalkan janji konseling / terapis mendadak dan ruangan privat terlanjur dialokasikan.",
    },
    {
      value: "admin_manual",
      icon: "⏰",
      title: "Pencocokan Jadwal Terapis & Ketersediaan Ruangan Masih Manual",
      description: "Jadwal booking di Google Calendar sering tidak terupdate dengan pembayaran di rekening bank.",
    },
    {
      value: "sulit_followup",
      icon: "💬",
      title: "Klien Lupa Hadir karena Tidak Ada Pengingat Otomatis",
      description: "Staf harus manual mengirim chat pengingat jam temu satu per satu setiap hari.",
    },
    {
      value: "data_tersebar",
      icon: "📑",
      title: "Catatan Sesi & Catatan Klien Berserakan",
      description: "Dokumen sesi terapi dan preferensi kenyamanan klien tidak tersimpan di database yang aman.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Studio & Konsultasi Lainnya",
      description: "Tuliskan masalah operasional dalam booking slot sesi konsultasi Anda.",
    },
  ],

  // --- RENTAL KENDARAAN & SEWA ASET ---
  rental_kendaraan: [
    {
      value: "unit_rusak_telat_kembali",
      icon: "🚗",
      title: "Penyewa Telat Mengembalikan Unit & Denda Overtime Bocor",
      description: "Mobil terlambat kembali tanpa denda terhitung otomatis, mengacaukan jadwal sewa penyewa berikutnya.",
    },
    {
      value: "verifikasi_ktp_rawan",
      icon: "🚨",
      title: "Verifikasi Identitas Rawan Penggelapan & Berkas Tercecer",
      description: "Foto KTP, SIM, deposit jaminan, dan bukti alamat penyewa berserakan di chat WA staf tanpa arsip aman.",
    },
    {
      value: "jadwal_bentrok",
      icon: "📅",
      title: "Status Kesiapan Armada Sulit Dipantau (Sewa Jalan, Ready, atau Servis)",
      description: "Admin kesulitan memastikan unit mobil mana yang ready di garasi, sedang sewa jalan, atau masuk bengkel servis.",
    },
    {
      value: "admin_manual",
      icon: "📝",
      title: "Ketik Ulang Kontrak Sewa & Ceklis Lecet Kertas Manual",
      description: "Surat perjanjian sewa lepas kunci dan ceklis fisik foto kondisi bensin/lecet masih manual di lembar kertas.",
    },
    {
      value: "kas_stok_bocor",
      icon: "💸",
      title: "Uang DP & Deposit Jaminan Rusak/Hilang Tercecer",
      description: "Catatan pengembalian deposit sering selisih dan DP sewa tidak terkunci otomatis lewat QRIS/Virtual Account.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Rental Kendaraan Lainnya",
      description: "Tuliskan masalah spesifik dalam operasional rental armada mobil atau motor Anda.",
    },
  ],
  sewa_kamera: [
    {
      value: "unit_rusak_telat_kembali",
      icon: "📷",
      title: "Kerusakan Lensa/Sensor & Telat Kembali Tanpa Bukti Ceklis Fisik",
      description: "Kamera dikembalikan dalam kondisi lecet atau jamur tanpa bukti ceklis foto serah-terima unit awal.",
    },
    {
      value: "verifikasi_ktp_rawan",
      icon: "🛡️",
      title: "Jaminan Identitas KTP/SIM Rawan Dipalsukan Penyewa Baru",
      description: "Peralatan bernilai tinggi berisiko penggelapan akibat proses verifikasi identitas yang masih lemah.",
    },
    {
      value: "jadwal_bentrok",
      icon: "🎥",
      title: "Jadwal Sewa Lensa/Bodi Kamera Bentrok Antar Klien",
      description: "Satu bodi kamera terlanjur dijanjikan ke dua fotografer di tanggal proyek yang sama.",
    },
    {
      value: "kas_stok_bocor",
      icon: "💰",
      title: "Deposit Jaminan Alat & Biaya Overtime Jam Tambahan Tercecer",
      description: "Catatan deposit jaminan dan denda jam tambahan tercecer di mutasi bank tanpa rekonsiliasi.",
    },
    {
      value: "admin_manual",
      icon: "⌨️",
      title: "Rekap Kuitansi Kertas & Serial Number (SN) Unit Manual",
      description: "Staf menulis tangan nomor seri bodi, lensa, memori card, dan baterai satu per satu di nota kertas.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Sewa Kamera & Multimedia Lainnya",
      description: "Tuliskan kendala spesifik dalam penyewaan peralatan multimedia Anda.",
    },
  ],
  sewa_alat_berat: [
    {
      value: "unit_rusak_telat_kembali",
      icon: "🚜",
      title: "Utilisasi Jam Kerja Alat & Overtime Lembur Tidak Termonitor",
      description: "Alat berat bekerja melebihi durasi kontrak sewa tanpa perhitungan lembur jam kerja yang presisi.",
    },
    {
      value: "sulit_pantau",
      icon: "🔧",
      title: "Jadwal Servis Berkala, Ganti Oli & Rekap Kerusakan Terlewat",
      description: "Alat berat mogok di lokasi proyek kontraktor karena tidak ada sistem pemeliharaan preventif.",
    },
    {
      value: "sulit_followup",
      icon: "📑",
      title: "Kontrak Sewa Bulanan & Termin Pembayaran Klien Macet",
      description: "Tagihan sewa alat berat per bulan lambat diterbitkan dan jatuh tempo piutang tidak terpantau.",
    },
    {
      value: "admin_manual",
      icon: "📄",
      title: "Surat Perjanjian Sewa (SPK) & Mobilisasi Unit Berbelit-belit",
      description: "Penyusunan dokumen kontrak alat dan surat jalan tronton pengangkut memakan waktu berhari-hari.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Sewa Alat Berat Lainnya",
      description: "Tuliskan masalah operasional dalam penyewaan mesin proyek Anda.",
    },
  ],
  sewa_tenda_event: [
    {
      value: "jadwal_bentrok",
      icon: "🎪",
      title: "Jadwal Sewa Tenda Pesta & Sound System Bentrok di Periode Puncak Acara",
      description: "Terjadi bentrok reservasi peralatan pada tanggal yang sama, mengakibatkan keterbatasan alokasi unit rigging, tenda pesta, atau genset.",
    },
    {
      value: "kas_stok_bocor",
      icon: "💸",
      title: "Peralatan Acara Kerap Tertinggal atau Hilang di Lokasi",
      description: "Kabel audio, mikrofon nirkabel, dan kursi pesta rawan hilang saat pembongkaran karena tidak adanya daftar inventaris terpadu.",
    },
    {
      value: "admin_manual",
      icon: "📋",
      title: "Rekapitulasi Paket Dekorasi & Tenda Pesta Masih Manual via Chat",
      description: "Spesifikasi ukuran tenda pesta/tratag, kain plafon, dan kapasitas tata suara sering mengalami revisi berulang dari klien.",
    },
    {
      value: "sulit_followup",
      icon: "💳",
      title: "Uang Muka (DP) & Pelunasan Sewa Sering Terlambat Diterima",
      description: "Peralatan sudah terpasang di lokasi acara namun sisa tagihan sewa belum diselesaikan oleh penyewa.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Sewa Tenda Pesta & Alat Acara Lainnya",
      description: "Tuliskan kendala spesifik dalam penyewaan tenda pesta atau perlengkapan acara Anda.",
    },
  ],
  sewa_camping_outdoor: [
    {
      value: "unit_rusak_telat_kembali",
      icon: "⛺",
      title: "Tenda Basah/Berlumpur, Sobek & Pasak Hilang Tanpa Ceklis Fisik",
      description: "Peralatan camping dikembalikan dalam kondisi kotor atau rusak tanpa rekonsiliasi denda cuci dan cek kelengkapan unit.",
    },
    {
      value: "jadwal_bentrok",
      icon: "📅",
      title: "Stok Tenda Dome Habis & Bentrok Saat Musim Libur Pendakian",
      description: "Permintaan sewa melonjak di akhir pekan atau tanggal merah hingga terjadi bentrok reservasi unit tenda.",
    },
    {
      value: "verifikasi_ktp_rawan",
      icon: "🛡️",
      title: "Jaminan Identitas KTP/SIM Rawan Dipalsukan Penyewa Baru",
      description: "Peralatan outdoor bernilai tinggi berisiko dibawa kabur akibat verifikasi identitas penyewa yang belum terverifikasi aman.",
    },
    {
      value: "admin_manual",
      icon: "📋",
      title: "Rekapitulasi Paket Sewa & Hitungan Hari Masih Manual via Chat",
      description: "Admin kerepotan menghitung tarif sewa harian per item dan denda overtime keterlambatan pengembalian satu per satu.",
    },
    {
      value: "kas_stok_bocor",
      icon: "💸",
      title: "Deposit Jaminan Alat & Biaya Denda Tercecer di Mutasi Bank",
      description: "Pengembalian uang deposit jaminan penyewa rawan selisih dan tidak tercatat otomatis dalam laporan kas harian.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Sewa Alat Camping & Outdoor Lainnya",
      description: "Tuliskan kendala spesifik dalam persewaan alat camping atau perlengkapan outdoor Anda.",
    },
  ],

  // --- BENGKEL, AGRIBISNIS & OPERASIONAL LAPANGAN ---
  bengkel_karoseri: [
    {
      value: "kas_stok_bocor",
      icon: "🔧",
      title: "Stok Sparepart Sering Selisih & Nota Servis Bengkel Tercecer",
      description: "Suku cadang keluar dari gudang tanpa nota resmi dan uang kas harian kasir rawan selisih.",
    },
    {
      value: "admin_manual",
      icon: "📝",
      title: "Mekanik Masih Menulis Tangan Estimasi Biaya & Nota Servis",
      description: "Pelanggan komplain karena tulisan nota tidak jelas dan rincian harga jasa servis tidak terstandarisasi.",
    },
    {
      value: "data_tersebar",
      icon: "🚗",
      title: "Riwayat Servis Kendaraan Pelanggan Tidak Tersimpan Rapi",
      description: "Bengkel tidak tahu riwayat ganti oli atau perbaikan sebelumnya saat pelanggan datang servis kembali.",
    },
    {
      value: "sulit_followup",
      icon: "💬",
      title: "Tidak Ada Notifikasi WhatsApp Pengingat Servis Berkala",
      description: "Pelanggan lupa jadwal ganti oli rutin dan bengkel kehilangan potensi kunjungan pelanggan setia.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Bengkel Otomotif Lainnya",
      description: "Tuliskan kendala spesifik dalam pencatatan servis atau suku cadang bengkel Anda.",
    },
  ],
  agribisnis_ternak: [
    {
      value: "kas_stok_bocor",
      icon: "🌾",
      title: "Biaya Operasional Pakan/Pupuk Lapangan Bocor Tanpa Terkontrol",
      description: "Nota belanja pakan ternak atau pupuk lapangan berserakan di saku mandor tanpa rekapitulasi harian.",
    },
    {
      value: "sulit_pantau",
      icon: "📈",
      title: "Laba Bersih & HPP Riil per Siklus Panen Sulit Dihitung Akurat",
      description: "Owner tidak tahu pasti berapa laba bersih satu siklus panen tanpa menghitung tumpukan kuitansi kertas.",
    },
    {
      value: "data_tersebar",
      icon: "🚜",
      title: "Pencatatan Bobot Panen & Mortalitas Multi-Kandang Tersebar",
      description: "Data kematian ternak atau susut panen dicatat di papan tulis kandang dan sering hilang.",
    },
    {
      value: "admin_manual",
      icon: "⌨️",
      title: "Staf Lembur Akhir Bulan Memindahkan Bon Kertas ke Komputer",
      description: "Ratusan nota fisik dari berbagai kebun/kandang harus diketik ulang satu per satu ke lembar Excel.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Agribisnis & Peternakan Lainnya",
      description: "Tuliskan masalah operasional dalam pemantauan biaya atau panen Anda.",
    },
  ],
  pabrikasi_gudang: [
    {
      value: "kas_stok_bocor",
      icon: "📦",
      title: "Selisih Bahan Baku & Barang Jadi Gudang Pabrik",
      description: "Barang keluar-masuk gudang tidak sinkron dengan surat jalan sehingga terjadi selisih stok fisik tanpa rekonsiliasi yang jelas.",
    },
    {
      value: "admin_manual",
      icon: "🚚",
      title: "Surat Jalan Pengiriman & Tanda Terima Masih Kertas Manual",
      description: "Bukti tanda terima barang dari sopir ekspedisi hilang atau kotor dan menunda penagihan invoice.",
    },
    {
      value: "sulit_pantau",
      icon: "⚙️",
      title: "Produksi Tertunda karena Bahan Baku Habis Tanpa Peringatan",
      description: "Mesin pabrik menganggur karena staf tidak tahu stok bahan baku menipis hingga waktu produksi tiba.",
    },
    {
      value: "data_tersebar",
      icon: "📊",
      title: "Laporan Harian Mandor Produksi Tidak Terpusat Real-Time",
      description: "Pimpinan pabrik kesulitan mengetahui kapasitas output produksi harian tanpa menelpon mandor satu per satu.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Pabrikasi & Gudang Lainnya",
      description: "Tuliskan kendala spesifik dalam jalur produksi atau pergudangan Anda.",
    },
  ],

  // --- KLINIK & KESEHATAN ---
  klinik_gigi: [
    {
      value: "antrean_klinik_numpuk",
      icon: "🦷",
      title: "Pasien Mengantre Lama & Kursi Dental Sering Kosong Karena No-Show",
      description: "Jadwal tindakan dokter gigi bertabrakan dan pasien membatalkan janji temu secara mendadak tanpa ada DP pengunci.",
    },
    {
      value: "rekam_medis_tercecer",
      icon: "📑",
      title: "Buku Status Rekam Medis Gigi & Odontogram Masih di Kertas Manual",
      description: "Catatan riwayat gigi berlubang, tambalan, dan foto rontgen pasien lama memakan waktu lama saat dicari di lemari arsip.",
    },
    {
      value: "kas_stok_bocor",
      icon: "💊",
      title: "Bahan Tambal Gigi, Komposit & Jarum Anestesi Rawan Selisih",
      description: "Penggunaan bahan medis habis pakai (BMHP) tidak otomatis terpotong saat kasir memproses pembayaran tindakan.",
    },
    {
      value: "sulit_followup",
      icon: "💬",
      title: "Pasien Kontrol Behel / Scaling Rutin Jarang Datang Kembali",
      description: "Klinik tidak memiliki sistem pengingat otomatis via WhatsApp untuk mengingatkan jadwal kontrol berkala 6 bulanan.",
    },
    {
      value: "admin_manual",
      icon: "⌨️",
      title: "Perhitungan Bagi Hasil Komisi Dokter Spesialis Masih Dilakukan Manual",
      description: "Perhitungan fee dokter gigi umum vs dokter spesialis orthodonsi masih direkap manual di akhir bulan.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Klinik Gigi Lainnya",
      description: "Tuliskan kendala operasional yang Anda hadapi di klinik gigi Anda.",
    },
  ],
  klinik_estetika: [
    {
      value: "jadwal_bentrok",
      icon: "✨",
      title: "Jadwal Beautician & Dokter Estetika Bertabrakan Saat Weekend",
      description: "Ruangan treatment terbatas sementara pasien booking di jam yang sama sehingga ruang tunggu penuh sesak.",
    },
    {
      value: "kas_stok_bocor",
      icon: "🧪",
      title: "Stok Ampul Serum & Bahan Medis Khusus Rawan Selisih Penggunaan",
      description: "Penggunaan serum premium dan bahan injeksi rentan terjadi selisih tanpa adanya pencatatan takaran mililiter per tindakan.",
    },
    {
      value: "admin_manual",
      icon: "⌨️",
      title: "Perhitungan Bagi Hasil Komisi Beautician Masih Manual di Buku",
      description: "Rekonsiliasi antara jumlah tindakan terapis dengan komisi harian memakan waktu dan rawan selisih.",
    },
    {
      value: "rekam_medis_tercecer",
      icon: "📸",
      title: "Foto Before-After Kulit Pasien Berserakan di HP Dokter / Terapis",
      description: "Bukti progres perawatan kulit pasien tercecer dan tidak terhubung rapi dengan kartu rekam medis pasien.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Klinik Estetika Lainnya",
      description: "Tuliskan kendala operasional yang Anda hadapi di klinik kecantikan Anda.",
    },
  ],
  klinik_hewan: [
    {
      value: "rekam_medis_tercecer",
      icon: "🐾",
      title: "Buku Rekam Medis Vaksinasi & Riwayat Pasien Hewan Kerap Tertinggal",
      description: "Pemilik hewan sering tidak membawa buku vaksin fisik sehingga dokter kesulitan memeriksa riwayat pengobatan terdahulu.",
    },
    {
      value: "jadwal_bentrok",
      icon: "⏰",
      title: "Jadwal Dokter Hewan Jaga, Operasi Steril & Grooming Bertumpuk",
      description: "Antrean pasien sakit bercampur dengan antrean perawatan kebersihan (grooming) di ruang tunggu yang sama.",
    },
    {
      value: "kas_stok_bocor",
      icon: "💊",
      title: "Stok Pakan Khusus, Obat Cacing & Vaksin di Pet Shop Sering Selisih",
      description: "Barang pet shop dan obat resep klinik hewan tercampur tanpa kartu stok digital terpisah.",
    },
    {
      value: "sulit_followup",
      icon: "💬",
      title: "Pemilik Lupa Jadwal Vaksinasi Ulang & Pemberian Obat Kutu",
      description: "Belum tersedianya pengingat berkala ke WhatsApp pemilik hewan saat jadwal vaksin booster tahunan tiba.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Pet Clinic / Grooming Lainnya",
      description: "Tuliskan masalah operasional dalam klinik hewan atau pet care Anda.",
    },
  ],
  klinik_umum_pratama: [
    {
      value: "antrean_klinik_numpuk",
      icon: "🏥",
      title: "Antrean Pasien Menumpuk & Waktu Tunggu Dokter Sangat Panjang",
      description: "Pasien mengeluh karena harus menunggu berjam-jam tanpa estimasi nomor antrean yang pasti.",
    },
    {
      value: "rekam_medis_tercecer",
      icon: "📑",
      title: "Berkas Rekam Medis Kertas Tebal Memakan Banyak Ruang Arsip",
      description: "Pencarian berkas fisik pasien lama membutuhkan waktu dan memperpanjang antrean.",
    },
    {
      value: "kas_stok_bocor",
      icon: "💊",
      title: "Obat Apotek Klinik Kedaluwarsa Tanpa Peringatan Dini",
      description: "Obat di lemari farmasi kedaluwarsa karena tidak ada sistem batch FEFO (First Expired First Out).",
    },
    {
      value: "admin_manual",
      icon: "⌨️",
      title: "Pencatatan RME Terpisah dari Kasir & Laporan Kemenkes",
      description: "Staf harus mengetik ulang diagnosis dan resep obat dari kertas dokter ke sistem komputer kasir.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Klinik Pratama Lainnya",
      description: "Tuliskan masalah operasional di klinik pratama Anda.",
    },
  ],
  fisioterapi_rehab: [
    {
      value: "jadwal_bentrok",
      icon: "🩹",
      title: "Jadwal Terapis & Ruangan Terapi Terbatas Sering Bertabrakan",
      description: "Slot jam bed terapi bertumpuk dan pasien harus menunggu giliran terapis yang sedang menangani pasien lain.",
    },
    {
      value: "data_tersebar",
      icon: "📂",
      title: "Sisa Kuota Paket Sesi Terapi Pasien Tidak Terpantau Rapi",
      description: "Pasien beli paket 10 sesi terapi, namun kartu paraf manual sering hilang atau selisih hitung.",
    },
    {
      value: "rekam_medis_tercecer",
      icon: "📋",
      title: "Catatan Progres Pemulihan Fisik Pasien Masih Manual",
      description: "Dokter atau fisioterapis kesulitan melihat tren perbaikan cedera pasien antar-sesi terapi.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Studio Terapi Lainnya",
      description: "Tuliskan kendala spesifik dalam pengelolaan terapi Anda.",
    },
  ],

  // --- EVENT & WEDDING ORGANIZER ---
  wedding_organizer: [
    {
      value: "rundown_bentrok_venue",
      icon: "💍",
      title: "Rundown Acara Resepsi Molor & Koordinasi Panggung Tidak Sinkron",
      description: "Jadwal menit-ke-menit akad dan resepsi molor karena MC, catering, dekorasi, dan fotografer tidak sinkron.",
    },
    {
      value: "vendor_event_meleset",
      icon: "🚨",
      title: "Vendor Katering / Dekorasi Loading Terlambat di Gedung Venue",
      description: "Vendor pihak ketiga tidak mematuhi jam loading venue tanpa ada checklist pemantauan terpusat.",
    },
    {
      value: "admin_manual",
      icon: "📝",
      title: "Registrasi Meja Tamu Manual di Buku Kertas & Antrean Mengular",
      description: "Pencatatan manual buku tamu memperlambat registrasi dan memicu antrean di pintu masuk gedung.",
    },
    {
      value: "kas_stok_bocor",
      icon: "💸",
      title: "Jadwal Termin Pembayaran DP Pengantin & Pelunasan Vendor Tercecer",
      description: "Jadwal penagihan termin DP 30%, 50%, dan pelunasan ke belasan vendor pihak ketiga sering terlupa.",
    },
    {
      value: "sulit_followup",
      icon: "💬",
      title: "Calon Pengantin Tanya Paket Wedding di WA Tapi Tidak Pernah Closing",
      description: "Brosur paket pernikahan yang dikirim via PDF tidak interaktif dan admin jarang follow up terstruktur.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Wedding Organizer Lainnya",
      description: "Tuliskan kendala spesifik dalam mengelola pernikahan klien Anda.",
    },
  ],
  eo_korporat: [
    {
      value: "vendor_event_meleset",
      icon: "🎪",
      title: "Vendor Panggung, Sound & Lighting Melanggar SLA Waktu Loading",
      description: "Pemasangan panggung dan soundcheck mepet jam mulai acara korporat, berisiko komplain fatal dari direksi klien.",
    },
    {
      value: "admin_manual",
      icon: "🏷️",
      title: "Registrasi Peserta Masih Manual & Cetak Name Tag Lambat",
      description: "Ratusan peserta gathering/seminar antre panjang saat check-in di lokasi karena pencarian nama manual.",
    },
    {
      value: "kas_stok_bocor",
      icon: "💸",
      title: "Pengeluaran Kas Operasional Kru Lapangan Sering Overbudget",
      description: "Bon operasional kru lapangan menumpuk tanpa kontrol budget real-time per mata anggaran event.",
    },
    {
      value: "klien_minta_laporan",
      icon: "📊",
      title: "Klien Korporat Menuntut Laporan Evaluasi Acara & Bukti Foto Detail",
      description: "Penyusunan laporan pasca-event membutuhkan waktu berminggu-minggu karena foto dan data peserta tercecer.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala EO Korporat Lainnya",
      description: "Tuliskan kendala spesifik dalam mengelola event korporat Anda.",
    },
  ],
  promotor_konser: [
    {
      value: "admin_manual",
      icon: "🎫",
      title: "Antrean Gate Scanner Tiket Lambat & Rawan Tiket Palsu / Calo",
      description: "Penonton membludak di pintu masuk konser dan barcode tiket lambat dipindai oleh alat scanner manual.",
    },
    {
      value: "kas_stok_bocor",
      icon: "🍔",
      title: "Bagi Hasil Penjualan Tenant F&B di Venue Tidak Terdata Akurat",
      description: "Sistem bagi hasil omset gerai makanan/merchandise di area festival tidak terlacak secara real-time.",
    },
    {
      value: "rundown_bentrok_venue",
      icon: "🎸",
      title: "Jadwal Soundcheck & Tampil Bintang Tamu Sering Molor",
      description: "Rundown panggung bergeser berjam-jam hingga melanggar batas izin keramaian venue yang ditentukan.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Promotor Konser Lainnya",
      description: "Tuliskan masalah spesifik dalam festival musik atau konser Anda.",
    },
  ],

  // --- AGENSI KREATIF, DIGITAL & IT ---
  digital_marketing_agency: [
    {
      value: "scope_creep_revisi",
      icon: "🔄",
      title: "Revisi Desain & Video Konten Iklan Tanpa Batas dari Klien",
      description: "Klien terus meminta perombakan konsep visual di luar brief awal tanpa ada kompensasi biaya tambahan.",
    },
    {
      value: "invoice_retainer_macet",
      icon: "💸",
      title: "Tagihan Retainer Bulanan Klien Sering Menunggak & Telat Cair",
      description: "Staf sungkan menagih rutin di chat WA dan perpanjangan kontrak retainer bulanan kerap terlupa.",
    },
    {
      value: "klien_minta_laporan",
      icon: "📊",
      title: "Staf Habis Waktu Bikin Slide Laporan Performa Iklan Manual",
      description: "Tiap minggu staf lembur mengompilasi screenshot metrik Meta Ads/Google Ads ke file presentasi Canva/PPT.",
    },
    {
      value: "admin_manual",
      icon: "💻",
      title: "Beban Kerja Tim Desainer & Copywriter Menumpuk di Grup WA",
      description: "Instruksi revisi tenggelam di chat WhatsApp dan file materi iklan tercecer di berbagai link Google Drive.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Agensi Marketing Lainnya",
      description: "Tuliskan kendala spesifik dalam mengelola klien agensi Anda.",
    },
  ],
  software_house: [
    {
      value: "scope_creep_revisi",
      icon: "💻",
      title: "Klien Minta Tambah Fitur Terus Menerus Tanpa Tambah Biaya",
      description: "Fitur aplikasi membengkak dari dokumen penawaran awal (scope creep) hingga mengikis margin keuntungan proyek.",
    },
    {
      value: "invoice_retainer_macet",
      icon: "💸",
      title: "Pencairan Termin Pembayaran Proyek Molor Karena UAT Lambat",
      description: "Klien lambat menguji coba sistem dan menunda pembayaran termin berikutnya hingga cashflow tim terganggu.",
    },
    {
      value: "admin_manual",
      icon: "⏳",
      title: "Beban Jam Kerja Developer & Bug Tracker Tidak Terpantau Transparan",
      description: "Sulit mengukur apakah estimasi jam kerja developer sesuai dengan harga jual proyek ke klien.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Software House Lainnya",
      description: "Tuliskan masalah spesifik dalam proyek pengembangan perangkat lunak Anda.",
    },
  ],
  production_house: [
    {
      value: "jadwal_bentrok",
      icon: "🎬",
      title: "Jadwal Sewa Studio & Alat Kamera Bentrok dengan Tim Lain",
      description: "Jadwal pemakaian studio foto/video bertabrakan karena kalender sewa masih dicatat di spreadsheet manual.",
    },
    {
      value: "scope_creep_revisi",
      icon: "🎞️",
      title: "Revisi Potongan Video Draft Berulang Kali Tanpa Batas",
      description: "Klien meminta perubahan cut video dan grading warna berulang kali tanpa acuan timeline yang disepakati.",
    },
    {
      value: "data_tersebar",
      icon: "💾",
      title: "File Video RAW Ratusan Gigabyte Berserakan di Harddisk",
      description: "Materi footage shooting klien sulit dilacak kembali saat klien meminta file arsip beberapa bulan kemudian.",
    },
    {
      value: "kas_stok_bocor",
      icon: "💸",
      title: "Klien Meminta File Final Padahal Pembayaran Belum Lunas",
      description: "File resolusi tinggi terlanjur diserahkan sebelum sisa tagihan pelunasan masuk ke rekening perusahaan.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Production House Lainnya",
      description: "Tuliskan kendala spesifik dalam produksi konten foto atau video Anda.",
    },
  ],

  // --- JASA CUCI, LAUNDRY & CLEANING ---
  laundry_kiloan_satuan: [
    {
      value: "baju_hilang_tertukar",
      icon: "🧺",
      title: "Pakaian Pelanggan Tertukar, Tertinggal, atau Rusak/Luntur",
      description: "Ketiadaan label barcode penanda membuat pakaian pelanggan rawan tertukar saat proses setrika dan packing.",
    },
    {
      value: "cucian_menumpuk_lama",
      icon: "⏰",
      title: "Pelanggan Lupa Ambil Cucian Bersih Berminggu-minggu & Rak Menumpuk",
      description: "Rak outlet penuh sesak oleh cucian yang sudah selesai karena tidak ada notifikasi otomatis ke WhatsApp pelanggan.",
    },
    {
      value: "kas_stok_bocor",
      icon: "💸",
      title: "Uang Kas Kasir Selisih Saat Tutup Shift & Boros Sabun/Parfum",
      description: "Uang laci kasir selisih saat pergantian shift dan takaran detergen/parfum tidak terkontrol pemakaiannya.",
    },
    {
      value: "admin_manual",
      icon: "🧾",
      title: "Nota Timbangan Fisik Hilang & Perhitungan Komisi Borongan Masih Manual",
      description: "Struk kertas mudah rusak dan perhitungan upah borongan staf setrika per kilogram masih manual.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Laundry Lainnya",
      description: "Tuliskan kendala operasional dalam usaha laundry Anda.",
    },
  ],
  carwash_detailing: [
    {
      value: "jadwal_bentrok",
      icon: "🚗",
      title: "Antrean Kendaraan Menumpuk & Pelanggan Beralih ke Tempat Lain",
      description: "Pelanggan tidak bisa memantau antrean cuci mobil secara live sehingga memilih pergi ke tempat cuci lain.",
    },
    {
      value: "kas_stok_bocor",
      icon: "🧪",
      title: "Bahan Wax, Sabun Salju, dan Coating Mahal Boros / Bocor",
      description: "Penggunaan cairan detailing mobil tidak terukur takarannya dan sering terjadi pemborosan bahan baku.",
    },
    {
      value: "admin_manual",
      icon: "🧾",
      title: "Hitungan Komisi Tukang Cuci per Mobil Masih Manual di Kertas Bon",
      description: "Pembagian komisi cuci per kendaraan masih direkap manual di akhir hari kerja.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Car Wash / Detailing Lainnya",
      description: "Tuliskan kendala operasional dalam bisnis cuci kendaraan Anda.",
    },
  ],
  home_cleaning_ac: [
    {
      value: "jadwal_bentrok",
      icon: "🧹",
      title: "Jadwal Teknisi AC / Petugas Kebersihan Bentrok & Rute Lokasi Tidak Akurat",
      description: "Penugasan jadwal staf cleaning ke rumah pelanggan tumpang tindih dan rute perjalanan tidak efisien.",
    },
    {
      value: "sulit_followup",
      icon: "💬",
      title: "Pelanggan Lupa Jadwal Servis Rutin 3 Bulanan Cuci AC",
      description: "Tidak ada pengingat otomatis ke WhatsApp pelanggan saat masa cuci AC berkala 3 bulan telah jatuh tempo.",
    },
    {
      value: "klien_minta_laporan",
      icon: "❄️",
      title: "Pelanggan Komplain AC Tidak Dingin / Bocor Tanpa Bukti Riwayat",
      description: "Riwayat tekanan freon, ampere listrik, dan tindakan perbaikan terdahulu tidak tercatat rapi secara digital.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Servis AC / Home Cleaning Lainnya",
      description: "Tuliskan masalah operasional dalam jasa kebersihan atau servis panggilan Anda.",
    },
  ],

  bisnis_custom: [
    {
      value: "kas_stok_bocor",
      icon: "💸",
      title: "Kebocoran Uang Kas & Pengeluaran Tidak Tercatat",
      description: "Pengeluaran harian operasional keluar tanpa bukti kuitansi rapi dan kas rawan selisih.",
    },
    {
      value: "admin_manual",
      icon: "⌨️",
      title: "Terlalu Banyak Pekerjaan Manual & Rekap Data Berulang",
      description: "Waktu kerja habis untuk urusan administrasi rutin yang semestinya bisa diotomasi sistem.",
    },
    {
      value: "data_tersebar",
      icon: "📂",
      title: "Data Pelanggan & Riwayat Transaksi Berserakan",
      description: "Data bisnis terpecah di berbagai file spreadsheet dan ponsel pribadi staf.",
    },
    {
      value: "sulit_pantau",
      icon: "🧭",
      title: "Sulit Memantau Performa Bisnis & Laba Riil Real-Time",
      description: "Owner tidak bisa memantau kondisi operasional harian secara cepat dari ponsel.",
    },
    {
      value: "lainnya",
      icon: "✍️",
      title: "Kendala Operasional Khusus Lainnya",
      description: "Tuliskan kendala operasional unik yang sedang Anda hadapi.",
    },
  ],
};

// Opsi Kendala Kredibilitas, Portofolio & Traffic Website Terkontekstualisasi
export const CATEGORY_CREDIBILITY_PAINS: Record<BusinessType, OptionItem<BusinessPain>> = {
  klinik_kesehatan: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Calon Pasien Ragu / Butuh Website Profil Resmi, Profil Dokter & Portofolio Before–After",
    description: "Banyak calon pasien ragu booking atau membandingkan dengan kompetitor karena klinik belum memiliki website profil resmi berdomain sendiri yang menampilkan sertifikasi dokter, izin operasional, dan transparansi menu treatment.",
  },
  rental_aset: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Calon Penyewa Ragu Bertransaksi & Butuh Katalog Unit Resmi di Pencarian Google",
    description: "Penyewa baru atau pelanggan luar kota ragu transfer DP karena rental belum memiliki website katalog resmi berdomain sendiri yang memuat foto unit asli, ketersediaan, dan syarat sewa transparan.",
  },
  kuliner_fnb: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Calon Pelanggan / Acara Ragu Memesan Karena Belum Memiliki Website Profil & Portofolio Menu",
    description: "Pelanggan baru dan panitia acara ragu memesan tanpa website resmi berdomain sendiri yang menampilkan variasi menu, standar higienitas, dan ulasan kepuasan pelanggan.",
  },
  properti_aset: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Peminat / Penyewa Ragu Karena Belum Ada Website Profil Resmi & Showcase Unit Terpercaya",
    description: "Peminat hunian ragu mentransfer biaya sewa atau booking fee tanpa website profil resmi yang memverifikasi legalitas unit, fasilitas nyata, dan reputasi pengelola.",
  },
  travel_wisata: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Wisatawan / Jamaah Ragu Memesan Paket Perjalanan Karena Belum Ada di Website Resmi",
    description: "Calon pelancong mencari paket wisata di Google tapi ragu bertransaksi tanpa website profil resmi berizin yang menampilkan dokumentasi perjalanan nyata dan ulasan pelanggan.",
  },
  edukasi_bimbel: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Calon Siswa / Orang Tua Ragu Mendaftar Karena Belum Memiliki Website Profil Lembaga Resmi",
    description: "Pendaftaran peserta didik baru tersendat karena calon murid dan orang tua mencari kurikulum, profil pengajar berkompeten, dan bukti prestasi kelulusan di website resmi.",
  },
  jasa_b2b: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Klien Korporat Ragu Menunjuk Mitra Karena Belum Memiliki Company Profile & Portofolio Resmi",
    description: "Calon klien B2B memerlukan verifikasi legalitas perusahaan, daftar proyek terdahulu, dan profil resmi di website sebelum menerbitkan SPK atau kontrak kerja sama.",
  },
  retail_d2c: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Calon Pembeli Ragu Berbelanja Karena Brand Belum Memiliki Website Toko Resmi Berdomain Sendiri",
    description: "Followers media sosial membandingkan dengan kompetitor atau ragu bertransaksi karena brand hanya mengandalkan chat manual tanpa website toko resmi yang terverifikasi.",
  },
  booking_jasa: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Calon Pelanggan Ragu Memilih Treatment Karena Belum Ada Website Profil & Portofolio Hasil Kerja",
    description: "Pelanggan baru dari medsos ragu berkunjung karena belum ada website profil layanan resmi yang menampilkan portofolio hasil karya terapis/stylist dan daftar harga transparan.",
  },
  event_organizer: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Klien Ragu Menggunakan Jasa Karena Portofolio Event & Dokumentasi Acara Belum Rapi di Web Resmi",
    description: "Calon penyelenggara acara ragu mempercayakan event mereka tanpa website showcase berkelas yang memamerkan dokumentasi kesuksesan event dan testimoni klien terdahulu.",
  },
  agensi_kreatif: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Klien Prospek Ragu Hire Agensi Karena Portofolio Karya Belum Terpusat di Web Resmi",
    description: "Klien ragu membayar retainer tanpa website agency profesional berdomain sendiri yang memamerkan studi kasus terukur, metrik ROI, dan hasil karya terbaik tim.",
  },
  jasa_cuci_laundry: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Pelanggan Baru Sulit Menemukan Jasa di Google Search & Ragu Tanpa Website Daftar Layanan Resmi",
    description: "Calon pelanggan di sekitar wilayah mencari jasa lewat Google tapi belum menemukan profil layanan resmi, jaminan mutu higienis, dan daftar tarif transparan.",
  },
  operasional_lapangan: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Mitra & Rekanan Prospek Ragu Karena Belum Ada Company Profile & Portofolio Fasilitas di Web",
    description: "Rekanan bisnis dan buyer industri membutuhkan profil resmi perusahaan dan spesifikasi fasilitas kerja sebelum memulai kerja sama jangka panjang.",
  },
  lainnya: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Calon Pelanggan Ragu & Butuh Website Company Profile / Portofolio Bukti Kerja Resmi",
    description: "Banyak calon pelanggan dari media sosial atau Google membandingkan dengan kompetitor atau ragu bertransaksi karena bisnis belum memiliki website profil resmi dan bukti hasil kerja terpercaya.",
  },
};

export const SECTOR_CREDIBILITY_PAINS: Record<string, OptionItem<BusinessPain>> = {
  klinik_estetika: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Calon Pasien Ragu / Butuh Website Profil Resmi, Dokter & Portofolio Before–After",
    description: "Calon pasien potensial dari medsos atau Google ragu booking karena klinik belum memiliki website profil resmi yang menampilkan izin medis, kualifikasi dokter, dan transparansi menu treatment.",
  },
  klinik_gigi: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Calon Pasien Ragu / Butuh Profil Dokter Gigi Spesialis & Showcase Fasilitas Steril",
    description: "Pasien baru ragu berkunjung karena belum ada website profil klinik gigi resmi yang menyajikan sertifikasi dokter spesialis dan testimoni tindakan.",
  },
  klinik_hewan: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Pemilik Anabul Ragu Karena Profil Fasilitas Medis & Dokter Hewan Belum Ada di Web Resmi",
    description: "Pemilik satwa peliharaan mencari klinik lewat Google tapi belum menemukan profil fasilitas rawat jalan dan izin praktik dokter yang kredibel.",
  },
  rental_kendaraan: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Calon Penyewa Ragu Bertransaksi & Butuh Katalog Unit Resmi di Pencarian Google",
    description: "Penyewa baru dari luar kota ragu transfer DP karena rental belum memiliki website katalog resmi berdomain sendiri dengan syarat sewa transparan.",
  },
  sewa_kamera: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Calon Kreator Ragu Sewa & Butuh Katalog Spesifikasi Lensa/Kamera di Web Resmi",
    description: "Kreator dan fotografer baru ragu menyewa karena daftar ketersediaan alat dan portofolio studio belum tersaji rapi di website profil resmi.",
  },
  sewa_tenda_event: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Klien Acara Ragu Memesan Karena Dokumentasi Tenda & Rigging Belum Ada di Web",
    description: "Calon pengantin atau panitia event ragu memilih vendor karena belum ada website showcase portofolio dekorasi tenda dan sound system.",
  },
  sewa_camping_outdoor: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Pendaki Baru Ragu Sewa & Butuh Katalog Paket Alat Camping Terverifikasi",
    description: "Penyewa alat outdoor kesulitan melihat kelayakan alat kemah dan paket pendakian tanpa website katalog resmi.",
  },
  kafe_resto: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Calon Pengunjung Ragu Datang / Reservasi Karena Menu & Suasana Belum Ada di Web Resmi",
    description: "Wisatawan kuliner dan pelanggan baru kesulitan melihat menu andalan, harga, suasana kedai, dan ulasan di Google tanpa website resmi.",
  },
  katering_event: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Penyelenggara Acara Ragu Pesan Paket Prasmanan Karena Portofolio Katering Belum Ada di Web",
    description: "Klien korporat atau keluarga ragu memesan katering jumlah besar tanpa website company profile dan sertifikasi higienis resmi.",
  },
  bimbel_sekolah: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Calon Murid & Orang Tua Ragu Mendaftar Karena Belum Memiliki Website Profil Lembaga Resmi",
    description: "Pendaftaran siswa baru tersendat karena orang tua mencari profil kurikulum, bukti prestasi kelulusan, dan legalitas izin kursus di website resmi.",
  },
  kursus_skill: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Calon Peserta Kursus Ragu Mendaftar Karena Portofolio Alumni & Sertifikasi Belum di Web",
    description: "Peserta ragu membayar biaya kursus tanpa website profesional yang menampilkan kurikulum mendalam dan portofolio alumni.",
  },
  salon_barbershop: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Calon Pelanggan Ragu Memilih Treatment Karena Belum Ada Website Portofolio Terapis/Stylist",
    description: "Pelanggan baru dari medsos ragu berkunjung karena belum ada website profil salon yang menampilkan portofolio hasil karya dan daftar harga transparan.",
  },
  wedding_organizer: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Calon Pengantin Ragu Menggunakan Jasa Karena Portofolio Pernikahan Belum Terpusat di Web",
    description: "Calon mempelai ragu mempercayakan hari bahagianya karena belum ada website showcase dokumentasi vendor dan testimoni klien terdahulu.",
  },
  eo_korporat: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Klien Perusahaan / B2B Ragu Menunjuk EO Karena Belum Ada Company Profile Resmi",
    description: "Panitia korporat memerlukan company profile resmi berdomain sendiri, daftar klien besar terdahulu, dan dokumentasi event profesional.",
  },
  digital_marketing_agency: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Klien Prospek Ragu Hire Agensi Karena Portofolio & Studi Kasus ROI Belum di Web Resmi",
    description: "Klien ragu membayar retainer tanpa website agency profesional yang memamerkan metrik hasil kampanye dan studi kasus klien.",
  },
  software_house: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Klien Ragu Memesan Software / Web Karena Belum Ada Showcase Produk & Kredibilitas Tim",
    description: "Prospek ragu menyerahkan proyek bernilai tinggi tanpa website software house yang memperlihatkan tech-stack dan portofolio live.",
  },
  production_house: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Brand Klien Ragu Menunjuk PH Karena Showreel Video & Foto Belum Terpusat di Web",
    description: "Klien iklan dan musisi membutuhkan website showreel beresolusi tinggi untuk memverifikasi kualitas estetika sinematografi sebelum hire.",
  },
  laundry_kiloan_satuan: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Pelanggan Baru Sulit Menemukan Jasa di Google Search & Ragu Tanpa Website Resmi",
    description: "Warga sekitar dan penghuni apartemen/kost mencari jasa laundry lewat Google tapi belum menemukan profil outlet dan jaminan kebersihan resmi.",
  },
  carwash_detailing: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Pemilik Mobil Ragu Coating / Detailing Karena Hasil Kerja Belum Ada di Galeri Web",
    description: "Pemilik kendaraan mewah ragu memesan paket salon mobil jutaan rupiah tanpa website portofolio before-after dan sertifikasi obat coating.",
  },
  residensial_cluster: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Calon Pembeli Properti Ragu Karena Belum Memiliki Website Resmi Pengembang & Legalitas",
    description: "Peminat rumah ragu membayar booking fee tanpa website resmi developer yang memamerkan izin perumahan, sertifikat, dan tur 3D unit.",
  },
  umroh_haji: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Calon Jamaah Ragu Menabung Umroh Karena Legalitas PPIU Belum Tersaji di Website Resmi",
    description: "Keluarga jamaah sangat berhati-hati memilih biro umroh dan butuh website resmi berizin Kemenag dengan rincian hotel dan jadwal pasti.",
  },
  tour_opentrip: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Wisatawan Ragu Membayar Open Trip Karena Belum Ada Website Resmi & Portofolio Dokumentasi",
    description: "Calon peserta trip dari luar kota ragu mentransfer biaya tanpa website resmi yang menampilkan foto dokumentasi trip sebelumnya dan testimoni asli.",
  },
  brand_fashion: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Calon Pembeli Ragu Berbelanja Karena Brand Belum Memiliki Website Toko Resmi Sendiri",
    description: "Followers media sosial sering ragu membeli produk fashion premium jika transaksi hanya diarahkan ke chat manual tanpa toko web berdomain resmi.",
  },
  skincare_kosmetik: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Konsumen Ragu Keaslian / Izin BPOM Produk Karena Belum Ada Website Resmi Brand",
    description: "Pembeli produk kecantikan butuh kepastian izin edar BPOM, sertifikasi halal, dan penjelasan kandungan bahan di website resmi sebelum membeli.",
  },
  bengkel_karoseri: {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Pelanggan Ragu Menitipkan Mobil Karena Belum Ada Profil Bengkel & Garansi Resmi di Web",
    description: "Pemilik kendaraan mencari bengkel spesialis di Google tapi ragu jika bengkel belum memiliki website profil resmi dan transparansi biaya perbaikan.",
  },
};

// Helper untuk mengambil HANYA kendala yang relevan secara ketat dengan model bisnis & sub-sektor (Granular Adaptation)
export function getRelevantPainPoints(
  businessType: BusinessType | null,
  subSector?: string
): OptionItem<BusinessPain>[] {
  const baseList: OptionItem<BusinessPain>[] = (subSector && SUBSECTOR_SPECIFIC_PAINS[subSector])
    ? [...SUBSECTOR_SPECIFIC_PAINS[subSector]]
    : (businessType && BUSINESS_SPECIFIC_PAINS[businessType])
      ? [...BUSINESS_SPECIFIC_PAINS[businessType]]
      : [...BUSINESS_SPECIFIC_PAINS.lainnya];

  // Pastikan kartu kredibilitas, portofolio & traffic website selalu hadir di posisi strategis
  const hasCredibility = baseList.some((p) => p.value === "kredibilitas_portofolio");
  if (!hasCredibility) {
    const credCard = (subSector && SECTOR_CREDIBILITY_PAINS[subSector])
      || (businessType && CATEGORY_CREDIBILITY_PAINS[businessType])
      || CATEGORY_CREDIBILITY_PAINS.lainnya;

    // Sisipkan tepat sebelum kartu 'lainnya' jika ada, atau di akhir list
    const lainnyaIdx = baseList.findIndex((p) => p.value === "lainnya");
    if (lainnyaIdx !== -1) {
      baseList.splice(lainnyaIdx, 0, credCard);
    } else {
      baseList.push(credCard);
    }
  }

  return baseList;
}

// Kompatibilitas mundur jika ada pemanggil getSortedPainPoints
export const getSortedPainPoints = getRelevantPainPoints;

export const PAIN_POINT_OPTIONS: OptionItem<BusinessPain>[] = [
  {
    value: "iklan_boncos",
    icon: "📉",
    title: "Biaya Iklan Berbayar Tidak Efektif / Konversi Rendah",
    description: "Anggaran promosi keluar signifikan, namun rasio konversi rendah akibat alur pemesanan yang tidak terarah.",
  },
  {
    value: "gagal_tender",
    icon: "📑",
    title: "Kredibilitas Bisnis di Mata Klien B2B Masih Rendah",
    description: "Klien korporat memerlukan verifikasi legalitas resmi, portofolio terstruktur, dan profil perusahaan profesional.",
  },
  {
    value: "marketplace_margin",
    icon: "💸",
    title: "Margin Tertekan Potongan Komisi Marketplace",
    description: "Beban potongan komisi platform berkisar 6%–10% secara terus-menerus menekan margin keuntungan bersih.",
  },
  {
    value: "jadwal_bentrok",
    icon: "⏰",
    title: "Jadwal Reservasi Bentrok & Pembatalan Sepihak (No-Show)",
    description: "Pencatatan reservasi manual via chat memicu jadwal tumpang tindih dan tingkat kehadiran rendah tanpa pengingat otomatis.",
  },
  {
    value: "kas_stok_bocor",
    icon: "🚨",
    title: "Selisih Inventaris & Pencatatan Kas Operasional Belum Akuntabel",
    description: "Bukti transaksi fisik tercecer di lapangan, terjadi selisih stok gudang, serta minimnya visibilitas laba riil bulanan.",
  },
  {
    value: "klien_minta_laporan",
    icon: "📊",
    title: "Pelaporan Progres ke Klien Belum Terstruktur",
    description: "Pembaruan progres terus ditanyakan secara manual via chat dan penyusunan laporan berkala memakan waktu kerja.",
  },
  {
    value: "admin_manual",
    icon: "⌨️",
    title: "Beban Administrasi Manual Menyita Waktu Operasional",
    description: "Waktu kerja produktif tersita untuk membalas pesan repetitif, verifikasi mutasi bank manual, dan rekapitulasi data berulang.",
  },
  {
    value: "data_tersebar",
    icon: "📂",
    title: "Data Operasional & Pelanggan Terfragmentasi",
    description: "Database pelanggan, riwayat transaksi, dan dokumen invoice tersimpan terpisah di berbagai perangkat staf.",
  },
  {
    value: "sulit_followup",
    icon: "💬",
    title: "Sulit Follow-Up Calon Pelanggan",
    description: "Calon prospek yang pernah bertanya tidak terdata rapi sehingga peluang transaksi hilang.",
  },
  {
    value: "sulit_pantau",
    icon: "🧭",
    title: "Sulit Memantau Performa Bisnis",
    description: "Owner tidak tahu angka laba bersih hari ini tanpa menunggu laporan akuntan akhir bulan.",
  },
  {
    value: "kredibilitas_portofolio",
    icon: "🌐",
    title: "Calon Pelanggan Ragu & Butuh Website Portofolio / Company Profile Resmi",
    description: "Banyak calon pelanggan dari media sosial atau Google membandingkan dengan kompetitor atau ragu bertransaksi karena bisnis belum memiliki website profil resmi dan bukti hasil kerja terpercaya.",
  },
  {
    value: "lainnya",
    icon: "✍️",
    title: "Masalah Operasional Lainnya",
    description: "Tuliskan kendala spesifik yang sedang Anda hadapi di luar opsi di atas.",
  },
];

// Pemetaan Kanal Masuk Spesifik per Sub-Sektor
export const SUBSECTOR_CUSTOMER_FLOWS: Record<string, OptionItem<CustomerFlowChannel>[]> = {
  kafe_resto: [
    { value: "datang_langsung", icon: "☕", title: "Dine-in / Kasir Meja Langsung", description: "Tamu memesan langsung di meja atau antre di kasir counter barista." },
    { value: "website", icon: "📱", title: "Scan QR Menu di Meja", description: "Pelanggan scan barcode di meja dan memesan tanpa memanggil pelayan." },
    { value: "whatsapp", icon: "💬", title: "WhatsApp Reservasi & Takeaway", description: "Pelanggan chat nomor kafe untuk booking meja atau pesan bawa pulang." },
    { value: "marketplace", icon: "🛵", title: "Aplikasi Pesan Antar Online (Food Delivery)", description: "Pesanan masuk lewat platform pengantaran daring dengan potongan komisi transaksi." },
    { value: "social_media", icon: "📸", title: "Instagram / TikTok Promo", description: "Pelanggan melihat konten menu baru dan promo dari media sosial kafe." },
    { value: "repeat_order", icon: "🔁", title: "Pelanggan Tetap / Member Kafe", description: "Pelanggan rutin harian yang bekerja secara remote atau pertemuan berkala." },
  ],
  katering_event: [
    { value: "whatsapp", icon: "💬", title: "Chat WhatsApp Konsultasi Menu Acara", description: "Calon pengantin / panitia event menanyakan pricelist paket dan menu." },
    { value: "form_online", icon: "📝", title: "Formulir Booking Tanggal Acara", description: "Pemesanan paket katering dan kunci tanggal lewat formulir online." },
    { value: "quotation", icon: "📋", title: "Permintaan Penawaran Resmi (Proposal)", description: "Perusahaan atau instansi meminta rincian penawaran prasmanan resmi." },
    { value: "datang_langsung", icon: "🍱", title: "Test Food Langsung di Dapur", description: "Klien berkunjung untuk mencicipi rasa menu sebelum membayar DP." },
    { value: "repeat_order", icon: "🔁", title: "Langganan Katering Kantor / Acara", description: "Pesanan rutin makan siang kantor atau acara syukuran keluarga berkala." },
  ],
  bakery_kue: [
    { value: "datang_langsung", icon: "🍞", title: "Beli Langsung di Toko Roti", description: "Pelanggan memilih roti dan cake ready stock langsung di display etalase." },
    { value: "whatsapp", icon: "🎂", title: "Chat WhatsApp Pre-Order Custom Cake", description: "Pemesanan kue ulang tahun dengan request dekorasi, tulisan lilin, dan ukuran." },
    { value: "social_media", icon: "📸", title: "Instagram / TikTok Showcase", description: "Calon pembeli melihat galeri foto kue tart dan hampers hari raya." },
    { value: "marketplace", icon: "🛵", title: "Layanan Pesan Antar Online", description: "Pesanan kilat produk roti atau kudapan melalui aplikasi pengantaran makanan." },
    { value: "repeat_order", icon: "🔁", title: "Langganan Ulang Tahun Rutin", description: "Pelanggan lama yang memesan kembali untuk momen ulang tahun keluarga berikutnya." },
  ],
  rental_kendaraan: [
    { value: "whatsapp", icon: "💬", title: "Chat WhatsApp Admin Rental", description: "Penyewa menanyakan ketersediaan mobil/motor dan syarat lepas kunci." },
    { value: "website", icon: "🚗", title: "Website Katalog Armada & Cek Tanggal", description: "Penyewa melihat foto armada, spesifikasi, dan cek ketersediaan tanggal kosong." },
    { value: "datang_langsung", icon: "🏢", title: "Datang Langsung ke Pool / Garasi", description: "Penyewa datang mendadak ke kantor pool untuk ambil unit ready." },
    { value: "booking_awal", icon: "🔒", title: "Reservasi Tanggal Jauh Hari (DP)", description: "Penyewa mengunci unit untuk tanggal liburan atau mudik dengan uang muka." },
    { value: "repeat_order", icon: "🔁", title: "Langganan Korporat / Penyewa Tetap", description: "Kontrak sewa bulanan perusahaan atau pelanggan perorangan setia." },
  ],
  sewa_camping_outdoor: [
    { value: "whatsapp", icon: "💬", title: "Chat WhatsApp Admin Sewa", description: "Penyewa menanyakan ketersediaan tenda dome, carrier, dan paket alat camping." },
    { value: "website", icon: "⛺", title: "Website Katalog Alat & Cek Ketersediaan", description: "Penyewa mengecek spesifikasi tenda, kapasitas orang, dan ketersediaan tanggal booking." },
    { value: "datang_langsung", icon: "🏬", title: "Datang ke Basecamp / Toko Outdoor", description: "Penyewa datang langsung mengambil perlengkapan camping dan menitipkan identitas jaminan." },
    { value: "booking_awal", icon: "🔒", title: "Reservasi Tanggal Jauh Hari (DP)", description: "Penyewa mengunci paket tenda untuk agenda pendakian akhir pekan atau libur panjang." },
    { value: "repeat_order", icon: "🔁", title: "Komunitas Pecinta Alam / Pelanggan Tetap", description: "Kelompok pendaki atau komunitas pecinta alam yang rutin menyewa peralatan secara berkala." },
  ],
  kontraktor_sipil: [
    { value: "quotation", icon: "📐", title: "Dokumen Tender & Permintaan Penawaran (RFQ)", description: "Owner proyek meminta proposal teknis, estimasi RAB, dan dokumen portofolio." },
    { value: "whatsapp", icon: "💬", title: "Chat WhatsApp Diskusi Proyek Awal", description: "Konsultasi denah desain dan perkiraan budget awal renovasi / bangun." },
    { value: "sales_langsung", icon: "🤝", title: "Survei Lokasi & Meeting Tatap Muka", description: "Tim teknis mengukur lapangan dan berdiskusi langsung di lokasi proyek." },
    { value: "website", icon: "🏛️", title: "Website Portofolio Resmi", description: "Calon klien melihat dokumentasi hasil pekerjaan proyek sebelum mengontak." },
    { value: "repeat_order", icon: "🔁", title: "Rekomendasi Klien Lama & Arsitek", description: "Proyek baru didapat dari reputasi kepuasan klien sebelumnya." },
  ],
  brand_fashion: [
    { value: "marketplace", icon: "🛍️", title: "Marketplace (Shopee / Tokopedia)", description: "Penjualan online utama lewat toko resmi di aplikasi marketplace." },
    { value: "whatsapp", icon: "💬", title: "Chat WhatsApp CS Toko", description: "Calon pembeli menanyakan ukuran (size chart), warna, dan cara transfer." },
    { value: "social_media", icon: "👗", title: "TikTok Live & Instagram Shop", description: "Trafik belanja didorong siaran langsung dan katalog lookbook medsos." },
    { value: "website", icon: "🌐", title: "Website Brand Toko Mandiri", description: "Pelanggan checkout mandiri di website resmi tanpa biaya potongan komisi." },
    { value: "repeat_order", icon: "🔁", title: "Repeat Order Drop Koleksi Baru", description: "Pelanggan setia yang selalu membeli saat rilis produk baru." },
  ],
  klinik_spesialis: [
    { value: "booking_awal", icon: "🦷", title: "Reservasi Jadwal Janji Temu Dokter", description: "Pasien memilih slot jam pemeriksaan dokter sebelum datang ke klinik." },
    { value: "whatsapp", icon: "💬", title: "Chat WhatsApp Resepsionis Klinik", description: "Pasien menanyakan jadwal praktek dokter spesialis dan estimasi biaya." },
    { value: "datang_langsung", icon: "🏥", title: "Pasien Walk-In Tanpa Janji Temu", description: "Pasien datang langsung ke klinik dan mengantre di ruang tunggu." },
    { value: "website", icon: "🌐", title: "Portal Janji Temu Web Klinik", description: "Sistem reservasi mandiri pasien dengan kalender jadwal dokter terintegrasi." },
    { value: "repeat_order", icon: "🔁", title: "Pasien Kontrol Perawatan Berkala", description: "Kunjungan rutin untuk kontrol behel, pembersihan karang gigi, atau rawat jalan." },
  ],
  residensial_cluster: [
    { value: "whatsapp", icon: "💬", title: "Chat WhatsApp Tim Sales Perumahan", description: "Calon pembeli bertanya simulasi angsuran KPR, tipe rumah, dan harga promo." },
    { value: "website", icon: "🏡", title: "Website Showcase Cluster & Siteplan", description: "Calon pembeli mengeksplor denah kavling, spesifikasi bangunan, dan lokasi." },
    { value: "datang_langsung", icon: "🚗", title: "Kunjungan Langsung ke Rumah Contoh", description: "Calon pembeli datang langsung ke lokasi proyek untuk melihat unit jadi." },
    { value: "social_media", icon: "📱", title: "Iklan Medsos (Meta / TikTok Ads)", description: "Prospek baru masuk dari klik iklan promosi rumah subsidi atau cluster komersil." },
    { value: "booking_awal", icon: "🔒", title: "Pembayaran Booking Fee Kunci Unit", description: "Calon pembeli mentransfer uang tanda jadi untuk mengamankan kavling pilihan." },
  ],
  kos_coliving: [
    { value: "whatsapp", icon: "💬", title: "Chat WhatsApp Pengelola / Induk Semang", description: "Calon penyewa menanyakan sisa kamar kosong, fasilitas, harga bulanan, dan jam malam." },
    { value: "social_media", icon: "📱", title: "Instagram / TikTok Room Tour", description: "Calon penghuni melihat video tur kamar estetik dan suasana kost dari media sosial." },
    { value: "datang_langsung", icon: "🚪", title: "Survei Kamar Langsung di Lokasi", description: "Calon penyewa datang langsung ke lokasi kost untuk mengecek kondisi kamar dan fasilitas." },
    { value: "website", icon: "🌐", title: "Website Showcase & Cek Kamar Kosong", description: "Calon penghuni melihat foto tipe kamar, fasilitas lengkap, dan status ketersediaan live." },
    { value: "repeat_order", icon: "🔁", title: "Perpanjangan Masa Sewa Penghuni Lama", description: "Penghuni kamar yang rutin memperpanjang masa sewa bulanan atau tahunan." },
  ],
  umroh_haji: [
    { value: "whatsapp", icon: "💬", title: "Chat WhatsApp Konsultan Umroh", description: "Calon jamaah atau keluarga menanyakan jadwal keberangkatan dan fasilitas hotel." },
    { value: "website", icon: "🕋", title: "Website Brosur Paket Ibadah Resmi", description: "Jamaah mengecek legalitas izin PPIU Kemenag, itinerary, dan sisa seat." },
    { value: "form_online", icon: "📝", title: "Pendaftaran & Upload Berkas Paspor Online", description: "Jamaah mengisi biodata dan mengirim foto paspor/buku nikah digital." },
    { value: "datang_langsung", icon: "🏛️", title: "Datang ke Kantor Cabang Biro", description: "Jamaah mendaftar langsung di kantor perwakilan dan membayar DP tunai." },
    { value: "repeat_order", icon: "🔁", title: "Alumni Jamaah & Rekomendasi Keluarga", description: "Pendaftaran baru dari rekomendasi jamaah yang puas dengan bimbingan ibadah." },
  ],
  wedding_organizer: [
    { value: "whatsapp", icon: "💬", title: "Chat WhatsApp Konsultasi Wedding", description: "Calon pengantin menanyakan paket wedding organizer, rekanan gedung, dan harga." },
    { value: "social_media", icon: "📸", title: "Instagram / TikTok Showcase Resepsi", description: "Portofolio visual dekorasi pelaminan dan video highlight pernikahan." },
    { value: "booking_awal", icon: "💍", title: "Kunci Tanggal Acara (DP Booking)", description: "Calon pengantin mentransfer DP uang muka untuk mengunci tanggal pernikahan." },
    { value: "website", icon: "🌐", title: "Website Portofolio & Undangan Digital", description: "Calon klien mempelajari rincian paket vendor dan melihat ulasan pengantin." },
    { value: "repeat_order", icon: "🔁", title: "Rekomendasi Keluarga & Kerabat", description: "Keluarga atau sahabat pengantin yang menggunakan kembali jasa WO untuk acara keluarga." },
  ],
  digital_marketing_agency: [
    { value: "quotation", icon: "📋", title: "Pengajuan Permintaan Proposal (RFP)", description: "Calon klien korporat mengajukan brief kampanye pemasaran atau pembuatan software." },
    { value: "whatsapp", icon: "💬", title: "Diskusi WhatsApp Tim Sales & Client", description: "Diskusi lingkup kerja, jadwal kickoff meeting, dan penawaran retainer." },
    { value: "website", icon: "🏛️", title: "Website Portofolio & Studi Kasus Agensi", description: "Calon klien membaca studi kasus hasil kenaikan omset dan portofolio klien terdahulu." },
    { value: "sales_langsung", icon: "🤝", title: "Presentasi Pitching Tatap Muka / Zoom", description: "Tim agensi mempresentasikan konsep strategi langsung ke jajaran direksi klien." },
    { value: "repeat_order", icon: "🔁", title: "Perpanjangan Kontrak Retainer Bulanan", description: "Klien lama yang puas memperpanjang kontrak layanan retainer bulan demi bulan." },
  ],
  laundry_kiloan_satuan: [
    { value: "datang_langsung", icon: "🧺", title: "Drop Pakaian Langsung di Kasir Outlet", description: "Pelanggan membawa cucian kotor ke gerai dan ditimbang di timbangan kasir." },
    { value: "whatsapp", icon: "🛵", title: "Pesan Antar-Jemput (Pick Up) via WA", description: "Pelanggan mengirim lokasi penjemputan cucian kotor via chat WhatsApp." },
    { value: "repeat_order", icon: "🔁", title: "Langganan Cucian Rutin Berkala", description: "Pelanggan rumah tangga, mahasiswa, atau pekerja indekos yang mencuci pakaian secara rutin setiap pekan." },
  ],
  klinik_gigi: [
    { value: "booking_awal", icon: "🦷", title: "Reservasi Jam Janji Temu Dokter Gigi", description: "Pasien booking slot jam perawatan tambal, scaling, atau behel sebelum datang." },
    { value: "whatsapp", icon: "💬", title: "Chat WhatsApp Resepsionis Klinik", description: "Pasien menanyakan praktek dokter spesialis dan estimasi biaya tindakan." },
    { value: "datang_langsung", icon: "🏥", title: "Pasien Walk-In Mengantre Langsung", description: "Pasien darurat sakit gigi datang langsung dan mengantre di ruang tunggu." },
    { value: "repeat_order", icon: "🔁", title: "Pasien Kontrol Perawatan Berkala", description: "Kunjungan rutin pembersihan karang gigi 6 bulanan atau kontrol rutin kawat gigi." },
  ],
};

// Helper filter kanal transaksi masuk yang relevan per model bisnis & sub-sektor
export function getFilteredCustomerFlow(
  businessType: BusinessType | null,
  subSector?: string
): OptionItem<CustomerFlowChannel>[] {
  if (subSector && SUBSECTOR_CUSTOMER_FLOWS[subSector]) {
    return SUBSECTOR_CUSTOMER_FLOWS[subSector];
  }

  const channelMap: Record<BusinessType, CustomerFlowChannel[]> = {
    kuliner_fnb: ["datang_langsung", "whatsapp", "marketplace", "website", "social_media", "repeat_order"],
    properti_aset: ["whatsapp", "website", "social_media", "datang_langsung", "booking_awal", "repeat_order"],
    travel_wisata: ["whatsapp", "website", "social_media", "datang_langsung", "form_online", "repeat_order"],
    edukasi_bimbel: ["whatsapp", "form_online", "social_media", "datang_langsung", "website", "repeat_order"],
    jasa_b2b: ["quotation", "whatsapp", "sales_langsung", "website", "form_online", "repeat_order"],
    retail_d2c: ["marketplace", "whatsapp", "social_media", "website", "datang_langsung", "repeat_order"],
    booking_jasa: ["booking_awal", "whatsapp", "social_media", "website", "datang_langsung", "repeat_order"],
    klinik_kesehatan: ["booking_awal", "whatsapp", "datang_langsung", "website", "repeat_order"],
    event_organizer: ["whatsapp", "quotation", "social_media", "website", "booking_awal", "repeat_order"],
    agensi_kreatif: ["quotation", "whatsapp", "website", "social_media", "sales_langsung", "repeat_order"],
    jasa_cuci_laundry: ["datang_langsung", "whatsapp", "social_media", "repeat_order"],
    rental_aset: ["whatsapp", "booking_awal", "website", "social_media", "datang_langsung", "repeat_order"],
    operasional_lapangan: ["whatsapp", "datang_langsung", "sales_langsung", "quotation", "repeat_order"],
    lainnya: [
      "whatsapp",
      "datang_langsung",
      "social_media",
      "marketplace",
      "website",
      "form_online",
      "booking_awal",
      "quotation",
      "sales_langsung",
      "repeat_order",
    ],
  };

  if (!businessType || !channelMap[businessType]) {
    return CUSTOMER_FLOW_OPTIONS;
  }

  const allowed = channelMap[businessType];
  return CUSTOMER_FLOW_OPTIONS.filter((item) => allowed.includes(item.value));
}

export const CUSTOMER_FLOW_OPTIONS: OptionItem<CustomerFlowChannel>[] = [
  { value: "whatsapp", icon: "💬", title: "Chat WhatsApp", description: "Mayoritas closing dan diskusi terjadi di chat WhatsApp admin." },
  { value: "datang_langsung", icon: "🏬", title: "Datang Langsung", description: "Pelanggan berkunjung langsung ke gerai, toko fisik, atau kantor." },
  { value: "social_media", icon: "📱", title: "Instagram / TikTok", description: "Mendapat prospek melalui DM atau tautan bio media sosial." },
  { value: "marketplace", icon: "🛒", title: "Marketplace / Platform Pesan-Antar Daring", description: "Transaksi lewat Shopee, Tokopedia, GoFood, GrabFood, dsb." },
  { value: "website", icon: "🌐", title: "Website Resmi", description: "Pelanggan mencari di Google dan melihat profil resmi perusahaan." },
  { value: "form_online", icon: "📝", title: "Formulir Pendaftaran", description: "Pelanggan mengisi Google Forms atau formulir online di internet." },
  { value: "booking_awal", icon: "📅", title: "Reservasi Terlebih Dahulu", description: "Pelanggan wajib pesan waktu janji temu sebelum dilayani." },
  { value: "quotation", icon: "📋", title: "Minta Surat Penawaran (RFQ)", description: "Pelanggan korporat mengirim permintaan harga resmi sebelum deal." },
  { value: "sales_langsung", icon: "🤝", title: "Sales / Tim Menawarkan", description: "Tim pemasaran proaktif menghubungi atau mendatangi calon klien." },
  { value: "repeat_order", icon: "🔁", title: "Pelanggan Langganan Lama", description: "Sebagian besar omset berasal dari pelanggan setia yang memesan ulang." },
];

export const SUBSECTOR_ORDER_PROCESSING: Record<string, { value: OrderProcessingMethod; label: string; desc: string }[]> = {
  kafe_resto: [
    { value: "catat_buku", label: "Nota Kertas & Bon Dapur Fisik", desc: "Pelayan mencatat pesanan meja di kertas bon dan dioper ke bagian barista/dapur." },
    { value: "manual_whatsapp", label: "Chat WhatsApp & Catatan Kasir", desc: "Pesanan takeaway dan reservasi meja dicatat staf di chat WhatsApp." },
    { value: "software_khusus", label: "Aplikasi POS Kasir F&B (Moka/Majoo/dsb)", desc: "Sudah menggunakan POS tablet kasir namun belum terhubung menu QR mandiri." },
    { value: "sistem_internal", label: "Menu QR Terintegrasi Kasir & Printer Dapur", desc: "Tamu scan meja, pesanan otomatis tercetak di bar barista dan kasir." },
    { value: "campuran", label: "Campuran Platform Pesan-Antar, POS Tablet & Bon Kertas", desc: "Pesanan terpecah antara tablet pemesanan online, kasir konter, dan kertas bon." },
  ],
  rental_kendaraan: [
    { value: "manual_whatsapp", label: "Manual Chat WA & Cek KTP di Galeri", desc: "Penyewa kirim foto KTP di WhatsApp, admin cek jadwal armada di ingatan/buku." },
    { value: "catat_buku", label: "Buku Surat Perjanjian Sewa Kertas", desc: "Kontrak sewa lepas kunci dan ceklis fisik foto kondisi bensin ditulis manual." },
    { value: "excel_sheets", label: "Spreadsheet Kalender Armada Mobil", desc: "Jadwal keluar-masuk armada dicatat manual di baris Google Sheets." },
    { value: "software_khusus", label: "Software Rental Pihak Ketiga", desc: "Sudah menggunakan software rental eksternal berbayar bulanan." },
    { value: "sistem_internal", label: "Sistem Kalender Rental, Verifikasi KTP & e-Kontrak", desc: "Jadwal armada real-time, arsip KTP otomatis aman, dan kontrak digital." },
    { value: "campuran", label: "Campuran Chat WA, Kertas Perjanjian & Spreadsheet", desc: "Data penyewa terpecah antara chat WhatsApp, kertas sewa, dan spreadsheet." },
  ],
  kontraktor_sipil: [
    { value: "manual_whatsapp", label: "Kirim File PDF RAB & Chat Negosiasi di WA", desc: "Draft estimasi penawaran harga dikirim via WA dan negosiasi chat." },
    { value: "excel_sheets", label: "Spreadsheet RAB, Opname Progres & Bon Lapangan", desc: "Rincian volume proyek dan rekap bon kasbon mandor dicatat di Excel." },
    { value: "catat_buku", label: "Buku Catatan Kasbon Mandor & Nota Toko Fisik", desc: "Mandor mencatat belanja material di bon kuitansi fisik toko bangunan." },
    { value: "sistem_internal", label: "Sistem Manajemen Proyek, SPK & Termin Otomatis", desc: "Sistem pelacak progres fisik kurva S, pencairan termin, dan kontrol kas bon." },
    { value: "campuran", label: "Campuran Chat WA, Spreadsheet Excel & Bon Kertas", desc: "Laporan proyek terpecah antara foto di grup WA dan file Excel kantor." },
  ],
  kos_coliving: [
    { value: "manual_whatsapp", label: "Manual Chat WhatsApp & Cek Mutasi Bank", desc: "Admin kirim foto kamar manual di WA dan cek mutasi transfer sewa satu per satu." },
    { value: "excel_sheets", label: "Spreadsheet Okupansi & Jatuh Tempo Sewa", desc: "Daftar nomor kamar, nama penghuni, dan tanggal jatuh tempo dicatat di Excel/Sheets." },
    { value: "catat_buku", label: "Buku Induk Kertas & Catatan Meteran Listrik", desc: "Daftar penghuni dan angka meteran listrik dicatat manual di buku tulis pengelola." },
    { value: "software_khusus", label: "Aplikasi Manajemen Kost Pihak Ketiga", desc: "Sudah menggunakan aplikasi pencatat kos atau listing sewa eksternal berbayar." },
    { value: "sistem_internal", label: "Website Showcase Mandiri & Tagihan WA Otomatis", desc: "Sudah memiliki sistem web katalog kamar dan bot penagihan sewa otomatis." },
    { value: "campuran", label: "Campuran Chat WA, Kuitansi Kertas & Spreadsheet", desc: "Pencatatan tersebar antara chat penyewa, kuitansi fisik, dan spreadsheet." },
  ],
};

export const BUSINESS_SPECIFIC_ORDER_PROCESSING: Record<BusinessType, { value: OrderProcessingMethod; label: string; desc: string }[]> = {
  kuliner_fnb: [
    { value: "manual_whatsapp", label: "Chat WhatsApp & Catatan Kasir", desc: "Admin melayani pesanan katering dan delivery manual via chat WhatsApp." },
    { value: "catat_buku", label: "Nota Kertas & Bon Dapur Fisik", desc: "Kasir mencatat di kertas nota bon dan dioper langsung ke bagian dapur." },
    { value: "software_khusus", label: "Aplikasi POS Kasir F&B (Moka/Majoo/dsb)", desc: "Sudah menggunakan POS tablet kasir namun belum terhubung menu QR mandiri." },
    { value: "sistem_internal", label: "Menu QR Mandiri / Web Order Sendiri", desc: "Pelanggan scan meja atau order katering langsung dari sistem web toko." },
    { value: "campuran", label: "Campuran Layanan Pesan Antar Online, Kasir Fisik & Chat WA", desc: "Pesanan terpecah antara tablet pesan antar online, kasir toko, dan chat WA." },
  ],
  properti_aset: [
    { value: "manual_whatsapp", label: "Manual Chat WhatsApp & Kirim PDF", desc: "Sales mengirim brosur PDF, foto unit, dan simulasi angsuran via WA." },
    { value: "excel_sheets", label: "Rekap Status Kavling/Kamar di Spreadsheet", desc: "Status unit terjual/tersedia dan jadwal survei dicatat di Google Sheets." },
    { value: "software_khusus", label: "Software Manajemen Properti Pihak Ketiga", desc: "Menggunakan aplikasi PMS sewa atau listing properti eksternal." },
    { value: "sistem_internal", label: "Website Showcase Mandiri & KPR Real-Time", desc: "Sudah ada web interaktif dengan status unit real-time dan kalkulator KPR." },
    { value: "campuran", label: "Campuran Chat Sales, Medsos & Spreadsheet", desc: "Data calon pembeli dan penyewa tersebar di WhatsApp tim marketing." },
  ],
  travel_wisata: [
    { value: "manual_whatsapp", label: "Rekap Chat WhatsApp & Berkas PDF", desc: "Admin mengecek sisa kursi dan membalas jadwal keberangkatan di chat WA." },
    { value: "excel_sheets", label: "Spreadsheet Kuota Jamaah & Status Cicilan", desc: "Manifest peserta dan status pelunasan dicatat di baris Google Sheets." },
    { value: "software_khusus", label: "Software Biro Travel / Reservasi Tiket", desc: "Menggunakan software biro travel atau reservasi tiket pihak ketiga." },
    { value: "sistem_internal", label: "Portal Web Pendaftaran & Booking Seat Live", desc: "Jamaah mendaftar, memilih kamar, dan bayar DP langsung lewat sistem web." },
    { value: "campuran", label: "Campuran Brosur Medsos, Chat Agen & Excel", desc: "Pendaftaran tersebar antara agen lapangan, medsos, dan dokumen manual." },
  ],
  edukasi_bimbel: [
    { value: "manual_whatsapp", label: "Pendaftaran via Chat WA & Cek Transfer", desc: "Admin membalas biodata siswa di WA dan cek mutasi transfer satu per satu." },
    { value: "catat_buku", label: "Buku Induk Fisik & Kartu SPP Kertas", desc: "Absensi siswa dan kartu iuran bulanan dicatat di kartu/buku fisik lembaga." },
    { value: "excel_sheets", label: "Rekap Siswa & Tagihan SPP di Spreadsheet", desc: "Jadwal tentor, kelas, dan status bayar SPP diinput manual di Excel/Sheets." },
    { value: "software_khusus", label: "Aplikasi Manajemen Sekolah / Bimbel", desc: "Sudah menggunakan aplikasi e-learning atau sistem akademik sederhana." },
    { value: "sistem_internal", label: "Portal PSB Online & Notifikasi SPP Otomatis", desc: "Sistem terpadu untuk registrasi siswa baru dan auto-reminder tagihan SPP." },
    { value: "campuran", label: "Campuran Chat WA, Kertas Form & Excel", desc: "Data pendaftaran terpecah antara chat admin dan rekap spreadsheet." },
  ],
  jasa_b2b: [
    { value: "manual_whatsapp", label: "Draft Dokumen & Chat WhatsApp", desc: "Penyusunan surat penawaran harga dan negosiasi via chat admin/sales." },
    { value: "excel_sheets", label: "Rekap Spreadsheet Pipeline Prospek", desc: "Daftar prospek tender dan status follow-up dicatat di baris Excel/Sheets." },
    { value: "software_khusus", label: "Software CRM / Pipeline B2B", desc: "Sudah menggunakan tools pelacak prospek atau software manajemen proposal." },
    { value: "sistem_internal", label: "Sistem Internal / Portal Perusahaan", desc: "Memiliki portal klien atau sistem operasional terpusat milik sendiri." },
    { value: "campuran", label: "Campuran Dokumen, Chat, & File Spreadsheet", desc: "Alur masih terpecah antara chat WhatsApp, email, dan arsip lokal." },
  ],
  retail_d2c: [
    { value: "manual_whatsapp", label: "Manual di Chat WhatsApp", desc: "Admin membaca chat, mengecek bukti transfer bank, dan mencatat sendiri." },
    { value: "excel_sheets", label: "Dicatat di Excel / Google Sheets", desc: "Data pesanan direkap manual oleh staf ke dalam baris spreadsheet." },
    { value: "software_khusus", label: "Aplikasi Kasir / POS Toko", desc: "Sudah menggunakan POS kasir toko atau sistem manajemen inventori berbayar." },
    { value: "sistem_internal", label: "Website Toko / Sistem Gudang Sendiri", desc: "Pesanan masuk dan terdata otomatis lewat website toko mandiri." },
    { value: "campuran", label: "Campuran Marketplace & Chat Manual", desc: "Sebagian di platform marketplace online, sebagian via chat WhatsApp." },
  ],
  booking_jasa: [
    { value: "manual_whatsapp", label: "Buku Agenda / Chat WhatsApp", desc: "Admin mencatat janji temu di buku kasir fisik atau chat WA satu per satu." },
    { value: "excel_sheets", label: "Kalender Digital / Spreadsheet", desc: "Jadwal diinput ke Google Calendar atau spreadsheet tanpa integrasi pembayaran." },
    { value: "software_khusus", label: "Aplikasi POS Reservasi Khusus", desc: "Sudah menggunakan software kasir khusus salon, klinik, atau dokter." },
    { value: "sistem_internal", label: "Sistem Booking Web Mandiri", desc: "Pelanggan sudah bisa pilih tanggal & jam langsung di portal reservasi." },
    { value: "campuran", label: "Campuran Chat, Telepon, & Buku Catatan", desc: "Pencatatan tersebar antara chat admin, telepon pelanggan, dan buku kasir." },
  ],
  rental_aset: [
    { value: "manual_whatsapp", label: "Manual Chat WA & Cek KTP Manual", desc: "Penyewa kirim foto KTP di WhatsApp, admin cek jadwal armada di catatan/ingatan." },
    { value: "excel_sheets", label: "Spreadsheet Kalender Armada & Unit", desc: "Jadwal keluar-masuk mobil/alat dicatat manual di baris Google Sheets." },
    { value: "catat_buku", label: "Buku Surat Perjanjian Sewa Kertas", desc: "Surat perjanjian sewa dan checklist kondisi lecet fisik ditulis tangan di lembar kertas." },
    { value: "software_khusus", label: "Software Rental Pihak Ketiga", desc: "Sudah menggunakan software rental kendaraan atau manajemen aset eksternal." },
    { value: "sistem_internal", label: "Sistem Manajemen Rental Mandiri", desc: "Sudah memiliki sistem kalender armada, verifikasi KTP, dan kontrak sewa digital." },
    { value: "campuran", label: "Campuran WhatsApp, Lembar Sewa & Excel", desc: "Alur tersebar antara chat penyewa, lembar surat sewa, dan spreadsheet." },
  ],
  operasional_lapangan: [
    { value: "catat_buku", label: "Buku Kas Fisik & Kuitansi Kertas Mandor", desc: "Mandor atau staf lapangan mencatat belanja di nota kuitansi dan buku tulis." },
    { value: "manual_whatsapp", label: "Kirim Foto Struk di Grup Chat WA", desc: "Mandor mengirim foto nota kas keluar ke admin via grup WhatsApp setiap sore." },
    { value: "excel_sheets", label: "Rekap Bulanan di Excel / Google Sheets", desc: "Semua bon fisik baru dipindahkan staf ke komputer saat tutup buku bulanan." },
    { value: "software_khusus", label: "Software Akuntansi / Stok Lapangan", desc: "Menggunakan software inventori atau pembukuan gudang tertentu." },
    { value: "campuran", label: "Campuran Kertas, WhatsApp, & Spreadsheet", desc: "Alur pencatatan masih terpisah-pisah di berbagai media lapangan." },
  ],
  klinik_kesehatan: [
    { value: "manual_whatsapp", label: "Chat WhatsApp & Catatan Resepsionis", desc: "Resepsionis mencatat janji temu dan data pasien di obrolan WA atau buku agenda." },
    { value: "excel_sheets", label: "Spreadsheet Jadwal Dokter & Rekap Pasien", desc: "Jadwal praktek dokter spesialis dan nomor rekam medis direkap di Google Sheets." },
    { value: "catat_buku", label: "Berkas Map Rekam Medis Fisik & Kuitansi Kertas", desc: "Catatan riwayat medis dan kuitansi obat ditulis tangan oleh dokter/kasir." },
    { value: "software_khusus", label: "Software Klinik / RME Khusus", desc: "Sudah menggunakan software rekam medis elektronik atau SIMKlinik tertentu." },
    { value: "sistem_internal", label: "Sistem Antrean & RME Digital Terpadu", desc: "Sudah memiliki sistem reservasi web, rekam medis digital, dan kasir farmasi terpadu." },
    { value: "campuran", label: "Campuran WhatsApp, Berkas Map & Spreadsheet", desc: "Alur masih terpecah antara chat pasien, map rekam medis kertas, dan spreadsheet." },
  ],
  event_organizer: [
    { value: "manual_whatsapp", label: "Chat WhatsApp & Grup Vendor", desc: "Koordinasi rundown acara dan penagihan DP masih di grup chat WhatsApp." },
    { value: "excel_sheets", label: "Spreadsheet Rundown, Budget & Tamu", desc: "Rincian biaya vendor, jadwal menit-ke-menit, dan daftar tamu di baris Excel." },
    { value: "catat_buku", label: "Buku Tamu Fisik & Cetak Rundown Kertas", desc: "Rundown dibagikan dalam bentuk kertas printout dan buku tamu ditulis tangan." },
    { value: "sistem_internal", label: "Sistem Manajemen Event & RSVP Digital", desc: "Memiliki portal web checklist vendor, QR buku tamu, dan invoice termin otomatis." },
    { value: "campuran", label: "Campuran Grup WA, Spreadsheet & Print Kertas", desc: "Data event terpecah antara chat pengantin/klien, printout rundown, dan Excel." },
  ],
  agensi_kreatif: [
    { value: "manual_whatsapp", label: "Brief & Revisi Manual di WhatsApp", desc: "Revisi desain/video dan brief campaign dibahas di grup chat WhatsApp." },
    { value: "excel_sheets", label: "Spreadsheet Task Board & Invoice Retainer", desc: "Jadwal posting konten dan rekap tagihan retainer dicatat di Google Sheets." },
    { value: "software_khusus", label: "Software Project Management (Trello/Notion)", desc: "Sudah menggunakan tools manajemen tugas pihak ketiga namun belum terintegrasi kasir." },
    { value: "sistem_internal", label: "Client Portal & Sistem Invoice Terpadu", desc: "Klien memiliki portal dashboard review draft dan invoice diterbitkan otomatis." },
    { value: "campuran", label: "Campuran Chat WA, Google Drive & Spreadsheet", desc: "Alur kerja terpecah antara WhatsApp, folder Drive, dan file Excel tagihan." },
  ],
  jasa_cuci_laundry: [
    { value: "catat_buku", label: "Nota Kertas Bon & Timbangan Manual", desc: "Kasir menulis berat timbangan di nota kertas rangkap dan ditempel di plastik baju." },
    { value: "manual_whatsapp", label: "Chat WhatsApp & Kabar Cucian Selesai", desc: "Kasir mengabari pelanggan satu per satu via chat WhatsApp saat cucian selesai." },
    { value: "excel_sheets", label: "Rekap Kas Harian di Spreadsheet", desc: "Total kiloan dan setoran kasir baru dipindahkan ke Excel setiap malam." },
    { value: "software_khusus", label: "Aplikasi POS Kasir Laundry Khusus", desc: "Sudah menggunakan aplikasi kasir laundry tablet Android." },
    { value: "sistem_internal", label: "Sistem POS Kasir, Barcode Rak & Auto-WA", desc: "Timbangan terhubung cetak struk barcode rak dan notifikasi WA terkirim otomatis." },
    { value: "campuran", label: "Campuran Bon Kertas, WhatsApp & Aplikasi", desc: "Sebagian nota dicatat di kertas bon dan sebagian dihubungi via chat WA." },
  ],
  lainnya: [
    { value: "manual_whatsapp", label: "Manual di Chat WhatsApp", desc: "Admin membaca chat, mengecek transfer manual, dan mencatat sendiri." },
    { value: "excel_sheets", label: "Dicatat di Excel / Google Sheets", desc: "Data pesanan direkap manual oleh staf ke dalam baris spreadsheet." },
    { value: "catat_buku", label: "Dicatat di Buku Tulis Fisik", desc: "Pencatatan nota menggunakan buku kas, bon kertas, atau faktur fisik." },
    { value: "software_khusus", label: "Menggunakan Software Khusus", desc: "Sudah menggunakan POS kasir, Accurate, Moka, atau tools berbayar." },
    { value: "sistem_internal", label: "Sudah Menggunakan Sistem Internal", desc: "Memiliki software atau web internal perusahaan yang sudah berjalan." },
    { value: "campuran", label: "Campuran Beberapa Cara", desc: "Sebagian di sistem, sebagian di WhatsApp, dan sebagian di spreadsheet." },
  ],
};

export function getFilteredOrderProcessing(
  businessType: BusinessType | null,
  subSector?: string
): { value: OrderProcessingMethod; label: string; desc: string }[] {
  if (subSector && SUBSECTOR_ORDER_PROCESSING[subSector]) {
    return SUBSECTOR_ORDER_PROCESSING[subSector];
  }
  if (!businessType || !BUSINESS_SPECIFIC_ORDER_PROCESSING[businessType]) {
    return BUSINESS_SPECIFIC_ORDER_PROCESSING.lainnya;
  }
  return BUSINESS_SPECIFIC_ORDER_PROCESSING[businessType];
}


export const ORDER_PROCESSING_OPTIONS = BUSINESS_SPECIFIC_ORDER_PROCESSING.lainnya;

export const DIGITAL_MATURITY_OPTIONS: { level: DigitalMaturityLevel; title: string; desc: string }[] = [
  { level: 1, title: "1. Hampir Semuanya Manual", desc: "Semua alur bergantung pada buku fisik, ingatan staf, dan komunikasi lisan." },
  { level: 2, title: "2. Sebagian Sudah Digital", desc: "Sudah menggunakan chat WhatsApp dan transfer bank, namun rekap masih manual." },
  { level: 3, title: "3. Menggunakan Beberapa Tools Terpisah", desc: "Menggunakan Excel, Google Forms, dan WhatsApp tanpa saling terhubung." },
  { level: 4, title: "4. Sudah Menggunakan Software Tertentu", desc: "Sudah memiliki sistem POS atau akuntansi, namun butuh kustomisasi." },
  { level: 5, title: "5. Sudah Cukup Terintegrasi", desc: "Sistem sudah digital, butuh automasi tingkat lanjut atau web portal mandiri." },
];

export const BUSINESS_SPECIFIC_TOOLS: Record<BusinessType, { value: CurrentTool; label: string }[]> = {
  kuliner_fnb: [
    { value: "pos", label: "POS / Kasir Kafe (Moka, Majoo, Pawoon, dsb)" },
    { value: "marketplace", label: "Platform Pesan-Antar Makanan (GoFood, GrabFood, ShopeeFood)" },
    { value: "whatsapp", label: "WhatsApp / WA Business Gerai" },
    { value: "excel", label: "Microsoft Excel (Rekap Kas Harian / HPP)" },
    { value: "google_sheets", label: "Google Sheets" },
    { value: "inventory_system", label: "Sistem Stok Bahan Baku / Dapur" },
    { value: "accounting_software", label: "Software Pembukuan / Akuntansi" },
    { value: "lainnya", label: "Tools Lainnya" },
  ],
  properti_aset: [
    { value: "whatsapp", label: "WhatsApp / WA Business Tim Marketing" },
    { value: "instagram", label: "Instagram / Medsos Showcase Properti" },
    { value: "excel", label: "Microsoft Excel (Rekap Unit & KPR)" },
    { value: "google_sheets", label: "Google Sheets (Jadwal Survei & Kavling)" },
    { value: "accounting_software", label: "Software Pembukuan & Jatuh Tempo Sewa" },
    { value: "crm", label: "CRM / Leads Tracker Calon Pembeli" },
    { value: "custom_software", label: "Website Listing / Portal Properti" },
    { value: "lainnya", label: "Tools Lainnya" },
  ],
  travel_wisata: [
    { value: "whatsapp", label: "WhatsApp / WA Business Konsultan Tour/Umroh" },
    { value: "instagram", label: "Instagram / Medsos Paket Wisata" },
    { value: "google_sheets", label: "Google Sheets (Manifest Jamaah & Kuota Seat)" },
    { value: "excel", label: "Microsoft Excel" },
    { value: "accounting_software", label: "Software Pembukuan & Pelunasan Cicilan" },
    { value: "crm", label: "CRM / Leads Tracker Calon Jamaah" },
    { value: "custom_software", label: "Sistem Reservasi / Web Travel Internal" },
    { value: "lainnya", label: "Tools Lainnya" },
  ],
  edukasi_bimbel: [
    { value: "whatsapp", label: "WhatsApp / WA Business Admin & Grup Kelas" },
    { value: "google_forms", label: "Google Forms (Formulir PSB Siswa Baru)" },
    { value: "google_sheets", label: "Google Sheets (Rekap Absensi & Tagihan SPP)" },
    { value: "excel", label: "Microsoft Excel" },
    { value: "accounting_software", label: "Software Keuangan Lembaga / Bimbel" },
    { value: "custom_software", label: "Sistem Akademik / Portal Siswa" },
    { value: "lainnya", label: "Tools Lainnya" },
  ],
  jasa_b2b: [
    { value: "whatsapp", label: "WhatsApp / WA Business" },
    { value: "excel", label: "Microsoft Excel" },
    { value: "google_sheets", label: "Google Sheets" },
    { value: "google_forms", label: "Google Forms / Formulir Penawaran" },
    { value: "accounting_software", label: "Software Akuntansi / Faktur Pajak" },
    { value: "crm", label: "CRM / Leads Tracker" },
    { value: "custom_software", label: "Software Internal Perusahaan" },
    { value: "lainnya", label: "Tools Lainnya" },
  ],
  retail_d2c: [
    { value: "whatsapp", label: "WhatsApp / WA Business" },
    { value: "marketplace", label: "Aplikasi Marketplace (Shopee/Tokopedia)" },
    { value: "instagram", label: "Instagram DM / TikTok Shop" },
    { value: "excel", label: "Microsoft Excel" },
    { value: "google_sheets", label: "Google Sheets" },
    { value: "pos", label: "Aplikasi Kasir / POS Toko" },
    { value: "inventory_system", label: "Sistem Gudang / Inventori" },
    { value: "accounting_software", label: "Software Akuntansi" },
    { value: "lainnya", label: "Tools Lainnya" },
  ],
  booking_jasa: [
    { value: "whatsapp", label: "WhatsApp / WA Business" },
    { value: "instagram", label: "Instagram DM (Tanya Jadwal)" },
    { value: "google_forms", label: "Google Forms (Formulir Janji Temu)" },
    { value: "excel", label: "Microsoft Excel" },
    { value: "google_sheets", label: "Google Sheets / Google Calendar" },
    { value: "pos", label: "Aplikasi Kasir / POS Booking" },
    { value: "accounting_software", label: "Software Akuntansi" },
    { value: "lainnya", label: "Tools Lainnya" },
  ],
  klinik_kesehatan: [
    { value: "whatsapp", label: "WhatsApp / WA Business Resepsionis" },
    { value: "google_sheets", label: "Google Sheets / Excel (Jadwal Praktek)" },
    { value: "pos", label: "Aplikasi Kasir / POS Apotek" },
    { value: "accounting_software", label: "Software Akuntansi / Pembukuan" },
    { value: "custom_software", label: "Software RME / SIMKlinik Tertentu" },
    { value: "lainnya", label: "Tools Lainnya" },
  ],
  event_organizer: [
    { value: "whatsapp", label: "Grup WhatsApp Vendor & Klien" },
    { value: "excel", label: "Microsoft Excel / Google Sheets (Rundown & Budget)" },
    { value: "instagram", label: "Instagram Portofolio Event" },
    { value: "google_forms", label: "Google Forms (Formulir RSVP / Brief)" },
    { value: "custom_software", label: "Web Undangan / Ticketing Event" },
    { value: "lainnya", label: "Tools Lainnya" },
  ],
  agensi_kreatif: [
    { value: "whatsapp", label: "WhatsApp / Slack Tim & Klien" },
    { value: "google_sheets", label: "Google Sheets (Content Calendar & Ad Spend)" },
    { value: "crm", label: "Trello / Notion / Asana (Task Board)" },
    { value: "accounting_software", label: "Software Invoicing / Faktur Pajak" },
    { value: "custom_software", label: "Client Portal / Dashboard Custom" },
    { value: "lainnya", label: "Tools Lainnya" },
  ],
  jasa_cuci_laundry: [
    { value: "whatsapp", label: "WhatsApp / WA Business Outlet" },
    { value: "pos", label: "Aplikasi Kasir Laundry (POS Tablet)" },
    { value: "excel", label: "Microsoft Excel (Rekap Kiloan)" },
    { value: "accounting_software", label: "Software Pembukuan / Kas" },
    { value: "lainnya", label: "Tools Lainnya" },
  ],
  rental_aset: [
    { value: "whatsapp", label: "WhatsApp / WA Business Rental" },
    { value: "excel", label: "Microsoft Excel (Jadwal Sewa & Kas)" },
    { value: "google_sheets", label: "Google Sheets (Kalender Armada Keluar-Masuk)" },
    { value: "instagram", label: "Instagram / Medsos Katalog Unit" },
    { value: "accounting_software", label: "Software Akuntansi / Rekap Denda" },
    { value: "custom_software", label: "Sistem Operasional Rental Internal" },
    { value: "lainnya", label: "Tools Lainnya" },
  ],
  operasional_lapangan: [
    { value: "whatsapp", label: "Grup WhatsApp Lapangan" },
    { value: "excel", label: "Microsoft Excel" },
    { value: "google_sheets", label: "Google Sheets" },
    { value: "inventory_system", label: "Sistem Kartu Stok / Gudang" },
    { value: "accounting_software", label: "Software Akuntansi" },
    { value: "custom_software", label: "Aplikasi Operasional Internal" },
    { value: "lainnya", label: "Tools Lainnya" },
  ],
  lainnya: [
    { value: "whatsapp", label: "WhatsApp / WA Business" },
    { value: "excel", label: "Microsoft Excel" },
    { value: "google_sheets", label: "Google Sheets" },
    { value: "google_forms", label: "Google Forms" },
    { value: "instagram", label: "Instagram DM" },
    { value: "marketplace", label: "Marketplace App" },
    { value: "accounting_software", label: "Software Akuntansi" },
    { value: "crm", label: "CRM / Leads Tracker" },
    { value: "pos", label: "POS / Aplikasi Kasir" },
    { value: "inventory_system", label: "Sistem Gudang / Stok" },
    { value: "custom_software", label: "Custom Software Internal" },
    { value: "lainnya", label: "Tools Lainnya" },
  ],
};

export function getFilteredCurrentTools(businessType: BusinessType | null): { value: CurrentTool; label: string }[] {
  if (!businessType || !BUSINESS_SPECIFIC_TOOLS[businessType]) {
    return BUSINESS_SPECIFIC_TOOLS.lainnya;
  }
  return BUSINESS_SPECIFIC_TOOLS[businessType];
}

export const CURRENT_TOOLS_OPTIONS = BUSINESS_SPECIFIC_TOOLS.lainnya;

export const BUSINESS_SPECIFIC_GOALS: Record<BusinessType, OptionItem<BusinessGoal>[]> = {
  kuliner_fnb: [
    {
      value: "permudah_order",
      icon: "🍽️",
      title: "Pemesanan Mandiri Menu Meja (QR Order)",
      description: "Pelanggan scan QR di meja dan pesan langsung tanpa panggil pelayan atau antre kasir.",
    },
    {
      value: "kelola_pelanggan",
      icon: "🛵",
      title: "Kanal Pesan Antar Mandiri (Bebas Potongan Komisi Pihak Ketiga)",
      description: "Miliki sistem pemesanan delivery langsung dan kelola database pelanggan mandiri untuk retensi pesanan berkala.",
    },
    {
      value: "kontrol_keuangan",
      icon: "💰",
      title: "Kontrol HPP Resep & Bahan Baku Dapur",
      description: "Tutup celah selisih bahan makanan dan hitung margin keuntungan riil per menu secara akurat.",
    },
    {
      value: "hemat_waktu_admin",
      icon: "🍱",
      title: "Otomasi Pesanan Katering & DP Acara",
      description: "Kunci tanggal pesanan nasi kotak atau prasmanan dengan verifikasi DP QRIS otomatis.",
    },
    {
      value: "pantau_realtime",
      icon: "📈",
      title: "Pantau Kasir & Menu Terlaris Real-Time",
      description: "Owner bisa memantau omset gerai dan menu paling laris langsung dari HP kapan saja.",
    },
    {
      value: "buka_cabang",
      icon: "☕",
      title: "Standarisasi Resep & Sistem Kasir Multi-Outlet",
      description: "Sistem siap pakai saat ekspansi membuka gerai kafe atau outlet baru.",
    },
  ],
  properti_aset: [
    {
      value: "kredibilitas",
      icon: "🏡",
      title: "Showcase Cluster & Legalitas Meyakinkan",
      description: "Tampilkan tipe rumah, siteplan interaktif, izin PBG, dan profil developer secara berkelas.",
    },
    {
      value: "permudah_order",
      icon: "🧮",
      title: "Simulasi KPR Instan & Booking Fee Cepat",
      description: "Calon pembeli menghitung angsuran bank dan kunci unit kavling langsung secara resmi.",
    },
    {
      value: "kurangi_error",
      icon: "🏖️",
      title: "Kalender Cek Ketersediaan Kamar / Villa Live",
      description: "Status kamar kos atau tanggal sewa villa liburan otomatis terbarui anti double-booking.",
    },
    {
      value: "pantau_realtime",
      icon: "📊",
      title: "Pantau Okupansi & Jatuh Tempo Sewa",
      description: "Dashboard visual unit terisi dan notifikasi otomatis penyewa yang mendekati tanggal tagihan.",
    },
    {
      value: "tambah_pelanggan",
      icon: "🚀",
      title: "Konversi Iklan Properti Lebih Tinggi",
      description: "Iklan berbayar diarahkan ke halaman showcase profesional tanpa perantara / calo.",
    },
    {
      value: "buka_cabang",
      icon: "🏢",
      title: "Skalabilitas Kelola Banyak Cluster / Unit Sewa",
      description: "Sistem direktori siap menampung proyek kavling baru atau puluhan unit villa tambahan.",
    },
  ],
  travel_wisata: [
    {
      value: "kurangi_error",
      icon: "🕋",
      title: "Manajemen Kuota Seat & Kamar Real-Time",
      description: "Kunci sisa kursi penerbangan dan kamar hotel tanpa risiko overbooking.",
    },
    {
      value: "permudah_order",
      icon: "✈️",
      title: "Pendaftaran Jamaah & Paket Wisata Elegan",
      description: "Halaman web itinerary umroh/tour yang detail, interaktif, dan mudah dibagikan ke prospek.",
    },
    {
      value: "kontrol_keuangan",
      icon: "💳",
      title: "Pelacak Pelunasan Cicilan Biaya Paket",
      description: "Sistem otomatis memantau riwayat DP dan mengirim tagihan pelunasan berkala.",
    },
    {
      value: "hemat_waktu_admin",
      icon: "📂",
      title: "Pengumpulan Dokumen KTP/Paspor Digital",
      description: "Peserta mengunggah berkas langsung ke portal tanpa admin rekap manual di chat WA.",
    },
    {
      value: "kredibilitas",
      icon: "🏛️",
      title: "Tingkatkan Kredibilitas Izin Resmi Biro",
      description: "Tampilkan legalitas resmi Kemenag / ASITA agar jamaah merasa tenang dan yakin.",
    },
    {
      value: "tambah_pelanggan",
      icon: "💬",
      title: "Kawal Calon Jamaah Sampai Closing",
      description: "Database calon jamaah terdata rapi untuk follow-up jadwal keberangkatan musim berikutnya.",
    },
  ],
  edukasi_bimbel: [
    {
      value: "kontrol_keuangan",
      icon: "💸",
      title: "Otomasi Tagihan & Pengingat SPP Bulanan",
      description: "Kirim notifikasi tagihan SPP otomatis via WhatsApp kepada orang tua murid tepat waktu.",
    },
    {
      value: "permudah_order",
      icon: "📝",
      title: "Portal Pendaftaran Siswa Baru (PSB) Online",
      description: "Orang tua mengisi formulir, memilih jadwal batch, dan bayar registrasi instan tanpa antre.",
    },
    {
      value: "kurangi_error",
      icon: "⏰",
      title: "Penjadwalan Kelas & Ruangan Otomatis",
      description: "Hindari bentrok jadwal tutor, pembagian kelas, dan kuota murid per ruangan.",
    },
    {
      value: "hemat_waktu_admin",
      icon: "📊",
      title: "Pangkas Jam Rekap Absensi & Nilai",
      description: "Tutor dan admin mengakses rekap absensi serta progres belajar siswa di satu portal.",
    },
    {
      value: "kredibilitas",
      icon: "🎓",
      title: "Branding Lembaga & Hasil Portofolio Siswa",
      description: "Tampilkan kurikulum, sertifikasi pengajar, dan testimoni kelulusan siswa berprestasi.",
    },
    {
      value: "buka_cabang",
      icon: "🏢",
      title: "Siap Buka Cabang / Program Belajar Baru",
      description: "Sistem manajemen murid siap menduplikasi kelas di lokasi atau sentra belajar baru.",
    },
  ],
  jasa_b2b: [
    {
      value: "menang_tender",
      icon: "🏆",
      title: "Menang Tender & Kontrak B2B",
      description: "Lolos uji administrasi due-diligence dan memikat tim procurement klien korporat.",
    },
    {
      value: "kredibilitas",
      icon: "🏛️",
      title: "Meningkatkan Kredibilitas Perusahaan",
      description: "Tampil resmi dan meyakinkan di hadapan korporasi besar agar tidak lagi diragukan.",
    },
    {
      value: "hemat_waktu_admin",
      icon: "📋",
      title: "Mempercepat Pengiriman Kuotasi (RFQ)",
      description: "Kirim surat penawaran harga akurat dalam hitungan menit tanpa ketik manual dari nol.",
    },
    {
      value: "data_terpusat",
      icon: "🗄️",
      title: "Data Klien & Kontrak Terpusat",
      description: "Semua riwayat proyek, dokumen perjanjian, dan faktur tersimpan aman di satu sistem.",
    },
    {
      value: "pantau_realtime",
      icon: "📈",
      title: "Pantau Pipeline & Invoice Real-Time",
      description: "Owner mengetahui posisi prospek penjualan dan status termin pembayaran kapan saja.",
    },
    {
      value: "kurangi_manual",
      icon: "⚡",
      title: "Kurangi Rekap Administrasi Berulang",
      description: "Otomasi pembuatan laporan progres pekerjaan dan arsip administrasi proyek.",
    },
  ],
  retail_d2c: [
    {
      value: "permudah_order",
      icon: "🛒",
      title: "Pelanggan Order Mandiri 24 Jam",
      description: "Checkout langsung dengan kalkulasi ongkir dan verifikasi transfer otomatis tanpa antre chat.",
    },
    {
      value: "kelola_pelanggan",
      icon: "👥",
      title: "Miliki 100% Database Pelanggan",
      description: "Kunci nama dan nomor WhatsApp pembeli menjadi aset mandiri bebas komisi platform.",
    },
    {
      value: "tambah_pelanggan",
      icon: "🚀",
      title: "Tingkatkan Konversi Iklan (ROAS)",
      description: "Landing page cepat tanpa menu pengalih agar budget iklan menghasilkan closing optimal.",
    },
    {
      value: "hemat_waktu_admin",
      icon: "⏳",
      title: "Pangkas Waktu Cek Mutasi Bank & Resi",
      description: "Hilangkan kebiasaan staf memeriksa mutasi bank manual dan input nomor resi satu per satu.",
    },
    {
      value: "kontrol_stok",
      icon: "📦",
      title: "Sinkronisasi Stok Gudang & Varian",
      description: "Mencegah pesanan masuk saat barang kosong dan mendeteksi item menipis otomatis.",
    },
    {
      value: "repeat_order",
      icon: "🔁",
      title: "Meningkatkan Pembelian Ulang (Repeat Order)",
      description: "Memudahkan pelanggan setia memesan kembali langsung dari katalog toko mandiri Anda.",
    },
  ],
  booking_jasa: [
    {
      value: "kurangi_error",
      icon: "⏰",
      title: "Hilangkan Jadwal Bentrok Otomatis",
      description: "Kalender real-time interaktif yang otomatis mengunci slot jam yang sudah dipesan.",
    },
    {
      value: "permudah_order",
      icon: "🔒",
      title: "Kunci Reservasi dengan DP Otomatis",
      description: "Slot jam hanya terpesan setelah DP terverifikasi via QRIS/VA untuk cegah no-show sepihak.",
    },
    {
      value: "hemat_waktu_admin",
      icon: "⏳",
      title: "Pangkas Jam Staf Cocokkan Jadwal di WA",
      description: "Pelanggan memilih tanggal, jam, dan staf secara mandiri tanpa tanya-tanya berulang.",
    },
    {
      value: "repeat_order",
      icon: "💬",
      title: "Pengingat Otomatis via WhatsApp (Reminder)",
      description: "Kirim pesan reminder konfirmasi kehadiran otomatis H-1 dan jam temu ke nomor pelanggan.",
    },
    {
      value: "kelola_pelanggan",
      icon: "👥",
      title: "Database Riwayat Layanan & Rekam Medis Klien",
      description: "Catat riwayat perawatan medis, riwayat keluhan, atau preferensi klien untuk layanan yang lebih personal.",
    },
    {
      value: "buka_cabang",
      icon: "🏢",
      title: "Standarisasi Sistem Antar Staf/Cabang",
      description: "Sistem reservasi siap dipakai saat ekspansi penambahan ruangan layanan atau cabang baru.",
    },
  ],
  rental_aset: [
    {
      value: "kurangi_error",
      icon: "🚗",
      title: "Kalender Armada Real-Time & Anti Jadwal Bentrok",
      description: "Mengetahui secara instan armada/alat mana yang ready di garasi, sedang jalan sewa, atau masuk servis.",
    },
    {
      value: "kontrol_keuangan",
      icon: "🛡️",
      title: "Verifikasi Identitas Ketat & Mitigasi Penggelapan",
      description: "Sistem verifikasi KTP/SIM, kontak darurat, dan rekap deposit jaminan yang aman dan rapi.",
    },
    {
      value: "kurangi_manual",
      icon: "📝",
      title: "Kontrak Sewa Digital & Ceklist Fisik Serah-Terima",
      description: "Surat perjanjian sewa otomatis (e-sign) dan ceklis foto kondisi lecet/bensin saat unit keluar & kembali.",
    },
    {
      value: "kontrol_stok",
      icon: "⏱️",
      title: "Kalkulasi Denda Keterlambatan (Overtime) Otomatis",
      description: "Perhitungan denda jam/hari keterlambatan secara otomatis saat unit dikembalikan lewat waktu.",
    },
    {
      value: "hemat_waktu_admin",
      icon: "💬",
      title: "Otomasi Pengingat Pengembalian via WhatsApp",
      description: "Notifikasi otomatis ke WhatsApp penyewa H-3 jam sebelum masa sewa berakhir.",
    },
    {
      value: "buka_cabang",
      icon: "🏢",
      title: "Skalabilitas Tambah Armada & Pool Baru",
      description: "Sistem siap dipakai saat menambah puluhan unit kendaraan/alat baru atau buka pool cabang lain.",
    },
  ],
  klinik_kesehatan: [
    { value: "kurangi_error", icon: "🏥", title: "Sistem Antrean Tertib & Minim Waktu Tunggu", description: "Nomor antrean digital yang transparan sehingga ruang tunggu klinik nyaman." },
    { value: "data_terpusat", icon: "📑", title: "Rekam Medis Elektronik (RME) Terintegrasi", description: "Riwayat pemeriksaan pasien, odontogram, atau data rekam medis hewan peliharaan tersimpan aman digital." },
    { value: "kontrol_stok", icon: "💊", title: "Kontrol Stok Obat Apotek & BMHP", description: "Otomasi pemotongan stok obat saat resep dicetak kasir untuk cegah barang kedaluwarsa." },
    { value: "repeat_order", icon: "💬", title: "Otomasi Pengingat Kontrol via WhatsApp", description: "Pengingat otomatis jadwal kontrol berkala, vaksinasi, atau perawatan rutin berikutnya." },
    { value: "kontrol_keuangan", icon: "💰", title: "Kalkulasi Otomatis Jasa Medis & Komisi Dokter", description: "Penghitungan bagi hasil fee dokter/terapis terproses otomatis setiap ada tindakan." },
  ],
  event_organizer: [
    { value: "kurangi_error", icon: "⏱️", title: "Rundown Acara Hari H Terkendali Presisi", description: "Sinkronisasi jadwal menit-ke-menit antar seluruh kru dan vendor panggung." },
    { value: "kontrol_keuangan", icon: "💸", title: "Budgeting Vendor & Penagihan Termin Lancar", description: "Pantau pengeluaran puluhan vendor dan jadwal termin tagihan klien tanpa overbudget." },
    { value: "permudah_order", icon: "🎟️", title: "Registrasi Tamu / RSVP Digital Tanpa Antre", description: "Buku tamu digital dengan QR code scanner di meja resepsionis acara." },
    { value: "kredibilitas", icon: "🏛️", title: "Portofolio Acara & Video Showcase Meyakinkan", description: "Tampilkan video highlight event terdahulu untuk meyakinkan calon pengantin atau klien kantor." },
    { value: "hemat_waktu_admin", icon: "💬", title: "Otomasi Pengingat Jadwal Loading Vendor via WA", description: "Kirim pesan peringatan jam masuk loading barang ke seluruh vendor secara terjadwal." },
  ],
  agensi_kreatif: [
    { value: "kurangi_error", icon: "🔄", title: "Kendalikan Scope Creep & Kuota Revisi", description: "Batasan revisi terstruktur dengan persetujuan formal klien di client portal." },
    { value: "kontrol_keuangan", icon: "💰", title: "Invoicing Retainer Bulanan Otomatis", description: "Tagihan retainer bulanan terbit otomatis dan terkirim dengan verifikasi pembayaran." },
    { value: "data_terpusat", icon: "📁", title: "Client Portal & Dashboard Progres Terpusat", description: "Klien dapat memantau progres pekerjaan dan mengunduh berkas langsung secara mandiri tanpa perlu menanyakan status manual di WhatsApp." },
    { value: "hemat_waktu_admin", icon: "📊", title: "Otomasi Laporan Performa Iklan/Konten", description: "Klien menerima ringkasan performa kampanye otomatis tanpa staf lembur menyusun slide." },
    { value: "pantau_realtime", icon: "⏱️", title: "Pantau Jam Kerja Tim & Beban Proyek", description: "Timesheet dan task board terukur untuk memastikan profitabilitas setiap klien." },
  ],
  jasa_cuci_laundry: [
    { value: "kurangi_error", icon: "🧺", title: "Cegah Pakaian Hilang / Tertukar dengan Barcode", description: "Sistem pelacak nomor rak dan label struk untuk mengidentifikasi kepemilikan baju." },
    { value: "hemat_waktu_admin", icon: "💬", title: "Auto-WA 'Cucian Anda Sudah Selesai'", description: "Notifikasi otomatis ke WhatsApp pelanggan seketika saat cucian selesai dipacking." },
    { value: "kontrol_keuangan", icon: "💰", title: "Rekonsiliasi Kas Kasir Shift & Borongan Karyawan", description: "Catat kas masuk harian dan kalkulasi komisi setrika per kg secara otomatis." },
    { value: "kontrol_stok", icon: "🧼", title: "Kontrol Pemakaian Detergen & Bahan Baku", description: "Pantau sisa sabun, pelembut, dan plastik packing agar tidak ada pemborosan." },
    { value: "repeat_order", icon: "🔁", title: "Broadcast Pengingat Ambil Cucian & Promo", description: "Kirim pesan reminder ramah untuk cucian yang belum diambil dan promo cuci hemat." },
  ],
  operasional_lapangan: [
    {
      value: "kontrol_keuangan",
      icon: "💰",
      title: "Kontrol Kas & Tutup Kebocoran Lapangan",
      description: "Mandor memfoto nota belanja dan mencatat kas keluar seketika langsung dari HP di lokasi.",
    },
    {
      value: "kontrol_stok",
      icon: "📦",
      title: "Hilangkan Selisih Stok Fisik Gudang",
      description: "Catat perpindahan material/barang secara presisi tanpa ada barang hilang tanpa jejak.",
    },
    {
      value: "pantau_realtime",
      icon: "📈",
      title: "Pantau HPP & Laba Riil Kapan Saja",
      description: "Owner mengetahui kondisi keuangan dan biaya operasional riil dari ponsel tanpa tunggu akuntan.",
    },
    {
      value: "kurangi_manual",
      icon: "⚡",
      title: "Pangkas Jam Rekap Bon Kertas ke Komputer",
      description: "Hentikan lembur akhir bulan memindahkan nota kuitansi fisik ke baris spreadsheet Excel.",
    },
    {
      value: "data_terpusat",
      icon: "🗄️",
      title: "Laporan Multi-Lokasi Terpusat",
      description: "Semua laporan gudang, bengkel, atau lahan tersimpan di satu sistem terstandarisasi.",
    },
    {
      value: "buka_cabang",
      icon: "🏢",
      title: "Persiapan Ekspansi / Tambah Lahan Baru",
      description: "Sistem operasional baku yang siap diduplikasi ke lokasi kerja baru dengan mudah.",
    },
  ],
  lainnya: [
    { value: "tambah_pelanggan", icon: "🚀", title: "Mendapat Lebih Banyak Pelanggan", description: "Membuka keran pasar baru lewat pencarian Google dan iklan digital." },
    { value: "kredibilitas", icon: "🏛️", title: "Meningkatkan Kredibilitas Bisnis", description: "Tampil resmi di mata korporat agar tidak lagi dianggap bisnis fiktif." },
    { value: "permudah_order", icon: "🛒", title: "Mempermudah Pelanggan Order", description: "Beli langsung tanpa harus antre menunggu balasan admin." },
    { value: "hemat_waktu_admin", icon: "⏳", title: "Menghemat Waktu Kerja Admin", description: "Otomasi jawaban harga, ongkir, dan pencatatan data masuk." },
    { value: "kurangi_manual", icon: "⚡", title: "Mengurangi Pekerjaan Manual", description: "Memangkas rekap ganda dan copy-paste antar spreadsheet." },
    { value: "data_terpusat", icon: "🗄️", title: "Data Bisnis Terpusat & Rapi", description: "Semua laporan tersimpan aman di satu tempat tanpa takut file korup." },
  ],
};

export function getFilteredGoals(businessType: BusinessType | null): OptionItem<BusinessGoal>[] {
  if (!businessType || !BUSINESS_SPECIFIC_GOALS[businessType]) {
    return BUSINESS_SPECIFIC_GOALS.lainnya;
  }
  return BUSINESS_SPECIFIC_GOALS[businessType];
}

export const GOALS_OPTIONS: OptionItem<BusinessGoal>[] = [
  ...BUSINESS_SPECIFIC_GOALS.kuliner_fnb,
  ...BUSINESS_SPECIFIC_GOALS.properti_aset,
  ...BUSINESS_SPECIFIC_GOALS.travel_wisata,
  ...BUSINESS_SPECIFIC_GOALS.edukasi_bimbel,
  ...BUSINESS_SPECIFIC_GOALS.jasa_b2b,
  ...BUSINESS_SPECIFIC_GOALS.retail_d2c,
  ...BUSINESS_SPECIFIC_GOALS.booking_jasa,
  ...BUSINESS_SPECIFIC_GOALS.klinik_kesehatan,
  ...BUSINESS_SPECIFIC_GOALS.event_organizer,
  ...BUSINESS_SPECIFIC_GOALS.agensi_kreatif,
  ...BUSINESS_SPECIFIC_GOALS.jasa_cuci_laundry,
  ...BUSINESS_SPECIFIC_GOALS.rental_aset,
  ...BUSINESS_SPECIFIC_GOALS.operasional_lapangan,
  ...BUSINESS_SPECIFIC_GOALS.lainnya,
];

export const BUSINESS_SPECIFIC_SCALES: Record<BusinessType, { value: BusinessScale; label: string; range: string; desc: string }[]> = {
  kuliner_fnb: [
    { value: "1_5", label: "Kedai / Cloud Kitchen Mandiri", range: "1 – 5 Staf Dapur & Kasir", desc: "Owner memasak atau melayani kasir langsung dibantu beberapa barista/koki." },
    { value: "6_20", label: "Kafe / Resto Ramai", range: "6 – 20 Karyawan", desc: "Memiliki tim kasir, waiters, koki dapur terpisah, dan admin katering." },
    { value: "21_50", label: "Resto Besar / Multi-Outlet", range: "21 – 50 Karyawan", desc: "Mengoperasikan 2-3 cabang atau katering skala besar dengan dapur pusat." },
    { value: "50_plus", label: "Jaringan Restoran / Franchise", range: "> 50 Karyawan", desc: "Banyak cabang waralaba dengan distribusi bahan baku terpusat." },
  ],
  properti_aset: [
    { value: "1_5", label: "Pengembang / Pengelola Mandiri", range: "1 – 5 Orang Tim", desc: "Owner mengelola langsung cluster kecil, villa keluarga, atau 1-2 gedung kos." },
    { value: "6_20", label: "Developer Cluster / Operator Properti", range: "6 – 20 Tim", desc: "Memiliki tim marketing penjualan, pengawas lapangan, dan staf administrasi sewa." },
    { value: "21_50", label: "Perusahaan Properti Menengah", range: "21 – 50 Personel", desc: "Mengembangkan beberapa proyek perumahan atau mengelola puluhan aset sewa." },
    { value: "50_plus", label: "Developer Skala Besar / Korporasi", range: "> 50 Personel", desc: "Pengembang kawasan perumahan mandiri atau operator hospitality jaringan luas." },
  ],
  travel_wisata: [
    { value: "1_5", label: "Biro Wisata / Agen Rintisan", range: "1 – 5 Orang Tim", desc: "Owner merangkap pemandu tour, admin tiket, dan customer service." },
    { value: "6_20", label: "Biro Travel Berkembang", range: "6 – 20 Tim Operasional", desc: "Memiliki tour leader reguler, admin ticketing, tim visa, dan marketing." },
    { value: "21_50", label: "Penyelenggara Tour & Umroh Menengah", range: "21 – 50 Staf", desc: "Rutin memberangkatkan rombongan jamaah/wisatawan setiap bulan." },
    { value: "50_plus", label: "Konsorsium / Operator Besar", range: "> 50 Personel", desc: "Biro travel besar dengan jaringan cabang keagenan di berbagai kota." },
  ],
  edukasi_bimbel: [
    { value: "1_5", label: "Bimbel / Kursus Mandiri", range: "1 – 5 Tutor & Admin", desc: "Founder mengajar langsung bersama segelintir pengajar paruh waktu." },
    { value: "6_20", label: "Lembaga Kursus / Bimbel Berkembang", range: "6 – 20 Tentor & Staf", desc: "Memiliki beberapa ruang kelas aktif dan staf admin pendaftaran/keuangan." },
    { value: "21_50", label: "Pusat Pelatihan / Multi-Cabang", range: "21 – 50 Tenaga Pendidik", desc: "Mengelola ratusan siswa aktif di beberapa lokasi sentra belajar." },
    { value: "50_plus", label: "Yayasan / Jaringan Bimbel Nasional", range: "> 50 Karyawan", desc: "Jaringan waralaba kursus atau sekolah formal dengan staf terstruktur." },
  ],
  jasa_b2b: [
    { value: "1_5", label: "Studio / Tim Ahli Inti", range: "1 – 5 Orang Tim", desc: "Founder dan tim ahli menangani langsung setiap proyek dan penawaran tender." },
    { value: "6_20", label: "Agensi / Vendor Bertumbuh", range: "6 – 20 Karyawan", desc: "Mulai memiliki tim teknis/sales, drafter, dan staf administrasi terpisah." },
    { value: "21_50", label: "Perusahaan Menengah", range: "21 – 50 Karyawan", desc: "Memiliki beberapa divisi kerja dengan manajer proyek dan tim legal tersendiri." },
    { value: "50_plus", label: "Korporasi / Established", range: "> 50 Karyawan", desc: "Organisasi besar dengan struktur multi-divisi dan pengawasan berjenjang." },
  ],
  retail_d2c: [
    { value: "1_5", label: "Toko Mandiri", range: "1 – 5 Orang", desc: "Owner merangkap tim CS, packing barang, dan pencatatan kas harian." },
    { value: "6_20", label: "Brand Sedang Bertumbuh", range: "6 – 20 Tim CS & Gudang", desc: "Memiliki staf khusus balas chat, admin mutasi, dan packer gudang." },
    { value: "21_50", label: "Distributor / Multi-Toko", range: "21 – 50 Karyawan", desc: "Mengelola toko fisik dan gudang distribusi dengan banyak kasir." },
    { value: "50_plus", label: "Brand Besar / Pabrik", range: "> 50 Personel", desc: "Distribusi nasional dengan jaringan reseller dan armada pengiriman besar." },
  ],
  booking_jasa: [
    { value: "1_5", label: "Praktik / Studio Tunggal", range: "1 – 5 Staf & Terapis", desc: "Owner melayani langsung dengan bantuan 1–2 asisten atau resepsionis." },
    { value: "6_20", label: "Klinik / Salon Berkembang", range: "6 – 20 Terapis & Staf", desc: "Memiliki beberapa ruangan layanan dan tim kasir khusus reservasi jadwal." },
    { value: "21_50", label: "Klinik Spesialis / Multi-Ruang", range: "21 – 50 Tim Layanan", desc: "Operasional padat dengan banyak staf spesialis dan administrasi berjenjang." },
    { value: "50_plus", label: "Jaringan Multi-Cabang", range: "> 50 Staf", desc: "Memiliki beberapa cabang klinik atau studio perawatan yang tersebar." },
  ],
  rental_aset: [
    { value: "1_5", label: "Rental Ringkas / Pemilik Tunggal", range: "1 – 5 Unit Aset / Staf", desc: "Owner mengurus langsung penyerahan kunci, verifikasi KTP, dan rekap sewa." },
    { value: "6_20", label: "Rental Berkembang", range: "6 – 20 Armada / Unit Alat", desc: "Memiliki staf admin WhatsApp, driver, dan mekanik/petugas serah-terima unit." },
    { value: "21_50", label: "Perusahaan Rental Menengah", range: "21 – 50 Armada / Multi-Pool", desc: "Operasional padat dengan banyak armada jalan setiap hari dan tim verifikasi ketat." },
    { value: "50_plus", label: "Rental Skala Besar / Korporasi", range: "> 50 Armada / Alat Berat", desc: "Penyewaan alat berat proyek, bus pariwisata, atau ratusan mobil rental jaringan luas." },
  ],
  operasional_lapangan: [
    { value: "1_5", label: "Usaha Lapangan Ringkas", range: "1 – 5 Pekerja / Mandor", desc: "Owner memantau lapangan langsung bersama beberapa pekerja kunci." },
    { value: "6_20", label: "Operasional Berkembang", range: "6 – 20 Tim Lapangan", desc: "Mulai memiliki mandor lapangan, staf gudang, dan admin kas terpisah." },
    { value: "21_50", label: "Multi-Lokasi / Multi-Lahan", range: "21 – 50 Personel", desc: "Banyak pekerja lapangan di beberapa titik yang butuh pengawasan ketat." },
    { value: "50_plus", label: "Organisasi Lapangan Skala Besar", range: "> 50 Pekerja", desc: "Operasional pabrik, perkebunan, atau kontraktor dengan multi-divisi." },
  ],
  klinik_kesehatan: [
    { value: "1_5", label: "Praktik Dokter / Klinik Mandiri", range: "1 – 5 Tenaga Medis (1–2 Poli)", desc: "Dokter praktek mandiri dibantu 1-2 perawat dan staf kasir/resepsionis." },
    { value: "6_20", label: "Klinik Pratama / Estetika Ramai", range: "6 – 20 Dokter & Staf", desc: "Memiliki tim dokter spesialis, perawat jaga, apotek farmasi, dan kasir." },
    { value: "21_50", label: "Klinik Utama / Multi-Poli", range: "21 – 50 Staf Medis", desc: "Operasional padat dengan ratusan kunjungan pasien per hari dan poli lengkap." },
    { value: "50_plus", label: "Jaringan Klinik / Rumah Sakit Khusus", range: "> 50 Dokter & Staf", desc: "Multi-cabang klinik terintegrasi dengan sentralisasi rekam medis elektronik." },
  ],
  event_organizer: [
    { value: "1_5", label: "Organizer Rintisan", range: "1 – 3 Event / Bulan", desc: "Founder merangkap show director, liaison officer (LO), dan admin komunikasi." },
    { value: "6_20", label: "EO / WO Berkembang", range: "4 – 10 Event / Bulan", desc: "Memiliki tim floor manager tetap, koordinator vendor, dan admin finance." },
    { value: "21_50", label: "Agensi Event Menengah", range: "11 – 25 Acara Paralel", desc: "Menangani konser musik, gathering korporat besar, dan pameran bertingkat." },
    { value: "50_plus", label: "Promotor / Organizer Skala Besar", range: "> 25 Event / Festival Massal", desc: "Penyelenggara festival publik nasional dengan puluhan ribu tiket pengunjung." },
  ],
  agensi_kreatif: [
    { value: "1_5", label: "Studio / Agensi Rintisan", range: "1 – 5 Klien Retainer Aktif", desc: "Founder merangkap account manager, lead designer/dev, dan strategi campaign." },
    { value: "6_20", label: "Agensi Bertumbuh", range: "6 – 20 Brand Klien Aktif", desc: "Memiliki tim divisi desain, copywriter, digital ads specialist, dan web developer." },
    { value: "21_50", label: "Agensi Menengah", range: "21 – 50 Klien / Korporasi", desc: "Banyak project sprint paralel dengan tim account executive dan manajer proyek." },
    { value: "50_plus", label: "Creative Agency Network", range: "> 50 Klien Aktif", desc: "Agensi jaringan nasional dengan multi-divisi kreatif, produksi, dan media buying." },
  ],
  jasa_cuci_laundry: [
    { value: "1_5", label: "Outlet Laundry / Cuci Mandiri", range: "< 50 Kg / 10 Mobil per Hari", desc: "Owner mencuci atau menyetrika sendiri dibantu 1-2 operator mesin." },
    { value: "6_20", label: "Laundry / Car Wash Ramai", range: "50 – 200 Kg / 10–40 Kendaraan", desc: "Memiliki kasir counter, staf cuci, staf setrika uap, dan kurir pick-up." },
    { value: "21_50", label: "Workshop Laundry / Multi-Outlet", range: "200 – 800 Kg / Hari (2-4 Gerai)", desc: "Pusat workshop cuci besar yang melayani pasokan dari beberapa outlet drop-point." },
    { value: "50_plus", label: "Industrial Laundry / Jaringan", range: "> 800 Kg / Hari (Hotel/RS)", desc: "Pencucian skala industri melayani linen hotel, rumah sakit, dan puluhan cabang." },
  ],
  lainnya: [
    { value: "1_5", label: "Usaha Rintisan", range: "1 – 5 Orang", desc: "Founder masih turun tangan langsung di seluruh urusan operasional." },
    { value: "6_20", label: "Sedang Bertumbuh", range: "6 – 20 Orang", desc: "Mulai memiliki staf admin, kasir, atau tim lapangan terpisah." },
    { value: "21_50", label: "Berkembang Menengah", range: "21 – 50 Orang", desc: "Memiliki beberapa divisi kerja dan membutuhkan pembagian hak akses." },
    { value: "50_plus", label: "Multi-Cabang / Established", range: "> 50 Orang", desc: "Organisasi besar dengan multi-lokasi atau cabang terdistribusi." },
  ],
};

export const SUBSECTOR_SPECIFIC_SCALES: Record<string, { value: BusinessScale; label: string; range: string; desc: string }[]> = {
  kafe_resto: [
    { value: "1_5", label: "Kedai / Coffee Bar Mandiri", range: "1 – 5 Barista & Kasir (1–8 Meja)", desc: "Owner merangkap barista/kasir melayani pesanan di counter." },
    { value: "6_20", label: "Kafe / Resto Ramai", range: "6 – 20 Staf (10–30 Meja)", desc: "Memiliki tim kasir laci, barista bar, waitstaff, dan kitchen terpisah." },
    { value: "21_50", label: "Restoran Besar / Multi-Outlet", range: "21 – 50 Karyawan (2–3 Cabang)", desc: "Operasional padat dengan ratusan transaksi per hari dan dapur pusat." },
    { value: "50_plus", label: "Jaringan Kafe / Franchise", range: "> 50 Karyawan (> 3 Cabang)", desc: "Banyak outlet cabang dengan pengawasan stok gudang terpusat." },
  ],
  katering_event: [
    { value: "1_5", label: "Katering Rumahan Mandiri", range: "< 100 Porsi / Acara", desc: "Owner memasak langsung dibantu keluarga atau asisten dapur." },
    { value: "6_20", label: "Katering Acara Berkembang", range: "100 – 500 Porsi / Event", desc: "Memiliki juru masak tetap, tim plating/server, dan admin pemesanan." },
    { value: "21_50", label: "Vendor Katering Besar", range: "500 – 2.000 Porsi / Event", desc: "Melayani pernikahan besar, gathering kantor, dan multi-event paralel." },
    { value: "50_plus", label: "Industrial / Corporate Catering", range: "> 2.000 Porsi / Kontrak Rutin", desc: "Pasokan makanan pabrik harian atau katering massal berskala besar." },
  ],
  rental_kendaraan: [
    { value: "1_5", label: "Rental Ringkas Mandiri", range: "1 – 5 Unit Mobil / Motor", desc: "Owner mengurus langsung penyerahan kunci, verifikasi KTP, dan rekap sewa." },
    { value: "6_20", label: "Rental Berkembang", range: "6 – 20 Armada Kendaraan", desc: "Memiliki admin WhatsApp, driver standby, dan petugas serah-terima pool." },
    { value: "21_50", label: "Perusahaan Rental Menengah", range: "21 – 50 Armada / Multi-Pool", desc: "Puluhan mobil jalan setiap hari dengan risiko penggelapan & overtime tinggi." },
    { value: "50_plus", label: "Rental Korporasi & Bus Wisata", range: "> 50 Armada Aktif", desc: "Penyewaan jangka panjang perusahaan atau armada bus pariwisata." },
  ],
  sewa_kamera: [
    { value: "1_5", label: "Studio / Rental Mandiri", range: "1 – 10 Unit Bodi & Lensa", desc: "Owner merinci unit dan serah-terima sendiri kepada rekan fotografer." },
    { value: "6_20", label: "Rental Multimedia Berkembang", range: "11 – 30 Unit Alat & Aksesoris", desc: "Memiliki staf ceklis fisik unit, bodi bioskop, lighting, dan audio." },
    { value: "21_50", label: "Rental Production House", range: "31 – 80 Unit Paket Kamera", desc: "Penyewaan alat produksi film, wedding besar, dan multi-crew." },
    { value: "50_plus", label: "Rental Alat Skala Nasional", range: "> 80 Unit Rigging & Kamera", desc: "Inventaris ratusan lensa, drone, stabilizer, dan broadcast gear." },
  ],
  sewa_camping_outdoor: [
    { value: "1_5", label: "Rental Outdoor Mandiri", range: "1 – 15 Unit Tenda & Alat", desc: "Owner merangkap penerimaan sewa, cek fisik alat, dan cuci tenda sendiri." },
    { value: "6_20", label: "Basecamp Rental Berkembang", range: "16 – 50 Paket Peralatan", desc: "Memiliki admin WhatsApp sewa, staf pembersihan/laundry tenda, dan gudang alat." },
    { value: "21_50", label: "Rental Outdoor Menengah", range: "51 – 150 Unit Tenda & Carrier", desc: "Persewaan ramai setiap akhir pekan dengan ratusan item alat gunung aktif disewa." },
    { value: "50_plus", label: "Pusat Persewaan Alat Gunung", range: "> 150 Paket Outdoor Lengkap", desc: "Inventaris ratusan tenda dome, alat panjat, rafting, dan perlengkapan ekspedisi." },
  ],
  kos_coliving: [
    { value: "1_5", label: "Kos Mandiri Rintisan", range: "1 – 10 Pintu Kamar", desc: "Owner mengurus langsung serah-terima kunci, cek kamar, dan tagihan sewa bulanan." },
    { value: "6_20", label: "Rumah Kos Berkembang", range: "11 – 30 Pintu Kamar", desc: "Memiliki staf penjaga kebersihan kost standby dan admin penagihan WhatsApp." },
    { value: "21_50", label: "Kos Eksklusif Menengah", range: "31 – 80 Pintu Kamar", desc: "Gedung bertingkat dengan fasilitas lengkap (AC, WiFi, water heater) dan okupansi tinggi." },
    { value: "50_plus", label: "Jaringan Co-Living / Multi-Gedung", range: "> 80 Kamar (Multi-Lokasi)", desc: "Bisnis co-living profesional dengan puluhan kamar tersebar di beberapa titik lokasi." },
  ],
  kontraktor_sipil: [
    { value: "1_5", label: "Studio / Kontraktor Mandiri", range: "1 – 3 Proyek Aktif", desc: "Owner turun langsung mengawasi mandor dan belanja material di toko bangunan." },
    { value: "6_20", label: "Kontraktor Berkembang", range: "4 – 10 Proyek Paralel", desc: "Memiliki manajer proyek, drafter arsitektur, mandor, dan staf admin kas." },
    { value: "21_50", label: "Perusahaan Kontraktor Menengah", range: "11 – 25 Proyek Konstruksi", desc: "Rutin menangani tender swasta/BUMN dengan termin progres berjenjang." },
    { value: "50_plus", label: "General Contractor / BUMN Vendor", range: "> 25 Proyek Berskala Besar", desc: "Organisasi konstruksi multi-divisi dengan puluhan site manager." },
  ],
  brand_fashion: [
    { value: "1_5", label: "Brand Fashion Rintisan", range: "1 – 10 Koleksi / SKU Aktif", desc: "Owner merangkap desainer, admin balas chat, dan pengemasan pesanan." },
    { value: "6_20", label: "Brand Sedang Bertumbuh", range: "10 – 50 Model Varian Baju", desc: "Memiliki tim CS WhatsApp, admin mutasi bank, dan staf gudang packing." },
    { value: "21_50", label: "Distributor & Multi-Outlet", range: "50 – 200 SKU / Multi-Channel", desc: "Penjualan online intensif dipadukan dengan toko fisik atau mitra reseller." },
    { value: "50_plus", label: "Brand Nasional / Garment", range: "> 200 SKU & Pabrik Mandiri", desc: "Produksi ribuan pieces per bulan dengan distribusi toko nasional." },
  ],
  klinik_spesialis: [
    { value: "1_5", label: "Praktik Dokter Tunggal", range: "1 – 2 Ruang Praktek", desc: "Dokter melayani langsung dibantu 1 perawat/resepsionis." },
    { value: "6_20", label: "Klinik Pratama Berkembang", range: "3 – 8 Dokter / Terapis", desc: "Memiliki tim resepsionis kasir, perawat jaga, dan apotek klinik." },
    { value: "21_50", label: "Klinik Utama / Spesialis", range: "9 – 20 Tenaga Medis", desc: "Operasional padat multi-poli dengan ratusan pasien terjadwal per hari." },
    { value: "50_plus", label: "Jaringan Klinik Multi-Cabang", range: "> 20 Dokter & Staf", desc: "Multi-cabang klinik dengan sentralisasi rekam medis digital." },
  ],
  residensial_cluster: [
    { value: "1_5", label: "Developer Cluster Mandiri", range: "5 – 20 Kavling / Unit Rumah", desc: "Owner memasarkan langsung cluster rintisan bersama 1-2 staf sales." },
    { value: "6_20", label: "Pengembang Cluster Menengah", range: "21 – 80 Unit Rumah Aktif", desc: "Memiliki kantor pemasaran, mandor proyek perumahan, dan legal KPR." },
    { value: "21_50", label: "Kawasan Perumahan Berkembang", range: "81 – 250 Unit Kavling", desc: "Mengembangkan kawasan hunian terpadu dengan tim sales multi-agen." },
    { value: "50_plus", label: "Pengembang Kota Mandiri", range: "> 250 Unit Properti", desc: "Developer skala besar dengan portofolio banyak kawasan perumahan." },
  ],
  umroh_haji: [
    { value: "1_5", label: "Biro Rintisan / Konsorsium", range: "20 – 50 Jamaah / Keberangkatan", desc: "Founder merangkap pembimbing ibadah dan admin visa/tiket." },
    { value: "6_20", label: "Biro Travel Umroh Berkembang", range: "50 – 200 Jamaah / Bulan", desc: "Rutin memberangkatkan 2–4 rombongan grup per bulan dengan staf tiket." },
    { value: "21_50", label: "Biro Umroh Menengah", range: "200 – 800 Jamaah / Bulan", desc: "Memiliki cabang perwakilan dan alokasi blok seat maskapai reguler." },
    { value: "50_plus", label: "Provider Visa / Konsorsium Besar", range: "> 800 Jamaah / Bulan", desc: "Operator besar dengan ribuan jamaah per musim ibadah haji & umroh." },
  ],
  wedding_organizer: [
    { value: "1_5", label: "Wedding Planner Mandiri", range: "1 – 2 Resepsi / Bulan", desc: "Owner mendampingi langsung pengantin dari persiapan hingga hari H." },
    { value: "6_20", label: "Wedding Organizer Berkembang", range: "3 – 8 Resepsi / Bulan", desc: "Memiliki tim kru panggung, buku tamu, pendamping pengantin, dan runner." },
    { value: "21_50", label: "WO Ternama / Multi-Team", range: "9 – 20 Wedding / Bulan", desc: "Mampu mengawal 2-3 pesta pernikahan di gedung berbeda di hari yang sama." },
    { value: "50_plus", label: "Wedding Network Skala Besar", range: "> 20 Pernikahan / Bulan", desc: "Penyelenggara pameran wedding expo tahunan dan ratusan pasangan pengantin." },
  ],
  laundry_kiloan_satuan: [
    { value: "1_5", label: "Laundry Kiloan Rumahan", range: "< 50 Kg Cucian / Hari", desc: "Kapasitas 2-3 mesin cuci dengan owner melayani kasir langsung." },
    { value: "6_20", label: "Laundry Kiloan Ramai", range: "50 – 250 Kg Cucian / Hari", desc: "Memiliki 4-10 mesin cuci, kasir terpisah, dan karyawan setrika uap borongan." },
    { value: "21_50", label: "Pusat Workshop & Multi-Outlet", range: "250 – 800 Kg / Hari", desc: "Sistem workshop pusat melayani drop point dari beberapa cabang laundry." },
    { value: "50_plus", label: "Industrial Linen & Waralaba", range: "> 800 Kg Cucian / Hari", desc: "Pabrik laundry kiloan melayani hotel, resto, spa, dan jaringan waralaba." },
  ],
  digital_marketing_agency: [
    { value: "1_5", label: "Studio / Agensi Rintisan", range: "1 – 5 Klien Retainer Aktif", desc: "Founder merangkap account manager, lead designer/dev, dan strategi campaign." },
    { value: "6_20", label: "Agensi Bertumbuh", range: "6 – 20 Brand Klien Aktif", desc: "Memiliki tim divisi desain, copywriter, digital ads specialist, dan web developer." },
    { value: "21_50", label: "Agensi Menengah", range: "21 – 50 Klien / Korporasi", desc: "Banyak project sprint paralel dengan tim account executive dan manajer proyek." },
    { value: "50_plus", label: "Creative Agency Network", range: "> 50 Klien Aktif", desc: "Agensi jaringan nasional dengan multi-divisi kreatif, produksi, dan media buying." },
  ],
  klinik_gigi: [
    { value: "1_5", label: "Praktik Dental Mandiri", range: "1 – 2 Dental Chair (Unit Gigi)", desc: "Dokter gigi melayani langsung dibantu 1 asisten dental / perawat." },
    { value: "6_20", label: "Klinik Gigi Berkembang", range: "3 – 6 Dental Chair", desc: "Memiliki dokter gigi umum, spesialis ortho/bedah mulut, dan resepsionis kasir." },
    { value: "21_50", label: "Dental Care Center", range: "7 – 15 Unit Kursi Gigi", desc: "Operasional padat dengan fasilitas rontgen panoramik dan laboratorium gigi." },
    { value: "50_plus", label: "Jaringan Dental Clinic Multi-Cabang", range: "> 15 Dental Chair", desc: "Multi-cabang klinik gigi estetika dengan sentralisasi rekam medis pasien." },
  ],
};

export function getFilteredScales(
  businessType: BusinessType | null,
  subSector?: string
): { value: BusinessScale; label: string; range: string; desc: string }[] {
  if (subSector && SUBSECTOR_SPECIFIC_SCALES[subSector]) {
    return SUBSECTOR_SPECIFIC_SCALES[subSector];
  }
  if (!businessType || !BUSINESS_SPECIFIC_SCALES[businessType]) {
    return BUSINESS_SPECIFIC_SCALES.lainnya;
  }
  return BUSINESS_SPECIFIC_SCALES[businessType];
}

export const SCALE_OPTIONS = BUSINESS_SPECIFIC_SCALES.lainnya;


