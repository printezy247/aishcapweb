import { useTranslation } from "react-i18next";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";

interface Step {
  title: string;
  body: string;
}

/** The four steps, shared with the home chapter, plus the way to the long-form page. */
export function Steps() {
  const { t } = useTranslation();
  const { href } = useLocale();
  const steps = t("howItWorks.steps", { returnObjects: true }) as Step[];

  return (
    <Section id="how-it-works" eyebrow={t("product.steps.eyebrow")} heading={t("product.steps.heading")} intro={t("product.steps.intro")} recessed className="scroll-mt-28">
      <ol className="grid gap-4 md:grid-cols-2 md:gap-5">
        {steps.map((step, i) => (
          <Reveal key={step.title} as="li" index={i} className="metal-card relative rounded-lg p-6 md:p-8">
            <span aria-hidden="true" className="num block text-[40px] font-medium leading-none text-gold/35 md:text-[48px]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 max-w-prose text-[18px] font-semibold md:text-[20px]">{step.title}</h3>
            <p className="mt-2 max-w-prose text-platinum/80">{step.body}</p>
          </Reveal>
        ))}
      </ol>
      <Reveal index={4} className="mt-8">
        <ButtonLink to={href("/how-it-works")} variant="secondary">
          {t("product.steps.more")}
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
