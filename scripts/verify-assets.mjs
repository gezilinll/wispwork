import { createHash } from "node:crypto";
import { readFile, readdir, stat } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { NullEngine } from "@babylonjs/core/Engines/nullEngine.js";
import { LoadAssetContainerAsync } from "@babylonjs/core/Loading/sceneLoader.js";
import { Scene } from "@babylonjs/core/scene.js";
import "@babylonjs/loaders/glTF/2.0/glTFLoader.js";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = "public/assets/ASSETS.md";
const authoringSourcePath = "assets/opening-studio/opening-studio.blend";
const exportHelperPath = "scripts/export-opening-studio-assets.py";
const gplNoticePath = "LICENSES/GPL-3.0-or-later.txt";
const cc0NoticePath = "public/assets/opening-studio/CC0-1.0.txt";
const blenderSourceUrl = "https://download.blender.org/release/Blender4.5/blender-4.5.13-macos-arm64.dmg";
const exportCommand = "Blender --background assets/opening-studio/opening-studio.blend --python scripts/export-opening-studio-assets.py -- --output-dir public/assets/opening-studio/first-party";

const exportHelper = {
  path: exportHelperPath,
  bytes: 3_404,
  sha256: "f139be227a61d3441ab6e9531a5b47a201d58a80f5d5658d9c74ca7d18ebf81f",
  license: "GPL-3.0-or-later",
};

const licenseNotices = new Map([
  [
    gplNoticePath,
    {
      bytes: 35_149,
      sha256: "3972dc9744f6499f0f9b2dbf76696f2ae7ad8af9b23dde66d6af86c9dfb36986",
      license: "GPL-3.0-or-later",
    },
  ],
  [
    cc0NoticePath,
    {
      bytes: 7_048,
      sha256: "a2010f343487d3f7618affe54f789f5487602331c0a8d03f49e9a7c547cf0499",
      license: "CC0-1.0",
    },
  ],
]);

const exportCollections = {
  Runtime_Shell: "public/assets/opening-studio/first-party/opening-studio-shell.glb",
  Runtime_Display: "public/assets/opening-studio/first-party/opening-studio-display.glb",
};

const firstPartyAssets = new Map([
  [
    "public/assets/opening-studio/first-party/opening-studio-shell.glb",
    {
      bytes: 1_407_192,
      sha256: "8d6d452c113af9164590ca9519e8230d87da234dc0217c531b9b796be833b4ca",
    },
  ],
  [
    "public/assets/opening-studio/first-party/opening-studio-display.glb",
    {
      bytes: 460_184,
      sha256: "a8ed228c7669ce6255ba15a6ac7b7182723c91ac4b44fc56fb58a2c10fbf069f",
    },
  ],
]);

const firstPartyRuntimePaths = [...firstPartyAssets.keys()];

const polyHavenAssets = new Map([
  [
    "public/assets/opening-studio/poly-haven/WoodenTable_01_1k.glb",
    {
      bytes: 553_416,
      sha256: "e903397a741e5ab9a3007686f63bde242e5f5ac106d239bcac85e8fe6bf77470",
      sourceUrl: "https://polyhaven.com/a/WoodenTable_01",
    },
  ],
  [
    "public/assets/opening-studio/poly-haven/painted_wooden_cabinet_1k.glb",
    {
      bytes: 1_857_648,
      sha256: "cc30f8c6487f7fd3bdb4bc6c3d176d1a0097c4550f557ea07b1238237f134793",
      sourceUrl: "https://polyhaven.com/a/painted_wooden_cabinet",
    },
  ],
  [
    "public/assets/opening-studio/poly-haven/fine_grained_wood_col_1k.jpg",
    {
      bytes: 336_305,
      sha256: "d171f45ef01bc6e239b00dfaa4961bcd27f7d8e93e3962da3bd3d0ce703d802c",
      sourceUrl: "https://polyhaven.com/a/fine_grained_wood",
    },
  ],
  [
    "public/assets/opening-studio/poly-haven/fine_grained_wood_nor_gl_1k.jpg",
    {
      bytes: 193_626,
      sha256: "ba95eadc009818e161d0f753191f1bacc3fc861e593be0bc6d82b437f9ec8044",
      sourceUrl: "https://polyhaven.com/a/fine_grained_wood",
    },
  ],
  [
    "public/assets/opening-studio/poly-haven/fine_grained_wood_arm_1k.jpg",
    {
      bytes: 247_999,
      sha256: "3928796cc98b380cd254dc67e9246e60027ef349edb5f75033cc6f3b34572450",
      sourceUrl: "https://polyhaven.com/a/fine_grained_wood",
    },
  ],
  [
    "public/assets/opening-studio/poly-haven/plastered_wall_03_diff_1k.jpg",
    {
      bytes: 555_233,
      sha256: "3d60687bae1d9cd2c14a46c4b2673e0fe753cf4b5eb82c22cc399271e16d8d5b",
      sourceUrl: "https://polyhaven.com/a/plastered_wall_03",
    },
  ],
  [
    "public/assets/opening-studio/poly-haven/plastered_wall_03_nor_gl_1k.jpg",
    {
      bytes: 530_434,
      sha256: "c913b9c5f04e499b11f5f5a0214c0a388038f850ccf1084ca84087e1c59dd304",
      sourceUrl: "https://polyhaven.com/a/plastered_wall_03",
    },
  ],
  [
    "public/assets/opening-studio/poly-haven/plastered_wall_03_arm_1k.jpg",
    {
      bytes: 283_693,
      sha256: "ab7cb38d62472e5fb23ec086873352c45bbca64c800b2e6d9b1efdb42c9ceb1a",
      sourceUrl: "https://polyhaven.com/a/plastered_wall_03",
    },
  ],
]);

