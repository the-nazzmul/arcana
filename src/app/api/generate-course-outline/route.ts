import { GenerateCourseLayout } from "@/config/gemini";
import { IUserCourseInput } from "@/providers/user-input-context";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
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

    return NextResponse.json(parsedCourseLayout, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Course generation failed", error: error.message },
      { status: 500 }
    );
  }
}
