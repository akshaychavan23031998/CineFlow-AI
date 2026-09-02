# CineFlow AI — Database Design

## Persistence philosophy
Use polyglot persistence deliberately:
- PostgreSQL for transactional/relational consistency.
- MongoDB for creative, nested, evolving production documents.
- Redis only for ephemeral coordination/cache.

All records must use stable identifiers, timestamps, and explicit tenant ownership where applicable.

## PostgreSQL entities
### users
- id
- email
- password_hash nullable for OAuth-only accounts
- display_name
- status
- created_at
- updated_at

### external_identities
- id
- user_id
- provider
- provider_subject
- created_at

Unique `(provider, provider_subject)`.

### workspaces
- id
- name
- slug
- owner_user_id
- status
- created_at
- updated_at

### workspace_memberships
- id
- workspace_id
- user_id
- role
- status
- invited_by
- created_at
- updated_at

Unique `(workspace_id, user_id)`.

### provider_credentials
- id
- workspace_id nullable for personal credential
- user_id nullable for workspace-owned credential where ownership is workspace
- provider
- scope_type: PERSONAL | WORKSPACE
- encrypted_secret
- encryption_key_version
- last_four
- status
- last_verified_at
- created_at
- updated_at

Never store plaintext secrets.

### credit_wallets
- id
- workspace_id
- balance
- reserved_balance
- version
- created_at
- updated_at

Unique workspace wallet unless product later supports multiple wallet types.

### credit_ledger_entries
Immutable.
- id
- wallet_id
- type: PURCHASE | RESERVATION | RELEASE | CHARGE | REFUND | BONUS | REVERSAL | ADJUSTMENT
- amount
- balance_before
- balance_after
- reserved_before
- reserved_after
- reference_type
- reference_id
- idempotency_key
- metadata_json
- created_at

Never update or delete normal ledger history; corrections use reversal entries.

### credit_reservations
- id
- wallet_id
- workflow_id
- amount
- status: ACTIVE | CONSUMED | RELEASED | EXPIRED
- expires_at
- created_at
- updated_at

### payment_orders
- id
- workspace_id
- gateway
- gateway_order_id
- pack_id
- amount_minor
- currency
- credits
- status
- idempotency_key
- created_at
- updated_at

### payments
- id
- payment_order_id
- gateway_payment_id
- status
- amount_minor
- currency
- captured_at
- created_at
- updated_at

### webhook_events
- id
- provider
- external_event_id
- event_type
- payload_hash
- processing_status
- processed_at
- created_at

Unique `(provider, external_event_id)` for idempotency.

### audit_events
- id
- workspace_id
- actor_user_id
- action
- resource_type
- resource_id
- metadata_json
- request_id
- created_at

## MongoDB collections
### projects
- _id
- workspaceId
- name
- description
- status
- targetFormat
- createdBy
- createdAt
- updatedAt

Indexes: workspaceId + updatedAt, workspaceId + status.

### episodes
- _id
- workspaceId
- projectId
- title
- order
- status
- metadata

### scenes
Flexible nested creative data:
- _id
- workspaceId
- projectId
- episodeId
- order
- prompt
- characters[]
- camera
- lighting
- dialogue
- audio
- outputSettings
- status
- version

### character_packs
- _id
- workspaceId
- projectId nullable for workspace-global characters
- name
- category
- description
- attributes
- referenceAssets[]
- status
- createdBy
- createdAt
- updatedAt

### assets
- _id
- workspaceId
- projectId nullable
- ownerUserId
- assetType: IMAGE | VIDEO | AUDIO | MUSIC | VOICE | OTHER
- origin: UPLOAD | GENERATED | COMPOSED | EXTRACTED
- storageKey
- mimeType
- sizeBytes
- metadata
- analysis
- lifecycleStatus
- parentAssetIds[]
- createdAt
- updatedAt

### production_plans
- _id
- workspaceId
- projectId
- goal
- planVersion
- stages[]
- estimatedCredits
- estimatedDurationRange
- disclaimerVersion
- createdBy
- createdAt

### workflows
Current logical workflow.
- _id
- workspaceId
- projectId
- name
- currentVersionId
- status
- createdAt
- updatedAt

### workflow_versions
Immutable-ish snapshots.
- _id
- workspaceId
- workflowId
- parentVersionId nullable
- branchName nullable
- createdBy
- message
- nodes[]
- edges[]
- compiledPlan metadata
- createdAt

### workflow_runs
- _id
- workspaceId
- workflowId
- workflowVersionId
- status
- nodeRuns[]
- estimatedCost
- actualPlatformCost
- startedAt
- completedAt
- errorSummary

### generation_jobs
- _id
- workspaceId
- projectId
- workflowRunId nullable
- nodeId nullable
- operationType
- provider
- model
- status
- inputAssetIds[]
- outputAssetIds[]
- providerJobId
- attempt
- error
- timestamps

## Tenant isolation
Every tenant-owned MongoDB document includes `workspaceId`.
Every repository method must require workspace context.
Avoid generic `findById(id)` for tenant resources; prefer `findByIdForWorkspace(id, workspaceId)`.

PostgreSQL access similarly scopes membership and workspace-owned records.

## Concurrency
For wallet operations use PostgreSQL transactions with row-level locking and/or optimistic version checks.

Example invariant:
`available = balance - reserved_balance >= 0`.

Concurrent workflows must not reserve the same credits twice.

## Deletion/lifecycle
Media assets should support lifecycle states and scheduled cleanup. Production records may use soft deletion where audit/history requirements exist.

Never delete financial ledger entries to “fix” data.
