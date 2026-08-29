# Rendering technical design

## Outcome

Use one **3D-capable scene graph**—Babylon.js—to render the Studio. Treat GLB,
sprites, decals, generated images, and display surfaces as first-class media.
Treat 3D, 2.5D, pixel, and mixed presentation as render profiles inside that
runtime.

This does not promise that every 3D authoring file loads perfectly. Wisp owns a
validated asset pipeline and public World Kit contract; the engine is an
implementation detail behind one focused module.

The accepted decision is recorded in
[ADR-0001](../adr/0001-babylon-web-renderer.md).

## Why Babylon.js

Babylon.js supplies a TypeScript/npm-native world runtime, scene lifecycle,
input/picking, cameras, PBR materials, sprites, glTF loaders, WebGL, and WebGPU
without adding a second C#/Wasm application beside the React product shell.

- Babylon.js officially maintains WebGL and WebGPU side by side, but documents
  backend differences such as asynchronous pixel reads. v0 uses WebGL2 as the
  compatibility path and cannot require WebGPU-only content.
- Babylon's Sprite/Sprite Map facilities and orthographic cameras cover 2D and
  2.5D presentation inside a 3D scene.
- Khronos defines glTF as an API-neutral runtime delivery format, so GLB is a
  better public contract than Unity AssetBundles or authoring files such as
  BLEND and FBX.

Primary sources:

