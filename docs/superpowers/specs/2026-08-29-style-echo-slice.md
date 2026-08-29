# Style Echo first functional slice

**Status:** Accepted after maintainer `grill-with-docs` confirmation;
implementation not started

**Date:** 2026-08-29

**Parent specification:**
[`2026-08-28-wisp-v0-design.md`](2026-08-28-wisp-v0-design.md)

**Delivery gate:** This specification authorizes a focused implementation plan,
not application code or an empty scaffold.

## 1. Decision

The first Wisp functional slice is **Style Echo（风格回响）**. It is a credible
but deliberately restrained product-validation prototype that tests one narrow
part of the v0 thesis:

> Can a user perceive one structured creative language shaping both their
> Studio and a useful piece of their own work, rather than treating the world as
> unrelated decoration?

Style Echo is an internal slice name, not a new domain entity, public protocol,
or user-facing progression system.

The slice does not claim to validate the complete ten-minute aha moment. It
does not yet prove that a full Brief, visible four-Wisp Creative Loop, direct
Workbench editing, or live generation improves repeated real work.

## 2. Evidence this slice may produce

Style Echo may prove that:

- a real Babylon Studio, DOM product surface, Wisp presentation, and Poster can
  respond coherently to the same Style Profile;
- the user can recognize and control that relationship without writing a
  generation prompt;
- one deterministic Poster can be adopted, displayed, exported, and restored
  as part of a persistent personal Studio;
- the chosen client architecture can support the first vertical product path
  without a Backend or speculative extension framework.

It may not be described as market validation, retention evidence, a complete
creative workflow, or proof that users prefer Wisp over an ordinary design
tool. External target-user testing is deferred. This slice passes through
deterministic verification, a working demonstration, and maintainer plus
delivery-agent experience review.

## 3. User-visible interaction

### 3.1 First frame

The first visit opens directly into a real Babylon Studio. It does not begin on
a login page, blank professional canvas, or separate setup wizard.

Warm Atelier is the initial preview so the first frame already contains a
coherent world. No third neutral Style Profile or unstyled scene is created.
The user has not adopted anything merely because this preview is visible.

A DOM panel exposes three structured fields:

- Studio name;
- exact Poster headline;
- optional supporting line.

These values are content for the opening Poster, not a model prompt. The Studio
name also appears as issuer or signature information in the Poster composition.
Studio name and headline are required. Visible, bounded field constraints must
fit both first-party compositions and remain usable with Chinese and Latin
text; the focused plan pins the tested limits from the actual layouts.

### 3.2 Live Style Echo

The user can switch repeatedly between two Style Profiles:

- **Warm Atelier** — wood, paper, warm light, and restrained editorial
  typography;
- **Neon Pixel Lab** — dark surfaces, neon accents, pixel Wisp treatment, and
  compact display typography.

Both profiles use the same bounded Studio shell. A switch must visibly project
the same selected profile into:

1. Studio materials, lighting, camera treatment, and declared render profile;
2. DOM palette and typography accents;
3. the Typesetter Wisp's appearance and restrained reaction;
4. the deterministic Poster composition and preview.

The relationship must be inspectable product state, not four independently
hard-coded theme switches. Text changes update the Poster preview without
rewriting, summarizing, or embellishing the user's exact copy.

### 3.3 Adopt and display

Previewing is reversible. It does not replace the user's last accepted result.

The explicit **“采用并悬挂”** action adopts the current Studio name, copy, Style
Profile, and Poster as one coherent result. On success:

1. the accepted state is committed to local persistence;
2. the Typesetter Wisp performs one short deterministic display action;
3. the accepted Poster occupies the fixed Studio display slot;
4. PNG export becomes available for that accepted Poster.

If persistence fails, the product must not report success or replace the last
accepted result. It retains the preview, presents an explicit DOM error, and
allows retry.

### 3.4 Return and revision

Reload restores the last successfully adopted Studio and Poster. Unadopted
preview changes may be discarded on reload.

The user may return to the structured fields, change copy or Style Profile,
and preview a new revision. The displayed Poster remains the last adopted
revision until the user invokes “采用并悬挂” again. This keeps preview and
accepted world state unambiguous.

## 4. Poster boundary

This slice produces one opening Poster at exactly **1080 × 1350** pixels.

It has two bounded first-party compositions, one for each Style Profile. The
composition is deterministic and uses bundled, licensed fonts and first-party
or compatibly licensed assets. The same accepted input and asset/profile
versions must produce the same composition without random values, network
services, or provider output.

The user can:

- edit the exact headline and optional supporting line through structured DOM
  fields;
- switch between the two profiles;
- inspect the resulting Poster at a useful size;
- adopt the current result;
- export the adopted result as a 1080 × 1350 PNG.

The user cannot yet drag, resize, rotate, crop, reorder layers, select arbitrary
fonts, or edit freeform geometry. Those behaviors belong to the later Poster
Workbench slice. The implementation must not present the current structured
fields as a miniature general-purpose Workbench.

## 5. Typesetter Wisp boundary

One Typesetter Wisp is visible in the Studio. It gives the world a collaborator
presence without pretending that the complete Creative Loop exists.

The Wisp:

- changes its bounded first-party appearance with the selected Style Profile;
- gives a restrained deterministic response while the preview recomposes;
- performs the short display action after a successful adoption;
- exposes outcome and failure state through accessible DOM text as well as
  motion;
- respects reduced-motion preferences.

It does not chat, call a model, consume Spark, invent a customer, select tools,
or simulate the Brief, Art Director, and Maker Wisps. No general Wisp runtime,
behavior tree, workflow graph, or Agent Loop plugin contract is earned by this
single deterministic behavior.

