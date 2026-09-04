import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/layout/Container";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { SITE } from "@/config/site";
import { useLocale } from "@/hooks/useLocale";

export function Footer() {
  const { t } = useTranslation();
  const { href } = useLocale();
  const year = new Date().getFullYear();

  const legal = [
    { to: href("/legal/risk"), label: t("legalNav.risk") },
    { to: href("/legal/affiliate"), label: t("legalNav.affiliate") },
    { to: href("/legal/terms"), label: t("legalNav.terms") },
    { to: href("/legal/privacy"), label: t("legalNav.privacy") },
  ];

  return (
    <footer className="border-t hairline bg-navy-midnight text-legal text-platinum/85">
      <Container className="py-10 md:py-14">
        {/* The risk warning is real text on every page. Never an image. */}
        <section aria-labelledby="footer-risk" className="max-w-prose">
          <h2 id="footer-risk" className="mb-2 text-label font-semibold text-platinum">
            {t("footer.riskTitle")}
          </h2>
          <p>{t("footer.risk")}</p>
          <p className="mt-4">
            {t("footer.affiliateSummary")}{" "}
            <Link to={href("/legal/affiliate")} className="text-platinum underline">
              {t("footer.affiliateLink")}
            </Link>
          </p>
        </section>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          <nav aria-labelledby="footer-legal">
            <h2 id="footer-legal" className="mb-3 text-label font-semibold text-platinum">
              {t("footer.legalHeading")}
            </h2>
            <ul className="space-y-2">
              {legal.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-slate no-underline hover:text-platinum hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-labelledby="footer-contact">
            <h2 id="footer-contact" className="mb-3 text-label font-semibold text-platinum">
              {t("footer.contactHeading")}
            </h2>
            <ul className="space-y-2">
              <li>
                <a
                  href={SITE.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate no-underline hover:text-platinum hover:underline"
                >
                  {t("footer.telegramAdmin")} · @ejjmili7
                </a>
              </li>
              <li className="text-slate">{SITE.company.email}</li>
            </ul>
          </section>

          <section aria-labelledby="footer-company">
            <h2 id="footer-company" className="mb-3 text-label font-semibold text-platinum">
              {t("footer.companyHeading")}
            </h2>
            <address className="not-italic text-slate">
              <div>{SITE.company.legalName}</div>
              <div>
                {t("footer.registration")} {SITE.company.registrationNo}
              </div>
              <div>{SITE.company.address}</div>
            </address>
          </section>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-slate">{t("footer.copyright", { year, name: SITE.name })}</p>
          <div className="flex items-center gap-3">
            <span className="text-slate">{t("footer.languageHeading")}</span>
            <LanguageToggle />
          </div>
        </div>
      </Container>
    </footer>
  );
}
