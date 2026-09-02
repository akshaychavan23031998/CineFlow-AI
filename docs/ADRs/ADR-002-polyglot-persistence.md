# ADR-002: Polyglot Persistence

## Status
Accepted.

## Decision
Use PostgreSQL for transactional/relational data, MongoDB for creative/flexible production data, and Redis for ephemeral coordination/cache.

## Rationale
Billing, memberships, payments and credentials benefit from relational constraints and transactions. Creative scenes/workflows/assets evolve as nested flexible documents. Redis is well suited to transient state but not durable financial truth.

## Consequences
- repositories own persistence mapping
- cross-database transactions are avoided where possible
- explicit consistency boundaries are required