- [Babylon.js repository and license](https://github.com/BabylonJS/Babylon.js)
- [Babylon.js WebGPU support](https://github.com/BabylonJS/Documentation/blob/master/content/setup/support/webGPU.md)
- [Babylon.js sprites](https://github.com/BabylonJS/Documentation/blob/master/content/features/featuresDeepDive/sprites.md)
- [glTF 2.0 specification](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html)

## Three presentation surfaces

```text
React/DOM application
  Brief, Wisp roster, run progress, panels, forms, accessibility, navigation

Babylon Studio canvas
  Studio space, Wisps, props, display slots, camera, picking, visual progress

Poster Workbench canvas
  Direct Artifact text/image editing and deterministic export
```

The surfaces share serializable product state through explicit commands. They
do not share engine objects, DOM nodes, or undo stacks.

Babylon GUI is not used to rebuild product forms. The Poster Workbench does not
become the Studio renderer. The Studio does not become a general design canvas.

## `StudioRuntime` module

`StudioRuntime` is a concrete Babylon.js module. Its small public surface is a
class contract, not a renderer-neutral TypeScript interface:

```ts
type StudioKitProjection = Readonly<{ id: string }>;
type StudioDisplayAsset = Readonly<{ id: string; blob: Blob }>;
type StudioResourceCounts = Readonly<{ engines: number; scenes: number;
  meshes: number; materials: number; textures: number; observers: number }>;
type StudioRuntimeOptions = {
  onFault(fault: StudioFault): void;
  testEngine?: AbstractEngine;
};

class StudioRuntime {
  constructor(options: StudioRuntimeOptions);
  mount(canvas: HTMLCanvasElement | null, kit: StudioKitProjection): Promise<void>;
  project(snapshot: StudioProjection): void;
  replaceDisplayAsset(asset: StudioDisplayAsset | null): Promise<void>;
  readOwnedResourceCounts(): StudioResourceCounts;
  dispose(): Promise<void>;
}
```

`StudioKitProjection` and `StudioProjection` are concrete serializable inputs;
the transient `StudioDisplayAsset` contains a stable ID and Blob, never a
persisted value or Poster DOM node. Production omits `testEngine`; tests inject
Babylon `NullEngine` and pass a null canvas. `setView`, Studio capture, and hit
callbacks are added only when a real navigation, capture, or picking consumer
earns them; they are not speculative methods in the first slice.

It owns:

- Babylon engine, scene, cameras, lights, materials, meshes, sprites, textures,
  input observers, render loop, and disposal;
- mapping stable product IDs to Babylon nodes;
- deterministic projection of a `StudioProjection` into the current scene;
- resource reference counting inside one mounted world;
- device capability/fault reporting.

It does not own:

- the User, Studio aggregate, Projects, Spark, or Resonance;
- persistence or migrations;
- generation-provider state;
- Artifact editing;
- World Kit ZIP parsing or trust decisions;
- a second engine contract.

Deleting this module would spread Babylon lifecycle and resource rules into UI
and domain callers, so the module earns its depth. Adding a `RendererAdapter`
would not remove current complexity because there is no second implementation.

## State projection

Persisted product state contains stable IDs and values only:

```ts
type StudioProjection = {
  style: StudioStyleProjection;
  wisp: WispStyleProjection;
  wispCue: "idle" | "previewing" | "displaying";
  acceptedRevision: number | null;
  displayAssetId: string | null;
};
```

Projection is one-way and idempotent. Any later pointer-hit consumer must use a
specific product callback and never mutate the Workspace silently. Hover,
selection highlight, camera interpolation, and runtime handles are ephemeral.

## Assets

### Canonical runtime forms

- `.glb` for 3D scene/prop assets;
- PNG/WebP for generated and ordinary textures;
- PNG/WebP atlas plus strict frame JSON for sprites;
- optional KTX2 as an optimized publication output after decoder hosting is
  pinned and tested.

Other formats are converted before publication. Importing an FBX or BLEND file
successfully does not make it a public runtime contract.

### Generated assets

A generated image is stored as a local Blob under a stable asset ID. Runtime
object URLs are created on demand and revoked when the texture or Workbench
projection is disposed. Expiring provider URLs never enter persisted state.

v0 places generated content only in known image/decal/display slots. It does
not generate arbitrary geometry, collision, navigation, animation graphs, or
shaders.

### Decoder policy

Draco, Meshopt, and KTX2/Basis paths may require external decoders. Production
must pin and self-host any decoder files instead of relying on a mutable public
CDN, preserving CSP, privacy, offline behavior, and reproducibility.

## Render profiles

### Ordinary 3D

- perspective or orthographic camera;
- linear texture sampling;
- PBR or bounded first-party materials;
- device-appropriate shadow and post-process quality.

### 2.5D/isometric

- orthographic camera and fixed azimuth/elevation;
- 3D shell plus billboard/sprite Wisps;
- bounded camera movement and deterministic depth behavior;
- no separate 2D engine.

### Pixel/mixed

- nearest-neighbor sampling for declared pixel assets;
- optional fixed virtual resolution and integer scaling;
- pixel-aligned sprite placement and atlas padding;
- anti-aliasing/post-processing disabled where the profile requires it;
- PBR mesh and pixel Wisp may coexist; the profile defines how scale, shadow,
  palette, and lighting make the mix intentional.

A profile changes rendering parameters and assets. It does not change domain
behavior or grant executable capabilities.

## Lifecycle

Mount:

1. receive a trusted bundled `StudioKitProjection`; an untrusted World Kit must
   first pass the separate future importer;
2. create the engine and compatibility-path scene;
3. load each asset into an isolated container;
4. create semantic node/slot/anchor indexes;
5. apply the initial `StudioProjection`;
6. start the render loop and observers.

Dispose:

1. stop the render loop;
2. remove resize/input/scene observers;
3. revoke owned object URLs;
4. dispose asset containers, sprites, textures, materials, meshes, scene, and
   engine in ownership order;
5. clear ID maps and report any tracked resource still referenced.

The repeat-mount test runs the complete lifecycle 20 times and requires every
tracked owned-resource count to return to zero after each cycle. Real WebGL gets
a smoke test; deterministic CI does not assert browser GC or memory counters.

## Compatibility and fallback

- WebGL2 is required for the authoring prototype.
- Capability detection may enable WebGPU later, but a WebGPU failure falls back
  to WebGL2 before loading user content.
- A reduced-quality profile can disable shadows, post-processing, high-DPI
  rendering, and nonessential animation.
- If 3D cannot initialize, the product presents a clear diagnostic and retains
  access to the Brief and Workbench; it does not silently lose user work.
- Mobile v0 is a viewing/compatibility target, not a promise of full poster
  authoring ergonomics.

## Reference-scene budgets

World Kit importer ceilings are defined in
[the protocol](../protocols/world-kit-v0.md). The first-party reference scene
adds experience budgets:

- first useful frame and first interactive time recorded separately;
- ordinary Studio navigation targets a steady 30 FPS on the selected Android
  mid-range device and 60 FPS on the demo laptop;
- pointer-to-highlight response targets under 100 ms on the demo laptop;
- one generated 1024–1536 px image can replace a display texture without a
  long main-thread task over 100 ms;
- continuous resource growth after 20 kit reloads is a release blocker.

These are acceptance targets, not claims that Babylon.js universally achieves
them.

## Babylon/PlayCanvas Spike

Before treating Babylon.js as commercially locked, implement the same one-day
reference scene in Babylon.js and PlayCanvas Engine:

- one PBR GLB with transparency and animation;
- 200 sprites and one replaceable generated display texture;
- perspective, orthographic, and nearest-sampling profile switches;
- React panel controlling one material and one display slot;
- picking, screenshot, disposal, and reload;
- Chrome, Safari, and the selected Android device.

Record cold bytes, first frame, first interaction, P95 frame time, peak memory,
input latency, integration effort, and resource release. Change the ADR only if
PlayCanvas materially lowers total implementation/risk for the same product
behavior; visual preference without equal content is not evidence.

## Deferred triggers

- second renderer working against accepted behavior → extract common renderer
  interface from both implementations;
- arbitrary prop placement becomes a validated user need → add a bounded prop
  slot protocol before a world editor;
- custom characters become a validated need → define one supported rig and
  animation contract before accepting arbitrary skeletons;
- native-first product decision → evaluate a wrapper, Unity, or another native
  runtime from measured requirements rather than adding adapters preemptively.
