import { useState } from "react";
import { toast } from "sonner";

const PURPOSES = ["유럽 브랜드 소싱", "수입·통관 컨설팅", "물류 프레임워크 구축", "유통 채널 입점"];
const STAGES = ["검토 단계", "브랜드 선정 완료", "수입 진행 중", "채널 확장"];

export function InquiryForm() {
  const [purpose, setPurpose] = useState(PURPOSES[0]!);
  const [stage, setStage] = useState(STAGES[0]!);

  const field =
    "h-12 w-full rounded-none border-0 border-b border-border bg-transparent px-0 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none";

  const chip = (selected: boolean) =>
    `border px-4 py-2 text-xs transition-colors ${
      selected
        ? "border-foreground bg-foreground text-background"
        : "border-border text-muted-foreground hover:border-foreground/60"
    }`;

  return (
    <form
      className="space-y-10"
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
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">비즈니스 목적</p>
        <div className="flex flex-wrap gap-2">
          {PURPOSES.map((p) => (
            <button
              key={p}
              type="button"
              className={chip(purpose === p)}
              onClick={() => setPurpose(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">진행 단계</p>
        <div className="flex flex-wrap gap-2">
          {STAGES.map((s) => (
            <button key={s} type="button" className={chip(stage === s)} onClick={() => setStage(s)}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <textarea
        name="message"
        rows={4}
        className="w-full resize-none rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
        placeholder="찾고 계신 카테고리 또는 프로젝트 개요를 간단히 남겨주세요"
      />

      <div className="space-y-4">
        <button
          type="submit"
          className="inline-flex h-14 w-full items-center justify-center bg-foreground px-10 text-[11px] uppercase tracking-[0.3em] text-background transition-opacity hover:opacity-90 sm:w-auto"
        >
          파트너십 문의 보내기
        </button>
        <p className="text-xs leading-6 text-muted-foreground">
          선택하신 항목({purpose} · {stage})이 함께 전달되며, 담당 디렉터가 배정되어 폐쇄형 쇼룸
          방문 일정까지 안내드립니다.
        </p>
      </div>
    </form>
  );
}
