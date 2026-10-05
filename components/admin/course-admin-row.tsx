"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteCourse } from "@/lib/api/courses";
import { CourseFormModal } from "@/components/admin/course-form";
import type { Course } from "@/lib/types";

export default function CourseAdminRow({ course }: { course: Course }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (!window.confirm(`Delete "${course.title}"? This cannot be undone.`)) {
      return;
    }
    setDeleting(true);
    setError(null);
    try {
      await deleteCourse(course.id);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not delete this course.",
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900">
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-slate-900 dark:text-slate-100">{course.title}</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {course.lessonCount} lessons · {course.enrolledCount} students
          {course.thumbnailUrl ? null : " · no thumbnail"}
        </p>
        {error ? (
          <p role="alert" className="mt-2 text-sm text-red-700 dark:text-red-400">
            {error}
          </p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Link
          href={`/admin/courses/${course.id}`}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-300 px-4 text-sm font-medium text-slate-700 transition-colors hover:border-brand-600 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300 dark:hover:text-brand-300"
        >
          Lessons
        </Link>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-300 px-4 text-sm font-medium text-slate-700 transition-colors hover:border-brand-600 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300 dark:hover:text-brand-300"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-red-200 px-4 text-sm font-medium text-red-700 transition-colors hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/50"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
      {editing ? (
        <CourseFormModal course={course} onClose={() => setEditing(false)} />
      ) : null}
    </div>
  );
}