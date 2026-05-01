# Agents Architecture

Execution and specialist layer for this repository.

## Role in the stack

- `.sentinel-ai/master-memory.md` is the canonical router and source of truth.
- `.sentinel-ai/main/*` are the canonical memory shards.
- `.sentinel-ai/decision-engine/*` defines mode detection, confidence, hard stops, and self-evaluation.
- `.agents/` contains specialists, skills, workflows, and helper scripts only.
- `.agents/` must not override MemoryCore OS unless a higher-priority system instruction explicitly says so.

## Required startup order

Before implementation or orchestration, load MemoryCore OS first:

1. `.sentinel-ai/master-memory.md`
2. `.sentinel-ai/main/current-session.md`
3. `.sentinel-ai/main/identity-core.md`
4. `.sentinel-ai/main/architectural-directives.md`
5. `.sentinel-ai/decision-engine/mode-detection.md`
6. `.sentinel-ai/decision-engine/confidence-score.md`
7. `.sentinel-ai/decision-engine/hard-stop-rules.md`
8. `.sentinel-ai/governance/engineering-rules.md`
9. `.sentinel-ai/memory-policy/write-filter.md`

Optional and task-specific:

- `.sentinel-ai/main/relationship-memory.md`
- `.sentinel-ai/main/project-history.md`
- `.agents/agents/*`
- `.agents/skills/*`
- `tasks/lessons.md`

## Layer boundaries

### MemoryCore OS

- Controls memory, mode selection, confidence gating, scope control, and write policy.
- Decides whether work stays in Light Mode or escalates to Architect Mode.
- Defines when memory is read and when memory is updated.

### Agents

- Execute specialist work after MemoryCore OS routing is complete.
- Provide domain-specific instructions such as planning, orchestration, frontend, backend, security, and testing.
- May add domain procedure, but may not redefine canonical memory flow.

## Directory map

```text
.agents/
|-- ARCHITECTURE.md
|-- agents/
|-- rules/
|-- skills/
|-- workflows/
`-- scripts/
```

## Planning policy

- Do not create a new task plan file unless the user explicitly asks for a plan or a workflow is explicitly running in planning mode.
- If a plan file is required, use `docs/PLAN-{task-slug}.md`.
- Do not use deprecated root-level or generic plan-file names.

## Specialist usage

- `agents/` contains the specialist role definitions.
- `skills/` contains reusable domain guidance and optional scripts.
- `workflows/` contains operator procedures such as planning and orchestration.
- `rules/GEMINI.md` defines the execution-layer protocol, but remains subordinate to MemoryCore OS.

## Notes

- The previously assumed dependency document is not required in this repo. Use this file plus local code inspection instead.
- Legacy workspace-rule path references are obsolete in this workspace unless explicitly marked optional historical context.
