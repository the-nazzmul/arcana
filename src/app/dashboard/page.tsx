import { db } from "@/lib/db";
import { courses } from "@/lib/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import AddCourse from "@/app/dashboard/_components/add-course";
import { InferSelectModel } from "drizzle-orm";
import CourseCard from "./_components/course-card";

const DashboardPage = async () => {
  // Authenticate user
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  // Fetch courses  from the database
  const courseData = await db
    .select()
    .from(courses)
    .where(
      and(
        eq(courses.createdBy, user.emailAddresses[0].emailAddress),
        eq(courses.isDeleted, false)
      )
    );

  const published = courseData.filter(
    (course: InferSelectModel<typeof courses>) => course.isPublished // Updated to match your schema
  );
  const unpublished = courseData.filter(
    (course: InferSelectModel<typeof courses>) => !course.isPublished
  );

  return (
    <div>
      <AddCourse />
      {published.length > 0 && (
        <div className="my-4 border-b pb-8">
          <h2 className="font-semibold my-4 text-2xl text-primary">
            Published Courses
          </h2>
          <div className="grid grid-cols-1  lg:grid-cols-3 gap-4">
            {published.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}
      {unpublished.length > 0 && (
        <div className="my-4">
          <h2 className="font-semibold my-4 text-2xl">
            Finish Generating Content
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {unpublished.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
