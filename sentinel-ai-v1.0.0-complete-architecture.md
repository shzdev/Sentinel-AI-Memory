# Sentinel AI v1.0.0 Complete Architecture

This document compiles the current Sentinel AI Core architecture as implemented in this repository at v1.0.0.

## 1. Big Picture

Project Sentinel AI is a governed AI operating layer, not a normal assistant script.

It is built from four major parts:

- [`.sentinel-ai/`](../.sentinel-ai/) as the core operating system
- [`extensions/`](../extensions/) as the optional ecosystem
- [`tools/sentinel-cli/`](../tools/sentinel-cli/) as the local-only CLI
- [`docs/`](.) and [`templates/`](../templates/) as public guidance and reusable starter content

Core principles:

- the core remains authoritative
- extensions are optional and advisory
- memory stores only high-value durable context
- the CLI is local-only
- external/OpenAI-style skills are input compatibility only
- all imported skills normalize into Sentinel-native format

## 2. Architecture Overview

```text
                           +----------------------+
                           |      User Request    |
                           +----------+-----------+
                                      |
                                      v
                           +----------------------+
                           |  Activation Layer    |
                           |  canonical/custom    |
                           +----------+-----------+
                                      |
                                      v
                           +----------------------+
                           |   Sentinel Core      |
                           | boot + router +      |
                           | governance + policy  |
                           +----------+-----------+
                                      |
                      +---------------+---------------+
                      |                               |
                      v                               v
            +-------------------+           +-------------------+
            | Confidence / Mode |           |   Memory Shards   |
            | Light / Architect  |           | main/* source     |
            +---------+---------+           +---------+---------+
                      |                               |
                      +---------------+---------------+
                                      |
                                      v
                           +----------------------+
                           | Optional Resolver    |
                           | registry-aware       |
                           +----------+-----------+
                                      |
                      +---------------+---------------+
                      |               |               |
                      v               v               v
               +-----------+   +-----------+   +-----------+
               |  Skills   |   |  Agents   |   | Workflows |
               +-----------+   +-----------+   +-----------+
                                      |
                                      v
                           +----------------------+
                           |    Execution         |
                           +----------+-----------+
                                      |
                                      v
                           +----------------------+
                           |   Verification       |
                           +----------+-----------+
                                      |
                                      v
                           +----------------------+
                           | Memory Write Filter   |
                           | high-value only       |
                           +----------+-----------+
                                      |
                                      v
                           +----------------------+
                           | Persistent Memory     |
                           +----------------------+
```

## 3. Core OS

The core system lives under [`.sentinel-ai/`](../.sentinel-ai/).

### Core files

- [`boot-instruction.md`](../.sentinel-ai/boot-instruction.md)
  - activation entry point
- [`master-memory.md`](../.sentinel-ai/master-memory.md)
  - canonical router after activation
- [`main/`](../.sentinel-ai/main/)
  - durable memory shards
- [`decision-engine/`](../.sentinel-ai/decision-engine/)
  - mode, confidence, hard stop, and self-evaluation
- [`governance/`](../.sentinel-ai/governance/)
  - engineering rules, scope control, verification, surgical diffs
- [`memory-policy/`](../.sentinel-ai/memory-policy/)
  - write filter, hygiene, promotion rules

### Main memory shards

- [`main/current-session.md`](../.sentinel-ai/main/current-session.md)
  - active working memory
- [`main/identity-core.md`](../.sentinel-ai/main/identity-core.md)
  - system role and engineering posture
- [`main/architectural-directives.md`](../.sentinel-ai/main/architectural-directives.md)
  - durable long-lived rules
- [`main/relationship-memory.md`](../.sentinel-ai/main/relationship-memory.md)
  - schema and relationship memory
- [`main/project-history.md`](../.sentinel-ai/main/project-history.md)
  - milestone-only history

### Additional memory-oriented folders

- [`Feature/`](../.sentinel-ai/Feature/)
  - feature maps for memory-oriented workflows
- [`daily-diary/`](../.sentinel-ai/daily-diary/)
  - rolling session archive
- [`library-items/`](../.sentinel-ai/library-items/)
  - reusable knowledge snippets
- [`projects/`](../.sentinel-ai/projects/)
  - reserved for multi-project tracking

## 4. Activation Model

Sentinel AI supports two activation methods.

### Canonical activation

```text
Activate Sentinel AI
```

### Custom activation name

The local CLI can store a custom name such as:

- `hey puteri`
- `hi puteri`
- `puteri activate`
- `nova`

The custom name does not replace the canonical phrase.
It only acts as an input trigger into the same governed flow.

### Activation flow

```text
User message
   |
   v
Phrase detection
   |
   +--> Canonical phrase match
   |
   +--> Custom activation name match
   |
   v
Canonical Sentinel activation
   |
   v
Boot instruction
   |
   v
Master router
   |
   v
Decision engine
   |
   v
Task execution flow
```

### Local identity storage

The CLI stores the custom activation identity locally in:

