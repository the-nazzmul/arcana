import { Button } from "@/components/ui/button";
import { courses } from "@/lib/db/schema";
import { InferSelectModel } from "drizzle-orm";
import {
  BrainIcon,
  ClockIcon,
  NotebookTextIcon,
  PlayCircleIcon,
  PuzzleIcon,
  TargetIcon,
} from "lucide-react";
import Image from "next/image";

const CourseInfo = ({
  courseInfo,
}: {
  courseInfo: InferSelectModel<typeof courses>;
}) => {
  return (
    <div className=" p-2 md:p-10 border rounded-xl shadow-sm mt-10">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-center">
        <div className="border-2 rounded-lg bg-gray-200 flex items-center justify-center">
          <Image
            src="/course-image-placeholder.png"
            alt="course image"
            width={400}
            height={300}
            className="w-[400px] h-[300px] rounded-xl object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 justify-between h-full">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">{courseInfo.courseTitle}</h2>
            <p className="text-sm text-muted-foreground">
              {courseInfo.description}
            </p>
            <h2 className="font-medium flex items-center gap-2 bg-primary/20 rounded-lg w-fit py-2 px-4">
              <PuzzleIcon className="size-4" />
              {courseInfo.category}
            </h2>
            <div className="flex items-center justify-start md:justify-between flex-wrap gap-2">
              <div className="flex items-center justify-center gap-2">
                <div className="p-1 rounded-full bg-primary/20">
                  <BrainIcon className="size-4" />
                </div>
                <h2 className="font-medium">{courseInfo.difficulty}</h2>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="p-1 rounded-full bg-primary/20">
                  <TargetIcon className="size-4" />
                </div>
                <h2 className="font-medium">{courseInfo.topic}</h2>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="p-1 rounded-full bg-primary/20">
                  <ClockIcon className="size-4" />
                </div>
                <h2 className="font-medium">
                  {courseInfo.duration === "More than 3 Hours" && "3+ hours"}
                  {courseInfo.duration === "3 Hours" && "3 hours"}
                  {courseInfo.duration === "2 Hours" && "2 hours"}
                </h2>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="p-1 rounded-full bg-primary/20">
                  <NotebookTextIcon className="size-4" />
                </div>
                <h2 className="font-medium">{courseInfo.chapters}</h2>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="p-1 rounded-full bg-primary/20">
                  <PlayCircleIcon className="size-4" />
                </div>
                <h2 className="font-medium capitalize">{courseInfo.video}</h2>
              </div>
            </div>
          </div>
          <Button className="w-full">Start</Button>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
