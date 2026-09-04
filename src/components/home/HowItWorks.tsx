import { useTranslation } from "react-i18next";
import { Section } from "@/components/layout/Section";
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
    <Section id="how-it-works" heading={t("howItWorks.heading")} recessed>
      <p className="mb-8 max-w-prose text-platinum/90">{t("howItWorks.intro")}</p>
      <ol className="grid gap-8 md:grid-cols-2">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span
              aria-hidden="true"
              className="tabular wdth-expanded mt-0.5 w-8 shrink-0 text-[22px] font-bold leading-none text-slate"
            >
              {i + 1}
            </span>
            <div className="max-w-prose">
              <h3 className="font-semibold">{step.title}</h3>
              <p className="mt-2 text-platinum/85">{step.body}</p>
            </div>
          </li>
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
