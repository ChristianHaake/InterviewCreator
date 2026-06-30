---
name: cavecrew
description: Delegate focused repository investigation, small edits, or code review to available subagents and require compressed, file-grounded results. Use when the user requests cavecrew, delegation, subagents, context saving, parallel investigation, or compressed agent output.
---

# Cavecrew

Use available subagent tools for focused work. Keep main thread responsible for
decisions, integration, and final verification.

## Roles

- Investigator: locate definitions, callers, tests, and relevant files.
- Builder: perform an obvious edit limited to one or two files.
- Reviewer: inspect changed code for bugs, regressions, and missing tests.

## Selection

- Use investigator for location and dependency questions.
- Use builder only when target files and scope are already known.
- Use reviewer after risky or behavior-changing edits.
- Use parallel investigators for independent search angles.
- Keep cross-cutting work, architecture decisions, and three-or-more-file edits
  in the main thread.
- Skip delegation when the work is faster to do directly.

## Agent prompt

Tell each subagent:

1. its role and exact scope;
2. relevant paths or search target;
3. that unrelated files must not change;
4. required verification;
5. to return compressed, file-and-line-grounded output.

## Output contracts

Investigator:

```text
path:line - symbol - finding
totals: count
```

Builder:

```text
path:line - change
verified: command or re-read result
```

Reviewer:

```text
severity path:line - problem - fix
totals: critical/high/medium/low counts
```

## Fallback

If no subagent capability exists, perform the task in the main thread and state
that cavecrew delegation was unavailable. Never pretend delegation occurred.
