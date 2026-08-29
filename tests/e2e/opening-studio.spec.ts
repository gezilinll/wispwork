import { expect, test, type Route } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const ledger = { added: 0, removed: 0 };
    const addEventListener = window.addEventListener.bind(window);
    const removeEventListener = window.removeEventListener.bind(window);
    window.addEventListener = ((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => {
      if (type === "resize") ledger.added += 1;
      addEventListener(type, listener, options);
    }) as typeof window.addEventListener;
    window.removeEventListener = ((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => {
      if (type === "resize") ledger.removed += 1;
      removeEventListener(type, listener, options);
    }) as typeof window.removeEventListener;
    Object.assign(window, { readWispResizeLedger: () => ({ ...ledger }) });
  });
});

test("shows the ready Studio status on a supported desktop", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("[data-studio-status=ready]")).toBeVisible();
});

test("keeps the Studio ready after the overview reset command", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Return to overview" }).click();
  await expect(page.locator("[data-studio-status=ready]")).toHaveText("Warm Atelier is ready");
});

test("cleans a partial asset failure and retries with a fresh Studio", async ({ page }) => {
  const assetRequests: string[] = [];
  page.on("request", (request) => {
    const path = new URL(request.url()).pathname;
    if (path.startsWith("/assets/opening-studio/")) assetRequests.push(path);
  });
  const displayPattern = "**/assets/opening-studio/first-party/opening-studio-display.glb";
  const abortDisplay = async (route: Route) => {
    await route.abort("failed");
  };
  await page.route(displayPattern, abortDisplay);

  await page.goto("/");

  await expect(page.getByRole("status")).toHaveText("The 3D Creative Studio couldn’t open");
  await expect(page.locator("[data-studio-status=ready]")).toHaveCount(0);
  await page.unroute(displayPattern, abortDisplay);
  await page.getByRole("button", { name: "Try again" }).click();
  await expect(page.locator("[data-studio-status=ready]")).toHaveText("Warm Atelier is ready");

  for (const path of [
    "/assets/opening-studio/first-party/opening-studio-shell.glb",
    "/assets/opening-studio/first-party/opening-studio-display.glb",
    "/assets/opening-studio/poly-haven/WoodenTable_01_1k.glb",
    "/assets/opening-studio/poly-haven/painted_wooden_cabinet_1k.glb",
  ]) {
    expect(assetRequests.filter((requestPath) => requestPath === path).length).toBeGreaterThanOrEqual(2);
  }
});

