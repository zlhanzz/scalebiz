# Implementation Plan: Restorasi Geometri Bersih Tipografi SCALEBIZ (Pembersihan Kontur E & B dan Masking Oklusi Tangan vs Baju)

Dokumen ini disusun sebelum modifikasi kode sesuai protokol kerja workspace (`RULE[user_global]`).

---

## 1. Analisis Masalah & Akar Masalah (Root Cause)

### 1.1 Keluhan & Permintaan Pengguna:
1. **Huruf B (Tangan vs Baju)**: Hanya bagian yang terhubung/bersentuhan dengan baju hitam developer yang memiliki garis line/stroke; bagian yang tertutup jari tangan dan tablet tidak boleh ada line.
2. **Huruf B (Stroke Liar)**: Menghilangkan garis stroke liar di pertengahan huruf B (kotak persegi panjang di dalam batang vertikal dan loop silang di pinggang huruf B).
3. **Huruf E (Pertengahan Huruf)**: Memperbaiki pertengahan huruf E agar lengan tengah tidak tertutup/menyambung dengan garis vertikal (terbuka mulus menyatu ke tiang utama huruf).

### 1.2 Analisis Teknis & Akar Masalah (Reverse Engineering Vektor):
1. **Overlapping Contours pada Variable Font Montserrat 900**:
   - Font Montserrat dari Google Fonts didistribusikan dalam format variable font. Untuk memudahkan interpolasi ketebalan (weight master), desainer tipe font menggabungkan beberapa bentuk kontur yang saling bertumpuk (overlapping paths).
   - Pada mode pewarnaan solid (`color: #037cfd`), tumpang tindih ini tidak terlihat karena warna fill menyatu. Namun ketika browser mengeksekusi `-webkit-text-stroke` dengan warna transparan (`color: transparent`), browser men-stroke setiap loop sub-path secara terpisah!
   - **Pada Huruf E**: Lengan tengah digambar sebagai persegi panjang tertutup tersendiri (`M585 430 L273 430 L273 260 L585 260 Z`). Sisi kirinya di `X=273` menjorok 16 unit masuk ke dalam batang vertikal (`X=289`). Hal ini menyebabkan browser menggambar garis vertikal penutup di sisi kiri lengan tengah—tampak seperti kotak tersambung di tengah huruf.
   - **Pada Huruf B**:
     - Kedua lubang dalam (*counters*) tidak dibuat terpisah, melainkan disambungkan dengan celah notch terbalik ke arah kiri (`L273 425 L273 269`) yang memotong batang utama, menciptakan kotak persegi panjang internal di tengah batang.
     - Pertemuan lengkung atas dan bawah di pinggang kanan memiliki lompatan koordinat (`L461 333 L481 387`) yang menembus ke dalam badan huruf, menciptakan loop silang yang tampak sebagai "stroke liar".
2. **Oklusi Vertikal Tangan vs Baju pada Huruf B**:
   - Posisi tangan kiri developer (yang memegang bagian bawah bumper case tablet) berada di area atas huruf B (sekitar Y: 0% hingga 45% dari tinggi huruf B).
   - Baju hitam developer menutupi area bawah huruf B (sekitar Y: 45% hingga 100% dari tinggi huruf B).
   - Masking sebelumnya (`.backdrop-front-stroke`) hanya menggunakan gradien horizontal (kiri-ke-kanan), sehingga stroke digambar di seluruh tinggi huruf B, menembus jari tangan dan tablet.

### 1.3 Solusi Komprehensif:
1. **Pembersihan Geometri Vektor (Single-Contour SVG)**:
   - Membuat komponen tipografi SVG `ScalebizTypography` dengan koordinat vektor presisi:
     - **Huruf E**: Poligon tunggal 12 titik tanpa sub-path terpisah (`M307.4,5 L365.6,5 L365.6,22.8 L330.6,22.8 L330.6,32.0 L360.2,32.0 L360.2,49.0 L330.6,49.0 L330.6,57.2 L364.3,57.2 L364.3,75.0 L307.4,75.0 Z`). Bagian tengah 100% terbuka ke tiang utama tanpa garis pembatas.
     - **Huruf B**: Kontur luar lengkung bersih yang bertemu di titik sudut tajam pinggang (`X=435.75, Y=38.43`) tanpa loop tumpang tindih, ditambah 2 lubang counter mandiri tanpa celah notch di dalam batang vertikal.
2. **Masking Khusus Huruf B (Oklusi Tangan vs Baju)**:
   - Menambahkan SVG `<mask id="mask-letter-b">` dengan `linearGradient` vertikal khusus untuk huruf B (`maskContentUnits="objectBoundingBox"`):
     - Area atas (Y: 0% - 42%): `stopOpacity="0"` (100% transparan, stroke tidak digambar di atas tangan/tablet).
     - Transisi halus (Y: 42% - 55%): gradien pemudar.
     - Area bawah (Y: 55% - 100%): `stopOpacity="1"` (100% tampak, stroke menyala dengan rapi di atas baju hitam).
3. **Penyelarasan Layer 1 (Solid Fill) & Layer 4 (Stroke)**:
   - Kedua layer menggunakan geometri SVG yang sama persis sehingga presisi visual di semua ukuran layar (desktop, tablet, mobile) mencapai 100% tanpa pergeseran 1 piksel pun.

---

## 2. Dampak Perubahan

File yang akan dibuat & dimodifikasi:
1. **`src/components/ScalebizTypography.tsx`** *(File Baru)*:
   - Komponen tipografi SVG independen untuk rendering `SCALEBIZ` dengan varian `fill` (Layer 1) dan `stroke` (Layer 4) yang dilengkapi mask oklusi tangan pada huruf B.
