"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  clearSession,
  getAuthUser,
  setAuthHydrated,
  subscribeAuth,
} from "@/lib/auth";
import type { AuthUser } from "@/lib/api/auth";

const menuItemClass =
  "block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-brand-100 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white";

function PersonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function AuthControls() {
  const user = useSyncExternalStore<AuthUser | null>(
    subscribeAuth,
    getAuthUser,
    () => null,
  );
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAuthHydrated();
  }, []);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const triggerClass =
    "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2";

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={user ? "Account menu" : "Sign in menu"}
        className={`${triggerClass} ${
          user
            ? "bg-brand-700 text-white hover:bg-brand-600"
            : "border border-slate-200 text-slate-700 hover:border-brand-600 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-brand-300 dark:hover:text-brand-300"
        }`}
      >
        {user ? user.name.charAt(0).toUpperCase() : <PersonIcon />}
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-900"
        >
          {user ? (
            <>
              <div className="border-b border-slate-100 px-3 pb-2 pt-1 dark:border-slate-800">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {user.name}
                </p>
                <p className="text-xs capitalize text-slate-500 dark:text-slate-400">{user.role}</p>
              </div>

              <div className="flex flex-col py-1">
                {user.role === "admin" ? (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className={menuItemClass}
                  >
                    Admin
                  </Link>
                ) : null}
                <Link
                  href="/my-courses"
                  onClick={() => setOpen(false)}
                  className={menuItemClass}
                >
                  My Courses
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    clearSession();
                  }}
                  className={`${menuItemClass} text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/50 dark:hover:text-red-300`}
                >
                  Log out
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="border-b border-slate-100 px-3 pb-2 pt-1 dark:border-slate-800">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Welcome back
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Sign in to continue learning
                </p>
              </div>

              <div className="flex flex-col py-1">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className={menuItemClass}
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className={`${menuItemClass} text-brand-700 hover:bg-brand-100 hover:text-brand-800 dark:text-brand-300 dark:hover:bg-brand-800`}
                >
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
