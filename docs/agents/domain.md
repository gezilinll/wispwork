# Domain docs

Wisp is a single-context repository.

Before changing domain behavior:

1. Read the root `CONTEXT.md`.
2. Read relevant decisions under `docs/adr/`.
3. Use canonical terms from the glossary in issues, tests, types, and UI copy.
4. Surface a conflict with an ADR instead of silently redefining the model.
5. Create domain documentation lazily when a term or hard-to-reverse decision
   becomes durable.

Missing domain files are not themselves a blocker. Proceed silently unless the
current change resolves a term or an ADR-worthy trade-off.

The user's Studio is also their private Universe in the product worldview. Do
not introduce multiple Studios per user or model Universe as a container of
Studios without an accepted replacement decision.
