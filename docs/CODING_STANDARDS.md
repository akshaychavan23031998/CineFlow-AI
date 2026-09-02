# CineFlow AI — Coding Standards

## General
The codebase should look maintainable by a professional engineering team.

Prioritize clarity, explicitness, correctness, and testability over clever abstractions.

## TypeScript
- `strict: true`.
- Avoid `any`.
- Prefer discriminated unions for state machines/results.
- Prefer explicit return types for public functions/use cases.
- Represent IDs with domain aliases/branded types where useful.
- Do not use non-null assertions casually.
- Exhaustively handle enums/unions where possible.

## Naming
- files/directories: kebab-case unless framework convention requires otherwise
- classes/types/interfaces: PascalCase
- functions/variables: camelCase
- constants: UPPER_SNAKE_CASE when truly constant
- booleans: `is`, `has`, `can`, `should`
- use-case names: verb-oriented (`CreateProject`, `ReserveCredits`, `StartWorkflowRun`)

## Functions
- small and focused
- avoid hidden side effects
- avoid boolean-parameter ambiguity; use options objects when behavior is complex
- prefer early returns to deep nesting
- keep pure domain functions pure

## Error handling
Use typed application errors such as:
- ValidationError
- AuthenticationError
- AuthorizationError
- NotFoundError
- ConflictError
- RateLimitError
- ExternalProviderError
- InsufficientCreditsError
- InvalidWorkflowError

Never throw raw vendor errors through API boundaries.

## Architecture
Controllers:
- parse transport data
- invoke validation/auth
- call application service/use case
- map result to HTTP

Application:
- orchestrates domain/use-case flow
- controls transactions and ports

Domain:
- business invariants and domain models

Infrastructure:
- Mongoose/Prisma repositories
- Redis implementation
- GCS adapter
- Gemini adapter
- Razorpay adapter
- Sync adapter
- FFmpeg client/worker implementation

## Repositories
Expose business-oriented repository methods.
Do not leak Mongoose documents or Prisma-specific structures into domain/application layers.

## External providers
All provider SDK usage lives in infrastructure adapters.
Use capability-oriented interfaces rather than one giant provider interface.

## React
- prefer functional components
- domain components should be reusable
- keep API/data fetching in RTK Query/services rather than ad hoc `fetch` scattered in components
- keep secrets out of all client state
- avoid unnecessary global state
- memoize only when justified by measured/known cost

## Redux Toolkit
Recommended slices:
- auth/session metadata as needed
- workspace context
- Flow Studio draft/editor state
- Production Map UI state
- local feature coordination that genuinely spans components

Use RTK Query for API-backed server state rather than duplicating server resources into slices unnecessarily.

## React Flow
- persist serializable workflow definition only
- node data follows typed schemas
- separate visual state from executable semantic state
- validate edges/port compatibility before saving/running

## Responsive UI standards
- Implement mobile-first responsive layouts.
- Minimum supported viewport width is 320px.
- Test and design intentionally for mobile, tablet, laptop, desktop, and large-screen layouts.
- Avoid fixed-width primary application surfaces unless the component itself requires a bounded width.
- Prefer responsive CSS Grid/Flexbox and consistent Tailwind breakpoint conventions.
- Minimum interactive target size should be approximately 44x44px for touch-critical controls where practical.
- Never rely on hover as the only way to discover or execute an action.
- Prevent unintended page-level horizontal scrolling.
- Media previews must scale responsively while preserving aspect ratio.
- Dialogs, sheets, menus, drawers, and popovers must remain operable at small viewports.
- Data tables must adapt using intentional horizontal scrolling, column reduction, cards, or another approved mobile treatment.
- Flow Studio must adapt to touch/small screens with a focused canvas and drawer/sheet-based controls rather than attempting to preserve the full desktop three-panel layout.
- Avoid layout shifts caused by media loading; reserve dimensions/aspect ratios where possible.

## Scrolling and overflow standards
- CineFlow supports smooth vertical and horizontal scrolling where the information architecture requires it.
- Primary product surfaces should visually hide native browser scrollbar chrome where doing so does not harm usability or accessibility.
- Use the project's shared `ScrollArea`, `ScrollablePanel`, `HorizontalMediaRail`, or equivalent approved abstractions instead of ad hoc per-feature scrollbar CSS.
- The shared ScrollArea implementation should build on shadcn/ui / `@radix-ui/react-scroll-area`; do not add another scrolling dependency without an ADR or explicit approval.
- Hidden-scrollbar containers must remain fully scrollable through mouse, trackpad, touch, and keyboard where semantically appropriate.
- Never use global `overflow: hidden` as a shortcut for layout bugs. Restrict overflow intentionally to the owning surface.
- Never clip content merely to eliminate a scrollbar.
- Horizontal rails/timelines with hidden scrollbar chrome should provide discoverability through edge fades, partial cards, arrows, snap points, or equivalent cues where needed.
- Avoid unnecessary nested scrolling regions. Independent scroll containers are acceptable for application sidebars, inspectors, panels, modal bodies, asset rails, timelines, and similar workspaces when their behavior is deliberate.
- Preserve scroll position when users move between closely related editing contexts where practical.
- Flow Studio canvas navigation uses React Flow pan/zoom/pinch/fit-view/minimap behavior, not page-level x/y scrollbars.
- Respect `prefers-reduced-motion` for animated scrolling, edge motion, merge animations, and canvas transitions.

## Database
- migrations for PostgreSQL schema changes
- explicit indexes for query patterns
- avoid unbounded queries
- use projection/select to avoid over-fetching
- do not put transaction logic in controllers

## Logging
Use structured logging.
Include correlation IDs and concise metadata.
Never use ad hoc `console.log` in production paths except where framework bootstrap may temporarily require it.

## Comments
Comments explain why, tradeoffs, invariants, or non-obvious behavior. Do not narrate obvious code.

## Documentation
Public module/application interfaces and significant architecture tradeoffs should be discoverable in docs/ADRs or code-level docs.

## Formatting/linting
Use ESLint + Prettier with automated CI enforcement.
Use Husky/lint-staged if adopted by the foundation phase.

## Imports
- avoid deeply coupled relative import chains through module internals
- use approved package/module aliases
- do not create circular dependencies

## Feature completion
A feature is incomplete without relevant tests and failure-path handling.
