import { createFileRoute, notFound } from "@tanstack/react-router";

import colChill from "@/assets/col-chill.jpg";
import colNature from "@/assets/col-nature.jpg";
import colPantry from "@/assets/col-pantry.jpg";
import colPlantAsset from "@/assets/col-plant.jpg.asset.json";
import colSweet from "@/assets/col-sweet.jpg";
import { L } from "@/components/L";
import { Reveal } from "@/components/Reveal";
import { SiteFooter, SiteNav } from "@/components/SiteNav";
import { getCollection, getCopy, useCopy } from "@/lib/content";

const COLLECTION_IMAGES: Record<string, string> = {
  "sweet-moments": colSweet,
  "european-pantry": colPantry,
  "plant-based-life": colPlantAsset.url,
  "natures-bites": colNature,
  "chill-cheers": colChill,
};


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
      <main className="mx-auto max-w-[1400px] px-6 pb-32 pt-36 md:px-10">
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

  const index = copy.collections.findIndex((c) => c.slug === collection.slug);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Editorial full-bleed hero (restored earlier version) */}
      <section className="relative flex h-screen items-center overflow-hidden">
        <img
          src={COLLECTION_IMAGES[collection.slug]}
          alt={collection.titleLocal}
          width={1600}
          height={1100}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.12_0_0/0.94)_0%,oklch(0.12_0_0/0.7)_55%,oklch(0.12_0_0/0.35)_100%)]" />
        <div className="relative mx-auto w-full max-w-[1500px] px-6 pt-24 md:px-10">
          <div className="max-w-2xl">
            <Reveal immediate>
              <p className="text-[10px] uppercase tracking-[0.45em] text-beige/50">
                {String(index + 1).padStart(2, "0")} — {collection.title}
              </p>
            </Reveal>
            <Reveal immediate delay={120}>
              <h1 className="mt-8 font-display text-4xl leading-tight text-beige md:text-6xl">
                {collection.titleLocal}
              </h1>
            </Reveal>
            <Reveal immediate delay={220}>
              <p className="mt-6 font-display text-lg text-beige/75 md:text-xl">
                {collection.lead}
              </p>
            </Reveal>
            <Reveal immediate delay={320}>
              <p className="mt-8 text-sm leading-8 text-beige/60">{collection.intro}</p>
            </Reveal>
            <Reveal immediate delay={420}>
              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.25em] text-beige/50">
                {collection.brands.map((b) => (
                  <li key={b.name}>{b.name}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1400px] px-6 pb-32 pt-24 md:px-10">


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
