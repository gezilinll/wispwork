# Wisp v0 Design Specification

**Status:** Accepted handoff specification

**Date:** 2026-08-28

**Decision:** GO for a six-week validation prototype; no commitment yet to a
commercial platform, marketplace, or generalized plugin ecosystem.

## 1. Product thesis

Wisp is a **playable creative workspace**, not a game with productivity pasted
on top and not a conventional AI canvas with decorative characters.

The product turns one real Brief into an editable, exportable Artifact through
a visible team of Wisps. The selected Style Profile shapes both the user's
Studio and the work produced inside it. A finished Artifact can occupy a real
display slot in that Studio.

The differentiating promise is:

> Real creative work becomes a process you can see, direct, edit, reuse, and
> inhabit.

AI and AIGC enrich the collaborators. They are not the core mechanic. The core
interaction is moving a real Project through a legible creative loop and taking
ownership of both the useful result and the world that remembers it.

## 2. Who v0 is for

### Primary user

An AI-curious solo creator, product maker, marketer, or small-team generalist
who regularly needs a social poster, cover, announcement image, or simple brand
visual but does not want to begin with an empty professional design tool.

They value:

- a useful result in one short session;
- structured choices instead of prompt engineering;
- enough direct editing to make the result truly theirs;
- a workspace with identity and visible continuity;
- inspecting how a creative result was assembled.

### Not the v0 user

- a professional designer expecting Figma-level vector editing;
- a player seeking combat, collection, farming, or a progression-heavy game;
- an enterprise team requiring multiplayer review, permissions, SSO, or audit;
- a developer expecting arbitrary code plugins or a universal agent framework.

## 3. Worldview

Each User has exactly one Studio. In the world's language, that Studio is the
User's private Universe; it is not a container holding several businesses.

Wisps（灵思）are embodied fragments of creative intent. “Wisp” is an evocative
brand metaphor, not a translation claim. Every Wisp has a visible role,
capability set, Creative Loop, and appearance. They collaborate on the User's
real Projects; they are not fictional customers, generic NPCs, or simulated
employees.

The Multiverse is formed by many users' radically different Studios. Visiting
another Studio is described as crossing into another Universe. Sharing and
Remix preserve provenance and create an independent copy; they do not imply a
single shared world or realtime co-ownership.

Two resources have separate meanings:

- **Spark（灵能）** is spendable generation capacity and exists only where an
  operation has real marginal cost.
- **Resonance（共鸣度）** is non-spendable growth earned when real work is
  completed, exported, adopted, displayed, shared, or Remixed.

v0 has no paid Spark, stamina timer, daily mission, fictional coin, or seasonal
FOMO. A resource is introduced only when the prototype contains the real event
it represents.

## 4. The ten-minute first session

The first session is the user's **Studio Opening Project**. It produces a real
opening poster that can also be used as a social announcement; it is not a
system quest from a fictional client.

| Time | User action | System response | Validation purpose |
| --- | --- | --- | --- |
| 0:00–1:00 | Name the Studio and choose one of two Style Profiles. | The same base room changes materials, lighting, camera treatment, UI accent, and Wisp appearance. | Prove the Studio is personal before asking for work. |
| 1:00–3:00 | Fill a structured Brief: audience, format, exact headline, supporting text, intent, style chips, and optional notes/reference. | The Brief Wisp marks missing constraints and presents a compact contract. | Remove prompt-writing as the entry barrier. |
| 3:00–5:30 | Confirm the Wisp team and spend one Spark in live mode. | Art Director creates a structured Creative Spec; Maker requests a text-free visual; Typesetter assembles exact text and layout. Progress is visible in the Studio. | Make the production process legible rather than a spinner. |
| 5:30–8:30 | Choose a variant and open the Poster Workbench. | The user can change text, font choice, color, image crop, scale, position, and layer order. | Establish authorship and practical usefulness. |
| 8:30–10:00 | Export PNG and place it in a Studio display slot. | The poster appears in the room; the Project becomes complete and Resonance increases. | Deliver the combined utility/world aha moment. |

The primary aha moment is:

> The style I chose affected both my world and a useful piece of work; I could
> edit that work, export it, and see my Studio remember it.

The generation itself is not sufficient evidence of an aha moment.

## 5. Core loop

```text
Brief
  → choose visible Wisp team
  → create a structured Creative Spec
  → generate and assemble an Artifact
  → inspect, edit, and approve in its Workbench
  → export/use the Artifact
  → display it in the Studio
  → reuse the Project or start the next real Brief
```

The Studio is the orchestration, memory, and display surface. The Workbench is
the direct editor. Neither replaces the other.

The world may communicate progress through movement, staging, expressions,
props, and room lighting, but business state remains explicit in DOM UI. The
user never has to walk an avatar to reach a control.

