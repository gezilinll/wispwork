import {
  Color3,
  LoadAssetContainerAsync,
  PBRMaterial,
  Texture,
  TransformNode,
  Vector3,
  type AbstractMesh,
  type AssetContainer,
  type Scene,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

export type OpeningStudioSceneMount = Readonly<{
  containers: readonly AssetContainer[];
  roots: Readonly<{
    shell: TransformNode;
    workbench: TransformNode;
    archive: TransformNode;
    display: TransformNode;
  }>;
  styleMaterial: PBRMaterial;
  triangleCount: number;
}>;

export type MountOpeningStudioScene = (
  scene: Scene,
) => Promise<OpeningStudioSceneMount>;

const modelSources = [
  "/assets/opening-studio/first-party/opening-studio-shell.glb",
  "/assets/opening-studio/first-party/opening-studio-display.glb",
  "/assets/opening-studio/poly-haven/WoodenTable_01_1k.glb",
  "/assets/opening-studio/poly-haven/painted_wooden_cabinet_1k.glb",
] as const;

const materialSources = {
  wood: {
    albedo: "/assets/opening-studio/poly-haven/fine_grained_wood_col_1k.jpg",
    normal: "/assets/opening-studio/poly-haven/fine_grained_wood_nor_gl_1k.jpg",
    arm: "/assets/opening-studio/poly-haven/fine_grained_wood_arm_1k.jpg",
  },
  plaster: {
    albedo: "/assets/opening-studio/poly-haven/plastered_wall_03_diff_1k.jpg",
    normal: "/assets/opening-studio/poly-haven/plastered_wall_03_nor_gl_1k.jpg",
    arm: "/assets/opening-studio/poly-haven/plastered_wall_03_arm_1k.jpg",
  },
} as const;

type LoadedTextures = Readonly<{
  woodAlbedo: Texture;
  woodNormal: Texture;
  woodArm: Texture;
  plasterAlbedo: Texture;
  plasterNormal: Texture;
  plasterArm: Texture;
}>;

type StudioMaterials = Readonly<{
  wood: PBRMaterial;
  darkWood: PBRMaterial;
  plaster: PBRMaterial;
  style: PBRMaterial;
  brass: PBRMaterial;
  glass: PBRMaterial;
}>;

function loadTexture(scene: Scene, name: string, url: string): Promise<Texture> {
  return new Promise((resolve, reject) => {
    let texture: Texture;
    texture = new Texture(
      url,
      scene,
      false,
      false,
      Texture.TRILINEAR_SAMPLINGMODE,
      () => {
        texture.name = name;
        texture.wrapU = Texture.WRAP_ADDRESSMODE;
        texture.wrapV = Texture.WRAP_ADDRESSMODE;
        resolve(texture);
      },
      (message, exception) => {
        texture?.dispose();
        reject(exception instanceof Error ? exception : new Error(message ?? `Unable to load ${url}`));
      },
    );
  });
}

async function loadTextures(scene: Scene): Promise<LoadedTextures> {
  const requests = [
    ["wood-albedo", materialSources.wood.albedo],
    ["wood-normal", materialSources.wood.normal],
    ["wood-arm", materialSources.wood.arm],
    ["plaster-albedo", materialSources.plaster.albedo],
    ["plaster-normal", materialSources.plaster.normal],
    ["plaster-arm", materialSources.plaster.arm],
  ] as const;
  const results = await Promise.allSettled(
    requests.map(([name, url]) => loadTexture(scene, name, url)),
  );
  const rejected = results.find(
    (result): result is PromiseRejectedResult => result.status === "rejected",
  );
  if (rejected) {
    for (const result of results) {
      if (result.status === "fulfilled") result.value.dispose();
    }
    throw rejected.reason;
  }

  const textures = results.map((result) => {
    if (result.status !== "fulfilled") throw new Error("Opening Studio texture loading was incomplete.");
    return result.value;
  });
  const [woodAlbedo, woodNormal, woodArm, plasterAlbedo, plasterNormal, plasterArm] = textures;
  woodNormal.gammaSpace = false;
  woodArm.gammaSpace = false;
  plasterNormal.gammaSpace = false;
  plasterArm.gammaSpace = false;
  return { woodAlbedo, woodNormal, woodArm, plasterAlbedo, plasterNormal, plasterArm };
}

function texturedMaterial(
  scene: Scene,
  name: string,
  albedoColor: string,
  albedo: Texture,
  normal: Texture,
  arm: Texture,
): PBRMaterial {
  const material = new PBRMaterial(name, scene);
  material.albedoColor = Color3.FromHexString(albedoColor);
  material.albedoTexture = albedo;
  material.bumpTexture = normal;
  material.bumpTexture.level = 0.62;
  material.metallicTexture = arm;
  material.useRoughnessFromMetallicTextureAlpha = false;
  material.useRoughnessFromMetallicTextureGreen = true;
  material.useMetallnessFromMetallicTextureBlue = true;
  material.useAmbientOcclusionFromMetallicTextureRed = true;
  material.invertNormalMapX = false;
  material.invertNormalMapY = false;
  material.metallic = 0;
  material.roughness = 0.72;
  return material;
}

function createMaterials(scene: Scene, textures: LoadedTextures): StudioMaterials {
  const wood = texturedMaterial(
    scene,
    "opening-warm-wood",
    "#d2aa83",
    textures.woodAlbedo,
    textures.woodNormal,
    textures.woodArm,
  );
  wood.roughness = 0.58;
  const darkWood = texturedMaterial(
    scene,
    "opening-dark-wood",
    "#866047",
    textures.woodAlbedo,
    textures.woodNormal,
    textures.woodArm,
  );
  darkWood.roughness = 0.48;
  const plaster = texturedMaterial(
    scene,
    "opening-base-plaster",
    "#c79a75",
    textures.plasterAlbedo,
    textures.plasterNormal,
    textures.plasterArm,
  );
  plaster.bumpTexture!.level = 0.34;
  plaster.roughness = 0.9;
  const style = texturedMaterial(
    scene,
    "studio-style-surface",
    "#a96f42",
    textures.plasterAlbedo,
    textures.plasterNormal,
    textures.plasterArm,
  );
  style.bumpTexture!.level = 0.24;
  style.roughness = 0.82;

  const brass = new PBRMaterial("opening-aged-brass", scene);
  brass.albedoColor = Color3.FromHexString("#b47b35");
  brass.metallic = 0.84;
  brass.roughness = 0.3;

  const glass = new PBRMaterial("opening-sorted-glass", scene);
  glass.albedoColor = Color3.FromHexString("#7ca6a0");
  glass.alpha = 0.16;
  glass.metallic = 0;
  glass.roughness = 0.14;
  glass.indexOfRefraction = 1.5;
  glass.backFaceCulling = false;
  glass.separateCullingPass = true;
  glass.disableDepthWrite = true;
  glass.emissiveColor = Color3.FromHexString("#24433f");
  glass.emissiveIntensity = 0.28;
  glass.transparencyMode = PBRMaterial.PBRMATERIAL_ALPHABLEND;
  return { wood, darkWood, plaster, style, brass, glass };
}

function assignFirstPartyMaterial(mesh: AbstractMesh, materials: StudioMaterials): void {
  const originalMaterial = mesh.material?.name ?? "";
  if (mesh.name.startsWith("wood__")) {
    mesh.material = originalMaterial.includes("dark_joinery") ? materials.darkWood : materials.wood;
  } else if (mesh.name.startsWith("plaster__")) {
    mesh.material = mesh.name.includes("workbench_brief_surface")
      || mesh.name.includes("display_empty_deck")
      ? materials.style
      : materials.plaster;
  } else if (mesh.name.startsWith("brass__")) {
    mesh.material = materials.brass;
  } else if (mesh.name.startsWith("glass__")) {
    mesh.material = materials.glass;
    mesh.alphaIndex = 10;
  }
  mesh.isPickable = false;
}

function onlyContainerRoot(container: AssetContainer): AbstractMesh {
  const roots = container.meshes.filter((mesh) => mesh.parent === null);
  if (roots.length !== 1) {
    throw new Error(`Expected one GLB root, received ${roots.length}.`);
  }
  return roots[0]!;
}

function parentAndPlaceModels(
  containers: readonly AssetContainer[],
  roots: OpeningStudioSceneMount["roots"],
): void {
  const [shell, display, table, cabinet] = containers;
  const shellContainerRoot = onlyContainerRoot(shell!);
  shellContainerRoot.parent = roots.shell;
  roots.shell.position.y = 0.12;
  roots.shell.rotation.y = Math.PI;

  for (const mesh of shell!.meshes) {
    if (!mesh.name.includes("__workbench_")) continue;
    mesh.computeWorldMatrix(true);
    mesh.setParent(roots.workbench, true, true);
  }

  const tableRoot = onlyContainerRoot(table!);
  tableRoot.parent = roots.workbench;
  tableRoot.scaling.setAll(1.34);
  tableRoot.position = new Vector3(0, 0.3, -0.72);

  const cabinetRoot = onlyContainerRoot(cabinet!);
  cabinetRoot.parent = roots.archive;
  cabinetRoot.scaling.setAll(1.12);
  roots.archive.position = new Vector3(-2.62, 0.44, 1.58);
  roots.archive.rotation.y = -0.08;

  const displayRoot = onlyContainerRoot(display!);
  displayRoot.parent = roots.display;
  roots.display.position = new Vector3(2.72, 0.44, 0.52);
  roots.display.rotation.y = -0.08;
}

function tuneSupportingModels(containers: readonly AssetContainer[]): void {
  const table = containers[2]!;
  for (const material of table.materials) {
    if (!(material instanceof PBRMaterial)) continue;
    material.albedoColor = Color3.FromHexString("#8a674d");
    material.roughness = Math.max(material.roughness ?? 0.52, 0.52);
  }
  const cabinet = containers[3]!;
  for (const material of cabinet.materials) {
    if (!(material instanceof PBRMaterial)) continue;
    material.albedoColor = Color3.FromHexString("#705343");
    material.roughness = Math.max(material.roughness ?? 0.58, 0.58);
  }
  for (const mesh of [...table.meshes, ...cabinet.meshes]) mesh.isPickable = false;
}

function disposeRoots(roots: OpeningStudioSceneMount["roots"]): void {
  roots.display.dispose();
  roots.archive.dispose();
  roots.workbench.dispose();
  roots.shell.dispose();
}

export async function mountOpeningStudioScene(
  scene: Scene,
): Promise<OpeningStudioSceneMount> {
  const roots = {
    shell: new TransformNode("studio-shell", scene),
    workbench: new TransformNode("studio-workbench", scene),
    archive: new TransformNode("studio-archive", scene),
    display: new TransformNode("studio-artifact-display", scene),
  };
  const loadResults = await Promise.allSettled(
    modelSources.map((source) => LoadAssetContainerAsync(source, scene, {
      name: source.slice(source.lastIndexOf("/") + 1),
      pluginExtension: ".glb",
    })),
  );
  const rejected = loadResults.find(
    (result): result is PromiseRejectedResult => result.status === "rejected",
  );
  if (rejected) {
    for (const result of loadResults) {
      if (result.status === "fulfilled") result.value.dispose();
    }
    disposeRoots(roots);
    throw rejected.reason;
  }

  const containers = loadResults.map((result) => {
    if (result.status !== "fulfilled") throw new Error("Opening Studio model loading was incomplete.");
    return result.value;
  });
  let textures: LoadedTextures | null = null;
  let materials: StudioMaterials | null = null;
  try {
    textures = await loadTextures(scene);
    materials = createMaterials(scene, textures);
    for (const mesh of [...containers[0]!.meshes, ...containers[1]!.meshes]) {
      assignFirstPartyMaterial(mesh, materials);
    }
    tuneSupportingModels(containers);
    for (const container of containers) container.addAllToScene();
    parentAndPlaceModels(containers, roots);

    const triangleCount = containers.reduce(
      (containerTotal, container) => containerTotal + container.meshes.reduce(
        (meshTotal, mesh) => meshTotal + mesh.getTotalIndices() / 3,
        0,
      ),
      0,
    );
    if (triangleCount > 50_000) {
      throw new Error(`Opening Studio exceeds its triangle budget: ${triangleCount}`);
    }
    return { containers, roots, styleMaterial: materials.style, triangleCount };
  } catch (error) {
    for (const container of containers) container.dispose();
    if (materials) {
      materials.glass.dispose();
      materials.brass.dispose();
      materials.style.dispose();
      materials.plaster.dispose();
      materials.darkWood.dispose();
      materials.wood.dispose();
    }
    if (textures) {
      textures.plasterArm.dispose();
      textures.plasterNormal.dispose();
      textures.plasterAlbedo.dispose();
      textures.woodArm.dispose();
      textures.woodNormal.dispose();
      textures.woodAlbedo.dispose();
    }
    disposeRoots(roots);
    throw error;
  }
}
