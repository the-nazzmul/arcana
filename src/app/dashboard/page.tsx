import { db } from "@/lib/db";
import { courses } from "@/lib/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import AddCourse from "@/app/dashboard/_components/add-course";
import { InferSelectModel } from "drizzle-orm";

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
    .where(eq(courses.createdBy, user.emailAddresses[0].emailAddress));

  const published = courseData.filter(
    (course: InferSelectModel<typeof courses>) => course.isPublished // Updated to match your schema
  );
  const unpublished = courseData.filter(
    (course: InferSelectModel<typeof courses>) => !course.isPublished
  );

  return (
    <div>
      <AddCourse />
      <div className="my-8">
        <h2>{unpublished.length}</h2>
      </div>
      <div className="my-8">{published.length}</div>
    </div>
  );
};

export default DashboardPage;
