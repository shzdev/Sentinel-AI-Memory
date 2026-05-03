# Human notes ingestion

## Purpose

Define how Sentinel AI uses `tasks/todo.md` and `tasks/lessons.md` without uncontrolled memory writes.

## Scope

- `tasks/todo.md` is the human task queue.
- `tasks/lessons.md` is the governed lesson bank.
- Both files are optional references, not unfiltered memory shards.

## Hard rule for `tasks/todo.md`

`tasks/todo.md` is an execution-layer artifact, not a knowledge artifact.

- It may inform planning, backlog review, release checks, and task continuation.
- It must never be promoted into durable Sentinel memory shards.
- Completed todo items should be archived or removed, not converted into lessons automatically.
- A todo item can only lead to a lesson if a clear lesson event happens separately.

## `tasks/todo.md`

`tasks/todo.md` may contain:

- active human tasks
- Sentinel-generated suggestions
- draft follow-ups
- backlog items that still need human review

Sentinel may:

- add suggested tasks
- draft follow-up items from a completed session
- surface release or cleanup reminders

Sentinel may not:

- mark suggestions as committed work without human acceptance
- auto-promote drafts into lessons
- flood the queue with redundant items

Expected sections:

- Active
- Suggested by Sentinel
- Done / Archived

## `tasks/lessons.md`

`tasks/lessons.md` may contain accepted lessons only.

A lesson may be added only after a clear event:

- bug found and fixed
- failed attempt
- architecture correction
- repeated mistake
- release finding
- governance or process issue

Sentinel may:

- propose a lesson draft
- summarize the event that justifies the lesson
- ask for human approval before writing

Sentinel may not:

- record trivial edits
- store temporary debugging notes
- write speculative lessons
- treat every completed task as a lesson

Before accepting a new lesson:

- check whether a similar lesson already exists
- prefer updating or refining the existing lesson instead of duplicating it
- avoid near-duplicate lessons with slightly different wording
- if the new lesson is a stronger version of an old one, merge or supersede the old one

Expected structure:

- Accepted Lessons
- each entry should capture the type, the event, the lesson, the apply-when scope, and the promotion decision

## Approval rule

Lessons require human approval before they are written into `tasks/lessons.md`.

Default flow:

1. Sentinel observes.
2. Sentinel suggests a task or lesson draft.
3. Human approves or rejects.
4. Sentinel writes only the approved item.

## Promotion rules

Not every accepted lesson should be promoted into durable memory.

A lesson is eligible for durable memory promotion only if it:

- applies beyond a single task
- prevents a class of repeated mistakes
- changes architecture, workflow, governance, or verification behavior
- is still valid after the current session
- is not already covered by an existing rule, lesson, or memory shard

Promotion still requires the normal Sentinel memory policy and write filter.

- Put stable behavioral rules in `main/architectural-directives.md`.
- Put durable milestone context in `main/project-history.md`.
- Put schema, entity, or access relationship changes in `main/relationship-memory.md`.
- Keep accepted lessons in `tasks/lessons.md` when they are useful but not durable enough for memory shards.
- Keep detailed narratives in `COMPLETED_TASKS.md` when they are not durable.

## Duplicate guard

Before accepting a new lesson:

- check whether a similar lesson already exists
- prefer updating or refining the existing lesson instead of duplicating it
- avoid near-duplicate lessons with slightly different wording
- merge or supersede the older lesson when the new one is a stronger version of the same pattern

## Anti-noise rules

- Prefer one clear suggestion over many near-duplicates.
- Do not duplicate the same reminder across both files.
- Keep drafts short and actionable.
- Remove stale suggestions after they are completed or rejected.
- Preserve the distinction between suggestions and accepted lessons.
