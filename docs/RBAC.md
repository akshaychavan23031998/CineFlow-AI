# CineFlow AI — RBAC

## Model
Authorization is workspace-scoped. A user may hold different roles in different workspaces.

Never store one global application role on the user as the sole authorization source.

`workspace_memberships` is authoritative for workspace role.

## Roles
### Owner
Highest workspace authority.
- all project/production permissions
- manage billing
- manage provider credentials
- invite/remove members
- change roles
- workspace configuration
- transfer/delete workspace subject to safeguards

### Admin
Operational administrator.
- manage members/roles within policy
- manage workspace provider connection
- create/edit/run projects/workflows
- view billing where configured
- cannot transfer ownership or perform Owner-only destructive actions

### Producer
Primary production user.
- create/manage projects
- create character packs
- upload/generate media
- build/run workflows
- consume authorized credits
- review/export output
- cannot manage workspace billing/users/providers unless explicitly delegated later

### Editor
Creative execution role.
- edit project/scenes/prompts/assets/workflows
- generate/regenerate media
- run allowed workflows
- cannot manage workspace users/billing/provider ownership

### Reviewer
Read/review role.
- view projects/assets/previews
- comment/approve/reject where review system exists
- cannot mutate production workflow or generate media

## Permission model
Implement permissions explicitly rather than scattering role-name comparisons.
Suggested permissions:
- workspace.read
- workspace.update
- workspace.delete
- members.read
- members.invite
- members.manage
- providers.personal.manage
- providers.workspace.manage
- billing.read
- billing.purchase
- projects.create
- projects.read
- projects.update
- projects.delete
- assets.upload
- assets.generate
- assets.read
- characters.manage
- workflows.read
- workflows.edit
- workflows.execute
- workflows.review
- exports.create
- audit.read

A role maps to a permission set.

## Baseline matrix
| Permission area | Owner | Admin | Producer | Editor | Reviewer |
|---|---|---|---|---|---|
| Workspace settings | Yes | Yes* | No | No | No |
| Delete/transfer workspace | Yes | No | No | No | No |
| Manage members | Yes | Yes | No | No | No |
| Workspace provider key | Yes | Yes | No | No | No |
| Personal provider key | Yes | Yes | Yes | Yes | Yes |
| Billing purchase | Yes | Configurable | No | No | No |
| Create projects | Yes | Yes | Yes | Yes | No |
| Edit projects | Yes | Yes | Yes | Yes | No |
| Generate media | Yes | Yes | Yes | Yes | No |
| Flow Studio edit/run | Yes | Yes | Yes | Yes | No |
| Review/comment | Yes | Yes | Yes | Yes | Yes |
| Export | Yes | Yes | Yes | Yes | View only by default |

`*` excludes Owner-only actions.

## Authorization sequence
For tenant resource:
1. authenticated user exists
2. workspace exists/active
3. membership exists/active
4. role grants required permission
5. resource belongs to the same workspace
6. additional domain policy passes

## BOLA prevention
Never authorize solely because the client knows a project/asset/workflow ID.
Repository/use-case queries should include workspace context.

## Personal provider credentials
A user can manage only their own personal credential.
Workspace credential requires Owner/Admin permission.
No role can retrieve plaintext stored credentials after save.

## Testing
Every protected endpoint/use case must include tests for:
- unauthenticated
- unauthorized role
- wrong-workspace ID
- valid role
- Owner/Admin exceptional rules where applicable
