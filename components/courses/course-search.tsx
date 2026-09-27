"use client";

interface CourseSearchProps {
  defaultQuery?: string;
}

export default function CourseSearch({ defaultQuery = "" }: CourseSearchProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="relative flex-1">
        <input
          name="q"
          type="text"
          defaultValue={defaultQuery}
          placeholder="Search courses..."
          className="h-12 w-full rounded-full border border-slate-300 bg-white px-5 pl-11 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center rounded-full bg-brand-700 px-8 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
      >
        Search
      </button>
    </div>
  );
}