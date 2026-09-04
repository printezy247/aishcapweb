import { useTranslation } from "react-i18next";
import type { TrackRecord } from "@/lib/track-record";
import { accountAgeDays } from "@/lib/track-record";
import { formatDate, formatInt, formatMoney, formatPct } from "@/lib/format";
import { useCountUp } from "@/hooks/useCountUp";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";

/**
 * The live account card.
 *
 * It takes the whole TrackRecord and renders every field of it. There are no
 * props to hide, reorder, or omit individual statistics — that is a
 * compliance control, not an omission. Do not add any.
 */
export function TrackRecordCard({ record }: { record: TrackRecord }) {
  const { t } = useTranslation();
  const { locale } = useLocale();

  const age = accountAgeDays(record);

  // The single orchestrated motion moment on the site.
  const gain = useCountUp(record.gainPct);
  const balance = useCountUp(record.balance);
  const equity = useCountUp(record.equity);
  const drawdown = useCountUp(record.maxDrawdownPct);
  const closed = useCountUp(record.closedTrades);
  const open = useCountUp(record.openTrades);
  const fee = useCountUp(record.performanceFee);
  const ageDays = useCountUp(age);

  // Bull/bear strictly for a signed value. Zero stays neutral.
  const gainTone =
    record.gainPct > 0 ? "text-bull" : record.gainPct < 0 ? "text-bear" : "text-platinum";

  const rows: Array<{ label: string; value: string }> = [
    { label: t("stats.balance"), value: formatMoney(balance, record.currency, locale) },
    { label: t("stats.equity"), value: formatMoney(equity, record.currency, locale) },
    { label: t("stats.maxDrawdown"), value: formatPct(drawdown, locale) },
    { label: t("stats.closedTrades"), value: formatInt(Math.round(closed), locale) },
    { label: t("stats.openTrades"), value: formatInt(Math.round(open), locale) },
    { label: t("stats.leverage"), value: record.leverage },
    { label: t("stats.performanceFee"), value: `${formatInt(Math.round(fee), locale)}%` },
    { label: t("stats.accountAge"), value: t("stats.days", { count: Math.round(ageDays) }) },
  ];

  return (
    <section
      aria-label={t("hero.cardAria", { name: record.accountName })}
      className="w-full max-w-[440px] rounded-card bg-navy-raised px-4 py-4 text-platinum sm:px-5"
    >
      {/* Account name + live indicator + account number */}
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="wdth-semi text-[18px] font-semibold">{record.accountName}</h2>
        <span className="flex items-center gap-2 text-label text-slate">
          <span aria-hidden="true" className="inline-block h-[6px] w-[6px] rounded-full bg-gold" />
          {t("stats.live")}
        </span>
      </div>
      <p className="tabular mt-0.5 text-label text-slate">
        <span className="sr-only">{t("stats.accountId")}: </span>
        {record.accountId}
      </p>

      <hr className="hairline-gold my-3" />

      {/* Headline stat */}
      <dl>
        <div className="py-1">
          <dt className="text-label text-slate">{t("stats.totalGain")}</dt>
          <dd className={cn("text-stat mt-1", gainTone)}>{formatPct(gain, locale, true)}</dd>
        </div>
      </dl>

      <hr className="my-3 border-t hairline" />

      {/* Full stat set — always together */}
      <dl className="tabular text-[15px]">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-4 py-[5px]">
            <dt className="text-slate">{row.label}</dt>
            <dd className="text-right font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>

      <hr className="hairline-gold my-3" />

      <p className="text-label text-slate">
        {t("stats.lastUpdated")}{" "}
        <time dateTime={record.lastUpdated} className="tabular text-platinum/85">
          {formatDate(record.lastUpdated, locale)}
        </time>
      </p>
    </section>
  );
}
