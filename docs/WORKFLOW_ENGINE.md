# CineFlow AI — Workflow Engine

## Purpose
Flow Studio lets users visually connect media inputs, AI operations, deterministic media operations, and outputs. The backend converts this graph into a validated executable DAG.

React Flow is a UI representation, not the execution engine.

## Core entities
### Workflow
Logical named workflow associated with a project.

### WorkflowVersion
Immutable snapshot of nodes/edges/configuration.

### WorkflowRun
Execution of one workflow version.

### NodeRun
Execution state for one node in a run.

## Node contract
Each executable node type defines:
- type
- version
- input ports and schemas
- output ports and schemas
- configuration schema
- execution category
- estimated weight
- retry policy
- whether it is deterministic or external-provider-backed

## Example node families
Inputs:
- text-input
- image-asset
- video-asset
- audio-asset
- character-pack

AI:
- story-planner
- image-generator
- video-generator
- speech-generator
- music-generator
- lip-sync

Media:
- trim
- join
- audio-mixer
- subtitle
- composer

Outputs:
- preview
- export

## Compilation
Before a run:
1. validate node/edge schema
2. verify all node types/versions supported
3. verify port compatibility
4. verify required inputs connected or configured
5. detect cycles
6. build dependency graph
7. topologically sort
8. identify parallelizable nodes
9. compute estimated credit/resource requirements
10. create execution plan

Invalid graphs never enter execution.

## Execution
Nodes become runnable when all required upstream dependencies are successful.
Independent nodes may execute concurrently.

Possible states:
- PENDING
- READY
- QUEUED
- RUNNING
- WAITING_EXTERNAL
- SUCCEEDED
- FAILED
- SKIPPED
- CANCELLED
- BLOCKED

## Failure behavior
Failure policy is node/workflow dependent.
By default a required failed node blocks downstream dependent nodes.
Optional branches may fail/skip without blocking unrelated required output.

Users may retry eligible failed nodes; new output creates new run/version context as appropriate rather than mutating historical truth ambiguously.

## Progress calculation
AI decides required steps; backend computes progress.

Each operation type has a base weight. Example starting weights:
- setup/upload: 1
- analysis: 2
- image generation: 4
- voice generation: 3
- video generation: 8
- lip-sync: 5
- music generation: 3
- composition: 5
- review: 1
- export: 2

Normalize weights per workflow.

Formula:
`overall = sum(nodeWeight * nodeProgress) / sum(nodeWeight)`.

Completed = 1.0, not-started = 0.0.
For operations that provide measurable progress, use actual progress.
For external jobs with only coarse state, use conservative estimated progress and label it estimated.

Estimated progress must never report 100% before actual success.

## Production Map
Production Map uses the compiled/production-plan DAG but presents a simplified journey.
It shows:
- completed/current/upcoming/blocked stages
- current node/stage
- next best action
- dependencies
- optional branches
- project progress
- stage progress
- cost/time estimate disclaimer

The map is navigational: selecting a stage can navigate to the relevant screen/asset/workflow node.

## Versioning
Do not use Git internally.
Use Git-inspired version semantics:
- workflow version IDs
- parentVersionId
- branchName optional
- snapshot of nodes/edges/config
- createdBy/message/timestamp

Actions:
- save version
- duplicate
- branch
- restore by creating a new current version from old snapshot
- compare versions

## Idempotency
Starting a workflow run and executing chargeable nodes must have stable idempotency references. A retry must not accidentally double-charge or duplicate non-idempotent effects.

## Durable orchestration
A durable workflow runner owns long-lived execution/retries/waits. Node payloads reference asset IDs and credential IDs, never raw secrets or full binary payloads.
