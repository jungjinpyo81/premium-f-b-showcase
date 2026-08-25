import { Link } from "@tanstack/react-router";

import { LOCALES, useLocale } from "@/lib/content";

export function LocaleSwitcher({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const locale = useLocale();
  const isLight = variant === "light";

  return (
    <nav
      className="inline-flex items-center justify-center"
      aria-label="Language"
    >
      <div className="flex items-center">
        {LOCALES.map((l) => {
          const active = l.code === locale;
          return (
            <Link
              key={l.code}
              to="."
              search={(prev: Record<string, unknown>) => ({ ...prev, lang: l.code })}
              className={`
                relative px-1.5 py-1 text-[10px] tracking-[0.16em] font-medium
                transition-colors duration-300 ease-out
                sm:px-3 sm:text-[11px] sm:tracking-[0.18em]
                ${
                  active
                    ? isLight
                      ? "text-background"
                      : "text-beige"
                    : isLight
                      ? "text-background/50 hover:text-background"
                      : "text-beige/50 hover:text-beige"
                }
              `}
              aria-current={active ? "true" : undefined}
            >
              <span className="relative z-10">{l.label}</span>
              <span
                className={`
                  absolute bottom-0 left-1/2 -translate-x-1/2 h-px
                  bg-current transition-all duration-300 ease-out
                  ${active ? "w-3/5 opacity-100" : "w-0 opacity-0"}
                `}
                aria-hidden="true"
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
