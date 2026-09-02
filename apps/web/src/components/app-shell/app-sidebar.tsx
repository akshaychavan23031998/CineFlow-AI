import { Film } from "lucide-react";

import { CreditSummary } from "@/components/app-shell/credit-summary";
import { Navigation } from "@/components/app-shell/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AppSidebarProps {
  onNavigate?: () => void;
}

export function AppSidebar({ onNavigate }: AppSidebarProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex h-[72px] shrink-0 items-center border-b px-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-400 text-white shadow-lg shadow-violet-500/15">
            <Film className="size-5" aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold tracking-tight">CineFlow AI</p>

            <p className="truncate text-[10px] font-medium text-muted-foreground">
              From Prompt to Production
            </p>
          </div>
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="px-3 py-5">
          <Navigation {...(onNavigate ? { onNavigate } : {})} />
        </div>
      </ScrollArea>

      <div className="shrink-0 border-t p-3">
        <CreditSummary />
      </div>
    </div>
  );
}
