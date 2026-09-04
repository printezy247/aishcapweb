/**
 * Site-wide, non-performance configuration.
 * Bracketed values are literal placeholders — replace them once confirmed,
 * never invent them.
 */
export const SITE = {
  name: "Aish Capital",
  telegramUrl: "https://t.me/ejjmili7",
  /** Broker name. Leave the literal placeholder until the broker is confirmed. */
  brokerName: "[BROKER]",
  /** Referral link. Leave the placeholder until the broker is confirmed. */
  brokerReferralUrl: "[BROKER_REFERRAL_URL]",
  /**
   * Photographs, generated from the masters in /brand by
   * scripts/prepare-brand-assets.mjs. Interior / city-window / laptop only —
   * the car photographs stay in /brand/reference and are never deployed.
   */
  portrait: {
    src: "/images/aish-portrait-800.jpg",
    srcSmall: "/images/aish-portrait-400.jpg",
    width: 800,
    height: 800,
  },
  laptop: {
    src: "/images/aish-laptop-900.jpg",
    srcSmall: "/images/aish-laptop-450.jpg",
    width: 900,
    height: 1125,
  },
  logo: {
    src: "/images/logo.png",
  },
} as const;

export const LOCALES = ["en", "ms"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
