import type { Locale } from "@/config/site";

/**
 * Learn hub posts.
 *
 * This list is intentionally empty at launch. Do not add placeholder posts.
 * When a real post exists, add it here (newest first) and the Learn page and
 * home preview will pick it up automatically. Excerpts should be ~15 words.
 */
export interface Post {
  slug: string;
  /** ISO date YYYY-MM-DD */
  date: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  /** Optional real image. Never a placeholder. */
  image?: { src: string; alt: Record<Locale, string> };
  /** External URL (e.g. a Telegram post) or an internal route. */
  href: string;
}

export const POSTS: Post[] = [];
