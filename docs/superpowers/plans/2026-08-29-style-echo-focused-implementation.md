# Style Echo Focused Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> `superpowers:executing-plans` to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking. Complete exactly one task and PR,
> then stop for the maintainer to merge before starting the next task.

**Goal:** Deliver five small, runnable browser increments culminating in one deterministic Poster that coherently shapes Studio, DOM, Typesetter Wisp, persistence, and export.

**Architecture:** A root Vite/React application owns one serializable opening state. Concrete projections feed DOM controls, one Babylon `StudioRuntime`, and one Canvas 2D Poster renderer; versioned single-key `localStorage` stores only the last adopted snapshot. This is an internal bundled slice, not a World Kit importer, renderer abstraction, or general Artifact system.

**Tech Stack:** Node 24.20.0, pnpm 11.24.0, TypeScript 7.0.2, React 19.2.8, Vite 8.2.2, Babylon.js 9.23.0, Canvas 2D, Zod 4.5.2, Vitest 4.1.11, and Playwright 1.62.1.

**Spec:** [`docs/superpowers/specs/2026-08-29-style-echo-slice.md`](../specs/2026-08-29-style-echo-slice.md)

**Acceptance:** This plan becomes implementation authority only when the maintainer merges its pull request.

## Global constraints

- All files belong to `wispwork`; `wispwork-server` receives no change.
- Start every task from newly merged `origin/main` on the named branch. Keep it below 500 non-generated changed lines and 15 substantive files; stop and recalibrate if either guard is crossed.
- Use author and committer `linbinghe <linbinghe@gmail.com>`.
- Each task has one visible outcome, a red-green cycle, two-axis `$code-review` against `origin/main`, one PR, and a hard stop for manual merge.
- Run local pnpm commands through `fnm exec --using=24.20.0`; default-shell Node 23.3.0 cannot run pnpm 11.24.0. CI uses its pinned runtime action.
- Support current macOS Chrome; CI uses Playwright Chromium and 390 x 844 as a viewing-compatibility viewport. Safari and Android real-device automation are deferred.
- `Warm Atelier` is the initial preview and `Neon Pixel Lab` the only alternative. No neutral state, wizard, login, Backend, provider, credential, remote asset, or cross-origin request.
- Limits are 24 characters for Studio name, 36 for exact headline, and 72 for optional supporting line. Test maximum Chinese/Latin values in both compositions without truncation or rewriting.
- Poster preview, display texture, and export use the same 1080 x 1350 renderer. Persist inputs, profile/asset versions, and revision; regenerate pixels instead of storing PNG blobs.
- User exports may be commercial. Poster-bound material is first-party with an explicit output grant, CC0, or OFL; raw CC BY and final-product-only assets are excluded.
- Keep Babylon concrete. Use React reducer/context, native Canvas 2D, one `localStorage` key, and Zod only at persistence. Do not add Zustand, Dexie, Konva, router, DI, event bus, generic repository, renderer adapter, plugin registry, or public protocol fields.

## Dependency and asset evidence

Exact metadata was rechecked against the official npm registry on 2026-08-29. A temporary full-graph install using the pinned runtime and `pnpm audit --registry=https://registry.npmjs.org --audit-level=high` reported `No known vulnerabilities found`.

| First consumer | Exact packages | License | Why earned |
| --- | --- | --- | --- |
| Task 1 | `react@19.2.8`, `react-dom@19.2.8`, `@babylonjs/core@9.23.0` | MIT / Apache-2.0 | DOM product shell and accepted renderer |
| Task 1 | `vite@8.2.2`, `@vitejs/plugin-react@6.1.1`, `typescript@7.0.2` | MIT / Apache-2.0 | Build and type checking |
| Task 1 | `vitest@4.1.11`, `@playwright/test@1.62.1` | MIT / Apache-2.0 | Concrete module and real-browser seams |
| Task 2 | `@testing-library/react@16.3.3`, `@testing-library/user-event@14.6.6`, `@testing-library/jest-dom@7.0.1`, `jsdom@30.0.1` | MIT | DOM behavior, not component snapshots |
| Task 2 | `@fontsource-variable/noto-sans-sc@5.3.0` | OFL-1.1 | Bundled Chinese/Latin Canvas determinism |
| Task 3 | `@babylonjs/loaders@9.23.0` | Apache-2.0 | First GLB consumer |
| Task 4 | `zod@4.5.2` | MIT | Corrupt/versioned storage rejection |

