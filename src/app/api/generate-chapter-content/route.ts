import { GenerateContentChat } from "@/lib/gemini";
import { chapterContent } from "@/lib/db/schema";
import { IChapterOutline } from "@/lib/interfaces";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { db } from "@/lib/db";
import { GetYTVideos } from "@/lib/actions/youtube";
import { v4 as uuidv4 } from "uuid";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const {
      courseId,
      topic,
      chapter,
      courseTitle,
    }: {
      courseId: string;
      topic: string;
      chapter: IChapterOutline;
      courseTitle: string;
    } = await req.json();

    // Generate a unique chapterId
    const chapterId = uuidv4();

    // Check if content already exists for this chapter
    const existingContent = await db
      .select()
      .from(chapterContent)
      .where(
        and(
          eq(chapterContent.courseId, courseId),
          eq(chapterContent.chapterId, chapterId)
        )
      );

    if (existingContent.length > 0) {
      return NextResponse.json(
        { message: "Content already generated for this chapter" },
        { status: 200 }
      );
    }

    // Fetch YouTube video ID using course title and chapter title
    const videoId = await GetYTVideos(
      `${courseTitle}: ${chapter.chapterTitle}`
    );
    if (!videoId) {
      throw new Error("Failed to fetch YouTube video ID");
    }

    // Prepare topicsCovered as a string for the prompt
    const topicsCoveredStr = chapter.topicsCovered
      .map((t) => `"${t}"`)
      .join(", ");

    // Prompt for content generation
    const prompt =
      `Generate detailed content for Chapter ${chapter.chapterNumber}: "${chapter.chapterTitle}" ` +
      `in a course about ${topic}. Return it as a single, valid JSON object using this exact structure:\n\n` +
      `{\n` +
      `  "introduction": "A brief overview of the chapter topics.",\n` +
      `  "sections": [\n` +
      `    {\n` +
      `      "title": "Topic name from topicsCovered",\n` +
      `      "explanation": "A detailed explanation of the topic tailored to the course subject.",\n` +
      `      "example": {\n` +
      `        "description": "A relevant example or demonstration as plain text.",\n` +
      `        "code": "If the topic is technical (e.g., programming), include a code snippet here as a plain text string. Otherwise, leave this as an empty string (\"\")."\n` +
      `      },\n` +
      `      "usageNotes": "Notes on how to apply this topic practically.",\n` +
      `      "realWorldApplication": "A real-world use case for this topic."\n` +
      `    }\n` +
      `  ],\n` +
      `  "conclusion": "A summary of the chapter's key points."\n` +
      `}\n\n` +
      `Instructions:\n` +
      `- Return ONLY a valid JSON object—no additional text, comments, or explanations outside the JSON structure.\n` +
      `- For each topic in "topicsCovered": [${topicsCoveredStr}], create a "sections" entry with "title" set to the topic name, and fill in the other fields with detailed, relevant content.\n` +
      `- Ensure all strings are properly escaped for JSON (e.g., "She said \\"hello\\"" instead of unescaped quotes).\n` +
      `- In the "example" object, always include a "description" field with a plain text example or demonstration. If the topic involves code (e.g., programming), include the code snippet as a plain text string in the "code" field. For non-technical topics (e.g., art, lifestyle), set "code" to an empty string ("").\n` +
      `- Ensure the content is detailed, uniform, and legitimate, suitable for any topic (e.g., JavaScript, Painting, or How to Become a Stripper).\n` +
      `- Verify the JSON is syntactically correct and complete before returning.`;

    // Send prompt to Gemini with a 55-second timeout to stay under vercel's 60 second limit
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 55000);

    try {
      const result = await GenerateContentChat.sendMessage(prompt, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const responseText = result.response.text();

      // Validate JSON response
      let content;
      try {
        content = JSON.parse(responseText);
        if (
          !content.introduction ||
          !Array.isArray(content.sections) ||
          content.sections.length !== chapter.topicsCovered.length ||
          !content.conclusion ||
          !content.sections.every(
            (section: any) =>
              section.title &&
              section.explanation &&
              section.example &&
              typeof section.example.description === "string" &&
              typeof section.example.code === "string" &&
              section.usageNotes &&
              section.realWorldApplication
          )
        ) {
          throw new Error("Invalid content structure");
        }
      } catch (error: any) {
        throw new Error(`Invalid JSON response: ${error.message}`);
      }

      // Insert into database with generated chapterId
      await db.insert(chapterContent).values({
        courseId,
        chapterId,
        content,
        videoId,
        chapterNumber: chapter.chapterNumber,
      });

      return NextResponse.json({
        message: "Content generated successfully",
        data: { content, videoId, chapterId }, // Include chapterId in response for frontend use if needed
      });
    } catch (error: any) {
      if (error.name === "AbortError") {
        throw new Error("Request timed out");
      }
      throw error;
    }
  } catch (error: any) {
    console.error("Content generation failed:", error);
    return NextResponse.json(
      { message: "Content generation failed", error: error.message },
      { status: 500 }
    );
  }
}
