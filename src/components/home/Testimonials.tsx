import { useTranslation } from "react-i18next";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/Reveal";
import { TESTIMONIALS } from "@/content/testimonials";
import { useLocale } from "@/hooks/useLocale";

/**
 * Member quotes with consent on file. Renders nothing below two entries —
 * no empty state, no "coming soon". See src/content/testimonials.ts.
 */
export function Testimonials() {
  const { t } = useTranslation();
  const { locale } = useLocale();

  if (TESTIMONIALS.length < 2) return null;

  return (
    <Section id="testimonials" eyebrow={t("testimonials.eyebrow")} heading={t("testimonials.heading")}>
      <ul className="grid gap-4 md:grid-cols-2 md:gap-6">
        {TESTIMONIALS.map((item, i) => (
          <Reveal key={`${item.name}-${i}`} as="li" index={i} className="metal-card flex flex-col rounded-lg p-6 md:p-7">
            <p
              className="text-[13px] tracking-[0.15em] text-gold"
              role="img"
              aria-label={t("testimonials.rating", { n: item.rating })}
            >
              {"★".repeat(item.rating)}
              <span className="text-slate/40">{"★".repeat(5 - item.rating)}</span>
            </p>
            <blockquote className="mt-3 flex-1 text-[17px] leading-[1.6] text-platinum/90">{item.quote[locale]}</blockquote>
            <p className="mt-4 text-label text-slate">
              <span className="font-semibold text-platinum">{item.name}</span>
              <br />
              {item.role}
              {item.memberSince && (
                <>
                  <br />
                  {t("testimonials.memberSince", { date: item.memberSince })}
                </>
              )}
            </p>
          </Reveal>
        ))}
      </ul>
      <Reveal index={4}>
        <p className="mt-8 max-w-prose text-legal text-slate">{t("testimonials.note")}</p>
      </Reveal>
    </Section>
  );
}
