import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en.json";
import ms from "@/locales/ms.json";
import { DEFAULT_LOCALE } from "@/config/site";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ms: { translation: ms },
  },
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: ["en", "ms"],
  interpolation: { escapeValue: false },
  returnObjects: true,
});

export default i18n;
