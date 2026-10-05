"use client";

import Link from "next/link";

export default function RootError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <section className="flex flex-1 items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-brand-600 dark:text-brand-300">
          Something went wrong
        </p>
        <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          We ran into an unexpected error
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">
          This may be temporary. Please try again, or head back to home and
          keep learning.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={retry}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-600 dark:bg-brand-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-brand-600 px-6 text-sm font-semibold text-brand-700 dark:text-brand-300 transition-colors hover:bg-brand-100 dark:hover:bg-brand-800"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}