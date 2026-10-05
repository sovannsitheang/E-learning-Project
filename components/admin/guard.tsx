"use client";

import { useEffect, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  getAuthUser,
  setAuthHydrated,
  subscribeAuth,
} from "@/lib/auth";

export default function AdminGuard({ children }: { children: ReactNode }) {
  const user = useSyncExternalStore(subscribeAuth, getAuthUser, () => null);

  useEffect(() => {
    setAuthHydrated();
  }, []);

  if (!user) {
    return (
      <section className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-20 sm:px-6 dark:bg-slate-950">
        <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Admin access only
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            You need to log in before you can manage courses.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-brand-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-700 dark:bg-brand-500"
          >
            Log in
          </Link>
        </div>
      </section>
    );
  }

  if (user.role !== "admin") {
    return (
      <section className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-20 sm:px-6 dark:bg-slate-950">
        <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Admins only
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Your account does not have permission to manage content on this
            platform.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-brand-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-700 dark:bg-brand-500"
          >
            Go back home
          </Link>
        </div>
      </section>
    );
  }

  return <>{children}</>;
}