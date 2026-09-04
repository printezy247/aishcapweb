import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/layout/Container";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { Logo } from "@/components/layout/Logo";
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

  const colHeading = "mb-3 text-label font-semibold text-platinum";
  const link = "text-slate no-underline hover:text-platinum hover:underline";

  return (
    <footer className="hero-backdrop hero-backdrop--soft border-t hairline bg-navy-abyss text-legal text-platinum/85">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr] md:gap-8">
          {/* Brand + the risk warning. Real text on every page. Never an image. */}
          <section aria-labelledby="footer-risk" className="max-w-prose">
            <div className="mb-5">
              <Logo className="h-8" />
            </div>
            <h2 id="footer-risk" className={colHeading}>
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

          <nav aria-labelledby="footer-legal">
            <h2 id="footer-legal" className={colHeading}>
              {t("footer.legalHeading")}
            </h2>
            <ul className="space-y-2">
              {legal.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-labelledby="footer-contact">
            <h2 id="footer-contact" className={colHeading}>
              {t("footer.contactHeading")}
            </h2>
            <ul className="space-y-2">
              <li>
                <a href={SITE.telegramUrl} target="_blank" rel="noopener noreferrer" className={link}>
                  {t("footer.telegramAdmin")} · @ejjmili7
                </a>
              </li>
            </ul>
          </section>

        </div>

        <div className="mt-12 flex flex-col gap-4 border-t hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
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
