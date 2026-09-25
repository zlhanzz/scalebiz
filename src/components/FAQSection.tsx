"use client";

import React, { useState } from "react";
import { FaqCategoryId } from "@/types/faq";
import { FAQ_CATEGORIES, FAQ_ITEMS } from "@/data/faqData";

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<FaqCategoryId>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(["services-overview"]));

  const whatsappGeneralUrl =
    "https://wa.me/6281527080656?text=Halo%20Scalebiz,%20saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20digital%20bisnis%20saya.";

  // Filter items based on active category and search query
  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === "" ||
      item.question.toLowerCase().includes(query) ||
      item.answer.toLowerCase().includes(query) ||
      item.categoryLabel.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (catId: FaqCategoryId) => {
    setActiveCategory(catId);
    // Reset open state when category changes to keep view tidy
    setOpenIds(new Set());
  };

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Generate JSON-LD Schema for SEO FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="faq-section section-padding">
      {/* Schema.org FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        suppressHydrationWarning
      />

      <div className="container">
        {/* Main 2-Column Responsive Layout */}
        <div className="faq-layout-grid">
          {/* Left Column: Sticky Header & Guidance Card */}
          <div className="faq-left-column">
            <div className="faq-sticky-box">
              <div className="solutions-eyebrow-badge">
                <span className="eyebrow-dot" />
                <span>FAQ</span>
              </div>

              <h2 className="faq-main-heading">
                Pertanyaan yang Sering Ditanyakan
              </h2>

              <p className="faq-subheading">
                Masih ragu sebelum memulai? Berikut beberapa hal yang paling sering ditanyakan calon klien Scalebiz.
              </p>

              {/* Live Search Input */}
              <div className="faq-search-wrapper">
                <svg
                  className="faq-search-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  className="faq-search-input"
                  placeholder="Cari pertanyaan... (cth: biaya, custom, sistem)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Cari pertanyaan FAQ"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="faq-search-clear-btn"
                    onClick={() => setSearchQuery("")}
                    aria-label="Hapus kata kunci pencarian"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Quick Guidance Box */}
              <div className="faq-quick-guide-card">
                <div className="quick-guide-icon">💡</div>
                <div className="quick-guide-content">
                  <h4>Belum Tahu Mulai dari Mana?</h4>
                  <p>
                    Ikuti panduan diagnosis bisnis 2 menit untuk menemukan jenis sistem digital yang tepat bagi skala usaha Anda.
                  </p>
                  <a href="#diagnosa-sistem" className="quick-guide-link">
                    <span>Mulai Business Diagnosis</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Category Filter & Accordion List */}
          <div className="faq-right-column">
            {/* Category Filter Pills */}
            <div className="faq-categories-wrapper" role="tablist" aria-label="Filter Kategori FAQ">
              {FAQ_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                // Count items in category
                const count =
                  cat.id === "all"
                    ? FAQ_ITEMS.length
                    : FAQ_ITEMS.filter((i) => i.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`faq-cat-pill ${isActive ? "active" : ""}`}
                    onClick={() => handleCategoryChange(cat.id)}
                  >
                    <span>{cat.label}</span>
                    <span className="faq-cat-count">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Accordion List */}
            <div className="faq-accordion-list" role="region" aria-label="Daftar Tanya Jawab">
              {filteredFaqs.length === 0 ? (
                <div className="faq-empty-state">
                  <div className="empty-state-icon">🔍</div>
                  <h4>Pertanyaan Tidak Ditemukan</h4>
                  <p>
                    Tidak ada pertanyaan yang sesuai dengan kata kunci &quot;{searchQuery}&quot;.
                  </p>
                  <button
                    type="button"
                    className="btn-reset-faq"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("all");
                    }}
                  >
                    Tampilkan Semua Pertanyaan
                  </button>
                </div>
              ) : (
                filteredFaqs.map((faq, index) => {
                  const isOpen = openIds.has(faq.id);
                  const formattedNumber = String(faq.priority).padStart(2, "0");
                  const buttonId = `faq-btn-${faq.id}`;
                  const contentId = `faq-content-${faq.id}`;

                  return (
                    <div
                      key={faq.id}
                      className={`faq-accordion-item ${isOpen ? "is-open" : ""}`}
                    >
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={contentId}
                        className="faq-accordion-trigger"
                        onClick={() => toggleItem(faq.id)}
                      >
                        <div className="faq-trigger-header">
                          <span className="faq-item-number">{formattedNumber}</span>
                          <span className="faq-item-question">{faq.question}</span>
                        </div>
                        <div className="faq-trigger-icon" aria-hidden="true">
                          <span className="icon-bar horizontal" />
                          <span className="icon-bar vertical" />
                        </div>
                      </button>

                      <div
                        id={contentId}
                        role="region"
                        aria-labelledby={buttonId}
                        className={`faq-accordion-body ${isOpen ? "expanded" : ""}`}
                      >
                        <div className="faq-accordion-inner">
                          <p className="faq-item-answer">{faq.answer}</p>

                          {/* Mini Process Visualization if available */}
                          {faq.processSteps && faq.processSteps.length > 0 && (
                            <div className="faq-process-box">
                              <span className="process-box-title">Alur Kerja 7 Langkah Pengerjaan:</span>
                              <div className="process-steps-grid">
                                {faq.processSteps.map((step, sIdx) => (
                                  <div key={sIdx} className="process-step-pill">
                                    <span className="process-step-num">{step.number}</span>
                                    <div className="process-step-info">
                                      <strong>{step.title}</strong>
                                      {step.desc && <span>{step.desc}</span>}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Inline Question CTA if available */}
                          {faq.cta && (
                            <div className="faq-inline-cta-wrap">
                              <a
                                href={faq.cta.href}
                                target={faq.cta.isExternal ? "_blank" : undefined}
                                rel={faq.cta.isExternal ? "noopener noreferrer" : undefined}
                                className="faq-inline-cta-link"
                              >
                                <span>{faq.cta.label}</span>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Bottom CTA Block (Section 15) */}
        <div className="faq-bottom-cta-banner">
          <div className="faq-cta-glow" aria-hidden="true" />
          <div className="faq-cta-content">
            <h3 className="faq-cta-title">Masih belum menemukan jawabannya?</h3>
            <p className="faq-cta-desc">
              Setiap bisnis memiliki kebutuhan yang berbeda. Ceritakan kebutuhan Anda dan kami bantu menemukan solusi yang sesuai.
            </p>
            <div className="faq-cta-actions">
              <a href="#diagnosa-sistem" className="btn-faq-primary">
                <span>Mulai Business Diagnosis</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>

              <a
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-faq-whatsapp"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span>Chat dengan Scalebiz</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
