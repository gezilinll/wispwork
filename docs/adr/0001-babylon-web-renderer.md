---
status: accepted
---

# Use Babylon.js as the single v0 world renderer

Wisp is Web-first, TypeScript-first, and embeds a game-like world beside a DOM
productivity interface. Use Babylon.js with WebGL2 as the compatibility
baseline and WebGPU only as progressive enhancement. GLB/glTF 2.0 is the
canonical 3D runtime format; sprites, decals, orthographic cameras, and sampling
profiles make 2.5D and pixel presentation first-class without adding another
engine. Unity adds a C#/Wasm runtime and licensing boundary, Three.js requires
more non-differentiating engine work, and PlayCanvas remains the measured Spike
alternative. Keep Babylon.js concrete inside one deep world module; extract a
renderer seam only from a real second implementation.

Consequences: World Kits are engine-independent declarative data, Babylon
objects never enter persisted product state, and the initial prototype must
measure Babylon.js against PlayCanvas on the same reference scene before the
renderer choice is considered commercially locked.
