# Agent Coordination

How App Builder should interact with the execution layer.

## Precondition

- MemoryCore OS decides mode, confidence, and hard stops first.
- `.sentinel-ai/master-memory.md` is the source-of-truth router.
- `.agents/` is the specialist execution layer only.

## Coordination rules

- Use `project-planner` only when planning is explicitly requested or already active.
- If a plan file is required, use `docs/PLAN-{task-slug}.md`.
- Do not use deprecated root-level or generic plan-file names.
- Route work to specialists with clear ownership and bounded scope.
- Keep planning, implementation, and verification distinct.

## Minimal pipeline

1. MemoryCore routing
2. Optional planning
3. Specialist execution
4. Relevant verification
5. Final synthesis
