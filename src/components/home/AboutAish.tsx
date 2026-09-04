import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/Reveal";
import { Portrait } from "@/components/Portrait";
import { useLocale } from "@/hooks/useLocale";
import { formatMoney } from "@/lib/format";
import { CT1 } from "@/config/track-record";

interface Fact {
  value: string;
  label: string;
}

export function AboutBlock() {
  const { t } = useTranslation();
  const { locale, href } = useLocale();
  const record = CT1;
  const facts = t("about.facts", { returnObjects: true }) as Fact[];

  return (
    <div className="grid gap-8 md:grid-cols-[260px_minmax(0,1fr)] md:gap-12">
      <Reveal>
        <Portrait size={260} />
      </Reveal>
      <Reveal index={1} className="max-w-prose">
        <p className="text-platinum/90">
          {t("about.body", { start: formatMoney(100, record.currency, locale), total: record.verificationDays })}
        </p>
        <dl className="mt-8 grid grid-cols-3 gap-3">
          {facts.map((f) => (
            <div key={f.label} className="border-t hairline-strong pt-3">
              <dd className="num text-[20px] font-medium text-platinum md:text-[24px]">{f.value}</dd>
              <dt className="mt-1 text-label text-slate">{f.label}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-6">
          <Link to={href("/about")} className="text-platinum">
            {t("about.readMore")}
          </Link>
        </p>
      </Reveal>
    </div>
  );
}
