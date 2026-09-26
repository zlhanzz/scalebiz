"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { TRANSLATIONS } from "@/data/translations";

export default function Footer() {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang].footer;

  return (
    <footer className="footer-section footer-minimal">
      <div className="container">
        <div className="footer-bottom">
          <div>
            <strong>SCALEBIZ</strong> — {t.studioDesc.replace("SCALEBIZ — ", "")}
          </div>
          <div>
            {t.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}