- [`.sentinel-ai/main/sentinel-identity.json`](../.sentinel-ai/main/sentinel-identity.json)

This file is local-only and should not be treated as shared project state.

## 5. Decision Engine

The decision engine controls how Sentinel AI thinks before changing anything.

### Files

- [`decision-engine/mode-detection.md`](../.sentinel-ai/decision-engine/mode-detection.md)
- [`decision-engine/confidence-score.md`](../.sentinel-ai/decision-engine/confidence-score.md)
- [`decision-engine/hard-stop-rules.md`](../.sentinel-ai/decision-engine/hard-stop-rules.md)
- [`decision-engine/self-evaluation.md`](../.sentinel-ai/decision-engine/self-evaluation.md)

### Modes

#### Light Mode

Use when:

- task is small
- scope is clear
- risk is low
- confidence is `4` or `5`

Behavior:

- load only relevant files
- keep the response focused
- avoid full memory hydration

#### Architect Mode

Use when:

- task is multi-file
- task is unclear
- task is risky
- task touches DB/API/auth/refactor/security
- confidence is `3` or lower

Behavior:

- follow the canonical cold-load order
- apply decision engine, governance, and memory policy
- include the required self-evaluation block

### Confidence score

Sentinel AI uses a `1-5` confidence scale.

| Score | Meaning | Default mode |
|------|---------|--------------|
| `5` | High certainty, bounded task, evidence is clear | Light Mode |
| `4` | Good certainty, minor unknowns, low risk | Light Mode |
| `3` | Mixed certainty, moderate ambiguity or scope risk | Architect Mode |
| `2` | Low certainty, key unknowns or conflicting instructions | Architect Mode + Hard Stop review |
| `1` | Unsafe to proceed without clarification or evidence | Architect Mode + Hard Stop |

### Hard stop

Hard stop triggers when:

- confidence is `2` or lower
- required information is missing
- architecture impact is unclear
- instructions conflict
- scope would likely create broad regressions

## 6. Governance

Governance is the brake system.

### Files

- [`governance/engineering-rules.md`](../.sentinel-ai/governance/engineering-rules.md)
- [`governance/scope-control.md`](../.sentinel-ai/governance/scope-control.md)
- [`governance/surgical-diff.md`](../.sentinel-ai/governance/surgical-diff.md)
- [`governance/verification-rules.md`](../.sentinel-ai/governance/verification-rules.md)

### Operational rules

- keep the solution simple
- keep diffs surgical
- stay within scope
- verify before completion
- escalate when scope increases
- do not guess when evidence is missing

## 7. Memory Policy

Memory is filtered, not automatic.

### Files

- [`memory-policy/write-filter.md`](../.sentinel-ai/memory-policy/write-filter.md)
- [`memory-policy/memory-hygiene.md`](../.sentinel-ai/memory-policy/memory-hygiene.md)
- [`memory-policy/promotion-rules.md`](../.sentinel-ai/memory-policy/promotion-rules.md)

### What gets stored

- architecture decisions
- durable rules
- meaningful milestones
- long-lived relationships or schema changes

### What gets ignored

- temporary debugging notes
- formatting tweaks
- trivial edits
- duplicate facts
- short-lived reasoning

### Memory lifecycle

```text
Temporary detail -> ignored
Small formatting change -> ignored
Architecture decision -> stored
Major system change -> stored
```

## 8. Extensions Layer

The optional ecosystem lives in [`extensions/`](../extensions/).

### Structure

- [`registry/`](../extensions/registry/)
- [`skills/`](../extensions/skills/)
- [`agents/`](../extensions/agents/)
- [`workflows/`](../extensions/workflows/)
- [`resolver/`](../extensions/resolver/)

### Rules

- extensions are optional
- core decides first
- resolver is advisory only
- extensions cannot override governance
- Sentinel-native is the only stored/runtime skill format
- external/OpenAI-style skills are input compatibility only
- imported skills normalize into Sentinel-native format

### Registry files

- [`skills.json`](../extensions/registry/skills.json)
- [`agents.json`](../extensions/registry/agents.json)
- [`extensions.json`](../extensions/registry/extensions.json)

## 9. Skill System

Skills are execution helpers, not core logic.

### Current Sentinel-native skills

- [`README-improver`](../extensions/skills/sentinel-native/README-improver/SKILL.md)
- [`architecture-auditor`](../extensions/skills/sentinel-native/architecture-auditor/SKILL.md)
- [`memory-cleaner`](../extensions/skills/sentinel-native/memory-cleaner/SKILL.md)
- [`skill-template`](../extensions/skills/sentinel-native/skill-template/SKILL.md)

### Skill rules

- skills must follow Sentinel governance
- skills must respect Light Mode and Architect Mode
- missing context should trigger a question
- skills do not define the core system

### Compatibility model

OpenAI-style or external skills may be imported as input, but they are normalized into Sentinel-native format before storage.

There is no OpenAI-compatible runtime folder.

## 10. Auto Extension Resolver

The resolver is dynamic and registry-aware.

