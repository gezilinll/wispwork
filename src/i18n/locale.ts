export type Locale = "en" | "zh-CN";

const localeKey = "wispwork:locale";

const messages = {
  en: {
    identity: "Wisp · Creative Universe",
    title: "Your Creative Studio",
    kit: "World Kit: Warm Atelier",
    loading: "Opening your creative universe…",
    ready: "Warm Atelier is ready",
    reset: "Return to overview",
    fault: "The 3D Creative Studio couldn’t open",
    retry: "Try again",
    unsupported: "This version is available on desktop only",
  },
  "zh-CN": {
    identity: "灵思 · 创意宇宙",
    title: "你的创意事务所",
    kit: "世界套件：暖光工坊",
    loading: "正在打开创意宇宙…",
    ready: "暖光工坊已就绪",
    reset: "回到全景",
    fault: "3D 创意事务所暂时无法打开",
    retry: "重新尝试",
    unsupported: "当前版本仅支持桌面端",
  },
} as const;

export type StudioMessages = (typeof messages)[Locale];

export function resolveLocale(storage: Pick<Storage, "getItem">, browserLanguage: string): Locale {
  const saved = storage.getItem(localeKey);
  if (saved === "en" || saved === "zh-CN") return saved;
  return browserLanguage.toLowerCase().startsWith("zh") ? "zh-CN" : "en";
}

export function saveLocale(storage: Pick<Storage, "setItem">, locale: Locale): void {
  storage.setItem(localeKey, locale);
}

export function studioMessages(locale: Locale): StudioMessages {
  return messages[locale];
}
