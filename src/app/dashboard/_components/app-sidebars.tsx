"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { APPLICATION_NAV_ITEMS } from "@/lib/constants";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Progress } from "../../../components/ui/progress";
import { Button } from "@/components/ui/button";

export function AppSidebar({
  courseData,
  inDashboard,
  chapters,
  courseTitle,
}: {
  courseData?: any[];
  inDashboard?: boolean;
  chapters?: any[];
  courseTitle?: string;
}) {
  const pathname = usePathname();
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="floating">
      {inDashboard && (
        <SidebarHeader>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/arcana-logo.png" alt="logo" width={30} height={30} />
            {open && (
              <h1 className="text-2xl font-serif font-bold text-primary">
                Arcana
              </h1>
            )}
          </Link>
        </SidebarHeader>
      )}
      {chapters && chapters.length > 0 && courseTitle && !inDashboard && (
        <SidebarHeader>
          {open && (
            <h1 className="font-semibold text-primary">{courseTitle}</h1>
          )}
        </SidebarHeader>
      )}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {chapters && chapters.length > 0
                ? chapters.map((chapter) => {
                    return (
                      <SidebarMenuItem key={chapter.chapterId}>
                        <SidebarMenuButton
                          asChild
                          className={cn(
                            "hover:bg-primary/50 hover:text-white dark:text-white/80 text-xs",
                            pathname.includes(
                              `/course/${chapter.courseId}/chapter/${chapter.chapterNumber}`
                            ) && "bg-primary text-white"
                          )}
                        >
                          <Link
                            href={`/course/${chapter.courseId}/chapter/${chapter.chapterNumber}`}
                            prefetch={true}
                          >
                            <span>{chapter.chapterNumber}</span>
                            {open && (
                              <span className="text-sm">
                                Chapter: {chapter.chapterNumber}
                              </span>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })
                : APPLICATION_NAV_ITEMS.map((item) => {
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          className={cn(
                            "hover:bg-primary/50 hover:text-white dark:text-white/80",
                            {
                              "bg-primary text-white": pathname === item.url,
                            }
                          )}
                        >
                          <Link href={item.url} prefetch={true}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {open && courseData && !inDashboard && (
          <div className="py-4 px-2">
            <Progress value={(100 * courseData.length) / 5} />
            <p className="text-sm text-muted-foreground my-2">
              {courseData.length} Out of 5 Course created
            </p>
            <p className="text-xs">
              Upgrade your plan for unlimited course generation
            </p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
