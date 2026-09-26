# Rencana Implementasi: Optimasi Tampilan Mobile (Mobile-First Responsiveness) untuk Truly Organic Hair Studio

Dokumen ini disusun sebelum melakukan modifikasi kode sesuai protokol kerja workspace (`RULE[user_global]`).

---

## 1. Analisis Masalah
- **Masalah Utama**:
  Pada tampilan mobile (seperti yang terlihat pada tangkapan layar pengguna), seluruh halaman mengecil (*zoomed-out*) dengan area kosong hitam lebar di sisi kanan (~60% layar).
- **Akar Penyebab (Root Cause)**:
  1. Pada elemen `<header>`, link navigasi desktop (`Services & Pricing`, `Our Artisans`, `Gallery`, `Reviews`, `Location`), tombol Instagram (`@trulyorganichairstudio`), dan tombol `Book on Web` semuanya berada dalam satu baris horizontal tanpa pembatas lebar (`flex-row` kaku dengan lebar total ~950px+).
  2. Proyek ini menggunakan **Vanilla CSS** (tidak menggunakan Tailwind CSS). Kelas utilitas seperti `className="hidden md:flex"` yang sebelumnya dicantumkan tidak memiliki efek CSS karena Tailwind tidak terinstal, sehingga link navigasi desktop tetap ter-render di layar HP.
  3. Lebar header yang mencapai ~950px memaksa browser mobile mengecilkan skala seluruh viewport halaman (*viewport blowout*), membuat seluruh teks menjadi kerdil dan menciptakan ruang hitam di kanan.
  4. Penggunaan `minmax(320px, 1fr)` pada grid desktop berpotensi menyebabkan overflow horizontal pada layar perangkat mobile dengan lebar 320px–360px.

---

## 2. Dampak Perubahan & File yang Tersentuh
- `src/components/preview/PreviewTrulyOrganic.tsx`:
  - Menambahkan `<style>` block terintegrasi dengan media queries CSS murni untuk responsivitas mobile & desktop.
  - Memasang **Mobile Navigation Drawer & Hamburger Toggle Button** (`☰` / `✕`) pada header:
    - Di layar lebar (Desktop >= 900px): Menampilkan navigasi horizontal lengkap, username IG, dan tombol book.
    - Di layar sempit (Mobile < 900px): Menyembunyikan menu horizontal, menampilkan tombol hamburger elegan, tombol ringkas `Book Now`, dan menu slide-down interaktif saat hamburger diklik.
  - Menerapkan `overflow-x: hidden` dan `max-width: 100vw` pada wrapper root halaman.
  - Menyesuaikan ukuran font logo, padding hero, floating badge, dan kolom grid (`minmax(min(100%, 280px), 1fr)`) agar ramah mobile di semua jenis smartphone (iPhone SE, Android 360px, iPhone 14/15 Pro Max).
- `functions/PROGRESS.md`:
  - Pencatatan riwayat pekerjaan perbaikan responsivitas mobile.
- `WALKTHROUGH.md`:
  - Dokumentasi hasil perbaikan dan pengujian mobile.

---

## 3. Langkah-Langkah Eksekusi
1. **Langkah 1**: Edit `src/components/preview/PreviewTrulyOrganic.tsx`:
   - Tambahkan state `isMobileMenuOpen` (`useState(false)`).
   - Sisipkan `<style>` CSS murni dengan media queries `@media (max-width: 899px)` dan `@media (min-width: 900px)`.
   - Perbarui header dengan tombol hamburger SVG dan drawer menu mobile.
   - Refactor grid kolom hero, layanan, stylist, galeri, dan ulasan agar menggunakan ukuran responsif aman mobile.
2. **Langkah 2**: Jalankan verifikasi build lokal:
   - Pastikan TypeScript lolos dan `pnpm.cmd run build` menghasilkan Exit Code: 0.
3. **Langkah 3**: Deploy ke production Cloudflare:
   - Eksekusi `pnpm.cmd run deploy` agar perubahan mobile langsung aktif di link live `https://scalebiz.web.id/preview/truly-organic-hair-studio`.
4. **Langkah 4**: Dokumentasi:
   - Perbarui `functions/PROGRESS.md` dan `WALKTHROUGH.md`.

---

## 4. Rencana Verifikasi
- Tampilan mobile di browser (emulasi mobile 375px/390px/412px):
  - Tidak ada lagi horizontal scroll atau ruang kosong hitam di sebelah kanan.
  - Header tampil proporsional dengan logo, tombol booking kompak, dan tombol hamburger.
  - Menu hamburger dapat dibuka dan ditutup dengan mulus.
  - Semua kartu (artis, layanan, galeri) berbaris rapi 1 kolom di layar ponsel.
- `pnpm.cmd run build` dan `pnpm.cmd run deploy` berhasil dengan Exit Code: 0.
