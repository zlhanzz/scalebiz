import React from "react";
import type { Metadata } from "next";
import { DEMO_PROTOTYPES } from "@/data/demoPrototypes";
import PreviewNailSalon from "@/components/preview/PreviewNailSalon";

export const metadata: Metadata = {
  title: "Trendy Nail Spa • Lockport, NY (Preview)",
  description: DEMO_PROTOTYPES["trendy-nail-spa"].tagline,
  robots: {
    index: false,
    follow: false,
  },
};

export default function TrendyNailPreviewPage() {
  return (
    <main>
      <PreviewNailSalon data={DEMO_PROTOTYPES["trendy-nail-spa"]} />
    </main>
  );
}
