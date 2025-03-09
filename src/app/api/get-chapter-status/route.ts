import { chapterContent } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
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

    // Get courseId from query params
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");
    if (!courseId) {
      return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
    }

    // Fetch chapters with content
    const existingChapters = await db
      .select({ chapterNumber: chapterContent.chapterNumber })
      .from(chapterContent)
      .where(eq(chapterContent.courseId, courseId));

    // Extract chapterNumbers
    const chapterNumbers = existingChapters.map((c) => c.chapterNumber);

    return NextResponse.json({ chapterNumbers });
  } catch (error: any) {
    console.error("Error fetching chapter status:", error);
    return NextResponse.json(
      { error: "Failed to fetch chapter status" },
      { status: 500 }
    );
  }
}
