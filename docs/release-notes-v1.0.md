# Sentinel AI v1.0 Release Notes

## Summary

Sentinel AI v1.0 is the stable release of the MemoryCore OS, with the core operating system, optional extension ecosystem, and local-only Sentinel CLI aligned around the same governance model.

## What Is Stable

- `.sentinel-ai/` remains the core operating system
- `extensions/` remains optional and additive
- Sentinel-native is the only stored/runtime skill format
- imported skills normalize into Sentinel-native format
- the resolver is registry-aware and advisory only
- the CLI is local-only and safe by default

## What Is Intentionally Not Included

- network installs
- remote registry support
- automatic external repository cloning
- vendored OpenAI skills
- a separate OpenAI-style compatibility layer

## Known Limitations

- no network install
- no remote registry
- no automatic external repo cloning
- resolver is advisory only

## Upgrade Notes

- Existing extension registries remain the source of truth for optional helpers
- OpenAI-style skills may still be used as input, but they normalize into Sentinel-native format
- Core rules still win if any imported skill conflicts with Sentinel governance
