import React from "react";
import type { Metadata } from "next";
import { MIA_BELLA_DATA } from "@/data/miaBellaData";
import PreviewMiaBella from "@/components/preview/PreviewMiaBella";

export const metadata: Metadata = {
  title: `${MIA_BELLA_DATA.businessName} • Lockport, NY | Award-Winning Vivid Colors`,
  description: `${MIA_BELLA_DATA.tagline}. High-voltage vivids, holographic rainbow peekaboos, lived-in blonding, and sacred metaphysical boutique in Lockport, NY.`,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `${MIA_BELLA_DATA.businessName} • Lockport, NY | Award-Winning Vivid Colors`,
    description: `${MIA_BELLA_DATA.tagline}. High-voltage vivids, holographic rainbow peekaboos, lived-in blonding, and sacred metaphysical boutique in Lockport, NY.`,
    url: "https://scalebiz.web.id/preview/mia-bellas-hair-salon/",
    siteName: MIA_BELLA_DATA.businessName,
    images: [
      {
        url: "https://scalebiz.web.id/images/demo/mia-bella/logo-pinup.jpg",
        width: 800,
        height: 800,
        alt: `${MIA_BELLA_DATA.businessName} - Lockport, NY`,
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${MIA_BELLA_DATA.businessName} • Lockport, NY | Award-Winning Vivid Colors`,
    description: `${MIA_BELLA_DATA.tagline}. High-voltage vivids, holographic rainbow peekaboos, and sacred metaphysical hair rituals.`,
    images: ["https://scalebiz.web.id/images/demo/mia-bella/logo-pinup.jpg"],
  },
};

export default function MiaBellaPreviewPage() {
  return (
    <main suppressHydrationWarning>
      <PreviewMiaBella />
    </main>
  );
}
