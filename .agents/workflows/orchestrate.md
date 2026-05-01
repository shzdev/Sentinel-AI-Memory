---
description: Multi-agent workflow for complex tasks that benefit from specialist coordination.
---

# /orchestrate

$ARGUMENTS

## Rules

- `.sentinel-ai/master-memory.md` remains the source-of-truth router.
- Use `.agents/` as the execution layer only.
- Apply the MemoryCore decision engine before invoking specialists.
- Do not force orchestration for simple tasks.
- Do not create a new plan file unless the user explicitly asks for planning.
- If a plan file is required, use `docs/PLAN-{task-slug}.md`.

## Flow

1. Determine whether the task actually needs orchestration.
2. Read any existing `docs/PLAN-{task-slug}.md` only if relevant.
3. Route bounded work to specialist agents.
4. Preserve scope and ownership.
5. Consolidate results and verify relevant outcomes.

## Output

- Specialist list used
- Scope handled
- Verification performed
- Remaining risk or TODOs