2. **`src/components/HeroEditorial.tsx`**:
   - Mengintegrasikan `ScalebizTypography` pada Layer 1 dan Layer 4.
3. **`src/app/globals.css`**:
   - Menambahkan styling responsif untuk `.backdrop-name-svg` (desktop, tablet, mobile) dan mempertahankan gradien feathering badan developer.

---

## 3. Langkah-Langkah Eksekusi

1. **Langkah 1**: Buat komponen `src/components/ScalebizTypography.tsx` berisi path bersih untuk huruf S, C, A, L, E, B, I, Z serta def mask vertikal untuk huruf B.
2. **Langkah 2**: Perbarui `src/components/HeroEditorial.tsx` untuk menggunakan `ScalebizTypography` pada Layer 1 dan Layer 4.
3. **Langkah 3**: Perbarui styling `.backdrop-name-svg` di `src/app/globals.css` untuk memastikan responsive scaling di mobile & desktop.
4. **Langkah 4**: Jalankan verifikasi sistem:
   - Kompilasi TypeScript: `cmd /c pnpm exec tsc --noEmit`.
   - Build produksi Next.js: `cmd /c "if exist .next rmdir /s /q .next && pnpm build"`.
5. **Langkah 5**: Perbarui dokumentasi `WALKTHROUGH.md` dan `functions/PROGRESS.md` sesuai protokol kerja.

---

## 4. Fase Lanjutan: Pembersihan Anomali Interior Huruf 'A' dan 'Z'

### 4.1 Analisis Masalah (Root Cause):
1. **Anomali Huruf 'A' (Dua Potongan Lubang Trapesium Gelap di Kedua Kaki)**:
   - Pada raw variable font Montserrat 900, palang horizontal (*crossbar*) digambar sebagai persegi panjang independen terpisah (`M209.90,62.80L165.70,62.80L171.70,45.80L203.90,45.80L209.90,62.80Z`) yang menindih kedua kaki miring A.
   - Karena SVG menggunakan atribut `fillRule="evenodd"`, setiap area bidang di mana 2 kontur bertumpukan (*winding number* = 2) dianggap berada di luar poligon dan otomatis menjadi transparan / bolong! Hal ini menciptakan dua celah trapesium gelap di kaki kiri dan kanan.
   - Pada mode outline/stroke, palang ini memunculkan garis internal penutup yang memotong kedua kaki huruf A.

2. **Anomali Huruf 'Z' (Dua Lubang Segitiga Gelap di Sudut Atas-Kanan & Bawah-Kiri)**:
   - Garis diagonal huruf Z pada raw font ditarik menembus ke dalam balok horizontal atas (`Y=5.00` s/d `23.30`) dan balok bawah (`Y=56.70` s/d `75.00`), lalu berbalik arah (*self-intersecting loop*).
   - Di bawah aturan `fillRule="evenodd"`, area irisan tumpang tindih di persimpangan diagonal dan balok horizontal memiliki winding number = 2, sehingga dirender sebagai lubang segitiga transparan / gelap.
   - Pada mode stroke, diagonal yang menembus ini menghasilkan garis stroke internal liar di dalam balok horizontal.

### 4.2 Solusi Vektor Bersih (Watertight Single-Polygon):
1. **Huruf 'A' Bersih**:
   - Kontur luar diunifikasi menjadi 8 titik sudut tanpa ada palang terpisah yang menindih:
     `(147.5, 75.0) -> (178.1, 5.0) -> (201.3, 5.0) -> (231.9, 75.0) -> (207.5, 75.0) -> (204.72, 62.8) -> (174.28, 62.8) -> (171.5, 75.0) Z`
   - Lubang dalam (*counter*) segitiga atas dibuat sebagai kontur mandiri 4 titik:
     `(178.15, 45.8) -> (184.9, 16.2) -> (194.1, 16.2) -> (200.85, 45.8) Z`
   - Hasil: Huruf A 100% utuh, padat (*solid*), tidak ada lubang di kaki, dan garis stroke outline mengelilingi tepi luar dan lubang segitiga secara sempurna.

2. **Huruf 'Z' Bersih**:
   - Seluruh huruf Z disatukan menjadi **poligon tunggal 10 titik** yang saling menyambung tanpa tumpang tindih (*non-self-intersecting*):
     Diagonal dipotong tepat pada garis batas horizontal balok atas di `Y=23.30` (`X=531.46`) dan balok bawah di `Y=56.70` (`X=530.24`):
     `M500.50,5.00 L562.20,5.00 L562.20,19.50 L530.24,56.70 L563.80,56.70 L563.80,75.00 L499.50,75.00 L499.50,60.50 L531.46,23.30 L500.50,23.30 Z`
   - Hasil: Huruf Z 100% utuh dan solid tanpa ada lubang segitiga hitam di sudut, dan garis stroke outline membungkus bentuk huruf Z dengan rapi tanpa garis diagonal internal.

## 5. Fase Lanjutan: Optimalisasi Kehalusan Visual & Gradasi Transisi Sempurna (Desktop & Mobile)

### 5.1 Analisis Masalah & Akar Masalah (Root Cause):
1. **Halo Kotak / Boxy Glow Clipping**:
   - Elemen `<svg>` secara baku peramban memiliki `overflow: hidden`. Filter `drop-shadow` CSS yang melebar melebihi batas kanvas SVG (`Y=0` s/d `Y=80`) terpotong secara paksa di batas atas dan bawah.
   - Hal ini memunculkan garis horizontal tajam dari kabut cahaya biru di atas huruf L dan E, tampak seperti "jendela kaca kotak berkabut" di depan baju developer.
