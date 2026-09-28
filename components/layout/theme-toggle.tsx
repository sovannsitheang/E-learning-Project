"use client";

import { useSyncExternalStore } from "react";
import {
  getServerTheme,
  getTheme,
  setTheme,
  subscribeTheme,
  type Theme,
} from "@/lib/theme";

export default function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(
    subscribeTheme,
    getTheme,
    getServerTheme,
  );
  const nextTheme: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-fg-secondary transition-colors hover:border-accent-line hover:text-accent"
    >
      {theme === "dark" ? (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-13a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1zm0 14a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1zM4 11H3a1 1 0 0 1 0-2h1a1 1 0 1 1 0 2zm17 0h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 0 2zM6.34 6.34 5.76 5.76a1 1 0 0 1 1.42-1.42l.58.58a1 1 0 1 1-1.42 1.42zm9.9 9.9-.58-.58a1 1 0 0 1 1.42-1.42l.58.58a1 1 0 0 1-1.42 1.42zm2.48-9.9a1 1 0 0 1-1.42 1.42l-.58-.58a1 1 0 1 1 1.42-1.42l.58.58zm-9.9 9.9a1 1 0 0 1-1.42-1.42l.58-.58a1 1 0 1 1 1.42 1.42l-.58.58z" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M12.3 4.9c.4-.2.1-.9-.4-.8-3.5.6-6.1 3.7-6.1 7.4 0 4.1 3.3 7.4 7.4 7.4 3.7 0 6.8-2.6 7.4-6.1.1-.5-.5-.8-.8-.4-.6.6-1.4 1-2.4 1.1-2.3.4-4.3-1.6-3.9-3.9.1-1 .5-1.8 1.1-2.4z" />
        </svg>
      )}
    </button>
  );
}
