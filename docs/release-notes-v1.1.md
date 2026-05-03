# Sentinel AI v1.1 Release Notes

## Summary

Sentinel AI v1.1 focuses on Human Notes Integration. The release tightens governed lesson ingestion, keeps todo items as execution-layer artifacts, and preserves selective promotion into durable memory.

## Human Notes Integration

- `tasks/todo.md` is the human task queue.
- `tasks/todo.md` may contain Sentinel suggestions and drafts.
- `tasks/todo.md` is not durable memory and must never be promoted directly into Sentinel memory shards.
- `tasks/lessons.md` is the approved lesson bank.
- `tasks/lessons.md` accepts lessons only after a clear event and human approval.
- Lesson entries include a required `Type` field.
- Accepted lessons remain in `tasks/lessons.md` unless they satisfy the normal Sentinel memory policy and write filter.

## Governing Rules

- Lesson ingestion is governed, not automatic.
- Duplicate lesson entries should be avoided by updating or refining an existing lesson instead.
- `tasks/lessons.md` is loaded more strongly in Architect Mode for risky, multi-file, DB, API, auth, refactor, security, governance, or repeated-failure tasks.
- Light Mode does not require full lesson hydration.
- The `sentinel notes audit` command remains deferred.

## What Changed

- Added the human-notes ingestion policy.
- Wired `tasks/todo.md` and `tasks/lessons.md` into the Sentinel router with load rules.
- Added lesson `Type` tagging.
- Added duplicate-guard guidance.
- Strengthened selective promotion into durable memory.

## What Did Not Change

- Human-approved learning only.
- No database, frontend, backend, or network behavior.
- No new CLI command.
- No direct promotion from todo items into durable memory.
