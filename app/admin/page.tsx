import Link from "next/link";
import { getCourses } from "@/lib/api/courses";
import AdminGuard from "@/components/admin/guard";
import { CreateCourseButton } from "@/components/admin/course-form";
import CourseAdminRow from "@/components/admin/course-admin-row";
import type { Course } from "@/lib/types";

export default async function AdminPage() {
  let courses: Course[] = [];
  let unavailable = false;
  try {
    courses = await getCourses();
  } catch {
    unavailable = true;
  }

  return (
    <AdminGuard>
      <section className="bg-slate-50 dark:bg-slate-950 py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-300">
                Admin dashboard
              </p>
              <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                Manage courses
              </h1>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Create, edit and remove courses and their lessons.
              </p>
            </div>
            <CreateCourseButton />
          </div>

          <div className="mt-10 space-y-4">
            {unavailable ? (
              <p className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-sm text-slate-600 dark:text-slate-400">
                We couldn&apos;t reach the server right now. Please try again in a
                moment.
              </p>
            ) : courses.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-10 text-center">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">No courses yet</p>
                <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
                  Create your first course to get started.
                </p>
              </div>
            ) : (
              courses.map((course) => (
                <CourseAdminRow key={course.id} course={course} />
              ))
            )}
          </div>

          <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">
            <Link href="/courses" className="font-medium text-brand-700 dark:text-brand-300 hover:underline">
              View the public course list
            </Link>{" "}
            to see what students see.
          </p>
        </div>
      </section>
    </AdminGuard>
  );
}