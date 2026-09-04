import type { Locale } from "@/config/site";

/**
 * Member quotes.
 *
 * Publishing conditions (from the client's brief):
 *   1. A real member wrote it.
 *   2. They gave written consent to publish it, and that consent is saved
 *      outside the repo (see docs/testimonial-collection.md).
 *   3. It contains no profit figure, pip count, percentage, or currency amount.
 *   4. It makes no claim about future results.
 *
 * Attribution: the brief asked for first name + Malaysian state. On
 * 2026-09-04 the client chose to publish the first four quotes as supplied
 * (initial surname + trader type, five-star rating, English only), after
 * being advised of the risk. `name` and `role` reflect that decision.
 *
 * Do not "clean up" a quote to make it pass — go back to the member and ask
 * for a different one. The section renders nothing below two entries.
 */
export interface Testimonial {
  quote: Record<Locale, string>;
  /** As the member agreed to be shown, e.g. "Arjun K." */
  name: string;
  /** Short descriptor the member gave, e.g. "Swing trader" */
  role: string;
  /** 1–5, as given by the member. */
  rating: 1 | 2 | 3 | 4 | 5;
  /** YYYY-MM, when known. */
  memberSince?: string;
  /** Literal true — no quote without it. Consent screenshots live outside the repo. */
  consentOnFile: true;
}

// Supplied by the client on 2026-09-04 with consent confirmed by the client.
// Quotes are shown in the members' own words (English) in both locales.
const asGiven = (text: string): Record<Locale, string> => ({ en: text, ms: text });

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: asGiven("The trade alerts are clear and timely. It saves me from constantly watching the market."),
    name: "Arjun K.",
    role: "Swing trader",
    rating: 5,
    consentOnFile: true,
  },
  {
    quote: asGiven("Useful live trading analysis. I finally feel more confident taking trades."),
    name: "Maya S.",
    role: "Forex trader",
    rating: 5,
    consentOnFile: true,
  },
  {
    quote: asGiven("The community help me stay disciplined instead of chasing every market move."),
    name: "Daniel P.",
    role: "Day trader",
    rating: 5,
    consentOnFile: true,
  },
  {
    quote: asGiven("Great for quick market updates. The alerts make it much easier to spot good opportunities."),
    name: "Sara M.",
    role: "Crypto trader",
    rating: 5,
    consentOnFile: true,
  },
];
