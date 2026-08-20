import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteNav } from "@/components/SiteNav";
import { BRANDS } from "@/lib/brands";

export const Route = createFileRoute("/brands")({
  head: () => ({
    meta: [
      { title: "브랜드 포트폴리오 | 유럽커넥트" },
      {
        name: "description",
        content:
          "메종 마제, 코코바, 테라델투오노, 아케인아일랜드 등 유럽커넥트가 국내에 소개하는 프리미엄 F&B 브랜드 포트폴리오입니다.",
      },
      { property: "og:title", content: "브랜드 포트폴리오 | 유럽커넥트" },
      {
        property: "og:description",
        content: "유럽 현지에서 직접 검증하고 선별한 프리미엄 F&B 브랜드를 소개합니다.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Brands,
});

function Brands() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
        <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">Brands</p>
        <h1 className="mt-8 max-w-2xl font-display text-4xl leading-tight md:text-5xl">
          유럽 현지에서 직접 검증한
          <br />
          브랜드 포트폴리오
        </h1>
        <p className="mt-10 max-w-xl text-sm leading-8 text-muted-foreground">
          제조가 아닌 큐레이션이 우리의 역할입니다. 한국 시장의 채널 구조와 소비 맥락에 맞는
          브랜드만을 선별해 소개합니다.
        </p>

        <div className="mt-20 grid gap-px border border-border bg-border md:grid-cols-2">
          {BRANDS.map((b) => (
            <article key={b.slug} className="bg-background px-8 py-14">
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                {b.origin} · {b.category}
              </p>
              <h2 className="mt-8 font-display text-3xl">{b.name}</h2>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {b.nameEn}
              </p>
              <p className="mt-8 max-w-md text-sm leading-7 text-muted-foreground">{b.tagline}</p>
              <Link
                to="/brands/$slug"
                params={{ slug: b.slug }}
                className="mt-10 inline-flex h-12 items-center border border-border px-8 text-[11px] uppercase tracking-[0.3em] transition-colors hover:border-primary"
              >
                브랜드 보기
              </Link>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
