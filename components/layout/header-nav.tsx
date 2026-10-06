"use client";

import Link from "next/link";
import { navItems } from "@/lib/utils";

const menuItemClass =
  "block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-brand-100 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white";

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
          <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-brand-100 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white [&::-webkit-details-marker]:hidden">
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
          <div className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-900">
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