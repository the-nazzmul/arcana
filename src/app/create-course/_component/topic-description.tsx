import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const TopicDescription = () => (
  <div className="max-w-5xl mx-auto flex flex-col gap-6">
    {/* Topic */}
    <div className="flex flex-col gap-4">
      <Label>
        💡 Write the topic for which you want to generate a course. (e.g: React,
        Painting):
      </Label>
      <Input placeholder="e.g: React, Painting" />
    </div>
    <div className="flex flex-col gap-4">
      <Label>
        📝 Tell us more about your course, what you want to be included in the
        course
      </Label>
      <Textarea placeholder="Course Description" rows={10} />
    </div>

    {/* Description */}
  </div>
);

export default TopicDescription;