2. **Gradasi Peralihan Kasar (Mach Bands pada Linear Ramp)**:
   - Masking sebelumnya menggunakan gradien linier ramp 2-titik yang sempit (misal `transparent` di `-68px` langsung ke `black` di `-25px`).
   - Perubahan turunan tajam ini memicu ilusi optik Mach bands di mana mata manusia melihat garis patahan tegas pada huruf A dan B.
3. **Kontras & Warna Stroke yang Kurang Harmonis**:
   - Stroke berwarna biru gelap `#037cfd` di atas kaos hitam developer memiliki kontras rendah sehingga memerlukan drop-shadow tebal yang justru membuat huruf tampak keruh/kasar.
4. **Pemotongan Vertikal Huruf B yang Terlalu Agresif**:
   - Masking vertikal huruf B sebelumnya memotong 55% bagian atas huruf, sehingga loop atas huruf B hilang sepenuhnya dan huruf B tampak tidak memiliki stroke di desktop.

### 5.2 Solusi Komprehensif:
1. **Unbounded SVG Glow Filter & `overflow: visible`**:
   - Menambahkan `style={{ overflow: "visible" }}` dan atribut `overflow="visible"` pada SVG tipografi.
   - Mengalihkan efek pendaran cahaya ke dalam filter SVG `<filter id="scalebiz-neon-glow" x="-30%" y="-50%" width="160%" height="200%">` dengan dual-drop shadow ber-resolusi tinggi (inti tajam `#38bdf8` 1.8px + aura lembut `#037cfd` 5px).
   - Menghilangkan sepenuhnya garis horizontal batas kotak glow; cahaya mekar secara natural dan mewah ke ruang gelap.
2. **Multi-Stop S-Curve (Smoothstep) Gradation Mask**:
   - Menerapkan kurva transisi multi-stop (0% -> 6% -> 30% -> 75% -> 100%) berbasis kosinus halus pada `.backdrop-front-stroke` baik di desktop maupun mobile.
   - Di sisi kiri (huruf A): Transisi melebur lembut antara solid luar dan stroke dalam tanpa kesan teramputasi.
   - Di sisi kanan (huruf B): Stroke memudar secara lembut ke latar belakang.
3. **SVG Sheen Gradient Stroke (`#037cfd` -> `#38bdf8` -> `#037cfd`)**:
   - Mengaplikasikan `stroke="url(#scalebiz-stroke-sheen)"` yang warnanya identik dengan teks solid `#037cfd` di titik batas transisi, lalu berpendar menjadi cyan elektrik `#38bdf8` di tengah dada.
4. **Soft Vertical Hand Shielding pada Huruf B**:
   - Menghaluskan mask vertikal huruf B (`stopOpacity: 0` pada 0-22%, lalu memudar lembut ke `1` pada 50%) sehingga jari/tablet tetap terlindungi tanpa memotong loop huruf B secara kasar.

## 6. Fase Lanjutan: Penyelarasan Warna Stroke SCALEBIZ Menjadi 100% Identik dengan Huruf Solid Background (#037cfd)

### 6.1 Analisis Masalah & Keluhan Pengguna:
- **Keluhan Pengguna**:
  > *"sekarang malah warna line atau stroke yang ada di tengah menjadi warna rainbow dan tidak mirip dan menyatu dengan warna yang lain pada huruf utuh, samakan warna pada huruf stroke menjadi saama dengan warna huruf utuh yang ada di backgrouund"*
- **Akar Masalah (Root Cause)**:
  - Pada iterasi sebelumnya, stroke line-art menggunakan `linearGradient` dengan transisi warna ke cyan muda (`#38bdf8`) dan filter glow `floodColor="#38bdf8"`.
  - Hal ini menyebabkan huruf L dan E di tengah tampak memiliki nuansa warna yang berbeda (cyan muda/rainbow) dibanding huruf solid biru royal (`#037cfd`) di sekelilingnya, sehingga terkesan tidak menyatu (*mismatch*).

### 6.2 Solusi:
1. **Penetapan Warna Stroke Murni `#037cfd`**:
   - Menghapus gradien warna cyan `#38bdf8`.
   - Menetapkan atribut `stroke="#037cfd"` secara murni pada layer stroke di [src/components/ScalebizTypography.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/components/ScalebizTypography.tsx).
2. **Penyelarasan Warna Filter Glow Murni `#037cfd`**:
   - Mengubah seluruh `floodColor` pada `<filter id="scalebiz-neon-glow">` menjadi `#037cfd` murni (tanpa pendaran cyan).
   - Menghasilkan kesatuan warna monokromatis biru royal yang konsisten, bersih, dan solid di seluruh huruf kata SCALEBIZ baik yang berada di belakang maupun di depan tubuh developer.

---

## 7. Rencana Verifikasi (Fase 6)

- **TypeScript Verification**: Memastikan `tsc --noEmit` keluar dengan Exit Code 0 tanpa error tipe.
- **Production Build Verification**: Memastikan Next.js build sukses dengan Exit Code 0.
- **Verifikasi Visual**:
  - Warna garis outline stroke huruf L dan E 100% identik dan senada dengan huruf solid S, C, A, B, I, Z (`#037cfd`).
  - Nol nuansa rainbow atau cyan mismatch.
  - Efek 3D teks melayang tetap bekerja mulus tanpa benturan warna.

---

## 8. Fase Baru: Optimalisasi Tampilan Responsif FAQ / QNA Fit Sempurna di Layar Mobile

### 8.1 Analisis Masalah & Keluhan Pengguna
- **Keluhan Pengguna**:
  > *"selanjutnya membuat agar tampilan QNA fit di tampilan mobile"*
