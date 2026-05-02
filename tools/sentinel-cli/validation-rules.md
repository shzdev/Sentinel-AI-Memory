# Validation Rules

A skill is valid only if all of the following are true:

- it has `SKILL.md`
- it has metadata for `name`
- it has metadata for `description`
- it does not attempt to override `.sentinel-ai`
- it does not write to memory directly
- it follows Sentinel governance rules
- it declares `riskLevel`
- it declares `required inputs`

## Validation Outcome

- valid skills may be registered or installed into `extensions/skills/`
- invalid skills must be rejected or left unmodified in dry-run mode
- missing metadata must be surfaced before any installation step
