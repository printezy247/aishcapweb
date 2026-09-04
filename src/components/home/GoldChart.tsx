import { useEffect, useRef } from "react";
import { AreaSeries, ColorType, createChart, type IChartApi, type UTCTimestamp } from "lightweight-charts";
import type { SeriesPoint } from "@/lib/series";

/**
 * Area chart on TradingView's Lightweight Charts (Apache-2.0). The library's
 * attribution logo stays on, as its licence requires. Loaded lazily so it
 * never touches the initial bundle. Static (no scroll/zoom) on purpose.
 */
export default function GoldChart({ points, intraday }: { points: SeriesPoint[]; intraday: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chart = createChart(el, {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#8FA3C4",
        fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
        fontSize: 11,
        attributionLogo: true,
      },
      grid: { vertLines: { color: "rgba(143,163,196,0.06)" }, horzLines: { color: "rgba(143,163,196,0.08)" } },
      rightPriceScale: { borderVisible: false, scaleMargins: { top: 0.12, bottom: 0.08 } },
      timeScale: { borderVisible: false, timeVisible: intraday, secondsVisible: false, fixLeftEdge: true, fixRightEdge: true },
      crosshair: { horzLine: { color: "rgba(212,160,23,0.5)", labelBackgroundColor: "#12294F" }, vertLine: { color: "rgba(212,160,23,0.5)", labelBackgroundColor: "#12294F" } },
      handleScroll: false,
      handleScale: false,
      localization: { priceFormatter: (p: number) => p.toFixed(2) },
    });
    const series = chart.addSeries(AreaSeries, {
      lineColor: "#F5D061",
      lineWidth: 2,
      topColor: "rgba(212,160,23,0.28)",
      bottomColor: "rgba(212,160,23,0.0)",
      priceLineVisible: false,
      lastValueVisible: true,
      crosshairMarkerRadius: 4,
    });
    series.setData(points.map((p) => ({ time: p.t as UTCTimestamp, value: p.c })));
    chart.timeScale().fitContent();
    chartRef.current = chart;
    return () => {
      chart.remove();
      chartRef.current = null;
    };
  }, [points, intraday]);

  return <div ref={ref} className="h-[240px] w-full md:h-[300px]" />;
}
