"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createCourse, updateCourse } from "@/lib/api/courses";
import type { Course } from "@/lib/types";

const inputClass =
  "mt-1.5 h-11 w-full rounded-xl border border-line-strong bg-surface px-4 text-sm text-fg placeholder:text-fg-subtle focus:border-accent-line focus:outline-none focus:ring-2 focus:ring-accent-line/20";
const textareaClass =
  "mt-1.5 w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-sm text-fg placeholder:text-fg-subtle focus:border-accent-line focus:outline-none focus:ring-2 focus:ring-accent-line/20";

interface CourseFormModalProps {
  course?: Course | null;
  onClose: () => void;
}

export function CourseFormModal({ course, onClose }: CourseFormModalProps) {
  const router = useRouter();
  const editing = Boolean(course);
  const [title, setTitle] = useState(course?.title ?? "");
  const [description, setDescription] = useState(course?.description ?? "");
  const [thumbnail, setThumbnail] = useState(course?.thumbnailUrl ?? "");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const input = {
        title: title.trim(),
        description: description.trim(),
        thumbnail: thumbnail.trim() || undefined,
      };
      if (editing && course) {
        await updateCourse(course.id, input);
      } else {
        await createCourse(input);
      }
      onClose();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-slate-900/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-lg rounded-3xl border border-line bg-surface p-8 shadow-xl">
        <h2 className="text-xl font-bold tracking-tight text-fg">
          {editing ? "Edit course" : "Create course"}
        </h2>
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-medium text-fg-secondary">Title</span>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Introduction to React"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-fg-secondary">Description</span>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What students will learn in this course"
              rows={4}
              className={textareaClass}
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-fg-secondary">Thumbnail URL</span>
            <input
              type="url"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className={inputClass}
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
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 items-center justify-center rounded-lg border border-line-strong px-6 text-sm font-medium text-fg-secondary transition-colors hover:bg-surface-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Saving..." : editing ? "Save changes" : "Create course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function CreateCourseButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4" aria-hidden="true">
          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </svg>
        Create course
      </button>
      {open ? <CourseFormModal course={null} onClose={() => setOpen(false)} /> : null}
    </>
  );
}