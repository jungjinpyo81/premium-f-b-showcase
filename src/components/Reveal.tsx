import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger in ms. */
  delay?: number;
  as?: "div" | "section" | "article" | "span" | "li" | "header" | "figure";
  /** Above-the-fold content: fade in right after mount instead of waiting for scroll. */
  immediate?: boolean;
  /** Re-play the animation every time the element re-enters the viewport. */
  repeat?: boolean;
  /** Visibility ratio required to trigger (0-1). */
  amount?: number;
};

/** Understated fade + slight rise on scroll. No flashy motion. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
  immediate = false,
  repeat = false,
  amount = 0,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (immediate) {
      const t = window.setTimeout(() => setShown(true), 30);
      return () => window.clearTimeout(t);
    }

    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            if (!repeat) io.disconnect();
          } else if (repeat) {
            setShown(false);
          }
        }
      },
      // threshold 0 keeps behaviour consistent for elements taller than the viewport
      { threshold: amount, rootMargin: repeat ? "0px" : "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate, repeat, amount]);

  const Tag = as as ElementType;

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={`transition-[opacity,transform] duration-[900ms] ease-out will-change-[opacity,transform] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
