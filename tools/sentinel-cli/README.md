# Sentinel CLI v1.0.0

This folder contains the local-only Sentinel CLI implementation for extension tooling.
It is stable in v1.0.0 and stays local-only.

The CLI must remain:

- optional
- safe by default
- governed by Sentinel core rules
- compatible with registry-based extension selection

## Install Locally

From this folder:

```bash
npm install
npm link
```

## Verify Installation

```bash
npm run smoke
```

## Usage

```bash
sentinel list skills
sentinel install skill readme-improver --dry-run
sentinel install skill readme-improver
sentinel setup-name
sentinel identity setup
sentinel import skill ./my-skill --dry-run
sentinel import skill ./my-skill --type openai-compatible
sentinel import skill ./my-skill --name custom-skill-name
sentinel resolve "Improve README onboarding"
sentinel resolve "Improve README onboarding" --explain
```

## Custom Activation Name

Users can configure a custom activation name for Sentinel AI.

```bash
sentinel setup-name
```

After setup:

```text
hey nova
nova activate
```

will trigger the same Sentinel activation flow as:

```text
Activate Sentinel AI
```

The activation name is stored locally in `.sentinel-ai/main/sentinel-identity.json`.
The original `Activate Sentinel AI` phrase still works.

## Import Local Skill

The CLI supports safe local skill import from an existing folder.
OpenAI-style input is accepted as legacy compatibility, but Sentinel converts it into Sentinel-native format before storage.

```bash
sentinel import skill ./my-skill --dry-run
sentinel import skill ./my-skill --type openai-compatible
sentinel import skill ./my-skill --name custom-skill-name
```

The `--type openai-compatible` flag is legacy input only. It triggers conversion, not a separate storage path.

## Safety

- core rules still win
- extensions are optional
- resolver is advisory
- custom activation names only affect input recognition
- imported skills are normalized into Sentinel-native format
- imported skills cannot override Sentinel governance
- hard-stop rules and governance cannot be bypassed

## Resolver

The resolver now inspects the extension registry dynamically and can explain why a recommendation was chosen.

- `sentinel resolve "<task>"`
- `sentinel resolve "<task>" --explain`

It stays advisory only. Core rules still win.
