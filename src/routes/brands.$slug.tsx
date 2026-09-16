import { createFileRoute, notFound } from "@tanstack/react-router";

import { L } from "@/components/L";
import { Reveal } from "@/components/Reveal";
import { SiteFooter, SiteNav } from "@/components/SiteNav";
import { getBrand, getCopy, useCopy, useLocale } from "@/lib/content";

export const Route = createFileRoute("/brands/$slug")({
  staticData: { sitemap: true },
  loaderDeps: ({ search }) => ({ lang: search.lang }),
  loader: ({ params, deps }) => {
    const brand = getBrand(getCopy(deps.lang), params.slug);
    if (!brand) throw notFound();
    return { lang: deps.lang, slug: params.slug };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Not found | Europe Connect" }, { name: "robots", content: "noindex" }],
      };
    }
    const copy = getCopy(loaderData.lang);
    const brand = getBrand(copy, loaderData.slug)!;
    const title = `${brand.name} (${brand.nameEn}) | Europe Connect`;
    return {
      meta: [
        { title },
        { name: "description", content: brand.intro.slice(0, 150) },
        { property: "og:title", content: title },
        { property: "og:description", content: brand.tagline },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/brands/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/brands/${params.slug}` }],
    };
  },
  notFoundComponent: BrandNotFound,
  component: BrandDetail,
});

function BrandNotFound() {
  const copy = useCopy();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-[1400px] px-6 pb-32 pt-36 md:px-10">
        <h1 className="font-display text-4xl">{copy.pages.brandDetail.notFound}</h1>
        <L to="/brands" className="mt-8 inline-block text-sm underline underline-offset-4">
          {copy.pages.brandDetail.backToList}
        </L>
      </main>
      <SiteFooter />
    </div>
  );
}

function BrandDetail() {
  const copy = useCopy();
  const locale = useLocale();
  const { slug } = Route.useParams();
  const brand = getBrand(copy, slug);

  if (!brand) return <BrandNotFound />;

  return (
    <div className="min-h-screen bg-background text-foreground" key={locale}>
      <SiteNav />
      <main className="mx-auto max-w-[1400px] px-6 pb-24 pt-36 md:px-10">
        <L
          to="/brands"
          className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground"
        >
          {copy.pages.brandDetail.back}
        </L>

        <div className="mt-12 grid gap-16 md:grid-cols-12">
          <Reveal immediate className="md:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
              {brand.origin} · {brand.category}
            </p>
            <h1 className="mt-8 font-display text-5xl leading-tight">{brand.name}</h1>
            <p className="mt-4 text-xs uppercase tracking-[0.35em] text-muted-foreground">
              {brand.nameEn}
            </p>
          </Reveal>
          <Reveal immediate delay={140} className="md:col-span-7">
            <p className="font-display text-2xl leading-relaxed">{brand.tagline}</p>
            <p className="mt-10 text-sm leading-8 text-foreground/85">{brand.intro}</p>
          </Reveal>
        </div>

        <div className="mt-24 grid gap-px bg-border md:grid-cols-3">
          {brand.highlights.map((h, i) => (
            <Reveal key={h.title} as="section" delay={i * 90} className="bg-background px-8 py-12">
              <h2 className="font-display text-xl">{h.title}</h2>
              <p className="mt-6 text-sm leading-7 text-muted-foreground">{h.body}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 border-t border-border pt-12">
          <L
            to="/"
            hash="inquiry"
            className="inline-flex h-14 items-center bg-primary px-10 text-[11px] uppercase tracking-[0.3em] text-primary-foreground hover:opacity-90"
          >
            {copy.pages.brandDetail.cta}
          </L>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
