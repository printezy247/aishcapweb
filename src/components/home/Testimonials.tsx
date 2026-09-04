import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/Reveal";
import { TESTIMONIALS } from "@/content/testimonials";
import { useLocale } from "@/hooks/useLocale";
import { Fn } from "@/components/Footnotes";

/** Member quotes with consent on file. Renders nothing below two entries. */
export function TestimonialsBlock() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  if (TESTIMONIALS.length < 2) return null;

  return (
    <div>
      <Reveal>
        <h3 className="wdth-semi text-[24px] font-semibold leading-tight md:text-[28px]">{t("testimonials.heading")}</h3>
      </Reveal>
      <ul className="mt-6 grid gap-4 md:grid-cols-2 md:gap-6">
        {TESTIMONIALS.map((item, i) => (
          <Reveal key={`${item.name}-${i}`} as="li" index={i} className="metal-card flex flex-col rounded-lg p-6 md:p-7">
            <p className="text-[13px] tracking-[0.15em] text-gold" role="img" aria-label={t("testimonials.rating", { n: item.rating })}>
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
        <p className="mt-6 max-w-prose text-legal text-slate">
          {t("testimonials.note")}
          <Fn n={4} />
        </p>
      </Reveal>
    </div>
  );
}
