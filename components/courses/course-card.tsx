import Link from "next/link";
import type { Course } from "@/lib/types";
import CourseBanner from "@/components/courses/course-banner";
import { formatNumber } from "@/lib/utils";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="group overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition-shadow hover:shadow-lg"
    >
      <CourseBanner course={course} />
      <div className="p-5">
        <h3 className="font-semibold leading-snug text-fg group-hover:text-accent">
          {course.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-fg-muted">
          {course.description}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-line-soft pt-4 text-xs text-fg-muted">
          <span>{course.lessonCount} lessons</span>
          <span className="font-medium text-fg-secondary">
            {formatNumber(course.enrolledCount)} students
          </span>
        </div>
      </div>
    </Link>
  );
}