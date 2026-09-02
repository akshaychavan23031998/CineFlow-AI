import type { ReactNode } from "react";

import { AppSidebar } from "@/components/app-shell/app-sidebar";
import { AppTopbar } from "@/components/app-shell/app-topbar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[254px] border-r bg-background/90 backdrop-blur-xl lg:block">
        <AppSidebar />
      </aside>

      <div className="min-h-dvh lg:pl-[254px]">
        <AppTopbar />

        <main className="min-w-0">
          <div className="mx-auto w-full max-w-[1540px] px-4 py-5 sm:px-6 sm:py-6 lg:px-7">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
