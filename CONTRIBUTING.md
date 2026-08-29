# Contributing to Wisp

Wisp is at the pre-implementation handoff stage. Design feedback, reproducible
research, protocol fixtures, and focused issue reports are welcome through
[GitHub Issues](https://github.com/gezilinll/wispwork/issues).

## Upstream return

If you make a noncommercial fork, we ask you to return useful changes through a
pull request or link the public fork in an issue. This helps the community avoid
fragmentation, but it is not an upstream-submission obligation in the PolyForm
Noncommercial License 1.0.0.

## Code contribution gate

The project intends to offer separate commercial licenses. Before accepting
substantial third-party code or content, it needs a transparent,
lawyer-reviewed contributor agreement that preserves contributors' ownership
while giving the project enough rights to maintain and dual-license the work.

Until that agreement is published, please open an issue before writing a code
pull request. The maintainer may accept factual corrections or other trivial
changes, but should not merge substantial external contributions merely
because a pull request exists.

## Change proposals

1. Read [CONTEXT.md](CONTEXT.md), the relevant files under `docs/adr/`, and the
   [v0 design specification](docs/superpowers/specs/2026-08-28-wisp-v0-design.md).
2. State the user problem and observable evidence before proposing a new layer,
   protocol field, dependency, or plugin mechanism.
3. Keep World Kits and other community content declarative and treat them as
   untrusted input.
4. Include tests and update the single source of truth for any durable decision.

## Security reports

Do not place a suspected vulnerability, credential, private user content, or
production log in a public issue or pull request. Follow the
[security policy](.github/SECURITY.md). When private reporting is unavailable,
only use the detail-free contact request described there.

## Repository checks

Use the exact Node.js and pnpm versions pinned by `.nvmrc` and `package.json`,
then run:

```bash
pnpm install --frozen-lockfile
pnpm check
```

The first approved feature slice adds only the application commands it needs in
its own reviewed MR.
