# Reference repos for future builds

Verified on GitHub 2026-09-04. Stack here is React 18 + Vite + Tailwind 3.4,
initial JS budget 150 KB gzip. Rule of thumb: prefer CSS-only borrows; never
mount `<motion.div>` in the initial chunk (≥34 KB gzip); lazy-load anything
heavy behind the section that needs it.

## Use freely (MIT / Apache)

| Repo | What to take | How to use here |
| --- | --- | --- |
| [magicuidesign/magicui](https://github.com/magicuidesign/magicui) | Border Beam, Shine Border, Marquee, Bento grid, Number Ticker, grid/dot backgrounds | Copy the CSS-only pieces; back-port Tailwind 4 syntax to `tailwind.config.ts` |
| [ibelick/motion-primitives](https://github.com/ibelick/motion-primitives) | InView, AnimatedNumber, Spotlight, GlowEffect, BorderTrail | Needs `motion`; lazy-load the section |
| [tailark/blocks](https://github.com/tailark/blocks) | Full marketing sections (hero, stats, features, pricing, FAQ, footer) with no animation dependency | Best source of section layouts |
| [kokonut-labs/kokonutui](https://github.com/kokonut-labs/kokonutui) | Glass/gradient cards and CTA buttons | React 19 / Tailwind 4 source; port by hand |
| [barvian/number-flow](https://github.com/barvian/number-flow) | `@number-flow/react`, ~7 KB, accessible odometer numbers | Drop-in for the card values and the community count |
| [motiondivision/motion](https://github.com/motiondivision/motion) | `motion/mini` `animate()` (~2.5 KB) and `inView()` | Reveals without framer-motion |
| [tradingview/lightweight-charts](https://github.com/tradingview/lightweight-charts) | The XAU/USD chart (Tier 2) | Lazy-load; keep `attributionLogo` on (Apache-2.0 + attribution) |
| [shadcnstore/shadcn-dashboard-landing-template](https://github.com/shadcnstore/shadcn-dashboard-landing-template) | Vite variant; theme tokens, section structure | Reference |
| [flackr/scroll-timeline](https://github.com/flackr/scroll-timeline) | Polyfill for CSS scroll-driven animations | Optional; gate with `@supports` |
| [d3/d3-hierarchy](https://github.com/d3/d3-hierarchy) | Treemap layout | Only if a heatmap is ever wanted (probably never) |

## Use with care

| Repo | Licence | Note |
| --- | --- | --- |
| [greensock/GSAP](https://github.com/greensock/GSAP) | Free for commercial use since 3.13, not OSI | ScrollTrigger for the one pinned sequence; lazy-load (~23 KB + plugin) |
| [DavidHDev/react-bits](https://github.com/DavidHDev/react-bits) | MIT + Commons Clause | Use CSS variants only; many pieces pull gsap/three; cannot resell components |
| [cosscom/coss](https://github.com/cosscom/coss) (Origin UI) | MIT only in `apps/origin` and `apps/ui`, AGPL elsewhere | Copy only from the MIT folders |

## Do not copy code from

[cruip/open-react-template](https://github.com/cruip/open-react-template) and [cruip/tailwind-landing-page-template](https://github.com/cruip/tailwind-landing-page-template) (GPL); Aceternity UI (no public source, three.js effects); Tremor/Recharts (too heavy for a marketing bundle); `react-sparklines` (unmaintained); Lenis smooth scroll (reads "agency", not "bank").

## Design references

Apple DESIGN.md and Linear DESIGN.md in [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md); TradingView theme colours (#131722 bg, #26A69A up, #EF5350 down); Bloomberg UX on colour-blind-safe reds/greens; CFTC "10 signs of a fraudulent site".
