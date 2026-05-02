# `sentinel install skill <name>`

Design reference for a future Sentinel CLI command that installs or registers a skill into `extensions/skills/`.

## Purpose

Install a skill definition into the extension ecosystem without changing Sentinel core behavior.

## Supported Future Sources

- local skill template
- Sentinel-native registry
- OpenAI-style input compatibility
- external Git URL, future only

## Command

```bash
sentinel install skill <name>
```

## Optional Flags

- `--source <local|registry|openai|git>`
- `--type <sentinel-native|openai-compatible>`
- `--dry-run`
- `--force`

## Behavior

- `--dry-run` previews the file and registry changes without writing them
- `--force` permits overwrite only after explicit confirmation
- default behavior is safe, non-destructive, and registry-aware
- the command must never bypass Sentinel governance or core rules

## Design Constraints

- this is a future concept, not an executable implementation
- no network automation is defined here
- no external repositories are cloned here
- imported skills remain optional execution helpers
