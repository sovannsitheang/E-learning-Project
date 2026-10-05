"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { clearSession } from "@/lib/auth";
import { useAuthUser } from "@/lib/use-auth-user";

const menuItemClass =
  "block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-fg-secondary transition-colors hover:bg-accent-subtle hover:text-accent";

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
  const user = useAuthUser();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={user ? "Account menu" : "Sign in menu"}
        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-line focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
          user
            ? "bg-brand-700 text-white hover:bg-brand-600"
            : "border border-line text-fg-secondary hover:border-accent-line hover:text-accent"
        }`}
      >
        {user ? user.name.charAt(0).toUpperCase() : <PersonIcon />}
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-line bg-surface p-1.5 shadow-lg"
        >
          {user ? (
            <>
              <div className="border-b border-line-soft px-3 pb-2 pt-1">
                <p className="truncate text-sm font-semibold text-fg">
                  {user.name}
                </p>
                <p className="text-xs capitalize text-fg-muted">{user.role}</p>
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
                  className={`${menuItemClass} text-danger hover:bg-danger-subtle`}
                >
                  Log out
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="border-b border-line-soft px-3 pb-2 pt-1">
                <p className="text-sm font-semibold text-fg">Welcome back</p>
                <p className="text-xs text-fg-muted">
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
                  className={`${menuItemClass} mt-1 inline-flex h-10 items-center justify-center bg-brand-600 text-white hover:bg-brand-700`}
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
