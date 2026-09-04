import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SITE } from "@/config/site";

/**
 * Portrait of Aish: the interior / city-window / laptop photograph only.
 * No cars, no lifestyle imagery. If the file is absent, the figure is removed
 * rather than showing a broken image or a stock placeholder.
 */
export function Portrait() {
  const { t } = useTranslation();
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <figure className="max-w-[320px]">
      <img
        src={SITE.portrait.src}
        alt={t("about.portraitAlt")}
        width={640}
        height={800}
        loading="lazy"
        decoding="async"
        className="aspect-[4/5] w-full rounded-card object-cover"
        onError={() => setFailed(true)}
      />
    </figure>
  );
}
