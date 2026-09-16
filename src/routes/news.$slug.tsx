import { createFileRoute, notFound } from "@tanstack/react-router";

import { L } from "@/components/L";
import { Reveal } from "@/components/Reveal";
import { SiteFooter, SiteNav } from "@/components/SiteNav";
import { getCopy, getNews, useCopy } from "@/lib/content";

export const Route = createFileRoute("/news/$slug")({
  staticData: { sitemap: true },
  loaderDeps: ({ search }) => ({ lang: search.lang }),
  loader: ({ params, deps }) => {
    const item = getNews(getCopy(deps.lang), params.slug);
    if (!item) throw notFound();
    return { lang: deps.lang, slug: params.slug };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Not found | Europe Connect" }, { name: "robots", content: "noindex" }],
      };
    }
    const item = getNews(getCopy(loaderData.lang), loaderData.slug)!;
    const title = `${item.title} | Europe Connect`;
    return {
      meta: [
        { title },
        { name: "description", content: item.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: item.summary },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/news/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/news/${params.slug}` }],
    };
  },
  notFoundComponent: NewsNotFound,
  component: NewsDetail,
});

function NewsNotFound() {
  const copy = useCopy();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-[1400px] px-6 pb-32 pt-36 md:px-10">
        <h1 className="font-display text-4xl">{copy.pages.newsDetail.notFound}</h1>
        <L to="/news" className="mt-8 inline-block text-sm underline underline-offset-4">
          {copy.pages.newsDetail.backToList}
        </L>
      </main>
      <SiteFooter />
    </div>
  );
}

function NewsDetail() {
  const copy = useCopy();
  const { slug } = Route.useParams();
  const item = getNews(copy, slug);

  if (!item) return <NewsNotFound />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-36 md:px-10">
        <L
          to="/news"
          className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground"
        >
          {copy.pages.newsDetail.back}
        </L>
        <Reveal immediate>
          <div className="mt-12 flex items-baseline gap-6">
            <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              {item.category}
            </span>
            <time className="text-xs text-muted-foreground">{item.date}</time>
          </div>
          <h1 className="mt-8 font-display text-4xl leading-tight">{item.title}</h1>
        </Reveal>
        <div className="mt-12 space-y-8 border-t border-border pt-12 text-sm leading-8 text-foreground/85">
          {item.body.map((p, i) => (
            <Reveal key={p} delay={i * 60}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
