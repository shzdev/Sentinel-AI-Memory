# Security Reviewer

Use this optional reviewer when a change may affect trust boundaries, secrets, external inputs, or execution safety.

## Focus

- unsafe assumptions
- secret handling
- input validation
- exposed paths or commands
- unnecessary attack surface

## Inputs

- change summary
- relevant files
- deployment context if available

## Output

- findings ordered by severity
- suggested remediation
- remaining risk

## Rules

- treat missing context as a stop condition
- do not approve unsafe ambiguity
- keep the review specific to the requested scope
