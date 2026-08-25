import { useEffect, useState } from "react";

import { L } from "@/components/L";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { useCopy } from "@/lib/content";

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

/**
 * Persistent global navigation. Fixed to the top of the viewport on every
 * page; the collection items act as anchors into the full-page snap sections.
 */
export function SiteNav() {
  const copy = useCopy();
  const active = useActiveSection(copy.collections.map((c) => c.slug));

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-beige/15 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between gap-8 px-6 md:px-10">
        <L to="/" className="font-display text-base tracking-[0.35em] text-beige md:text-lg">
          EUROPE CONNECT
        </L>

        <nav className="hidden items-center gap-8 text-[11px] tracking-[0.2em] text-beige/60 lg:flex">
          <TasteJourneyMenu active={active} />
          <L to="/brands" className="transition-colors hover:text-beige">
            {copy.nav.brands}
          </L>
          <L to="/" hash="services" className="transition-colors hover:text-beige">
            {copy.nav.services}
          </L>
          <L to="/" hash="gift" className="transition-colors hover:text-beige">
            {copy.nav.gift}
          </L>
        </nav>

        <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.25em] text-beige/60">
          <L to="/news" className="hidden transition-colors hover:text-beige md:inline">
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
        <div className="mx-auto flex max-w-[1500px] items-center gap-6 px-6 py-2.5 text-[11px] tracking-[0.18em] text-beige/60">
          <TasteJourneyMenu active={active} />
          <L to="/brands" className="whitespace-nowrap transition-colors hover:text-beige">
            {copy.nav.brands}
          </L>
          <L to="/" hash="services" className="whitespace-nowrap transition-colors hover:text-beige">
            {copy.nav.services}
          </L>
        </div>
      </div>

    </header>
  );
}

export function SiteFooter() {
  const copy = useCopy();

  return (
    <footer className="border-t border-beige/15 bg-ink text-beige/60">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-6 py-14 md:grid-cols-3 md:px-10">
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
              to="/collections/$slug"
              params={{ slug: c.slug }}
              className="block transition-colors hover:text-beige"
            >
              {c.titleLocal}
            </L>
          ))}
        </div>
        <div className="text-xs leading-7">
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-beige">
            {copy.footer.partnership}
          </p>
          <p>{copy.footer.partner}</p>
          <p className="mt-4">{copy.footer.inquiryOnly}</p>
          <div className="mt-6">
            <LocaleSwitcher variant="dark" />
          </div>
        </div>
      </div>
    </footer>
  );
}
