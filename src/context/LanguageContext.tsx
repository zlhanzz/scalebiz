"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, LanguageContextType } from "@/types/i18n";

const LanguageContext = createContext<LanguageContextType>({
  lang: "id",
  setLang: () => {},
  isAutoDetected: false,
  detectedCountry: null,
});

const GEO_STORAGE_KEY = "scalebiz_geo_country";
const MANUAL_LANG_KEY = "scalebiz_lang";
const LAST_DETECTED_COUNTRY_KEY = "scalebiz_last_country";

const TITLES: Record<Language, string> = {
  id: "Scalebiz | Scaleup dan Optimalisasi Bisnis Kamu",
  en: "Scalebiz | Scale Up and Optimize Your Business",
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Inisialisasi cepat: URL Override > Session Geo > LocalStorage > Default 'id'
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === "undefined") return "id";
    try {
      // 1. Dukungan URL param langsung (misal: ?lang=en atau ?geo=US atau ?country=SG)
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get("lang")?.toLowerCase();
      if (urlLang === "id" || urlLang === "en") return urlLang;

      const urlGeo = params.get("geo") || params.get("country");
      if (urlGeo) {
        return urlGeo.toUpperCase() === "ID" ? "id" : "en";
      }

      // 2. Cache negara sesi aktif
      const cachedCountry = sessionStorage.getItem(GEO_STORAGE_KEY);
      if (cachedCountry) {
        return cachedCountry.toUpperCase() === "ID" ? "id" : "en";
      }

      // 3. Preferensi manual sebelumnya
      const saved = localStorage.getItem(MANUAL_LANG_KEY);
      if (saved === "id" || saved === "en") return saved;
    } catch {
      // Ignore storage errors
    }
    return "id";
  });

  const [isAutoDetected, setIsAutoDetected] = useState(false);
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Step A: Priority 1 - URL Query Parameters (?lang=en, ?geo=US, ?country=SG)
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get("lang")?.toLowerCase();
      if (urlLang === "id" || urlLang === "en") {
        setLangState(urlLang);
        document.documentElement.lang = urlLang;
        document.title = TITLES[urlLang];
        setIsAutoDetected(false);
        return;
      }

      const urlGeo = (params.get("geo") || params.get("country"))?.toUpperCase();
      if (urlGeo && urlGeo.length === 2) {
        const targetLang: Language = urlGeo === "ID" ? "id" : "en";
        setLangState(targetLang);
        setDetectedCountry(urlGeo);
        document.documentElement.lang = targetLang;
        document.title = TITLES[targetLang];
        setIsAutoDetected(true);
        try {
          sessionStorage.setItem(GEO_STORAGE_KEY, urlGeo);
        } catch {
          // Ignore
        }
        return;
      }

      // Step B: Real-Time Multi-Tier GeoIP Detection
      // Cloudflare Native Edge (/cdn-cgi/trace) + Edge Redundant Fallback Race
      const detectCountryByIp = async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        let countryCode: string | null = null;

        try {
          // Resolver 1: Cloudflare Native Edge Trace (Same-Origin, sub-15ms, zero-CORS)
          const fetchCloudflareTrace = async (url: string): Promise<string> => {
            const res = await fetch(url, { signal: controller.signal, cache: "no-store" });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const text = await res.text();
            const match = text.match(/^loc=([A-Z]{2})$/m);
            if (match && match[1]) {
              return match[1];
            }
            throw new Error("No loc in Cloudflare trace");
          };

          // Resolver 2: Edge JSON API Provider
          const fetchJsonProvider = async (url: string, key: string): Promise<string> => {
            const res = await fetch(url, { signal: controller.signal, cache: "no-store" });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            const val = data?.[key];
            if (typeof val === "string" && val.trim().length === 2) {
              return val.trim().toUpperCase();
            }
            throw new Error("Invalid country format");
          };

          // Balapan paralel lintas edge resolvers:
          // 1. Same-Origin Cloudflare /cdn-cgi/trace (pada domain live scalebiz.web.id)
          // 2. Global Cloudflare trace (fallback)
          // 3. api.country.is (fast geo)
          // 4. get.geojs.io (fast geo)
          countryCode = await Promise.any([
            fetchCloudflareTrace("/cdn-cgi/trace"),
            fetchCloudflareTrace("https://cloudflare.com/cdn-cgi/trace"),
            fetchJsonProvider("https://api.country.is", "country"),
            fetchJsonProvider("https://get.geojs.io/v1/ip/country.json", "country"),
          ]);
        } catch {
          countryCode = null;
        } finally {
          clearTimeout(timeoutId);
        }

        // Tangani hasil deteksi negara dari IP
        if (countryCode) {
          setDetectedCountry(countryCode);

          // Cek apakah IP/Negara pengunjung berubah dibandingkan deteksi sebelumnya (misal menyalakan/mematikan VPN)
          let lastCountry: string | null = null;
          try {
            lastCountry = sessionStorage.getItem(LAST_DETECTED_COUNTRY_KEY);
            sessionStorage.setItem(LAST_DETECTED_COUNTRY_KEY, countryCode);
            sessionStorage.setItem(GEO_STORAGE_KEY, countryCode);
          } catch {
            // Ignore storage errors
          }

          // Jika pengunjung berpindah negara (misal mengaktifkan VPN luar negeri),
          // reset preferensi manual lama agar bahasa lokasi baru langsung aktif
          if (lastCountry && lastCountry !== countryCode) {
            try {
              localStorage.removeItem(MANUAL_LANG_KEY);
            } catch {
              // Ignore
            }
          }

          // Jika pengguna pernah memilih manual di negara yang SAMA, hormati pilihannya
          const manualLang = localStorage.getItem(MANUAL_LANG_KEY);
          if (manualLang === "id" || manualLang === "en") {
            setLangState(manualLang);
            document.documentElement.lang = manualLang;
            document.title = TITLES[manualLang];
            return;
          }

          // Aturan Baku: IP Indonesia -> "id" | IP Luar Indonesia (atau VPN luar) -> "en"
          const targetLang: Language = countryCode === "ID" ? "id" : "en";
          console.info(
            `[Scalebiz GeoIP] 🌍 Detected IP Country: ${countryCode} -> Language: ${targetLang.toUpperCase()} (${countryCode === "ID" ? "Indonesia" : "International"})`
          );
          setLangState(targetLang);
          document.documentElement.lang = targetLang;
          document.title = TITLES[targetLang];
          setIsAutoDetected(true);
          return;
        }

        // Step C: Fallback jika offline atau seluruh endpoint lookup diblokir
        const manualLang = localStorage.getItem(MANUAL_LANG_KEY);
        if (manualLang === "id" || manualLang === "en") {
          setLangState(manualLang);
          document.documentElement.lang = manualLang;
          document.title = TITLES[manualLang];
          return;
        }

        const browserLanguages = navigator.languages || [navigator.language];
        const isIndonesianLocale = browserLanguages.some((l) => /^(id|in|ms)/i.test(l));

        let isIndonesianTimeZone = false;
        try {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
          isIndonesianTimeZone = /jakarta|pontianak|makassar|jayapura/i.test(tz);
        } catch {
          // Ignore
        }

        const fallbackLang: Language = isIndonesianLocale || isIndonesianTimeZone ? "id" : "en";
        console.info(`[Scalebiz GeoIP] 🌐 Offline Fallback -> Language: ${fallbackLang.toUpperCase()}`);
        setLangState(fallbackLang);
        document.documentElement.lang = fallbackLang;
        document.title = TITLES[fallbackLang];
        setIsAutoDetected(true);
      };

      detectCountryByIp();
    } catch (e) {
      console.warn("[Scalebiz GeoIP] Error during location detection:", e);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    document.documentElement.lang = newLang;
    document.title = TITLES[newLang];
    try {
      localStorage.setItem(MANUAL_LANG_KEY, newLang);
    } catch {
      // Ignore if localStorage unavailable
    }
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
