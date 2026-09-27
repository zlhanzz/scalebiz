# Rencana Implementasi: Prototype Website Interaktif & Mewah untuk Mia Bella's Hair Salon and Magick Boutique

Dokumen ini disusun sebelum memulai pengerjaan fitur baru sesuai protokol kerja baku workspace (`RULE[user_global]`).

---

## 1. Analisis Bisnis & Karakter Brand (Brand DNA)
**Nama Bisnis**: Mia Bella's Hair Salon and Magick Boutique  
**Lokasi**: Lockport, NY (Niagara County)  
**Kontak**: `(716) 395-6352`  
**Kepemilikan**: *Owned and operated by an Award-Winning Color Specialist*  
**Jam Operasional**:
- Selasa, Kamis, Jumat, Sabtu: 12:00 PM – 8:00 PM (*Walk-ins Welcome*)
- Minggu: *By Appointment*
- Senin & Rabu: Tutup (*Formulation & Rest Days*)

### Jiwa & Estetika Brand (Vibes & Aesthetic):
- **Perpaduan Unik**: *Vintage Gothic Glamour* bertemu *Metaphysical Apothecary* & *Award-Winning Hair Color Alchemy*.
- **Warna & Suasana**:
  - Obsidian Gelap (`#0E0B12`), Beludru Plum/Blackberry (`#1A1122`), Emas Antik Mewah (`#D4AF37` / `#E5C378`), Sentuhan Mistik Lavender/Rose Amethyst (`#A27B9B`), Teks Parchment Ivory (`#F5F2EB`).
- **Foto Asli Pengguna**:
  - Logo ilustrasi pinup glam retro wanita ber-roll rambut dengan teks kaligrafi *Mia Bella's Hair Salon*.
  - Karya nyata rambut: *Electric Blue vivid highlights*, *Metallic Steel Blue layered cut*, dan *Rainbow Prism Peekaboo*.
- **Anti-Slop**:
  - Menolak warna ungu neon kasar atau teks generik AI.
  - Menggunakan copywriting bahasa Inggris yang persuasif, menggugah emosi, menghargai seni tata rambut, dan bebas dari emoji kasar (digantikan dengan custom SVG icons: *crescent moon, ornate vintage scissors, crystal prism, potion bottle, candle flame, sacred pendulum*).

---

## 2. Dampak Perubahan (File yang Akan Disentuh / Dibuat)
1. `scripts/crop_mia_bella.js`: Script Node.js untuk mengekstrak dan mengoptimalkan 5 foto nyata dari user menjadi aset web di `public/images/demo/mia-bella/`.
2. `src/data/miaBellaData.ts`: Database konfigurasi bisnis, katalog layanan rambut (Vivids, Blonding, Cuts), butik mistik (kristal, potion oil, tarot), jam buka, dan testimoni.
3. `src/components/preview/MiaBellaIcons.tsx`: Kumpulan ikon SVG kustom elegan bertema vintage glam, rambut, dan mistik.
4. `src/components/preview/HairAlchemyQuizModal.tsx`: Kuis interaktif konsultasi warna rambut & taksiran waktu/investasi (*Hair Color & Vibe Calculator*).
5. `src/components/preview/MiaBellaBookingModal.tsx`: Formulir pemesanan janji temu salon digital 3-langkah dengan konfirmasi tiket instan `#MB-2026-XXXX`.
6. `src/components/preview/MagickBoutiqueModal.tsx`: Modal interaktif untuk melihat dan mereservasi produk butik metafisika (*hair potion*, kristal, lilin).
7. `src/components/preview/PreviewMiaBella.tsx`: Komponen halaman utama lengkap dan responsif dengan status jam buka real-time, galeri filterable, layanan terstruktur, dan hero section memukau.
8. `src/app/preview/mia-bellas-hair-salon/page.tsx`: Route halaman Next.js statis lengkap dengan metadata OpenGraph & Twitter Card berbahasa Inggris dan foto logo pinup resmi.

---

## 3. Langkah-Langkah Eksekusi (Execution Steps)
1. **Ekstraksi Aset Gambar**:
   - Salin dan proses gambar dari direktori `.user_uploaded` ke `public/images/demo/mia-bella/` menggunakan script Node.js.
2. **Penyusunan Data & Copywriting (`src/data/miaBellaData.ts`)**:
   - Buat copywriting bahasa Inggris yang menjual, berorientasi pada reputasi *Award-Winning Color Specialist*, spesialisasi *vivid colors*, dan pengalaman salon butik mistik.
