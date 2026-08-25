import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import giftImg from "@/assets/gift.jpg";
import storyImg from "@/assets/story.jpg";
import logisticsImg from "@/assets/logistics.jpg";

import { InquiryForm } from "@/components/InquiryForm";
import { L } from "@/components/L";
import { Reveal } from "@/components/Reveal";
import { SiteFooter, SiteNav } from "@/components/SiteNav";
import { getCopy, useCopy } from "@/lib/content";

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

function Index() {
  const copy = useCopy();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative min-h-[94vh] overflow-hidden">
        <img
          src={heroImg}
          alt={copy.hero.titleLines.join(" ")}
          width={1920}
          height={1280}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.12_0_0/0.94)_0%,oklch(0.12_0_0/0.72)_50%,oklch(0.12_0_0/0.3)_100%)]" />
        <div className="relative mx-auto flex min-h-[94vh] max-w-[1400px] items-end px-6 pb-24 pt-40 md:px-10">
          <div className="max-w-3xl">
            <Reveal immediate>
              <p className="text-[11px] uppercase tracking-[0.45em] text-background/70">
                {copy.hero.eyebrow}
              </p>
            </Reveal>
            <Reveal immediate delay={120}>
              <h1 className="mt-10 font-display text-3xl leading-[1.15] text-background md:text-5xl">
                {copy.hero.titleLines.map((line, i) => (
                  <span key={line} className="block">
                    {i > 0 ? line : line}
                  </span>
                ))}
              </h1>
            </Reveal>
            <Reveal immediate delay={240}>
              <p className="mt-10 max-w-xl text-sm leading-8 text-background/75">
                {copy.hero.leadLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </Reveal>
            <Reveal immediate delay={360}>
              <div className="mt-12 flex flex-wrap items-center gap-4">
                <a
                  href="#inquiry"
                  className="inline-flex h-14 items-center justify-center bg-background px-10 text-[11px] uppercase tracking-[0.3em] text-foreground transition-opacity hover:opacity-90"
                >
                  {copy.hero.ctaPrimary}
                </a>
                <a
                  href="#role"
                  className="inline-flex h-14 items-center justify-center border border-background/40 px-10 text-[11px] uppercase tracking-[0.3em] text-background transition-colors hover:border-background"
                >
                  {copy.hero.ctaSecondary}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Figures */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px bg-border md:grid-cols-4">
          {copy.figures.map((f, i) => (
            <Reveal key={f.label} delay={i * 80} className="bg-background px-8 py-12">
              <p className="font-display text-4xl">{f.value}</p>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">{f.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Our role */}
      <section id="role" className="mx-auto max-w-[1400px] px-6 py-32 md:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <img
              src={storyImg}
              alt={copy.role.eyebrow}
              width={1200}
              height={1504}
              loading="lazy"
              className="w-full object-cover"
            />
          </Reveal>
          <div className="md:col-span-7">
            <Reveal delay={120}>
              <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
                {copy.role.eyebrow}
              </p>
              <h2 className="mt-8 max-w-xl font-display text-4xl leading-tight md:text-5xl">
                {copy.role.titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-12 max-w-2xl space-y-6 text-sm leading-8 text-foreground/85">
                {copy.role.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-y border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-10">
          <Reveal className="flex flex-wrap items-baseline justify-between gap-6">
            <h2 className="font-display text-4xl md:text-5xl">{copy.services.sourcing.title}</h2>
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              {copy.services.sourcing.subtitle}
            </p>
          </Reveal>
          <div className="mt-16 grid gap-px bg-border md:grid-cols-2">
            {copy.services.sourcing.items.map((s, i) => (
              <Reveal key={s.no} as="article" delay={i * 90} className="bg-background px-8 py-14">
                <p className="font-display text-sm tracking-[0.3em] text-muted-foreground">
                  {s.no}
                </p>
                <h3 className="mt-8 font-display text-2xl">{s.title}</h3>
                <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">{s.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-28 flex flex-wrap items-baseline justify-between gap-6">
            <h2 className="font-display text-4xl md:text-5xl">{copy.services.logistics.title}</h2>
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              {copy.services.logistics.subtitle}
            </p>
          </Reveal>
          <div className="mt-16 grid gap-px bg-border md:grid-cols-3">
            {copy.services.logistics.items.map((s, i) => (
              <Reveal key={s.no} as="article" delay={i * 90} className="bg-background px-8 py-14">
                <p className="font-display text-sm tracking-[0.3em] text-muted-foreground">
                  {s.no}
                </p>
                <h3 className="mt-8 font-display text-2xl">{s.title}</h3>
                <p className="mt-6 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Operating framework */}
      <section className="mx-auto max-w-[1400px] px-6 py-32 md:px-10">
        <div className="grid items-center gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
              {copy.framework.eyebrow}
            </p>
            <h2 className="mt-8 font-display text-4xl leading-tight md:text-5xl">
              {copy.framework.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <div className="mt-12 space-y-6 text-sm leading-8 text-foreground/85">
              {copy.framework.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} className="md:col-span-6">
            <img
              src={logisticsImg}
              alt={copy.framework.eyebrow}
              width={1408}
              height={1008}
              loading="lazy"
              className="w-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Collections */}
      <section id="collections" className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-10">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
              {copy.collectionsSection.eyebrow}
            </p>
            <h2 className="mt-8 max-w-2xl font-display text-4xl leading-tight md:text-5xl">
              {copy.collectionsSection.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>
          <div className="mt-20 border-t border-border">
            {copy.collections.map((c, i) => (
              <Reveal key={c.slug} delay={i * 70}>
                <L
                  to="/collections/$slug"
                  params={{ slug: c.slug }}
                  className="group grid gap-4 border-b border-border py-10 md:grid-cols-12 md:items-baseline"
                >
                  <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-3xl transition-opacity group-hover:opacity-60 md:col-span-4 md:text-4xl">
                    {c.title}
                  </h3>
                  <p className="text-sm leading-7 text-muted-foreground md:col-span-5">{c.lead}</p>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground md:col-span-2 md:text-right">
                    {c.titleLocal}
                  </p>
                </L>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gift & B2B */}
      <section id="gift" className="border-b border-border">
        <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-6 py-32 md:grid-cols-12 md:px-10">
          <Reveal className="md:col-span-6">
            <img
              src={giftImg}
              alt={copy.gift.eyebrow}
              width={1408}
              height={1008}
              loading="lazy"
              className="w-full object-cover"
            />
          </Reveal>
          <Reveal delay={120} className="md:col-span-6">
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
              {copy.gift.eyebrow}
            </p>
            <h2 className="mt-8 font-display text-4xl leading-tight md:text-5xl">
              {copy.gift.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-10 max-w-lg text-sm leading-8 text-muted-foreground">
              {copy.gift.lead}
            </p>
            <dl className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2">
              {copy.gift.cards.map((card) => (
                <div key={card.title} className="bg-background px-6 py-8">
                  <dt className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                    {card.title}
                  </dt>
                  <dd className="mt-4 text-sm leading-7 text-muted-foreground">{card.body}</dd>
                </div>
              ))}
            </dl>
            <a
              href="#inquiry"
              className="mt-12 inline-flex h-14 items-center bg-foreground px-10 text-[11px] uppercase tracking-[0.3em] text-background transition-opacity hover:opacity-90"
            >
              {copy.gift.cta}
            </a>
          </Reveal>
        </div>
      </section>

      {/* Inquiry */}
      <section id="inquiry" className="border-t border-border">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-6 py-32 md:grid-cols-12 md:px-10">
          <Reveal className="md:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
              {copy.inquiry.eyebrow}
            </p>
            <h2 className="mt-8 font-display text-4xl leading-tight md:text-5xl">
              {copy.inquiry.title}
            </h2>
            <p className="mt-10 max-w-sm text-sm leading-7 text-muted-foreground">
              {copy.inquiry.lead}
            </p>
          </Reveal>
          <Reveal delay={120} className="md:col-span-7">
            <InquiryForm />
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
