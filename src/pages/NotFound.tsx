import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useLocale } from "@/hooks/useLocale";

export default function NotFound() {
  const { t } = useTranslation();
  const { href } = useLocale();
  useDocumentTitle(t("meta.titles.notFound"));
  const links = [
    { to: href("/copy-trading"), label: t("nav.copyTrading") },
    { to: href("/learn"), label: t("nav.learn") },
    { to: href("/about"), label: t("nav.about") },
  ];
  return (
    <Container className="py-16 md:py-24">
      <div className="max-w-prose">
        <p aria-hidden="true" className="num text-[64px] font-medium leading-none text-gold/35 md:text-[80px]">404</p>
        <h1 className="text-display mt-4">{t("pages.notFound.heading")}</h1>
        <p className="mt-6 text-platinum/90">{t("pages.notFound.body")}</p>
        <div className="mt-8">
          <ButtonLink to={href("/")} variant="secondary">
            {t("buttons.backHome")}
          </ButtonLink>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t hairline pt-6 text-[15px]">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="text-slate no-underline hover:text-platinum hover:underline">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
