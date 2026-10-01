"use client";

import React, { useState } from "react";

type ProjectCategory = "all" | "client-sites" | "enterprise";

interface PortfolioItem {
  id: string;
  name: string;
  category: "client-sites" | "enterprise";
  categoryLabel: string;
  image: string;
  accentColor: string;
  previewUrl: string;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "total-fence",
    name: "Total Fence of WNY",
    category: "client-sites",
    categoryLabel: "Fence Contractor & Cost Estimator",
    image: "/images/total-fence-desktop.webp",
    accentColor: "#3b82f6",
    previewUrl: "/preview/total-fence",
  },
  {
    id: "lucky-leaf",
    name: "Lucky Leaf Tattoo",
    category: "client-sites",
    categoryLabel: "Botanical Tattoo & Flash Claim",
    image: "/images/lucky-leaf-desktop.webp",
    accentColor: "#10b981",
    previewUrl: "/preview/lucky-leaf",
  },
  {
    id: "inktellectual",
    name: "Inktellectual Atelier",
    category: "client-sites",
    categoryLabel: "Custom Tattoo Collective",
    image: "/images/inktellectual-desktop.webp",
    accentColor: "#8b5cf6",
    previewUrl: "/preview/inktellectual",
  },
  {
    id: "fh-land-services",
    name: "F.H. Land Services",
    category: "client-sites",
    categoryLabel: "Excavation & Site Estimator",
    image: "/images/fh-land-desktop.webp",
    accentColor: "#f59e0b",
    previewUrl: "/preview/fh-land-services",
  },
  {
    id: "trendy-nail-spa",
    name: "Trendy Nail Spa",
    category: "client-sites",
    categoryLabel: "Boutique Nail Studio & Booking",
    image: "/images/trendy-desktop.webp",
    accentColor: "#ec4899",
    previewUrl: "/preview/trendy-nail-spa",
  },
  {
    id: "mia-bellas-hair-salon",
    name: "Mia Bella's Salon",
    category: "client-sites",
    categoryLabel: "Hair Boutique & Vivid Color",
    image: "/images/mia-bella-desktop.webp",
    accentColor: "#a855f7",
    previewUrl: "/preview/mia-bellas-hair-salon",
  },
  {
    id: "truly-organic-hair-studio",
    name: "Truly Organic Studio",
    category: "client-sites",
    categoryLabel: "Holistic Organic Hair Care",
    image: "/images/truly-organic-desktop.webp",
    accentColor: "#14b8a6",
    previewUrl: "/preview/truly-organic-hair-studio",
  },
  {
    id: "ruangsinggah",
    name: "RuangSinggah.id",
    category: "enterprise",
    categoryLabel: "Proptech Marketplace & Search",
    image: "/images/ruangsinggah-desktop.webp",
    accentColor: "#e11d48",
    previewUrl: "#portofolio",
  },
  {
    id: "ruangtani",
    name: "rUang Tani",
    category: "enterprise",
    categoryLabel: "Agri-Finance & Farm Yield ERP",
    image: "/images/ruang-tani-desktop.webp",
    accentColor: "#10b981",
    previewUrl: "#portofolio",
  },
  {
    id: "mentlife",
    name: "Mentlife",
    category: "enterprise",
    categoryLabel: "AI Financial Health Intelligence",
    image: "/images/mentlife-desktop.webp",
    accentColor: "#38bdf8",
    previewUrl: "#portofolio",
  },
];

export default function PortfolioShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all");

  const filteredProjects = PORTFOLIO_ITEMS.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="work" className="portfolio-minimal-section">
      <div className="container">
        {/* Minimal Compact Header */}
        <div className="portfolio-minimal-header">
          <div className="portfolio-minimal-title-row">
            <div className="portfolio-minimal-eyebrow">
              <span className="eyebrow-dot" />
              <span>Selected Work</span>
            </div>
            <h2 className="portfolio-minimal-title">
              Client Websites & Production Platforms
            </h2>
          </div>

          {/* Simple, Compact Filter Tabs */}
          <div className="portfolio-minimal-tabs" role="tablist" aria-label="Filter Portfolio">
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === "all"}
              className={`portfolio-minimal-tab ${selectedCategory === "all" ? "active" : ""}`}
              onClick={() => setSelectedCategory("all")}
            >
              All ({PORTFOLIO_ITEMS.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === "client-sites"}
              className={`portfolio-minimal-tab ${selectedCategory === "client-sites" ? "active" : ""}`}
              onClick={() => setSelectedCategory("client-sites")}
            >
              Client Websites (7)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === "enterprise"}
              className={`portfolio-minimal-tab ${selectedCategory === "enterprise" ? "active" : ""}`}
              onClick={() => setSelectedCategory("enterprise")}
            >
              Enterprise & AI (3)
            </button>
          </div>
        </div>

        {/* Minimalist Cards Grid (No descriptions, just clean title + category + preview) */}
        <div className="portfolio-minimal-grid">
          {filteredProjects.map((item) => (
            <a
              key={item.id}
              href={item.previewUrl}
              className="portfolio-minimal-card"
              style={{ "--card-accent": item.accentColor } as React.CSSProperties}
            >
              {/* Preview Thumbnail */}
              <div className="portfolio-minimal-thumb">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="portfolio-minimal-img"
                />
                <span className="portfolio-minimal-badge">
                  {item.categoryLabel}
                </span>
              </div>

              {/* Minimalist Info Row: Just Title + Launch Arrow */}
              <div className="portfolio-minimal-info">
                <h3 className="portfolio-minimal-name">{item.name}</h3>
                <span className="portfolio-minimal-arrow" aria-hidden="true">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
