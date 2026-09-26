# Rencana Implementasi: Perbaikan Presisi Tata Letak Layanan & Penghapusan Banner "Claim This Website"

Dokumen ini disusun sebelum melakukan modifikasi kode sesuai protokol kerja workspace (`RULE[user_global]`).

---

## 1. Analisis Masalah
1. **Tumpang Tindih Teks pada Kartu Layanan (Services & Pricing Menu)**:
   - Pada kartu layanan yang memiliki badge `FEATURED SERVICE`, posisi badge menggunakan `position: absolute; top: 16px; right: 16px;`.
   - Di saat yang sama, kontainer judul dan harga menggunakan `display: flex; justify-content: space-between;` yang menempatkan teks harga (`item.price`, misalnya *"Custom Quote"* atau *"$195 - $205"*) tepat di pojok kanan atas yang sama.
   - Akibatnya, badge "FEATURED SERVICE" menimpa langsung teks harga dan judul layanan. Selain itu, judul layanan yang panjang ("Partial Blonding & Face-Framing Money Piece") berhimpitan secara horizontal dengan harga.
2. **Keberadaan Floating Banner "Claim This Website"**:
   - Di bagian bawah layar terdapat bar melayang penawaran website (`ClaimDemoBar`).
   - Klien menginginkan agar website prototype ini terlihat 100% seperti website salon profesional murni tanpa ada embel-embel penawaran atau claim bar di bagian bawah.

---

## 2. Dampak Perubahan & File yang Tersentuh
- `src/components/preview/PreviewTrulyOrganic.tsx`:
  - Menghapus impor `ClaimDemoBar` dan pemanggilannya di bagian bawah komponen.
  - Menyesuaikan `paddingBottom` pada wrapper utama dari `100px` menjadi `0` (karena tidak ada lagi floating bar yang perlu dihindari).
  - Merombak arsitektur layout kartu layanan (`#services`):
    - Baris atas khusus: Menampilkan badge kategori/featured di sisi kiri dan harga di sisi kanan (`display: flex; justify-content: space-between; align-items: center;`).
    - Baris judul: Judul layanan (`h3`) mengambil lebar penuh kartu sehingga tidak terpotong atau berdesakan dengan harga.
    - Baris durasi & deskripsi: Diberikan spasi yang proporsional dan tipografi elegan.
- `functions/PROGRESS.md`:
  - Pencatatan riwayat pembaruan (anti-amnesia).
- `WALKTHROUGH.md`:
  - Dokumentasi hasil perubahan dan verifikasi visual.

---

## 3. Langkah-Langkah Eksekusi
1. **Langkah 1**: Edit `src/components/preview/PreviewTrulyOrganic.tsx`:
   - Hapus `import ClaimDemoBar from "./ClaimDemoBar";`.
   - Hapus `<ClaimDemoBar ... />` di baris akhir render JSX.
   - Hapus `paddingBottom: "100px"` pada wrapper root div.
   - Perbaiki kartu layanan pada loop `data.services[activeServiceTab]?.items.map(...)`:
     - Struktur baru yang terisolasi dengan rapi:
       1. Top metadata row: Status badge (`Featured Service` / `Botanical Care`) di kiri, Harga di kanan.
       2. Title row: Judul layanan (`h3`) yang bebas membentang.
       3. Duration row: Ikon jam + durasi pengerjaan.
       4. Description: Deskripsi layanan dengan line-height yang nyaman dibaca.
       5. Card Footer: Tombol "Reserve This Service →".
2. **Langkah 2**: Jalankan verifikasi build:
   - Eksekusi `pnpm.cmd run build` untuk memverifikasi TypeScript dan Next.js SSG build.
3. **Langkah 3**: Catat progres dan dokumentasi:
   - Perbarui `functions/PROGRESS.md` dan `WALKTHROUGH.md`.

---

## 4. Rencana Verifikasi
- Pastikan tidak ada lagi badge "FEATURED SERVICE" yang bertumpukan dengan teks harga atau nama treatment pada menu layanan.
- Pastikan floating banner "Claim This Website" telah bersih 100% dari halaman.
- `pnpm run build` berhasil tanpa error.
