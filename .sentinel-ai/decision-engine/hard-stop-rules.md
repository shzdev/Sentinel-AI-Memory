# Hard stop rules

Do not proceed with normal implementation when any of the following is true:

- Confidence Score is `2` or lower.
- Requirements are materially unclear and the risk of guessing is high.
- Instructions conflict and the precedence is not resolvable from local evidence.
- The requested change would likely exceed scope or create broad regressions.
- Destructive or irreversible operations are implied without explicit approval.

## Required response

When a hard stop is triggered:

1. Pause implementation.
2. State the exact blocker.
3. Explain what evidence is missing or what conflict exists.
4. Ask for the minimum clarification needed, or add a TODO note in documentation if the task is a normalization pass and the unresolved point must be carried forward.

## Architect Mode interaction

- A hard stop always implies `Architect Mode`.
- A hard stop does not forbid analysis; it forbids unsafe implementation without resolving the blocker.
