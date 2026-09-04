import { useTranslation } from "react-i18next";
import { Hero } from "@/components/home/Hero";
import { WhatWeAre } from "@/components/home/WhatWeAre";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyNumbersSmall } from "@/components/home/WhyNumbersSmall";
import { LearnPreview } from "@/components/home/LearnPreview";
import { EmailCapture } from "@/components/home/EmailCapture";
import { AboutAish } from "@/components/home/AboutAish";
import { Faq } from "@/components/home/Faq";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function Home() {
  const { t } = useTranslation();
  useDocumentTitle(t("meta.titles.home"));
  return (
    <>
      <Hero />
      <WhatWeAre />
      <HowItWorks />
      <WhyNumbersSmall />
      <LearnPreview />
      <EmailCapture />
      <AboutAish />
      <Faq />
    </>
  );
}
