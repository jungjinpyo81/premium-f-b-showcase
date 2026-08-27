import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

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

function NavDropdown({
  label,
  links,
  active,
}: {
  label: React.ReactNode;
  links: { to: string; hash?: string; label: string }[];
  active?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hash = useRouterState({ select: (s) => s.location.hash });

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const isActive = links.some((l) => (l.hash && hash === l.hash) || (active && l.hash === active));

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <L
        to={links[0]?.to ?? "/"}
        hash={links[0]?.hash}
        className={`flex items-center gap-2 py-2 transition-colors hover:text-beige ${isActive ? "text-beige" : ""}`}
      >
        {label}
        <span
          className={`text-[8px] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          {"\n"}
        </span>
      </L>
      {open ? (
        <div className="absolute left-0 top-full z-50 min-w-52 border border-beige/15 bg-ink/95 py-2 backdrop-blur-md">
          {links.map((link) => (
            <L
              key={`${link.to}-${link.hash}`}
              to={link.to}
              hash={link.hash}
              onClick={() => setOpen(false)}
              className={`block px-5 py-2.5 text-[11px] tracking-[0.2em] transition-colors hover:text-beige ${
                hash === link.hash ? "text-beige" : "text-beige/55"
              }`}
            >
              {link.label}
            </L>
          ))}
        </div>
      ) : null}
    </div>
  );
}

const bizClass = (on: boolean) =>
  `py-2 transition-colors hover:text-beige ${on ? "text-beige" : ""}`;

/**
 * Persistent global navigation. Fixed to the top of the viewport on every
 * page; the collection items act as anchors into the full-page snap sections.
 */
export function SiteNav() {
  const copy = useCopy();
  const biz = useBusiness();
  const hash = useRouterState({ select: (s) => s.location.hash });
  const active = useActiveSection(copy.collections.map((c) => c.slug));
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-beige/15 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between gap-8 px-6 md:px-10">
        <L to="/" resetScroll className="font-display text-base tracking-[0.35em] text-beige md:text-lg">
          EUROPE CONNECT
        </L>

        <nav className="hidden items-center gap-7 text-[11px] tracking-[0.2em] text-beige/60 lg:flex">
          <NavDropdown
            label={copy.nav.sourcing}
            links={[
              { to: "/", hash: "services", label: "브랜드의 한국 진출" },
              { to: "/", hash: "what-we-do", label: "운영 역량" },
            ]}
          />
          <NavDropdown
            label={copy.nav.tasteJourney}
            links={copy.collections.map((c) => ({
              to: "/collections",
              hash: c.slug,
              label: c.titleLocal,
            }))}
            active={active}
          />
          <L to="/" hash="trade" className={bizClass(false)}>
            {biz.nav.trade}
          </L>
          <L to="/" hash="distribution" className={bizClass(false)}>
            {biz.nav.distribution}
          </L>
          <L to="/" hash="consulting" className={bizClass(false)}>
            {biz.nav.consulting}
          </L>
        </nav>

        <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.25em] text-beige/60">
          <L to="/news" className="hidden transition-colors hover:text-beige lg:inline">
            {copy.nav.news}
          </L>
          <L to="/" hash="inquiry" className="hidden transition-colors hover:text-beige sm:inline">
            {copy.nav.contact}
          </L>
          <LocaleSwitcher variant="dark" />
          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center text-beige lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 block h-px w-full bg-current transition-transform duration-300 ${
                  mobileOpen ? "translate-y-[5.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-px w-full -translate-y-1/2 bg-current transition-opacity duration-200 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 block h-px w-full bg-current transition-transform duration-300 ${
                  mobileOpen ? "-translate-y-[5.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      {mobileOpen ? (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-beige/10 bg-ink/95 backdrop-blur-md lg:hidden">
          <nav className="mx-auto flex max-w-[1500px] flex-col gap-1 px-6 py-6 text-[12px] tracking-[0.2em] text-beige/70">
            <div className="py-2.5">
              <L
                to="/"
                hash="services"
                onClick={() => setMobileOpen(false)}
                className="transition-colors hover:text-beige"
              >
                {copy.nav.sourcing}
              </L>
              <div className="mt-2 flex flex-col border-l border-beige/15 pl-4">
                <L
                  to="/"
                  hash="services"
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-[11px] text-beige/50 transition-colors hover:text-beige"
                >
                  브랜드의 한국 진출
                </L>
                <L
                  to="/"
                  hash="what-we-do"
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-[11px] text-beige/50 transition-colors hover:text-beige"
                >
                  운영 역량
                </L>
              </div>
            </div>
            <div className="py-2.5">
              <L
                to="/collections"
                onClick={() => setMobileOpen(false)}
                className="transition-colors hover:text-beige"
              >
                {copy.nav.tasteJourney}
              </L>
              <div className="mt-2 flex flex-col border-l border-beige/15 pl-4">
                {copy.collections.map((c) => (
                  <L
                    key={c.slug}
                    to="/collections"
                    hash={c.slug}
                    onClick={() => setMobileOpen(false)}
                    className="py-2 text-[11px] text-beige/50 transition-colors hover:text-beige"
                  >
                    {c.titleLocal}
                  </L>
                ))}
              </div>
            </div>
            <L
              to="/"
              hash="trade"
              onClick={() => setMobileOpen(false)}
              className="py-2.5 transition-colors hover:text-beige"
            >
              {biz.nav.trade}
            </L>
            <L
              to="/"
              hash="distribution"
              onClick={() => setMobileOpen(false)}
              className="py-2.5 transition-colors hover:text-beige"
            >
              {biz.nav.distribution}
            </L>
            <L
              to="/"
              hash="consulting"
              onClick={() => setMobileOpen(false)}
              className="py-2.5 transition-colors hover:text-beige"
            >
              {biz.nav.consulting}
            </L>
            <L
              to="/news"
              onClick={() => setMobileOpen(false)}
              className="py-2.5 transition-colors hover:text-beige"
            >
              {copy.nav.news}
            </L>
            <L
              to="/"
              hash="inquiry"
              onClick={() => setMobileOpen(false)}
              className="py-2.5 text-gold transition-colors hover:text-beige"
            >
              {copy.nav.contact}
            </L>
          </nav>
        </div>
      ) : null}
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
