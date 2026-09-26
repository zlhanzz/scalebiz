# Implementation Plan: Implementasi Bilingual Multi-Bahasa (Indonesia & English) dengan Deteksi Otomatis Geografis

Dokumen ini disusun sebelum modifikasi kode sesuai protokol kerja workspace (`RULE[user_global]`).

---

## 1. Analisis Kebutuhan & Target Fitur

### 1.1 Permintaan Pengguna:
> *"buat agar website saya memiliki versi bahasa inggris, dan bisa otomatis menyesuaikan ke user jika orang indonesia tampil dalam bahasa indonesia dan jika dari luar indonesia tampil dalam bahasa inggris"*

### 1.2 Analisis Teknis & Desain Solusi:
1. **Analisis Akar Masalah (Mengapa Simulasi VPN Tetap Tampil Bahasa Indonesia)**:
   - VPN hanya mengubah **alamat IP (jaringan publik)** pengguna menjadi IP negara lain (misal US / Singapura).
   - VPN **TIDAK** mengubah:
     1. `navigator.languages` pada browser pengguna (yang masih tersetel `id-ID` atau bahasa Indonesia di sistem).
     2. `Intl.DateTimeFormat().resolvedOptions().timeZone` pada jam Windows pengguna (yang masih tersetel `Asia/Jakarta` atau `Asia/Makassar`).
   - Karena implementasi awal hanya mengandalkan `navigator.languages` dan `timeZone`, browser pengguna di localhost incognito yang mengaktifkan VPN tetap terdeteksi sebagai `isIndonesianLocale === true` atau `isIndonesianTimeZone === true`.
2. **Solusi Definitif: Real-Time IP Geolocation (Dual-Redundant Global Edge Lookup)**:
   - Agar VPN dan lokasi geografis riil terbaca 100% akurat:
     - **Prioritas 1 (Manual Override)**: Jika pengguna pernah memilih `ID` atau `EN` di switcher, simpan di `localStorage` dan prioritaskan pilihan pengguna.
     - **Prioritas 2 (Session Geo Cache)**: Simpan hasil deteksi IP di `sessionStorage` (`scalebiz_geo_country`) agar pergantian halaman instan tanpa query berulang.
     - **Prioritas 3 (IP Geolocation Lookup)**:
       - Query ke endpoint edge global `https://api.country.is` (berbasis Cloudflare CDN dengan latency super cepat ~50-150ms).
       - Fallback ke `https://ipwho.is/` jika endpoint utama tidak merespon.
       - Jika IP negara yang terdeteksi adalah `"ID"` &rarr; Tampilkan **Bahasa Indonesia (`id`)**.
       - Jika IP negara adalah negara lain selain Indonesia (misal `US`, `SG`, `JP`, `AU`, dsb.) &rarr; Tampilkan **Bahasa Inggris (`en`)**.
     - **Prioritas 4 (Fallback Offline)**: Jika lookup jaringan IP gagal/offline, baru gunakan `navigator.languages` dan `timeZone` sebagai fallback cadangan.
2. **Manual Language Switcher di Header (Navbar)**:
   - Disediakan tombol toggle modern `[ ID | EN ]` di samping tombol WhatsApp pada Navbar dengan visual active-state yang elegan.
   - Pengunjung kapan saja dapat beralih bahasa dengan satu klik tanpa reload halaman.
3. **Kualitas Terjemahan Anti-Slop (Professional & High-Conversion English)**:
   - Menolak terjemahan literal mesin yang kaku. Seluruh copywriting bahasa Inggris disusun dengan gaya korporat modern (Software Studio / Digital Transformation Agency) yang menarik bagi klien internasional / ekspatriat.
