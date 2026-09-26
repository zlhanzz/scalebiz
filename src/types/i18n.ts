export type Language = "id" | "en";

export interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  isAutoDetected: boolean;
}
