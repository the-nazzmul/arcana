"use client";
import { Button } from "@/components/ui/button";
import { STEPPER_OPTIONS } from "@/lib/constants";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  SparklesIcon,
} from "lucide-react";
import { useState } from "react";
import SelectCategory from "./_component/select-category";
import TopicDescription from "./_component/topic-description";
import SelectOption from "./_component/select-option";

const CreateCoursePage = () => {
  const [activeStep, setActiveStep] = useState(0);

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
          >
            Next
            <ArrowRightCircleIcon className="size-4" />
          </Button>
        )}
        {activeStep === 2 && (
          <Button className="rounded-full">
            Generate Course Layout
            <SparklesIcon className="size-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateCoursePage;
