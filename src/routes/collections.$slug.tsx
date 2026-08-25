import { createFileRoute, notFound } from "@tanstack/react-router";

import { L } from "@/components/L";
import { Reveal } from "@/components/Reveal";
import { SiteFooter, SiteNav } from "@/components/SiteNav";
import { getCollection, getCopy, useCopy } from "@/lib/content";

export const Route = createFileRoute("/collections/$slug")({
  loaderDeps: ({ search }) => ({ lang: search.lang }),
  loader: ({ params, deps }) => {
    const collection = getCollection(getCopy(deps.lang), params.slug);
    if (!collection) throw notFound();
    return { lang: deps.lang, slug: params.slug };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Not found | Europe Connect" }, { name: "robots", content: "noindex" }],
      };
    }
    const collection = getCollection(getCopy(loaderData.lang), loaderData.slug)!;
    const title = `${collection.title} | Europe Connect`;
    return {
      meta: [
        { title },
        { name: "description", content: collection.intro.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: collection.lead },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/collections/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/collections/${params.slug}` }],
    };
  },
  notFoundComponent: CollectionNotFound,
  component: CollectionPage,
});

function CollectionNotFound() {
  const copy = useCopy();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-[1400px] px-6 py-32 md:px-10">
        <h1 className="font-display text-4xl">{copy.pages.brandDetail.notFound}</h1>
        <L to="/" className="mt-8 inline-block text-sm underline underline-offset-4">
          {copy.pages.brandDetail.backToList}
        </L>
      </main>
      <SiteFooter />
    </div>
  );
}

function CollectionPage() {
  const copy = useCopy();
  const { slug } = Route.useParams();
  const collection = getCollection(copy, slug);

  if (!collection) return <CollectionNotFound />;

  const others = copy.collections.filter((c) => c.slug !== collection.slug);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-[1400px] px-6 pb-32 pt-24 md:px-10">
        <Reveal immediate>
          <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            {collection.title}
          </p>
          <h1 className="mt-10 max-w-3xl font-display text-4xl leading-[1.2] md:text-6xl">
            {collection.lead}
          </h1>
        </Reveal>

        <Reveal immediate delay={120} className="mt-14 max-w-xl">
          <p className="text-sm leading-8 text-muted-foreground">{collection.intro}</p>
        </Reveal>

        <div className="mt-24 border-t border-border">
          {collection.brands.map((b, i) => (
            <Reveal key={b.name} delay={i * 90} as="article">
              <div className="grid gap-6 border-b border-border py-14 md:grid-cols-12">
                <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground md:col-span-3">
                  {b.origin}
                </p>
                <div className="md:col-span-6">
                  <h2 className="font-display text-3xl">{b.nameLocal}</h2>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                    {b.name}
                  </p>
                  <p className="mt-7 max-w-md text-sm leading-7 text-muted-foreground">{b.note}</p>
                </div>
                <div className="md:col-span-3 md:text-right">
                  {b.brandSlug ? (
                    <L
                      to="/brands/$slug"
                      params={{ slug: b.brandSlug }}
                      className="text-[11px] uppercase tracking-[0.3em] underline-offset-8 hover:underline"
                    >
                      {copy.pages.collection.viewBrand}
                    </L>
                  ) : (
                    <L
                      to="/"
                      hash="inquiry"
                      className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground underline-offset-8 hover:text-foreground hover:underline"
                    >
                      {copy.pages.collection.requestInfo}
                    </L>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            {copy.pages.collection.other}
          </p>
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {others.map((c) => (
              <L
                key={c.slug}
                to="/collections/$slug"
                params={{ slug: c.slug }}
                className="font-display text-2xl text-muted-foreground transition-colors hover:text-foreground"
              >
                {c.title}
              </L>
            ))}
          </div>
        </Reveal>
      </main>
      <SiteFooter />
    </div>
  );
}
