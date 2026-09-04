import { useEffect, useState } from "react";
import type { SeriesPayload, SeriesRange } from "@/lib/series";

export interface SeriesState {
  status: "loading" | "ready" | "unavailable";
  data: SeriesPayload | null;
}

/** Fetches /api/series for one symbol and range. Cached by the CDN for 15 minutes. */
export function useSeries(symbol: string, range: SeriesRange): SeriesState {
  const [state, setState] = useState<SeriesState>({ status: "loading", data: null });

  useEffect(() => {
    const controller = new AbortController();
    setState((s) => ({ status: "loading", data: s.data }));
    fetch(`/api/series?symbol=${encodeURIComponent(symbol)}&range=${range}`, { signal: controller.signal, headers: { accept: "application/json" } })
      .then(async (res) => {
        const body = (await res.json()) as Partial<SeriesPayload> & { configured?: boolean };
        if (res.ok && body.configured && Array.isArray(body.points) && body.points.length > 1) {
          setState({ status: "ready", data: body as SeriesPayload });
        } else {
          setState({ status: "unavailable", data: null });
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: "unavailable", data: null });
      });
    return () => controller.abort();
  }, [symbol, range]);

  return state;
}
