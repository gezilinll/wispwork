# License scope

This file maps repository material to its license. It does not modify the
official license texts.

## Software and repository files

Unless a file or directory carries a more specific notice, source code,
configuration, schemas, scripts, code examples, and repository documentation
are licensed under the [PolyForm Noncommercial License 1.0.0](LICENSE).

The license allows permitted noncommercial use, modification, and
distribution. It does not require a fork to publish its changes or submit them
to this repository. Returning improvements upstream is a contribution policy,
not a claim about the PolyForm license.

## Original non-code content

Original artwork, audio, narrative text, worldbuilding content, templates, or
other independently identifiable creative assets may be released under
[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) when the
containing directory or file explicitly says so. Such material should carry
`SPDX-License-Identifier: CC-BY-NC-SA-4.0` or a local license notice. Without
that marker, the repository default above applies.

CC licenses are not used for software code in this repository.

## Third-party material

Third-party dependencies and assets retain their own licenses. A dependency's
presence does not relicense it under PolyForm, and the root license does not
override a more specific third-party notice. Record vendored material and its
notices beside the material before committing it.

### Opening Studio asset exceptions

The following file is licensed under GPL-3.0-or-later instead of the repository
default. Its complete license text is stored at
[`LICENSES/GPL-3.0-or-later.txt`](LICENSES/GPL-3.0-or-later.txt):

- `scripts/export-opening-studio-assets.py`

That helper contains collection selection and deterministic glTF export
settings only. Its GPL license does not change the license of Blender data or
exported artwork.

The first-party authored content in
`assets/opening-studio/opening-studio.blend` and the two GLBs under
`public/assets/opening-studio/first-party/` uses the repository's default
PolyForm Noncommercial license. The current first-party GLBs embed no Poly
Haven images; Poly Haven data applied to them at runtime remains CC0 and is not
relicensed or restricted by PolyForm.

Files under `public/assets/opening-studio/poly-haven/` retain Poly Haven's
CC0-1.0 dedication. The legal code is stored beside them at
`public/assets/opening-studio/CC0-1.0.txt`; exact provenance and file hashes are
recorded in `public/assets/ASSETS.md`.

## User content

Using Wisp does not transfer ownership of a user's briefs, project files,
private World Kits, uploaded assets, generated outputs, or exports to this
repository. Separate product terms will govern hosted services if they are
introduced. Material that copies repository assets remains subject to the
license covering those assets.

## Project marks

The software and content licenses do not grant rights to the Wisp or Wispwork
names, logos, official Wisp character designs, or other source-identifying
marks. See [TRADEMARKS.md](TRADEMARKS.md).

## Commercial use

No commercial permission is granted by
[COMMERCIAL-LICENSE.md](COMMERCIAL-LICENSE.md); it explains how to request a
separate written agreement. When in doubt about whether a planned use is
commercial, obtain written permission before using the repository material.
