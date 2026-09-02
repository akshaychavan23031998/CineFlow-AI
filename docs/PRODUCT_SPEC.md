# CineFlow AI — Product Specification

## Product statement
CineFlow AI is a multimodal AI production and orchestration studio that lets users create media from text, images, video, audio, or any combination of those inputs; generate media assets independently; visually compose AI/media workflows; and produce final short-form videos with optional voice, music, lip-sync, subtitles, and media composition.

Tagline: **From Prompt to Production.**

## Product principles
1. Every input modality is optional.
2. Users can generate assets independently or generate a complete reel in one guided flow.
3. Simple users get a guided experience; advanced users get a node-based Flow Studio.
4. The system always explains current state, next step, dependencies, cost estimates, and whether progress/time values are estimated.
5. External AI providers are interchangeable through adapters.
6. User-provided AI credentials are supported through secure BYOK.
7. The product must feel like production software, not a demo wrapper around one model.
8. Responsive usability is mandatory across mobile, tablet, laptop, desktop, and large displays.
9. Scrolling and overflow must feel intentional and cinematic: content remains fully navigable while distracting native scrollbar chrome is hidden where appropriate.

## Primary personas
### Producer
Creates projects, character references, generation plans, executes workflows, and approves outputs.

### Editor
Edits prompts, scenes, assets, timelines, workflows, and reruns stages.

### Reviewer
Views previews, comments, and approves/rejects work without modifying production configuration.

### Admin/Owner
Manages workspace users, provider connections, billing, policies, and workspace configuration.

## Core creation modes
### Quick Generate
For users who want a finished short video without managing nodes.
Inputs may include any combination of:
- text prompt
- reference images
- reference video
- uploaded/generated voice/audio
- uploaded/generated music
- optional character pack

Output may be:
- video only
- audio only
- image only
- complete reel with mixed audio

### Asset Studio
Allows independent upload/generation and reuse of:
- images
- videos
- voice tracks
- music tracks
- sound effects
- character reference packs

### Flow Studio
Visual React Flow-based orchestration for combining assets and AI/media operations.
Node families:
- inputs: text, image, video, audio, character
- AI: story planner, image generator, video generator, speech generator, music generator, lip-sync
- media: trim, join, mixer, subtitle, composer
- outputs: preview, export

### Production Map
A persistent “Where am I?” experience generated from the production plan.
It shows:
- completed stages
- current stage
- upcoming stages
- blockers
- weighted progress
- next best action
- estimated credits/time
- optional branches

### Version History
Git-inspired workflow/media versioning with:
- versions
- parent-child relationships
- branches/alternate takes
- restore
- duplicate
- compare

## Multimodal input requirements
The system must accept text, image, video, and audio simultaneously. It must not force users to choose one modality exclusively.

Examples:
- text -> video
- image -> video
- text + image -> video
- uploaded video + generated voice -> lip-sync -> final video
- generated video + uploaded music -> compose
- images + generated speech -> character video -> lip-sync
- text + images + video + audio -> multimodal planned workflow

## Character Reference Pack
A character may contain:
- face image
- upper-body image
- full-body image
- profile/alternate-angle image
- 5–10 second reference video
- optional authorized voice reference
- descriptive metadata

The system may analyze quality and suggest missing reference types, but users retain control.

## Production planning
The user describes desired output. The production planner generates a typed plan specifying required stages, dependencies, optional branches, estimated costs, and prerequisites.

The AI may decide the plan structure; the backend, not the AI, computes project progress.

## Progress UX
Three levels are supported:
- project progress
- stage progress
- current operation progress

Actual progress is used when measurable. Estimated progress is prefixed with `~` and never reaches 100% until the operation is actually complete.

## Progress disclaimer
Use the following default note where estimates are shown:

> Production steps, completion percentages, processing times and credit usage are estimates and may change based on selected AI models, media complexity, provider availability, retries and input quality. Final usage and completion status are confirmed only after each operation finishes.

Compact version:

> Estimates may vary based on model latency, media complexity, retries and provider availability.

