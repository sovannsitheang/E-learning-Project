"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface HeroProps {
  suggestions?: string[];
}

export default function Hero({ suggestions = [] }: HeroProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function submit() {
    router.push(`/courses?q=${encodeURIComponent(query)}`);
  }

  return (
    <section className="overflow-hidden bg-white dark:bg-slate-950">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-brand-600 dark:text-brand-300">
            G4-Learning · Free Online Learning
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-slate-100">
            Find the ideal lesson to unlock your potential
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
            Free digital lessons for students across Cambodia, aligned with the
            national curriculum. Learn anytime, anywhere.
          </p>

          <div className="mt-9 max-w-xl">
            <div className="flex items-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900">
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") submit();
                }}
                placeholder="Search for a course..."
                className="w-full bg-transparent px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={submit}
                className="m-1.5 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 sm:px-6"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                Search
              </button>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500 dark:text-slate-400">Popular:</span>
              {suggestions.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => router.push(`/courses?q=${encodeURIComponent(tag.toLowerCase())}`)}
                  className="rounded-lg border border-slate-200 px-3 py-1 text-slate-600 transition-colors hover:border-brand-600 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-brand-300 dark:hover:text-brand-300"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 rounded-full bg-brand-100 dark:bg-brand-800/40"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 p-10 shadow-xl sm:p-12">
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
              aria-hidden="true"
            />
            <p className="relative text-sm font-medium text-blue-50">
              Quality education at your fingertips
            </p>
            <h2 className="relative mt-4 font-serif text-2xl leading-snug text-white sm:text-3xl">
              &ldquo;Education is no longer a place you go, it is everywhere you are.&rdquo;
            </h2>
            <p className="relative mt-5 max-w-md text-sm leading-relaxed text-blue-50">
              Every lesson is written and reviewed by experienced educators, so
              students in the city and the countryside learn from the same
              trusted national curriculum.
            </p>
            <div className="relative mt-9 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                25 provinces
              </span>
              <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                Free forever
              </span>
              <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                Primary → Upper secondary
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}