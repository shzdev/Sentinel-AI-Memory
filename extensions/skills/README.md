# Skills

This folder contains optional execution helpers for Sentinel AI v1.0.

- `sentinel-native/` holds skills written specifically for Sentinel governance
- external/OpenAI-style skills are accepted as input only and normalized into Sentinel-native format
- the `skill-template/` under Sentinel-native provides the baseline template

Rules:

- skills assist execution, they do not define the core system
- skills must respect Light Mode and Architect Mode
- missing context should trigger a question, not an assumption
