"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "../db";
import { courses } from "../db/schema";
import { and, eq } from "drizzle-orm";

export async function PublishCourse({ courseId }: { courseId: string }) {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("User not found");
    }
    const userEmail = user.emailAddresses[0].emailAddress;

    const course = await db
      .select()
      .from(courses)
      .where(
        and(eq(courses.courseId, courseId), eq(courses.createdBy, userEmail))
      );

    if (!course || course.length === 0) {
      throw new Error("Course not found");
    }
    await db
      .update(courses)
      .set({ isPublished: true })
      .where(eq(courses.courseId, courseId));
    return { message: "Course published successfully" };
  } catch (error) {
    return { error: "Failed to publish course" };
  }
}
