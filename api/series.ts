// Vercel serverless function: GET /api/series?symbol=XAU/USD&range=1d|1w|1m
//
// Indicative price history for the gold chart, from Twelve Data time_series.
// One credit per call; CDN cache s-maxage=900 per (symbol, range) plus an
// in-instance memo. Never fabricated: no key or upstream failure → 503/502.

import { SYMBOLS } from "./_lib/symbols.js";

const TTL_S = 900;
const CACHE_OK = `public, max-age=0, s-maxage=${TTL_S}, stale-while-revalidate=300`;

const RANGES = {
  "1d": { interval: "15min", outputsize: 96 },
  "1w": { interval: "1h", outputsize: 168 },
  "1m": { interval: "1day", outputsize: 31 },
} as const;
type RangeKey = keyof typeof RANGES;

interface Point {
  /** Unix seconds, UTC. */
  t: number;
  /** Close price. */
  c: number;
}
export interface SeriesPayload {
  configured: true;
  source: string;
  symbol: string;
  range: RangeKey;
  interval: string;
  asOf: string;
  points: Point[];
}

const memo = new Map<string, { body: string; at: number }>();
const failedAt = new Map<string, number>();

function json(status: number, body: unknown, cache: string): Response {
  return new Response(typeof body === "string" ? body : JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": cache, "x-robots-tag": "noindex" },
  });
}

export async function GET(request: Request): Promise<Response> {
  const apiKey = process.env.QUOTES_API_KEY;
  if (!apiKey) return json(503, { configured: false }, "no-store");

  const url = new URL(request.url);
  const symbol = url.searchParams.get("symbol") ?? "XAU/USD";
  const range = (url.searchParams.get("range") ?? "1w") as RangeKey;
  const spec = SYMBOLS.find((s) => s.symbol === symbol);
  if (!spec || !(range in RANGES)) return json(400, { configured: true, error: "bad request" }, "no-store");

  const key = `${symbol}|${range}`;
  const now = Date.now();
  const cached = memo.get(key);
  if (cached && now - cached.at < TTL_S * 1000) return json(200, cached.body, CACHE_OK);
  if (now - (failedAt.get(key) ?? 0) < 60_000) return json(502, { configured: true, error: "upstream" }, "no-store");

  const { interval, outputsize } = RANGES[range];
  try {
    const qs = new URLSearchParams({ symbol: spec.twelvedata, interval, outputsize: String(outputsize), timezone: "UTC", dp: "5" });
    const res = await fetch(`https://api.twelvedata.com/time_series?${qs}`, {
      headers: { Authorization: `apikey ${apiKey}` },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`twelvedata ${res.status}`);
    const body = (await res.json()) as { status?: string; message?: string; values?: Array<{ datetime: string; close: string }> };
    if (body.status === "error" || !Array.isArray(body.values)) throw new Error(String(body.message ?? "twelvedata error"));

    const points: Point[] = body.values
      .map((v) => {
        const iso = v.datetime.length === 10 ? `${v.datetime}T00:00:00Z` : `${v.datetime.replace(" ", "T")}Z`;
        return { t: Math.floor(Date.parse(iso) / 1000), c: Number(v.close) };
      })
      .filter((p) => Number.isFinite(p.t) && Number.isFinite(p.c))
      .sort((a, b) => a.t - b.t);
    if (points.length < 2) throw new Error("too few points");

    const payload: SeriesPayload = { configured: true, source: "twelvedata", symbol, range, interval, asOf: new Date(now).toISOString(), points };
    const text = JSON.stringify(payload);
    memo.set(key, { body: text, at: now });
    return json(200, text, CACHE_OK);
  } catch (e) {
    failedAt.set(key, now);
    return json(502, { configured: true, error: "upstream", detail: String((e as Error).message ?? e).slice(0, 200) }, "no-store");
  }
}
