# CineFlow AI

CineFlow AI is a multimodal AI production and orchestration platform designed to create, transform, compose, and manage image, video, speech, music, and other media workflows.

The platform provides both simplified AI-assisted creation and advanced visual workflow orchestration.

Users can create media from text, images, video, audio, or any combination of supported modalities, generate individual reusable assets, and visually compose those assets into final productions.

## Product Capabilities

CineFlow AI is designed to support:

- text-to-image generation;
- text-to-video generation;
- image-to-video generation;
- multimodal video generation;
- uploaded reference-image workflows;
- character reference packs;
- uploaded reference-video workflows;
- speech and voice generation;
- music generation and uploaded music;
- audio understanding;
- image understanding;
- video understanding;
- AI-assisted lip synchronization;
- audio and video composition;
- reusable generated assets;
- quick reel generation;
- visual workflow orchestration;
- production journey tracking;
- workflow versioning and branching;
- collaborative workspaces;
- role-based access control;
- BYOK AI-provider credentials;
- usage and credit accounting;
- Razorpay-based credit purchases.

## Architecture

CineFlow AI uses a monorepo with a modular-monolith backend architecture.

The primary HTTP backend remains a single deployable application with strict internal domain boundaries.

CPU-intensive media processing is intentionally isolated into a dedicated worker because media-processing workloads have different runtime, scaling, resource, and failure characteristics from request-response API workloads.

````text
apps/
├── web/
├── api/
└── media-worker/

packages/
├── contracts/
├── validation/
├── config/
├── logger/
├── database/
├── ai-core/
├── workflow-core/
└── testing/

# CineFlow AI Local Infrastructure

CineFlow AI uses Docker Compose to provide reproducible local infrastructure dependencies.

The authoritative Compose definition is located at:

```text
compose.yaml
````
