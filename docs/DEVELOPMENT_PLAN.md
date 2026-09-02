# CineFlow AI — Development Plan

## Execution model
Each task has a stable ID. Implement one task, run local verification, commit it, then continue.

Suggested feature commit:
`feat(P1-01): initialize monorepo foundation`

After all tasks in a phase are verified:
`chore(phase-1): mark foundation phase complete`

Optional Git tag:
`phase-1-complete`

## Phase 0 — Repository and documentation bootstrap
Manual work; avoid spending Codex prompts where unnecessary.

### P0-01 Create repository and base directories
Manual.

### P0-02 Add source-of-truth documentation
Manual using files in `docs/` and `AGENTS.md`.

### P0-03 Add approved HTML prototype under `docs/design/`
Manual.

Phase completion marker after repo/docs are committed.

## Phase 1 — Foundation
### P1-01 Monorepo foundation
Initialize workspace/package manager, apps/packages directories, shared TypeScript configuration, scripts, lint/format baseline.

### P1-02 Frontend foundation
Next.js, TypeScript, Tailwind, shadcn/Radix setup, Redux Toolkit, RTK Query, light/dark theme system, main shell/navigation based on prototype, mobile-first responsive shell, shared ScrollArea/hidden-scrollbar primitives, and responsive overflow conventions.

### P1-03 API foundation
Express TypeScript app, config validation, Pino logging, error taxonomy/handler, request ID, health/readiness endpoints, test harness.

Phase-1 completion criteria:
- monorepo scripts work
- web builds
- API builds
- lint/typecheck/tests pass
- light/dark shell works
- shell remains usable at representative mobile/tablet/laptop/desktop widths
- shared vertical/horizontal scroll treatment works without inaccessible hidden overflow

## Phase 2 — Identity, workspace, RBAC, BYOK
### P2-01 Authentication
Email/password, Argon2id, secure session/token strategy, Google OAuth/OIDC foundation, logout/refresh tests.

### P2-02 Workspaces and RBAC
Users/workspaces/memberships persistence, permission engine, tenant-scoped authorization middleware/use cases, tests.

### P2-03 AI provider credentials
Personal/workspace Gemini BYOK metadata, encrypted credential storage abstraction, validate/test/replace/disconnect flows, secret redaction tests.

Phase-2 completion criteria:
- authenticated workspace access
- 5-role permission model enforced
- user can securely connect/test Gemini metadata without secret disclosure

## Phase 3 — Projects and multimodal assets
### P3-01 Project/creative domain
Projects, episodes/scenes baseline, APIs/repositories, tenant isolation.

### P3-02 Asset upload/storage
GCS adapter, signed upload intent/completion, asset metadata, upload validation, lifecycle states.

### P3-03 Character Reference Packs
Face/upper/full/profile/reference-video/optional voice references, asset association, image/media metadata analysis pipeline stubs/implementation.

Phase-3 completion criteria:
- create project
- upload supported media securely
- build character pack
- browse reusable assets

## Phase 4 — AI and Quick Generate
### P4-01 Provider contracts/router
Capability interfaces, normalized types/errors, credential resolver, fake providers for tests.

### P4-02 Gemini adapters and media understanding
Implement selected Gemini capabilities behind provider interfaces; uploaded image/video/audio understanding pipeline; quota/credential error normalization.

### P4-03 Production Planner
Typed plan schema, AI-assisted planning, validation, stage/weight creation, disclaimer/estimate model.

### P4-04 Quick Generate
Multimodal quick-generation API/UI supporting text/images/video/audio in any valid combination; async generation state foundation.

Phase-4 completion criteria:
- valid production plan generated
- at least one provider-backed generation path works
- no provider SDK leaks into domain/UI
- BYOK failures are actionable

## Phase 5 — Flow Studio, DAG, Production Map, versions
### P5-01 Flow Studio UI
React Flow node palette, typed custom nodes/edges, Redux editor state, save/load draft, prototype-aligned UX, desktop multi-panel experience, tablet collapsible panels, mobile full-screen focused canvas, touch-safe controls, pan/zoom/pinch navigation, and hidden-scrollbar treatment for surrounding panels rather than the graph canvas itself.

### P5-02 DAG compiler/validator
Backend graph schemas, cycle detection, port compatibility, topological ordering, parallel-ready computation, compile API/tests.

### P5-03 Workflow run + Production Map
Durable execution integration, node/run states, weighted progress, current/next/blocked mapping, Production Map UI and disclaimer behavior.

### P5-04 Version history
Workflow version snapshots, parent/branch relationships, restore/duplicate/compare baseline, UI history graph/list.

Phase-5 completion criteria:
- user can create visual workflow
- invalid graph blocked
- valid graph compiles/runs with fake/real selected adapters
- Production Map shows deterministic progress
- version history works

## Phase 6 — Media composition and billing
### P6-01 Media worker
Cloud Run-ready Node worker, FFprobe metadata, FFmpeg trim/join/mux/mix/composition, secure process invocation, tests with tiny fixtures.

### P6-02 Lip-sync integration
LipSyncProvider adapter, async job handling, uploaded/generated audio + video flow, output asset persistence.

### P6-03 Credits/ledger/reservations
PostgreSQL wallet, immutable ledger, reservations, concurrency/idempotency, workflow estimate/charge/release rules.

### P6-04 Razorpay
Credit packs, server order creation, signature verification, webhook verification/idempotency, transactional credit issuance, UI purchase flow.

Phase-6 completion criteria:
- independent video/audio can compose into final output
- lip-sync flow works when provider configured
- duplicate payment events cannot double-credit
- concurrent workflows cannot overspend wallet

## Phase 7 — Production hardening and deployment
### P7-01 Security hardening
Threat review against SECURITY.md, headers/CORS/rate limits/upload limits/redaction/audit events/tenant tests.

### P7-02 Test expansion
Critical integration/E2E journeys, provider mocks, workflow failure/retry cases, billing concurrency, coverage review, responsive Playwright runs across representative mobile/tablet/laptop/desktop viewports, minimum-width checks, and scroll/overflow accessibility verification.

### P7-03 Observability and CI/CD
Structured correlation fields, metrics/traces/error monitoring baseline, GitHub Actions gates, dependency checks.

### P7-04 Deployment and final audit
Vercel web/API, Cloud Run worker, Atlas/Neon/Redis/GCS configuration, production env validation, smoke tests, README/runbook polish, final architecture consistency audit.

Phase-7 completion criteria:
- public deployment works
- CI green
- critical E2E flows pass
- secrets/redaction verified
- docs match implementation
- critical flows pass responsive viewport checks
- hidden-scrollbar treatment does not make content unreachable

## Prompt budgeting guidance
Planned Codex implementation prompts: ~23–25.
Contingency/debugging prompts: ~5–8.

Optimization rules:
- generate architecture/docs outside Codex
- one scoped task per implementation prompt
- tell Codex exact docs/modules to read
- do not ask it to scan entire repository unless necessary
- require implementation + tests + local checks in same prompt
- commit after each successful task

## Phase-completion commit examples
- `chore(phase-0): complete repository documentation bootstrap`
- `chore(phase-1): complete foundation`
- `chore(phase-2): complete identity workspace rbac and byok`
- `chore(phase-3): complete project and asset foundation`
- `chore(phase-4): complete ai planning and quick generation`
- `chore(phase-5): complete workflow studio and production map`
- `chore(phase-6): complete media pipeline and billing`
- `chore(phase-7): complete production hardening and deployment`
