/** Track record, read from /src/config/track-record.ts (self-reported). */
export interface TrackRecord {
  accountId: string;
  accountName: string;
  /** ISO date (YYYY-MM-DD) the account was opened. */
  openedAt: string;
  verificationDays: number;
  balance: number;
  equity: number;
  gainPct: number;
  maxDrawdownPct: number;
  closedTrades: number;
  openTrades: number;
  leverage: string;
  performanceFee: number;
  currency: string;
  /** ISO date (YYYY-MM-DD) the figures were last copied from the broker. */
  lastUpdated: string;
}

/** Derived, never hardcoded: whole days since the account was opened. */
export function accountAgeDays(record: TrackRecord, today: Date = new Date()): number {
  return Math.max(0, Math.floor((today.getTime() - Date.parse(record.openedAt)) / 86_400_000));
}

/** Day counter for "Day {n} of {verificationDays}", clamped to the window. */
export function verificationDay(record: TrackRecord, today: Date = new Date()): number {
  return Math.min(accountAgeDays(record, today), record.verificationDays);
}
