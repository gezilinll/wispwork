# Opening Studio runtime-asset evidence

Researched and downloaded on 2026-08-30 for the public source-available
`wispwork` repository. This is an engineering and license screen, not legal
advice. The visual test is the accepted
[Opening Studio north star](../design/opening-studio-north-star-v1.md) and the
mid-detail, mature-handcrafted requirements in the
[Wisp Visual Constitution](../superpowers/specs/2026-08-29-wisp-visual-constitution.md).

## Decision

Choose **A: a first-party authored shell and display, supported by a small
Poly Haven CC0 set**.

- Author `opening-studio-shell.glb` and `opening-studio-display.glb` in-house.
  The shell must carry the curved timber silhouette, visible bevels, joinery,
  wall infill, floor edge, and the fixed first-party workbench augmentation
  described below. The display must carry a substantial wooden plinth, brass
  frame, and an empty glass canopy. These are the focal forms for which no
  screened lightweight stock model is both visually suitable and
  repository-safe.
- Use Poly Haven's [Wooden Table 01](https://polyhaven.com/a/WoodenTable_01)
  as a content-preserving converted source beneath a **composed workbench**,
  not as an untouched prop. Its worn wood, stretcher, metal brackets, and 1.8 m
  silhouette are a much stronger base than the current boxes, but its measured
  0.55 m height is coffee-table scale. Parent it below a stable workbench root;
  the first-party shell GLB supplies replacement or extension legs, a thicker
  top, drawers, tool rail, Brief surface, and restrained brass joinery. Do not
  non-uniformly stretch visible grain merely to make the source mesh taller.
