import Navbar from "@/components/navbar";
import { db } from "@/lib/db";
import { courses } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const CoursePage = async ({ params }: { params: { courseId: string } }) => {
  const GetCourse = async () => {
    const res = await db
      .select()
      .from(courses)
      .where(eq(courses.courseId, params.courseId));
    return res[0];
  };

  const course = await GetCourse();

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default CoursePage;
