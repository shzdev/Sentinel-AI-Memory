TEMPLATE FILE - replace with your project-specific data
# Human Lesson Bank

Accepted lessons only. Do not add drafts here until the event is clear and human approval is given.

## Accepted Lessons

### Lesson title
- **Type:** Architecture | Process | Bug | Tooling | Governance | Verification | Release
- **Event:** Describe the clear event that justified the lesson.
- **Lesson:** State the durable lesson in one concise statement.
- **Apply when:** Describe the conditions where this lesson should be reused.
- **Promotion:** State whether this lesson should be promoted to durable memory and why.

### Example
- **Type:** Verification
- **Event:** A smoke test missed a release regression because the check only validated command presence.
- **Lesson:** Verification should confirm the requested behavior, not only that the command exists.
- **Apply when:** Use this when adding or reviewing release smoke tests.
- **Promotion:** Promote selectively because it changes verification behavior across releases.

## Duplicate guard

Before writing a new lesson:

- compare it with existing accepted lessons
- update an existing lesson when the new one is only a reworded version
- merge stronger wording into the existing lesson when it covers the same pattern
- keep only the shortest durable version when multiple entries overlap

## Promotion note

Accepted lessons can remain in this file without entering durable memory.
Only lessons that satisfy the memory policy and write filter should be promoted to Sentinel memory shards.

## Acceptance criteria

- bug found and fixed
- failed attempt
- architecture correction
- repeated mistake
- release finding
- governance or process issue

## Not for this file

- trivial formatting changes
- temporary debugging notes
- speculative lessons
- unapproved memory writes
