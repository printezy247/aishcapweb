# Aish Capital — website (Phase 1)

Bilingual (English / Bahasa Melayu) marketing site for Aish Capital, a Malaysian
copy-trading education and community brand operating as an Introducing Broker.

React 18 · Vite · TypeScript · Tailwind · react-i18next · react-router · Supabase (subscribers only).

## Run

```sh
npm install
npm run dev        # http://localhost:5173 → redirects to /en or /ms
npm run build      # typecheck + production build to dist/
npm run check:copy # fails if any forbidden phrase appears in copy
```

The weekly-email form is behind `SITE.features.emailSignup` in
`src/config/site.ts` (off until a sending domain exists). While it is off the
Join chapter shows a "follow the public channel" block instead. Once on, copy
`.env.example` to `.env` and fill in the Supabase values; without them the form
shows a "not configured" message and points to the Telegram group.

## The one file the admin edits

`src/config/track-record.ts` holds every AishCopytrade figure. Update it weekly from the
broker dashboard, commit, deploy. The hero renders every field in that object;
there is no way to hide one. The day counter and account age are derived from
`openedAt` and are never typed by hand.

## The other file the admin edits

`src/config/community.ts` holds the Telegram group's member count and the date
it was counted, read from the group header. Update it when you update the AishCopytrade
figures. The date renders publicly, so never estimate or round up.

## Learn posts

`src/content/posts.ts` holds every Learn post in both languages: explainers
(evergreen) and the weekly AishCopytrade breakdown republished from the
channel. Each renders at `/learn/{slug}`. The copy checker applies the full
forbidden-phrase list to this file. Format and rules for a weekly post:
[`docs/weekly-breakdown.md`](docs/weekly-breakdown.md).

## Testimonials

`src/content/testimonials.ts` is empty on purpose and the section renders
nothing until it has at least two entries. The publishing rules are in that
file; the collection procedure and the consent messages for the admin are in
[`docs/testimonial-collection.md`](docs/testimonial-collection.md).

## Compliance controls built into the code

- A short risk warning is real text in the footer of every page (`Footer.tsx`), linking to the full disclosure. At the client's request the licensing statement (not licensed by the SC or BNM) appears only on the legal pages, not in the footer, FAQ or About copy.
- The word "signals" is banned by the copy checker (client decision); channels are described as "analysis".
- The IB disclosure renders beside every broker link (`AffiliateDisclosure.tsx`);
  `BrokerLink` cannot render without it.
- All account statistics render together (`TrackRecordCard.tsx`); the component
  accepts the whole record and nothing else.
- Every performance figure is date-stamped from `lastUpdated`.
- `npm run check:copy` rejects the forbidden phrases in both languages.
- Bull/bear colour is applied only to the signed total-gain value.
- No testimonials, logo strips, chart embeds, chat widget, or placeholder posts.
- Analytics: Vercel Web Analytics (cookieless, same-origin; enable once in the Vercel dashboard) with click goals `telegram_click`, `community_click`, `offering_click`, `language_switch`. No pixels.

## Placeholders to replace before launch

Search the repo for square-bracket placeholders. They are deliberate and must
not be guessed:

| Placeholder | Where |
| --- | --- |
| `[BROKER]`, `[BROKER_REFERRAL_URL]` | `src/config/site.ts`, locale files |
| `[PUBLIC_CHANNEL_URL]`, `[COMMUNITY_GROUP_URL]`, `[PRIVATE_ROOM_URL]` | `src/config/site.ts` — until set, the buttons go to the admin's Telegram |

Company registration details are intentionally absent from the footer for now (client decision); add a company block back in `Footer.tsx` when they are confirmed.

Brand assets: masters live in `/brand` (never deployed). Run `npm run brand:assets`
to regenerate `public/images/logo.png` and the two photographs the site uses
(`aish-portrait-*.jpg`, city window; `aish-laptop-*.jpg`, laptop by the window).
The car photographs in `/brand/reference` must never be copied into `public/`.
`brand/reference/ct-dashboard-*.jpg` is the broker screenshot the AishCopytrade figures
were copied from.

Have a native Malay speaker review `src/locales/ms.json` before launch,
especially the compliance strings.

## Localisation

Routes live under `/en/...` and `/ms/...`. The bare `/` redirects using, in
order: stored preference → `window.__COUNTRY === "MY"` (set this from a CDN
country header if your host exposes one) → `Accept-Language` starting with
`ms` → Malaysian time zone → English.

## Email capture (double opt-in)

Off by default (`SITE.features.emailSignup = false`). Before switching it on
you need: a domain with the email provider's DNS records verified (Resend or
similar; a vercel.app address cannot send), a Supabase project, and the two
`VITE_SUPABASE_*` variables on Vercel (Production + Preview) followed by a
redeploy. Then:

1. Apply `supabase/migrations/20260904000000_subscribers.sql`.
2. Deploy `supabase/functions/send-confirmation` and attach it as a Database
   Webhook on `subscribers` INSERT. Set `RESEND_API_KEY`, `SITE_URL`, `FROM_EMAIL`.
3. The form inserts an unconfirmed row; the email links to
   `/{locale}/confirm?token=…`, which calls `confirm_subscription`.
4. Optionally schedule `purge_unconfirmed()` daily (30-day PDPA retention).

## Live market prices (ticker)

`api/quotes.ts` is a Vercel serverless function that fetches XAU/USD, EUR/USD,
GBP/USD, USD/JPY and BTC/USD from Twelve Data (free tier) and caches the result
at the CDN for 15 minutes (~480 of the 800 daily credits). Set `QUOTES_API_KEY`
in the Vercel project's environment variables (Production + Preview). Without a
key the route returns 503 and the site renders no ticker at all. Prices are
labelled indicative and delayed, with a Malaysia-time stamp. No third-party
scripts run on the page.

`api/series.ts` serves the XAU/USD chart history (`?range=1d|1w|1m`, 15-minute
cache, one credit per call) and the chart is TradingView Lightweight Charts
(Apache-2.0, attribution logo kept on), lazy-loaded below the fold.

`npm run dev` serves every `api/*.ts` handler under `/api/` via a Vite
middleware and reads `QUOTES_API_KEY` from `.env`.

## Roadmap

The ranked improvement list, with vetted UI repos and sources, is in
[`docs/improvement-roadmap.md`](docs/improvement-roadmap.md). Repos worth
using for future builds, with licences: [`docs/reference-repos.md`](docs/reference-repos.md).

## Hosting

Static output in `dist/` plus the two functions in `api/`, deployed by Vercel
from `main`. `vercel.json` carries the SPA rewrite and security headers.

## Verified feed later

Every component reads `CT1` from `src/config/track-record.ts`. A verified
source (Myfxbook / FXBlue / broker API) replaces that one import.
