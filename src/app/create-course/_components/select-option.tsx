import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserInputContext } from "@/providers/user-input-context";
import { useContext } from "react";

const SelectOption = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleOptionChange = (fieldName: string, value: string | number) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  return (
    <div className="px-10 md:px-20 lg:px-44">
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <Label>🎓 Difficulty Level</Label>
          <Select
            onValueChange={(value) => handleOptionChange("difficulty", value)}
            defaultValue={userCourseInput.difficulty}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advance">Advance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label>⏳ Course Duration</Label>
          <Select
            onValueChange={(value) => handleOptionChange("duration", value)}
            defaultValue={userCourseInput.duration}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2 Hours">2 Hours</SelectItem>
              <SelectItem value="3 Hours">3 Hours</SelectItem>
              <SelectItem value="More than 3 Hours">
                More than 3 Hours
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label>▶️ Add Video</Label>
          <Select
            onValueChange={(value) => handleOptionChange("video", value)}
            defaultValue={userCourseInput.video}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label>📖 Chapters (Max: 20)</Label>

          <Input
            step="1"
            type="number"
            max="20"
            onChange={(e) =>
              handleOptionChange("chapters", parseInt(e.target.value))
            }
            onKeyDown={(e) => {
              const target = e.target as HTMLInputElement;

              if ([".", "e", "-"].includes(e.key)) {
                e.preventDefault();
                return;
              }

              const allowedKeys = [
                "Backspace",
                "Delete",
                "ArrowLeft",
                "ArrowRight",
                "Tab",
              ];
              if (allowedKeys.includes(e.key)) return;

              const newValue = target.value + e.key;
              if (parseInt(newValue, 10) > 20) {
                e.preventDefault();
              }
            }}
            defaultValue={userCourseInput.chapters}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectOption;
