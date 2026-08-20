import { useEffect, useRef, useState } from "react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  List,
  Minus,
  Plus,
  Underline,
  Undo2,
  Redo2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FONTS = [
  { label: "본명조 (Noto Serif KR)", value: "'Noto Serif KR', serif" },
  { label: "나눔명조", value: "'Nanum Myeongjo', serif" },
  { label: "고운바탕", value: "'Gowun Batang', serif" },
  { label: "본고딕 (Noto Sans KR)", value: "'Noto Sans KR', sans-serif" },
  { label: "코르모란트 (영문)", value: "'Cormorant Garamond', serif" },
  { label: "고정폭", value: "'IBM Plex Mono', monospace" },
];

const SIZES = [
  { label: "작게", value: "2" },
  { label: "본문", value: "3" },
  { label: "크게", value: "5" },
  { label: "제목", value: "6" },
];

type Props = {
  value: string;
  onChange: (html: string) => void;
  label: string;
  hint?: string;
};

export function RichTextEditor({ value, onChange, label, hint }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [align, setAlign] = useState("left");
  const [font, setFont] = useState(FONTS[0]!.value);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exec = (command: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand("styleWithCSS", false, "true");
    document.execCommand(command, false, arg);
    onChange(ref.current?.innerHTML ?? "");
  };

  const setAlignment = (dir: "Left" | "Center" | "Right" | "Full") => {
    exec(`justify${dir}`);
    setAlign(dir.toLowerCase());
  };

  const btn =
    "inline-flex h-9 min-w-9 items-center justify-center gap-1.5 rounded-sm border border-border/70 bg-card px-2.5 text-xs text-foreground transition-colors hover:bg-accent hover:text-accent-foreground";
  const active = "bg-primary text-primary-foreground border-primary hover:bg-primary";

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-lg tracking-tight">{label}</h3>
        {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      </div>

      <div className="rounded-sm border border-border bg-card">
        <div className="flex flex-wrap items-center gap-1.5 border-b border-border p-2">
          <select
            aria-label="글꼴"
            value={font}
            onChange={(e) => {
              setFont(e.target.value);
              exec("fontName", e.target.value);
            }}
            className="h-9 rounded-sm border border-border/70 bg-card px-2 text-xs text-foreground"
            style={{ fontFamily: font }}
          >
            {FONTS.map((f) => (
              <option key={f.value} value={f.value} style={{ fontFamily: f.value }}>
                {f.label}
              </option>
            ))}
          </select>

          <select
            aria-label="글자 크기"
            defaultValue="3"
            onChange={(e) => exec("fontSize", e.target.value)}
            className="h-9 rounded-sm border border-border/70 bg-card px-2 text-xs text-foreground"
          >
            {SIZES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>

          <span className="mx-1 h-6 w-px bg-border" />

          <button type="button" className={btn} onClick={() => exec("bold")} aria-label="굵게">
            <Bold className="size-4" />
          </button>
          <button type="button" className={btn} onClick={() => exec("italic")} aria-label="기울임">
            <Italic className="size-4" />
          </button>
          <button
            type="button"
            className={btn}
            onClick={() => exec("underline")}
            aria-label="밑줄"
          >
            <Underline className="size-4" />
          </button>

          <span className="mx-1 h-6 w-px bg-border" />

          <button
            type="button"
            className={cn(btn, align === "left" && active)}
            onClick={() => setAlignment("Left")}
            aria-label="좌측 정렬"
          >
            <AlignLeft className="size-4" />
          </button>
          <button
            type="button"
            className={cn(btn, align === "center" && active)}
            onClick={() => setAlignment("Center")}
            aria-label="가운데 정렬"
          >
            <AlignCenter className="size-4" />
          </button>
          <button
            type="button"
            className={cn(btn, align === "right" && active)}
            onClick={() => setAlignment("Right")}
            aria-label="우측 정렬"
          >
            <AlignRight className="size-4" />
          </button>
          <button
            type="button"
            className={cn(btn, align === "full" && active)}
            onClick={() => setAlignment("Full")}
            aria-label="양쪽 정렬"
          >
            <AlignJustify className="size-4" />
          </button>

          <span className="mx-1 h-6 w-px bg-border" />

          <button
            type="button"
            className={btn}
            onClick={() => exec("insertUnorderedList")}
            aria-label="목록"
          >
            <List className="size-4" />
          </button>
          <button
            type="button"
            className={btn}
            onClick={() => exec("insertHorizontalRule")}
            aria-label="구분선"
          >
            <Minus className="size-4" />
          </button>
          <button
            type="button"
            className={btn}
            onClick={() => exec("indent")}
            aria-label="들여쓰기"
          >
            <Plus className="size-4" />
          </button>

          <span className="mx-1 h-6 w-px bg-border" />

          <button type="button" className={btn} onClick={() => exec("undo")} aria-label="실행 취소">
            <Undo2 className="size-4" />
          </button>
          <button type="button" className={btn} onClick={() => exec("redo")} aria-label="다시 실행">
            <Redo2 className="size-4" />
          </button>
        </div>

        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-multiline="true"
          aria-label={label}
          onInput={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
          className="prose-editor min-h-56 px-5 py-4 text-sm leading-relaxed outline-none"
        />
      </div>
    </div>
  );
}
