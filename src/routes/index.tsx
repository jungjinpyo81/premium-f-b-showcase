import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Globe2,
  Truck,
  Store,
  LineChart,
  FileCheck2,
  ShieldCheck,
  Ship,
  Warehouse,
} from "lucide-react";

import heroImg from "@/assets/hero.jpg";
import giftImg from "@/assets/gift.jpg";
import distOfflineImg from "@/assets/dist-offline.jpg";
import distOnlineImg from "@/assets/dist-online.jpg";
import consultingImg from "@/assets/consulting.jpg";
import colSweet from "@/assets/col-sweet.jpg";
import colPantry from "@/assets/col-pantry.jpg";
import colPlant from "@/assets/col-plant.jpg";
import colNature from "@/assets/col-nature.jpg";
import colChill from "@/assets/col-chill.jpg";

import { InquiryForm } from "@/components/InquiryForm";
import { L } from "@/components/L";
import { Reveal } from "@/components/Reveal";
import { SiteFooter, SiteNav } from "@/components/SiteNav";
import { getCopy, useBusiness, useCopy } from "@/lib/content";

export const Route = createFileRoute("/")({
  loaderDeps: ({ search }) => ({ lang: search.lang }),
  loader: ({ deps }) => ({ lang: deps.lang }),
  head: ({ loaderData }) => {
    const meta = getCopy(loaderData?.lang).meta.home;
    return {
      meta: [
        { title: meta.title },
        { name: "description", content: meta.description },
        { property: "og:title", content: meta.ogTitle },
        { property: "og:description", content: meta.ogDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "/" }],
    };
  },
  component: Index,
});

const COLLECTION_IMAGES: Record<string, string> = {
  "sweet-moments": colSweet,
  "european-pantry": colPantry,
  "plant-based-life": colPlant,
  "natures-bites": colNature,
  "chill-cheers": colChill,
};

const SERVICE_ICONS = {
  globe: Globe2,
  truck: Truck,
  store: Store,
  chart: LineChart,
} as const;

const TRADE_ICONS = {
  customs: FileCheck2,
  quarantine: ShieldCheck,
  freight: Ship,
  warehouse: Warehouse,
} as const;

