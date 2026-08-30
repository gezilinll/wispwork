# Wisp Visual Constitution

**Status:** Accepted after maintainer visual-direction confirmation

**Date:** 2026-08-29

**Applies to:** The first-party Wisp world, bundled Style Profiles, future
World Kits, and every slice that presents a Studio or Wisp.

**Related decisions:**
[`2026-08-28-wisp-v0-design.md`](2026-08-28-wisp-v0-design.md),
[`2026-08-29-style-echo-slice.md`](2026-08-29-style-echo-slice.md),
[`ADR-0001`](../../adr/0001-babylon-web-renderer.md), and
[`rendering.md`](../../technical/rendering.md).

## 1. Decision

Wisp has one recognizable first-party visual language:

> A mature, stylized 3D creative Studio presented as an open cutaway building
> on a floating fragment of one private Universe. Warm, tangible work space is
> interrupted by restrained, meaningful multiverse phenomena.

The reference presentation is neither a neutral engine showcase nor a promise
that arbitrary game forms are interchangeable. It is not a Terraria-like
side-scroller, a free-roaming life simulation, or an AAA photorealistic world.

Future World Kits may make Studios look radically different while preserving
the same product interaction and semantic grammar. This is how Wisp supports a
Multiverse without becoming several unrelated games.

## 2. First-party reference world

**Warm Atelier** is the first-party reference World Kit and the first frame of
the product. Its composition is:

- an open-front Studio shell on one visible floating world fragment;
- a central creative worktable as the primary focal point;
- a legible Brief/idea area, Artifact display area, and supporting archive or
  tool area;
- one bounded inter-Universe portal at the fragment edge;
- enough exterior void and fragment underside to establish that the Studio is
  a private Universe rather than an ordinary room.

The layout communicates product state but does not pretend every visible prop
is interactive. DOM status and controls remain authoritative. A later World
Kit may rearrange or replace the architecture as long as required Studio
semantics remain legible.

The portal is dormant and non-interactive in v0. It establishes the world
boundary without advertising visits, sharing, or community behavior that the
current product does not implement.

The maintainer-selected Opening Studio concept reference is
[`opening-studio-north-star-v1`](../../design/opening-studio-north-star-v1.md).
It uses mature architecture and materials as the base, with only restrained
spatial-seam, orbital, and connective-glow accents. The image is a
concept-only north star, not a runtime asset or pixel-perfect acceptance
screenshot; the browser scene follows this Constitution and its measured
budgets when the concept contains more detail than the implementation earns.

## 3. Visual hierarchy

The reference direction is approximately **65% tangible Studio and 35%
multiverse anomaly**. This is a composition principle, not a pixel, triangle,
or automated coverage quota.

The tangible layer uses warm wood, paper, clay, woven fabric, brushed metal,
and frosted glass. The anomaly layer may use floating creative fragments,
small orbiting bodies, spatial seams, portal light, and Wisp trails.

An anomaly earns screen space only when it establishes the Universe or
communicates product state. Examples include:

- idea fragments gathering near an active creative surface;
- a Wisp trail connecting a collaborator to the Artifact it is handling;
- a portal representing a real cross-Universe boundary;
- an accepted Artifact becoming present in the display area.

Random spectacle, constant particle noise, and unrelated fantasy props do not
count as meaningful world feedback.

## 4. Camera and interaction grammar

The default camera uses a controlled **weak-perspective three-quarter view**.
It keeps the whole Studio fragment understandable while giving the room enough
depth to feel inhabited.

- use a perspective camera with restrained convergence rather than a true
  orthographic default;
- keep a stable target and home composition;
- allow only bounded zoom and slight orbit where they preserve readability;
- use short focus transitions for product events, with a reduced-motion path;
- do not add free pan, first-person, third-person, or avatar locomotion.

The User acts through selection, focused Studio surfaces, explicit DOM
commands, and media-specific Workbenches. They do not walk an avatar to reach
a control. The World Kit owns the base projection and host-approved camera
preset. Another kit may select orthographic presentation for a pixel world, but
neither a Kit nor a Style Profile can change the control model.

## 5. Geometry, material, and density

The reference asset target is **mid-detail handcrafted architecture**:

- clear silhouettes and a small number of focal props;
- simplified geometry with intentional bevels and surface variation;
- restrained PBR materials, supported by textures and decals where they carry
  more value than additional geometry;
- mature proportions and editorial composition rather than rounded toy-like
  furniture or chibi scale;
- enough negative space to keep work surfaces and status readable.

This is an experience target, not a requirement that every source mesh have a
high polygon count. Low-cost or CC0 geometry may be used as a non-focal input
when the composed scene, material treatment, scale, and lighting meet the
target. A stock asset pack's untouched promotional look is not the Wisp art
direction.

