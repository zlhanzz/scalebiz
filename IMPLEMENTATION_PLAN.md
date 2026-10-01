# Rencana Implementasi: Pengalihan Target CTA Hero ke Section Services & Penyesuaian Copywriting "Scale Up and Grow My Business!"

Dokumen ini disusun sebagai protokol kerja baku (`RULE[user_global]`) untuk merespons instruksi pengguna:
> *"i think this button not supposed to be direct to work secttion, but better direct to service section. instead upgrade my website and system, better to say, 'Scale Up and Grow My Business!'"*

---

## 1. Analisis Masalah & Tujuan Perubahan

### Masalah yang Ditemukan:
1. **Target Scroll CTA Kurang Tepat Sasaran**:
   - Tombol utama CTA di Hero section sebelumnya mengarah ke `#work` (Portofolio).
   - Pengguna menghendaki tombol utama tersebut mengarahkan calon klien langsung ke **`#services`** (Pilar Layanan Otomasi & Solusi Bisnis), yang menyajikan 4 pilar manfaat sistem.
2. **Copywriting Tombol Kurang Relevan dengan Brand Visi**:
   - Teks tombol sebelumnya: *"Upgrade My Website & Business Systems Now!"*.
   - Pengguna menghendaki teks tombol diubah menjadi:
     **"Scale Up and Grow My Business!"**

---

## 2. Dampak Perubahan (Berkas yang Tersentuh)

1. [src/components/HeroEditorial.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/components/HeroEditorial.tsx):
   - Mengubah fungsi `scrollToWork` menjadi `scrollToServices` yang menargetkan elemen `#services` (dengan fallback smooth scroll).
   - Mengubah atribut `href="#work"` menjadi `href="#services"`.
   - Mengubah teks tombol `<span>` menjadi `"Scale Up and Grow My Business!"`.
2. [src/data/translations/index.ts](file:///c:/Users/ZHULL/Documents/Freelance/src/data/translations/index.ts):
   - Menyelaraskan properti `hero.ctaMain` pada objek `id` dan `en` menjadi `"Scale Up and Grow My Business!"`.
3. Dokumentasi Protokol:
   - [functions/PROGRESS.md](file:///c:/Users/ZHULL/Documents/Freelance/functions/PROGRESS.md)
   - [WALKTHROUGH.md](file:///c:/Users/ZHULL/Documents/Freelance/WALKTHROUGH.md)

---

## 3. Langkah-Langkah Eksekusi

1. **Modifikasi `src/components/HeroEditorial.tsx`**:
   - Ubah logika click handler `scrollToServices` ke target elemen `#services` / `#layanan`.
   - Perbarui markup tombol CTA utama dengan teks `"Scale Up and Grow My Business!"`.
2. **Penyelarasan `src/data/translations/index.ts`**:
   - Perbarui kamus `hero.ctaMain`.
3. **Verifikasi Teknis & Visual**:
   - Jalankan `npx tsc --noEmit` untuk memastikan kepatuhan tipe TypeScript.
   - Ambil screenshot visual tombol CTA Hero dan verifikasi scroll perilaku ke section `#services`.
4. **Dokumentasi Hasil**:
   - Perbarui [functions/PROGRESS.md](file:///c:/Users/ZHULL/Documents/Freelance/functions/PROGRESS.md) dan [WALKTHROUGH.md](file:///c:/Users/ZHULL/Documents/Freelance/WALKTHROUGH.md).

---

## 4. Rencana Verifikasi

- **Kompilasi TypeScript**: Memastikan 0 error.
- **Verifikasi UI**: Tangkapan layar pada tombol utama Hero (`.hero-primary-cta-btn`) membuktikan teks telah berganti menjadi `"Scale Up and Grow My Business!"`.
- **Verifikasi Navigasi**: Memastikan target tautan mengarah tepat ke `#services`.
