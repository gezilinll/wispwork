# World Kit Protocol v0.1

**Status:** Draft for the Wisp v0 implementation

**Compatibility promise:** Packages accepted under `schemaVersion: "0.1"` must
continue to import after v0 ships, either directly or through a deterministic
migration.

## 1. Purpose

A World Kit is a portable, declarative description of a Studio's spatial
presentation and structured creative style. It can make two Studios look and
feel radically different without allowing downloaded content to execute code.

The protocol separates four concerns:

1. package identity, authorship, license, version, and provenance;
2. normalized runtime assets;
3. a small semantic scene and its safe replacement slots;
4. a Style Profile consumed by both the renderer and creative pipeline.

It is not a renderer API, game project, arbitrary 3D authoring format, prompt
file, or code-plugin ABI.

## 2. Package form

An imported kit is a ZIP archive or an equivalent directory during local
development:

```text
world-kit/
├── manifest.json
├── scene.json
├── style.json
└── assets/
    ├── studio.glb
    ├── surfaces.webp
    ├── wisps.png
    └── wisps.atlas.json
```

Rules:

- filenames use UTF-8 and forward-slash relative paths;
- absolute paths, `..`, symlinks, hard links, device files, and duplicate
  normalized paths are rejected;
- every URI resolves inside the package;
- network, `data:`, `blob:`, and `file:` URIs are rejected;
- archives are unpacked in an isolated temporary location before validation;
- package content remains inert until all validation succeeds.

## 3. Manifest

`manifest.json` is strict JSON. Unknown fields are rejected for v0.1 so that a
misspelling cannot silently change security or creative behavior.

```json
{
  "schemaVersion": "0.1",
  "id": "work.wisp.default-studio",
  "version": "1.0.0",
  "title": "Default Studio",
  "author": {
    "id": "github:gezilinll",
    "name": "Wisp"
  },
  "license": {
    "spdx": "CC-BY-NC-SA-4.0",
    "url": "https://creativecommons.org/licenses/by-nc-sa/4.0/"
  },
  "entry": "scene.json",
  "style": "style.json",
  "assets": [
    {
      "id": "studio-shell",
      "kind": "model/gltf-binary",
      "uri": "assets/studio.glb",
      "sha256": "<64 lowercase hex characters>"
    },
    {
      "id": "wisp-atlas",
      "kind": "sprite/atlas",
      "uri": "assets/wisps.atlas.json",
      "sha256": "<64 lowercase hex characters>"
    }
  ],
  "provenance": {
    "parent": null
  }
}
```

### Required fields

| Field | Contract |
| --- | --- |
| `schemaVersion` | Exact protocol major/minor understood by the importer. v0 accepts only `0.1`. |
| `id` | Stable reverse-domain-like identifier, lowercase ASCII segments, never reused for a different kit. |
| `version` | Semantic Versioning string for this kit. |
| `title` | Human label, 1–80 Unicode characters. |
| `author.id` | Stable author identity under the publisher's chosen namespace. |
| `author.name` | Display name, 1–80 characters. |
| `license.spdx` | SPDX expression when one exists, otherwise `LicenseRef-<name>`. |
| `license.url` | HTTPS page containing the applicable terms. |
| `entry` | Relative path to `scene.json`. |
| `style` | Relative path to `style.json`. |
| `assets` | Complete asset inventory with unique IDs and SHA-256 hashes. |
| `provenance.parent` | `null` for an original kit or a parent identity record for a Remix. |

For a Remix, `parent` is:

```json
{
  "kitId": "work.wisp.default-studio",
  "version": "1.0.0",
  "authorId": "github:gezilinll",
  "manifestSha256": "<64 lowercase hex characters>"
}
```

Provenance records ancestry; it does not claim that the parent license permits
the Remix. Import and publication must check license compatibility separately.

## 4. Runtime asset kinds

v0.1 accepts only:

| Kind | File contract | Purpose |
| --- | --- | --- |
| `model/gltf-binary` | `.glb`, glTF 2.0, approved extension allowlist | Studio shell and fixed props |
| `image/png` | `.png` | Lossless texture, decal, or sprite source |
| `image/webp` | `.webp` | Ordinary compressed texture or decal |
| `texture/ktx2` | `.ktx2`, host-supported profile only | Optional GPU-ready optimization |
| `sprite/atlas` | strict atlas JSON referring to one inventoried PNG/WebP | Wisp and 2D decoration frames |

FBX, OBJ, BLEND, DAE, PSD, SVG with scripts, Unity AssetBundles, Babylon scene
files, and engine projects are authoring/import inputs, not runtime contracts.
An external conversion pipeline may add support later but must produce the
normalized kinds above.

GLB is the canonical 3D runtime form because glTF 2.0 is designed as an
API-neutral transmission format. “The engine can parse a file” is not a
compatibility promise; all extensions, dimensions, materials, animation, and
resource budgets remain subject to host policy.

## 5. Scene

`scene.json` stores product semantics and simple transforms rather than a copy
of a Babylon.js scene graph.

```json
{
  "schemaVersion": "0.1",
  "renderProfile": {
    "projection": "orthographic",
    "textureSampling": "linear",
    "virtualResolution": null,
    "cameraPreset": "isometric-medium",
    "lightingPreset": "warm-indoor"
  },
  "nodes": [
    {
      "id": "studio",
      "assetId": "studio-shell",
      "transform": {
        "position": [0, 0, 0],
        "rotation": [0, 0, 0, 1],
        "scale": [1, 1, 1]
      },
      "roles": ["studio-shell"]
    }
  ],
  "slots": [
    {
      "id": "opening-poster",
      "kind": "display/image",
      "anchorNodeId": "studio",
      "transform": {
        "position": [1.2, 1.4, -0.02],
        "rotation": [0, 0, 0, 1],
        "scale": [0.6, 0.75, 1]
      },
      "accepts": ["image/png", "image/webp"]
    }
  ],
  "anchors": [
    {
      "id": "maker-wisp",
      "kind": "wisp/activity",
      "position": [0.4, 0.2, 0.8]
    }
  ]
}
```

