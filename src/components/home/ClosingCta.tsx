import { useTranslation } from "react-i18next";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui/button";
import { SITE } from "@/config/site";

/** Last word before the notes: one question, one glass button. Gold stays with the header / sticky bar. */
export function ClosingCta() {
  const { t } = useTranslation();
  return (
    <section aria-labelledby="cta-heading" className="border-t hairline bg-navy-midnight py-12 md:py-16">
      <Container>
        <Reveal className="metal-card metal-card--gold flex flex-col gap-6 rounded-lg p-6 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <h2 id="cta-heading" className="wdth-semi text-[24px] font-semibold leading-tight md:text-[28px]">
              {t("cta.heading")}
            </h2>
            <p className="mt-2 max-w-prose text-platinum/80">{t("cta.body")}</p>
          </div>
          <ButtonLink to={SITE.telegramUrl} variant="secondary" className="shrink-0" data-track="telegram_click" data-location="closing">
            {t("offerings.askAdmin")}
          </ButtonLink>
        </Reveal>
        <p className="mt-4 text-legal text-slate">{t("hero.riskLine")}</p>
      </Container>
    </section>
  );
}
