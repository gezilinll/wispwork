import {
  AbstractEngine,
  ArcRotateCamera,
  Color3,
  Color4,
  DirectionalLight,
  Engine,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  PBRMaterial,
  PointLight,
  Scene,
  ShadowGenerator,
  Vector3,
} from "@babylonjs/core";

import {
  mountOpeningStudioScene,
  type MountOpeningStudioScene,
  type OpeningStudioSceneMount,
} from "./openingStudioScene";

export type StudioFault = Readonly<{
  code: "webgl2-unavailable" | "mount-failed";
  message: string;
}>;

export type StudioKitProjection = Readonly<{
  id: "opening-studio-v1";
  camera: Readonly<{
    projection: "perspective";
    preset: "weak-perspective-three-quarter";
    fov: 0.58;
  }>;
}>;

export type StudioStyleProjection = Readonly<{
  clear: string;
  keyLight: string;
  materialTint: string;
  surfaceTreatment: "soft-pbr" | "pixel-mixed";
}>;

export type StudioProjection = Readonly<{
  style: StudioStyleProjection;
  wispCue: "idle" | "previewing" | "displaying";
  acceptedRevision: number | null;
  displayAssetId: string | null;
}>;

export type StudioResourceCounts = Readonly<{
  engines: number;
  scenes: number;
  meshes: number;
  materials: number;
  textures: number;
  observers: number;
  containers: number;
}>;

export type StudioSceneDiagnostics = Readonly<{
  triangleCount: number;
  semanticRoots: readonly [
    "studio-shell",
    "studio-workbench",
    "studio-archive",
    "studio-artifact-display",
  ];
}>;

type StudioRuntimeOptions = Readonly<{
  onFault(fault: StudioFault): void;
  testEngine?: AbstractEngine;
  testSceneMount?: MountOpeningStudioScene;
}>;

class StudioMountFault extends Error {
  constructor(readonly fault: StudioFault) {
    super(fault.message);
  }
}

const homeView = Object.freeze({
  alpha: -0.92,
  beta: 1.1,
  radius: 20.8,
  target: new Vector3(-0.35, 0.92, 0.2),
});

export class StudioRuntime {
  private readonly onFault: StudioRuntimeOptions["onFault"];
  private readonly testEngine?: AbstractEngine;
  private readonly testSceneMount?: MountOpeningStudioScene;
  private engine: AbstractEngine | null = null;
  private scene: Scene | null = null;
  private camera: ArcRotateCamera | null = null;
  private sceneMount: OpeningStudioSceneMount | null = null;
  private styleMaterial: PBRMaterial | null = null;
  private mountGeneration = 0;
  private hasRenderLoop = false;
  private hasFrozenStaticWorld = false;
  private readonly contextMeshes: Mesh[] = [];
  private readonly observerDisposers: Array<() => void> = [];

  constructor(options: StudioRuntimeOptions) {
    this.onFault = options.onFault;
    this.testEngine = options.testEngine;
    this.testSceneMount = options.testSceneMount;
  }

  async mount(canvas: HTMLCanvasElement | null, kit: StudioKitProjection): Promise<void> {
    const mountGeneration = ++this.mountGeneration;
    if (kit.id !== "opening-studio-v1") {
      this.onFault({ code: "mount-failed", message: "The bundled Studio kit is unavailable." });
      return;
    }

    try {
      const engine = this.testEngine ?? this.createWebGL2Engine(canvas);
      this.engine = engine;
      if (!this.testEngine) engine.setHardwareScalingLevel(1.3);
      const scene = new Scene(engine);
      this.scene = scene;
      scene.clearColor = Color4.FromHexString("#201a16ff");
      scene.imageProcessingConfiguration.exposure = 0.98;
      scene.imageProcessingConfiguration.contrast = 1.06;

      this.camera = this.createCamera(scene, canvas, kit);
      const shadowGenerator = this.createLighting(scene);
      this.createFloatingContext(scene);

      const sceneMount = await (this.testSceneMount ?? mountOpeningStudioScene)(scene);
      if (mountGeneration !== this.mountGeneration) {
        for (const container of sceneMount.containers) container.dispose();
        scene.dispose();
        engine.dispose();
        return;
      }
      this.sceneMount = sceneMount;
      this.styleMaterial = sceneMount.styleMaterial;
      this.configureShadows(sceneMount, shadowGenerator);
    } catch (error) {
      if (mountGeneration !== this.mountGeneration) return;
      await this.dispose();
      if (error instanceof StudioMountFault) {
        this.onFault(error.fault);
        return;
      }
      this.onFault({
        code: "mount-failed",
        message: error instanceof Error ? error.message : "The Studio could not start.",
      });
    }
  }

