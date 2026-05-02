# Changelog

## v1.0.0

### Core OS
- Stabilized the Sentinel AI MemoryCore OS release surface.
- Kept `.sentinel-ai/` as the authoritative core operating system.

### Activation System
- Preserved `Activate Sentinel AI` as the canonical activation command.
- Kept manual and auto-activation guidance aligned with the current architecture.

### Extension Ecosystem
- Kept `extensions/` optional and registry-driven.
- Standardized stored and runtime skills on Sentinel-native format only.

### Sentinel CLI
- Released the local-only CLI as v1.0.0.
- Kept skill listing, install, import, and resolver flows local-only and safe by default.

### Skill Import + Normalization
- External and OpenAI-style skills remain input-only.
- All imported skills normalize into Sentinel-native format before storage.

### Dynamic Resolver
- Resolver now uses registry data dynamically.
- Resolver stays advisory and cannot override core rules or governance.

### Safety Guarantees
- No network install.
- No remote registry.
- No automatic external repository cloning.
- No vendored external skills.
