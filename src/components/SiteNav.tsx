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
          className={`absolute left-0 top-full z-50 min-w-[14rem] border py-2 shadow-sm ${
            isLight
              ? "border-background/20 bg-background"
              : "border-background/30 bg-foreground/95 backdrop-blur-sm"
          }`}
        >
          {copy.collections.map((c) => (
            <L
              key={c.slug}
              to="/collections/$slug"
              params={{ slug: c.slug }}
              activeProps={{ className: isLight ? "text-foreground" : "text-beige" }}
              className={`block px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] hover:text-foreground ${
                isLight
                  ? "text-foreground/80 hover:bg-muted/40"
                  : "text-beige/70 hover:bg-background/10 hover:text-beige"
              }`}
              onClick={() => setOpen(false)}
            >
              {c.titleLocal}
            </L>
          ))}
        </div>
      )}
    </div>
  );
}

export function SiteNav({ variant = "light" }: { variant?: "light" | "dark" }) {
  const copy = useCopy();
  const isDark = variant === "dark";

  return (
    <header
      className={`${
        isDark
          ? "absolute inset-x-0 top-0 z-30 border-b border-background/20 bg-background/10 backdrop-blur-sm"
          : "sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-10">
        <L
          to="/"
          className={`font-display text-lg tracking-[0.35em] ${isDark ? "text-background" : "text-foreground"}`}
        >
          EUROPE CONNECT
        </L>

        {/* Desktop */}
        <nav
          className={`hidden items-center gap-7 text-[10px] uppercase tracking-[0.22em] lg:flex ${
            isDark ? "text-background/80" : "text-muted-foreground"
          }`}
        >
          <TasteJourneyDropdown variant={isDark ? "dark" : "light"} />

          <L
            to="/"
            hash="services"
            activeProps={{ className: isDark ? "text-background" : "text-foreground" }}
            className={isDark ? "hover:text-background" : "hover:text-foreground"}
          >
            {copy.nav.sourcing}
          </L>
          <L
            to="/"
            hash="services"
            activeProps={{ className: isDark ? "text-background" : "text-foreground" }}
            className={isDark ? "hover:text-background" : "hover:text-foreground"}
          >
            {copy.nav.logistics}
          </L>

          <span className={`h-3 w-px ${isDark ? "bg-background/30" : "bg-border"}`} />
          <L
            to="/news"
            activeProps={{ className: isDark ? "text-background" : "text-foreground" }}
            className={isDark ? "hover:text-background" : "hover:text-foreground"}
          >
            {copy.nav.news}
          </L>
          <L
            to="/"
            hash="inquiry"
            className={isDark ? "hover:text-background" : "hover:text-foreground"}
          >
            {copy.nav.contact}
          </L>
          <span className={`h-3 w-px ${isDark ? "bg-background/30" : "bg-border"}`} />
          <LocaleSwitcher variant={isDark ? "dark" : "light"} />
        </nav>

        <div className="flex items-center gap-4 lg:hidden">
          <L
            to="/"
            hash="inquiry"
            className={`text-[10px] uppercase tracking-[0.25em] ${
              isDark
                ? "text-background/70 hover:text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {copy.nav.contact}
          </L>
        </div>
      </div>

      {/* Mobile */}
      <div
        className={`lg:hidden ${
          isDark ? "border-t border-background/20" : "border-t border-border"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-3 px-6 py-3">
          <div
            className={`flex w-full justify-center gap-5 overflow-x-auto text-[10px] uppercase tracking-[0.2em] ${
              isDark ? "text-background/70" : "text-muted-foreground"
            }`}
          >
            <L
              to="/"
              hash="services"
              className={`whitespace-nowrap ${isDark ? "hover:text-background" : "hover:text-foreground"}`}
            >
              {copy.nav.sourcing}
            </L>
            <L
              to="/"
              hash="services"
              className={`whitespace-nowrap ${isDark ? "hover:text-background" : "hover:text-foreground"}`}
            >
              {copy.nav.logistics}
            </L>
            <L
              to="/news"
              className={`whitespace-nowrap ${isDark ? "hover:text-background" : "hover:text-foreground"}`}
            >
              {copy.nav.news}
            </L>
            {copy.collections.map((c) => (
              <L
                key={c.slug}
                to="/collections/$slug"
                params={{ slug: c.slug }}
                activeProps={{ className: isDark ? "text-background" : "text-foreground" }}
                className={`whitespace-nowrap ${isDark ? "hover:text-background" : "hover:text-foreground"}`}
              >
                {c.titleLocal}
              </L>
            ))}
          </div>
          <LocaleSwitcher variant={isDark ? "dark" : "light"} />
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
            <LocaleSwitcher variant="light" />
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
