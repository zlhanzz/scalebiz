"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, LanguageContextType } from "@/types/i18n";

const LanguageContext = createContext<LanguageContextType>({
  lang: "id",
  setLang: () => {},
  isAutoDetected: false,
});

const GEO_STORAGE_KEY = "scalebiz_geo_country";
const MANUAL_LANG_KEY = "scalebiz_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Inisialisasi cepat dari manual preference atau cached geo di session
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === "undefined") return "id";
    try {
      const saved = localStorage.getItem(MANUAL_LANG_KEY);
      if (saved === "id" || saved === "en") return saved;

      const cachedCountry = sessionStorage.getItem(GEO_STORAGE_KEY);
      if (cachedCountry) {
        return cachedCountry.toUpperCase() === "ID" ? "id" : "en";
      }
    } catch {
      // Ignore storage errors
    }
    return "id";
  });

  const [isAutoDetected, setIsAutoDetected] = useState(false);

  useEffect(() => {
    try {
      // 1. Jika pengguna pernah memilih bahasa manual secara eksplisit, hormati pilihan tersebut
      const manualLang = localStorage.getItem(MANUAL_LANG_KEY);
      if (manualLang === "id" || manualLang === "en") {
        setLangState(manualLang);
        document.documentElement.lang = manualLang;
        return;
      }

      // 2. Jika negara asal sudah pernah terselesaikan di tab ini, gunakan langsung (0 ms)
      const cachedCountry = sessionStorage.getItem(GEO_STORAGE_KEY);
      if (cachedCountry) {
        const cachedLang: Language = cachedCountry.toUpperCase() === "ID" ? "id" : "en";
        setLangState(cachedLang);
        document.documentElement.lang = cachedLang;
        setIsAutoDetected(true);
        return;
      }

      // 3. Real-Time IP Geolocation (Mendeteksi VPN / Negara Riil Pengunjung)
      // Menggunakan triple-redundant edge lookup: api.country.is, get.geojs.io, dan ipwho.is
      const detectCountryByIp = async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        let countryCode: string | null = null;

        try {
          const fetchProvider = async (url: string, key: string): Promise<string> => {
            const res = await fetch(url, { signal: controller.signal, cache: "no-store" });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            const val = data?.[key];
            if (typeof val === "string" && val.trim().length === 2) {
              return val.trim().toUpperCase();
            }
            throw new Error("Invalid country format");
          };

          // Balapan 3 endpoint edge independen: yang tercepat merespons langsung digunakan
          countryCode = await Promise.any([
            fetchProvider("https://api.country.is", "country"),
            fetchProvider("https://get.geojs.io/v1/ip/country.json", "country"),
            fetchProvider("https://ipwho.is/", "country_code"),
          ]);
        } catch {
          // Semua provider IP timeout atau offline
          countryCode = null;
        } finally {
          clearTimeout(timeoutId);
        }

        // Jika IP negara berhasil diidentifikasi
        if (countryCode) {
          try {
            sessionStorage.setItem(GEO_STORAGE_KEY, countryCode);
          } catch {
            // Ignore storage errors
          }

          // Aturan: Jika dari Indonesia -> "id", jika dari luar Indonesia (atau via VPN) -> "en"
          const targetLang: Language = countryCode === "ID" ? "id" : "en";
          console.info(`[Scalebiz i18n] IP Country: ${countryCode} -> Language: ${targetLang.toUpperCase()}`);
          setLangState(targetLang);
          document.documentElement.lang = targetLang;
          setIsAutoDetected(true);
          return;
        }

        // 4. Fallback jika jaringan IP lookup tidak dapat dijangkau (misal mode offline)
        const browserLanguages = navigator.languages || [navigator.language];
        const isIndonesianLocale = browserLanguages.some((l) =>
          /^(id|in|ms)/i.test(l)
        );

        let isIndonesianTimeZone = false;
        try {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
          isIndonesianTimeZone = /jakarta|pontianak|makassar|jayapura/i.test(tz);
        } catch {
          // Ignore
        }

        const fallbackLang: Language =
          isIndonesianLocale || isIndonesianTimeZone ? "id" : "en";

        setLangState(fallbackLang);
        document.documentElement.lang = fallbackLang;
        setIsAutoDetected(true);
      };

      detectCountryByIp();
    } catch (e) {
      console.warn("[Scalebiz i18n] Error during IP location detection:", e);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    document.documentElement.lang = newLang;
    try {
      localStorage.setItem(MANUAL_LANG_KEY, newLang);
    } catch {
      // Ignore if localStorage unavailable
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, isAutoDetected }}>
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
