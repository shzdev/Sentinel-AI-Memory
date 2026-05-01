---
name: plan-writing
description: Structured task planning with clear scope, dependencies, and verification.
allowed-tools: Read, Glob, Grep
---

# Plan Writing

Use this skill when the user explicitly requests a plan or when a planning-only workflow is already active.

## Core rules

- Keep plans short, specific, and verifiable.
- Do not create a new task plan unless planning is explicitly requested.
- If a plan file is required, use `docs/PLAN-{task-slug}.md`.
- Do not use deprecated root-level or generic plan-file names.

## Plan structure

- Goal
- Scope
- Tasks
- Verification
- Risks or TODOs if needed

## Quality bar

- Each task should be independently checkable.
- Prefer 5-10 meaningful tasks, not micro-steps.
- Do not turn planning into implementation.