## 6. v0 Wisp team

v0 uses one explicit Creative Loop rather than a general workflow graph.

| Wisp | Responsibility | Mechanism |
| --- | --- | --- |
| **Brief Wisp** | Validates required intent, audience, exact copy, and output shape. | Deterministic form/schema checks. |
| **Art Director Wisp** | Converts the Brief and Style Profile into a stored `CreativeSpecV1`. | One structured-output text-model call in live mode; deterministic fixture in demo mode. |
| **Maker Wisp** | Produces a text-free hero image or background from the Creative Spec. | One image-generation call in live mode; bundled fixture in demo mode. |
| **Typesetter Wisp** | Builds editable text and image layers with exact user copy. | Deterministic poster template rules. |

The user sees these as collaborators, while implementation remains a linear,
resumable state machine:

```text
draft → validating → directing → generating → assembling → ready
                     └──────────── failed ◄──────────────┘
```

The run log stores inputs, normalized outputs, model snapshot identifiers,
usage, cost metadata, and errors. It does not store or expose private model
chain-of-thought.

## 7. Artifact and Workbench

v0 implements one Artifact type: **Poster**, fixed initially at 1080 × 1350.

`PosterDocumentV1` supports only the current editable concepts:

- solid or image background;
- image layers referencing stable local asset IDs;
- text layers with exact text, font family, size, weight, color, alignment,
  position, rotation, and width;
- layer order;
- version and provenance metadata.

It does not define a universal design document, arbitrary vector paths,
components, constraints, video tracks, webpages, or code files. A second real
Artifact type must exist before shared artifact abstractions are extracted.

The Workbench must support:

- select, move, resize, and rotate image/text layers;
- edit exact text and its basic typography;
- change background and text colors;
- undo/redo for the current session;
- deterministic PNG export;
- reopen after a browser reload without losing assets.

## 8. World and style model

v0 ships one first-party base Studio kit and two visually distinct Style
Profiles. Using one spatial shell controls asset cost while still testing the
central promise that style changes both world and output.

Suggested profiles:

- **Warm Atelier** — wood, paper, warm light, restrained editorial typography;
- **Neon Pixel Lab** — dark surfaces, neon accents, nearest-neighbor sprite
  treatment, compact display typography.

Each profile supplies bounded structured context:

- palette tokens;
- typography choices from bundled, licensed fonts;
- lighting and camera preset;
- texture sampling and optional virtual resolution;
- composition tags and layout rules;
- tone tags and prohibited treatments;
- references to first-party assets.

Natural-language style notes are data, never system instructions. They are
length-limited, delimited, and passed to models as untrusted creative context.

The Studio initially contains fixed semantic slots:

- Wisp spawn and activity anchors;
- one poster/display slot;
- one sign/decal slot;
- fixed props and navigation-free camera anchors.

v0 allows changing slot content, not arbitrary world construction.

## 9. Scope

### Included

- one local User and exactly one persistent Studio;
- one base World Kit with two Style Profiles;
- four first-party Wisps and one explicit opening Creative Loop;
- structured Brief entry with optional free-text details;
- one Poster Artifact and media-specific Workbench;
- deterministic demo provider plus opt-in live text/image providers;
- local-first project, run, document, and blob persistence;
- one poster display slot inside the Studio;
- PNG export;
- local product-event capture for validation metrics;
- versioned, strict, data-only World Kit v0 protocol;
- responsive desktop browser experience, with mobile viewing as a technical
  compatibility check rather than an authoring promise.

### Explicitly excluded

- accounts, cloud sync, public profiles, visits, community publishing, Remix
  UI, marketplace, commissions, payment, or monetization;
- realtime multiplayer, collaborative editing, CRDTs, comments, or permissions;
- more than one Studio per User;
- fictional clients, quests, daily tasks, levels, combat, farming, or seasons;
- arbitrary JavaScript, WASM, shaders, external network requests, or executable
  code in community content;
- arbitrary 3D authoring formats at runtime;
- universal workflow DAG, event bus, DI container, ECS, renderer registry, or
  plugin marketplace;
- full 3D world editor, generated scene geometry, custom Wisp skeletons, or
  user-authored animation graphs;
- Figma/Canva parity, video, code, webpage, or multi-page document editing.

## 10. Domain invariants

1. `User 1:1 Studio`; a Universe is the Studio's worldview identity, not a
   parent entity.
2. Real Projects are the product mainline; the system does not fabricate work.
3. A Wisp performs a role in a Project; it does not own a Project or a Studio.
4. Persisted documents contain product concepts and stable asset references,
   never Babylon.js, Konva, DOM, or vendor SDK objects.
