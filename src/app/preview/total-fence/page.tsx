import React from "react";
import type { Metadata } from "next";
import { TOTAL_FENCE_DATA } from "@/data/totalFenceData";
import PreviewTotalFence from "@/components/preview/PreviewTotalFence";

export const metadata: Metadata = {
  title: `${TOTAL_FENCE_DATA.businessName} • Vinyl, Chain Link & Wood Fence Builders | Western NY`,
  description: `${TOTAL_FENCE_DATA.tagline} - Premier vinyl privacy, black vinyl-coated chain link, and custom wood fencing in Buffalo, Niagara Falls, and Western New York. 42-inch frost-line post anchors. Interactive fence cost estimator & online laser measure scheduling.`,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `${TOTAL_FENCE_DATA.businessName} • Vinyl & Chain Link Fence Builders | Buffalo & Niagara Falls NY`,
    description: `${TOTAL_FENCE_DATA.tagline} - Commercial-grade vinyl privacy, black chain link, and cedar fencing engineered for WNY winters. Calculate your fence project investment online.`,
    url: "https://scalebiz.web.id/preview/total-fence/",
    siteName: TOTAL_FENCE_DATA.businessName,
    images: [
      {
        url: "https://scalebiz.web.id/images/demo/total-fence/vinyl-privacy-gazebo.jpg",
        width: 1200,
        height: 900,
        alt: `${TOTAL_FENCE_DATA.businessName} - Buffalo & Niagara Falls, NY`,
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TOTAL_FENCE_DATA.businessName} • Vinyl & Chain Link Fence Builders | WNY`,
    description: `${TOTAL_FENCE_DATA.tagline} - 42-inch frost-line post anchors, 5.0 rated local crews, and instant online linear footage estimating.`,
    images: ["https://scalebiz.web.id/images/demo/total-fence/vinyl-privacy-gazebo.jpg"],
  },
};

export default function TotalFencePreviewPage() {
  return (
    <main suppressHydrationWarning>
      <PreviewTotalFence />
    </main>
  );
}
