import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";

import { resolveLocale, saveLocale, studioMessages, type Locale } from "../i18n/locale";

const StudioViewport = lazy(async () => {
  const module = await import("../studio/StudioViewport");
  return { default: module.StudioViewport };
});

type StudioPhase = "loading" | "ready" | "fault" | "unsupported";

function supportsStudio(): boolean {
  return window.innerWidth >= 1280
    && window.innerHeight >= 720
    && window.matchMedia("(pointer: fine)").matches;
}

export function WispApp() {
  const [locale, setLocale] = useState<Locale>(() => resolveLocale(localStorage, navigator.language));
  const [phase, setPhase] = useState<StudioPhase>(() => supportsStudio() ? "loading" : "unsupported");
  const [attempt, setAttempt] = useState(0);
  const [resetToken, setResetToken] = useState(0);
  const copy = useMemo(() => studioMessages(locale), [locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    if (performance.getEntriesByName("wisp:first-useful-dom").length === 0) {
      performance.mark("wisp:first-useful-dom");
    }
  }, []);

  const chooseLocale = useCallback((nextLocale: Locale) => {
    saveLocale(localStorage, nextLocale);
    setLocale(nextLocale);
  }, []);

  const handleFault = useCallback(() => {
    setPhase("fault");
  }, []);

  const handleReady = useCallback(() => {
    setPhase("ready");
    if (performance.getEntriesByName("wisp:first-interactive-studio").length === 0) {
      performance.mark("wisp:first-interactive-studio");
    }
  }, []);

  const retry = useCallback(() => {
    setPhase("loading");
    setAttempt((currentAttempt) => currentAttempt + 1);
  }, []);

  const status = phase === "ready" ? copy.ready
    : phase === "fault" ? copy.fault
      : phase === "unsupported" ? copy.unsupported
        : copy.loading;

  return (
    <main className={`studio-shell phase-${phase}`}>
      {phase !== "unsupported" && (
        <Suspense fallback={null}>
          <StudioViewport attempt={attempt} resetToken={resetToken} onFault={handleFault} onReady={handleReady} />
        </Suspense>
      )}
      <section className="studio-card" aria-label={copy.title}>
        <p className="studio-identity">{copy.identity}</p>
        <h1>{copy.title}</h1>
        <p className="studio-kit">{copy.kit}</p>
        <p aria-live="polite" data-studio-status={phase === "ready" ? "ready" : undefined} role="status">
          {status}
        </p>
        <div className="studio-actions">
          <button aria-label="English" onClick={() => chooseLocale("en")} type="button">English</button>
          <button aria-label="中文" onClick={() => chooseLocale("zh-CN")} type="button">中文</button>
          {phase === "ready" && (
            <button onClick={() => setResetToken((current) => current + 1)} type="button">{copy.reset}</button>
          )}
          {phase === "fault" && <button onClick={retry} type="button">{copy.retry}</button>}
        </div>
      </section>
    </main>
  );
}
