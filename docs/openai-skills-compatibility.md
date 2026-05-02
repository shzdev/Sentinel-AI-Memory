# OpenAI-Style Skill Input Compatibility

Sentinel AI accepts OpenAI-style skills as optional input compatibility only.
Sentinel does not run imported skills as-is. It normalizes them into Sentinel-native format so all skills follow the same governance, validation, and safety rules.

## Important Rules

- Sentinel does not bundle the OpenAI skills repository
- imported skills are optional
- imported skills are normalized before storage
- Sentinel-native is the only runtime skill format
- imported skills must follow Sentinel governance
- imported skills do not become core logic

## Manual Copy Workflow

Users can manually copy selected OpenAI-style skills from their source repository or local checkout.

OpenAI-style content may be used as input, but Sentinel stores the result only in Sentinel-native format under:

`extensions/skills/sentinel-native/<skill-name>/`

## Governance

Every imported skill must still obey Sentinel core rules, memory policy, and scope control.

If a skill conflicts with the core operating model, Sentinel core wins.
