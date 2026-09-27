# Rencana Implementasi: Pemisahan Fitur Estimasi Biaya (Kalkulator) dan Form Booking Mandiri FH Land Services

Dokumen ini disusun sebelum modifikasi kode sesuai dengan protokol kerja baku workspace (`RULE[user_global]`).

---

## 1. Analisis Masalah & Kebutuhan Pengguna
- **Feedback Pengguna**:
  1. *Estimasi Biaya Properti* dan *Booking Layanan* memiliki tujuan yang berbeda:
     - **Estimasi Biaya**: Tujuannya murni sebagai kalkulator biaya properti interaktif yang konkret, transparan, dan instan.
     - **Booking Layanan**: Tujuannya untuk pemesanan rute/jadwal nyata (*work order dispatch*) dengan pengisian alamat, jadwal pengerjaan, dan data kontak.
  2. Saat ini tombol di kartu layanan dan navigasi masih menggabungkan kedua fungsi tersebut (`Book & Get Instant Estimate →`). Tombol harus dipisahkan menjadi dua tombol berbeda pada setiap kartu layanan: satu untuk **Estimate Cost** dan satu untuk **Book Service**.
  3. Alur transisi harus mulus (*seamless*): Setelah melihat estimasi biaya konkret di kalkulator, pengguna dapat langsung menekan tombol booking tanpa perlu menginput ulang data spesifikasi lahan yang sudah dipilih di kalkulator (data estimasi otomatis terbawa ke formulir booking).

---

## 2. Dampak Perubahan
File yang akan disentuh/dibuat:
1. **`src/components/preview/PropertyEstimatorModal.tsx` (File Baru)**:
   - Komponen modal khusus kalkulator estimasi biaya properti yang konkret dan interaktif.
   - Pilihan layanan Summer/Winter, ukuran yard/lot, tipe driveway, volume mulsa, dan frekuensi.
   - Tampilan rincian biaya konkret (*itemized breakdown*, estimasi per-visit / per-musim, jaminan tanpa biaya siluman).
   - Tombol aksi utama: **`Proceed to Book This Estimate →`** yang meneruskan data spesifikasi ke modal booking tanpa input ulang.
2. **`src/components/preview/EstimateModal.tsx` (Direfaktor menjadi `BookingOrderModal`)**:
   - Fokus sebagai formulir booking kerja nyata (*Work Order & Route Scheduling*).
   - Menerima parameter `initialBookingData` dari kalkulator estimasi (otomatis pre-fill layanan, luas lahan, driveway, dan kisaran harga estimasi).
   - Menyelesaikan booking dengan alamat lengkap, jadwal, dan kontak, kemudian menerbitkan tiket kerja resmi `#FH-2026-XXXX`.
3. **`src/components/preview/PreviewFHLandServices.tsx`**:
   - Memisahkan tombol pada setiap kartu layanan menjadi:
     - Tombol Sekunder: `Estimate Cost` (Ikon kalkulator/ruler).
     - Tombol Primer: `Book Service` (Ikon kalender/truk).
   - Memperbarui tombol di Header, Hero, dan Bottom Station agar terpisah jelas antara `Estimate Cost` dan `Book Online`.
   - Mengelola state transisi data dari Estimator ke Booking Modal.

---

## 3. Langkah-Langkah Eksekusi
1. **Langkah 1**: Buat komponen `src/components/preview/PropertyEstimatorModal.tsx` dengan kalkulator harga dinamis yang konkret dan tombol transfer data ke booking.
2. **Langkah 2**: Sesuaikan `src/components/preview/EstimateModal.tsx` agar dapat menerima data transferan dari kalkulator estimasi secara instan (*pre-populated*).
3. **Langkah 3**: Perbarui `src/components/preview/PreviewFHLandServices.tsx`:
   - Pasang dua tombol terpisah pada setiap kartu layanan: `Estimate Cost` dan `Book Service`.
   - Pisahkan tombol di Header (`Estimate Cost` & `Book Online`) dan Hero.
   - Hubungkan alur data: saat user klik "Proceed to Book This Estimate" di modal kalkulator, modal kalkulator ditutup dan modal booking dibuka dengan data yang sudah terisi.
4. **Langkah 4**: Jalankan `pnpm.cmd run build` untuk memverifikasi kompilasi TypeScript dan static export Next.js.
5. **Langkah 5**: Uji interaktivitas di browser via script Puppeteer otomatis untuk memastikan tombol estimasi, tombol booking, dan transfer data berjalan sempurna.
6. **Langkah 6**: Perbarui `functions/PROGRESS.md` dan `WALKTHROUGH.md` sesuai protokol kerja baku.

---

## 4. Rencana Verifikasi
- Uji kartu layanan: Pastikan tombol `Estimate Cost` membuka kalkulator estimasi dengan layanan terpilih.
- Uji kartu layanan: Pastikan tombol `Book Service` membuka form booking dengan layanan terpilih.
- Uji kalkulator: Ubah ukuran lahan/driveway, pastikan breakdown biaya berubah secara dinamis dan konkret.
- Uji transfer data: Klik `Proceed to Book This Estimate →`, pastikan modal booking terbuka dengan data lot size, driveway, dan service yang sudah terisi tanpa perlu input ulang.
- Validasi build: `pnpm run build` menghasilkan Exit Code 0.