### Render profile

- `projection`: `perspective` or `orthographic`;
- `textureSampling`: `linear` or `nearest`;
- `virtualResolution`: `null` or `[width, height]` for a pixel profile;
- `cameraPreset` and `lightingPreset`: host-known identifiers, not code;
- a host may reject a known identifier it cannot support.

2.5D and pixel presentation are combinations of camera, sampling, virtual
resolution, mesh/sprite choice, and layout. They are not separate engines or a
single `style: "pixel"` switch.

### Nodes, slots, and anchors

- node IDs, slot IDs, and anchor IDs are unique inside the kit;
- transforms contain finite numbers; rotations are normalized quaternions;
- `roles`, `kind`, and `accepts` use the v0 closed vocabulary;
- a slot can replace presentation content but cannot add behavior, collision,
  network access, or a new capability;
- anchors give the host a semantic location without embedding product state in
  engine nodes.

## 6. Style

`style.json` is shared creative context for world presentation and Artifact
creation.

```json
{
  "schemaVersion": "0.1",
  "id": "warm-atelier",
  "title": "Warm Atelier",
  "palette": {
    "background": "#201A17",
    "surface": "#6A4A3C",
    "primary": "#E5B97A",
    "accent": "#D9654B",
    "text": "#FFF7EB"
  },
  "typography": {
    "displayFont": "wisp-serif-01",
    "bodyFont": "wisp-sans-01"
  },
  "creativeContext": {
    "toneTags": ["warm", "crafted", "editorial"],
    "compositionTags": ["clear-focal-point", "generous-margin"],
    "layoutRules": ["headline stays separate from the generated image"],
    "avoid": ["illegible decorative text", "photorealistic people"]
  }
}
```

Rules:

- colors are canonical six-digit sRGB hex values;
- fonts refer only to bundled, licensed font IDs declared by the host or kit;
- each tag is 1–40 characters and each rule is 1–160 characters;
- creative strings are untrusted data, delimited when sent to a model, and
  cannot override host instructions, tools, permissions, or safety controls;
- a model input builder selects fields explicitly. It never serializes the
  whole manifest into a system prompt.

## 7. v0 host budgets

These are initial importer limits, not claims about every supported device.
Measured reference-scene results may lower them without changing the protocol
shape.

| Resource | Initial limit |
| --- | ---: |
| ZIP bytes | 50 MiB |
| Unpacked bytes | 100 MiB |
| File count | 256 |
| Scene nodes | 500 |
| Slots | 64 |
| Anchors | 64 |
| Total GLB triangles | 200,000 |
| Single texture edge | 4,096 px |
| Total decoded texture pixels | 64 megapixels |
| Materials | 128 |
| Bones per skin | 128 |
| Animations | 20 |
| `creativeContext` combined text | 4,000 UTF-8 bytes |

The importer must measure archive expansion, decoded images, and glTF content;
compressed byte size alone is insufficient.

## 8. Import pipeline

The implementation follows one fail-closed sequence:

1. read archive metadata and reject path/expansion violations;
2. parse `manifest.json` with a strict schema;
3. verify every declared file, hash, MIME signature, and duplicate ID;
4. parse `scene.json` and `style.json` with their exact `schemaVersion`;
5. validate GLB with Khronos glTF Validator and the host extension allowlist;
6. decode image headers and enforce dimensions/pixel budgets;
7. enforce scene, creative-context, and license/provenance policy;
8. materialize a normalized immutable kit record;
9. only then allow the renderer to create resources.

An error contains a stable code, JSON path or file path, and human explanation.
Partial import is not permitted in v0.

## 9. Explicitly forbidden

World Kits may not contain or request:

- JavaScript, TypeScript, WebAssembly, native binaries, macros, or bytecode;
- custom WGSL/GLSL or material code injection;
- remote URLs, sockets, fetches, iframes, or dynamic imports;
- environment-variable or filesystem access;
- DOM/UI code;
- model/tool execution instructions or hidden prompt overrides;
- self-modifying manifests or runtime package installation;
- encrypted payloads that prevent validation.

The host may later register trusted behavior capabilities, but a downloaded kit
can only select explicitly allowed identifiers and bounded parameters.

## 10. Versioning

- `schemaVersion` versions this protocol; `version` versions one kit.
- An importer rejects an unknown major/minor rather than guessing.
- Adding an optional field still requires a new schema version because v0.1 is
  strict.
- A deterministic migration produces a new normalized manifest and records the
  original manifest hash.
- A kit ID is stable across compatible versions. A materially unrelated work
  receives a new ID.
- Re-publishing different bytes under the same `(id, version)` is invalid.

The first hosted schema will receive a canonical HTTPS `$schema` URL. v0.1 does
not bind compatibility to an unregistered or undeployed domain.

## 11. Conformance fixtures

The first implementation must ship:

- one minimal valid kit;
- the two first-party Style Profiles;
- unknown-field and unknown-version failures;
- duplicate/path-traversal/hash mismatch failures;
- external/data URI failures;
- oversized archive/image/GLB failures;
- invalid transform/reference failures;
- malicious creative-context fixture proving it remains data;
- a round-trip fixture proving normalized output is deterministic.

Reference validators:

- [glTF 2.0 specification](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html)
- [Khronos glTF Validator](https://github.com/KhronosGroup/glTF-Validator)
- [KTX 2.0 specification](https://registry.khronos.org/KTX/specs/2.0/ktxspec.v2.html)
