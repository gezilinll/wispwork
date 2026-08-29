# Style Echo first functional slice

**Status:** Accepted after maintainer `grill-with-docs` confirmation; Opening
Studio asset-first amendment and Blender source-license correction accepted by
the maintainer on 2026-08-30

**Date:** 2026-08-29

**Parent specification:**
[`2026-08-28-wisp-v0-design.md`](2026-08-28-wisp-v0-design.md)

**Visual specification:**
[`2026-08-29-wisp-visual-constitution.md`](2026-08-29-wisp-visual-constitution.md)

**Opening Studio asset evidence:**
[`2026-08-30-opening-studio-runtime-assets.md`](../../research/2026-08-30-opening-studio-runtime-assets.md)

**Delivery gate:** The accepted specification authorized the focused plan. The
2026-08-30 amendment authorizes a revised focused plan, not further corrective
implementation, until the maintainer accepts that written revision.

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

### 3.0 Supported surface and product language

This slice is a desktop-browser experience. The supported boundary is a
viewport of at least **1280 × 720 CSS pixels** and a fine primary pointer. If
either condition is absent, the application renders its localized product
shell and desktop-only notice but does not initialize Babylon. Mobile and
tablet authoring layouts are outside the current product promise.

The product supports separate English and Simplified Chinese locales. On the
first visit it follows the browser language; an explicit language switch is
remembered across reloads. Locale preference is validated and persisted
separately from preview and adopted Studio state, so changing language never
changes creative work.

Opening Studio uses this exact localized copy:

| State | Simplified Chinese | English |
| --- | --- | --- |
| Product identity | 灵思 · 创意宇宙 | Wisp · Creative Universe |
| Title | 你的创意事务所 | Your Creative Studio |
| Kit | 世界套件：暖光工坊 | World Kit: Warm Atelier |
| Loading | 正在打开创意宇宙… | Opening your creative universe… |
| Ready | 暖光工坊已就绪 | Warm Atelier is ready |
| Reset | 回到全景 | Return to overview |
| 3D fault | 3D 创意事务所暂时无法打开 | The 3D Creative Studio couldn’t open |
| Retry | 重新尝试 | Try again |
| Unsupported device | 当前版本仅支持桌面端 | This version is available on desktop only |

English remains the canonical language for code, protocol names, and stable
persisted identifiers. The Chinese terms above are product localization, not
aliases that change domain identity.

### 3.1 First frame

The first visit opens directly into a real Babylon Studio. It does not begin on
a login page, blank professional canvas, or separate setup wizard.

Warm Atelier is the initial preview so the first frame already contains a
coherent world. No third neutral Style Profile or unstyled scene is created.
The user has not adopted anything merely because this preview is visible.

The first frame follows the Visual Constitution: a restrained open-cutaway
Studio on a visible floating Universe fragment, a controlled weak-perspective
three-quarter home view, a legible central creative surface and display area,
and meaningful anomaly accents. The approximately 65/35 tangible/anomaly
balance is a human composition principle, not an automated coverage quota.

The first frame is world-dominant rather than a fixed world/panel split. A
compact DOM card floats at the upper right and holds authoritative identity,
status, language, reset, retry, and later task controls. The user may apply
bounded orbit and zoom, then invoke the explicit localized overview action to
restore the stable home composition; panning and free navigation remain
disabled.

The DOM shell appears immediately. The 3D Studio uses only a restrained
300–500 ms reveal after it becomes ready; reduced-motion preference removes
that reveal without delaying meaning. There is no cinematic portal sequence.

#### 3.1.1 Asset-first Warm Atelier realization amendment

The first runnable Opening Studio candidate established the renderer,
lifecycle, camera, localization, and supported-device boundary, but its
procedural boxes, tubes, and generated flat textures did not meet Visual
Constitution criterion 3. They still read as a toy-like scene. That criterion
remains blocking; it is not relaxed to preserve already-written code.

Opening Studio therefore owns the smallest runtime-asset path that can correct
the three focal zones before later Style Echo behavior begins:

