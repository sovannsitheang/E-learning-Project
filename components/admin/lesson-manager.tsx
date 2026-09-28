"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  createLessons,
  deleteLesson,
  updateLesson,
  uploadCourseMaterial,
} from "@/lib/api/courses";
import type { Lesson } from "@/lib/types";

const inputClass =
  "mt-1.5 h-11 w-full rounded-xl border border-line-strong bg-surface px-4 text-sm text-fg placeholder:text-fg-subtle focus:border-accent-line focus:outline-none focus:ring-2 focus:ring-accent-line/20";
const textareaClass =
  "mt-1.5 w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-sm text-fg placeholder:text-fg-subtle focus:border-accent-line focus:outline-none focus:ring-2 focus:ring-accent-line/20";

interface LessonManagerProps {
  courseId: string;
  initialLessons: Lesson[];
  initialMaterials: number;
}

export default function LessonManager({
  courseId,
  initialLessons,
  initialMaterials,
}: LessonManagerProps) {
  const router = useRouter();
  const [lessons] = useState(initialLessons);
  const [materials, setMaterials] = useState(initialMaterials);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  function showError(err: unknown) {
    setError(
      err instanceof Error ? err.message : "Something went wrong. Please try again.",
    );
  }

  async function handleAddLesson(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setAdding(true);
    try {
      await createLessons(courseId, [{ title: title.trim(), content: content.trim() }]);
      setTitle("");
      setContent("");
      router.refresh();
    } catch (err) {
      showError(err);
    } finally {
      setAdding(false);
    }
  }

  function startEdit(lesson: Lesson) {
    setEditingId(lesson.id);
    setEditTitle(lesson.title);
    setEditContent(lesson.content);
    setError(null);
  }

  async function handleSaveEdit(lessonId: string) {
    setError(null);
    setSavingEdit(true);
    try {
      await updateLesson(courseId, lessonId, {
        title: editTitle.trim(),
        content: editContent.trim(),
      });
      setEditingId(null);
      router.refresh();
    } catch (err) {
      showError(err);
    } finally {
      setSavingEdit(false);
    }
  }

  async function handleDeleteLesson(lesson: Lesson) {
    if (!window.confirm(`Delete lesson "${lesson.title}"? This cannot be undone.`)) {
      return;
    }
    setError(null);
    try {
      await deleteLesson(courseId, lesson.id);
      router.refresh();
    } catch (err) {
      showError(err);
    }
  }

  async function handleUpload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("materials") as HTMLInputElement;
    const file = input?.files?.[0];
    if (!file) return;
    setUploadMessage(null);
    setError(null);
    setUploading(true);
    try {
      await uploadCourseMaterial(courseId, file);
      setUploadMessage(`"${file.name}" uploaded successfully.`);
      input.value = "";
      setMaterials((count) => count + 1);
      router.refresh();
    } catch (err) {
      showError(err);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mt-10 space-y-8">
      {error ? (
        <p
          role="alert"
          className="rounded-xl border border-danger-line bg-danger-subtle px-4 py-3 text-sm text-danger"
        >
          {error}
        </p>
      ) : null}
      {uploadMessage ? (
        <p
          role="status"
          className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
        >
          {uploadMessage}
        </p>
      ) : null}

      <section className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-bold text-fg">Course lessons</h2>
        <p className="mt-1 text-sm text-fg-muted">
          {lessons.length} lesson{lessons.length === 1 ? "" : "s"} published.
        </p>
        {lessons.length > 0 ? (
          <ul className="mt-5 space-y-3">
            {lessons.map((lesson, index) =>
              editingId === lesson.id ? (
                <li
                  key={lesson.id}
                  className="rounded-2xl border border-accent-line bg-accent-subtle/50 p-4"
                >
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Lesson title"
                    className={inputClass}
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="Lesson content"
                    rows={3}
                    className={`${textareaClass} mt-3`}
                  />
                  <div className="mt-3 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="inline-flex h-10 items-center justify-center rounded-lg border border-line-strong px-4 text-sm font-medium text-fg-secondary transition-colors hover:bg-surface-muted"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveEdit(lesson.id)}
                      disabled={savingEdit}
                      className="inline-flex h-10 items-center justify-center rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {savingEdit ? "Saving..." : "Save"}
                    </button>
                  </div>
                </li>
              ) : (
                <li
                  key={lesson.id}
                  className="rounded-2xl border border-line-soft bg-surface-muted p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-fg">
                        Lesson {index + 1}: {lesson.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                        {lesson.content}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(lesson)}
                        className="inline-flex h-9 items-center justify-center rounded-lg border border-line-strong px-3 text-xs font-medium text-fg-secondary transition-colors hover:border-accent-line hover:text-accent"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteLesson(lesson)}
                        className="inline-flex h-9 items-center justify-center rounded-lg border border-danger-line px-3 text-xs font-medium text-danger transition-colors hover:border-danger-line hover:bg-danger-subtle"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ),
            )}
          </ul>
        ) : (
          <p className="mt-5 rounded-2xl border border-dashed border-line p-4 text-sm text-fg-muted">
            No lessons yet. Add the first lesson below.
          </p>
        )}
      </section>

      <section className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-bold text-fg">Add a lesson</h2>
        <form className="mt-4 space-y-4" onSubmit={handleAddLesson}>
          <label className="block">
            <span className="text-sm font-medium text-fg-secondary">Title</span>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Getting Started"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-fg-secondary">Content</span>
            <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What students should learn in this lesson"
              rows={4}
              className={textareaClass}
            />
          </label>
          <button
            type="submit"
            disabled={adding}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {adding ? "Adding..." : "Add lesson"}
          </button>
        </form>
      </section>

      <section className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
        <h2 className="text-lg font-bold text-fg">Course materials</h2>
        <p className="mt-1 text-sm text-fg-muted">
          {materials} material{materials === 1 ? "" : "s"} uploaded.
        </p>
        <form className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end" onSubmit={handleUpload}>
          <label className="block flex-1">
            <span className="text-sm font-medium text-fg-secondary">File</span>
            <input
              type="file"
              name="materials"
              required
              className={`${inputClass} h-11 rounded-xl`}
            />
          </label>
          <button
            type="submit"
            disabled={uploading}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploading ? "Uploading..." : "Upload material"}
          </button>
        </form>
      </section>
    </div>
  );
}