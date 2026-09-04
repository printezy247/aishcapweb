// Every field here renders on the public hero. Do not add conditional display
// logic. Update figures only from the broker dashboard, never by estimate.
//
// This file is the single source of truth for the AishCopytrade account card.
// Update it once a week, after the broker dashboard, then commit.

import type { TrackRecord } from "@/lib/track-record";

export const CT1: TrackRecord = {
  accountId: "147053176",
  accountName: "AishCopytrade",
  openedAt: "2026-08-22", // day counter computes from this
  verificationDays: 90,
  balance: 100.67,
  equity: 100.67,
  gainPct: 0.0,
  maxDrawdownPct: 0.0,
  closedTrades: 1,
  openTrades: 0,
  leverage: "1:1000",
  performanceFee: 20,
  currency: "USD",
  lastUpdated: "2026-09-04",
};
