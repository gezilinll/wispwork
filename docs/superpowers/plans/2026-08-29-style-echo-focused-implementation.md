# Style Echo Focused Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> `superpowers:subagent-driven-development` (recommended) or
> `superpowers:executing-plans` to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking. Complete exactly one top-level task
> and PR, then stop for the maintainer to merge before starting the next task.

**Goal:** Deliver five small, runnable browser increments culminating in one deterministic Poster that coherently shapes Studio, DOM, Typesetter Wisp, persistence, and export.

**Architecture:** A root Vite/React application owns one serializable opening
state. Concrete projections feed DOM controls, one Babylon `StudioRuntime`,
one concrete Opening Studio scene module, and one Canvas 2D Poster renderer;
one versioned `localStorage` key stores only the last adopted snapshot, while a
separate validated key stores locale preference. This is an internal bundled
slice, not a World Kit importer, asset framework, renderer abstraction, or
general Artifact system.

**Tech Stack:** Node 24.20.0, pnpm 11.24.0, TypeScript 7.0.2, React
19.2.8, Vite 8.2.2, Babylon.js core/loaders 9.23.0, Blender 4.5.13 LTS
as an offline authoring tool, Canvas 2D, Zod 4.5.2, Vitest 4.1.11, and
Playwright 1.62.1.

**Specs:**
[`docs/superpowers/specs/2026-08-29-style-echo-slice.md`](../specs/2026-08-29-style-echo-slice.md)
and
[`docs/superpowers/specs/2026-08-29-wisp-visual-constitution.md`](../specs/2026-08-29-wisp-visual-constitution.md)

**Acceptance:** The original plan is merged. The maintainer accepted this
asset-first corrective implementation authority in chat on 2026-08-30.

## Global constraints

- All files belong to `wispwork`; `wispwork-server` receives no change.
- Start every task after Task 1 from newly merged `origin/main` on the named
  branch. Task 1 continues on `feat/style-echo-opening-studio` from fixed base
  `origin/main@6a005e1`; its one-time atomic review-load exception remains
  accepted. Later tasks return to the 500 non-generated line and 15
  substantive-file guards.
- Use author and committer `linbinghe <linbinghe@gmail.com>`.
- Each top-level task has one visible outcome, red-green cycles, two-axis
  `$code-review` against its fixed `origin/main`, one PR, and a hard stop for
  manual merge.
- Run local pnpm commands through `fnm exec --using=24.20.0`; default-shell Node 23.3.0 cannot run pnpm 11.24.0. CI uses its pinned runtime action.
- Support current macOS Chrome at a viewport of at least 1280 x 720 with a fine
  primary pointer. CI uses Playwright Chromium for the supported boundary and
  proves that a smaller viewport or coarse pointer receives the desktop-only
  DOM notice before Babylon initializes. Mobile/tablet authoring, Safari, and
  Android real-device automation are deferred.
- `Warm Atelier` is the initial preview and `Neon Pixel Lab` the only
  alternative. No neutral state, wizard, login, Backend, provider, credential,
  runtime-remote asset, or cross-origin request.
- Warm Atelier is the reference World Kit. Its first frame uses a controlled
  weak-perspective three-quarter home view, an open-cutaway Studio on one
  visible floating fragment, and a human-reviewed tangible/anomaly hierarchy;
  the composition principle is not a pixel or triangle quota.
- Aim for a mid-detail handcrafted result through clear silhouettes,
  restrained PBR, textures/decals, and low prop density. The first Task 1
  candidate passed its engineering checks but failed the mature-handcrafted
  human gate; procedural thin tubes, cylinders, and unbeveled hero boxes are
  not an acceptable fallback. Content-preserving CC0 furniture is a source
  input beneath first-party composition, material, scale, lighting, and
  augmentation. Its untouched promotional look or a toy-like room fails.
- Users do not control an avatar or a free camera. Keep zoom/orbit bounded and
  preserve a stable home composition; reduced motion removes camera
  transitions without removing meaning.
- The bundled World Kit owns projection, camera/lighting presets, geometry, and
  semantic layout. A Style Profile overlays only allowlisted cosmetic values:
  DOM tokens, material tint, bounded light color/intensity, sampling, Wisp
  treatment, and Poster composition. Sampling changes stay inside profile-owned
  accents rather than replacing the scene-wide render profile. Apply Kit
  baseline first; an unsupported profile value fails closed or falls back to
  it.
- For this slice, record first useful DOM frame and first interactive Studio
  frame separately, then target a steady 60 FPS home view on the demo laptop.
  A Poster display-texture replacement must introduce no main-thread task over
  100 ms, and the 20-cycle resource gate remains blocking. Android 30 FPS and
  pointer-to-highlight latency are not evaluated because Android automation and
  a picking/highlight consumer are outside this slice; do not report them as
  passed.
- Limits are 24 characters for Studio name, 36 for exact headline, and 72 for optional supporting line. Test maximum Chinese/Latin values in both compositions without truncation or rewriting.
- Poster preview, display texture, and export use the same 1080 x 1350 renderer. Persist inputs, profile/asset versions, and revision; regenerate pixels instead of storing PNG blobs.
- User exports may be commercial. Poster-bound material is first-party with an explicit output grant, CC0, or OFL; raw CC BY and final-product-only assets are excluded.
- Task 1 commits one editable `opening-studio.blend` and two exported GLBs
  under the repository default PolyForm Noncommercial license for their
  first-party authored content; embedded Poly Haven image data remains CC0.
  The tiny `bpy` export helper alone is GPL-3.0-or-later, carries an SPDX
  header, and is accompanied by the full license text; it contains no modeling
  data. The official Blender binary is verified and used from a temporary
  mount but is neither committed nor required by CI. The two first-party GLBs
  total at most 2,000,000 bytes; all new Opening Studio runtime assets total at
  most 7,000,000 bytes; the complete home scene stays at or below 50,000
  triangles.
- Keep Babylon concrete. Use React reducer/context, native Canvas 2D, one
  versioned adopted-state key, one separate locale-preference key, and Zod only
  at adopted-state persistence. A small typed English/Chinese dictionary earns
  no i18n framework. Do not add Zustand, Dexie, Konva, router, DI, event bus,
  generic repository, renderer adapter, plugin registry, or public protocol
  fields.

