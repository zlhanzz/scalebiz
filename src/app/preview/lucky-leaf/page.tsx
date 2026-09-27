import React from "react";
import type { Metadata } from "next";
import { LUCKY_LEAF_DATA } from "@/data/luckyLeafData";
import PreviewLuckyLeaf from "@/components/preview/PreviewLuckyLeaf";

export const metadata: Metadata = {
  title: `${LUCKY_LEAF_DATA.businessName} • Buffalo, NY | Private Fine-Line Tattoo Sanctuary`,
  description: `${LUCKY_LEAF_DATA.subheadline} Located at 1809 Hertel Avenue, Buffalo, NY. Home of the 1,000 Paper Cranes Project and 1-of-1 botanical flash art.`,
  robots: {
    index: false,
    follow: false
  },
  openGraph: {
    title: `${LUCKY_LEAF_DATA.businessName} • Buffalo, NY | Fine-Line Botanical & Mindful Body Art`,
    description: `An inclusive, non-intimidating private tattoo sanctuary on Hertel Avenue in Buffalo, NY. Single-needle precision, collaborative 3–5 day sketch reviews, and mindful care by Din Tran.`,
    url: "https://scalebiz.web.id/preview/lucky-leaf/",
    siteName: LUCKY_LEAF_DATA.businessName,
    images: [
      {
        url: "https://scalebiz.web.id/images/demo/lucky-leaf/hero-storefront-leaf.jpg",
        width: 1200,
        height: 630,
        alt: `${LUCKY_LEAF_DATA.businessName} - 1809 Hertel Ave, Buffalo NY`
      }
    ],
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: `${LUCKY_LEAF_DATA.businessName} • Buffalo, NY | Private Tattoo Sanctuary`,
    description: `Fine-line botanical tattoos, 1-of-1 claimable flash, and mindful care at 1809 Hertel Ave.`,
    images: ["https://scalebiz.web.id/images/demo/lucky-leaf/hero-storefront-leaf.jpg"]
  }
};

export default function LuckyLeafPreviewPage() {
  return (
    <main>
      <PreviewLuckyLeaf />
    </main>
  );
}
