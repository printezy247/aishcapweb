import { useTranslation } from "react-i18next";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/Reveal";

/** Two plain cards, no icons. The bluntness is the point. */
export function WhatWeAre() {
  const { t } = useTranslation();
  return (
    <Section id="what-we-are" eyebrow={t("whatWeAre.eyebrow")} heading={t("whatWeAre.heading")}>
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        <Reveal className="metal-card rounded-lg p-6 md:p-8">
          <h3 className="eyebrow mb-3 text-slate">{t("whatWeAre.areTitle")}</h3>
          <p className="max-w-prose text-platinum/90">{t("whatWeAre.are")}</p>
        </Reveal>
        <Reveal index={1} className="metal-card relative overflow-hidden rounded-lg p-6 md:p-8">
          <span aria-hidden="true" className="gold-bar absolute inset-y-0 left-0 w-[2px]" />
          <h3 className="eyebrow mb-3">{t("whatWeAre.areNotTitle")}</h3>
          <p className="max-w-prose text-platinum">{t("whatWeAre.areNot")}</p>
        </Reveal>
      </div>
    </Section>
  );
}
