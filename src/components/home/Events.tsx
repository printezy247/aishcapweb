import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/hooks/useLocale";

interface EventRow {
  title: string;
  currency: string;
  at: string;
}

const intl = { en: "en-MY", ms: "ms-MY" } as const;

/**
 * The next high-impact releases this week (max 3), times in Malaysia time.
 * Same-origin /api/events; renders nothing until real rows arrive.
 */
export function Events() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const [events, setEvents] = useState<EventRow[]>([]);

  useEffect(() => {
    const c = new AbortController();
    fetch("/api/events", { signal: c.signal, headers: { accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : null))
      .then((b) => b?.configured && Array.isArray(b.events) && setEvents(b.events))
      .catch(() => {});
    return () => c.abort();
  }, []);

  if (events.length === 0) return null;
  const when = new Intl.DateTimeFormat(intl[locale], { weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kuala_Lumpur" });

  return (
    <Reveal className="mt-6">
      <h3 className="text-label font-semibold text-slate">{t("events.heading")}</h3>
      <ol className="mt-3 grid gap-3 md:grid-cols-3">
        {events.map((e) => (
          <li key={e.at + e.title} className="metal-card flex items-start gap-3 rounded-lg px-4 py-3">
            <span aria-hidden="true" className="mt-[7px] flex shrink-0 gap-0.5">
              <i className="h-1.5 w-1.5 rounded-full bg-bear" />
              <i className="h-1.5 w-1.5 rounded-full bg-bear" />
              <i className="h-1.5 w-1.5 rounded-full bg-bear" />
            </span>
            <span className="min-w-0">
              <span className="num block text-[13px] text-slate">
                <time dateTime={e.at}>{when.format(new Date(e.at))}</time> MYT · {e.currency}
              </span>
              <span className="block text-[15px] text-platinum">{e.title}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-2 text-legal text-slate">{t("events.note")}</p>
    </Reveal>
  );
}
