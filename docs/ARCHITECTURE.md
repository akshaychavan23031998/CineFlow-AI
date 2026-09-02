# CineFlow AI — Architecture

## Architecture style
CineFlow uses a **monorepo with a modular-monolith API and a dedicated media-processing worker**.

It intentionally does not begin as a fleet of microservices. Domain boundaries are kept strict so selected modules can be extracted later when justified by scale, runtime needs, team ownership, or reliability requirements.

## Deployable units
### `apps/web`
Next.js frontend deployed to Vercel.

### `apps/api`
Node.js + Express + TypeScript modular monolith deployed to Vercel-compatible serverless/runtime infrastructure.

### `apps/media-worker`
Containerized Node.js worker with FFmpeg/FFprobe deployed to Google Cloud Run for CPU-heavy media operations.

## Shared packages
Recommended:
- `packages/contracts`: transport DTOs/events/shared schemas
- `packages/validation`: reusable Zod validation
- `packages/config`: typed configuration loading
- `packages/logger`: logging primitives
- `packages/database`: shared DB bootstrap helpers only; domain repositories remain module-owned
- `packages/ai-core`: provider contracts/types, not vendor business logic
- `packages/workflow-core`: DAG types/validation/execution primitives
- `packages/testing`: factories/mocks/test helpers

Do not create a “shared” dumping ground.

## Responsive frontend shell and scrolling architecture
The web application is responsive from a 320px minimum viewport through large desktop displays. Responsive behavior is treated as an application architecture concern because CineFlow contains editor-style multi-panel workspaces rather than simple document pages.

Expected adaptive behavior:
- desktop/laptop: persistent navigation and multi-panel editing surfaces where space allows
- tablet: collapsible navigation/inspector panels
- mobile: focused content/canvas with sheets/drawers for secondary controls

The frontend should provide shared scrolling primitives built on shadcn/ui + Radix ScrollArea and project overflow utilities. These primitives own hidden-scrollbar styling, focus/accessibility behavior, and consistent overflow affordances. Feature code should not invent independent scrollbar implementations.

Primary page content, navigation, inspectors, asset rails, timelines, modal bodies, and tables may scroll independently when their information architecture requires it. Avoid accidental nested-scroll hierarchies.

Flow Studio is different: its central graph is a canvas surface navigated using React Flow pan/zoom/pinch/fit-view semantics. Normal browser x/y scrollbar navigation must not be the primary method of moving around the graph.

## API module boundaries
Expected modules:
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

Each module should internally separate:
- domain
- application
- infrastructure
- presentation

Example:

```text
modules/projects/
  domain/
  application/
  infrastructure/
  presentation/
```

## Dependency direction
Presentation -> Application -> Domain
Infrastructure implements ports required by Application/Domain.

Domain code must not import Express, Prisma, Mongoose, Redis clients, AI SDKs, Razorpay, GCS, or FFmpeg.

## Request path
```text
Client
 -> API route/controller
 -> validation/auth/authorization
 -> application use case
 -> domain rules
 -> repository/provider ports
 -> infrastructure adapter
```

## Asynchronous generation path
```text
Client
 -> POST generation
 -> API validates request / reserves resources
 -> durable workflow is started
 -> 202 Accepted with generation ID
 -> workflow invokes AI/media adapters
 -> durable state persists
 -> UI receives status through polling/SSE/WebSocket-compatible mechanism
 -> final asset persisted
```

## AI/media orchestration layers
Do not collapse these into one abstraction:

1. **React Flow**: visual workflow UI.
2. **Production Planner**: AI-assisted plan generation.
3. **Workflow/DAG engine**: deterministic dependency graph validation and execution planning.
4. **Durable workflow runner**: asynchronous/retryable execution.
5. **Provider adapters**: model/vendor-specific calls.
6. **Media worker**: deterministic FFmpeg/FFprobe composition/inspection.

## Data stores
### MongoDB Atlas
Source of truth for flexible creative data:
- projects
- episodes/scenes/shots
- characters/reference packs
- assets/generation metadata
- production plans
- workflow definitions/versions
- prompt/model metadata

### PostgreSQL
Source of truth for relational/transactional data:
- users
- workspaces
- memberships
- credential metadata/ciphertext
- wallets
- ledger
- reservations
- payments/orders/refunds
- webhook events/idempotency records

### Redis
Use for:
- caching
- rate-limit counters
- transient locks
- short-lived execution state
- idempotency acceleration where PostgreSQL remains authoritative

Do not store durable financial truth exclusively in Redis.

## Storage
Google Cloud Storage stores:
- uploaded reference images/videos/audio
- generated intermediate assets
- final rendered media
- thumbnails/previews where appropriate

Use signed upload/download URLs and ownership checks.

## Media processing
Cloud Run media worker owns:
- FFprobe metadata extraction
- FFmpeg trim/join/mux
- audio mix/normalization/ducking/fades
- subtitle burn/mux where required
- resolution/aspect-ratio transformation
- final encoding

AI semantic transformations such as lip-sync remain provider operations, not FFmpeg responsibilities.

## Security architecture
- encrypted BYOK credentials server-side
- workspace-scoped authorization
- signed object-storage URLs
- input validation
- webhook verification
- rate limiting
- audit logging
- least-privilege service identities
- no secrets in frontend bundles or client state

## Scalability strategy
Start modular-monolith-first.
Extract a service only when one or more become true:
- independent scaling profile is materially different
- runtime/environment differs
- fault isolation is required
- independent deployment cadence is needed
- ownership by a separate engineering team is justified
- transactional coupling is acceptably low

The media worker is separated immediately because its runtime profile is already materially different.

## Observability
Every significant operation should carry correlation context:
- requestId
- userId
- workspaceId
- projectId
- workflowId
- generationId

Use structured logs, metrics, traces, and error reporting.

## Availability/error philosophy
External AI providers are unreliable dependencies. Design for:
- timeout
- retry with bounded exponential backoff
- idempotency
- provider errors
- quota exhaustion
- invalid credentials
- partial workflow completion
- user-triggered retry/regeneration

## Architecture constraints
- no circular module dependencies
- no controller business logic
- no vendor SDK calls outside adapters
- no direct cross-module persistence access
- no synchronous waiting for long-running AI/video jobs
- no premature microservices
