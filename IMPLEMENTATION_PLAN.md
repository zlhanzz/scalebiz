# Implementation Plan: Perbaikan Presisi & Proporsi Hero Trust Box & Action Buttons di Tampilan Mobile

Dokumen ini adalah rencana kerja baku untuk memperbaiki proporsi dan keteraturan tampilan **Hero Trust Box** (Review 4.9/5, 6 Artisans, Hospital Grade) dan **Hero CTA Buttons** pada tampilan mobile website Inktellectual Tattoo.

---

## 1. Analisis Masalah
- **Kondisi Saat Ini pada Mobile**:
  - Pada layar ponsel (`<= 540px`), terdapat aturan CSS `@media (max-width: 540px)` yang memaksa `.hero-trust-metrics` menjadi `grid-template-columns: 1fr !important;` (vertikal 3 baris bertumpuk).
  - Karena tidak memiliki `width: 100%`, kontainer kartu trust mengecil secara otomatis mengikuti kontennya (`width: fit-content`), menghasilkan kartu tinggi yang sempit dan canggung di tengah layar.
  - Dua tombol aksi di bawahnya (`Book Free Consultation` dan `Estimate Custom Tattoo`) memiliki lebar intrinsik yang tidak seragam (tombol pertama lebih lebar dari tombol kedua, dan keduanya lebih lebar dari kartu trust di atasnya).
  - Akibatnya, elemen-elemen di bawah foto hero memiliki 3 lebar yang berbeda-beda, membuat UI tampak tidak seimbang, tidak teratur, dan tidak proporsional (*unaligned*).
- **Target yang Ingin Dicapai**:
  - Menghapus aturan vertikal sempit pada mobile.
  - Mengubah `.hero-trust-metrics` menjadi kartu horizontal 3-kolom simetris yang membentang penuh 100% lebar layar mobile (`width: 100%`), dengan padding dan perataan tengah yang presisi.
  - Mengubah `.hero-action-buttons` pada layar mobile menjadi tata letak vertikal penuh (`width: 100%`) di mana kedua tombol memiliki lebar 100% yang seragam, simetris, dan rapi sejajar dengan kartu metrik dan foto hero di atasnya.

---

## 2. Dampak Perubahan
File yang akan disentuh:
- `src/components/preview/PreviewInktellectual.tsx` (CSS `<style>` dan markup Hero Section)
- `scripts/test_inktellectual_preview.js` (Pengujian visual Puppeteer pada mobile 375px)
- `WALKTHROUGH.md` (Dokumentasi setelah perubahan)
- `functions/PROGRESS.md` (Catatan riwayat progres)

---

## 3. Langkah-Langkah Eksekusi
1. **Pembaruan CSS Media Query (`PreviewInktellectual.tsx`)**:
   - Di `@media (max-width: 768px)`:
     - Tetapkan `.hero-trust-metrics` dengan `width: 100% !important; max-width: 100% !important; box-sizing: border-box !important; display: grid !important; grid-template-columns: repeat(3, 1fr) !important; gap: 0 !important; text-align: center !important;`.
     - Tetapkan `.hero-trust-metrics > div` agar memiliki perataan tengah vertikal dan horizontal dengan divider elegan.
     - Tetapkan `.hero-action-buttons` dengan `display: flex !important; flex-direction: column !important; width: 100% !important; gap: 12px !important;`.
     - Tetapkan `.hero-action-buttons button` agar `width: 100% !important; justify-content: center !important; text-align: center !important; padding: 14px 20px !important;`.
   - Hapus atau sesuaikan aturan `@media (max-width: 540px)` yang sebelumnya memecah trust box menjadi 1 kolom sempit.
2. **Penyempurnaan Padding Hero Section Mobile**:
   - Tambahkan kelas `.hero-section` dan atur padding responsif `36px 18px 60px` pada layar `<= 768px` agar memberikan ruang lebar yang lega dan seimbang.
3. **Pengujian TypeScript**:
   - Jalankan `pnpm.cmd tsc --noEmit` untuk memastikan tidak ada kesalahan tipe.
4. **Verifikasi Visual Puppeteer**:
   - Jalankan `node scripts/test_inktellectual_preview.js` untuk mengambil screenshot tampilan mobile 375px dan memeriksa keteraturan serta proporsi elemen hero.
5. **Dokumentasi & Laporan**:
   - Perbarui `WALKTHROUGH.md` dan `functions/PROGRESS.md`.

---

## 4. Rencana Verifikasi
- Pengujian headless Chrome (375x812 iPhone standard):
  - Memverifikasi `scrollWidth === clientWidth` (0 horizontal overflow).
  - Memeriksa tangkapan layar `screenshot-inktellectual-mobile-hero-flow.png` untuk memastikan:
    1. Kartu trust berbaris 3 kolom horizontal membentang 100% lebar kontainer secara elegan.
    2. Tombol `Book Free Consultation` dan `Estimate Custom Tattoo` berukuran lebar penuh 100% seragam.
    3. Seluruh elemen sejajar simetris dari foto kru hingga kedua tombol aksi.
