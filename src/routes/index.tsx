import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroImg from "@/assets/hero.jpg";
import storyImg from "@/assets/story.jpg";
import logisticsImg from "@/assets/logistics.jpg";
import { InquiryForm } from "@/components/InquiryForm";
import { defaultContent, loadContent, type SiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAISON GRAIN — 프리미엄 F&B 브랜드 컨설팅 에이전시" },
      {
        name: "description",
        content:
          "상위 0.1% 다이닝 브랜드를 위한 F&B 컨설팅. 메뉴 개발, 공간 서사, 정온 콜드체인 공급까지 하나의 팀이 설계합니다.",
      },
      { property: "og:title", content: "MAISON GRAIN — 프리미엄 F&B 브랜드 컨설팅" },
      {
        property: "og:description",
        content: "메뉴 개발부터 콜드체인 공급까지, 프리미엄 다이닝 브랜드를 위한 통합 파트너.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const FIGURES = [
  { value: "137", label: "프리미엄 브랜드 파트너십" },
  { value: "18h", label: "산지–매장 평균 리드타임" },
  { value: "0.3%", label: "정온 이탈률" },
  { value: "14y", label: "다이닝 컨설팅 경력" },
];

const SERVICES = [
  {
    no: "01",
    title: "Brand Architecture",
    body: "브랜드의 언어, 가격 구조, 고객 동선을 하나의 서사로 정렬합니다. 오픈 이전 6개월의 설계가 이후 6년을 결정합니다.",
  },
  {
    no: "02",
    title: "Culinary Development",
    body: "시그니처 메뉴 개발과 원가·수율 설계를 동시에 진행합니다. 주방 인력이 바뀌어도 동일한 접시가 나오는 레시피 체계를 남깁니다.",
  },
  {
    no: "03",
    title: "Supply & Cold Chain",
    body: "산지 계약부터 정온 물류, 매장 검수까지 직접 운영합니다. 품질 편차를 계약이 아니라 시스템으로 관리합니다.",
  },
];

function Index() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  useEffect(() => setContent(loadContent()), []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-20 border-b border-primary-foreground/15 bg-transparent">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-10">
          <span className="font-display text-lg tracking-[0.35em] text-primary-foreground">
            MAISON GRAIN
          </span>
          <nav className="flex items-center gap-8 text-[11px] uppercase tracking-[0.25em] text-primary-foreground/80">
            <a href="#story" className="hidden hover:text-primary-foreground md:inline">
              Story
            </a>
            <a href="#services" className="hidden hover:text-primary-foreground md:inline">
              Services
            </a>
            <Link to="/admin" className="hover:text-primary-foreground">
              Admin
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[92vh] overflow-hidden">
        <img
          src={heroImg}
          alt="어두운 조명 아래 요리를 마무리하는 셰프의 손"
          width={1920}
          height={1280}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.14_0.01_60/0.92)_0%,oklch(0.14_0.01_60/0.7)_45%,oklch(0.14_0.01_60/0.25)_100%)]" />
        <div className="relative mx-auto flex min-h-[92vh] max-w-[1400px] items-end px-6 pb-24 pt-40 md:px-10">
          <div className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.45em] text-primary-foreground/70">
              Premium F&amp;B Agency · Since 2011
            </p>
            <h1 className="mt-8 font-display text-5xl leading-[1.05] text-primary-foreground md:text-7xl">
              한 접시의 완성도가
              <br />
              브랜드의 격을 정합니다.
            </h1>
            <p className="mt-8 max-w-xl text-sm leading-8 text-primary-foreground/75">
              상위 0.1%의 다이닝 브랜드만을 위한 통합 파트너. 메뉴 설계와 공간 서사, 정온 콜드체인
              공급까지 한 팀이 책임집니다.
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <a
                href="#inquiry"
                className="inline-flex h-14 items-center justify-center bg-primary-foreground px-10 text-[11px] uppercase tracking-[0.3em] text-primary transition-opacity hover:opacity-90"
              >
                프로젝트 문의하기
              </a>
              <a
                href="#story"
                className="inline-flex h-14 items-center justify-center border border-primary-foreground/40 px-10 text-[11px] uppercase tracking-[0.3em] text-primary-foreground transition-colors hover:border-primary-foreground"
              >
                브랜드 스토리
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Figures */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px bg-border px-0 md:grid-cols-4">
          {FIGURES.map((f) => (
            <div key={f.label} className="bg-background px-8 py-12">
              <p className="font-display text-4xl">{f.value}</p>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">{f.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story — magazine two column */}
      <section id="story" className="mx-auto max-w-[1400px] px-6 py-28 md:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <img
              src={storyImg}
              alt="해질녘 프리미엄 레스토랑 내부"
              width={1200}
              height={1504}
              loading="lazy"
              className="w-full object-cover"
            />
          </div>
          <div className="md:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
              Brand Story
            </p>
            <h2 className="mt-6 max-w-lg font-display text-4xl leading-tight md:text-5xl">
              화려함이 아니라, 반복 가능한 완성도.
            </h2>
            <div
              className="rich-content mt-10 max-w-2xl text-sm leading-8 text-foreground/85"
              dangerouslySetInnerHTML={{ __html: content.brandStory }}
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10">
          <h2 className="font-display text-4xl md:text-5xl">Services</h2>
          <div className="mt-16 grid gap-px bg-border md:grid-cols-3">
            {SERVICES.map((s) => (
              <article key={s.no} className="bg-background px-8 py-12">
                <p className="font-display text-sm tracking-[0.3em] text-muted-foreground">
                  {s.no}
                </p>
                <h3 className="mt-6 font-display text-2xl">{s.title}</h3>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Logistics */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10">
        <div className="grid items-center gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
              Logistics
            </p>
            <h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
              온도는 약속이고,
              <br /> 시간은 품질입니다.
            </h2>
            <div
              className="rich-content mt-10 text-sm leading-8 text-foreground/85"
              dangerouslySetInnerHTML={{ __html: content.logistics }}
            />
          </div>
          <div className="md:col-span-6">
            <img
              src={logisticsImg}
              alt="프리미엄 식자재 정온 물류 센터"
              width={1408}
              height={1008}
              loading="lazy"
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Inquiry */}
      <section id="inquiry" className="border-t border-border bg-secondary/40">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-6 py-28 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">Inquiry</p>
            <h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
              프로젝트를 시작하시겠습니까.
            </h2>
            <p className="mt-8 max-w-sm text-sm leading-7 text-muted-foreground">
              몇 가지 항목만 선택하시면 담당 디렉터가 배정되어 영업일 기준 24시간 내에
              회신드립니다.
            </p>
          </div>
          <div className="md:col-span-7">
            <InquiryForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-6 py-10 text-xs text-muted-foreground md:px-10">
          <span className="font-display tracking-[0.35em] text-foreground">MAISON GRAIN</span>
          <span>서울시 성동구 연무장길 · contact@maisongrain.kr</span>
        </div>
      </footer>
    </div>
  );
}
