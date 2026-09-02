import { Coins } from "lucide-react";

export function CreditSummary() {
  return (
    <div className="rounded-2xl border bg-card/80 p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground">Available credits</p>

          <p className="mt-1 text-2xl font-bold tracking-tight">2,480</p>
        </div>

        <div className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
          <Coins className="size-4" aria-hidden="true" />
        </div>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden="true">
        <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
      </div>

      <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
        68% of your current credit pack remains.
      </p>
    </div>
  );
}
