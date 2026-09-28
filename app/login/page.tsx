"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth";
import { saveSession } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const { user, token } = await login(email.trim(), password);
      saveSession(user, token);
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="flex flex-1 items-center justify-center bg-surface-muted px-4 py-16 sm:px-6">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-line bg-surface p-8 shadow-sm">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-fg">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-fg-muted">
              Log in to continue your lessons.
            </p>
          </div>
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-medium text-fg-secondary">Email</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1.5 h-11 w-full rounded-xl border border-line-strong bg-surface px-4 text-sm text-fg placeholder:text-fg-subtle focus:border-accent-line focus:outline-none focus:ring-2 focus:ring-accent-line/20"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-fg-secondary">Password</span>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="mt-1.5 h-11 w-full rounded-xl border border-line-strong bg-surface px-4 text-sm text-fg placeholder:text-fg-subtle focus:border-accent-line focus:outline-none focus:ring-2 focus:ring-accent-line/20"
              />
            </label>
            {error ? (
              <p
                role="alert"
                className="rounded-xl border border-danger-line bg-danger-subtle px-4 py-3 text-sm text-danger"
              >
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={pending}
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-brand-700 text-sm font-semibold text-white transition-colors hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Logging in..." : "Log in"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-fg-muted">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-accent hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}