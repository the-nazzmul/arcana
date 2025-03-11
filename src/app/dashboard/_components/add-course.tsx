"use client";
import { useUser } from "@clerk/nextjs";
import { PlusCircleIcon, ShieldCheckIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import Link from "next/link";

const AddCourse = ({ numberOfCourses }: { numberOfCourses: number }) => {
  console.log(numberOfCourses);
  const { user } = useUser();
  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between pb-4 border-b">
      <div>
        <h1>
          Hello,{" "}
          <span className="font-bold text-primary">{user?.fullName}</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Create new course with AI, enhance your journey of learning.
        </p>
      </div>
      {numberOfCourses < 5 && (
        <Button disabled={numberOfCourses >= 5}>
          <Link href="/create-course" className="inline-flex items-center">
            <PlusCircleIcon className="size-4 mr-1" />
            Create New Course
          </Link>
        </Button>
      )}
      {numberOfCourses >= 5 && (
        <Button>
          <Link href="/dashboard/upgrade" className="inline-flex items-center">
            <ShieldCheckIcon className="size-4 mr-1" />
            Upgrade to Pro
          </Link>
        </Button>
      )}
    </div>
  );
};

export default AddCourse;
