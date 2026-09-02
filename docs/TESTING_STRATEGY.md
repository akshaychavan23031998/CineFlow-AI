# CineFlow AI — Testing Strategy

## Testing pyramid
Use the cheapest test layer that proves the behavior, while keeping critical end-to-end journeys covered.

### Unit tests
Primary targets:
- domain rules
- application use cases
- workflow DAG validation/compiler
- progress calculation
- cost estimation
- RBAC policy functions
- credit reservation/ledger rules
- provider-routing decisions

### Integration tests
Primary targets:
- Express endpoints
- repository implementations
- PostgreSQL transaction behavior
- MongoDB tenant scoping
- Redis-backed coordination where important
- webhook verification/idempotency
- GCS upload-intent flow with adapters mocked/emulated as appropriate

### E2E tests
Use Playwright for critical browser journeys:
1. register/login
2. workspace creation
3. connect provider credential
4. create project
5. upload asset
6. create character pack
7. quick generation happy path using mocked provider adapters
8. Flow Studio save/compile/run
9. Production Map updates
10. purchase credits using test gateway/mocked Razorpay where practical

## Responsive and cross-viewport testing
Responsive behavior is release-critical, not visual polish. Playwright must exercise critical journeys at representative viewport classes.

Minimum representative E2E viewports:
- mobile: 375x812
- tablet: 768x1024
- laptop: 1366x768
- desktop: 1440x900

Additionally perform targeted layout checks at the minimum supported width of 320px and at 1920px+ for wide-screen editor behavior.

Critical responsive journeys:
- authentication/provider onboarding
- dashboard/project creation
- Quick Generate
- asset upload and Asset Studio
- Character Reference Pack
- Production Map / “Where am I?”
- Flow Studio navigation and node selection
- billing/credit purchase UI
- settings/provider management
- media preview/export

Release-blocking responsive defects include:
- unreachable controls
- unintended page-level horizontal overflow
- clipped critical content
- non-scrollable overflowing panels
- hover-only required actions
- unusable touch targets
- dialogs/sheets extending beyond usable viewport without a working scroll region
- Flow Studio controls inaccessible on mobile/tablet

## Scroll and overflow testing
Where native scrollbar chrome is hidden, test that content remains accessible using the supported interaction model.

Cover as applicable:
- mouse-wheel vertical scrolling
- trackpad-compatible horizontal/vertical overflow behavior through browser semantics
- touch swipe scrolling for mobile/tablet
- keyboard scrolling/focus navigation in semantic scroll regions
- horizontal media rails/timelines
- independently scrolling sidebars/inspectors/modal bodies
- visible overflow affordances such as fades/arrows/partial items when required
- React Flow pan, zoom, pinch/gesture behavior, fit-view, and responsive canvas controls

Do not assert only that scrollbars are visually absent; assert that hidden scrollbar treatment has not made content unreachable.

## Provider testing
Never require expensive real AI calls for ordinary test suites.
Create deterministic mock/fake provider adapters.

Contract-test adapters against expected normalized inputs/outputs.
Keep optional smoke tests for real sandbox/provider credentials outside default CI.

## Media worker testing
- test command construction without shell interpolation
- use small fixture media
- verify FFprobe metadata extraction
- verify basic mux/mix/trim composition
- keep fixtures tiny to reduce CI time

## Security tests
Must include:
- cross-workspace object access denied
- insufficient-role operation denied
- secret not returned by credential endpoints
- secret redaction from logs where testable
- invalid webhook signature rejected
- webhook replay does not double-credit
- concurrent reservations cannot overspend wallet
- malformed/unsupported upload rejected

## Workflow tests
Cover:
- valid DAG
- cycle detection
- missing required input
- incompatible ports
- parallel-ready nodes
- failure propagation
- retryable failure
- cancelled workflow
- weighted progress calculation
- estimated vs actual progress marker behavior

## Billing tests
Cover:
- reserve credits
- release credits
- consume reservation
- refund/reversal
- duplicate idempotency key
- two concurrent reservations
- payment captured once
- duplicate webhook ignored

## CI gates
Every PR/commit milestone should run appropriate combination of:
- lint
- typecheck
- unit tests
- integration tests
- build

E2E may run on main/release or selected PRs depending on execution time.

## Coverage
Do not chase a meaningless global coverage number. Require strong coverage for high-risk domain logic and critical flows. If a numerical target is used, treat it as a floor, not evidence of correctness.

## Test data
Use factories/builders. Avoid brittle massive fixtures.
Ensure tenant IDs differ in authorization tests.

## Determinism
Mock timestamps/random IDs/providers when required. Tests must not depend on external AI latency or rate limits.
