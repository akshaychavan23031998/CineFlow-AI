# ADR-006: React Flow UI Backed by Executable DAG

## Status
Accepted.

## Decision
Use React Flow for visual editing and a backend DAG compiler/executor for workflow semantics.

## Rationale
The user needs a visual production experience, but UI graph state is not sufficient for safe execution. Backend validation must own cycles, dependency order, port compatibility, cost estimation and execution readiness.

## Consequences
- flow definitions are typed/versioned
- backend compiles before execution
- invalid graphs never run
- Production Map is derived from validated plan/run state
