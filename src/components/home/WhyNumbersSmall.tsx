import { useTranslation } from "react-i18next";
import { Section } from "@/components/layout/Section";
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
    <Section id="why-small" heading={t("whyNumbersSmall.heading")}>
      <p className="max-w-prose text-[17px] leading-[1.65] md:text-[18px]">
        {t("whyNumbersSmall.body", {
          openedAt: formatDate(record.openedAt, locale),
          start: formatMoney(100, record.currency, locale),
          days: accountAgeDays(record),
          total: record.verificationDays,
        })}
      </p>
    </Section>
  );
}
