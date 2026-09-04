import { useTranslation } from "react-i18next";
import type { TrackRecord } from "@/lib/track-record";
import { accountAgeDays } from "@/lib/track-record";
import { formatDate } from "@/lib/format";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";
import { Fn } from "@/components/Footnotes";
import { Num } from "@/components/Num";

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

  const money = { style: "currency", currency: record.currency, currencyDisplay: "narrowSymbol", minimumFractionDigits: 2, maximumFractionDigits: 2 } as const;
  const pct = { minimumFractionDigits: 2, maximumFractionDigits: 2 } as const;

  // Bull/bear strictly for a signed value. Zero keeps the gold gradient.
  const gainTone = record.gainPct > 0 ? "text-bull" : record.gainPct < 0 ? "text-bear" : "text-gold-bright";
  const arrow = record.gainPct > 0 ? "▲ " : record.gainPct < 0 ? "▼ " : "";

  return (
    <section
      aria-label={t("hero.cardAria", { name: record.accountName })}
      className="holo w-full max-w-[460px] px-5 pb-5 pt-6 text-platinum sm:px-6"
    >
      <span aria-hidden="true" className="holo-corner holo-corner--tl" />
      <span aria-hidden="true" className="holo-corner holo-corner--tr" />
      <span aria-hidden="true" className="holo-corner holo-corner--bl" />
      <span aria-hidden="true" className="holo-corner holo-corner--br" />

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

      <dl className="mt-6">
        <div>
          <dt className="text-label text-slate">
            {t("stats.totalGain")}
            <Fn n={1} />
          </dt>
          <dd className={cn("num mt-1 text-[44px] font-medium leading-none tracking-tight md:text-[52px]", gainTone)}>
            {arrow}
            <Num value={record.gainPct} format={{ ...pct, signDisplay: "exceptZero" }} suffix="%" />
          </dd>
        </div>
      </dl>

      <dl className="mt-6 grid grid-cols-2 gap-2.5">
        <div className="holo-tile rounded-lg px-3.5 py-3">
          <dt className="text-[12px] leading-tight text-slate">{t("stats.balance")}</dt>
          <dd className="num mt-1 text-[19px] font-medium leading-none text-platinum md:text-[21px]"><Num value={record.balance} format={money} /></dd>
        </div>
        <div className="holo-tile rounded-lg px-3.5 py-3">
          <dt className="text-[12px] leading-tight text-slate">{t("stats.equity")}</dt>
          <dd className="num mt-1 text-[19px] font-medium leading-none text-platinum md:text-[21px]"><Num value={record.equity} format={money} /></dd>
        </div>
        <div className="holo-tile rounded-lg px-3.5 py-3">
          <dt className="text-[12px] leading-tight text-slate">{t("stats.maxDrawdown")}</dt>
          <dd className="num mt-1 text-[19px] font-medium leading-none text-platinum md:text-[21px]"><Num value={record.maxDrawdownPct} format={pct} suffix="%" /></dd>
        </div>
        <div className="holo-tile rounded-lg px-3.5 py-3">
          <dt className="text-[12px] leading-tight text-slate">{t("stats.accountAge")}</dt>
          <dd className="num mt-1 text-[19px] font-medium leading-none text-platinum md:text-[21px]"><Num value={age} suffix={` ${t("stats.daysUnit", { count: age })}`} /></dd>
        </div>
      </dl>

      <dl className="mt-3 grid grid-cols-2 gap-2">
        <div className="holo-chip flex items-baseline justify-between gap-2 rounded-md px-3 py-2">
          <dt className="text-[12px] leading-tight text-slate">{t("stats.closedTrades")}</dt>
          <dd className="num text-[14px] font-medium leading-none text-platinum"><Num value={record.closedTrades} /></dd>
        </div>
        <div className="holo-chip flex items-baseline justify-between gap-2 rounded-md px-3 py-2">
          <dt className="text-[12px] leading-tight text-slate">{t("stats.openTrades")}</dt>
          <dd className="num text-[14px] font-medium leading-none text-platinum"><Num value={record.openTrades} /></dd>
        </div>
        <div className="holo-chip flex items-baseline justify-between gap-2 rounded-md px-3 py-2">
          <dt className="text-[12px] leading-tight text-slate">{t("stats.leverage")}</dt>
          <dd className="num text-[14px] font-medium leading-none text-platinum">{record.leverage}</dd>
        </div>
        <div className="holo-chip flex items-baseline justify-between gap-2 rounded-md px-3 py-2">
          <dt className="text-[12px] leading-tight text-slate">
            {t("stats.performanceFee")}
            <Fn n={2} />
          </dt>
          <dd className="num text-[14px] font-medium leading-none text-platinum"><Num value={record.performanceFee} suffix="%" /></dd>
        </div>
      </dl>

      <div className="mt-5 border-t pt-3 text-[12px] text-slate" style={{ borderColor: "rgba(212,160,23,0.35)" }}>
        <p className="flex items-center justify-between gap-3">
          <span>{t("stats.lastUpdated")}</span>
          <time dateTime={record.lastUpdated} className="num text-platinum/85">
            {formatDate(record.lastUpdated, locale)}
          </time>
        </p>
        <p className="mt-1 flex items-center justify-between gap-3">
          <span>{t("stats.currencyIn", { currency: record.currency })}</span>
          <span>{t("stats.source")}</span>
        </p>
      </div>
    </section>
  );
}
