import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/hooks/useLocale";
import { formatDate, formatMoney } from "@/lib/format";
import { CT1 } from "@/config/track-record";

interface Item {
  q: string;
  a: string;
}

export function FaqBlock() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const record = CT1;
  const items = t("faq.items", {
    returnObjects: true,
    openedAt: formatDate(record.openedAt, locale),
    start: formatMoney(100, record.currency, locale),
    total: record.verificationDays,
  }) as Item[];

  return (
    <div id="faq">
      <Reveal>
        <h3 className="wdth-semi text-[24px] font-semibold leading-tight md:text-[28px]">{t("faq.heading")}</h3>
      </Reveal>
      <div className="mt-6 grid max-w-[760px] gap-3">
        {items.map((item, i) => (
          <Reveal key={item.q} index={i}>
            <details className="faq metal-card rounded-lg px-5 md:px-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-[16px] font-semibold text-platinum md:text-[17px]">
                {item.q}
                <svg aria-hidden="true" className="mt-1.5 h-4 w-4 shrink-0 text-gold transition-transform duration-200" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 6l5 5 5-5" />
                </svg>
              </summary>
              <p className="pb-6 pr-8 text-platinum/85">{item.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