test("releases real-browser Studio resources and resize listeners over twenty cycles", async ({ page }) => {
  test.setTimeout(120_000);
  const assetRequests: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.pathname.startsWith("/assets/")) assetRequests.push(url.href);
  });
  await page.goto("/");
  await expect(page.locator("[data-studio-status=ready]")).toBeVisible();
  const before = await page.evaluate(() => (window as Window & {
    readWispResizeLedger(): { added: number; removed: number };
  }).readWispResizeLedger());

  const after = await page.evaluate(async () => {
    const { StudioRuntime } = await import("/src/studio/StudioRuntime.ts");
    const cycles = [];
    for (let cycle = 0; cycle < 20; cycle += 1) {
      const canvas = document.createElement("canvas");
      canvas.width = 1280;
      canvas.height = 720;
      document.body.append(canvas);
      const runtime = new StudioRuntime({ onFault: (fault) => { throw new Error(fault.message); } });
      await runtime.mount(canvas, {
        id: "opening-studio-v1",
        camera: { projection: "perspective", preset: "weak-perspective-three-quarter", fov: 0.58 },
      });
      runtime.project({
        style: { clear: "#201a16", keyLight: "#ffd3a0", materialTint: "#a96f42", surfaceTreatment: "soft-pbr" },
        wispCue: "idle",
        acceptedRevision: null,
        displayAssetId: null,
      });
      runtime.returnToOverview();
      const mounted = runtime.readOwnedResourceCounts();
      const diagnostics = runtime.readSceneDiagnostics();
      await runtime.dispose();
      cycles.push({
        diagnostics,
        disposed: runtime.readOwnedResourceCounts(),
        mounted,
      });
      canvas.remove();
    }
    return {
      cycles,
      ledger: (window as Window & { readWispResizeLedger(): { added: number; removed: number } }).readWispResizeLedger(),
    };
  });

  for (const cycle of after.cycles) {
    expect(cycle.mounted.containers).toBe(4);
    expect(cycle.diagnostics).toEqual({
      triangleCount: expect.any(Number),
      semanticRoots: [
        "studio-shell",
        "studio-workbench",
        "studio-archive",
        "studio-artifact-display",
      ],
    });
    expect(cycle.diagnostics.triangleCount).toBeLessThanOrEqual(50_000);
    expect(cycle.disposed).toEqual({
      engines: 0,
      scenes: 0,
      meshes: 0,
      materials: 0,
      textures: 0,
      observers: 0,
      containers: 0,
    });
  }
  expect(assetRequests.length).toBeGreaterThan(0);
  const appOrigin = new URL(page.url()).origin;
  for (const requestUrl of assetRequests) {
    const assetUrl = new URL(requestUrl);
    expect(assetUrl.origin).toBe(appOrigin);
    expect(assetUrl.pathname).toMatch(/^\/assets\/opening-studio\//u);
  }
  expect(assetRequests.map((requestUrl) => new URL(requestUrl).pathname)).toEqual(expect.arrayContaining([
    "/assets/opening-studio/first-party/opening-studio-shell.glb",
    "/assets/opening-studio/first-party/opening-studio-display.glb",
    "/assets/opening-studio/poly-haven/WoodenTable_01_1k.glb",
    "/assets/opening-studio/poly-haven/painted_wooden_cabinet_1k.glb",
  ]));
  expect(after.ledger.added - before.added).toBeGreaterThanOrEqual(20);
  expect(after.ledger.removed - before.removed).toBe(after.ledger.added - before.added);
});

test("records finite opening timings, scene budgets, and a ten-second frame sample", async ({ page }, testInfo) => {
  test.setTimeout(45_000);
  await page.goto("/");
  await expect(page.locator("[data-studio-status=ready]")).toBeVisible();

  const marks = await page.evaluate(() => ({
    firstInteractiveStudio: performance.getEntriesByName("wisp:first-interactive-studio")[0]?.startTime ?? Number.NaN,
    firstUsefulDom: performance.getEntriesByName("wisp:first-useful-dom")[0]?.startTime ?? Number.NaN,
  }));
  const scene = await page.evaluate(async () => {
    const { StudioRuntime } = await import("/src/studio/StudioRuntime.ts");
    const canvas = document.createElement("canvas");
    canvas.width = 1280;
    canvas.height = 720;
    document.body.append(canvas);
    const faults: string[] = [];
    const runtime = new StudioRuntime({ onFault: (fault) => faults.push(fault.code) });
    await runtime.mount(canvas, {
      id: "opening-studio-v1",
      camera: { projection: "perspective", preset: "weak-perspective-three-quarter", fov: 0.58 },
    });
    runtime.project({
      style: { clear: "#201a16", keyLight: "#ffd3a0", materialTint: "#a96f42", surfaceTreatment: "soft-pbr" },
      wispCue: "idle",
      acceptedRevision: null,
      displayAssetId: null,
    });
    const mounted = runtime.readOwnedResourceCounts();
    const diagnostics = runtime.readSceneDiagnostics();
    await runtime.dispose();
    const disposed = runtime.readOwnedResourceCounts();
    canvas.remove();
    return { diagnostics, disposed, faults, mounted };
  });
  const frameSample = await page.evaluate(async () => new Promise<{
    durationMs: number;
    fps: number;
    frames: number;
  }>((resolve) => {
    const startedAt = performance.now();
    let frames = 0;
    const sample = (now: number) => {
      frames += 1;
      const durationMs = now - startedAt;
      if (durationMs >= 10_000) {
        resolve({ durationMs, frames, fps: frames * 1000 / durationMs });
        return;
      }
      requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  }));
  const evidence = {
    frameSample,
    marks,
    scene,
    viewport: page.viewportSize(),
  };

  expect(Number.isFinite(marks.firstUsefulDom)).toBe(true);
  expect(Number.isFinite(marks.firstInteractiveStudio)).toBe(true);
  expect(marks.firstInteractiveStudio).toBeGreaterThanOrEqual(marks.firstUsefulDom);
  expect(scene.faults).toEqual([]);
  expect(scene.mounted.containers).toBe(4);
  expect(scene.diagnostics.semanticRoots).toEqual([
    "studio-shell",
    "studio-workbench",
    "studio-archive",
    "studio-artifact-display",
  ]);
  expect(scene.diagnostics.triangleCount).toBeLessThanOrEqual(50_000);
  expect(scene.disposed).toEqual({
    engines: 0,
    scenes: 0,
    meshes: 0,
    materials: 0,
    textures: 0,
    observers: 0,
    containers: 0,
  });
  expect(frameSample.durationMs).toBeGreaterThanOrEqual(10_000);
  expect(Number.isFinite(frameSample.fps)).toBe(true);
  expect(frameSample.frames).toBeGreaterThan(0);
  await testInfo.attach("opening-studio-performance.json", {
    body: Buffer.from(JSON.stringify(evidence, null, 2)),
    contentType: "application/json",
  });
  console.info(`WISP_PERFORMANCE ${JSON.stringify(evidence)}`);
});

test.describe("Chinese locale", () => {
  test.use({ locale: "zh-CN" });

  test("shows the exact localized ready text", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("[data-studio-status=ready]")).toHaveText("暖光工坊已就绪");
    await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  });
});

