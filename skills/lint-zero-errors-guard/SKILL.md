---
name: lint-zero-errors-guard
description: Enforce linting quality for this repository. Use when creating, modifying, or reviewing code changes to ensure no linting errors are introduced and validate the result with `npm run lint` before completion.
---

# Lint Zero Errors Guard

## Goal

Ensure every repository change finishes with zero linting errors.

## Required Workflow

1. Detect touched files and identify likely lint impact.
- Prioritize changed TypeScript/React config and source files.
- Include test files and workflow/config changes when relevant.

2. Run lint check.
- Execute: `npm run lint`

3. Fix all lint errors.
- Apply minimal, behavior-preserving fixes.
- Prefer explicit types over `any`.
- Remove invalid/obsolete patterns flagged by ESLint rules.
- Keep style and conventions consistent with nearby code.

4. Re-run lint until clean.
- Execute `npm run lint` again after each fix iteration.

5. Completion gate.
- Consider the task done only when `npm run lint` reports:
  - `0 errors`
- Warnings can be reported separately unless the task explicitly requires zero warnings.

## Rule of Engagement

- Do not ignore or suppress errors with blanket disables unless explicitly requested.
- Avoid changing runtime behavior just to satisfy lint unless needed and documented.
- If a lint rule conflicts with intended behavior, prefer a narrow fix and explain the tradeoff.

## Fast Commands

```bash
npm run lint
```
