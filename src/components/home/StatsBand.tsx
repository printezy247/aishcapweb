import { useTranslation } from "react-i18next";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/Reveal";
import { Fn } from "@/components/Footnotes";
import { Num } from "@/components/Num";
import { COMMUNITY } from "@/config/community";
import { CT1 } from "@/config/track-record";
import { useLocale } from "@/hooks/useLocale";
import { formatDate } from "@/lib/format";
import { verificationDay } from "@/lib/track-record";

/**
 * Four facts under the hero. Every number comes from config; the two that
 * need it carry their footnote and date. Nothing here is a result.
 */
export function StatsBand() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const day = verificationDay(CT1);
  const items = [
    { value: day, suffix: ` / ${CT1.verificationDays}`, caption: t("band.day", { total: CT1.verificationDays }) },
    { value: COMMUNITY.members, caption: t("band.members", { group: COMMUNITY.groupName, date: formatDate(COMMUNITY.lastCounted, locale) }), fn: 3 },
    { value: CT1.performanceFee, suffix: "%", caption: t("band.fee"), fn: 2 },
    { value: 6, caption: t("band.years") },
  ];
  return (
    <section aria-label={t("band.aria")} className="border-b hairline bg-navy-abyss">
      <Container>
        <ul className="grid grid-cols-2 gap-y-6 py-8 md:grid-cols-4 md:py-10">
          {items.map((it, i) => (
            <Reveal key={it.caption} as="li" index={i} className="px-2 md:border-l md:hairline md:px-6 md:first:border-l-0 md:first:pl-0">
              <p className="num text-[30px] font-medium leading-none text-platinum md:text-[36px]">
                <Num value={it.value} />
                {it.suffix && <span className="text-[18px] text-slate md:text-[20px]">{it.suffix}</span>}
              </p>
              <p className="mt-2 text-label text-slate">
                {it.caption}
                {it.fn && <Fn n={it.fn} />}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
