/**
 * Site-wide, non-performance configuration.
 * Bracketed values are literal placeholders — replace them once confirmed,
 * never invent them.
 */
export const SITE = {
  name: "Aish Capital",
  /** Canonical origin. Change when the custom domain is live. */
  url: "https://aishweb-ezy-ai.vercel.app",
  telegramUrl: "https://t.me/ejjmili7",
  /**
   * Where Aish shows his work. Literal placeholders until the client confirms
   * each URL; resolveLink() falls back to the admin's Telegram meanwhile.
   */
  links: {
    publicChannel: "[PUBLIC_CHANNEL_URL]",
    tiktok: "https://www.tiktok.com/@aishselalusenyum",
    community: "[COMMUNITY_GROUP_URL]",
    privateRoom: "[PRIVATE_ROOM_URL]",
  },
  /**
   * Switches that are off until the client has what they need.
   * emailSignup: the weekly-email form and the /confirm route. Turn on only
   * when (1) a sending domain is verified with the email provider, (2) the
   * Supabase project has supabase/migrations applied and the send-confirmation
   * function wired as a database webhook, and (3) VITE_SUPABASE_URL and
   * VITE_SUPABASE_ANON_KEY are set on Vercel (Production + Preview) and the
   * site has been redeployed. Until then the Join chapter shows FollowBlock.
   */
  features: {
    emailSignup: false,
  },
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

/** A real URL, or the admin's Telegram when the value is still a placeholder. */
export function resolveLink(url: string): { href: string; isPlaceholder: boolean } {
  const isReal = /^https?:\/\//.test(url);
  return { href: isReal ? url : SITE.telegramUrl, isPlaceholder: !isReal };
}
