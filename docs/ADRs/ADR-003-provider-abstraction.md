# ADR-003: Capability-Oriented Provider Abstraction

## Status
Accepted.

## Decision
All AI/payment/storage/external integrations use ports/adapters. AI capabilities are represented by separate interfaces instead of one giant provider contract.

## Rationale
CineFlow must support BYOK and provider replacement without rewriting domain logic.

## Consequences
- no vendor SDK calls from domain/application/UI
- normalized error handling required
- provider-specific features are translated through adapter capabilities
