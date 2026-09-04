// Vercel serverless function: GET /api/events
//
// The next high-impact economic releases this week, from the Forex Factory
// weekly JSON feed. Cached at the CDN for an hour and memoised in the
// instance. On any failure: 503 and the site renders nothing for it.

const FEED = "https://nfs.faireconomy.media/ff_calendar_thisweek.json";
const TTL_S = 3600;
const MAX = 3;

interface FeedRow {
  title?: string;
  country?: string;
  date?: string;
  impact?: string;
}
export interface EventRow {
  title: string;
  /** Currency code as the feed gives it, e.g. USD. */
  currency: string;
  /** ISO timestamp. */
  at: string;
}

let memo: { body: string; at: number } | null = null;
let failedAt = 0;

function json(status: number, body: unknown, cache: string): Response {
  return new Response(typeof body === "string" ? body : JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": cache, "x-robots-tag": "noindex" },
  });
}

export async function GET(): Promise<Response> {
  const now = Date.now();
  if (memo && now - memo.at < TTL_S * 1000) return json(200, memo.body, `public, max-age=0, s-maxage=${TTL_S}`);
  if (now - failedAt < 300_000) return json(503, { configured: false }, "no-store");
  try {
    const res = await fetch(FEED, { signal: AbortSignal.timeout(8000), headers: { accept: "application/json" } });
    if (!res.ok) throw new Error(`feed ${res.status}`);
    const rows = (await res.json()) as FeedRow[];
    if (!Array.isArray(rows)) throw new Error("feed shape");
    const events: EventRow[] = rows
      .filter((r) => r.impact === "High" && r.title && r.country && r.date && !Number.isNaN(Date.parse(r.date)))
      .map((r) => ({ title: String(r.title), currency: String(r.country), at: new Date(r.date as string).toISOString() }))
      .filter((e) => Date.parse(e.at) > now - 3_600_000)
      .sort((a, b) => a.at.localeCompare(b.at))
      .slice(0, MAX);
    memo = { body: JSON.stringify({ configured: true, asOf: new Date(now).toISOString(), events }), at: now };
    return json(200, memo.body, `public, max-age=0, s-maxage=${TTL_S}`);
  } catch (e) {
    failedAt = now;
    return json(503, { configured: false, error: String((e as Error).message ?? e).slice(0, 120) }, "no-store");
  }
}
