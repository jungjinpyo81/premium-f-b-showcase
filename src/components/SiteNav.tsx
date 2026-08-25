import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { COLLECTIONS } from "@/lib/collections";

function TasteJourneyDropdown({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isLight = variant === "light";

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 ${isLight ? "hover:text-background" : "hover:text-foreground"}`}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        Taste Journey
        <svg
          width="8"
          height="5"
          viewBox="0 0 8 5"
          fill="currentColor"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M0 0h8L4 5z" />
        </svg>
      </button>
      {open && (
        <div
          className={`absolute left-0 top-full z-50 min-w-[14rem] border py-2 shadow-sm ${isLight ? "border-background/20 bg-background" : "border-border bg-background"}`}
        >
          {COLLECTIONS.map((c) => (
            <Link
              key={c.slug}
              to="/collections/$slug"
              params={{ slug: c.slug }}
              activeProps={{ className: "text-foreground" }}
              className={`block px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] hover:bg-muted/40 hover:text-foreground ${isLight ? "text-foreground/80" : "text-muted-foreground"}`}
              onClick={() => setOpen(false)}
            >
              {c.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function SiteNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-10">
        <Link to="/" className="font-display text-lg tracking-[0.35em]">
          EUROPE CONNECT
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-7 text-[10px] uppercase tracking-[0.22em] text-muted-foreground lg:flex">
          <TasteJourneyDropdown variant="dark" />

          <Link
            to="/"
            hash="services"
            activeProps={{ className: "text-foreground" }}
            className="hover:text-foreground"
          >
            Brand Sourcing
          </Link>
          <Link
            to="/"
            hash="services"
            activeProps={{ className: "text-foreground" }}
            className="hover:text-foreground"
          >
            Logistics & Customs
          </Link>

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

      {/* Mobile */}
      <div className="border-t border-border lg:hidden">
        <div className="mx-auto flex max-w-[1400px] gap-5 overflow-x-auto px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <Link to="/" hash="services" className="whitespace-nowrap hover:text-foreground">
            Brand Sourcing
          </Link>
          <Link to="/" hash="services" className="whitespace-nowrap hover:text-foreground">
            Logistics & Customs
          </Link>
          <Link to="/news" className="whitespace-nowrap hover:text-foreground">
            News
          </Link>
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
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-foreground">Taste Journey</p>
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
          <Link to="/" hash="services" className="mt-4 block hover:text-foreground">
            Brand Sourcing
          </Link>
          <Link to="/" hash="services" className="block hover:text-foreground">
            Logistics & Customs
          </Link>
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
