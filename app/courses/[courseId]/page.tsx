import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseWithLessons, getCourses } from "@/lib/api/courses";
import { ApiError } from "@/lib/api/client";
import CourseBanner from "@/components/courses/course-banner";
import CourseCard from "@/components/courses/course-card";
import EnrollButton from "@/components/courses/enroll-button";
import { formatNumber } from "@/lib/utils";
import type { Course, Lesson } from "@/lib/types";

interface CourseDetailPageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const { courseId } = await params;

  let course: Course | null = null;
  let lessons: Lesson[] = [];
  let unavailable = false;
  try {
    ({ course, lessons } = await getCourseWithLessons(courseId));
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    unavailable = true;
  }

  if (unavailable || !course) {
    return (
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Something went wrong
          </p>
          <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-fg">
            We couldn&apos;t load this course
          </h1>
          <p className="mt-3 text-base leading-relaxed text-fg-muted">
            Our servers are unreachable right now. Please try again in a
            moment.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href={`/courses/${courseId}`}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Try again
            </Link>
            <Link
              href="/courses"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-accent-line px-6 text-sm font-semibold text-accent transition-colors hover:bg-accent-subtle"
            >
              Browse courses
            </Link>
          </div>
        </div>
      </section>
    );
  }

  let allCourses: Awaited<ReturnType<typeof getCourses>> = [];
  try {
    allCourses = await getCourses();
  } catch {
    // related courses are optional; keep them empty if the API is unreachable
  }
  const related = allCourses.filter((item) => item.id !== course.id).slice(0, 3);

  return (
    <>
      <section className="bg-surface-muted py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="text-xs text-fg-muted">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-accent">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/courses" className="hover:text-accent">
                  Courses
                </Link>
              </li>
              <li>/</li>
              <li className="text-fg-secondary">{course.title}</li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="bg-surface py-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_380px]">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">
              {course.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-fg-muted">
              {course.description}
            </p>

            <div className="mt-10 overflow-hidden rounded-3xl border border-line shadow-sm">
              <CourseBanner course={course} />
              <div className="divide-y divide-line-soft">
                <div className="flex items-center gap-4 p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-subtle text-accent">
                    <PlayIcon />
                  </span>
                  <div>
                    <p className="font-semibold text-fg">
                      {course.lessonCount} video lessons
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="font-semibold text-fg">Course curriculum</p>
                  <ul className="mt-4 space-y-3">
                    {lessons.length > 0 ? (
                      lessons.map((lesson, index) => (
                        <li
                          key={lesson.id}
                          className="rounded-2xl border border-line-soft bg-surface-muted p-4"
                        >
                          <p className="text-sm font-semibold text-fg">
                            Lesson {index + 1}: {lesson.title}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                            {lesson.content}
                          </p>
                        </li>
                      ))
                    ) : (
                      <li className="rounded-2xl border border-dashed border-line p-4 text-sm text-fg-muted">
                        No lessons have been published for this course yet.
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <aside className="h-fit lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-3xl border border-line shadow-sm">
              <CourseBanner course={course} />
              <div className="p-6">
                <p className="text-2xl font-bold text-accent">Free</p>
                <p className="mt-1 text-sm text-fg-muted">
                  no payment required
                </p>
                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-fg-muted">Lessons</span>
                    <span className="font-medium text-fg">
                      {course.lessonCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-fg-muted">Students</span>
                    <span className="font-medium text-fg">
                      {formatNumber(course.enrolledCount)}
                    </span>
                  </div>
                </div>
                <EnrollButton courseId={course.id} />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="bg-surface-muted py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="text-xl font-bold text-fg">You may also like</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <CourseCard key={item.id} course={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}