Concept exploration may contain more props and effects than the browser scene.
The implementation follows the rendering budgets and removes decorative
density before compromising first-frame time, interaction latency, or visual
hierarchy.

## 6. Wisp form grammar

A Wisp has a recognizable morphology without requiring one universal mesh.
Each first-party or community treatment preserves:

1. a visible **core**;
2. an **outer form** or envelope;
3. a **trail** or motion residue;
4. a bounded **role signifier**;
5. state feedback through motion, deformation, luminance, and explicit DOM
   status.

Warm Atelier presents Wisps as semi-transparent, luminous, abstract creative
life. It does not depend on a fixed cartoon face. Another World Kit may render
the same grammar as pixel, paper, ink, clay, voxel, or mechanical media.

The grammar does not authorize custom skeletons, arbitrary animation graphs,
executable behavior, or a public Wisp preset protocol. Style Echo proves one
procedural Typesetter Wisp only.

## 7. Customization envelope

| Layer | May change | Must remain stable |
| --- | --- | --- |
| Style Profile | Palette, typography, material tint, bounded light color/intensity, style-local surface treatment, DOM accents, Wisp treatment, and Artifact composition | Scene-wide render profile, projection, camera/lighting preset, Studio layout, product commands, semantic anchors, and runtime trust boundary |
| World Kit | Architecture, fragment/terrain, room layout, meshes, sprites, base materials and lighting, environment, Wisp medium, scene-wide render profile, projection, and safe camera/lighting presets | One Studio-Universe identity, required semantic roles, no-avatar interaction grammar, accessibility, budgets, and declarative security boundary |
| Game or engine mod | Not supported by v0 | May not be smuggled into a Style Profile or World Kit |

The host resolves an effective presentation in one direction: validate the
World Kit, establish its structural scene and presets, then apply only the
Style Profile's allowlisted cosmetic channels. A Style Profile cannot replace
the Kit's projection, camera/lighting preset, geometry, or semantic layout;
unsupported values fail closed or fall back to the Kit baseline. This rule also
applies to bundled profiles even though Style Echo does not yet import Kits.
Style Echo's cosmetic channels are internal bundled projections derived from
accepted profile data; they do not add fields or resolution behavior to the
public World Kit v0.1 protocol.

Pixel, paper, ink, clay, cyber, and more realistic presentations are valid
directions when they fit the same Studio grammar and device budgets. A
side-scrolling tile world, FPS, third-person adventure, custom physics world,
or renderer replacement changes product behavior and is not a visual style.

The product therefore promises broad visual authorship inside Wisp's grammar,
not perfect or equivalent support for every imaginable art and game form.

## 8. Style Echo calibration

Style Echo deliberately uses one bundled Studio shell:

- Warm Atelier is the reference World Kit and initial presentation;
- Neon Pixel Lab is a second Style Profile projected through that shell;
- Neon Pixel Lab demonstrates coherent style projection, not a complete second
  Pixel World Kit or World Kit importer;
- the first slice adds no protocol fields or community-content path.

The Opening Studio task must establish the floating cutaway composition,
controlled weak-perspective camera, tangible/anomaly hierarchy, and restrained
asset density before later tasks add the complete Style Echo behavior. The
Live Style Echo task must preserve the Wisp form grammar across luminous and
pixel/voxel treatments.

## 9. Visual acceptance

Human review remains necessary because the constitution describes perceptual
outcomes. The first-party reference scene passes only when:

1. a first frame reads as both a credible creative Studio and a private
   floating Universe;
2. the central work surface and display area remain legible before decorative
   effects;
3. the result feels mature and handcrafted rather than toy-like, low-effort,
   photorealistic, or visually crowded;
4. the weak-perspective home view shows the complete fragment without severe
   occlusion or a flat board-game impression;
5. Warm and Neon remain recognizably the same Studio interaction while their
   visual and Artifact languages are clearly different;
6. the Typesetter Wisp retains its core, outer form, trail, role meaning, and
   accessible state across both treatments;
7. reduced motion and failed 3D do not remove product meaning;
8. the scene meets the measurable performance and lifecycle gates that the
   focused plan assigns to this slice and its supported baseline; deferred
   device or feature gates remain explicit and are not reported as passed.

Passing this review does not validate market preference or justify showcase
asset volume. Those claims require the product validation gates in the parent
specification.

## 10. Explicit exclusions

This decision does not add a second renderer, World Kit importer, world editor,
custom shader path, generated geometry path, avatar controller, Wisp runtime,
community publishing flow, or new Backend behavior. Each remains gated by its
own accepted slice and real consumer.
