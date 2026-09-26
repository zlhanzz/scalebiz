# Rencana Implementasi: Sinergi Sistem Menu Input Formulir & Kinetik Enterprise B2B UI (Step 1 s/d Step 4)

Dokumen ini disusun sebelum melakukan modifikasi kode sesuai protokol kerja workspace (`RULE[user_global]`).

## 1. Analisis Masalah & Kebutuhan Pengguna
- **Feedback & Kebutuhan Pengguna**:
  > *"tetap guanakan sistem form yang dimana ada menu inpput dan ketika akan melakukan input muncul pilihan input yang ada. sehingga tidak ada scroll fatique atau orang yang tidak ngeh bahwa ada input terkait section itu"*
- **Akar Masalah**:
  1. Pada iterasi sebelumnya, seluruh kartu opsi Kinetik dirender secara terbuka (*inline grid*) sekaligus di dalam halaman.
  2. Akibatnya, pada satu langkah (misalnya Step 3 dengan 2 grup pertanyaan), grup pertanyaan pertama memakan seluruh tinggi layar ponsel/desktop. Hal ini memicu dua masalah besar:
     - **Scroll Fatigue**: Pengguna harus melakukan scroll panjang untuk melihat seluruh opsi.
     - **Unnoticed Input Section**: Pengguna berisiko tidak menyadari (*tidak ngeh*) bahwa di bawahnya masih ada Section 2 (Cara Tim Memproses Transaksi) yang wajib diisi, sehingga terjebak dalam error validasi atau bingung mengapa tombol "Lanjut" belum aktif.
  3. Pengguna menginstruksikan untuk **tetap mempertahankan sistem form dengan menu input** (trigger bar) di mana pilihan baru muncul saat input diklik.
  4. Pilihan yang muncul saat menu input diklik harus memiliki **estetika Enterprise B2B (Kinetik Style)** sesuai referensi screenshot pengguna, bukan generic AI-slop.

## 2. Dampak Perubahan & File yang Tersentuh
- [src/app/globals.css](file:///c:/Users/ZHULL/Documents/Freelance/src/app/globals.css):
  - Menambahkan styling `.kinetik-form-trigger`: field menu input enterprise yang elegan, menampilkan status pilihan aktif atau placeholder, ikon penanda, badge counter, dan chevron selector `▾`.
  - Menambahkan styling `.kinetik-picker-modal` & `.kinetik-picker-drawer`: dialog/drawer modal bernuansa Kinetik enterprise (background navy gelap `#0a0f1d`, border halus `#1a2333`, header terstruktur).
  - Merender kartu opsi `.kinetik-option-card` di dalam modal picker lengkap dengan kotak ikon, judul, tag mikro, deskripsi, dan custom checkbox/radio.
  - Memastikan modal/drawer responsif sempurna di desktop maupun mobile (bottom sheet yang nyaman dijangkau jari).
- [src/components/diagnosis/DiagnosisStepView.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/components/diagnosis/DiagnosisStepView.tsx):
  - Mempertahankan kartu grup bernomor `(1)`, `(2)` dengan badge status (`Wajib Dipilih`, `Bisa Pilih > 1`, `✓ X Dipilih`).
  - Mengganti deretan opsi terbuka dengan **Menu Input Trigger Bar** yang ringkas pada setiap section.
  - Saat Menu Input diklik, membuka Picker Modal bergaya Kinetik yang memuat kartu opsi lengkap.
  - Setelah memilih, Menu Input menampilkan ringkasan pilihan (badge chip terstruktur) dan tombol "Ubah / Tambah ▾".
- [src/components/diagnosis/DiagnosisWizard.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/components/diagnosis/DiagnosisWizard.tsx):
  - Mempertahankan stepper header dan footer navigasi validasi yang sudah selaras.

## 3. Langkah-Langkah Eksekusi
1. **Langkah 1: Penyempurnaan CSS System (`src/app/globals.css`)**:
   - Definisikan `.kinetik-form-trigger`, `.kinetik-trigger-left`, `.kinetik-trigger-icon`, `.kinetik-trigger-content`, `.kinetik-trigger-placeholder`, `.kinetik-trigger-selected-pills`, `.kinetik-trigger-chevron`.
   - Definisikan `.kinetik-modal-overlay`, `.kinetik-modal-container`, `.kinetik-modal-header`, `.kinetik-modal-body`, `.kinetik-modal-footer`, `.kinetik-modal-btn-confirm`.
2. **Langkah 2: Integrasi Komponen di `DiagnosisStepView.tsx`**:
   - State kontrol modal picker untuk setiap input di Step 1, 2, 3, dan 4:
     - Step 1: `sectorModalOpen`, `subSectorModalOpen`.
     - Step 2: `painPointsModalOpen`.
     - Step 3: `customerFlowModalOpen`, `orderProcessingModalOpen`.
     - Step 4: `businessScaleModalOpen`.
   - Merender Menu Input Trigger Bar di dalam setiap Kinetik Group Card.
   - Merender Kinetik Picker Modal dengan kartu opsi berestetika Kinetik, counter pilihan, dan tombol "Selesai Memilih".
3. **Langkah 3: Pengujian & Validasi**:
   - Uji `tsc --noEmit` untuk memastikan kepatuhan type system TypeScript.
   - Uji `pnpm run build` untuk memvalidasi Next.js static page generation.
   - Verifikasi bahwa di layar ponsel dan desktop, seluruh section terlihat kompak dan di atas batas scroll (*above the fold*).
4. **Langkah 4: Dokumentasi & Laporan**:
   - Update `functions/PROGRESS.md` dan `WALKTHROUGH.md`.

## 4. Rencana Verifikasi
- [ ] TypeScript check (`pnpm exec tsc --noEmit`) menghasilkan Exit Code 0.
- [ ] Production build (`pnpm run build`) menghasilkan Exit Code 0.
- [ ] Di Step 3, Section 1 dan Section 2 keduanya langsung terlihat bersamaan di layar tanpa perlu scroll.
- [ ] Mengklik Menu Input memunculkan modal picker dengan kartu opsi berdesain Kinetik.
- [ ] Pilihan yang dicentang langsung memperbarui state dan menampilkan chip ringkasan pada Menu Input.
