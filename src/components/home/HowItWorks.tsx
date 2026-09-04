import { useTranslation } from "react-i18next";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";

interface Step {
  title: string;
  body: string;
}

/** A genuine sequence, so numbering is used here and only here. */
export function HowItWorks() {
  const { t } = useTranslation();
  const { href } = useLocale();
  const steps = t("howItWorks.steps", { returnObjects: true }) as Step[];

  return (
    <Section
      id="how-it-works"
      eyebrow={t("howItWorks.eyebrow")}
      heading={t("howItWorks.heading")}
      intro={t("howItWorks.intro")}
      recessed
    >
      <ol className="grid gap-4 md:grid-cols-2 md:gap-6">
        {steps.map((step, i) => (
          <Reveal key={step.title} as="li" index={i} className="metal-card relative rounded-lg p-6 pt-5 md:p-8 md:pt-6">
            <span aria-hidden="true" className="num block text-[40px] font-medium leading-none text-gold/35 md:text-[48px]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 max-w-prose text-[17px] font-semibold">{step.title}</h3>
            <p className="mt-2 max-w-prose text-platinum/80">{step.body}</p>
          </Reveal>
        ))}
      </ol>
      <div className="mt-8">
        <ButtonLink to={href("/legal/risk")} variant="secondary">
          {t("buttons.readRisks")}
        </ButtonLink>
      </div>
    </Section>
  );
}
