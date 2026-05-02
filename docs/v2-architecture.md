# Sentinel AI v1.0 Architecture

## Version Model

- v1.0: core system
- optional extensions: additive and optional

The core system remains unchanged. The extension layer is additive and optional.

## Flow

```text
User Task
  -> Boot Instruction
  -> Master Router
  -> Decision Engine
  -> Auto Extension Resolver
  -> Optional Skill / Agent / Workflow
  -> Governance Check
  -> Execution
  -> Verification
  -> Memory Write Filter
```

## CLI Concept

The optional extension ecosystem may eventually support a safe design-only command surface such as `sentinel install skill <name>`.

That future CLI would remain registry-driven, optional, and governed by Sentinel core rules.

The resolver is dynamic and registry-aware. It can explain why a recommendation was chosen, but it still cannot override core rules.

## Design Rules

- `.sentinel-ai` is the operating core
- `extensions/` is the optional ecosystem
- extensions assist, they do not govern
- memory only stores high-value durable changes

## Operational Notes

Use extensions when they reduce friction, improve review quality, or standardize repetitive work.

Do not use extensions to bypass core rules, weaken validation, or hide uncertainty.
