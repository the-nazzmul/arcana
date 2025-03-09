import { db } from "@/lib/db";
import { courses } from "@/lib/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import CourseLayout from "./_components/course-layout";

const CoursePage = async ({ params }: { params: { courseId: string } }) => {
  const user = await currentUser();

  const getCourse = async () => {
    const result = await db
      .select()
      .from(courses)
      .where(
        and(
          eq(courses.courseId, params.courseId),
          eq(courses.createdBy, user?.emailAddresses[0].emailAddress as string)
        )
      );
    return result[0];
  };
  const course = await getCourse();

  if (!course) return <div>Course not found</div>;

  return (
    <div className="py-10 px-2 md:px-20 lg:px-44 container mx-auto">
      <h2 className="font-bold text-center text-3xl text-primary">
        Course Layout
      </h2>
      <CourseLayout courseInfo={course} />
    </div>
  );
};

export default CoursePage;
