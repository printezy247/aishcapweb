import { useTranslation } from "react-i18next";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/Reveal";
import { Fn } from "@/components/Footnotes";
import { BrokerLink } from "@/components/AffiliateDisclosure";
import type { TrackRecord } from "@/lib/track-record";

interface FeeItem {
  title: string;
  body: string;
  who: string;
}

/**
 * Every cost, and who receives it. The broker link (or its placeholder
 * text) renders with the commission disclosure beside it, as everywhere.
 */
export function Fees({ record }: { record: TrackRecord }) {
  const { t } = useTranslation();
  const items = t("product.fees.items", { returnObjects: true, fee: record.performanceFee }) as FeeItem[];
  const never = t("product.fees.never.items", { returnObjects: true }) as string[];

  return (
    <Section id="fees" eyebrow={t("product.fees.eyebrow")} heading={t("product.fees.heading")} intro={t("product.fees.intro")} className="scroll-mt-28">
      <ol className="grid gap-4 md:grid-cols-3 md:gap-5">
        {items.map((item, i) => (
          <Reveal key={item.title} as="li" index={i} className="metal-card flex flex-col rounded-lg p-6">
            <p className="text-label text-slate">{item.who}</p>
            <h3 className="mt-3 text-[18px] font-semibold leading-snug">
              {item.title}
              {i === 1 && <Fn n={2} />}
            </h3>
            <p className="mt-2 flex-1 text-platinum/80">{item.body}</p>
          </Reveal>
        ))}
      </ol>

      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-14">
        <Reveal>
          <h3 className="wdth-semi text-[24px] font-semibold leading-tight md:text-[28px]">{t("product.fees.never.heading")}</h3>
          <ul className="mt-4 space-y-3 text-platinum/90">
            {never.map((line) => (
              <li key={line} className="flex gap-3 border-t hairline pt-3">
                <span aria-hidden="true" className="mt-[9px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal index={1}>
          <h3 className="wdth-semi text-[24px] font-semibold leading-tight md:text-[28px]">{t("product.fees.brokerHeading")}</h3>
          <div className="mt-4">
            <BrokerLink />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
