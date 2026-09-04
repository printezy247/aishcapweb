import { useTranslation } from "react-i18next";
import type { TrackRecord } from "@/lib/track-record";
import { accountAgeDays } from "@/lib/track-record";
import { formatDate, formatInt, formatMoney, formatPct } from "@/lib/format";
import { useCountUp } from "@/hooks/useCountUp";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";

/**
 * The live account card, holographic treatment.
 *
 * It takes the whole TrackRecord and renders every field of it. Visual
 * hierarchy is allowed (headline, primary tiles, secondary chips); omission
 * is not. There are no props to hide, reorder, or drop a statistic — that
 * is a compliance control, not an omission. Do not add any.
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

  // Bull/bear strictly for a signed value. Zero keeps the gold gradient.
  const gainTone = record.gainPct > 0 ? "text-bull" : record.gainPct < 0 ? "text-bear" : "holo-value";

  const primary: Array<{ label: string; value: string }> = [
    { label: t("stats.balance"), value: formatMoney(balance, record.currency, locale) },
    { label: t("stats.equity"), value: formatMoney(equity, record.currency, locale) },
    { label: t("stats.maxDrawdown"), value: formatPct(drawdown, locale) },
    { label: t("stats.accountAge"), value: t("stats.days", { count: Math.round(ageDays) }) },
  ];
  const secondary: Array<{ label: string; value: string }> = [
    { label: t("stats.closedTrades"), value: formatInt(Math.round(closed), locale) },
    { label: t("stats.openTrades"), value: formatInt(Math.round(open), locale) },
    { label: t("stats.leverage"), value: record.leverage },
    { label: t("stats.performanceFee"), value: `${formatInt(Math.round(fee), locale)}%` },
  ];

  return (
    <section
      aria-label={t("hero.cardAria", { name: record.accountName })}
      className="holo w-full max-w-[460px] px-5 pb-5 pt-6 text-platinum sm:px-6"
    >
      <span aria-hidden="true" className="holo-corner holo-corner--tl" />
      <span aria-hidden="true" className="holo-corner holo-corner--tr" />
      <span aria-hidden="true" className="holo-corner holo-corner--bl" />
      <span aria-hidden="true" className="holo-corner holo-corner--br" />

      {/* Identity row */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="wdth-expanded text-[20px] font-bold tracking-tight">{record.accountName}</h2>
          <p className="num mt-0.5 text-[12px] tracking-[0.08em] text-slate">
            <span className="sr-only">{t("stats.accountId")}: </span>
            {record.accountId}
          </p>
        </div>
        <span className="holo-chip flex items-center gap-2 rounded-full px-2.5 py-1 text-[12px] text-slate">
          <span aria-hidden="true" className="inline-block h-[6px] w-[6px] rounded-full bg-gold shadow-[0_0_8px_rgba(245,208,97,0.9)]" />
          {t("stats.live")}
        </span>
      </div>

      {/* Headline value */}
      <dl className="mt-6">
        <div>
          <dt className="text-label text-slate">{t("stats.totalGain")}</dt>
          <dd className={cn("num mt-1 text-[44px] font-medium leading-none tracking-tight md:text-[52px]", gainTone)}>
            {formatPct(gain, locale, true)}
          </dd>
        </div>
      </dl>

      {/* Primary tiles */}
      <dl className="mt-6 grid grid-cols-2 gap-2.5">
        {primary.map((row) => (
          <div key={row.label} className="holo-tile rounded-lg px-3.5 py-3">
            <dt className="text-[12px] leading-tight text-slate">{row.label}</dt>
            <dd className="num mt-1 text-[19px] font-medium leading-none text-platinum md:text-[21px]">{row.value}</dd>
          </div>
        ))}
      </dl>

      {/* Secondary chips — still part of the same stat set, never dropped */}
      <dl className="mt-3 grid grid-cols-2 gap-2">
        {secondary.map((row) => (
          <div key={row.label} className="holo-chip flex items-baseline justify-between gap-2 rounded-md px-3 py-2">
            <dt className="text-[12px] leading-tight text-slate">{row.label}</dt>
            <dd className="num text-[14px] font-medium leading-none text-platinum">{row.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 flex items-center justify-between gap-3 border-t pt-3 text-[12px] text-slate" style={{ borderColor: "rgba(212,160,23,0.35)" }}>
        <span>{t("stats.lastUpdated")}</span>
        <time dateTime={record.lastUpdated} className="num text-platinum/85">
          {formatDate(record.lastUpdated, locale)}
        </time>
      </p>
    </section>
  );
}
