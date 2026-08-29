---
status: accepted
---

# Keep the application Backend in one private repository

Wisp has one application Backend. Its deployable server-side code belongs in
the private `wispwork-server` repository. The source-available `wispwork`
repository contains the client product and the public extension surface, not a
second Backend or a deployable demo server.

This is a repository and trust-boundary decision. It does not choose the
Backend framework, persistence model, deployment topology, provider, or
internal module structure.

## Decision

The source-available repository owns:

- the browser client, Studio rendering, Workbench, and client-side product
  behavior;
- public World Kit formats and other client-facing contracts after a real
  consumer requires them;
- deterministic fixtures, mocks, and test doubles needed to exercise public
  client behavior without private access or paid requests;
- public documentation, examples, and community-facing development tools.

The private repository owns every deployable application Backend capability.
That includes server-side behavior for generation, identity, cloud
persistence, sharing, or other features only after the corresponding feature
slice is approved. Repository ownership does not approve any of those features
or their implementation shape.

A public test double is part of a test or client boundary. It may simulate a
future external interaction, but it is not a production-equivalent service and
must not become a deployable Backend. The public repository promises a
deterministic, self-testable client path; it does not promise a fully
self-hostable Wisp service.

Code is added to its final owning repository from the first implementation
slice. Temporary public server code is not used as a staging area for later
private migration.

Secrets remain outside Git regardless of repository visibility and are
supplied by the eventual deployment environment.

## Contracts

A client-facing contract is public only when an approved feature has a real
cross-repository or extension consumer. Its authoritative schema belongs in
`wispwork`; `wispwork-server` consumes a pinned immutable release instead of
copying the schema.

The first feature that needs such a contract must choose its mature release
and distribution mechanism as part of that feature's design. This decision
does not pre-create an empty protocol package, endpoint catalog, conformance
suite, or custom registry. Backend-internal schemas remain private.

## Consequences

Benefits:

- server-side application behavior has one code owner and one deployment
  boundary;
- public contributors can run and verify client behavior without private
  repository access or unbounded provider cost;
- commercial and operational implementation does not leak into a nominally
  public demo service;
- each feature can earn only the contracts and Backend machinery it needs.

Costs:

- a cross-repository feature may require ordered pull requests and a released
  contract artifact;
- public mocks prove client behavior, not production Backend equivalence;
- contributors cannot self-host the complete hosted product from the public
  repository alone.

## Alternatives rejected

- **Keep a deterministic demo server in `wispwork`.** It creates two Backend
  implementations and encourages production responsibilities to accumulate in
  the public repository.
- **Implement publicly and migrate later.** Git history and early consumers
  make that migration neither private nor cheap.
- **Design the complete private Backend now.** No approved account, database,
  provider, sharing, or deployment requirement currently earns those choices.
- **Move public formats into the private repository.** Community content and
  client contracts would become opaque and unnecessarily coupled to private
  implementation.

## Occam decision record

**Need:** Give all deployable server-side application behavior one final code
owner while keeping the public client independently testable.

**Evidence:** The two repositories already exist, and the previous proposal
would have created public and private server implementations with overlapping
responsibility.

**Cheapest correct choice:** One private Backend, one public client, and
feature-local public test doubles.

**Deliberately deferred:** Backend framework, process topology, database,
accounts, cloud sync, generation provider, queues, caches, public API shape,
contract distribution, and deployment.

**Revisit when:** Wisp deliberately adopts a source-visible Backend business
model or stops operating any hosted server-side product.

**Verification:** Public plans contain no deployable server target; public
checks run without the private repository or provider credit; every future
server-side feature starts in `wispwork-server` from an approved slice.

## Transition

The earlier v0 specification and implementation plan placed a deployable
server in `wispwork`. The documentation-alignment change that accepts this ADR
must also mark that plan superseded, remove the conflicting architecture from
the specification, and publish a rolling delivery plan before functional work
starts.