1. One checked-in `opening-studio.blend` is the editable first-party source,
   authored with
   [Blender 4.5.13 LTS](https://www.blender.org/releases/4-5/). It exports two
   first-party runtime files. `opening-studio-shell.glb` contains the curved
   timber silhouette, intentional bevels and joinery, wall infill, floor edge,
   and fixed workbench augmentation. `opening-studio-display.glb` contains a
   substantial display plinth, brass frame, and empty glass canopy. The
   `.blend` source and generated GLBs retain the repository's default PolyForm
   Noncommercial license for their first-party authored content; any embedded
   Poly Haven image data remains CC0. A small checked-in `bpy` export helper
   contains only collection selection and deterministic glTF-export settings;
   because it calls Blender's Python API, that file alone is explicitly
   licensed GPL-3.0-or-later and accompanied by the corresponding license
   text. It contains no mesh coordinates, dimensions, art direction, or
   modeling logic. Blender itself and temporary authoring output are not
   project or CI dependencies. Source metadata records the exact Blender
   version and the official distribution hash used for export; CI verifies
   committed source and outputs rather than downloading Blender.
2. The Studio bundles only the screened Poly Haven CC0 inputs recorded in the
   asset evidence: `WoodenTable_01_1k.glb` as the workbench base,
   `painted_wooden_cabinet_1k.glb` as archive storage, and the six 1K JPEGs from
   Fine Grained Wood and Plastered Wall 03 for the authored structure. The
   table sits beneath the first-party workbench root and may not remain a
   coffee-table-scale stock prop; the cabinet may not impersonate the Artifact
   display. Their measured converted runtime set is 4,558,354 bytes before the
   two first-party GLBs.
3. The asset manifest records source URLs, acquisition date, page/API
   identities, source and final SHA-256 values, conversion command and tool
   version, license, sizes, and first-party Blender source/export metadata. The
   repository commits only final runtime files and notices, not source archives,
   previews, full packs, or unused formats. Runtime loading is local-only and
   performs no Poly Haven or other external request.

The converted third-party GLBs preserve source geometry, textures, and
materials for provenance. Composition, scale, shared PBR material treatment,
authored augmentation, lighting, and semantic placement make them part of Warm
Atelier rather than an untouched stock pack. If either furniture model still
fights the selected silhouette after one real-browser composition pass, remove
it and author that fixture in the same two first-party GLBs. Kenney, KayKit,
Quaternius, or another low-poly pack is not a fallback for a failed focal form.

`StudioRuntime` remains the concrete deep Babylon module that owns engine,
scene, camera, render loop, projection, fault, retry, and disposal. One
internal Opening Studio scene module directly imports
`@babylonjs/loaders/glTF` from exact package version `9.23.0`, loads and
assembles the bundled GLBs and PBR textures, and parents them under stable
internal roots named `studio-shell`, `studio-workbench`, `studio-archive`, and
`studio-artifact-display`. It exposes only the owned references that
`StudioRuntime` needs for style projection and disposal. There is no generic
asset manager, registry, renderer adapter, World Kit importer, or public asset
protocol.

Every required asset load is part of the existing asynchronous mount. A
partial or failed load disposes every created container and enters the existing
localized 3D fault state; retry creates a fresh mount. The unsupported-device
gate runs before asset loading and therefore fetches neither GLB nor texture.
The product does not substitute a screenshot or the rejected procedural scene
while claiming that 3D succeeded.

The asset-first amendment has these hard budgets and gates:

- the two first-party GLBs total at most 2,000,000 bytes;
- all new committed Opening Studio runtime assets total at most 7,000,000
  bytes;
- the complete mounted home scene contains at most 50,000 triangles;
- the current three-light setup and one 512-pixel shadow map remain the first
  lighting pass; no HDRI, Draco, Meshopt, KTX2, or decoder is added unless a
  measured failure earns it;
- asset verification is part of the terminating repository check and rejects
  a hash, size, source, license, Blender source/export, or inventory mismatch;
- all four bundled GLBs load in `NullEngine` and real WebGL2 with stable
  semantic roots, no required compression extension, and no retained owned
  resources after twenty mount/dispose cycles;
- the supported 1280 × 720 home view sustains the existing 60 FPS target on
  the demo laptop, and first useful DOM plus first interactive Studio marks
  remain separately reported;
- final human review must again pass all Visual Constitution items 1–4. In the
  focal order, the workbench reads first, the shell second, and the Artifact
  display before the dormant anomaly. Loading successfully or staying within
  budgets cannot override a toy-like or untouched-stock visual result.

This amendment deliberately moves the matching Babylon GLB loader, bundled
runtime assets, third-party manifest, and asset verifier from Live Style Echo
Task 3 into Opening Studio Task 1. Task 3 consumes that established scene and
retains its actual outcome: Warm/Neon projection and Typesetter Wisp behavior.
It no longer vendors the previously proposed Kenney furniture. The amendment
does not move Neon, Wisp, Poster, Workbench, adoption, persistence, generation,
Backend, World Kit import, or community behavior into Task 1.

Occam decision record:

**Need:** Correct a measured visual failure in the three focal Studio zones
without weakening the accepted visual target.

**Evidence:** The current procedural scene passes the functional renderer path
but fails the mature-handcrafted human review, while the screened CC0 set does
not contain a suitable shell or glass display.

**Cheapest correct choice:** One noncommercial editable Blender source, two
noncommercial first-party GLB exports, one minimal GPL export helper, two
screened CC0 furniture inputs, two shared CC0 PBR material sets, and one
concrete scene module inside the existing Babylon runtime.

**Deliberately deferred:** Generic asset management, public formats, community
imports, compression pipelines, HDRI, additional renderers, style behavior,
and asset volume beyond the first-frame focal forms.

**Revisit when:** A second real bundled or imported scene needs shared loading
policy, the measured payload or GPU cost breaks the supported baseline, or PBR
reflection remains visibly flat after geometry and material correction.

**Verification:** Stable asset inventory and hashes, browser plus NullEngine
loading, twenty clean lifecycles, explicit byte/triangle/performance evidence,
and a fresh maintainer/agent visual judgment against the same north star.

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

1. Studio material tint, bounded light color/intensity, and style-local surface
   treatment while the World Kit camera and scene-wide render profile remain
   stable;
2. DOM palette and typography accents;
3. the Typesetter Wisp's appearance and restrained reaction;
4. the deterministic Poster composition and preview.

Warm Atelier is the bundled reference World Kit. Neon Pixel Lab is a second
Style Profile inside that same shell; this slice does not claim to implement a
second Pixel World Kit, side-scrolling world, renderer, or import path.

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
- preserves one bounded form grammar across both treatments: visible core,
  outer form, trail, role meaning, and state feedback;
- communicates primarily through motion, deformation, luminance, accessible
  status, and a restrained role signifier rather than depending on a cartoon
  face;
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
    access to the structured Poster path and accepted local data; its retry
    action can attempt a fresh mount without reloading or losing DOM state;
11. a viewport below 1280 × 720 or without a fine primary pointer does not
    initialize Babylon and instead exposes the localized desktop-only notice;
12. the initial locale follows the browser, a manual English/Chinese switch
    survives reload independently, and neither locale change mutates preview
    or adopted Studio state.

The implementation plan selects the smallest mature libraries that satisfy
these behaviors. Candidate versions in the parent specification are not an
authorization to install every candidate. Each introduced dependency must be
rechecked for maintenance, license, security, browser support, required
behavior, and measured cost before it is pinned.

## 9. Completion signal

The slice is complete only when:

- every focused and repository-wide deterministic check passes;
- the full user-visible path is demonstrated in the supported desktop browser
  baseline, including its 1280 × 720 lower bound and unsupported-device gate;
- Warm Atelier and Neon Pixel Lab are clearly distinct while remaining
  coherent across Studio, UI, Wisp, and Poster;
- the Studio reads as a mature handcrafted creative space on a private
  floating Universe fragment, not a toy room, generic fantasy island, or
  high-density showcase scene;
- the weak-perspective home view preserves the complete-fragment composition
  and work-surface readability without free camera navigation;
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

The original specification and focused plan passed this gate before Opening
Studio implementation began. After the maintainer accepts the 2026-08-30
asset-first amendment, revise that same focused implementation plan rather than
creating a competing plan. The revision must name exact files, dependency and
asset evidence, failing tests, commands, review-sized tasks, and one
user-visible outcome per MR.

Corrective implementation resumes only after the maintainer accepts the revised
plan. Each task is then delivered in one MR, self-reviewed against a fixed
`origin/main`, and stopped for manual maintainer merge before the next task
starts.
