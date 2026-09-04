import { useTranslation } from "react-i18next";
import { Section } from "@/components/layout/Section";
import { AboutBlock } from "@/components/home/AboutAish";
import { OfferingsBlock } from "@/components/home/Offerings";

/** Chapter 5: the person, and where to find him. */
export function AishSection() {
  const { t } = useTranslation();
  return (
    <Section id="aish" eyebrow={t("aish.eyebrow")} heading={t("aish.heading")}>
      <div id="about">
        <AboutBlock />
      </div>
      <div id="offerings" className="mt-14 md:mt-20">
        <OfferingsBlock />
      </div>
    </Section>
  );
}