- **Bukti Tangkapan Layar & Analisis Kerusakan (Root Cause)**:
  1. **Overflow Kolom Kanan Grid (`min-width: auto`)**:
     - `.faq-layout-grid` menggunakan `grid-template-columns: 1fr` pada mobile (`@media (max-width: 992px)`).
     - Dalam spesifikasi CSS Grid, track `1fr` ekuivalen dengan `minmax(auto, 1fr)` di mana ukuran minimum dihitung berdasarkan lebar konten minimum (`min-content`).
     - Di dalam `.faq-right-column`, terdapat deretan filter pill `.faq-categories-wrapper` dengan `flex-wrap: nowrap` dan teks tanpa putus (`white-space: nowrap`). Lebar total kombinasi 5 pill kategori tersebut mencapai **~720px**.
     - Karena `.faq-right-column` tidak memiliki `min-width: 0`, kolom grid terdorong melebar hingga minimal **720px**, jauh melebihi lebar layar smartphone (360px–430px).
     - Akibatnya, seluruh kartu akordeon pertanyaan FAQ (`.faq-accordion-item`) ikut melebar menjadi 720px, sehingga sisi kanan kartu, teks pertanyaan yang panjang (nomor 03, 04, 07, 08), dan ikon pemicu expand `+` terdorong keluar layar (*clipped / off-screen*) di sisi kanan.
  2. **Margin Negatif Pembocor Kontainer**:
     - `.faq-categories-wrapper` memiliki deklarasi `margin-right: -24px; padding-right: 24px;` yang membocorkan lebar elemen ke luar kontainer halaman dan memicu *horizontal scroll* pada mobile.
  3. **Fleksibilitas Judul Pertanyaan & Ikon Expand**:
     - `.faq-trigger-header` tidak memiliki `min-width: 0`, sehingga teks pertanyaan panjang tidak membungkus (*word-wrap*) secara sempurna pada layar yang sangat sempit.
     - `.faq-accordion-trigger` menggunakan `align-items: center`, sehingga pada pertanyaan yang membungkus 2–3 baris, nomor urut badge dan ikon plus berada di tengah secara canggung alih-alih rapi di baris pertama.

