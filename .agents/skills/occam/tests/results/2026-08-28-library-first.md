# Library-first regression: 2026-08-28

Three isolated agents evaluated Case E without the repository guidance. All
correctly preferred mature libraries over reimplementing ZIP, schema,
IndexedDB, and canvas mechanics. The baseline gap was different: two proposed
a generic adapter or interface for every dependency, despite one current
implementation and no measured replacement need.

The project rule was therefore added to `AGENTS.md`, not duplicated inside the
Occam skill: evaluate mature libraries first, use the chosen library directly
inside its owning deep module, and add a wrapper only for an existing product,
trust, or external-I/O boundary.

Two agents then repeated the scenario with `AGENTS.md` and `SKILL.md`. Both
converged on the intended implementation:

- use fflate privately inside `WorldKitImporter`, with no generic ZIP adapter;
- use Zod directly in `packages/protocol`, with product schemas and migrations
  owned by Wisp;
- use one concrete Dexie `WorkspaceStorage`, tested with `fake-indexeddb`, with
  no repository interface;
- use Konva inside the Poster Workbench while keeping `PosterDocumentV1` and
  poster commands vendor-free, with no canvas renderer registry;
- keep `GenerationGateway` as the true adapter seam because paid remote I/O,
  secrets, failures, budgets, and deterministic demo behavior are current.

Both green responses completed all six decision-record fields and named
observable reconsideration triggers. Pass.
