import { useTranslation } from "react-i18next";
import { Container } from "@/components/layout/Container";
import { ProseSections, type ProseSection } from "@/components/Prose";
import { BrokerLink } from "@/components/AffiliateDisclosure";
import { ButtonLink } from "@/components/ui/button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useLocale } from "@/hooks/useLocale";

export default function HowItWorks() {
  const { t } = useTranslation();
  const { href } = useLocale();
  useDocumentTitle(t("meta.titles.howItWorks"));
  const sections = t("pages.howItWorks.sections", { returnObjects: true }) as ProseSection[];

  return (
    <Container className="py-12 md:py-20">
      <article className="max-w-prose">
        <h1 className="text-display">{t("pages.howItWorks.heading")}</h1>
        <p className="mt-6 text-[17px] text-platinum/90 md:text-[18px]">{t("pages.howItWorks.intro")}</p>
        <div className="mt-10">
          <ProseSections sections={sections} />
        </div>

        <h2 className="text-section mt-12">{t("pages.howItWorks.brokerHeading")}</h2>
        <div className="mt-4">
          {/* Broker link and inline commission disclosure are inseparable. */}
          <BrokerLink />
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to={href("/legal/risk")} variant="secondary">
            {t("buttons.readRisks")}
          </ButtonLink>
        </div>
      </article>
    </Container>
  );
}
