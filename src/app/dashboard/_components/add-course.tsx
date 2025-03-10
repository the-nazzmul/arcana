"use client";
import { useUser } from "@clerk/nextjs";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import Link from "next/link";

const AddCourse = () => {
  const { user } = useUser();
  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between pb-4 border-b">
      <div>
        <h1>
          Hello,{" "}
          <span className="font-bold text-primary">{user?.fullName}</span>{" "}
        </h1>
        <p className="text-sm text-muted-foreground">
          Create new course with AI, enhance your journey of learning.
        </p>
      </div>
      <Link href="/create-course">
        <Button>
          <PlusCircleIcon className="size-4 mr-1" />
          Create New Course
        </Button>
      </Link>
    </div>
  );
};

export default AddCourse;
