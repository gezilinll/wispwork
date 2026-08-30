# Wisp

Wisp turns real creative work into an editable artifact and a persistent part
of one personal, game-like creative world.

User-facing product language has separate English and Simplified Chinese
locales. The Chinese names below are canonical UI terms; code, protocols, and
persisted identifiers retain their English domain names.

## Place and identity

**Studio（创意事务所）**:
The user's single persistent creative workspace, containing their Wisps,
Projects, Artifacts, and chosen World Kit. Each User has exactly one Studio.
Compact Chinese UI may shorten the name to “事务所”.
_Avoid_: multiple studios per user, company, shop

**Universe（创意宇宙）**:
The worldbuilding name for a Studio as one coherent private world. It is the
same identity boundary as Studio, not a container above several Studios.
_Avoid_: universe collection, universe database entity

**Multiverse（多元宇宙）**:
The collection of independent user Studios and the relationships created by
visiting, sharing, and Remixing between them.
_Avoid_: shared global world, realtime co-owned world

**World Kit（世界套件）**:
A versioned, shareable package that gives a Studio its spatial presentation and
structured creative style.
_Avoid_: theme, renderer, engine plugin

**Style Profile（风格谱）**:
A coherent set of visual and verbal constraints used by both the Studio and
the work created inside it.
_Avoid_: prompt, skin

**Warm Atelier（暖光工坊）**:
The first-party reference World Kit and initial Studio presentation.
_Avoid_: default theme, the User's Studio name

**Neon Pixel Lab（霓虹像素实验室）**:
The bundled alternative Style Profile projected through the Warm Atelier
shell in v0.
_Avoid_: second Pixel World Kit, pixel game mode

## People and capabilities

**Wisp（灵思）**:
An embodied creative collaborator in a Studio, defined by a role and a set of
creative capabilities. A Wisp is neither a fictional customer nor a generic
non-player character.
_Avoid_: NPC, bot, virtual employee

**Typesetter Wisp（排版灵思）**:
The Wisp role responsible for exact text and composition inside an Artifact.
_Avoid_: text bot, copy generator

**Creative Loop（创作回路）**:
The repeatable collaboration behavior by which a Wisp observes context,
creates or critiques work, and yields control.
_Avoid_: arbitrary script, workflow engine

## Real work

**Project（项目）**:
A real creative outcome the User wants to complete inside their Studio.
_Avoid_: quest, fictional commission, task list item

**Brief（需求简报）**:
The explicit goal, audience, required content, constraints, and references for
a Project.
_Avoid_: raw prompt, chat message

**Artifact（作品）**:
A versioned creative result produced by a Project that can be edited, exported,
displayed, or Remixed.
_Avoid_: generation, response, file blob

**Workbench（工作台）**:
The media-specific direct editor for an Artifact. It complements the Studio
world rather than living inside its scene.
_Avoid_: infinite canvas, world editor

**Commission（委托）**:
A real request from the User or, later, another person. Wisp does not invent
system customers or fictional paid work.
_Avoid_: quest, daily mission

## Resources and circulation

**Spark（灵能）**:
Spendable generation capacity consumed only by operations with real marginal
cost.
_Avoid_: stamina, playtime energy, coin

**Resonance（共鸣度）**:
A non-spendable signal that the Studio is growing through completed, adopted,
displayed, shared, or Remixed Artifacts.
_Avoid_: currency, experience points, spendable reputation

**Remix（再创作）**:
Creating an independent copy from shared material while preserving its author,
license, version, and parent provenance.
_Avoid_: realtime co-edit, overwrite, uncredited copy
