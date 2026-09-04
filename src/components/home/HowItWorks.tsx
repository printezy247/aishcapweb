import { useTranslation } from "react-i18next";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";

interface Step {
  title: string;
  body: string;
}
interface CompareRow {
  label: string;
  copy: string;
  self: string;
  other: string;
}

/**
 * Chapter 3. On desktop the headline stays pinned while the four steps
 * scroll past it, each revealing with a CSS scroll-driven animation
 * (progressive enhancement; static otherwise). Then the comparison table.
 */
export function HowItWorks() {
  const { t } = useTranslation();
  const { href } = useLocale();
  const steps = t("howItWorks.steps", { returnObjects: true }) as Step[];
  const rows = t("compare.rows", { returnObjects: true }) as CompareRow[];
  const cols = t("compare.columns", { returnObjects: true }) as string[];

  return (
    <section id="how-it-works" aria-labelledby="how-it-works-heading" className="scroll-mt-24 border-t hairline bg-navy-abyss py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal className="max-w-prose">
              <p className="eyebrow mb-2">{t("howItWorks.eyebrow")}</p>
              <h2 id="how-it-works-heading" className="text-section">
                {t("howItWorks.heading")}
              </h2>
              <p className="mt-3 text-platinum/80">{t("howItWorks.intro")}</p>
              <div className="mt-6">
                <ButtonLink to={href("/legal/risk")} variant="secondary">
                  {t("buttons.readRisks")}
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <ol className="grid gap-4 lg:gap-6">
            {steps.map((step, i) => (
              <li key={step.title} className="step-in metal-card relative rounded-lg p-6 md:p-8">
                <span aria-hidden="true" className="num block text-[40px] font-medium leading-none text-gold/35 md:text-[48px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 max-w-prose text-[18px] font-semibold md:text-[20px]">{step.title}</h3>
                <p className="mt-2 max-w-prose text-platinum/80">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Comparison: reduces decision anxiety; says "we never hold your money" without a disclaimer tone. */}
        <Reveal className="mt-16 md:mt-24">
          <h3 className="wdth-semi text-[24px] font-semibold leading-tight md:text-[28px]">{t("compare.heading")}</h3>
          <p className="mt-2 max-w-prose text-platinum/80">{t("compare.intro")}</p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-[15px]">
              <thead>
                <tr>
                  <th scope="col" className="w-[22%] border-b hairline-strong pb-3 text-left text-label font-semibold text-slate"></th>
                  {cols.map((c, i) => (
                    <th key={c} scope="col" className={cn("border-b hairline-strong pb-3 pr-4 text-left text-[15px] font-semibold", i === 0 ? "text-gold" : "text-platinum")}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label} className="align-top">
                    <th scope="row" className="border-b hairline py-3 pr-4 text-left text-label font-semibold text-slate">{r.label}</th>
                    <td className="border-b hairline py-3 pr-4 text-platinum">{r.copy}</td>
                    <td className="border-b hairline py-3 pr-4 text-platinum/80">{r.self}</td>
                    <td className="border-b hairline py-3 pr-4 text-platinum/80">{r.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