## BYOK provider setup
Authentication and provider setup are separate concerns.
New-user journey:
1. authenticate
2. create/join workspace
3. connect Gemini or continue in non-generation mode
4. validate provider connection
5. start production

Existing users can enter the product even if a provider key is missing/invalid; generation actions are blocked with a clear remediation action.

Provider settings support:
- add personal provider key
- add workspace provider key (Owner/Admin)
- test connection
- replace key
- disconnect key
- never display the full saved secret again

## Billing modes
### BYOK mode
AI provider usage is controlled/billed by the connected provider account. CineFlow may charge only for its own managed platform/media-processing resources if configured.

### Managed-AI mode (future/optional)
CineFlow pays AI vendors and users consume CineFlow credits purchased with Razorpay.

Do not double-charge the same AI operation through provider billing and CineFlow AI credits.

## Credit system
Capabilities:
- wallet
- immutable ledger
- reservations
- charges
- refunds/reversals
- purchase packs
- node/workflow cost estimates

Credit rules are backend-owned and transactionally enforced.

## Collaboration and RBAC
Roles:
- Owner
- Admin
- Producer
- Editor
- Reviewer

A user may have different roles in different workspaces.

## Responsive product requirements
CineFlow AI must provide a production-quality responsive experience across mobile phones, tablets, laptops, desktops, and large displays.

Minimum supported viewport width: **320px**.

Representative layout targets:
- mobile: 320px+
- tablet: 768px+
- laptop: 1024px+
- desktop: 1440px+
- large display: 1920px+

All critical workflows must remain functional across supported devices, including:
- authentication and provider onboarding
- dashboard/project navigation
- Quick Generate
- Asset Studio
- Character Reference Packs
- Production Map
- billing/credits
- settings/provider management
- media preview/export

Flow Studio uses an adaptive interaction model:
- laptop/desktop: full multi-panel node editor
- tablet: collapsible sidebars/inspector with a large central canvas
- mobile: focused full-screen canvas with sheet/drawer-based node palette, inspector, and actions

No critical action may depend exclusively on hover, precision mouse input, or a desktop-only viewport.

## Seamless scrolling and overflow UX
The product must support both vertical and horizontal navigation without visually noisy native browser scrollbar tracks in primary product surfaces where they are not required for usability.

Scrolling must remain functional through:
- mouse wheel
- trackpad gestures
- touch swipes
- keyboard navigation where appropriate
- contextual horizontal navigation controls where appropriate

Expected independent scroll/navigation surfaces include:
- application/sidebar navigation
- Asset Studio panels and media rails
- property/inspector panels
- tables on constrained viewports
- audio/media timelines
- dialogs, drawers, and sheets
- Production Map overflow regions
- version history

Flow Studio is a canvas application and must use React Flow pan, zoom, pinch, fit-view, and minimap/navigation behaviors rather than turning the canvas into a giant browser scroll container.

Hidden scrollbar chrome must never make content undiscoverable or inaccessible. Use subtle edge fades, partial next-item visibility, arrows, pagination cues, minimaps, or equivalent affordances when users need a visual indication that more content exists.

The implementation should standardize these behaviors through shared ScrollArea/overflow components using the existing shadcn/ui + Radix foundation rather than adding an unnecessary independent scrolling library.

## Non-goals for V1
Do not build:
- full Premiere/CapCut-style manual editor
- professional DAW
- frame-by-frame animation editor
- social feed
- creator marketplace
- generic messaging system
- large template marketplace
- independent microservices for every module

## V1 success criteria
A user can:
1. register/login
2. create/join a workspace
3. securely connect Gemini
4. create a project
5. upload multimodal assets
6. create a character pack
7. generate a production plan
8. independently generate/upload media assets
9. build/inspect a Flow Studio DAG
10. execute a valid workflow asynchronously
11. view Production Map progress
12. compose audio/video output
13. perform lip-sync when configured
14. review version history
15. purchase/use credits where platform billing applies
16. export a final video
17. complete critical journeys across supported mobile, tablet, laptop, and desktop layouts
18. navigate vertical/horizontal overflow without exposed distracting scrollbar chrome or inaccessible content
