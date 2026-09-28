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
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 shadow-sm sm:flex-row sm:items-center">
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-fg">{course.title}</h3>
        <p className="mt-1 text-sm text-fg-muted">
          {course.lessonCount} lessons · {course.enrolledCount} students
          {course.thumbnailUrl ? null : " · no thumbnail"}
        </p>
        {error ? (
          <p role="alert" className="mt-2 text-sm text-danger">
            {error}
          </p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Link
          href={`/admin/courses/${course.id}`}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-line-strong px-4 text-sm font-medium text-fg-secondary transition-colors hover:border-accent-line hover:text-accent"
        >
          Lessons
        </Link>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-line-strong px-4 text-sm font-medium text-fg-secondary transition-colors hover:border-accent-line hover:text-accent"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-danger-line px-4 text-sm font-medium text-danger transition-colors hover:border-danger-line hover:bg-danger-subtle disabled:cursor-not-allowed disabled:opacity-60"
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