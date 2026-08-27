import { createFileRoute } from "@tanstack/react-router";

import balsamicoPastaAsset from "@/assets/balsamico-pasta.jpg.asset.json";
import churchillsTinAsset from "@/assets/churchills-tin.jpg.asset.json";
import cocobaBombesAsset from "@/assets/cocoba-bombes.jpg.asset.json";
import emilioDrinkAsset from "@/assets/emilio-drink.png.asset.json";
import crispyNaturalBoxAsset from "@/assets/crispy-natural-box.webp.asset.json";
import luwakCoffeeAsset from "@/assets/luwak-coffee.jpg.asset.json";
import colSweet from "@/assets/col-sweet.jpg";
import colPlantAsset from "@/assets/col-plant.jpg.asset.json";
import { ImageSlider } from "@/components/ImageSlider";
import { L } from "@/components/L";
import { Reveal } from "@/components/Reveal";
import { SiteFooter, SiteNav } from "@/components/SiteNav";
import { getCopy, useCopy } from "@/lib/content";

const COLLECTION_IMAGES: Record<string, string> = {
  "sweet-moments": colSweet,
  "european-pantry": balsamicoPastaAsset.url,
  "plant-based-life": colPlantAsset.url,
  "natures-bites": crispyNaturalBoxAsset.url,
  "chill-cheers": emilioDrinkAsset.url,
};

const FLAG_CODE_BY_ORIGIN: Record<string, string> = {
  france: "fr",
  "united kingdom": "gb",
  italy: "it",
  poland: "pl",
  netherland: "nl",
  netherlands: "nl",
  indonesia: "id",
  europe: "eu",
};

const flagUrl = (code: string) => `https://flagcdn.com/w80/${code}.png`;

const SWEET_SLIDES: Record<string, string> = {
  "maison-mazet": colSweet,
  churchills: churchillsTinAsset.url,
  cocoba: cocobaBombesAsset.url,
};

const CHILL_SLIDES: Record<string, string> = {
  emilio: emilioDrinkAsset.url,
  "luwak-premium-coffee": luwakCoffeeAsset.url,
};

export const Route = createFileRoute("/collections/")({
  loaderDeps: ({ search }) => ({ lang: search.lang }),
  loader: ({ deps }) => ({ lang: deps.lang }),
  head: ({ loaderData }) => {
    const copy = getCopy(loaderData?.lang);
    const title = `Taste Journey | Europe Connect`;
    const description = copy.collections.map((c) => c.titleLocal).join(" · ");
    return {
      meta: [
        { title },
        { name: "description", content: description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: description.slice(0, 155) },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/collections" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "/collections" }],
    };
  },
  component: CollectionsPage,
});

function CollectionsPage() {
  const copy = useCopy();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Editorial hero */}
      <section className="relative flex h-[68vh] items-center overflow-hidden">
        <img
          src={COLLECTION_IMAGES[copy.collections[0]?.slug ?? ""] ?? colSweet}
          alt={copy.nav.tasteJourney}
          width={1600}
          height={1100}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.12_0_0/0.94)_0%,oklch(0.12_0_0/0.7)_55%,oklch(0.12_0_0/0.35)_100%)]" />
        <div className="relative mx-auto w-full max-w-[1500px] px-6 pt-24 md:px-10">
          <div className="max-w-2xl">
            <Reveal immediate>
              <p className="text-[10px] uppercase tracking-[0.45em] text-gold">TASTE JOURNEY</p>
            </Reveal>
            <Reveal immediate delay={120}>
              <h1 className="mt-8 font-display text-4xl leading-tight text-beige md:text-6xl">
                {copy.nav.tasteJourney}
              </h1>
            </Reveal>
            <Reveal immediate delay={240}>
              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.25em] text-beige/55">
                {copy.collections.map((c) => (
                  <li key={c.slug}>
                    <a href={`#${c.slug}`} className="transition-colors hover:text-beige">
                      {c.titleLocal}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1400px] px-6 pb-32 pt-24 md:px-10">
        {copy.collections.map((collection, index) => (
          <section
            key={collection.slug}
            id={collection.slug}
            className="scroll-mt-28 border-t border-border pb-20 pt-16 first:border-t-0 first:pt-0"
          >
            <div className="grid gap-10 md:grid-cols-12">
              <div className="md:col-span-5">
                <Reveal>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")} — {collection.title}
                  </p>
                  <h2 className="mt-6 font-display text-3xl md:text-4xl">
                    {collection.titleLocal}
                  </h2>
                  <p className="mt-5 font-display text-lg text-muted-foreground">
                    {collection.lead}
                  </p>
                </Reveal>
                <Reveal delay={120}>
                  {collection.slug === "sweet-moments" ? (
                    <ImageSlider
                      className="mt-8"
                      interval={2000}
                      images={collection.brands.map((b) => ({
                        src:
                          SWEET_SLIDES[
                            b.brandSlug ?? b.name.toLowerCase().replace(/[^a-z]/g, "")
                          ] ?? colSweet,
                        alt: `${collection.titleLocal} — ${b.nameLocal}`,
                      }))}
                    />
                  ) : (
                    <img
                      src={COLLECTION_IMAGES[collection.slug]}
                      alt={collection.titleLocal}
                      width={1200}
                      height={800}
                      loading="lazy"
                      className="mt-8 aspect-[4/3] w-full object-cover"
                    />
                  )}
                </Reveal>
              </div>

              <div className="md:col-span-7">
                <Reveal delay={80}>
                  <p className="max-w-xl text-sm leading-8 text-muted-foreground">
                    {collection.intro}
                  </p>
                </Reveal>
                <div className="mt-10 border-t border-border">
                  {collection.brands.map((b, i) => (
                    <Reveal key={b.name} delay={i * 70} as="article">
                      <div className="grid gap-4 border-b border-border py-8 md:grid-cols-12">
                         <div className="md:col-span-3">
                           {(() => {
                             const code = FLAG_CODE_BY_ORIGIN[b.origin.trim().toLowerCase()];
                             return code ? (
                               <img
                                 src={flagUrl(code)}
                                 alt={b.origin}
                                 width={24}
                                 height={16}
                                 loading="lazy"
                                 className="h-4 w-6 rounded-[1px] object-cover shadow-sm"
                               />
                             ) : null;
                           })()}
                          <p className="mt-1.5 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                            {b.origin}
                          </p>
                        </div>
                        <div className="md:col-span-6">
                          <h3 className="font-display text-2xl">{b.nameLocal}</h3>
                          <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                            {b.name}
                          </p>
                          <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
                            {b.note}
                          </p>
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
              </div>
            </div>
          </section>
        ))}
      </main>
      <SiteFooter />
    </div>
  );
}
