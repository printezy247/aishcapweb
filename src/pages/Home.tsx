import { useTranslation } from "react-i18next";
import { Hero } from "@/components/home/Hero";
import { MarketTicker } from "@/components/home/MarketTicker";
import { GoldSection } from "@/components/home/GoldSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CommunityBlock } from "@/components/home/Community";
import { TestimonialsBlock } from "@/components/home/Testimonials";
import { AboutBlock } from "@/components/home/AboutAish";
import { OfferingsBlock } from "@/components/home/Offerings";
import { EmailBlock, FollowBlock } from "@/components/home/EmailCapture";
import { FaqBlock } from "@/components/home/Faq";
import { Footnotes } from "@/components/Footnotes";
import { Section } from "@/components/layout/Section";
import { SITE } from "@/config/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

/** Six chapters, one claim each: Hero → Gold → How it works → Proof → Aish → Join. */
export default function Home() {
  const { t } = useTranslation();
  useDocumentTitle(t("meta.titles.home"));
  return (
    <>
      <Hero />
      <MarketTicker />
      <GoldSection />
      <HowItWorks />
      <Section id="proof" eyebrow={t("proof.eyebrow")} heading={t("proof.heading")} intro={t("proof.intro")} recessed>
        <div id="community">
          <CommunityBlock />
        </div>
        <div id="testimonials" className="mt-14 md:mt-20">
          <TestimonialsBlock />
        </div>
      </Section>
      <Section id="aish" eyebrow={t("aish.eyebrow")} heading={t("aish.heading")}>
        <div id="about">
          <AboutBlock />
        </div>
        <div id="offerings" className="mt-14 md:mt-20">
          <OfferingsBlock />
        </div>
      </Section>
      <Section id="join" eyebrow={t("join.eyebrow")} heading={t("join.heading")} intro={t("join.intro")} recessed>
        <div id="subscribe">{SITE.features.emailSignup ? <EmailBlock /> : <FollowBlock />}</div>
        <div className="mt-14 md:mt-20">
          <FaqBlock />
        </div>
      </Section>
      <Footnotes />
    </>
  );
}
