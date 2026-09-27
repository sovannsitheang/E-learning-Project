import { notFound } from "next/navigation";
import { getCourses } from "@/lib/api/courses";
import { ApiError } from "@/lib/api/client";
import MyCoursesList from "@/components/courses/my-courses-list";

export const metadata = {
  title: "My Courses | G4-Learning",
  description: "Your enrolled courses on G4-Learning.",
};

export default async function MyCoursesPage() {
  let courses: Awaited<ReturnType<typeof getCourses>> = [];
  let unavailable = false;
  try {
    courses = await getCourses();
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    unavailable = true;
  }

  return (
    <section className="flex-1 bg-slate-50 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            My Courses
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-500">
            All the courses you&apos;ve enrolled in, in one place.
          </p>
        </header>

        {unavailable ? (
          <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Couldn&apos;t load your courses
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              The course catalogue is temporarily unavailable.
            </p>
          </div>
        ) : (
          <MyCoursesList courses={courses} />
        )}
      </div>
    </section>
  );
}