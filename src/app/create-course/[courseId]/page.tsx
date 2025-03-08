import { db } from "@/lib/db";
import { courses } from "@/lib/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import CourseInfo from "./_components/course-info";
import CourseDetails from "./_components/course-details";

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

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44 container mx-auto">
      <h2 className="font-bold text-center text-3xl text-primary">
        Course Layout
      </h2>
      {/* info */}
      <CourseInfo courseInfo={course} />
      {/* course details */}
      <CourseDetails courseInfo={course} />

      {/* chapter */}
    </div>
  );
};

export default CoursePage;
