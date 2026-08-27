import { useEffect, useRef, useState } from "react";

import { L } from "@/components/L";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { useBusiness, useCopy } from "@/lib/content";

/** Highlights the section currently snapped into view. */
function useActiveSection(slugs: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const els = slugs
      .map((s) => document.getElementById(s))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { threshold: 0.55 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [slugs.join("|")]);

  return active;
}

/** Grouped "Taste Journey" dropdown holding the five lifestyle collections. */
function TasteJourneyMenu({ active }: { active: string | null }) {
  const copy = useCopy();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 py-2 transition-colors hover:text-beige"
        aria-expanded={open}
      >
        {copy.nav.tasteJourney}
        <span
          className={`text-[8px] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          {"\n"}
        </span>
      </button>
      {open ? (
        <div className="absolute left-0 top-full z-50 min-w-52 border border-beige/15 bg-ink/95 py-2 backdrop-blur-md">
          {copy.collections.map((c) => (
            <L
              key={c.slug}
              to="/collections"
              hash={c.slug}
              onClick={() => setOpen(false)}
              className={`block px-5 py-2.5 text-[11px] tracking-[0.2em] transition-colors hover:text-beige ${
                active === c.slug ? "text-beige" : "text-beige/55"
              }`}
            >
              {c.titleLocal}
            </L>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Persistent global navigation. Fixed to the top of the viewport on every
 * page; the collection items act as anchors into the full-page snap sections.
 */
export function SiteNav() {
  const copy = useCopy();
  const biz = useBusiness();
  const active = useActiveSection(copy.collections.map((c) => c.slug));

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-beige/15 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between gap-8 px-6 md:px-10">
        <L to="/" className="font-display text-base tracking-[0.35em] text-beige md:text-lg">
          EUROPE CONNECT
        </L>

        <nav className="hidden items-center gap-7 text-[11px] tracking-[0.2em] text-beige/60 lg:flex">
          <L to="/" hash="services" className="transition-colors hover:text-beige">
            {copy.nav.sourcing}
          </L>
          <TasteJourneyMenu active={active} />
          <L to="/" hash="trade" className="transition-colors hover:text-beige">
            {biz.nav.trade}
          </L>
          <L to="/" hash="distribution" className="transition-colors hover:text-beige">
            {biz.nav.distribution}
          </L>
          <L to="/" hash="consulting" className="transition-colors hover:text-beige">
            {biz.nav.consulting}
          </L>
        </nav>

        <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.25em] text-beige/60">
          <L to="/news" className="hidden transition-colors hover:text-beige lg:inline">
            {copy.nav.news}
          </L>
          <L to="/" hash="inquiry" className="transition-colors hover:text-beige">
            {copy.nav.contact}
          </L>
          <LocaleSwitcher variant="dark" />
        </div>
      </div>

      {/* Mobile: grouped Taste Journey menu */}
      <div className="border-t border-beige/10 lg:hidden">
        <div className="mx-auto flex max-w-[1500px] items-center gap-5 overflow-x-auto px-6 py-2.5 text-[11px] tracking-[0.18em] text-beige/60">
          <L
            to="/"
            hash="services"
            className="shrink-0 whitespace-nowrap transition-colors hover:text-beige"
          >
            {copy.nav.sourcing}
          </L>
          <div className="shrink-0">
            <TasteJourneyMenu active={active} />
          </div>
          <L
            to="/"
            hash="trade"
            className="shrink-0 whitespace-nowrap transition-colors hover:text-beige"
          >
            {biz.nav.trade}
          </L>
          <L
            to="/"
            hash="distribution"
            className="shrink-0 whitespace-nowrap transition-colors hover:text-beige"
          >
            {biz.nav.distribution}
          </L>
          <L
            to="/"
            hash="consulting"
            className="shrink-0 whitespace-nowrap transition-colors hover:text-beige"
          >
            {biz.nav.consulting}
          </L>
          <L to="/news" className="shrink-0 whitespace-nowrap transition-colors hover:text-beige">
            {copy.nav.news}
          </L>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const copy = useCopy();
  const biz = useBusiness();

  return (
    <footer className="border-t border-beige/15 bg-ink text-beige/60">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4 md:px-10">
        <div>
          <span className="font-display text-base tracking-[0.35em] text-beige">
            EUROPE CONNECT
          </span>
          <p className="mt-5 max-w-xs text-xs leading-6">{copy.footer.about}</p>
        </div>
        <div className="text-xs leading-7">
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-beige">
            {copy.footer.tasteJourney}
          </p>
          {copy.collections.map((c) => (
            <L
              key={c.slug}
              to="/collections"
              hash={c.slug}
              className="block transition-colors hover:text-beige"
            >
              {c.titleLocal}
            </L>
          ))}
        </div>
        <div className="text-xs leading-7">
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-gold">
            {biz.contact.label}
          </p>
          <a
            href={`mailto:${biz.contact.email}`}
            className="block break-all transition-colors hover:text-beige"
          >
            {biz.contact.email}
          </a>
          <a
            href={`tel:${biz.contact.phone.replace(/-/g, "")}`}
            className="block transition-colors hover:text-beige"
          >
            {biz.contact.phone}
          </a>
          <p className="mt-2 text-beige/45">{biz.contact.hours}</p>
          <p className="mt-6 text-beige/45">{copy.footer.partner}</p>
          <p className="mt-2 text-beige/45">{copy.footer.inquiryOnly}</p>
        </div>
        <div className="text-xs leading-7">
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-gold">
            {biz.contact.locationLabel}
          </p>
          <p>{biz.contact.address}</p>
          <a
            href={`https://map.kakao.com/link/search/${encodeURIComponent(biz.contact.address)}`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex h-28 items-center justify-center border border-beige/20 bg-beige/[0.04] text-[10px] uppercase tracking-[0.3em] text-beige/50 transition-colors hover:border-gold/50 hover:text-gold"
          >
            {biz.contact.mapNote}
          </a>
          <div className="mt-6">
            <LocaleSwitcher variant="dark" />
          </div>
        </div>
      </div>
    </footer>
  );
}
