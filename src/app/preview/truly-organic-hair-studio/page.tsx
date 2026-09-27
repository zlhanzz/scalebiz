import React from "react";
import type { Metadata } from "next";
import { TRULY_ORGANIC_DATA } from "@/data/trulyOrganicData";
import PreviewTrulyOrganic from "@/components/preview/PreviewTrulyOrganic";

export const metadata: Metadata = {
  title: `${TRULY_ORGANIC_DATA.businessName} • Lockport, NY | Boutique Salon & Private Suites`,
  description: `${TRULY_ORGANIC_DATA.tagline}. A collaborative sanctuary of 11 independent beauty artisans committed to clean formulations, low-tox hair wellness, and customized appointments on Davison Rd.`,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `${TRULY_ORGANIC_DATA.businessName} • Lockport, NY | Boutique Salon & Private Suites`,
    description: `${TRULY_ORGANIC_DATA.tagline}. Collaborative sanctuary of 11 independent beauty artisans on Davison Rd specializing in clean formulations, lived-in blonding, and private suite care.`,
    url: "https://scalebiz.web.id/preview/truly-organic-hair-studio/",
    siteName: TRULY_ORGANIC_DATA.businessName,
    images: [
      {
        url: "https://scalebiz.web.id/images/demo/truly-organic/hero.jpg",
        width: 1200,
        height: 630,
        alt: `${TRULY_ORGANIC_DATA.businessName} - Lockport, NY`,
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TRULY_ORGANIC_DATA.businessName} • Lockport, NY | Boutique Salon & Private Suites`,
    description: `${TRULY_ORGANIC_DATA.tagline}. Collaborative sanctuary of 11 independent beauty artisans on Davison Rd specializing in clean formulations and private suite care.`,
    images: ["https://scalebiz.web.id/images/demo/truly-organic/hero.jpg"],
  },
};

export default function TrulyOrganicPreviewPage() {
  return (
    <main>
      <PreviewTrulyOrganic />
    </main>
  );
}
