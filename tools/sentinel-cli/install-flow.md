# Install Flow

Future installation flow for `sentinel install skill <name>`.

## Flow

1. Resolve skill name
2. Check registry
3. Validate skill metadata
4. Check target path
5. Preview file changes
6. Install, copy, or register skill
7. Update registry
8. Report result

## Safety Notes

- default behavior must avoid destructive changes
- unknown sources should stop and ask for clarification
- overwrite behavior must require explicit approval
- the command must not write to `.sentinel-ai/`
