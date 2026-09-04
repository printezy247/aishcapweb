import type { ProseSection } from "@/components/Prose";

/** Whole minutes at 200 words per minute, never below 1. */
export function readingMinutes(sections: ProseSection[]): number {
  const words = sections.reduce((n, s) => n + [s.title, ...s.body].join(" ").split(/\s+/).filter(Boolean).length, 0);
  return Math.max(1, Math.round(words / 200));
}
