import { db } from "@/lib/db";
import { courses } from "@/lib/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userEmail = user.emailAddresses[0].emailAddress;

    const { courseImageUrl, courseId } = await req.json();

    // Check if the course exists and belongs to the user
    const course = await db
      .select()
      .from(courses)
      .where(
        and(eq(courses.courseId, courseId), eq(courses.createdBy, userEmail))
      );

    if (!course || course.length === 0) {
      return new NextResponse("Course not found or unauthorized", {
        status: 404,
      });
    }

    // Update the course image URL
    await db
      .update(courses)
      .set({ courseImageUrl })
      .where(eq(courses.courseId, courseId));

    return new NextResponse("Course image updated", { status: 200 });
  } catch (error) {
    console.error("Error updating course image:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
