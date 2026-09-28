import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center justify-center bg-surface-muted px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-serif text-7xl font-bold tracking-tight text-accent sm:text-8xl">
          404
        </p>
        <p className="mt-4 text-sm font-medium uppercase tracking-widest text-accent">
          Page not found
        </p>
        <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-fg">
          This page could not be found
        </h1>
        <p className="mt-3 text-base leading-relaxed text-fg-muted">
          The page you are looking for doesn&apos;t exist, may have been
          removed, or the link is broken.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Back to home
          </Link>
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