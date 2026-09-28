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
      <section className="bg-surface-muted py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <nav className="text-xs text-fg-muted">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/admin" className="hover:text-accent">
                  Manage courses
                </Link>
              </li>
              <li>/</li>
              <li className="text-fg-secondary">
                {unavailable ? "Course" : course?.title}
              </li>
            </ol>
          </nav>

          {unavailable ? (
            <p className="mt-8 rounded-2xl border border-line bg-surface p-6 text-sm text-fg-muted">
              We couldn&apos;t reach the server right now. Please try again in a
              moment.
            </p>
          ) : course ? (
            <>
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                  Admin · Course editor
                </p>
                <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-fg">
                  {course.title}
                </h1>
                <p className="mt-2 text-sm text-fg-muted">{course.description}</p>
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