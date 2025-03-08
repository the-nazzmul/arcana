import { Button } from "@/components/ui/button";
import { courses } from "@/lib/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { PuzzleIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const CourseInfo = ({
  courseInfo,
}: {
  courseInfo: InferSelectModel<typeof courses>;
}) => {
  return (
    <div className="p-10 border rounded-xl shadow-sm mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
        <div className="flex flex-col gap-y-4">
          <h2 className="text-2xl font-bold">{courseInfo.courseTitle}</h2>
          <p className="text-sm text-muted-foreground">
            {courseInfo.description}
          </p>
          <h2 className="text-lg font-medium text-primary inline-flex items-center gap-2">
            <PuzzleIcon className="size-5" />
            {courseInfo.category}
          </h2>
          <Button className="w-full">Start</Button>
        </div>
        <div className="border-2 rounded-xl bg-gray-200 flex items-center justify-center">
          <Image
            src="/course-image-placeholder.png"
            alt="course image"
            width={400}
            height={300}
            className="w-[400px] h-[300px] rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
