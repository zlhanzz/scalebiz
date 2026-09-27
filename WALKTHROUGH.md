# Ringkasan Pekerjaan (Walkthrough): Standarisasi Metadata OpenGraph Bahasa Inggris & Kustomisasi Card Link Preview untuk Bisnis Klien

Dokumen ini disusun setelah pekerjaan selesai sesuai protokol kerja baku workspace ([RULE[user_global]](file:///c:/Users/ZHULL/Documents/Freelance/AGENTS.md)).

---

## 1. Analisis Masalah & Jawaban Pertanyaan Pengguna
Pengguna menanyakan:
> *"sayangnya preview link saat dm masih menggunakan bahasa indonesia. apakah ini karena saya menggunakan ip indonesia atua tidak, atau memang sistem kita belum support, atau memang basicnya masih bahasa indonesia? saya ingin agar basisnya dalah bahasa inggris"*

### Mengapa Hal Ini Terjadi?
1. **Bukan Karena IP Pengirim**: Crawler sosial media (Instagram, Facebook Messenger, WhatsApp, iMessage, LinkedIn) tidak peduli pengirim mengirim dari IP Indonesia atau AS. Bot crawler Facebook (`facebookexternalhit` / `Facebot`) mengunjungi URL tersebut dari server Cloudflare/Facebook di AS dan membaca **HTML OpenGraph Meta Tags** (`<meta property="og:title">`, `<meta property="og:description">`, `<meta property="og:image">`).
2. **Ketiadaan OpenGraph pada Halaman Preview**:
   - Sebelumnya, file [src/app/preview/truly-organic-hair-studio/page.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/app/preview/truly-organic-hair-studio/page.tsx) dan [src/app/preview/fh-land-services/page.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/app/preview/fh-land-services/page.tsx) hanya mendefinisikan judul tab browser dasar `<title>`, tanpa mendefinisikan objek `openGraph` dan `twitter`.
   - Di Next.js App Router, setiap halaman yang tidak memiliki `openGraph` secara otomatis **mewarisi (fallback)** metadata dari file root [src/app/layout.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/app/layout.tsx).
3. **Root `layout.tsx` Awalnya Berbahasa Indonesia**:
   - Root `layout.tsx` memuat judul: `"Scalebiz | Scaleup dan Optimalisasi Bisnis Kamu"` dan gambar `/images/scalebiz-symbol.webp` (logo batang biru Scalebiz).
   - Akibatnya, saat link dibagikan di DM, kartu preview yang digenerate oleh Instagram menampilkan logo Scalebiz dan teks bahasa Indonesia tersebut.

---

## 2. Perubahan yang Dilakukan (What Was Changed)

### A. Kustomisasi Kartu Preview Spesifik Tiap Bisnis Klien
Setiap halaman demo kini memiliki identitas OpenGraph dan Twitter Card yang kaya, profesional, dan berbahasa Inggris dengan tautan gambar absolut:

1. **Truly Organic Hair Studio** ([src/app/preview/truly-organic-hair-studio/page.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/app/preview/truly-organic-hair-studio/page.tsx)):
   - **og:title**: `Truly Organic Hair Studio • Lockport, NY | Boutique Salon & Private Suites`
   - **og:description**: `Lockport's Premier Organic Salon & Private Beauty Suites. Collaborative sanctuary of 11 independent beauty artisans on Davison Rd specializing in clean formulations, lived-in blonding, and private suite care.`
   - **og:image**: `https://scalebiz.web.id/images/demo/truly-organic/hero.jpg` (Foto butik salon nyata)
   - **og:locale**: `en_US`
   - **twitter:card**: `summary_large_image`

2. **FH Land Services** ([src/app/preview/fh-land-services/page.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/app/preview/fh-land-services/page.tsx)):
   - **og:title**: `FH Land Services • Landscaping & Snow Removal | Lockport, NY`
   - **og:description**: `Precision lawn striping, mulch bed edging, and winter snow removal in Lockport & Western NY. Interactive property cost estimator & direct route booking.`
   - **og:image**: `https://scalebiz.web.id/images/demo/fh-land/hero-landscape.jpg` (Foto lanskap perumahan nyata)
   - **og:locale**: `en_US`

3. **Trendy Nail Spa** ([src/app/preview/trendy-nail-spa/page.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/app/preview/trendy-nail-spa/page.tsx)):
   - **og:title**: `Trendy Nail Spa • Lockport, NY | Luxury Nails & Organic Spa Care`
   - **og:description**: `Russian manicure, luxury gel extensions, custom nail art, and organic spa pedicures on S Transit Rd.`
   - **og:image**: `https://scalebiz.web.id/images/demo/trendy/hero.jpg`
   - **og:locale**: `en_US`

### B. Standarisasi Root Metadata ke Bahasa Inggris ([src/app/layout.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/app/layout.tsx))
- Mengubah basis default seluruh situs menjadi Bahasa Inggris:
  - **default title**: `Scalebiz | High-Performance Web & Business Systems Engineering`
  - **description**: `Custom-engineered digital systems, high-converting interactive web platforms, workflow automation, and operational software without monthly subscription lock-ins.`
  - **og:locale**: `en_US`
  - **html tag**: `<html lang="en">`

---

## 3. Hasil Pengujian & Bukti Eksekusi (Verification Results)
- `pnpm.cmd run build` -> **Exit Code: 0**.
- Script verifikasi tag HTML membuktikan bahwa file `index.html` yang diekspor di direktori `out/preview/...` telah memuat seluruh tag OpenGraph dan Twitter Card dalam Bahasa Inggris dengan link foto resolusi tinggi.

---

## 4. Tips Mengatasi Cache Preview di Instagram / Facebook
Instagram dan Facebook menyimpan *cache* kartu pratinjau link untuk setiap URL yang pernah dibagikan. Jika Anda membagikan link yang sama persis beberapa saat setelah perubahan dideploy, ada kemungkinan Instagram masih menampilkan cache lama.

**Cara Memaksa Instagram/Facebook Mengambil Preview Baru:**
1. Tambahkan parameter versi pada tautan saat mengirim DM, misalnya:
   `https://scalebiz.web.id/preview/truly-organic-hair-studio/?v=2`
   atau
   `https://scalebiz.web.id/preview/fh-land-services/?v=2`
   *(Bot Instagram/Facebook menganggap URL dengan `?v=2` sebagai URL baru dan akan men-scrape ulang seketika dengan kartu berbahasa Inggris & foto salon/lanskap).*
2. Atau gunakan alat resmi [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) lalu klik tombol **Scrape Again**.

---

## 5. Petunjuk Deploy Manual untuk Pengguna
Saat Anda siap memperbarui perubahan ini ke server Cloudflare produksi:
```bash
# 1. Jalankan build produksi
pnpm run build

# 2. Deploy ke Cloudflare
pnpm run deploy

# 3. Commit dan push ke GitHub
git add .
git commit -m "feat(seo): add english opengraph and twitter card metadata for preview demos and root layout"
git push origin main
```
