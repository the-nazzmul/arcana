import { db } from "@/lib/db";
import { courses } from "@/lib/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import ChapterList from "./_components/chapter-list";
import CourseInfo from "./_components/course-info";

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
    <div className="py-10 px-2 md:px-20 lg:px-44 container mx-auto">
      <h2 className="font-bold text-center text-3xl text-primary">
        Course Layout
      </h2>
      {/* info */}
      <CourseInfo courseInfo={course} />
      {/* chapter */}
      <ChapterList courseInfo={course} />
    </div>
  );
};

export default CoursePage;
