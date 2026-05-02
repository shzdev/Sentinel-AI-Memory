# Auto Extension Resolver

This folder defines the optional resolver that suggests or loads extensions based on task intent.

The resolver is registry-aware and advisory only. It reads the task classification map plus the extension registries to rank suggestions dynamically.

Rules:

- the resolver is advisory
- core mode detection happens first
- the resolver cannot override hard-stop rules or governance
- the resolver only selects optional helpers from the registry
- `--explain` may show the matched keywords, candidate scoring, and the final reason
