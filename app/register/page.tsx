"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api/auth";
import { saveSession } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const name = `${firstName.trim()} ${lastName.trim()}`.trim();
      const { user, token } = await register({ name, email: email.trim(), password, role });
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
              Create an account
            </h1>
            <p className="mt-2 text-sm text-fg-muted">
              Start learning for free — no payment required.
            </p>
          </div>
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-fg-secondary">First name</span>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Sokha"
                  className="mt-1.5 h-11 w-full rounded-xl border border-line-strong bg-surface px-4 text-sm text-fg placeholder:text-fg-subtle focus:border-accent-line focus:outline-none focus:ring-2 focus:ring-accent-line/20"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-fg-secondary">Last name</span>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Chan"
                  className="mt-1.5 h-11 w-full rounded-xl border border-line-strong bg-surface px-4 text-sm text-fg placeholder:text-fg-subtle focus:border-accent-line focus:outline-none focus:ring-2 focus:ring-accent-line/20"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-sm font-medium text-fg-secondary">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1.5 h-11 w-full rounded-xl border border-line-strong bg-surface px-4 text-sm text-fg placeholder:text-fg-subtle focus:border-accent-line focus:outline-none focus:ring-2 focus:ring-accent-line/20"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-fg-secondary">Role</span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-xl border border-line-strong bg-surface px-4 text-sm text-fg focus:border-accent-line focus:outline-none focus:ring-2 focus:ring-accent-line/20"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="parent">Parent</option>
                <option value="citizen">Citizen / Lifelong learner</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-fg-secondary">Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
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
              {pending ? "Creating account..." : "Create account"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-fg-muted">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-accent hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}