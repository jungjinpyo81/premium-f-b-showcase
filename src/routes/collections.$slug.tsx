import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteFooter, SiteNav } from "@/components/SiteNav";
import { Reveal } from "@/components/Reveal";
import { COLLECTIONS, getCollection } from "@/lib/collections";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const collection = getCollection(params.slug);
    if (!collection) throw notFound();
    return { collection };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "컬렉션을 찾을 수 없습니다 | 유럽커넥트" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { collection } = loaderData;
    const title = `${collection.title} · ${collection.titleKo} | 유럽커넥트`;
    return {
      meta: [
        { title },
        { name: "description", content: collection.intro.slice(0, 150) },
        { property: "og:title", content: title },
        { property: "og:description", content: collection.lead },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: CollectionNotFound,
  component: CollectionPage,
});

function CollectionNotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-[1400px] px-6 py-32 md:px-10">
        <h1 className="font-display text-4xl">컬렉션을 찾을 수 없습니다.</h1>
        <Link to="/" className="mt-8 inline-block text-sm underline underline-offset-4">
          홈으로
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}

function CollectionPage() {
  const { collection } = Route.useLoaderData();
  const others = COLLECTIONS.filter((c) => c.slug !== collection.slug);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-[1400px] px-6 pb-32 pt-24 md:px-10">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            {collection.title}
          </p>
          <h1 className="mt-10 max-w-3xl font-display text-4xl leading-[1.2] md:text-6xl">
            {collection.lead}
          </h1>
        </Reveal>

        <Reveal delay={120} className="mt-14 max-w-xl">
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
                  <h2 className="font-display text-3xl">{b.nameKo}</h2>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                    {b.name}
                  </p>
                  <p className="mt-7 max-w-md text-sm leading-7 text-muted-foreground">{b.note}</p>
                </div>
                <div className="md:col-span-3 md:text-right">
                  {b.brandSlug ? (
                    <Link
                      to="/brands/$slug"
                      params={{ slug: b.brandSlug }}
                      className="text-[11px] uppercase tracking-[0.3em] underline-offset-8 hover:underline"
                    >
                      브랜드 보기
                    </Link>
                  ) : (
                    <Link
                      to="/"
                      hash="inquiry"
                      className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground underline-offset-8 hover:text-foreground hover:underline"
                    >
                      자료 요청
                    </Link>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Other Collections
          </p>
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {others.map((c) => (
              <Link
                key={c.slug}
                to="/collections/$slug"
                params={{ slug: c.slug }}
                className="font-display text-2xl text-muted-foreground transition-colors hover:text-foreground"
              >
                {c.title}
              </Link>
            ))}
          </div>
        </Reveal>
      </main>
      <SiteFooter />
    </div>
  );
}
