import React from "react";
import type { Metadata } from "next";
import { FH_LAND_DATA } from "@/data/fhLandServicesData";
import PreviewFHLandServices from "@/components/preview/PreviewFHLandServices";

export const metadata: Metadata = {
  title: `${FH_LAND_DATA.businessName} • Landscaping & Snow Removal | Lockport, NY`,
  description: `${FH_LAND_DATA.tagline} - Reliable residential & commercial landscaping, precision lawn striping, mulch bed installation, and winter snow removal in Lockport & Western New York.`,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `${FH_LAND_DATA.businessName} • Landscaping & Snow Removal | Lockport, NY`,
    description: `${FH_LAND_DATA.tagline} - Precision lawn striping, mulch bed edging, and winter snow removal in Lockport & Western NY. Interactive property cost estimator & direct route booking.`,
    url: "https://scalebiz.web.id/preview/fh-land-services/",
    siteName: FH_LAND_DATA.businessName,
    images: [
      {
        url: "https://scalebiz.web.id/images/demo/fh-land/hero-landscape.jpg",
        width: 1200,
        height: 630,
        alt: `${FH_LAND_DATA.businessName} - Lockport, NY`,
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${FH_LAND_DATA.businessName} • Landscaping & Snow Removal | Lockport, NY`,
    description: `${FH_LAND_DATA.tagline} - Commercial zero-turn striping, mulch bed edging, and winter snow removal in Western NY.`,
    images: ["https://scalebiz.web.id/images/demo/fh-land/hero-landscape.jpg"],
  },
};

export default function FHLandServicesPreviewPage() {
  return (
    <main suppressHydrationWarning>
      <PreviewFHLandServices />
    </main>
  );
}
