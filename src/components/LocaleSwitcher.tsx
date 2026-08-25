import { Link } from "@tanstack/react-router";

import { LOCALES, useLocale } from "@/lib/content";

export function LocaleSwitcher({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const locale = useLocale();
  const isLight = variant === "light";

  return (
    <div
      className={`flex items-center gap-2 text-[10px] tracking-[0.2em] ${
        isLight ? "text-background/70" : "text-muted-foreground"
      }`}
      aria-label="Language"
    >
      {LOCALES.map((l, i) => (
        <span key={l.code} className="flex items-center gap-2">
          {i > 0 && <span className={isLight ? "text-background/30" : "text-border"}>·</span>}
          <Link
            to="."
            search={(prev: Record<string, unknown>) => ({ ...prev, lang: l.code })}
            className={
              l.code === locale
                ? isLight
                  ? "text-background"
                  : "text-foreground"
                : isLight
                  ? "hover:text-background"
                  : "hover:text-foreground"
            }
            aria-current={l.code === locale ? "true" : undefined}
          >
            {l.label}
          </Link>
        </span>
      ))}
    </div>
  );
}
