# Walkthrough: Pembuatan Website Konsep Interaktif & Sistem Intake "Lucky Leaf Tattoo" (Buffalo, NY)

Dokumen ini mencatat seluruh implementasi teknis, estetika desain minimalis-botanikal, penyempurnaan proporsi visual, dan alur intake klien untuk **Lucky Leaf Tattoo** (Artis/Owner: Din Tran, 1809 Hertel Ave, Buffalo, NY).

---

## Update Terbaru: Penyempurnaan Proporsi Vertikal Foto Hero & Visual Balance
- **Masalah Awal**: Foto hero menjulur terlalu tinggi ke atas (aspect ratio 3/4 tinggi ~600px+), badge ginkgo melayang di posisi negatif menembus padding atas, dan margin atas yang terlalu rapat membuat foto menempel ke header navigasi sehingga terlihat kurang proporsional terhadap kolom teks headline di sebelah kiri.
- **Solusi yang Diterapkan**:
  1. **Breathing Room Header**: Padding atas section dinaikkan dari `54px` menjadi `68px`, memberikan ruang bernapas yang lega dan elegan di bawah sticky navbar.
  2. **Rasio Aspek Seimbang**: Mengubah aspek rasio kartu foto hero dari `3/4` menjadi `4/5` serta menambahkan batas tinggi `maxHeight: "490px"` dan `maxWidth: "440px"`. Tinggi kartu foto kini ~480px, sangat simetris dan proporsional dengan tinggi kolom teks kiri (~460px).
  3. **Penyesuaian Focal Point**: Mengatur `objectPosition: "center 28%"` sehingga detail garis halus tato ranting ginkgo & sakura di pundak model langsung menjadi pusat perhatian visual.
  4. **Inset Badge & Caption yang Rapi**: Memindahkan floating ginkgo circle badge ke dalam foto (`top: 16px, right: 16px`) dengan efek *frosted glass* (`backdropFilter: blur(8px)`), serta mempercantik kartu caption karya di bagian bawah foto.
  5. **Verifikasi Visual**: Lolos uji kompilasi TypeScript (`0 error`) dan pengujian visual otomatis Puppeteer baik pada desktop (1280x900) maupun mobile (375x812).

---

## 1. Analisis Bisnis & Penerapan Alur Kerja Real

Berdasarkan investigasi foto dan screenshot story di `leads/OFFERING/`:
- **Profil Bisnis**: Private appointment-only tattoo sanctuary di Hertel Avenue, Buffalo, NY. Berfokus pada seni tato botani *fine-line*, fauna, dan karya tubuh yang bermakna dengan suasana yang tenang, tanpa intimidasi, dan inklusif.
- **Nilai Unik & Marketing Psychology**:
  - Mengatasi kecemasan klien (*tattoo anxiety*): banyak studio tato jalanan bising dan mengintimidasi. Lucky Leaf adalah *private sanctuary* di mana klien merasa dirawat (*taken care of*).
  - *Social Proof* kuat: Rating sempurna **5.0 Google Reviews (112 ulasan)** tanpa satupun ulasan buruk.
  - Proyek Ikonik Budaya: **The 1,000 Paper Cranes Project (Senbazuru)** — Din Tran mentato 1.000 origami burung bangau untuk kolektor di Buffalo sebagai simbol harapan & pemulihan.
  - Katalog Flash Eksklusif 1-of-1: Desain hanya ditato **satu kali**, langsung pensiun permanen, dengan prioritas kalender.
- **Alur Intake Resmi (Dari Screenshot Instagram Story Din Tran)**:
  1. *Detailed Description* (ide dan elemen tato).
  2. *Location on Body* (penempatan tubuh & aliran anatomi).
  3. *Approximate Size* (perkiraan ukuran dalam inci).
  4. *Reference Pictures* (mekanisme upload foto referensi).
  5. *When You're Looking to Get Tattooed* (bulan target/ketersediaan).
  6. *What Days Work for the Appointment* (hari kerja/akhir pekan yang fleksibel).
  7. *Kebijakan Deposit & Pembatalan*: Deposit *non-refundable* dipotongkan ke total tato, sketsa dikirim 3–5 hari sebelum sesi, batas toleransi keterlambatan 20 menit, dan penjadwalan ulang minimal 5 hari sebelumnya.

---

## 2. Aset & Desain Sistem yang Dihasilkan

