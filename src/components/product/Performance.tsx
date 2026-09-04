import { useTranslation } from "react-i18next";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/Reveal";
import { Fn } from "@/components/Footnotes";
import { useLocale } from "@/hooks/useLocale";
import { formatDate, formatInt, formatMoney, formatPct } from "@/lib/format";
import { accountAgeDays, verificationDay, type TrackRecord } from "@/lib/track-record";
import { cn } from "@/lib/utils";

interface Term {
  term: string;
  body: string;
}

/**
 * Specs-page table of the whole TrackRecord: the same fields as the card,
 * nothing more and nothing less, each one date-stamped by lastUpdated.
 */
export function Performance({ record }: { record: TrackRecord }) {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const day = verificationDay(record);
  const age = accountAgeDays(record);
  const glossary = t("product.performance.glossary", { returnObjects: true }) as Term[];
  const gainTone = record.gainPct > 0 ? "text-bull" : record.gainPct < 0 ? "text-bear" : "text-platinum";

  const rows: Array<{ label: string; value: string; fn?: number; tone?: string }> = [
    { label: t("product.performance.rows.account"), value: record.accountName },
    { label: t("stats.accountId"), value: record.accountId },
    { label: t("product.performance.rows.opened"), value: formatDate(record.openedAt, locale) },
    { label: t("stats.accountAge"), value: `${formatInt(age, locale)} ${t("stats.daysUnit", { count: age })}` },
    { label: t("product.performance.rows.window"), value: t("product.performance.rows.dayOf", { n: day, total: record.verificationDays }) },
    { label: t("stats.balance"), value: formatMoney(record.balance, record.currency, locale) },
    { label: t("stats.equity"), value: formatMoney(record.equity, record.currency, locale) },
    { label: t("stats.totalGain"), value: formatPct(record.gainPct, locale, true), fn: 1, tone: gainTone },
    { label: t("stats.maxDrawdown"), value: formatPct(record.maxDrawdownPct, locale) },
    { label: t("stats.closedTrades"), value: formatInt(record.closedTrades, locale) },
    { label: t("stats.openTrades"), value: formatInt(record.openTrades, locale) },
    { label: t("stats.leverage"), value: record.leverage },
    { label: t("stats.performanceFee"), value: formatPct(record.performanceFee, locale), fn: 2 },
    { label: t("product.performance.rows.currency"), value: record.currency },
    { label: t("stats.lastUpdated"), value: formatDate(record.lastUpdated, locale) },
  ];

  return (
    <Section
      id="performance"
      eyebrow={t("product.performance.eyebrow")}
      heading={t("product.performance.heading")}
      intro={t("product.performance.intro")}
      className="scroll-mt-28"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <Reveal>
          <table className="w-full border-collapse text-[15px]">
            <caption className="sr-only">{t("hero.cardAria", { name: record.accountName })}</caption>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="border-b hairline py-3 pr-4 text-left text-label font-semibold text-slate">
                    {r.label}
                    {r.fn && <Fn n={r.fn} />}
                  </th>
                  <td className={cn("num border-b hairline py-3 text-right", r.tone ?? "text-platinum")}>{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-legal text-slate">{t("stats.source")}. {t("hero.selfReported", { total: record.verificationDays })}</p>
        </Reveal>

        <div className="grid content-start gap-4">
          {glossary.map((g, i) => (
            <Reveal key={g.term} index={i} className="metal-card rounded-lg p-6">
              <h3 className="text-[17px] font-semibold">{g.term}</h3>
              <p className="mt-2 text-platinum/80">{g.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
