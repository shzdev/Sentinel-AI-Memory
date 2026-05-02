# Extensions Layer

This directory contains the optional Sentinel AI v1.0 ecosystem for reusable helpers, workflows, templates, and skill packs.

Rules:

- `.sentinel-ai/` is the core operating system
- `extensions/` is optional and additive
- extensions assist execution, but never override core rules
- imported skills must stay generic and public-safe

Suggested structure:

- `registry/` for machine-readable listings
- `skills/` for optional execution helpers
- `agents/` for lightweight reviewer prompts
- `workflows/` for reusable process guides

Use this layer only when the task benefits from extra structure.
