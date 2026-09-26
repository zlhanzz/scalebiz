# Implementation Plan: Optimasi Aset Gambar Hero Portrait (Konversi PNG ke WebP)

Dokumen ini disusun sebelum modifikasi kode sesuai protokol kerja workspace (`RULE[user_global]`).

---

## 1. Analisis Kebutuhan & Target Fitur

### 1.1 Permintaan Pengguna:
> *"foto orang kita terlalu berat yaa untuk di load? berapa mb nih. btw kalau misalnya berbah dari png ke webp masih berfungsi sama nggak? apakah tidak rusak? dari segi layar yang ditampilkan ataupun remove backgroud dll"*
> *"okee convert ke webp"*

### 1.2 Analisis Teknis:
- **Kondisi Saat Ini**:
  - File foto portrait developer yang dipakai pada section Hero (`HeroEditorial.tsx`) menggunakan format PNG tanpa kompresi tinggi:
    - `developer-portrait.png` (RuangSinggah): **1.379 KB (~1,38 MB)**
    - `developer-portrait-ruangtani.png`: **1.311 KB (~1,31 MB)**
    - `developer-portrait-mentlife.png`: **1.354 KB (~1,35 MB)**
    - Total beban muat ketiga gambar: **~4,04 MB**.
  - Ukuran ini berdampak signifikan pada metrik Largest Contentful Paint (LCP) dan kecepatan muat pertama di jaringan seluler.
- **Solusi yang Diterapkan**:
  - Mengonversi ketiga file PNG tersebut menjadi format modern **WebP** (`.webp`) dengan library `sharp` pada kualitas tinggi (Quality: 88, lossless alpha channel, effort: 6).
  - Mempertahankan resolusi asli **1152 × 2048 px** agar tetap ultra-tajam di layar Retina Mac & smartphone AMOLED.
  - Mempertahankan kanal transparansi (*alpha channel*) 100% sehingga latar belakang transparan/cutout tetap rapi dan tidak berkerut.
  - Memperbarui referensi gambar di `src/components/HeroEditorial.tsx` untuk memuat berkas `.webp`.
  - Menghemat ukuran hingga **~93%** (dari total ~4,04 MB menjadi hanya ~295 KB).

---

## 2. Dampak Perubahan & File yang Tersentuh

1. **`public/images/developer-portrait.webp`** *(Aset Baru)*:
   - Hasil konversi WebP dari `developer-portrait.png` (~101 KB).
2. **`public/images/developer-portrait-ruangtani.webp`** *(Aset Baru)*:
   - Hasil konversi WebP dari `developer-portrait-ruangtani.png` (~95 KB).
3. **`public/images/developer-portrait-mentlife.webp`** *(Aset Baru)*:
   - Hasil konversi WebP dari `developer-portrait-mentlife.png` (~99 KB).
4. **`src/components/HeroEditorial.tsx`**:
   - Memperbarui properti `portraitImg` pada array `HERO_PROJECTS` (baris 41, 68, 95) ke berkas `.webp`.
5. **`functions/PROGRESS.md` & `WALKTHROUGH.md`**:
   - Dokumentasi hasil konversi dan panduan verifikasi.

---

## 3. Langkah-Langkah Eksekusi

- **Langkah 1**: Buat skrip Node.js dengan `sharp` untuk mengonversi ketiga foto PNG ke format WebP berkualitas tinggi dengan mempertahankan dimensi 1152x2048 dan transparansi.
- **Langkah 2**: Jalankan skrip konversi dan verifikasi ukuran serta integritas metadata ketiga berkas WebP.
- **Langkah 3**: Perbarui path `portraitImg` di `src/components/HeroEditorial.tsx` menjadi format `.webp`.
- **Langkah 4**: Jalankan TypeScript check (`pnpm.cmd exec tsc --noEmit`) dan build produksi Next.js (`pnpm.cmd run build`).
- **Langkah 5**: Perbarui `functions/PROGRESS.md` dan `WALKTHROUGH.md`.

---

## 4. Rencana Verifikasi

1. **Integritas Aset WebP**:
   - Metadata gambar terverifikasi: `format: 'webp'`, `hasAlpha: true`, `width: 1152`, `height: 2048`.
   - Ukuran masing-masing berkas berkurang >90% (di bawah 110 KB).
2. **Kompilasi & Build**:
   - `tsc --noEmit` lolos 0 error.
   - `pnpm run build` sukses 100% dan menghasilkan aset di `./out`.
3. **Tampilan Hero**:
   - Foto tampil instan tanpa lag, background transparan sempurna, dan transisi antar proyek (RuangSinggah, rUang Tani, Mentlife) tetap mulus.
