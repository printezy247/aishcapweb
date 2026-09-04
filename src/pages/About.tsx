import { useTranslation } from "react-i18next";
import { Container } from "@/components/layout/Container";
import { Portrait } from "@/components/Portrait";
import { ProseSections, type ProseSection } from "@/components/Prose";
import { ButtonLink } from "@/components/ui/button";
import { SITE } from "@/config/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useLocale } from "@/hooks/useLocale";
import { formatMoney } from "@/lib/format";
import { trackRecordSource } from "@/lib/track-record-source";

export default function About() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  useDocumentTitle(t("meta.titles.about"));
  const record = trackRecordSource.getTrackRecord();
  const sections = t("pages.about.sections", {
    returnObjects: true,
    start: formatMoney(100, record.currency, locale),
    total: record.verificationDays,
  }) as ProseSection[];

  return (
    <Container className="py-12 md:py-20">
      <div className="grid gap-10 md:grid-cols-[280px_minmax(0,1fr)] md:gap-16">
        <div>
          <Portrait />
        </div>
        <article className="max-w-prose">
          <h1 className="text-display">{t("pages.about.heading")}</h1>
          <div className="mt-8">
            <ProseSections sections={sections} />
          </div>
          <div className="mt-10">
            <ButtonLink to={SITE.telegramUrl} variant="primary">
              {t("buttons.joinTelegram")}
            </ButtonLink>
          </div>
        </article>
      </div>
    </Container>
  );
}
