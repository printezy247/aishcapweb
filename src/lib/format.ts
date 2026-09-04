import type { Locale } from "@/config/site";

const intlLocale: Record<Locale, string> = { en: "en-MY", ms: "ms-MY" };

const nf = (locale: Locale, options: Intl.NumberFormatOptions) => new Intl.NumberFormat(intlLocale[locale], options);

export const formatMoney = (value: number, currency: string, locale: Locale) =>
  nf(locale, { style: "currency", currency, currencyDisplay: "narrowSymbol", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);

export const formatInt = (value: number, locale: Locale) => nf(locale, { maximumFractionDigits: 0 }).format(value);

export const formatPrice = (value: number, decimals: number, locale: Locale) =>
  nf(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);

export function formatPct(value: number, locale: Locale, signed = false): string {
  const formatted = formatPrice(Math.abs(value), 2, locale);
  if (signed && value > 0) return `+${formatted}%`;
  if (value < 0) return `−${formatted}%`;
  return `${formatted}%`;
}

export function formatDate(iso: string, locale: Locale): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat(intlLocale[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** HH:MM in Malaysia time for an ISO timestamp. */
export function formatTimeMY(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale[locale], {
    timeZone: "Asia/Kuala_Lumpur",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));
}
