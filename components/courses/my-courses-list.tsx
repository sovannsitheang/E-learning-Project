"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import {
  getAuthUser,
  getEnrolledSnapshot,
  subscribeAuth,
  subscribeEnrolled,
  toggleEnrollment,
} from "@/lib/auth";
import CourseCard from "@/components/courses/course-card";
import type { Course } from "@/lib/types";

export default function MyCoursesList({ courses }: { courses: Course[] }) {
  const user = useSyncExternalStore(subscribeAuth, getAuthUser, getAuthUser);
  const enrolled = useSyncExternalStore(
    subscribeEnrolled,
    getEnrolledSnapshot,
    getEnrolledSnapshot,
  );

  if (!user) {
    return (
      <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Log in to see your courses
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Create a free account or log in to keep track of the courses you
          enroll in.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/login"
            className="inline-flex h-11 items-center rounded-lg bg-brand-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="inline-flex h-11 items-center rounded-lg border border-brand-600 px-6 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-100"
          >
            Register
          </Link>
        </div>
      </div>
    );
  }

  const myCourses = courses.filter((course) => enrolled.has(course.id));

  if (myCourses.length === 0) {
    return (
      <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          You haven&apos;t enrolled in any courses yet
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Browse the catalogue and hit &ldquo;Enroll Now&rdquo; on a course to
          add it here.
        </p>
        <Link
          href="/courses"
          className="mt-6 inline-flex h-11 items-center rounded-lg bg-brand-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {myCourses.map((course) => (
        <div key={course.id} className="flex flex-col">
          <CourseCard course={course} />
          <button
            type="button"
            onClick={() => toggleEnrollment(course.id)}
            className="mx-auto mt-3 inline-flex h-9 cursor-pointer items-center rounded-lg border border-slate-300 px-4 text-sm font-medium text-slate-600 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700"
          >
            Unenroll
          </button>
        </div>
      ))}
    </div>
  );
}