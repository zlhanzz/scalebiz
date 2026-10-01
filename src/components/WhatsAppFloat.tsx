import React from "react";

export default function WhatsAppFloat() {
  const whatsappUrl =
    "https://wa.me/6281527080656?text=" +
    encodeURIComponent("Hello Scalebiz, I would like to inquire about a custom website and booking system for my business.");

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float-btn"
      id="cta-floating-whatsapp"
      title="Chat via WhatsApp"
    >
      <span className="wa-pulse" />
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
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
      <span>Chat on WhatsApp</span>
    </a>
  );
}
