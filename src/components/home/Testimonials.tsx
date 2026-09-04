import { useTranslation } from "react-i18next";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/Reveal";
import { TESTIMONIALS } from "@/content/testimonials";
import { useLocale } from "@/hooks/useLocale";

/**
 * Real, consented member quotes only. Renders nothing until at least two
 * exist — no empty state, no "coming soon". See src/content/testimonials.ts
 * for the publishing rules.
 */
export function Testimonials() {
  const { t } = useTranslation();
  const { locale } = useLocale();

  if (TESTIMONIALS.length < 2) return null;

  return (
    <Section id="testimonials" eyebrow={t("testimonials.eyebrow")} heading={t("testimonials.heading")}>
      <ul className="grid max-w-[900px] gap-8 md:grid-cols-2">
        {TESTIMONIALS.map((item, i) => (
          <Reveal key={`${item.firstName}-${item.memberSince}`} as="li" index={i} className="border-t hairline pt-5">
            <blockquote className="max-w-prose text-platinum/90">{item.quote[locale]}</blockquote>
            <p className="mt-3 text-label text-slate">
              {item.firstName}, {item.state}
              <br />
              {t("testimonials.memberSince", { date: item.memberSince })}
            </p>
          </Reveal>
        ))}
      </ul>
      <p className="mt-8 max-w-prose text-legal text-slate">{t("testimonials.note")}</p>
    </Section>
  );
}
