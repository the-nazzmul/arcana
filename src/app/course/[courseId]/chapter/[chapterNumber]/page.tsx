import NotFound from "@/app/not-found";
import { db } from "@/lib/db";
import { chapterContent, userCourseProgress } from "@/lib/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

export default async function ChapterPage({
  params,
}: {
  params: { courseId: string; chapterNumber: string };
}) {
  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  // Parse chapterNumber from URL with validation
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
  const chapter = await db
    .select()
    .from(chapterContent)
    .where(
      and(
        eq(chapterContent.courseId, params.courseId),
        eq(chapterContent.chapterNumber, chapterNum)
      )
    )
    .limit(1);

  if (!chapter[0]) {
    return <div>Chapter not found</div>;
  }

  return (
    <div>
      <h1>Chapter {chapter[0].chapterNumber}</h1>
      {/* <div>{chapter[0].content}</div> */}
    </div>
  );
}
