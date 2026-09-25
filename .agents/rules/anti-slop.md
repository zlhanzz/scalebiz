# Anti-Slop Guidelines (Adopted from dmmulroy/anti-slop)

Dokumen ini mendefinisikan aturan ketat untuk menolak pola **AI Slop**—baik pada tingkat kode pemrograman (JavaScript/TypeScript) maupun pada tingkat desain UI/UX dan copywriting website portofolio.

---

## BAGIAN 1: Aturan Kode (Code Anti-Slop - Oxlint Rules)
Diadopsi langsung dari standar [`dmmulroy/anti-slop`](https://github.com/dmmulroy/anti-slop). Semua kode yang ditulis oleh AI Agent dalam repository ini wajib mematuhi aturan berikut:

1. **`no-array-filter-map`**: Dilarang menggunakan rantai method `.filter().map()` yang eager dan boros memori alokasi. Gunakan perulangan satu tahap (single-pass loop), reducer efisien, atau iterator pipeline.
2. **`no-chained-type-assertions`**: Dilarang keras melakukan manipulasi tipe data bertingkat (`foo as unknown as Bar` atau manipulasi tipe palsu). Manipulasi tipe data harus didukung bukti struktur atau skema validasi. Pengecualian hanya untuk `as const`.
3. **`no-conditional-empty-object-spread`**: Dilarang menggunakan spread bersyarat dengan objek kosong `{ ...(cond ? { key: val } : {}) }`. Tetapkan field secara eksplisit atau bentuk properti secara bersih.
4. **`no-reduce-accumulator-copy`**: Dilarang melakukan clone/copy accumulator di dalam reduce berulang kali yang memicu beban garbage collection.
5. **`no-known-value-widening`**: Dilarang menurunkan presisi tipe (widening) ke `unknown`, `object`, atau open dictionary tanpa parsing batas data.
6. **`no-runtime-typeof`**: Dilarang melakukan narrowing ad-hoc dengan `typeof x === 'object'` di tempat-tempat kritis. Gunakan schema boundary parsing (seperti Zod/Valibot) atau type guard berbobot.
7. **`no-object-parameters`**: Dilarang mendefinisikan tipe parameter fungsi sebagai generic `object`. Gunakan tipe interface/type yang konkret.
8. **`no-unsafe-dictionary-type`**: Hindari tipe `Record<string, any>`. Definisikan set key yang terhingga atau gunakan abstraksi Map yang aman.
9. **`require-safety-comment-for-type-assertion`**: Jika terpaksa menggunakan type assertion `as Type`, wajib menyertakan komentar penjelasan mengapa manipulasi tersebut dijamin aman di runtime.
10. **`require-readable-spacing`**: Kode harus memiliki keterbacaan tinggi, penataan spasi dan indentasi yang rapi tanpa blok kode padat yang sulit dibaca manusia.

---

## BAGIAN 2: Aturan Desain & Konten (Design & Copywriting Anti-Slop)
Mencegah website portofolio terlihat seperti template AI murahan:

1. **Anti-Cliché Color Palette**:
   - DILARANG menggunakan kombinasi warna klise AI SaaS (ungu neon pekat + cyan neon + latar belakang hitam pekat berbintik bintang).
   - WAJIB menggunakan palet warna terkurasi, berwibawa, dan kontras tinggi yang nyaman di mata pemilik bisnis lokal (contoh: Deep Slate, Navy, Warm Ivory, Emerald, atau Amber accents).
2. **Anti-Robot Copywriting**:
   - DILARANG menggunakan kata-kata hampa AI seperti: *"Membuka potensi masa depan digital bisnis Anda dengan sinergi mutakhir"*.
   - WAJIB menggunakan kalimat bernilai riil & solutif: *"Website Cepat, Desain Rapi, dan Langsung Terhubung ke WhatsApp Pelanggan Anda. Selesai dalam 3 Hari Kerja."*
3. **Kontekstual Bisnis Lokal**:
   - Jangan tampilkan ilustrasi robot 3D melayang atau bola prisma kaca holografik yang tidak ada kaitannya dengan bisnis nyata.
   - Tampilkan studi kasus bisnis lokal riil: Menu digital kafe, katalog produk toko lokal, sistem booking konsultasi klinik/salon, integrasi Google Maps, dan tombol WhatsApp Click-to-Chat.
4. **Mobile First & Ultra-Fast Loading**:
   - 90% pemilik bisnis lokal membuka website lewat smartphone via tautan WhatsApp.
   - Hindari script animasi berat (seperti canvas 3D raksasa) yang membuat HP klien panas atau lag.
   - Navigasi harus nyaman untuk jempol tangan (thumb-friendly UX).
