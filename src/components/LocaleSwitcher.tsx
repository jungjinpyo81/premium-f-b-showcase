import { useEffect, useRef, useState } from "react";

import { Link } from "@tanstack/react-router";

import { LOCALES, useLocale } from "@/lib/content";

export function LocaleSwitcher({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isLight = variant === "light";
  const active = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

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
    <div ref={ref} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`
          flex items-center gap-1.5 text-[11px] tracking-[0.18em] font-medium
          transition-colors duration-300 ease-out
          ${
            isLight
              ? "text-background hover:text-background"
              : "text-beige hover:text-beige"
          }
        `}
      >
        {active.label}
        <svg
          width="7"
          height="5"
          viewBox="0 0 7 5"
          fill="currentColor"
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M0 0h7L3.5 5z" />
        </svg>
      </button>

      {open && (
        <div
          className={`
            absolute right-0 top-full z-50 min-w-[4.5rem] border py-1.5 shadow-sm
            ${
              isLight
                ? "border-background/20 bg-background"
                : "border-background/20 bg-background/90 backdrop-blur-sm"
            }
          `}
        >
          {LOCALES.map((l) => (
            <Link
              key={l.code}
              to="."
              search={(prev: Record<string, unknown>) => ({ ...prev, lang: l.code })}
              onClick={() => setOpen(false)}
              className={`
                block px-3 py-2 text-[11px] tracking-[0.18em] transition-colors duration-300
                ${
                  l.code === locale
                    ? isLight
                      ? "text-foreground"
                      : "text-beige"
                    : isLight
                      ? "text-foreground/60 hover:text-foreground"
                      : "text-beige/60 hover:text-beige"
                }
              `}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
