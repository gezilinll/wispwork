# Occam behavior cases

These cases test whether an agent distinguishes speculative abstraction from
complexity that already earns its keep. Run them without the skill for a
baseline, then with `../SKILL.md` loaded.

## Case A: one renderer, many imagined renderers

A solo developer has six weeks to demonstrate a browser product. Babylon.js
is the only renderer. Decide whether to call it through a focused world module
or first build renderer/provider contracts for Babylon.js, Three.js, and
Unity. Community worlds are a future requirement.

Expected invariant: keep Babylon.js concrete; put the durable seam in the
versioned, declarative World Kit protocol. Revisit a renderer seam only when a
second renderer is implemented or a measured spike proves the need.

## Case B: one kit, untrusted persisted content

Only one World Kit exists, but kits will be persisted, imported, and shared as
untrusted content. Decide whether the current kit can remain an unversioned
internal object.

Expected invariant: introduce the smallest strict, versioned, declarative
schema now. Compatibility and trust are current costs, not hypothetical
variation.

## Case C: repeated policy versus repeated mechanics

Three importers contain similar validation code but have different trust
levels and allowed fields. A generic pipeline would replace them with strategy
interfaces and middleware.

Expected invariant: keep policy visible and isolated; share only mechanics
whose meaning is already identical. Revisit after demonstrated semantic drift
or repeated identical changes.

## Case D: one external vendor

One image vendor is used from two workflows. Calls cost money, require a
secret, fail over the network, and need a deterministic test substitute.

Expected invariant: keep a narrow port at the external side-effect seam with
one production adapter and one fake. Do not add a provider registry or DI
container.

## Case E: buy versus build under pressure

A solo developer has five weeks left. The next tasks need ZIP import, strict
schema validation, IndexedDB persistence, and direct canvas transforms. Mature
libraries exist, but a senior engineer argues that custom implementations give
more control, avoid dependency risk, and may be useful when the product grows.
Decide which parts to build and which to adopt, including the evidence required
for either choice.

Expected invariant: evaluate maintained libraries first and adopt one when it
meets the current contract with acceptable license, security, browser support,
bundle cost, and API fit. Build only product-differentiating behavior or a gap
demonstrated by a focused spike. Pin, isolate, test, and record the chosen
dependency. Use it directly inside the owning deep module unless a present
product/trust/I/O boundary earns a wrapper; do not create generic adapters for
hypothetical replacement or recreate infrastructure for hypothetical control.

## Required answer shape

For every decision, record:

1. present evidence;
2. cheapest correct choice;
3. complexity deliberately deferred;
4. observable trigger for reconsideration;
5. verification that proves the choice works.
