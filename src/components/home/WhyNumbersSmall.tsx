import { useTranslation } from "react-i18next";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/hooks/useLocale";
import { formatDate, formatMoney } from "@/lib/format";
import { accountAgeDays } from "@/lib/track-record";
import { trackRecordSource } from "@/lib/track-record-source";

/** The trust engine of the site. Plain, first person, no salesmanship. */
export function WhyNumbersSmall() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const record = trackRecordSource.getTrackRecord();

  return (
    <Section id="why-small" eyebrow={t("whyNumbersSmall.eyebrow")} heading={t("whyNumbersSmall.heading")}>
      <Reveal className="metal-card hero-backdrop hero-backdrop--soft rounded-lg p-6 md:p-10">
        <p className="max-w-prose text-[17px] leading-[1.7] md:text-[19px]">
          {t("whyNumbersSmall.body", {
            openedAt: formatDate(record.openedAt, locale),
            start: formatMoney(100, record.currency, locale),
            days: accountAgeDays(record),
            total: record.verificationDays,
          })}
        </p>
        <p className="mt-6 text-label text-slate">— Aish</p>
      </Reveal>
    </Section>
  );
}