  project(projection: StudioProjection): void {
    if (!this.scene) return;
    this.scene.clearColor = Color4.FromHexString(`${projection.style.clear}ff`);
    const key = this.scene.getLightByName("studio-key");
    if (key) key.diffuse = Color3.FromHexString(projection.style.keyLight);
    if (this.styleMaterial) {
      this.styleMaterial.albedoColor = Color3.FromHexString(projection.style.materialTint);
    }
    if (!this.hasFrozenStaticWorld) {
      for (const mesh of this.scene.meshes) mesh.freezeWorldMatrix();
      this.hasFrozenStaticWorld = true;
    }
    this.scene.render();
    this.scene.freezeActiveMeshes();
    if (!this.hasRenderLoop && this.engine) {
      this.engine.runRenderLoop(() => this.scene?.render());
      this.hasRenderLoop = true;
    }
  }

  returnToOverview(): void {
    if (!this.camera) return;
    this.camera.inertialAlphaOffset = 0;
    this.camera.inertialBetaOffset = 0;
    this.camera.inertialRadiusOffset = 0;
    this.camera.inertialPanningX = 0;
    this.camera.inertialPanningY = 0;
    this.camera.alpha = homeView.alpha;
    this.camera.beta = homeView.beta;
    this.camera.radius = homeView.radius;
    this.camera.setTarget(homeView.target);
    this.camera.panningSensibility = 0;
  }

  readOwnedResourceCounts(): StudioResourceCounts {
    return {
      engines: this.engine ? 1 : 0,
      scenes: this.scene ? 1 : 0,
      meshes: this.scene?.meshes.length ?? 0,
      materials: this.scene?.materials.length ?? 0,
      textures: this.scene?.textures.length ?? 0,
      observers: this.observerDisposers.length,
      containers: this.sceneMount?.containers.length ?? 0,
    };
  }

  readSceneDiagnostics(): StudioSceneDiagnostics {
    if (!this.sceneMount) throw new Error("Opening Studio is not mounted.");
    const { roots } = this.sceneMount;
    return {
      triangleCount: this.sceneMount.triangleCount,
      semanticRoots: [
        roots.shell.name as "studio-shell",
        roots.workbench.name as "studio-workbench",
        roots.archive.name as "studio-archive",
        roots.display.name as "studio-artifact-display",
      ],
    };
  }

  async dispose(): Promise<void> {
    this.mountGeneration += 1;
    this.engine?.stopRenderLoop();
    for (const removeObserver of this.observerDisposers.splice(0)) removeObserver();
    this.camera?.detachControl();
    if (this.sceneMount) {
      for (const container of this.sceneMount.containers) container.dispose();
    }
    this.scene?.dispose();
    this.engine?.dispose();
    this.contextMeshes.length = 0;
    this.camera = null;
    this.sceneMount = null;
    this.styleMaterial = null;
    this.hasRenderLoop = false;
    this.hasFrozenStaticWorld = false;
    this.scene = null;
    this.engine = null;
  }

  private createCamera(
    scene: Scene,
    canvas: HTMLCanvasElement | null,
    kit: StudioKitProjection,
  ): ArcRotateCamera {
    const camera = new ArcRotateCamera(
      "opening-overview-camera",
      homeView.alpha,
      homeView.beta,
      homeView.radius,
      homeView.target.clone(),
      scene,
    );
    camera.mode = ArcRotateCamera.PERSPECTIVE_CAMERA;
    camera.fov = kit.camera.fov;
    camera.lowerAlphaLimit = -1.05;
    camera.upperAlphaLimit = -0.58;
    camera.lowerBetaLimit = 0.94;
    camera.upperBetaLimit = 1.3;
    camera.lowerRadiusLimit = 18.5;
    camera.upperRadiusLimit = 22;
    camera.panningSensibility = 0;
    camera.wheelDeltaPercentage = 0.01;
    if (canvas) camera.attachControl(canvas, true);
    scene.activeCamera = camera;

    if (!this.testEngine && typeof window !== "undefined") {
      const resize = () => scene.getEngine().resize();
      window.addEventListener("resize", resize, { passive: true });
      this.observerDisposers.push(() => window.removeEventListener("resize", resize));
    }
    return camera;
  }

