import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import commonEn from "./locales/en/common.json";
import commonFr from "./locales/fr/common.json";
import commonEs from "./locales/es/common.json";
import commonHi from "./locales/hi/common.json";

// Configure the resources
export const resources = {
  en: {
    common: commonEn,
  },
  fr: {
    common: commonFr,
  },
  es: {
    common: commonEs,
  },
  hi: {
    common: commonHi,
  },
} as const;

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true, // Set to false in production
    lng: "en", // Set default language to English
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
    ns: ["common"], // Default namespaces
    defaultNS: "common",
  });

export default i18n;
