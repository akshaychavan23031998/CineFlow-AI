# CineFlow AI — API Contracts

## General conventions
Base path: `/api/v1`.

Use JSON for ordinary APIs and signed URLs/direct uploads for large media.

Every response should have a consistent shape.

Success example:
```json
{
  "data": {},
  "meta": {
    "requestId": "req_..."
  }
}
```

Error example:
```json
{
  "error": {
    "code": "FORBIDDEN",
    "message": "You do not have permission to perform this action.",
    "requestId": "req_...",
    "details": null
  }
}
```

Do not expose stack traces or vendor secrets.

## Authentication
### `POST /auth/register`
Creates local account.

### `POST /auth/login`
Authenticates local account.

### `POST /auth/refresh`
Rotates refresh session.

### `POST /auth/logout`
Invalidates current session.

### OAuth endpoints
Google OAuth/OIDC start/callback endpoints according to selected auth implementation.

## Workspaces
### `POST /workspaces`
Create workspace.

### `GET /workspaces`
List user's memberships.

### `GET /workspaces/:workspaceId`
Get workspace.

### `POST /workspaces/:workspaceId/invitations`
Owner/Admin invites member.

### `PATCH /workspaces/:workspaceId/members/:memberId`
Update role/status subject to RBAC rules.

## Provider credentials
### `POST /provider-credentials`
Creates a personal/workspace provider credential.
Input includes provider, scope, secret.
Secret is accepted only over HTTPS, validated server-side, encrypted, and never returned.

### `POST /provider-credentials/:id/test`
Tests stored credential server-side.

### `PUT /provider-credentials/:id/secret`
Replaces secret.

### `DELETE /provider-credentials/:id`
Disconnects credential.

### `GET /provider-credentials`
Returns metadata only: provider, scope, status, lastFour, lastVerifiedAt.

## Projects
### `POST /workspaces/:workspaceId/projects`
Create project.

### `GET /workspaces/:workspaceId/projects`
Paginated listing.

### `GET /workspaces/:workspaceId/projects/:projectId`
Get project.

### `PATCH /workspaces/:workspaceId/projects/:projectId`
Update allowed fields.

## Characters
### `POST /workspaces/:workspaceId/projects/:projectId/characters`
Create character pack.

### `PATCH /.../characters/:characterId`
Update metadata.

### `POST /.../characters/:characterId/references`
Attach existing asset as a typed reference.

## Asset upload
### `POST /workspaces/:workspaceId/assets/upload-intents`
Input:
- filename
- mimeType
- sizeBytes
- intendedAssetType
- projectId optional

Returns signed upload URL and upload token/asset draft ID.

### `POST /workspaces/:workspaceId/assets/:assetId/complete-upload`
Confirms upload and queues metadata inspection/analysis.

### `GET /workspaces/:workspaceId/assets`
Paginated/filterable asset listing.

## Production plan
### `POST /workspaces/:workspaceId/projects/:projectId/production-plans`
Input includes user goal and selected available assets/character packs.
Returns a validated typed plan with stages, dependencies, optional branches, and estimates.

## Workflows
### `POST /workspaces/:workspaceId/projects/:projectId/workflows`
Create workflow.

### `PUT /.../workflows/:workflowId/draft`
Save current React Flow nodes/edges after validation.

### `POST /.../workflows/:workflowId/versions`
Create immutable version snapshot.

### `POST /.../workflows/:workflowId/compile`
Validate graph, detect cycles, verify port compatibility and produce execution plan.

### `POST /.../workflows/:workflowId/runs`
Starts asynchronous execution. Returns `202 Accepted` with workflowRunId.

### `GET /.../workflow-runs/:runId`
Returns overall/stage/node states and progress metadata.

### `POST /.../workflow-runs/:runId/cancel`
Requests cancellation where supported.

### `POST /.../workflow-runs/:runId/nodes/:nodeRunId/retry`
Retries eligible failed node.

## Quick generation
### `POST /workspaces/:workspaceId/projects/:projectId/quick-generations`
Accepts typed multimodal inputs and desired output. Backend produces/executes a production plan without requiring manual Flow Studio editing.

## Generation status
Long-running operations return asynchronous IDs. Never hold ordinary request open for multi-minute AI work.

## Billing
### `GET /workspaces/:workspaceId/billing/wallet`
Wallet summary.

### `GET /workspaces/:workspaceId/billing/ledger`
Paginated immutable transaction history.

### `POST /workspaces/:workspaceId/billing/estimate`
Estimates platform-credit usage for a workflow/version.

### `POST /workspaces/:workspaceId/payments/orders`
Creates Razorpay order from backend-owned package configuration.

### `POST /payments/razorpay/verify`
Verifies checkout result server-side where required.

### `POST /webhooks/razorpay`
Public webhook endpoint with signature verification and event idempotency.

## Pagination
Use cursor pagination for growing lists where practical.
Example:
`?limit=25&cursor=...`

## Idempotency
Mutation endpoints with financial or duplicate-sensitive effects should accept an `Idempotency-Key` header or equivalent explicit idempotency token.

## Validation
Every input contract has a shared Zod schema in the appropriate package/module. Do not duplicate validation logic manually between frontend and backend when a safe shared contract is appropriate.

## HTTP status expectations
- 200 successful read/update
- 201 created
- 202 accepted async work
- 204 successful no-content delete/logout where appropriate
- 400 invalid request
- 401 unauthenticated
- 403 authenticated but unauthorized
- 404 absent or deliberately concealed tenant resource
- 409 conflict/idempotency/state conflict
- 422 domain validation where differentiated
- 429 rate/quota limit
- 500 unexpected server failure
- 502/503 external dependency unavailable where useful
