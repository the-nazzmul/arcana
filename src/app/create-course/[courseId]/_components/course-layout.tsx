"use client";

import { useState, useEffect } from "react";
import CourseInfo from "./course-info";
import ChapterList from "./chapter-list";
import { courses } from "@/lib/db/schema";
import { InferSelectModel } from "drizzle-orm";

const CourseLayout = ({
  courseInfo,
}: {
  courseInfo: InferSelectModel<typeof courses>;
}) => {
  const [hasContent, setHasContent] = useState<number[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(courseInfo.isPublished); // Initialize from prop

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
  }, [courseInfo.courseId, isPublishing]);

  return (
    <>
      <CourseInfo
        courseInfo={courseInfo}
        hasContent={hasContent}
        isPublishing={isPublishing}
        setIsPublishing={setIsPublishing}
        isPublished={isPublished} // Pass local state
        setIsPublished={setIsPublished} // Pass setter
      />
      <ChapterList
        courseInfo={courseInfo}
        hasContent={hasContent}
        setHasContent={setHasContent}
      />
    </>
  );
};

export default CourseLayout;
