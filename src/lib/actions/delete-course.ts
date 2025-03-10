"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "../db";
import { courses } from "../db/schema";
import { eq } from "drizzle-orm";

export async function DeleteCourse({ courseId }: { courseId: string }) {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const isExist = await db
    .select()
    .from(courses)
    .where(eq(courses.courseId, courseId));

  if (!isExist.length) {
    throw new Error("Course not found");
  }

  const isOwner = isExist[0].createdBy === user.emailAddresses[0].emailAddress;

  if (!isOwner) {
    throw new Error("You are not the owner of this course");
  }

  await db
    .update(courses)
    .set({ isDeleted: true })
    .where(eq(courses.courseId, courseId));

  return { message: "Course deleted successfully" };
}
