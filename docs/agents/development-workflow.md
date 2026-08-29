# Development workflow

This is the repository's source of truth for shaping, implementing, reviewing,
and handing off changes. On GitHub, an MR is a pull request (PR).

## Non-negotiable integration rules

- `main` is integration-only. Agents never commit or push directly to it and
  never force-push it.
- Every PR has one approved decision source under
  `docs/agents/issue-tracker.md` and maps that source to one branch.
- The agent may create focused local commits on its branch so the complete
  `HEAD` diff can be reviewed. It must not merge, squash, rebase after review,
  or delete the branch unless the maintainer asks.
- The agent stops after opening the PR and reporting its verification. The
  maintainer reviews and merges manually.

## Select only the workflow the change needs

Use the focused Matt Pocock skills directly when their trigger applies:

| Situation | Skills | Required outcome |
| --- | --- | --- |
| A major or still-ambiguous capability | `/grill-with-docs`, then `/to-spec` | An agreed domain model, decisions, scope, and test seams |
| Work spanning more than one fresh context | `/to-tickets` | Maintainer-approved tracer-bullet tickets with real blocking edges |
| One approved ticket | `/implement`, with `/tdd` at agreed seams | One complete, demonstrable behavior on a branch |
| A hard bug or performance regression | `/diagnosing-bugs` | A tight red-capable reproduction before hypotheses or fixes |
| A question prose cannot settle cheaply | `/prototype` | Throwaway evidence on a non-main branch; only the decision reaches `main` |
| Any change before PR submission | `/code-review` | Independent Standards and Spec findings against a fixed point |

`/handoff`, `/research`, `/wizard`, `/triage`, and architecture-improvement
skills remain available when their own trigger occurs. They do not belong in
the routine path for a small ticket.

## Shape a reviewable ticket

Use `/to-tickets` for a multi-ticket feature and obtain maintainer approval of
the granularity and blocking edges before implementation. Each ticket should:

- deliver a narrow but complete path that is demonstrable or independently
  verifiable;
- have one primary behavior or decision and one clear rollback boundary;
- fit in one fresh agent context;
- name its public test seam and acceptance criteria;
- avoid bundling opportunistic cleanup or an unrelated refactor.

Split a change when it crosses independent product boundaries, contains
decisions that can be accepted separately, or has independent rollback paths.
A PR over 500 non-generated changed lines or 15 substantive files must be
split before submission unless the maintainer explicitly approves an atomic
exception. An explanation in the PR is not approval. These are review-load
guards, not quality targets. Lockfiles, generated fixtures, and generated
assets are excluded from the line count but still require their own
verification.

## Branch and implement

1. Fetch `origin` and branch from the current `origin/main` using
   `feat/<issue>-<slug>`, `fix/<issue>-<slug>`, or `docs/<issue>-<slug>`.
   When the issue-tracker policy permits a governance change without an issue,
   use `docs/<slug>`.
2. Restate the decision source's applicable acceptance criteria, public test
   seams, blockers, and explicit exclusions before editing.
3. Use mature maintained libraries for generic infrastructure and apply the
   Occam skill before adding a dependency or abstraction.
4. Work in vertical red-green slices at the agreed seams. Run focused tests and
   type checking throughout, then the complete applicable check before review.
5. Keep one to three focused commits. Do not mix unrelated cleanup into them.

## Repository baseline

`.nvmrc`, `package.json`, and `pnpm-lock.yaml` pin the development runtime and
dependency graph. Install with `pnpm install --frozen-lockfile` and use
`pnpm check` as the single full-check entry point. Extend that script when a
reviewed feature introduces a new required check instead of creating a second
competing entry point.

The GitHub Actions job named `quality` runs the same install and check on pull
requests and pushes to `main`. After its first successful run, repository
settings should require pull requests, the `quality` check, and resolved review
conversations while rejecting force-pushes and branch deletion. Actions use a
read-only token unless a reviewed workflow proves that it needs more access.

## Self-review before submission

Create the local branch commits, then review the exact candidate diff:

```bash
git fetch origin
git diff --stat origin/main...HEAD
git log --oneline origin/main..HEAD
```

Run `/code-review` with:

- fixed point: `origin/main`;
- spec source: the decision source recognized by
  `docs/agents/issue-tracker.md`, referenced specification, and accepted ADRs;
- standards sources: `AGENTS.md`, `CONTEXT.md`, `CONTRIBUTING.md`, relevant
  ADRs and protocols, and the Occam skill.

The review must use its two independent axes in parallel:

1. **Standards** checks repository rules, maintainability, security, and code
   smells.
2. **Spec** checks acceptance criteria, completeness, boundary correctness,
   and scope creep.

Resolve every hard Standards finding and every material Spec finding. Record
genuine judgment calls in the PR instead of hiding them. Re-run affected tests
after fixes and repeat the review when the candidate diff changed materially.

For implementation changes, the minimum final verification is the focused
tests plus `pnpm check`; add E2E, renderer, security, or deployment checks when
the ticket touches those boundaries. For pre-scaffold documentation changes,
run the repository's available Markdown and link checks plus
`git diff --check`.

## Submit and stop

Push only the feature branch and open a PR. Its description must include:

- the ticket or decision source and user-visible outcome;
- what is deliberately out of scope;
- how to demonstrate the result;
- tests and commands actually run, with their results;
- the two-axis self-review result and any unresolved judgment calls;
- security, privacy, licensing, provider-cost, and migration impact when
  relevant.

Do not merge the PR. After the maintainer merges it, fetch the new
`origin/main`, confirm the merge, and start the next approved ticket from a new
branch.
