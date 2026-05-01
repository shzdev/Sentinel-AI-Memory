TEMPLATE FILE — replace with your project-specific data
# Main memory

These files are the canonical durable memory shards for this repository.

| File | Role |
|------|------|
| `current-session.md` | Active working memory for meaningful current focus. |
| `identity-core.md` | System role, stack, and engineering posture. |
| `architectural-directives.md` | Durable technical constraints and long-lived rules. |
| `relationship-memory.md` | Schema, entity, and access relationship memory. |
| `project-history.md` | Milestones only. |

## Canonical load order

Use [`../master-memory.md`](../master-memory.md) as the authoritative router.

Cold / Architect Mode:

1. `master-memory.md`
2. `current-session.md`
3. `identity-core.md`
4. `architectural-directives.md`
5. `decision-engine/mode-detection.md`
6. `decision-engine/confidence-score.md`
7. `decision-engine/hard-stop-rules.md`
8. `governance/engineering-rules.md`
9. `memory-policy/write-filter.md`

Optional / task-specific:

- `relationship-memory.md`
- `project-history.md`
- `tasks/lessons.md`