  private createLighting(scene: Scene): ShadowGenerator {
    const fill = new HemisphericLight("studio-fill", new Vector3(0, 1, 0), scene);
    fill.diffuse = Color3.FromHexString("#d8b49b");
    fill.groundColor = Color3.FromHexString("#170c11");
    fill.intensity = 0.55;

    const key = new DirectionalLight("studio-key", new Vector3(-0.6, -1, 0.35), scene);
    key.position = new Vector3(3.5, 7.5, -4.5);
    key.autoCalcShadowZBounds = true;
    key.intensity = 2.4;
    key.diffuse = Color3.FromHexString("#ffd3a0");

    const taskLight = new PointLight("task-light", new Vector3(0.8, 2.5, -0.35), scene);
    taskLight.diffuse = Color3.FromHexString("#ffc47c");
    taskLight.intensity = 1.12;
    taskLight.range = 5.4;
    taskLight.radius = 0.12;

    const shadows = new ShadowGenerator(512, key, true);
    shadows.useBlurExponentialShadowMap = true;
    shadows.blurKernel = 12;
    shadows.bias = 0.0015;
    shadows.normalBias = 0.03;
    return shadows;
  }

  private createFloatingContext(scene: Scene): void {
    const rock = this.material(scene, "fragment-stone", "#0d0a0e", 0, 1);
    const brass = this.material(scene, "context-brass", "#a96d2c", 0.76, 0.32);
    const paper = this.material(scene, "brief-paper", "#e3c486", 0.01, 0.74);
    const underlay = this.material(scene, "brief-underlay-woven", "#71382f", 0.01, 0.92);
    const anomaly = this.material(scene, "dormant-anomaly", "#806bc6", 0.18, 0.3);
    anomaly.emissiveColor = Color3.FromHexString("#7857bd");
    anomaly.emissiveIntensity = 0.72;
    const orbital = this.material(scene, "orbital-seam", "#493c69", 0.08, 0.64);
    orbital.emissiveColor = Color3.FromHexString("#201535");

    const fragment = this.mesh(
      "fragment",
      MeshBuilder.CreateIcoSphere("fragment", {
        flat: true,
        radius: 5,
        subdivisions: 2,
      }, scene),
      rock,
      new Vector3(0, -1.08, 0),
    );
    fragment.scaling = new Vector3(1, 0.24, 0.68);
    fragment.receiveShadows = true;

    const rim = this.mesh(
      "fragment-rim",
      MeshBuilder.CreateTorus("fragment-rim", { diameter: 9.7, thickness: 0.13, tessellation: 48 }, scene),
      brass,
      new Vector3(0, 0.04, 0),
    );
    rim.scaling.z = 0.68;
    const crown = this.mesh(
      "fragment-crown",
      MeshBuilder.CreateTorus("fragment-crown", { diameter: 7.55, thickness: 0.07, tessellation: 48 }, scene),
      orbital,
      new Vector3(0, -1.16, 0),
    );
    crown.scaling.z = 0.68;

    const briefUnderlay = this.box(
      scene,
      "brief-underlay",
      1.85,
      0.025,
      1.08,
      underlay,
      new Vector3(0.12, 1.455, -0.72),
    );
    briefUnderlay.receiveShadows = true;
    const sheetA = this.box(
      scene,
      "brief-sheet-a",
      0.92,
      0.018,
      0.72,
      paper,
      new Vector3(-0.28, 1.478, -0.72),
    );
    sheetA.rotation.y = -0.08;
    const sheetB = this.box(
      scene,
      "brief-sheet-b",
      0.72,
      0.02,
      0.52,
      paper,
      new Vector3(0.53, 1.48, -0.64),
    );
    sheetB.rotation.y = 0.12;

    const portalCenter = new Vector3(-3.35, 0.88, 1.12);
    this.box(scene, "portal-base", 1.25, 0.2, 0.7, rock, new Vector3(portalCenter.x, 0.3, portalCenter.z));
    this.box(scene, "portal-jamb-left", 0.2, 0.82, 0.22, brass, new Vector3(portalCenter.x - 0.54, 0.63, portalCenter.z));
    this.box(scene, "portal-jamb-right", 0.2, 0.82, 0.22, brass, new Vector3(portalCenter.x + 0.54, 0.63, portalCenter.z));
    const portalPath = Array.from({ length: 17 }, (_, index) => {
      const angle = Math.PI - (index / 16) * Math.PI;
      return new Vector3(
        portalCenter.x + Math.cos(angle) * 0.54,
        portalCenter.y + Math.sin(angle) * 0.76,
        portalCenter.z,
      );
    });
    this.mesh(
      "portal-frame",
      MeshBuilder.CreateTube("portal-frame", { path: portalPath, radius: 0.09, tessellation: 12 }, scene),
      brass,
      Vector3.Zero(),
    );
    for (let index = 0; index < 7; index += 1) {
      const angle = Math.PI - (index / 6) * Math.PI;
      const stone = this.box(
        scene,
        `portal-stone-${index}`,
        0.28,
        0.2,
        0.18,
        rock,
        new Vector3(
          portalCenter.x + Math.cos(angle) * 0.66,
          portalCenter.y + Math.sin(angle) * 0.88,
          portalCenter.z - 0.03,
        ),
      );
      stone.rotation.z = angle - Math.PI / 2;
    }
    this.mesh(
      "portal-glow",
      MeshBuilder.CreateDisc("portal-glow", { radius: 0.39, tessellation: 32 }, scene),
      anomaly,
      new Vector3(portalCenter.x, portalCenter.y + 0.04, portalCenter.z + 0.04),
    );
  }