## Dependency and asset evidence

Exact metadata was rechecked against the official npm registry on 2026-08-29. A temporary full-graph install using the pinned runtime and `pnpm audit --registry=https://registry.npmjs.org --audit-level=high` reported `No known vulnerabilities found`.

| First consumer | Exact packages | License | Why earned |
| --- | --- | --- | --- |
| Task 1 | `react@19.2.8`, `react-dom@19.2.8`, `@babylonjs/core@9.23.0` | MIT / Apache-2.0 | DOM product shell and accepted renderer |
| Task 1 | `vite@8.2.2`, `@vitejs/plugin-react@6.1.1`, `typescript@7.0.2` | MIT / Apache-2.0 | Build and type checking |
| Task 1 | `vitest@4.1.11`, `@playwright/test@1.62.1` | MIT / Apache-2.0 | Concrete module and real-browser seams |
| Task 2 | `@testing-library/react@16.3.3`, `@testing-library/user-event@14.6.6`, `@testing-library/jest-dom@7.0.1`, `jsdom@30.0.1` | MIT | DOM behavior, not component snapshots |
| Task 2 | `@fontsource-variable/noto-sans-sc@5.3.0` | OFL-1.1 | Bundled Chinese/Latin Canvas determinism |
| Task 1 | `@babylonjs/loaders@9.23.0` | Apache-2.0 | First bundled GLB consumer |
| Task 4 | `zod@4.5.2` | MIT | Corrupt/versioned storage rejection |

Task 1 uses the official Blender 4.5.13 LTS macOS Apple Silicon distribution
only as an offline authoring tool. Its SHA-256 is
`663ce944257c61ff1d6aa09e15c8f57bbd8d59023adb2fa7edde33a9ed960b53`.
Blender is GPL software, but its official license states that authored data and
exports remain the creator's property. A distributed script that calls `bpy`
must be GPL-compatible, so only the generic export helper receives the
file-specific GPL-3.0-or-later exception.

Task 1 vendors the content-preserving Poly Haven CC0 runtime set documented in
[`docs/research/2026-08-30-opening-studio-runtime-assets.md`](../../research/2026-08-30-opening-studio-runtime-assets.md):

| Runtime file | Bytes | SHA-256 |
| --- | ---: | --- |
| `WoodenTable_01_1k.glb` | 553,416 | `e903397a741e5ab9a3007686f63bde242e5f5ac106d239bcac85e8fe6bf77470` |
| `painted_wooden_cabinet_1k.glb` | 1,857,648 | `cc30f8c6487f7fd3bdb4bc6c3d176d1a0097c4550f557ea07b1238237f134793` |
| `fine_grained_wood_col_1k.jpg` | 336,305 | `d171f45ef01bc6e239b00dfaa4961bcd27f7d8e93e3962da3bd3d0ce703d802c` |
| `fine_grained_wood_nor_gl_1k.jpg` | 193,626 | `ba95eadc009818e161d0f753191f1bacc3fc861e593be0bc6d82b437f9ec8044` |
| `fine_grained_wood_arm_1k.jpg` | 247,999 | `3928796cc98b380cd254dc67e9246e60027ef349edb5f75033cc6f3b34572450` |
| `plastered_wall_03_diff_1k.jpg` | 555,233 | `3d60687bae1d9cd2c14a46c4b2673e0fe753cf4b5eb82c22cc399271e16d8d5b` |
| `plastered_wall_03_nor_gl_1k.jpg` | 530,434 | `c913b9c5f04e499b11f5f5a0214c0a388038f850ccf1084ca84087e1c59dd304` |
| `plastered_wall_03_arm_1k.jpg` | 283,693 | `ab7cb38d62472e5fb23ec086873352c45bbca64c800b2e6d9b1efdb42c9ceb1a` |

These eight files total 4,558,354 bytes. The source URLs, source-file hashes,
`@gltf-transform/cli@4.2.1 copy` conversion, authors, acquisition date,
official API identities, CC0 grant, final hashes, and selected-file inventory
are recorded in `public/assets/ASSETS.md` and enforced by
`scripts/verify-assets.mjs`. Kenney, KayKit, and Quaternius do not enter the
Opening Studio bundle. The source archives and deterministic audit ZIP remain
research evidence outside Git.

## Shared implementation contracts

These names are internal application contracts, not public protocols:

```ts
export type StyleProfileId = "warm-atelier" | "neon-pixel-lab";
export type Locale = "en" | "zh-CN";
export type OpeningCopy = Readonly<{
  studioName: string; headline: string; supportingLine: string;
}>;
export type AcceptedOpeningV1 = Readonly<{
  schemaVersion: 1; revision: number;
  profileVersion: "style-echo-profiles-v1";
  assetVersion: "style-echo-assets-v1"; profileId: StyleProfileId;
  copy: OpeningCopy;
}>;
export type OpeningState = Readonly<{
  preview: { profileId: StyleProfileId; copy: OpeningCopy };
  accepted: AcceptedOpeningV1 | null; error: string | null;
  status: "previewing" | "adopted" | "failed";
}>;
```

```ts
export type StyleProfile = Readonly<{
  id: StyleProfileId; dom: DomStyleProjection; studio: StudioStyleProjection;
  wisp: WispStyleProjection; poster: PosterStyleProjection;
}>;

type DomStyleProjection = Readonly<{ page: string; panel: string; ink: string;
  accent: string; fontFamily: string }>;
type StudioStyleProjection = Readonly<{
  clear: string; keyLight: string; materialTint: string;
  surfaceTreatment: "soft-pbr" | "pixel-mixed";
}>;
type WispStyleProjection = Readonly<{ body: string; glow: string;
  treatment: "orb-ring" | "voxel" }>;
type PosterStyleProjection = Readonly<{ background: string; ink: string;
  accent: string; fontFamily: string;
  composition: "warm-editorial" | "neon-grid" }>;
type OpeningPosterPlan = Readonly<{
  width: 1080; height: 1350; copy: OpeningCopy; style: PosterStyleProjection;
  textRuns: ReadonlyArray<Readonly<{
    role: "issuer" | "headline" | "supporting"; text: string;
    lines: readonly string[];
  }>>;
}>;

export function composeOpeningPoster(copy: OpeningCopy,
  profile: StyleProfile): OpeningPosterPlan;
export async function renderOpeningPoster(canvas: HTMLCanvasElement,
  plan: OpeningPosterPlan): Promise<void>;
```

