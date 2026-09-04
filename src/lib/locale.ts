import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/config/site";

const STORAGE_KEY = "aish.locale";

export function isLocale(value: string | undefined): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function readStoredLocale(): Locale | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isLocale(stored ?? undefined) ? (stored as Locale) : null;
  } catch {
    return null;
  }
}

export function storeLocale(locale: Locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* private mode or storage blocked — ignore */
  }
}

/**
 * Default locale for a first visit.
 *
 * Order: stored preference → Accept-Language (ms / ms-MY) → Malaysian
 * location. A static SPA cannot see the visitor's IP; the browser's
 * time zone is the closest privacy-respecting proxy. If the site is served
 * behind a CDN that exposes a country header, resolve it there and set
 * `window.__COUNTRY` before the app boots.
 */
export function detectLocale(): Locale {
  const stored = readStoredLocale();
  if (stored) return stored;

  const country = (window as unknown as { __COUNTRY?: string }).__COUNTRY;
  if (country && country.toUpperCase() === "MY") return "ms";

  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  if (languages.some((l) => l && l.toLowerCase().startsWith("ms"))) return "ms";

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz === "Asia/Kuala_Lumpur" || tz === "Asia/Kuching") return "ms";
  } catch {
    /* ignore */
  }
  return DEFAULT_LOCALE;
}

export function applyHtmlLang(locale: Locale) {
  document.documentElement.lang = locale;
}

export function swapLocaleInPath(pathname: string, locale: Locale): string {
  const parts = pathname.split("/");
  // parts[0] === "" because pathname starts with "/"
  if (isLocale(parts[1])) {
    parts[1] = locale;
    return parts.join("/") || `/${locale}`;
  }
  return `/${locale}${pathname === "/" ? "" : pathname}`;
}
