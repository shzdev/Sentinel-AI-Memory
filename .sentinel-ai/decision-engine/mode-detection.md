# Mode detection

MemoryCore OS uses two operating modes:

- `Light Mode`
- `Architect Mode`

## Selection rules

- Start in `Light Mode` when the request is narrow, low-risk, and well-bounded.
- Escalate to `Architect Mode` when scope expands, risk increases, instructions conflict, or key information is missing.
- Re-evaluate mode whenever new unknowns appear during execution.

## Light Mode

Use when:

- The task is simple or localized.
- Confidence Score is `4` or `5`.
- No major architectural or security risk is present.

Behavior:

- Load only relevant files.
- Avoid full memory hydration.
- Keep execution direct and minimal.

## Architect Mode

Use when:

- The task is structural, cross-cutting, security-sensitive, or ambiguous.
- Confidence Score is `3` or lower.
- The request touches multiple instruction layers or requires normalization.

Behavior:

- Use the canonical cold-load order from [`../master-memory.md`](../master-memory.md).
- Apply the decision engine, governance, and memory-policy files before implementation.
- Include the required self-evaluation block from [`self-evaluation.md`](self-evaluation.md) before the final response.

## Escalation rules

- Confidence Score `4-5` -> `Light Mode`
- Confidence Score `3` -> `Architect Mode`
- Confidence Score `2` or lower -> `Architect Mode` plus Hard Stop review

If scope, risk, or unknowns increase mid-task, escalate immediately to `Architect Mode`.
