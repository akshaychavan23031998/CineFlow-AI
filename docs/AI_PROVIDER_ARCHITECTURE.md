# CineFlow AI — AI Provider Architecture

## Goal
CineFlow must not be coupled to Gemini, Veo, Sync, or any single vendor. Product workflows use normalized capabilities; infrastructure adapters translate those capabilities to provider APIs.

## Capability interfaces
Recommended independent interfaces:
- `TextGenerationProvider`
- `MediaUnderstandingProvider`
- `ImageGenerationProvider`
- `VideoGenerationProvider`
- `SpeechGenerationProvider`
- `MusicGenerationProvider`
- `LipSyncProvider`
- `EmbeddingProvider` only if later justified

Do not create one huge `AIProvider` interface requiring every vendor to implement unsupported features.

## Normalized request concepts
### Video generation
- prompt
- referenceImageAssets[]
- referenceVideoAsset optional
- audioAsset optional when provider supports it
- duration target
- aspect ratio
- resolution intent
- style/camera metadata
- output constraints

### Image generation
- prompt
- reference assets
- aspect ratio
- output settings

### Speech
- text
- voice profile/settings
- language
- style/pace metadata

### Lip sync
- visual asset
- speech/audio asset
- output preferences

## Provider router
The application chooses providers based on:
- explicitly selected provider/model
- connected credentials
- capability requirements
- policy
- availability
- cost/quality preference where future routing is implemented

Routing returns a normalized provider selection decision; business logic does not branch on SDK-specific details.

## BYOK resolution
Credential priority may be:
1. explicitly selected personal credential
2. workspace credential
3. managed platform credential if feature enabled
4. otherwise fail with `PROVIDER_NOT_CONFIGURED`

Credential resolver returns decrypted secret only to the provider adapter at execution time.

Do not put raw credentials in workflow node data or durable workflow payloads.

## Gemini role
Gemini/Google models may initially provide:
- production planning
- text generation
- media understanding
- image/video generation where available
- TTS/music where available and chosen

However the contracts remain provider-agnostic.

## Video input processing
Uploaded video flow:
1. GCS asset persisted
2. FFprobe technical metadata
3. optional FFmpeg frame/audio extraction
4. semantic analysis through MediaUnderstandingProvider
5. normalized analysis stored with asset
6. workflow/provider decides whether to send original video or derived references based on capability

## Image reference processing
Images may be normalized with Sharp and analyzed for framing/quality/reference suitability.
Character pack semantics are CineFlow concepts, not provider-specific objects.

## Audio input processing
Technical metadata comes from FFprobe.
Semantic transcription/understanding comes from configured AI provider.

## Error normalization
Provider adapters map vendor-specific errors into internal categories:
- INVALID_CREDENTIAL
- QUOTA_EXHAUSTED
- RATE_LIMITED
- UNSUPPORTED_INPUT
- CONTENT_REJECTED
- PROVIDER_UNAVAILABLE
- PROVIDER_TIMEOUT
- JOB_FAILED
- UNKNOWN_PROVIDER_ERROR

UI should present actionable messages without leaking vendor internals.

## Retry policy
Only retry errors that are safe/retryable.
Use bounded exponential backoff and idempotency where provider supports it.
Do not blindly retry content-policy or invalid-input failures.

## Cost estimation
Each executable provider adapter may expose an estimate method when possible.
Estimates remain estimates and must be labeled as such.
BYOK external provider usage must be distinguished from CineFlow platform-credit charges.

## Observability
Record:
- provider/model
- operation type
- normalized status
- duration
- attempt count
- token/media metrics when safe and useful
- external job ID where needed

Never log credentials or sensitive raw payloads unnecessarily.
