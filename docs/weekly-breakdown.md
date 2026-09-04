# Weekly AishCopytrade breakdown — format and republishing

The breakdown is posted in the public channel every Sunday. Each one is then
republished on `/learn` as a post of kind `"weekly"` in `src/content/posts.ts`.
Explainers live in the same file; nothing else is needed for a post to appear
on the Learn page, in the sitemap, and at `/learn/{slug}` in both languages.

## Rules (same as the rest of the site)

- Every figure is copied from the broker dashboard on a stated date. Write
  the date in the post. Never estimate, never round up, never "about".
- Say what happened and why. Never what will happen. No forward-looking
  sentence of any kind, and never a target.
- Losses get the same space and the same tone as gains.
- The forbidden phrases in `scripts/check-copy.mjs` apply to this file.
  Do not write "signals"; write "analysis". Do not write "profit weekly".
- English and Malay must both exist and say the same thing.
- Run `npm run check:copy` and `npm run build` before committing.

## Format

Slug: `weekly-YYYY-MM-DD` (the Sunday it was posted). `date`: the same day.

Sections, in this order, both locales:

1. **What AishCopytrade did this week** — the trades in plain words: what was
   bought or sold, roughly when, and whether they were closed or are still
   open. No prices that are not on the dashboard.
2. **The figures on Sunday** — balance, equity, total gain, max drawdown,
   closed trades, open trades, copied from the dashboard, with the date. If
   `src/config/track-record.ts` was updated the same day, the two must match.
3. **What Aish was watching** — the levels and the reasoning, in the past
   tense. Education, not instructions.
4. **What went wrong, or what changed** — anything that did not go to plan,
   said plainly. If nothing, say nothing; do not pad.

`keyPoints`: three or four one-line facts from sections 1 and 2. No adjectives.

## Adding one

```ts
{
  slug: "weekly-2026-09-07",
  kind: "weekly",
  date: "2026-09-07",
  title: { en: "Week ending 7 September 2026", ms: "Minggu berakhir 7 September 2026" },
  excerpt: { en: "...", ms: "..." },
  keyPoints: { en: ["..."], ms: ["..."] },
  sections: {
    en: [{ title: "What AishCopytrade did this week", body: ["..."] }, /* 2–4 */],
    ms: [{ title: "Apa yang AishCopytrade lakukan minggu ini", body: ["..."] }, /* 2–4 */],
  },
},
```

Insert it at the top of `POSTS` (newest first), then add
`/en/learn/{slug}` and `/ms/learn/{slug}` to `public/sitemap.xml`.
