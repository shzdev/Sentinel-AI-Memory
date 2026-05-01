TEMPLATE FILE — replace with your project-specific data
# Master memory

**Purpose:** Canonical router for the AI MemoryCore OS in this repository.

`.sentinel-ai/boot-instruction.md` is the human/agent activation entry point. `master-memory.md` remains the canonical router after activation.

## Hierarchy

| Layer | Role | Authority |
|-------|------|-----------|
| `.sentinel-ai/` | Canonical memory, decision engine, governance, and memory policy | Source of truth |
| `.agents/` | Specialists, skills, workflows, execution guidance | Execution layer only |
| `tasks/lessons.md` | Task-pattern lessons and operational gotchas | Optional task-specific reference |
| `COMPLETED_TASKS.md` | Long-form task log | Historical supplement |

`.agents/` must not compete with MemoryCore OS. If an agent or workflow conflicts with `.sentinel-ai/`, follow `.sentinel-ai/` unless a higher-priority external system explicitly overrides it.

## When to load this file

- Start of a new session on a non-trivial task.
- After context compaction or handoff.
- When the user asks to load memory, sync memory, or run a session briefing.
- When risk, scope, or ambiguity suggests Architect Mode.

## Canonical load order

### Cold / Architect Mode

1. [`master-memory.md`](master-memory.md)
2. [`main/current-session.md`](main/current-session.md)
3. [`main/identity-core.md`](main/identity-core.md)
4. [`main/architectural-directives.md`](main/architectural-directives.md)
5. [`decision-engine/mode-detection.md`](decision-engine/mode-detection.md)
6. [`decision-engine/confidence-score.md`](decision-engine/confidence-score.md)
7. [`decision-engine/hard-stop-rules.md`](decision-engine/hard-stop-rules.md)
8. [`governance/engineering-rules.md`](governance/engineering-rules.md)
9. [`memory-policy/write-filter.md`](memory-policy/write-filter.md)

### Optional / task-specific

- [`main/relationship-memory.md`](main/relationship-memory.md)
- [`main/project-history.md`](main/project-history.md)
- [`.agents/ARCHITECTURE.md`](../.agents/ARCHITECTURE.md)
- [`.agents/agents/`](../.agents/agents/)
- [`.agents/skills/`](../.agents/skills/)
- [`tasks/lessons.md`](../tasks/lessons.md)

### Light Mode

- Do not load the full memory stack.
- Read only the files directly relevant to the request.
- Escalate to Architect Mode if scope, risk, or unknowns increase.

## Canonical memory shards

The files under [`main/`](main/) remain the canonical durable memory shards:

- `current-session.md`
- `identity-core.md`
- `architectural-directives.md`
- `relationship-memory.md`
- `project-history.md`

## Legacy root filenames (aliases)

Older instructions may cite `.sentinel-ai/active-context.md`, `.sentinel-ai/identity-core.md`, and similar root files. Those files are thin pointers to `main/`. Edit `main/*.md` only.

## Memory policy map

| Concern | Canonical location |
|--------|--------------------|
| Mode switching | `decision-engine/mode-detection.md` |
| Confidence scoring | `decision-engine/confidence-score.md` |
| Hard stops | `decision-engine/hard-stop-rules.md` |
| Architect self-check | `decision-engine/self-evaluation.md` |
| Engineering rules | `governance/engineering-rules.md` |
| Scope control | `governance/scope-control.md` |
| Surgical diffs | `governance/surgical-diff.md` |
| Verification | `governance/verification-rules.md` |
| Memory write filter | `memory-policy/write-filter.md` |
| Memory hygiene | `memory-policy/memory-hygiene.md` |
| Promotion rules | `memory-policy/promotion-rules.md` |

## Repo-native extensions

| Concern | Where it lives |
|--------|----------------|
| Task lessons | `tasks/lessons.md` |
| Task log | `COMPLETED_TASKS.md` |
| Specialist / workflow catalog | `.agents/ARCHITECTURE.md` |

## Maintenance protocol

After a meaningful completed task or architecture change:

- Update [`main/current-session.md`](main/current-session.md) only for meaningful active-context changes.
- Append milestones to [`main/project-history.md`](main/project-history.md) only for real milestones.
- Promote durable rules to [`main/architectural-directives.md`](main/architectural-directives.md).
- Update [`main/relationship-memory.md`](main/relationship-memory.md) only when schema, entity, or access relationships change.
- Apply [`memory-policy/write-filter.md`](memory-policy/write-filter.md) and [`memory-policy/promotion-rules.md`](memory-policy/promotion-rules.md) before writing memory.

## Version

- Layout: AI MemoryCore OS migration baseline (2026-05-02).
