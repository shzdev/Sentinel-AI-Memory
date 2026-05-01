# Sentinel AI MemoryCore OS

Structured AI development operating system for disciplined, risk-aware execution.

![License](https://img.shields.io/badge/license-MIT-blue)
![Status](https://img.shields.io/badge/status-active-success)
![AI System](https://img.shields.io/badge/type-AI%20Operating%20System-purple)
![Architecture](https://img.shields.io/badge/architecture-MemoryCore%20OS-orange)

## The Problem

Most AI coding setups are optimized for speed, not reliability.

They tend to:

- answer too quickly
- assume missing details
- blur scope
- skip validation
- accumulate noisy context

That creates fragile workflows and hard-to-trust output.

## The Shift

Sentinel AI changes the model from a passive responder into a structured engineering system.

It adds:

- decision making before execution
- risk awareness before action
- governance before changes
- validation before completion

The result is AI behavior with discipline, not just volume.

## Real Talk

Original:

> "AI remembers"

Sentinel AI:

> "AI evaluates, decides, and acts with discipline"

## What is this

Sentinel AI MemoryCore OS is a reusable AI operating system built around structured memory and execution control.

It is designed to help AI:

- load the right context
- choose the right mode
- follow explicit rules
- write back only meaningful memory
- verify its own output

## Core Capabilities

- Persistent, structured memory
- Router-based session loading
- Light Mode and Architect Mode
- Confidence scoring for task clarity
- Hard-stop rules for missing or risky inputs
- Governance rules for scoped, surgical changes
- Memory policy to prevent context noise
- Execution layer for specialized workflows

## Architecture Flow

```text
User Request
    ↓
Memory Router
    ↓
Decision Engine
    ↓
Governance
    ↓
Execution Layer
    ↓
Validation
```

## File Structure

```text
.sentinel-ai/
├── master-memory.md
├── main/
├── decision-engine/
├── governance/
├── memory-policy/

.agents/
tasks/
docs/
```

- `.sentinel-ai/` - Canonical AI control plane and memory system.
- `master-memory.md` - Router that defines load order and system authority.
- `main/` - Durable memory shards for session state, identity, history, and directives.
- `decision-engine/` - Mode detection, confidence scoring, hard-stop rules, and self-evaluation.
- `governance/` - Engineering rules for scope, diffs, and verification.
- `memory-policy/` - Rules for what should and should not be written into memory.
- `.agents/` - Execution layer only; specialists, workflows, and supporting logic.
- `tasks/` - Lightweight operational notes and lessons.
- `docs/` - Onboarding and usage documentation.

## What Changes in Practice

Sentinel AI does not treat every request the same way.

Instead, it:

1. reads the canonical memory
2. evaluates task risk and scope
3. selects Light Mode or Architect Mode
4. applies governance rules
5. executes within defined constraints
6. validates the result
7. self-evaluates before finishing

That makes the system behave like a disciplined engineering assistant, not a loose prompt chain.

## Example Scenario

A developer asks for a feature that touches memory, rules, and execution behavior.

Sentinel AI should:

- load the relevant files
- detect whether the request is simple or cross-cutting
- escalate if risk is unclear
- avoid guessing missing requirements
- apply the smallest safe change
- verify the result before responding

The outcome is controlled execution with traceable reasoning.

## Getting Started

Short version:

1. Read [Getting Started](docs/getting-started.md)
2. Review `master-memory.md`
3. Inspect the files under `main/`
4. Use the system on a real task and follow the mode guidance

## Philosophy

- simple over clever
- minimal over excessive
- safe over risky
- explicit constraints over silent assumptions
- durable memory over noisy logs

## Who is this for

- developers using AI in real projects
- teams that want consistent AI behavior
- anyone who wants AI to reason before acting
- builders who need structure, not improvisation

## Credits

Sentinel AI MemoryCore OS is inspired by the MemoryCore concept for structured AI memory and workflow design.

This repository extends that idea into a practical operating model for disciplined AI development.

## License

See the `LICENSE` file in this repository.