function Index() {
  const copy = useCopy();
  const biz = useBusiness();

  // Full-page scroll snap is scoped to this page only.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("snap-page");
    return () => root.classList.remove("snap-page");
  }, []);

  return (
    <div className="bg-ink text-beige">
      <SiteNav />

      {/* Hero */}
      <section className="relative flex h-screen snap-start items-end overflow-hidden">
        <img
          src={heroImg}
          alt={copy.hero.titleLines.join(" ")}
          width={1920}
          height={1280}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.12_0_0/0.94)_0%,oklch(0.12_0_0/0.72)_50%,oklch(0.12_0_0/0.35)_100%)]" />
        <div className="relative mx-auto w-full max-w-[1500px] px-6 pb-24 md:px-10">
          <Reveal immediate>
            <p className="text-[11px] uppercase tracking-[0.45em] text-beige/60">
              {copy.hero.eyebrow}
            </p>
          </Reveal>
          <Reveal immediate delay={140}>
            <h1 className="mt-8 max-w-3xl font-display text-3xl leading-[1.2] text-beige md:text-5xl">
              {copy.hero.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </Reveal>
          <Reveal immediate delay={280}>
            <p className="mt-8 max-w-xl text-sm leading-8 text-beige/70">
              {copy.hero.leadLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </Reveal>
          <Reveal immediate delay={420}>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <L
                to="/"
                hash="inquiry"
                className="inline-flex h-13 items-center border border-beige px-10 py-4 text-[11px] uppercase tracking-[0.3em] text-beige transition-colors hover:bg-beige hover:text-ink"
              >
                {copy.hero.ctaPrimary}
              </L>
              <L
                to="/"
                hash={copy.collections[0]?.slug ?? "inquiry"}
                className="inline-flex items-center px-2 py-4 text-[11px] uppercase tracking-[0.3em] text-beige/60 transition-colors hover:text-beige"
              >
                {copy.nav.tasteJourney}
              </L>
            </div>
          </Reveal>
        </div>

        {/* Slogan bar */}
        <div className="absolute inset-x-0 bottom-0 border-t border-beige/15 bg-ink/70 backdrop-blur-sm">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-2 px-6 py-5 md:flex-row md:items-baseline md:gap-8 md:px-10">
            <p className="shrink-0 font-display text-sm tracking-[0.18em] text-gold md:text-base">
              {biz.slogan.headline}
            </p>
            <p className="min-w-0 text-xs leading-6 text-beige/60">{biz.slogan.body}</p>
          </div>
        </div>
      </section>

      {/* One collection per page */}
      {copy.collections.map((c, index) => (
        <section
          key={c.slug}
          id={c.slug}
          className="relative flex h-screen snap-start items-center overflow-hidden"
        >
          <img
            src={COLLECTION_IMAGES[c.slug] ?? heroImg}
            alt={c.titleLocal}
            width={1600}
            height={1100}
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
          />
          <div
            className={`absolute inset-0 ${
              index % 2 === 0
                ? "bg-[linear-gradient(90deg,oklch(0.12_0_0/0.94)_0%,oklch(0.12_0_0/0.7)_55%,oklch(0.12_0_0/0.35)_100%)]"
                : "bg-[linear-gradient(270deg,oklch(0.12_0_0/0.94)_0%,oklch(0.12_0_0/0.7)_55%,oklch(0.12_0_0/0.35)_100%)]"
            }`}
          />
          <div className="relative mx-auto w-full max-w-[1500px] px-6 pt-24 md:px-10">
            <div
              className={`max-w-2xl ${index % 2 === 0 ? "" : "md:ml-auto md:text-right"}`}
            >
              <Reveal>
                <p className="text-[10px] uppercase tracking-[0.45em] text-beige/50">
                  {String(index + 1).padStart(2, "0")} — {c.title}
                </p>
              </Reveal>
              <Reveal delay={120}>
                <h2 className="mt-8 font-display text-4xl leading-tight text-beige md:text-6xl">
                  {c.titleLocal}
                </h2>
              </Reveal>
              <Reveal delay={220}>
                <p className="mt-6 font-display text-lg text-beige/75 md:text-xl">{c.lead}</p>
              </Reveal>
              <Reveal delay={320}>
                <p className="mt-8 text-sm leading-8 text-beige/60">{c.intro}</p>
              </Reveal>
              <Reveal delay={420}>
                <ul
                  className={`mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.25em] text-beige/50 ${
                    index % 2 === 0 ? "" : "md:justify-end"
                  }`}
                >
                  {c.brands.map((b) => (
                    <li key={b.name}>{b.name}</li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={520}>
                <L
                  to="/collections/$slug"
                  params={{ slug: c.slug }}
                  className="mt-12 inline-flex border-b border-beige/40 pb-1 text-[11px] uppercase tracking-[0.3em] text-beige/70 transition-colors hover:border-beige hover:text-beige"
                >
                  View collection
                </L>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* Sourcing & logistics — our role */}
      <section
        id="services"
        className="relative flex h-screen snap-start items-center overflow-hidden border-t border-beige/10"
      >
        <div className="mx-auto w-full max-w-[1500px] px-6 pt-24 md:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.45em] text-beige/50">
              {copy.role.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-8 max-w-3xl font-display text-3xl leading-tight text-beige md:text-5xl">
              {copy.role.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            <Reveal delay={220} className="text-sm leading-8 text-beige/60">
              {copy.role.paragraphs.map((p) => (
                <p key={p} className="mb-5">
                  {p}
                </p>
              ))}
            </Reveal>
            <Reveal delay={320} className="md:col-span-2">
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {[...copy.services.sourcing.items, ...copy.services.logistics.items]
                  .slice(0, 4)
                  .map((s) => (
                    <article key={s.no}>
                      <p className="font-display text-xs tracking-[0.3em] text-beige/40">{s.no}</p>
                      <h3 className="mt-3 font-display text-xl text-beige md:text-2xl">
                        {s.title}
                      </h3>
                      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-beige/55">
                        {s.body}
                      </p>
                    </article>
                  ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gift & B2B */}
      <section
        id="gift"
        className="relative flex h-screen snap-start items-center overflow-hidden"
      >
        <img
          src={giftImg}
          alt={copy.gift.eyebrow}
          width={1408}
          height={1008}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.12_0_0/0.94)_0%,oklch(0.12_0_0/0.75)_60%,oklch(0.12_0_0/0.4)_100%)]" />
        <div className="relative mx-auto w-full max-w-[1500px] px-6 pt-24 md:px-10">
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.45em] text-beige/50">
                {copy.gift.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-8 font-display text-3xl leading-tight text-beige md:text-5xl">
                {copy.gift.titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-8 text-sm leading-8 text-beige/60">{copy.gift.lead}</p>
            </Reveal>
            <Reveal delay={320}>
              <dl className="mt-10 grid gap-8 sm:grid-cols-2">
                {copy.gift.cards.map((card) => (
                  <div key={card.title}>
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-beige/50">
                      {card.title}
                    </dt>
                    <dd className="mt-3 text-sm leading-7 text-beige/60">{card.body}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={420}>
              <L
                to="/"
                hash="inquiry"
                className="mt-12 inline-flex items-center border border-beige px-10 py-4 text-[11px] uppercase tracking-[0.3em] text-beige transition-colors hover:bg-beige hover:text-ink"
              >
                {copy.gift.cta}
              </L>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Inquiry + footer */}
      <section id="inquiry" className="min-h-screen snap-start border-t border-beige/10">
        <div className="mx-auto grid max-w-[1500px] gap-14 px-6 pb-16 pt-28 md:grid-cols-12 md:px-10">
          <Reveal className="md:col-span-5">
            <p className="text-[10px] uppercase tracking-[0.45em] text-beige/50">
              {copy.inquiry.eyebrow}
            </p>
            <h2 className="mt-8 font-display text-3xl leading-tight text-beige md:text-5xl">
              {copy.inquiry.title}
            </h2>
            <p className="mt-8 max-w-sm text-sm leading-7 text-beige/60">{copy.inquiry.lead}</p>
          </Reveal>
          <Reveal delay={140} className="md:col-span-7">
            <InquiryForm />
          </Reveal>
        </div>
        <SiteFooter />
      </section>
    </div>
  );
}
