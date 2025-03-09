"use client";

import LoadingComponent from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { courses } from "@/lib/db/schema";
import { IChapterOutline } from "@/lib/interfaces";
import { InferSelectModel } from "drizzle-orm";
import { CircleSmallIcon, ClockIcon, RocketIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const ChapterList = ({
  courseInfo,
  hasContent,
  setHasContent,
}: {
  courseInfo: InferSelectModel<typeof courses>;
  hasContent: number[];
  setHasContent: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const courseOutline: IChapterOutline[] = Array.isArray(
    courseInfo.courseOutline
  )
    ? courseInfo.courseOutline
    : [];
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchChapterStatus = async () => {
      try {
        const response = await fetch(
          `/api/get-chapter-status?courseId=${courseInfo.courseId}`,
          { cache: "no-store" }
        );
        if (!response.ok) throw new Error("Failed to fetch chapter status");
        const data = await response.json();
        setHasContent(data.chapterNumbers);
      } catch (error) {
        console.error("Error fetching chapter status:", error);
      }
    };
    fetchChapterStatus();
  }, [courseInfo.courseId, setHasContent]);

  const GenerateChapterContent = async (chapter: IChapterOutline) => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-chapter-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: courseInfo.courseId,
          topic: courseInfo.topic,
          chapter,
          courseTitle: courseInfo.courseTitle,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        throw new Error(errorData.message);
      }
      toast.success("Chapter content generated successfully");
      setHasContent((prev) => [...prev, chapter.chapterNumber]);
    } catch (error: any) {
      toast.error(error.message);
      console.error(
        `Error generating content for Chapter ${chapter.chapterNumber}:`,
        error
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-2 md:p-10 border rounded-xl shadow-sm mt-3">
      <h2 className="font-semibold text-center text-2xl text-primary pb-5">
        Chapters Details
      </h2>
      <div className="flex flex-col gap-2 mt-4">
        {courseOutline.map((chapter) => (
          <Card key={chapter.chapterNumber} className="border rounded-xl p-1.5">
            <CardContent className="p-4 bg-primary/30 rounded-lg flex flex-col gap-2">
              <h5>Chapter: {chapter.chapterNumber}</h5>
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
              <Button
                onClick={() => GenerateChapterContent(chapter)}
                disabled={
                  hasContent.includes(chapter.chapterNumber) || isGenerating
                }
              >
                {hasContent.includes(chapter.chapterNumber)
                  ? "Content Generated"
                  : isGenerating
                  ? "Generating..."
                  : "Generate Content"}
                {!hasContent.includes(chapter.chapterNumber) &&
                  !isGenerating && <RocketIcon className="size-4 ml-1" />}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <LoadingComponent loading={isGenerating} />
    </div>
  );
};

export default ChapterList;
