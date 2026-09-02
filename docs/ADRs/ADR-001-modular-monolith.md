# ADR-001: Modular Monolith with Dedicated Media Worker

## Status
Accepted.

## Decision
Use one modular-monolith API deployable plus one separately deployed media worker within a monorepo.

## Rationale
The product does not yet justify distributed service complexity. A modular monolith keeps transactions, local development, debugging, deployment, and testing simpler while preserving domain boundaries. Media processing is separated because FFmpeg/FFprobe has materially different CPU/memory/runtime characteristics.

## Consequences
- strict module boundaries required
- no direct cross-module infrastructure access
- selected modules may be extracted later if scale/team/runtime justifies it
- avoid service-to-service networking overhead for ordinary business modules