  private configureShadows(
    mount: OpeningStudioSceneMount,
    shadowGenerator: ShadowGenerator,
  ): void {
    for (const mesh of this.contextMeshes) {
      if (["brief-underlay", "brief-sheet-a", "brief-sheet-b", "portal-frame"].includes(mesh.name)) {
        shadowGenerator.addShadowCaster(mesh);
      }
    }
    for (const root of Object.values(mount.roots)) {
      for (const mesh of root.getChildMeshes()) {
        if (mesh.material?.name !== "opening-sorted-glass") {
          shadowGenerator.addShadowCaster(mesh);
        }
        if (
          mesh.name.includes("platform")
          || mesh.name.includes("workbench_top")
          || mesh.name.includes("display_empty_deck")
          || mesh.name.includes("cabinet")
        ) {
          mesh.receiveShadows = true;
        }
      }
    }
  }

  private createWebGL2Engine(canvas: HTMLCanvasElement | null): Engine {
    if (!canvas) {
      throw new StudioMountFault({ code: "mount-failed", message: "A Studio canvas is required." });
    }
    if (!canvas.getContext("webgl2")) {
      throw new StudioMountFault({ code: "webgl2-unavailable", message: "WebGL2 is required for the Studio." });
    }
    const engine = new Engine(canvas, true, { stencil: true });
    if (engine.webGLVersion < 2) {
      engine.dispose();
      throw new StudioMountFault({ code: "webgl2-unavailable", message: "WebGL2 is required for the Studio." });
    }
    return engine;
  }

  private material(
    scene: Scene,
    name: string,
    color: string,
    metallic: number,
    roughness: number,
  ): PBRMaterial {
    const material = new PBRMaterial(name, scene);
    material.albedoColor = Color3.FromHexString(color);
    material.metallic = metallic;
    material.roughness = roughness;
    return material;
  }

  private box(
    scene: Scene,
    name: string,
    width: number,
    height: number,
    depth: number,
    material: PBRMaterial,
    position: Vector3,
  ): Mesh {
    return this.mesh(
      name,
      MeshBuilder.CreateBox(name, { width, height, depth }, scene),
      material,
      position,
    );
  }

  private mesh(
    name: string,
    mesh: Mesh,
    material: PBRMaterial,
    position: Vector3,
  ): Mesh {
    mesh.name = name;
    mesh.material = material;
    mesh.position = position;
    this.contextMeshes.push(mesh);
    return mesh;
  }
}