- Use [Painted Wooden Cabinet](https://polyhaven.com/a/painted_wooden_cabinet)
  as the archive-zone cabinet or as an optional lower display plinth after
  retinting. It is **not** a glass display case and must not be counted as the
  Artifact display by itself.
- Apply the 1K [Fine Grained Wood](https://polyhaven.com/a/fine_grained_wood)
  and [Plastered Wall 03](https://polyhaven.com/a/plastered_wall_03) PBR sets to
  the authored structure. Reuse them across meshes instead of adding more
  decorative props.

The measured runtime selection is 4,558,354 bytes before ZIP compression:
two converted GLBs and six standalone 1K JPEG textures. The deterministic
audit ZIP is 4,472,641 bytes with SHA-256
`8ab757aec72e908da26cf648d7571aaeaa2ee9bb30bb5288b8bb1352e278320e`.
This excludes the two first-party GLBs, whose size and triangle budgets remain
an implementation responsibility.

### Conservative backup

If the two Poly Haven furniture meshes fight the selected silhouette after one
composition pass, keep only the two measured Poly Haven material sets and
author all three hero forms in-house. This has the lowest license and visual
coherence risk, retains 2,147,290 bytes of measured source textures, and costs
more modeling time. It is preferable to filling focal zones with Kenney,
KayKit, or Quaternius pieces.

There is no recommended third combination. KayKit and Kenney are legally easy
but preserve the low-poly-toy problem; Quaternius now has a direct license
conflict. Adding either merely to reach three options would not produce a
credible acceptance candidate.

## Can the recommendation fix the three blocked focal zones?

| Zone | What enters the scene | Maturity judgment |
| --- | --- | --- |
| Building skeleton | First-party curved timber shell with deliberate UVs, bevels, joinery plates, wall infill, and the two Poly Haven surface sets | **Yes, if authored.** Textures add grain and plaster breakup, but cannot disguise the current thin tubes and boxes. Geometry proportions and joinery are the primary fix. |
| Workbench | A content-preserving Wooden Table 01 base plus first-party top, legs, drawers, Brief surface, and task-light dressing | **Yes, after composition.** The source already has a worn PBR surface and stretcher silhouette; alone, it is too low and too shallow for the hero workbench. |
| Artifact display | First-party plinth, brass frame, and glass canopy; Painted Wooden Cabinet may support the archive zone or lower plinth only | **Yes, if authored.** The screened cabinet adds mature storage detail but is opaque and cannot replace the empty glass display required by the north star. |

This assessment is an inference from the official model descriptions, the
downloaded geometry, and visual inspection against the north star. Polygon
count alone does not establish maturity: the 952-triangle table is useful
because its silhouette, UVs, PBR wear, and bracing are intentional, while a
similarly small flat-color desk is still toy-like.

## Verified Poly Haven source set

Poly Haven's official [asset license](https://polyhaven.com/license) says all
site assets are CC0, permits commercial use, modification, and redistribution,
and does not require attribution. That grant explicitly covers raw files in a
public repository. The application should bundle selected files; it must not
hotlink Poly Haven or call its API at runtime. Preview renders, logos, and site
copy are not part of the asset grant.

Poly Haven does not expose an immutable upstream ZIP for the custom 1K file
selection. Its official file API enumerates separate files and MD5 values.
Therefore the per-file SHA-256 values below are the source identities. For
audit convenience, local ZIPs were created with paths sorted, timestamps set
to 1980-01-01, and extra metadata removed with `zip -X`; their hashes are
reproducible evidence archives, **not upstream release hashes**.

| Asset | Official identity at acquisition | Downloaded 1K source set | Geometry inspection |
| --- | --- | --- | --- |
| [Wooden Table 01](https://polyhaven.com/a/WoodenTable_01) | Author Ethan Place; published 2020-03-30 UTC; API `files_hash` `acee43a6468dd85f1da716a4c6d77793e6c7c02f`; [official file manifest](https://api.polyhaven.com/files/WoodenTable_01) | 5 files; 554,348 bytes; glTF + BIN + three JPEGs | glTF 2.0; one mesh/material; 952 triangles; 1,136 uploaded vertices; no animations or required extensions; 1.800 × 0.657 × 0.549 m measured bounds |
| [Painted Wooden Cabinet](https://polyhaven.com/a/painted_wooden_cabinet) | Author Kirill Sannikov; published 2024-02-19 UTC; API `files_hash` `f8cce862d9eaac61abef0246a662aa937ec04332`; [official file manifest](https://api.polyhaven.com/files/painted_wooden_cabinet) | 5 files; 1,861,779 bytes; glTF + BIN + three JPEGs | glTF 2.0; five meshes/one material; 2,227 triangles; 2,022 uploaded vertices; no animations or required extensions; 1.195 × 0.617 × 1.182 m measured bounds |
| [Fine Grained Wood](https://polyhaven.com/a/fine_grained_wood) | Author Rob Tuytel; published 2021-03-06 UTC; API `files_hash` `955d8311658fa7b5a5e5d081f3b6c7e73b876087`; [official file manifest](https://api.polyhaven.com/files/fine_grained_wood) | 3 JPEGs; 777,930 bytes; base color + OpenGL normal + ARM | 1024 × 1024 each; tileable object-surface material; no geometry |
| [Plastered Wall 03](https://polyhaven.com/a/plastered_wall_03) | Author Rob Tuytel; published 2024-10-29 UTC; API `files_hash` `cba0b6944694212a7e25801e7a9d8513894a2822`; [official file manifest](https://api.polyhaven.com/files/plastered_wall_03) | 3 JPEGs; 1,369,360 bytes; diffuse + OpenGL normal + ARM | 1024 × 1024 each; wall material; displacement intentionally omitted |

All 16 downloaded files matched the MD5 values in their official file
manifests. SHA-256 is recorded independently because the repository's asset
manifest uses SHA-256.

### Exact source-file hashes

| File | Bytes | SHA-256 |
| --- | ---: | --- |
| `WoodenTable_01_1k.gltf` | 2,688 | `413804e054055c397b4cfbd0916027097d2a20853b165b533007a46d131e1d17` |
| `WoodenTable_01.bin` | 42,064 | `1083a3442969d27e18e6a7a454bc164407439e3908bf8f17f5fb24d58cd0172e` |
| `WoodenTable_01_diff_1k.jpg` | 160,147 | `9535de577ad6b64deb68457af14240dd9b6d82143da0b6d2bf337660ebd855f3` |
| `WoodenTable_01_nor_gl_1k.jpg` | 151,350 | `330655534ea1fc7c7387b5d2ba5ca3231711a9fa680b980933a3a9c82cdb1c67` |
| `WoodenTable_01_arm_1k.jpg` | 198,099 | `ad876f814215006d35f74670d4fc14a9f6eab386a9307764521449464a1cd6ef` |
| `painted_wooden_cabinet_1k.gltf` | 9,253 | `ce04543cdb10e05fe9c2cc08e9c118b16c1c717a07bcbfac9b99859465c8d1ed` |
| `painted_wooden_cabinet.bin` | 78,072 | `1023d773d84c42f2709ec297247d90b0e2833e37241fbe852e2f33b41ae10cda` |
| `painted_wooden_cabinet_diff_1k.jpg` | 688,654 | `2dbed9f9ec8e49fc2e87de8cd86e2029a80e9001b5102b4e47c7dfa913f34d89` |
| `painted_wooden_cabinet_nor_gl_1k.jpg` | 463,678 | `e94edf68faeaf68016c28da9b9f299bb38c57463acd94130ecf98dcaef790016` |
| `painted_wooden_cabinet_arm_1k.jpg` | 622,122 | `34e0bcb00a62704d85161d41e844e798d4f894e416e7769079d50a21d561d171` |
| `fine_grained_wood_col_1k.jpg` | 336,305 | `d171f45ef01bc6e239b00dfaa4961bcd27f7d8e93e3962da3bd3d0ce703d802c` |
| `fine_grained_wood_nor_gl_1k.jpg` | 193,626 | `ba95eadc009818e161d0f753191f1bacc3fc861e593be0bc6d82b437f9ec8044` |
| `fine_grained_wood_arm_1k.jpg` | 247,999 | `3928796cc98b380cd254dc67e9246e60027ef349edb5f75033cc6f3b34572450` |
| `plastered_wall_03_diff_1k.jpg` | 555,233 | `3d60687bae1d9cd2c14a46c4b2673e0fe753cf4b5eb82c22cc399271e16d8d5b` |
| `plastered_wall_03_nor_gl_1k.jpg` | 530,434 | `c913b9c5f04e499b11f5f5a0214c0a388038f850ccf1084ca84087e1c59dd304` |
| `plastered_wall_03_arm_1k.jpg` | 283,693 | `ab7cb38d62472e5fb23ec086873352c45bbca64c800b2e6d9b1efdb42c9ceb1a` |

### Evidence-archive and conversion hashes

| Local evidence artifact | Bytes | SHA-256 |
| --- | ---: | --- |
| `WoodenTable_01-1k-source-files.zip` | 516,608 | `7ccbaabcf953aaa6979572401d11a4f686efe0d0ba61d8821fc5b8263609aef3` |
| `painted-wooden-cabinet-1k-source-files.zip` | 1,815,193 | `a9ed15e83099fa34d4621c5d5a5e04ae2fb5ec9c88a3354bc94e341c20c5f7b4` |
| `atelier-materials-1k-source-files.zip` | 2,138,579 | `50c970bd1b4f5f392267115f1273851f4ce40c724227bd0ff5a46cc8dfc945cb` |
| `WoodenTable_01_1k.glb` | 553,416 | `e903397a741e5ab9a3007686f63bde242e5f5ac106d239bcac85e8fe6bf77470` |
| `painted_wooden_cabinet_1k.glb` | 1,857,648 | `cc30f8c6487f7fd3bdb4bc6c3d176d1a0097c4550f557ea07b1238237f134793` |
| `recommended-runtime-bundle.zip` | 4,472,641 | `8ab757aec72e908da26cf648d7571aaeaa2ee9bb30bb5288b8bb1352e278320e` |

The two GLBs were produced with
[`@gltf-transform/cli` 4.2.1](https://gltf-transform.dev/cli) using `copy`,
which embeds the external BIN and three JPEGs without Draco, Meshopt, KTX2, or
required extensions. The repository should hash and retain only the final
runtime files plus a source/transform manifest; the local audit ZIPs need not
be committed.

## Runtime integration and budget implications

- The current package has `@babylonjs/core` but not a glTF loader. Babylon's
  official [`@babylonjs/loaders`](https://www.npmjs.com/package/@babylonjs/loaders)
  documentation says importing `@babylonjs/loaders/glTF` adds glTF/GLB support.
  Add the exact matching 9.23.0 package only in the implementation that first
  loads these files.
- Keep the two external models and the two authored hero models as stable,
  named asset containers owned by `StudioRuntime`. Dispose their containers,
  materials, and textures through the existing scene lifecycle. Do not place
  Babylon objects in React state.
- The measured download payload is small, but twelve 1024 × 1024 JPEG texture
  images across the two models and two material sets can occupy roughly 67 MB
  of uncompressed mipmapped GPU texture memory. That estimate comes from
  `gltf-transform inspect` reporting about 5.59 MB per 1K RGB texture and is
  device-dependent. Reuse material instances, and trial 512 px derivatives
  for the non-focal cabinet or plaster before adding KTX2 and a decoder.
- Use the OpenGL normal maps. For the standalone ARM maps, wire red to ambient
  occlusion, green to roughness, and blue to metallic in the Babylon material;
  verify channel interpretation in a lit browser screenshot. Do not ship the
  redundant separate AO, roughness, metal, displacement, EXR, PNG, Blend, FBX,
  USD, preview, or thumbnail files.
- The source glTF materials are double-sided. Once the edited meshes have
  correct normals, test single-sided rendering for opaque table/cabinet parts.
  The authored glass canopy remains its own transparent material and draw
  order.
- Do not add an HDRI in this pass. It would not repair proportions or joinery,
  and the current three-light composition can prove the PBR assets first. Add
  one small bundled CC0 HDRI only if the real browser review still shows flat
  reflections after the geometry and materials land.

## Why the existing Kenney three-file plan is insufficient

Kenney remains repository-safe: the official
[Furniture Kit page](https://kenney.nl/assets/furniture-kit) lists 140 3D files,
CC0, and a 2018 release, while [Kenney support](https://kenney.nl/support)
confirms that asset-page downloads are CC0 and attribution is optional. The
anonymous official ZIP was downloaded and measured as 5,130,729 bytes,
SHA-256
`e67652d0932cee41683f74711c03d3e192a2af9979ef8e6b237711f5482d46b0`.
Its root license says `Furniture Kit (2.0)` while the page says release 1.0;
both labels must remain in provenance.

The problem is the content, not the permission:

| Existing file | Measured content | Why it cannot fix the blocked scene |
| --- | --- | --- |
| `desk.glb` | 15,048 bytes; 198 triangles; two materials; no textures, images, or animations | Thin rectangular top, straight legs, and a tiny drawer do not supply a mature hero workbench, wear, joinery, or a substantial Brief surface. |
| `chairDesk.glb` | 39,016 bytes; 588 triangles; two materials; no textures, images, or animations | Flat-color square seat/back and coarse tubing preserve the rounded toy/office-pack look. |
| `plantSmall1.glb` | 8,224 bytes; 102 triangles; two materials; no textures, images, or animations | Suitable only as a distant accent; it contributes nothing to architecture, worktable craft, or the display. |

The three files total 62,288 bytes and include neither an architectural shell
nor an Artifact display. Better lighting cannot manufacture missing bevels,
material response, structural bracing, or mature proportions. Keep them only
if a later composition needs small non-focal filler; remove them from the
Opening Studio hero-asset plan.

## Screened alternatives

### KayKit: distributable, but not a maturity solution

Kay Lousberg's official [Furniture Bits](https://kaylousberg.com/game-assets/furniture-bits)
and [Dungeon Remastered](https://kaylousberg.com/game-assets/dungeon-remastered)
pages explicitly describe their models as low-poly, mobile-suitable, and
colored by a single 1024 × 1024 gradient atlas; they also state CC0 and include
glTF. The fixed official
[Furniture Bits repository commit](https://github.com/KayKit-Game-Assets/KayKit-Furniture-Bits-1.0/tree/96d5930a8dbdb363409bbc2d3341718b00e17c9c)
was downloadable without an account. Its commit ZIP measured 683,587 bytes,
SHA-256
`84be044ad8aa6d7b2e5e6e01ce6f2cc97133c07c04f9de7d98dc2677a0234242`.

The pack is technically easy to vendor, but samples measured only 168
triangles for `table_medium_long`, 482 for a decorated large shelf, and 74 for
a standing picture frame. Those meshes may be useful as blockout or distant
props; their atlas-driven flat-color language is the same class of input the
current visual review rejected. They do not replace authored architecture,
workbench treatment, or the main display.

### Quaternius: exclude while first-party terms conflict

The official January 2025
[Medieval Village MegaKit](https://quaternius.com/packs/medievalvillagemegakit.html)
page still says CC0, lists 304 modular models, and offers FBX, OBJ, Blend, and
glTF. The official [FAQ](https://quaternius.com/faq.html) also still says all
models are CC0. However, the new official
[Quaternius Asset License v1.0](https://quaternius.com/license.html), last
updated 2026-08-28, prohibits redistributing original **or modified** assets as
standalone assets, packs, stock files, or templates. Its official site commit
that added the license is
[`b480946`](https://github.com/Quaternius/quaternius.github.io/commit/b48094632a2ad6d8de72e7c25b5692c990a3d15a).

The QAL says changes are not retroactive and the version in effect at
acquisition governs, but a new acquisition today encounters contradictory
first-party texts and no retained old acquisition record. A GLB in a public
repository is independently extractable, so the conservative reading triggers
the QAL redistribution ban. Do not download-and-vendor Quaternius now. Reopen
only if the author confirms the exact archive remains CC0 in writing, or the
project can prove a pre-QAL CC0 acquisition with its archive hash and retained
license.

### ambientCG: license-safe, unnecessary in this bundle

ambientCG's official [license documentation](https://docs.ambientcg.com/license/)
places all downloadable assets under CC0 and expressly permits raw files in a
game project. It remains a valid material fallback. No ambientCG file is
selected here because the measured Poly Haven sources already provide both
required surfaces under the same CC0/provenance workflow; mixing another
source would add manifest and art-direction work without fixing any missing
geometry.

## Acceptance gates before committing runtime assets

1. Preserve the official source URLs, acquisition date, page/API identities,
   all selected source hashes, conversion command and tool version, final GLB
   hashes, and a copy of the CC0 notice in the third-party asset manifest.
2. Commit only the two final third-party GLBs, the six chosen 1K material
   JPEGs, and the two first-party GLBs. Do not commit source archives,
   authoring files, previews, unused formats, or full packs.
3. Load the two converted GLBs with Babylon 9.23.0 in both `NullEngine` and a
   real WebGL2 browser. Assert mesh/material/texture counts, stable semantic
   root names, no required compression extension, and full disposal after 20
   mount/dispose cycles.
4. Capture the same 1280 × 720 home view used by visual review. The result does
   not pass merely because assets load: the workbench must read first, the
   shell second, and the display before the anomaly, with no untouched stock
   pack look.
5. If the authored shell or display is still represented by thin tubes,
   cylinders, or un-beveled boxes, stop. The downloaded textures and furniture
   cannot compensate for those missing focal forms.

## Residual risks

- No suitable lightweight CC0 glass-display or arched-cutaway model was found
  in the screened first-party catalogs. Shell and display authoring is a real
  production task, not optional polish.
- The exact first-party GLB triangle count, UV quality, and file size remain
  unmeasured until those models exist.
- The converted Poly Haven GLBs passed structural inspection with
  `gltf-transform`, but were not loaded through Babylon because
  `@babylonjs/loaders` is not yet installed in this task. Browser/NullEngine
  loading and shader appearance remain implementation gates.
- The Poly Haven cabinet's distressed white paint may fight Warm Atelier's
  walnut/brass hierarchy. Retint it once and remove it if it still reads as a
  farmhouse stock prop; do not let sunk-cost pressure preserve a mismatch.
- CC0 resolves copyright redistribution, not trademark, privacy, or an
  endorsement claim. Do not use source logos or imply creator sponsorship.
