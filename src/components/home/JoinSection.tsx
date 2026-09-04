import { useTranslation } from "react-i18next";
import { Section } from "@/components/layout/Section";
import { EmailBlock, FollowBlock } from "@/components/home/EmailCapture";
import { SITE } from "@/config/site";
import { FaqBlock } from "@/components/home/Faq";

/** Chapter 6: the weekly breakdown (email once switched on) and the straight answers. */
export function JoinSection() {
  const { t } = useTranslation();
  return (
    <Section id="join" eyebrow={t("join.eyebrow")} heading={t("join.heading")} intro={t("join.intro")} recessed>
      <div id="subscribe">
        {SITE.features.emailSignup ? <EmailBlock /> : <FollowBlock />}
      </div>
      <div className="mt-14 md:mt-20">
        <FaqBlock />
      </div>
    </Section>
  );
}
