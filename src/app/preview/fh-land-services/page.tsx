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
};

export default function FHLandServicesPreviewPage() {
  return (
    <main suppressHydrationWarning>
      <PreviewFHLandServices />
    </main>
  );
}