5. A Style Profile influences world presentation and structured creative
   context through inspectable fields, not a hidden prompt.
6. Spark tracks real marginal generation cost; Resonance cannot be spent.
7. A Remix is independent and preserves provenance; it is not an overwrite.
8. Public content is declarative, versioned, validated, and treated as
   untrusted.

Canonical definitions live in [`CONTEXT.md`](../../../CONTEXT.md).

## 11. Architecture

Use a small TypeScript modular monolith with one browser app, one minimal Node
API, and one shared protocol package:

```text
apps/web
├── app composition and routes
├── workspace aggregate and commands
├── creative-session state machine
├── studio world projection (Babylon.js)
├── poster workbench (React + Konva)
├── local persistence (Dexie/IndexedDB)
└── validation telemetry

apps/server
├── normalized generation endpoints
├── budget, rate-limit, idempotency, and redacted logs
├── deterministic demo adapters
└── one OpenAI text adapter + one GPT Image adapter

packages/protocol
├── World Kit schemas
├── persisted document schemas
└── browser/server request and response schemas
```

This is one bounded product context, despite having three build packages.

### Deep modules and seams

| Module | Small external interface | Owns | Must not own |
| --- | --- | --- | --- |
| `Workspace` | load, execute command, subscribe, save | Serializable Studio, Projects, Artifacts, runs, Resonance | Render-engine objects, network calls |
| `WorldKitImporter` | inspect and import a package | Strict schema, hashes, path and asset budgets, normalized kit | Scene lifecycle, arbitrary code |
| `StudioRuntime` | mount, project snapshot, pick, capture, dispose | Babylon engine/scene, world projection, resource cleanup | Product persistence, vendor state |
| `CreativeSession` | start, resume, retry a typed step | Explicit state transitions and run record | Generic workflow graph, vendor SDK types |
| `PosterWorkbench` | open document, apply command, export | Poster editing behavior and transient Konva projection | Universal artifact model, Studio scene |
| `GenerationGateway` | direct and generate image | Remote credentials, model snapshots, retries, budgets, normalized errors | UI or Project orchestration |
| `WorkspaceStorage` | load and save workspace/assets | Dexie schema, IndexedDB transactions, migrations, blob lifetime | Domain decisions, renderer objects |

The browser's serializable Workspace is the source of truth. Babylon and Konva
are projections. Direct commands and specific callbacks carry changes back;
there is no generic event bus.

`StudioRuntime` is a concrete Babylon.js module, not a renderer-neutral
interface. `WorkspaceStorage` is likewise one concrete Dexie deep module,
tested against `fake-indexeddb` rather than hidden behind a speculative
repository interface. `GenerationGateway` is the one true adapter seam because
paid remote providers, secrets, normalized failures, and a deterministic demo
implementation are current requirements.

## 12. Technical baseline

Versions below are the implementation baseline verified on 2026-08-28. The
first scaffold must pin exact versions in `pnpm-lock.yaml`; routine upgrades do
not change the product specification.

| Concern | Choice |
| --- | --- |
| Runtime/package manager | Node.js 24.20.0 LTS, pnpm 11.24.0 |
| Language/build | TypeScript 7.0.2, Vite 8.2.2 |
| UI/state/schema | React 19.2.8, Zustand 5.0.15, Zod 4.4.3 |
| World | Babylon.js 9.23.0, WebGL2 baseline |
| Workbench | Konva 10.3.2, react-konva 19.2.5 |
| Local persistence | Dexie 4.4.5 over IndexedDB |
| API | Fastify 5.12.1, OpenAI SDK 7.8.0 |
| Tests | Vitest 4.1.11, Playwright 1.62.1, Babylon NullEngine |
| Live model snapshots | `gpt-5.6-luna`; `gpt-image-2-2026-04-21` |

Node recommends production applications use an LTS release. Babylon.js
supports WebGL and WebGPU side by side, but v0 content cannot depend on
WebGPU-only behavior. glTF 2.0/GLB is the canonical runtime 3D format because it
is an API-neutral delivery format rather than an authoring format.

Primary references:

