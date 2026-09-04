/** Shared between the Vercel function (api/quotes.ts) and the client. */
export interface Quote {
  /** Display symbol, e.g. "XAU/USD". */
  symbol: string;
  price: number;
  /** Percentage change on the day, signed. */
  changePct: number;
  decimals: number;
  /** ISO timestamp of the provider's quote. */
  ts: string;
}

export interface QuotesPayload {
  configured: true;
  source: string;
  /** ISO timestamp the payload was assembled. */
  asOf: string;
  quotes: Quote[];
  /** Symbols the provider could not price this round. Diagnostic only. */
  errors?: Array<{ symbol: string; reason: string }>;
}

export interface QuotesUnavailable {
  configured: false;
  error?: string;
}
