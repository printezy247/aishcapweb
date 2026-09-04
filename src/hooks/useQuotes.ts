import { useEffect, useRef, useState } from "react";
import type { Quote, QuotesPayload } from "@/lib/quotes";

const REFRESH_MS = 900_000; // matches the CDN TTL in api/quotes.ts

export type QuotesStatus = "loading" | "ready" | "unavailable";

export interface QuotesState {
  status: QuotesStatus;
  quotes: Quote[];
  asOf: string | null;
}

/**
 * Same-origin fetch of /api/quotes. Polls while the tab is visible; keeps the
 * last good payload (with its own timestamp) if a refresh fails.
 */
export function useQuotes(): QuotesState {
  const [state, setState] = useState<QuotesState>({ status: "loading", quotes: [], asOf: null });
  const lastAt = useRef(0);

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;
    let controller: AbortController | null = null;

    async function load() {
      controller?.abort();
      controller = new AbortController();
      try {
        const res = await fetch("/api/quotes", { signal: controller.signal, headers: { accept: "application/json" } });
        const body = (await res.json()) as Partial<QuotesPayload> & { configured?: boolean };
        if (cancelled) return;
        if (res.ok && body.configured && Array.isArray(body.quotes) && body.quotes.length && body.asOf) {
          lastAt.current = Date.now();
          setState({ status: "ready", quotes: body.quotes, asOf: body.asOf });
        } else {
          setState((s) => (s.status === "ready" ? s : { status: "unavailable", quotes: [], asOf: null }));
        }
      } catch {
        if (!cancelled) setState((s) => (s.status === "ready" ? s : { status: "unavailable", quotes: [], asOf: null }));
      }
    }

    function start() {
      window.clearInterval(timer);
      timer = window.setInterval(load, REFRESH_MS);
    }
    function onVisibility() {
      if (document.hidden) {
        window.clearInterval(timer);
      } else {
        if (Date.now() - lastAt.current > REFRESH_MS) void load();
        start();
      }
    }

    void load();
    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelled = true;
      controller?.abort();
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return state;
}
