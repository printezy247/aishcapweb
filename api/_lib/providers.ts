import type { Quote } from "../../src/lib/quotes";
import type { SymbolSpec } from "./symbols.js";

export interface ProviderResult {
  quotes: Quote[];
  /** Symbols the provider could not price, with the reason. Never substituted. */
  errors: Array<{ symbol: string; reason: string }>;
}

export interface QuoteProvider {
  name: string;
  fetchQuotes(symbols: SymbolSpec[], apiKey: string, signal: AbortSignal): Promise<ProviderResult>;
}

function num(value: unknown, what: string): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) throw new Error(`Non-finite ${what}`);
  return n;
}

/** Twelve Data: one batched request for every symbol. */
const twelvedata: QuoteProvider = {
  name: "twelvedata",
  async fetchQuotes(symbols, apiKey, signal) {
    const list = symbols.map((s) => s.twelvedata).join(",");
    const res = await fetch(`https://api.twelvedata.com/quote?symbol=${encodeURIComponent(list)}&dp=5`, {
      headers: { Authorization: `apikey ${apiKey}` },
      signal,
    });
    if (!res.ok) throw new Error(`twelvedata ${res.status}`);
    const body = (await res.json()) as Record<string, Record<string, unknown>> & { status?: string; message?: string };
    if (body.status === "error") throw new Error(String(body.message ?? "twelvedata error"));

    const result: ProviderResult = { quotes: [], errors: [] };
    for (const s of symbols) {
      // Single-symbol responses are flat; multi-symbol responses are keyed by symbol.
      const q = (symbols.length === 1 ? body : body[s.twelvedata]) as Record<string, unknown> | undefined;
      try {
        if (!q) throw new Error("missing from response");
        if (q.status === "error") throw new Error(String(q.message ?? "provider error"));
        result.quotes.push({
          symbol: s.symbol,
          price: num(q.close, `${s.symbol} price`),
          changePct: num(q.percent_change, `${s.symbol} change`),
          decimals: s.decimals,
          ts: new Date(num(q.timestamp, `${s.symbol} timestamp`) * 1000).toISOString(),
        });
      } catch (e) {
        result.errors.push({ symbol: s.symbol, reason: String((e as Error).message ?? e) });
      }
    }
    return result;
  },
};

/** Finnhub: one request per symbol. */
const finnhub: QuoteProvider = {
  name: "finnhub",
  async fetchQuotes(symbols, apiKey, signal) {
    const result: ProviderResult = { quotes: [], errors: [] };
    await Promise.all(
      symbols.map(async (s) => {
        try {
          const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(s.finnhub)}`, {
            headers: { "X-Finnhub-Token": apiKey },
            signal,
          });
          if (!res.ok) throw new Error(`finnhub ${res.status}`);
          const q = (await res.json()) as Record<string, unknown>;
          result.quotes.push({
            symbol: s.symbol,
            price: num(q.c, `${s.symbol} price`),
            changePct: num(q.dp, `${s.symbol} change`),
            decimals: s.decimals,
            ts: new Date(num(q.t, `${s.symbol} timestamp`) * 1000).toISOString(),
          });
        } catch (e) {
          result.errors.push({ symbol: s.symbol, reason: String((e as Error).message ?? e) });
        }
      }),
    );
    // Keep display order.
    result.quotes.sort((a, b) => symbols.findIndex((x) => x.symbol === a.symbol) - symbols.findIndex((x) => x.symbol === b.symbol));
    return result;
  },
};

export const providers = { twelvedata, finnhub } as const;
export type ProviderName = keyof typeof providers;
