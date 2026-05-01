---
description: Planning-only workflow. Produces or updates a task plan when the user explicitly asks for one.
---

# /plan

$ARGUMENTS

## Rules

- Planning only. Do not write application code.
- Use the `project-planner` agent.
- Follow MemoryCore OS load order before planning.
- Create a plan file only because `/plan` is an explicit planning request.
- Store the plan as `docs/PLAN-{task-slug}.md`.

## Expected output

- A scoped plan in `docs/PLAN-{task-slug}.md`
- Clear verification steps
- No implementation changes

## Completion message

Report the exact file created or updated under `docs/`.