const runtimePaths = [
  ...firstPartyRuntimePaths,
  ...polyHavenAssets.keys(),
];

const runtimeDirectories = [
  "public/assets/opening-studio/first-party",
  "public/assets/opening-studio/poly-haven",
];

const disallowedRequiredExtensions = new Set([
  "EXT_meshopt_compression",
  "KHR_draco_mesh_compression",
  "KHR_texture_basisu",
]);

const allowedFirstPartyMeshPrefixes = [
  "wood__",
  "plaster__",
  "brass__",
  "glass__",
];

function absolute(relativePath) {
  return resolve(repositoryRoot, relativePath);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function requireFile(relativePath) {
  let metadata;
  try {
    metadata = await stat(absolute(relativePath));
  } catch {
    throw new Error(`Missing required file: ${relativePath}`);
  }
  assert(metadata.isFile(), `Required path is not a file: ${relativePath}`);
  return metadata;
}

async function verifyRuntimeDirectoryContents() {
  assert(runtimePaths.length === 10, "Opening Studio must declare exactly ten runtime files");

  const observedPaths = [];
  for (const relativeDirectory of runtimeDirectories) {
    const entries = await readdir(absolute(relativeDirectory), { withFileTypes: true });
    for (const entry of entries) {
      assert(entry.isFile(), `Runtime asset directory contains a non-file: ${relativeDirectory}/${entry.name}`);
      observedPaths.push(`${relativeDirectory}/${entry.name}`);
    }
  }

  assert(observedPaths.length === runtimePaths.length, "Opening Studio runtime file count is not exactly ten");
  const expectedPaths = new Set(runtimePaths);
  for (const observedPath of observedPaths) {
    assert(expectedPaths.has(observedPath), `Unexpected Opening Studio runtime file: ${observedPath}`);
  }
}

async function sha256(relativePath) {
  const bytes = await readFile(absolute(relativePath));
  return createHash("sha256").update(bytes).digest("hex");
}

async function readGlbJson(relativePath) {
  const bytes = await readFile(absolute(relativePath));
  assert(bytes.length >= 20, `GLB is too small: ${relativePath}`);

  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  assert(view.getUint32(0, true) === 0x46546c67, `Invalid GLB magic: ${relativePath}`);
  assert(view.getUint32(4, true) === 2, `Unsupported GLB version: ${relativePath}`);
  assert(view.getUint32(8, true) === bytes.length, `GLB length mismatch: ${relativePath}`);

  let offset = 12;
  while (offset + 8 <= bytes.length) {
    const chunkLength = view.getUint32(offset, true);
    const chunkType = view.getUint32(offset + 4, true);
    const chunkStart = offset + 8;
    const chunkEnd = chunkStart + chunkLength;
    assert(chunkEnd <= bytes.length, `GLB chunk exceeds file length: ${relativePath}`);
    if (chunkType === 0x4e4f534a) {
      const jsonText = new TextDecoder()
        .decode(bytes.subarray(chunkStart, chunkEnd))
        .replace(/[\u0000\u0020]+$/u, "");
      return JSON.parse(jsonText);
    }
    offset = chunkEnd;
  }

  throw new Error(`GLB has no JSON chunk: ${relativePath}`);
}

function verifyRequiredExtensions(relativePath, gltf) {
  for (const extension of gltf.extensionsRequired ?? []) {
    assert(
      !disallowedRequiredExtensions.has(extension),
      `${relativePath} requires unsupported extension ${extension}`,
    );
  }
}

function verifyFirstPartyMeshNames(relativePath, gltf) {
  const meshNames = (gltf.meshes ?? []).map((mesh) => mesh.name ?? "");
  assert(meshNames.length > 0, `First-party GLB has no named meshes: ${relativePath}`);
  for (const meshName of meshNames) {
    assert(
      allowedFirstPartyMeshPrefixes.some((prefix) => meshName.startsWith(prefix)),
      `First-party mesh name lacks a material prefix in ${relativePath}: ${meshName}`,
    );
  }
}

async function loadGlbWithNullEngine(relativePath) {
  const fileBytes = await readFile(absolute(relativePath));
  const bytes = new Uint8Array(fileBytes.buffer, fileBytes.byteOffset, fileBytes.byteLength);
  const engine = new NullEngine({
    renderHeight: 256,
    renderWidth: 256,
    textureSize: 256,
  });
  const scene = new Scene(engine);
  let container;

  try {
    container = await LoadAssetContainerAsync(bytes, scene, {
      name: basename(relativePath),
      pluginExtension: ".glb",
    });
    container.addAllToScene();
    const triangleCount = container.meshes.reduce(
      (sum, mesh) => sum + mesh.getTotalIndices() / 3,
      0,
    );
    return {
      materials: container.materials.length,
      meshes: container.meshes.length,
      textures: container.textures.length,
      triangleCount,
    };
  } finally {
    container?.dispose();
    scene.dispose();
    engine.dispose();
  }
}

async function readStructuredManifest() {
  const markdown = await readFile(absolute(manifestPath), "utf8");
  const match = markdown.match(
    /<!-- wisp-asset-inventory:start\n([\s\S]*?)\nwisp-asset-inventory:end -->/u,
  );
  assert(match, `${manifestPath} lacks the structured asset inventory`);
  return JSON.parse(match[1]);
}

function verifyManifestShape(manifest) {
  assert(manifest.schemaVersion === 1, "Asset inventory schemaVersion must be 1");
  assert(manifest.acquired === "2026-08-30", "Asset acquisition date must be 2026-08-30");
  assert(manifest.blender?.version === "4.5.13", "Blender version must be 4.5.13");
  assert(
    manifest.blender?.sha256 ===
      "663ce944257c61ff1d6aa09e15c8f57bbd8d59023adb2fa7edde33a9ed960b53",
    "Blender distribution hash does not match the screened binary",
  );
  assert(manifest.blender?.sourceUrl === blenderSourceUrl, "Blender source URL does not match the screened binary");
  assert(manifest.blender?.license === "GPL-3.0-or-later", "Blender has the wrong recorded license");
  assert(
    manifest.blender?.outputLicense === "PolyForm-Noncommercial-1.0.0",
    "Blender output has the wrong recorded license",
  );
  assert(manifest.export?.command === exportCommand, "Blender export command does not match the screened command");
  assert(
    JSON.stringify(manifest.export?.collections) === JSON.stringify(exportCollections),
    "Blender export collection mapping does not match the screened mapping",
  );
  for (const [field, expected] of Object.entries(exportHelper)) {
    assert(manifest.export?.helper?.[field] === expected, `Export helper has the wrong ${field}`);
  }

  assert(Array.isArray(manifest.export?.notices), "Asset inventory must contain license notices");
  assert(
    manifest.export.notices.length === licenseNotices.size,
    "Asset inventory has an unexpected license-notice count",
  );
  const noticeRecords = new Map(manifest.export.notices.map((record) => [record.path, record]));
  assert(noticeRecords.size === licenseNotices.size, "Asset inventory has an unexpected license-notice count");
  for (const [relativePath, expected] of licenseNotices) {
    const record = noticeRecords.get(relativePath);
    assert(record, `Asset inventory is missing license notice ${relativePath}`);
    for (const [field, value] of Object.entries(expected)) {
      assert(record[field] === value, `${relativePath} has the wrong ${field}`);
    }
  }
  assert(Array.isArray(manifest.assets), "Asset inventory must contain an assets array");

  const records = new Map(manifest.assets.map((record) => [record.path, record]));
  const expectedPaths = new Set([authoringSourcePath, ...runtimePaths]);
  assert(manifest.assets.length === expectedPaths.size, "Asset inventory has an unexpected path count");
  assert(records.size === expectedPaths.size, "Asset inventory has an unexpected path count");

  for (const expectedPath of expectedPaths) {
    assert(records.has(expectedPath), `Asset inventory is missing ${expectedPath}`);
  }
  for (const recordedPath of records.keys()) {
    assert(expectedPaths.has(recordedPath), `Asset inventory contains unexpected path ${recordedPath}`);
  }

  for (const relativePath of firstPartyRuntimePaths) {
    const record = records.get(relativePath);
    const expected = firstPartyAssets.get(relativePath);
    assert(record.license === "PolyForm-Noncommercial-1.0.0", `${relativePath} has the wrong license`);
    assert(record.source === "first-party", `${relativePath} must be first-party`);
    assert(record.bytes === expected.bytes, `${relativePath} has the wrong screened byte size`);
    assert(record.sha256 === expected.sha256, `${relativePath} has the wrong screened SHA-256`);
  }

  for (const [relativePath, expected] of polyHavenAssets) {
    const record = records.get(relativePath);
    assert(record.license === "CC0-1.0", `${relativePath} has the wrong license`);
    assert(record.sourceUrl === expected.sourceUrl, `${relativePath} has the wrong source URL`);
  }

  const blendRecord = records.get(authoringSourcePath);
  assert(blendRecord.license === "PolyForm-Noncommercial-1.0.0", "Blender source has the wrong license");
  assert(blendRecord.source === "first-party", "Blender source must be first-party");
  return { noticeRecords, records };
}

async function verifyRecordedFile(relativePath, record) {
  const metadata = await requireFile(relativePath);
  assert(Number.isInteger(record.bytes), `${relativePath} lacks a literal byte size`);
  assert(metadata.size === record.bytes, `${relativePath} byte size does not match the inventory`);
  assert(/^[a-f0-9]{64}$/u.test(record.sha256), `${relativePath} lacks a literal SHA-256`);
  assert((await sha256(relativePath)) === record.sha256, `${relativePath} SHA-256 does not match the inventory`);
}

async function main() {
  await requireFile(authoringSourcePath);
  await requireFile(exportHelperPath);
  await requireFile(gplNoticePath);
  await requireFile(cc0NoticePath);
  await requireFile(manifestPath);
  await verifyRuntimeDirectoryContents();

  const { noticeRecords, records } = verifyManifestShape(await readStructuredManifest());
  for (const [relativePath, expected] of polyHavenAssets) {
    const record = records.get(relativePath);
    assert(record.bytes === expected.bytes, `${relativePath} has the wrong screened byte size`);
    assert(record.sha256 === expected.sha256, `${relativePath} has the wrong screened SHA-256`);
  }

  for (const relativePath of [authoringSourcePath, ...runtimePaths]) {
    await verifyRecordedFile(relativePath, records.get(relativePath));
  }
  await verifyRecordedFile(exportHelperPath, exportHelper);
  for (const [relativePath] of licenseNotices) {
    await verifyRecordedFile(relativePath, noticeRecords.get(relativePath));
  }

  const loadResults = [];
  for (const relativePath of [...firstPartyRuntimePaths, ...polyHavenAssets.keys()].filter((path) => path.endsWith(".glb"))) {
    const gltf = await readGlbJson(relativePath);
    verifyRequiredExtensions(relativePath, gltf);
    if (firstPartyRuntimePaths.includes(relativePath)) {
      verifyFirstPartyMeshNames(relativePath, gltf);
    }
    loadResults.push({ path: relativePath, ...(await loadGlbWithNullEngine(relativePath)) });
  }

  const firstPartyBytes = firstPartyRuntimePaths.reduce(
    (sum, relativePath) => sum + records.get(relativePath).bytes,
    0,
  );
  const runtimeBytes = runtimePaths.reduce(
    (sum, relativePath) => sum + records.get(relativePath).bytes,
    0,
  );
  const triangleCount = loadResults.reduce((sum, result) => sum + result.triangleCount, 0);

  assert(firstPartyBytes <= 2_000_000, "First-party GLBs exceed 2,000,000 bytes");
  assert(runtimeBytes <= 7_000_000, "Opening Studio runtime assets exceed 7,000,000 bytes");
  assert(triangleCount <= 50_000, "Opening Studio GLBs exceed 50,000 triangles");

  console.log(JSON.stringify({ firstPartyBytes, loadResults, runtimeBytes, triangleCount }, null, 2));
}

await main();
