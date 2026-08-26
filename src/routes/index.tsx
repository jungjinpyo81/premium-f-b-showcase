import { createFileRoute } from "@tanstack/react-router";

import { SiteNav } from "@/components/SiteNav";
import { getCopy } from "@/lib/content";

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
  return (
    <div className="bg-ink text-beige">
      <SiteNav />
      <main className="relative h-screen w-full overflow-hidden">
        <iframe
          src="https://player.vimeo.com/video/1171266171?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
          title="홈페이지_인트로"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
          style={{
            width: "100vw",
            height: "43.75vw",
            minWidth: "228.571vh",
            minHeight: "100vh",
          }}
        />
      </main>
    </div>
  );
}
