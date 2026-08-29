import { useEffect, useRef } from "react";

import { warmAtelier } from "../style/styleProfiles";
import { StudioRuntime } from "./StudioRuntime";

type StudioViewportProps = Readonly<{
  attempt: number;
  resetToken: number;
  onFault(): void;
  onReady(): void;
}>;

export function StudioViewport({ attempt, resetToken, onFault, onReady }: StudioViewportProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runtimeRef = useRef<StudioRuntime | null>(null);

  useEffect(() => {
    const runtime = new StudioRuntime({
      onFault: onFault,
    });
    runtimeRef.current = runtime;
    let cancelled = false;

    void runtime.mount(canvasRef.current, {
      id: "opening-studio-v1",
      camera: {
        projection: "perspective",
        preset: "weak-perspective-three-quarter",
        fov: 0.58,
      },
    }).then(() => {
      if (cancelled || runtime.readOwnedResourceCounts().scenes === 0) return;
      runtime.project({
        style: warmAtelier.studio,
        wispCue: "idle",
        acceptedRevision: null,
        displayAssetId: null,
      });
      onReady();
    });

    return () => {
      cancelled = true;
      runtimeRef.current = null;
      void runtime.dispose();
    };
  }, [attempt, onFault, onReady]);

  useEffect(() => {
    if (resetToken > 0) runtimeRef.current?.returnToOverview();
  }, [resetToken]);

  return <canvas aria-label="Warm Atelier Studio" data-studio-canvas ref={canvasRef} />;
}
