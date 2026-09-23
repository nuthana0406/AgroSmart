import React, { createContext, useState, useContext, useCallback } from "react";
import { translate } from "@/lib/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem("agrosmart_lang") || "en");

  const setLang = useCallback((code) => {
    setLangState(code);
    localStorage.setItem("agrosmart_lang", code);
  }, []);

  const t = useCallback((key) => translate(lang, key), [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}