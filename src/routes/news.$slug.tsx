import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { SiteFooter, SiteNav } from "@/components/SiteNav";
import { getNews } from "@/lib/news";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const item = getNews(params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "게시물을 찾을 수 없습니다 | 유럽커넥트" }, { name: "robots", content: "noindex" }],
      };
    }
    const { item } = loaderData;
    const title = `${item.title} | 유럽커넥트`;
    return {
      meta: [
        { title },
        { name: "description", content: item.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: item.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: NewsNotFound,
  component: NewsDetail,
});

function NewsNotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-[1400px] px-6 py-32 md:px-10">
        <h1 className="font-display text-4xl">게시물을 찾을 수 없습니다.</h1>
        <Link to="/news" className="mt-8 inline-block text-sm underline underline-offset-4">
          목록으로
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}

function NewsDetail() {
  const { item } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-6 py-24 md:px-10">
        <Link
          to="/news"
          className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground"
        >
          ← News
        </Link>
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
            <Reveal key={p} as="div" delay={i * 60}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
