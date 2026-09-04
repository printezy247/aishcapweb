import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/Reveal";
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
    <Section
      id="learn"
      eyebrow={t("learnPreview.eyebrow")}
      heading={t("learnPreview.heading")}
      intro={t("learnPreview.intro")}
      recessed
    >
      {posts.length === 0 ? (
        <Reveal className="metal-card max-w-prose rounded-lg p-6 md:p-8">
          <h3 className="text-[17px] font-semibold">{t("learnPreview.emptyTitle")}</h3>
          <p className="mt-2 text-platinum/80">{t("learnPreview.emptyBody")}</p>
          <div className="mt-6">
            <ButtonLink to={SITE.telegramUrl} variant="secondary">
              {t("buttons.joinTelegram")}
            </ButtonLink>
          </div>
        </Reveal>
      ) : (
        <>
          <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
            {posts.map((post, i) => (
              <Reveal key={post.slug} as="li" index={i} className="metal-card rounded-lg p-6">
                {post.image && (
                  <img
                    src={post.image.src}
                    alt={post.image.alt[locale]}
                    loading="lazy"
                    className="mb-4 w-full rounded-card"
                  />
                )}
                <p className="num text-meta">
                  <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
                </p>
                <h3 className="mt-1 font-semibold">
                  <Link to={post.href} className="no-underline hover:underline">
                    {post.title[locale]}
                  </Link>
                </h3>
                <p className="mt-2 text-platinum/80">{post.excerpt[locale]}</p>
              </Reveal>
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
