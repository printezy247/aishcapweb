# Collecting member quotes for the website

For the admin. This is the fastest honest route to a populated testimonial
section. The section on the site stays invisible until at least two real,
consented quotes are in `src/content/testimonials.ts`.

## Who to ask

Members who have been in the group at least one month and have posted more
than once. Aim for eight requests to get four usable quotes. Ask people across
the group, not only the most enthusiastic. A mild quote reads more credibly
than a glowing one, and a room where everyone raves reads as staged.

## Message to send (Bahasa Melayu, primary)

> Assalamualaikum / Hi [name],
>
> Kami sedang menyiapkan laman web Aish Capital dan ingin memaparkan beberapa
> pendapat jujur daripada ahli kumpulan.
>
> Boleh tak awak tulis 1-2 ayat tentang pengalaman awak dalam kumpulan ini?
> Apa-apa yang jujur, termasuk perkara yang awak rasa boleh diperbaiki. Kami
> tidak mahu pujian sahaja.
>
> Dua perkara penting:
> 1. Tolong jangan sebut sebarang angka keuntungan, pip, atau peratusan. Kami
>    tidak dibenarkan menyiarkannya.
> 2. Kami akan siarkan nama pertama dan negeri sahaja. Contoh: 'Syam, Selangor'.
>
> Kalau setuju, balas dengan ayat awak dan tulis 'Saya bersetuju ia disiarkan
> di laman web'. Awak boleh tarik balik bila-bila masa dan kami akan buang
> serta-merta.
>
> Tiada bayaran atau ganjaran untuk ini. Kami mahu ia jujur.
>
> Terima kasih.

## Message to send (English)

> Hi [name],
>
> We are putting together the Aish Capital website and would like to include
> a few honest comments from group members.
>
> Would you write one or two sentences about your experience in the group?
> Anything honest, including things you think could be better. We are not
> looking for praise only.
>
> Two important things:
> 1. Please do not mention any profit figure, pip count, or percentage. We are
>    not permitted to publish those.
> 2. We will publish first name and state only. For example: 'Syam, Selangor'.
>
> If you are happy for us to use it, reply with your sentences and the words
> 'I consent to this being published on the website'. You can withdraw at any
> time and we will remove it immediately.
>
> There is no payment or reward for this. We want it to be honest.
>
> Thank you.

## Storing consent

Save each consent reply as a screenshot in a folder **outside the repo**,
named `[firstname]-[date].png`. Do not commit these to git. If a member
withdraws, delete the entry from `testimonials.ts` the same day and delete the
screenshot.

## A quote that mentions profit, pips or a percentage

Do not edit it. Reply asking for a version without the figure. Editing
someone's words to make them compliant, then publishing them as their words,
is worse than not publishing.

## The two chat screenshots supplied on 2026-09-04

Neither is publishable as supplied.

- Screenshot A (14:22, "Kau rosak", chart image): member banter, not
  feedback; identifiable handles; reads poorly out of context.
- Screenshot B (14:17, "1000pips", +2.50%, open position): a profit claim on a
  member's own trade. Publishing it makes it Aish Capital's performance claim.
  Not usable in any cropped or paraphrased form.

Do not screenshot, retype, paraphrase, or "inspire" testimonial copy from
either. If Syam wants to give a quote, ask him directly using the message above.

## Client decision, 2026-09-04

The first four quotes were supplied by the client and published as given
(initial surname, trader type, five-star rating, English only) after advice
that this format departs from the rules above and reads like a template.
Consent was confirmed by the client. Any further quotes should follow the
rules above.

## Adding a quote that passes

Each entry needs both languages (ask the member for one; the admin may
translate the other and should say so to the member). Example:

```ts
{
  quote: {
    en: "The group is blunt. When I posted a bad entry, three people told me why.",
    ms: "Kumpulan ini berterus terang. Bila saya siarkan entry yang teruk, tiga orang beritahu sebabnya.",
  },
  name: "Syam",
  role: "Selangor",
  rating: 4,
  memberSince: "2026-05",
  consentOnFile: true,
},
```

Commit the file; the section appears automatically once there are two or
more entries.
