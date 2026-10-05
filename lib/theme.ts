export type Theme = "light" | "dark";

const THEME_KEY = "g4-theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

const listeners = new Set<() => void>();
let listeningToSystem = false;

function notify() {
  for (const listener of listeners) listener();
}

function readStoredTheme(): Theme | null {
  try {
    const raw = localStorage.getItem(THEME_KEY);
    return raw === "light" || raw === "dark" ? raw : null;
  } catch {
    return null;
  }
}

function systemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function handleSystemChange() {
  // an explicit choice always wins over the OS setting
  if (readStoredTheme()) return;
  applyTheme(systemTheme());
  notify();
}

export function subscribeTheme(listener: () => void): () => void {
  listeners.add(listener);

  if (!listeningToSystem) {
    listeningToSystem = true;
    window.matchMedia(DARK_QUERY).addEventListener(
      "change",
      handleSystemChange,
    );
  }

  return () => {
    listeners.delete(listener);
  };
}

export function getTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

export function getServerTheme(): Theme {
  return "light";
}

export function setTheme(theme: Theme): void {
  applyTheme(theme);
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // ignore storage failures, the attribute is already applied
  }
  notify();
}

export function toggleTheme(): void {
  setTheme(getTheme() === "dark" ? "light" : "dark");
}

export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("${DARK_QUERY}").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})();`;
