# Aish Capital — improvement roadmap

Prepared 2026-09-04 from a live audit of the site plus two research passes:
apple.com conversion patterns, investing.com data-brand patterns, and a vetted
shortlist of public GitHub repos for premium dark UI. Sources at the end.

Governing idea, in one line: **Apple owns the page shell, Investing.com owns
the inside of the cards.** Big type, one claim per viewport, one gold button,
generous space outside; dense, aligned, timestamped numbers inside. Gold is
brand and CTA only. Red and green appear only on signed numbers, always with a
sign or arrow. Nothing dense lives outside a card, because a page of tables
reads as a fake broker.

Everything below respects the standing rules: no promised returns, all account
statistics shown together, date-stamps on every figure, no fake urgency, no
third-party scripts on the page without a reason, one gold button per viewport.

---

## Tier 1 — Conversion and trust fundamentals (do first, low risk)

| # | Improvement | Why it matters | Effort |
|---|---|---|---|
| 1.1 | **Social preview cards** **Done (Tier 1).** (Open Graph + Twitter meta, a 1200×630 branded `og-image`, per-page titles/descriptions in EN and MS) | Traffic arrives from Telegram and Instagram. Today a shared link shows a bare URL. A card with the logo, the "Building in public" line and the navy/gold look is the first impression most visitors get. | S |
| 1.2 | **Sticky mobile CTA bar** **Done (Tier 1, re-measured on scroll after the phone bug).** (Apple's 52 px "localnav" pattern): appears once the hero scrolls away; account name left, one gold "Join the Telegram" pill right; the hero's gold button hides while the bar is visible so the one-gold-button rule holds | The conversion action is reachable at any scroll depth. This is the single highest-leverage UX change for a mobile audience. | S |
| 1.3 | **Done (Tier 1).** **Hero claim rewrite**: one big statement, one supporting line, the gold button, then one 13 px risk sentence directly under it ("Trading leveraged products carries a high risk of loss.") | Apple's "one idea per view". The risk line under the CTA is also what regulators look for first. | S |
| 1.4 | **Done (Tier 1).** **Footnote system** (Apple specs pages): every figure that needs a qualifier gets a superscript number linking to a numbered legal block above the footer, with back-links | Keeps the page clean while every qualifier is legally present and one tap away. Lets the visible licence wording stay off the main copy without hiding it. | M |
| 1.5 | **Done (Tier 1).** **Self-host fonts** (`@fontsource-variable/archivo`, `@fontsource/ibm-plex-mono`) with `preload` for the hero weight | Removes two third-party round trips before first paint, works where Google Fonts is blocked, improves LCP on 4G. | S |
| 1.6 | **Image pipeline** **Done (Tier 1, via sharp in `scripts/prepare-brand-assets.mjs`).**: AVIF/WebP via `vite-imagetools`, `fetchpriority="high"` on the hero logo, lazy only below the fold | Faster first paint reads as trustworthy. | S |
| 1.7 | **Privacy-safe analytics with goals** **Done (Tier 1, Vercel Web Analytics; Plausible option removed 2026-09-04).** (Vercel Web Analytics or Plausible, cookieless): events for Telegram clicks, language switch, FAQ opens, ticker visible | Nothing about conversion can be improved without measuring it. No pixels, no consent banner needed. | S |
| 1.8 | **Done (Tier 1).** **SEO plumbing**: `hreflang` en/ms + canonical, `sitemap.xml`, per-page meta, `Organization` JSON-LD, `apple-touch-icon` and a web manifest | Cheap credibility; also fixes link previews on iOS. | S |
| 1.9 | **Done (Tier 1).** **Security headers** in `vercel.json` (HSTS, CSP allowing only self, Google Fonts until 1.5 lands, and the API route; `X-Content-Type-Options`; `Referrer-Policy`) | Free A+ on securityheaders.com, and it's what a due-diligence check looks at. | S |

## Tier 2 — The trading-brand data layer (investing.com feel, kept honest)

| # | Improvement | Why it matters | Effort |
|---|---|---|---|
| 2.1 | **Account card as a quote header** **Done (Tier 2).**: add "Currency in USD", "Data as of HH:MM MYT · source: broker dashboard", and a **tick flash** (green/red fade) on equity only when a real update lands | The card already carries every field. These three cues are what make investing.com's quote header feel live rather than screenshot-like. | S |
| 2.2 | **Done (Tier 2).** **XAU/USD headline chart with timeframe tabs** (1D / 1W / 1M) using TradingView `lightweight-charts` (Apache-2.0, ~35 KB, lazy-loaded below the fold, `attributionLogo` on) fed by Twelve Data `time_series` through the existing `/api` route with 15-minute caching | Aish trades gold; a real gold chart is the most on-brand "trading" element possible, and it is market data, not performance data, so it carries no cherry-picking risk. | M |
| 2.3 | **Market overview strip** **Skipped 2026-09-04: five sparklines every 15 min would double the Twelve Data credit use; the gold chart covers XAU/USD.** replacing or complementing the marquee: 3–5 rows (XAU/USD first) with price, signed change with arrow, a grey hand-rolled SVG sparkline, and the "Indicative · delayed · as of" label | Five instruments signal editorial judgment; fifty signal a fake broker. Keep it small. | S |
| 2.4 | **High-impact events this week** **Done 2026-09-04 (`api/events.ts`, `Events.tsx` under the gold chart).** (max 3) from the official Forex Factory weekly JSON feed, cached server-side, times converted to MYT, 3-dot impact glyphs | Useful to a gold trader (NFP, CPI, FOMC), reads as a data brand, no scraping. Deferred earlier; still worth doing. | M |
| 2.5 | **Done (Tier 2).** **Semantic colours, desaturated**: keep bull/bear tokens but soften 20–40 % on dark (TradingView uses #26A69A / #EF5350); always pair colour with a sign or ▲▼ | Pure #2ECC71/#E74C3C glare on navy; desaturated reads premium and stays colour-blind safe. Needs your OK because the brief fixed the values. | S |
| 2.6 | **Equity sparkline inside the account card** once the Phase 2 verified feed exists (Myfxbook/FXBlue) | Only with the full stat set beside it, and only with real history; today there is one trade, so it waits. | M (Phase 2) |

## Tier 3 — Apple-grade shell, type and motion

| # | Improvement | Why it matters | Effort |
|---|---|---|---|
| 3.1 | **Darker surface ladder** **Done (Tier 3).** (Linear's method): canvas `#020814`, then four lifts (#050D1F, #081733, #0C1E42, #12294F) with hairline borders instead of shadows; sections separate by lift, not by gaps | You asked for darker blue; this is how to do it without everything turning black. The dark canvas becomes the whitespace. | S |
| 3.2 | **Done (Tier 3).** **Fluid type scale**: hero `clamp(2.75rem, 6vw, 5rem)` weight 600–700, negative tracking −0.02 to −0.03 em on display sizes, body 17 px, legal 12–13 px | Apple's hierarchy: one dominant size per viewport, body large enough to be read. | S |
| 3.3 | **Done (Tier 3).** **Section diet**: ten home sections become six chapters, one claim each: Hero → Gold chart + prices → How it works → Proof (community + quotes) → Where to find Aish → Join / FAQ | Apple's homepage is a stack of full-height panels with one message each. Fewer, bigger moments convert better than more, smaller ones. | M |
| 3.4 | **Done (Tier 3).** **One pinned scroll sequence** on desktop for "How it works" (three steps reveal while the account card stays pinned), using CSS scroll-driven animations with a `@supports` fallback, or GSAP ScrollTrigger (now free) lazy-loaded; static under reduced motion | The one "Apple moment" the site earns. Once only. Never on mobile data. | M |
| 3.5 | **Done (Tier 3).** **Animated numbers** with `@number-flow/react` (~7 KB, React 18) for the card and the community count | Odometer-style ticks feel like a terminal, and it's accessible. | S |
| 3.6 | **Done (Tier 3).** **Comparison table**: "Copy trading with AishCopytrade" vs "Trading it yourself" vs "Handing money to someone" — who holds the money, who executes, fees, can you stop, what you see | Apple's compare pages reduce decision anxiety. Also the clearest way to say "we never hold your money" without a disclaimer tone. Never use the word "fund" for the third column. | M |
| 3.7 | **Done (Tier 3).** **Micro-interactions**: `backdrop-filter: saturate(180%) blur(20px)` on the sticky bars, `scale(0.96)` on button press, Magic UI border-beam or shine on the primary card only | Cheap premium cues; zero JS. | S |
| 3.8 | **Done (Tier 3).** **Zero-JS borrows** from Magic UI / Tailark: bento layout for "Where to find Aish", shine-border for the hero card, marquee already in place | Premium texture without touching the bundle budget. | S |

## Tier 4 — Structure and pages (after the flow is decided)

| # | Improvement | Why it matters | Effort |
|---|---|---|---|
| 4.1 | **/copy-trading product page** in Apple product-page form: sticky sub-nav "Overview · Performance · How it works · Fees", one gold "Start" pill. **Done 2026-09-04.** The "Start" pill goes to the admin's Telegram until 4.2 exists; the header and mobile bar drop their gold button on this route. | Makes copy trading the product, not a section. The home page becomes the brand page. | L |
| 4.2 | **/start onboarding path** matching the final IB flow (open account → fund → message admin → connect) with the disclosure inline at the broker step | Waits on the broker and the reworked join flow. | M |
| 4.3 | **Learn hub with real articles** (weekly AishCopytrade breakdown republished, "how copy trading actually executes", "what leverage does at 1:1000"). **Started 2026-09-04:** both explainers published in EN + MS at `/learn/{slug}`; the weekly kind, format and procedure are in `docs/weekly-breakdown.md`. Weekly posts are added by the admin from real channel posts, never invented. | Content is the only sustainable trust engine once the "why the numbers are small" section is gone. | ongoing |
| 4.4 | **FAQ revision** once the flow is final (your note) | | S |
| 4.5 | **Email sign-up switched on** (`SITE.features.emailSignup`). Needs, in order: a custom domain with the sender's DNS verified (Resend free tier), a Supabase project with `supabase/migrations` applied and `send-confirmation` wired as a database webhook, then `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` on Vercel and a redeploy. Hidden on 2026-09-04 because no domain exists yet. | Nothing can send from a vercel.app address; a form that cannot work reads as neglect. | M |

## Tier 5 — Hygiene

Done 2026-09-04: the "Legal" tab was removed from the header on the client's decision; every `/legal/*` page stays reachable from the footer column, the footer risk warning and the inline risk links. Header tabs got a hover / focus animation (`.nav-link` in `src/index.css`).

Done 2026-09-04: accessibility pass (axe clean on home, product, article, legal and 404; footnote back-links, language toggle names, disclosure landmarks, compare-table header; ticker pauses on focus); Lighthouse budget in GitHub Actions (`.github/workflows/ci.yml`, `lighthouserc.json`: performance ≥ 90, accessibility ≥ 95, script ≤ 450 kB); error boundary (`src/components/ErrorBoundary.tsx`); styled 404; `CLAUDE.md`.

Still open: native Malay review of `ms.json` and the two Learn articles.

Tooling, 2026-09-04: custom Claude Code skills uploaded to the client's claude.ai account (caveman, ponytail + five helpers, humanizer). New cloud sessions pick them up; `/caveman`, `/ponytail`, `/humanizer`.

---

## Vetted GitHub repos (checked 2026-09-04)

Stack constraint: React 18 + Vite + Tailwind 3.4, initial JS budget 150 KB gzip (~113 KB used). Most shadcn-style collections have moved to Tailwind 4 + React 19 + `motion`; copy-paste still works but expect to back-port syntax, and never mount `<motion.div>` in the initial chunk (≥34 KB gzip).

| Repo | Stars | Licence | Borrow | Watch out |
|---|---|---|---|---|
| [magicuidesign/magicui](https://github.com/magicuidesign/magicui) | 22.2k | MIT | Border Beam, Shine Border, Marquee, Bento grid, Number Ticker, grid/dot backgrounds — the CSS-only ones | Animated pieces import `motion/react`; Tailwind 4 syntax |
| [ibelick/motion-primitives](https://github.com/ibelick/motion-primitives) | 6.2k | MIT | InView, AnimatedNumber, Spotlight, GlowEffect, BorderTrail — the most restrained set; React 18 pinned | All need `motion` |
| [tailark/blocks](https://github.com/tailark/blocks) | 2.3k | MIT | Complete marketing sections (hero, stats, features, pricing, FAQ, footer) without an animation dependency | Tailwind 4; some Next `Link`/`Image` |
| [kokonut-labs/kokonutui](https://github.com/kokonut-labs/kokonutui) | 2.1k | MIT | Glass/gradient cards and CTA buttons | React 19 / Tailwind 4 / motion |
| [DavidHDev/react-bits](https://github.com/DavidHDev/react-bits) | 46.8k | MIT + Commons Clause | CSS variants of Spotlight Card, Shiny Text, Count Up, Gradient Text; Vite-native | Many components pull gsap/three (100 KB+); licence forbids reselling components |
| [cosscom/coss](https://github.com/cosscom/coss) (was Origin UI) | 10.5k | Mixed: MIT only in `apps/origin` and `apps/ui`, AGPL elsewhere | Dense inputs/tables for a performance table | Copy only from the MIT folders |
| [barvian/number-flow](https://github.com/barvian/number-flow) | 7.7k | MIT | `@number-flow/react` animated numbers, ~7 KB | none |
| [motiondivision/motion](https://github.com/motiondivision/motion) | 33.5k | MIT | `motion/mini` `animate()` (~2.5 KB) + `inView()` for reveals | Full `<motion.*>` ≥34 KB |
| [greensock/GSAP](https://github.com/greensock/GSAP) | 28.2k | Free for commercial use since 3.13 (not OSI) | ScrollTrigger pin for the one scroll sequence, lazy-loaded | ~23 KB core + plugin; load only on that section |
| [tradingview/lightweight-charts](https://github.com/tradingview/lightweight-charts) | 17.2k | Apache-2.0 + attribution | The gold chart (2.2); ~35 KB, lazy | Must show TradingView attribution (`attributionLogo`) |
| [flackr/scroll-timeline](https://github.com/flackr/scroll-timeline) | 1.2k | Apache-2.0 | Polyfill for CSS scroll-driven animations | Treat as optional; use `@supports` |
| [d3/d3-hierarchy](https://github.com/d3/d3-hierarchy) | 1.3k | ISC | Only if a heatmap is ever wanted | Probably never; heatmaps read as fake broker |
| [shadcnstore/shadcn-dashboard-landing-template](https://github.com/shadcnstore/shadcn-dashboard-landing-template) | 1.1k | MIT | Vite variant; section structure and theme tokens | Young repo |
| [cruip/open-react-template](https://github.com/cruip/open-react-template) | 4.7k | **GPL** | Layout rhythm as a reference only | Do not copy code into this site |
| Aceternity UI | n/a | unclear | Visual vocabulary only (spotlight, beams) | No public source repo; flashiest effects use three.js |

Avoid: Tremor/Recharts (too heavy for a marketing bundle), `react-sparklines` (unmaintained), Lenis smooth scroll (scroll hijacking reads "agency", not "bank"), any GPL/AGPL code, three.js backgrounds.

## Fake-broker tells to keep avoiding

Guaranteed or "consistent" returns; wins-only history; demo or backtest shown as live; countdowns and scarcity; "real-time" claims that can't be substantiated; unverifiable regulation claims; lifestyle imagery; a ticker of markets you don't offer; full market tables and watchlists; missing entity details. (CFTC fraud-site checklist; SC Malaysia CFD guidelines.)

## Suggested order

1. Tier 1 in one PR (a day): previews, sticky bar, hero claim, footnotes, fonts, images, analytics, SEO, headers.
2. Tier 2.1–2.3 (the gold chart and the honest data cues) once the Twelve Data key is in place.
3. Tier 3.1–3.3 and 3.7–3.8 together as the "Apple shell" pass, then 3.4 as its own PR.
4. Tier 4 after the broker and join flow are final.

## Sources

Design analyses: Apple DESIGN.md (VoltAgent/awesome-design-md), Linear DESIGN.md (same repo), Plerdy Apple homepage review, Webflow Apple homepage history, Econsultancy sticky elements, CSS-Tricks scroll animation, web.dev LCP, Smashing AVIF/WebP, DebugBear third-party scripts, Utsubo fintech trust patterns, Veza fintech trends, Porto Rocha Robinhood, Awwwards Jeton, Bloomberg UX colour accessibility, Ron Design Lab TradingView, Robleto "Designing trust in financial products", 925 Studios Stripe dashboard, TradingView theme docs, Investing.com risk warning and economic-calendar academy pages, SoFi real-time vs delayed, CFTC "10 signs of a fraudulent site", SC Malaysia CFD guidelines. Repos: as linked in the table above, each verified on GitHub on 2026-09-04.