Task 3 vendors only `desk.glb`, `chairDesk.glb`, and `plantSmall1.glb` from CC0 [Kenney Furniture Kit](https://kenney.nl/assets/furniture-kit). Pack SHA-256: `e67652d0932cee41683f74711c03d3e192a2af9979ef8e6b237711f5482d46b0`; file hashes respectively: `0164fe828f028b321730fb8c74502e353583f751be74da1682d42fff7d3c5a42`, `46406619186034cbe92b19b79a5f1a8e3f442a17a70a7524ef2c0ad0f35095c6`, `2b9c022feb47be857b2c4fdc29f36522766ba9b70c578c31d7c05d71b4377d15`.

The manifest records author `Kenney`, asset-page release `1.0`, bundled pack marker `2.0`, CC0 1.0, optional attribution, URL, acquisition date, hashes, and byte-for-byte/no-transformation status.

## Shared implementation contracts

These names are internal application contracts, not public protocols:

```ts
export type StyleProfileId = "warm-atelier" | "neon-pixel-lab";
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
  clear: string; keyLight: string; materialTint: string; fov: number;
  renderProfile: "soft-pbr" | "pixel-mixed";
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
type StudioRuntimeOptions = Readonly<{ onFault(fault: StudioFault): void;
  testEngine?: AbstractEngine }>;
export class StudioRuntime {
  constructor(options: StudioRuntimeOptions);
  mount(canvas: HTMLCanvasElement | null, kit: StudioKitProjection): Promise<void>;
  project(projection: StudioProjection): void;
  replaceDisplayAsset(asset: StudioDisplayAsset | null): Promise<void>;
  readOwnedResourceCounts(): StudioResourceCounts;
  dispose(): Promise<void>;
}

type StudioKitProjection = Readonly<{ id: string }>;
type StudioDisplayAsset = Readonly<{ id: string; blob: Blob }>;
type StudioProjection = Readonly<{
  style: StudioStyleProjection; wisp: WispStyleProjection;
  wispCue: "idle" | "previewing" | "displaying";
  acceptedRevision: number | null; displayAssetId: string | null;
}>;
type StudioResourceCounts = Readonly<{
  engines: number; scenes: number; meshes: number; materials: number;
  textures: number; observers: number;
}>;

export function loadAcceptedOpening(storage: Pick<Storage, "getItem">): AcceptedOpeningV1 | null;
export function saveAcceptedOpening(storage: Pick<Storage, "setItem">,
  snapshot: AcceptedOpeningV1): void;
export function adoptOpening(state: OpeningState,
  storage: Pick<Storage, "setItem">): OpeningState;
```

Production omits `testEngine` and passes its canvas; tests inject concrete `NullEngine` and may pass `null`. No Poster canvas crosses the boundary: the renderer supplies an ID plus Blob, and `StudioRuntime` owns URL/texture replacement and disposal. This remains a concrete module, not a renderer-neutral interface.

The two records pin these projection values:

| Profile | DOM page/panel/ink/accent | Studio clear/key/tint/FOV/profile | Wisp body/glow/treatment | Poster |
| --- | --- | --- | --- | --- |
| Warm Atelier | `#f2e7d5` / `#fffaf1` / `#2b2118` / `#c56d42` | `#201a16` / `#ffd3a0` / `#a96f42` / `0.68` / `soft-pbr` | `#f7d49a` / `#dc8c52` / `orb-ring` | `warm-editorial` |
| Neon Pixel Lab | `#090b17` / `#11162a` / `#eef2ff` / `#3df2ff` | `#050715` / `#7b61ff` / `#171b3d` / `0.58` / `pixel-mixed` | `#3df2ff` / `#ff4fd8` / `voxel` | `neon-grid` |

## Task 1: Opening Studio

**Branch / PR:** `feat/style-echo-opening-studio` / `feat: open the Warm Atelier Studio`

**Visible outcome:** A fresh checkout opens a restrained Warm Atelier Babylon scene; failed WebGL2 leaves an interactive DOM shell with a clear fault.

**Files:** Create `index.html`, `tsconfig.json`, `vite.config.ts`,
`playwright.config.ts`, `src/main.tsx`, `src/app/WispApp.tsx`,
`src/app/app.css`, `src/style/styleProfiles.ts`,
`src/studio/StudioRuntime.ts`, `src/studio/StudioViewport.tsx`,
`src/studio/StudioRuntime.test.ts`, and
`tests/e2e/opening-studio.spec.ts`; modify `package.json`, `pnpm-lock.yaml`, and
`.github/workflows/quality.yml`.

- [ ] **Step 1: Pin only Task 1 packages and make the browser test red.** Add
  `dev`, `build`, `typecheck`, `test:unit`, and `test:e2e`; set terminating
  `check` to `pnpm docs:check && pnpm whitespace:check && pnpm typecheck &&
  pnpm test:unit && pnpm build && pnpm test:e2e` (never include `dev`). Run
  `fnm exec --using=24.20.0 pnpm test:e2e`; expect nonzero because the new
  `[data-studio-status="ready"]` target does not exist.

  ```ts
  await expect(page.locator("[data-studio-status=ready]")).toBeVisible();
  ```

- [ ] **Step 2: Build the DOM-first shell and Warm scene.** Render React before
  awaiting Babylon. `StudioRuntime.mount()` creates one WebGL2 engine, an
  isometric camera, floor/walls, desk/display geometry, warm PBR materials,
  three bounded lights, and one render loop. Reject and dispose an engine whose
  reported WebGL version is below 2. The runtime owns and disposes all engine
  objects; Babylon objects never enter React state.
- [ ] **Step 3: Prove the concrete lifecycle red-green.** Construct
  `new StudioRuntime({onFault, testEngine: new NullEngine()})`, mount
  `opening-studio-v1` with a null canvas, project Warm values, then dispose. Run
  `fnm exec --using=24.20.0 pnpm test:unit`; first expect a nonzero count from
  the deliberate missing disposal, then expect exit 0 and every owned count 0.
- [ ] **Step 4: Add the WebGL fault path.** In Playwright, override only
  `canvas.getContext("webgl2" | "webgl")` to return `null`; assert the DOM
  heading and `role="status"` remain visible and describe unavailable 3D.
- [ ] **Step 5: Extend GitHub `quality`.** Install pinned Chromium before the
  terminating `pnpm check`; retain the read-only token and existing timeout.
  Run `fnm exec --using=24.20.0 pnpm install --frozen-lockfile`, then
  `fnm exec --using=24.20.0 pnpm check` and `git diff --check`; expect all exit
  0, then perform the two-axis review, open the PR, and stop.

## Task 2: Canonical Poster preview

**Branch / PR:** `feat/style-echo-poster-preview` / `feat: compose the opening Poster`

**Visible outcome:** Three bounded fields immediately produce an exact-text, deterministic 1080 x 1350 Warm Atelier Poster preview.

**Files:** Create `src/opening/openingState.ts`,
`src/opening/OpeningControls.tsx`,
`src/poster/composeOpeningPoster.ts`, `src/poster/PosterPreview.tsx`,
`src/poster/composeOpeningPoster.test.ts`,
`src/opening/OpeningControls.test.tsx`, and
`public/assets/THIRD_PARTY_ASSETS.md`; modify `src/app/WispApp.tsx`,
`src/app/app.css`, `src/style/styleProfiles.ts`, `package.json`,
`pnpm-lock.yaml`, `LICENSE-SCOPE.md`, and
`tests/e2e/opening-studio.spec.ts`; create `EXPORT-PERMISSION.md`.

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
- [ ] **Step 4: Record licensing at the first asset consumer.** The manifest
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
  Poster tests compare metadata, font files, and retained license text. Add
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
  `fnm exec --using=24.20.0 pnpm check`; expect all exit 0, then review, open
  the PR, and stop.

## Task 3: Live Style Echo

**Branch / PR:** `feat/style-echo-live-profile` / `feat: echo style through the Studio`

**Visible outcome:** Repeated Warm/Neon switching projects one inspectable record through Studio, DOM, Typesetter Wisp, and Poster while preserving copy.

**Files:** Modify `src/style/styleProfiles.ts`, `src/app/WispApp.tsx`,
`src/poster/composeOpeningPoster.ts`,
`src/poster/composeOpeningPoster.test.ts`, `src/studio/StudioRuntime.ts`,
`src/studio/StudioRuntime.test.ts`,
`tests/e2e/opening-studio.spec.ts`, `public/assets/THIRD_PARTY_ASSETS.md`,
`package.json`, and `pnpm-lock.yaml`; create
`public/assets/kenney-furniture/{desk,chairDesk,plantSmall1}.glb` plus the
bundled `LICENSE.txt` and `scripts/verify-assets.mjs`.

- [ ] **Step 1: Make four-projection tests red.** For each profile ID, assert
  exact DOM CSS variables, Studio light/material/camera values, Wisp appearance,
  and Poster composition ID from `STYLE_PROFILES[id]`. Assert no consumer owns
  a second profile switch.
- [ ] **Step 2: Add the second complete record and controls.** Use two semantic
  radio buttons; derive CSS variables and every projection from the selected
  record. Warm uses soft PBR/editorial treatment; Neon uses dark/emissive,
  nearest-sampled pixel accents and the compact grid Poster composition.
- [ ] **Step 3: Vendor only the three selected CC0 GLBs.** Verify the archive
  and three file hashes before committing. The manifest records the author,
  page/pack versions, CC0 1.0, optional attribution, source, acquisition date,
  byte-for-byte/no-transformation status, hashes, and sizes 15048/39016/8224.
  Add `assets:verify`; its script checks those three SHA-256/size pairs and the
  manifest's source/license fields, and append `pnpm assets:verify` before
  `pnpm typecheck` in the terminating `check`. Add the GLB loader only now and
  keep loader objects inside the owning Babylon module.
- [ ] **Step 4: Add one procedural Typesetter Wisp.** Keep it a bounded Studio
  node: warm orb/ring versus neon voxel treatment, restrained preview cue, DOM
  status equivalent, and no chat, behavior tree, Agent Loop, or plugin API.
- [ ] **Step 5: Exercise twenty profile lifecycles.** Each iteration constructs
  a runtime with a new `NullEngine`, mounts, projects the alternating profile,
  disposes, and asserts every owned count is zero before the next iteration.
  Playwright performs a real WebGL smoke cycle; human review checks both styles
  are distinct and coherent.
- [ ] **Step 6: Verify assets and behavior.** Run `fnm exec --using=24.20.0
  pnpm assets:verify` and `fnm exec --using=24.20.0 pnpm check`; expect both
  exit 0, all pinned hashes/metadata to match, four projections per profile to
  pass, and all 20 lifecycles to return zero. Review, open the PR, and stop.

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
  disposes; assert every tracked count is zero after each iteration and object
  URLs are revoked. Do not assert browser GC or `performance.memory` values.
- [ ] **Step 7: Verify atomic adoption and output.** Run
  `fnm exec --using=24.20.0 pnpm exec vitest run
  src/persistence/openingStorage.test.ts src/opening/adoptOpening.test.ts
  src/studio/StudioRuntime.test.ts`, then `fnm exec --using=24.20.0 pnpm exec
  playwright test tests/e2e/opening-studio.spec.ts`, and
  `fnm exec --using=24.20.0 pnpm check`. Expect all exit 0, IHDR 1080 x 1350,
  failure atomicity, accepted-only hashes, and 20 zero-count lifecycles; then
  review, open the PR, and stop.

## Task 5: Return, revise, and quality gate

**Branch / PR:** `feat/style-echo-return-quality` / `feat: restore and revise the opening Poster`

**Visible outcome:** Reload restores the adopted Studio/Poster while later previews remain separate; keyboard, reduced-motion, failed-WebGL2, and 390 x 844 paths remain useful.

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
- [ ] **Step 4: Complete resilience and privacy assertions.** At 390 x 844,
  controls and useful Poster preview remain visible. With WebGL contexts
  disabled, accepted data, preview, adoption retry, and export still work.
  Record requests and fail on Backend/provider/cross-origin traffic while
  allowing same-origin app, font, and GLB files.
- [ ] **Step 5: Run the completion matrix.** Run `fnm exec --using=24.20.0 pnpm
  exec vitest run src/opening/OpeningControls.test.tsx
  src/persistence/openingStorage.test.ts`,
  `fnm exec --using=24.20.0 pnpm exec playwright test
  tests/e2e/opening-studio.spec.ts`, `fnm exec --using=24.20.0 pnpm check`, and
  `git diff --check`; expect all exit 0 and requirements 1–10 mapped to passing
  evidence. In real Chrome inspect both profiles at desktop/390 x 844 and do 20
  switches/adoptions; record any failed subjective criterion as failure.
- [ ] **Step 6: Perform the final two-axis review.** The Spec axis maps all ten
  deterministic requirements and explicit exclusions; Standards checks the
  review-size guard, dependency/asset evidence, and absence of speculative
  abstractions. Open the PR and stop for maintainer sign-off.

## Recalibration and completion

After each merge, fetch `origin/main`, verify it, and adjust only the next task when actual files, rendering, or tests invalidate this plan. Changes to behavior, output licensing, repository ownership, atomic adoption, or five review boundaries need maintainer confirmation; patch pins and internal placement remain engineering decisions.

Completion requires Task 5 deterministic checks, real Chrome/mobile-viewport demonstration, and maintainer plus delivery-agent subjective review. It authorizes neither market claims nor Brief, Workbench, AIGC, Backend, account, sharing, or World Kit import work.
