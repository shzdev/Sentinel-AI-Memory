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
.sentinel-ai/                                   # Canonical AI control plane and memory system
├── master-memory.md                            # Canonical router & load order
├── active-context.md                           # Backward-compatible alias to current session memory
├── identity-core.md                            # Backward-compatible alias to identity memory
├── project-history.md                          # Backward-compatible alias to history memory
├── relationship-memory.md                      # Backward-compatible alias to relationship memory
├── setup-guide.md                              # Human-facing onboarding guide
├── setup-wizard.md                             # Quick-start checklist
├── main/                                       # Canonical durable memory shards
│   ├── current-session.md                      # Active working memory (RAM-like)
│   ├── identity-core.md                        # System identity, role, and operating posture
│   ├── architectural-directives.md             # Durable technical constraints and rules
│   ├── relationship-memory.md                  # Schema, entity, and access relationship notes
│   ├── project-history.md                      # Milestones and long-lived progress log
│   └── README.md                               # Index for the canonical memory shards
├── decision-engine/                            # Mode selection and risk control
│   ├── mode-detection.md                       # Light Mode vs Architect Mode rules
│   ├── confidence-score.md                     # Task confidence scoring model
│   ├── hard-stop-rules.md                      # Stop conditions for missing or risky inputs
│   └── self-evaluation.md                      # Required final self-check format
├── governance/                                 # Execution discipline and safety rules
│   ├── engineering-rules.md                    # Core engineering principles
│   ├── scope-control.md                        # Scope boundaries and change discipline
│   ├── surgical-diff.md                        # Minimal-change editing rules
│   └── verification-rules.md                   # Validation and verification requirements
├── memory-policy/                              # Memory write discipline
│   ├── memory-hygiene.md                       # What stays out of memory
│   ├── promotion-rules.md                      # When transient context becomes durable
│   └── write-filter.md                         # Write threshold and retention rules
├── Feature/                                    # Optional feature maps and memory-system extensions
│   ├── README.md                               # Feature index and extension map
│   ├── Memory-Consolidation-System/             # Memory merge and normalization guidance
│   │   └── README.md                           # Consolidation overview
│   ├── Session-Briefing-System/                # Session start / briefing structure
│   │   └── README.md                           # Briefing overview
│   ├── Decision-Log-System/                    # Decision tracking and reasoning log
│   │   └── README.md                           # Decision log overview
│   ├── Post-Mortem-System/                     # Failure analysis and lessons
│   │   └── README.md                           # Post-mortem overview
│   ├── Echo-Memory-Recall/                     # Historical recall and search guidance
│   │   └── README.md                           # Recall overview
│   ├── LRU-Project-Management-System/          # Optional project-slot management
│   │   └── README.md                           # LRU project map
│   └── Reminders-System/                       # Reminder and follow-up guidance
│       └── README.md                           # Reminders overview
├── library-items/                              # Reusable reference snippets and notes
│   └── README.md                               # Library index
├── daily-diary/                                # Optional long-form session archive
│   ├── README.md                               # Diary usage and archive guidance
│   ├── daily-diary-protocol.md                 # Diary entry format and retention rules
│   └── archive/                                # Archived diary entries
├── projects/                                   # Optional multi-project tracking area
│   └── README.md                               # Projects placeholder / index
└── docs/                                       # Human-facing documentation
    └── getting-started.md                      # Quick onboarding guide

.agents/                                        # Execution layer only; not canonical memory
├── ARCHITECTURE.md                             # Agent catalog and execution-layer map
├── mcp_config.json                             # Local tooling configuration
├── agents/                                     # Specialist agent definitions
│   ├── backend-specialist.md                   # Backend-focused agent
│   ├── code-archaeologist.md                   # Legacy code / history investigator
│   ├── database-architect.md                   # Schema and persistence specialist
│   ├── debugger.md                             # Failure analysis and debugging agent
│   ├── devops-engineer.md                      # Deployment and operations agent
│   ├── documentation-writer.md                # Documentation-focused agent
│   ├── explorer-agent.md                       # Fast codebase exploration agent
│   ├── frontend-specialist.md                 # UI and frontend specialist
│   ├── game-developer.md                      # Game-focused specialist
│   ├── mobile-developer.md                    # Mobile-focused specialist
│   ├── orchestrator.md                         # Multi-agent coordination
│   ├── performance-optimizer.md               # Performance-focused agent
│   ├── penetration-tester.md                  # Security testing agent
│   ├── product-manager.md                     # Product framing and prioritization
│   ├── product-owner.md                       # Requirements and scope agent
│   ├── project-planner.md                     # Planning and task decomposition
│   ├── qa-automation-engineer.md              # QA automation specialist
│   ├── security-auditor.md                    # Security review specialist
│   ├── seo-specialist.md                      # SEO-focused specialist
│   └── test-engineer.md                       # Test design and verification agent
├── workflows/                                  # Reusable execution workflows
│   ├── brainstorm.md                           # Discovery and problem framing flow
│   ├── create.md                               # Creation workflow
│   ├── debug.md                                # Debugging workflow
│   ├── deploy.md                               # Deployment workflow
│   ├── enhance.md                              # Improvement / refinement workflow
│   ├── orchestrate.md                          # Coordination workflow
│   ├── plan.md                                 # Planning workflow
│   ├── preview.md                              # Preview and review workflow
│   ├── status.md                               # Status reporting workflow
│   ├── test.md                                 # Test and validation workflow
│   └── ui-ux-pro-max.md                        # UI/UX-oriented workflow
├── scripts/                                    # Utility scripts for checks and previews
│   ├── auto_preview.py                          # Preview automation helper
│   ├── checklist.py                             # Checklist helper
│   ├── session_manager.py                       # Session state helper
│   └── verify_all.py                            # Validation runner
└── skills/                                     # Reusable skill packs and references
    ├── app-builder/                             # Application scaffolding and coordination
    ├── api-patterns/                             # API architecture and design
    ├── architecture/                             # Architecture tradeoff and pattern guidance
    ├── behavioral-modes/                         # Operational mode guidance
    ├── clean-code/                               # Code clarity and maintainability
    ├── database-design/                          # Database architecture and optimization
    ├── design-md/                                # DESIGN.md generation and synthesis
    ├── documentation-templates/                  # Documentation structure templates
    ├── enhance-prompt/                           # Prompt improvement utilities
    ├── frontend-design/                          # Visual and UX decision guidance
    ├── game-development/                         # Game-specific design skills
    ├── i18n-localization/                         # Localization and translation structure
    ├── lint-and-validate/                        # Validation helpers
    ├── nextjs-react-expert/                      # React/Next.js performance guidance
    ├── performance-profiling/                    # Performance measurement and profiling
    ├── plan-writing/                             # Planning structure guidance
    ├── powershell-windows/                      # PowerShell usage guidance
    ├── python-patterns/                          # Python architecture guidance
    ├── react-components/                         # Component generation and validation
    ├── systematic-debugging/                     # Root cause analysis workflow
    ├── tailwind-patterns/                        # Tailwind CSS architecture guidance
    ├── testing-patterns/                         # Testing strategy guidance
    ├── vulnerability-scanner/                    # Security scanning and review
    └── ...

tasks/                                           # Task notes and lightweight operational memory
├── lessons.md                                   # Durable lessons and gotchas
└── todo.md                                      # Lightweight task list

docs/                                            # Human-facing documentation
└── getting-started.md                            # Quick onboarding guide
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
