import { createFileRoute } from "@tanstack/react-router";

import { L } from "@/components/L";
import { Reveal } from "@/components/Reveal";
import { SiteFooter, SiteNav } from "@/components/SiteNav";
import { getCopy, useCopy } from "@/lib/content";

export const Route = createFileRoute("/brands")({
  staticData: { sitemap: true },
  loaderDeps: ({ search }) => ({ lang: search.lang }),
  loader: ({ deps }) => ({ lang: deps.lang }),
  head: ({ loaderData }) => {
    const meta = getCopy(loaderData?.lang).meta.brands;
    return {
      meta: [
        { title: meta.title },
        { name: "description", content: meta.description },
        { property: "og:title", content: meta.ogTitle },
        { property: "og:description", content: meta.ogDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/brands" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "/brands" }],
    };
  },
  component: Brands,
});

function Brands() {
  const copy = useCopy();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-[1400px] px-6 pb-24 pt-36 md:px-10">
        <Reveal immediate>
          <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            {copy.pages.brands.eyebrow}
          </p>
          <h1 className="mt-8 max-w-2xl font-display text-4xl leading-tight md:text-5xl">
            {copy.pages.brands.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
        </Reveal>
        <Reveal immediate delay={140}>
          <p className="mt-10 max-w-xl text-sm leading-8 text-muted-foreground">
            {copy.pages.brands.lead}
          </p>
        </Reveal>

        <div className="mt-20 grid gap-px border border-border bg-border md:grid-cols-2">
          {copy.brands.map((b, i) => (
            <Reveal key={b.slug} as="article" delay={i * 90} className="bg-background px-8 py-14">
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                {b.origin} · {b.category}
              </p>
              <h2 className="mt-8 font-display text-3xl">{b.name}</h2>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {b.nameEn}
              </p>
              <p className="mt-8 max-w-md text-sm leading-7 text-muted-foreground">{b.tagline}</p>
              <L
                to="/brands/$slug"
                params={{ slug: b.slug }}
                className="mt-10 inline-flex h-12 items-center border border-border px-8 text-[11px] uppercase tracking-[0.3em] transition-colors hover:border-primary"
              >
                {copy.pages.brands.cta}
              </L>
            </Reveal>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
