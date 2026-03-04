---
name: unit-test-coverage-guard
description: Enforce unit testing quality in this project. Use when implementing, refactoring, reviewing, or fixing code in functional units to keep unit tests updated and maintain at least 80% global line coverage (and 80% global functions/branches/statements thresholds) with Vitest, excluding third-party UI primitives.
---

# Unit Test Coverage Guard

## Goal

Keep unit tests aligned with current behavior of functional units and prevent coverage regressions below the project baseline.

## Apply This Workflow

1. Identify whether the change touches functional units.
Functional units in this project include:
- `src/components/**` except `src/components/ui/**`
- `src/pages/**`
- `src/hooks/**`
- `src/lib/**`

2. Add or update unit tests before finishing the task.
- Prefer behavior-oriented tests with Testing Library.
- Test observable outputs, user interactions, and route behavior.
- Avoid testing internal implementation details.

3. Reuse existing test conventions.
- Use `src/test/setup.ts` for common test environment behavior.
- Use `src/test/test-utils.tsx` for router-aware rendering.

4. Run the required checks.
- `npm test`
- `npm run test:coverage`

5. Enforce the quality gate.
- Coverage must pass configured thresholds in `vitest.config.ts`:
  - `lines >= 80`
  - `functions >= 80`
  - `branches >= 80`
  - `statements >= 80`
- Scope keeps `src/components/ui/**` excluded from coverage enforcement.

## Test Design Rules

- Write one focused assertion group per behavior.
- Prefer `screen.getByRole` and accessible queries first.
- Mock only external concerns (e.g., toasts, browser APIs, heavy animation libs).
- Keep tests deterministic; avoid timing-sensitive assertions unless strictly needed.
- When behavior intentionally changes, update tests to reflect the new expected behavior and document the reason in the PR or task notes.

## Pull Request Checklist

- New/changed functional behavior is covered by unit tests.
- No failing tests in `npm test`.
- Coverage passes in `npm run test:coverage`.
- No unnecessary tests for third-party UI primitives under `src/components/ui/**`.

## Fast Commands

```bash
npm test
npm run test:coverage
npm run test:watch
npm run test:ci
```
