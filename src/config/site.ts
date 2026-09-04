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
  company: {
    legalName: "[COMPANY LEGAL NAME]",
    registrationNo: "[SSM REGISTRATION NO.]",
    address: "[REGISTERED ADDRESS], Malaysia",
    email: "[CONTACT EMAIL]",
  },
  /** Portrait: interior / city-window / laptop photograph of Aish. No cars. */
  portrait: {
    src: "/images/aish-window.jpg",
  },
  logo: {
    src: "/images/logo.png",
  },
} as const;

export const LOCALES = ["en", "ms"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
