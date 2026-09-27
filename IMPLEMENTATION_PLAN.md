# Implementation Plan: Restorasi Estetika Minimalis & Alur Intake Eksklusif (Lucky Leaf Tattoo)

Dokumen ini adalah rencana modifikasi kode untuk mengembalikan kebersihan dan estetika elegan halaman web **Lucky Leaf Tattoo** (1809 Hertel Ave, Buffalo NY) sesuai arahan pengguna.

---

## 1. Analisis Masalah & Keputusan Desain

### A. Evaluasi Pengalaman Pengguna (UX) & Estetika Visual
- **Temuan Pengguna**: Penambahan section formulir *in-page* "Custom Tattoo Order & Reference Desk" di badan landing page dinilai mengurangi kesan tenang, eksklusif, dan minimalis (*cluttered* dan kurang estetik untuk studio tato privat berkonsep santuari).
- **Kekuatan Sistem Sebelumnya**: Sistem sebelumnya sudah memiliki arsitektur intake yang sangat terorganisir dan elegan:
  1. **Alur Konsultasi Kustom**: Tombol `[ Request Appointment ]` / `[ Inquire / Book ]` membuka wizard 5-tahap (`LuckyLeafBookingModal.tsx`) yang menuntun klien langkah demi langkah, termasuk pengunggahan foto referensi di **Step 3**, penentuan anatomi di **Step 2**, dan preferensi jadwal serta kebijakan di **Step 4**.
  2. **Alur Klaim Flash 1-of-1**: Klien dapat memilih langsung dari katalog karya unik Din Tran di bagian Senbazuru / Flash Gallery (`LuckyLeafFlashModal.tsx`), yang secara otomatis mengisi data karya dan membuka formulir reservasi.
- **Keputusan**:
  - Menghapus section form *in-page* `#custom-order` agar halaman kembali bersih, elegan, dan berjiwa *mindful sanctuary*.
  - Mempertahankan gambar hero baru yang modern dan realistik (`hero-tattoo-real.jpg`) yang menampilkan seni tato botani halus pada kulit klien dengan sempurna.
  - Memastikan alur booking modal dengan upload referensi foto di Step 3 dan klaim flash 1-of-1 tetap berjalan 100% mulus.

---

## 2. Dampak Perubahan

1. **Komponen Master (`src/components/preview/PreviewLuckyLeaf.tsx`)**:
   - Menghapus section `<section id="custom-order">`.
   - Menghapus state lokal dan handler form in-page (`customImages`, `customDescription`, `customPlacement`, `customSize`, `customMonth`, `customDays`, `customName`, `customEmail`, dll.).
   - Mengembalikan tombol CTA pada Hero Section: `[ Request Appointment -> ]` (membuka modal booking) dan `[ ✦ 1-of-1 Flash Gallery ]` (smooth scroll ke `#flash-gallery`).
   - Menghapus link "Custom Order & Upload" dari Master Header desktop dan Mobile Navigation Drawer.
   - Tetap menggunakan foto hero real `hero-tattoo-real.jpg`.
2. **Skrip Verifikasi (`scripts/test_lucky_leaf_preview.js`)**:
   - Menyesuaikan pengujian otomatis untuk memverifikasi hero real tato, membuka modal wizard 5-tahap, menguji upload foto referensi di Step 3, dan mengambil screenshot desktop serta mobile tanpa section custom in-page.
3. **Dokumentasi**:
   - Memperbarui `WALKTHROUGH.md` dan `functions/PROGRESS.md`.

---

## 3. Langkah-Langkah Eksekusi

1. **Refactoring `src/components/preview/PreviewLuckyLeaf.tsx`**:
   - Hapus state in-page custom form dan fungsi handler terkait.
   - Hapus link navigasi "Custom Order".
   - Kembalikan tombol CTA Hero menjadi `[ Request Appointment -> ]` dan `[ ✦ 1-of-1 Flash Gallery ]`.
   - Hapus section `#custom-order`.
2. **Pembersihan & Penyesuaian Skrip Uji (`scripts/test_lucky_leaf_preview.js`)**:
   - Uji pemuatan Hero Real Image.
   - Uji alur 5-step modal booking (Step 1 deskripsi, Step 2 penempatan, Step 3 upload referensi & thumbnail, Step 4 jadwal & kebijakan, Step 5 digital pass).
   - Uji responsivitas mobile 375px.
3. **Verifikasi Visual & TypeScript**:
   - Jalankan `node ./scripts/test_lucky_leaf_preview.js`.
   - Periksa screenshot hasil pengujian.
   - Jalankan `pnpm tsc --noEmit`.
4. **Dokumentasi**:
   - Update `WALKTHROUGH.md` dan `functions/PROGRESS.md`.

---

## 4. Rencana Verifikasi

- **Verifikasi Estetika**: Halaman landing page kembali bersih, lapang, berkelas editorial, dan tidak ada formulir panjang yang merusak ritme halaman.
- **Verifikasi Fungsionalitas**: Tombol booking di header, hero, dan mobile sticky bar membuka modal intake 5-step dengan dropzone referensi di Step 3.
- **Verifikasi Tipe**: 0 error TypeScript.
