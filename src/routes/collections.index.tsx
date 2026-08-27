import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const total = copy.collections.length + 1;

  useEffect(() => {
    const root = containerRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset["index"]);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        }
      },
      { root, threshold: 0.5 },
    );
    sectionRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [total]);

  const goTo = useCallback((i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const setRef = (i: number) => (el: HTMLElement | null) => {
    sectionRefs.current[i] = el;
  };

  return (
    <div className="h-screen overflow-hidden bg-background text-foreground">
      <SiteNav />

      {/* Side dot pagination */}
      <nav
        aria-label="Section navigation"
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 md:flex"
      >
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={
              i === 0 ? copy.nav.tasteJourney : (copy.collections[i - 1]?.titleLocal ?? `${i}`)
            }
            aria-current={active === i}
            onClick={() => goTo(i)}
            className={`size-2 rounded-full border transition-all duration-300 ${
              active === i
                ? "scale-125 border-gold bg-gold"
                : "border-muted-foreground/50 bg-transparent hover:border-foreground"
            }`}
          />
        ))}
      </nav>

      <div
        ref={containerRef}
        className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* Editorial hero */}
        <section
          ref={setRef(0)}
          data-index={0}
          className="relative flex h-screen w-full snap-start items-center overflow-hidden"
        >
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
                  {copy.collections.map((c, i) => (
                    <li key={c.slug}>
                      <button
                        type="button"
                        onClick={() => goTo(i + 1)}
                        className="uppercase tracking-[0.25em] transition-colors hover:text-beige"
                      >
                        {c.titleLocal}
                      </button>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {copy.collections.map((collection, index) => (
          <section
            key={collection.slug}
            id={collection.slug}
            ref={setRef(index + 1)}
            data-index={index + 1}
            className="flex h-screen w-full snap-start items-center overflow-y-auto"
          >
            <div className="mx-auto w-full max-w-[1400px] px-6 py-24 pt-28 md:px-10">
              <div className="grid gap-10 md:grid-cols-12">
                <div className="md:col-span-5">
                  <Reveal repeat amount={0.2}>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")} — {collection.title}
                    </p>
                    <h2 className="mt-4 font-display text-3xl md:text-4xl">
                      {collection.titleLocal}
                    </h2>
                    <p className="mt-4 font-display text-base text-muted-foreground md:text-lg">
                      {collection.lead}
                    </p>
                  </Reveal>
                  <Reveal repeat amount={0.2} delay={120}>
                    {collection.slug === "sweet-moments" || collection.slug === "chill-cheers" ? (
                      <ImageSlider
                        className="mt-6"
                        interval={2000}
                        images={collection.brands.map((b) => {
                          const slides =
                            collection.slug === "sweet-moments" ? SWEET_SLIDES : CHILL_SLIDES;
                          const key =
                            b.brandSlug ??
                            b.name
                              .toLowerCase()
                              .replace(/['\u2018\u2019]/g, "")
                              .replace(/[^a-z]/g, "-");
                          return {
                            src: slides[key] ?? emilioDrinkAsset.url,
                            alt: `${collection.titleLocal} — ${b.nameLocal}`,
                          };
                        })}
                      />
                    ) : (
                      <img
                        src={COLLECTION_IMAGES[collection.slug]}
                        alt={collection.titleLocal}
                        width={1200}
                        height={800}
                        loading="lazy"
                        className="mt-6 aspect-[4/3] w-full object-cover"
                      />
                    )}
                  </Reveal>
                </div>

                <div className="md:col-span-7">
                  <Reveal repeat amount={0.2} delay={80}>
                    <p className="max-w-xl text-sm leading-7 text-muted-foreground">
                      {collection.intro}
                    </p>
                  </Reveal>
                  <div className="mt-6 border-t border-border">
                    {collection.brands.map((b, i) => (
                      <Reveal key={b.name} repeat amount={0.1} delay={i * 70} as="article">
                        <div className="grid gap-4 border-b border-border py-5 md:grid-cols-12">
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
                            <h3 className="font-display text-xl md:text-2xl">{b.nameLocal}</h3>
                            <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                              {b.name}
                            </p>
                            <p className="mt-3 max-w-md whitespace-pre-line text-sm leading-6 text-muted-foreground">
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
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
