# Resolver Flow

1. User task received
2. Boot instruction activates Sentinel
3. Master router loads core rules
4. Decision engine selects Light or Architect Mode
5. Auto Extension Resolver checks task intent and registry data
6. Resolver matches a skill, agent, or extension from the registries
7. Resolver ranks candidates by relevance, risk, and status
8. Resolver recommends the best optional extension
9. User approves if the extension is high-risk or tied
10. Extension assists execution
11. Verification and memory write filter run

## Notes

- the resolver does not replace core judgment
- the resolver only advises on optional extension usage
- `--explain` can reveal matched keywords and candidate scoring
- if no suitable match exists, proceed with core-only execution
