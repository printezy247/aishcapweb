import { useEffect } from "react";
import { Analytics as VercelAnalytics, track } from "@vercel/analytics/react";

/**
 * Privacy-respecting pageviews and a handful of click goals.
 * - Vercel Web Analytics: cookieless, same-origin script, no consent banner
 *   needed under PDPA. Enable it once in the Vercel dashboard (Analytics tab).
 * - Optional Plausible (VITE_PLAUSIBLE_DOMAIN), also cookieless.
 * No marketing pixels.
 */
export function Analytics() {
  useEffect(() => {
    const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
    if (domain && !document.getElementById("plausible")) {
      const s = document.createElement("script");
      s.id = "plausible";
      s.defer = true;
      s.setAttribute("data-domain", domain);
      s.src = "https://plausible.io/js/script.js";
      document.head.appendChild(s);
    }

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
