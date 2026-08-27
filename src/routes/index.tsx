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
  const hash = useRouterState({ select: (s) => s.location.hash });

  // Full-page scroll snap is scoped to this page only.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("snap-page");
    return () => root.classList.remove("snap-page");
  }, []);

  // GNB hash links map 1:1 to the sections below; scroll to the exact target
  // even when the hash is unchanged or the page is still hydrating.
  useEffect(() => {
    if (!hash) return;
    const t = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
    return () => window.clearTimeout(t);
  }, [hash]);


  return (
    <div className="mobile-alt-dark bg-ink text-beige">
      <SiteNav />

      {/* Hero */}
      <section className="relative flex h-screen snap-start items-center overflow-hidden">
        <img
          src={heroImg}
          alt={copy.hero.titleLines.join(" ")}
          width={1920}
          height={1280}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.12_0_0/0.94)_0%,oklch(0.12_0_0/0.72)_50%,oklch(0.12_0_0/0.35)_100%)]" />
        <div className="relative mx-auto w-full max-w-[1500px] -translate-y-[8vh] px-6 text-center md:px-10">
          <Reveal immediate>
            <p className="text-left text-[11px] uppercase tracking-[0.45em] text-gold">
              {copy.hero.eyebrow}
            </p>
          </Reveal>
          <Reveal immediate delay={140}>
            <h1 className="mt-8 max-w-3xl text-left font-display text-3xl leading-[1.2] text-beige md:text-5xl">
              {copy.hero.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </Reveal>
          <Reveal immediate delay={420}>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <L
                to="/"
                hash="services"
                className="inline-flex items-center px-2 py-4 text-[11px] uppercase tracking-[0.3em] text-beige/60 transition-colors hover:text-beige"
              >
                {copy.hero.ctaSecondary}
              </L>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-32 left-6 z-10 md:left-10">
          <L
            to="/collections"
            hash="sweet-moments"
            className="inline-flex h-13 items-center border border-beige px-10 py-4 text-[11px] uppercase tracking-[0.3em] text-beige transition-colors hover:bg-beige hover:text-ink"
          >
            {copy.hero.ctaPrimary}
          </L>
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

      {/* Our role — intro film */}
      <section
        id="services"
        className="relative flex min-h-screen snap-start items-center overflow-hidden border-t border-beige/10"
      >
        <div className="mx-auto w-full max-w-[1500px] px-6 py-24 pt-32 md:px-10">
          <Reveal delay={120}>
            <p className="text-[10px] uppercase tracking-[0.45em] text-gold/80">
              {biz.whatWeDo.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mx-auto mt-8 w-[115%] max-w-[1725px]">
              <div className="w-full" style={{ aspectRatio: "3840 / 1680" }}>
                <iframe
                  src="https://player.vimeo.com/video/1171266171?title=0&byline=0&portrait=0&badge=0&autopause=0&controls=0&loop=1&muted=1&autoplay=1&playsinline=1&app_id=58479"
                  title="홈페이지_인트로"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="size-full border-0"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={280}>
            <h2 className="mt-10 max-w-3xl font-display text-3xl leading-tight text-beige md:text-4xl">
              {biz.whatWeDo.title}
            </h2>
          </Reveal>
          <Reveal delay={340}>
            <p className="mt-5 max-w-xl text-sm leading-7 text-beige/55">{biz.whatWeDo.lead}</p>
          </Reveal>
        </div>
      </section>

      {/* What we do — four operating pillars */}
      <section
        id="what-we-do"
        className="relative flex min-h-screen snap-start items-center overflow-hidden border-t border-beige/10"
      >
        <div className="mx-auto w-full max-w-[1500px] px-6 py-24 pt-32 md:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.45em] text-gold/80">
              {biz.whatWeDo.eyebrow}
            </p>
          </Reveal>
          <div className="mt-14 grid gap-px bg-beige/15 md:grid-cols-2 lg:grid-cols-4">
            {biz.whatWeDo.cards.map((card, i) => {
              const Icon = SERVICE_ICONS[card.key];
              return (
                <Reveal key={card.key} delay={160 + i * 90} as="article">
                  <div className="h-full bg-ink p-8">
                    <Icon className="size-6 shrink-0 text-gold" strokeWidth={1} aria-hidden />
                    <h3 className="mt-8 font-display text-xl leading-snug text-beige">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-beige/55">{card.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Logistics & customs */}
      <section
        id="trade"
        className="relative flex min-h-screen snap-start items-center overflow-hidden border-t border-beige/10"
      >
        <div className="mx-auto w-full max-w-[1500px] px-6 py-24 pt-32 md:px-10">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="text-[10px] uppercase tracking-[0.45em] text-gold/80">
                  {biz.trade.eyebrow}
                </p>
              </Reveal>
              <Reveal delay={120}>
                <h2 className="mt-8 font-display text-3xl leading-tight text-beige md:text-5xl">
                  {biz.trade.title}
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-6 text-sm leading-7 text-beige/55">{biz.trade.subtitle}</p>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <dl className="border-t border-beige/15">
                {biz.trade.rows.map((row, i) => {
                  const Icon = TRADE_ICONS[row.key];
                  return (
                    <Reveal key={row.key} delay={160 + i * 90}>
                      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-5 border-b border-beige/15 py-7 sm:grid-cols-[auto_11rem_minmax(0,1fr)]">
                        <Icon className="size-5 shrink-0 text-gold" strokeWidth={1} aria-hidden />
                        <dt className="min-w-0 font-display text-lg text-beige">{row.label}</dt>
                        <dd className="col-span-2 min-w-0 text-sm leading-7 text-beige/55 sm:col-span-1">
                          {row.body}
                        </dd>
                      </div>
                    </Reveal>
                  );
                })}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Distribution */}
      <section
        id="distribution"
        className="relative flex min-h-screen snap-start items-center overflow-hidden border-t border-beige/10"
      >
        <div className="mx-auto w-full max-w-[1500px] px-6 py-24 pt-32 md:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.45em] text-gold/80">
              {biz.distribution.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-8 max-w-3xl font-display text-3xl leading-tight text-beige md:text-5xl">
              {biz.distribution.title}
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-sm leading-7 text-beige/55">{biz.distribution.lead}</p>
          </Reveal>

          <div className="mt-14 grid gap-12 md:grid-cols-2">
            {[
              { img: distOfflineImg, group: biz.distribution.offline },
              { img: distOnlineImg, group: biz.distribution.online },
            ].map(({ img, group }, i) => (
              <Reveal key={group.label} delay={260 + i * 120} as="article">
                <img
                  src={img}
                  alt={group.label}
                  width={1400}
                  height={1000}
                  loading="lazy"
                  className="aspect-[7/4] w-full object-cover grayscale-[0.35]"
                />
                <p className="mt-6 text-[10px] uppercase tracking-[0.35em] text-gold/80">
                  {group.label}
                </p>
                <ul className="mt-5 space-y-5">
                  {group.items.map((item) => (
                    <li key={item.title}>
                      <p className="font-display text-lg text-beige">{item.title}</p>
                      <p className="mt-1.5 text-sm leading-7 text-beige/55">{item.body}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Consulting */}
      <section
        id="consulting"
        className="relative flex min-h-screen snap-start items-center overflow-hidden border-t border-beige/10"
      >
        <div className="mx-auto grid w-full max-w-[1500px] items-center gap-14 px-6 py-24 pt-32 md:grid-cols-2 md:px-10">
          <Reveal>
            <img
              src={consultingImg}
              alt={biz.consulting.title}
              width={1400}
              height={1000}
              loading="lazy"
              className="aspect-[7/5] w-full object-cover grayscale-[0.3]"
            />
          </Reveal>
          <div>
            <Reveal delay={120}>
              <p className="text-[10px] uppercase tracking-[0.45em] text-gold/80">
                {biz.consulting.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <h2 className="mt-8 font-display text-3xl leading-tight text-beige md:text-5xl">
                {biz.consulting.title}
              </h2>
            </Reveal>
            <Reveal delay={280}>
              <p className="mt-8 max-w-lg text-sm leading-8 text-beige/60">{biz.consulting.body}</p>
            </Reveal>
            <Reveal delay={340}>
              <p className="mt-4 text-xs leading-6 text-beige/40">{biz.consulting.note}</p>
            </Reveal>
            <Reveal delay={420}>
              <L
                to="/"
                hash="inquiry"
                className="mt-12 inline-flex items-center border border-gold/60 px-10 py-4 text-[11px] uppercase tracking-[0.3em] text-gold transition-colors hover:bg-gold hover:text-ink"
              >
                {biz.consulting.cta}
              </L>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gift & B2B */}
      <section id="gift" className="relative flex min-h-screen snap-start items-center overflow-hidden md:h-screen">
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
