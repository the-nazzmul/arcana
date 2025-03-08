import { IContentOutline } from "@/lib/interfaces";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

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

    const chapterArr: IContentOutline[] = await req.json();

    const processedChapters = chapterArr.map(
      ({ chapterName, chapterTitle, topicsCovered }) => {
        return {
          chapterName,
          chapterTitle,
          topicsCovered,
        };
      }
    );

    return NextResponse.json({
      message: "Chapters processed",
      data: processedChapters,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Content generation failed", error: error.message },
      { status: 500 }
    );
  }
}
