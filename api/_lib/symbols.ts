/** The single symbol list. Order here is display order in the ticker. */
export interface SymbolSpec {
  symbol: string;
  twelvedata: string;
  decimals: number;
}

export const SYMBOLS: SymbolSpec[] = [
  { symbol: "XAU/USD", twelvedata: "XAU/USD", decimals: 2 },
  { symbol: "EUR/USD", twelvedata: "EUR/USD", decimals: 4 },
  { symbol: "GBP/USD", twelvedata: "GBP/USD", decimals: 4 },
  { symbol: "USD/JPY", twelvedata: "USD/JPY", decimals: 3 },
  { symbol: "BTC/USD", twelvedata: "BTC/USD", decimals: 0 },
];
