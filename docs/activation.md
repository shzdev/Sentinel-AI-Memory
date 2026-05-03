# Sentinel AI Activation

This repository is not just a folder of prompts and notes.
It is a structured operating system for AI behavior.

To use it correctly, Sentinel AI must be activated first.

## Path A - Manual Clone User

If you clone the repository yourself, use this flow:

```bash
git clone https://github.com/shzdev/Sentinel-AI-Core.git
cd Sentinel-AI-Core
```

Then start your AI session with:

```text
Activate Sentinel AI
```

That command tells the AI to read `.sentinel-ai/boot-instruction.md` and begin from the canonical router.

## Custom Activation Name

Users can configure a custom activation name for Sentinel AI.

```bash
sentinel setup-name
```

After setup:

```text
hey nova
nova activate
```

will trigger the same Sentinel activation flow as:

```text
Activate Sentinel AI
```

The custom name only affects input recognition.
It does not bypass boot instruction, master router, decision engine, governance, or memory policy.
The original `Activate Sentinel AI` phrase still remains valid.

### Combining Activation and Task

You can activate Sentinel AI and give the task in one message.

Example:

```text
Activate Sentinel AI and add a new onboarding section to the README.
```

This is the simplest flow for most users.

## Path B - AI Coding Agent Clone User

If you are asking an AI coding agent to clone and set up the repository, use this prompt:

```text
Clone and set up this repository:
https://github.com/shzdev/Sentinel-AI-Core.git

After cloning, activate Sentinel AI by reading:
.sentinel-ai/boot-instruction.md

Then read:
.sentinel-ai/master-memory.md

Follow Sentinel AI Core rules before making any changes.
Do not modify files until you understand the system.
```

## What Activation Does

Activation tells the AI to:

- read the boot instruction file first
- load the canonical router next
- choose Light Mode or Architect Mode
- apply confidence scoring and hard stop rules
- follow governance before making changes
- respect the memory write filter

## Best Practice Setup

Sentinel AI works best with three layers:

- Repository structure: `.sentinel-ai/`, `tasks/`, `docs/`
- Boot command: `Activate Sentinel AI`
- AI coding instruction: [`docs/ai-coding-instruction.md`](ai-coding-instruction.md)

`tasks/todo.md` is the human task queue and is not durable memory.
`tasks/todo.md` may include Sentinel-generated suggestions or drafts.
`tasks/lessons.md` is the accepted lesson bank and only receives approved lessons from clear events.
`tasks/lessons.md` entries include a required `Type` field and only some accepted lessons are promoted into durable memory.

Auto-activation is possible only when the AI agent has file access.
Manual activation remains the fallback.
The instruction makes behavior more reliable across tools.

## Important

`Activate Sentinel AI` only activates the system.

It does not describe the task.

Users must include the actual task in the same message or in the next message.

## Why This Matters

Repo files alone are not enough.
The AI must activate Sentinel AI before it can behave like a disciplined system.

## Next Step

After activation, follow the canonical memory flow documented in `.sentinel-ai/master-memory.md`.
