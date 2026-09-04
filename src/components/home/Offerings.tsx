import { useTranslation } from "react-i18next";
import { Section } from "@/components/layout/Section";
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

/** Order matches offerings.items in the locale files. */
const ACCESS: Array<{ url: string; gated: boolean }> = [
  { url: SITE.links.publicChannel, gated: false },
  { url: SITE.links.tiktok, gated: false },
  { url: SITE.links.community, gated: true },
  { url: SITE.links.privateRoom, gated: true },
];

/**
 * Where Aish shows his work beyond copy trading. Gated items state the broker
 * requirement in plain words and share one commission disclosure directly
 * beneath them; nothing here claims results.
 */
export function Offerings() {
  const { t } = useTranslation();
  const items = t("offerings.items", { returnObjects: true }) as Item[];
  const noteId = "offerings-gated-note";

  return (
    <Section id="offerings" eyebrow={t("offerings.eyebrow")} heading={t("offerings.heading")} intro={t("offerings.intro")}>
      <ul className="grid gap-4 md:grid-cols-2 md:gap-6">
        {items.map((item, i) => {
          const access = ACCESS[i];
          const { href, isPlaceholder } = resolveLink(access.url);
          return (
            <Reveal
              key={item.title}
              as="li"
              index={i}
              className={cn("metal-card relative flex flex-col rounded-lg p-6 md:p-8", access.gated && "overflow-hidden")}
            >
              {access.gated && <span aria-hidden="true" className="gold-bar absolute inset-x-0 top-0 h-[2px]" />}
              <div className="flex items-start justify-between gap-3">
                <p className="text-label text-slate">{item.platform}</p>
                <span
                  className={cn(
                    "shrink-0 whitespace-nowrap rounded-full border px-2.5 py-1 text-[12px] font-semibold leading-none",
                    access.gated ? "border-gold/50 text-gold" : "hairline-strong text-slate",
                  )}
                >
                  {access.gated ? t("offerings.gated") : t("offerings.free")}
                </span>
              </div>
              <h3 className="mt-3 text-[17px] font-semibold">{item.title}</h3>
              <p className="mt-2 max-w-prose flex-1 text-platinum/80" aria-describedby={access.gated ? noteId : undefined}>
                {item.body}
              </p>
              <div className="mt-6">
                <ButtonLink to={href} variant="secondary" data-track="offering_click" data-location={`offering-${i}`}>
                  {isPlaceholder ? t("offerings.askAdmin") : t("offerings.open")}
                </ButtonLink>
              </div>
            </Reveal>
          );
        })}
      </ul>

      {/* One disclosure for the two gated cards, directly beneath them. */}
      <Reveal index={4} className="mt-6">
        <p id={noteId} className="mb-3 max-w-prose text-legal text-platinum/85">
          {t("offerings.gatedNote")}
        </p>
        <AffiliateDisclosure />
      </Reveal>
    </Section>
  );
}
