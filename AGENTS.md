# Agent guide

Read `CONTEXT.md` and relevant files in `docs/adr/` before changing product
language, domain boundaries, architecture, or protocols.

Read `docs/superpowers/specs/2026-08-28-wisp-v0-design.md` before changing
product scope. Read
`docs/superpowers/plans/2026-08-29-wisp-v0-rolling-delivery.md` before planning
implementation. Start functional work only from an accepted slice
specification and its focused implementation plan; when either is absent, the
next action is the documented grill, not a scaffold.

For branch, review, and handoff rules that apply to every repository change,
follow `docs/agents/development-workflow.md`.

Apply `.agents/skills/occam/SKILL.md` before adding an abstraction, adapter,
registry, protocol field, extension point, or dependency. Treat every World
Kit and user asset as untrusted input; public extension formats are
declarative and versioned.

The private `wispwork-server` repository owns Wisp's only deployable
application Backend. Keep this repository self-testable with client-local
fixtures, mocks, or test doubles; do not add a server process or imply full
product self-hosting. Add a public cross-repository contract only when an
approved feature has a real consumer, then keep its authoritative schema here.

Prefer a mature, maintained library for generic infrastructure. Before writing
a replacement, record why available libraries fail the current contract on
license, security, runtime support, API fit, or measured bundle/performance.
Use the chosen library directly inside its owning deep module by default; add a
wrapper only when it protects an existing product, trust, or external-I/O
boundary. Pin its version and verify its license, maintenance, security, and
required behavior.

Read `LICENSE-SCOPE.md` before importing third-party code or assets. Describe
Wisp as source-available, not Open Source.

## Agent skills

### Decision sources and Issues

Read `docs/agents/issue-tracker.md` when choosing a pull-request decision source
or using GitHub Issues for feedback, defects, backlog, or ticket coordination.
Accepted internal specifications and plans do not require duplicate Issues.

### Domain docs

This is a single-context repository using root `CONTEXT.md` and `docs/adr/`.
See `docs/agents/domain.md`.

### Project skills

Use `.agents/skills/occam/SKILL.md` when simplifying code or deciding whether a
new layer or extension point is necessary.
