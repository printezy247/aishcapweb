import { useState } from "react";
import { SITE } from "@/config/site";

/**
 * Renders the brand logo from /public/images/logo.png when present.
 * Falls back to a text wordmark so the header never shows a broken image.
 */
export function Logo() {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className="wdth-expanded text-[17px] font-bold tracking-tight text-platinum">
        {SITE.name}
      </span>
    );
  }
  return (
    <img
      src={SITE.logo.src}
      alt={SITE.name}
      width={140}
      height={36}
      className="h-9 w-auto"
      onError={() => setFailed(true)}
    />
  );
}
