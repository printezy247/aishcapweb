import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui/button";
import { POSTS, postHref, type Post } from "@/content/posts";
import { SITE, resolveLink } from "@/config/site";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useLocale } from "@/hooks/useLocale";
import { formatDate } from "@/lib/format";
import { readingMinutes } from "@/lib/reading";

/** Explainers now; weekly breakdowns as they are republished. No placeholders. */
export default function Learn() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  useDocumentTitle(t("meta.titles.learn"));

  const explainers = POSTS.filter((p) => p.kind === "explainer");
  const weekly = POSTS.filter((p) => p.kind === "weekly");
  const channel = resolveLink(SITE.links.publicChannel);

  return (
    <Container className="py-12 md:py-20">
      <div className="max-w-prose">
        <h1 className="text-display">{t("pages.learn.heading")}</h1>
        <p className="mt-6 text-[17px] text-platinum/90 md:text-[18px]">{t("pages.learn.intro")}</p>
      </div>

      <PostList id="explainers" heading={t("pages.learn.explainers")} posts={explainers} locale={locale} />

      <section aria-labelledby="learn-weekly" className="mt-16 border-t hairline pt-10">
        <div className="max-w-prose">
          <h2 id="learn-weekly" className="text-section">
            {t("pages.learn.weekly.heading")}
          </h2>
          <p className="mt-3 text-platinum/85">{t("pages.learn.weekly.body")}</p>
        </div>
        {weekly.length > 0 ? (
          <PostList posts={weekly} locale={locale} />
        ) : (
          <div className="mt-6">
            <ButtonLink to={channel.href} variant="secondary" data-track="offering_click" data-location="learn-weekly">
              {channel.isPlaceholder ? t("offerings.askAdmin") : t("pages.learn.weekly.open")}
            </ButtonLink>
          </div>
        )}
      </section>
    </Container>
  );
}

function PostList({ id, heading, posts, locale }: { id?: string; heading?: string; posts: Post[]; locale: "en" | "ms" }) {
  const { t } = useTranslation();
  if (posts.length === 0) return null;
  return (
    <section aria-labelledby={id ? `${id}-heading` : undefined} className={heading ? "mt-12" : "mt-6"}>
      {heading && (
        <h2 id={`${id}-heading`} className="text-section">
          {heading}
        </h2>
      )}
      <ul className="mt-6 grid gap-4 md:grid-cols-2 md:gap-5">
        {posts.map((post, i) => {
          const minutes = post.sections ? readingMinutes(post.sections[locale]) : 0;
          return (
            <Reveal key={post.slug} as="li" index={i} className="metal-card flex flex-col rounded-lg p-6">
              {post.image && <img src={post.image.src} alt={post.image.alt[locale]} loading="lazy" className="mb-4 w-full rounded-card" />}
              <p className="text-meta">
                <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
                {minutes > 0 && <> · {t("pages.learn.readingTime", { count: minutes })}</>}
              </p>
              <h3 className="mt-2 text-[18px] font-semibold leading-snug md:text-[20px]">
                <Link to={postHref(post, locale)} className="no-underline hover:underline">
                  {post.title[locale]}
                </Link>
              </h3>
              <p className="mt-2 flex-1 text-platinum/80">{post.excerpt[locale]}</p>
              <p className="mt-4">
                <Link to={postHref(post, locale)} className="text-[14px] font-semibold text-gold no-underline hover:underline">
                  {t("pages.learn.read")}
                </Link>
              </p>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
