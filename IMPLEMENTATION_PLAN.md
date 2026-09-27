# Rencana Implementasi: Standarisasi Metadata OpenGraph Bahasa Inggris & Kustomisasi Card Link Preview untuk Bisnis Klien

Dokumen ini disusun sesuai protokol kerja baku workspace (`RULE[user_global]`).

---

## 1. Analisis Masalah (Problem Analysis)
Pengguna menemukan masalah kritis saat membagikan link preview via DM Instagram/Facebook:
> *"sayangnya preview link saat dm masih menggunakan bahasa indonesia. apakah ini karena saya menggunakan ip indonesia atua tidak, atau memang sistem kita belum support, atau memang basicnya masih bahasa indonesia? saya ingin agar basisnya dalah bahasa inggris"*

### Mengapa Masalah Ini Terjadi?
1. **Bukan karena IP Pengguna**: Crawler media sosial (Facebook External Hit, Instagram In-App Browser, WhatsApp Link Unfurler) tidak memeriksa IP pengirim. Crawler membaca tag HTML metadata **OpenGraph (`og:title`, `og:description`, `og:image`, `og:locale`)** yang dihasilkan server.
2. **Ketiadaan OpenGraph pada Halaman Preview**:
   - `src/app/preview/truly-organic-hair-studio/page.tsx`, `src/app/preview/fh-land-services/page.tsx`, dan `src/app/preview/trendy-nail-spa/page.tsx` hanya mendefinisikan `<title>` dasar, tetapi **belum mendefinisikan properti `openGraph` dan `twitter`**.
   - Dalam Next.js App Router, jika sebuah halaman tidak mendeklarasikan `openGraph`, Next.js otomatis mewarisi (*inherit / fallback*) metadata dari root `layout.tsx`.
3. **Root `layout.tsx` Masih Berbahasa Indonesia**:
   - Root `layout.tsx` memiliki `openGraph.title = "Scalebiz | Scaleup dan Optimalisasi Bisnis Kamu"` dan gambar default berupa logo Scalebiz.
   - Akibatnya, saat link `/preview/truly-organic-hair-studio/` di-paste ke DM, kartu pratinjau yang muncul di layar penerima Amerika adalah teks bahasa Indonesia dan logo Scalebiz.

---

## 2. Dampak Perubahan (Impact of Changes)
File-file yang akan dimodifikasi:
1. `src/app/layout.tsx`:
   - Mengubah basis default metadata dari bahasa Indonesia ke **Bahasa Inggris profesional global** (`title`, `description`, `openGraph`, `twitter`, dan `html lang="en"`).
2. `src/app/preview/truly-organic-hair-studio/page.tsx`:
   - Menambahkan metadata OpenGraph dan Twitter Card spesifik untuk *Truly Organic Hair Studio* (judul salon, deskripsi low-tox beauty sanctuary di Davison Rd, foto hero salon organik, dan `locale: "en_US"`).
3. `src/app/preview/fh-land-services/page.tsx`:
   - Menambahkan metadata OpenGraph dan Twitter Card spesifik untuk *FH Land Services* (judul landscaping & snow removal di Lockport NY, foto lanskap lapangan, dan `locale: "en_US"`).
4. `src/app/preview/trendy-nail-spa/page.tsx`:
   - Menambahkan metadata OpenGraph dan Twitter Card spesifik untuk *Trendy Nail Spa* (judul nail spa & organic care di S Transit Rd, foto manicure/pedicure, dan `locale: "en_US"`).

---

## 3. Langkah-Langkah Eksekusi (Execution Steps)
1. **Perbarui `src/app/layout.tsx`**:
   - Standarisasi root metadata ke Bahasa Inggris:
     - `title.default`: `"Scalebiz | High-Performance Web & Business Engineering Systems"`
     - `description`: `"Custom-engineered digital systems, high-converting interactive websites, workflow automation, and operational platforms without monthly software lock-ins."`
     - `openGraph` & `twitter` dalam Bahasa Inggris, `locale: "en_US"`.
     - Ubah `<html lang="id">` menjadi `<html lang="en">`.
2. **Perbarui Metadata di `src/app/preview/truly-organic-hair-studio/page.tsx`**:
   - Tambahkan `openGraph` & `twitter` dengan image: `"/images/demo/truly-organic/hero.jpg"`.
3. **Perbarui Metadata di `src/app/preview/fh-land-services/page.tsx`**:
   - Tambahkan `openGraph` & `twitter` dengan image: `"/images/demo/fh-land/hero-landscape.jpg"`.
4. **Perbarui Metadata di `src/app/preview/trendy-nail-spa/page.tsx`**:
   - Tambahkan `openGraph` & `twitter` dengan image: `"/images/demo/trendy/hero.jpg"`.
5. **Verifikasi Build**:
   - Jalankan `pnpm run build` untuk memverifikasi ekspor statis HTML dengan semua tag meta OpenGraph yang valid.
6. **Inspeksi HTML Output**:
   - Periksa file HTML yang diekspor di `out/preview/...` untuk memastikan tag `<meta property="og:title">`, `<meta property="og:description">`, `<meta property="og:image">`, dan `<meta property="og:locale">` terpasang dalam Bahasa Inggris dengan link gambar absolut/relatif yang benar.
7. **Pembaruan Dokumentasi**:
   - Catat progres di `functions/PROGRESS.md` dan `WALKTHROUGH.md`.

---

## 4. Rencana Verifikasi (Verification Plan)
- Menjalankan script parser HTML terhadap folder `out/preview/truly-organic-hair-studio/index.html` dan `out/preview/fh-land-services/index.html` untuk memastikan:
  1. `og:title` berbahasa Inggris dan mencerminkan nama bisnis klien.
  2. `og:description` berbahasa Inggris dan memuat poin penting lokal Lockport, NY.
  3. `og:image` menunjuk pada foto ril masing-masing bisnis klien.
  4. Tidak ada lagi sisa teks Indonesia pada tag meta pratinjau link.
- Build Next.js exit code: 0.
