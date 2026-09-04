import { useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Locale } from "@/config/site";
import { applyHtmlLang, isLocale, storeLocale, swapLocaleInPath } from "@/lib/locale";

/** Current locale from the URL, plus a helper to build locale-prefixed paths. */
export function useLocale() {
  const { locale: param } = useParams();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const locale: Locale = isLocale(param) ? param : (i18n.language as Locale);

  const href = useCallback((path: string) => `/${locale}${path === "/" ? "" : path}`, [locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      storeLocale(next);
      applyHtmlLang(next);
      void i18n.changeLanguage(next);
      navigate(swapLocaleInPath(location.pathname, next) + location.search + location.hash, {
        replace: true,
      });
    },
    [i18n, navigate, location.pathname, location.search, location.hash],
  );

  return { locale, href, setLocale };
}
