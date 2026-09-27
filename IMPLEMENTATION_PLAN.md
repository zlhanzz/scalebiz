# Rencana Implementasi: Perbaikan Presisi Visual Hero, Header Desktop, Section Mahasiswa Mobile, dan Reordering Hero Mobile

Dokumen ini disusun sebagai panduan perbaikan tata letak UI/UX pada website Inktellectual Tattoo berdasarkan umpan balik spesifik dari pengguna.

---

## 1. Analisis Masalah
1. **Hospital Grade Menggantung ke Bawah pada Hero Section**:
   - Teks "Hospital Grade 100% Single-Use EO Gas Needles" terdorong ke baris kedua di bawah metrik 4.9/5 dan 6 Artisans akibat kontainer `flex-wrap: wrap` dengan gap lebar, meninggalkan ruang kosong di sebelah kanan.
   - **Solusi**: Mengubah tata letak metrik menjadi `display: grid; gridTemplateColumns: repeat(3, 1fr)` sehingga ketiga metrik (Rating 4.9/5, 6 Resident Artisans, Hospital Grade) tersusun rapi dalam 1 baris horizontal yang seimbang.
2. **Tombol "Consultation Desk" Terpotong di Header Desktop (Layar Laptop 1025px–1180px)**:
   - Lebar total logo, 5 menu navigasi, dan 2 tombol CTA panjang (~1170px) melebihi lebar layar laptop sebelum mencapai breakpoint mobile lama (`1024px`), menyebabkan tombol paling kanan terpotong oleh scrollbar.
   - **Solusi**:
     - Menaikkan breakpoint navigasi desktop ke `1140px`.
     - Memadatkan tombol aksi: `"Book Consult"` dan `"Estimate"`, dengan padding proporsional (`8px 12px`).
     - Memadatkan link navigasi (`padding: 4px 8px`, `gap: 8px`).
3. **Section Promo Mahasiswa Rusak pada Tampilan Mobile (375px)**:
   - Menggunakan `gridTemplateColumns: "auto 1fr auto"` kaku yang tidak responsif pada mobile, sehingga foto promo terjepit menjadi garis tipis ~10px dan teks berantakan.
   - **Solusi**: Menambahkan kelas responsif `.student-special-container` yang beralih menjadi 1 kolom vertikal (`grid-template-columns: 1fr`) pada layar `<= 768px`, dengan foto promo berukuran ideal (140x140px terpusat), teks tertata rapi, dan tombol klaim lebar penuh.
4. **Urutan Foto Hero pada Tampilan Mobile**:
   - Pengguna meminta secara khusus agar foto kru toko fisik (`hero-media`) diletakkan **di atas** kotak review 4.9 / trust metrics saat berada di layar ponsel.
   - **Solusi**: Menggunakan teknik arsitektur CSS `display: contents` pada `.hero-content` di mobile (`@media (max-width: 768px)`), sehingga elemen-elemen hero tersusun dengan urutan visual presisi:
     1. Headline & Paragraf Deskripsi (`order: 1`)
     2. **Foto Hero Kru Studio Amherst St (`order: 2`)**
     3. **Kotak Review 4.9 & Trust Metrics 3-Kolom (`order: 3`)**
     4. **Dua Tombol Aksi Hero (`order: 4`)**

---

## 2. Dampak Perubahan
File yang akan dimodifikasi:
1. `src/components/preview/PreviewInktellectual.tsx`:
   - Penyesuaian CSS media query untuk hero ordering, breakpoint header, dan student special.
   - Restrukturisasi trust metrics hero menjadi CSS Grid 3 kolom.
   - Penataan ulang kelas `hero-heading-block`, `hero-trust-metrics`, `hero-action-buttons`, dan `hero-media`.
   - Pembaharuan container section promo mahasiswa `#student-special`.
2. `scripts/test_inktellectual_preview.js`:
   - Pengujian visual di resolusi laptop (1140px), desktop (1280px), dan mobile (375px) untuk memverifikasi seluruh perbaikan.

---

## 3. Langkah-Langkah Eksekusi
1. **Modifikasi `PreviewInktellectual.tsx`**:
   - Perbarui CSS `@media` rules (breakpoint 1140px, `display: contents` untuk hero mobile ordering, dan styling mobile promo mahasiswa).
   - Terapkan layout Grid 3 kolom pada Trust Metrics di Hero Section.
   - Berikan nama kelas semantik pada elemen Hero (`hero-heading-block`, `hero-trust-metrics`, `hero-action-buttons`).
   - Perbarui header buttons dan menu agar kompak dan tidak terpotong.
   - Jadikan container `#student-special` fleksibel/responsif di mobile.
2. **Kompilasi & Pengujian**:
   - Jalankan `pnpm.cmd tsc --noEmit`.
   - Jalankan Puppeteer test untuk menangkap screenshot di 1140px, 1280px, dan 375px.
3. **Verifikasi Visual**:
   - Periksa screenshot apakah 3 metrik dalam 1 baris, tombol header utuh, foto hero berada di atas review 4.9 pada mobile, dan banner mahasiswa tampil rapi.
4. **Dokumentasi**:
   - Perbarui `WALKTHROUGH.md` dan `functions/PROGRESS.md`.
