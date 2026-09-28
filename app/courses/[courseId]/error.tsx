"use client";

import Link from "next/link";

export default function CourseDetailError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">
          Something went wrong
        </p>
        <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-fg">
          We couldn&apos;t load this course
        </h1>
        <p className="mt-3 text-base leading-relaxed text-fg-muted">
          Our servers are unreachable right now. Please try again in a moment.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={retry}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Try again
          </button>
          <Link
            href="/courses"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-accent-line px-6 text-sm font-semibold text-accent transition-colors hover:bg-accent-subtle"
          >
            Browse courses
          </Link>
        </div>
      </div>
    </section>
  );
}