import { useState } from "react";
import { toast } from "sonner";

const BUDGETS = ["5천만원 이하", "5천만 – 2억", "2억 – 5억", "5억 이상"];
const NEEDS = ["브랜드 컨설팅", "메뉴 개발", "콜드체인 공급", "공간·서비스 설계"];

export function InquiryForm() {
  const [need, setNeed] = useState(NEEDS[0]!);
  const [budget, setBudget] = useState(BUDGETS[1]!);

  const field =
    "h-12 w-full rounded-none border-0 border-b border-border bg-transparent px-0 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";

  const chip = (selected: boolean) =>
    `rounded-full border px-4 py-2 text-xs transition-colors ${
      selected
        ? "border-primary bg-primary text-primary-foreground"
        : "border-border text-muted-foreground hover:border-primary/50"
    }`;

  return (
    <form
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        if (!data.get("name") || !data.get("email")) {
          toast.error("담당자명과 이메일을 입력해 주세요.");
          return;
        }
        toast.success("문의가 접수되었습니다. 영업일 기준 24시간 내 회신드립니다.");
        e.currentTarget.reset();
      }}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <input name="company" className={field} placeholder="회사명" />
        <input name="name" className={field} placeholder="담당자명 *" />
        <input name="email" type="email" className={field} placeholder="이메일 *" />
        <input name="phone" className={field} placeholder="연락처" />
      </div>

      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">문의 유형</p>
        <div className="flex flex-wrap gap-2">
          {NEEDS.map((n) => (
            <button key={n} type="button" className={chip(need === n)} onClick={() => setNeed(n)}>
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">예산 범위</p>
        <div className="flex flex-wrap gap-2">
          {BUDGETS.map((b) => (
            <button
              key={b}
              type="button"
              className={chip(budget === b)}
              onClick={() => setBudget(b)}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <textarea
        name="message"
        rows={4}
        className="w-full resize-none rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        placeholder="프로젝트 개요를 간단히 적어주세요"
      />

      <button
        type="submit"
        className="inline-flex h-14 items-center justify-center bg-primary px-10 text-xs uppercase tracking-[0.3em] text-primary-foreground transition-opacity hover:opacity-90"
      >
        문의 보내기
      </button>
      <p className="text-xs text-muted-foreground">
        선택하신 항목 ({need} · {budget})이 함께 전달되어, 담당 디렉터가 바로 배정됩니다.
      </p>
    </form>
  );
}
