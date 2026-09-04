import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/hooks/useLocale";
import { useQuotes } from "@/hooks/useQuotes";
import { formatPct, formatPrice, formatTimeMY } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Quote } from "@/lib/quotes";

/**
 * Indicative market prices, delayed, with an explicit timestamp. Renders
 * nothing until real data arrives. Bull/bear only on the signed change.
 */
export function MarketTicker() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const { status, quotes, asOf } = useQuotes();

  // Flash a price for a moment when a real refresh changes it.
  const prev = useRef<Map<string, number>>(new Map());
  const [flash, setFlash] = useState<Record<string, "up" | "down">>({});
  useEffect(() => {
    const next: Record<string, "up" | "down"> = {};
    for (const q of quotes) {
      const was = prev.current.get(q.symbol);
      if (was !== undefined && was !== q.price) next[q.symbol] = q.price > was ? "up" : "down";
      prev.current.set(q.symbol, q.price);
    }
    if (Object.keys(next).length) {
      setFlash(next);
      const id = window.setTimeout(() => setFlash({}), 900);
      return () => window.clearTimeout(id);
    }
  }, [quotes]);

  if (status !== "ready" || quotes.length === 0 || !asOf) return null;

  const stamp = (
    <span className="whitespace-nowrap text-label text-slate">
      {t("ticker.indicative")} ·{" "}
      <time dateTime={asOf}>{t("ticker.asOf", { time: formatTimeMY(asOf, locale) })}</time>
    </span>
  );

  const item = (q: Quote) => {
    const tone = q.changePct > 0 ? "text-bull" : q.changePct < 0 ? "text-bear" : "text-platinum";
    return (
      <span key={q.symbol} className="num flex items-baseline gap-2 whitespace-nowrap text-[13px]">
        <span className="text-slate">{q.symbol}</span>
        <span className={cn("rounded px-0.5 font-medium text-platinum", flash[q.symbol] === "up" && "flash-up", flash[q.symbol] === "down" && "flash-down")}>
          {formatPrice(q.price, q.decimals, locale)}
        </span>
        <span className={cn("text-[12px]", tone)}>
          {q.changePct > 0 ? "▲ " : q.changePct < 0 ? "▼ " : ""}
          {formatPct(q.changePct, locale, true)}
        </span>
      </span>
    );
  };

  return (
    <section aria-label={t("ticker.aria")} className="ticker-wrap border-b hairline bg-navy-abyss py-2.5">
      <div className="ticker-track px-6">
        {quotes.map(item)}
        {stamp}
        <span aria-hidden="true" className="ticker-dup flex gap-9">
          {quotes.map((q) => ({ ...q, symbol: `${q.symbol}` })).map((q) => (
            <span key={`dup-${q.symbol}`}>{item(q)}</span>
          ))}
          {stamp}
        </span>
      </div>
    </section>
  );
}
