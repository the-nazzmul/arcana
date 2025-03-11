import { AppSidebar } from "@/app/dashboard/_components/app-sidebars";
import { ThemeToggler } from "@/components/theme-toggler";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { db } from "@/lib/db";
import { courses } from "@/lib/db/schema";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arcana | Dashboard",
  description: "Your AI Powered learning assistant.",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Authenticate user
  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  // Fetch courses  from the database
  const courseData = await db
    .select()
    .from(courses)
    .where(and(eq(courses.createdBy, user.emailAddresses[0].emailAddress)));

  return (
    <SidebarProvider>
      <AppSidebar courseData={courseData} />
      <main className="w-full h-screen flex">
        <div className="m-2 md:ml-0 flex-1 flex flex-col h-[calc(100vh-16px)] overflow-hidden rounded-md border border-sidebar-border bg-sidebar shadow relative">
          <div className="flex items-center justify-between border-b p-2 sticky top-0 bg-sidebar z-10">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
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
