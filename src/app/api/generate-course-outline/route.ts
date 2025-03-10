import { GenerateCourseLayout } from "@/lib/gemini";
import { db } from "@/lib/db";
import { courses } from "@/lib/db/schema";
import { IUserCourseInput } from "@/providers/user-input-context";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userCourseInput: IUserCourseInput = await req.json();
    const {
      category,
      topic,
      description,
      difficulty,
      duration,
      video,
      chapters,
    } = userCourseInput;

    const prompt = `Generate a streamlined yet robust course outline in JSON format based on the following specifications. Make sure Enough details is provided for each and every topics that is included in the Course:

    Category: [${category}]

    Topic: [${topic}]

    Additional Description: [${description}]

    Difficulty Level: [${difficulty}]

    Total Duration: [${duration}]

    Include Videos: [${video}]

    Number of Chapters: [${chapters}]`;

    const result = await GenerateCourseLayout.sendMessage(prompt);

    const courseLayout = result.response.text();
    const parsedCourseLayout = JSON.parse(courseLayout);

    console.log(parsedCourseLayout);

    const courseId = uuidv4();

    const courseOutline = await db
      .insert(courses)
      .values({
        courseId: courseId,
        courseTitle: parsedCourseLayout.courseTitle,
        courseOutline: parsedCourseLayout.courseOutline,
        category: parsedCourseLayout.category,
        difficulty: parsedCourseLayout.difficulty,
        duration: parsedCourseLayout.duration,
        chapters: parsedCourseLayout.numberOfChapters,
        topic: parsedCourseLayout.topic,
        courseImageUrl: "/course-image-placeholder.png",
        createdBy: user.emailAddresses[0].emailAddress,
        userName: user.fullName!,
        description: parsedCourseLayout.description,
        userProfileImage: user.imageUrl,
        video: parsedCourseLayout.includesVideos ? "yes" : "no",
      })
      .returning();

    return NextResponse.json(
      { courseId: courseOutline[0].courseId },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Course generation failed", error: error.message },
      { status: 500 }
    );
  }
}
