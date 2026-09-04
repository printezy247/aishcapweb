import { useTranslation } from "react-i18next";
import { SITE } from "@/config/site";

/**
 * Inline Introducing Broker disclosure. Must sit adjacent to every broker
 * referral link on the site — never only on the legal page.
 */
export function AffiliateDisclosure({ className = "" }: { className?: string }) {
  const { t } = useTranslation();
  return (
    <div
      role="note"
      aria-label={t("affiliate.disclosureLabel")}
      className={`rounded-card border hairline bg-navy-midnight px-4 py-3 text-legal text-platinum/85 ${className}`}
    >
      <p className="mb-1 text-label font-semibold text-platinum">{t("affiliate.disclosureLabel")}</p>
      <p>{t("affiliate.inline", { broker: SITE.brokerName })}</p>
    </div>
  );
}

/**
 * A broker referral link, which always renders with the disclosure beside it.
 * The two cannot be separated: that is the point of this component.
 */
export function BrokerLink() {
  const { t } = useTranslation();
  const url = SITE.brokerReferralUrl;
  const isReal = /^https?:/.test(url);
  return (
    <div className="max-w-prose">
      {isReal ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex min-h-[48px] items-center rounded-card border border-slate/60 px-5 font-semibold text-platinum no-underline hover:border-platinum"
        >
          {t("affiliate.linkLabel", { broker: SITE.brokerName })}
        </a>
      ) : (
        <p className="text-slate">{t("pages.howItWorks.brokerBody")}</p>
      )}
      <AffiliateDisclosure className="mt-4" />
    </div>
  );
}
