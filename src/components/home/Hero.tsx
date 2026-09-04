import { useTranslation } from "react-i18next";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/button";
import { TrackRecordCard } from "@/components/home/TrackRecordCard";
import { SITE } from "@/config/site";
import { useLocale } from "@/hooks/useLocale";
import { trackRecordSource } from "@/lib/track-record-source";
import { verificationDay } from "@/lib/track-record";

export function Hero() {
  const { t } = useTranslation();
  const { href } = useLocale();
  const record = trackRecordSource.getTrackRecord();
  const day = verificationDay(record);

  return (
    <section aria-labelledby="hero-heading" className="bg-navy-midnight py-10 md:py-16">
      <Container>
        <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_440px] md:gap-12">
          <div className="max-w-prose">
            <h1 id="hero-heading" className="text-display">
              {t("hero.building", { n: day, total: record.verificationDays })}
            </h1>

            <div className="mt-8 md:hidden">
              <TrackRecordCard record={record} />
            </div>

            <p className="mt-6 text-platinum/90">{t("hero.newStrategy")}</p>
            <p className="mt-2 text-legal text-slate">
              {t("hero.selfReported", { total: record.verificationDays })}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to={SITE.telegramUrl} variant="primary">
                {t("buttons.joinTelegram")}
              </ButtonLink>
              <ButtonLink to={href("/how-it-works")} variant="secondary">
                {t("buttons.howItWorks")}
              </ButtonLink>
            </div>
          </div>

          <div className="hidden md:block">
            <TrackRecordCard record={record} />
          </div>
        </div>
      </Container>
    </section>
  );
}