4. **Cakupan Halaman**:
   - **Navbar**: Brand tagline, tautan navigasi, tombol CTA WhatsApp, tombol switch bahasa.
   - **Hero Section**: Headline manifesto, subtitle, tombol CTA utama, label dan status showcase proyek (RuangSinggah, rUang Tani, Mentlife).
   - **4 Pilar Layanan**: Deskripsi, badge nilai tambah, dan detail cakupan modul untuk keempat pilar (Website, POS & Finance, ERP Operations, Workflow Automation).
   - **Business Diagnosis & Solutions**: Judul pengantar, petunjuk waktu, pertanyaan langkah 1-4, opsi kartu industri, kendala, transaksi, rekomendasi baseline, dan CTA konsultasi.
   - **FAQ Section**: Seluruh 16 pertanyaan dan jawaban, filter kategori, search bar, dan quick guide card.
   - **Footer**: Hak cipta, deskripsi studio, dan tautan pendukung.

---

## 2. Dampak Perubahan & File yang Tersentuh

1. **`src/types/i18n.ts`** *(File Baru)*:
   - Definisi tipe `Language = 'id' | 'en'`.
2. **`src/context/LanguageContext.tsx`** *(File Baru)*:
   - State management bahasa, algoritma auto-detect, persistensi `localStorage`, dan hook `useLanguage()`.
3. **`src/data/translations/index.ts`** *(File Baru)*:
   - Kamus terjemahan modular dan type-safe untuk seluruh section.
4. **`src/app/layout.tsx`**:
   - Membungkus children dengan `LanguageProvider`.
5. **`src/components/Navbar.tsx`**:
   - Menambahkan komponen switch bahasa `ID | EN` dan teks navigasi dinamis.
6. **`src/components/HeroEditorial.tsx`**:
   - Menerapkan hook bahasa untuk teks hero dan preview proyek.
7. **`src/components/ServicePillars.tsx`**:
   - Menerapkan hook bahasa untuk 4 pilar layanan dan fiturnya.
8. **`src/components/BusinessSolutions.tsx`**:
   - Menerapkan hook bahasa untuk pengantar diagnosa dan wizard.
9. **`src/components/FAQSection.tsx`**:
   - Menerapkan hook bahasa untuk seluruh 16 tanya-jawab dan filter kategori.
10. **`src/components/Footer.tsx`**:
    - Menerapkan teks footer bilingual.
11. **`src/app/globals.css`**:
    - Styling responsif untuk komponen toggle bahasa (`.lang-switcher`).
12. **`functions/PROGRESS.md` & `WALKTHROUGH.md`**:
    - Pencatatan riwayat progres dan panduan deploy.

---

## 3. Langkah-Langkah Eksekusi

- **Langkah 1**: Buat `src/types/i18n.ts` dan `src/context/LanguageContext.tsx` dengan algoritma deteksi otomatis.
- **Langkah 2**: Buat kamus terjemahan bilingual terstruktur di `src/data/translations/index.ts`.
- **Langkah 3**: Integrasikan `LanguageProvider` ke `src/app/layout.tsx`.
- **Langkah 4**: Perbarui `Navbar.tsx` dengan tombol switcher bahasa dan styling di `globals.css`.
- **Langkah 5**: Hubungkan komponen `HeroEditorial.tsx`, `ServicePillars.tsx`, `BusinessSolutions.tsx`, `FAQSection.tsx`, dan `Footer.tsx` ke context bahasa.
- **Langkah 6**: Jalankan verifikasi TypeScript (`tsc --noEmit`) dan build Next.js (`pnpm.cmd run build`).
- **Langkah 7**: Dokumentasikan hasil pengujian ke `WALKTHROUGH.md` dan `functions/PROGRESS.md`.

---

## 4. Rencana Verifikasi

1. **Uji Validasi Kode**: `tsc --noEmit` lolos tanpa komplain tipe.
2. **Uji Kompilasi Static Export**: `pnpm.cmd run build` exit code 0 dan berkas di `./out` berhasil digenerate.
3. **Uji Deteksi Bahasa**:
   - Simulasi browser Indonesia (`id-ID`) &rarr; menampilkan teks Bahasa Indonesia.
   - Simulasi browser global / luar negeri (`en-US`) &rarr; otomatis menampilkan teks English.
4. **Uji Toggle Manual**:
   - Klik `EN` &rarr; seluruh teks berganti ke English seketika, `localStorage` menyimpan `en`.
   - Klik `ID` &rarr; seluruh teks berganti ke Indonesia seketika, `localStorage` menyimpan `id`.
