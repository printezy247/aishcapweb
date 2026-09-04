import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Section } from "@/components/layout/Section";
import { Portrait } from "@/components/Portrait";
import { useLocale } from "@/hooks/useLocale";
import { formatMoney } from "@/lib/format";
import { trackRecordSource } from "@/lib/track-record-source";

export function AboutAish() {
  const { t } = useTranslation();
  const { locale, href } = useLocale();
  const record = trackRecordSource.getTrackRecord();

  return (
    <Section id="about" heading={t("about.heading")} recessed>
      <div className="grid gap-8 md:grid-cols-[280px_minmax(0,1fr)] md:gap-12">
        <Portrait />
        <div className="max-w-prose">
          <p>
            {t("about.body", {
              start: formatMoney(100, record.currency, locale),
              total: record.verificationDays,
            })}
          </p>
          <p className="mt-6">
            <Link to={href("/about")} className="text-platinum">
              {t("about.readMore")}
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
}
