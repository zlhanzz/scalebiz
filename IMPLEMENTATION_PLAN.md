# Rencana Implementasi: Optimasi Tampilan Mobile & Centering Tombol CTA (Lucky Leaf Tattoo)

Dokumen ini disusun berdasarkan protokol baku workspace `RULE[user_global]` sebelum melakukan modifikasi kode.

---

## 1. Analisis Masalah & Kebutuhan
- **Kebutuhan Pengguna**: Pengguna menginginkan tampilan mobile lebih teroptimasi, khususnya tombol-tombol aksi utama seperti pada Hero Section (`Request Appointment` & `Explore 1-of-1 Flash`) dan Senbazuru Section (`Request a Crane Piece`) agar berada di posisi tengah (*centered*) dan proporsional di layar ponsel, tidak menempel canggung di sebelah kiri dengan banyak ruang kosong di sebelah kanannya.
- **Kondisi Saat Ini**:
  - Pada Hero Section, wrapper tombol menggunakan `display: flex; flexWrap: wrap; gap: 12px;` default left-aligned. Pada layar ponsel (< 640px), tombol bertumpuk ke kiri dengan ukuran auto, menyisakan ruang kosong di kanan.
  - Pada Senbazuru Section, tombol `Request a Crane Piece` berada di kolom ketiga grid desktop yang saat di mobile berubah menjadi 1-kolom dan tertinggal di sebelah kiri bawah card putih.
- **Tujuan**:
  - Membuat tombol-tombol CTA di mobile berada tepat di tengah (*center-aligned*) secara simetris dan elegan.
  - Memberikan lebar sentuh yang ergonomis (*touch-friendly* / `width: 100%; max-width: 320px;`) sehingga nyaman diakses jempol pengguna smartphone.
  - Mempertahankan tampilan desktop tetap inline side-by-side tanpa regresi.

---

## 2. Dampak Perubahan
- File yang tersentuh:
  - `src/components/preview/PreviewLuckyLeaf.tsx`:
    - Blok `<style>` responsif `@media (max-width: 640px)`: penambahan aturan CSS untuk `.ll-hero-cta-group`, `.ll-senbazuru-btn-wrap`, dsb.
    - Wrapper tombol Hero Section: penambahan className `ll-hero-cta-group`.
    - Wrapper tombol Senbazuru: penambahan className `ll-senbazuru-btn-wrap`.
  - `scripts/test_lucky_leaf_preview.js`:
    - Pembaruan skrip untuk memotret section Senbazuru pada tampilan mobile untuk verifikasi visual otomatis.
  - `WALKTHROUGH.md` & `functions/PROGRESS.md`:
    - Pencatatan hasil implementasi dan bukti visual.

---

## 3. Langkah-Langkah Eksekusi
1. **Pembaruan CSS Responsif & Kelas Elemen di `PreviewLuckyLeaf.tsx`**:
   - Definisikan styling `@media (max-width: 640px)`:
     - `.ll-hero-cta-group`: `display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; margin-bottom: 32px;`
     - `.ll-hero-cta-group button, .ll-hero-cta-group a`: `width: 100%; max-width: 320px; justify-content: center; text-align: center;`
     - `.ll-senbazuru-btn-wrap`: `display: flex; justify-content: center; width: 100%; margin-top: 12px;`
     - `.ll-senbazuru-btn-wrap button`: `width: 100%; max-width: 320px; justify-content: center; text-align: center;`
   - Terapkan kelas-kelas tersebut pada elemen JSX terkait.
2. **Kompilasi & Pengecekan Tipe**:
   - Jalankan `pnpm.cmd tsc --noEmit` untuk memastikan 0 error.
3. **Verifikasi Visual Puppeteer**:
   - Jalankan `node ./scripts/test_lucky_leaf_preview.js` untuk mengambil tangkapan layar mobile Hero dan mobile Senbazuru.
   - Periksa gambar hasil uji secara visual dengan `view_file`.
4. **Dokumentasi**:
   - Catat progres di `functions/PROGRESS.md` dan `WALKTHROUGH.md`.

---

## 4. Rencana Verifikasi
- Uji viewport mobile 375x812:
  - Memastikan kedua tombol Hero berada di posisi tengah kartu/container, simetris dan mudah dijangkau.
  - Memastikan tombol Senbazuru berada di tengah card.
  - Memastikan tidak ada *horizontal overflow* (*no horizontal scrollbar*).
- Uji viewport desktop 1280x900:
  - Memastikan tombol Hero tetap berada dalam layout inline kiri seperti desain awal desktop yang disetujui.
