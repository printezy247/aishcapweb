// Vercel serverless function: GET /api/quotes
//
// Indicative market prices for the ticker. Server-side only: the provider key
// never reaches the browser. Cached at the CDN for TTL_S seconds and memoised
// in the function instance so the free tier is never exceeded.
//
// Env: QUOTES_API_KEY (required), QUOTES_PROVIDER (twelvedata | finnhub).
// Without a key this returns 503 {configured:false}; the site renders no
// ticker at all. Prices are never fabricated.

import type { QuotesPayload, QuotesUnavailable } from "../src/lib/quotes";
import { SYMBOLS } from "./_lib/symbols";
import { providers, type ProviderName } from "./_lib/providers";

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

export async function GET(): Promise<Response> {
  const apiKey = process.env.QUOTES_API_KEY;
  if (!apiKey) return json(503, { configured: false } satisfies QuotesUnavailable, "no-store");

  const name = (process.env.QUOTES_PROVIDER ?? "twelvedata") as ProviderName;
  const provider = providers[name];
  if (!provider) {
    return json(503, { configured: false, error: "unknown provider" } satisfies QuotesUnavailable, "no-store");
  }

  const now = Date.now();
  if (memo && now - memo.at < TTL_S * 1000) return json(200, memo.body, CACHE_OK);
  if (now - failedAt < 60_000) return json(502, { configured: true, error: "upstream" }, "no-store");

  try {
    const { quotes, errors } = await provider.fetchQuotes(SYMBOLS, apiKey, AbortSignal.timeout(8000));
    if (quotes.length === 0) {
      failedAt = now;
      return json(502, { configured: true, error: "upstream", errors }, "no-store");
    }
    const payload: QuotesPayload = {
      configured: true,
      source: provider.name,
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