- [Node.js release status](https://nodejs.org/en/about/previous-releases)
- [Babylon.js repository](https://github.com/BabylonJS/Babylon.js)
- [Babylon.js WebGPU support](https://github.com/BabylonJS/Documentation/blob/master/content/setup/support/webGPU.md)
- [Khronos glTF 2.0 specification](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html)
- [GPT Image 2 model](https://developers.openai.com/api/docs/models/gpt-image-2)

## 13. Model-cost and privacy controls

Demo mode is the default and must exercise the complete UI with deterministic
fixtures at zero API cost. Live mode is an explicit server configuration.

Live mode requires:

- API keys only on the server;
- one text-model call and at most one image-model call per initial run;
- an idempotency key per run step;
- a configurable daily hard budget and per-session generation cap;
- usage recorded once even after a retry;
- bounded retry only for classified transient failures;
- server-side rate limiting and maximum request sizes;
- redacted logs with no Brief body, reference image, API key, or generated
  image by default;
- model snapshot IDs stored with the run;
- an explicit user notice before sending Brief/reference data to a provider;
- local deletion that removes Project metadata and stored blobs.

Spark is debited only after a provider accepts a billable request. Failed,
deduplicated, or demo requests do not consume it.

## 14. Extension strategy

Community extension happens in increasing order of risk:

1. **World Kit and Style Profile data** — public v0 protocol, strict and
   executable-code-free.
2. **Wisp presets** — share roles, appearance, model/tool references, and
   bounded settings after two first-party presets prove common fields.
3. **Creative Loop manifests** — freeze only after two working loops exist;
   manifests select host-registered capabilities and declare permissions.
4. **Trusted implementation packages** — installed by a host maintainer, not
   executed from a downloaded community world.

An Agent Loop may eventually be a plugin, but v0 must not confuse a future
extension seam with an arbitrary-code distribution system. The public protocol
describes data and requested capabilities; the host decides which trusted
implementation can satisfy them.

## 15. Validation plan and GO gates

Recruit 10–15 people matching the primary user. At least half should bring a
real poster/announcement need rather than follow a supplied toy prompt.

### Behavior gates

The prototype advances only if:

- at least 70% export a first acceptable Poster within 10 minutes without
  operator intervention;
- at least 50% make a direct Workbench edit rather than accepting the first
  output unchanged;
- at least 40% voluntarily begin a second real Project in the session or return
  within 48 hours;
- at least 60% can explain, unprompted, how the Style Profile affected both the
  Studio and the Artifact;
- at least 30% choose to place/export/share the result because they value the
  persistent Studio, not merely the generated image;
- at least 5 of 10 interviewed users name one recurring real task for which
  they would prefer Wisp over a plain chatbot plus ordinary editor.

The second-Project behavior is the strongest commercial signal. Compliments,
time spent watching Wisps, and willingness to customize the room are secondary.

### Technical gates

- saved Projects and blobs reopen after reload with no expiring vendor URL;
- unsupported or malicious World Kits fail closed with useful diagnostics;
- switching/reloading the reference world 20 times does not show continuing
  GPU/resource growth;
- the reference scene works in current Chrome, Safari, and one Android
  mid-range device using the WebGL2 path;
- a vendor outage still permits the full demo path with clearly labelled
  fixtures;
- no user content or model key appears in client bundles or default logs;
- PNG export is deterministic at 1080 × 1350.

## 16. Kill, pivot, and expansion rules

### Kill the world-heavy direction when

- users finish the Artifact but consistently ignore the Studio display;
- the world adds more than two minutes before useful work without improving
  second-Project behavior;
- maintaining the 3D layer consumes more effort than the Artifact workflow and
  has no measured effect on preference or return.

In that case, retain the Wisp orchestration and Workbench as a lighter visual
product rather than protecting sunk world-engine work.

### Pivot the artifact direction when

- target users bring a different repeated task more often than posters;
- users export the generated image but avoid direct editing because the
  Workbench is too shallow;
- exact typography/layout, rather than image generation, dominates failure.

### Expand only after evidence

- second World Kit → kit catalog and comparison-derived registry;
- second image provider → provider selector;
- second Artifact type → artifact union and Workbench routing;
- second Creative Loop → public loop manifest;
- real public sharing → account, snapshot, provenance, moderation, and license
  enforcement design;
- real second renderer → extract only the interface shared by two working
  implementations;
- repeated team collaboration demand → operation model first, CRDT choice
  second.

## 17. Durable decisions and remaining gates

Accepted:

- Wisp product name, `wispwork` repository, intended `wisp.work` address;
- one Studio per User; Studio is the private Universe;
- real Projects, no fictional work economy;
- Studio world plus media-specific Workbench;
- Babylon.js, WebGL2-first, GLB runtime, declarative World Kits;
- noncommercial source-available licensing;
- v0 Poster wedge and six-week validation scope.

Not accepted yet:

- a full commercial build;
- a public community or marketplace;
- paid Spark or any monetization model;
- multiplayer/visits implementation;
- public Wisp or Creative Loop plugin ABI;
- Unity, PlayCanvas, or another renderer as a supported runtime;
- a custom reciprocal license legally forcing upstream publication.

Implementation follows
[`docs/superpowers/plans/2026-08-28-wisp-v0.md`](../plans/2026-08-28-wisp-v0.md).
