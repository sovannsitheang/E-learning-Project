import Link from "next/link";
import type { Course } from "@/lib/types";
import CourseBanner from "@/components/courses/course-banner";
import { formatNumber } from "@/lib/utils";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
      <CourseBanner course={course} />
      <div className="p-5">
        <h3 className="font-semibold leading-snug text-slate-900 dark:text-slate-100 group-hover:text-brand-700 dark:group-hover:text-brand-300">
          {course.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {course.description}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <span>{course.lessonCount} lessons</span>
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {formatNumber(course.enrolledCount)} students
          </span>
        </div>
      </div>
    </Link>
  );
}