### A. Ekstraksi Asset Visual (`public/images/demo/lucky-leaf/`)
- `logo-ginkgo.png`: Logo daun ginkgo biloba hitam-putih yang menjadi sigil utama studio.
- `hero-tattoo-real.jpg`: Foto tato asli *fine-line* botani ranting ginkgo biloba & kuncup bunga sakura pada bahu/collarbone klien di pencahayaan hangat sanctuary alami.
- `hero-storefront-leaf.jpg`: Foto asli klien memegang daun ginkgo hijau segar di depan etalase kaca stiker 1809 Hertel Ave.
- **6 Karya Flash 1-of-1**:
  - `flash-butterfly-omamori.jpg` (Talisman Kupu-kupu Omamori)
  - `flash-peony.jpg` (Imperial Peony Blossom)
  - `flash-goldfish-pair.jpg` (Goldfishy Serenity Pair)
  - `flash-geisha-masks.jpg` (Geisha dengan Topeng Hannya & Kitsune)
  - `flash-bluejay.jpg` (Blue Jay Perched)
  - `flash-flowing-goldfish.jpg` (Ryukin Goldfish)
- **8 Karya Healed Linework Klien**:
  - `work-dagger-cherry.jpg` (Belati & Bunga Sakura)
  - `work-moth.jpg` (Ngengat Sutra Botani)
  - `work-lily-valley.jpg` (Lily of the Valley)
  - `work-cherry-blossom.jpg` (Ranting Sakura Halus)
  - `work-daffodil.jpg` (Bunga Bakung Berbayang)
  - `work-ginkgo-tattoo.jpg` (Ranting Ginkgo Biloba)
  - `work-tulip.jpg` (Single Stem Tulip)
  - `work-foliage-sleeve.jpg` (Sleeve Ranting Dedaunan)
- `google-reviews-proof.png`: Bukti review 5.0 bintang Google dengan 112 ulasan.

### B. Palet Warna & Tipografi Anti-Slop
- **Canvas / Background**: Warm Silk `#FAF7F2` dan Antique Linen `#F3EFE9`.
- **Accent Utama**: Botanical Ginkgo Sage (`#4A5F4E`) & Soft Terracotta Clay (`#C48B77`).
- **Teks & Kontras**: Sumi Ink Charcoal (`#1C1B1A`) dan Warm Stone (`#54504A`).
- **Tipografi**: Playfair Display (Serif elegan untuk *headpiece* & editorial) dan Plus Jakarta Sans (Sans-serif presisi dan *clean*).
- **Iconography**: 20 inline SVG modern profesional tanpa emoji mentah (`LuckyLeafIcons.tsx`).

---

## 3. Komponen & Fitur Interaktif

1. **`src/components/preview/lucky-leaf/LuckyLeafIcons.tsx`**:
   - Berisi kumpulan ikon SVG presisi: `IconGinkgo`, `IconCrane`, `IconNeedle`, `IconShieldCheck`, `IconCalendar`, `IconClock`, `IconRuler`, `IconUpload`, `IconSparkles`, `IconTrash`, dll.
2. **Hero Section dengan Foto Real Fine-Line Tattoo**:
   - Menampilkan karya tato ranting ginkgo & sakura asli pada kulit (`hero-tattoo-real.jpg`) dengan aspect ratio `3/4`, badge floating, caption karya Din Tran, serta dua tombol CTA proporsional:
     - `[ Request Appointment -> ]` (membuka modal intake wizard 5-tahap).
     - `[ ✦ Explore 1-of-1 Flash ]` (smooth scroll ke katalog flash claimable).
3. **Sistem Modal Intake Wizard 5-Tahap (`LuckyLeafBookingModal.tsx`)**:
   - Menuntun klien secara bertahap tanpa mengotori estetika landing page:
     - **Step 1 (Concept & Subject)**: Pilihan Custom Commission vs 1-of-1 Flash Claim + deskripsi mendalam ide tato.
     - **Step 2 (Placement & Size)**: Pilihan lokasi tubuh anatomi (Inner Forearm, Clavicle, Ribs, Thigh, dll.) + pilihan skala inci.
     - **Step 3 (References & Inspiration)**: Drag-and-drop & file picker untuk upload foto referensi dengan pratinjau thumbnail instan (`FileReader` data URL), nama file, ukuran, dan tombol hapus individual.
     - **Step 4 (Schedule & Studio Policies)**: Pilihan bulan target, multi-select hari kerja, kontak lengkap klien, dan checkbox persetujuan deposit non-refundable & batas toleransi 20 menit.
     - **Step 5 (Digital Pass)**: Menerbitkan tiket pass digital `#LL-XXXX` dengan rangkuman data dan hitungan foto referensi terlampir.
4. **Katalog Flash Eksklusif 1-of-1 Claimable (`LuckyLeafFlashModal.tsx`)**:
   - Modal tampilan resolusi tinggi untuk setiap karya flash 1-of-1 dengan tombol *"Claim This 1-of-1 Piece"* yang otomatis mengisi formulir reservasi.
5. **`src/components/preview/PreviewLuckyLeaf.tsx`**:
   - Landing page master yang bersih, lapang, berjiwa *sanctuary*, bebas dari formulir in-page yang berlebihan, dengan navigasi terstruktur, spotlight Senbazuru 1,000 cranes, galeri healed works, pilar the sanctuary, widget ulasan 5.0 Google, FAQ, dan mobile sticky bar.

