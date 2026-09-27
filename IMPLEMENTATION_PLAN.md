# Rencana Implementasi: Perapihan Total Header Navigation Desktop & Penyelarasan Proporsi

Dokumen ini disusun untuk mengatasi masalah spesifik pada menu navigasi header desktop yang masih amburadul, di mana teks tautan menu membungkus menjadi dua baris (*multi-line word wrap*) dan memiliki jarak yang tidak proporsional pada resolusi desktop menengah (901px – 1240px).

---

## 1. Analisis Masalah & Akar Penyebab (Root Cause)

Berdasarkan tangkapan layar terbaru dari user:
1. **Teks Navigasi Membungkus Menjadi 2 Baris Vertikal**:
   - `Fencing` terpisah dengan `Styles` di baris kedua.
   - `42" Frost` terpisah dengan `Standard` di baris kedua.
   - `Good Neighbor` terpisah dengan `Program` di baris kedua.
   - `Real` terpisah dengan `Projects` di baris kedua.
   - `Reviews` berada di baris tunggal.
2. **Akar Masalah Teknis**:
   - Elemen `<a>` pada `.desktop-nav` tidak memiliki atribut `white-space: nowrap`.
   - Panjang total karakter tautan lama (`Fencing Styles` + `42" Frost Standard` + `Good Neighbor Program` + `Real Projects` + `Reviews` = ~74 karakter / ~666px) ditambah Logo (~250px) dan 2 Tombol Aksi Header (~340px) membutuhkan lebar minimum **1256px**.
   - Breakpoint mobile sebelumnya diatur pada `max-width: 900px`. Akibatnya, pada semua layar antara **901px hingga 1240px** (laptop 13–14 inci, tablet landscape, layar desktop dengan scaling 125%), ruang yang tersisa untuk navigasi menyusut hingga di bawah 400px. Browser secara otomatis memotong kata menjadi dua baris vertikal (*word wrap*).
   - Tampilan menjadi tidak sejajar secara vertikal (*misaligned*), tinggi header melar tidak beraturan, dan jarak antar menu terlihat aneh dan amburadul.

---

## 2. Solusi Desain & Teknis (Design & Code Architecture)

1. **Pencegahan Word Wrap Permanen**:
   - Menambahkan `white-space: nowrap !important;` pada seluruh tautan navigasi header.
2. **Optimalisasi Label Navigasi yang Ringkas & Modern**:
   - `Fencing Styles` -> `Fencing Styles` (dengan `white-space: nowrap` & padding proporsional).
   - `42" Frost Standard` -> `42" Frost Standard`.
   - `Good Neighbor Program` -> `Neighbor Co-Op` (lebih padat, profesional, dan menghemat 45px).
   - `Real Projects` -> `Projects` atau `Real Projects` (dengan `nowrap`).
   - `Reviews` -> `Reviews`.
3. **Penyempurnaan Tombol Aksi Header**:
   - Label tombol diselaraskan:
     - `Estimate Cost` -> `Estimate Cost` (padding `8px 14px`, `fontSize: 0.84rem`).
     - `Book Laser Measure` -> `Book Laser Measure` (padding `8px 16px`, `fontSize: 0.84rem`).
   - Kontainer aksi diberi `flexShrink: 0`.
4. **Penyesuaian Breakpoint Responsif**:
   - Mengubah breakpoint menu desktop dari `900px` menjadi `1024px` (`@media (max-width: 1024px)`).
   - Pada layar di bawah `1024px` (tablet dan ponsel), tampilan otomatis beralih ke Header Bersih + Drawer Hamburger Interaktif yang elegan, sehingga tidak ada lagi kondisi di mana tautan tertekan di layar sedang.
5. **Estetika Interaktif Modern**:
   - Setiap tautan header diberi style `padding: 6px 12px`, `borderRadius: "6px"`, dan efek hover `background: #F1F5F9` serta warna aktif `#0D3594`.

---

## 3. Dampak Perubahan (Files Affected)

1. [src/components/preview/PreviewTotalFence.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/components/preview/PreviewTotalFence.tsx):
   - Memperbarui struktur `<nav className="desktop-nav">` dengan inline `whiteSpace: "nowrap"` dan label yang proporsional.
   - Memperbarui breakpoint CSS di `<style jsx global>` dari `900px` ke `1024px`.
   - Menambahkan styling hover halus pada class `.header-nav-link`.
2. [scripts/test_total_fence_preview.js](file:///c:/Users/ZHULL/Documents/Freelance/scripts/test_total_fence_preview.js):
   - Menambahkan pengujian viewport desktop menengah (1080x800) dan desktop standar (1280x900) untuk memvalidasi bahwa seluruh tautan navigasi berada dalam satu baris (tidak ada word-wrap vertikal) dan proporsional.

---

## 4. Rencana Verifikasi

1. Menjalankan `pnpm.cmd tsc --noEmit` untuk memastikan tidak ada kesalahan TypeScript.
2. Menjalankan pengujian Puppeteer headless pada lebar:
   - 1280px (Desktop lebar)
   - 1100px (Desktop menengah / laptop)
   - 1024px (Breakpoint tablet)
   - 375px (Mobile)
3. Memverifikasi bahwa tinggi seluruh elemen `<a>` navigasi sama persis dengan line-height baris tunggal (tidak ada yang membungkus ke baris 2).
4. Memeriksa tangkapan layar baru dengan `view_file`.
