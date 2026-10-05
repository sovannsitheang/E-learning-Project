import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseWithLessons } from "@/lib/api/courses";
import { ApiError } from "@/lib/api/client";
import AdminGuard from "@/components/admin/guard";
import LessonManager from "@/components/admin/lesson-manager";

interface AdminCoursePageProps {
  params: Promise<{ courseId: string }>;
}

export default async function AdminCoursePage({
  params,
}: AdminCoursePageProps) {
  const { courseId } = await params;

  let course: Awaited<ReturnType<typeof getCourseWithLessons>>["course"] | null =
    null;
  let lessons: Awaited<ReturnType<typeof getCourseWithLessons>>["lessons"] = [];
  let materialsCount = 0;
  let unavailable = false;
  try {
    ({ course, lessons, materialsCount } = await getCourseWithLessons(courseId));
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    unavailable = true;
  }

  return (
    <AdminGuard>
      <section className="bg-slate-50 dark:bg-slate-950 py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <nav className="text-xs text-slate-500 dark:text-slate-400">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/admin" className="hover:text-brand-700 dark:hover:text-brand-300">
                  Manage courses
                </Link>
              </li>
              <li>/</li>
              <li className="text-slate-700 dark:text-slate-300">
                {unavailable ? "Course" : course?.title}
              </li>
            </ol>
          </nav>

          {unavailable ? (
            <p className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-sm text-slate-600 dark:text-slate-400">
              We couldn&apos;t reach the server right now. Please try again in a
              moment.
            </p>
          ) : course ? (
            <>
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-300">
                  Admin · Course editor
                </p>
                <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  {course.title}
                </h1>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{course.description}</p>
              </div>
              <LessonManager
                courseId={courseId}
                initialLessons={lessons}
                initialMaterials={materialsCount}
              />
            </>
          ) : null}
        </div>
      </section>
    </AdminGuard>
  );
}