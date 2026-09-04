import { useTranslation } from "react-i18next";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useLocale } from "@/hooks/useLocale";

export default function NotFound() {
  const { t } = useTranslation();
  const { href } = useLocale();
  useDocumentTitle(t("meta.titles.notFound"));
  return (
    <Container className="py-12 md:py-20">
      <div className="max-w-prose">
        <h1 className="text-display">{t("pages.notFound.heading")}</h1>
        <p className="mt-6 text-platinum/90">{t("pages.notFound.body")}</p>
        <div className="mt-8">
          <ButtonLink to={href("/")} variant="secondary">
            {t("buttons.backHome")}
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
