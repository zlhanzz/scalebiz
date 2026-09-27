import React from "react";
import type { Metadata } from "next";
import { INKTELLECTUAL_DATA } from "@/data/inktellectualData";
import { PreviewInktellectual } from "@/components/preview/PreviewInktellectual";

export const metadata: Metadata = {
  title: `${INKTELLECTUAL_DATA.businessName} • Custom Tattoo Atelier & Body Piercing | Buffalo, NY`,
  description: `${INKTELLECTUAL_DATA.headline} - Buffalo's premier collective of 6 specialized tattoo artists and piercers on Amherst Street. Black & grey realism, fine-line botanicals, vibrant neo-traditional, and medical-grade sterile technique. Buffalo State student discount available.`,
  robots: {
    index: false,
    follow: false
  },
  openGraph: {
    title: `${INKTELLECTUAL_DATA.businessName} • Custom Tattoo & Piercing Collective | Buffalo, NY`,
    description: `${INKTELLECTUAL_DATA.subheadline} Located at 408 Amherst St, 3 mins from Buffalo State University. Interactive tattoo budget calculator & online consultation desk.`,
    url: "https://scalebiz.web.id/preview/inktellectual/",
    siteName: INKTELLECTUAL_DATA.businessName,
    images: [
      {
        url: "https://scalebiz.web.id/images/demo/inktellectual/storefront-team.jpg",
        width: 1200,
        height: 675,
        alt: `${INKTELLECTUAL_DATA.businessName} - Buffalo, NY`
      }
    ],
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: `${INKTELLECTUAL_DATA.businessName} • Custom Tattoo Atelier | Buffalo, NY`,
    description: `${INKTELLECTUAL_DATA.headline} - 6 resident artists, sterile single-use EO gas needles, and Buff State student specials.`,
    images: ["https://scalebiz.web.id/images/demo/inktellectual/storefront-team.jpg"]
  }
};

export default function InktellectualPreviewPage() {
  return (
    <main suppressHydrationWarning>
      <PreviewInktellectual />
    </main>
  );
}
