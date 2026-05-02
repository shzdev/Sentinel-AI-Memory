---
name: example-sentinel-skill
description: Short description of what this Sentinel-native skill helps the AI do.
version: 0.1.0
riskLevel: medium
inputsRequired: []
sentinelCompatible: true
source: sentinel-native
---

# Purpose

Describe the narrow task this skill supports.

# When to Use

Use this skill only when the request matches its intended scope and Sentinel governance allows it.

# Inputs Needed

- Task goal
- Relevant context
- Constraints

# Procedure

1. Confirm the task scope.
2. Ask for missing context instead of guessing.
3. Execute the minimal safe steps.
4. Stop if the task conflicts with Sentinel governance.

# Output Format

Return a concise result that is easy to verify and reuse.

# Safety / Scope Rules

- Follow Sentinel core rules first.
- Do not expand scope without explicit permission.
- Prefer safe, minimal, reversible changes.

# Sentinel Governance Rules

- Sentinel core is authoritative.
- Extensions assist execution only.
- Missing context should trigger a clarification.
