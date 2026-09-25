import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#090d16",
};

export const metadata: Metadata = {
  title: "Zhull | Web Developer Spesialis Bisnis Lokal & UMKM",
  description:
    "Jasa pembuatan website cepat, rapi, dan langsung terhubung ke WhatsApp pelanggan. Portfolio proyek real: Proptech ruangsinggah.id, sistem finansial agribisnis, dan konsultasi cerdas.",
  keywords: [
    "Jasa Website Bisnis Lokal",
    "Web Developer Indonesia",
    "Website UMKM",
    "Jasa Bikin Website Kafe",
    "Website WhatsApp Order",
    "Zhull Web Developer"
  ],
  authors: [{ name: "Zhull" }],
  openGraph: {
    title: "Zhull | Web Developer Spesialis Bisnis Lokal & UMKM",
    description:
      "Website bisnis yang cepat, elegan, dan langsung menghasilkan pesanan via WhatsApp. Selesai dalam 2–3 hari kerja.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
