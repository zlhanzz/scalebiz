# Implementation Plan: Konfigurasi Deployment Cloudflare (Fix OpenNext ENOENT Error)

Dokumen ini disusun sebelum modifikasi file konfigurasi sesuai protokol kerja workspace (`RULE[user_global]`).

---

## 1. Analisis Masalah & Akar Masalah (Root Cause)

### 1.1 Error yang Terjadi di Cloudflare:
Pada log deployment Cloudflare:
```
Executing user deploy command: npx wrangler deploy
...
🛠️  Configuring project for Next.js with OpenNext by running `@opennextjs/cloudflare migrate`
...
[build] Running: pnpm opennextjs-cloudflare build
...
[build] Error: ENOENT: no such file or directory, open '/opt/buildhome/repo/.next/standalone/.next/server/pages-manifest.json'
```

### 1.2 Akar Masalah (Root Cause):
1. **Ketidakcocokan Arsitektur Next.js Static Export vs OpenNext SSR**:
   - Repository `scalebiz` dikonfigurasi menggunakan static export murni pada `next.config.ts`:
     ```ts
     const nextConfig: NextConfig = {
       output: "export",
       images: { unoptimized: true },
       trailingSlash: true,
     };
     ```
   - Ketika Next.js dijalankan dengan `output: "export"`, direktori hasil build adalah `./out` (HTML/CSS/JS statis), **bukan** `.next/standalone/`.
2. **Auto-Detection Wrangler**:
   - Di dashboard Cloudflare, project dibuat sebagai **Worker** (atau deploy command diatur ke `npx wrangler deploy`).
   - Karena di root repository belum ada file `wrangler.jsonc`, Wrangler mencoba mendeteksi framework secara otomatis dan mengasumsikan Next.js harus menggunakan adapter serverless dynamic SSR `@opennextjs/cloudflare`.
   - Adapter `@opennextjs/cloudflare` mencari file `.next/standalone/.next/server/pages-manifest.json`. Karena file tersebut tidak ada pada static export, build langsung gagal dengan `ENOENT`.

---

## 2. Solusi & Dampak Perubahan

### Solusi Utama: Konfigurasi `wrangler.jsonc` (Workers Static Assets)
Menambahkan file `wrangler.jsonc` di root repository yang secara eksplisit memberitahu Cloudflare Wrangler bahwa proyek ini menyajikan **Static Assets** dari direktori `./out`:
```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "scalebiz",
  "compatibility_date": "2024-09-23",
  "build": {
    "command": "pnpm run build"
  },
  "assets": {
    "directory": "./out",
    "not_found_handling": "single-page-application",
    "html_handling": "auto-trailing-slash"
  }
}
```

### Dampak:
- Wrangler tidak akan lagi mencoba menjalankan `@opennextjs/cloudflare migrate` atau mencari `.next/standalone`.
- Cloudflare akan langsung mengeksekusi `pnpm run build` yang menghasilkan folder `./out`, lalu meng-upload seluruh aset statis ke CDN global Cloudflare.
- Zero cold starts, latency minimal, dan kompatibel 100% dengan custom domain `scalebiz.web.id`.

### File yang Tersentuh:
- `wrangler.jsonc` *(File Baru)*: Konfigurasi resmi Cloudflare Workers Static Assets.
- `functions/PROGRESS.md`: Pencatatan histori progress.
- `WALKTHROUGH.md`: Panduan langkah konkret bagi user.

---

## 3. Langkah-Langkah Eksekusi

1. **Langkah 1**: Buat file `wrangler.jsonc` di root project dengan definisi `assets.directory = "./out"` dan `build.command = "pnpm run build"`.
2. **Langkah 2**: Verifikasi build lokal dengan `pnpm run build` untuk memastikan direktori `./out` terisi lengkap dan tidak ada error kompilasi.
3. **Langkah 3**: Dokumentasikan hasil pengujian dan panduan langkah deployment ke `WALKTHROUGH.md` dan `functions/PROGRESS.md`.
4. **Langkah 4**: Berikan instruksi jelas ke user untuk melakukan `git add`, `git commit`, `git push` ke GitHub, serta cara memicu re-deploy di Cloudflare.

---

## 4. Rencana Verifikasi

1. **Uji Validasi Konfigurasi**:
   - Memastikan `wrangler.jsonc` valid secara sintaks JSONC.
2. **Uji Kompilasi Lokal**:
   - Memastikan `pnpm run build` menghasilkan folder `./out` dengan `index.html`, aset gambar, dan chunk JS tanpa error.
