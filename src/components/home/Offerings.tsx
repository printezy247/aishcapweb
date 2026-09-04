import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui/button";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { SITE, resolveLink } from "@/config/site";
import { cn } from "@/lib/utils";

interface Item {
  title: string;
  body: string;
  platform: string;
}

/** Order matches offerings.items in the locale files. Bento spans: wide, narrow, narrow, wide. */
const ACCESS: Array<{ url: string; gated: boolean; span: string }> = [
  { url: SITE.links.publicChannel, gated: false, span: "md:col-span-2" },
  { url: SITE.links.tiktok, gated: false, span: "md:col-span-1" },
  { url: SITE.links.community, gated: true, span: "md:col-span-1" },
  { url: SITE.links.privateRoom, gated: true, span: "md:col-span-2" },
];

/**
 * Where Aish shows his work beyond copy trading. Gated items state the broker
 * requirement in plain words and share one commission disclosure directly
 * beneath them; nothing here claims results.
 */
export function OfferingsBlock() {
  const { t } = useTranslation();
  const items = t("offerings.items", { returnObjects: true }) as Item[];
  const noteId = "offerings-gated-note";

  return (
    <div>
      <Reveal>
        <h3 className="wdth-semi text-[24px] font-semibold leading-tight md:text-[28px]">{t("offerings.heading")}</h3>
        <p className="mt-2 max-w-prose text-platinum/80">{t("offerings.intro")}</p>
      </Reveal>
      <ul className="mt-6 grid gap-4 md:grid-cols-3 md:gap-5">
        {items.map((item, i) => {
          const access = ACCESS[i];
          const { href, isPlaceholder } = resolveLink(access.url);
          return (
            <Reveal key={item.title} as="li" index={i} className={cn("metal-card relative flex flex-col rounded-lg p-6", access.span, access.gated && "overflow-hidden")}>
              {access.gated && <span aria-hidden="true" className="gold-bar absolute inset-x-0 top-0 h-[2px]" />}
              <div className="flex items-start justify-between gap-3">
                <p className="text-label text-slate">{item.platform}</p>
                <span className={cn("shrink-0 whitespace-nowrap rounded-full border px-2.5 py-1 text-[12px] font-semibold leading-none", access.gated ? "border-gold/50 text-gold" : "hairline-strong text-slate")}>
                  {access.gated ? t("offerings.gated") : t("offerings.free")}
                </span>
              </div>
              <h4 className="mt-3 text-[17px] font-semibold">{item.title}</h4>
              <p className="mt-2 max-w-prose flex-1 text-platinum/80" aria-describedby={access.gated ? noteId : undefined}>
                {item.body}
              </p>
              <div className="mt-5">
                <ButtonLink to={href} variant="secondary" data-track="offering_click" data-location={`offering-${i}`}>
                  {isPlaceholder ? t("offerings.askAdmin") : t("offerings.open")}
                </ButtonLink>
              </div>
            </Reveal>
          );
        })}
      </ul>
      <Reveal index={4} className="mt-6">
        <p id={noteId} className="mb-3 max-w-prose text-legal text-platinum/85">{t("offerings.gatedNote")}</p>
        <AffiliateDisclosure />
      </Reveal>
    </div>
  );
}