test("persists a manual English locale after reload", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "English" }).click();
  await page.reload();

  await expect(page.locator("[data-studio-status=ready]")).toHaveText("Warm Atelier is ready");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("shows the desktop-only notice below the supported width without a Studio canvas", async ({ page }) => {
  const assetRequests: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).pathname.startsWith("/assets/opening-studio/")) {
      assetRequests.push(request.url());
    }
  });
  await page.setViewportSize({ width: 1279, height: 720 });
  await page.goto("/");

  await expect(page.getByRole("status")).toHaveText("This version is available on desktop only");
  await expect(page.locator("canvas[data-studio-canvas]")).toHaveCount(0);
  expect(assetRequests).toEqual([]);
});

test("shows the desktop-only notice for a coarse primary pointer without a Studio canvas", async ({ page }) => {
  const assetRequests: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).pathname.startsWith("/assets/opening-studio/")) {
      assetRequests.push(request.url());
    }
  });
  await page.addInitScript(() => {
    const nativeMatchMedia = window.matchMedia;
    window.matchMedia = (query) => {
      if (query === "(pointer: fine)") {
        return { matches: false } as MediaQueryList;
      }
      return nativeMatchMedia(query);
    };
  });
  await page.goto("/");

  await expect(page.getByRole("status")).toHaveText("This version is available on desktop only");
  await expect(page.locator("canvas[data-studio-canvas]")).toHaveCount(0);
  expect(assetRequests).toEqual([]);
});

test("keeps the localized shell and retries after WebGL initialization fails", async ({ page }) => {
  await page.addInitScript(() => {
    const nativeGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (kind, ...args) {
      if (kind === "webgl2" || kind === "webgl") return null;
      return nativeGetContext.call(this, kind, ...args);
    };
    Object.assign(window, {
      restoreWispWebgl: () => {
        HTMLCanvasElement.prototype.getContext = nativeGetContext;
      },
    });
  });
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Your Creative Studio" })).toBeVisible();
  await expect(page.getByRole("status")).toHaveText("The 3D Creative Studio couldn’t open");
  await page.evaluate(() => {
    (window as Window & { restoreWispWebgl: () => void }).restoreWispWebgl();
  });
  await page.getByRole("button", { name: "Try again" }).click();
  await expect(page.locator("[data-studio-status=ready]")).toHaveText("Warm Atelier is ready");
});
