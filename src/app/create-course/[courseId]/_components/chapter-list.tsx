"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { courses } from "@/lib/db/schema";
import { IChapterOutline } from "@/lib/interfaces";
import { InferSelectModel } from "drizzle-orm";
import { CircleSmallIcon, ClockIcon, RocketIcon } from "lucide-react";

const ChapterList = ({
  courseInfo,
}: {
  courseInfo: InferSelectModel<typeof courses>;
}) => {
  const courseOutline = Array.isArray(courseInfo.courseOutline)
    ? (courseInfo.courseOutline as IChapterOutline[])
    : [];

  const GenerateChapterContent = async () => {
    const chapters = courseOutline;
    const response = await fetch("/api/generate-chapter-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chapters),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error generating content for chapters", errorData);
      throw new Error(errorData.message);
    }
    const content = await response.json();

    console.log(content);
  };
  return (
    <div className="p-2 md:p-10 border rounded-xl shadow-sm mt-3">
      <h2 className="font-semibold text-center text-2xl text-primary pb-5">
        Chapters Details
      </h2>
      <div className="flex flex-col gap-2 mt-4">
        {courseOutline.map((chapter: IChapterOutline) => (
          <Card key={chapter.chapterNumber} className="border rounded-xl p-1.5">
            <CardContent className="p-4 bg-primary/30 rounded-lg flex flex-col gap-2">
              <h5 className="">Chapter: {chapter.chapterNumber}</h5>
              <h3 className="text-lg font-semibold">{chapter.chapterTitle}</h3>
              <p className="text-sm italic font-light text-muted-foreground">
                {chapter.description}
              </p>
              <h5 className="inline-flex items-center gap-2 text-sm">
                <ClockIcon className="size-4" /> {chapter.duration}
              </h5>
              <div>
                <h3 className="font-semibold">Topics</h3>
                <ul className="p-2">
                  {chapter.topicsCovered.map((topic, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CircleSmallIcon className="size-3" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-5">
        <Button size="lg" className="w-full" onClick={GenerateChapterContent}>
          Generate Course Content
          <RocketIcon className="size-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};
export default ChapterList;
