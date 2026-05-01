---
trigger: always_on
---

# GEMINI.md

Execution-layer protocol for `.agents/`.

## Precedence

1. Higher-priority system or developer instructions
2. `.sentinel-ai/master-memory.md`
3. `.sentinel-ai/main/*`
4. `.sentinel-ai/decision-engine/*`
5. `.sentinel-ai/governance/*`
6. `.sentinel-ai/memory-policy/*`
7. `.agents/rules/GEMINI.md`
8. Agent files and skill files

`.agents/` must not compete with MemoryCore OS.

## Mandatory startup

Before non-trivial implementation, read:

1. `.sentinel-ai/master-memory.md`
2. `.sentinel-ai/main/current-session.md`

For higher-risk or multi-file work, also read:

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

## Request routing

Classify the request before execution:

| Request Type | Typical Result | Mode |
| --- | --- | --- |
| Question / explanation | Text answer | Light Mode |
| Narrow single-file edit | Direct execution | Light Mode |
| Multi-file change | Escalate and plan approach | Architect Mode |
| Risky, unclear, or conflicting task | Pause and resolve uncertainty | Architect Mode or Hard Stop |
| Explicit planning request | Planning workflow only | Architect Mode |

## Agent and skill protocol

- Select the appropriate specialist agent before implementation.
- Read the chosen agent file before using that agent's workflow.
- Read only the relevant skill `SKILL.md` files required for the task.
- Do not bulk-load unrelated skills.

## Planning policy

- Do not create a new task plan file unless the user explicitly asks for a plan or the active workflow is planning-only.
- If a plan file is required, use `docs/PLAN-{task-slug}.md`.
- Do not use deprecated root-level or generic plan-file names.

## Architecture references

- Use `.agents/ARCHITECTURE.md` as the execution-layer system map.
- The previously assumed dependency document is optional and currently absent in this repo.
- If exact code relationships are needed, inspect the repo directly instead of assuming a missing file exists.

## Hard-stop behavior

- If confidence score is `2` or lower, do not implement.
- If requirements are ambiguous and materially affect correctness or safety, ask or add a TODO instead of guessing.
- If rule sources conflict, MemoryCore OS wins.

## Final response requirement

In Architect Mode, include the MemoryCore OS self-evaluation block before the final response:

```text
SELF-EVALUATION
- Mode:
- Confidence Score:
- Risk Level:
- Assumptions Made:
- Missing Information:
- Why this solution is safe:
- Simpler alternative considered:
- Scope Check:
- Memory Write Decision:
```
