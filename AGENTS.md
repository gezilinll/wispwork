# Agent guide

Read `CONTEXT.md` and relevant files in `docs/adr/` before changing product
language, domain boundaries, architecture, or protocols.

Read `docs/superpowers/specs/2026-08-28-wisp-v0-design.md` before planning
implementation, then follow the task boundaries in
`docs/superpowers/plans/2026-08-28-wisp-v0.md`.

Apply `.agents/skills/occam/SKILL.md` before adding an abstraction, adapter,
registry, protocol field, extension point, or dependency. Treat every World
Kit and user asset as untrusted input; public extension formats are
declarative and versioned.

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

### Issue tracker

Work is tracked in GitHub Issues for `gezilinll/wispwork`. See
`docs/agents/issue-tracker.md`.

### Domain docs

This is a single-context repository using root `CONTEXT.md` and `docs/adr/`.
See `docs/agents/domain.md`.

### Project skills

Use `.agents/skills/occam/SKILL.md` when simplifying code or deciding whether a
new layer or extension point is necessary.
