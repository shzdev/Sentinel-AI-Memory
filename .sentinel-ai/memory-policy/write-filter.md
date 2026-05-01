# Write filter

Memory writes require a `Write Score` from `1-5`.

## Threshold

- Write to memory only if `Write Score >= 4`.

## Scale

| Score | Meaning | Write? |
|------|---------|--------|
| `5` | Durable architectural rule or milestone | Yes |
| `4` | Meaningful project memory with future reuse value | Yes |
| `3` | Useful but situational context | Usually no |
| `2` | Minor edit or transient context | No |
| `1` | Trivial noise | No |

## Required checks

- Is the change likely to matter in future sessions?
- Is it durable rather than transient?
- Does it belong in memory rather than only in task logs?
