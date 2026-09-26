import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#090d16",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://scalebiz.web.id"),
  title: {
    default: "Scalebiz | Scaleup dan Optimalisasi Bisnis Kamu",
    template: "%s | Scalebiz",
  },
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
    "Software House UMKM",
  ],
  authors: [{ name: "Scalebiz" }],
  creator: "Scalebiz",
  publisher: "Scalebiz",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Scalebiz | Scaleup dan Optimalisasi Bisnis Kamu",
    description:
      "Scaleup dan optimalisasi bisnis kamu dengan arsitektur digital kustom: Website, POS Finansial, Otomasi Workflow, dan ERP Operasional.",
    url: "https://scalebiz.web.id",
    siteName: "Scalebiz",
    images: [
      {
        url: "/images/scalebiz-symbol.webp",
        width: 800,
        height: 800,
        alt: "Scalebiz - Scaleup & Optimalisasi Bisnis",
      },
    ],
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scalebiz | Scaleup dan Optimalisasi Bisnis Kamu",
    description:
      "Scaleup dan optimalisasi bisnis kamu dengan arsitektur digital kustom: Website, POS Finansial, Otomasi Workflow, dan ERP Operasional.",
    images: ["/images/scalebiz-symbol.webp"],
  },
};

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