3. **Pembuatan Ikon SVG (`MiaBellaIcons.tsx`)**:
   - Ikon bulan sabit, gunting vintage, prisma warna, botol potion ramuan, kristal kuarsa, lilin aroma.
4. **Pembangunan Fitur Interaktif**:
   - **Fitur 1: Hair Alchemy Consultation Calculator (`HairAlchemyQuizModal.tsx`)**: Menghitung estimasi jam di kursi (*chair hours*), kebutuhan *bleach lifting*, dan kisaran biaya dengan transfer data ke booking.
   - **Fitur 2: Direct Digital Salon Booking Wizard (`MiaBellaBookingModal.tsx`)**: Pemesanan janji temu 3 langkah tanpa ketergantungan bolak-balik telepon.
   - **Fitur 3: Magick Boutique Explorer (`MagickBoutiqueModal.tsx`)**: Etalase produk butik metafisika.
5. **Perakitan Komponen Utama (`PreviewMiaBella.tsx`)**:
   - Top announcement bar dengan jam operasional & status *Walk-ins Welcome*.
   - Hero section atmosferik dengan logo pinup glamor & CTA ganda (*Book Hair Ritual* & *Take Hair Color Quiz*).
   - Menu layanan terstruktur (Vivid Alchemy, Lived-In Blonding, Precision Sculpting, Boutique Apothecary).
   - Galeri hasil rambut nyata dengan filter interaktif.
   - Seksi cerita salon & filosofi kristal / ramuan alami.
   - Footer dan peta kontak Lockport, NY.
6. **Pembuatan Route & Metadata SEO (`page.tsx`)**:
   - Pasang route `/preview/mia-bellas-hair-salon`.
   - Pasang OpenGraph & Twitter card berbahasa Inggris dengan `en_US` locale.
7. **Verifikasi & Pengujian**:
   - Jalankan `pnpm run build` untuk memastikan kompilasi SSG Next.js bebas error.
   - Ambil screenshot untuk memverifikasi tampilan visual.
8. **Dokumentasi**:
   - Perbarui `functions/PROGRESS.md` dan `WALKTHROUGH.md`.

---

## 4. Rencana Verifikasi (Verification Plan)
- Kompilasi `pnpm run build` berhasil dengan exit code 0.
- Pengujian browser via Puppeteer untuk memverifikasi:
  - Pembukaan kuis konsultasi warna rambut dan kalkulasi hasil.
  - Pembukaan modal booking janji temu dan penerbitan tiket digital.
  - Pembukaan modal produk magick boutique.
  - Responsivitas mobile dan desktop.
- Mengambil tangkapan layar tampilan UI untuk bukti kualitas estetika visual.

---

## 5. Addendum: Penyesuaian Tema Tampilan Peta Interaktif (Dark Alchemical & Satellite Mode)
- **Analisis Masalah**:
  - Tampilan Google Maps standar menggunakan latar belakang putih/cyan terang yang sangat kontras dan silau jika dibandingkan dengan estetika tema website *Vintage Gothic Midnight Obsidian* (`#0A060E`, `#150D1E`) dan emas antik (`#D4AF37`).
- **Solusi Desain**:
  - Mengimplementasikan filter styling gelap presisi (`invert(90%) hue-rotate(180deg) brightness(85%) contrast(115%)`) pada peta roadmap Google Maps, mengubah latar belakang menjadi hitam obsidian, garis jalan menjadi abu-abu slate, teks menjadi putih tajam, dan marker menjadi tembaga/emas bernuansa alchemical gothic.
  - Menyediakan mode Satellite Hybrid (`t=h`) dengan citra foto satelit udara nyata Lockport yang gelap alami (atap bangunan, pohon, dan aspal) tanpa warna putih silau.
  - Memberikan tombol pengalih interaktif di atas kartu peta:
    - `🌙 Dark Alchemical Mode` (Default - serasi dengan tema website)
    - `🛰️ Aerial Satellite Mode` (Foto udara nyata Lockport)
- **File Terkait**:
  - `src/data/miaBellaData.ts`: Menambahkan URL satelit hybrid.
  - `src/components/preview/PreviewMiaBella.tsx`: Menambahkan state pengalih `mapTheme`, tombol toggle, dan filter CSS dinamis.
- **Rencana Verifikasi**:
  - Menguji kedua mode melalui Puppeteer dan verifikasi visual pada browser.