## 6. State and projection boundaries

The source of truth is one serializable client product state. It distinguishes
the current preview from the last adopted opening result and stores only stable
product IDs and values.

| Surface | Responsibility | Not authoritative for |
| --- | --- | --- |
| React/DOM | Structured input, style controls, explicit status, errors, adoption, and export action | Babylon resources or Poster pixels |
| Babylon Studio | World, Wisp, and display-slot projection of current product state | Persistence or silent product mutation |
| Poster projection | Deterministic composition, preview, display texture, and PNG export | Studio lifecycle or a universal Artifact model |
| Local storage | Versioned adopted state and stable asset references needed for reload | Renderer, DOM, or canvas objects |

The same Style Profile record supplies the structured values consumed by all
three presentation surfaces. Direct product commands carry intent back to the
state owner; the slice adds no generic event bus, renderer-neutral adapter,
dependency-injection container, or plugin registry.

The two Style Profiles and Studio kit data are trusted, bundled first-party
content. This slice does not accept ZIP files, remote URLs, arbitrary user
assets, or community World Kits. It does not claim to implement the complete
World Kit importer or add speculative protocol fields. Consuming trusted
bundled data is not a World Kit package import and therefore does not trigger
the importer's conformance-fixture gate.

## 7. Repository ownership and service boundary

Every new file and persisted datum for Style Echo belongs in the
source-available `wispwork` repository:

- browser application and accessible DOM controls;
- serializable local product state and persistence;
- Babylon Studio projection and first-party scene assets;
- Typesetter Wisp presentation;
- deterministic Poster composition, display texture, and PNG export;
- client-local fixtures and tests.

`wispwork-server` receives no symmetrical scaffold, endpoint, schema copy, or
health check. Style Echo requires no account, credential, provider, network
request, or cross-repository contract.

## 8. Deterministic self-test path

The complete slice must run from a fresh public checkout without the private
repository, credentials, provider credit, or network service.

The focused implementation plan must include tests that prove at least:

1. exact headline and supporting copy survive composition unchanged;
   user text remains inert data rather than executable markup;
2. both Style Profile IDs project the expected structured values into DOM,
   Babylon Studio/Wisp state, and Poster composition;
3. preview changes do not overwrite the last adopted result;
4. “采用并悬挂” commits one coherent accepted snapshot or reports failure
   without partial success;
5. reload restores the accepted Style Profile, copy, and display-slot Poster;
6. the exported PNG is 1080 × 1350 and uses the accepted revision;
7. the local path makes no Backend or provider request;
8. twenty repeated Studio mount, projection, display-texture replacement, and
   disposal cycles release their owned Babylon resources without continuing
   tracked-resource growth;
9. keyboard-only operation reaches the fields, both profiles, adoption, and
   export, while status remains understandable without Wisp motion;
10. a WebGL2 initialization failure produces a clear diagnostic and preserves
    access to the structured Poster path and accepted local data.

The implementation plan selects the smallest mature libraries that satisfy
these behaviors. Candidate versions in the parent specification are not an
authorization to install every candidate. Each introduced dependency must be
rechecked for maintenance, license, security, browser support, required
behavior, and measured cost before it is pinned.

## 9. Completion signal

The slice is complete only when:

- every focused and repository-wide deterministic check passes;
- the full user-visible path is demonstrated in the supported desktop browser
  baseline and inspected at the mobile viewing compatibility size;
- Warm Atelier and Neon Pixel Lab are clearly distinct while remaining
  coherent across Studio, UI, Wisp, and Poster;
- the maintainer and delivery agent both judge the actual interaction to have a
  clear style relationship, credible restrained visuals, and a basic sense of
  ownership and completion;
- no Server, provider, account, or hidden network dependency is needed;
- known limitations and any failed acceptance criterion are reported rather
  than reframed as success.

This internal sign-off does not replace the 10–15-person v0 validation plan or
authorize market, retention, or monetization claims.

## 10. Explicit exclusions and revisit triggers

| Excluded now | Revisit only when |
| --- | --- |
| Complete structured Brief | A later slice validates the opening Project beyond exact copy |
| Full Poster Workbench | Direct spatial or layer editing becomes the accepted slice outcome |
| Art Director, Maker, and four-Wisp orchestration | A complete Creative Loop slice defines visible state and failure semantics |
| Live AIGC, Spark, Backend API, and provider choices | A separately grilled live-generation slice defines privacy, cost, retry, and trust boundaries |
| Account, cloud sync, sharing, visits, and community | A real continuity or circulation requirement enters v0 scope |
| User or community World Kit import | An external package is the current consumer of the public trust boundary |
| Arbitrary assets, geometry, shaders, or Wisp rigs | A validated user need justifies a bounded import contract |
| Prop placement or full world editing | Users need spatial authorship beyond the fixed display slot |
| General Artifact, renderer, workflow, or plugin abstractions | A second real implementation proves shared behavior |
| External target-user gate for this slice | The project evaluates the complete v0 GO gates or makes a world-heavy/commercial claim |
| Showcase-grade animation and asset volume | A later distribution test needs showcase production values |

The independent Babylon/PlayCanvas reference-scene comparison remains a
commercial-locking evidence task from the rendering design. It is not product
evidence and does not enter this slice merely because Babylon is used here.

## 11. Next delivery gate

After this specification is merged, write one focused implementation plan for
Style Echo. That plan must name exact files, dependency evidence, failing tests,
commands, review-sized tasks, and one user-visible outcome per MR.

Implementation begins only after the maintainer accepts that plan. Each task is
then delivered in one MR, self-reviewed against a fixed `origin/main`, and
stopped for manual maintainer merge before the next task starts.
