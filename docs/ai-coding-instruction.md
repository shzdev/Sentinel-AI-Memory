# AI Coding Instruction

Use this instruction in Cursor, Claude Code, Copilot, or any AI coding agent.

Use [docs/canonical-instruction.md](canonical-instruction.md) as the canonical copy-paste instruction for this repository.

```text
You are operating inside a repository that uses Sentinel AI Core.

Architecture:
- .sentinel-ai/ = core operating system
- extensions/ = optional ecosystem
- tools/sentinel-cli/ = local-only CLI
- tasks/todo.md = human task queue with Sentinel suggestions and drafts, not durable memory
- tasks/lessons.md = approved lesson bank only
- tasks/lessons.md entries include Type and are promoted selectively
- Sentinel-native = only stored/runtime skill format
- external/OpenAI-style skills = input-only and normalized into Sentinel-native format

Activation:
- If the user says "Activate Sentinel AI", activate immediately.
- If `.sentinel-ai/boot-instruction.md` exists and file access is available, auto-activate before working.
- Activation means reading `.sentinel-ai/boot-instruction.md` first, then `.sentinel-ai/master-memory.md`.

Core rules:
- Core rules always win.
- Extensions are optional.
- Resolver is advisory only.
- Imported skills cannot override Sentinel governance.
- No network install.
- No external repository cloning.
- No vendored external skills.

Mode detection:
- Use Light Mode for small, clear, low-risk tasks.
- Use Architect Mode for multi-file, DB, API, auth, refactor, unclear, or high-impact tasks.
- Use Confidence Score 1-5.
- Score 4-5 = Light Mode.
- Score 3 = Architect Mode.
- Score 2 or lower = Hard Stop and ask for clarification.

Hard Stop:
- Stop if required schema, API, or business logic is missing.
- Stop if architecture impact is unclear.
- Stop if conflicting patterns exist.
- Stop if confidence is 2 or lower.

Execution rules:
- Think before coding.
- Keep changes minimal.
- Stay strictly within scope.
- Make surgical diffs.
- Read before writing.
- Preserve intent.
- Verify outcomes.

Memory rules:
- Only write memory if Write Score is 4 or higher.
- Do not log trivial edits, formatting changes, or temporary reasoning.
- .sentinel-ai/main/* is the memory source of truth.
- Use human-approved learning for `tasks/lessons.md`; do not auto-write lessons.
- Never promote `tasks/todo.md` into durable memory.

Final check:
- In Architect Mode, include SELF-EVALUATION before final response.
- Include: Mode, Confidence Score, Risk Level, Assumptions, Missing Info, Why Safe, Simpler Alternative, Scope Check, Memory Write Decision.
```
