import { useTranslation } from "react-i18next";
import { Section } from "@/components/layout/Section";

/** Two plain columns, one hairline. No icons, no cards. The bluntness is the point. */
export function WhatWeAre() {
  const { t } = useTranslation();
  return (
    <Section id="what-we-are" heading={t("whatWeAre.heading")}>
      <div className="grid gap-8 md:grid-cols-2 md:gap-0">
        <div className="max-w-prose md:pr-10">
          <h3 className="mb-3 text-label font-semibold text-slate">{t("whatWeAre.areTitle")}</h3>
          <p>{t("whatWeAre.are")}</p>
        </div>
        <div className="max-w-prose border-t hairline pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
          <h3 className="mb-3 text-label font-semibold text-slate">{t("whatWeAre.areNotTitle")}</h3>
          <p>{t("whatWeAre.areNot")}</p>
        </div>
      </div>
    </Section>
  );
}
