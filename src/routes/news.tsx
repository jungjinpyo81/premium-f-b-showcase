import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteNav } from "@/components/SiteNav";
import { NEWS } from "@/lib/news";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "공지 · 뉴스 | 유럽커넥트" },
      {
        name: "description",
        content:
          "유럽커넥트의 브랜드 파트너십 소식, 수입·통관 관련 공지, 국내 유통 채널 운영 업데이트를 확인하세요.",
      },
      { property: "og:title", content: "공지 · 뉴스 | 유럽커넥트" },
      {
        property: "og:description",
        content: "브랜드 파트너십 소식과 수입·통관 관련 공지 사항을 안내합니다.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: News,
});

function News() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
        <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">News</p>
        <h1 className="mt-8 font-display text-4xl leading-tight md:text-5xl">공지 · 뉴스</h1>
        <p className="mt-10 max-w-xl text-sm leading-8 text-muted-foreground">
          브랜드 파트너십 체결, 수입·통관 기준 변경, 채널 운영 관련 안내를 이곳에서 확인하실 수
          있습니다.
        </p>

        <div className="mt-20 border-t border-border">
          {NEWS.map((n) => (
            <article key={n.slug} className="border-b border-border py-12">
              <Link
                to="/news/$slug"
                params={{ slug: n.slug }}
                className="group grid gap-6 md:grid-cols-12"
              >
                <div className="flex items-baseline gap-6 md:col-span-3">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                    {n.category}
                  </span>
                  <time className="text-xs text-muted-foreground">{n.date}</time>
                </div>
                <div className="md:col-span-9">
                  <h2 className="font-display text-2xl group-hover:underline group-hover:underline-offset-8">
                    {n.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                    {n.summary}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
