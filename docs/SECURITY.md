# CineFlow AI — Security Requirements

## Security goals
Protect:
- user accounts
- workspace isolation
- provider credentials
- personal images/videos/voices
- payment events
- credit balances
- generated assets
- internal infrastructure credentials

## Authentication
- Email/password uses Argon2id.
- Google sign-in uses OAuth 2.0/OIDC.
- Access/refresh session strategy must use secure HttpOnly cookies where browser-based authentication is used.
- Refresh tokens/sessions must support rotation/revocation.
- Do not place sensitive tokens in localStorage.

## Authorization
Authentication is not authorization.
Every tenant resource operation must verify workspace membership and permission.

Use deny-by-default authorization.

Never trust workspace IDs, user IDs, roles, resource owners, or prices sent by the client.

## BYOK credentials
Provider secrets:
- accepted server-side over HTTPS only
- validated server-side
- encrypted before persistence
- decrypted only at execution time
- kept in memory only for the shortest practical duration
- never returned after creation
- never stored in Redux/localStorage/browser caches
- never included in logs, traces, workflow definitions, job payloads, Sentry, or analytics

Use envelope encryption backed by Google Cloud KMS where deployed.

Store only metadata such as provider, scope, last four characters, status, and verification time alongside ciphertext.

## Secret management
Platform-owned secrets live in deployment secret managers/environment secret facilities, not repository files.

`.env.example` may document variable names only.

## Object storage
- use signed URLs with short expiration
- authorize before issuing signed URLs
- restrict MIME types and size limits
- generate random storage keys
- do not trust original filenames as storage paths
- keep buckets private by default
- validate completed uploads before marking assets ready

## Upload safety
For media uploads:
- maximum byte-size limits
- allowlisted MIME/content types
- verify real file signatures/metadata where practical
- sanitize/normalize images
- inspect media with FFprobe
- reject malformed media
- strip unnecessary metadata when practical
- do not execute user-provided binaries/scripts

## SSRF and remote media
Prefer direct user upload rather than arbitrary backend URL fetching.
If URL imports are later supported, implement strict SSRF protections, scheme allowlists, DNS/IP restrictions, redirect controls, and byte/time limits.

## API security
- Helmet/security headers
- explicit CORS policy
- Zod validation
- body-size limits
- rate limiting
- safe error responses
- request IDs
- avoid mass assignment
- pagination limits
- object-level authorization
- function-level authorization

## Payment security
- prices/credit packs are backend-owned
- create Razorpay orders server-side
- verify payment signatures server-side
- verify webhook signatures using raw request payload as required
- persist webhook event IDs idempotently
- never add credits based only on frontend success callback
- monetary/credit updates use PostgreSQL transactions

## Credit integrity
Never directly set wallet balance from arbitrary code.
All mutations go through billing application use cases.
Use row locking/optimistic versioning to prevent overspending.
Reservations prevent concurrent workflows spending the same available credits.

## AI/provider security
- map provider failures into safe internal errors
- never echo provider credentials
- avoid sending unnecessary personal data to AI providers
- make provider privacy/usage disclaimer visible
- preserve explicit user consent/rights expectations for uploaded face/voice/reference media

## Logging and observability
Structured logs may include IDs/status/durations, but not:
- secrets
- access/refresh tokens
- raw passwords
- full payment signatures
- provider API keys
- raw personal media
- unnecessarily sensitive prompts/content

Implement redaction in logger configuration.

## Audit events
Audit sensitive actions:
- workspace membership changes
- role changes
- provider credential create/replace/disconnect
- billing adjustments
- payment outcome transitions
- destructive project/workspace actions

## Dependency and supply-chain security
- lockfiles committed
- automated dependency review/scanning
- avoid unmaintained packages for critical boundaries
- pin/upgrade intentionally
- GitHub branch protection recommended
- CI must run tests/typecheck/lint

## Runtime isolation
Media worker accepts only typed internal jobs and scoped storage references. Do not interpolate untrusted values into shell command strings. Use safe process argument arrays for FFmpeg/FFprobe execution.

## Security testing
Include tests for:
- BOLA/object-level authorization
- cross-workspace access attempts
- role escalation attempts
- missing/invalid credential behavior
- webhook replay
- credit double-spend
- invalid upload metadata
- unsafe file type rejection
- rate limit behavior
