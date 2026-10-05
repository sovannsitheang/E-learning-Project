"use client";

import Link from "next/link";
import { navItems } from "@/lib/utils";

const menuItemClass =
  "block rounded-lg px-3 py-2 text-sm font-medium text-fg-secondary transition-colors hover:bg-accent-subtle hover:text-accent";

export default function HeaderNav() {
  return (
    <>
      <nav className="hidden items-center gap-1 md:flex">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={menuItemClass}>
            {item.label}
          </Link>
        ))}
      </nav>

      <nav className="md:hidden">
        <details className="group relative">
          <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-line text-fg-secondary transition-colors hover:border-accent-line hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-line [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Open navigation menu</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-6 w-6 group-open:hidden"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="hidden h-6 w-6 group-open:block"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </summary>
          <div className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-line bg-surface p-1.5 shadow-lg">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={menuItemClass}>
                {item.label}
              </Link>
            ))}
          </div>
        </details>
      </nav>
    </>
  );
}
