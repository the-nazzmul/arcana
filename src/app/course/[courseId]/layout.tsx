import { AppSidebar } from "@/app/dashboard/_components/app-sidebars";
import { ThemeToggler } from "@/components/theme-toggler";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { chapterContent, courses } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Arcana | Course",
  description: "Your AI Powered learning assistant.",
};

export default async function CourseLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { courseId: string };
}>) {
  const { userId } = await auth();

  const GetCourseChapters = async () => {
    const res = await db
      .select()
      .from(chapterContent)
      .where(eq(chapterContent.courseId, params.courseId));
    return res;
  };
  const GetCourseName = async () => {
    const res = await db
      .select({ courseTitle: courses.courseTitle })
      .from(courses)
      .where(eq(courses.courseId, params.courseId));
    return res[0].courseTitle;
  };

  const chapters = await GetCourseChapters();
  const courseTitle = await GetCourseName();

  return (
    <SidebarProvider>
      <AppSidebar
        inDashboard={false}
        chapters={chapters}
        courseTitle={courseTitle}
      />
      <main className="w-full h-screen flex">
        <div className="m-2 md:ml-0 flex-1 flex flex-col h-[calc(100vh-16px)] overflow-hidden rounded-md border border-sidebar-border bg-sidebar shadow relative">
          <div className="flex items-center justify-between border-b p-2 sticky top-0 bg-sidebar z-10">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <Button>
                <Link href="/dashboard">
                  {userId ? "Dashboard" : "Get Started"}
                </Link>
              </Button>
              <ThemeToggler />
              <UserButton
                appearance={{
                  elements: { userButtonAvatarBox: "h-[34px] w-[34px]" },
                }}
              />
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4">{children}</div>
        </div>
      </main>
    </SidebarProvider>
  );
}
