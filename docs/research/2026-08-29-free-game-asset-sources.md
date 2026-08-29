# Independent-game free asset sources for Wisp

Researched 2026-08-29 for assets bundled with the public source-available `wispwork` repository. This is engineering license screening, not legal advice.

## Decision

“Free to use in a game” does not necessarily permit raw or converted files in a public repository. Wisp requires permission both to use/modify an asset and to redistribute its independently downloadable source or conversion. Conversion does not erase the original license, so Style Echo accepts only first-party, CC0, and OFL material; CC BY, unclear, and final-product-only grants remain outside this slice.

## Source matrix

| Source | Typical assets | Official license evidence | Public raw redistribution | Wisp decision |
| --- | --- | --- | --- | --- |
| [Kenney](https://kenney.nl/support) | 2D, 3D, UI, audio, pixel assets | Asset-page downloads are CC0; commercial use and modification are allowed without mandatory attribution | Yes for identified CC0 packs | Preferred |
| [Poly Haven](https://polyhaven.com/license) | HDRI, PBR textures, models | Downloads are CC0; commercial use, modification, and redistribution are allowed | Yes | Preferred; enforce polygon, texture, and bundle budgets |
| [ambientCG](https://docs.ambientcg.com/license/) | Materials, decals, HDRI, terrain, models | Downloads are CC0; documentation expressly permits raw files in a project | Yes | Preferred; use only required channels |
| [Quaternius](https://quaternius.com/license.html) | Stylized models and animations | Current QAL prohibits standalone redistribution; the [FAQ](https://quaternius.com/faq.html) and some old pack pages say CC0 | Only a retained, identified CC0 version | Conditional; current QAL excluded |
| [OpenGameArt](https://opengameart.org/content/faq) | 2D/3D, texture, music, audio | Per-item CC0, CC BY, CC BY-SA, OGA-BY, GPL, or multiple licenses | Depends on item | Conditional; CC0 only here |
| [itch.io Assets](https://itch.io/docs/creators/faq) | Tilesets, UI, fonts, audio, models | No platform-wide license; creators set terms | Only when the item license says so | Conditional; `$0` is not permission |
| [Sketchfab](https://sketchfab.com/licenses) | Models, scans, animation | CC or Standard/Editorial terms; Standard forbids standalone redistribution | CC0/CC BY as licensed; Standard no | Conditional; Standard/Editorial excluded |
| [Fab](https://www.fab.com/eula?lang=en) | 2D/3D, materials, environments, audio | Standard permits project use/modification, not standalone redistribution; some items use CC BY | CC BY as licensed; Standard no | Conditional; Standard excluded |
| [Mixamo](https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html) | Characters, rigs, animations | Final-use embedding; Adobe [terms](https://www.adobe.com/legal/terms.html) prohibit distributing content files outside the end use | No | Excluded from public repository |
| [BlenderKit](https://www.blenderkit.com/docs/licenses/) | Models, materials, HDRI, scenes | Royalty Free restricts standalone distribution; current terms add uncertainty for assets obtained as CC0 | Royalty Free no | Excluded; use the creator's original CC0 source |

## Style Echo selection

Use a first-party Babylon shell, OFL `@fontsource-variable/noto-sans-sc@5.3.0`, and only three byte-for-byte files from [Kenney Furniture Kit](https://kenney.nl/assets/furniture-kit), asset-page release 1.0 / bundled pack marker `Furniture Kit (2.0)`, author Kenney, CC0 1.0, attribution optional:

- `desk.glb`: 15,048 bytes; SHA-256 `0164fe828f028b321730fb8c74502e353583f751be74da1682d42fff7d3c5a42`.
- `chairDesk.glb`: 39,016 bytes; SHA-256 `46406619186034cbe92b19b79a5f1a8e3f442a17a70a7524ef2c0ad0f35095c6`.
- `plantSmall1.glb`: 8,224 bytes; SHA-256 `2b9c022feb47be857b2c4fdc29f36522766ba9b70c578c31d7c05d71b4377d15`.

The source archive SHA-256 is `e67652d0932cee41683f74711c03d3e192a2af9979ef8e6b237711f5482d46b0`; selected files total 62,288 bytes. Retain the bundled license and exclude the other 137 models, renders, authoring files, and previews. Flattened Wisp image exports receive the plan's explicit commercial-output grant; software, marks, editable templates, and standalone assets retain their own terms.

## Minimum sourcing policy

1. Record author, exact versions, official URL, acquisition date, license text, attribution status, archive/file hashes, and every transformation plus tool version; keep third-party notices separate from root PolyForm terms.
2. Commit only runtime inputs. Verify structure, dimensions, budgets, hashes, and Babylon loading before use.
3. Use official downloads; do not hotlink, scrape, reuse previews, or assume an asset grant covers host APIs or branding.
4. Exclude unclear likeness, trademark, design, cultural-scan, and sample rights. Reopen attribution/final-product-only terms only for a named consumer whose distribution boundary justifies them.

This policy keeps the client reproducible without turning the repository into an asset-marketplace mirror.
