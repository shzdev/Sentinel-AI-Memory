# Release Checklist

Use this checklist before publishing a Sentinel AI release.

## Required Checks

- Core untouched
- No `.agents/`
- No `.ai-memory`
- No private or project-specific data
- JSON registry files are valid
- CLI smoke test passes
- README links are valid
- OpenAI skills are not vendored
- Network installs are not implemented
- Canonical instruction is updated
- CHANGELOG exists
- Release notes exist
- No `extensions/skills/openai-compatible/` directory exists

## Notes

- Sentinel core remains authoritative
- extensions stay optional
- release hardening should stay local-only unless the core design changes intentionally
