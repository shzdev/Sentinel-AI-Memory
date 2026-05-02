# Sentinel AI MemoryCore OS v1.0.0

Structured AI development operating system for disciplined, risk-aware execution.

![License](https://img.shields.io/badge/license-MIT-blue)
![Status](https://img.shields.io/badge/status-stable-success)
![AI System](https://img.shields.io/badge/type-AI%20Operating%20System-purple)
![Architecture](https://img.shields.io/badge/architecture-MemoryCore%20OS-orange)

## Quick Start

1. Read [docs/canonical-instruction.md](docs/canonical-instruction.md) or [docs/ai-coding-instruction.md](docs/ai-coding-instruction.md).
2. Clone the repository.
3. Start the session with `Activate Sentinel AI`.

Example:

```bash
git clone https://github.com/shzdev/Sentinel-AI-Memory.git
cd Sentinel-AI-Memory
```

```text
Activate Sentinel AI
```

You can combine activation and task in one message.

## Activation

Activation tells the AI to load the Sentinel core before making changes.

- read `.sentinel-ai/boot-instruction.md`
- read `.sentinel-ai/master-memory.md`
- follow mode detection, hard stops, and governance
- respect the memory write filter

See [docs/activation.md](docs/activation.md) for the activation flow.

## CLI Usage

The local-only Sentinel CLI lives in [tools/sentinel-cli/README.md](tools/sentinel-cli/README.md).

Common commands:

```bash
sentinel list skills
sentinel install skill readme-improver --dry-run
sentinel install skill readme-improver
sentinel import skill ./my-skill --dry-run
sentinel resolve "Improve README onboarding"
sentinel resolve "Improve README onboarding" --explain
```

## Extensions

Sentinel AI v1.0 adds an optional extension ecosystem around the core operating system.

- `.sentinel-ai/` remains the core operating system
- `extensions/` contains optional agents, workflows, templates, and skills
- external/OpenAI-style skills are accepted as input only and normalized into Sentinel-native format
- Sentinel-native is the only stored and runtime skill format
- the core stays unchanged and keeps final authority

See:

- [docs/extensions.md](docs/extensions.md)
- [docs/openai-skills-compatibility.md](docs/openai-skills-compatibility.md)
- [docs/v2-architecture.md](docs/v2-architecture.md)

## Release Readiness

- local CLI smoke test is available
- release checklist is documented
- current CLI is v1.0.0 local-only
- CHANGELOG and release notes are included

See:

- [docs/release-checklist.md](docs/release-checklist.md)
- [CHANGELOG.md](CHANGELOG.md)
- [docs/release-notes-v1.0.md](docs/release-notes-v1.0.md)

## File Structure

```text
.
- .sentinel-ai/                Core operating system and memory
- CHANGELOG.md                 Release history
- LICENSE                      MIT license
- README.md                    Repository overview
- docs/                        Activation, instructions, architecture, release docs
  - activation.md
  - ai-coding-instruction.md
  - canonical-instruction.md
  - release-checklist.md
  - release-notes-v1.0.md
  - extensions.md
  - openai-skills-compatibility.md
  - v2-architecture.md
- extensions/                  Optional registry-driven ecosystem
- tasks/                       Task notes and supporting material
- templates/                   Reusable project starter templates
- tools/                       Local tooling, including sentinel-cli
  - sentinel-cli/
    - bin/
    - fixtures/
    - scripts/
```

## Credits

Sentinel AI MemoryCore OS is built around a core operating system plus optional extension tooling.
The release structure in this repository keeps the core authoritative and the extension layer optional.

## License

MIT. See [LICENSE](LICENSE).