### Files

- [`resolver/task-classification-map.json`](../extensions/resolver/task-classification-map.json)
- [`resolver/extension-selection-policy.md`](../extensions/resolver/extension-selection-policy.md)
- [`resolver/resolver-flow.md`](../extensions/resolver/resolver-flow.md)
- [`resolver/examples.md`](../extensions/resolver/examples.md)

### Inputs

- task classification map
- skills registry
- agents registry
- extensions registry

### Ranking logic

- keyword match count
- exact name match
- description match
- lower risk preferred
- active status preferred

### Output

- best recommendation
- mode suggestion
- risk level
- approval requirement
- reason

### Rule

The resolver only suggests.
The core decides whether to use the suggestion.

## 11. CLI Architecture

The local-only CLI lives in [`tools/sentinel-cli/`](../tools/sentinel-cli/).

### Files

- [`bin/sentinel.js`](../tools/sentinel-cli/bin/sentinel.js)
- [`scripts/smoke-test.js`](../tools/sentinel-cli/scripts/smoke-test.js)
- [`scripts/activation-name-test.js`](../tools/sentinel-cli/scripts/activation-name-test.js)
- [`package.json`](../tools/sentinel-cli/package.json)

### Commands

- `sentinel list skills`
- `sentinel install skill <name>`
- `sentinel install skill <name> --dry-run`
- `sentinel install skill <name> --force`
- `sentinel import skill <local-path>`
- `sentinel resolve "<task>"`
- `sentinel resolve "<task>" --explain`
- `sentinel setup-name`
- `sentinel identity setup`

### CLI behavior

- local-only
- no network installs
- no external repository cloning
- no vendored external skills
- safe-by-default
- dry-run before writes
- force only for explicit overwrite

### CLI responsibilities

- read registries
- validate local `SKILL.md`
- normalize imports
- sync registry
- resolve tasks to optional helpers
- manage local activation identity

## 12. Release and Versioning

The repository is on [v1.0.0](../CHANGELOG.md).

### Release docs

- [`CHANGELOG.md`](../CHANGELOG.md)
- [`docs/release-notes-v1.0.md`](release-notes-v1.0.md)
- [`docs/release-checklist.md`](release-checklist.md)

### Release posture

- v1.0.0 is the stable project baseline
- the CLI is local-only
- the extension ecosystem is optional
- the core system remains unchanged and authoritative

## 13. Documentation Layer

Public-facing documentation lives in [`docs/`](.).

Key docs:

- [`README.md`](../README.md)
- [`activation.md`](activation.md)
- [`ai-coding-instruction.md`](ai-coding-instruction.md)
- [`canonical-instruction.md`](canonical-instruction.md)
- [`extensions.md`](extensions.md)
- [`openai-skills-compatibility.md`](openai-skills-compatibility.md)
- [`v2-architecture.md`](v2-architecture.md)
- [`project-sentinel-visual-architecture-overview.md`](project-sentinel-visual-architecture-overview.md)

## 14. Templates Layer

Templates live in [`templates/`](../templates/).

Current templates:

- [`basic-project`](../templates/basic-project/README.md)
- [`laravel-project`](../templates/laravel-project/README.md)
- [`nextjs-project`](../templates/nextjs-project/README.md)
- [`api-service`](../templates/api-service/README.md)

These templates are generic and do not contain private project data.

## 15. Runtime Flow

```text
1. User request enters
2. Activation is detected
3. Input is validated
4. Sentinel loads core memory and rules
5. Decision engine selects Light Mode or Architect Mode
6. Memory retrieves context
7. Resolver may suggest optional extensions
8. Core decides whether to use them
9. Execution happens
10. Verification runs
11. Response is returned
12. Memory write filter stores only high-value updates
```

## 16. Memory and Activation Summary

### Activation summary

- `Activate Sentinel AI` is the canonical activation phrase
- custom activation names are supported by the local CLI
- custom names are input triggers only
- canonical flow remains the same

### Memory summary

- memory is not automatic dumping
- only meaningful updates should persist
- low-value edits stay out of durable memory

## 17. ASCII Summary

```text
User Request
   |
   v
Activation Layer
   |
   v
Sentinel Core Authority
   |
   +--> Boot Instruction
   +--> Master Router
   +--> Memory Shards
   +--> Decision Engine
   +--> Governance
   +--> Memory Policy
   |
   v
Confidence / Mode
   |
   +--> Light Mode
   +--> Architect Mode
   |
   v
Optional Resolver
   |
   +--> Skills
   +--> Agents
   +--> Workflows
   |
   v
Execution
   |
   v
Verification
   |
   v
Memory Write Filter
   |
   v
Filtered Persistent Memory
```

## 18. Bottom Line

Sentinel AI is a governed AI operating system for development work.

It is designed to be:

- safer
- more auditable
- more consistent
- more extensible
- more disciplined about memory

The core remains the source of truth.
Extensions assist.
The resolver recommends.
The memory filter decides what is worth keeping.
