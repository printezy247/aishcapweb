import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/layout/Container";
import { ProseSections } from "@/components/Prose";
import { ButtonLink } from "@/components/ui/button";
import { POSTS, postHref } from "@/content/posts";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useLocale } from "@/hooks/useLocale";
import { formatDate } from "@/lib/format";
import { readingMinutes } from "@/lib/reading";
import NotFound from "@/pages/NotFound";

/** One Learn post at /learn/:slug. Unknown slug or external post: 404. */
export default function Article() {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug && p.sections);
  if (!post || !post.sections) return <NotFound />;
  return <ArticleBody post={post} sections={post.sections} />;
}

type Loaded = NonNullable<(typeof POSTS)[number]["sections"]>;

function ArticleBody({ post, sections }: { post: (typeof POSTS)[number]; sections: Loaded }) {
  const { t } = useTranslation();
  const { locale, href } = useLocale();
  useDocumentTitle(t("meta.titles.article", { title: post.title[locale] }));
  const body = sections[locale];
  const minutes = readingMinutes(body);
  const related = POSTS.filter((p) => p.slug !== post.slug && p.sections).slice(0, 3);

  return (
    <Container className="py-12 md:py-20">
      <article className="max-w-prose">
        <p className="text-meta">
          <span className="text-gold">{t(`pages.learn.kind.${post.kind}`)}</span>
          {" · "}
          <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
          {" · "}
          {t("pages.learn.readingTime", { count: minutes })}
        </p>
        <h1 className="text-display mt-3">{post.title[locale]}</h1>
        {post.updated && (
          <p className="mt-3 text-meta">{t("pages.learn.updated", { date: formatDate(post.updated, locale) })}</p>
        )}
        <p className="mt-6 text-[17px] text-platinum/90 md:text-[18px]">{post.excerpt[locale]}</p>

        {post.keyPoints && (
          <aside aria-label={t("pages.learn.inShort")} className="metal-card mt-8 rounded-lg p-6">
            <p className="text-label font-semibold text-slate">{t("pages.learn.inShort")}</p>
            <ul className="mt-3 space-y-2 text-platinum/90">
              {post.keyPoints[locale].map((k) => (
                <li key={k} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[9px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70" />
                  <span>{k}</span>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <div className="mt-10">
          <ProseSections sections={body} />
        </div>

        <p className="mt-10 border-t hairline pt-6 text-legal text-slate">
          {t("hero.riskLine")}{" "}
          <Link to={href("/legal/risk")} className="text-slate underline hover:text-platinum">
            {t("buttons.readRisks")}
          </Link>
        </p>

        {related.length > 0 && (
          <nav aria-labelledby="related-heading" className="mt-10">
            <h2 id="related-heading" className="text-label font-semibold text-slate">
              {t("pages.learn.related")}
            </h2>
            <ul className="mt-3 space-y-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link to={postHref(p, locale)} className="font-semibold no-underline hover:underline">
                    {p.title[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="mt-10">
          <ButtonLink to={href("/learn")} variant="secondary">
            {t("pages.learn.back")}
          </ButtonLink>
        </div>
      </article>
    </Container>
  );
}