```ts
export type OpeningStudioSceneMount = Readonly<{
  containers: readonly AssetContainer[];
  roots: Readonly<{
    shell: TransformNode; workbench: TransformNode;
    archive: TransformNode; display: TransformNode;
  }>;
  styleMaterial: PBRMaterial;
  triangleCount: number;
}>;
export type MountOpeningStudioScene =
  (scene: Scene) => Promise<OpeningStudioSceneMount>;
export async function mountOpeningStudioScene(
  scene: Scene,
): Promise<OpeningStudioSceneMount>;

type StudioRuntimeOptions = Readonly<{ onFault(fault: StudioFault): void;
  testEngine?: AbstractEngine;
  testSceneMount?: MountOpeningStudioScene }>;
export class StudioRuntime {
  constructor(options: StudioRuntimeOptions);
  mount(canvas: HTMLCanvasElement | null, kit: StudioKitProjection): Promise<void>;
  project(projection: StudioProjection): void;
  returnToOverview(): void;
  replaceDisplayAsset(asset: StudioDisplayAsset | null): Promise<void>;
  readOwnedResourceCounts(): StudioResourceCounts;
  readSceneDiagnostics(): StudioSceneDiagnostics;
  dispose(): Promise<void>;
}

type StudioKitProjection = Readonly<{
  id: "opening-studio-v1";
  camera: Readonly<{ projection: "perspective";
    preset: "weak-perspective-three-quarter"; fov: 0.58 }>;
}>;
type StudioDisplayAsset = Readonly<{ id: string; blob: Blob }>;
type StudioProjection = Readonly<{
  style: StudioStyleProjection; wisp: WispStyleProjection;
  wispCue: "idle" | "previewing" | "displaying";
  acceptedRevision: number | null; displayAssetId: string | null;
}>;
type StudioResourceCounts = Readonly<{
  engines: number; scenes: number; meshes: number; materials: number;
  textures: number; observers: number; containers: number;
}>;
type StudioSceneDiagnostics = Readonly<{
  triangleCount: number;
  semanticRoots: readonly [
    "studio-shell", "studio-workbench", "studio-archive",
    "studio-artifact-display",
  ];
}>;

export function loadAcceptedOpening(storage: Pick<Storage, "getItem">): AcceptedOpeningV1 | null;
export function saveAcceptedOpening(storage: Pick<Storage, "setItem">,
  snapshot: AcceptedOpeningV1): void;
export function adoptOpening(state: OpeningState,
  storage: Pick<Storage, "setItem">): OpeningState;
```

Production omits both test options and passes its canvas. Unit tests inject a
concrete `NullEngine` plus a narrow in-memory `testSceneMount`; the executable
asset verifier separately loads all four real GLBs into `NullEngine`, and
Playwright exercises the production URL loader in WebGL2. This keeps Node file
I/O out of the browser bundle without inventing a production asset interface.
No Poster canvas crosses the boundary: the renderer supplies an ID plus Blob,
and `StudioRuntime` owns URL/texture replacement and disposal. This remains a
concrete module, not a renderer-neutral interface.

`styleMaterial` is the one profile-owned accent material used by brass and
anomaly accents. Authored wood, plaster, and glass keep their World Kit base
materials; a Style Profile cannot replace those source materials or geometry.

## Deterministic acceptance map

| Spec requirement | First proving task | Blocking evidence |
| --- | --- | --- |
| 1. Exact copy survives composition | Task 2 | Poster unit tests plus real Chromium maximum Chinese/Latin inputs |
| 2. Both profiles project four surfaces | Task 3 | Exact record tests plus repeated Warm/Neon browser switches |
| 3. Preview does not overwrite adopted output | Task 4 | Adopt A / preview B state and output-hash assertions |
| 4. Adoption is atomic | Task 4 | Throwing-storage unit test and successful revision test |
| 5. Reload restores accepted output | Task 5 | Seeded-storage reload browser case |
| 6. PNG is 1080 × 1350 and accepted-only | Task 4 | IHDR parse and accepted-revision hash |
| 7. No Backend/provider request | Task 5 | Browser request log restricted to same-origin app/font/GLB files |
| 8. Twenty complete lifecycles clean up | Task 4 | Per-cycle owned counts, containers, and revoked object URLs |
| 9. Keyboard-only flow works | Task 5 | Tab/arrow/Enter/Space Playwright path |
| 10. Failed WebGL preserves DOM work | Tasks 1 and 5 | Localized fault/retry plus usable Poster DOM path |
| 11. Unsupported devices skip Babylon/assets | Tasks 1 and 5 | Small/coarse browser cases with zero asset requests |
| 12. Browser locale and manual locale persist | Tasks 1 and 5 | Chinese/English reload cases using the separate locale key |

The two records pin these projection values:

| Profile | DOM page/panel/ink/accent | Studio clear/key/tint/treatment | Wisp body/glow/treatment | Poster |
| --- | --- | --- | --- | --- |
| Warm Atelier | `#f2e7d5` / `#fffaf1` / `#2b2118` / `#c56d42` | `#201a16` / `#ffd3a0` / `#a96f42` / `soft-pbr` | `#f7d49a` / `#dc8c52` / `orb-ring` | `warm-editorial` |
| Neon Pixel Lab | `#090b17` / `#11162a` / `#eef2ff` / `#3df2ff` | `#050715` / `#7b61ff` / `#171b3d` / `pixel-mixed` | `#3df2ff` / `#ff4fd8` / `voxel` | `neon-grid` |

The `opening-studio-v1` Kit pins `perspective` /
`weak-perspective-three-quarter` / FOV `0.58`; switching either profile leaves
that camera and the Studio shell unchanged.

The Opening Studio DOM is a compact upper-right card over a world-dominant
canvas. React renders it before Babylon and keeps it authoritative through
loading, ready, unsupported-device, and renderer-fault states. Initial locale
follows the browser unless the separate validated preference key contains
`en` or `zh-CN`; switching locale persists only that preference. The exact
Task 1 copy is:

| State | `zh-CN` | `en` |
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

## Task 1: Opening Studio

