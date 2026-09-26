# Implementation Plan: Pembaruan Judul & Metadata Web (Scalebiz - Scaleup dan Optimalisasi Bisnis Kamu)

Dokumen ini disusun sebelum modifikasi kode sesuai protokol kerja workspace (`RULE[user_global]`).

---

## 1. Analisis Masalah & Kebutuhan Pengguna

### 1.1 Permintaan Pengguna:
> *"oh iyyaa ganti judul web nya dari zhull developer menjadi scalebiz, scaleup dan optimalisasi bisnis kamu"*

### 1.2 Analisis Teknis:
- Pada [src/app/layout.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/app/layout.tsx), title dan metadata OpenGraph masih menggunakan identitas lama:
  ```ts
  title: "Zhull | Web Developer Spesialis Bisnis Lokal & UMKM"
  ```
- Ini membuat tab browser, pratinjau tautan WhatsApp/sosial media, dan indexing SEO masih menampilkan "Zhull | Web Developer Spesialis Bisnis Lokal & UMKM".
- Perlu diperbarui menjadi:
  `title: "Scalebiz | Scaleup dan Optimalisasi Bisnis Kamu"`
  beserta metadata pendukungnya (deskripsi, keywords, authors, OpenGraph title & description).
- Pada [src/components/HeroEditorial.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/components/HeroEditorial.tsx), atribut `alt` gambar developer juga diselaraskan ke branding Scalebiz.

---

## 2. Dampak Perubahan

### File yang Tersentuh:
1. `src/app/layout.tsx`:
   - Memperbarui `metadata.title` menjadi `"Scalebiz | Scaleup dan Optimalisasi Bisnis Kamu"`.
   - Memperbarui `metadata.description`, `keywords`, `authors`, dan `openGraph`.
2. `src/components/HeroEditorial.tsx`:
   - Menyelaraskan atribut `alt` gambar portrait developer ke branding Scalebiz.
3. `functions/PROGRESS.md`:
   - Pencatatan histori perubahan.
4. `WALKTHROUGH.md`:
   - Panduan pengujian dan instruksi deploy.

---

## 3. Langkah-Langkah Eksekusi

1. **Langkah 1**: Edit `src/app/layout.tsx` untuk memperbarui title dan metadata OpenGraph.
2. **Langkah 2**: Edit `src/components/HeroEditorial.tsx` untuk menyelaraskan `alt` text.
3. **Langkah 3**: Uji build lokal (`pnpm.cmd run build`) untuk memastikan export HTML di folder `./out/index.html` telah menghasilkan tag `<title>` baru yang presisi.
4. **Langkah 4**: Perbarui `WALKTHROUGH.md` dan `functions/PROGRESS.md`.
5. **Langkah 5**: Berikan petunjuk ke user untuk `git add`, `git commit`, dan `git push` agar Cloudflare secara otomatis memperbarui situs live.

---

## 4. Rencana Verifikasi

- **Verifikasi Kompilasi & Build**: `pnpm.cmd run build` exit code 0.
- **Verifikasi Konten HTML Output**: Cek `<title>` di `out/index.html` berisi "Scalebiz | Scaleup dan Optimalisasi Bisnis Kamu".
