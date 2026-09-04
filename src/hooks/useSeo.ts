import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LOCALES } from "@/config/site";
import { SITE } from "@/config/site";
import { swapLocaleInPath } from "@/lib/locale";

function upsertLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    if (hreflang) el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
}

function upsertMeta(property: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.content = content;
}

/** Canonical, hreflang alternates and og:url for the current route. */
export function useSeo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const clean = pathname.replace(/\/$/, "") || "/";
    upsertLink("canonical", SITE.url + clean);
    upsertMeta("og:url", SITE.url + clean);
    for (const l of LOCALES) upsertLink("alternate", SITE.url + swapLocaleInPath(clean, l), l);
    upsertLink("alternate", SITE.url + swapLocaleInPath(clean, "ms"), "x-default");
  }, [pathname]);
}
