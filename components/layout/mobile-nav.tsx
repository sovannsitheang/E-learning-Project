"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { clearSession } from "@/lib/auth";
import { useAuthUser } from "@/lib/use-auth-user";
import { navItems } from "@/lib/utils";

const linkClassName =
  "rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-brand-100 hover:text-brand-700";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const user = useAuthUser();

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

  function handleLogout() {
    clearSession();
    setOpen(false);
  }

  return (
    <div className="md:hidden" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-controls="mobile-nav-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:border-brand-600 hover:text-brand-700"
      >
        {open ? (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.3 19.71 2.89 18.3 9.17 12 2.89 5.7 4.3 4.29l6.29 6.3 6.3-6.3z" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
          </svg>
        )}
      </button>
      {open ? (
        <div
          id="mobile-nav-menu"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-slate-100 bg-white shadow-lg"
        >
          <div className="mx-auto max-w-7xl px-4 pb-3 pt-2 sm:px-6">
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={linkClassName}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-1 flex flex-col border-t border-slate-100 pt-2">
              {user ? (
                <>
                  <div className="flex items-center gap-2.5 px-4 py-2">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-semibold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="flex min-w-0 flex-col leading-tight">
                      <span className="truncate text-sm font-semibold text-slate-900">
                        {user.name}
                      </span>
                      <span className="text-xs capitalize text-slate-500">
                        {user.role}
                      </span>
                    </span>
                  </div>
                  <Link
                    href="/my-courses"
                    onClick={() => setOpen(false)}
                    className={linkClassName}
                  >
                    My Courses
                  </Link>
                  {user.role === "admin" ? (
                    <Link
                      href="/admin"
                      onClick={() => setOpen(false)}
                      className={linkClassName}
                    >
                      Admin
                    </Link>
                  ) : null}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-brand-100 hover:text-brand-700"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className={linkClassName}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="mt-1 inline-flex h-10 items-center justify-center rounded-lg bg-brand-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
