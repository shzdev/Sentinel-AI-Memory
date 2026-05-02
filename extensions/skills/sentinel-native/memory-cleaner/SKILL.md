---
name: memory-cleaner
description: Reduce memory noise by keeping only high-value durable context
---

# Purpose

Help decide what should remain durable and what should stay transient.

# When to Use

Use when memory content, session notes, or long-lived context need cleanup.

# Inputs Needed

- The memory entries under review
- The retention goal
- Any retention policy constraints

# Procedure

1. Separate durable facts from temporary context.
2. Keep only high-value changes.
3. Remove noise, repetition, and speculative notes.
4. Escalate if retention boundaries are unclear.

# Output Format

Return a compact retention recommendation with clear keep/drop guidance.

# Safety Rules

- Never delete meaningful history without confirmation.
- Never invent memory policy.
- Keep the core system untouched.
