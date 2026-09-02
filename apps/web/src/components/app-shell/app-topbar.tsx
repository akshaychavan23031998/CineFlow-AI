import { Bell, ChevronRight, Plus } from "lucide-react";

import { MobileSidebar } from "@/components/app-shell/mobile-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function AppTopbar() {
  return (
    <header className="sticky top-0 z-40 flex h-[72px] shrink-0 items-center border-b bg-background/80 px-3 backdrop-blur-xl sm:px-5 lg:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <MobileSidebar />

        <div className="hidden min-w-0 items-center gap-2 text-sm sm:flex">
          <span className="truncate text-muted-foreground">Workspace</span>

          <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />

          <span className="truncate font-medium">Overview</span>
        </div>

        <span className="truncate text-sm font-semibold sm:hidden">CineFlow AI</span>
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <Button variant="outline" size="sm" className="hidden sm:inline-flex">
          <Plus />
          New Project
        </Button>

        <ThemeToggle />

        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="size-4" />
        </Button>

        <button
          type="button"
          aria-label="Open account menu"
          className="ml-1 grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-cyan-400 text-xs font-bold text-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          AC
        </button>
      </div>
    </header>
  );
}
