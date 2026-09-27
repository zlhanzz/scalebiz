import React from "react";
import type { Metadata } from "next";
import { DEMO_PROTOTYPES } from "@/data/demoPrototypes";
import PreviewNailSalon from "@/components/preview/PreviewNailSalon";

export const metadata: Metadata = {
  title: "Trendy Nail Spa • Lockport, NY | Luxury Nails & Organic Spa Care",
  description: `${DEMO_PROTOTYPES["trendy-nail-spa"].tagline}. Russian manicure, luxury gel extensions, custom nail art, and organic spa pedicures on S Transit Rd, Lockport, NY.`,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Trendy Nail Spa • Lockport, NY | Luxury Nails & Organic Spa Care",
    description: `${DEMO_PROTOTYPES["trendy-nail-spa"].tagline}. Russian manicure, luxury gel extensions, custom nail art, and organic spa pedicures on S Transit Rd.`,
    url: "https://scalebiz.web.id/preview/trendy-nail-spa/",
    siteName: "Trendy Nail Spa",
    images: [
      {
        url: "https://scalebiz.web.id/images/demo/trendy/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Trendy Nail Spa - Lockport, NY",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trendy Nail Spa • Lockport, NY | Luxury Nails & Organic Spa Care",
    description: `${DEMO_PROTOTYPES["trendy-nail-spa"].tagline}. Premier nail art and spa pedicures on S Transit Rd.`,
    images: ["https://scalebiz.web.id/images/demo/trendy/hero.jpg"],
  },
};

export default function TrendyNailPreviewPage() {
  return (
    <main>
      <PreviewNailSalon data={DEMO_PROTOTYPES["trendy-nail-spa"]} />
    </main>
  );
}
