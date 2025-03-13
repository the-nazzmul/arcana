// app/[courseId]/[chapterNumber]/page.tsx
import NotFound from "@/app/not-found";
import { db } from "@/lib/db";
import { chapterContent, userCourseProgress } from "@/lib/db/schema";
import { IChapterContent } from "@/lib/interfaces";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import ChapterContentRenderer from "./_components/chapter-content-renderer";

export default async function ChapterPage({
  params,
}: {
  params: { courseId: string; chapterNumber: string };
}) {
  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const chapterNum = parseInt(params.chapterNumber);
  if (isNaN(chapterNum)) {
    return <NotFound />;
  }

  // Update user's progress
  await db
    .insert(userCourseProgress)
    .values({
      userEmail: user.emailAddresses[0].emailAddress,
      courseId: params.courseId,
      lastChapterNumber: chapterNum,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: [userCourseProgress.userEmail, userCourseProgress.courseId],
      set: {
        lastChapterNumber: chapterNum,
        updatedAt: new Date(),
      },
    });

  // Fetch chapter content
  const chapterData = await db
    .select()
    .from(chapterContent)
    .where(
      and(
        eq(chapterContent.courseId, params.courseId),
        eq(chapterContent.chapterNumber, chapterNum)
      )
    )
    .limit(1);

  const chapter = chapterData[0];
  if (!chapter) {
    return <div>Chapter not found</div>;
  }

  const content: IChapterContent = chapter.content as IChapterContent;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Chapter {chapter.chapterNumber}
      </h1>
      <ChapterContentRenderer content={content} />
    </div>
  );
}
