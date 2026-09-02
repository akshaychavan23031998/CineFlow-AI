# CineFlow AI — Deployment

## Target deployment
### Web
Vercel
- Next.js
- light/dark frontend
- no secrets exposed through `NEXT_PUBLIC_*` unless intentionally public

### API
Vercel-compatible Node/Express deployment.
Keep endpoints stateless except for external persistence.

### Durable workflows
Vercel Workflows or approved durable orchestration mechanism used by implementation phase.

### Media worker
Google Cloud Run
Container includes:
- Node.js runtime
- FFmpeg
- FFprobe

### Databases/services
- MongoDB Atlas
- Neon PostgreSQL
- Redis Cloud or Upstash depending final selected managed Redis
- Google Cloud Storage

### External providers
- Gemini/Google AI through BYOK/workspace/managed credential strategy
- Sync or selected lip-sync provider
- Razorpay payments

## Environments
At minimum:
- local
- development/preview
- production

Optional staging if project cost permits.

Use separate credentials/data where practical.

## Configuration
Typed environment validation on startup.

Example categories:
- database URLs
- Redis URL
- auth/session secrets
- OAuth client configuration
- GCP bucket/project/KMS identifiers
- workflow configuration
- Razorpay credentials/webhook secret
- managed-provider credentials if enabled
- observability DSNs/endpoints

Never commit real secrets.

## GCP IAM
Use least-privilege service identities.
Media worker should access only required GCS paths/bucket actions and relevant internal services.
KMS decrypt permission should be tightly scoped to services that need provider-secret decryption.

## GCS
- private bucket
- lifecycle rules for temporary/intermediate assets
- signed URLs
- environment-specific key prefixes/buckets as appropriate

## Cloud Run worker
Input job references asset IDs/storage keys, not raw large media bodies.
Worker downloads required media, processes in ephemeral filesystem, uploads output, cleans local temp data, and emits structured result/status.

Set CPU/memory/timeouts based on measured workloads, not guesses.

## Database migrations
PostgreSQL migrations run explicitly during deployment workflow or controlled release step.
Do not auto-run destructive migrations unpredictably on every serverless instance startup.

## CI/CD
GitHub Actions pipeline should include:
1. install with lockfile
2. lint
3. typecheck
4. unit tests
5. integration tests where configured
6. build
7. optional dependency/security scan
8. deploy after required checks

## Preview deployments
Frontend/API preview deployments are useful, but must not accidentally use production payment/provider credentials or production data.

Preview validation should include representative mobile, tablet, laptop, and desktop viewports for UI-affecting changes. Scroll/overflow regressions are release blockers when they make critical controls or content unreachable.

## Observability
Production includes:
- structured logs
- request correlation
- traces/metrics where configured
- error monitoring
- Cloud Run/GCP logs

## Rollback
- application deployments should be revertible to previous known-good version
- phase/task Git commits create clean checkpoints
- database migrations should be backward-aware where possible
- avoid irreversible destructive schema changes without explicit migration plan

## Cost control
- BYOK for user AI usage during portfolio/public demo
- lifecycle delete temporary assets
- limit upload sizes/durations
- rate-limit expensive operations
- avoid default generation on page load
- use mock/demo mode where useful for anonymous visitors

## Production readiness checklist
Before public release:
- all secrets rotated from development values
- CORS configured
- secure cookie settings correct
- OAuth callback URLs production-ready
- GCS private
- webhook endpoint verified
- rate limiting enabled
- provider key encryption enabled
- logs redact secrets
- backup/restore expectations documented
- billing concurrency/idempotency tests pass
