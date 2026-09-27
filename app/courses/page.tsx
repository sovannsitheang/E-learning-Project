import Link from "next/link";
import { getCourses } from "@/lib/api/courses";
import CourseCard from "@/components/courses/course-card";
import CourseSearch from "@/components/courses/course-search";
import SectionHeading from "@/components/ui/section-heading";

interface CoursesPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const { q } = await searchParams;
  const query = q?.toLowerCase() ?? "";

  let courses: Awaited<ReturnType<typeof getCourses>> = [];
  let unavailable = false;
  try {
    courses = await getCourses();
  } catch {
    unavailable = true;
  }

  const filtered = courses.filter(
    (course) =>
      !query ||
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query),
  );

  return (
    <>
      <section className="bg-gradient-to-br from-brand-800 via-brand-700 to-brand-600 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Browse Courses
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            Explore free digital lessons across every subject and grade level.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <form action="/courses" method="get">
            <CourseSearch defaultQuery={q} />
          </form>

          <div className="mt-12">
            <SectionHeading
              eyebrow="Courses"
              title={`${filtered.length} course${filtered.length === 1 ? "" : "s"}`}
            />
            {unavailable ? (
              <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white p-14 text-center">
                <p className="text-lg font-semibold text-slate-900">
                  Courses are temporarily unavailable
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Please try again in a moment.
                </p>
                <Link
                  href="/courses"
                  className="mt-6 inline-flex h-10 items-center rounded-full bg-brand-700 px-6 text-sm font-semibold text-white hover:bg-brand-800"
                >
                  Retry
                </Link>
              </div>
            ) : filtered.length > 0 ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white p-14 text-center">
                <p className="text-lg font-semibold text-slate-900">
                  No courses found
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Try a different keyword.
                </p>
                <Link
                  href="/courses"
                  className="mt-6 inline-flex h-10 items-center rounded-full bg-brand-700 px-6 text-sm font-semibold text-white hover:bg-brand-800"
                >
                  Clear Filters
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}