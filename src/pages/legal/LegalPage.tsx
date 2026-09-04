import { useTranslation } from "react-i18next";
import { Container } from "@/components/layout/Container";
import { ProseSections, type ProseSection } from "@/components/Prose";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useLocale } from "@/hooks/useLocale";
import { formatDate } from "@/lib/format";

/** Date the legal texts were last revised. Update when the copy changes. */
export const LEGAL_UPDATED = "2026-09-04";

export function LegalPage({ pageKey }: { pageKey: "risk" | "affiliate" | "terms" | "privacy" }) {
  const { t } = useTranslation();
  const { locale } = useLocale();
  useDocumentTitle(t(`meta.titles.${pageKey}`));
  const sections = t(`pages.${pageKey}.sections`, { returnObjects: true }) as ProseSection[];
  const intro = t(`pages.${pageKey}.intro`, { defaultValue: "" });

  return (
    <Container className="py-12 md:py-20">
      <article className="max-w-prose">
        <h1 className="text-display">{t(`pages.${pageKey}.heading`)}</h1>
        <p className="mt-3 text-meta">
          {t(`pages.${pageKey}.updated`, { date: formatDate(LEGAL_UPDATED, locale) })}
        </p>
        {intro && <p className="mt-6 text-[17px] text-platinum/90 md:text-[18px]">{intro}</p>}
        <div className="mt-10 text-legal md:text-[15px]">
          <ProseSections sections={sections} />
        </div>
      </article>
    </Container>
  );
}
