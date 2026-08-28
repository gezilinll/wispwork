---
name: occam
description: Use when a Wisp change proposes a new layer, dependency, adapter, registry, protocol field, plugin point, or generalized capability before demonstrated need.
---

# Occam for Wisp

Choose the **reversibility-weighted minimum**: the smallest design that solves
today's verified problem while protecting boundaries that become expensive or
unsafe to change later.

## Necessity gate

Before adding a construct, write five short answers:

1. **Evidence** — Which current caller, second implementation, persisted datum,
   trust boundary, or measured failure needs it?
2. **Direct path** — What is the cheapest correct implementation using the
   modules and platform already present?
3. **Deletion test** — If the construct vanished, would its complexity spread
   into callers, or simply disappear?
4. **Deferred scope** — What imagined variation remains deliberately absent?
5. **Revisit trigger** — Which observable event would justify reopening the
   decision?

Add the construct only when the direct path is insufficient or deletion would
move essential complexity across multiple callers.

## Wisp's earned complexity

| Keep now | Evidence |
| --- | --- |
| Strict versioned World Kit data | Persisted, shared, untrusted content is a current compatibility and security boundary. |
| Narrow ports for paid remote model calls | Production adapters need secrets, failure handling, budgets, and deterministic fakes. |
| Schema migrations and stable IDs | User work must survive new releases and Remix provenance. |
| Validation, accessibility, and measured budgets | These protect real users and devices; brevity is not the goal. |

## Wisp's speculative complexity

Keep one Babylon.js implementation concrete inside the world module. Keep one
explicit creative flow instead of a generic DAG. Use direct commands instead
of an event bus, manual composition instead of a DI container, and declarative
content instead of arbitrary plugin code.

Extract a renderer seam from two working renderers, a provider registry from a
second provider, an artifact abstraction from a second artifact type, and a
public loop protocol from two proven loops. A fake for a true external service
counts as a testing adapter; it does not justify a registry.

## Decision record

For architecture or protocol changes, report:

```text
Need:
Evidence:
Cheapest correct choice:
Deliberately deferred:
Revisit when:
Verification:
```

Compression is not simplicity. Prefer fewer moving parts and a legible control
flow over fewer lines. Preserve complexity at trust, persistence, external I/O,
and user-safety seams.

Related reference, not vendored:
[NiuChou/occam-razor-skill](https://github.com/NiuChou/occam-razor-skill).
