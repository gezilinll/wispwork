---
status: proposed
---

# Keep the production service in a private repository

Wisp's browser product, public contracts, deterministic demo, and extension
formats remain in the source-available `wispwork` repository. The live
production service belongs in a separate private `wispwork-server` repository
before the first paid-provider integration is implemented.

This is a repository and trust-boundary split, not a microservice decision.
The private server remains one modular monolith until measured scale or an
independent security boundary proves another process is necessary.

## Boundary

The source-available repository owns:

- `apps/web`, including the Studio, Workbench, local persistence, and public
  client integration;
- `apps/demo-server`, a deterministic no-key implementation of the public HTTP
  contract;
- `packages/protocol`, the sole source of versioned external request, response,
  persisted-document, and World Kit contracts;
- first-party demo fixtures, protocol conformance fixtures, public docs, and
  the SDK surface needed by World Kit authors.

The private repository owns:

- the live HTTP service and production persistence required for idempotency,
  provider-cost accounting, and its audit trail;
- provider SDKs, model routing, host instructions and prompt construction;
- idempotency, quotas, rate limits, authoritative provider-cost accounting,
  redacted production logs, and audit controls for those operations;
- private deployment configuration, incident procedures, log-retention
  controls, and current internal operational contracts.

Secrets never enter either repository. Privacy does not make checked-in
credentials safe; production credentials are injected by the deployment
environment.

## Contract and delivery rules

`packages/protocol` is the single source for client-facing contracts. The
private service consumes an immutable released protocol artifact and pins its
exact version; it does not copy schemas into a second source tree. The first
server-planning PR must choose a mature artifact-distribution mechanism after
verifying namespace ownership, CI authentication, and local-development cost.
No custom package registry or schema transport is built for v0.

A public contract change lands first in `wispwork` with conformance fixtures.
The corresponding private-server PR is blocked by that released version. The
browser and both server implementations run the same fixture corpus. Internal
operational endpoints are not added to the public package.

The public repository must stay runnable end to end without an account, API
key, paid network request, or access to the private repository. Demo mode uses
the real public contract and deterministic fixtures, not client-side branches
that bypass it.

## Why this seam is earned

The production service is where untrusted network input meets credentials,
paid external I/O, usage enforcement, private operational data, and future
commercial rules. Removing this boundary would spread those concerns through
the public demo server or expose the project's main monetization and abuse
controls in a source-visible repository.

Closed source is not the security argument by itself. The service still needs
normal threat modelling, least privilege, validation, rate limiting, secret
management, logging discipline, dependency updates, and independent security
review. Privacy protects commercial implementation and operating details; the
network trust boundary protects the product.

Keeping a contract-compatible demo server public prevents the opposite
failure: a source-available client that contributors cannot run, test, or
understand without the maintainer's private infrastructure.

## Consequences

Benefits:

- production credentials, provider orchestration, enforcement, and operating
  details have one private owner and release path;
- public contributors can run and test the complete product path at zero model
  cost;
- external protocols remain inspectable, versioned, and usable by community
  content authors;
- the live server can adopt stricter access and deployment controls without
  turning the public repository into a mixed-trust workspace.

Costs:

- a contract change may require two PRs in dependency order;
- local live-mode development and CI span two repositories;
- protocol artifacts require versioning and compatibility checks;
- atomic client/server rollout needs explicit sequencing and rollback.

This proposal accepts those costs because they occur at a real external-I/O,
security, and commercial boundary. It does not generalize them into more
repositories, provider registries, service meshes, or shared infrastructure
packages.

## Alternatives rejected

- **Keep live and demo code together in the source-available repository.**
  Operational and commercial implementation would be source-visible and the
  repository would mix two trust and release models.
- **Make every server path private.** The public project would no longer be
  independently runnable and its client contract would be difficult to verify.
- **Hide a private directory, submodule, or encrypted payload inside the public
  repository.** Git history is not a confidentiality boundary, while submodule
  access would make normal public development fragile.
- **Split the private server into services now.** There is no measured scale,
  team, or failure-isolation evidence for that complexity.

## Occam decision record

**Need:** Separate code that operates paid providers, authoritative usage, and
private production data without making the source-available product unusable.

**Evidence:** A live provider adapter, credentials, budgets, idempotency, rate
limits, redacted production logs, and a deterministic demo implementation are
already accepted v0 requirements. Together they require two implementations of
one external contract and form a real network and trust boundary.

**Cheapest correct choice:** Two repositories and one versioned public
contract: public web plus deterministic demo server, and one private production
modular monolith.

**Deliberately deferred:** Microservices, a provider registry, private plugin
hosting, accounts, payments, marketplace services, a custom package registry,
and realtime cross-universe infrastructure.

**Revisit when:** Wisp no longer operates a live hosted service, deliberately
adopts a source-visible server business model, or measured release friction
shows that the physical split costs more than the trust and commercial
boundary protects.

**Verification:** The public E2E suite passes offline in demo mode; public and
private servers pass the same protocol corpus; the private service imports no
web module; the public dependency graph contains no live-provider SDK; secret
scans and deployment checks run independently in both repositories.

## Transition

Until this proposal is accepted, the current specification and plan remain
authoritative. Acceptance must be one atomic documentation PR that changes this
status to `accepted`, aligns every source of truth that currently places demo
and live code together under `apps/server`, and splits the affected delivery
steps before any server implementation begins. The private repository already
exists and may receive governance-only initialization while this proposal is
reviewed; its existence does not authorize a runtime scaffold. Runtime work may
start only from the first approved live-service ticket after the acceptance and
alignment PR is merged.
