// Vercel serverless function: GET /api/quotes
//
// Indicative market prices for the ticker. Server-side only: the provider key
// never reaches the browser. Cached at the CDN for TTL_S seconds and memoised
// in the function instance so the free tier is never exceeded.
//
// Env: QUOTES_API_KEY (required). Provider: Twelve Data, one batched request.
// Without a key this returns 503 {configured:false}; the site renders no
// ticker at all. Prices are never fabricated.

import type { Quote, QuotesPayload, QuotesUnavailable } from "../src/lib/quotes";
import { SYMBOLS } from "./_lib/symbols.js";

const TTL_S = 900;
const CACHE_OK = `public, max-age=0, s-maxage=${TTL_S}, stale-while-revalidate=300`;

let memo: { body: string; at: number } | null = null;
let failedAt = 0;

function json(status: number, body: unknown, cache: string): Response {
  return new Response(typeof body === "string" ? body : JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": cache,
      "x-robots-tag": "noindex",
    },
  });
}

function num(value: unknown, what: string): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) throw new Error(`Non-finite ${what}`);
  return n;
}

async function fetchQuotes(apiKey: string, signal: AbortSignal) {
  const list = SYMBOLS.map((s) => s.twelvedata).join(",");
  const res = await fetch(`https://api.twelvedata.com/quote?symbol=${encodeURIComponent(list)}&dp=5`, {
    headers: { Authorization: `apikey ${apiKey}` },
    signal,
  });
  if (!res.ok) throw new Error(`twelvedata ${res.status}`);
  const body = (await res.json()) as Record<string, Record<string, unknown>> & { status?: string; message?: string };
  if (body.status === "error") throw new Error(String(body.message ?? "twelvedata error"));

  const quotes: Quote[] = [];
  const errors: Array<{ symbol: string; reason: string }> = [];
  for (const s of SYMBOLS) {
    // Single-symbol responses are flat; multi-symbol responses are keyed by symbol.
    const q = (SYMBOLS.length === 1 ? body : body[s.twelvedata]) as Record<string, unknown> | undefined;
    try {
      if (!q) throw new Error("missing from response");
      if (q.status === "error") throw new Error(String(q.message ?? "provider error"));
      quotes.push({
        symbol: s.symbol,
        price: num(q.close, `${s.symbol} price`),
        changePct: num(q.percent_change, `${s.symbol} change`),
        decimals: s.decimals,
        ts: new Date(num(q.timestamp, `${s.symbol} timestamp`) * 1000).toISOString(),
      });
    } catch (e) {
      errors.push({ symbol: s.symbol, reason: String((e as Error).message ?? e) });
    }
  }
  return { quotes, errors };
}

export async function GET(): Promise<Response> {
  const apiKey = process.env.QUOTES_API_KEY;
  if (!apiKey) return json(503, { configured: false } satisfies QuotesUnavailable, "no-store");

  const now = Date.now();
  if (memo && now - memo.at < TTL_S * 1000) return json(200, memo.body, CACHE_OK);
  if (now - failedAt < 60_000) return json(502, { configured: true, error: "upstream" }, "no-store");

  try {
    const { quotes, errors } = await fetchQuotes(apiKey, AbortSignal.timeout(8000));
    if (quotes.length === 0) {
      failedAt = now;
      return json(502, { configured: true, error: "upstream", errors }, "no-store");
    }
    const payload: QuotesPayload = {
      configured: true,
      source: "twelvedata",
      asOf: new Date(now).toISOString(),
      quotes,
      ...(errors.length ? { errors } : {}),
    };
    memo = { body: JSON.stringify(payload), at: now };
    return json(200, memo.body, CACHE_OK);
  } catch (e) {
    failedAt = now;
    return json(502, { configured: true, error: "upstream", detail: String((e as Error).message ?? e).slice(0, 200) }, "no-store");
  }
}
