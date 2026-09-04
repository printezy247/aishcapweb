import { Link } from "react-router-dom";
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
  const proof = t("hero.proof", { returnObjects: true }) as string[];

  return (
    <section aria-labelledby="hero-heading" className="hero-backdrop bg-navy-midnight py-12 md:py-24">
      <Container>
        <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1fr)_440px] md:gap-14">
          <div className="max-w-prose">
            <p className="eyebrow mb-3 flex items-center gap-2">
              <span aria-hidden="true" className="inline-block h-[6px] w-[6px] rounded-full bg-gold" />
              {t("hero.eyebrow")}
            </p>
            <h1 id="hero-heading" className="text-display">
              {t("hero.building", { n: day, total: record.verificationDays })}
            </h1>

            <div className="mt-8 md:hidden">
              <TrackRecordCard record={record} />
            </div>

            <p className="mt-6 text-[17px] text-platinum/90 md:text-[18px]">{t("hero.newStrategy")}</p>
            <p className="mt-2 text-legal text-slate">
              {t("hero.selfReported", { total: record.verificationDays })}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {/* Mobile/tablet: gold lives here. On lg+ the header carries it. */}
              <ButtonLink to={SITE.telegramUrl} variant="primary" className="lg:hidden" data-track="telegram_click" data-location="hero">
                {t("buttons.joinTelegram")}
              </ButtonLink>
              <ButtonLink to={SITE.telegramUrl} variant="secondary" className="hidden lg:inline-flex" data-track="telegram_click" data-location="hero">
                {t("buttons.joinTelegram")}
              </ButtonLink>
              <ButtonLink to={href("/how-it-works")} variant="secondary">
                {t("buttons.howItWorks")}
              </ButtonLink>
            </div>

            <p className="mt-4 max-w-prose text-legal text-slate">
              {t("hero.riskLine")}{" "}
              <Link to={href("/legal/risk")} className="text-slate underline hover:text-platinum">
                {t("buttons.readRisks")}
              </Link>
            </p>

            <ul className="mt-8 grid gap-2 text-[14px] text-platinum/85 sm:grid-cols-3 sm:gap-4">
              {proof.map((item) => (
                <li key={item} className="flex items-start gap-2 border-t hairline pt-3">
                  <span aria-hidden="true" className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:block">
            <TrackRecordCard record={record} />
          </div>
        </div>
      </Container>
    </section>
  );
}
