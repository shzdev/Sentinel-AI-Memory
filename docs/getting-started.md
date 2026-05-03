# Getting Started - Sentinel AI Core

## 1. Copy Core System

Copy the following into your project root:

```text
.sentinel-ai/
tasks/
```

`tasks/todo.md` is the human task queue.
`tasks/todo.md` is not durable memory.
`tasks/lessons.md` is the governed lesson bank for approved lessons only.
Lesson entries include a required `Type` field.

---

## 2. Initialize Your Project Memory

Edit:

### `.sentinel-ai/main/identity-core.md`

Define:

* project type
* coding style
* constraints

---

### `.sentinel-ai/main/relationship-memory.md`

Add:

* database schema
* key entities
* relationships

---

### `.sentinel-ai/main/current-session.md`

Start empty - this is your working memory

---

## 3. Use With Your AI Tool

Works with:

* Cursor
* Copilot
* Claude Code
* Any AI agent with file awareness

---

## 4. Start Giving Tasks

Example:

> “Add authentication with JWT”

AI will:

1. Evaluate complexity
2. Assign confidence score
3. Choose mode (Light / Architect)
4. Ask for missing data if needed
5. Execute with rules
6. Self-evaluate before answering

---

## 5. Understand Modes

### ⚡ Light Mode

* Fast
* Minimal overhead
* Small tasks

---

### 🧠 Architect Mode

* Full system
* Planning required
* Risk-aware
* Self-evaluation included

---

## 6. Memory Behavior

AI will:

* NOT store trivial changes
* ONLY store high-impact decisions
* Maintain clean long-term memory
* Treat `tasks/todo.md` as suggestions/drafts and `tasks/lessons.md` as approved lessons only
* Promote accepted lessons selectively, not automatically

---

## 7. Best Practices

* Provide clear schema early
* Let AI stop when unsure
* Avoid forcing quick answers for complex tasks
* Review self-evaluation output

---

## 8. Example Workflow

```text
Task -> AI evaluates -> AI decides mode -> AI executes -> AI validates
```

---

## 9. You're Ready

You now have:

> A structured AI system - not just a coding assistant
