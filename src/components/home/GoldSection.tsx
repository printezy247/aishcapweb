import { lazy, Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/Reveal";
import { Events } from "@/components/home/Events";
import { useLocale } from "@/hooks/useLocale";
import { useSeries } from "@/hooks/useSeries";
import { formatPct, formatPrice, formatTimeMY } from "@/lib/format";
import type { SeriesRange } from "@/lib/series";
import { cn } from "@/lib/utils";

const GoldChart = lazy(() => import("@/components/home/GoldChart"));
const SYMBOL = "XAU/USD";
const RANGES: SeriesRange[] = ["1d", "1w", "1m"];

/** Signed change with an arrow so colour never carries the meaning alone. */
export function signedWithArrow(pct: number, locale: "en" | "ms"): string {
  const arrow = pct > 0 ? "▲ " : pct < 0 ? "▼ " : "";
  return arrow + formatPct(pct, locale, true);
}

/**
 * Indicative XAU/USD context. Market data from a third-party provider,
 * delayed and timestamped. Not performance data, not a recommendation.
 * Renders nothing at all if the data route is unavailable.
 */
export function GoldSection() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const [range, setRange] = useState<SeriesRange>("1w");
  const { status, data } = useSeries(SYMBOL, range);

  if (status === "unavailable" && !data) return null;

  const points = data?.points ?? [];
  const last = points.length ? points[points.length - 1].c : null;
  const first = points.length ? points[0].c : null;
  const changePct = last !== null && first ? ((last - first) / first) * 100 : 0;
  const tone = changePct > 0 ? "text-bull" : changePct < 0 ? "text-bear" : "text-platinum";

  return (
    <Section id="gold" eyebrow={t("gold.eyebrow")} heading={t("gold.heading")} intro={t("gold.intro")} recessed>
      <Reveal className="metal-card rounded-lg p-4 md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-label text-slate">{SYMBOL}</p>
            <p className="num mt-1 text-[30px] font-medium leading-none text-platinum md:text-[36px]">
              {last !== null ? formatPrice(last, 2, locale) : "—"}
            </p>
            <p className={cn("num mt-2 text-[14px]", tone)}>
              {last !== null ? signedWithArrow(changePct, locale) : ""}{" "}
              <span className="text-slate">{t("gold.overRange", { range: t(`gold.ranges.${range}`) })}</span>
            </p>
          </div>
          <div role="tablist" aria-label={t("gold.rangeLabel")} className="flex gap-1 rounded-md border hairline-strong p-1">
            {RANGES.map((r) => (
              <button
                key={r}
                type="button"
                role="tab"
                aria-selected={range === r}
                onClick={() => setRange(r)}
                className={cn(
                  "num min-h-[32px] rounded px-3 text-[13px] font-medium",
                  range === r ? "bg-gold text-navy-abyss" : "text-slate hover:text-platinum",
                )}
              >
                {t(`gold.ranges.${r}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 h-[240px] md:h-[300px]" aria-busy={status === "loading"}>
          {points.length > 1 ? (
            <Suspense fallback={<div className="h-full w-full animate-pulse rounded bg-navy-abyss/40" />}>
              <GoldChart points={points} intraday={range !== "1m"} />
            </Suspense>
          ) : (
            <div className="flex h-full items-center justify-center text-label text-slate">{t("gold.loading")}</div>
          )}
        </div>

        <p className="mt-3 text-label text-slate">
          {t("ticker.indicative")}
          {data && (
            <>
              {" · "}
              <time dateTime={data.asOf}>{t("ticker.asOf", { time: formatTimeMY(data.asOf, locale) })}</time>
              {" · "}
              {t("gold.source")}
            </>
          )}
        </p>
      </Reveal>
      <Events />
    </Section>
  );
}
