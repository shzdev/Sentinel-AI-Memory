TEMPLATE FILE — replace with your project-specific data
# Setup guide

## What you have

This `.sentinel-ai/` tree is the canonical MemoryCore OS for this repository:

- `master-memory.md` as the router
- `main/` for canonical memory shards
- `decision-engine/` for mode and confidence logic
- `governance/` for engineering rules
- `memory-policy/` for write discipline

`.agents/` is the execution layer only. It contains specialists, skills, and workflows, but it is not the source of truth.

## 5-minute onboarding

1. Read [`master-memory.md`](master-memory.md).
2. If Architect Mode is needed, follow the canonical cold-load order documented there.
3. If Light Mode is sufficient, read only the relevant files and escalate if risk increases.

## For humans

- Prefer editing files under `main/`; root alias files are pointers only.
- Use `daily-diary/` only when you need a longer narrative archive.

## For instruction layers

- Point canonical memory loading at `master-memory.md`.
- Use `.agents/` only after the system router has determined mode, confidence, and scope.
