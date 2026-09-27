import Image from "next/image";
import type { Course } from "@/lib/types";

export default function CourseBanner({ course }: { course: Course }) {
  return (
    <div className="relative h-40 overflow-hidden bg-gradient-to-br from-brand-800 to-brand-600">
      {course.thumbnailUrl ? (
        <Image
          src={course.thumbnailUrl}
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div className="flex h-full items-end p-5 text-white">
          <p className="text-3xl font-bold tracking-tight">
            {course.title.slice(0, 1)}
          </p>
        </div>
      )}
    </div>
  );
}