# CineFlow AI — Agent Instructions

## Purpose
This repository implements CineFlow AI, a production-grade multimodal AI media orchestration platform. The approved architecture is a monorepo containing a Next.js web application, a Node.js/Express modular-monolith API, and a dedicated media worker for FFmpeg/FFprobe processing.

These instructions are mandatory for all automated coding agents and human contributors.

## Source-of-truth order
When requirements appear to conflict, use this order:
1. `AGENTS.md`
2. `docs/PRODUCT_SPEC.md`
3. `docs/ARCHITECTURE.md`
4. relevant domain document in `docs/`
5. relevant ADR in `docs/ADRs/`
6. approved design prototype in `docs/design/`
7. task definition in `docs/DEVELOPMENT_PLAN.md`

Do not invent new architecture or product scope when the source-of-truth documents already define it.

## Core engineering rules
- TypeScript strict mode everywhere.
- No `any` unless there is a documented, reviewed reason.
- Prefer explicit domain types over primitive obsession.
- Follow SOLID, DRY, KISS, YAGNI, separation of concerns, dependency inversion, and least privilege.
- Keep controllers thin; controllers validate/translate transport concerns and call application use cases.
- Domain/application logic must not depend directly on Express, MongoDB, Prisma, Redis, GCS, Gemini, Razorpay, Sync, FFmpeg, or other external SDKs.
- All external systems must be accessed through interfaces/adapters.
- Do not couple business logic to a specific AI provider.
- Validate every untrusted boundary with Zod or equivalent typed validation.
- Use centralized error taxonomy and structured error responses.
- Never expose stack traces or secrets to clients.
- Never log credentials, access tokens, refresh tokens, provider API keys, payment secrets, webhook secrets, or raw sensitive media payloads.
- Never store AI provider keys in plaintext or in browser state, Redux, localStorage, query parameters, or workflow JSON.
- Persist encrypted provider credentials server-side only.
- Never mutate a wallet balance directly outside the billing domain.
- Every credit mutation must create an immutable ledger entry.
- Payment and credit operations must be idempotent and transactional.
- Every tenant-owned resource must be authorized against workspace membership, not merely authenticated user identity.
- Keep data ownership boundaries explicit.
- Never trust frontend-calculated price, credit cost, workspace role, ownership, or payment status.
- All generated/uploaded assets must have ownership metadata and lifecycle state.
- Long-running AI/media work must be asynchronous; never keep normal HTTP requests open while waiting for multi-minute generation.
- CPU-heavy media work belongs in the media worker, not the web/API runtime.
- React Flow is the visual editor; backend workflow execution uses validated DAG semantics.
- AI-generated plans can decide required stages, but progress percentages must be calculated deterministically from workflow state and weights.
- Estimated values must be clearly marked as estimated.

## Frontend rules
- Next.js + React + TypeScript.
- Redux Toolkit for global client state.
- RTK Query for API/server-state integration.
- React Flow (`@xyflow/react`) for Flow Studio and Production Map visualization.
- Keep transient purely-local UI state local unless shared state is justified.
- Do not store secrets in Redux.
- Accessibility is required: keyboard navigation, focus visibility, labels, semantic markup, sensible contrast, reduced-motion considerations.
- Support light and dark themes.
- Responsive behavior is a hard product requirement from 320px mobile viewports through tablets, laptops, desktops, and 1920px+ displays.
- No critical user journey may be desktop-only.
- Flow Studio must remain usable on touch devices using an adaptive full-screen canvas/drawer interaction model.
- Primary product surfaces should not expose distracting native browser scrollbars where scrolling can remain discoverable and accessible without them.
- Use the shared ScrollArea/overflow abstractions based on shadcn/ui + Radix rather than inventing per-feature scrollbar behavior.
- Hidden-scrollbar containers must remain fully scrollable by mouse, trackpad, keyboard where appropriate, and touch.
- Horizontal overflow must use clear affordances such as edge fades, partial cards, arrows, or contextual controls when discoverability would otherwise suffer.
- Flow Studio canvas navigation uses React Flow pan/zoom/pinch interactions rather than ordinary page scrollbars.
- Prefer reusable domain components over page-specific duplicated UI.

## Backend module boundaries
Expected API modules include:
- auth
- users
- workspaces
- rbac
- providers
- projects
- characters
- assets
- generations
- workflows
- billing
- payments
- notifications
- audit

Modules may communicate only through documented application interfaces/events. Do not reach into another module's persistence implementation.

## Persistence
- MongoDB: creative/flexible domain data such as projects, scenes, character packs, assets, workflows, prompt/generation metadata.
- PostgreSQL: transactional/relational data such as users, workspaces, memberships, credentials metadata, wallets, ledger, payments, webhook events.
- Redis: ephemeral/cache/coordination only; never source of truth for money or durable workflow history.

## Testing requirements
For every implemented task:
- Add/update unit tests for domain/application logic.
- Add integration tests for API/persistence boundaries when behavior changes.
- Add E2E coverage for critical user journeys when the task affects them.
- Test expected failure paths, not only happy paths.
- Test tenant isolation and authorization where relevant.
- Test idempotency/concurrency for billing/payment flows where relevant.

## Required verification before task completion
Run the relevant commands and fix failures caused by the change:
- lint
- typecheck
- unit tests
- relevant integration tests
- build for affected app/package when reasonable

Do not claim completion if required checks are failing.

## Scope discipline for coding agents
For each task:
1. Read this file.
2. Read the relevant docs named by the task.
3. Inspect only the modules/files required for that task unless a direct dependency requires more.
4. Do not redesign unrelated modules.
5. Do not perform broad refactors unless explicitly requested.
6. Preserve public contracts unless the task explicitly changes them.
7. At completion report:
   - files changed
   - architecture decisions made
   - tests added/updated
   - commands run and results
   - assumptions
   - remaining limitations

## Git/phase discipline
Each development task has an ID such as `P1-01`.
- One successful scoped task should normally produce one feature commit.
- Suggested pattern: `feat(P1-01): initialize monorepo foundation`.
- Bug fixes use `fix(...)`, refactors use `refactor(...)`, tests use `test(...)`, docs use `docs(...)`.
- After the final task in a phase passes local verification, create an explicit phase-completion commit, e.g. `chore(phase-1): mark foundation phase complete`.
- Optionally tag milestones as `phase-1-complete`, `phase-2-complete`, etc.

## Prohibited shortcuts
- No hardcoded secrets.
- No fake authorization checks.
- No hardcoded payment success.
- No silent swallowing of errors.
- No AI provider SDK calls from React components.
- No database queries directly from controllers.
- No duplicated pricing/credit rules across frontend/backend.
- No using Git itself as the product's workflow version store; use Git-inspired application versioning.
- No premature microservices.

## Definition of done
A task is done only when implementation, validation, tests, documentation impact, and local verification are complete according to the relevant development-plan task.
