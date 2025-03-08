import { courses } from "@/lib/db/schema";
import { InferSelectModel } from "drizzle-orm";
import {
  BrainIcon,
  NotebookTextIcon,
  TargetIcon,
  TimerIcon,
} from "lucide-react";

const CourseDetails = ({
  courseInfo,
}: {
  courseInfo: InferSelectModel<typeof courses>;
}) => {
  return (
    <div className="border p-10 rounded-xl shadow-sm mt-3">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex items-center justify-center gap-2">
          <div className="p-2 rounded-full bg-primary/20">
            <BrainIcon className="size-8" />
          </div>
          <div>
            <h2 className="text-xs text-muted-foreground">Level</h2>
            <h2 className="text-lg font-medium">{courseInfo.difficulty}</h2>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="p-2 rounded-full bg-primary/20">
            <TargetIcon className="size-8" />
          </div>
          <div>
            <h2 className="text-xs text-muted-foreground">Topic</h2>
            <h2 className="text-lg font-medium">{courseInfo.topic}</h2>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="p-2 rounded-full bg-primary/20">
            <TimerIcon className="size-8" />
          </div>
          <div>
            <h2 className="text-xs text-muted-foreground">Duration</h2>
            <h2 className="text-lg font-medium">
              {courseInfo.duration === "More than 3 Hours" && "3+ hours"}
              {courseInfo.duration === "3 Hours" && "3 hours"}
              {courseInfo.duration === "2 Hours" && "2 hours"}
            </h2>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="p-2 rounded-full bg-primary/20">
            <NotebookTextIcon className="size-8" />
          </div>
          <div>
            <h2 className="text-xs text-muted-foreground">Chapters</h2>
            <h2 className="text-lg font-medium">{courseInfo.chapters}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
