import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/button";
import { POSTS } from "@/content/posts";
import { SITE } from "@/config/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useLocale } from "@/hooks/useLocale";
import { formatDate } from "@/lib/format";

/** Ships with a genuine empty state. No invented posts. */
export default function Learn() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  useDocumentTitle(t("meta.titles.learn"));

  return (
    <Container className="py-12 md:py-20">
      <div className="max-w-prose">
        <h1 className="text-display">{t("pages.learn.heading")}</h1>
        <p className="mt-6 text-[17px] text-platinum/90 md:text-[18px]">{t("pages.learn.intro")}</p>
      </div>

      {POSTS.length === 0 ? (
        <div className="mt-12 max-w-prose border-t hairline pt-8">
          <h2 className="text-section">{t("pages.learn.emptyTitle")}</h2>
          <p className="mt-4 text-platinum/90">{t("pages.learn.emptyBody")}</p>
          <div className="mt-8">
            <ButtonLink to={SITE.telegramUrl} variant="primary">
              {t("buttons.joinTelegram")}
            </ButtonLink>
          </div>
        </div>
      ) : (
        <section aria-labelledby="learn-latest" className="mt-12">
          <h2 id="learn-latest" className="text-section">
            {t("pages.learn.latest")}
          </h2>
          <ul className="mt-6 grid gap-8 md:grid-cols-2">
            {POSTS.map((post) => (
              <li key={post.slug} className="max-w-prose border-t hairline pt-4">
                {post.image && (
                  <img src={post.image.src} alt={post.image.alt[locale]} loading="lazy" className="mb-3 w-full rounded-card" />
                )}
                <p className="text-meta">
                  <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
                </p>
                <h3 className="mt-1 font-semibold">
                  <Link to={post.href} className="no-underline hover:underline">
                    {post.title[locale]}
                  </Link>
                </h3>
                <p className="mt-2 text-platinum/85">{post.excerpt[locale]}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Container>
  );
}
