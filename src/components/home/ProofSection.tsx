import { useTranslation } from "react-i18next";
import { Section } from "@/components/layout/Section";
import { CommunityBlock } from "@/components/home/Community";
import { TestimonialsBlock } from "@/components/home/Testimonials";

/** Chapter 4: what already exists — the room and its members' words. */
export function ProofSection() {
  const { t } = useTranslation();
  return (
    <Section id="proof" eyebrow={t("proof.eyebrow")} heading={t("proof.heading")} intro={t("proof.intro")} recessed>
      <div id="community">
        <CommunityBlock />
      </div>
      <div id="testimonials" className="mt-14 md:mt-20">
        <TestimonialsBlock />
      </div>
    </Section>
  );
}