**Branch / PR:** `feat/style-echo-opening-studio` / `feat: open the Warm Atelier Studio`

**Review-load exception:** On 2026-08-30 the maintainer explicitly approved
one atomic exception to the 500-line/15-substantive-file guards for this task.
The already-confirmed grill, localization calibration, and selected visual
north star remain in the same PR as the first runnable scaffold because
splitting them would create a second documentation-only review. Keep them and
the functional implementation in two focused commits so each review surface
remains inspectable. This exception does not carry into Task 2 or later work.

**State at recalibration:** The selected north star, localized DOM-first shell,
supported-device gate, Babylon runtime, camera/reset, WebGL fault/retry, unit
tests, Playwright path, lifecycle evidence, and GitHub quality job already
exist in commits `d32c98c` and `2cbb1a3`. The candidate is engineering-green
but must not be submitted because its procedural hero forms fail Visual
Constitution item 3. The work below replaces that visual foundation; it does
not rebuild accepted DOM and camera behavior.

**Visible outcome:** A fresh checkout opens a mature Warm Atelier that reads as
a handcrafted creative Studio on a floating private-Universe fragment. The
workbench is the first focal form, the curved shell the second, and the empty
Artifact display remains legible before the dormant anomaly. Existing
localization, bounded orbit/zoom, overview reset, unsupported-device behavior,
and truthful fault/retry continue to pass.

**Create:** `assets/opening-studio/opening-studio.blend`,
`LICENSES/GPL-3.0-or-later.txt`,
`scripts/export-opening-studio-assets.py`, `scripts/verify-assets.mjs`,
`src/studio/openingStudioScene.ts`, `public/assets/ASSETS.md`,
`public/assets/opening-studio/CC0-1.0.txt`, two first-party GLBs, two Poly
Haven GLBs, and six Poly Haven material JPEGs under
`public/assets/opening-studio/`.

**Modify:** `.gitattributes`, `.gitignore`, `LICENSE-SCOPE.md`, `package.json`,
`pnpm-lock.yaml`, `src/studio/StudioRuntime.ts`,
`src/studio/StudioRuntime.test.ts`, `tests/e2e/opening-studio.spec.ts`, this
plan, and the accepted Style Echo specification. `StudioViewport.tsx`,
`WispApp.tsx`, locale code, and CSS change only if a failing retained-behavior
test proves asset readiness requires it.

The following three work packages belong to this one Task 1 PR. Local fixup
commits are recoverability checkpoints, not separate maintainer merge gates.

### Task 1.1: Build the licensed, verifiable asset bundle

**Interfaces:** The `.blend` source contains only `Runtime_Shell` and
`Runtime_Display` export collections. Exported mesh names begin with `wood__`,
`plaster__`, `brass__`, or `glass__`; runtime assignment depends on these four
prefixes and no other authoring metadata. This work produces the ten runtime
files and `pnpm assets:verify`.

- [ ] **Step 1: Write the asset verifier before adding assets.** Create
  `scripts/verify-assets.mjs` with the eight known Poly Haven paths, byte sizes,
  and SHA-256 values from the dependency table; require the absent `.blend`,
  two first-party GLBs, asset manifest, and license notices. Implement
  `sha256(path)`, `readGlbJson(path)`, and `loadGlbWithNullEngine(path)`. The GLB
  reader validates magic/version/JSON and rejects required Draco, Meshopt, or
  KTX2 extensions. The Babylon path is:

  ```js
  const bytes = new Uint8Array(await readFile(absolutePath));
  const container = await LoadAssetContainerAsync(bytes, scene, {
    pluginExtension: ".glb",
    name: basename(absolutePath),
  });
  container.addAllToScene();
  const triangles = container.meshes.reduce(
    (sum, mesh) => sum + mesh.getTotalIndices() / 3,
    0,
  );
  ```

  Add exact dependency `@babylonjs/loaders@9.23.0`, add
  `"assets:verify": "node scripts/verify-assets.mjs"`, and place
  `pnpm assets:verify` before `pnpm typecheck` in `check`. The red verifier
  checks first-party existence and names; after export it is replaced with
  literal observed hashes and sizes, never placeholder text.

- [ ] **Step 2: Run the verifier red.** Run
  `fnm exec --using=24.20.0 pnpm assets:verify`. Expect nonzero with first
  missing path `assets/opening-studio/opening-studio.blend`.

- [ ] **Step 3: Acquire the exact Poly Haven source set.** Create one
  temporary directory outside Git with
  `wisp_asset_tmp="$(mktemp -d)"`. Download the 16 exact source files from
  the official URLs/API identities in the runtime-asset research document,
  preserve each model's `textures/` directory, and run `shasum -a 256 -c`
  against all 16 source SHA-256 literals before conversion. Use:

  ```bash
  fnm exec --using=24.20.0 pnpm dlx @gltf-transform/cli@4.2.1 copy "$wisp_asset_tmp/table/WoodenTable_01_1k.gltf" public/assets/opening-studio/poly-haven/WoodenTable_01_1k.glb
  fnm exec --using=24.20.0 pnpm dlx @gltf-transform/cli@4.2.1 copy "$wisp_asset_tmp/cabinet/painted_wooden_cabinet_1k.gltf" public/assets/opening-studio/poly-haven/painted_wooden_cabinet_1k.glb
  ```

  Copy only the six selected standalone material JPEGs. Verify the eight final
  files against the exact runtime table above. Do not commit source archives,
  model source JPEGs already embedded in GLB, previews, or the audit ZIP.

- [ ] **Step 4: Establish license boundaries.** Add `*.blend binary` to
  `.gitattributes` and `*.blend1` to `.gitignore`. Add the canonical
  GPL-3.0-or-later text and this exact helper header:

  ```python
  # SPDX-FileCopyrightText: 2026 linbinghe
  # SPDX-License-Identifier: GPL-3.0-or-later
  ```

  Update `LICENSE-SCOPE.md`: the helper alone is GPL; `.blend` and first-party
  authored GLB content remains PolyForm Noncommercial; Poly Haven source and
  embedded image data remain CC0. Retain the CC0 legal text beside the runtime
  assets and make those component boundaries explicit in the asset manifest.

