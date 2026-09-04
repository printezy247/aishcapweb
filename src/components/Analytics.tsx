import { useEffect } from "react";

/**
 * Privacy-respecting pageview counter only. Loads nothing unless
 * VITE_PLAUSIBLE_DOMAIN is set. No cookies, no marketing pixels (PDPA).
 */
export function Analytics() {
  useEffect(() => {
    const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
    if (!domain || document.getElementById("plausible")) return;
    const s = document.createElement("script");
    s.id = "plausible";
    s.defer = true;
    s.setAttribute("data-domain", domain);
    s.src = "https://plausible.io/js/script.js";
    document.head.appendChild(s);
  }, []);
  return null;
}
