# Aish Capital website — project guide

Bilingual (EN/MS) marketing site for a Malaysian copy-trading education brand.
React 18 + Vite + TypeScript + Tailwind 3.4, react-i18next, react-router,
Vercel (static + one serverless function). Live: https://aishweb-ezy-ai.vercel.app

## Commands
- `npm run dev` — Vite with `/api/quotes` served by a dev middleware
- `npm run build` — typecheck (app + api) and build; must pass before any push
- `npm run check:copy` — forbidden-phrase guard; must pass before any push
- `npm run brand:assets` — regenerate logo, photos, OG image, icons from `/brand`

## Hard rules (compliance, do not relax)
- The hero card renders every field of `src/config/track-record.ts`. No props that hide a field.
- Every figure is date-stamped. Never estimate; figures come from the broker dashboard.
- Forbidden words are enforced by `scripts/check-copy.mjs` (incl. "signals", "profitable", "winning").
- Bull/bear colours only on signed numbers. Gold is brand + one primary button per viewport.
- No testimonials without consent on file; no countdowns, popups, chat widgets, marketing pixels.
- IB commission disclosure renders beside every broker-gated link (`AffiliateDisclosure`).
- Licensing statements live only on `/legal/*` (client decision, 2026-09-04).
- Car photographs in `/brand/reference` are never copied into `public/`.

## Where things are
- Copy: `src/locales/en.json`, `src/locales/ms.json` (keep keys identical)
- Figures the admin edits: `src/config/track-record.ts`, `src/config/community.ts`
- Placeholders to fill: `[BROKER]`, `[BROKER_REFERRAL_URL]`, channel links in `src/config/site.ts`
- Feature switches: `SITE.features.emailSignup` (off until a sending domain + Supabase exist; see README)
- Learn posts (explainers + weekly breakdown): `src/content/posts.ts`; weekly format in `docs/weekly-breakdown.md`
- Product page `/copy-trading`: `src/pages/CopyTrading.tsx` + `src/components/product/*`; its sub-nav carries the page's only gold button
- Quotes: `src/content/testimonials.ts`; procedure in `docs/testimonial-collection.md`
- Roadmap: `docs/improvement-roadmap.md`; repos: `docs/reference-repos.md`
- Prices API: `api/quotes.ts` (Twelve Data, key `QUOTES_API_KEY` on Vercel)

## Workflow
Branch → build + check:copy → headless render at 390/1280 in en + ms →
commit → PR → merge (client has authorised auto-merge) → Vercel deploys main.
