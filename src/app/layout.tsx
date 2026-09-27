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
    default: "Scalebiz | High-Performance Web & Business Systems Engineering",
    template: "%s | Scalebiz",
  },
  description:
    "Scalebiz - Custom-engineered digital systems, high-converting interactive web platforms, workflow automation, and operational software without monthly subscription lock-ins.",
  keywords: [
    "Scalebiz",
    "Business Optimization",
    "Custom Web Development",
    "Interactive Business Websites",
    "Point of Sale Systems",
    "Workflow Automation",
    "Custom Operational Software",
  ],
  authors: [{ name: "Scalebiz" }],
  creator: "Scalebiz",
  publisher: "Scalebiz",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Scalebiz | High-Performance Web & Business Systems Engineering",
    description:
      "Engineered digital systems, custom interactive web platforms, and operational automation for growing businesses.",
    url: "https://scalebiz.web.id",
    siteName: "Scalebiz",
    images: [
      {
        url: "/images/scalebiz-symbol.webp",
        width: 800,
        height: 800,
        alt: "Scalebiz - Web & Business Systems Engineering",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scalebiz | High-Performance Web & Business Systems Engineering",
    description:
      "Engineered digital systems, custom interactive web platforms, and operational automation for growing businesses.",
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
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
