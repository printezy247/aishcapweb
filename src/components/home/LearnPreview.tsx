import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/button";
import { POSTS } from "@/content/posts";
import { SITE } from "@/config/site";
import { useLocale } from "@/hooks/useLocale";
import { formatDate } from "@/lib/format";

/** Three most recent posts, or a genuine empty state. No placeholder posts, ever. */
export function LearnPreview() {
  const { t } = useTranslation();
  const { locale, href } = useLocale();
  const posts = POSTS.slice(0, 3);

  return (
    <Section id="learn" heading={t("learnPreview.heading")} recessed>
      <p className="mb-8 max-w-prose text-platinum/90">{t("learnPreview.intro")}</p>

      {posts.length === 0 ? (
        <div className="max-w-prose">
          <h3 className="font-semibold">{t("learnPreview.emptyTitle")}</h3>
          <p className="mt-2 text-platinum/85">{t("learnPreview.emptyBody")}</p>
          <div className="mt-6">
            <ButtonLink to={SITE.telegramUrl} variant="secondary">
              {t("buttons.joinTelegram")}
            </ButtonLink>
          </div>
        </div>
      ) : (
        <>
          <ul className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug} className="max-w-prose border-t hairline pt-4">
                {post.image && (
                  <img
                    src={post.image.src}
                    alt={post.image.alt[locale]}
                    loading="lazy"
                    className="mb-3 w-full rounded-card"
                  />
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
          <div className="mt-8">
            <Link to={href("/learn")} className="text-platinum">
              {t("learnPreview.viewAll")}
            </Link>
          </div>
        </>
      )}
    </Section>
  );
}
