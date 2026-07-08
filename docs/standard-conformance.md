# haak3 Standard Conformance

Standard:
https://github.com/ChristianHaake/haak3-webapp-standard

Standard version: `1.0.0-draft`

Last reviewed: `2026-06-30`

## Exceptions

No technical exceptions are currently documented.

Open release content:

- Help, privacy, imprint, and about pages still contain operator-facing template text.
- These pages must be finalized before a public release claim.

Use this format for every exception:

```text
Rule:
Reason:
Scope:
Temporary or permanent:
Review date:
```

## App-specific decisions

- Editable project files use `.json` with `schemaVersion: 1`.
- Autosave uses IndexedDB and is treated as recovery, not as a replacement for explicit export.
- Markdown export is one-way and intended for handout/print workflows.
