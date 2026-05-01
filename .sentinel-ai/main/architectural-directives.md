TEMPLATE FILE — replace with your project-specific data
# Architectural directives

Durable constraints and patterns that outlive a single task. Promote items here from `current-session.md` when they become policy.

## MemoryCore OS

- `master-memory.md` is the canonical router for AI behavior in this repository.
- `main/*` are the canonical memory shards. Root memory files remain alias pointers only.
- `decision-engine/*` controls mode detection, confidence score, hard-stop rules, and self-evaluation.
- `governance/*` controls engineering rules, scope control, surgical diffs, and verification policy.
- `memory-policy/*` controls write filtering, hygiene, and memory promotion.
- Execution is handled directly by the AI following Sentinel AI MemoryCore OS rules. It must not override the system router unless a higher-priority instruction explicitly says so.
- Canonical cold-start load order is: `master-memory.md`, `main/current-session.md`, `main/identity-core.md`, `main/architectural-directives.md`, `decision-engine/mode-detection.md`, `decision-engine/confidence-score.md`, `decision-engine/hard-stop-rules.md`, `governance/engineering-rules.md`, `memory-policy/write-filter.md`.
- Light Mode reads only relevant files and must escalate to Architect Mode when risk, scope, or unknowns increase.
- Confidence rules: score `4-5` stays in Light Mode, score `3` escalates to Architect Mode, score `2` or lower is a hard stop.
- Architect Mode final responses must include the `SELF-EVALUATION` block defined in `decision-engine/self-evaluation.md`.
- Do not create a new task plan file unless the user explicitly asks for planning. When a plan file is required, use `docs/PLAN-{task-slug}.md`.

## Universal rules

- Keep the solution simple.
- Make surgical diffs.
- Preserve intent unless the change requires a behavior update.
- Read surrounding context before editing.
- Verify the request is solved before finishing.
- Ask for clarification when missing information creates real risk.
