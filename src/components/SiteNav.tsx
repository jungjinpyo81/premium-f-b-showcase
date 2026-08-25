import { Link } from "@tanstack/react-router";
import { COLLECTIONS } from "@/lib/collections";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-10">
        <Link to="/" className="font-display text-lg tracking-[0.35em]">
          EUROPE CONNECT
        </Link>
        <nav className="hidden items-center gap-7 text-[10px] uppercase tracking-[0.22em] text-muted-foreground lg:flex">
          {COLLECTIONS.map((c) => (
            <Link
              key={c.slug}
              to="/collections/$slug"
              params={{ slug: c.slug }}
              activeProps={{ className: "text-foreground" }}
              className="hover:text-foreground"
            >
              {c.title}
            </Link>
          ))}
          <span className="h-3 w-px bg-border" />
          <Link
            to="/news"
            activeProps={{ className: "text-foreground" }}
            className="hover:text-foreground"
          >
            News
          </Link>
          <Link to="/" hash="inquiry" className="hover:text-foreground">
            Contact
          </Link>
        </nav>
        <Link
          to="/"
          hash="inquiry"
          className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground lg:hidden"
        >
          Contact
        </Link>
      </div>
      <div className="border-t border-border lg:hidden">
        <div className="mx-auto flex max-w-[1400px] gap-5 overflow-x-auto px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {COLLECTIONS.map((c) => (
            <Link
              key={c.slug}
              to="/collections/$slug"
              params={{ slug: c.slug }}
              activeProps={{ className: "text-foreground" }}
              className="whitespace-nowrap hover:text-foreground"
            >
              {c.title}
            </Link>
          ))}
          <Link to="/news" className="whitespace-nowrap hover:text-foreground">
            News
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 md:grid-cols-3 md:px-10">
        <div>
          <span className="font-display text-base tracking-[0.35em] text-foreground">
            EUROPE CONNECT
          </span>
          <p className="mt-5 max-w-xs text-xs leading-6 text-muted-foreground">
            유럽 프리미엄 F&amp;B 브랜드를 발굴하고 한국 시장에 안착시키는 큐레이터이자
            오퍼레이터입니다.
          </p>
        </div>
        <div className="text-xs leading-7 text-muted-foreground">
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-foreground">Collections</p>
          {COLLECTIONS.map((c) => (
            <Link
              key={c.slug}
              to="/collections/$slug"
              params={{ slug: c.slug }}
              className="block hover:text-foreground"
            >
              {c.title}
            </Link>
          ))}
        </div>
        <div className="text-xs leading-7 text-muted-foreground">
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-foreground">Partnership</p>
          <p>국내 리테일 유통 파트너 · 와이디컴퍼니(YD Company)</p>
          <p className="mt-4">Europe Connect · B2B Inquiry Only</p>
        </div>
      </div>
    </footer>
  );
}
