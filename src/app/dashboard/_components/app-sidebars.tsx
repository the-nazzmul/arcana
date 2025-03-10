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

export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="floating">
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
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {APPLICATION_NAV_ITEMS.map((item) => {
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
        {open && (
          <div className="py-4 px-2">
            <Progress value={40} />
            <p className="text-sm text-muted-foreground my-2">
              0 Out of 5 Course created
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
