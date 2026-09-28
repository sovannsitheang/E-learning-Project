"use client";

import Link from "next/link";
import { clearSession } from "@/lib/auth";
import { useAuthUser } from "@/lib/use-auth-user";

export default function AuthControls() {
  const user = useAuthUser();

  function handleLogout() {
    clearSession();
  }

  if (!user) {
    return (
      <div className="flex items-center gap-5">
        <Link
          href="/login"
          className="hidden rounded-lg px-2 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-brand-700 sm:inline-flex"
        >
          Log in
        </Link>
        <Link
          href="/register"
          className="inline-flex h-10 items-center rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 sm:px-6"
        >
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {user.role === "admin" ? (
        <Link
          href="/admin"
          className="hidden rounded-lg px-3 py-2 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-100 md:inline-flex"
        >
          Admin
        </Link>
      ) : null}
      <Link
        href="/my-courses"
        className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-brand-100 hover:text-brand-700 md:inline-flex"
      >
        My Courses
      </Link>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 text-sm font-semibold text-white">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <div className="hidden flex-col sm:flex">
        <span className="text-sm font-semibold text-slate-900">{user.name}</span>
        <span className="text-xs capitalize text-slate-500">{user.role}</span>
      </div>
      <button
        type="button"
        onClick={handleLogout}
        className="inline-flex h-9 items-center rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-700 transition-colors hover:border-brand-600 hover:text-brand-700"
      >
        Log out
      </button>
    </div>
  );
}