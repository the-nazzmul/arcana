import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserInputContext } from "@/providers/user-input-context";
import { useContext } from "react";

const TopicDescription = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName: string, value: string) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      {/* Topic */}
      <div className="flex flex-col gap-4">
        <Label>
          💡 Write the topic for which you want to generate a course. (e.g:
          React, Painting):
        </Label>
        <Input
          placeholder="e.g: React, Painting"
          defaultValue={userCourseInput.topic}
          onChange={(e) => handleInputChange("topic", e.target.value)}
        />
      </div>
      {/* Description */}
      <div className="flex flex-col gap-4">
        <Label>
          📝 Tell us more about your course, what you want to be included in the
          course
        </Label>
        <Textarea
          placeholder="Course Description"
          defaultValue={userCourseInput.description}
          rows={5}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </div>
    </div>
  );
};

export default TopicDescription;
