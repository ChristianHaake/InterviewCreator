# Architecture

## Product

- App: `InterviewDesigner`
- Live URL: `https://interviewdesigner.haak3.de`
- Repository: `https://github.com/ChristianHaake/InterviewCreator`
- Intended users: `Schülerinnen und Schüler, Lehrkräfte`

## Stack

Document the chosen framework, build system, major dependencies, and why they
fit the product.

## Source structure

Document the responsibility of each top-level source directory.

## State

Document:

- in-memory state ownership;
- persisted state;
- storage keys;
- schema versions;
- migrations;
- reset behavior.

## Project files

If the app imports or exports editable projects, document:

- file extension and media type;
- schema version;
- validation and migration;
- file, image, entry-count, and uncompressed-size limits;
- behavior when import fails.

## Network and privacy

List every production network destination and its purpose. State whether
user-created content leaves the device.

## Deployment

Document:

- Cloudflare product used;
- build command;
- output directory;
- SPA fallback behavior;
- security headers;
- cache policy.

## Decisions and exceptions

Record significant architecture decisions and deviations from the shared
standard. Link to `standard-conformance.md`.
