# Agent Instructions

This app follows the shared haak3 web app standard:
https://github.com/ChristianHaake/haak3-webapp-standard

## Required skills

- Use the repository `caveman` skill in `lite` mode for normal user updates and
  final responses.
- Use the repository `cavecrew` skill when focused investigation, a one-or-two
  file edit, or code review benefits from subagent delegation.
- Keep security warnings, destructive actions, legal text, documentation, and
  ambiguity-sensitive procedures in normal explicit language.
- If a requested skill is unavailable in the current agent runtime, continue
  without it and state that limitation. Never claim a skill or delegation ran
  when it did not.

## Before changing code

1. Read this repository's `README.md` and architecture documentation.
2. Read the relevant documents in the shared standard.
3. Inspect equivalent behavior in SocialMediaCreator,
   Feedbackbogen-Generator, and StoryboardDesigner where relevant.
4. Reuse this app's existing stack and patterns unless they conflict with a
   mandatory standard rule.
5. Document any deliberate exception instead of silently diverging.

## App-specific rules

- App name: `InterviewDesigner`
- Live URL: `https://interviewdesigner.haak3.de`
- Repository: `https://github.com/ChristianHaake/InterviewCreator`
- Add further project-specific instructions here.

## Verification

- Run the repository's test, lint, typecheck, and build commands.
- Complete the relevant sections of the shared review checklist.
