/** The single symbol list. Order here is display order in the ticker. */
export interface SymbolSpec {
  symbol: string;
  twelvedata: string;
  finnhub: string;
  decimals: number;
}

export const SYMBOLS: SymbolSpec[] = [
  { symbol: "XAU/USD", twelvedata: "XAU/USD", finnhub: "OANDA:XAU_USD", decimals: 2 },
  { symbol: "EUR/USD", twelvedata: "EUR/USD", finnhub: "OANDA:EUR_USD", decimals: 4 },
  { symbol: "GBP/USD", twelvedata: "GBP/USD", finnhub: "OANDA:GBP_USD", decimals: 4 },
  { symbol: "USD/JPY", twelvedata: "USD/JPY", finnhub: "OANDA:USD_JPY", decimals: 3 },
  { symbol: "BTC/USD", twelvedata: "BTC/USD", finnhub: "BINANCE:BTCUSDT", decimals: 0 },
];
