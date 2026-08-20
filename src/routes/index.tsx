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
      { title: "유럽커넥트 | 유럽 프리미엄 F&B 소싱·수입 물류 컨설팅" },
      {
        name: "description",
        content:
          "유럽 프리미엄 F&B 브랜드와 한국 시장을 잇는 브릿지. 17년 이상의 소싱·통관·물류·유통 채널 통합 오퍼레이팅을 제공하는 B2B 컨설팅 에이전시입니다.",
      },
      { property: "og:title", content: "유럽커넥트 | 유럽 프리미엄 F&B 소싱·물류 컨설팅" },
      {
        property: "og:description",
        content:
          "브랜드 소싱부터 수입 통관, 물류 프레임워크, 유통 채널 입점까지 통합 관리하는 전문 오퍼레이터.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const FIGURES = [
  { value: "17+", label: "수입·유통 오퍼레이팅 경력" },
  { value: "EU", label: "유럽 현지 소싱 네트워크" },
  { value: "1:1", label: "브랜드 전담 디렉터 배정" },
  { value: "B2B", label: "폐쇄형 파트너십 구조" },
];

const LOGISTICS_SERVICES = [
  {
    no: "01",
    title: "수입 통관 컨설팅",
    body: "품목 분류, 라벨 심사, 성분 검토, 식약처 신고까지 수입 절차 전반을 사전 설계합니다. 통관 지연과 반송 리스크를 계약 이전 단계에서 제거합니다.",
  },
  {
    no: "02",
    title: "물류 프레임워크 구축",
    body: "유럽 산지 출고부터 국내 입고까지 온도대별 정온 관리 체계를 설계하고, 리드타임과 재고 회전을 브랜드 규모에 맞춰 표준화합니다.",
  },
  {
    no: "03",
    title: "유통 채널 입점 운영",
    body: "프리미엄 그로서리, 호텔·다이닝, 온라인 등\n채널별 입점 전략과 가격 구조를 정렬하고, 입점 이후의 운영까지 이어서 관리합니다.",
  },
];

const SOURCING_SERVICES = [
  {
    no: "04",
    title: "브랜드 발굴 및 큐레이션",
    body: "유럽 현지 네트워크를 통해 한국 시장에 적합한 브랜드를 직접 검증하고 선별합니다. 제조가 아닌 큐레이션이 우리의 역할입니다.",
  },
  {
    no: "05",
    title: "독점 계약 및 브랜드 관리",
    body: "수입 판권 협상과 브랜드 가이드라인 이행을 관리하여, 국내에서도 원 브랜드의 격이 유지되도록 합니다.",
  },
];

