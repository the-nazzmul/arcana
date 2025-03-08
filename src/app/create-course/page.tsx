"use client";
import { Button } from "@/components/ui/button";
import { STEPPER_OPTIONS } from "@/lib/constants";
import { UserInputContext } from "@/providers/user-input-context";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  SparklesIcon,
} from "lucide-react";
import { useContext, useState } from "react";
import SelectCategory from "./_components/select-category";
import SelectOption from "./_components/select-option";
import TopicDescription from "./_components/topic-description";
import LoadingComponent from "@/components/loader";
import { useRouter } from "next/navigation";

const CreateCoursePage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { userCourseInput } = useContext(UserInputContext);

  // Step checking
  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return userCourseInput.category.trim() !== "";
      case 1:
        return (
          userCourseInput.topic.trim() !== "" &&
          userCourseInput.description.trim() !== ""
        );
      case 2:
        return (
          userCourseInput.difficulty.trim() !== "" &&
          userCourseInput.duration.trim() !== "" &&
          userCourseInput.video.trim() !== "" &&
          userCourseInput.chapters > 0
        );
      default:
        return false;
    }
  };

  const handleCourseGeneration = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-course-outline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCourseInput),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error generating course outline", errorData);
        throw new Error(errorData.message);
      }
      const course = await response.json();
      router.replace(`/create-course/${course.courseId}`);
    } catch (error) {
      console.error("Client-side error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-20">
      {/* steps */}
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-5xl text-primary font-medium">Create Course</h2>
        <div className="flex justify-evenly w-full mt-12">
          {STEPPER_OPTIONS.map((item, index) => (
            <div key={item.id}>
              <div className="flex flex-col items-center ">
                <div
                  className={`bg-primary/30 p-3 rounded-full text-white ${
                    activeStep >= index && "!bg-primary"
                  }`}
                >
                  <item.icon className="size-6" />
                </div>
                <p className="hidden md:block md:text-sm font-semibold mt-2 text-muted-foreground">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="mt-8 px-10 md:px-20 min-h-[40vh]">
        {activeStep === 0 && <SelectCategory />}
        {activeStep === 1 && <TopicDescription />}
        {activeStep === 2 && <SelectOption />}
      </div>

      {/* button to navigate between steps */}
      <div className="flex items-center justify-between px-10 md:px-20 lg:px-44 mt-10">
        <Button
          disabled={activeStep === 0}
          onClick={() => {
            setActiveStep(activeStep - 1);
          }}
          className="rounded-full"
        >
          <ArrowLeftCircleIcon className="size-4" />
          Back
        </Button>
        {activeStep < 2 && (
          <Button
            onClick={() => {
              setActiveStep(activeStep + 1);
            }}
            className="rounded-full"
            disabled={!isStepValid()}
          >
            Next
            <ArrowRightCircleIcon className="size-4" />
          </Button>
        )}
        {activeStep === 2 && (
          <Button
            className="rounded-full"
            disabled={!isStepValid() || loading}
            onClick={handleCourseGeneration}
          >
            Generate Course Layout
            <SparklesIcon className="size-4 ml-2" />
          </Button>
        )}
      </div>
      <LoadingComponent loading={loading} />
    </div>
  );
};

export default CreateCoursePage;
