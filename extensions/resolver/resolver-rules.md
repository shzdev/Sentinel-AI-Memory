# Resolver Rules

Core rules:

- core decides first
- resolver runs after mode detection
- resolver only selects optional helpers
- no extension may bypass hard stop rules
- no extension may override governance
- if the task is simple, do not load an extension
- if uncertain, recommend an extension but ask the user

## Selection Boundaries

- prefer explicit task intent over broad keyword matches
- prefer the smallest safe helper
- avoid loading multiple extensions unless the task clearly requires Architect Mode
- high-risk helpers should trigger user approval
- missing matches should fall back to core-only execution
