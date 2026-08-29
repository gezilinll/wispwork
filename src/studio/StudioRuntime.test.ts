import {
  ArcRotateCamera,
  AssetContainer,
  DirectionalLight,
  NullEngine,
  PBRMaterial,
  Scene,
  TransformNode,
} from "@babylonjs/core";
import { describe, expect, test } from "vitest";

import { StudioRuntime } from "./StudioRuntime";

function createTestSceneMount(scene: Scene) {
  return Promise.resolve({
    containers: [],
    roots: {
      shell: new TransformNode("studio-shell", scene),
      workbench: new TransformNode("studio-workbench", scene),
      archive: new TransformNode("studio-archive", scene),
      display: new TransformNode("studio-artifact-display", scene),
    },
    styleMaterial: new PBRMaterial("studio-style-surface", scene),
    triangleCount: 32,
  });
}

function createTestRuntime(engine: NullEngine) {
  return new StudioRuntime({
    onFault: () => undefined,
    testEngine: engine,
    testSceneMount: createTestSceneMount,
  });
}

describe("StudioRuntime", () => {
  test("reports one typed WebGL2 fault when preflight cannot create a context", async () => {
    const faults: string[] = [];
    const runtime = new StudioRuntime({
      onFault: (fault) => faults.push(fault.code),
    });

    await runtime.mount({ getContext: () => null } as unknown as HTMLCanvasElement, {
      id: "opening-studio-v1",
      camera: { projection: "perspective", preset: "weak-perspective-three-quarter", fov: 0.58 },
    });

    expect(faults).toEqual(["webgl2-unavailable"]);
    expect(runtime.readOwnedResourceCounts()).toEqual({
      engines: 0,
      scenes: 0,
      meshes: 0,
      materials: 0,
      textures: 0,
      observers: 0,
      containers: 0,
    });
  });

  test("composes the retained context around four concrete semantic roots", async () => {
    const engine = new NullEngine();
    const runtime = createTestRuntime(engine);

    await runtime.mount(null, {
      id: "opening-studio-v1",
      camera: { projection: "perspective", preset: "weak-perspective-three-quarter", fov: 0.58 },
    });

    const scene = engine.scenes[0]!;
    for (const name of [
      "studio-shell",
      "studio-workbench",
      "studio-archive",
      "studio-artifact-display",
      "fragment",
      "fragment-rim",
      "fragment-crown",
      "brief-sheet-a",
      "brief-underlay",
      "portal-frame",
      "portal-stone-0",
    ]) {
      expect(scene.getNodeByName(name)).not.toBeNull();
    }

    await runtime.dispose();
  });

  test("gives the focal Studio surfaces soft directional contact shadows without making the portal a backdrop", async () => {
    const engine = new NullEngine();
    const runtime = createTestRuntime(engine);
    await runtime.mount(null, {
      id: "opening-studio-v1",
      camera: { projection: "perspective", preset: "weak-perspective-three-quarter", fov: 0.58 },
    });

    const scene = engine.scenes[0]!;
    const key = scene.getLightByName("studio-key") as DirectionalLight | null;
    const portalGlow = scene.getMeshByName("portal-glow");
    const anomaly = scene.getMaterialByName("dormant-anomaly") as PBRMaterial | null;
    const shadows = key?.getShadowGenerator();

    expect(scene.lights.map((light) => light.name).sort()).toEqual(["studio-fill", "studio-key", "task-light"]);
    expect(shadows?.getShadowMap()?.getSize()).toEqual({ width: 512, height: 512 });
    expect(shadows?.getShadowMap()?.renderList?.map((mesh) => mesh.name)).toEqual(expect.arrayContaining([
      "brief-underlay",
      "portal-frame",
    ]));
    expect(scene.getMeshByName("fragment")?.receiveShadows).toBe(true);
    expect(scene.getMeshByName("brief-underlay")?.receiveShadows).toBe(true);
    expect(portalGlow?.position.x).toBeGreaterThan(-4);
    expect(portalGlow?.position.z).toBeLessThan(1.5);
    expect(anomaly?.emissiveIntensity).toBeLessThan(1);
    expect(portalGlow?.rotation.y).toBe(0);

    await runtime.dispose();
  });

  test("restores the pinned overview camera and releases every owned resource", async () => {
    const engine = new NullEngine();
    const runtime = new StudioRuntime({
      onFault: (fault) => {
        throw new Error(fault.message);
      },
      testEngine: engine,
      testSceneMount: createTestSceneMount,
    });

    await runtime.mount(null, {
      id: "opening-studio-v1",
      camera: {
        projection: "perspective",
        preset: "weak-perspective-three-quarter",
        fov: 0.58,
      },
    });
    runtime.project({
      style: {
        clear: "#201a16",
        keyLight: "#ffd3a0",
        materialTint: "#a96f42",
        surfaceTreatment: "soft-pbr",
      },
      wispCue: "idle",
      acceptedRevision: null,
      displayAssetId: null,
    });

    const scene = engine.scenes[0]!;
    const camera = scene.activeCamera;
    expect(camera).toBeInstanceOf(ArcRotateCamera);
    expect(camera?.mode).toBe(ArcRotateCamera.PERSPECTIVE_CAMERA);
    expect(camera?.fov).toBe(0.58);
    expect(scene.clearColor.toHexString()).toBe("#201A16FF");

    const overview = {
      alpha: (camera as ArcRotateCamera).alpha,
      beta: (camera as ArcRotateCamera).beta,
      radius: (camera as ArcRotateCamera).radius,
      target: (camera as ArcRotateCamera).target.clone(),
    };
    (camera as ArcRotateCamera).alpha += 0.2;
    (camera as ArcRotateCamera).beta += 0.1;
    (camera as ArcRotateCamera).radius += 2;
    (camera as ArcRotateCamera).inertialAlphaOffset = 0.3;
    (camera as ArcRotateCamera).inertialBetaOffset = -0.2;
    (camera as ArcRotateCamera).inertialRadiusOffset = 1.5;

    runtime.returnToOverview();

    expect((camera as ArcRotateCamera).alpha).toBe(overview.alpha);
    expect((camera as ArcRotateCamera).beta).toBe(overview.beta);
    expect((camera as ArcRotateCamera).radius).toBe(overview.radius);
    expect((camera as ArcRotateCamera).target.equals(overview.target)).toBe(true);
    expect((camera as ArcRotateCamera).inertialAlphaOffset).toBe(0);
    expect((camera as ArcRotateCamera).inertialBetaOffset).toBe(0);
    expect((camera as ArcRotateCamera).inertialRadiusOffset).toBe(0);
    expect((camera as ArcRotateCamera).panningSensibility).toBe(0);
    expect((camera as ArcRotateCamera).lowerRadiusLimit).toBeTypeOf("number");
    expect((camera as ArcRotateCamera).upperRadiusLimit).toBeTypeOf("number");
    expect((camera as ArcRotateCamera).lowerAlphaLimit).toBeTypeOf("number");
    expect((camera as ArcRotateCamera).upperBetaLimit).toBeTypeOf("number");

    await runtime.dispose();

    expect(runtime.readOwnedResourceCounts()).toEqual({
      engines: 0,
      scenes: 0,
      meshes: 0,
      materials: 0,
      textures: 0,
      observers: 0,
      containers: 0,
    });
  });

  test("reports bounded scene diagnostics from the mounted concrete scene", async () => {
    const engine = new NullEngine();
    const runtime = createTestRuntime(engine);

    await runtime.mount(null, {
      id: "opening-studio-v1",
      camera: { projection: "perspective", preset: "weak-perspective-three-quarter", fov: 0.58 },
    });

    const diagnostics = runtime.readSceneDiagnostics();
    expect(diagnostics).toEqual({
      triangleCount: 32,
      semanticRoots: [
        "studio-shell",
        "studio-workbench",
        "studio-archive",
        "studio-artifact-display",
      ],
    });
    expect(diagnostics.triangleCount).toBeLessThanOrEqual(50_000);
    expect(runtime.readOwnedResourceCounts().containers).toBe(0);

    await runtime.dispose();
  });

  test("renders the projected first frame before the viewport can report ready", async () => {
    const engine = new NullEngine();
    const runtime = createTestRuntime(engine);
    await runtime.mount(null, {
      id: "opening-studio-v1",
      camera: { projection: "perspective", preset: "weak-perspective-three-quarter", fov: 0.58 },
    });
    const scene = engine.scenes[0]!;
    const beforeProject = scene.getRenderId();

    runtime.project({
      style: {
        clear: "#201a16",
        keyLight: "#ffd3a0",
        materialTint: "#a96f42",
        surfaceTreatment: "soft-pbr",
      },
      wispCue: "idle",
      acceptedRevision: null,
      displayAssetId: null,
    });

    expect(scene.getRenderId()).toBeGreaterThan(beforeProject);
    await runtime.dispose();
  });

  test("keeps the styled material mutable for a later projection", async () => {
    const engine = new NullEngine();
    const runtime = createTestRuntime(engine);
    await runtime.mount(null, {
      id: "opening-studio-v1",
      camera: { projection: "perspective", preset: "weak-perspective-three-quarter", fov: 0.58 },
    });
    const scene = engine.scenes[0]!;
    const plaster = scene.getMaterialByName("studio-style-surface") as PBRMaterial | null;

    runtime.project({
      style: { clear: "#201a16", keyLight: "#ffd3a0", materialTint: "#a96f42", surfaceTreatment: "soft-pbr" },
      wispCue: "idle",
      acceptedRevision: null,
      displayAssetId: null,
    });
    runtime.project({
      style: { clear: "#201a16", keyLight: "#ffd3a0", materialTint: "#2a7d75", surfaceTreatment: "soft-pbr" },
      wispCue: "idle",
      acceptedRevision: null,
      displayAssetId: null,
    });

    expect(plaster?.isFrozen).toBe(false);
    expect(plaster?.albedoColor.toHexString()).toBe("#2A7D75");
    await runtime.dispose();
  });

  test("releases all owned resources across twenty mount/project/reset/dispose cycles", async () => {
    for (let cycle = 0; cycle < 20; cycle += 1) {
      const engine = new NullEngine();
      const runtime = createTestRuntime(engine);

      await runtime.mount(null, {
        id: "opening-studio-v1",
        camera: { projection: "perspective", preset: "weak-perspective-three-quarter", fov: 0.58 },
      });
      runtime.project({
        style: {
          clear: "#201a16",
          keyLight: "#ffd3a0",
          materialTint: "#a96f42",
          surfaceTreatment: "soft-pbr",
        },
        wispCue: "idle",
        acceptedRevision: null,
        displayAssetId: null,
      });
      runtime.returnToOverview();
      await runtime.dispose();

      expect(runtime.readOwnedResourceCounts()).toEqual({
        engines: 0,
        scenes: 0,
        meshes: 0,
        materials: 0,
        textures: 0,
        observers: 0,
        containers: 0,
      });
    }
  });

  test("does not retain a late scene mount after disposal", async () => {
    const engine = new NullEngine();
    const faults: string[] = [];
    let finishLoading!: () => void;
    let loadingStarted!: () => void;
    const loading = new Promise<void>((resolve) => {
      finishLoading = resolve;
    });
    const started = new Promise<void>((resolve) => {
      loadingStarted = resolve;
    });
    const runtime = new StudioRuntime({
      onFault: (fault) => faults.push(fault.code),
      testEngine: engine,
      testSceneMount: async (scene) => {
        const mount = {
          containers: [new AssetContainer(scene)],
          roots: {
            shell: new TransformNode("studio-shell", scene),
            workbench: new TransformNode("studio-workbench", scene),
            archive: new TransformNode("studio-archive", scene),
            display: new TransformNode("studio-artifact-display", scene),
          },
          styleMaterial: new PBRMaterial("studio-style-surface", scene),
          triangleCount: 32,
        };
        loadingStarted();
        await loading;
        return mount;
      },
    });

    const mounting = runtime.mount(null, {
      id: "opening-studio-v1",
      camera: { projection: "perspective", preset: "weak-perspective-three-quarter", fov: 0.58 },
    });
    await started;
    await runtime.dispose();
    finishLoading();
    await mounting;

    expect(faults).toEqual([]);
    expect(runtime.readOwnedResourceCounts()).toEqual({
      engines: 0,
      scenes: 0,
      meshes: 0,
      materials: 0,
      textures: 0,
      observers: 0,
      containers: 0,
    });
  });
});
