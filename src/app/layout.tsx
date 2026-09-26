import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#090d16",
};

export const metadata: Metadata = {
  title: "Scalebiz | Scaleup dan Optimalisasi Bisnis Kamu",
  description:
    "Scalebiz - Solusi rekayasa sistem dan optimalisasi digital: Website Interaktif, Point of Sale & Finansial, Otomasi Alur Kerja, serta ERP Operasional tanpa biaya langganan bulanan.",
  keywords: [
    "Scalebiz",
    "Scaleup Bisnis",
    "Optimalisasi Bisnis",
    "Jasa Website Bisnis",
    "Sistem POS & Kasir",
    "Otomasi Bisnis",
    "Custom ERP Indonesia",
    "Software House UMKM"
  ],
  authors: [{ name: "Scalebiz" }],
  openGraph: {
    title: "Scalebiz | Scaleup dan Optimalisasi Bisnis Kamu",
    description:
      "Scaleup dan optimalisasi bisnis kamu dengan arsitektur digital kustom: Website, POS Finansial, Otomasi Workflow, dan ERP Operasional.",
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
