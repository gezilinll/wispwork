# Wisp v0 Rolling Delivery Plan

> **For agentic workers:** This is the delivery gate and plan index, not a
> substitute for a feature-slice implementation plan. Before functional work,
> run the required grill, accept a slice specification, then use
> `superpowers:writing-plans` to write exact test-first tasks. Execute that plan
> with `superpowers:subagent-driven-development` or
> `superpowers:executing-plans` only after maintainer approval.

**Goal:** Reach a testable Wisp v0 through small, independently reviewed
feature slices without committing code to the wrong repository or designing
unapproved Backend capabilities.

**Architecture:** The source-available `wispwork` repository owns the client,
rendering, editor, public extension formats, and client self-test doubles. The
private `wispwork-server` repository owns Wisp's only deployable application
Backend. Each slice adds the minimum vertical behavior to its final owner and
earns cross-repository contracts only when it has a real consumer.

**Tech stack:** There is no globally authorized scaffold. Use the accepted
client candidates in the product specification only when a slice needs them;
recheck current versions, maintenance, license, security, browser/runtime fit,
and required behavior before pinning a mature library. A private Backend stack
is selected by the first approved Server-owned slice, not by this plan.

**Spec:**
[`docs/superpowers/specs/2026-08-28-wisp-v0-design.md`](../specs/2026-08-28-wisp-v0-design.md)

**Accepted first slice:**
[`docs/superpowers/specs/2026-08-29-style-echo-slice.md`](../specs/2026-08-29-style-echo-slice.md)

## Global constraints

- Read `AGENTS.md`, `CONTEXT.md`, accepted ADRs, and the relevant protocol or
  technical design before changing their boundary.
- Run `.agents/skills/occam/SKILL.md` before adding a dependency, abstraction,
  adapter, registry, protocol field, or extension point.
- Start each stage with the documented grill. Record the accepted user-visible
  outcome, exclusions, repository ownership, test seam, and review boundary.
- Deliver one task per MR. The maintainer reviews and merges manually before
  the next task begins, unless the maintainer explicitly groups repositories.
- Put code in its final owner from the first implementation. `wispwork` has no
  deployable Server; public mocks and fixtures are client/test infrastructure.
- Prefer a mature maintained library for generic infrastructure. Record why a
  custom implementation is necessary before building one.
- Work test-first at behavior seams and keep every functional MR independently
  runnable or otherwise objectively verifiable.
- A new public contract requires a current consumer. Its source lives in
  `wispwork`; the private Backend consumes a pinned immutable release.
- Account for untrusted input, accessibility, persistence, privacy, provider
  cost, licensing, migration, deployment, and rollback only where the slice
  actually touches them.

## Sources of truth

| Concern | Authority |
| --- | --- |
| Product goal, first-session behavior, and v0 scope | Accepted v0 product specification |
| Repository and Backend ownership | `docs/adr/0003-application-backend-boundary.md` |
| Domain language | `CONTEXT.md` |
| World Kit external format | `docs/protocols/world-kit-v0.md` |
| Rendering decision and constraints | ADR-0001 and `docs/technical/rendering.md` |
| Branch, review, and handoff process | `docs/agents/development-workflow.md` |
| Exact files, tests, commands, and MR units for one feature | That feature's accepted slice plan |

README and `AGENTS.md` are navigation. They do not create architecture or
product decisions independently.

## Current rolling horizon

The detailed horizon contains only decisions that are already approved. No
functional scaffold is authorized by this document.

### Task 1: Align the public repository boundary

**Owner:** `wispwork`

**Outcome:** Public sources of truth agree that `wispwork-server` is the only
deployable Backend, public self-tests use client/test doubles, and the former
all-in-one plan cannot be executed accidentally.

**Verification:** Markdown and whitespace checks pass; repository-wide search
finds no active instruction to create `apps/server`, a demo Backend, a live
provider adapter, or combined client/Server deployment in `wispwork`.

### Task 2: Align the private repository boundary

**Owner:** `wispwork-server`

**Outcome:** The private repository is described as the complete application
Backend rather than a generation-only adapter. Its documents approve no
runtime scaffold or future feature merely by assigning repository ownership.

**Verification:** Private governance checks pass; the accepted private ADR
matches public ADR-0003; inactive account, persistence, provider, sharing, and
deployment choices remain feature-gated.

### Task 3: Grill the first functional slice

**Status:** Accepted as Style Echo; implementation not started.

**Owner:** Product decision in `wispwork`; cross-repository facts may inspect
both repositories.

**Outcome:** One smallest user-visible vertical slice has an accepted design
covering the first interaction, observable aha hypothesis, explicit
exclusions, final code owner, deterministic test seam, and completion signal.
The grill decides whether the slice needs any Backend behavior; repository
symmetry is not a reason to invent it.

**Completion gate:** The maintainer confirms shared understanding. The slice
has a named specification in `docs/superpowers/specs/`, and every unresolved
choice that could materially change implementation remains outside the slice.

**Accepted specification:**
[`2026-08-29-style-echo-slice.md`](../specs/2026-08-29-style-echo-slice.md)

### Task 4: Plan only the accepted slice

**Owner:** The repository or repositories selected by the accepted slice.

**Outcome:** A focused implementation plan names exact files, interfaces,
failing tests, commands, expected results, dependencies, and one independently
reviewable outcome per MR. A cross-repository feature has explicit ordering and
contract release gates; unrelated repositories receive no empty scaffold.

**Completion gate:** The plan passes spec-coverage, placeholder, type/name
consistency, Occam, and review-size checks and is accepted by the maintainer.

### Task 5: Execute one reviewed MR at a time

**Owner:** The final code owner named by each plan task.

**Outcome:** Each MR delivers its promised behavior, includes deterministic
verification, passes Standards and Spec self-review, and stops for maintainer
review. The rolling horizon is recalibrated from actual evidence after every
merged task.

## Slice-plan requirements

Every future slice plan must make these decisions explicit rather than inherit
them from the superseded plan:

1. the user action and visible system response proved by the slice;
2. why the slice is the cheapest useful vertical tracer bullet;
3. which repository owns every new file and persisted datum;
4. the source of truth and projection boundaries;
5. the deterministic local path and the exact test that proves it;
6. any public contract and its first real consumer;
7. mature libraries evaluated and the reason for each selected dependency;
8. explicit exclusions and the observable event that would reopen them.

Frameworks, API endpoints, databases, accounts, cloud sync, model providers,
queues, caches, deployment, public sharing, and monetization stay unselected
until an approved slice requires them.

## Replanning rule

Keep only the next three to five reviewable tasks detailed. After each merge,
update the rolling horizon from the repository's actual state before opening
the next task. A later milestone may be named as a product hypothesis, but it
is not implementation authority until its own grill, specification, and plan
are accepted.
