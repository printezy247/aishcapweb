export interface SeriesPoint {
  /** Unix seconds, UTC. */
  t: number;
  /** Close price. */
  c: number;
}

export type SeriesRange = "1d" | "1w" | "1m";

export interface SeriesPayload {
  configured: true;
  source: string;
  symbol: string;
  range: SeriesRange;
  interval: string;
  asOf: string;
  points: SeriesPoint[];
}
