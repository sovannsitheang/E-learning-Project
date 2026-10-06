export type Theme = "light" | "dark";

const STORAGE_KEY = "g4-theme";

const listeners = new Set<() => void>();
let cachedTheme: Theme | null = null;
let hydrated = false;

function notify() {
  for (const listener of listeners) listener();
}

function readStoredTheme(): Theme | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw === "light" || raw === "dark" ? raw : null;
  } catch {
    return null;
  }
}

function systemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(): Theme {
  return cachedTheme ?? readStoredTheme() ?? systemTheme();
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export function subscribeTheme(listener: () => void): () => void {
  listeners.add(listener);
  if (!hydrated) {
    hydrated = true;
    cachedTheme = null;
    applyTheme(resolveTheme());

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener(
      "change",
      handleSystemChange,
    );
  }
  return () => {
    listeners.delete(listener);
  };
}

function handleSystemChange() {
  if (readStoredTheme()) return;
  cachedTheme = null;
  applyTheme(resolveTheme());
  notify();
}

export function getThemeSnapshot(): Theme {
  if (typeof localStorage === "undefined" || !hydrated) return "light";
  return resolveTheme();
}

export function getThemeServerSnapshot(): Theme {
  return "light";
}

export function setTheme(theme: Theme): void {
  cachedTheme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // storage unavailable, theme still applies for this session
  }
  applyTheme(theme);
  notify();
}

export function toggleTheme(): void {
  setTheme(getThemeSnapshot() === "dark" ? "light" : "dark");
}

export const themeInitScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}var r=document.documentElement;r.classList.toggle("dark",t==="dark");r.style.colorScheme=t}catch(e){}})();`;
