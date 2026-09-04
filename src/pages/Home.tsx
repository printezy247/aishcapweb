import { useTranslation } from "react-i18next";
import { Hero } from "@/components/home/Hero";
import { MarketTicker } from "@/components/home/MarketTicker";
import { GoldSection } from "@/components/home/GoldSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ProofSection } from "@/components/home/ProofSection";
import { AishSection } from "@/components/home/AishSection";
import { JoinSection } from "@/components/home/JoinSection";
import { Footnotes } from "@/components/Footnotes";
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
      <ProofSection />
      <AishSection />
      <JoinSection />
      <Footnotes />
    </>
  );
}
