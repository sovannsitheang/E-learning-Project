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
  "mt-1.5 h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500";
const textareaClass =
  "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500";

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
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400"
        >
          {error}
        </p>
      ) : null}
      {uploadMessage ? (
        <p
          role="status"
          className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400"
        >
          {uploadMessage}
        </p>
      ) : null}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Course lessons</h2>
        <p className="mt-1 text-sm text-slate-500">
          {lessons.length} lesson{lessons.length === 1 ? "" : "s"} published.
        </p>
        {lessons.length > 0 ? (
          <ul className="mt-5 space-y-3">
            {lessons.map((lesson, index) =>
              editingId === lesson.id ? (
                <li
                  key={lesson.id}
                  className="rounded-2xl border border-brand-200 bg-brand-50/50 p-4 dark:border-brand-800 dark:bg-brand-950/30"
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
                      className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-300 px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveEdit(lesson.id)}
                      disabled={savingEdit}
                      className="inline-flex h-10 items-center justify-center rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-brand-500"
                    >
                      {savingEdit ? "Saving..." : "Save"}
                    </button>
                  </div>
                </li>
              ) : (
                <li
                  key={lesson.id}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        Lesson {index + 1}: {lesson.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                        {lesson.content}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(lesson)}
                        className="inline-flex h-9 items-center justify-center rounded-lg border border-slate-300 px-3 text-xs font-medium text-slate-700 transition-colors hover:border-brand-600 hover:text-brand-700 dark:border-slate-700 dark:text-slate-300 dark:hover:text-brand-300"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteLesson(lesson)}
                        className="inline-flex h-9 items-center justify-center rounded-lg border border-red-200 px-3 text-xs font-medium text-red-700 transition-colors hover:border-red-300 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/50"
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
          <p className="mt-5 rounded-2xl border border-dashed border-slate-200 p-4 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
            No lessons yet. Add the first lesson below.
          </p>
        )}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Add a lesson</h2>
        <form className="mt-4 space-y-4" onSubmit={handleAddLesson}>
          <label className="block">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Title</span>
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
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Content</span>
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
            className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-brand-500"
          >
            {adding ? "Adding..." : "Add lesson"}
          </button>
        </form>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Course materials</h2>
        <p className="mt-1 text-sm text-slate-500">
          {materials} material{materials === 1 ? "" : "s"} uploaded.
        </p>
        <form className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end" onSubmit={handleUpload}>
          <label className="block flex-1">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">File</span>
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
            className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-brand-500"
          >
            {uploading ? "Uploading..." : "Upload material"}
          </button>
        </form>
      </section>
    </div>
  );
}