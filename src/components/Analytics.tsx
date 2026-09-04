import { useEffect } from "react";
import { Analytics as VercelAnalytics, track } from "@vercel/analytics/react";

/**
 * Privacy-respecting pageviews and a handful of click goals.
 * - Vercel Web Analytics: cookieless, same-origin script, no consent banner
 *   needed under PDPA. Enable it once in the Vercel dashboard (Analytics tab).
 * No marketing pixels.
 */
export function Analytics() {
  useEffect(() => {
    // Goals: any element with data-track="<event>" (+ optional data-location).
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const name = el.dataset.track;
      if (!name) return;
      try {
        track(name, { location: el.dataset.location ?? "unknown", locale: document.documentElement.lang });
      } catch {
        /* analytics must never break the page */
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return <VercelAnalytics />;
}
