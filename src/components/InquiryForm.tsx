import { useState } from "react";
import { toast } from "sonner";

import { useCopy } from "@/lib/content";

export function InquiryForm() {
  const copy = useCopy();
  const { purposes, stages } = copy.form;
  const [purpose, setPurpose] = useState<string | null>(null);
  const [stage, setStage] = useState<string | null>(null);

  const activePurpose = purpose ?? purposes[0]!;
  const activeStage = stage ?? stages[0]!;

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
          toast.error(copy.form.errorRequired);
          return;
        }
        toast.success(copy.form.success);
        e.currentTarget.reset();
      }}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <input name="company" className={field} placeholder={copy.form.company} />
        <input name="name" className={field} placeholder={copy.form.name} />
        <input name="email" type="email" className={field} placeholder={copy.form.email} />
        <input name="phone" className={field} placeholder={copy.form.phone} />
      </div>

      <div className="space-y-3">
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          {copy.form.purposeLabel}
        </p>
        <div className="flex flex-wrap gap-2">
          {purposes.map((p) => (
            <button
              key={p}
              type="button"
              className={chip(activePurpose === p)}
              onClick={() => setPurpose(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          {copy.form.stageLabel}
        </p>
        <div className="flex flex-wrap gap-2">
          {stages.map((s) => (
            <button
              key={s}
              type="button"
              className={chip(activeStage === s)}
              onClick={() => setStage(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <textarea
        name="message"
        rows={4}
        className="w-full resize-none rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
        placeholder={copy.form.messagePlaceholder}
      />

      <div className="space-y-4">
        <button
          type="submit"
          className="inline-flex h-14 w-full items-center justify-center bg-foreground px-10 text-[11px] uppercase tracking-[0.3em] text-background transition-opacity hover:opacity-90 sm:w-auto"
        >
          {copy.form.submit}
        </button>
        <p className="text-xs leading-6 text-muted-foreground">
          {copy.form.note.replace("{purpose}", activePurpose).replace("{stage}", activeStage)}
        </p>
      </div>
    </form>
  );
}
