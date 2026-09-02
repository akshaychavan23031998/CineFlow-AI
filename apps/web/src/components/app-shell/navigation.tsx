"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Boxes,
  Clapperboard,
  FolderKanban,
  GitBranch,
  LayoutDashboard,
  Map,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navigationSections = [
  {
    label: "Workspace",
    items: [
      {
        label: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
      },
      {
        label: "Projects",
        href: "/projects",
        icon: FolderKanban,
      },
    ],
  },
  {
    label: "Create",
    items: [
      {
        label: "Quick Generate",
        href: "/quick-generate",
        icon: WandSparkles,
      },
      {
        label: "Asset Studio",
        href: "/asset-studio",
        icon: Boxes,
      },
      {
        label: "Flow Studio",
        href: "/flow-studio",
        icon: GitBranch,
      },
    ],
  },
  {
    label: "Production",
    items: [
      {
        label: "Production Map",
        href: "/production-map",
        icon: Map,
      },
      {
        label: "Versions",
        href: "/versions",
        icon: Clapperboard,
      },
    ],
  },
] as const;

interface NavigationProps {
  onNavigate?: () => void;
}

export function Navigation({ onNavigate }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation" className="space-y-5">
      {navigationSections.map((section) => (
        <div key={section.label}>
          <p className="mb-1.5 px-3 text-[10px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            {section.label}
          </p>

          <div className="space-y-1">
            {section.items.map((item) => {
              const Icon = item.icon;

              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    onNavigate?.();
                  }}
                  className={cn(
                    "group relative flex min-h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium text-muted-foreground transition-colors",
                    "hover:bg-accent hover:text-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive &&
                      "bg-accent text-foreground before:absolute before:top-2 before:bottom-2 before:left-0 before:w-0.5 before:rounded-full before:bg-primary",
                  )}
                >
                  <Icon aria-hidden="true" className="size-[18px] shrink-0" />

                  <span>{item.label}</span>

                  {item.label === "Flow Studio" && (
                    <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-semibold text-primary">
                      AI
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      <div className="px-3 pt-1">
        <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-muted-foreground">
          <Sparkles aria-hidden="true" className="size-4 shrink-0 text-primary" />

          <span>AI production workspace</span>
        </div>
      </div>
    </nav>
  );
}
