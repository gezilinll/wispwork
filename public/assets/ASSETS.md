# Bundled asset inventory

This file is the source-of-truth inventory for assets shipped by Wispwork.
It records the exact inputs selected on 2026-08-30, the transformations used,
the resulting file identities, and each component's license. The automated
check in `scripts/verify-assets.mjs` verifies the structured inventory against
the committed bytes and loads every GLB with Babylon.js.

## Opening Studio: first-party source and exports

The editable source is `assets/opening-studio/opening-studio.blend`. It was
authored with the official Blender 4.5.13 LTS Apple Silicon build downloaded
from <https://download.blender.org/release/Blender4.5/blender-4.5.13-macos-arm64.dmg>.
The distribution SHA-256 is
`663ce944257c61ff1d6aa09e15c8f57bbd8d59023adb2fa7edde33a9ed960b53`.
The binary was used from a temporary read-only mount and is not redistributed
by this repository.

The source owns two export collections, `Runtime_Shell` and
`Runtime_Display`. The GPL-3.0-or-later helper
`scripts/export-opening-studio-assets.py` exports them, without creating or
modifying geometry, with this command:

```sh
Blender --background assets/opening-studio/opening-studio.blend --python scripts/export-opening-studio-assets.py -- --output-dir public/assets/opening-studio/first-party
```

The `.blend` and the two exported GLBs are first-party Wispwork content under
PolyForm Noncommercial 1.0.0. Blender does not claim authored data or output.
The export helper alone is GPL-3.0-or-later; its full license is retained at
`LICENSES/GPL-3.0-or-later.txt`. The current first-party GLBs embed no Poly
Haven images; the standalone Poly Haven materials applied at runtime remain
CC0-1.0.

## Opening Studio: Poly Haven inputs

The following runtime inputs were acquired from Poly Haven under CC0-1.0. The
full CC0 legal text is retained at
`public/assets/opening-studio/CC0-1.0.txt`. Poly Haven identifies the assets as
follows:

