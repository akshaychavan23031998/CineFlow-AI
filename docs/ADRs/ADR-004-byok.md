# ADR-004: Bring Your Own AI Credentials

## Status
Accepted.

## Decision
Support personal and workspace-scoped provider credentials. Store secrets encrypted server-side and never return plaintext after creation.

## Rationale
BYOK prevents public-demo users from exhausting CineFlow-owned AI quota and gives users control over provider usage/billing.

## Consequences
- credential setup occurs after authentication
- missing/invalid credentials block generation, not dashboard access
- secrets cannot appear in client state/workflow JSON/logs
- provider usage must be distinguished from CineFlow platform credits
