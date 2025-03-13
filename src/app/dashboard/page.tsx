import { db } from "@/lib/db";
import { courses, userCourseProgress } from "@/lib/db/schema";
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

  // Fetch courses created by the user
  const courseData = await db
    .select()
    .from(courses)
    .where(eq(courses.createdBy, user.emailAddresses[0].emailAddress));

  // Fetch user's progress for all courses
  const progressData = await db
    .select()
    .from(userCourseProgress)
    .where(
      eq(userCourseProgress.userEmail, user.emailAddresses[0].emailAddress)
    );

  // Map courseId to lastChapterNumber
  const courseProgressMap = new Map(
    progressData.map((p) => [p.courseId, p.lastChapterNumber])
  );

  // Combine course data with progress
  const coursesWithProgress = courseData.map((course) => ({
    ...course,
    lastChapterNumber: courseProgressMap.get(course.courseId) || 1,
  }));

  const published = coursesWithProgress.filter(
    (course) => course.isPublished && course.isDeleted === false
  );
  const unpublished = coursesWithProgress.filter(
    (course) => !course.isPublished
  );
  const archived = coursesWithProgress.filter((course) => course.isDeleted);

  return (
    <div>
      <AddCourse numberOfCourses={courseData.length} />
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
        <div className="my-4 border-b pb-8">
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
      {unpublished.length > 0 && (
        <div className="my-4 pb-8">
          <h2 className="font-semibold my-4 text-2xl">Archived Courses</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {archived.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
