# Sentinel AI Extensions

Sentinel AI v1.0 adds an optional extension ecosystem around the core operating system.

## Authority Model

- `.sentinel-ai/` is the core operating system
- `extensions/` is optional and additive
- extensions cannot override core rules
- core decides, extensions assist, skills execute
- extensions may be installed manually today
- future CLI concepts may reference `sentinel install skill <name>`
- the resolver now suggests extensions dynamically from the registries based on task intent
- external/OpenAI-style skills are input only and normalize into Sentinel-native format
- Sentinel-native is the only stored and runtime skill format

Sentinel does not run imported skills as-is. It normalizes them into Sentinel-native format so all skills follow the same governance, validation, and safety rules.

## What Belongs Here

- reusable agent prompts
- reusable workflows
- reusable templates
- optional skills
- machine-readable registry entries

## What Does Not Belong Here

- core memory rules
- canonical routing logic
- private project data
- vendored external repositories

## Memory Policy

Only high-value changes should be promoted to durable memory.

Extensions should stay generic unless the repository maintainer intentionally hardens them for a specific project.