- [ ] **Step 5: Author the editable Blender source.** Download the official
  macOS Apple Silicon 4.5.13 LTS DMG into a new temporary directory, verify
  SHA-256
  `663ce944257c61ff1d6aa09e15c8f57bbd8d59023adb2fa7edde33a9ed960b53`,
  mount it read-only at an explicit temporary mount point, and confirm
  `Blender 4.5.13`; do not install into `/Applications`.

  Author one `opening-studio.blend` with:

  - `Runtime_Shell`: 9–11 m wide, 4.5–5.5 m high, curved laminated-timber
    beams, 3–8 cm visible bevels with at least three segments, intentional
    joinery, plaster infill, a substantial floor edge, and
    `workbench__augmentation` containing full-height legs, thick top, drawers,
    tool rail, Brief surface, and brass detail aligned around the measured
    1.800 × 0.657 × 0.549 m table base;
  - `Runtime_Display`: a 1.8–2.3 m wide weight-bearing timber plinth, brass
    frame, separate outward-facing glass surfaces, and empty readable canopy.

  Apply transforms, remove hidden duplicates, correct normals, unwrap wood and
  plaster at consistent physical scale, and use only the four material-name
  prefixes. The source fails if hero silhouettes remain thin tubes, cylinders,
  or plain unbeveled boxes.

- [ ] **Step 6: Export two deterministic GLBs.** Implement the GPL helper with
  fixed mapping and no geometry creation or modification:

  ```python
  EXPORTS = {
      "Runtime_Shell": "opening-studio-shell.glb",
      "Runtime_Display": "opening-studio-display.glb",
  }
  ```

  It rejects Blender versions other than 4.5.13, accepts only `--output-dir`,
  selects one collection at a time, and exports GLB with Y-up, applied
  modifiers, selected visible objects only, no camera/light/animation, and no
  compression. Run it through the verified portable binary.

- [ ] **Step 7: Freeze observed evidence and turn verification green.** Record
  `.blend` and first-party GLB literal sizes/hashes, Blender identity/export
  command, collection names, source/output license, Poly Haven source/final
  identities, and CC0 in `public/assets/ASSETS.md`. Replace first-party
  existence checks with observed SHA-256 literals. Assert exactly ten runtime
  files, first-party GLBs at most 2,000,000 bytes, all runtime assets at most
  7,000,000 bytes, four GLBs loading in NullEngine, required material prefixes,
  no compression extension, and complete disposal. Run `pnpm assets:verify`;
  expect exit 0.

- [ ] **Step 8: Save a local checkpoint.** Run `git diff --check`, inspect
  `git status --short`, and create `--fixup=2cbb1a3` with author/committer
  `linbinghe <linbinghe@gmail.com>`. Do not push or autosquash.

### Task 1.2: Move composition behind one concrete scene module

**Interfaces:** `openingStudioScene.ts` implements
`MountOpeningStudioScene`. `StudioRuntime` retains engine, camera, render loop,
projection, fault/retry, and disposal; it does not know asset URLs or prefix
rules.

- [ ] **Step 1: Write runtime diagnostics tests red.** In
  `StudioRuntime.test.ts`, add a `createTestSceneMount(scene)` returning the
  four exact `TransformNode` roots, one mutable `PBRMaterial`, zero containers,
  and `triangleCount: 32`; pass it only as `testSceneMount`. Update expected
  resource counts with `containers: 0`. Assert `readSceneDiagnostics()` returns
  the four contract roots and `triangleCount <= 50000`. Run the focused Vitest
  file; expect nonzero because the test hook, container count, and diagnostics
  do not exist.

- [ ] **Step 2: Write production loading assertions red.** Extend the real
  Playwright lifecycle so every mounted runtime reports four containers, four
  semantic roots, and at most 50,000 triangles, then all zero counts after
  disposal. Assert every asset request is same-origin beneath
  `/assets/opening-studio/`. Run the ready/resource cases; expect nonzero.

- [ ] **Step 3: Implement the concrete scene module.** Import
  `@babylonjs/loaders/glTF` and module-level `LoadAssetContainerAsync`. Create
  the four roots, load all four GLBs with `Promise.allSettled`, dispose every
  fulfilled sibling when one rejects, and add containers to the scene only
  after all fulfill. Parent table plus augmentation to `studio-workbench`,
  cabinet to `studio-archive`, structure to `studio-shell`, and display meshes
  to `studio-artifact-display`.

  Create shared PBR wood/plaster materials from the six standalone textures;
  use OpenGL normals and map ARM red/green/blue to ambient occlusion,
  roughness, and metallic. Reuse one brass and one separately sorted glass
  material. Preserve only the floating fragment, Brief sheets, dormant portal,
  three lights, and 512 shadow map as procedural context; delete the rejected
  procedural shell, worktable, archive, and display hero geometry.

- [ ] **Step 4: Reduce `StudioRuntime` to lifecycle/projection.** Call
  `await (testSceneMount ?? mountOpeningStudioScene)(scene)`, retain its
  containers/style material/roots/triangle count, expose counts and
  diagnostics, and dispose containers before scene/engine on success or
  failure. Keep camera and `returnToOverview()` unchanged; Babylon objects
  never enter React state.

- [ ] **Step 5: Make unit and real loading green.** Run focused Vitest and
  Playwright ready/resource cases. Expect actual local GLBs to reach ready,
  mounted production counts to show four containers, unit tests to avoid Node
  file I/O through their in-memory mount, and all 20 real cycles to return zero
  counts.

- [ ] **Step 6: Save the scene checkpoint.** Run focused tests and
  `git diff --check`, then create another `--fixup=2cbb1a3`; do not push or
  autosquash.

### Task 1.3: Close fault, performance, and visual gates

- [ ] **Step 1: Add asset-failure and unsupported-device tests red.** Abort
  only `/assets/opening-studio/opening-studio-display.glb`; require localized
  fault without ready, remove the route, retry, and require a fresh
  four-container ready mount. At width 1279 and with coarse pointer, record
  requests and require no `/assets/opening-studio/` request. First demonstrate
  nonzero retained-container counts with the deliberate cleanup omission.

- [ ] **Step 2: Make partial cleanup/retry green.** Dispose fulfilled
  `Promise.allSettled` siblings before rethrowing; let `StudioRuntime` map the
  failure to `mount-failed`, clean once, and allow the existing retry to create
  a fresh runtime. Run focused fault/unsupported cases; expect zero retained
  counts and no unsupported asset request.

