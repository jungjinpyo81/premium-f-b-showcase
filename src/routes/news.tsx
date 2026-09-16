import { createFileRoute } from "@tanstack/react-router";

import { L } from "@/components/L";
import { Reveal } from "@/components/Reveal";
import { SiteFooter, SiteNav } from "@/components/SiteNav";
import { getCopy, useCopy } from "@/lib/content";

export const Route = createFileRoute("/news")({
  staticData: { sitemap: true },
  loaderDeps: ({ search }) => ({ lang: search.lang }),
  loader: ({ deps }) => ({ lang: deps.lang }),
  head: ({ loaderData }) => {
    const meta = getCopy(loaderData?.lang).meta.news;
    return {
      meta: [
        { title: meta.title },
        { name: "description", content: meta.description },
        { property: "og:title", content: meta.ogTitle },
        { property: "og:description", content: meta.ogDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/news" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "/news" }],
    };
  },
  component: News,
});

function News() {
  const copy = useCopy();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-[1400px] px-6 pb-24 pt-36 md:px-10">
        <Reveal immediate>
          <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            {copy.pages.news.eyebrow}
          </p>
          <h1 className="mt-8 font-display text-4xl leading-tight md:text-5xl">
            {copy.pages.news.title}
          </h1>
        </Reveal>
        <Reveal immediate delay={140}>
          <p className="mt-10 max-w-xl text-sm leading-8 text-muted-foreground">
            {copy.pages.news.lead}
          </p>
        </Reveal>

        <div className="mt-20 border-t border-border">
          {copy.news.map((n, i) => (
            <Reveal
              key={n.slug}
              as="article"
              delay={i * 80}
              className="border-b border-border py-12"
            >
              <L
                to="/news/$slug"
                params={{ slug: n.slug }}
                className="group grid gap-6 md:grid-cols-12"
              >
                <div className="flex items-baseline gap-6 md:col-span-3">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                    {n.category}
                  </span>
                  <time className="text-xs text-muted-foreground">{n.date}</time>
                </div>
                <div className="md:col-span-9">
                  <h2 className="font-display text-2xl group-hover:underline group-hover:underline-offset-8">
                    {n.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                    {n.summary}
                  </p>
                </div>
              </L>
            </Reveal>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
