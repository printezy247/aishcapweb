import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SITE } from "@/config/site";

/**
 * Portrait of Aish: a tight head-and-shoulders crop (see scripts/crop-portrait.mjs).
 * If the file is absent, the figure is removed rather than showing a broken
 * image or a stock placeholder.
 */
export function Portrait({ size = 280 }: { size?: number }) {
  const { t } = useTranslation();
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <figure className="metal-card relative overflow-hidden rounded-lg p-2" style={{ maxWidth: size }}>
      <img
        src={SITE.portrait.src}
        srcSet={`${SITE.portrait.srcSmall} 400w, ${SITE.portrait.src} 800w`}
        sizes={`(max-width: 640px) 60vw, ${size}px`}
        alt={t("about.portraitAlt")}
        width={800}
        height={800}
        loading="lazy"
        decoding="async"
        className="aspect-square w-full rounded-[4px] object-cover"
        onError={() => setFailed(true)}
      />
      <span aria-hidden="true" className="gold-bar absolute inset-x-2 bottom-2 h-[2px] opacity-80" />
    </figure>
  );
}
