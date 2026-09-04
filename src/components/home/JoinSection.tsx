import { useTranslation } from "react-i18next";
import { Section } from "@/components/layout/Section";
import { EmailBlock } from "@/components/home/EmailCapture";
import { FaqBlock } from "@/components/home/Faq";

/** Chapter 6: the weekly email and the straight answers. */
export function JoinSection() {
  const { t } = useTranslation();
  return (
    <Section id="join" eyebrow={t("join.eyebrow")} heading={t("join.heading")} intro={t("join.intro")} recessed>
      <div id="subscribe">
        <EmailBlock />
      </div>
      <div className="mt-14 md:mt-20">
        <FaqBlock />
      </div>
    </Section>
  );
}
