import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "span" | "li" | "header" | "figure";
  immediate?: boolean;
  repeat?: boolean;
  amount?: number;
};

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
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            if (!repeat) {
              io.disconnect();
            }
          } else if (repeat) {
            setShown(false);
          }
        }
      },
      {
        threshold: amount,
        rootMargin: repeat ? "0px" : "0px 0px -10% 0px",
      },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [immediate, repeat, amount]);

  const Tag = as as ElementType;

  return (
    <Tag
      ref={ref}
      style={{
        transitionDelay: shown ? `${delay}ms` : "0ms",
      }}
      className={`
        will-change-[opacity,transform,filter]
        transition-[opacity,transform,filter]
        duration-[1000ms]
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          shown
            ? "translate-y-0 scale-100 opacity-100 blur-0"
            : "translate-y-8 scale-[0.97] opacity-0 blur-[4px]"
        }
        motion-reduce:translate-y-0
        motion-reduce:scale-100
        motion-reduce:opacity-100
        motion-reduce:blur-0
        motion-reduce:transition-none
        ${className}
      `}
    >
      {children}
    </Tag>
  );
}
