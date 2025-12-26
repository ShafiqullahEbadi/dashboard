"use client";

import * as React from "react";

import { NavRoutes } from "@/components/ui/nav-routes";
import { NavUser } from "@/components/ui/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import type { LucideIcon } from "lucide-react";
import useAuth from "@/hooks/use-auth";

// Define a type for routes
export type Route = {
  name: string;
  url: string;
  icon: LucideIcon;
};

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  routes: Route[]; // <-- dynamic routes
};

export function AppSidebar({ routes, ...props }: AppSidebarProps) {
  const { data: authData } = useAuth();

  const user = {
    name: authData?.user?.fullName || "Guest",
    email: authData?.user?.email||"guest@example.com",
    avatar: "/avatar.png",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavRoutes routes={routes} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