function Index() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  useEffect(() => setContent(loadContent()), []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-20 border-b border-background/20">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-10">
          <span className="font-display text-lg tracking-[0.35em] text-background">
            EUROPE CONNECT
          </span>
          <nav className="flex items-center gap-8 text-[11px] uppercase tracking-[0.25em] text-background/80">
            <a href="#role" className="hidden hover:text-background md:inline">
              Our Role
            </a>
            <a href="#services" className="hidden hover:text-background md:inline">
              Services
            </a>
            <a href="#services" className="hidden hover:text-background md:inline">
              Services
            </a>
            <Link to="/admin" className="hover:text-background">
              Admin
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[94vh] overflow-hidden">
        <img
          src={heroImg}
          alt="유럽 현지 프리미엄 식품 보관 창고 내부"
          width={1920}
          height={1280}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.12_0_0/0.94)_0%,oklch(0.12_0_0/0.72)_50%,oklch(0.12_0_0/0.3)_100%)]" />
        <div className="relative mx-auto flex min-h-[94vh] max-w-[1400px] items-end px-6 pb-24 pt-40 md:px-10">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.45em] text-background/70">
              Europe Connect · F&amp;B Sourcing &amp; Logistics Consulting
            </p>
            <h1 className="mt-10 font-display text-3xl leading-[1.15] text-background md:text-5xl">
              글로벌 프리미엄 F&B브랜드와
              <br />
              한국 시장을 잇는 브릿지
            </h1>
            <p className="mt-10 max-w-xl text-sm leading-8 text-background/75">
              17년 이상의 소싱·통관·물류 실무 위에서, 브랜드가 한국 시장에 안착하기까지의 모든
              <br />
              과정을 하나의 팀이 통합 관리합니다.
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <a
                href="#inquiry"
                className="inline-flex h-14 items-center justify-center bg-background px-10 text-[11px] uppercase tracking-[0.3em] text-foreground transition-opacity hover:opacity-90"
              >
                파트너십 문의
              </a>
              <a
                href="#role"
                className="inline-flex h-14 items-center justify-center border border-background/40 px-10 text-[11px] uppercase tracking-[0.3em] text-background transition-colors hover:border-background"
              >
                우리의 역할
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Figures */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px bg-border md:grid-cols-4">
          {FIGURES.map((f) => (
            <div key={f.label} className="bg-background px-8 py-12">
              <p className="font-display text-4xl">{f.value}</p>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">{f.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our role — editorial column */}
      <section id="role" className="mx-auto max-w-[1400px] px-6 py-32 md:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <img
              src={storyImg}
              alt="유럽 프리미엄 식자재 정물 사진"
              width={1200}
              height={1504}
              loading="lazy"
              className="w-full object-cover"
            />
          </div>
          <div className="md:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">Our Role</p>
            <h2 className="mt-8 max-w-xl font-display text-4xl leading-tight md:text-5xl">
              우리는 상품과 고객을
              <br />
              연결하고{"\u00a0"}
            </h2>
            <div
              className="rich-content mt-12 max-w-2xl text-sm leading-8 text-foreground/85"
              dangerouslySetInnerHTML={{ __html: content.brandStory }}
            />
          </div>
        </div>
      </section>

      {/* Services — logistics 30% weight */}
      <section id="services" className="border-y border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-10">
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <h2 className="font-display text-4xl md:text-5xl">Logistics &amp; Customs</h2>
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              물류 · 통관 컨설팅
            </p>
          </div>
          <div className="mt-16 grid gap-px bg-border md:grid-cols-3">
            {LOGISTICS_SERVICES.map((s) => (
              <article key={s.no} className="bg-background px-8 py-14">
                <p className="font-display text-sm tracking-[0.3em] text-muted-foreground">
                  {s.no}
                </p>
                <h3 className="mt-8 font-display text-2xl">{s.title}</h3>
                <p className="mt-6 text-sm leading-7 text-muted-foreground whitespace-pre-line">{s.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-28 flex flex-wrap items-baseline justify-between gap-6">
            <h2 className="font-display text-4xl md:text-5xl">Brand Sourcing</h2>
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              브랜드 소싱 · 큐레이션
            </p>
          </div>
          <div className="mt-16 grid gap-px bg-border md:grid-cols-2">
            {SOURCING_SERVICES.map((s) => (
              <article key={s.no} className="bg-background px-8 py-14">
                <p className="font-display text-sm tracking-[0.3em] text-muted-foreground">
                  {s.no}
                </p>
                <h3 className="mt-8 font-display text-2xl">{s.title}</h3>
                <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Logistics detail */}
      <section className="mx-auto max-w-[1400px] px-6 py-32 md:px-10">
        <div className="grid items-center gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
              Operating Framework
            </p>
            <h2 className="mt-8 font-display text-4xl leading-tight md:text-5xl">
              통관은 절차가 아니라
              <br /> 설계의 문제입니다.
            </h2>
            <div
              className="rich-content mt-12 text-sm leading-8 text-foreground/85"
              dangerouslySetInnerHTML={{ __html: content.logistics }}
            />
          </div>
          <div className="md:col-span-6">
            <img
              src={logisticsImg}
              alt="정온 콜드체인 물류 센터 통로"
              width={1408}
              height={1008}
              loading="lazy"
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Inquiry */}
      <section id="inquiry" className="border-t border-border">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-6 py-32 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">Contact</p>
            <h2 className="mt-8 font-display text-4xl leading-tight md:text-5xl">
              B2B 파트너십 문의.
            </h2>
            <p className="mt-10 max-w-sm text-sm leading-7 text-muted-foreground">
              몇 가지 항목만 선택하고 목적을 남겨주시면, 담당 디렉터가 배정되어 영업일 기준 24시간
              내에 회신드립니다.
            </p>
          </div>
          <div className="md:col-span-7">
            <InquiryForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-6 py-10 text-xs text-muted-foreground md:px-10">
          <span className="font-display tracking-[0.35em] text-foreground">EUROPE CONNECT</span>
          <span>Europe Connect · B2B Inquiry Only</span>
        </div>
      </footer>
    </div>
  );
}
