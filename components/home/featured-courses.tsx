import Image from "next/image";
import Link from "next/link";
import { getCourses } from "@/lib/api/courses";
import Button from "@/components/ui/button";

export default async function FeaturedCourses() {
  let courses: Awaited<ReturnType<typeof getCourses>> = [];
  try {
    courses = await getCourses();
  } catch {
    // keep the section empty if the API is unreachable
  }

  const featured = courses.slice(0, 6);

  return (
    <section className="bg-white py-20 sm:py-28 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-600 dark:text-brand-300">
            Popular courses
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            Pick your favourite subject and start learning
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Hands-on lessons taught by the best teachers from across the
            Kingdom.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="group relative block h-64 overflow-hidden rounded-xl bg-brand-700"
            >
              {course.thumbnailUrl ? (
                <Image
                  src={course.thumbnailUrl}
                  alt={course.title}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-end p-6 text-white">
                  <span className="font-serif text-6xl font-semibold">
                    {course.title.slice(0, 1)}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 rounded-t-2xl bg-gradient-to-t from-black/50 to-transparent p-5">
                <div>
                  <span className="inline-block max-w-full truncate rounded-lg bg-brand-600 px-3.5 py-2 text-sm font-medium text-white transition-colors group-hover:bg-brand-700">
                    {course.title}
                  </span>
                  <p className="mt-2 text-xs text-white/80">
                    {course.lessonCount} lessons
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/courses" className="rounded-lg">
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
}