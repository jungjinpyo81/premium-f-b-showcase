import { createFileRoute } from "@tanstack/react-router";
import { Globe2, LineChart, Store, Truck } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { SiteFooter, SiteNav } from "@/components/SiteNav";
import { useBusiness } from "@/lib/content";
import { BUSINESS } from "@/lib/content/business";
import { DEFAULT_LOCALE, isLocale } from "@/lib/content/types";

export const Route = createFileRoute("/what-we-do")({
  loaderDeps: ({ search }) => ({ lang: search.lang }),
  loader: ({ deps }) => ({ lang: deps.lang }),
  head: ({ loaderData }) => {
    const locale = isLocale(loaderData?.lang) ? loaderData.lang : DEFAULT_LOCALE;
    const biz = BUSINESS[locale];
    return {
      meta: [
        { title: `${biz.whatWeDo.title} | EUROPE CONNECT` },
        { name: "description", content: biz.whatWeDo.lead },
        { property: "og:title", content: biz.whatWeDo.title },
        { property: "og:description", content: biz.whatWeDo.lead },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "/what-we-do" }],
    };
  },
  component: WhatWeDoPage,
});

const SERVICE_ICONS = {
  globe: Globe2,
  truck: Truck,
  store: Store,
  chart: LineChart,
} as const;

function WhatWeDoPage() {
  const biz = useBusiness();
  return (
    <div className="bg-ink text-beige">
      <SiteNav />

      {/* Our role — intro film */}
      <section
        id="services"
        className="relative flex min-h-screen snap-start items-center overflow-hidden border-t border-beige/10"
      >
        <div className="mx-auto w-full max-w-[1500px] px-6 py-24 pt-32 md:px-10">
          <Reveal delay={120}>
            <p className="text-[10px] uppercase tracking-[0.45em] text-gold/80">WHAT WE DO</p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mx-auto mt-8" style={{ width: "88%" }}>
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
        </div>
      </section>

      {/* What we do — four operating pillars */}
      <section
        id="what-we-do"
        className="relative flex min-h-screen snap-start items-center overflow-hidden border-t border-beige/10"
      >
        <div className="mx-auto w-full max-w-[1500px] px-6 py-24 pt-32 md:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.45em] text-gold/80">{biz.whatWeDo.eyebrow}</p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-8 max-w-3xl font-display text-3xl leading-tight text-beige md:text-5xl">
              {biz.whatWeDo.title}
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-sm leading-7 text-beige/55">{biz.whatWeDo.lead}</p>
          </Reveal>
          <div className="mt-14 grid gap-px bg-beige/15 md:grid-cols-2 lg:grid-cols-4">
            {biz.whatWeDo.cards.map((card, i) => {
              const Icon = SERVICE_ICONS[card.key];
              return (
                <Reveal key={card.key} delay={260 + i * 90} as="article">
                  <div className="h-full bg-ink p-8">
                    <Icon className="size-6 shrink-0 text-gold" strokeWidth={1} aria-hidden />
                    <h3 className="mt-8 font-display text-xl leading-snug text-beige">{card.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-beige/55">{card.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
