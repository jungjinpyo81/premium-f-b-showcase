import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RichTextEditor } from "@/components/RichTextEditor";
import { defaultContent, loadContent, saveContent, type SiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "콘텐츠 관리자 — MAISON GRAIN" },
      {
        name: "description",
        content: "브랜드 스토리와 물류 정보를 글꼴·정렬까지 시각적으로 편집하는 관리자 페이지.",
      },
      { property: "og:title", content: "콘텐츠 관리자 — MAISON GRAIN" },
      { property: "og:description", content: "브랜드 스토리와 물류 정보를 직접 편집합니다." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Admin,
});

function Admin() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setContent(loadContent());
    setReady(true);
  }, []);

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link to="/" className="font-display text-sm tracking-[0.35em]">
            MAISON GRAIN
          </Link>
          <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Content Admin
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-14">
        <h1 className="font-display text-4xl">콘텐츠 편집</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          글꼴, 크기, 정렬을 버튼으로 조정하면 메인 페이지에 그대로 반영됩니다.
        </p>

        {ready ? (
          <div className="mt-12 space-y-14">
            <RichTextEditor
              label="브랜드 스토리"
              hint="메인 페이지 Story 섹션"
              value={content.brandStory}
              onChange={(html) => setContent((c) => ({ ...c, brandStory: html }))}
            />
            <RichTextEditor
              label="물류 정보"
              hint="메인 페이지 Logistics 섹션"
              value={content.logistics}
              onChange={(html) => setContent((c) => ({ ...c, logistics: html }))}
            />

            <div className="flex flex-wrap items-center gap-4 border-t border-border pt-8">
              <button
                type="button"
                onClick={() => {
                  saveContent(content);
                  toast.success("저장되었습니다. 메인 페이지에 반영됩니다.");
                }}
                className="inline-flex h-12 items-center bg-primary px-8 text-[11px] uppercase tracking-[0.3em] text-primary-foreground hover:opacity-90"
              >
                저장하기
              </button>
              <button
                type="button"
                onClick={() => {
                  saveContent(defaultContent);
                  window.location.reload();
                }}
                className="inline-flex h-12 items-center border border-border px-8 text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:border-primary"
              >
                기본값 복원
              </button>
              <Link
                to="/"
                className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                메인 페이지 보기
              </Link>
            </div>

            <section className="space-y-4">
              <h2 className="font-display text-xl">미리보기</h2>
              <div className="space-y-10 border border-border bg-background p-8">
                <div
                  className="rich-content text-sm leading-8"
                  dangerouslySetInnerHTML={{ __html: content.brandStory }}
                />
                <div
                  className="rich-content text-sm leading-8"
                  dangerouslySetInnerHTML={{ __html: content.logistics }}
                />
              </div>
            </section>
          </div>
        ) : null}
      </main>
    </div>
  );
}
