import { useState } from "react";
import { SITE } from "@/config/site";

/**
 * Renders the brand logo from /public/images/logo.png when present.
 * Falls back to a text wordmark so the header never shows a broken image.
 */
export function Logo({ className = "h-8 md:h-9" }: { className?: string }) {
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
      width={200}
      height={78}
      className={`${className} w-auto`}
      // @ts-expect-error React 18 types lack fetchpriority; browsers honour the attribute.
      fetchpriority="high"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
