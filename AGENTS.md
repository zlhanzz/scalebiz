# Workspace Agent Directives

Selamat datang di repositori freelance website. Setiap AI Agent yang bekerja di workspace ini **WAJIB** membaca dan menaati aturan di bawah ini:

## 1. Protokol Kerja Baku
- Selalu patuhi protokol kerja di `RULE[user_global]`.
- Buat `IMPLEMENTATION_PLAN.md` sebelum melakukan perubahan fitur inti.
- Catat riwayat pekerjaan di `functions/PROGRESS.md`.
- Buat `WALKTHROUGH.md` setelah menyelesaikan pekerjaan.
- Jangan pernah melakukan deploy ke production atau push ke github secara mandiri.

## 2. Aturan Anti-Slop (Code & Design)
Lihat detail lengkap di [.agents/rules/anti-slop.md](file:///c:/Users/ZHULL/Documents/Freelance/.agents/rules/anti-slop.md).
- **Code**: Mengikuti standar linter [`dmmulroy/anti-slop`](https://github.com/dmmulroy/anti-slop) (menolak eager filter-map chains, chained type assertions, runtime typeof ad-hoc, conditional empty spread, dsb.).
- **Design & Copy**: Menolak estetika AI generik (ungu neon, copywriting robot tanpa makna). Fokus pada kebutuhan riil bisnis lokal (WhatsApp conversion, speed, clean mobile typography, clear pricing tiers).
