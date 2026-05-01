# Confidence score

MemoryCore OS uses a `1-5` confidence score before substantive implementation.

## Scale

| Score | Meaning | Default mode |
|------|---------|--------------|
| `5` | High certainty, bounded task, evidence is clear | Light Mode |
| `4` | Good certainty, minor unknowns, low risk | Light Mode |
| `3` | Mixed certainty, moderate ambiguity or scope risk | Architect Mode |
| `2` | Low certainty, key unknowns or conflicting instructions | Architect Mode + Hard Stop review |
| `1` | Unsafe to proceed without clarification or evidence | Architect Mode + Hard Stop |

## How to score

Evaluate:

- Requirement clarity
- Scope stability
- Risk level
- Instruction consistency
- Availability of local evidence

## Enforcement

- `4-5`: proceed in `Light Mode`
- `3`: use `Architect Mode`
- `2` or lower: trigger [`hard-stop-rules.md`](hard-stop-rules.md)

## Re-scoring

Re-score when:

- New files or constraints appear
- Hidden complexity is discovered
- Conflicting instructions are found
- The task moves from local edits to architecture changes