- [ ] **Step 3: Record automated budgets and timing.** Attach JSON from the
  supported browser containing first useful DOM, first interactive Studio,
  mounted triangles/containers, and a ten-second `requestAnimationFrame`
  sample. CI fails on absent/non-finite marks, triangles over 50,000, or
  retained resources, not on headless FPS. Run headed on the demo laptop and
  require a result consistent with the 60 FPS target.

- [ ] **Step 4: Capture and judge the first frame.** At 1280 × 720, capture
  ready and unsupported evidence beside the accepted north star. Record
  pass/fail for Constitution items 1–4. Fail if the workbench is not primary,
  shell lacks mature structure, display is confused with cabinet, anomaly
  dominates, stock assets look untouched, or the scene remains toy-like. A
  failure returns to asset authoring, not extra prop density or weaker wording.

- [ ] **Step 5: Run terminating verification.** Run frozen install,
  `pnpm assets:verify`, `pnpm check`, and `git diff --check
  origin/main...HEAD`; require all exit 0, four GLBs loading in NullEngine,
  asset/triangle budgets, 20 clean real WebGL lifecycles, and both timing marks.

- [ ] **Step 6: Freeze two final commits before review.** Keep every asset
  research, plan/spec, and later documentation correction as a fixup targeting
  `d32c98c`; keep implementation fixes targeting `2cbb1a3`. While unpushed,
  run one noninteractive autosquash from `origin/main` with committer identity
  `linbinghe <linbinghe@gmail.com>`. Verify exactly two final commits remain —
  documentation/visual direction, then runnable Opening Studio — and verify
  author plus committer identity. Do not rebase after formal review.

- [ ] **Step 7: Perform `$code-review`.** Use fixed `origin/main` and both
  Standards/Spec axes with the accepted specs, asset research, repository
  rules, licensing scope, ADR-0001, workflow, and Occam skill. Resolve every
  hard/material finding and rerun affected checks; repeat review after material
  candidate changes.

- [ ] **Step 8: Push, open PR, and stop.** Push only the feature branch; open
  `feat: open the Warm Atelier Studio` with asset/license inventory,
  exclusions, screenshots, exact checks, performance/lifecycle evidence,
  review results, and judgment calls. Do not merge; report the actual outcome
  here and wait for manual review.

## Task 2: Canonical Poster preview

**Branch / PR:** `feat/style-echo-poster-preview` / `feat: compose the opening Poster`

**Visible outcome:** Three bounded fields immediately produce an exact-text, deterministic 1080 x 1350 Warm Atelier Poster preview.

**Files:** Create `src/opening/openingState.ts`,
`src/opening/OpeningControls.tsx`,
`src/poster/composeOpeningPoster.ts`, `src/poster/PosterPreview.tsx`,
`src/poster/composeOpeningPoster.test.ts`,
`src/opening/OpeningControls.test.tsx`, and `EXPORT-PERMISSION.md`; modify
`src/app/WispApp.tsx`,
`src/app/app.css`, `src/style/styleProfiles.ts`, `package.json`,
`pnpm-lock.yaml`, `LICENSE-SCOPE.md`, `public/assets/ASSETS.md`,
`scripts/verify-assets.mjs`, and `tests/e2e/opening-studio.spec.ts`.

- [ ] **Step 1: Write exact-copy and limit tests.** Assert `textRuns` maps
  Studio name/headline/supporting line to `issuer`/`headline`/`supporting`, each
  run retains exact `text`, and `lines.join("") === text`. Cover HTML-like text,
  maximum-length Chinese/Latin fixtures, omitted empty supporting copy, and
  rejection of `36 + 1` headline characters. Run the exact focused command
  below and expect nonzero because these contracts do not exist.

  ```ts
  expect(composeOpeningPoster(copy, profile).copy).toEqual(copy);
  ```

- [ ] **Step 2: Add the reducer and semantic controls.** Use React `useReducer`
  with `preview` and `accepted` already separate; create labeled inputs with
  `maxLength` 24/36/72 and required validation for Studio name/headline. Do not
  use `dangerouslySetInnerHTML` or place user copy in CSS/URLs.
- [ ] **Step 3: Add one canonical Canvas renderer.** Import the pinned Noto Sans
  SC variable font, await `document.fonts.ready`, calculate the inspectable
  1080 x 1350 plan, and iterate its computed `textRuns.lines` through
  `fillText` without rewriting content. CSS scales that same canvas for
  preview; no second preview renderer exists.
