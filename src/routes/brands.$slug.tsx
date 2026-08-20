import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteFooter, SiteNav } from "@/components/SiteNav";
import { getBrand } from "@/lib/brands";

export const Route = createFileRoute("/brands/$slug")({
  loader: ({ params }) => {
    const brand = getBrand(params.slug);
    if (!brand) throw notFound();
    return { brand };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "브랜드를 찾을 수 없습니다 | 유럽커넥트" }, { name: "robots", content: "noindex" }],
      };
    }
    const { brand } = loaderData;
    const title = `${brand.name} (${brand.nameEn}) | 유럽커넥트`;
    return {
      meta: [
        { title },
        { name: "description", content: brand.intro.slice(0, 150) },
        { property: "og:title", content: title },
        { property: "og:description", content: brand.tagline },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: BrandNotFound,
  component: BrandDetail,
});

function BrandNotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-[1400px] px-6 py-32 md:px-10">
        <h1 className="font-display text-4xl">브랜드를 찾을 수 없습니다.</h1>
        <Link to="/brands" className="mt-8 inline-block text-sm underline underline-offset-4">
          브랜드 목록으로
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}

function BrandDetail() {
  const { brand } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
        <Link
          to="/brands"
          className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground"
        >
          ← Brands
        </Link>

        <div className="mt-12 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
              {brand.origin} · {brand.category}
            </p>
            <h1 className="mt-8 font-display text-5xl leading-tight">{brand.name}</h1>
            <p className="mt-4 text-xs uppercase tracking-[0.35em] text-muted-foreground">
              {brand.nameEn}
            </p>
          </div>
          <div className="md:col-span-7">
            <p className="font-display text-2xl leading-relaxed">{brand.tagline}</p>
            <p className="mt-10 text-sm leading-8 text-foreground/85">{brand.intro}</p>
          </div>
        </div>

        <div className="mt-24 grid gap-px bg-border md:grid-cols-3">
          {brand.highlights.map((h) => (
            <section key={h.title} className="bg-background px-8 py-12">
              <h2 className="font-display text-xl">{h.title}</h2>
              <p className="mt-6 text-sm leading-7 text-muted-foreground">{h.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-24 border-t border-border pt-12">
          <Link
            to="/"
            hash="inquiry"
            className="inline-flex h-14 items-center bg-primary px-10 text-[11px] uppercase tracking-[0.3em] text-primary-foreground hover:opacity-90"
          >
            브랜드 파트너십 문의
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
