import {
  ArrowRight,
  Boxes,
  CircleCheck,
  Clock,
  Film,
  FolderKanban,
  GitBranch,
  Image as ImageIcon,
  Play,
  Sparkles,
  WandSparkles,
  Zap,
} from "lucide-react";

import { AppShell } from "@/components/app-shell/app-shell";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <AppShell>
      <div className="space-y-8">
        <section className="overflow-hidden rounded-3xl border bg-card shadow-sm">
          <div className="relative grid gap-0 xl:grid-cols-[1.08fr_0.92fr]">
            <div className="relative z-10 p-6 sm:p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-3 py-1.5 text-xs font-semibold text-violet-600 dark:text-violet-300">
                <Sparkles className="size-3.5" aria-hidden="true" />
                AI Production Workspace
              </div>

              <h1 className="mt-5 max-w-3xl text-3xl font-bold tracking-[-0.045em] sm:text-4xl lg:text-5xl">
                From prompt to production.
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                Plan, generate, orchestrate, and deliver multimodal AI productions from one
                intelligent workspace.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button>
                  <WandSparkles />
                  Create production
                </Button>

                <Button variant="outline">
                  <GitBranch />
                  Open Flow Studio
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CircleCheck className="size-4 text-emerald-500" />
                  Multimodal inputs
                </div>

                <div className="flex items-center gap-2">
                  <CircleCheck className="size-4 text-emerald-500" />
                  Visual workflows
                </div>

                <div className="flex items-center gap-2">
                  <CircleCheck className="size-4 text-emerald-500" />
                  Production tracking
                </div>
              </div>
            </div>

            <div className="relative min-h-[280px] border-t bg-slate-950 p-5 xl:min-h-full xl:border-t-0 xl:border-l">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(139,92,246,0.38),transparent_32%),radial-gradient(circle_at_22%_76%,rgba(34,211,238,0.22),transparent_30%)]" />

              <div className="relative flex h-full min-h-[240px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-white backdrop-blur">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-lg border border-white/10 bg-black/30 px-2.5 py-1 text-[10px] font-semibold text-white/70">
                    CURRENT PRODUCTION
                  </span>

                  <span className="flex items-center gap-1.5 text-[11px] text-emerald-300">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    Running
                  </span>
                </div>

                <div className="grid place-items-center py-8">
                  <button
                    type="button"
                    aria-label="Preview production"
                    className="grid size-16 place-items-center rounded-full border border-white/15 bg-white/10 backdrop-blur transition hover:scale-105 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <Play className="size-6 fill-white" />
                  </button>
                </div>

                <div>
                  <div className="mb-3 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold">Neon Horizons Campaign</p>

                      <p className="mt-1 text-[11px] text-white/55">
                        Scene generation · Stage 4 of 7
                      </p>
                    </div>

                    <span className="text-sm font-bold">63%</span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[63%] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Workspace overview
              </p>

              <h2 className="mt-1 text-xl font-bold tracking-tight">Production at a glance</h2>
            </div>

            <span className="hidden text-xs text-muted-foreground sm:block">
              Updated moments ago
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm">
              <div className="absolute -top-8 -right-8 size-24 rounded-full bg-violet-500/5" />

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Active projects</span>

                <FolderKanban className="size-4 text-violet-500" />
              </div>

              <p className="mt-3 text-3xl font-bold tracking-[-0.04em]">12</p>

              <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">+3 this month</p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm">
              <div className="absolute -top-8 -right-8 size-24 rounded-full bg-cyan-500/5" />

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Generations</span>

                <Sparkles className="size-4 text-cyan-500" />
              </div>

              <p className="mt-3 text-3xl font-bold tracking-[-0.04em]">148</p>

              <p className="mt-1 text-xs text-muted-foreground">31 completed today</p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm">
              <div className="absolute -top-8 -right-8 size-24 rounded-full bg-emerald-500/5" />

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Completed</span>

                <CircleCheck className="size-4 text-emerald-500" />
              </div>

              <p className="mt-3 text-3xl font-bold tracking-[-0.04em]">86</p>

              <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                94% success rate
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm">
              <div className="absolute -top-8 -right-8 size-24 rounded-full bg-amber-500/5" />

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Processing</span>

                <Clock className="size-4 text-amber-500" />
              </div>

              <p className="mt-3 text-3xl font-bold tracking-[-0.04em]">7</p>

              <p className="mt-1 text-xs text-muted-foreground">Across 4 productions</p>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.55fr)]">
          <section className="min-w-0">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  Recent work
                </p>

                <h2 className="mt-1 text-xl font-bold tracking-tight">Your projects</h2>
              </div>

              <Button variant="ghost" size="sm">
                View all
                <ArrowRight />
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
              <article className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                <div className="relative h-36 overflow-hidden bg-slate-950">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(139,92,246,0.55),transparent_30%),radial-gradient(circle_at_22%_80%,rgba(34,211,238,0.35),transparent_28%)]" />

                  <div className="absolute right-3 bottom-3 rounded-lg border border-white/10 bg-black/40 px-2 py-1 text-[9px] font-semibold text-white/80 backdrop-blur">
                    VIDEO · 16:9
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold">Neon Horizons</h3>

                      <p className="mt-1 text-xs text-muted-foreground">Brand campaign</p>
                    </div>

                    <span className="flex shrink-0 items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      Active
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-lg border bg-muted/50 px-2 py-1 text-[10px] text-muted-foreground">
                      8 scenes
                    </span>

                    <span className="rounded-lg border bg-muted/50 px-2 py-1 text-[10px] text-muted-foreground">
                      Flow Studio
                    </span>
                  </div>
                </div>
              </article>

              <article className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                <div className="relative h-36 overflow-hidden bg-slate-950">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(236,72,153,0.4),transparent_28%),radial-gradient(circle_at_78%_76%,rgba(124,58,237,0.42),transparent_32%)]" />

                  <div className="absolute right-3 bottom-3 rounded-lg border border-white/10 bg-black/40 px-2 py-1 text-[9px] font-semibold text-white/80 backdrop-blur">
                    SOCIAL · 9:16
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold">Aurora Launch</h3>

                      <p className="mt-1 text-xs text-muted-foreground">Product launch</p>
                    </div>

                    <span className="flex shrink-0 items-center gap-1.5 text-[10px] text-amber-600 dark:text-amber-400">
                      <span className="size-1.5 rounded-full bg-amber-500" />
                      Rendering
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-lg border bg-muted/50 px-2 py-1 text-[10px] text-muted-foreground">
                      14 assets
                    </span>

                    <span className="rounded-lg border bg-muted/50 px-2 py-1 text-[10px] text-muted-foreground">
                      Quick Generate
                    </span>
                  </div>
                </div>
              </article>

              <article className="overflow-hidden rounded-2xl border bg-card shadow-sm md:col-span-2 2xl:col-span-1">
                <div className="relative h-36 overflow-hidden bg-slate-950">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(34,211,238,0.35),transparent_27%),radial-gradient(circle_at_24%_76%,rgba(59,130,246,0.35),transparent_30%)]" />

                  <div className="absolute right-3 bottom-3 rounded-lg border border-white/10 bg-black/40 px-2 py-1 text-[9px] font-semibold text-white/80 backdrop-blur">
                    FILM · 2.39:1
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold">Blue Hour</h3>

                      <p className="mt-1 text-xs text-muted-foreground">Short film concept</p>
                    </div>

                    <span className="flex shrink-0 items-center gap-1.5 text-[10px] text-muted-foreground">
                      <span className="size-1.5 rounded-full bg-muted-foreground" />
                      Draft
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-lg border bg-muted/50 px-2 py-1 text-[10px] text-muted-foreground">
                      6 scenes
                    </span>

                    <span className="rounded-lg border bg-muted/50 px-2 py-1 text-[10px] text-muted-foreground">
                      Character Pack
                    </span>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <aside>
            <div className="mb-4">
              <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Start something
              </p>

              <h2 className="mt-1 text-xl font-bold tracking-tight">Quick actions</h2>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                className="group flex w-full items-center gap-4 rounded-2xl border bg-card p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-violet-500/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-violet-500/10 text-violet-500">
                  <WandSparkles className="size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">Quick Generate</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Generate from any media combination
                  </p>
                </div>

                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                className="group flex w-full items-center gap-4 rounded-2xl border bg-card p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-500/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-cyan-500/10 text-cyan-500">
                  <Boxes className="size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">Asset Studio</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Create and manage reusable media
                  </p>
                </div>

                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                className="group flex w-full items-center gap-4 rounded-2xl border bg-card p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-violet-500/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-violet-500/10 text-violet-500">
                  <GitBranch className="size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">Flow Studio</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Build an AI production workflow
                  </p>
                </div>

                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5" />
              </button>
            </div>
          </aside>
        </div>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="rounded-2xl border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <div>
                <p className="text-sm font-semibold">Recent activity</p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Latest generation and production events
                </p>
              </div>

              <Button variant="ghost" size="sm">
                View all
              </Button>
            </div>

            <div className="divide-y">
              <div className="flex gap-4 px-5 py-4">
                <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-violet-500/10 text-violet-500">
                  <Film className="size-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                    <p className="text-sm font-medium">Scene 04 generation completed</p>

                    <span className="text-[11px] text-muted-foreground">2 min ago</span>
                  </div>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Neon Horizons · cinematic video generation
                  </p>
                </div>
              </div>

              <div className="flex gap-4 px-5 py-4">
                <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-cyan-500/10 text-cyan-500">
                  <ImageIcon className="size-4" aria-hidden="true" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                    <p className="text-sm font-medium">Character reference added</p>

                    <span className="text-[11px] text-muted-foreground">18 min ago</span>
                  </div>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Blue Hour · Maya reference pack
                  </p>
                </div>
              </div>

              <div className="flex gap-4 px-5 py-4">
                <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-500">
                  <CircleCheck className="size-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                    <p className="text-sm font-medium">Workflow run completed</p>

                    <span className="text-[11px] text-muted-foreground">41 min ago</span>
                  </div>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Aurora Launch · 9 nodes executed successfully
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Production health</p>

                <p className="mt-1 text-xs text-muted-foreground">Current workspace status</p>
              </div>

              <Zap className="size-5 text-amber-500" />
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <div className="mb-2 flex justify-between text-xs">
                  <span className="text-muted-foreground">Provider availability</span>

                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    Healthy
                  </span>
                </div>

                <div className="h-1.5 rounded-full bg-muted">
                  <div className="h-full w-[96%] rounded-full bg-emerald-500" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-xs">
                  <span className="text-muted-foreground">Workflow capacity</span>

                  <span className="font-semibold">72%</span>
                </div>

                <div className="h-1.5 rounded-full bg-muted">
                  <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-xs">
                  <span className="text-muted-foreground">Asset processing</span>

                  <span className="font-semibold">54%</span>
                </div>

                <div className="h-1.5 rounded-full bg-muted">
                  <div className="h-full w-[54%] rounded-full bg-cyan-500" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
