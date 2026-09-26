import React from "react";
import type { Metadata } from "next";
import { TRULY_ORGANIC_DATA } from "@/data/trulyOrganicData";
import PreviewTrulyOrganic from "@/components/preview/PreviewTrulyOrganic";

export const metadata: Metadata = {
  title: `${TRULY_ORGANIC_DATA.businessName} • Lockport, NY (Concept Preview)`,
  description: TRULY_ORGANIC_DATA.tagline,
  robots: {
    index: false,
    follow: false,
  },
};

export default function TrulyOrganicPreviewPage() {
  return (
    <main>
      <PreviewTrulyOrganic />
    </main>
  );
}
