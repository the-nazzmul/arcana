"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { courses } from "@/lib/db/schema";
import { InferSelectModel } from "drizzle-orm";
import {
  BrainIcon,
  EditIcon,
  EllipsisVerticalIcon,
  NotebookTextIcon,
  RocketIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeleteCourseDropdown from "./delete-course-dropdown";
import { DeleteCourse } from "@/lib/actions/delete-course";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CourseCard = ({
  course,
}: {
  course: InferSelectModel<typeof courses>;
}) => {
  const router = useRouter();
  const handleDelete = async () => {
    const res = await DeleteCourse({ courseId: course.courseId });
    if (res.message === "Course deleted successfully") {
      toast.success(res.message);
      router.refresh();
    }
  };

  return (
    <Card>
      <CardHeader className="p-0">
        <Image
          src={course.courseImageUrl!}
          alt={course.courseTitle}
          width={300}
          height={300}
          className="w-full h-full aspect-video object-cover rounded-t-xl"
        />
      </CardHeader>
      <CardContent className="mt-3">
        <div className="flex items-baseline justify-between">
          <h1 className="text-lg font-semibold">{course.courseTitle}</h1>
          {course.isPublished && (
            <DeleteCourseDropdown handleDelete={handleDelete}>
              <Button variant="ghost" size="icon">
                <EllipsisVerticalIcon className="size-4" />
              </Button>
            </DeleteCourseDropdown>
          )}
        </div>
        <div className="flex items-center justify-between my-2">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-full bg-primary/20">
              <BrainIcon className="size-4" />
            </div>
            {course.difficulty}
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-full bg-primary/20">
              <NotebookTextIcon className="size-4" />
            </div>
            {course.chapters}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <Link href={`/create-course/${course.courseId}`} className="w-full">
          <Button variant="outline" className="w-full">
            <span>Edit</span>
            <EditIcon className="size-4" />
          </Button>
        </Link>
        <Link
          href={`/course/${course.courseId}`}
          className={`w-full ${course.isPublished === false && "hidden"}`}
        >
          <Button className="w-full">
            <span>Start</span>
            <RocketIcon className="size-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
