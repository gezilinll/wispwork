# Wisp

> A playable creative workspace where real work becomes a world you can own.

Wisp is a game-like design productivity product. Each user has one persistent
Studio, experienced in the worldbuilding language as a private universe. Small
creative collaborators called **Wisps（灵思）** turn a real brief into editable,
exportable work; the result can then live inside the Studio that helped create
it.

`Wisp` is a brand metaphor rather than a literal translation of “creative
spirit”: it evokes a small, embodied thread of inspiration. `wispwork` is the
repository name; `wisp.work` is the intended product address.

## Status

**Pre-alpha / implementation not started.** The repository defines the product,
domain language, public World Kit boundary, rendering direction, licensing,
and cross-repository ownership. The first functional slice still requires an
accepted slice specification and implementation plan. It is not yet a usable
app.

The first proof is deliberately narrow:

1. open a personal Studio and choose a visual profile;
2. describe one real social-poster task through a structured Brief;
3. watch a small Wisp team turn it into an editable Poster;
4. edit and export the PNG;
5. place the finished Poster into a Studio display slot.

The intended aha moment is not “an AI generated an image.” It is:

> The same structured style changed both my workspace and a useful artifact,
> and the artifact now has a persistent place in my world.

## Read the project baseline

- [Product and v0 design](docs/superpowers/specs/2026-08-28-wisp-v0-design.md)
- [Rolling delivery plan](docs/superpowers/plans/2026-08-29-wisp-v0-rolling-delivery.md)
- [Canonical domain language](CONTEXT.md)
- [World Kit protocol](docs/protocols/world-kit-v0.md)
- [Rendering decision and technical design](docs/technical/rendering.md)
- [Architecture decisions](docs/adr/)

## Technical direction

Wisp is Web-first and TypeScript-first. The Studio uses Babylon.js as one
concrete 3D-capable scene graph; 3D, 2.5D, sprites, and pixel presentation are
asset and render profiles inside that engine, not interchangeable engines.
React/DOM owns product UI, a media-specific Workbench owns direct artifact
editing, and strict versioned World Kits carry untrusted community content.

The source-available repository contains no deployable Backend. Its client
uses deterministic fixtures, mocks, or test doubles where needed for complete
local self-testing. Any approved hosted capability is implemented from the
start in the private `wispwork-server` application Backend; the public
repository does not promise full product self-hosting.

## Development baseline

Use the Node.js and pnpm versions pinned by `.nvmrc` and `package.json`. The
repository does not contain an application scaffold yet, but its documentation
and governance checks are reproducible:

```bash
pnpm install --frozen-lockfile
pnpm check
```

The same `quality` job runs for pull requests and pushes to `main`. The first
approved feature slice adds only the application commands it needs in its own
reviewed MR.

## License

Wisp is **source-available**, not Open Source as defined by OSI.

- Software and repository material default to the
  [PolyForm Noncommercial License 1.0.0](LICENSE).
- Explicitly marked original non-code assets may use
  [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).
- Commercial use requires a [separate written license](COMMERCIAL-LICENSE.md).
- Project marks are covered by the [trademark policy](TRADEMARKS.md).

See [LICENSE-SCOPE.md](LICENSE-SCOPE.md) for the complete scope map.
