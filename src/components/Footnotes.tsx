import { useTranslation } from "react-i18next";
import { Container } from "@/components/layout/Container";

/** Superscript reference, Apple specs-page style. n is 1-based. */
export function Fn({ n }: { n: number }) {
  const { t } = useTranslation();
  return (
    <sup className="ml-0.5 text-[0.6em] leading-none">
      <a
        data-fnref={n}
        href={`#fn-${n}`}
        aria-label={`${t("footnotes.heading")} ${n}`}
        className="num text-gold no-underline hover:underline"
      >
        {n}
      </a>
    </sup>
  );
}

/** Numbered legal block above the footer. Renders all items in order. */
export function Footnotes() {
  const { t } = useTranslation();
  const items = t("footnotes.items", { returnObjects: true }) as string[];
  return (
    <section id="footnotes" aria-labelledby="footnotes-heading" className="border-t hairline bg-navy-abyss py-10">
      <Container>
        <h2 id="footnotes-heading" className="mb-4 text-label font-semibold text-slate">
          {t("footnotes.heading")}
        </h2>
        <ol className="max-w-prose space-y-2 text-legal text-slate">
          {items.map((text, i) => (
            <li key={i} id={`fn-${i + 1}`} className="flex gap-3 scroll-mt-24">
              <span className="num shrink-0 text-gold">{i + 1}</span>
              <span>
                {text}{" "}
                <a
                  href={`#fn-${i + 1}`}
                  aria-label={t("footnotes.back")}
                  className="text-slate/70 no-underline hover:text-platinum"
                  onClick={(e) => {
                    // The hero card renders once per layout, so pick the visible reference.
                    const target = [...document.querySelectorAll<HTMLElement>(`[data-fnref="${i + 1}"]`)].find(
                      (el) => el.getClientRects().length > 0,
                    );
                    if (target) {
                      e.preventDefault();
                      target.scrollIntoView({ block: "center" });
                      target.focus();
                    }
                  }}
                >
                  ↩
                </a>
              </span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
