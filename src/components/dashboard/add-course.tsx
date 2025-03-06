"use client";
import { useUser } from "@clerk/nextjs";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "../ui/button";

const AddCourse = () => {
  const { user } = useUser();
  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
      <div>
        <h1>
          Hello, <span className="font-bold">{user?.fullName}</span>{" "}
        </h1>
        <p className="text-sm text-muted-foreground">
          Create new course with AI, enhance your journey of learning.
        </p>
      </div>
      <Button>
        <PlusCircleIcon className="size-4 mr-1" />
        Create New Course
      </Button>
    </div>
  );
};

export default AddCourse;
