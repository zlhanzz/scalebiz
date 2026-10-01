"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, LanguageContextType } from "@/types/i18n";

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  isAutoDetected: false,
  detectedCountry: null,
});

const TITLES: Record<Language, string> = {
  id: "Scalebiz | High-Converting Websites & Systems for Local Businesses",
  en: "Scalebiz | High-Converting Websites & Systems for Local Businesses",
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");
  const [isAutoDetected] = useState(false);
  const [detectedCountry] = useState<string | null>("US");

  useEffect(() => {
    document.documentElement.lang = "en";
    const isPreview =
      typeof window !== "undefined" && window.location.pathname.includes("/preview/");
    if (!isPreview) {
      document.title = TITLES.en;
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    document.documentElement.lang = newLang;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, isAutoDetected, detectedCountry }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

