import { useEffect, useRef, useState } from "react";

import { L } from "@/components/L";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { useCopy } from "@/lib/content";

function TasteJourneyDropdown({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const copy = useCopy();
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
        {copy.nav.tasteJourney}
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
          {copy.collections.map((c) => (
            <L
              key={c.slug}
              to="/collections/$slug"
              params={{ slug: c.slug }}
              activeProps={{ className: "text-foreground" }}
              className={`block px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] hover:bg-muted/40 hover:text-foreground ${isLight ? "text-foreground/80" : "text-muted-foreground"}`}
              onClick={() => setOpen(false)}
            >
              {c.title}
            </L>
          ))}
        </div>
      )}
    </div>
  );
}

export function SiteNav() {
  const copy = useCopy();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-10">
        <L to="/" className="font-display text-lg tracking-[0.35em]">
          EUROPE CONNECT
        </L>

        {/* Desktop */}
        <nav className="hidden items-center gap-7 text-[10px] uppercase tracking-[0.22em] text-muted-foreground lg:flex">
          <TasteJourneyDropdown variant="dark" />

          <L
            to="/"
            hash="services"
            activeProps={{ className: "text-foreground" }}
            className="hover:text-foreground"
          >
            {copy.nav.sourcing}
          </L>
          <L
            to="/"
            hash="services"
            activeProps={{ className: "text-foreground" }}
            className="hover:text-foreground"
          >
            {copy.nav.logistics}
          </L>

          <span className="h-3 w-px bg-border" />
          <L
            to="/news"
            activeProps={{ className: "text-foreground" }}
            className="hover:text-foreground"
          >
            {copy.nav.news}
          </L>
          <L to="/" hash="inquiry" className="hover:text-foreground">
            {copy.nav.contact}
          </L>
          <span className="h-3 w-px bg-border" />
          <LocaleSwitcher />
        </nav>

        <div className="flex items-center gap-4 lg:hidden">
          <LocaleSwitcher />
          <L
            to="/"
            hash="inquiry"
            className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground"
          >
            {copy.nav.contact}
          </L>
        </div>
      </div>

      {/* Mobile */}
      <div className="border-t border-border lg:hidden">
        <div className="mx-auto flex max-w-[1400px] gap-5 overflow-x-auto px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <L to="/" hash="services" className="whitespace-nowrap hover:text-foreground">
            {copy.nav.sourcing}
          </L>
          <L to="/" hash="services" className="whitespace-nowrap hover:text-foreground">
            {copy.nav.logistics}
          </L>
          <L to="/news" className="whitespace-nowrap hover:text-foreground">
            {copy.nav.news}
          </L>
          {copy.collections.map((c) => (
            <L
              key={c.slug}
              to="/collections/$slug"
              params={{ slug: c.slug }}
              activeProps={{ className: "text-foreground" }}
              className="whitespace-nowrap hover:text-foreground"
            >
              {c.title}
            </L>
          ))}
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const copy = useCopy();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 md:grid-cols-3 md:px-10">
        <div>
          <span className="font-display text-base tracking-[0.35em] text-foreground">
            EUROPE CONNECT
          </span>
          <p className="mt-5 max-w-xs text-xs leading-6 text-muted-foreground">
            {copy.footer.about}
          </p>
          <div className="mt-6">
            <LocaleSwitcher />
          </div>
        </div>
        <div className="text-xs leading-7 text-muted-foreground">
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-foreground">
            {copy.footer.tasteJourney}
          </p>
          {copy.collections.map((c) => (
            <L
              key={c.slug}
              to="/collections/$slug"
              params={{ slug: c.slug }}
              className="block hover:text-foreground"
            >
              {c.title}
            </L>
          ))}
          <L to="/" hash="services" className="mt-4 block hover:text-foreground">
            {copy.nav.sourcing}
          </L>
          <L to="/" hash="services" className="block hover:text-foreground">
            {copy.nav.logistics}
          </L>
        </div>
        <div className="text-xs leading-7 text-muted-foreground">
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-foreground">
            {copy.footer.partnership}
          </p>
          <p>{copy.footer.partner}</p>
          <p className="mt-4">{copy.footer.inquiryOnly}</p>
        </div>
      </div>
    </footer>
  );
}
