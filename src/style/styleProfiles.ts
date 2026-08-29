import type { StudioStyleProjection } from "../studio/StudioRuntime";

export type StyleProfileId = "warm-atelier" | "neon-pixel-lab";

export type StyleProfile = Readonly<{
  id: StyleProfileId;
  studio: StudioStyleProjection;
}>;

export const warmAtelier: StyleProfile = {
  id: "warm-atelier",
  studio: {
    clear: "#201a16",
    keyLight: "#ffd3a0",
    materialTint: "#a96f42",
    surfaceTreatment: "soft-pbr",
  },
};
