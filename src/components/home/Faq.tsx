import { useTranslation } from "react-i18next";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLocale } from "@/hooks/useLocale";
import { formatDate, formatMoney } from "@/lib/format";
import { trackRecordSource } from "@/lib/track-record-source";

interface Item {
  q: string;
  a: string;
}

export function Faq() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const record = trackRecordSource.getTrackRecord();
  const items = t("faq.items", {
    returnObjects: true,
    openedAt: formatDate(record.openedAt, locale),
    start: formatMoney(100, record.currency, locale),
    total: record.verificationDays,
  }) as Item[];

  return (
    <Section id="faq" eyebrow={t("faq.eyebrow")} heading={t("faq.heading")}>
      <Accordion type="single" collapsible className="grid max-w-[760px] gap-3">
        {items.map((item, i) => (
          <Reveal key={item.q} index={i}>
            <AccordionItem value={`faq-${i}`} className="metal-card rounded-lg border-0 px-5 md:px-6">
              {/* AccordionTrigger already sits inside a Radix <h3> header. */}
              <AccordionTrigger className="text-[16px] md:text-[17px]">{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          </Reveal>
        ))}
      </Accordion>
    </Section>
  );
}
