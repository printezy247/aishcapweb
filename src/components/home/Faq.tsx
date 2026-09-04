import { useTranslation } from "react-i18next";
import { Section } from "@/components/layout/Section";
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
    <Section id="faq" heading={t("faq.heading")}>
      <Accordion type="single" collapsible className="max-w-prose border-t hairline">
        {items.map((item, i) => (
          <AccordionItem key={item.q} value={`faq-${i}`}>
            {/* AccordionTrigger already sits inside a Radix <h3> header. */}
            <AccordionTrigger className="text-[17px]">{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
