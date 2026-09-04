import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui/button";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { COMMUNITY } from "@/config/community";
import { SITE, resolveLink } from "@/config/site";
import { useLocale } from "@/hooks/useLocale";
import { formatDate } from "@/lib/format";
import { Fn } from "@/components/Footnotes";
import { Num } from "@/components/Num";

/**
 * A statement of fact about the Telegram group: the member count from
 * config, a visible date-stamp, plain copy, one button. No cards, avatars,
 * ratings, screenshots, member names, or any figure other than the count.
 * Access is broker-gated, so the IB disclosure sits directly beneath.
 */
export function CommunityBlock() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const { href, isPlaceholder } = resolveLink(SITE.links.community);

  return (
    <Reveal className="max-w-prose">
      <h3 className="wdth-semi text-[24px] font-semibold leading-tight md:text-[28px]">
        <span className="num"><Num value={COMMUNITY.members} /></span>{" "}
        {t("community.heading", { count: "" }).trim()}
        <Fn n={3} />
      </h3>
      <p className="mt-3 text-label text-slate">{t("community.groupNote", { groupName: COMMUNITY.groupName })}</p>
      <p className="mt-5 text-platinum/90">{t("community.body")}</p>
      <p className="mt-4 text-label text-slate">
        {t("community.counted", { date: "" }).trim()}{" "}
        <time dateTime={COMMUNITY.lastCounted} className="num text-platinum/85">
          {formatDate(COMMUNITY.lastCounted, locale)}
        </time>
      </p>
      <div className="mt-6">
        <ButtonLink to={href} variant="secondary" data-track="community_click" data-location="community">
          {isPlaceholder ? t("offerings.askAdmin") : t("community.join")}
        </ButtonLink>
      </div>
      <AffiliateDisclosure className="mt-6" />
    </Reveal>
  );
}