| Asset | Author | Published (UTC) | Official API identity |
| --- | --- | --- | --- |
| [Wooden Table 01](https://polyhaven.com/a/WoodenTable_01) | Ethan Place | 2020-03-30 | `acee43a6468dd85f1da716a4c6d77793e6c7c02f` |
| [Painted Wooden Cabinet](https://polyhaven.com/a/painted_wooden_cabinet) | Kirill Sannikov | 2024-02-19 | `f8cce862d9eaac61abef0246a662aa937ec04332` |
| [Fine Grained Wood](https://polyhaven.com/a/fine_grained_wood) | Rob Tuytel | 2021-03-06 | `955d8311658fa7b5a5e5d081f3b6c7e73b876087` |
| [Plastered Wall 03](https://polyhaven.com/a/plastered_wall_03) | Rob Tuytel | 2024-10-29 | `cba0b6944694212a7e25801e7a9d8513894a2822` |

Every downloaded source file matched the MD5 in its official Poly Haven file
manifest. The complete source-file SHA-256 inventory and the exact official
file-manifest URLs are retained in
`docs/research/2026-08-30-opening-studio-runtime-assets.md`.

The two source glTF packages were converted, content-preservingly, to embedded
GLB with `@gltf-transform/cli@4.2.1`:

```sh
pnpm dlx @gltf-transform/cli@4.2.1 copy WoodenTable_01_1k.gltf WoodenTable_01_1k.glb
pnpm dlx @gltf-transform/cli@4.2.1 copy painted_wooden_cabinet_1k.gltf painted_wooden_cabinet_1k.glb
```

No Draco, Meshopt, KTX2, or other compression extension was introduced. Six
standalone 1K JPEGs are copied without transformation. The application bundles
these files and makes no runtime request to Poly Haven.

## Machine-readable inventory

The JSON block is intentionally embedded in this Markdown document so the
human and automated records cannot drift. Byte sizes and SHA-256 values are
literal observations of the committed files.

<!-- wisp-asset-inventory:start
{
  "schemaVersion": 1,
  "acquired": "2026-08-30",
  "blender": {
    "version": "4.5.13",
    "sha256": "663ce944257c61ff1d6aa09e15c8f57bbd8d59023adb2fa7edde33a9ed960b53",
    "sourceUrl": "https://download.blender.org/release/Blender4.5/blender-4.5.13-macos-arm64.dmg",
    "license": "GPL-3.0-or-later",
    "outputLicense": "PolyForm-Noncommercial-1.0.0"
  },
  "export": {
    "helper": {
      "path": "scripts/export-opening-studio-assets.py",
      "bytes": 3404,
      "sha256": "f139be227a61d3441ab6e9531a5b47a201d58a80f5d5658d9c74ca7d18ebf81f",
      "license": "GPL-3.0-or-later"
    },
    "collections": {
      "Runtime_Shell": "public/assets/opening-studio/first-party/opening-studio-shell.glb",
      "Runtime_Display": "public/assets/opening-studio/first-party/opening-studio-display.glb"
    },
    "command": "Blender --background assets/opening-studio/opening-studio.blend --python scripts/export-opening-studio-assets.py -- --output-dir public/assets/opening-studio/first-party",
    "notices": [
      {
        "path": "LICENSES/GPL-3.0-or-later.txt",
        "bytes": 35149,
        "sha256": "3972dc9744f6499f0f9b2dbf76696f2ae7ad8af9b23dde66d6af86c9dfb36986",
        "license": "GPL-3.0-or-later"
      },
      {
        "path": "public/assets/opening-studio/CC0-1.0.txt",
        "bytes": 7048,
        "sha256": "a2010f343487d3f7618affe54f789f5487602331c0a8d03f49e9a7c547cf0499",
        "license": "CC0-1.0"
      }
    ]
  },
  "assets": [
    {
      "path": "assets/opening-studio/opening-studio.blend",
      "bytes": 307458,
      "sha256": "9c09d05779d61fd289324aa99a3e9e4fa62b0b93996f6ea2848a0faf75459223",
      "license": "PolyForm-Noncommercial-1.0.0",
      "source": "first-party"
    },
    {
      "path": "public/assets/opening-studio/first-party/opening-studio-shell.glb",
      "bytes": 1407192,
      "sha256": "8d6d452c113af9164590ca9519e8230d87da234dc0217c531b9b796be833b4ca",
      "license": "PolyForm-Noncommercial-1.0.0",
      "source": "first-party"
    },
    {
      "path": "public/assets/opening-studio/first-party/opening-studio-display.glb",
      "bytes": 460184,
      "sha256": "a8ed228c7669ce6255ba15a6ac7b7182723c91ac4b44fc56fb58a2c10fbf069f",
      "license": "PolyForm-Noncommercial-1.0.0",
      "source": "first-party"
    },
    {
      "path": "public/assets/opening-studio/poly-haven/WoodenTable_01_1k.glb",
      "bytes": 553416,
      "sha256": "e903397a741e5ab9a3007686f63bde242e5f5ac106d239bcac85e8fe6bf77470",
      "license": "CC0-1.0",
      "sourceUrl": "https://polyhaven.com/a/WoodenTable_01"
    },
    {
      "path": "public/assets/opening-studio/poly-haven/painted_wooden_cabinet_1k.glb",
      "bytes": 1857648,
      "sha256": "cc30f8c6487f7fd3bdb4bc6c3d176d1a0097c4550f557ea07b1238237f134793",
      "license": "CC0-1.0",
      "sourceUrl": "https://polyhaven.com/a/painted_wooden_cabinet"
    },
    {
      "path": "public/assets/opening-studio/poly-haven/fine_grained_wood_col_1k.jpg",
      "bytes": 336305,
      "sha256": "d171f45ef01bc6e239b00dfaa4961bcd27f7d8e93e3962da3bd3d0ce703d802c",
      "license": "CC0-1.0",
      "sourceUrl": "https://polyhaven.com/a/fine_grained_wood"
    },
    {
      "path": "public/assets/opening-studio/poly-haven/fine_grained_wood_nor_gl_1k.jpg",
      "bytes": 193626,
      "sha256": "ba95eadc009818e161d0f753191f1bacc3fc861e593be0bc6d82b437f9ec8044",
      "license": "CC0-1.0",
      "sourceUrl": "https://polyhaven.com/a/fine_grained_wood"
    },
    {
      "path": "public/assets/opening-studio/poly-haven/fine_grained_wood_arm_1k.jpg",
      "bytes": 247999,
      "sha256": "3928796cc98b380cd254dc67e9246e60027ef349edb5f75033cc6f3b34572450",
      "license": "CC0-1.0",
      "sourceUrl": "https://polyhaven.com/a/fine_grained_wood"
    },
    {
      "path": "public/assets/opening-studio/poly-haven/plastered_wall_03_diff_1k.jpg",
      "bytes": 555233,
      "sha256": "3d60687bae1d9cd2c14a46c4b2673e0fe753cf4b5eb82c22cc399271e16d8d5b",
      "license": "CC0-1.0",
      "sourceUrl": "https://polyhaven.com/a/plastered_wall_03"
    },
    {
      "path": "public/assets/opening-studio/poly-haven/plastered_wall_03_nor_gl_1k.jpg",
      "bytes": 530434,
      "sha256": "c913b9c5f04e499b11f5f5a0214c0a388038f850ccf1084ca84087e1c59dd304",
      "license": "CC0-1.0",
      "sourceUrl": "https://polyhaven.com/a/plastered_wall_03"
    },
    {
      "path": "public/assets/opening-studio/poly-haven/plastered_wall_03_arm_1k.jpg",
      "bytes": 283693,
      "sha256": "ab7cb38d62472e5fb23ec086873352c45bbca64c800b2e6d9b1efdb42c9ceb1a",
      "license": "CC0-1.0",
      "sourceUrl": "https://polyhaven.com/a/plastered_wall_03"
    }
  ]
}
wisp-asset-inventory:end -->

## Runtime budget

The two first-party GLBs total 1,867,376 bytes. The ten Opening Studio runtime
files total 6,425,730 bytes. Triangle counts and Babylon loadability are
calculated by `pnpm assets:verify`; the enforced caps are 2,000,000 first-party
GLB bytes, 7,000,000 total runtime bytes, and 50,000 triangles across all four
GLBs.
