/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Locale } from "../domain/types";
import { de, type TranslationKey } from "./de";
import { en } from "./en";
import { fr } from "./fr";
import { es } from "./es";
import { nl } from "./nl";

type Params = Record<string, string | number>;

const dictionaries: Record<Locale, Partial<Record<TranslationKey, string>>> = { de, en, fr, es, nl };
const storageKey = "interview-creator-locale";

function detectLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (stored && ["de", "en", "fr", "es", "nl"].includes(stored)) return stored as Locale;
  } catch {}
  const browserLang = window.navigator.language.toLowerCase().substring(0, 2);
  if (["de", "en", "fr", "es", "nl"].includes(browserLang)) return browserLang as Locale;
  return "de";
}

function translate(locale: Locale, key: TranslationKey, params?: Params) {
  let value = dictionaries[locale][key] ?? de[key];
  if (params) {
    Object.entries(params).forEach(([name, replacement]) => {
      value = value.replaceAll(`{${name}}`, String(replacement));
    });
  }
  return value;
}

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, params?: Params) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(detectLocale);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, locale);
    } catch {}
    document.documentElement.lang = locale;
    document.title = translate(locale, "app.title");
    document.querySelector('meta[name="description"]')?.setAttribute("content", translate(locale, "app.metaDescription"));
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    setLocale,
    t: (key: TranslationKey, params?: Params) => translate(locale, key, params),
  }), [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useTranslation() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("LocaleProvider is missing.");
  return context;
}