---

## 4. Hasil Verifikasi & Uji Browser (Puppeteer)

Semua tes fungsionalitas dan tangkapan layar dijalankan dengan sukses pada resolusi Desktop (1280x900) dan Mobile (375x812):

1. **Desktop Hero Section (`screenshot-desktop-hero.png`)**:
   - Memuat foto tato botani real ginkgo pada kulit (`#hero-real-tattoo-img`), badge rating 5.0 Google Reviews, dan tombol CTA ganda yang proporsional.
2. **Modal Intake Wizard Step 1 & Step 3 (`screenshot-modal-step1.png` & `screenshot-modal-step3.png`)**:
   - Teruji membuka wizard dari tombol hero, mengisi deskripsi konsep, memilih penempatan anatomi, dan mengunggah foto referensi di Step 3 dengan thumbnail preview instan.
3. **Tiket Pass Digital Step 5 (`screenshot-modal-step5-pass.png`)**:
   - Terbukti menerbitkan tiket resmi `#LL-XXXX` dengan rincian `References: 1 Attached` dan pengingat sketsa 3–5 hari sebelum sesi.
4. **Tampilan Mobile 375px (`screenshot-mobile-hero.png`)**:
   - Layout hero dan sticky action bar tertata rapi tanpa horizontal overflow atau elemen yang berantakan.

---

## 5. Teks Penawaran Dingin (Outreach Pitch Copy)

Gunakan salinan pesan berikut untuk menghubungi Din Tran via Instagram DM atau email studio:

### Opsi A: Instagram DM (Casual, Personal, Menyoroti Senbazuru & Intake Flow)
```text
Hi Din! Huge fan of what you’ve built with Lucky Leaf Tattoo on Hertel Ave — the calming, non-intimidating sanctuary vibe and your 1,000 Paper Cranes project are so special.

I noticed from your booking story highlights that you often have to guide clients through the 6 intake details (references, placement, sizing, dates) manually back-and-forth over DMs.

I actually designed a live, interactive website concept custom-crafted for your studio featuring an automated fine-line intake wizard, reference image upload, and an interactive 1-of-1 Flash claiming catalog:

Take a look here: https://scalebiz.web.id/preview/lucky-leaf/

You can take full ownership of this live on your own custom domain (e.g. LuckyLeafTattoo.com) for just $499 flat. We’ll handle the Google SEO, domain setup, and fine-tune your booking rules so only serious, deposit-ready clients land on your calendar.

(No pressure at all — just wanted to share something that honors the thoughtful aesthetic of your Hertel Ave studio!)
```

### Opsi B: Email Penawaran Resmi
```text
Subject: Interactive Fine-Line Intake & Flash Gallery Concept for Lucky Leaf Tattoo (Hertel Ave)

Hi Din,

I'm reaching out because I really admire your fine-line botanical artistry and the mindful, inclusive sanctuary you've cultivated at 1809 Hertel Ave. Your Senbazuru (1,000 paper cranes) journey is one of the most distinctive tattoo projects in Western New York.

As an appointment-only private studio, managing client inquiries while tattooing takes valuable creative hours. I noticed clients often need reminders on what to include (references, exact placement, approximate sizing, preferred weekdays).

To help streamline your schedule and elevate your client experience, I built an interactive website prototype tailored specifically to Lucky Leaf Tattoo:

👉 Live Prototype: https://scalebiz.web.id/preview/lucky-leaf/

Key features built into this concept:
1. Guided 4-Step Intake Desk: Automatically collects tattoo descriptions, body placements, sizing in inches, and reference photo uploads before they hit your inbox.
2. 1-of-1 Flash Claiming Engine: Allows collectors to browse and claim one-off pieces that automatically pre-fill into your booking calendar with priority terms.
3. Transparent Policy & Deposit Protection: Explains your 3–5 day sketch collaboration timeline, non-refundable deposit terms, and 5-day rescheduling rule to filter out no-shows.
4. Hertel Ave Local SEO & 5.0 Google Proof: Highlights your 112+ perfect 5-star reviews to convert nervous first-timers into confident clients.

You can claim this website live on your own custom domain for a one-time flat fee of $499. We handle the full setup, custom domain mapping, and final copy adjustments.

Would love to hear your thoughts when you have a free moment between sessions!

Warm regards,
ScaleBiz Web Studio
https://scalebiz.web.id
```

---

## 6. Petunjuk Deployment (Untuk User)

Sesuai aturan kerja, deploy dilakukan mandiri oleh User:
```bash
# Cek perubahan lokal
git status

# Commit perubahan
git add .
git commit -m "feat: add interactive website concept and intake desk for Lucky Leaf Tattoo"

# Push ke repositori (dilakukan manual oleh user)
git push origin main
```