- [ ] **Step 4: Extend the one asset manifest at the first font consumer.**
  Add a Fontsource section to the existing `public/assets/ASSETS.md`; do not
  create a second asset manifest. The section
  links [Fontsource](https://fontsource.org/fonts/noto-sans-sc) and its
  `font-files/fonts/variable/noto-sans-sc` source, names package `5.3.0`,
  upstream Noto Sans SC `v40`, copyright
  holder `Google Inc.`, acquisition `2026-08-29`, OFL-1.1, redistribution
  notice required/output attribution not required, npm SHA-512
  `lNar1dF7Ik/lHNPo/7JWG0TolXY29LtsqYgMvEysooZ5bsO9uH4shJmRrwyJ3PjyTPljhpMJEK0jDuLSU4vJ1w==`,
  tarball SHA-256 `3191e5a03a66f62d46064d1eabb6749366a5f2a142c0c901c59c69425c4d2f20`,
  and every imported WOFF2 path/hash; Vite may rename but not transform/subset
  them. Embed the package `LICENSE` text verbatim in the same manifest and pin
  its UTF-8 SHA-256 `18aabf190848725e2576eefb5c29ba06aac1029d02132252a7f312eac2e50cf3`;
  extend `scripts/verify-assets.mjs` so the repository check compares the
  manifest metadata, imported font files, and retained license text. Add
  `EXPORT-PERMISSION.md`: lawful users receive worldwide, perpetual,
  nonexclusive, royalty-free permission to use, reproduce, modify, distribute,
  display, and commercially exploit flattened Wisp image exports, including
  first-party Poster template elements only while embedded in that flattened
  output. Exclude code, editable template definitions, standalone assets,
  marks, user-content rights, and third-party rights. Link this specific grant
  from `LICENSE-SCOPE.md`; obtain legal review before public commercial launch.
- [ ] **Step 5: Prove rendered browser behavior.** Spy on Canvas `fillText` and
  assert every nonempty exact run is drawn. Type Chinese, Latin, markup-shaped,
  and maximum-length values in real Chromium after fonts are ready; assert no
  element/script is created and the canvas is 1080 x 1350. Run
  `fnm exec --using=24.20.0 pnpm exec vitest run
  src/poster/composeOpeningPoster.test.ts
  src/opening/OpeningControls.test.tsx`, then `fnm exec --using=24.20.0 pnpm
  exec playwright test tests/e2e/opening-studio.spec.ts`, and finally
  `fnm exec --using=24.20.0 pnpm check`; expect all exit 0. Run `$code-review`
  against the fixed `origin/main`, resolve material findings, open the PR, and
  stop.

## Task 3: Live Style Echo

**Branch / PR:** `feat/style-echo-live-profile` / `feat: echo style through the Studio`

**Visible outcome:** Repeated Warm/Neon switching projects one inspectable record through Studio, DOM, Typesetter Wisp, and Poster while preserving copy.

**Files:** Modify `src/style/styleProfiles.ts`, `src/app/WispApp.tsx`,
`src/poster/composeOpeningPoster.ts`,
`src/poster/composeOpeningPoster.test.ts`, `src/studio/StudioRuntime.ts`,
`src/studio/StudioRuntime.test.ts`,
and `tests/e2e/opening-studio.spec.ts`; create the bounded concrete module
`src/studio/TypesetterWisp.ts`. Add no dependency or runtime asset.

- [ ] **Step 1: Make four-projection tests red.** For each profile ID, assert
  exact DOM CSS variables, Studio light/material treatment, Wisp appearance,
  and Poster composition ID from `STYLE_PROFILES[id]`. Assert no consumer owns
  a second profile switch. Run `fnm exec --using=24.20.0 pnpm exec vitest run
  src/poster/composeOpeningPoster.test.ts src/studio/StudioRuntime.test.ts`;
  expect nonzero because the Neon record and Wisp projection do not exist.
- [ ] **Step 2: Add the second complete record and controls.** Use two semantic
  radio buttons; derive CSS variables and every projection from the selected
  record. Warm uses soft PBR/editorial treatment; Neon uses dark/emissive,
  nearest-sampled pixel accents and the compact grid Poster composition.
- [ ] **Step 3: Add one concrete procedural Typesetter Wisp.** Keep
  `TypesetterWisp.ts` a bounded Babylon object owned by `StudioRuntime`, not a
  general entity system. Both warm orb/ring and neon voxel treatments retain a
  visible core, outer form, bounded trail, and Typesetter role signifier;
  state changes use motion/deformation/luminance plus equivalent DOM status
  and do not depend on a cartoon face. Parent it beside the established
  `studio-workbench` root, expose only `project()` and `dispose()`, and add no
  chat, custom skeleton, behavior tree, Agent Loop, or plugin API.
- [ ] **Step 4: Project through the existing scene pipeline.** Keep the four
  Task 1 GLB containers and authored base materials mounted across switches.
  Project only the allowlisted clear color, key light, accent material,
  profile-owned sampling treatment, and Wisp treatment; never refetch or
  replace the World Kit geometry. Derive DOM and Poster from the same selected
  `StyleProfile` record and assert repeated Warm/Neon switches preserve all
  copy exactly.
- [ ] **Step 5: Exercise twenty profile lifecycles.** Each iteration constructs
  a runtime with a new `NullEngine`, mounts, projects the alternating profile,
  disposes, and asserts every owned count, including containers, is zero before
  the next iteration. Unit runs inject the established in-memory scene mount;
  Playwright performs a real WebGL cycle against the existing bundled assets.
  Human review checks both styles are distinct, coherent, and still one Studio
  rather than two unrelated scenes. Run the two focused Vitest files and
  `fnm exec --using=24.20.0 pnpm exec playwright test
  tests/e2e/opening-studio.spec.ts`; expect all lifecycle and browser cases to
  exit 0.
- [ ] **Step 6: Verify reused assets and behavior.** Run
  `fnm exec --using=24.20.0 pnpm assets:verify` and
  `fnm exec --using=24.20.0 pnpm check`; expect both exit 0, the unchanged
  Task 1/2 asset inventory to remain valid, four projections per profile to
  pass, and all 20 lifecycles to return zero. Run `$code-review`, open the PR,
  and stop.

## Task 4: Adopt and hang

**Branch / PR:** `feat/style-echo-adopt-hang` / `feat: adopt and hang the opening Poster`

**Visible outcome:** “采用并悬挂” atomically persists a revision, cues the Wisp, fills the display, and enables accepted-only PNG export; storage failure preserves the prior result.

**Files:** Create `src/persistence/openingStorage.ts`,
`src/persistence/openingStorage.test.ts`, and
`src/opening/adoptOpening.test.ts`; modify `src/opening/openingState.ts`,
`src/opening/OpeningControls.tsx`, `src/app/WispApp.tsx`,
`src/studio/StudioRuntime.ts`, `src/studio/StudioRuntime.test.ts`,
`src/poster/PosterPreview.tsx`, `tests/e2e/opening-studio.spec.ts`,
`package.json`, and `pnpm-lock.yaml`.

- [ ] **Step 1: Write the atomic failure tests.** Start from accepted revision
  A, preview B, and a `Storage.setItem` double that throws. Assert revision A,
  display/export availability, and Wisp cue remain unchanged while status is
  `failed`; then make the same test red for a successful revision B.

  ```ts
  expect(adoptOpening(stateA, throwingStorage).accepted).toEqual(stateA.accepted);
  ```

- [ ] **Step 2: Add the versioned storage boundary.** Zod accepts only
  `{schemaVersion: 1, revision, profileVersion: "style-echo-profiles-v1",
  assetVersion: "style-echo-assets-v1", profileId, copy}` at key
  `wispwork:opening:v1`; corrupt, mismatched-literal, or invalid data returns
  `null`. Future version changes must retain the old rendering inputs or add an
  explicit migration. Writes remain one JSON value and storage errors escape.
- [ ] **Step 3: Commit persistence before presentation.** The command validates
  the preview, creates `revision = (accepted?.revision ?? 0) + 1`, saves it,
  then dispatches the accepted state. Display texture, Wisp success cue, and
  export derive from the changed accepted revision; no optimistic success or
  rollback path exists.
- [ ] **Step 4: Reuse the Poster renderer.** Render the accepted revision to a
  full-size offscreen canvas and call `toBlob("image/png")`. Pass only
  `{id, blob}` to the Studio, where ID is
  `opening-poster:${revision}:${profileVersion}:${assetVersion}` and the runtime
  owns texture replacement/object-URL revocation. Reuse that Blob for export;
  disable export without an accepted revision and sanitize the filename.
- [ ] **Step 5: Prove accepted-only output.** Adopt A, preview B, then assert the
  display and exported canvas hash still match A. Parse PNG IHDR bytes and
  assert 1080 x 1350; assert persistence failure produces no Wisp display cue.
- [ ] **Step 6: Exercise twenty complete lifecycles.** Every iteration creates
  a new NullEngine runtime, mounts, projects, replaces the display Blob, and
  disposes; assert every tracked count, including containers, is zero after
  each iteration and object URLs are revoked. Do not assert browser GC or
  `performance.memory` values.
- [ ] **Step 7: Verify atomic adoption and output.** Run
  `fnm exec --using=24.20.0 pnpm exec vitest run
  src/persistence/openingStorage.test.ts src/opening/adoptOpening.test.ts
  src/studio/StudioRuntime.test.ts`, then `fnm exec --using=24.20.0 pnpm exec
  playwright test tests/e2e/opening-studio.spec.ts`, and
  `fnm exec --using=24.20.0 pnpm check`. Expect all exit 0, IHDR 1080 x 1350,
  failure atomicity, accepted-only hashes, and 20 zero-count lifecycles. In real
  Chrome, record a Poster display-texture replacement with the Long Tasks API;
  any task over 100 ms fails this gate. Then run `$code-review` against the
  fixed `origin/main`, resolve material findings, open the PR, and stop.

## Task 5: Return, revise, and quality gate

**Branch / PR:** `feat/style-echo-return-quality` / `feat: restore and revise the opening Poster`

**Visible outcome:** Reload restores the adopted Studio/Poster while later previews remain separate; keyboard, locale, reduced-motion, failed-WebGL2, and unsupported-device paths remain truthful.

**Files:** Modify `src/app/WispApp.tsx`, `src/app/app.css`,
`src/opening/openingState.ts`,
`src/opening/OpeningControls.test.tsx`, `src/studio/StudioViewport.tsx`, and
`tests/e2e/opening-studio.spec.ts`; add no production dependency.

- [ ] **Step 1: Make reload/revision tests red.** Seed one accepted snapshot,
  reload, assert profile/copy/display/export restoration, edit a preview, and
  assert the accepted display/export hash does not change until re-adoption.
- [ ] **Step 2: Hydrate before projecting.** Decode storage once at startup;
  initialize both preview and accepted from a valid snapshot, otherwise use
  Warm defaults. Re-render the accepted Poster deterministically and project
  it after the Studio becomes ready; 3D failure never blocks DOM hydration.
- [ ] **Step 3: Complete accessibility behavior.** Playwright uses only Tab,
  arrows, Enter, and Space to edit, switch, adopt, and export. Status uses a
  restrained live region; `prefers-reduced-motion: reduce` removes Wisp/camera
  transitions without removing success or failure meaning.
- [ ] **Step 4: Complete resilience and privacy assertions.** Below 1280 x 720
  or with a coarse pointer, Babylon is never initialized and the localized
  desktop-only notice remains visible. With WebGL contexts disabled on a
  supported desktop, accepted data, preview, adoption retry, and export still work.
  Record requests and fail on Backend/provider/cross-origin traffic while
  allowing same-origin app, font, and GLB files.
- [ ] **Step 5: Run the completion matrix.** Run `fnm exec --using=24.20.0 pnpm
  exec vitest run src/opening/OpeningControls.test.tsx
  src/persistence/openingStorage.test.ts`,
  `fnm exec --using=24.20.0 pnpm exec playwright test
  tests/e2e/opening-studio.spec.ts`, `fnm exec --using=24.20.0 pnpm check`, and
  `git diff --check`; expect all exit 0 and requirements 1–12 mapped to passing
  evidence. In real Chrome inspect both profiles at the desktop lower bound,
  verify both locales and the unsupported-device gate, and do 20
  switches/adoptions; record any failed subjective criterion as failure.
- [ ] **Step 6: Close the slice performance record.** Re-record separate first
  useful DOM and first interactive Studio marks, the 10-second home-view FPS
  sample, one Poster display-texture replacement, and the 20-cycle owned-resource
  result. Require the demo-laptop 60 FPS target, no replacement long task over
  100 ms, and zero tracked growth. Mark Android FPS and pointer-highlight
  latency `not evaluated` with their exclusion reasons rather than passing them.
- [ ] **Step 7: Perform the final two-axis `$code-review`.** Use the fixed
  `origin/main`. The Spec axis maps all twelve deterministic requirements and
  explicit exclusions; Standards checks the review-size guard,
  dependency/asset evidence, and absence of speculative abstractions. Resolve
  material findings, open the PR, and stop for maintainer sign-off.

## Recalibration and completion

The accepted 2026-08-30 asset-first correction is now part of Task 1 rather
than a competing plan: Task 1 establishes the only asset manifest, verifier,
GLB loader, and concrete Opening Studio scene pipeline; Tasks 2 and 3 extend or
consume those files without duplicating them.

After each merge, fetch `origin/main`, verify it, and adjust only the next task
when actual files, rendering, or tests invalidate this plan. Changes to
behavior, output licensing, repository ownership, atomic adoption, or five
review boundaries need maintainer confirmation; patch pins and internal
placement remain engineering decisions.

Completion requires Task 5 deterministic checks, real Chrome supported-boundary
and unsupported-device demonstrations, and maintainer plus delivery-agent subjective review against the
Visual Constitution. It authorizes neither market claims nor Brief, Workbench,
AIGC, Backend, account, sharing, second World Kit, or World Kit import work.
