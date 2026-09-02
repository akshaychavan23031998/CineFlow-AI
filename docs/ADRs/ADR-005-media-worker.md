# ADR-005: Dedicated Cloud Media Worker

## Status
Accepted.

## Decision
Run FFmpeg/FFprobe media operations in a dedicated Cloud Run worker rather than ordinary Vercel request functions.

## Rationale
Media processing is CPU-heavy, may require larger binaries/resources and has longer runtimes than ordinary API requests.

## Consequences
- jobs reference GCS assets instead of uploading large binaries through API
- worker uses safe process argument arrays
- worker has separate deployment/observability/resource configuration
