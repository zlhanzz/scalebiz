# Rencana Implementasi: Deteksi Otomatis IP Indonesia vs Luar Indonesia untuk Adaptasi Bahasa (i18n)

Dokumen ini disusun sebelum melakukan modifikasi kode sesuai protokol kerja workspace (`RULE[user_global]`).

## 1. Analisis Masalah & Kebutuhan Pengguna
- **Permintaan Pengguna**:
  > *"pastikan agar sistem kita bisa mengetahui ip indonesia dan ip luar indonesia untuk menampilkan website dengan bahasa yang sesuai. indonesia untuk dalam indonesia dan inggris untuk luar indonesia"*
- **Akar Masalah Teknis & Analisis Investigasi**:
  1. **Locking di `localStorage` & `sessionStorage`**:
     Pada implementasi sebelumnya, jika browser pernah menyimpan preferensi bahasa manual atau cache negara sesi lama, sistem langsung keluar (`return`) tanpa pernah mengecek apakah IP pengunjung berubah. Hal ini menyebabkan ketika pengguna mencoba menguji situs dengan menyalakan VPN luar negeri (misal AS, Singapura, Eropa), situs tetap terkunci pada Bahasa Indonesia.
  2. **Optimalisasi Kecepatan & Keandalan Edge Cloudflare (`/cdn-cgi/trace`)**:
     Karena situs `scalebiz.web.id` dilayani oleh Cloudflare CDN, Cloudflare menyediakan endpoint internal tanpa latensi (`same-origin`) di `/cdn-cgi/trace` yang mengembalikan kode negara pengunjung (`loc=ID`, `loc=US`, `loc=SG`, dsb.) dalam hitungan < 15 milidetik tanpa batasan CORS ataupun kuota API pihak ketiga.
  3. **Multi-tier Redundant GeoIP Resolvers**:
     Untuk memastikan deteksi selalu berhasil dalam kondisi apapun (baik di Cloudflare live, localhost dev server, maupun saat provider tertentu offline), sistem memerlukan strategi balapan paralel (*concurrent race*):
     - Tier 1: Cloudflare Native `/cdn-cgi/trace` (Same-origin, sub-15ms).
     - Tier 2: `https://cloudflare.com/cdn-cgi/trace` (Global Cloudflare fallback).
     - Tier 3: `https://api.country.is` (Edge JSON).
     - Tier 4: `https://get.geojs.io/v1/ip/country.json` (Edge JSON).
     - Tier 5: Browser Locale & Timezone Heuristic (Offline fallback).
  4. **Dynamic Synchronized Document Title**:
     Saat bahasa terdeteksi sebagai `en`, selain seluruh konten dan `document.documentElement.lang`, judul halaman juga harus otomatis berubah ke versi Bahasa Inggris (`Scalebiz | Scale Up and Optimize Your Business`).
  5. **Dukungan Testing Parameter URL**:
     Menyediakan bypass parameter pengujian `?geo=US` / `?geo=ID` atau `?lang=en` / `?lang=id` agar pengguna dan penguji dapat memvalidasi tampilan kedua bahasa secara instan tanpa harus menginstal/menyalakan VPN.

## 2. Dampak Perubahan & File yang Tersentuh
- [src/context/LanguageContext.tsx](file:///c:/Users/ZHULL/Documents/Freelance/src/context/LanguageContext.tsx):
  - Memperbarui mekanisme deteksi GeoIP berbasis Cloudflare native `/cdn-cgi/trace` + multi-resolver race.
  - Menghapus locking kaku yang mencegah deteksi saat IP berganti (misal saat VPN diaktifkan/dinonaktifkan).
  - Menyinkronkan `document.title` saat bahasa berubah.
  - Menambahkan dukungan parameter URL (`?geo=...` & `?lang=...`).
- [src/types/i18n.ts](file:///c:/Users/ZHULL/Documents/Freelance/src/types/i18n.ts):
  - Menambahkan properti `detectedCountry: string | null` pada `LanguageContextType` untuk observabilitas.
- [functions/PROGRESS.md](file:///c:/Users/ZHULL/Documents/Freelance/functions/PROGRESS.md):
  - Mencatat riwayat implementasi deteksi GeoIP anti-amnesia.
- [WALKTHROUGH.md](file:///c:/Users/ZHULL/Documents/Freelance/WALKTHROUGH.md):
  - Mendokumentasikan pengujian dan petunjuk bagi pengguna untuk memverifikasi deteksi IP dengan VPN atau URL parameter.

## 3. Langkah-Langkah Eksekusi
1. **Langkah 1**: Perbarui tipe i18n di `src/types/i18n.ts` agar menyertakan `detectedCountry`.
2. **Langkah 2**: Refaktor `src/context/LanguageContext.tsx` dengan arsitektur deteksi Cloudflare Native + Multi-Provider Race + Dynamic IP Transition.
3. **Langkah 3**: Lakukan kompilasi TypeScript (`pnpm exec tsc --noEmit`) untuk memastikan bebas error tipe.
4. **Langkah 4**: Jalankan Next.js build (`pnpm run build`) untuk memastikan export statis berjalan sempurna.
5. **Langkah 5**: Perbarui dokumentasi `PROGRESS.md` dan `WALKTHROUGH.md`.

## 4. Rencana Verifikasi
- Pengujian tipe: `pnpm exec tsc --noEmit` wajib exit code 0.
- Pengujian build: `pnpm run build` wajib exit code 0.
- Simulasi IP Indonesia: Memastikan deteksi mengembalikan `ID` dan merender Bahasa Indonesia.
- Simulasi IP Luar Negeri / Override: Menguji via parameter `?geo=US` dan `?lang=en` untuk memastikan seluruh komponen berpindah ke Bahasa Inggris secara mulus.