### 8.2 Dampak Perubahan (Files Touched)
1. [src/app/globals.css](file:///c:/Users/ZHULL/Documents/Freelance/src/app/globals.css):
   - Menambahkan aturan `min-width: 0` dan `width: 100%` pada `.faq-layout-grid`, `.faq-left-column`, dan `.faq-right-column`.
   - Mengatur `.faq-categories-wrapper` agar terkunci dalam batas kontainer (`max-width: 100%`), scroll horizontal mulus tanpa scrollbar buruk, dan tanpa margin negatif perusak layout.
   - Mengoptimalkan padding, ukuran font, dan penataan flex pada `.faq-accordion-trigger`, `.faq-trigger-header`, `.faq-item-question`, dan `.faq-accordion-inner` khusus pada breakpoint mobile (`max-width: 768px` dan `max-width: 480px`).
   - Mengatur tata letak responsif 1-kolom pada `.process-steps-grid` di layar mobile agar tidak sempit atau terpotong.
2. [src/components/FAQSection.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/components/FAQSection.tsx):
   - Memastikan hierarki DOM dan class pendukung sepenuhnya kompatibel dan terproteksi dari overflow.

### 8.3 Rencana Langkah Eksekusi Perubahan
1. Memperbarui styling CSS FAQ di `src/app/globals.css`:
   - Kunci grid mobile: `grid-template-columns: minmax(0, 1fr)`.
   - Kunci kolom kanan & kiri: `min-width: 0; width: 100%; max-width: 100%`.
   - Rapikan `.faq-categories-wrapper` agar scroll horizontal sentuh aman tanpa overflow halaman.
   - Buat `.faq-accordion-trigger` rapi dengan `align-items: flex-start`, `min-width: 0`, dan wrapping teks pertanyaan `word-break: break-word`.
   - Tambahkan styling khusus layar kecil (<= 480px) untuk padding dan font size proporsional.
2. Menjalankan verifikasi tipe TypeScript (`tsc --noEmit`).
3. Menjalankan verifikasi build Next.js (`pnpm build`).
4. Menguji render layout mobile pada simulasi viewport 375px dan 414px untuk memastikan kartu FAQ fit 100%, border kanan terlihat jelas, teks pertanyaan membungkus rapi, dan ikon `+` selalu tampak di tepi kanan kartu.
5. Mendokumentasikan hasil pekerjaan ke `WALKTHROUGH.md` dan `functions/PROGRESS.md`.

### 8.4 Rencana Verifikasi (Fase 8)
- TypeScript: Exit Code 0.
- Build Next.js: Exit Code 0.
- Zero Horizontal Overflow: Halaman mobile tidak memiliki scroll horizontal yang tidak diinginkan.
- Visual Fit: Seluruh kartu QNA, badge nomor, teks pertanyaan lengkap, dan ikon `+` berada sepenuhnya di dalam batas layar ponsel.

---

## 9. Fase Baru: Pembuatan Section "4 Pilar Layanan Scalebiz (Custom Sesuai Kebutuhan)"

### 9.1 Analisis Kebutuhan & Permintaan Pengguna
- **Permintaan Pengguna**:
  > *"sebelum masuk ke section "Website & Sistem Apa yang Cocok untuk Bisnis Saya?" mari buat section diatasnya dan dibawah dari section hero, yaitu section 4 Pilar Layanan Kami: terkait dengan custom sesuai kebutuhan (Website, Pos Keuangan & Kasir, ERP dan Automation)"*
- **Tujuan & Nilai Strategis**:
  - Menyisipkan section baru di antara Hero Editorial (`HeroEditorial`) dan Wizard Diagnosa Bisnis (`BusinessSolutions`).
  - Menjelaskan secara tegas 4 pilar arsitektur solusi kustom Scalebiz:
    1. **Website & Digital Presence** (Company profile korporat, landing page konversi, katalog produk, SEO & direct WhatsApp).
    2. **POS Keuangan & Kasir** (Kasir point-of-sale multi-outlet, kontrol kas real-time, cetak struk/QRIS, rekap omset otomatis ke WA).
    3. **ERP & Sistem Operasional Bisnis** (Stok multi-gudang, HPP otomatis, tracking proyek, portal tim & presensi GPS).
    4. **Automation & Alur Kerja Digital** (Integrasi WhatsApp API, bot notifikasi, reminder invoice jatuh tempo, sinkronisasi data antar sistem).
  - Menekankan diferensiasi: **100% Kustom Sesuai SOP & Alur Kerja Riil Klien** (bukan template software kaku yang memaksa bisnis mengalah).
  - Menyediakan jembatan natural (*bridge CTA*) ke alat diagnosa interaktif di bawahnya.

### 9.2 Dampak Perubahan (Files Touched)
1. [src/components/ServicePillars.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/components/ServicePillars.tsx) (File Baru):
   - Komponen representasi visual 4 pilar dengan desain modern, micro-badges, bullet point kapabilitas kustom, dan jembatan ke diagnosa bisnis.
2. [src/app/page.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/app/page.tsx):
   - Mengimpor dan merender `<ServicePillars />` tepat di antara `<HeroEditorial />` dan `<BusinessSolutions />`.
3. [src/app/globals.css](file:///c:/Users/ZHULL/Documents/Freelance/src/app/globals.css):
   - Styling terintegrasi untuk `.service-pillars-section`, layout grid 4-kolom desktop / 2-kolom tablet / 1-kolom mobile, styling kartu glassmorphism bertema dark mode, efek hover glow, dan mobile-fit 100%.

### 9.3 Rencana Langkah Eksekusi Perubahan
1. **Membuat Komponen [src/components/ServicePillars.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/components/ServicePillars.tsx)**:
   - Data struktur 4 pilar yang kaya, jelas, dan berorientasi hasil bisnis (Anti-Slop).
   - Tampilan badge nomor, ikon pilar, judul, deskripsi filosofi kustom, daftar fitur implementasi riil, dan sorotan keunggulan kustom.
   - Banner bridge di bagian bawah kartu untuk mengarahkan pengguna ke wizard diagnosa 2 menit (`#diagnosa-sistem`).
2. **Menambahkan Styling di [src/app/globals.css](file:///c:/Users/ZHULL/Documents/Freelance/src/app/globals.css)**:
   - Responsif 4-kolom (desktop) -> 2-kolom (tablet <= 1024px) -> 1-kolom (mobile <= 640px).
   - Pastikan `min-width: 0`, `box-sizing: border-box`, dan proteksi overflow horizontal pada mobile.
3. **Mengintegrasikan ke [src/app/page.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/app/page.tsx)**:
   - Pasang `<ServicePillars />` di antara `HeroEditorial` dan `BusinessSolutions`.
4. **Verifikasi Teknis & Build**:
   - `tsc --noEmit` -> Exit Code 0.
   - `pnpm build` -> Exit Code 0.
5. **Dokumentasi**:
   - Catat di `WALKTHROUGH.md` dan `functions/PROGRESS.md`.

### 9.4 Rencana Verifikasi (Fase 9)
- TypeScript: Exit Code 0.
- Next.js Build: Exit Code 0.
- Urutan DOM: Hero $\rightarrow$ 4 Pilar Layanan $\rightarrow$ Diagnosa Sistem $\rightarrow$ FAQ $\rightarrow$ Footer.
- Tampilan Visual: Bersih, premium, selaras dengan palet warna dark `#037cfd` dan `#38bdf8`, fit sempurna di mobile tanpa overflow.

---

## 10. Fase Baru: Refactoring UI/UX Section 4 Pilar Layanan — Eliminasi Total AI Slop Menjadi Desain Developer Profesional & Berwibawa

### 10.1 Analisis Masalah & Kritik Pengguna (Root Cause of AI Slop)
- **Kritik Pengguna**:
  > *"terlalu ai slope, tolong evaluasi ui/ux nya agar tidak terlalu seperti ai yang biasa lu implementasikan, buat menjadi lebh profesional layaknya yang biasa seorang developer profesonal"*
- **Pembedahan Elemen AI Slop yang Muncul Sebelumnya**:
  1. **Template Kartu Seragam 4-Warna Permen (*Rainbow Neon Border Lines*)**:
     - Penggunaan 4 garis border warna berbeda (cyan, hijau, biru, oranye) pada kartu yang berjejer identik merupakan ciri khas template AI generik / ChatGPT output.
  2. **Penggunaan Emoji sebagai Ikon & Tag Utama**:
     - Keberadaan emoji (`🌐`, `💳`, `🏢`, `⚡`, `🔒`, `📊`, `🤖`) membuat tampilan terkesan amatir dan tidak mencerminkan studio rekayasa perangkat lunak (*software engineering*) berbobot.
  3. **Kotak Bersarang dengan Checklist Klise ("CAKUPAN MODUL KUSTOM:")**:
     - Kotak abu-abu di dalam kartu yang memuat daftar centang terkesan kaku seperti slide presentasi buatan AI alih-alih UI produk nyata.
  4. **Ketiadaan Bukti Substansi Teknis & Visual Riil**:
     - Developer profesional tidak sekadar menampilkan kartu teks klise; mereka menampilkan **artefak digital riil**: telemetri data, mockup jendela browser kecepatan tinggi, slip audit kasir digital, visualisasi inventori gudang, dan log otomatisasi WhatsApp yang nyata dan dapat dipahami calon klien.

### 10.2 Solusi Desain Baru (Arsitektur Studio Rekayasa Perangkat Lunak)
1. **Palet Warna Monokromatis Berwibawa (Deep Slate & Scalebiz Royal Blue)**:
   - Menghapus 4 warna neon permen.
   - Menggunakan warna dasar *deep slate / dark glass* dengan aksen teknis konsisten khas Scalebiz (`#037cfd` dan `#38bdf8`), dipadukan dengan tipografi monoline berpresisi tinggi.
2. **Eliminasi 100% Emoji**:
   - Seluruh emoji digantikan oleh **SVG Monoline Vector Icons** kustom dan label teknis bergaya arsitektur (`[ MODULE // 01 ]`, `[ LATENCY // < 1.2S ]`, `[ TELEMETRY // ACTIVE ]`).
3. **Penyajian 4 Artefak Interaktif UI Riil (Bespoke Product Artifacts)**:
   - **Pilar 1 (Website & Digital Presence)**: Menampilkan jendela browser minimalis dengan skor PageSpeed `99/100`, metrik latensi sub-detik (`TTFB 42ms`), dan live preview profil B2B.
   - **Pilar 2 (POS Keuangan & Kasir)**: Menampilkan slip audit penutupan kasir shift malam (`Total 148 Struk Lunas`, `Selisih Kas Rp 0`, `Rekap Otomatis Terkirim ke WA Owner`).
   - **Pilar 3 (ERP & Operasional Bisnis)**: Menampilkan telemetri stok multi-gudang dan status verifikasi nota pengeluaran lapangan oleh tim.
   - **Pilar 4 (Automation & Alur Kerja)**: Menampilkan log alur pesan WhatsApp Gateway resmi yang terkirim otomatis saat transaksi terjadi tanpa campur tangan manual.
4. **Tata Letak 2x2 Bento Engineering Grid**:
   - Mengganti deretan kartu sempit seragam dengan tata letak 2-kolom lega (desktop & tablet) yang memberikan ruang cukup untuk penjelasan teknis dan artefak UI interaktif, serta merapat ke 1-kolom rapi di mobile.

### 10.3 Dampak Perubahan (Files Touched)
1. [src/components/ServicePillars.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/components/ServicePillars.tsx):
   - Merombak total struktur data, menghapus semua emoji, menerapkan SVG vector monoline, dan membangun artefak UI mini yang realistis di setiap pilar.
2. [src/app/globals.css](file:///c:/Users/ZHULL/Documents/Freelance/src/app/globals.css):
   - Memperbarui styling `.service-pillars-section` dengan tata letak Bento Grid 2x2, artefak mockup dark-mode, micro-typography monospaced, dan proteksi mobile tanpa horizontal scroll.

### 10.4 Rencana Langkah Eksekusi Perubahan
1. Memperbarui `src/components/ServicePillars.tsx` dengan arsitektur baru.
2. Memperbarui styling CSS di `src/app/globals.css`.
3. Menjalankan verifikasi tipe TypeScript (`tsc --noEmit`).
4. Menjalankan verifikasi build Next.js (`pnpm build`).
5. Mendokumentasikan ke `WALKTHROUGH.md` dan `functions/PROGRESS.md`.

### 10.5 Rencana Verifikasi (Fase 10)
- TypeScript: Exit Code 0.
- Next.js Build: Exit Code 0.
- Visual: Bebas dari warna rainbow AI, bebas emoji, tampilan bernuansa developer studio profesional kelas atas (Linear/Stripe style).

---

## 11. Fase Baru: Pengembalian Struktur & Penjelasan Kartu 4 Pilar Layanan Menggunakan Ikon SVG Monoline Modern

### 11.1 Analisis Preferensi & Keputusan Pengguna
- **Feedback & Keputusan Pengguna**:
  > *"secara susunan dan struktur serta pembahasan dan penjelasan ebih bagus sebelumnnya, tapi secara icon lebih bagus yang sekarang. mending sebelumnnya dengan memakai icon yang sekarang"*
- **Poin Kunci Solusi**:
  1. **Kembali ke Struktur & Penjelasan Sebelumnya**:
     - Mengembalikan tata letak 4 kartu berdampingan (4 kolom desktop / 2 kolom tablet / 1 kolom mobile).
     - Mengembalikan hierarki: Nomor urut (`01`, `02`, `03`, `04`), badge kategori (`KREDIBILITAS & KONVERSI`, `ARUS KAS & ANTI-FRAUD`, `KONTROL OPERASIONAL & STOK`, `OTOMASI 24/7 TANPA HENTI`), judul pilar, paragraf penjelasan manfaat riil yang komprehensif, daftar 4 kapabilitas modul kustom dengan centang rapi, dan pill nilai tambah di bagian bawah kartu.
     - Penjelasan dan pembahasan lebih to-the-point dan mudah dipahami oleh pemilik bisnis lokal saat membandingkan 4 pilar sekaligus.
  2. **Integrasi Ikon SVG Monoline Modern**:
     - Mengganti seluruh emoji lama (`🌐`, `💳`, `🏢`, `⚡`, `🎯`, `🚫`, `📱`, `🔒`, `📊`, `🤖`) dengan **SVG Monoline Vector Icons** modern dan presisi yang dipuji pengguna.
     - Ikon pilar menggunakan frame monoline yang bersih dan elegan sesuai warna aksen masing-masing pilar.

### 11.2 Dampak Perubahan (Files Touched)
1. [src/components/ServicePillars.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/components/ServicePillars.tsx):
   - Merestorasi data dan markup struktur kartu 4-kolom sebelumnya, dengan seluruh slot ikon diisi oleh SVG monoline vektor murni.
2. [src/app/globals.css](file:///c:/Users/ZHULL/Documents/Freelance/src/app/globals.css):
   - Mengembalikan sistem tata letak `.pillars-cards-grid` (4 kolom desktop, 2 kolom tablet, 1 kolom mobile), styling kartu `.pillar-feature-card` dengan garis aksen atas, dan integrasi SVG icon frame.

### 11.3 Rencana Langkah Eksekusi Perubahan
1. Memperbarui [src/components/ServicePillars.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/components/ServicePillars.tsx) dengan struktur penjelasan kartu lengkap dan ikon SVG vektor.
2. Menyesuaikan CSS di [src/app/globals.css](file:///c:/Users/ZHULL/Documents/Freelance/src/app/globals.css).
3. Menjalankan verifikasi tipe TypeScript (`tsc --noEmit`).
4. Menjalankan verifikasi build Next.js (`pnpm build`).
5. Mendokumentasikan ke `WALKTHROUGH.md` dan `functions/PROGRESS.md`.

### 11.4 Rencana Verifikasi
- TypeScript: Exit Code 0.
- Next.js Build: Exit Code 0.
- Layout: 4 kartu pilar sejajar dengan struktur penjelasan lengkap, checklist modul kustom, dan ikon SVG monoline yang modern tanpa emoji.

---

## 12. Fase Pembersihan Copywriting: Penghapusan Asosiasi Hardware Kasir & Kata 'Kaku'

### 12.1 Analisis Permintaan Pengguna
- **Permintaan Pengguna**:
  > *"hapus aja inii, hapus juga kata kaku di kalimat bebas biaya langganan bulanan"*
  > Disertai 2 tangkapan layar:
  > 1. `Responsif & Ringan di HP Tim` (Value Tag pada header section).
  > 2. `(Touchscreen & Tablet Ready)` (Keterangan di checklist Pilar 02 POS Kasir).
- **Tujuan Perubahan**:
  1. Menghilangkan asumsi bahwa Scalebiz menyediakan/membutuhkan perangkat keras fisik (hardware seperti tablet/HP khusus).
  2. Menghapus teks `(Touchscreen & Tablet Ready)` pada item modul POS Kasir sehingga menjadi `Web POS Kasir Cepat`.
  3. Menghapus tag `Responsif & Ringan di HP Tim` pada deretan badge nilai di header section sehingga tersisa 3 tag nilai yang esensial.
  4. Menghapus kata `Kaku` pada frasa `Bebas Biaya Langganan Bulanan Kaku` (header tag) dan `Tanpa Biaya Sewa Bulanan Kaku (Milik Bisnis Sendiri)` (footer pill pilar 02).

### 12.2 Dampak Perubahan (Files Touched)
1. [src/components/ServicePillars.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/components/ServicePillars.tsx):
   - Menghapus tag `Responsif & Ringan di HP Tim`.
   - Mengubah `Bebas Biaya Langganan Bulanan Kaku` -> `Bebas Biaya Langganan Bulanan`.
   - Mengubah `Web POS Kasir Cepat (Touchscreen & Tablet Ready)` -> `Web POS Kasir Cepat`.
   - Mengubah `Tanpa Biaya Sewa Bulanan Kaku (Milik Bisnis Sendiri)` -> `Tanpa Biaya Sewa Bulanan (Milik Bisnis Sendiri)`.

### 12.3 Rencana Langkah Eksekusi Perubahan
1. Mengedit [src/components/ServicePillars.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/components/ServicePillars.tsx).
2. Memverifikasi dengan TypeScript (`tsc --noEmit`).
3. Memverifikasi build Next.js (`pnpm build`).
4. Memperbarui `WALKTHROUGH.md` dan `functions/PROGRESS.md`.

### 12.4 Rencana Verifikasi
- TypeScript: Exit Code 0.
- Next.js Build: Exit Code 0.
- Teks visual bersih dari `(Touchscreen & Tablet Ready)`, tag `Responsif & Ringan di HP Tim`, dan kata `Kaku`.

---

## 13. Fase Penghapusan Banner Jembatan Pilar & Penambahan Menu Layanan pada Navbar Header

### 13.1 Analisis Permintaan Pengguna
- **Permintaan Pengguna**:
  > *"hapus aja bagian ini. btw sekalian tambah menu layanan di header yang mengarah pada section pilar layanan"*
  > Disertai tangkapan layar kartu banner jembatan:
  > `"BELUM TAHU HARUS MEMULAI DARI MANA? Cek Pilar Mana yang Paling Mendesak untuk Bisnis Anda Saat Ini..."`
- **Tujuan Perubahan**:
  1. Menghapus banner jembatan `.pillars-bridge-banner` di bagian bawah section 4 Pilar Layanan untuk menyederhanakan layout agar kartu pilar langsung berdiri mandiri dan transisi ke section berikutnya lebih bersih.
  2. Menambahkan tautan menu navigasi `Layanan` pada header `<Navbar />` yang mengarah langsung ke section 4 Pilar Layanan (`href="#layanan"`).
  3. Menyesuaikan atribut ID section pilar menjadi `id="layanan"` agar semantik dan konsisten dengan tautan navigasi.
  4. Menghapus margin bawah `.pillars-cards-grid` yang sebelumnya digunakan untuk memberi jarak ke banner jembatan, sehingga ritme spasi vertikal tetap proporsional.

### 13.2 Dampak Perubahan (Files Touched)
1. [src/components/ServicePillars.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/components/ServicePillars.tsx):
   - Mengubah ID section: `id="layanan-pilar"` -> `id="layanan"`.
   - Menghapus blok JSX banner jembatan `.pillars-bridge-banner`.
   - Menghapus variabel konstanta `whatsappUrl` yang tidak lagi digunakan.
2. [src/components/Navbar.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/components/Navbar.tsx):
   - Menambahkan `<a href="#layanan">Layanan</a>` pada deretan navigasi `.nav-links`.
3. [src/app/globals.css](file:///c:/Users/ZHULL/Documents/Freelance/src/app/globals.css):
   - Mengubah `margin-bottom: 56px` pada `.pillars-cards-grid` menjadi `margin-bottom: 0`.
   - Mengubah `margin-bottom: 36px` pada breakpoint mobile menjadi `margin-bottom: 0`.

### 13.3 Rencana Langkah Eksekusi Perubahan
1. Memperbarui `src/components/ServicePillars.tsx`.
2. Memperbarui `src/components/Navbar.tsx`.
3. Menyesuaikan CSS di `src/app/globals.css`.
4. Menjalankan verifikasi tipe TypeScript (`tsc --noEmit`).
5. Menjalankan verifikasi build Next.js (`pnpm build`).
6. Mendokumentasikan ke `WALKTHROUGH.md` dan `functions/PROGRESS.md`.

### 13.4 Rencana Verifikasi
- TypeScript: Exit Code 0.
- Next.js Build: Exit Code 0.
- Banner jembatan hilang bersih.
- Navbar memiliki tautan `Layanan` yang mengarahkan pengguna mulus ke `#layanan`.

---

## 14. Fase Pembersihan Tag 'Terhubung Langsung ke WhatsApp' & Perbaikan Scroll Navigasi Layanan

### 14.1 Analisis Masalah (Root Cause)
1. **Keterangan 'Terhubung Langsung ke WhatsApp'**:
   - Pengguna mengeluhkan: *"kenapa kererangan tidak profesional dan tidak jelas ini belum dihapus"* disertai tangkapan layar tag `Terhubung Langsung ke WhatsApp`.
   - Pada revisi sebelumnya, tag `Responsif & Ringan di HP Tim` dihapus, namun tag `Terhubung Langsung ke WhatsApp` di sampingnya masih tertinggal di JSX. Tag ini dinilai tidak jelas fungsinya dan tidak profesional di header pilar layanan.
   - Solusi: Menghapus tag `Terhubung Langsung ke WhatsApp` dari [src/components/ServicePillars.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/components/ServicePillars.tsx).
2. **Navigasi 'Layanan' di Header Tidak Mengarah ke Section**:
   - Pengguna mengeluhkan: *"kenapa kalau kita klik layanan di header tidak mengarah ke section layanan"*.
   - Akar masalah teknis:
     - Tautan anchor HTML baku `<a href="#layanan">` pada single page application Next.js sering mengalami kegagalan scroll jika terjadi benturan dengan `scroll-behavior: smooth` di `html` dan `overflow-x: hidden` pada `body` (bug umum rendering Chromium/Windows).
     - Selain itu, tanpa offset scrolling eksplisit (`scroll-margin-top` atau `window.scrollTo` dengan kalkulasi `getBoundingClientRect`), klik tautan dapat tertahan atau terhalang offset.
   - Solusi:
     - Menjadikan `Navbar.tsx` sebagai Client Component (`"use client"`) dengan custom click handler `scrollToSection` yang memanggil `window.scrollTo({ top: targetTop, behavior: 'smooth' })`.
     - Menambahkan styling `scroll-margin-top: 40px` dan `overflow-x: clip` di [src/app/globals.css](file:///c:/Users/ZHULL/Documents/Freelance/src/app/globals.css) agar Chromium dapat menggulir viewport tanpa hambatan.

### 14.2 Dampak Perubahan (Files Touched)
1. [src/components/ServicePillars.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/components/ServicePillars.tsx):
   - Menghapus tag `Terhubung Langsung ke WhatsApp`.
2. [src/components/Navbar.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/components/Navbar.tsx):
   - Menambahkan `"use client"` dan fungsi `scrollToSection` untuk seluruh tautan navigasi (`Layanan`, `Portofolio`, `Diagnosa Bisnis`, `FAQ`).
3. [src/app/globals.css](file:///c:/Users/ZHULL/Documents/Freelance/src/app/globals.css):
   - Memastikan `scroll-margin-top: 40px` untuk `#layanan`, `#portofolio`, `#diagnosa-sistem`, `#faq` dan `overflow-x: clip`.

### 14.3 Rencana Langkah Eksekusi Perubahan
1. Memperbarui `src/components/ServicePillars.tsx` (hapus tag WhatsApp).
2. Memperbarui `src/components/Navbar.tsx` (implementasi smooth scroll JavaScript handler).
3. Memperbarui `src/app/globals.css` (tambahkan scroll-margin-top).
4. Verifikasi `tsc --noEmit` dan `pnpm build`.
5. Perbarui `WALKTHROUGH.md` dan `functions/PROGRESS.md`.

### 14.4 Rencana Verifikasi
- TypeScript: Exit Code 0.
- Next.js Build: Exit Code 0.
- Tag `Terhubung Langsung ke WhatsApp` 100% hilang.
- Klik tombol `Layanan` di navbar header teruji memicu scrolling mulus ke `#layanan`.
