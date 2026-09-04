import type { Locale } from "@/config/site";

/**
 * Member quotes. EMPTY UNTIL REAL, CONSENTED QUOTES EXIST.
 *
 * Do not add a quote unless ALL of the following are true:
 *   1. A real member wrote it.
 *   2. They gave written consent to publish it, and that consent is saved
 *      (outside the repo — see docs/testimonial-collection.md).
 *   3. It contains no profit figure, pip count, percentage, or currency amount.
 *   4. It makes no claim about future results.
 *   5. It is attributed to first name + state only.
 *
 * A quote that fails any one of these is not publishable. Do not "clean up"
 * a failing quote to make it pass — go back to the member and ask for a
 * different one.
 *
 * The Testimonials section renders nothing until this list has at least two
 * entries.
 */
export interface Testimonial {
  quote: Record<Locale, string>;
  firstName: string;
  /** e.g. "Selangor" */
  state: string;
  /** YYYY-MM */
  memberSince: string;
  /** Literal true — no quote without it. */
  consentOnFile: true;
}

export const TESTIMONIALS: Testimonial[] = [];
