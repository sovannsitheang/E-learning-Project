"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  addEnrollment,
  getAuthUser,
  getEnrolledSnapshot,
  subscribeAuth,
  subscribeEnrolled,
  removeEnrollment,
} from "@/lib/auth";
import { enrollCourse } from "@/lib/api/courses";
import { ApiError } from "@/lib/api/client";

export default function EnrollButton({ courseId }: { courseId: string }) {
  const user = useSyncExternalStore(subscribeAuth, getAuthUser, () => null);
  const enrolled = useSyncExternalStore(
    subscribeEnrolled,
    () => getEnrolledSnapshot().has(courseId),
    () => false,
  );
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user) {
    return (
      <Link
        href="/login"
        className="mt-7 inline-flex h-11 w-full items-center justify-center rounded-lg bg-brand-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        Enroll Now
      </Link>
    );
  }

  const buttonClass =
    "mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold transition-colors";

  async function handleEnroll() {
    setPending(true);
    setError(null);
    try {
      await enrollCourse(courseId);
      addEnrollment(courseId);
    } catch (err) {
      setError(
        err instanceof ApiError && err.status === 0
          ? "Network error: the server could not be reached"
          : err instanceof Error
            ? err.message
            : "Could not enroll right now. Please try again.",
      );
    } finally {
      setPending(false);
    }
  }

  function handleUnenroll() {
    removeEnrollment(courseId);
  }

  return (
    <div className="mt-7">
      {error ? (
        <p
          role="alert"
          className="mb-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      ) : null}

      {enrolled ? (
        <div>
          <button
            type="button"
            disabled
            className={`${buttonClass} mt-0 w-full cursor-pointer bg-brand-800 text-white`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Enrolled
          </button>
          <button
            type="button"
            onClick={handleUnenroll}
            className="mt-2 inline-flex h-10 w-full cursor-pointer items-center justify-center rounded-lg border border-slate-300 px-6 text-sm font-medium text-slate-600 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700"
          >
            Remove from My Courses
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleEnroll}
          disabled={pending}
          className={`${buttonClass} mt-0 w-full cursor-pointer bg-brand-600 text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60`}
        >
          {pending ? "Enrolling..." : "Enroll Now"}
        </button>
      )}
    </div>
  );
}